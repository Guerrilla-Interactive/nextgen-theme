// Helper script to ensure Playwright browsers are installed
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Checking Playwright browser installation...');

// Set environment variable
process.env.PLAYWRIGHT_BROWSERS_PATH = '0';

try {
  // Check if browser binaries exist
  const playwrightPath = path.join(
    process.cwd(), 
    'node_modules', 
    '.pnpm',
    'playwright-core@1.52.0',
    'node_modules',
    'playwright-core',
    '.local-browsers'
  );
  
  console.log('Looking for browsers in:', playwrightPath);
  
  let needsInstall = true;
  
  try {
    if (fs.existsSync(playwrightPath)) {
      const files = fs.readdirSync(playwrightPath);
      console.log('Found files:', files);
      
      if (files.some(file => file.includes('chromium'))) {
        console.log('Chromium browser already installed');
        needsInstall = false;
      }
    }
  } catch (err) {
    console.log('Error checking browser installation:', err);
  }
  
  if (needsInstall) {
    console.log('Installing Playwright browsers...');
    try {
      execSync('npx playwright install chromium', { 
        stdio: 'inherit',
        env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: '0' }
      });
      console.log('Playwright browser installation successful');
    } catch (installError) {
      console.warn('Warning: Could not install Playwright browsers but continuing build anyway.');
      console.warn('Error details:', installError.message);
      console.warn('Screenshot functionality will use fallback mode.');
    }
    
    // Skip system dependencies - not available in serverless environments
    console.log('Skipping system dependencies - not available in serverless environments');
  }
  
  console.log('Playwright browser setup complete');
} catch (error) {
  console.error('Error ensuring Playwright browsers:', error);
  // Don't exit with error to allow build to continue
  console.warn('Screenshot functionality will use fallback mode.');
} 