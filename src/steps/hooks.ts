// src/steps/hooks.ts
import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {
  browser = await chromium.launch({
    channel: 'chrome', // use real Chrome
    headless: false,
  });
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page; // attach to Cucumber world
});

After(async function () {
  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});
