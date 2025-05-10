import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import fs from 'fs';
import { execSync } from 'child_process';

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
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport,
    deviceScaleFactor: isMobile ? 2 : 1,
    isMobile,
    hasTouch: isMobile,
  };
});

// Find Chrome executable on the system
function findChromeExecutable() {
  // Only run in non-Vercel environments
  if (process.env.VERCEL) {
    return null;
  }
  
  // Common Chrome paths on different systems
  const possiblePaths = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/usr/local/bin/chromium',
    '/opt/google/chrome/chrome'
  ];
  
  // Check if any of the paths exist
  for (const path of possiblePaths) {
    try {
      if (fs.existsSync(path)) {
        console.log(`Found Chrome at: ${path}`);
        return path;
      }
    } catch (error) {
      console.log(`Error checking path ${path}:`, error);
    }
  }
  
  // Try to find Chrome using 'which' command if available
  try {
    const chromePath = execSync('which google-chrome || which chromium-browser || which chromium').toString().trim();
    if (chromePath) {
      console.log(`Found Chrome via 'which' command at: ${chromePath}`);
      return chromePath;
    }
  } catch (error) {
    console.log('Error running which command:', error.message);
  }
  
  // Default to null if not found
  console.log('Chrome executable not found on the system');
  return null;
}

// Import node-canvas as a fallback if available
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  Canvas = null;
  console.log('Canvas module not available for fallback rendering');
}

// Helper function to take a screenshot for a specific breakpoint
async function captureScreenshotForBreakpoint(url: string, breakpoint: string, isDraft: boolean, timeout: number) {
  console.log(`Capturing ${isDraft ? 'DRAFT' : 'PUBLISHED'} ${breakpoint} screenshot of ${url}`);
  
  // Get device config
  const deviceConfig = breakpointSettings[breakpoint];
  
  if (!deviceConfig) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`);
  }
  
  // Browser arguments for headless operation
  const browserArgs = [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--no-zygote',
    '--disable-accelerated-2d-canvas',
    '--single-process',
    '--headless=new',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-extensions',
    '--disable-component-extensions-with-background-pages',
    '--disable-default-apps',
    '--mute-audio',
    '--hide-scrollbars'
  ];

  let browser;
  
  try {
    console.log(`Running in ${process.env.VERCEL ? 'Vercel' : 'local'} environment`);
    
    // Find Chrome executable for local development only
    const chromeExecutablePath = !process.env.VERCEL ? findChromeExecutable() : null;
    
    const launchOptions = {
      args: browserArgs,
      headless: true,
    };
    
    // Only set executablePath in local development
    if (chromeExecutablePath) {
      launchOptions['executablePath'] = chromeExecutablePath;
    }
    
    // Launch browser with appropriate options
    browser = await chromium.launch(launchOptions);
    
    // Create context with device emulation
    const context = await browser.newContext({
      ...deviceConfig,
      viewport: deviceConfig.viewport,
      bypassCSP: true,
      ignoreHTTPSErrors: true
    });
    
    // Print diagnostics
    console.log('Browser version:', await browser.version());

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
    
    // Take screenshot with optimized settings
    console.log(`Taking ${breakpoint} screenshot...`);
    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: true,
      // Optimize screenshot quality for production
      quality: 85,
      scale: 'device',
      omitBackground: false
    });
    
    return screenshot;
  } catch (error) {
    console.error('Screenshot capture error:', error);
    throw error;
  } finally {
    // Make sure to close browser even if there's an error
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
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
    
    // Try to use Playwright for screenshots
    let playwrightAvailable = true;
    
    try {
      // Test if Playwright is available by launching a browser briefly
      const browser = await chromium.launch({
        args: ['--no-sandbox', '--headless=new'],
        headless: true
      });
      await browser.close();
    } catch (error) {
      console.warn('Playwright not available, using fallback mode:', error.message);
      playwrightAvailable = false;
    }
    
    // Capture screenshots for each selected breakpoint
    for (const breakpoint of breakpointsToCapture) {
      try {
        console.log(`Capturing ${breakpoint} screenshot...`);
        
        let screenshot;
        
        if (playwrightAvailable) {
          // Use normal Playwright screenshot
          screenshot = await captureScreenshotForBreakpoint(url, breakpoint, isDraft, timeout);
        } else {
          // Fallback to a placeholder when Playwright isn't available
          screenshot = await generatePlaceholderImage(
            breakpointViewports[breakpoint].width, 
            breakpointViewports[breakpoint].height,
            url,
            breakpoint
          );
        }
        
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
      capturedBreakpoints: Object.keys(screenshots).filter(bp => screenshots[bp] !== null),
      usingFallback: !playwrightAvailable
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

// Fallback function to generate a placeholder image when Playwright is unavailable
async function generatePlaceholderImage(width, height, url, breakpoint) {
  const buffer = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#f0f0f0" />
    <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" fill="#666">
      Screenshot Unavailable
    </text>
    <text x="50%" y="55%" font-family="Arial" font-size="14" text-anchor="middle" fill="#666">
      URL: ${url}
    </text>
    <text x="50%" y="60%" font-family="Arial" font-size="14" text-anchor="middle" fill="#666">
      Breakpoint: ${breakpoint} (${width}x${height})
    </text>
  </svg>`);
  
  // Use canvas if available for more sophisticated fallback
  if (Canvas) {
    try {
      const { createCanvas, loadImage } = Canvas;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      
      // Fill with light gray background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);
      
      // Add text
      ctx.fillStyle = '#333';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Screenshot Unavailable', width/2, height/2);
      
      ctx.font = '14px Arial';
      ctx.fillText(`URL: ${url}`, width/2, height/2 + 30);
      ctx.fillText(`Breakpoint: ${breakpoint} (${width}x${height})`, width/2, height/2 + 50);
      
      return canvas.toBuffer();
    } catch (canvasError) {
      console.error('Error generating canvas fallback:', canvasError);
    }
  }
  
  // Return the SVG buffer if Canvas fails or isn't available
  return buffer;
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