export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export declare function rgbToHex(r: number, g: number, b: number, a?: number): string;
export declare function rgbToHsl(r: number, g: number, b: number, a?: number): {
    h: number;
    s: number;
    l: number;
    a?: number;
};
export declare function hslToRgb(h: number, s: number, l: number, a?: number): {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export declare function hexToHsl(hex: string): {
    h: number;
    s: number;
    l: number;
    a?: number;
};
export declare function hslToHex(h: number, s: number, l: number, a?: number): string;
declare const _default: {
    hexToRgb: typeof hexToRgb;
    rgbToHex: typeof rgbToHex;
    rgbToHsl: typeof rgbToHsl;
    hslToRgb: typeof hslToRgb;
    hexToHsl: typeof hexToHsl;
    hslToHex: typeof hslToHex;
};
export default _default;
