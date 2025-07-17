// forestDuskTheme.ts  –  M2-An-D-Mt-Tx-Ax-RdP
//------------------------------------------------------------------
// Duotone · Analogous · Dark · Muted · Texture · Accent‑neutral · Rounded‑Pressed
// Deep forest greens and earthy olives on rich dark surfaces.
// UI surfaces use subtle texture; components have gentle rounding and
// layered shadows to create depth in the evening forest atmosphere.

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /* ----------------------------------------------------------------
     1. RAW COLOR TOKENS - Forest Dusk Dark Palette
     ----------------------------------------------------------------*/
  const forestDuskRawColors = [
    // Deep Earth — overall page background (rich dark brown-green)
    {
      tokenSpecificName: "Deep Earth",
      description: "Page background (deep forest floor)",
      oklch: "oklch(0.22 0.005 100)" as OklchString,
      roles: ["background"],
      category: "shade",
    },
  
    // Moonlit Sage — universal foreground text
    {
      tokenSpecificName: "Moonlit Sage",
      description: "Primary text colour on all surfaces",
      oklch: "oklch(0.92 0.02 150)" as OklchString, // #e7f0ec
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
  
    // Dark Bark — card & popover surfaces (elevated forest surfaces)
    {
      tokenSpecificName: "Dark Bark",
      description: "Cards, popovers, & elevated surfaces",
      oklch: "oklch(0.26 0.003 100)" as OklchString,
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColor: "oklch(0.92 0.02 150)" as OklchString,
    },
  
    // Forest Sage — primary accent hue (muted forest green)
    {
      tokenSpecificName: "Forest Sage",
      description: "Primary actions & focus ring (deep forest green)",
      oklch: "oklch(0.55 0.05 140)" as OklchString,
      roles: ["primary", "ring", "chart-1", "sidebar-primary"],
      category: "color",
      onColor: "oklch(0.18 0.04 150)" as OklchString,
    },
  
    // Deep Olive — secondary surface/action hue (adjacent to sage)
    {
      tokenSpecificName: "Deep Olive",
      description: "Secondary buttons, sidebar background, borders, inputs",
      oklch: "oklch(0.45 0.06 120)" as OklchString,
      roles: ["secondary", "sidebar", "border", "input"],
      category: "color",
      onColor: "oklch(0.92 0.02 150)" as OklchString,
    },
  
    // Light Olive — text on Deep Olive surfaces
    {
      tokenSpecificName: "Light Olive",
      description: "Text on secondary surfaces",
      oklch: "oklch(0.88 0.02 130)" as OklchString,
      roles: ["secondary-foreground"],
      category: "shade",
    },
  
    // Shadow Moss — muted UI fills
    {
      tokenSpecificName: "Shadow Moss",
      description: "Muted surfaces (e.g., table rows)",
      oklch: "oklch(0.30 0.03 135)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.85 0.02 150)" as OklchString,
    },
  
    // Pale Moss — text on muted surfaces
    {
      tokenSpecificName: "Pale Moss",
      description: "Text on muted surfaces",
      oklch: "oklch(0.85 0.02 150)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Ember Clay — neutral destructive (muted red‑brown)
    {
      tokenSpecificName: "Ember Clay",
      description: "Destructive actions (earthy ember red)",
      oklch: "oklch(0.55 0.05 50)" as OklchString,
      roles: ["destructive"],
      category: "color",
      onColor: "oklch(0.15 0.04 150)" as OklchString,
    },
  
    // Night Fern — success indication (slightly higher chroma to differentiate)
    {
      tokenSpecificName: "Night Fern",
      description: "Success indication",
      oklch: "oklch(0.52 0.07 145)" as OklchString,
      roles: ["success"],
      category: "color",
      onColor: "oklch(0.18 0.04 150)" as OklchString,
    },
  
    // Chart shades (analogue ramp of dark green‑olive)
    {
      tokenSpecificName: "Chart Forest 2",
      description: "Chart colour 2",
      oklch: "oklch(0.45 0.06 140)" as OklchString,
      roles: ["chart-2"],
      category: "color",
    },
    {
      tokenSpecificName: "Chart Dusk Olive",
      description: "Chart colour 3",
      oklch: "oklch(0.42 0.07 120)" as OklchString,
      roles: ["chart-3"],
      category: "color",
    },
    {
      tokenSpecificName: "Chart Forest 3",
      description: "Chart colour 4",
      oklch: "oklch(0.38 0.06 140)" as OklchString,
      roles: ["chart-4"],
      category: "color",
    },
    {
      tokenSpecificName: "Chart Deep Olive",
      description: "Chart colour 5",
      oklch: "oklch(0.34 0.07 120)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    },
  ] as RawColorDefinition[];
  
  /* ----------------------------------------------------------------
     2. STYLE GUIDE (rounded‑pressed → soft radius, layered shadows)
     ----------------------------------------------------------------*/
  const forestDuskStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Forest Sage", primaryForeground: "Dark Bark" },
    secondaryColors:     { secondary: "Deep Olive", secondaryForeground: "Light Olive" },
    accentColors:        { accent: "Forest Sage", accentForeground: "Dark Bark" }, // Accent‑neutral (Ax)
    cardColors:          { card: "Dark Bark", cardForeground: "Moonlit Sage" },
    popoverColors:       { popover: "Dark Bark", popoverForeground: "Moonlit Sage" },
    mutedColors:         { muted: "Shadow Moss", mutedForeground: "Pale Moss" },
    destructiveColors:   { destructive: "Ember Clay", destructiveForeground: "Dark Bark" },
    successColors:       { success: "Night Fern", successForeground: "Dark Bark" },
    inputColors:         { input: "Deep Olive", inputForeground: "Light Olive" },
    borderColors:        { border: "Deep Olive" },
    ringColors:          { ring: "Forest Sage" },
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
     3. OTHER VARS (Texture + layered shadows for depth)
     ----------------------------------------------------------------*/
  const forestDuskOtherVars = {
    background: "Deep Earth",
    foreground: "Moonlit Sage",
    radiusBase: "0.5rem",
  
    // Texture URL (subtle dark forest texture)
    textureBgImage: "url('/textures/dark-wood-grain.png')", // referenced in app CSS
  
    // Layered shadows for forest depth
    shadowXs: "0 1px 2px 0 oklch(0 0 0 / 0.8)",
    shadowSm: "0 2px 4px 0 oklch(0 0 0 / 0.8), 0 1px 2px -1px oklch(0 0 0 / 0.8)",
    shadowMd: "0 3px 6px 0 oklch(0 0 0 / 0.9), 0 2px 4px -1px oklch(0 0 0 / 0.9)",
    shadowLg: "0 4px 8px 0 oklch(0 0 0 / 0.9), 0 2px 4px -2px oklch(0 0 0 / 0.9)",
    shadowXl: "0 6px 12px 0 oklch(0 0 0 / 1.0), 0 4px 6px -2px oklch(0 0 0 / 1.0)",
    "shadow-2xs": "0 1px 1.5px 0 oklch(0 0 0 / 0.7)",
    "shadow-2xl": "0 8px 16px 0 oklch(0 0 0 / 1.0), 0 4px 8px -4px oklch(0 0 0 / 1.0)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    chart1: "Forest Sage",
    chart2: "Chart Forest 2",
    chart3: "Chart Dusk Olive",
    chart4: "Chart Forest 3",
    chart5: "Chart Deep Olive",
  };
  
  /* ----------------------------------------------------------------
     4. BRAND OBJECT - Forest Dusk
     ----------------------------------------------------------------*/
  const forestDuskColors = generateBrandColors("forest-dusk", forestDuskRawColors);
  
  export const forestDuskTheme: Brand = {
    name: "Forest Dusk",
    businessDetails: {
      name: "Forest Dusk Studio",
      industry: "wellness_app",
      personality: {
        vintageModern: 55,      // More vintage with the deep earthy tones
        seasonedYouthful: 25,   // More seasoned and mature
        gracefulBold: 35,       // Bold with earthy confidence
        playfulElegant: 65,     // Elegant but grounded
        valueSmartLuxurious: 60, // Sophisticated natural luxury
        structuredNatural: 80,  // Very natural and organic
        symbolicRealistic: 70,  // Symbolic of nature and earth
      },
    },
    colors: forestDuskColors,
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
        description: "Elegant serif that pairs beautifully with deep forest greens.",
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
    style: forestDuskStyleGuide,
    themeCssVariables: createThemeCssVars(
      "forest-dusk",
      forestDuskColors,
      forestDuskStyleGuide,
      forestDuskOtherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Forest sage and deep olive
      brightness: 'adaptive',            // Adaptive for sophisticated dark theme
      saturation: 'muted',               // Muted earthy colors
      colorHarmony: 'analogous',         // Adjacent forest greens
      accentUsage: 'minimal',            // Accent-neutral design
      cornerStyle: 'rounded',            // 0.5rem rounded corners
      elevation: 'layered',              // Layered shadows for forest depth
    },
  }; 