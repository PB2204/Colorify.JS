export const toHex = (n) => n.toString(16).padStart(2, "0");
export const round = (v, p = 2) => Number(v.toFixed(p));
