# 🧑‍💻 Developer’s Guide – Colorify.js v2.0.0

Welcome, Developer 👋  
This guide is for anyone who wants to go beyond using **Colorify.js** — and start **extending or improving** it.

Version **2.0.0** of Colorify.js introduces a **completely modular and scalable architecture**, making it easier than ever to maintain, optimize, and expand.

---

## ⚙️ 1. Project Overview

| Directory | Description |
|------------|--------------|
| `src/models/` | Core color models (HEX, RGB, HSL) |
| `src/utils/` | Shared helper utilities (math, clamp, format) |
| `src/types.ts` | TypeScript interfaces for color objects |
| `tests/` | Vitest unit tests |
| `dist/` | Compiled build output (ESM + CJS + types) |
| `scripts/` | Build automation and compatibility tools |

Build, testing, and publishing are all automated through npm scripts and GitHub Actions.

---

## 🧩 2. Core Design Principles

Colorify.js follows three guiding principles:

1. **Clarity over complexity** — straightforward math before abstractions.  
2. **Pure functions only** — no side effects, no global state.  
3. **Type safety by default** — everything is strongly typed and documented.

Each color model (HEX, RGB, HSL) is represented by clear, simple TypeScript interfaces:

```ts
export interface RGB { r: number; g: number; b: number; a?: number }
export interface HSL { h: number; s: number; l: number; a?: number }
````

All conversion functions:

* Accept one model → return another.
* Never mutate input values.
* Use minimal, dependency-free math.

---

## 🧠 3. How to Add a New Color Model

Let’s walk through adding **CMYK** (Cyan, Magenta, Yellow, Key/Black) as an example.

---

### Step 1: Define the Type

In `src/types.ts`:

```ts
export interface CMYK { c: number; m: number; y: number; k: number; a?: number }
```

---

### Step 2: Create a New Model File

Create `src/models/cmyk.ts`:

```ts
import type { CMYK, RGB } from "../types.js";

export const rgbToCmyk = (r: number, g: number, b: number, a?: number): CMYK => {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  const res = {
    c: +(c * 100).toFixed(2),
    m: +(m * 100).toFixed(2),
    y: +(y * 100).toFixed(2),
    k: +(k * 100).toFixed(2),
  };

  return a === undefined ? res : { ...res, a };
};

