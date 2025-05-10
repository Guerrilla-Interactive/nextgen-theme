import {definePlugin, defineType, defineField} from 'sanity'
import { serviceSlugVariables } from "@/app/(main)/service/[slug]/_service-slug-core-utilities/service-slug.translations-and-variables";
import { courseSlugVariables } from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.translations-and-variables";
import {ServerScreenshotInput} from './screenshot-input.component'

// Define a custom schema type for screenshot fields
export const screenshotImageType = defineType({
  name: 'screenshotImage',
  title: 'Frontend Screenshot',
  type: 'object',
  components: {
    input: ServerScreenshotInput
  },
  fields: [
    // Add fields for all CSS breakpoints
    defineField({
      name: 'xsImage',
      title: 'XS Screenshot (480px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'smImage',
      title: 'SM Screenshot (640px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'mdImage',
      title: 'MD Screenshot (768px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'lgImage',
      title: 'LG Screenshot (1024px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'xlImage',
      title: 'XL Screenshot (1420px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'twoXlImage',
      title: '2XL Screenshot (1600px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'threeXlImage',
      title: '3XL Screenshot (1800px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'fourXlImage',
      title: '4XL Screenshot (2000px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'fiveXlImage',
      title: '5XL Screenshot (2200px)',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'captureDate',
      title: 'Capture Date',
      type: 'datetime',
      readOnly: true
    }),
    defineField({
      name: 'captureMode',
      title: 'Capture Mode',
      type: 'string',
      readOnly: true,
      options: {
        list: ['draft', 'published']
      }
    }),
    defineField({
      name: 'capturedBreakpoints',
      title: 'Captured Breakpoints',
      type: 'array',
      of: [{type: 'string'}],
      readOnly: true
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    })
  ]
})

export const serverScreenshot = definePlugin({
  name: 'server-screenshot',
  document: {
    actions: (prev) => {
      // define the action component
      return prev.map(Action => {
        if (Action.name === 'PublishAction') {
          return props => {
            const originalAction = Action(props)
            
            // Only apply to document types that have frontend views
            const supportedTypes = ['page-slug', 'blog-slug', serviceSlugVariables("DOCUMENT_TYPE"), courseSlugVariables("DOCUMENT_TYPE")];
            if (!supportedTypes.includes(props.schemaType)) {
              return originalAction
            }
            
            // Add a custom action after publish
            return {
              ...originalAction,
              onHandle: async () => {
                // First call the original publish action
                await originalAction.onHandle()
                
                try {
                  // When auto-capturing after publish, use all breakpoints
                  // The user can manually select breakpoints when using the button
                  console.log('Capturing screenshots after publish...');
                  await captureServerScreenshot(props, 'all', null)
                } catch (error) {
                  console.error('Error capturing screenshots after publish:', error);
                  // Don't block the publish flow if screenshot capture fails
                }
              }
            }
          }
        }
        return Action
      }).concat([
        props => {
          // Only show for supported document types
          const supportedTypes = ['page-slug', 'blog-slug', serviceSlugVariables("DOCUMENT_TYPE"), courseSlugVariables("DOCUMENT_TYPE")];
          if (!supportedTypes.includes(props.schemaType)) {
            return null
          }
          
          return {
            label: 'Server Screenshot',
            icon: () => '🖼️',
            onHandle: () => {
              // Use selectedBreakpoints from props if available (set by the component)
              const selectedBreakpoints = props.selectedBreakpoints || 'all';
              return captureServerScreenshot(props, selectedBreakpoints, null);
            }
          }
        }
      ])
    },
  },
  // Define the custom schema type
  schema: {
    types: [screenshotImageType]
  }
})

