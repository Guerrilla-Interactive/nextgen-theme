
// Helper function to convert Hex to RGB string
export function hexToRgbString(hex: string): string {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }


  
  // Helper function to convert RGB to CMYK string
  export function rgbToCmykString(rgbString: string): string {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return "cmyk(0%, 0%, 0%, 100%)";
  
    let r = parseInt(match[1]);
    let g = parseInt(match[2]);
    let b = parseInt(match[3]);
  
    if (r === 0 && g === 0 && b === 0) {
      return "cmyk(0%, 0%, 0%, 100%)";
    }
  
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    const k = Math.min(c, m, y);
  
    if (k === 1) {
      return "cmyk(0%, 0%, 0%, 100%)";
    }
    
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
  
    return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
  }


  
  // Color Parsing and Conversion Utilities (Copied from page.tsx)
  export function parseColorString(colorStr: string): { r: number; g: number; b: number; a: number } | null {
    if (!colorStr) return null;
    colorStr = colorStr.toLowerCase().trim();
  
    if (colorStr === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
  
    let match;
    // HEX: #RRGGBB or #RGB
    match = colorStr.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16), a: 1 };
    }
    match = colorStr.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
    if (match) {
      return { r: parseInt(match[1] + match[1], 16), g: parseInt(match[2] + match[2], 16), b: parseInt(match[3] + match[3], 16), a: 1 };
    }
  
    // RGB: rgb(r,g,b)
    match = colorStr.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: 1 };
    }
  
    // RGBA: rgba(r,g,b,a)
    match = colorStr.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: parseFloat(match[4]) };
    }
    
    return null; // Unrecognized format
  }
  
  export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s, l };
  }
  
  export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    let r, g, b;
    h /= 360; // Convert h to be between 0 and 1
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }
  
  export function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r: number, g: number, b: number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  function hslToHex(h: number, s: number, l: number): string {
    const { r, g, b } = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
  }
  
  // OKLCH Color Space Utilities
  // Based on formulas from Björn Ottosson's Oklab work (https://bottosson.github.io/posts/oklab/)
  
  // sRGB (0-1) to Linear sRGB (0-1)
  function srgbChannelToLinear(c: number): number {
    if (c <= 0.04045) {
      return c / 12.92;
    }
    return Math.pow((c + 0.055) / 1.055, 2.4);
  }
  
  
  export function srgbToOklch(r_srgb: number, g_srgb: number, b_srgb: number): { l: number; c: number; h: number } {
    // 1. sRGB (0-255) to Linear sRGB (0-1)
    const r_linear = srgbChannelToLinear(r_srgb / 255);
    const g_linear = srgbChannelToLinear(g_srgb / 255);
    const b_linear = srgbChannelToLinear(b_srgb / 255);
  
    // 2. Linear sRGB to XYZ
    // Using sRGB D65 standard matrix
    const x = r_linear * 0.4124564 + g_linear * 0.3575761 + b_linear * 0.1804375;
    const y = r_linear * 0.2126729 + g_linear * 0.7151522 + b_linear * 0.0721750;
    const z_ = r_linear * 0.0193339 + g_linear * 0.1191920 + b_linear * 0.9503041; // Renamed to avoid conflict with oklch 'z'
  
    // 3. XYZ to Cone Response (LMS)
    const l_lms =  0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z_;
    const m_lms =  0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z_;
    const s_lms =  0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z_;
  
    // 4. Cone Response to Oklab (non-linear transformation)
    const l_lms_prime = Math.cbrt(l_lms);
    const m_lms_prime = Math.cbrt(m_lms);
    const s_lms_prime = Math.cbrt(s_lms);
  
    const l_oklab = 0.2104542553 * l_lms_prime + 0.7936177850 * m_lms_prime - 0.0040720468 * s_lms_prime;
    const a_oklab = 1.9779984951 * l_lms_prime - 2.4285922050 * m_lms_prime + 0.4505937099 * s_lms_prime;
    const b_oklab = 0.0259040371 * l_lms_prime + 0.7827717662 * m_lms_prime - 0.8086757660 * s_lms_prime;
  
    // 5. Oklab to OKLCH
    const c_oklch = Math.sqrt(a_oklab * a_oklab + b_oklab * b_oklab);
    let h_oklch = Math.atan2(b_oklab, a_oklab) * (180 / Math.PI);
    if (h_oklch < 0) {
      h_oklch += 360;
    }
    
    return { l: l_oklab, c: c_oklch, h: h_oklch };
  }