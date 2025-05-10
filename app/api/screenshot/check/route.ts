import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import fs from 'fs';
import { execSync } from 'child_process';

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

// Create a simple SVG with system info
function createInfoSvg(info) {
  const width = 800;
  const height = 600;
  
  const escapeXml = (str) => {
    return str.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };
  
  // Format the information for display
  const infoItems = [
    `Environment: ${info.environment}`,
    `Node.js: ${info.node}`,
    `System: ${info.system} (${info.arch})`,
    `Memory: ${info.memory}`,
    `Chrome: ${info.chrome || 'Not available'}`,
    `Chrome Executable: ${info.chromeExecutable}`,
    `Timestamp: ${info.timestamp}`,
    `Status: ${info.error ? 'Error' : 'OK'}`
  ];
  
  if (info.error) {
    infoItems.push(`Error: ${escapeXml(info.error)}`);
  }
  
  // Create SVG text elements
  let textElements = '';
  infoItems.forEach((item, index) => {
    textElements += `<text x="20" y="${50 + index * 30}" font-family="Arial" font-size="14" fill="${info.error ? '#c00' : '#333'}">${escapeXml(item)}</text>`;
  });
  
  // Create the SVG
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#f0f0f0" />
    <text x="20" y="30" font-family="Arial" font-size="24" fill="#333">System Information</text>
    ${textElements}
  </svg>`);
}

export async function GET(request: NextRequest) {
  try {
    // System information
    const info = {
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      node: process.version,
      system: process.platform,
      arch: process.arch,
      memory: process.env.VERCEL ? process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE : 'unlimited',
      chrome: null,
      chromeExecutable: null,
      flags: null,
      timestamp: new Date().toISOString(),
      error: null
    };
    
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
    
    info.flags = browserArgs;
    
    // Find Chrome executable for local development only
    const chromeExecutablePath = !process.env.VERCEL ? findChromeExecutable() : null;
    info.chromeExecutable = chromeExecutablePath || 'Not used';
    
    let browser;
    let screenshot;
    
    try {
      console.log(`Running in ${process.env.VERCEL ? 'Vercel' : 'local'} environment`);
      
      const launchOptions = {
        args: browserArgs,
        headless: true,
      };
      
      // Only set executablePath in local development
      if (chromeExecutablePath) {
        launchOptions['executablePath'] = chromeExecutablePath;
      }
      
      // Launch browser
      browser = await chromium.launch(launchOptions);
      
      // Get browser version
      info.chrome = await browser.version();
      
      // Test page creation
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('about:blank');
      
      // Check if browser is fully functional
      await page.setContent('<html><body><h1>Playwright Test</h1></body></html>');
      screenshot = await page.screenshot({ type: 'png' });
      
      // Close browser
      await browser.close();
      
      // Add screenshot as base64
      return NextResponse.json({
        status: 'success',
        info,
        screenshot: Buffer.from(screenshot).toString('base64')
      });
    } catch (browserError) {
      if (browser) {
        await browser.close();
      }
      
      // Create fallback screenshot with error info
      info.error = browserError.message;
      screenshot = createInfoSvg(info);
      
      return NextResponse.json({
        status: 'partial',
        message: 'Browser could not be launched, using fallback',
        info,
        error: browserError.message,
        stack: browserError.stack,
        screenshot: Buffer.from(screenshot).toString('base64')
      });
    }
  } catch (error) {
    console.error('Environment check error:', error);
    
    // Create fallback with error info
    const info = {
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      node: process.version,
      system: process.platform,
      arch: process.arch,
      memory: process.env.VERCEL ? process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE : 'unlimited',
      chrome: null,
      chromeExecutable: null,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    const screenshot = createInfoSvg(info);
    
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null,
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      node: process.version,
      screenshot: Buffer.from(screenshot).toString('base64')
    }, { status: 500 });
  }
} 