````md
# 🧩 Contributing to Colorify.js

First off — **thank you for taking the time to contribute! 💖**  
Your help makes **Colorify.js** better, faster, and more useful for everyone.

This document explains how you can contribute — from filing issues to submitting pull requests, testing code, and improving documentation.

---

## 💡 How You Can Contribute

There are many ways to get involved in Colorify.js:

- 🐛 **Report bugs** and suggest improvements  
- 💬 **Discuss new features** or enhancements  
- 🧱 **Improve the code** or write tests  
- ✍️ **Enhance documentation**, examples, or README clarity  
- 🌍 **Share and promote** Colorify.js in your dev community  

Every contribution, big or small, is valuable!

---

## 🪲 Reporting Bugs

If you find a bug, please **open an issue** with:

1. A **clear title** and short summary of the issue  
2. Steps to reproduce it (with a small code snippet if possible)  
3. What you **expected** vs. **what actually happened**  
4. Environment details:
   - Node.js version
   - npm version
   - OS / Browser
   - Colorify.js version

👉 [Open a New Issue](../../issues/new)

Before submitting, please check if a similar issue already exists.

---

## 🚀 Suggesting Features

We love new ideas!  
If you have a suggestion to make Colorify.js more powerful or easier to use:

1. Check existing issues or discussions first.  
2. Open a new **Feature Request** issue describing:
   - What problem it solves  
   - How it could work  
   - Why it’s useful to the community  

Be as descriptive as you can — clear ideas make collaboration smoother.

---

## 🧑‍💻 Development Setup

1. **Fork** the repository  
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/colorify.git
````

3. **Navigate** into the directory:

   ```bash
   cd colorify
   ```
4. **Install dependencies:**

   ```bash
   npm install
   ```
5. **Run tests** to verify everything works:

   ```bash
   npm test
   ```
6. **Start coding!**
   All source files are in the `src/` directory.

---

## 🧱 Project Structure

```
colorify/
├── src/             → Source code (TypeScript)
├── dist/            → Compiled output
├── tests/           → Unit tests
├── scripts/         → Build helpers
├── package.json
├── tsconfig.json
├── README.md
└── CODE_OF_CONDUCT.md
```

---

## 🧪 Running Tests

We use **[Vitest](https://vitest.dev/)** for testing.

To run all tests:

```bash
npm test
```

To run tests in watch mode (live updates while you code):

```bash
npx vitest
```

Please make sure **all tests pass before committing** your code.

---

## 🧰 Code Style Guidelines

To keep the codebase clean and consistent:

* Use **TypeScript** for all source files (`.ts`)
* Use **2-space indentation** and semicolons
* Use **camelCase** for variables and functions
* Prefer **pure functions** (no side effects)
* Write **JSDoc comments** where appropriate

Example:

```ts
/**
 * Converts HEX to RGB color format
 * @param hex - The HEX color string
 * @returns RGB color object
 */
function hexToRgb(hex: string) {
  // ...
}
```

---

## 🌳 Branching & Commit Conventions

1. Always create a **new branch** for your work:

   ```bash
   git checkout -b fix/hex-alpha-bug
   ```

2. Use clear, meaningful commit messages:

   * `fix: corrected alpha rounding in hexToRgb()`
   * `feat: added rgbToCmyk conversion`
   * `docs: improved README examples`
   * `test: add missing hslToHex test`

3. When your feature is ready:

   ```bash
   git push origin your-branch-name
   ```

---

## 🔁 Pull Request Process

1. Make sure your code follows the style guide.
2. All tests should pass (`npm test`).
3. Update documentation if needed (`README.md`, `API`, etc.).
4. Open a **Pull Request (PR)** with:

   * A descriptive title
   * A summary of what you changed and why
   * Reference to any related issue(s)

Once submitted, a maintainer will review your PR.
Friendly feedback and discussion are part of the process ❤️

---

## 💬 Community & Conduct

Please remember to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
We’re all here to learn, build, and share — kindness and respect make that possible.

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project — the **MIT License**.

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