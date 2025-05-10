import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // System information
    const info = {
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      node: process.version,
      system: process.platform,
      arch: process.arch,
      memory: process.env.VERCEL ? process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE : 'unlimited',
      timestamp: new Date().toISOString(),
      playwrightInstalled: false,
      playwrightVersion: null,
      chromiumFound: false,
      chromiumPath: null
    };
    
    // Check if Playwright is installed
    try {
      // Check if we can import playwright
      const { chromium } = require('playwright');
      info.playwrightInstalled = true;
      
      // Get package version
      const packageJsonPath = path.resolve(process.cwd(), 'node_modules/playwright/package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        info.playwrightVersion = packageJson.version;
      }
      
      // Check for chromium binary without launching
      const playwrightPath = path.join(
        process.cwd(), 
        'node_modules', 
        '.pnpm',
        'playwright-core@1.52.0',
        'node_modules',
        'playwright-core',
        '.local-browsers'
      );
      
      if (fs.existsSync(playwrightPath)) {
        try {
          const files = fs.readdirSync(playwrightPath);
          const chromiumDir = files.find(file => file.includes('chromium'));
          
          if (chromiumDir) {
            info.chromiumFound = true;
            info.chromiumPath = path.join(playwrightPath, chromiumDir);
          }
        } catch (err) {
          console.log('Error checking browser files:', err);
        }
      }
    } catch (error) {
      console.log('Error checking Playwright:', error);
    }
    
    return NextResponse.json({
      status: 'ok',
      info
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      node: process.version
    }, { status: 500 });
  }
} 