export const prefixify = (s: string) => s.replace(/_/, ':');

export const variablify = (s: string) => (/^[?(]/.test(s) ? s : `?${s}`);

export const literalify = (value: string | number) =>
  typeof value === 'number' ? value : `"${value || ''}"`;

export interface ICursorData {
  [key: string]: string | number;
}

export function decodeCursor(encodedCursor: string): ICursorData {
  return JSON.parse(Base64.decode(encodedCursor));
}