export const cmykToRgb = (c: number, m: number, y: number, k: number, a?: number): RGB => {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  const res = { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  return a === undefined ? res : { ...res, a };
};
```

---

### Step 3: Update Exports

In `src/index.ts`:

```ts
export * from "./models/hex.js";
export * from "./models/rgb.js";
export * from "./models/hsl.js";
export * from "./models/cmyk.js"; // 👈 new file
export * from "./types.js";

export default {
  hexToRgb, rgbToHex,
  rgbToHsl, hslToRgb,
  hexToHsl, hslToHex,
  rgbToCmyk, cmykToRgb
};
```

---

### Step 4: Add Unit Tests

In `tests/colorify.test.ts`:

```ts
import { rgbToCmyk, cmykToRgb } from "../src/index.js";
import { describe, it, expect } from "vitest";

describe("CMYK conversion", () => {
  it("converts RGB to CMYK correctly", () => {
    const cmyk = rgbToCmyk(255, 0, 0);
    expect(cmyk).toMatchObject({ c: 0, m: 100, y: 100, k: 0 });
  });

  it("converts CMYK to RGB correctly", () => {
    const rgb = cmykToRgb(0, 100, 100, 0);
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
  });
});
```

Run:

```bash
npm test
```

✅ Your new model is ready!

---

## 🔥 4. More Color Models to Explore

| Feature                              | Description                                               |
| ------------------------------------ | --------------------------------------------------------- |
| **LAB**                              | Human perception–based color model                        |
| **LCH**                              | Cylindrical form of LAB                                   |
| **HSV / HSB**                        | Hue, Saturation, Value/Brightness (used in color pickers) |
| **Kelvin (Color Temperature)**       | Approximate warm/cool light color                         |
| **Contrast Ratio (WCAG)**            | Accessibility color contrast calculation                  |
| **Complementary & Analogous Colors** | Programmatically generate harmonious color palettes       |

---

## 🧱 5. Recommended Folder Structure

```
src/
 ├─ models/
 │   ├─ hex.ts
 │   ├─ rgb.ts
 │   ├─ hsl.ts
 │   └─ cmyk.ts
 ├─ utils/
 │   ├─ clamp.ts
 │   ├─ format.ts
 │   └─ math.ts
 ├─ types.ts
 └─ index.ts
```

Keep your `index.ts` file lean — it should only export functions, not define them.

---

## ⚙️ 6. Build & Release Workflow

| Step       | Command                       | Description                               |
| ---------- | ----------------------------- | ----------------------------------------- |
| 🔧 Build   | `npm run build`               | Compile TypeScript → JavaScript & `.d.ts` |
| 🧪 Test    | `npm test`                    | Run Vitest test suite                     |
| 🧹 Prepare | `npm run prepare`             | Auto-build before publish                 |
| 🚀 Publish | `npm publish --access public` | Deploy to npm registry                    |

### Before publishing:

* ✅ All tests must pass
* ✅ `package.json` version updated (`2.0.1`, `2.1.0`, etc.)
* ✅ `CHANGELOG.md` updated with changes

---

## 💬 7. Coding Style & Best Practices

* 🧠 Write **pure, stateless functions**
* 💎 Prefer **readability over cleverness**
* 🧩 Use **utility helpers** from `src/utils/`
* 💬 Document every exported function with **JSDoc**
* 📐 Follow **2-space indentation** and **camelCase** naming

Example:

```ts
/**
 * Converts HEX color string to RGB object.
 * @param hex - The color string (e.g., "#ff0000")
 * @returns RGB object { r, g, b, a? }
 */
export function hexToRgb(hex: string) { ... }
```

---

## ✅ 8. Developer Checklist Before Committing

| Check                             | Status |
| --------------------------------- | ------ |
| Code compiles successfully        | ✅      |
| All tests pass                    | ✅      |
| Functions documented (JSDoc)      | ✅      |
| No console logs or unused imports | ✅      |
| Consistent naming conventions     | ✅      |
| README / LEARN.md updated         | ✅      |

---

## ❤️ 9. Final Tip

When contributing to **Colorify.js**, always keep its goal in mind:

> “Write color conversion logic so simple that even a beginner can read it and smile.”

Colorify.js v2.0.0 is not just a library — it’s a teaching tool for color theory in code form.

---

<p align="center">
  Made with ❤️ by <a href="https://sdepabitra.me">Pabitra Banerjee</a><br>
  <sub>Part of the <a href="https://mbwebbers.dev">MB WEBBER’S</a> Open Source Ecosystem</sub>
</p>
```

---

✅ **Summary of Updates for v2.0.0**

| Change                                               | Description                        |
| ---------------------------------------------------- | ---------------------------------- |
| 🧩 Updated architecture                              | Reflects new modular folder layout |
| 🧠 Added TypeScript-based examples                   | Consistent with v2.0.0 structure   |
| ⚙️ Updated build/test workflow                       | Matches your npm setup             |
| 🧪 Added Vitest test samples                         | Consistent format                  |
| 💡 Emphasized clarity, modularity, and extensibility | True to v2.0.0 philosophy          |

---

<p align="center">
  <a href="https://sdepabitra.me" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Made%20With%20💖%20By&message=Pabitra%20Banerjee&color=8A2BE2&labelColor=black&style=for-the-badge" alt="Made with love by Pabitra Banerjee">
  </a>
  <br>
  <a href="https://mbwebbers.dev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=MB%20WEBBER'S&message=Open%20Source%20Initiative&color=00C896&labelColor=black&style=for-the-badge" alt="MB WEBBER'S Open Source Initiative">
  </a>
</p>