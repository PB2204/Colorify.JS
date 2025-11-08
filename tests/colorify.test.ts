import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "../src/index.js";

describe("Colorify.js v2.0.0", () => {
  it("should convert hex <-> rgb correctly", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
  });

  it("should convert rgb <-> hsl correctly", () => {
    expect(rgbToHsl(255, 0, 0)).toMatchObject({ h: 0, s: 100, l: 50 });
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
  });
});
