/**
 * This script handles the screenshot capture message from Sanity Studio
 * It should be included in your frontend layout component
 * 
 * IMPLEMENTATION INSTRUCTIONS:
 * 1. This file uses the html2canvas library, which needs to be installed:
 *    yarn add html2canvas
 *    or
 *    npm install html2canvas
 * 
 * 2. If npm install isn't working, you can include the script directly:
 *    Add <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
 *    to your layout.tsx file in the head section
 */

// For TypeScript support, declare html2canvas if not using the npm package
interface Window {
  html2canvas?: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
}

export const setupFrontendCapture = () => {
  // Only run in the browser
  if (typeof window === 'undefined') return;

  console.log('[Frontend Capture] Setup initialized');

  // Set up a flag to track if capture is in progress
  let captureInProgress = false;

  // Listen for capture request from Sanity Studio
  window.addEventListener('message', async (event) => {
    // Debug log to check if messages are received
    console.log('[Frontend Capture] Message received:', event.data);
    
    // Verify the message type
    if (event.data?.type !== 'CAPTURE_SCREENSHOT') return;

    // Avoid duplicate captures
    if (captureInProgress) {
      console.log('[Frontend Capture] Capture already in progress, ignoring duplicate request');
      return;
    }

    captureInProgress = true;
    console.log('[Frontend Capture] Screenshot capture requested');
    
    try {
      // Wait a moment for any loading to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get page metadata for the response
      const title = document.title;
      const url = window.location.href;
      const path = window.location.pathname;

      // Try capturing using HTML2Canvas first
      try {
        if (window.html2canvas) {
          console.log('[Frontend Capture] Using html2canvas directly');
          
          try {
            // Temporarily modify problematic CSS to avoid oklab color function errors
            const tempStyles = document.createElement('style');
            tempStyles.textContent = `
              /* Override problematic CSS color functions during capture */
              [style*="oklab"] {
                color: #333333 !important;
                background-color: #FFFFFF !important;
              }
              :root {
                --color-fg: #333333 !important;
                --color-bg: #FFFFFF !important;
              }
            `;
            document.head.appendChild(tempStyles);
            
            const canvas = await window.html2canvas(document.documentElement, {
              allowTaint: true,
              useCORS: true,
              scale: 1,
              backgroundColor: null,
              logging: true,
              onclone: (clonedDoc) => {
                // Further simplify problematic styles in the cloned document
                const elements = clonedDoc.querySelectorAll('*');
                elements.forEach(el => {
                  if (!(el instanceof HTMLElement)) return;
                  const style = window.getComputedStyle(el);
                  if (style.color.includes('oklab') || style.backgroundColor.includes('oklab')) {
                    el.style.color = '#333333';
                    el.style.backgroundColor = '#FFFFFF';
                  }
                });
              }
            });
            
            // Remove temporary styles
            document.head.removeChild(tempStyles);
            
            // Convert canvas to base64 image data
            const imageData = canvas.toDataURL('image/png');
            console.log('[Frontend Capture] Image captured with html2canvas');
            
            // Send the image data back to Sanity Studio
            window.opener?.postMessage({
              type: 'SCREENSHOT_CAPTURED',
              imageData,
              metadata: {
                title,
                url,
                path,
                timestamp: new Date().toISOString(),
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                captureMethod: 'html2canvas'
              }
            }, '*');
            
            captureInProgress = false;
            return;
          } catch (htmlCanvasError) {
            console.error('[Frontend Capture] html2canvas failed:', htmlCanvasError);
            // Continue to browser API method
          }
        }
      } catch (err) {
        console.error('[Frontend Capture] Error in html2canvas attempt:', err);
        // Continue to browser API method
      }

      // Direct browser capture method
      console.log('[Frontend Capture] Trying browser API capture');
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        // For browsers that don't support getDisplayMedia API
        sendFallbackImage();
        return;
      }
      
      // Show a manual capture button as a fallback for Brave users
      // since Brave's permission dialog might be causing issues
      const captureContainer = document.createElement('div');
      captureContainer.style.position = 'fixed';
      captureContainer.style.top = '10px';
      captureContainer.style.left = '10px';
      captureContainer.style.zIndex = '999999';
      captureContainer.style.padding = '10px';
      captureContainer.style.backgroundColor = 'white';
      captureContainer.style.border = '2px solid blue';
      captureContainer.style.borderRadius = '5px';
      captureContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
      
      const captureMessage = document.createElement('div');
      captureMessage.textContent = 'Sanity Studio Screenshot Tool';
      captureMessage.style.marginBottom = '10px';
      captureMessage.style.fontWeight = 'bold';
      
      const captureHelp = document.createElement('div');
      captureHelp.textContent = 'If Brave is blocking auto-capture, click below:';
      captureHelp.style.marginBottom = '10px';
      captureHelp.style.fontSize = '12px';
      
      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Capture Screenshot';
      captureBtn.style.padding = '5px 10px';
      captureBtn.style.backgroundColor = '#4CAF50';
      captureBtn.style.color = 'white';
      captureBtn.style.border = 'none';
      captureBtn.style.borderRadius = '3px';
      captureBtn.style.cursor = 'pointer';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.padding = '5px 10px';
      cancelBtn.style.backgroundColor = '#f44336';
      cancelBtn.style.color = 'white';
      cancelBtn.style.border = 'none';
      cancelBtn.style.borderRadius = '3px';
      cancelBtn.style.cursor = 'pointer';
      cancelBtn.style.marginLeft = '10px';
      
      captureContainer.appendChild(captureMessage);
      captureContainer.appendChild(captureHelp);
      captureContainer.appendChild(captureBtn);
      captureContainer.appendChild(cancelBtn);
      
      document.body.appendChild(captureContainer);
      
      // Hide the container after a timeout (30 seconds)
      const containerTimeout = setTimeout(() => {
        if (document.body.contains(captureContainer)) {
          document.body.removeChild(captureContainer);
        }
        captureInProgress = false;
      }, 30000);
      
      // Cancel button handler
      cancelBtn.addEventListener('click', () => {
        clearTimeout(containerTimeout);
        if (document.body.contains(captureContainer)) {
          document.body.removeChild(captureContainer);
        }
        sendFallbackImage('User cancelled capture');
        captureInProgress = false;
      });
      
      // Capture button handler
      captureBtn.addEventListener('click', async () => {
        try {
          // Hide the capture UI before taking the screenshot
          captureContainer.style.display = 'none';
          
          // Wait a brief moment for UI to update
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Try again with html2canvas since we now have explicit user action
          if (window.html2canvas) {
            try {
              const canvas = await window.html2canvas(document.documentElement, {
                allowTaint: true,
                useCORS: true,
                scale: 1
              });
              
              const imageData = canvas.toDataURL('image/png');
              
              window.opener?.postMessage({
                type: 'SCREENSHOT_CAPTURED',
                imageData,
                metadata: {
                  title,
                  url,
                  path,
                  timestamp: new Date().toISOString(),
                  captureMethod: 'manual-html2canvas'
                }
              }, '*');
              
              // Clean up
              clearTimeout(containerTimeout);
              if (document.body.contains(captureContainer)) {
                document.body.removeChild(captureContainer);
              }
              captureInProgress = false;
              return;
            } catch (err) {
              console.error('[Frontend Capture] Manual html2canvas failed:', err);
              // Show the UI again if capture failed
              captureContainer.style.display = 'block';
            }
          }
          
          // Try browser API as fallback
          try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ 
              video: { 
                // @ts-ignore - mediaSource is valid but not in TypeScript definitions
                mediaSource: 'screen' 
              } 
            });
            
            // Create a video element to capture the stream
            const video = document.createElement('video');
            video.srcObject = stream;
            
            // Once the video is ready, capture a frame
            video.onloadedmetadata = () => {
              video.play();
              
              // Create a canvas to draw the video frame
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              
              // Draw the video frame to the canvas
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              // Stop the stream
              stream.getTracks().forEach(track => track.stop());
              
              // Convert to image data
              const imageData = canvas.toDataURL('image/png');
              
              // Send back to Sanity Studio
              window.opener?.postMessage({
                type: 'SCREENSHOT_CAPTURED',
                imageData,
                metadata: {
                  title,
                  url,
                  path,
                  timestamp: new Date().toISOString(),
                  captureMethod: 'manual-browser-api'
                }
              }, '*');
              
              // Clean up
              clearTimeout(containerTimeout);
              if (document.body.contains(captureContainer)) {
                document.body.removeChild(captureContainer);
              }
              captureInProgress = false;
            };
          } catch (err) {
            console.error('[Frontend Capture] Manual browser API capture failed:', err);
            // Show the UI again if capture failed
            captureContainer.style.display = 'block';
          }
        } catch (err) {
          console.error('[Frontend Capture] Error in manual capture:', err);
          // Fallback to placeholder
          clearTimeout(containerTimeout);
          if (document.body.contains(captureContainer)) {
            document.body.removeChild(captureContainer);
          }
          sendFallbackImage('Manual capture failed');
          captureInProgress = false;
        }
      });
      
      // Also try auto-capture at the same time (this will work in Chrome, Firefox, etc.)
      try {
        // Try to get permission for screen capture
        navigator.mediaDevices.getDisplayMedia({ 
          video: { 
            // @ts-ignore - mediaSource is valid but not in TypeScript definitions
            mediaSource: 'screen' 
          } 
        }).then(stream => {
          // We got permission, now capture the screen
          const video = document.createElement('video');
          video.srcObject = stream;
          
          video.onloadedmetadata = () => {
            // Hide the capture UI since auto-capture worked
            clearTimeout(containerTimeout);
            if (document.body.contains(captureContainer)) {
              document.body.removeChild(captureContainer);
            }
            
            video.play();
            
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Stop the stream
            stream.getTracks().forEach(track => track.stop());
            
            // Convert to image data
            const imageData = canvas.toDataURL('image/png');
            
            // Send back to Sanity Studio
            window.opener?.postMessage({
              type: 'SCREENSHOT_CAPTURED',
              imageData,
              metadata: {
                title,
                url,
                path,
                timestamp: new Date().toISOString(),
                captureMethod: 'auto-browser-api'
              }
            }, '*');
            
            captureInProgress = false;
          };
        }).catch(err => {
          console.error('[Frontend Capture] Auto browser API capture failed:', err);
          // No need to do anything here, we already have the manual UI showing
        });
      } catch (err) {
        console.error('[Frontend Capture] Error in auto capture setup:', err);
        // No need to do anything here, we already have the manual UI showing
      }
    } catch (error) {
      console.error('[Frontend Capture] Error capturing screenshot:', error);
      sendFallbackImage(error.message);
      captureInProgress = false;
    }
  });
  
  // Helper function to send a fallback image
  const sendFallbackImage = (errorMessage = 'Screenshot capture failed') => {
    console.log('[Frontend Capture] Sending fallback image');
    
    // Create a fallback image
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Draw a placeholder
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add page title
    ctx.font = '24px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(document.title || 'Website Screenshot', canvas.width / 2, 60);
    
    // Add URL
    ctx.font = '14px Arial';
    ctx.fillText(window.location.href, canvas.width / 2, 90);
    
    // Capture visible content as text
    try {
      // Get text content from the page
      const contentText = document.body.innerText.substring(0, 500) + '...';
      
      // Split into lines
      const lines = contentText.split(/\n/).filter(line => line.trim().length > 0);
      const topLines = lines.slice(0, 10);
      
      // Add content preview
      ctx.font = '12px Arial';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'left';
      
      topLines.forEach((line, index) => {
        // Truncate long lines
        const truncatedLine = line.substring(0, 80) + (line.length > 80 ? '...' : '');
        ctx.fillText(truncatedLine, 50, 150 + (index * 20));
      });
    } catch (e) {
      console.error('Error capturing text content:', e);
    }
    
    // Add error message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(`Error: ${errorMessage}`, canvas.width / 2, canvas.height - 100);
    ctx.fillText('This is a fallback image with page metadata', canvas.width / 2, canvas.height - 70);
    
    // Convert to image data
    const imageData = canvas.toDataURL('image/png');
    
    // Send back to Sanity Studio
    window.opener?.postMessage({
      type: 'SCREENSHOT_CAPTURED',
      imageData,
      metadata: {
        title: document.title,
        url: window.location.href,
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
        captureMethod: 'fallback',
        error: errorMessage
      }
    }, '*');
  };
  
  console.log('[Frontend Capture] Setup complete, ready to capture screenshots');
};

/**
 * HTML2Canvas function - this is a placeholder
 * 
 * IMPORTANT: Replace this with the actual html2canvas library
 * After installing html2canvas:
 * 1. Import at the top of this file: import html2canvas from 'html2canvas'
 * 2. Delete this placeholder function
 */
async function html2canvas(element: HTMLElement, options?: any): Promise<HTMLCanvasElement> {
  console.warn('Using placeholder html2canvas function - replace with the actual library');
  
  // Create a canvas
  const canvas = document.createElement('canvas');
  canvas.width = options?.windowWidth || window.innerWidth;
  canvas.height = options?.windowHeight || window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  // Draw a placeholder
  if (ctx) {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('Screenshot placeholder - install html2canvas', canvas.width / 2, canvas.height / 2);
  }
  
  return canvas;
} 