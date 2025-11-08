# 📜 Changelog

All notable changes to **@rockstarpabitra/colorify** are documented here.  
This project follows [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.0.0] - 2025-11-08

### 🚀 Major Update — The Modular Era
Version 2.0.0 marks the **biggest evolution** of Colorify.js to date.  
The entire library was refactored for performance, scalability, and maintainability.

#### ✨ Highlights
- 🔩 **Fully Modular Architecture**
  - Introduced separate folders for `models/`, `utils/`, and `types/`.
  - Clear separation of logic for HEX, RGB, and HSL conversions.
- ⚙️ **Improved Conversion Accuracy**
  - Refined rounding and clamping logic.
  - Added input validation for invalid HEX values.
- 💎 **TypeScript-First Rewrite**
  - All modules are strongly typed with generated `.d.ts` files.
  - Cleaner exports with tree-shaking compatibility.
- 🧩 **Scalable Design**
  - Ready for CMYK, LAB, HSV, and advanced color models.
  - Utility-based structure for math and formatting helpers.
- 🧪 **Better Testing**
  - Expanded Vitest coverage for all conversion functions.
  - Consistent precision validation across formats.
- 📦 **Build Enhancements**
  - Generates optimized `dist/` builds: ESM, CJS, and type definitions.
- 📘 **Documentation Overhaul**
  - Updated `README.md`, `LEARN.md`, `DEVELOPERS_GUIDE.md`.
  - Added new “Summary Checklist” and release notes.
- 💬 **Developer-Focused Design**
  - Functions simplified for educational clarity and open-source collaboration.

> 💡 *Colorify.js v2.0.0 is faster, smarter, and beautifully modular — built to grow with you.*

---

## [1.0.2] - 2025-11-08

### 🧱 Improvements
- Split code into smaller modular files for better organization.
- Optimized conversion logic for HSL and HEX.
- Added stronger validation and rounding.
- Enhanced Vitest test coverage.

---

## [1.0.1] - 2025-11-08

### 🔧 Fixes
- Fixed npm public access publishing issue.
- Minor documentation cleanups.

---

## [1.0.0] - 2025-11-08

### 🎉 Initial Release
- Introduced **Colorify.js** core library.
- Supported bidirectional conversions:
  - `HEX ↔ RGB`
  - `RGB ↔ HSL`
  - `HEX ↔ HSL`
- Added alpha (transparency) support for all formats.
- Provided full TypeScript types and ESM + CJS builds.
- Published as open-source on npm.

---

### 🧩 Version Summary

| Version | Type | Release Date | Description |
|:--------:|:----:|:-------------|:-------------|
| 2.0.0 | 🚀 Major | 2025-11-08 | Complete modular refactor and TypeScript-first rewrite |
| 1.0.2 | 🧱 Patch | 2025-11-08 | Performance and organization improvements |
| 1.0.1 | 🔧 Fix | 2025-11-08 | Publishing and minor documentation fixes |
| 1.0.0 | 🎉 Initial | 2025-11-08 | First release of Colorify.js |

---

<p align="center">
  Made with ❤️ by <a href="https://sdepabitra.me">Pabitra Banerjee</a><br>
  <sub>Part of the <a href="https://mbwebbers.dev">MB WEBBER’S</a> Open Source Ecosystem</sub>
</p>
