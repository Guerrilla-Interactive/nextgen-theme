// monochromeClarityTheme.ts  –  A-Hi-Mt-Fl-Nx-SqF
//--------------------------------------------------------------
// Achromatic · High‑contrast · Muted · Flat · No‑accent · Square‑Flat
// A purely grayscale palette that swings from pure white to pure black,
// designed for maximum readability without chromatic cues.

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /* -------------------------------------------------------------
     1. RAW COLOR TOKENS
     ---------------------------------------------------------- */
  const monoClarityRawColors = [
    // Paper — absolute white background
    {
      tokenSpecificName: "Paper",
      description: "Global page background (white)",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0 0 0)" as OklchString, // inverted for dark fallback
      roles: ["background"],
      category: "shade",
    },
  
    // Ink — absolute black foreground
    {
      tokenSpecificName: "Ink",
      description: "Primary text (black on white, white on black)",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark:  "oklch(1 0 0)" as OklchString,
      roles: [
        "foreground",
        "card-foreground",
        "popover-foreground",
        "input-foreground",
        "sidebar-foreground",
        "sidebar-accent-foreground",
      ],
      category: "shade",
    },
  
    // Canvas — light gray surface for cards/popovers
    {
      tokenSpecificName: "Canvas",
      description: "Cards & popover backgrounds",
      oklchLight: "oklch(0.96 0 0)" as OklchString,   // #f5f5f5
      oklchDark:  "oklch(0.12 0 0)" as OklchString,   // #1f1f1f
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
  
    // Charcoal — primary interactive element fill & ring
    {
      tokenSpecificName: "Charcoal",
      description: "Primary buttons & focus ring",
      oklchLight: "oklch(0.25 0 0)" as OklchString,   // #404040
      oklchDark:  "oklch(0.85 0 0)" as OklchString,   // #d9d9d9
      roles: ["primary", "ring", "chart-1", "sidebar-primary"],
      category: "color",        // still treated as color but achromatic
      onColorLight: "oklch(1 0 0)" as OklchString,
      onColorDark:  "oklch(0 0 0)" as OklchString,
    },
  
    // Steel — secondary element fill, borders, inputs
    {
      tokenSpecificName: "Steel",
      description: "Secondary buttons, borders, inputs",
      oklchLight: "oklch(0.80 0 0)" as OklchString,   // #cccccc
      oklchDark:  "oklch(0.20 0 0)" as OklchString,   // #333333
      roles: ["secondary", "border", "input", "sidebar"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
  
    // Smoke — muted surface (table rows, subtle fills)
    {
      tokenSpecificName: "Smoke",
      description: "Muted surfaces",
      oklchLight: "oklch(0.90 0 0)" as OklchString,   // #e6e6e6
      oklchDark:  "oklch(0.15 0 0)" as OklchString,   // #262626
      roles: ["muted"],
      category: "shade",
      onColorLight: "oklch(0.20 0 0)" as OklchString,
      onColorDark:  "oklch(0.90 0 0)" as OklchString,
    },
  
    // Fog — text on muted
    {
      tokenSpecificName: "Fog",
      description: "Text on muted surfaces",
      oklchLight: "oklch(0.35 0 0)" as OklchString,   // #595959
      oklchDark:  "oklch(0.75 0 0)" as OklchString,   // #bfbfbf
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Alert Black — destructive & warning (high‑contrast black on white)
    {
      tokenSpecificName: "Alert Black",
      description: "Destructive / warning actions (keeps achromatic)",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark:  "oklch(1 0 0)" as OklchString,
      roles: ["destructive", "warning"],
      category: "shade",
      onColorLight: "oklch(1 0 0)" as OklchString,
      onColorDark:  "oklch(0 0 0)" as OklchString,
    },
  
    // Success Gray — neutral success/info indicator
    {
      tokenSpecificName: "Success Gray",
      description: "Success & info actions (neutral tone)",
      oklchLight: "oklch(0.60 0 0)" as OklchString,   // #999999
      oklchDark:  "oklch(0.40 0 0)" as OklchString,   // #666666
      roles: ["success", "info"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
  
    // Chart grays (five-step ramp)
    {
      tokenSpecificName: "Graphite",
      description: "Chart‑2 (dark gray)",
      oklchLight: "oklch(0.30 0 0)" as OklchString,
      oklchDark:  "oklch(0.70 0 0)" as OklchString,
      roles: ["chart-2"],
      category: "shade",
    },
    {
      tokenSpecificName: "Pebble",
      description: "Chart‑3 (mid gray)",
      oklchLight: "oklch(0.50 0 0)" as OklchString,
      oklchDark:  "oklch(0.50 0 0)" as OklchString,
      roles: ["chart-3"],
      category: "shade",
    },
    {
      tokenSpecificName: "Ash",
      description: "Chart‑4 (light gray)",
      oklchLight: "oklch(0.70 0 0)" as OklchString,
      oklchDark:  "oklch(0.30 0 0)" as OklchString,
      roles: ["chart-4"],
      category: "shade",
    },
    {
      tokenSpecificName: "Chalk",
      description: "Chart‑5 (very light gray)",
      oklchLight: "oklch(0.85 0 0)" as OklchString,
      oklchDark:  "oklch(0.15 0 0)" as OklchString,
      roles: ["chart-5"],
      category: "shade",
    },
  ] as RawColorDefinition[];
  
  /* -------------------------------------------------------------
     2. STYLE GUIDE (square‑flat: 0 radius, no shadows)
     ---------------------------------------------------------- */
  const monoClarityStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Charcoal", primaryForeground: "Paper" },
    secondaryColors:     { secondary: "Steel", secondaryForeground: "Ink" },
    accentColors:        { accent: "Steel", accentForeground: "Ink" }, // accent same as secondary (Nx)
    cardColors:          { card: "Canvas", cardForeground: "Ink" },
    popoverColors:       { popover: "Canvas", popoverForeground: "Ink" },
    mutedColors:         { muted: "Smoke", mutedForeground: "Fog" },
    destructiveColors:   { destructive: "Alert Black", destructiveForeground: "Paper" },
    successColors:       { success: "Success Gray", successForeground: "Ink" },
    infoColors:          { info: "Success Gray", infoForeground: "Ink" },
    warningColors:       { warning: "Alert Black", warningForeground: "Paper" },
    inputColors:         { input: "Steel", inputForeground: "Ink" },
    borderColors:        { border: "Steel" },
    ringColors:          { ring: "Charcoal" },
    radius: {
      radiusSm: "0px",
      radiusMd: "0px",
      radiusLg: "0px",
      radiusXl: "0px",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /* -------------------------------------------------------------
     3. OTHER VARS
     ---------------------------------------------------------- */
  const monoClarityOtherVars = {
    background: "Paper",
    foreground: "Ink",
    radiusBase: "0px",
  
    // No shadows for SqF
    shadowXs: "none",
    shadowSm: "none",
    shadowMd: "none",
    shadowLg: "none",
    shadowXl: "none",
    "shadow-2xs": "none",
    "shadow-2xl": "none",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    chart1: "Charcoal",
    chart2: "Graphite",
    chart3: "Pebble",
    chart4: "Ash",
    chart5: "Chalk",
  };
  
  /* -------------------------------------------------------------
     4. BRAND OBJECT
     ---------------------------------------------------------- */
  const monoClarityColors = generateBrandColors("monochrome-clarity", monoClarityRawColors);
  
  export const monochromeClarityBrand: Brand = {
    name: "Monochrome Clarity",
    businessDetails: {
      name: "Monochrome Clarity Co",
      industry: "editorial_platform",
      personality: {
        vintageModern: 50,
        seasonedYouthful: 40,
        gracefulBold: 30,
        playfulElegant: 20,
        valueSmartLuxurious: 70,
        structuredNatural: 60,
        symbolicRealistic: 55,
      },
    },
    colors: monoClarityColors,
    fonts: [
      {
        name: "Inter",
        distributor: "Google Fonts",
        description: "Neutral grotesque sans for crisp text.",
        family: "'Inter', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "EB Garamond",
        distributor: "Google Fonts",
        description: "Classic serif for editorial headlines.",
        family: "'EB Garamond', 'Inter', serif",
        roles: ["display", "h1", "h2", "h3", "hero-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 900 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Monospaced font for code blocks.",
        family: "'JetBrains Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: monoClarityStyleGuide,
    themeCssVariables: createThemeCssVars(
      "monochrome-clarity",
      monoClarityColors,
      monoClarityStyleGuide,
      monoClarityOtherVars
    ),
    prefersDarkSchemeForChrome: false,
  };
  