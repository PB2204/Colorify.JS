# 🧑‍💻 Developer’s Guide – Extending Colorify.js

Welcome, Developer 👋  
This guide is for anyone who wants to go beyond using **Colorify.js** — and start **extending or improving** it.

Colorify.js was built to be **tiny**, **modular**, and **educational**, making it easy to contribute new color models or optimize existing code.

---

## ⚙️ 1. Project Overview

| Directory | Description |
|------------|--------------|
| `src/` | TypeScript source code (core logic) |
| `scripts/` | Build and compatibility scripts |
| `dist/` | Compiled output (generated automatically) |
| `tests/` | Vitest unit tests |
| `docs/` *(optional)* | Any extra documentation you create |

Build and testing are fully automated via npm scripts.

---

## 🧩 2. Core Design Principles

Colorify.js is designed with three simple principles:

1. **Clarity over complexity** — math first, fancy abstractions later  
2. **Pure functions** — no side effects or global state  
3. **Type safety** — everything is typed and documented  

Each color model (HEX, RGB, HSL) is represented with simple input/output objects.

Example:
```ts
export type RGB = { r: number; g: number; b: number; a?: number };
export type HSL = { h: number; s: number; l: number; a?: number };
````

All functions:

* Accept one model → return another
* Never mutate data
* Use basic math (no dependencies)

---

## 🧠 3. How to Add a New Color Model

Let’s walk through adding **CMYK** (Cyan, Magenta, Yellow, Key/Black) as an example.

---

### Step 1: Define the Type

In `src/types.ts` (create it if needed):

```ts
export type CMYK = { c: number; m: number; y: number; k: number; a?: number };
```

---

### Step 2: Write Conversion Functions

In `src/index.ts`, add two functions:

#### RGB → CMYK

```ts
export function rgbToCmyk(r: number, g: number, b: number, a?: number): CMYK {
  r /= 255; g /= 255; b /= 255;

  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  const result = { 
    c: +(c * 100).toFixed(2),
    m: +(m * 100).toFixed(2),
    y: +(y * 100).toFixed(2),
    k: +(k * 100).toFixed(2),
  };

  return a === undefined ? result : { ...result, a };
}
```

#### CMYK → RGB

```ts
export function cmykToRgb(c: number, m: number, y: number, k: number, a?: number): RGB {
  c /= 100; m /= 100; y /= 100; k /= 100;

  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  const result = { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  return a === undefined ? result : { ...result, a };
}
```

---

### Step 3: Add Tests

In `src/index.test.ts`:

```ts
import { rgbToCmyk, cmykToRgb } from "./index";

it("converts rgb <-> cmyk correctly", () => {
  const cmyk = rgbToCmyk(255, 0, 0);
  expect(cmyk.c).toBeCloseTo(0);
  expect(cmyk.m).toBeCloseTo(100);
  expect(cmyk.y).toBeCloseTo(100);
  expect(cmyk.k).toBeCloseTo(0);

  const rgb = cmykToRgb(0, 100, 100, 0);
  expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
});
```

---

### Step 4: Export It

At the bottom of `src/index.ts`:

```ts
export default {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  rgbToCmyk,
  cmykToRgb
};
```

Then rebuild and test:

```bash
npm run build
npm test
```

✅ You’ve just added CMYK support!

---

## 🔥 4. Other Ideas to Extend

Here are advanced ideas you can add next:

| Feature                              | Description                                               |
| ------------------------------------ | --------------------------------------------------------- |
| **LAB**                              | Perceptual color space used in photo editing              |
| **LCH**                              | Cylindrical form of LAB (Lightness, Chroma, Hue)          |
| **HSV/HSB**                          | Hue, Saturation, Value/Brightness (used in color pickers) |
| **Color Temperature (Kelvin)**       | Approximate warm/cool color tone                          |
| **Contrast Ratio**                   | Calculate contrast between two colors for accessibility   |
| **Complementary / Analogous Colors** | Generate color schemes programmatically                   |

---

## 📦 5. Adding New Files / Modules

You can split logic for advanced models into their own files:

```
src/
 ├─ core/
 │   ├─ hex.ts
 │   ├─ rgb.ts
 │   ├─ hsl.ts
 │   └─ cmyk.ts
 ├─ utils/
 │   ├─ math.ts
 │   └─ format.ts
 └─ index.ts
```

Keep the main `index.ts` clean — only import and export from there.

---

## 🧰 6. Build & Release Flow

| Step       | Command                       | Purpose                            |
| ---------- | ----------------------------- | ---------------------------------- |
| 🔧 Build   | `npm run build`               | Compiles TypeScript → JS + `.d.ts` |
| 🧪 Test    | `npm test`                    | Runs all unit tests                |
| 🧹 Prepare | `npm run prepare`             | Auto-builds before publish         |
| 🚀 Publish | `npm publish --access public` | Deploys to npm registry            |

Make sure:

* All tests pass
* You update the version in `package.json` (`1.0.1`, `1.1.0`, etc.)
* You write a short note in `CHANGELOG.md` if you add a new feature

---

## 💬 7. Coding Style & Best Practices

* Follow **functional programming** style
* Use **pure functions** and **return new objects**
* Keep performance in mind — avoid loops when unnecessary
* Maintain **readability over cleverness**
* Use **JSDoc comments** for every public function

Example:

```ts
/**
 * Converts a HEX color string to RGB format
 * @param hex - The color string (e.g., "#ff0000")
 * @returns RGB object { r, g, b, a? }
 */
export function hexToRgb(hex: string) { ... }
```

---

## 🧭 8. Developer Checklist Before Committing

✅ Code compiles successfully
✅ Tests pass
✅ Functions are well-documented
✅ No unused variables or console logs
✅ Followed naming conventions
✅ Updated README or LEARN.md if necessary

---

## ❤️ 9. Final Tip

When you contribute, think of simplicity:

> “Could someone new to color theory read this code and understand it?”

That’s the spirit of **Colorify.js** — making color math accessible to everyone.

---

<p align="center">
  Made with ❤️ by <a href="https://sdepabitra.me">Pabitra Banerjee</a><br>
  <sub>Part of the <a href="https://mbwebbers.dev">MB WEBBER’S</a> Open Source Ecosystem</sub>
</p>