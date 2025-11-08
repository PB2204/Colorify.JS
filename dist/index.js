// --- utils ---
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const round = (v, p = 0) => Number(v.toFixed(p));
const to2 = (n) => n.toString(16).padStart(2, "0");
// --- HEX parsing ---
function normalizeHex(hex) {
    let h = hex.trim().toLowerCase();
    if (h.startsWith("#"))
        h = h.slice(1);
    if (![3, 4, 6, 8].includes(h.length)) {
        throw new Error(`Invalid hex length: ${hex}`);
    }
    // expand short forms (#abc, #abcd)
    if (h.length === 3 || h.length === 4) {
        h = h.split("").map(ch => ch + ch).join("");
    }
    return h;
}
// --- Converters ---
export function hexToRgb(hex) {
    const h = normalizeHex(hex);
    const hasAlpha = h.length === 8;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = hasAlpha ? round(parseInt(h.slice(6, 8), 16) / 255, 3) : undefined;
    return a === undefined ? { r, g, b } : { r, g, b, a };
}
export function rgbToHex(r, g, b, a) {
    r = clamp(Math.round(r), 0, 255);
    g = clamp(Math.round(g), 0, 255);
    b = clamp(Math.round(b), 0, 255);
    const base = `#${to2(r)}${to2(g)}${to2(b)}`;
    if (a === undefined)
        return base;
    const alpha = clamp(a, 0, 1);
    return `${base}${to2(Math.round(alpha * 255))}`;
}
export function rgbToHsl(r, g, b, a) {
    r = clamp(r, 0, 255) / 255;
    g = clamp(g, 0, 255) / 255;
    b = clamp(b, 0, 255) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h *= 60;
    }
    const out = {
        h: round((h + 360) % 360, 2),
        s: round(s * 100, 2),
        l: round(l * 100, 2),
    };
    return a === undefined ? out : { ...out, a: clamp(a, 0, 1) };
}
function hue2rgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
export function hslToRgb(h, s, l, a) {
    h = ((h % 360) + 360) % 360 / 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // gray
    }
    else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const out = {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
    return a === undefined ? out : { ...out, a: clamp(a, 0, 1) };
}
export function hexToHsl(hex) {
    const { r, g, b, a } = hexToRgb(hex);
    return rgbToHsl(r, g, b, a);
}
export function hslToHex(h, s, l, a) {
    const { r, g, b } = hslToRgb(h, s, l, a);
    return rgbToHex(r, g, b, a);
}
export default {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    hexToHsl,
    hslToHex
};
