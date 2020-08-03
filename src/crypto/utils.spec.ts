import { toBase64, fromBase64, encode, decode } from './utils';

describe('toBase64', () => {
  it('should be defined', () => {
    expect(toBase64).toBeDefined();
  });

  it('should convert array of numbers to base64 string', () => {
    expect(toBase64([0, 1, 2, 3, 4, 5])).toBe('AAECAwQF');
  });

  it('should convert Uint8Array to base64 string', () => {
    expect(toBase64(new Uint8Array([0, 1, 2, 3, 4, 5]))).toBe('AAECAwQF');
  });

  it('should convert empty array to empty string', () => {
    expect(toBase64([])).toBe('');
  });

  it('should convert empty Uint8Array to empty string', () => {
    expect(toBase64(new Uint8Array())).toBe('');
  });
});

describe('fromBase64', () => {
  it('should be defined', () => {
    expect(fromBase64).toBeDefined();
  });

  it('should convert base64 string to Uint8Array', () => {
    expect(fromBase64('AAECAwQF')).toEqual(new Uint8Array([0, 1, 2, 3, 4, 5]));
  });

  it('should convert empty string to empty Uint8Array', () => {
    expect(fromBase64('')).toEqual(new Uint8Array());
  });
});

describe('encode', () => {
  it('should be defined', () => {
    expect(encode).toBeDefined();
  });

  it('should encode UTF-8 string', () => {
    expect(encode('abcdef')).toEqual(new Uint8Array([97, 98, 99, 100, 101, 102]));
  });

  it('should encode empty string', () => {
    expect(encode('')).toEqual(new Uint8Array());
  });
});

describe('decode', () => {
  it('should be defined', () => {
    expect(decode).toBeDefined();
  });

  it('should decode Uint8Array', () => {
    expect(decode(new Uint8Array([97, 98, 99, 100, 101, 102]))).toBe('abcdef');
  });

  it('should decode empty Uint8Array', () => {
    expect(decode(new Uint8Array())).toBe('');
  });
});
