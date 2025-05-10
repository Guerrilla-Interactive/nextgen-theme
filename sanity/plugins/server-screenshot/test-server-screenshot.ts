/**
 * Test utility for server screenshots
 * Run with: pnpm tsx sanity/plugins/server-screenshot/test-server-screenshot.ts
 */

import { projectId, dataset } from '../../env';

async function testServerScreenshot() {
  // Get the current host from the environment or use localhost
  const host = process.env.VERCEL_URL || 
               process.env.NEXT_PUBLIC_VERCEL_URL || 
               'http://localhost:3000';
  
  console.log(`Starting server screenshot test on ${host}`);
  
  // Test a URL that should work
  const testUrl = `${host}/about`;  // Use a real page slug that exists on your site
  
  try {
    console.log(`Capturing screenshots for ${testUrl}`);
    
    // Test the "all" breakpoints mode (default)
    console.log('\nTesting all CSS breakpoints capture...');
    await testApiEndpoint(testUrl, 'all');
    
    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

async function testApiEndpoint(url: string, deviceType: string) {
  const apiUrl = `/api/screenshot`;
  
  console.log(`Calling API endpoint: ${apiUrl}`);
  console.log(`Parameters: URL=${url}, deviceType=${deviceType}`);
  
  try {
    // Make request to the API
    const response = await fetch(`http://localhost:3000${apiUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url,
        deviceType,
        isDraft: false  // Set to true to test draft mode
      })
    });
    
    // Check response
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      const errorData = await response.json();
      console.error('Error details:', errorData);
      return;
    }
    
    // Check content type - response will be JSON with all breakpoints
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const result = await response.json();
      console.log('JSON response received:', {
        success: result.success,
        capturedBreakpoints: result.capturedBreakpoints || [],
        breakpointCount: Object.keys(result.screenshots || {}).length,
        breakpoints: Object.keys(result.screenshots || {}),
        screenshotSizes: Object.entries(result.screenshots || {}).map(([breakpoint, base64]) => {
          // Check if screenshot is a string (base64)
          const size = typeof base64 === 'string' ? 
            `${Math.round((base64.length * 0.75) / 1024)}KB` : 'null';
          return `${breakpoint}: ${size}`;
        })
      });
    } else {
      console.log(`Unexpected content type: ${contentType}`);
    }
  } catch (error) {
    console.error(`Error testing screenshot API:`, error);
  }
}

// Only run if called directly 
if (typeof require !== 'undefined' && require.main === module) {
  testServerScreenshot();
}

export { testServerScreenshot }; 