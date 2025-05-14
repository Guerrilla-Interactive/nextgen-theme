import { NextRequest, NextResponse } from 'next/server';
import { chromium, devices } from 'playwright';

// Define viewport sizes for all CSS breakpoints
const breakpointViewports = {
  xs: { width: 480, height: 800 },
  sm: { width: 640, height: 800 },
  md: { width: 768, height: 1024 },
  lg: { width: 1024, height: 768 },
  xl: { width: 1420, height: 900 },
  '2xl': { width: 1600, height: 900 },
  '3xl': { width: 1800, height: 1000 },
  '4xl': { width: 2000, height: 1100 },
  '5xl': { width: 2200, height: 1200 },
};

// Create all breakpoint device settings
const breakpointSettings = {};

// Generate settings for each breakpoint
Object.entries(breakpointViewports).forEach(([breakpoint, viewport]) => {
  // Use desktop-like settings for larger screens, mobile-like for smaller
  const isMobile = viewport.width < 768;
  
  breakpointSettings[breakpoint] = {
    userAgent: isMobile 
      ? devices['iPhone 13'].userAgent
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport,
    deviceScaleFactor: isMobile ? 2 : 1,
    isMobile,
    hasTouch: isMobile,
  };
});

// Helper function to take a screenshot for a specific breakpoint
async function captureScreenshotForBreakpoint(url: string, breakpoint: string, isDraft: boolean, timeout: number) {
  console.log(`Capturing ${isDraft ? 'DRAFT' : 'PUBLISHED'} ${breakpoint} screenshot of ${url}`);
  
  // Get device config
  const deviceConfig = breakpointSettings[breakpoint];
  
  if (!deviceConfig) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`);
  }
    
  // Launch headless browser
  const browser = await chromium.launch();
  
  try {
    // Create context with device emulation
    const context = await browser.newContext({
      ...deviceConfig,
      viewport: deviceConfig.viewport
    });
    
    // Create new page
    const page = await context.newPage();
    
    // Extract hostname from url to determine enable endpoint
    const urlObj = new URL(url);
    const origin = urlObj.origin;
    
    // If capturing draft content, enable draft mode first
    if (isDraft) {
      try {
        console.log('Enabling draft mode...');
        
        // The draft mode enable URL with required parameters
        const draftModeUrl = `${origin}/api/draft-mode/enable?slug=${encodeURIComponent(urlObj.pathname)}&source=server-screenshot`;
        console.log(`Navigating to draft mode enablement: ${draftModeUrl}`);
        
        // Navigate to the draft mode enablement endpoint
        await page.goto(draftModeUrl, { 
          waitUntil: 'networkidle',
          timeout: 20000
        });
        
        // Check if we have the necessary cookie
        const cookies = await context.cookies();
        const hasDraftCookie = cookies.some(c => 
          c.name === '__prerender_bypass' || c.name === '__next_preview_data');
        
        if (hasDraftCookie) {
          console.log('Draft mode enabled successfully, draft cookies found');
        } else {
          console.warn('Draft cookies not found, draft mode may not work correctly');
        }
        
        // Wait a moment for everything to settle
        await page.waitForTimeout(1000);
      } catch (draftError) {
        console.error('Error enabling draft mode:', draftError);
        // Continue anyway
      }
    }
    
    // Navigate to the actual URL
    console.log(`Navigating to page: ${url}`);
    await page.goto(url, { 
      waitUntil: 'load',
      timeout: timeout
    });
    
    // Then wait for network activity to settle
    try {
      await page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (networkIdleError) {
      console.log('Network did not become idle, continuing with screenshot anyway');
    }
    
    // Wait for content to be fully loaded
    console.log('Waiting for content to render...');
    await page.waitForTimeout(3000);
    
    // Take screenshot
    console.log(`Taking ${breakpoint} screenshot...`);
    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: true
    });
    
    // Close browser
    await browser.close();
    
    return screenshot;
  } catch (error) {
    // Make sure to close browser even if there's an error
    await browser.close();
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { 
      url, 
      width,
      height,
      timeout = 60000,
      isDraft = false,
      deviceType = 'all' // Keep for backward compatibility
    } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Determine which breakpoints to capture based on deviceType
    let breakpointsToCapture: string[] = [];
    
    if (deviceType === 'all') {
      // Use all breakpoints 
      breakpointsToCapture = Object.keys(breakpointViewports);
    } else if (typeof deviceType === 'string' && deviceType.includes(',')) {
      // Parse comma-separated list of breakpoints
      breakpointsToCapture = deviceType.split(',').filter(bp => 
        // Only include valid breakpoints
        Object.keys(breakpointViewports).includes(bp)
      );
    } else if (Object.keys(breakpointViewports).includes(deviceType)) {
      // Single valid breakpoint
      breakpointsToCapture = [deviceType];
    } else {
      // Invalid device type - default to all breakpoints
      breakpointsToCapture = Object.keys(breakpointViewports);
    }
    
    // If no valid breakpoints were found, return an error
    if (breakpointsToCapture.length === 0) {
      return NextResponse.json({ 
        error: 'No valid breakpoints specified', 
        message: 'No valid breakpoints found in deviceType parameter' 
      }, { status: 400 });
    }

    console.log(`Capturing ${breakpointsToCapture.length} breakpoints for ${url} (isDraft: ${isDraft}): ${breakpointsToCapture.join(', ')}`);
    
    const screenshots: Record<string, string | null> = {};
    
    // Capture screenshots for each selected breakpoint
    for (const breakpoint of breakpointsToCapture) {
      try {
        console.log(`Capturing ${breakpoint} screenshot...`);
        const screenshot = await captureScreenshotForBreakpoint(url, breakpoint, isDraft, timeout);
        
        // No need to map names anymore
        // Convert screenshot to base64 for JSON response
        const base64 = Buffer.from(screenshot).toString('base64');
        screenshots[breakpoint] = base64;
        console.log(`Successfully captured ${breakpoint} screenshot`);
      } catch (deviceError) {
        console.error(`Error capturing ${breakpoint} screenshot:`, deviceError);
        screenshots[breakpoint] = null; // Indicate this breakpoint failed
      }
    }
    
    // Check if all screenshots failed
    const allFailed = Object.values(screenshots).every(s => s === null);
    
    if (allFailed) {
      return NextResponse.json({ 
        error: 'Failed to capture any screenshots', 
        message: 'All breakpoints failed' 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      screenshots,
      capturedBreakpoints: Object.keys(screenshots).filter(bp => screenshots[bp] !== null)
    });
  } catch (error) {
    console.error('Screenshot error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to capture screenshot', message: errorMessage }, 
      { status: 500 }
    );
  }
}

// Also support GET requests for testing in browser
export async function GET(request: NextRequest) {
  const url = new URL(request.url).searchParams.get('url');
  const width = parseInt(new URL(request.url).searchParams.get('width') || '0');
  const height = parseInt(new URL(request.url).searchParams.get('height') || '0');
  const timeout = parseInt(new URL(request.url).searchParams.get('timeout') || '60000');
  const isDraft = new URL(request.url).searchParams.get('draft') === 'true';
  // Keep deviceType parameter for backward compatibility
  const deviceType = new URL(request.url).searchParams.get('device') || 'all';
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  
  // Call the same logic as POST
  return POST(
    new Request(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, width, height, timeout, isDraft, deviceType })
    }) as NextRequest
  );
} 