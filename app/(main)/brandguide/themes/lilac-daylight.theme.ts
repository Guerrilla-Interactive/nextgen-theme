/*───────────────────────────────────────────────────────────────────────*\
  Lilac Daylight
  – bright white surfaces with violet accents
  – duotone-adjacent · light-first · muted · flat · rounded-large
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
    1. RAW COLOUR TOKENS (light values = supplied palette)
       Dark values use the previous “Violet Abyss” darks so both modes exist.
  \*───────────────────────────────────────────────────────────────────────*/
  const rawColors: RawColorDefinition[] = [
    /* Neutral surfaces & text */
    {
      tokenSpecificName: "Blossom White",
      description: "Primary background",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0.2077 0.0398 265.7549)" as OklchString,
      roles: ["background"],
      category: "shade",
      onColorLight: "oklch(0.3588 0.1354 278.6973)" as OklchString,
      onColorDark:  "oklch(0.9299 0.0334 272.7879)" as OklchString,
    },
    {
      tokenSpecificName: "Snow",
      description: "Cards / popovers / secondary surfaces",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0.2573 0.0861 281.2883)" as OklchString,
      roles: ["card", "popover", "tooltip-background", "sidebar"],
      category: "shade",
      onColorLight: "oklch(0.3588 0.1354 278.6973)" as OklchString,
      onColorDark:  "oklch(0.9299 0.0334 272.7879)" as OklchString,
    },
    {
      tokenSpecificName: "Ink Violet",
      description: "Universal dark text",
      oklchLight: "oklch(0.3588 0.1354 278.6973)" as OklchString,
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
      description: "Primary CTAs",
      oklchLight: "oklch(0.6056 0.2189 292.7172)" as OklchString,
      oklchDark:  "oklch(0.6056 0.2189 292.7172)" as OklchString,
      roles: ["primary", "ring", "sidebar-primary", "chart-1", "text-brand"],
      category: "color",
      onColorLight: "Blossom White",
      onColorDark:  "Blossom White",
    },
    {
      tokenSpecificName: "Soft Lilac",
      description: "Secondary buttons / muted surfaces",
      oklchLight: "oklch(0.9618 0.0202 295.1913)" as OklchString,
      oklchDark:  "oklch(0.3095 0.0266 266.7132)" as OklchString,
      roles: ["secondary", "muted"],
      category: "shade",
      onColorLight: "oklch(0.4568 0.2146 277.0229)" as OklchString,
      onColorDark:  "Blossom White",
    },
    {
      tokenSpecificName: "Periwinkle Mist",
      description: "Accent / tertiary",
      oklchLight: "oklch(0.9319 0.0316 255.5855)" as OklchString,
      oklchDark:  "oklch(0.4568 0.2146 277.0229)" as OklchString,
      roles: ["accent", "sidebar-accent", "chart-3"],
      category: "color",
      onColorLight: "oklch(0.4244 0.1809 265.6377)" as OklchString,
      onColorDark:  "Blossom White",
    },
    {
      tokenSpecificName: "Lavender Border",
      description: "Borders & inputs",
      oklchLight: "oklch(0.9299 0.0334 272.7879)" as OklchString,
      oklchDark:  "oklch(0.2827 0.1351 291.0894)" as OklchString,
      roles: ["border", "input", "sidebar-border"],
      category: "color",
      onColorLight: "Ink Violet",
      onColorDark:  "Blossom White",
    },
    {
      tokenSpecificName: "Brick",
      description: "Destructive / warning",
      oklchLight: "oklch(0.6368 0.2078 25.3313)" as OklchString,
      oklchDark:  "oklch(0.6368 0.2078 25.3313)" as OklchString,
      roles: ["destructive", "warning"],
      category: "color",
      onColorLight: "Blossom White",
      onColorDark:  "Blossom White",
    },
  
    /* Additional chart hues */
    { tokenSpecificName: "Chart Violet 2", oklchLight: "oklch(0.5413 0.2466 293.0090)" as OklchString, oklchDark: "oklch(0.5413 0.2466 293.0090)" as OklchString, roles: ["chart-2"], category: "color" },
    { tokenSpecificName: "Chart Violet 3", oklchLight: "oklch(0.4907 0.2412 292.5809)" as OklchString, oklchDark: "oklch(0.4907 0.2412 292.5809)" as OklchString, roles: ["chart-4"], category: "color" },
    { tokenSpecificName: "Chart Violet 4", oklchLight: "oklch(0.4320 0.2106 292.7591)" as OklchString, oklchDark: "oklch(0.4320 0.2106 292.7591)" as OklchString, roles: ["chart-5"], category: "color" },
  ];
  
  /*───────────────────────────────────────────────────────────────────────*\
    2. STYLE-GUIDE MAPPING
  \*───────────────────────────────────────────────────────────────────────*/
  const styleGuide: StyleGuide = {
    primaryColors:       { primary: "Ultraviolet", primaryForeground: "Blossom White" },
    secondaryColors:     { secondary: "Soft Lilac", secondaryForeground: "Ink Violet" },
    accentColors:        { accent: "Periwinkle Mist", accentForeground: "Ink Violet" },
    cardColors:          { card: "Snow", cardForeground: "Ink Violet" },
    popoverColors:       { popover: "Snow", popoverForeground: "Ink Violet" },
    mutedColors:         { muted: "Soft Lilac", mutedForeground: "Ink Violet" },
    destructiveColors:   { destructive: "Brick", destructiveForeground: "Blossom White" },
    successColors:       { success: "Ultraviolet", successForeground: "Blossom White" },
    infoColors:          { info: "Periwinkle Mist", infoForeground: "Ink Violet" },
    warningColors:       { warning: "Brick", warningForeground: "Blossom White" },
    inputColors:         { input: "Lavender Border", inputForeground: "Ink Violet" },
    borderColors:        { border: "Lavender Border" },
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
    3. OTHER VARIABLES
  \*───────────────────────────────────────────────────────────────────────*/
  const otherVars = {
    background: "Blossom White",
    foreground: "Ink Violet",
    radiusBase: "0.625rem",
  
    shadowXs:  "2px 2px 4px 0px hsl(255 86% 66% / 0.10)",
    shadowSm:  "2px 2px 4px 0px hsl(255 86% 66% / 0.20), 2px 1px 2px -1px hsl(255 86% 66% / 0.20)",
    shadowMd:  "2px 2px 4px -1px hsl(255 86% 66% / 0.20)",
    "shadow-2xs": "2px 2px 4px 0px hsl(255 86% 66% / 0.10)",
    "shadow-2xl": "2px 2px 4px 0px hsl(255 86% 66% / 0.50)",
  
    chart1: "Ultraviolet",
    chart2: "Chart Violet 2",
    chart3: "Periwinkle Mist",
    chart4: "Chart Violet 3",
    chart5: "Chart Violet 4",
  };
  
  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT
  \*───────────────────────────────────────────────────────────────────────*/
  const colors = generateBrandColors("lilac-daylight", rawColors);
  
  export const lilacDaylightBrand: Brand = {
    name: "Lilac Daylight",
    businessDetails: {
      name: "Lilac Daylight Studio",
      industry: "design",
      personality: {
        vintageModern: 30,
        seasonedYouthful: 60,
        gracefulBold: 65,
        playfulElegant: 75,
        valueSmartLuxurious: 70,
        structuredNatural: 50,
        symbolicRealistic: 40,
      },
    },
    colors,
    fonts: [
      {
        name: "Roboto",
        distributor: "Google Fonts",
        description: "Versatile UI sans-serif.",
        family: "'Roboto', system-ui, sans-serif",
        roles: ["body", "sans"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
      {
        name: "Playfair Display",
        distributor: "Google Fonts",
        description: "High-contrast serif for hero headings.",
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
    themeCssVariables: createThemeCssVars("lilac-daylight", colors, styleGuide, otherVars),
    prefersDarkSchemeForChrome: false,
  };
  