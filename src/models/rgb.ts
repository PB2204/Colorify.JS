import { HSL, RGB } from "../types.js";
import { round } from "../utils/format.js";
import { hue2rgb } from "../utils/math.js";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const rgbToHsl = (r: number, g: number, b: number, a?: number): HSL => {
  r = clamp(r, 0, 255) / 255;
  g = clamp(g, 0, 255) / 255;
  b = clamp(b, 0, 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }

  const result = { h: round(h), s: round(s * 100), l: round(l * 100) };
  return a === undefined ? result : { ...result, a };
};

export const hslToRgb = (h: number, s: number, l: number, a?: number): RGB => {
  h = ((h % 360) + 360) % 360 / 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val, a };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);

  const res = { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  return a === undefined ? res : { ...res, a };
};