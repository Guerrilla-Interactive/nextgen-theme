import React, { useEffect, useState, useCallback } from 'react'
import {ImageInput, useDocumentStore, useClient} from 'sanity'
import {Button, Flex, Text, Stack, Box, Card, Spinner, Switch, Tooltip, Checkbox, Grid, Label} from '@sanity/ui'
import { serviceSlugVariables } from "@/app/(main)/service/[slug]/_service-slug-core-utilities/service-slug.translations-and-variables";
import { courseSlugVariables } from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.translations-and-variables";
import { projectId, dataset } from '@/sanity/env';
import { captureServerScreenshot } from './index';

// Define the type for document details state
interface DocumentDetails {
  type: string | null;
  hasSlug: boolean;
  isSupported: boolean;
  forceSupportPageSlug?: boolean;
  parentDocumentId?: string;
  parentDocumentType?: string;
  slug?: string;
}

// Add this interface at the top of the file with the other interfaces
interface SanityImageValue {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  };
}

// Debug log function with context
const debugLog = (context, ...args) => {
  console.log(`[ServerScreenshot:${context}]`, ...args);
};

// Safely stringify objects for debugging
const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj, (key, value) => {
      // Handle circular references and functions
      if (typeof value === 'function') return '[Function]';
      if (key && key.startsWith('_')) return '[Internal]';
      // Handle Sanity references specifically
      if (key === 'asset' && value && value._ref) {
        return { _type: '[Internal]', _ref: value._ref.split('-')[0] + '...' };
      }
      return value;
    }, 2);
  } catch (e) {
    return '[Cannot stringify: ' + e.message + ']';
  }
};

// Convert any value to a safe string for React
const toSafeString = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    // Try to get a useful string representation
    if (value?._type) return String(value._type);
    if (value?.name) return String(value.name);
    if (value?.title) return String(value.title);
    return '[object]';
  }
  return String(value);
};

// Get document ID from URL pathname
const getDocumentIdFromUrl = () => {
  if (typeof window === 'undefined') return null;
  
  // URL format in Sanity Studio is typically /desk/page-slug;documentId
  const path = window.location.pathname;
  const parts = path.split(';');
  if (parts.length >= 2) {
    return parts[parts.length - 1]; // Get the last part after any semicolons
  }
  
  // Alternative path formats 
  const segments = path.split('/').filter(Boolean);
  if (segments.length >= 2) {
    return segments[segments.length - 1]; // Last path segment
  }
  
  return null;
};

// Add this sorting function near the top of the file
// Create a function to get breakpoint "weight" for sorting
function getBreakpointWeight(key: string): number {
  if (key === 'fiveXlImage') return 100;
  if (key === 'fourXlImage') return 90;
  if (key === 'threeXlImage') return 80;
  if (key === 'twoXlImage') return 70;
  if (key === 'xlImage') return 60;
  if (key === 'lgImage') return 50;
  if (key === 'mdImage') return 40;
  if (key === 'smImage') return 30;
  if (key === 'xsImage') return 20;
  return 0; // Default for unknown fields
}

// Helper function to convert Sanity field name to breakpoint ID
function getBreakpointId(fieldName: string): string {
  fieldName = fieldName.replace('Image', '');
  if (fieldName === 'twoXl') return '2xl';
  if (fieldName === 'threeXl') return '3xl';
  if (fieldName === 'fourXl') return '4xl';
  if (fieldName === 'fiveXl') return '5xl';
  return fieldName;
}

// Helper function to map breakpoint ID to display name
function getDisplayName(breakpointId: string): string {
  if (breakpointId === '2xl') return '2XL';
  if (breakpointId === '3xl') return '3XL';
  if (breakpointId === '4xl') return '4XL';
  if (breakpointId === '5xl') return '5XL';
  return breakpointId.toUpperCase();
}

