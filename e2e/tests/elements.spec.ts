import { Browser, BrowserContext, Page, launch } from 'puppeteer';

import { PageRepresentation } from '../utils/page-representation';

describe('Elements', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await launch();
  });

  beforeEach(async () => {
    context = await browser.createIncognitoBrowserContext();
    page = await context.newPage();

    await page.goto('http://localhost:8080');
  });

  afterEach(async () => await context.close());

  afterAll(async () => await browser.close());

  it('should contain password input', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getPasswordInput()).toBeTruthy();
  });

  it('should contain data input', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getDataInput()).toBeTruthy();
  });

  it('should contain encrypt button', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getEncryptButton()).toBeTruthy();
  });

  it('should contain decrypt button', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getDecryptButton()).toBeTruthy();
  });

  it('should contain status element', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getStatusElement()).toBeTruthy();
  });

  it('should contain result input', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getResultInput()).toBeTruthy();
  });

  it('should contain copy button', async () => {
    const pageRepresentation = new PageRepresentation(page);

    expect(await pageRepresentation.getCopyButton()).toBeTruthy();
  });
});
