/*───────────────────────────────────────────────────────────────────────*\
  Vercel Minimal
  – ultra-high-contrast black / white UI
  – monochrome-duotone · light-first · flat · rounded-medium
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
    1. RAW COLOUR TOKENS
  \*───────────────────────────────────────────────────────────────────────*/
  const rawColors: RawColorDefinition[] = [
    /* Neutral surfaces & text */
    {
      tokenSpecificName: "Paper",
      description: "Bright page background",
      oklchLight: "oklch(0.99 0 0)" as OklchString,
      oklchDark:  "oklch(0 0 0)" as OklchString,
      roles: ["background"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Panel",
      description: "Cards / popovers",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0.14 0 0)" as OklchString,
      roles: ["card", "popover", "tooltip-background"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Ink",
      description: "Universal foreground",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark:  "oklch(1 0 0)" as OklchString,
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
  
    /* Brand & UI hues */
    {
      tokenSpecificName: "Rich Black",
      description: "Primary action & focus ring",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark:  "oklch(1 0 0)" as OklchString, // flips to white in dark mode
      roles: ["primary", "ring", "sidebar-primary", "chart-1", "text-brand"],
      category: "color",
      onColorLight: "oklch(1 0 0)" as OklchString,
      onColorDark:  "oklch(0 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Soft Grey",
      description: "Secondary buttons & muted bg",
      oklchLight: "oklch(0.94 0 0)" as OklchString,
      oklchDark:  "oklch(0.25 0 0)" as OklchString,
      roles: ["secondary", "muted", "sidebar", "border", "input"],
      category: "shade",
      onColorLight: "Ink",
      onColorDark:  "Paper",
    },
    {
      tokenSpecificName: "Slate Grey",
      description: "Accent (slightly darker grey)",
      oklchLight: "oklch(0.97 0 0)" as OklchString,
      oklchDark:  "oklch(0.32 0 0)" as OklchString,
      roles: ["accent", "sidebar-accent", "chart-3"],
      category: "shade",
      onColorLight: "Ink",
      onColorDark:  "Paper",
    },
    {
      tokenSpecificName: "Brick",
      description: "Destructive red-orange",
      oklchLight: "oklch(0.63 0.19 23.03)" as OklchString,
      oklchDark:  "oklch(0.69 0.20 23.91)" as OklchString,
      roles: ["destructive", "warning"],
      category: "color",
      onColorLight: "Paper",
      onColorDark:  "Ink",
    },
  
    /* Charts */
    { tokenSpecificName: "Chart Lime",   oklchLight: "oklch(0.81 0.17 75.35)"  as OklchString, oklchDark: "oklch(0.81 0.17 75.35)"  as OklchString, roles: ["chart-1"], category: "color" },
    { tokenSpecificName: "Chart Violet", oklchLight: "oklch(0.55 0.22 264.53)" as OklchString, oklchDark: "oklch(0.58 0.21 260.84)" as OklchString, roles: ["chart-2"], category: "color" },
    { tokenSpecificName: "Chart Slate",  oklchLight: "oklch(0.72 0 0)"         as OklchString, oklchDark: "oklch(0.56 0 0)"         as OklchString, roles: ["chart-3"], category: "shade"   },
    { tokenSpecificName: "Chart Mist",   oklchLight: "oklch(0.92 0 0)"         as OklchString, oklchDark: "oklch(0.44 0 0)"         as OklchString, roles: ["chart-4"], category: "shade"   },
    { tokenSpecificName: "Chart Coal",   oklchLight: "oklch(0.56 0 0)"         as OklchString, oklchDark: "oklch(0.92 0 0)"         as OklchString, roles: ["chart-5"], category: "shade"   },
  ];
  
  /*───────────────────────────────────────────────────────────────────────*\
    2. STYLE-GUIDE
  \*───────────────────────────────────────────────────────────────────────*/
  const styleGuide: StyleGuide = {
    primaryColors:       { primary: "Rich Black", primaryForeground: "Paper" },
    secondaryColors:     { secondary: "Soft Grey", secondaryForeground: "Ink" },
    accentColors:        { accent: "Slate Grey", accentForeground: "Ink" },
    cardColors:          { card: "Panel", cardForeground: "Ink" },
    popoverColors:       { popover: "Panel", popoverForeground: "Ink" },
    mutedColors:         { muted: "Soft Grey", mutedForeground: "Ink" },
    destructiveColors:   { destructive: "Brick", destructiveForeground: "Paper" },
    successColors:       { success: "Rich Black", successForeground: "Paper" },
    infoColors:          { info: "Slate Grey", infoForeground: "Ink" },
    warningColors:       { warning: "Brick", warningForeground: "Paper" },
    inputColors:         { input: "Soft Grey", inputForeground: "Ink" },
    borderColors:        { border: "Soft Grey" },
    ringColors:          { ring: "Rich Black" },
    radius: {
      radiusSm: "0.5rem",
      radiusMd: "0.5rem",
      radiusLg: "0.75rem",
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
    3. EXTRA VARS
  \*───────────────────────────────────────────────────────────────────────*/
  const otherVars = {
    background: "Paper",
    foreground: "Ink",
    radiusBase: "0.5rem",
  
    shadowXs:  "0px 1px 2px 0px hsl(0 0% 0% / 0.09)",
    shadowSm:  "0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18)",
    shadowMd:  "0px 2px 4px -1px hsl(0 0% 0% / 0.18)",
    "shadow-2xs": "0px 1px 2px 0px hsl(0 0% 0% / 0.09)",
    "shadow-2xl": "0px 1px 2px 0px hsl(0 0% 0% / 0.45)",
  
    chart1: "Chart Lime",
    chart2: "Chart Violet",
    chart3: "Chart Slate",
    chart4: "Chart Mist",
    chart5: "Chart Coal",
  };
  
  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT
  \*───────────────────────────────────────────────────────────────────────*/
  const colors = generateBrandColors("vercel-minimal", rawColors);
  
  export const vercelMinimalBrand: Brand = {
    name: "Vercel Minimal",
    businessDetails: {
      name: "Vercel Minimal Demo",
      industry: "developer_tools",
      personality: {
        vintageModern: 20,
        seasonedYouthful: 80,
        gracefulBold: 85,
        playfulElegant: 30,
        valueSmartLuxurious: 40,
        structuredNatural: 70,
        symbolicRealistic: 30,
      },
    },
    colors,
    fonts: [
      {
        name: "Geist",
        distributor: "Vercel",
        description: "Grotesque sans-serif used across Vercel.",
        family: "'Geist', system-ui, sans-serif",
        roles: ["body", "sans"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
      {
        name: "Georgia",
        distributor: "System",
        description: "Classic serif for editorial headings.",
        family: "Georgia, serif",
        roles: ["display", "h1", "h2", "h3", "h4"],
        weights: { regular: 400, bold: 700 },
      },
      {
        name: "Geist Mono",
        distributor: "Vercel",
        description: "Friendly developer mono.",
        family: "'Geist Mono', monospace",
        roles: ["code", "mono"],
        weights: { light: 300, regular: 400, medium: 500 },
      },
    ],
    style: styleGuide,
    themeCssVariables: createThemeCssVars("vercel-minimal", colors, styleGuide, otherVars),
    prefersDarkSchemeForChrome: false,
  };
  