// primaryPlayTheme.ts  –  T3-Td-L-Vr-Fl-Nx-CrF
//-------------------------------------------------------------
// Triadic · Triadic-rel · Light · Vibrant · Flat · No-accent · Circle-Flat
// Three equally weighted vibrant hues (crimson, ultramarine, sunshine)
// on a bright neutral canvas. Geometry favours perfect circles.

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /* ------------------------------------------------------------
     1. RAW COLOR TOKENS
     --------------------------------------------------------- */
  const primaryPlayRawColors = [
    // Paper — global background
    {
      tokenSpecificName: "Paper",
      description: "Page background",
      oklchLight: "oklch(1 0 0)" as OklchString,          // white
      oklchDark:  "oklch(0.20 0 0)" as OklchString,       // charcoal for dark mode fallback
      roles: ["background"],
      category: "shade",
    },
  
    // Ink — universal foreground text
    {
      tokenSpecificName: "Ink",
      description: "Primary text colour",
      oklchLight: "oklch(0.18 0.02 260)" as OklchString,  // near-black
      oklchDark:  "oklch(0.96 0.02 260)" as OklchString,  // near-white
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
  
    // Card surface (slightly off-white for depth)
    {
      tokenSpecificName: "Canvas",
      description: "Cards, popovers, and on-color text",
      oklchLight: "oklch(0.98 0 0)" as OklchString,
      oklchDark:  "oklch(0.24 0 0)" as OklchString,
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColorLight: "oklch(0.18 0.02 260)" as OklchString,
      onColorDark:  "oklch(0.96 0.02 260)" as OklchString,
    },
  
    // Crimson — triadic hue 1 (primary)
    {
      tokenSpecificName: "Crimson",
      description: "First triadic hue (red)",
      oklchLight: "oklch(0.72 0.21 25)" as OklchString,
      oklchDark:  "oklch(0.62 0.21 25)" as OklchString,
      roles: ["primary", "chart-1"],
      category: "color",
      onColorLight: "oklch(1 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
  
    // Ultramarine — triadic hue 2 (secondary)
    {
      tokenSpecificName: "Ultramarine",
      description: "Second triadic hue (blue)",
      oklchLight: "oklch(0.68 0.20 275)" as OklchString,
      oklchDark:  "oklch(0.58 0.20 275)" as OklchString,
      roles: ["secondary", "ring", "chart-2", "sidebar"],
      category: "color",
      onColorLight: "oklch(1 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
  
    // Sunshine — triadic hue 3 (accent-ish but equal weight)
    {
      tokenSpecificName: "Sunshine",
      description: "Third triadic hue (yellow)",
      oklchLight: "oklch(0.92 0.13 100)" as OklchString,
      oklchDark:  "oklch(0.80 0.13 100)" as OklchString,
      roles: ["accent", "chart-3", "sidebar-accent"],
      category: "color",
      onColorLight: "oklch(0.18 0.02 260)" as OklchString,
      onColorDark:  "oklch(0.18 0.02 260)" as OklchString,
    },
  
    // Light Gray — muted surfaces
    {
      tokenSpecificName: "Light Gray",
      description: "Muted UI surfaces",
      oklchLight: "oklch(0.94 0 0)" as OklchString,
      oklchDark:  "oklch(0.30 0 0)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColorLight: "oklch(0.25 0.02 260)" as OklchString,
      onColorDark:  "oklch(0.92 0.02 260)" as OklchString,
    },
  
    // Mid Gray — text on muted
    {
      tokenSpecificName: "Mid Gray",
      description: "Text on muted surfaces",
      oklchLight: "oklch(0.25 0.02 260)" as OklchString,
      oklchDark:  "oklch(0.92 0.02 260)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Scarlet — destructive (keeps triadic harmony by re-using red tone)
    {
      tokenSpecificName: "Scarlet",
      description: "Destructive & warning",
      oklchLight: "oklch(0.72 0.21 25)" as OklchString,
      oklchDark:  "oklch(0.62 0.21 25)" as OklchString,
      roles: ["destructive", "warning"],
      category: "color",
      onColorLight: "oklch(1 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
  
    // Additional chart hues (mixes of primary trio)
    {
      tokenSpecificName: "Violet Mix",
      description: "Chart-4 (red+blue mix)",
      oklchLight: "oklch(0.66 0.18 305)" as OklchString,
      oklchDark:  "oklch(0.56 0.18 305)" as OklchString,
      roles: ["chart-4"],
      category: "color",
    },
    {
      tokenSpecificName: "Orange Mix",
      description: "Chart-5 (red+yellow mix)",
      oklchLight: "oklch(0.85 0.17 65)" as OklchString,
      oklchDark:  "oklch(0.70 0.17 65)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    },
  ] as RawColorDefinition[];
  
  /* ------------------------------------------------------------
     2. STYLE GUIDE (circle-flat → huge radii, no shadow)
     --------------------------------------------------------- */
  const primaryPlayStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Crimson", primaryForeground: "Canvas" },
    secondaryColors:     { secondary: "Ultramarine", secondaryForeground: "Canvas" },
    accentColors:        { accent: "Sunshine", accentForeground: "Ink" },
    cardColors:          { card: "Canvas", cardForeground: "Ink" },
    popoverColors:       { popover: "Canvas", popoverForeground: "Ink" },
    mutedColors:         { muted: "Light Gray", mutedForeground: "Mid Gray" },
    destructiveColors:   { destructive: "Scarlet", destructiveForeground: "Canvas" },
    successColors:       { success: "Ultramarine", successForeground: "Canvas" },
    infoColors:          { info: "Crimson", infoForeground: "Canvas" },
    warningColors:       { warning: "Scarlet", warningForeground: "Canvas" },
    inputColors:         { input: "Light Gray", inputForeground: "Ink" },
    borderColors:        { border: "Light Gray" },
    ringColors:          { ring: "Ultramarine" },
    radius: {
      radiusSm: "9999px",
      radiusMd: "9999px",
      radiusLg: "9999px",
      radiusXl: "9999px",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /* ------------------------------------------------------------
     3. OTHER VARS
     --------------------------------------------------------- */
  const primaryPlayOtherVars = {
    background: "Paper",
    foreground: "Ink",
    radiusBase: "9999px",
  
    // Shadows (CrF → flat, so minimal/no shadows)
    shadowXs: "none",
    shadowSm: "none",
    shadowMd: "none",
    shadowLg: "none",
    shadowXl: "none",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    chart1: "Crimson",
    chart2: "Ultramarine",
    chart3: "Sunshine",
    chart4: "Violet Mix",
    chart5: "Orange Mix",
  };
  
  /* ------------------------------------------------------------
     4. BRAND OBJECT
     --------------------------------------------------------- */
  const primaryPlayColors = generateBrandColors("primary-play", primaryPlayRawColors);
  
  export const primaryPlayBrand: Brand = {
    name: "Primary Play",
    businessDetails: {
      name: "Primary Play Studio",
      industry: "edtech",
      personality: {
        vintageModern: 30,
        seasonedYouthful: 30,
        gracefulBold: 60,
        playfulElegant: 70,
        valueSmartLuxurious: 40,
        structuredNatural: 45,
        symbolicRealistic: 50,
      },
    },
    colors: primaryPlayColors,
    fonts: [
      {
        name: "Poppins",
        distributor: "Google Fonts",
        description: "Geometric sans with friendly curves — suits circle motif.",
        family: "'Poppins', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Fredoka",
        distributor: "Google Fonts",
        description: "Rounded display face echoing circular forms.",
        family: "'Fredoka', 'Poppins', sans-serif",
        roles: ["display", "h1", "h2", "h3", "hero-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
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
    style: primaryPlayStyleGuide,
    themeCssVariables: createThemeCssVars(
      "primary-play",
      primaryPlayColors,
      primaryPlayStyleGuide,
      primaryPlayOtherVars
    ),
    prefersDarkSchemeForChrome: false,
  };
  