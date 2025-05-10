/**
 * This is a simple test utility for the screenshot API
 * Run with: pnpm tsx app/api/screenshot/test.ts
 * Options:
 *   --draft: Test draft mode
 */

interface TestOptions {
  isDraft?: boolean;
}

async function testScreenshotAPI(options: TestOptions = {}) {
  const { isDraft = false } = options;
  
  try {
    console.log(`Testing screenshot API in ${isDraft ? 'DRAFT' : 'PUBLISHED'} mode for all breakpoints...`);
    
    // Replace with your actual URL
    const testUrl = 'https://example.com';
    const apiEndpoint = 'http://localhost:3000/api/screenshot';
    
    const url = `${apiEndpoint}?url=${encodeURIComponent(testUrl)}${isDraft ? '&draft=true' : ''}`;
    console.log(`Sending request to ${url}`);
    
    // Call API with fetch (browser-like)
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.message || 'Unknown error'}`);
    }
    
    // Check content type
    const contentType = response.headers.get('content-type');
    console.log(`Response content type: ${contentType}`);
    
    if (contentType?.includes('application/json')) {
      const result = await response.json();
      console.log('Successfully received JSON response with screenshots');
      console.log('Captured breakpoints:', result.capturedBreakpoints || []);
      console.log('Number of screenshots:', Object.keys(result.screenshots || {}).length);
      
      // Log size of each screenshot
      if (result.screenshots) {
        Object.entries(result.screenshots).forEach(([breakpoint, base64]) => {
          if (typeof base64 === 'string') {
            console.log(`${breakpoint}: ${Math.round((base64.length * 0.75) / 1024)}KB`);
          } else {
            console.log(`${breakpoint}: null or invalid data`);
          }
        });
      }
    } else {
      console.error('Unexpected content type returned:', contentType);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Only run if called directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: TestOptions = {
    isDraft: args.includes('--draft')
  };
  
  testScreenshotAPI(options);
}

export { testScreenshotAPI }; 