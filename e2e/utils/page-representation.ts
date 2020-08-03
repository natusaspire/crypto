import { Page, ElementHandle } from 'puppeteer';

export class PageRepresentation {
  private static readonly PASSWORD_INPUT_SELECTOR = 'input#password';
  private static readonly DATA_INPUT_SELECTOR = 'input#data';
  private static readonly RESULT_INPUT_SELECTOR = 'input#result';
  private static readonly ENCRYPT_BUTTON_SELECTOR = 'button#encrypt';
  private static readonly DECRYPT_BUTTON_SELECTOR = 'button#decrypt';
  private static readonly COPY_BUTTON_SELECTOR = 'button#copy';
  private static readonly STATUS_ELEMENT_SELECTOR = 'span#status';

  public constructor(private readonly _page: Page) {}

  public get page(): Page {
    return this._page;
  }

  public getPasswordInput(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.PASSWORD_INPUT_SELECTOR);
  }

  public getDataInput(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.DATA_INPUT_SELECTOR);
  }

  public getResultInput(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.RESULT_INPUT_SELECTOR);
  }

  public getStatusElement(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.STATUS_ELEMENT_SELECTOR);
  }

  public getEncryptButton(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.ENCRYPT_BUTTON_SELECTOR);
  }

  public getDecryptButton(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.DECRYPT_BUTTON_SELECTOR);
  }

  public getCopyButton(): Promise<ElementHandle<Element>> {
    return this._page.$(PageRepresentation.COPY_BUTTON_SELECTOR);
  }

  public enterPassword(password: string): Promise<void> {
    return this._page.type(PageRepresentation.PASSWORD_INPUT_SELECTOR, password);
  }

  public enterData(data: string): Promise<void> {
    return this._page.type(PageRepresentation.DATA_INPUT_SELECTOR, data);
  }

  public encrypt(): Promise<void> {
    return this._page.click(PageRepresentation.ENCRYPT_BUTTON_SELECTOR);
  }

  public decrypt(): Promise<void> {
    return this._page.click(PageRepresentation.DECRYPT_BUTTON_SELECTOR);
  }

  public getStatus(): Promise<string> {
    return this.getStatusElement().then(element => this._page.evaluate(({ textContent }) => textContent, element));
  }

  public getResult(): Promise<string> {
    return this.getResultInput().then(element => this._page.evaluate(({ value }) => value, element));
  }
}
