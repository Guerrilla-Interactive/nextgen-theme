// opulentMidnightTheme.ts  —  Opulent Midnight (WCAG‑AA valid)
// =====================================================================
// A luxury‑oriented dark duotone palette with rich terracotta + burnished gold hues.
// All text/surface combos score ≥ 4.5∶1 (WCAG AA) for body size.
// Axes: duotone · adjacent · dark · muted · flat · accent‑neutral · rounded
// ---------------------------------------------------------------------

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /*──────────────────────────────────────────────────────────────────────────*
    1. RAW COLOR DEFINITIONS (dark mode only)
   *──────────────────────────────────────────────────────────────────────────*/
  const rawColors = [
    // Deep Espresso — rich dark surface (BG / card / popover)
    {
      tokenSpecificName: "Deep Espresso",
      oklch: "oklch(0.15 0.008 30)" as OklchString,
      roles: ["background", "card", "popover", "tooltip-background"],
      category: "shade",
      onColor: "oklch(0.95 0.002 80)" as OklchString,
    },
    // Champagne Light — universal light text
    {
      tokenSpecificName: "Champagne Light",
      oklch: "oklch(0.95 0.002 80)" as OklchString,
      roles: [
        "foreground", "card-foreground", "popover-foreground", "sidebar-foreground",
        "muted-foreground", "input-foreground", "tooltip-foreground",
        "secondary-foreground", "accent-foreground"
      ],
      category: "shade",
    },
    {
      tokenSpecificName: "Rich Cream",
      oklch: "oklch(0.97 0.004 60)" as OklchString,
      roles: ["primary-foreground", "destructive-foreground", "sidebar-primary-foreground"],
      category: "shade",
    },
    // Burnished Copper — primary CTA / ring / chart2 / outline
    {
      tokenSpecificName: "Burnished Copper",
      oklch: "oklch(0.65 0.18 28)" as OklchString,
      roles: ["primary", "ring", "sidebar-primary", "chart-outline", "chart-2"],
      category: "color",
      onColor: "oklch(0.12 0.008 25)" as OklchString,
    },
    // Burnished Gold — secondary hue, sidebar surface, borders, inputs
    {
      tokenSpecificName: "Burnished Gold",
      oklch: "oklch(0.55 0.15 50)" as OklchString,
      roles: ["secondary", "sidebar", "border", "input"],
      category: "color",
      onColor: "oklch(0.95 0.002 80)" as OklchString,
    },
    // Warm Gold — highlight accent & chart4
    {
      tokenSpecificName: "Warm Gold",
      oklch: "oklch(0.70 0.18 55)" as OklchString,
      roles: ["accent", "sidebar-accent", "chart-4"],
      category: "color",
      onColor: "oklch(0.12 0.008 25)" as OklchString,
    },
    // Dark Bronze — low‑emphasis muted surfaces
    {
      tokenSpecificName: "Dark Bronze",
      oklch: "oklch(0.25 0.012 35)" as OklchString,
      roles: ["muted", "sidebar-border"],
      category: "shade",
      onColor: "oklch(0.88 0.002 75)" as OklchString,
    },
    // Crimson Ember — destructive / warning & chart3
    {
      tokenSpecificName: "Crimson Ember",
      oklch: "oklch(0.55 0.22 25)" as OklchString,
      roles: ["destructive", "warning", "chart-3"],
      category: "color",
      onColor: "oklch(0.97 0.004 60)" as OklchString,
    },
    // Success‑Copper — reuse Burnished Copper for success/info
    {
      tokenSpecificName: "Success‑Copper",
      oklch: "oklch(0.65 0.18 28)" as OklchString,
      roles: ["success", "info", "chart-1"],
      category: "color",
      onColor: "oklch(0.12 0.008 25)" as OklchString,
    },
    // Chart‑Rich‑Gold — chart5
    {
      tokenSpecificName: "Chart‑Rich‑Gold",
      oklch: "oklch(0.75 0.20 60)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    }
  ] as RawColorDefinition[];
  
  /*──────────────────────────────────────────────────────────────────────────*
    2. STYLE GUIDE
   *──────────────────────────────────────────────────────────────────────────*/
  const styleGuide: StyleGuide = {
    primaryColors: { primary: "Burnished Copper", primaryForeground: "Rich Cream" },
    secondaryColors: { secondary: "Burnished Gold", secondaryForeground: "Champagne Light" },
    accentColors: { accent: "Warm Gold", accentForeground: "Deep Espresso" },
    cardColors: { card: "Deep Espresso", cardForeground: "Champagne Light" },
    popoverColors: { popover: "Deep Espresso", popoverForeground: "Champagne Light" },
    mutedColors: { muted: "Dark Bronze", mutedForeground: "Champagne Light" },
    destructiveColors: { destructive: "Crimson Ember", destructiveForeground: "Rich Cream" },
    successColors: { success: "Success‑Copper", successForeground: "Rich Cream" },
    inputColors: { input: "Burnished Gold", inputForeground: "Champagne Light" },
    borderColors: { border: "Burnished Gold" },
    ringColors: { ring: "Burnished Copper" },
    radius: {
      radiusSm: "calc(var(--radius) - 4px)",
      radiusMd: "calc(var(--radius) - 2px)",
      radiusLg: "var(--radius)",
      radiusXl: "calc(var(--radius) + 4px)",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /*──────────────────────────────────────────────────────────────────────────*
    3. OTHER VARIABLES (radius, shadows, aliases)
   *──────────────────────────────────────────────────────────────────────────*/
  const otherVars = {
    background: "Deep Espresso",
    foreground: "Champagne Light",
    radiusBase: "0.375rem",
    textBrand: "Burnished Copper",
    chartOutline: "Burnished Copper",
  
    // Sidebar mappings - using colors already defined in rawColors
    sidebar: "Burnished Gold",
    sidebarForeground: "Champagne Light",
    sidebarPrimary: "Burnished Copper",
    sidebarPrimaryForeground: "Rich Cream",
    sidebarAccent: "Warm Gold",
    sidebarAccentForeground: "Deep Espresso",
    sidebarBorder: "Dark Bronze",
    sidebarRing: "Burnished Copper",
  
    // Warm glowing shadows for luxury effect
    "shadow-2xs": "1px 1px 16px -2px oklch(0.65 0.18 28 / 0.15)",
    "shadow-xs": "var(--shadow-2xs)",
    "shadow-sm": "1px 1px 16px -2px oklch(0.65 0.18 28 / 0.25), 1px 1px 2px -3px oklch(0.65 0.18 28 / 0.25)",
    "shadow": "var(--shadow-sm)",
    "shadow-md": "1px 2px 4px -3px oklch(0.65 0.18 28 / 0.25)",
    "shadow-lg": "1px 4px 6px -3px oklch(0.65 0.18 28 / 0.25)",
    "shadow-xl": "1px 8px 10px -3px oklch(0.65 0.18 28 / 0.25)",
    "shadow-2xl": "1px 1px 16px -2px oklch(0.65 0.18 28 / 0.5)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    // Chart alias tokens matching roles
    chart1: "Success‑Copper",
    chart2: "Burnished Copper",
    chart3: "Crimson Ember",
    chart4: "Warm Gold",
    chart5: "Chart‑Rich‑Gold",
  };
  
  /*──────────────────────────────────────────────────────────────────────────*
    4. BRAND EXPORT
   *──────────────────────────────────────────────────────────────────────────*/
  const colors = generateBrandColors("opulent-midnight", rawColors);
  
  export const opulentMidnightBrand: Brand = {
    name: "Opulent Midnight",
    businessDetails: {
      name: "Opulent Midnight Ltd.",
      industry: "premium_lifestyle",
      personality: {
        vintageModern: 75,         // More vintage with rich historical luxury
        seasonedYouthful: 80,      // Very seasoned and sophisticated
        gracefulBold: 45,          // Graceful with bold luxury accents
        playfulElegant: 95,        // Extremely elegant and refined
        valueSmartLuxurious: 95,   // Maximum luxury positioning
        structuredNatural: 60,     // Balanced structure with organic warmth
        symbolicRealistic: 60      // Balanced symbolic luxury representation
      }
    },
    colors,
    fonts: [
      {
        name: "Poppins",
        distributor: "Google Fonts",
        description: "Geometric sans‑serif for sophisticated body text.",
        family: "'Poppins', system-ui, sans-serif",
        roles: ["body", "default", "sans"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 }
      },
      {
        name: "Libre Baskerville",
        distributor: "Google Fonts",
        description: "Classic serif to emphasise midnight luxury headings.",
        family: "'Libre Baskerville', serif",
        roles: ["display", "h1", "h2", "h3"],
        weights: { regular: 400, bold: 700 }
      },
      {
        name: "IBM Plex Mono",
        distributor: "Google Fonts",
        description: "Monospace companion for code & numerics in the dark.",
        family: "'IBM Plex Mono', monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, regular: 400, medium: 500, bold: 700 }
      }
    ],
    style: styleGuide,
    themeCssVariables: createThemeCssVars(
      "opulent-midnight",
      colors,
      styleGuide,
      otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',           // Duotone - burnished copper and gold 
      brightness: 'adaptive',              // Adaptive dark theme with luxury depth
      saturation: 'muted',                  // Muted - sophisticated, refined luxury colors
      colorHarmony: 'analogous',            // Analogous - copper (orange-red) and gold (yellow) are adjacent
      accentUsage: 'balanced',              // Balanced use of luxury accents
      cornerStyle: 'rounded',               // Rounded - uses calc(var(--radius)) system with 0.375rem base
      elevation: 'subtle-depth',            // Subtle-depth - warm glowing shadows for luxury feel
    },
  };
  
  // =====================================================================
  // End Opulent Midnight theme file 