// Export the capture function so it can be called from the screenshot-input component
export async function captureServerScreenshot(props, selectedBreakpoints: string[] | string = 'all', forceDraftMode = null) {
  if (!props || !props.documentId || !props.getClient) {
    console.error('Missing required properties in props', props);
    return;
  }

  const {documentId, getClient, onComplete, schemaType} = props
  const client = getClient({apiVersion: '2024-01-01'})
  
  // Create status container outside of the try block so it's available in all scopes
  let statusContainer = null;
  if (typeof window !== 'undefined') {
    try {
      statusContainer = window.document.createElement('div');
      statusContainer.style.position = 'fixed';
      statusContainer.style.top = '20px';
      statusContainer.style.right = '20px';
      statusContainer.style.padding = '10px';
      statusContainer.style.background = '#333';
      statusContainer.style.color = 'white';
      statusContainer.style.borderRadius = '4px';
      statusContainer.style.zIndex = '1000000';
      statusContainer.textContent = 'Checking document versions...';
      window.document.body.appendChild(statusContainer);
    } catch (error) {
      console.warn('Could not create status container:', error);
    }
  }
  
  try {
    // Determine if we're looking at a draft or published document
    const isDraft = documentId.startsWith('drafts.');
    const baseId = isDraft ? documentId.substring(7) : documentId;
    const draftId = `drafts.${baseId}`;
    const publishedId = baseId;
    
    console.log('Document info:', {
      currentId: documentId,
      isDraft,
      baseId,
      draftId,
      publishedId
    });
    
    // Check if draft and published versions exist
    const [draftDoc, publishedDoc] = await Promise.all([
      client.fetch(`*[_id == $id][0]`, {id: draftId}),
      client.fetch(`*[_id == $id][0]`, {id: publishedId})
    ]);
    
    const hasDraft = !!draftDoc;
    const hasPublished = !!publishedDoc;
    
    console.log('Version check:', {
      hasDraft,
      hasPublished
    });
    
    // Determine which version to capture based on availability
    let targetDoc;
    let captureMode;
    let targetDocId;
    
    // If forceDraftMode is set, use that to determine which version to capture
    if (forceDraftMode !== null) {
      if (forceDraftMode && hasDraft) {
        // Force draft mode and draft exists
        targetDoc = draftDoc;
        captureMode = 'draft';
        targetDocId = draftId;
      } else if (!forceDraftMode && hasPublished) {
        // Force published mode and published exists
        targetDoc = publishedDoc;
        captureMode = 'published';
        targetDocId = publishedId;
      } else {
        // Forced mode requested but that version doesn't exist
        const requestedMode = forceDraftMode ? 'draft' : 'published';
        const availableMode = forceDraftMode ? 'published' : 'draft';
        const hasAvailable = forceDraftMode ? hasPublished : hasDraft;
        
        console.error(`Requested ${requestedMode} version does not exist`);
        
        if (hasAvailable) {
          console.log(`Falling back to ${availableMode} version`);
          targetDoc = forceDraftMode ? publishedDoc : draftDoc;
          captureMode = forceDraftMode ? 'published' : 'draft';
          targetDocId = forceDraftMode ? publishedId : draftId;
        } else {
          console.error('No versions of document found');
          if (statusContainer) {
            statusContainer.textContent = `Error: No ${requestedMode} version found and no fallback available`;
            statusContainer.style.background = '#e53e3e';
            
            // Remove after 3 seconds
            setTimeout(() => {
              if (window.document.body.contains(statusContainer)) {
                window.document.body.removeChild(statusContainer);
              }
            }, 3000);
          } else {
            alert(`No ${requestedMode} version found and no fallback available`);
          }
          
          onComplete?.();
          return;
        }
      }
    } else {
      // No forced mode, use the default logic
      if (hasDraft) {
        // Prefer draft if available
        targetDoc = draftDoc;
        captureMode = 'draft';
        targetDocId = draftId;
      } else if (hasPublished) {
        // Fall back to published
        targetDoc = publishedDoc;
        captureMode = 'published';
        targetDocId = publishedId;
      } else {
        console.error('No versions of document found');
        if (statusContainer) {
          statusContainer.textContent = 'Error: Could not find any version of the document to capture';
          statusContainer.style.background = '#e53e3e';
          
          // Remove after 3 seconds
          setTimeout(() => {
            if (window.document.body.contains(statusContainer)) {
              window.document.body.removeChild(statusContainer);
            }
          }, 3000);
        } else {
          alert('Could not find any version of the document to capture');
        }
        
        onComplete?.();
        return;
      }
    }
    
    // Update status message
    if (statusContainer) {
      statusContainer.textContent = `Capturing ${captureMode} screenshots for all breakpoints...`;
    }
    
    // Get document from the appropriate version
    const sanityDoc = targetDoc;
    
    if (!sanityDoc) {
      console.error('Document not found');
      if (statusContainer) {
        statusContainer.textContent = 'Error: Document not found';
        statusContainer.style.background = '#e53e3e';
        
        // Remove after 3 seconds
        setTimeout(() => {
          if (window.document.body.contains(statusContainer)) {
            window.document.body.removeChild(statusContainer);
          }
        }, 3000);
      } else {
        alert('Document not found');
      }
      onComplete?.();
      return;
    }
    
    if (!sanityDoc.slug?.current) {
      console.error('Document has no slug');
      if (statusContainer) {
        statusContainer.textContent = 'Error: Document must have a slug to capture its frontend';
        statusContainer.style.background = '#e53e3e';
        
        // Remove after 3 seconds
        setTimeout(() => {
          if (window.document.body.contains(statusContainer)) {
            window.document.body.removeChild(statusContainer);
          }
        }, 3000);
      } else {
        alert('Document must have a slug to capture its frontend');
      }
      onComplete?.();
      return;
    }
    
    // Calculate the origin safely
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) {
      console.error('Could not determine origin');
      if (statusContainer) {
        statusContainer.textContent = 'Error: Could not determine the site URL';
        statusContainer.style.background = '#e53e3e';
        
        // Remove after 3 seconds
        setTimeout(() => {
          if (window.document.body.contains(statusContainer)) {
            window.document.body.removeChild(statusContainer);
          }
        }, 3000);
      } else {
        alert('Could not determine the site URL');
      }
      onComplete?.();
      return;
    }
    
    // Get breakpoints to capture
    const breakpointsParam = Array.isArray(selectedBreakpoints) ? 
      selectedBreakpoints.join(',') : selectedBreakpoints;
    
    // Update the message to reflect the selected breakpoints
    if (statusContainer) {
      if (Array.isArray(selectedBreakpoints)) {
        const count = selectedBreakpoints.length;
        statusContainer.textContent = `Capturing ${captureMode} screenshots for ${count} selected breakpoint${count !== 1 ? 's' : ''}...`;
      } else {
        statusContainer.textContent = `Capturing ${captureMode} screenshots for all breakpoints...`;
      }
    }
    
    // Construct the frontend URL based on the document type and slug
    let frontendUrl = '';
    
    // Use the same routing logic as in the presentation plugin
    switch(schemaType) {
      case 'page-slug':
        frontendUrl = `${origin}/${sanityDoc.slug.current}`;
        break;
      case 'blog-slug':
        frontendUrl = `${origin}/blog/${sanityDoc.slug.current}`;
        break;
      case serviceSlugVariables("DOCUMENT_TYPE"):
        frontendUrl = `${origin}/${serviceSlugVariables("ROUTE_PATH")}/${sanityDoc.slug.current}`;
        break;
      case courseSlugVariables("DOCUMENT_TYPE"):
        frontendUrl = `${origin}/${courseSlugVariables("ROUTE_PATH")}/${sanityDoc.slug.current}`;
        break;
      default:
        // Fallback to the default pattern if the type isn't explicitly handled
        frontendUrl = `${origin}/${sanityDoc.slug.current}`;
    }
    
    console.log(`Capturing ${captureMode} screenshots for ${Array.isArray(selectedBreakpoints) ? selectedBreakpoints.join(', ') : 'all breakpoints'}: ${frontendUrl}`)
    
    // Generate a unique identifier base for all screenshots
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 10);
    const uniqueIdBase = `${timestamp}-${randomId}`;
    
    // Store asset references for each breakpoint
    const assetRefs: Record<string, { _type: string; _ref: string }> = {};
    
    // Store references to old images that will need to be deleted
    const oldAssetRefs: Record<string, string> = {};
    
    // Check if the document already has screenshots that we'll be replacing
    if (sanityDoc.captureImage) {
      // Check all image fields
      const imageFieldNames = [
        'xsImage', 'smImage', 'mdImage', 'lgImage', 'xlImage', 
        'twoXlImage', 'threeXlImage', 'fourXlImage', 'fiveXlImage'
      ];
      
      for (const fieldName of imageFieldNames) {
        if (sanityDoc.captureImage[fieldName]?.asset?._ref) {
          const breakpointName = fieldName.replace('Image', '');
          oldAssetRefs[breakpointName] = sanityDoc.captureImage[fieldName].asset._ref;
        }
      }
    }
    
    // If we found old images, log them
    const oldAssetCount = Object.keys(oldAssetRefs).length;
    if (oldAssetCount > 0) {
      console.log(`Found ${oldAssetCount} existing screenshot images that might be replaced`);
    }
    
    // Capture screenshots for all breakpoints
    if (statusContainer) {
      statusContainer.textContent = `Starting capture for all breakpoints...`;
    }
    
    try {
      // Call our API with selected breakpoints
      if (statusContainer) {
        if (Array.isArray(selectedBreakpoints)) {
          const count = selectedBreakpoints.length;
          statusContainer.textContent = `Capturing ${count} breakpoint${count !== 1 ? 's' : ''} for ${captureMode} mode...`;
        } else {
          statusContainer.textContent = `Capturing all breakpoints for ${captureMode} mode...`;
        }
      }
      
      // Call our server-side screenshot API with the selected breakpoints
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: frontendUrl,
          isDraft: captureMode === 'draft',
          deviceType: breakpointsParam // Send the selected breakpoints
        })
      });
      
      if (!response.ok) {
        let errorMessage = response.statusText || 'Screenshot failed';
        try {
          const errorData = await response.json();
          if (errorData.error || errorData.message) {
            errorMessage = errorData.error || errorData.message;
          }
        } catch (e) {
          // If we can't parse as JSON, use status text
        }
        throw new Error(`Screenshot failed: ${errorMessage}`);
      }
      
      // Get response as JSON with base64 screenshots
      const result = await response.json();
      
      if (!result.success) {
        throw new Error('API reported failure');
      }
      
      // Process screenshots for each breakpoint
      for (const breakpoint of Object.keys(result.screenshots)) {
        if (result.screenshots[breakpoint]) {
          if (statusContainer) {
            statusContainer.textContent = `Processing ${breakpoint} screenshot...`;
          }
          
          // Convert base64 to blob
          const base64 = result.screenshots[breakpoint];
          const byteCharacters = atob(base64);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          
          const blob = new Blob(byteArrays, {type: 'image/png'});
          
          // Upload the screenshot to Sanity
          if (statusContainer) {
            statusContainer.textContent = `Uploading ${breakpoint} screenshot for ${captureMode} mode...`;
          }
          
          // Create a more descriptive filename and tags
          const docIdForFilename = targetDocId.replace('drafts.', ''); // Remove drafts. prefix for cleaner filenames
          const docTypeTag = schemaType || 'document';
          const filename = `screenshot-${breakpoint}-${docTypeTag}-${docIdForFilename}-${uniqueIdBase}.png`;
          
          try {
            const asset = await client.assets.upload('image', blob, {
              filename,
              label: `${breakpoint} Screenshot: ${sanityDoc.title || sanityDoc.name || ''} (${captureMode})`,
              // Add tags for easier asset management
              tags: [`screenshot`, `${breakpoint}`, `${docTypeTag}`, `${captureMode}`]
            });
            
            if (!asset || !asset._id) {
              console.error(`Failed to upload ${breakpoint} screenshot to Sanity`);
              continue;
            }
            
            // Store the asset reference for this breakpoint
            assetRefs[breakpoint] = {
              _type: 'reference',
              _ref: asset._id
            };
          } catch (uploadError) {
            console.error(`Error uploading ${breakpoint} screenshot:`, uploadError);
            continue;
          }
        }
      }
      
    } catch (batchError) {
      console.error('Error with batch capture:', batchError);
      if (statusContainer) {
        statusContainer.textContent = `Error capturing screenshots: ${batchError.message}`;
        statusContainer.style.background = '#e53e3e';
      }
      onComplete?.();
      return;
    }
    
    // Check if we captured any screenshots
    if (Object.keys(assetRefs).length === 0) {
      if (statusContainer) {
        statusContainer.textContent = 'Error: Failed to capture any screenshots';
        statusContainer.style.background = '#e53e3e';
        
        // Remove after 3 seconds
        setTimeout(() => {
          if (window.document.body.contains(statusContainer)) {
            window.document.body.removeChild(statusContainer);
          }
        }, 3000);
      } else {
        alert('Failed to capture any screenshots');
      }
      onComplete?.();
      return;
    }
    
    // Add metadata
    const captureMetadata = {
      timestamp: new Date().toISOString(),
      url: frontendUrl,
      title: sanityDoc.title || sanityDoc.name || '',
      path: frontendUrl.replace(origin, '')
    }
    
    // Safely get the document title or provide a fallback
    const docTitle = typeof sanityDoc.title === 'string' ? sanityDoc.title : 'page';
    
    // Prepare the update object
    interface ScreenshotImage {
      _type: string;
      captureDate: string;
      captureMode: string;
      capturedBreakpoints: string[];
      alt: string;
      caption: string;
      [key: string]: any; // Allow for dynamic property names for breakpoint images
    }
    
    interface UpdateObject {
      captureImage: ScreenshotImage;
      captureMetadata: {
        _type: string;
        captureDate: string;
        pageTitle: string;
        pageUrl: string;
        captureMethod: string;
        captureMode: string;
        deviceTypes: string[];
        path: string;
      };
    }
    
    const updateObj: UpdateObject = {
      captureImage: {
        _type: 'screenshotImage',
        captureDate: new Date().toISOString(),
        captureMode: captureMode,
        capturedBreakpoints: Object.keys(assetRefs),
        alt: `Responsive screenshots of ${docTitle}`,
        caption: `Captured from ${frontendUrl} (${captureMode}) on ${new Date().toLocaleString()}`
      },
      captureMetadata: {
        _type: 'object',
        captureDate: captureMetadata.timestamp,
        pageTitle: captureMetadata.title,
        pageUrl: captureMetadata.url,
        captureMethod: 'server-side-playwright',
        captureMode: captureMode,
        deviceTypes: Object.keys(assetRefs),
        path: captureMetadata.path,
      }
    };
    
    // Add the screenshot assets that were successfully captured
    for (const [breakpoint, assetRef] of Object.entries(assetRefs)) {
      const fieldName = getBreakpointFieldName(breakpoint);
      
      updateObj.captureImage[fieldName] = {
        _type: 'image',
        asset: assetRef
      };
    }
    
    // Update the document with the new images and metadata
    if (statusContainer) {
      statusContainer.textContent = 'Updating document with screenshots...';
    }
    
    try {
      console.log(`Updating document ${targetDocId} with screenshots for mode: ${captureMode}`);
      await client.patch(targetDocId).set(updateObj).commit();
      
      // Show success message
      if (statusContainer) {
        statusContainer.textContent = 'Screenshots captured and saved successfully!';
        statusContainer.style.background = '#38a169';
        
        // Remove after 3 seconds
        setTimeout(() => {
          if (window.document.body.contains(statusContainer)) {
            window.document.body.removeChild(statusContainer);
          }
        }, 3000);
      } else {
        alert('Responsive screenshots captured successfully!');
      }
      
      // Clean up old images after successful update
      if (oldAssetCount > 0) {
        // Add a little delay to make sure the update has fully processed
        setTimeout(async () => {
          try {
            if (statusContainer) {
              statusContainer.textContent = 'Cleaning up old screenshot images...';
            }
            
            // Only delete old images for breakpoints we've successfully captured
            let deletedCount = 0;
            
            for (const [breakpoint, assetRef] of Object.entries(oldAssetRefs)) {
              // Check if we captured a new image for this breakpoint
              if (assetRefs[breakpoint]) {
                try {
                  await client.delete(assetRef);
                  console.log(`Deleted old ${breakpoint} screenshot image: ${assetRef}`);
                  deletedCount++;
                } catch (deleteError) {
                  console.warn(`Could not delete old ${breakpoint} image ${assetRef}:`, deleteError);
                  // Continue with other deletions even if one fails
                }
              }
            }
            
            if (deletedCount > 0) {
              console.log(`Successfully cleaned up ${deletedCount} old screenshot images`);
            } else {
              console.log('No old images needed deletion');
            }
          } catch (cleanupError) {
            console.error('Error cleaning up old screenshots:', cleanupError);
            // This is non-critical, so we don't show an error alert
          }
        }, 1000);
      }
    } catch (patchError) {
      console.error('Error updating document:', patchError);
      
      if (statusContainer) {
        statusContainer.textContent = `Error saving screenshots: ${patchError.message}`;
        statusContainer.style.background = '#e53e3e';
        
        // Remove after 5 seconds for error messages
        setTimeout(() => {
          if (window.document.body.contains(statusContainer)) {
            window.document.body.removeChild(statusContainer);
          }
        }, 5000);
      } else {
        alert(`Error saving screenshots: ${patchError.message}`);
      }
    }
    
    onComplete?.();
    
  } catch (error) {
    console.error('Error capturing screenshots:', error);
    
    if (statusContainer && typeof window !== 'undefined') {
      statusContainer.textContent = `Error: ${error.message}`;
      statusContainer.style.background = '#e53e3e';
      
      // Remove after 5 seconds
      setTimeout(() => {
        if (window.document.body.contains(statusContainer)) {
          window.document.body.removeChild(statusContainer);
        }
      }, 5000);
    } else {
      alert(`Error capturing screenshots: ${error.message}`);
    }
    
    onComplete?.();
  }
}

// Add a helper function to map API breakpoint names to Sanity field names
function getBreakpointFieldName(breakpoint: string): string {
  switch (breakpoint) {
    case '2xl': return 'twoXlImage';
    case '3xl': return 'threeXlImage';
    case '4xl': return 'fourXlImage';
    case '5xl': return 'fiveXlImage';
    default: return `${breakpoint}Image`;
  }
}