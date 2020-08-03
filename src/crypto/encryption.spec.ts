import fc from 'fast-check';

import { encryptData } from './encryption';
import { decryptData } from './decryption';

describe('encryptData', () => {
  it('should be defined', () => {
    expect(encryptData).toBeDefined();
  });

  it('should encrypt empty string data when password is not empty string', async () => {
    const data = '';
    const password = 'password';

    await expectAsync(encryptData(data, password)).toBeResolved();
  });

  it('should encrypt data when password is empty string', async () => {
    const data = 'data';
    const password = '';

    await expectAsync(encryptData(data, password)).toBeResolved();
  });

  it('should encrypt empty string data when password is empty string', async () => {
    const data = '';
    const password = '';

    await expectAsync(encryptData(data, password)).toBeResolved();
  });

  it('should encrypt data that can be decrypted', async () => {
    const data = 'data';
    const password = 'password';

    await expectAsync(decryptData(await encryptData(data, password), password)).toBeResolvedTo(data);
  });

  it('should encrypt any unicode string data with any unicode string password', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        async (data, password) => await expectAsync(encryptData(data, password)).toBeResolved()
      )
    );
  });

  it('should encrypt any unicode string data with any unicode string password that can be decrypted', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        async (data, password) =>
          await expectAsync(decryptData(await encryptData(data, password), password)).toBeResolvedTo(data)
      )
    );
  }, 10000);
});
