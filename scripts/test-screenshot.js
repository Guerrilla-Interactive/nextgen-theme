// Test script to verify Playwright browser installation
const { chromium } = require('playwright');

async function testScreenshot() {
  console.log('Starting Playwright screenshot test...');
  
  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    console.log('Browser launched successfully');
    console.log('Browser version:', await browser.version());
    
    // Create a new page
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to a test page
    await page.goto('https://example.com');
    console.log('Navigated to example.com');
    
    // Take a screenshot
    await page.screenshot({ path: 'test-screenshot.png' });
    console.log('Screenshot captured successfully');
    
    // Close browser
    await browser.close();
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error testing Playwright:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

testScreenshot(); 