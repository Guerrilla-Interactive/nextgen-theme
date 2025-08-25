// sageMeadowTheme.ts  –  M2-An-L-Mt-Tx-Ax-RdP
//------------------------------------------------------------------
// Duotone · Analogous · Light · Muted · Texture · Accent‑neutral · Rounded‑Pressed
// Two adjacent muted greens (sage + olive) sit on airy off‑white paper surfaces.
// UI surfaces use subtle noise texture; components have gentle 8 px rounding and
// an inset "pressed" shadow to echo physical letter‑press.

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /* ----------------------------------------------------------------
     1. RAW COLOR TOKENS - Sage Meadow Light Palette
     ----------------------------------------------------------------*/
  const sageMeadowLightRawColors = [
    // Linen — overall page background (warm off‑white, textured)
    {
      tokenSpecificName: "Linen",
      description: "Page background (textured paper)",
      oklch: "oklch(0.98 0.005 100)" as OklchString,
      roles: ["background"],
      category: "shade",
    },
  
    // Deep Moss — universal foreground text
    {
      tokenSpecificName: "Deep Moss",
      description: "Primary text colour on all surfaces",
      oklch: "oklch(0.28 0.04 150)" as OklchString, // #34473b
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
  
    // Parchment — card & popover surfaces (paper with tiny texture)
    {
      tokenSpecificName: "Parchment",
      description: "Cards, popovers, & on‑colour text",
      oklch: "oklch(0.97 0.003 100)" as OklchString,
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColor: "oklch(0.28 0.04 150)" as OklchString,
    },
  
    // Sage — primary accent hue (lighter green)
    {
      tokenSpecificName: "Sage",
      description: "Primary actions & focus ring (muted green)",
      oklch: "oklch(0.85 0.05 140)" as OklchString, // pastel sage
      roles: ["primary", "ring", "chart-1", "chart-2", "sidebar-primary"],
      category: "color",
      onColor: "oklch(1 0 0)" as OklchString,
    },
  
    // Olive — secondary surface/action hue (adjacent to sage)
    {
      tokenSpecificName: "Olive",
      description: "Secondary buttons, sidebar background, borders, inputs",
      oklch: "oklch(0.80 0.06 120)" as OklchString,
      roles: ["secondary", "sidebar", "border", "input"],
      category: "color",
      onColor: "oklch(0.28 0.04 150)" as OklchString,
    },
  
    // Dark Olive — text on Olive surfaces
    {
      tokenSpecificName: "Dark Olive",
      description: "Text on secondary surfaces",
      oklch: "oklch(0.35 0.05 130)" as OklchString,
      roles: ["secondary-foreground"],
      category: "shade",
    },
  
    // Misty Sage — muted UI fills
    {
      tokenSpecificName: "Misty Sage",
      description: "Muted surfaces (e.g., table rows)",
      oklch: "oklch(0.93 0.03 135)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.35 0.05 130)" as OklchString,
    },
  
    // Moss — text on muted surfaces
    {
      tokenSpecificName: "Moss",
      description: "Text on muted surfaces",
      oklch: "oklch(0.35 0.05 130)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Clay — neutral destructive / warning (muted red‑brown)
    {
      tokenSpecificName: "Clay",
      description: "Destructive & warning actions (earthy red)",
      oklch: "oklch(0.70 0.06 50)" as OklchString,
      roles: ["destructive"],
      category: "color",
      onColor: "oklch(1 0 0)" as OklchString,
    },
  
    // Fern — success indication (slightly higher chroma to differentiate)
    {
      tokenSpecificName: "Fern",
      description: "Success indication",
      oklch: "oklch(0.78 0.07 145)" as OklchString,
      roles: ["success"],
      category: "color",
      onColor: "oklch(1 0 0)" as OklchString,
    },
  
    // Chart shades (analogue ramp of green‑olive)
    {
      tokenSpecificName: "Chart Sage 2",
      description: "Chart colour 2",
      oklch: "oklch(0.70 0.06 140)" as OklchString,
      roles: ["chart-2"],
      category: "color",
    },
    {
      tokenSpecificName: "Chart Olive 2",
      description: "Chart colour 3",
      oklch: "oklch(0.65 0.07 120)" as OklchString,
      roles: ["chart-3"],
      category: "color",
    },
    {
      tokenSpecificName: "Chart Sage 3",
      description: "Chart colour 4",
      oklch: "oklch(0.58 0.06 140)" as OklchString,
      roles: ["chart-4"],
      category: "color",
    },
    {
      tokenSpecificName: "Chart Olive 3",
      description: "Chart colour 5",
      oklch: "oklch(0.52 0.07 120)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    },
  ] as RawColorDefinition[];
  
  /* ----------------------------------------------------------------
     2. STYLE GUIDE (rounded‑pressed → soft radius, inset shadows)
     ----------------------------------------------------------------*/
  const sageMeadowLightStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Sage", primaryForeground: "Parchment" },
    secondaryColors:     { secondary: "Olive", secondaryForeground: "Dark Olive" },
    accentColors:        { accent: "Sage", accentForeground: "Parchment" }, // Accent‑neutral (Ax)
    cardColors:          { card: "Parchment", cardForeground: "Deep Moss" },
    popoverColors:       { popover: "Parchment", popoverForeground: "Deep Moss" },
    mutedColors:         { muted: "Misty Sage", mutedForeground: "Moss" },
    destructiveColors:   { destructive: "Clay", destructiveForeground: "Parchment" },
    successColors:       { success: "Fern", successForeground: "Parchment" },
    inputColors:         { input: "Olive", inputForeground: "Dark Olive" },
    borderColors:        { border: "Olive" },
    ringColors:          { ring: "Sage" },
    radius: {
      radiusSm: "0.25rem",    // 4 px
      radiusMd: "0.5rem",     // 8 px (matches Rd)
      radiusLg: "0.75rem",    // 12 px
      radiusXl: "1rem",       // 16 px
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /* ----------------------------------------------------------------
     3. OTHER VARS (Texture + pressed inset shadows)
     ----------------------------------------------------------------*/
  const sageMeadowLightOtherVars = {
    background: "Linen",
    foreground: "Deep Moss",
    radiusBase: "0.5rem",
  
    // Texture URL (subtle paper noise)
    textureBgImage: "url('/textures/fiber-paper.png')", // referenced in app CSS
  
    // Inset (pressed) shadows for RdP
    shadowXs: "inset 0 1px 2px 0 oklch(0 0 0 / 0.03)",
    shadowSm: "inset 0 2px 4px 0 oklch(0 0 0 / 0.05)",
    shadowMd: "inset 0 3px 6px 0 oklch(0 0 0 / 0.06)",
    shadowLg: "inset 0 4px 8px 0 oklch(0 0 0 / 0.07)",
    shadowXl: "inset 0 6px 12px 0 oklch(0 0 0 / 0.08)",
    "shadow-2xs": "inset 0 1px 1.5px 0 oklch(0 0 0 / 0.02)",
    "shadow-2xl": "inset 0 8px 16px 0 oklch(0 0 0 / 0.10)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    chart1: "Sage",
    chart2: "Sage",
    chart3: "Chart Olive 2",
    chart4: "Chart Sage 3",
    chart5: "Chart Olive 3",
  };
  
  /* ----------------------------------------------------------------
     4. BRAND OBJECT - Sage Meadow Light
     ----------------------------------------------------------------*/
  const sageMeadowLightColors = generateBrandColors("sage-meadow-light", sageMeadowLightRawColors);
  
  export const sageMeadowBrand: Brand = {
    name: "Sage Meadow",
    rating: 90,
    businessDetails: {
      name: "Sage Meadow Light Studio",
      industry: "wellness_app",
      personality: {
        vintageModern: 45,
        seasonedYouthful: 35,
        gracefulBold: 25,
        playfulElegant: 55,
        valueSmartLuxurious: 50,
        structuredNatural: 70,
        symbolicRealistic: 60,
      },
    },
    colors: sageMeadowLightColors,
    fonts: [
      {
        name: "Work Sans",
        distributor: "Google Fonts",
        description: "Humanist sans with friendly curves—good for wellness tone.",
        family: "'Work Sans', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Cormorant Garamond",
        distributor: "Google Fonts",
        description: "Elegant serif that pairs softly with muted greens.",
        family: "'Cormorant Garamond', 'Work Sans', serif",
        roles: ["display", "h1", "h2", "h3", "hero-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 900 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Monospaced font for code snippets.",
        family: "'JetBrains Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: sageMeadowLightStyleGuide,
    themeCssVariables: createThemeCssVars(
      "sage-meadow-light",
      sageMeadowLightColors,
      sageMeadowLightStyleGuide,
      sageMeadowLightOtherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Sage and olive greens
      brightness: 'light',               // Light theme
      saturation: 'muted',               // Muted natural colors
      colorHarmony: 'analogous',         // Adjacent greens
      accentUsage: 'minimal',            // Accent-neutral design
      cornerStyle: 'rounded',            // 0.5rem rounded corners
      elevation: 'subtle-depth',         // Subtle inset shadows for pressed effect
    },
  };
  