export const toBase64 = (data: Iterable<number>): string => btoa(String.fromCharCode(...new Uint8Array(data)));

export const fromBase64 = (data: string): Uint8Array => Uint8Array.from(atob(data), value => value.charCodeAt(0));

export const encode = (data: string): Uint8Array => new TextEncoder().encode(data);

export const decode = (data: BufferSource): string => new TextDecoder().decode(data);
