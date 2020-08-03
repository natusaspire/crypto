import { decryptData } from './decryption';

describe('decryptData', () => {
  it('should be defined', () => {
    expect(decryptData).toBeDefined();
  });

  it('should decrypt encrypted data when password is correct', async () => {
    const encrypted = 'mcC558NgehROxpUCW/AZAlwef94GMx1kzsL4ih7V4+uBdWMgsn/XRcy56LYbZYe3';
    const decrypted = 'data';
    const password = 'password';

    await expectAsync(decryptData(encrypted, password)).toBeResolvedTo(decrypted);
  });

  it('should decrypt encrypted data when correct password is empty string', async () => {
    const encrypted = 'FXslK/refyG0iCu1y7gUyXTNsLX1wUXUf4x00FNdC/LrkFBoKzNftsOP4ljyKBtq';
    const decrypted = 'data';
    const password = '';

    await expectAsync(decryptData(encrypted, password)).toBeResolvedTo(decrypted);
  });

  it('should throw error when password is incorrect', async () => {
    const encrypted = 'mcC558NgehROxpUCW/AZAlwef94GMx1kzsL4ih7V4+uBdWMgsn/XRcy56LYbZYe3';
    const password = 'PASSWORD';

    await expectAsync(decryptData(encrypted, password)).toBeRejectedWithError();
  });
});
