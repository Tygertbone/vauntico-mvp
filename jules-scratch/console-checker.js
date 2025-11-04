import { chromium } from '@playwright/test';

const urls = [
  '/',
  '/pricing',
  '/creator-pass',
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
      const type = msg.type();
      if (type === 'error' || type === 'warn') {
        console.log(`[${type.toUpperCase()}] on ${page.url()}: ${msg.text()}`);
        hasErrors = true;
      }
    });

    for (const url of urls) {
      console.log(`Checking ${url} for console errors...`);
      await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' });
    }

    if (hasErrors) {
      console.log('\nFound console errors or warnings during the audit.');
      process.exit(1);
    } else {
      console.log('\nNo console errors or warnings found on any page.');
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
