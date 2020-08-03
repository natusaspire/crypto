import { ITERATIONS, KEY_LENGTH, HASH, ALGORITHM } from './constants';

const KEY_ALGORITHM = 'PBKDF2';

const importKey = (password: Uint8Array): Promise<CryptoKey> =>
  window.crypto.subtle.importKey('raw', password, { name: KEY_ALGORITHM }, false, ['deriveKey']);

const deriveKey = (
  salt: Uint8Array,
  iterations: number,
  hash: string,
  keyMaterial: CryptoKey,
  algorithm: string,
  length: number
): Promise<CryptoKey> =>
  window.crypto.subtle.deriveKey(
    { name: KEY_ALGORITHM, salt, iterations, hash },
    keyMaterial,
    { name: algorithm, length },
    false,
    ['encrypt', 'decrypt']
  );

const pbkdf2 = (
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  length: number,
  hash: string,
  algorithm: string
): Promise<CryptoKey> =>
  importKey(password).then(keyMaterial => deriveKey(salt, iterations, hash, keyMaterial, algorithm, length));

export const generateKey = (password: Uint8Array, salt: Uint8Array): Promise<CryptoKey> =>
  pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, HASH, ALGORITHM);
