import { hexToRgb, rgbToHex } from "./hex.js";
import { rgbToHsl, hslToRgb } from "./rgb.js";
export const hexToHsl = (hex) => {
    const { r, g, b, a } = hexToRgb(hex);
    return rgbToHsl(r, g, b, a);
};
export const hslToHex = (h, s, l, a) => {
    const { r, g, b } = hslToRgb(h, s, l, a);
    return rgbToHex(r, g, b, a);
};
