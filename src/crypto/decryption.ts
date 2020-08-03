import { generateKey } from './key';
import { ALGORITHM, SALT_LENGTH, IV_LENGTH } from './constants';
import { fromBase64, encode, decode } from './utils';

const decrypt = (iv: Uint8Array, key: CryptoKey, data: Uint8Array): Promise<ArrayBuffer> =>
  window.crypto.subtle.decrypt({ name: ALGORITHM, iv }, key, data);

const parseSalt = (encrypted: Uint8Array): Uint8Array => encrypted.slice(0, SALT_LENGTH);

const parseIv = (encrypted: Uint8Array): Uint8Array => encrypted.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);

const parseData = (encrypted: Uint8Array): Uint8Array => encrypted.slice(SALT_LENGTH + IV_LENGTH);

const decryptAndDecode = (password: Uint8Array, salt: Uint8Array, iv: Uint8Array, data: Uint8Array): Promise<string> =>
  generateKey(password, salt)
    .then(key => decrypt(iv, key, data))
    .then(decode);

const parseDataAndDecrypt = (data: Uint8Array, password: Uint8Array): Promise<string> =>
  decryptAndDecode(password, parseSalt(data), parseIv(data), parseData(data));

export const decryptData = (data: string, password: string): Promise<string> =>
  parseDataAndDecrypt(fromBase64(data), encode(password));
