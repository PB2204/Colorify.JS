````md
<h1 align="center">🎨 Colorify.js</h1>

<p align="center">
  <b>A tiny and dependency-free JavaScript library to convert colors between HEX, RGB, and HSL formats — with alpha support.</b><br>
  <i>Fast • Lightweight • Accurate • Zero Dependencies</i>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@rockstarpabitra/colorify?color=brightgreen&label=version&style=flat-square" alt="npm version">
  <img src="https://img.shields.io/npm/dt/@rockstarpabitra/colorify?style=flat-square&color=blue" alt="downloads">
  <img src="https://img.shields.io/bundlephobia/minzip/@rockstarpabitra/colorify?label=size&style=flat-square&color=orange" alt="bundle size">
  <img src="https://img.shields.io/npm/l/@rockstarpabitra/colorify?style=flat-square&color=yellow" alt="license">
</p>

---

## ✨ Features

- 🔁 Convert seamlessly between **HEX ↔ RGB ↔ HSL**
- 🌈 Supports **alpha transparency (RGBA / HSLA / HEXA)**
- ⚡ Zero dependencies — just **one tiny file**
- 📦 Works in **Browser, Node.js, Deno,** and modern build tools
- 🧩 Tree-shakeable, lightweight, and type-safe (with TypeScript)

---

## 📦 Installation

Using **npm**:

```bash
npm install @rockstarpabitra/colorify
````

or using **yarn**:

```bash
yarn add @rockstarpabitra/colorify
```

---

## 🚀 Quick Start

### ✅ Import (ESM)

```js
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@rockstarpabitra/colorify";

console.log(hexToRgb("#3498db"));
// → { r: 52, g: 152, b: 219 }

console.log(rgbToHex(255, 0, 0, 0.5));
// → "#ff000080"

console.log(rgbToHsl(255, 0, 0));
// → { h: 0, s: 100, l: 50 }

console.log(hslToRgb(120, 100, 50));
// → { r: 0, g: 255, b: 0 }
```

### ✅ Require (CommonJS)

```js
const { hexToRgb, rgbToHex } = require("@rockstarpabitra/colorify");

console.log(hexToRgb("#00ff00"));
// → { r: 0, g: 255, b: 0 }
```

---

## 🧠 API Reference

### 🎨 `hexToRgb(hex: string)`

Converts a HEX color string to RGB object.

| Input       | Output Example                     |
| ----------- | ---------------------------------- |
| `#3498db`   | `{ r: 52, g: 152, b: 219 }`        |
| `#ff000080` | `{ r: 255, g: 0, b: 0, a: 0.502 }` |

---

### 🌈 `rgbToHex(r: number, g: number, b: number, a?: number)`

Converts RGB values to HEX string.
Supports optional alpha channel (`0 → 1`).

| Input              | Output        |
| ------------------ | ------------- |
| `(255, 0, 0)`      | `"#ff0000"`   |
| `(255, 0, 0, 0.5)` | `"#ff000080"` |

---

### 🔵 `rgbToHsl(r: number, g: number, b: number, a?: number)`

Converts RGB to HSL.

| Input         | Output                      |
| ------------- | --------------------------- |
| `(255, 0, 0)` | `{ h: 0, s: 100, l: 50 }`   |
| `(0, 255, 0)` | `{ h: 120, s: 100, l: 50 }` |

---

### 🟢 `hslToRgb(h: number, s: number, l: number, a?: number)`

Converts HSL values to RGB.

| Input            | Output                     |
| ---------------- | -------------------------- |
| `(240, 100, 50)` | `{ r: 0, g: 0, b: 255 }`   |
| `(60, 100, 50)`  | `{ r: 255, g: 255, b: 0 }` |

---

### 🟣 `hexToHsl(hex: string)`

Converts HEX color to HSL directly.

| Input     | Output                    |
| --------- | ------------------------- |
| `#ff0000` | `{ h: 0, s: 100, l: 50 }` |

---

### 🔴 `hslToHex(h: number, s: number, l: number, a?: number)`

Converts HSL directly to HEX.

| Input                | Output        |
| -------------------- | ------------- |
| `(120, 100, 50)`     | `"#00ff00"`   |
| `(60, 100, 50, 0.5)` | `"#ffff0080"` |

---

## ⚙️ Notes

* Accepts both **short** (`#abc`, `#abcd`) and **long** (`#aabbcc`, `#aabbccdd`) HEX formats.
* **Alpha** values are normalized to range `0–1`.
* RGB uses 0–255, HSL uses 0–360° hue and 0–100% saturation/lightness.
* All values are automatically **clamped and rounded**.

---

## 🧩 Example Use Case

```js
import { hexToRgb, rgbToHsl, hslToHex } from "@rockstarpabitra/colorify";

// Lighten a color by 10%
function lighten(hex, percent = 10) {
  const hsl = rgbToHsl(...Object.values(hexToRgb(hex)));
  const lighter = { ...hsl, l: Math.min(hsl.l + percent, 100) };
  return hslToHex(lighter.h, lighter.s, lighter.l);
}

console.log(lighten("#e74c3c", 15)); 
// → "#ff7d6e"
```

---

## 🧪 Tests

All functions are unit-tested using **Vitest**.

To run tests locally:

```bash
npm test
```

---

## 🧱 Build Instructions

To build from source:

```bash
npm run build
```

This generates the compiled files in the `dist/` directory:

```
dist/
 ├─ index.js       → ESM build
 ├─ index.cjs      → CommonJS build
 └─ index.d.ts     → Type definitions
```

---

## 🌍 Browser Usage (CDN)

You can use **Colorify.js** directly in the browser via [jsDelivr](https://www.jsdelivr.com/):

```html
<script type="module">
  import { hexToRgb } from "https://cdn.jsdelivr.net/npm/@rockstarpabitra/colorify/dist/index.js";
  console.log(hexToRgb("#ff00ff"));
</script>
```

---

## 🧑‍💻 Author

**Pabitra Banerjee**
🧠 Full-Stack AI Engineer • Founder & CEO of [MB WEBBER’S](https://mbwebbers.dev)
💬 Passionate about technology, open source, and education.
🌐 [sdepabitra.me](https://sdepabitra.me)

---

## 📜 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

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
```