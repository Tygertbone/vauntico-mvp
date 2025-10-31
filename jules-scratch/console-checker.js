import { chromium } from '@playwright/test';

const urls = [
  '/',
  '/pricing',
  '/creator-pass',
  '/r2k-challenge',
  '/vault'
];

(async () => {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    let hasErrors = false;

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Internal Server Error')) {
        console.error(`Internal Server Error on ${page.url()}: ${text}`);
        hasErrors = true;
      }
    });

    for (const url of urls) {
      console.log(`Checking ${url} for internal server errors...`);
      await page.goto(`http://localhost:5173${url}`, { waitUntil: 'networkidle' });
    }

    if (hasErrors) {
      console.log('\nFound internal server errors during the audit.');
      process.exit(1);
    } else {
      console.log('\nNo internal server errors found on any page.');
    }

  } catch (error) {
    console.error('An error occurred during the console check:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
