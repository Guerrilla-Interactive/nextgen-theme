// Direct configuration object for Playwright
// No need to use defineConfig since it's not exported from playwright-core

// Configuration optimized for server-side screenshots in production environments
export default {
  // Limit the resources used by Playwright
  workers: 1,
  use: {
    // Use minimal viewport to reduce memory usage
    viewport: { width: 1280, height: 720 },
    // Don't download much content
    bypassCSP: true,
    // Reduce load time by ignoring non-critical resources
    ignoreHTTPSErrors: true,
    // Disable slow operations
    video: 'off',
    screenshot: 'off',
    trace: 'off',
    // Use chromium only
    browserName: 'chromium',
    // Serverless-specific options
    launchOptions: {
      // Add chromium browser flags to optimize for serverless environment
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--no-zygote',
        '--disable-accelerated-2d-canvas',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-speech-api',
        '--single-process'
      ]
      // Don't specify executablePath to allow Playwright to use its built-in browser
    }
  },
  // Simple browser server configuration for serverless environments
  browserServer: {
    command: 'chromium',
    env: {
      PLAYWRIGHT_BROWSERS_PATH: '0',
    },
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--disable-extensions',
      ],
      headless: true,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        launchOptions: {
          ignoreDefaultArgs: ['--disable-extensions'],
          executablePath: undefined // Let Playwright use its bundled browser
        },
      },
    },
  ],
}; 