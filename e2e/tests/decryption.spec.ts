import { Browser, BrowserContext, Page, launch } from 'puppeteer';

import { PageRepresentation } from '../utils/page-representation';
import { getDataAndPassword } from '../utils/crypto';

describe('Decryption', () => {
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

  describe('decryption is in progress', () => {
    it('should set DECRYPTION_IN_PROGRESS status', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { encryptedData, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(encryptedData);
      await pageRepresentation.decrypt();

      expect(await pageRepresentation.getStatus()).toBe('Decrypting...');
    });

    it('should type empty string into result input', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { encryptedData, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(encryptedData);
      await pageRepresentation.decrypt();

      expect(await pageRepresentation.getResult()).toBe('');
    });
  });

  describe('decryption is complete', () => {
    it('should set DECRYPTION_SUCCESSFUL status', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { encryptedData, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(encryptedData);
      await pageRepresentation.decrypt();
      await pageRepresentation.page.waitForTimeout(1000);

      expect(await pageRepresentation.getStatus()).toBe('Decryption successful');
    });

    it('should type decrypted data into result input', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { data, encryptedData, password } = getDataAndPassword();

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(encryptedData);
      await pageRepresentation.decrypt();
      await pageRepresentation.page.waitForTimeout(1000);

      expect(await pageRepresentation.getResult()).toBe(data);
    });
  });

  describe('decryption failed', () => {
    it('should set DECRYPTION_FAILED status', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { encryptedData, password } = getDataAndPassword(false);

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(encryptedData);
      await pageRepresentation.decrypt();
      await pageRepresentation.page.waitForTimeout(1000);

      expect(await pageRepresentation.getStatus()).toBe(
        'Decryption failed, please check your data and password and try again'
      );
    });

    it('should type empty string into result input', async () => {
      const pageRepresentation = new PageRepresentation(page);
      const { encryptedData, password } = getDataAndPassword(false);

      await pageRepresentation.enterPassword(password);
      await pageRepresentation.enterData(encryptedData);
      await pageRepresentation.decrypt();
      await pageRepresentation.page.waitForTimeout(1000);

      expect(await pageRepresentation.getResult()).toBe('');
    });
  });
});
