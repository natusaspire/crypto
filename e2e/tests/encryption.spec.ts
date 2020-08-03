import { Browser, BrowserContext, Page, launch } from 'puppeteer';

import { PageRepresentation } from '../utils/page-representation';
import { getDataAndPassword } from '../utils/crypto';

describe('Encryption', () => {
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

  describe('encryption is in progress', () => {
    it('should set ENCRYPTION_IN_PROGRESS status', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { data, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(data);
      await pageRepresentation.encrypt();

      expect(await pageRepresentation.getStatus()).toBe('Encrypting...');
    });

    it('should type empty string into result input', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { data, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(data);
      await pageRepresentation.encrypt();

      expect(await pageRepresentation.getResult()).toBe('');
    });
  });

  describe('encryption is complete', () => {
    it('should set ENCRYPTION_SUCCESSFUL status', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { data, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(data);
      await pageRepresentation.encrypt();
      await pageRepresentation.page.waitForTimeout(1000);

      expect(await pageRepresentation.getStatus()).toBe('Encryption successful');
    });

    it('should type encrypted data into result input', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { data, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(data);
      await pageRepresentation.encrypt();
      await pageRepresentation.page.waitForTimeout(1000);

      expect(await pageRepresentation.getResult()).not.toBe('');
    });
  });
});
