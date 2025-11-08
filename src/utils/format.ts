export const toHex = (n: number): string => n.toString(16).padStart(2, "0");
export const round = (v: number, p = 2): number => Number(v.toFixed(p));
