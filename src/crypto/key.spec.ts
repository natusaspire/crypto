import { generateKey } from './key';

describe('generateKey', () => {
  it('should be defined', () => {
    expect(generateKey).toBeDefined();
  });

  it('should generate crypto key that is secret', async () => {
    const password = new Uint8Array();
    const salt = new Uint8Array();

    const key = await generateKey(password, salt);

    expect(key.type).toBe('secret');
  });

  it('should generate crypto key that is not extractable', async () => {
    const password = new Uint8Array();
    const salt = new Uint8Array();

    const key = await generateKey(password, salt);

    expect(key.extractable).toBeFalse();
  });

  it('should generate crypto key with "encrypt" and "decrypt" usages', async () => {
    const password = new Uint8Array();
    const salt = new Uint8Array();

    const key = await generateKey(password, salt);

    expect(key.usages).toEqual(['encrypt', 'decrypt']);
  });

  it('should generate crypto key with "AES-256-CBC" algorithm', async () => {
    const password = new Uint8Array();
    const salt = new Uint8Array();
    const length = 256;
    const algorithm = 'AES-CBC';

    const key = await generateKey(password, salt);

    expect(key.algorithm).toEqual({ name: algorithm, length } as AesDerivedKeyParams);
  });
});
