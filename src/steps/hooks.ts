import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;
setDefaultTimeout(60000);

Before(async function () {
  browser = await chromium.launch({
    channel: 'chrome', 
    headless: false,
  });
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page; 
});

After(async function () {
  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});
