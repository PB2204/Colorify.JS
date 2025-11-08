````md
# 📘 Learn: Understanding How Colorify.js Works

Welcome to the **learning guide** for **@rockstarpabitra/colorify** 🎨  
This document is designed to help you (and contributors) understand the **science, logic, and code architecture** behind the library — step-by-step.

---

## 🌈 1. What Is Colorify.js?

**Colorify.js** is a tiny JavaScript library that converts colors between:

- 🟣 **HEX** → RGB → HSL  
- 🟢 **RGB** → HEX → HSL  
- 🔵 **HSL** → RGB → HEX  

and supports **alpha transparency (opacity)** across all formats.

It’s written in **TypeScript**, making it **type-safe**, **lightweight**, and **dependency-free**.

---

## 🎨 2. The Three Color Models

Before understanding the code, let’s learn what each color model represents.

| Model | Description | Example |
|-------|--------------|----------|
| **HEX** | A hexadecimal representation of RGB values. | `#3498db` |
| **RGB** | Additive color model — mixes Red, Green, Blue. | `{ r: 52, g: 152, b: 219 }` |
| **HSL** | Hue, Saturation, Lightness — describes color more visually. | `{ h: 204, s: 70, l: 53 }` |

---

## ⚗️ 3. HEX → RGB Conversion

A HEX color is a base-16 number representing RGB values.

Example:  
`#3498db`

Split into pairs:
- 34 → Red (in hex)
- 98 → Green
- db → Blue

Convert each pair to decimal:
```js
R = parseInt('34', 16) = 52
G = parseInt('98', 16) = 152
B = parseInt('db', 16) = 219
````

So:

```js
{ r: 52, g: 152, b: 219 }
```

In **Colorify.js**, the function:

```ts
export function hexToRgb(hex: string): { r: number; g: number; b: number; a?: number }
```

handles:

* `#abc` → expands to `#aabbcc`
* `#abcd` → expands to `#aabbccdd` (includes alpha)

---

## 🔄 4. RGB → HEX Conversion

To reverse it, we convert numbers to hexadecimal and pad with zeros if needed.

Example:

```js
R = 255 → "ff"
G = 0   → "00"
B = 0   → "00"
```

Combine:

```js
"#ff0000"
```

The **rgbToHex()** function does:

```ts
const to2 = (n: number) => n.toString(16).padStart(2, "0");
return `#${to2(r)}${to2(g)}${to2(b)}`;
```

---

## 🔁 5. RGB ↔ HSL Conversion Explained

### 🎯 RGB → HSL

HSL is more perceptual:

* **H (Hue)** = angle on the color wheel (0–360°)
* **S (Saturation)** = color intensity (0–100%)
* **L (Lightness)** = brightness (0–100%)

Formula (simplified):

```js
r /= 255; g /= 255; b /= 255;
max = Math.max(r, g, b);
min = Math.min(r, g, b);
l = (max + min) / 2;
```

If all RGB are equal → gray (`s = 0, h = 0`).

Otherwise:

```js
s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
h = ... // based on which color is max
```

Colorify’s implementation:

```ts
export function rgbToHsl(r, g, b, a?) {
  // normalize, find max/min, calculate hue, saturation, lightness
}
```

---

### 🎨 HSL → RGB

Reverse math:

```ts
const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
const p = 2 * l - q;

r = hue2rgb(p, q, h + 1/3);
g = hue2rgb(p, q, h);
b = hue2rgb(p, q, h - 1/3);
```

The helper function `hue2rgb()` is used for clean conversion.

---

## 🔢 6. Alpha (Opacity) Handling

Alpha (`a`) is optional and always in the range **0 → 1**.

| Input                            | Output                           |
| -------------------------------- | -------------------------------- |
| `#ff000080`                      | `{ r: 255, g: 0, b: 0, a: 0.5 }` |
| `{ r: 255, g: 0, b: 0, a: 0.5 }` | `#ff000080`                      |

All functions in **Colorify.js** detect if alpha exists and handle it automatically.

---

## 🧩 7. Internal Utility Functions

Colorify uses tiny helper utilities for code clarity:

```ts
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const round = (v, p = 0) => Number(v.toFixed(p));
const to2 = (n) => n.toString(16).padStart(2, "0");
```

* `clamp()` ensures numbers stay within valid range
* `round()` controls decimal precision
* `to2()` converts to two-digit hex

---

## 🧠 8. Learn by Experimenting

You can explore conversions interactively in your Node console or browser dev tools:

```js
import * as color from "@rockstarpabitra/colorify";

color.hexToRgb("#e67e22"); 
// { r: 230, g: 126, b: 34 }

color.rgbToHsl(230, 126, 34);
// { h: 28, s: 80, l: 52 }

color.hslToHex(28, 80, 52);
// "#e67e22"
```

Try modifying hue, saturation, or lightness and see how the result color changes!

---

## 🧪 9. Visual Learning Tip

Here’s a simple way to **visualize color conversions** in the browser console:

```js
const color = "#9b59b6";
const rgb = colorify.hexToRgb(color);
const hsl = colorify.rgbToHsl(rgb.r, rgb.g, rgb.b);

console.log("%c  ", `background:${color};`, color, rgb, hsl);
```

👉 This prints a **colored block** in your console, along with numeric values!

---

## 🧰 10. How the Build System Works

| Step                                 | Tool                                           | Purpose |
| ------------------------------------ | ---------------------------------------------- | ------- |
| TypeScript (`tsc`)                   | Compiles `src/*.ts` to `dist/*.js` and `.d.ts` |         |
| Node script (`scripts/cjs-wrap.mjs`) | Adds CommonJS build (`index.cjs`)              |         |
| Vitest                               | Runs automated tests (`src/index.test.ts`)     |         |
| npm `prepare` script                 | Auto-builds before `npm publish`               |         |

---

## 💡 11. Summary

Colorify.js is built on **clarity, simplicity, and accuracy**.
Here’s what you’ve learned:

✅ How HEX, RGB, and HSL represent color
✅ How the math behind each conversion works
✅ How alpha blending is handled
✅ How the library is structured internally
✅ How to test and visualize results yourself

---

## 📚 12. Next Steps

Want to go deeper?

* Explore [W3C Color Module Level 4](https://www.w3.org/TR/css-color-4/)
* Learn about [Gamma correction](https://en.wikipedia.org/wiki/Gamma_correction)
* Try building your own converter for CMYK or LAB models
* Contribute improvements in precision or performance to Colorify.js!

---

<p align="center">
  Made with ❤️ by <a href="https://sdepabitra.me">Pabitra Banerjee</a><br>
  <sub>Part of the <a href="https://mbwebbers.dev">MB WEBBER’S</a> Open Source Ecosystem</sub>
</p>
```