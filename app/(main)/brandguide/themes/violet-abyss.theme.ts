/*───────────────────────────────────────────────────────────────────────*\
  Violet Abyss
  – deep-violet UI · terracotta error red
  – dark-first · duotone-adjacent · muted · flat · rounded-large
\*───────────────────────────────────────────────────────────────────────*/

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /*───────────────────────────────────────────────────────────────────────*\
    1. Raw colour tokens
  \*───────────────────────────────────────────────────────────────────────*/
  const rawColors: RawColorDefinition[] = [
    {
      tokenSpecificName: "Abyss",
      description: "Main background / sidebar",
      oklchLight: "oklch(0.97 0.005 276)" as OklchString,
      oklchDark:  "oklch(0.2077 0.0398 265.7549)" as OklchString,
      roles: ["background", "sidebar"],
      category: "shade",
      onColorLight: "oklch(0.28 0 0)" as OklchString,
      onColorDark:  "oklch(0.9299 0.0334 272.7879)" as OklchString,
    },
    {
      tokenSpecificName: "Panel",
      description: "Cards, popovers, low-elevation surface",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0.2573 0.0861 281.2883)" as OklchString,
      roles: ["card", "popover", "secondary", "muted", "tooltip-background"],
      category: "shade",
      onColorLight: "oklch(0.28 0 0)" as OklchString,
      onColorDark:  "oklch(0.9299 0.0334 272.7879)" as OklchString,
    },
    {
      tokenSpecificName: "Snow",
      description: "Universal light foreground",
      oklchLight: "oklch(0.28 0 0)" as OklchString,
      oklchDark:  "oklch(0.9299 0.0334 272.7879)" as OklchString,
      roles: [
        "foreground",
        "card-foreground",
        "popover-foreground",
        "sidebar-foreground",
        "secondary-foreground",
        "muted-foreground",
        "input-foreground",
      ],
      category: "shade",
    },
  
    /* Brand & accent hues */
    {
      tokenSpecificName: "Ultraviolet",
      description: "Primary CTAs & focus",
      oklchLight: "oklch(0.7 0.23 293)" as OklchString,
      oklchDark:  "oklch(0.6056 0.2189 292.7172)" as OklchString,
      roles: ["primary", "ring", "sidebar-primary", "chart-2", "text-brand"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Snow",
    },
    {
      tokenSpecificName: "Lavender Edge",
      description: "Accent / tertiary",
      oklchLight: "oklch(0.78 0.05 280)" as OklchString,
      oklchDark:  "oklch(0.4568 0.2146 277.0229)" as OklchString,
      roles: ["accent", "sidebar-accent", "chart-4"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Snow",
    },
    {
      tokenSpecificName: "Deep Border",
      description: "Borders & inputs",
      oklchLight: "oklch(0.87 0.01 280)" as OklchString,
      oklchDark:  "oklch(0.2827 0.1351 291.0894)" as OklchString,
      roles: ["border", "input", "sidebar-border"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Snow",
    },
    {
      tokenSpecificName: "Brick",
      description: "Destructive / warning",
      oklchLight: "oklch(0.6368 0.2078 25.3313)" as OklchString,
      oklchDark:  "oklch(0.6368 0.2078 25.3313)" as OklchString,
      roles: ["destructive", "warning"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Snow",
    },
  
    /* Charts (extra) */
    { tokenSpecificName: "Chart Violet", oklchLight: "oklch(0.78 0.06 293)" as OklchString, oklchDark: "oklch(0.7090 0.1592 293.5412)" as OklchString, roles: ["chart-1"], category: "color" },
    { tokenSpecificName: "Chart Terracotta", oklchLight: "oklch(0.8 0.09 34)" as OklchString, oklchDark: "oklch(0.7693 0.0876 34.1875)" as OklchString, roles: ["chart-2"], category: "color" },
    { tokenSpecificName: "Chart Cyan", oklchLight: "oklch(0.6 0.08 255)" as OklchString, oklchDark: "oklch(0.5413 0.2466 293.0090)" as OklchString, roles: ["chart-3"], category: "color" },
    { tokenSpecificName: "Chart Indigo", oklchLight: "oklch(0.55 0.085 259)" as OklchString, oklchDark: "oklch(0.4320 0.2106 292.7591)" as OklchString, roles: ["chart-5"], category: "color" },
  ];
  
  /*───────────────────────────────────────────────────────────────────────*\
    2. Style-guide mapping
  \*───────────────────────────────────────────────────────────────────────*/
  const styleGuide: StyleGuide = {
    primaryColors:       { primary: "Ultraviolet", primaryForeground: "Snow" },
    secondaryColors:     { secondary: "Panel", secondaryForeground: "Snow" },
    accentColors:        { accent: "Lavender Edge", accentForeground: "Snow" },
    cardColors:          { card: "Panel", cardForeground: "Snow" },
    popoverColors:       { popover: "Panel", popoverForeground: "Snow" },
    mutedColors:         { muted: "Panel", mutedForeground: "Snow" },
    destructiveColors:   { destructive: "Brick", destructiveForeground: "Snow" },
    successColors:       { success: "Ultraviolet", successForeground: "Snow" },
    infoColors:          { info: "Lavender Edge", infoForeground: "Snow" },
    warningColors:       { warning: "Brick", warningForeground: "Snow" },
    inputColors:         { input: "Deep Border", inputForeground: "Snow" },
    borderColors:        { border: "Deep Border" },
    ringColors:          { ring: "Ultraviolet" },
    radius: {
      radiusSm: "0.625rem",
      radiusMd: "0.625rem",
      radiusLg: "0.8rem",
      radiusXl: "1rem",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /*───────────────────────────────────────────────────────────────────────*\
    3. Extra variables
  \*───────────────────────────────────────────────────────────────────────*/
  const otherVars = {
    background: "Abyss",
    foreground: "Snow",
    radiusBase: "0.625rem",
  
    // Shadows (violet-tinted)
    shadowXs:  "2px 2px 4px 0px hsl(255 86% 66% / 0.10)",
    shadowSm:  "2px 2px 4px 0px hsl(255 86% 66% / 0.20), 2px 1px 2px -1px hsl(255 86% 66% / 0.20)",
    shadowMd:  "2px 2px 4px -1px hsl(255 86% 66% / 0.20)",
    "shadow-2xs": "2px 2px 4px 0px hsl(255 86% 66% / 0.10)",
    "shadow-2xl": "2px 2px 4px 0px hsl(255 86% 66% / 0.50)",
  
    /* Chart aliases */
    chart1: "Chart Violet",
    chart2: "Ultraviolet",
    chart3: "Chart Cyan",
    chart4: "Lavender Edge",
    chart5: "Chart Indigo",
  };
  
  /*───────────────────────────────────────────────────────────────────────*\
    4. Brand export
  \*───────────────────────────────────────────────────────────────────────*/
  const colors = generateBrandColors("violet-abyss", rawColors);
  
  export const violetAbyssBrand: Brand = {
    name: "Violet Abyss",
    businessDetails: {
      name: "Violet Abyss Studio",
      industry: "design",
      personality: {
        vintageModern: 35,
        seasonedYouthful: 55,
        gracefulBold: 60,
        playfulElegant: 70,
        valueSmartLuxurious: 75,
        structuredNatural: 50,
        symbolicRealistic: 45,
      },
    },
    colors,
    fonts: [
      {
        name: "Roboto",
        distributor: "Google Fonts",
        description: "Workhorse geometric sans-serif.",
        family: "'Roboto', system-ui, sans-serif",
        roles: ["body", "sans"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
      {
        name: "Playfair Display",
        distributor: "Google Fonts",
        description: "High-contrast serif for headlines.",
        family: "'Playfair Display', serif",
        roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
        weights: { regular: 400, medium: 500, bold: 700, black: 900 },
      },
      {
        name: "Fira Code",
        distributor: "Google Fonts",
        description: "Developer-friendly mono with ligatures.",
        family: "'Fira Code', monospace",
        roles: ["code", "mono"],
        weights: { light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: styleGuide,
    themeCssVariables: createThemeCssVars("violet-abyss", colors, styleGuide, otherVars),
    prefersDarkSchemeForChrome: true,
  };
  