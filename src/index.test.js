import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex } from "./index";

describe("Colorify.js", () => {
  it("hex <-> rgb", () => {
    expect(hexToRgb("#000")).toEqual({ r:0,g:0,b:0 });
    expect(hexToRgb("#fff")).toEqual({ r:255,g:255,b:255 });
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
    expect(hexToRgb("#ff000080").a).toBeCloseTo(0.502, 3);
  });

  it("rgb <-> hsl", () => {
    const hsl = rgbToHsl(255, 0, 0);
    expect(hsl.h).toBeCloseTo(0);
    expect(hsl.s).toBeCloseTo(100);
    expect(hsl.l).toBeCloseTo(50);

    const rgb = hslToRgb(240, 100, 50);
    expect(rgb).toEqual({ r:0, g:0, b:255 });
  });

  it("hex <-> hsl", () => {
    const hsl = hexToHsl("#00ff00");
    expect(hsl.h).toBeGreaterThan(100);
    expect(hsl.h).toBeLessThan(150);

    expect(hslToHex(60, 100, 50)).toBe("#ffff00"); // yellow
  });
});