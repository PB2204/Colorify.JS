import { RGB } from "../types.js";
import { round } from "../utils/format.js";

function normalizeHex(hex: string): string {
  let h = hex.trim().replace(/^#/, "").toLowerCase();
  if (![3, 4, 6, 8].includes(h.length)) throw new Error(`Invalid hex: ${hex}`);
  if (h.length === 3 || h.length === 4) h = h.split("").map(c => c + c).join("");
  return h;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const hexToRgb = (hex: string): RGB => {
  const h = normalizeHex(hex);
  const hasAlpha = h.length === 8;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = hasAlpha ? round(parseInt(h.slice(6, 8), 16) / 255, 3) : undefined;
  return a === undefined ? { r, g, b } : { r, g, b, a };
};

export const rgbToHex = (r: number, g: number, b: number, a?: number): string => {
  const fix = (x: number) => clamp(Math.round(x), 0, 255);
  const base = `#${fix(r).toString(16).padStart(2, "0")}${fix(g)
    .toString(16)
    .padStart(2, "0")}${fix(b).toString(16).padStart(2, "0")}`;
  if (a === undefined) return base;
  return `${base}${clamp(a, 0, 1).toString(16).slice(2, 4)}`;
};