// Define the available breakpoints and their display info
const breakpoints = [
  { id: '5xl', name: '5XL', width: 2200, description: '(2200px)' },
  { id: '4xl', name: '4XL', width: 2000, description: '(2000px)' },
  { id: '3xl', name: '3XL', width: 1800, description: '(1800px)' },
  { id: '2xl', name: '2XL', width: 1600, description: '(1600px)' },
  { id: 'xl', name: 'XL', width: 1420, description: '(1420px)' },
  { id: 'lg', name: 'LG', width: 1024, description: '(1024px)' },
  { id: 'md', name: 'MD', width: 768, description: '(768px)' },
  { id: 'sm', name: 'SM', width: 640, description: '(640px)' },
  { id: 'xs', name: 'XS', width: 480, description: '(480px)' }
];

// Default selected breakpoints - choose 4 with largest distance between them
const defaultSelectedBreakpoints = ['5xl', 'xl', 'md', 'xs'];

export function ServerScreenshotInput(props) {
  // Perform safety checks on props
  if (!props) {
    console.error('ServerScreenshotInput received null or undefined props');
    return <div>Error: Invalid component props</div>;
  }

  // Log important props for debugging
  debugLog('Init', {
    hasValue: !!props.value,
    hasChangeFn: typeof props.onChange === 'function',
    schemaType: props.schemaType ? 
      (typeof props.schemaType === 'string' ? props.schemaType : props.schemaType.name) : 'undefined',
    pathExists: !!props.path,
    pathType: props.path ? (Array.isArray(props.path) ? 'array' : typeof props.path) : 'undefined'
  });

  const {value, onChange, document: fieldDocument, schemaType, type, path} = props
  const documentStore = useDocumentStore();
  const client = useClient({apiVersion: '2024-01-01'});
  const [parentDocument, setParentDocument] = useState(null);
  const [documentDetails, setDocumentDetails] = useState<DocumentDetails>({ 
    type: null, 
    hasSlug: false,
    isSupported: false
  });
  const [debugInfo, setDebugInfo] = useState({
    urlDocId: null,
    foundSlug: null,
    pathInfo: null
  });
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const [captureProgress, setCaptureProgress] = useState('');
  const [mainMethodSucceeded, setMainMethodSucceeded] = useState(false);
  const [captureDraft, setCaptureDraft] = useState(true);
  const [hasDraftVersion, setHasDraftVersion] = useState(false);
  // Remove device selection - always use 'all'
  const selectedDevice = 'all';
  const [documentVersionInfo, setDocumentVersionInfo] = useState({
    draftExists: false, 
    publishedExists: false,
    draftId: null,
    publishedId: null
  });
  
  // Get active document ID
  const documentId = fieldDocument?._id || parentDocument?._id;

  // Add state for selected breakpoints
  const [selectedBreakpoints, setSelectedBreakpoints] = useState<string[]>(defaultSelectedBreakpoints);

  // Function to check document versions - separated so we can reuse it
  const checkDocumentVersions = useCallback(async (docId) => {
    if (!docId || !client) return;
    
    // Extract the base ID (without drafts. prefix if present)
    const baseId = docId.startsWith('drafts.') ? docId.substring(7) : docId;
    const draftId = `drafts.${baseId}`;
    
    debugLog('CheckingVersions', {
      documentId: docId,
      baseId,
      draftId
    });
    
    try {
      // Check for both draft and published versions
      const [draftDoc, publishedDoc] = await Promise.all([
        client.fetch(`*[_id == $id][0]`, {id: draftId}),
        client.fetch(`*[_id == $id][0]`, {id: baseId})
      ]);
      
      const hasDraft = !!draftDoc;
      const hasPublished = !!publishedDoc;
      
      debugLog('VersionStatus', { 
        hasDraft, 
        hasPublished,
        draftId,
        publishedId: baseId,
        timestamp: new Date().toISOString()
      });
      
      // Store results
      setDocumentVersionInfo({
        draftExists: hasDraft,
        publishedExists: hasPublished,
        draftId: hasDraft ? draftId : null,
        publishedId: hasPublished ? baseId : null
      });
      
      // Update hasDraftVersion state
      setHasDraftVersion(hasDraft);
      
      // Set default capture mode based on available versions
      if (!hasDraft && hasPublished) {
        // Only published exists, switch to published mode
        setCaptureDraft(false);
      } else if (hasDraft) {
        // Draft exists, default to draft mode
        setCaptureDraft(true);
      }
    } catch (err) {
      console.error('Error checking document versions:', err);
    }
  }, [client]);

  // Set up real-time listeners for document changes
  useEffect(() => {
    if (!documentId || !documentStore) return;
    
    // Extract base ID for consistent listening
    const baseId = documentId.startsWith('drafts.') ? documentId.substring(7) : documentId;
    const draftId = `drafts.${baseId}`;
    
    debugLog('SetupListener', { baseId, draftId });
    
    // Check versions initially
    checkDocumentVersions(documentId);
    
    // Set up a single listener for any document changes to either version
    // Use a wider query to catch changes to either draft or published version
    const listener = documentStore.listenQuery(
      `*[_id == $draftId || _id == $publishedId]`, 
      { draftId, publishedId: baseId },
      {}
    ).subscribe({
      next: (results) => {
        // When any changes happen, recheck document versions
        debugLog('DocumentChanged', { changesDetected: true, numResults: results?.length ?? 0 });
        
        // Schedule a check slightly delayed to ensure Sanity has updated
        setTimeout(() => {
          checkDocumentVersions(documentId);
        }, 200);
      },
      error: (error) => {
        console.error('Error in document listener:', error);
      }
    });
    
    // Clean up listener on unmount
    return () => {
      listener.unsubscribe();
    };
  }, [documentId, documentStore, checkDocumentVersions]);
  
  // Add a polling interval as a backup to catch any missed changes
  useEffect(() => {
    if (!documentId) return;
    
    // Set up a periodic check every 3 seconds
    const intervalId = setInterval(() => {
      checkDocumentVersions(documentId);
    }, 3000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [documentId, checkDocumentVersions]);

  // Attempt to get document ID from URL
  useEffect(() => {
    const docId = getDocumentIdFromUrl();
    setDebugInfo(prev => ({ ...prev, urlDocId: docId }));
    
    if (docId && documentStore) {
      // Directly query document using document ID
      documentStore.listenQuery(
        `*[_id == $id][0]`, 
        {id: docId},
        {}
      ).subscribe(result => {
        if (result) {
          debugLog('DocFromURL', `Found document: ${result._id}, type: ${result._type}, slug: ${result.slug?.current}`);
          setParentDocument(result);
          setDebugInfo(prev => ({ 
            ...prev, 
            foundSlug: result.slug?.current || null
          }));
        }
      });
    }
  }, [documentStore]);

  // Get the parent document when this component is used within a field
  useEffect(() => {
    if (!fieldDocument || !path) return;
    
    // Log path info for debugging
    setDebugInfo(prev => ({
      ...prev,
      pathInfo: Array.isArray(path) ? path.join('/') : String(path)
    }));
    
    try {
      // Determine if we're in a field
      const isFieldComponent = path && Array.isArray(path) && path.length > 0;
      
      if (isFieldComponent) {
        debugLog('FieldPath', path);
        
        // We're inside a field, try to get the parent document ID
        // First check if we're directly in the document
        if (props.parent && props.parent.document) {
          const parentDoc = props.parent.document;
          debugLog('ParentDoc', `Found from props: ${parentDoc._id}, type: ${parentDoc._type}, slug: ${parentDoc.slug?.current}`);
          setParentDocument(parentDoc);
          setDebugInfo(prev => ({ 
            ...prev, 
            foundSlug: parentDoc.slug?.current || null
          }));
        }
        // If not found, try to get from the document store
        else if (documentStore) {
          // Try to determine parent document ID from context
          // This assumes we're in a field of a document being edited
          // Get the current document being edited
          const currentEditingId = Array.isArray(path) && path.length > 0 && path[0] === 'captureImage' ? 
            window.location.pathname.split('/').pop() : null;
          
          if (currentEditingId) {
            debugLog('CurrentEditing', `ID from path: ${currentEditingId}`);
            // Use listenQuery with parameters
            documentStore.listenQuery(
              `*[_id == $id][0]`, 
              {id: currentEditingId},
              {}, // Empty options object
            ).subscribe(result => {
              if (result) {
                debugLog('ParentDocStore', `Found from store: ${result._id}, type: ${result._type}, slug: ${result.slug?.current}`);
                setParentDocument(result);
                setDebugInfo(prev => ({ 
                  ...prev, 
                  foundSlug: result.slug?.current || null
                }));
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error getting parent document:', error);
    }
  }, [fieldDocument, path, props, documentStore]);
  
  // Extract document type and slug information
  useEffect(() => {
    try {
      // Detect if we're in an image field of a supported document type
      const isImageField = 
        schemaType === 'image' || 
        schemaType === 'screenshotImage' ||
        (typeof schemaType === 'object' && 
         (schemaType?.name === 'image' || schemaType?.name === 'screenshotImage'));
      
      debugLog('SchemaType', {
        isImageField,
        schemaTypeValue: schemaType,
        schemaTypeName: typeof schemaType === 'object' ? schemaType?.name : schemaType
      });
      
      // Determine document type from available sources
      let documentType = null;
      let parentDocumentId = null;
      
      // Check if we have a parent document with supported type
      if (parentDocument) {
        parentDocumentId = parentDocument._id;
        if (parentDocument._type) {
          documentType = parentDocument._type;
        }
      }
      // Fallbacks if no parent document found
      else if (fieldDocument && fieldDocument._type) {
        documentType = fieldDocument._type;
      }
      else if (typeof schemaType === 'string') {
        documentType = schemaType;
      }
      else if (typeof schemaType === 'object' && schemaType?.name) {
        documentType = schemaType.name;
      }
      
      // Make sure documentType is a string
      if (documentType && typeof documentType !== 'string') {
        documentType = String(documentType);
      }
      
      debugLog('DocumentType', {
        documentType,
        fromParent: !!parentDocument,
        fromField: !!fieldDocument,
        fromSchema: typeof schemaType === 'object' ? !!schemaType?.name : false
      });
      
      // Check if this is a supported type
      const supportedTypes = ['page-slug', 'blog-slug', 
        serviceSlugVariables("DOCUMENT_TYPE"), 
        courseSlugVariables("DOCUMENT_TYPE")
      ];
      
      // Direct check for supported types
      const isDirectlySupported = !!documentType && 
        supportedTypes.includes(documentType);
      
      // Special case for image field within a supported document type
      const isInSupportedDocument = isImageField && 
        parentDocument && 
        parentDocument._type && 
        supportedTypes.includes(parentDocument._type);
        
      // Force enable in known capture field path
      const forceSupportPageSlug = !!(
        isImageField && 
        path && 
        Array.isArray(path) && 
        path.length > 0 && 
        (path[0] === 'captureImage' || path.includes('captureImage'))
      );
      
      // Get the slug from either parent or field document
      let slug = null;
      if (parentDocument?.slug?.current) {
        slug = parentDocument.slug.current;
      } else if (fieldDocument?.slug?.current) {
        slug = fieldDocument.slug.current;
      } else if (debugInfo.foundSlug) {
        // Use the slug found from direct query if available
        slug = debugInfo.foundSlug;
      }
      
      // Check if the document has a slug
      const hasSlug = !!slug;
      
      debugLog('SupportCheck', {
        isDirectlySupported, 
        isInSupportedDocument, 
        forceSupportPageSlug,
        hasSlug,
        slug
      });
      
      setDocumentDetails({
        type: documentType,
        hasSlug,
        isSupported: isDirectlySupported || isInSupportedDocument || forceSupportPageSlug,
        forceSupportPageSlug,
        parentDocumentId,
        parentDocumentType: parentDocument?._type,
        slug
      });
    } catch (error) {
      console.error('Error in document type detection:', error);
      // Set fallback values
      setDocumentDetails({
        type: 'unknown',
        hasSlug: false,
        isSupported: true, // Force enable to allow capturing
        slug: debugInfo.foundSlug
      });
    }
  }, [fieldDocument, schemaType, parentDocument, path, props, debugInfo.foundSlug]);

  const handleServerCapture = async () => {
    try {
      // Safety check for onChange function
      if (typeof onChange !== 'function') {
        debugLog('CaptureError', 'onChange is not a function', onChange);
        alert('Cannot save screenshot: internal error (missing onChange handler)');
        return;
      }

      // Check if any breakpoints are selected
      if (selectedBreakpoints.length === 0) {
        alert('Please select at least one breakpoint to capture');
        return;
      }

      // Debug log the current state before starting
      debugLog('CaptureStart', {
        documentDetails,
        value,
        path,
        docId: parentDocument?._id || fieldDocument?._id || 'unknown',
        captureMode: captureDraft ? 'draft' : 'published',
        selectedBreakpoints
      });

      setIsCapturing(true);
      setCaptureError(null);
      setMainMethodSucceeded(false);
      setCaptureProgress('Preparing capture...');
      
      // Get the document info - either from parent document or field document
      const doc = parentDocument || fieldDocument;
      
      // Create mock props object expected by captureServerScreenshot
      const serverScreenshotProps = {
        documentId: doc?._id,
        getClient: () => client,
        onComplete: () => {
          setIsCapturing(false);
          setCaptureProgress('');
        },
        schemaType: documentDetails.type || documentTypeString,
        selectedBreakpoints: selectedBreakpoints
      };
      
      // Call the server screenshot function with the selected breakpoints instead of 'all'
      try {
        await captureServerScreenshot(serverScreenshotProps, selectedBreakpoints, captureDraft);
      } catch (error) {
        console.error('Error in server screenshot capture:', error);
        setCaptureError(error.message);
        setIsCapturing(false);
      }
    } catch (error) {
      console.error('Error capturing screenshots:', error);
      debugLog('CaptureError', {
        error: error.message,
        stack: error.stack
      });
      setCaptureError(error.message);
      setIsCapturing(false);
      setCaptureProgress('');
    }
  };

  // Toggle breakpoint selection
  const toggleBreakpoint = (breakpointId: string) => {
    setSelectedBreakpoints(prev => {
      if (prev.includes(breakpointId)) {
        // Remove this breakpoint
        return prev.filter(id => id !== breakpointId);
      } else {
        // Add this breakpoint
        return [...prev, breakpointId];
      }
    });
  };

  // Select/deselect all breakpoints
  const selectAll = (select: boolean) => {
    if (select) {
      setSelectedBreakpoints(breakpoints.map(bp => bp.id));
    } else {
      setSelectedBreakpoints([]);
    }
  };

  // Check if we have a slug to use from any source
  const hasSlug = !!documentDetails.slug || 
                 !!parentDocument?.slug?.current || 
                 !!fieldDocument?.slug?.current ||
                 !!debugInfo.foundSlug;

  // Safely get document type as string
  const documentTypeString = toSafeString(documentDetails.type || schemaType || 'unknown');
  const parentDocumentTypeString = documentDetails.parentDocumentType ? 
    `(in ${documentDetails.parentDocumentType})` : '';

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" radius={2}>
        <Stack space={3}>
          {/* <Text size={2} weight="semibold">Server-Side Screenshot Tool</Text> */}
          
          {/* <Card padding={2} tone={documentDetails.isSupported ? "positive" : "caution"} radius={2}>
            <Stack space={2}>
              <Text size={1}>
                Document type: {documentTypeString} {parentDocumentTypeString}
                {documentDetails.isSupported ? ' (supported)' : ' (not supported)'}
                {documentDetails.forceSupportPageSlug ? ' - Force enabled for page-slug' : ''}
              </Text>
              {documentDetails.slug && (
                <Text size={1}>Found slug: {documentDetails.slug}</Text>
              )}
              {debugInfo.foundSlug && (
                <Text size={1}>URL slug: {debugInfo.foundSlug}</Text>
              )}
              <Text size={1}>
                Draft version: <span style={{color: documentVersionInfo.draftExists ? 'green' : 'orange'}}>{documentVersionInfo.draftExists ? 'Available' : 'Not available'}</span>
              </Text>
              <Text size={1}>
                Published version: <span style={{color: documentVersionInfo.publishedExists ? 'green' : 'orange'}}>{documentVersionInfo.publishedExists ? 'Available' : 'Not available'}</span>
              </Text>
            </Stack>
          </Card> */}

          <Stack space={3}>
            <Flex align="center" gap={4} padding={2}>
              <Text size={1}>Capture {captureDraft ? 'draft' : 'published'} version</Text>
              <Tooltip
                content={documentVersionInfo.draftExists ? 
                  `Switch to capture ${captureDraft ? 'published' : 'draft'} version` : 
                  'No draft version available'
                }
                portal
              >
                <Switch 
                  checked={captureDraft}
                  onChange={() => setCaptureDraft(!captureDraft)}
                  disabled={captureDraft && !documentVersionInfo.draftExists || !captureDraft && !documentVersionInfo.publishedExists}
                />
              </Tooltip>
            </Flex>
            
            <Card padding={3} marginY={2} radius={1} tone="primary" shadow={1}>
              <Stack space={3}>
                {/* <Text size={1} weight="semibold">Select breakpoints to capture</Text> */}
                
                {/* <Flex justify="space-between" padding={1}>
                  <Button 
                    mode="ghost" 
                    text="Select All" 
                    onClick={() => selectAll(true)}
                    size={1}
                  />
                  <Button 
                    mode="ghost" 
                    text="Deselect All" 
                    onClick={() => selectAll(false)}
                    size={1}
                  />
                </Flex> */}
                
                <Grid columns={[1, 2, 6]} gap={[2, 3, 4]}>
                  {breakpoints.map(breakpoint => (
                    <Flex key={breakpoint.id} align="center" padding={1}>
                      <Checkbox
                        id={`breakpoint-${breakpoint.id}`}
                        checked={selectedBreakpoints.includes(breakpoint.id)}
                        onChange={() => toggleBreakpoint(breakpoint.id)}
                      />
                      <Box paddingLeft={2}>
                        <Label htmlFor={`breakpoint-${breakpoint.id}`} size={1}>
                          {breakpoint.name} {breakpoint.description}
                        </Label>
                      </Box>
                    </Flex>
                  ))}
                </Grid>
                
                <Text size={0} muted={true}>
                  {selectedBreakpoints.length} breakpoint{selectedBreakpoints.length !== 1 ? 's' : ''} selected
                </Text>
              </Stack>
            </Card>
          </Stack>
          
          {captureError && (
            <Card padding={2} tone="critical" radius={2}>
              <Text size={1}>Error: {captureError}</Text>
            </Card>
          )}
          
          {isCapturing ? (
            <Card padding={3} radius={2}>
              <Flex align="center" justify="center" direction="column" gap={3}>
                <Spinner />
                <Text size={1}>{captureProgress || `Capturing ${selectedBreakpoints.length} breakpoint${selectedBreakpoints.length !== 1 ? 's' : ''}...`}</Text>
              </Flex>
            </Card>
          ) : (
            <Button 
              text={`Capture ${selectedBreakpoints.length} Selected Breakpoint${selectedBreakpoints.length !== 1 ? 's' : ''} (${captureDraft ? 'Draft' : 'Published'})`} 
              onClick={handleServerCapture} 
              tone="positive" 
              disabled={!hasSlug || selectedBreakpoints.length === 0}
              style={{width: '100%'}}
            />
          )}
          
          {/* Display existing screenshots */}
          {value && (
            <Stack space={3}>
              <Text size={1} weight="semibold">
                Existing screenshots
              </Text>
              
              {/* Display all breakpoint screenshots that exist in value */}
              {Object.entries(value)
                .filter(([key]) => key.endsWith('Image'))
                .sort((a, b) => getBreakpointWeight(a[0]) - getBreakpointWeight(b[0]))
                .reverse() // Reverse to get largest first
                .map(([key, imgValue]) => {
                  // Only process image fields
                  if (imgValue) {
                    // Type guard to check if this is a Sanity image
                    const isImageObject = 
                      typeof imgValue === 'object' && 
                      imgValue !== null &&
                      '_type' in imgValue && 
                      'asset' in imgValue &&
                      imgValue.asset && 
                      typeof imgValue.asset === 'object' &&
                      '_ref' in imgValue.asset;
                    
                    if (isImageObject) {
                      const fieldName = key.replace('Image', '');
                      const breakpointId = getBreakpointId(fieldName);
                      const image = imgValue as SanityImageValue;
                      
                      // Get display name for this breakpoint
                      const displayName = getDisplayName(breakpointId);
                      
                      // Get the width for each breakpoint for display
                      let width = '';
                      if (breakpointId === 'xs') width = '(480px)';
                      if (breakpointId === 'sm') width = '(640px)'; 
                      if (breakpointId === 'md') width = '(768px)';
                      if (breakpointId === 'lg') width = '(1024px)';
                      if (breakpointId === 'xl') width = '(1420px)';
                      if (breakpointId === '2xl') width = '(1600px)';
                      if (breakpointId === '3xl') width = '(1800px)';
                      if (breakpointId === '4xl') width = '(2000px)';
                      if (breakpointId === '5xl') width = '(2200px)';
                      
                      return (
                        <Card key={key} padding={2} radius={2}>
                          <Stack space={2}>
                            <Text size={1} weight="semibold">{displayName} {width}</Text>
                            <Box>
                              <img 
                                src={`https://cdn.sanity.io/images/${projectId}/${dataset}/${image.asset._ref.replace('image-', '').replace(/(-jpg|-png|-webp)$/, '.$1').replace('-jpg', 'jpg').replace('-png', 'png').replace('-webp', '.webp')}`}
                                alt={`${breakpointId} screenshot`}
                                style={{width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain'}}
                              />
                            </Box>
                          </Stack>
                        </Card>
                      );
                    }
                  }
                  return null;
                })}
              
              {/* Additional metadata fields */}
              <Card padding={2} radius={2}>
                <Stack space={2}>
                  <Text size={1} weight="semibold">Metadata</Text>
                  {value.captureDate && (
                    <Text size={1}>Captured on: {new Date(value.captureDate).toLocaleString()}</Text>
                  )}
                  {value.captureMode && (
                    <Text size={1}>Version: {value.captureMode}</Text>
                  )}
                  {value.capturedBreakpoints && (
                    <Text size={1}>Breakpoints: {Array.isArray(value.capturedBreakpoints) 
                      ? value.capturedBreakpoints.join(', ') 
                      : typeof value.capturedBreakpoints === 'string' 
                        ? value.capturedBreakpoints 
                        : 'unknown'}</Text>
                  )}
                </Stack>
              </Card>
            </Stack>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}