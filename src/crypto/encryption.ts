import { generateKey } from './key';
import { ALGORITHM, SALT_LENGTH, IV_LENGTH } from './constants';
import { toBase64, encode } from './utils';

const encrypt = (iv: Uint8Array, key: CryptoKey, data: Uint8Array): Promise<ArrayBuffer> =>
  window.crypto.subtle.encrypt({ name: ALGORITHM, iv }, key, data);

const getCryptoRandomValues = (length: number): Uint8Array => window.crypto.getRandomValues(new Uint8Array(length));

const generateSalt = (): Uint8Array => getCryptoRandomValues(SALT_LENGTH);

const generateIv = (): Uint8Array => getCryptoRandomValues(IV_LENGTH);

const formatEncrypted = (salt: Uint8Array, iv: Uint8Array, data: Uint8Array): string =>
  toBase64([...salt, ...iv, ...data]);

const encryptAndFormat = (password: Uint8Array, salt: Uint8Array, iv: Uint8Array, data: Uint8Array): Promise<string> =>
  generateKey(password, salt)
    .then(key => encrypt(iv, key, data))
    .then(encrypted => formatEncrypted(salt, iv, new Uint8Array(encrypted)));

const generateSaltWithIvAndEncrypt = (data: Uint8Array, password: Uint8Array): Promise<string> =>
  encryptAndFormat(password, generateSalt(), generateIv(), data);

export const encryptData = (data: string, password: string): Promise<string> =>
  generateSaltWithIvAndEncrypt(encode(data), encode(password));
