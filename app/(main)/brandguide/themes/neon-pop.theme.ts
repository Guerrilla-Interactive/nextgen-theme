/*───────────────────────────────────────────────────────────────────────*\
  Neon Pop
  – stark black / white canvas + hot pink, acid yellow, electric blue
  – duotone-triad · ultra-high contrast · flat · 2 px radius
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
    1. RAW COLOUR TOKENS  (light values = your :root, dark = your .dark)
  \*───────────────────────────────────────────────────────────────────────*/
  const rawColors: RawColorDefinition[] = [
    /* Surfaces & text ----------------------------------------------------*/
    {
      tokenSpecificName: "Paper",
      description: "Primary page background / sidebar",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0 0 0)" as OklchString,
      roles: ["background", "sidebar"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,
      onColorDark:  "oklch(1 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Panel",
      description: "Cards, popovers, secondary surfaces",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0.3211 0 0)" as OklchString,
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
  
    /* Brand & UI hues ----------------------------------------------------*/
    {
      tokenSpecificName: "Hot Pink",
      description: "Primary CTAs & focus ring",
      oklchLight: "oklch(0.667 0.2428 359.7106)" as OklchString,
      oklchDark:  "oklch(0.7218 0.1972 355.1390)" as OklchString,
      roles: ["primary", "ring", "sidebar-primary", "chart-1", "text-brand"],
      category: "color",
      onColorLight: "Paper",
      onColorDark:  "Paper",
    },
    {
      tokenSpecificName: "Acid Yellow",
      description: "Secondary buttons & highlights",
      oklchLight: "oklch(0.7505 0.1791 58.2827)" as OklchString,
      oklchDark:  "oklch(0.7908 0.1599 65.8231)" as OklchString,
      roles: ["secondary", "chart-2"],
      category: "color",
      onColorLight: "Ink",
      onColorDark:  "Ink",
    },
    {
      tokenSpecificName: "Electric Blue",
      description: "Accent / tertiary",
      oklchLight: "oklch(0.8160 0.1453 216.5023)" as OklchString,
      oklchDark:  "oklch(0.8855 0.1429 200.4380)" as OklchString,
      roles: ["accent", "sidebar-accent", "chart-3"],
      category: "color",
      onColorLight: "Paper",
      onColorDark:  "Ink",
    },
  
    /* Greys / borders / inputs ------------------------------------------*/
    {
      tokenSpecificName: "Muted Grey",
      description: "Muted backgrounds & sidebar surface",
      oklchLight: "oklch(0.9551 0 0)" as OklchString,
      oklchDark:  "oklch(0.3211 0 0)" as OklchString,
      roles: ["muted", "sidebar", "border", "input"],
      category: "shade",
      onColorLight: "Ink",
      onColorDark:  "Paper",
    },
  
    /* Destructive --------------------------------------------------------*/
    {
      tokenSpecificName: "Absolute Black",
      description: "Destructive surface (light) / white (dark)",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark:  "oklch(1 0 0)" as OklchString,
      roles: ["destructive"],
      category: "shade",
      onColorLight: "Paper",
      onColorDark:  "Ink",
    },
  
    /* Extra chart hues ---------------------------------------------------*/
    { tokenSpecificName: "Chart Green",  oklchLight: "oklch(0.7492 0.2275 137.1080)" as OklchString, oklchDark: "oklch(0.8591 0.2572 136.7289)" as OklchString, roles: ["chart-4"], category: "color" },
    { tokenSpecificName: "Chart Purple", oklchLight: "oklch(0.4614 0.2486 298.2946)" as OklchString, oklchDark: "oklch(0.5351 0.2824 299.3796)" as OklchString, roles: ["chart-5"], category: "color" },
  ];
  
  /*───────────────────────────────────────────────────────────────────────*\
    2. STYLE-GUIDE
  \*───────────────────────────────────────────────────────────────────────*/
  const styleGuide: StyleGuide = {
    primaryColors:       { primary: "Hot Pink", primaryForeground: "Paper" },
    secondaryColors:     { secondary: "Acid Yellow", secondaryForeground: "Ink" },
    accentColors:        { accent: "Electric Blue", accentForeground: "Paper" },
    cardColors:          { card: "Panel", cardForeground: "Ink" },
    popoverColors:       { popover: "Panel", popoverForeground: "Ink" },
    mutedColors:         { muted: "Muted Grey", mutedForeground: "Ink" },
    destructiveColors:   { destructive: "Absolute Black", destructiveForeground: "Paper" },
    successColors:       { success: "Hot Pink", successForeground: "Paper" },
    infoColors:          { info: "Electric Blue", infoForeground: "Paper" },
    warningColors:       { warning: "Absolute Black", warningForeground: "Paper" },
    inputColors:         { input: "Muted Grey", inputForeground: "Ink" },
    borderColors:        { border: "Muted Grey" },
    ringColors:          { ring: "Hot Pink" },
    radius: {
      radiusSm: "0.125rem",
      radiusMd: "0.125rem",
      radiusLg: "0.25rem",
      radiusXl: "0.5rem",
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
    background: "Paper",
    foreground: "Ink",
    radiusBase: "0.125rem",
  
    shadowXs:  "4px 4px 0px 0px hsl(0 0% 10% / 0.5)",
    shadowSm:  "4px 4px 0px 0px hsl(0 0% 10% / 1.0), 4px 1px 2px -1px hsl(0 0% 10% / 1.0)",
    shadowMd:  "4px 2px 4px -1px hsl(0 0% 10% / 1.0)",
    "shadow-2xs": "4px 4px 0px 0px hsl(0 0% 10% / 0.5)",
    "shadow-2xl": "4px 4px 0px 0px hsl(0 0% 10% / 2.5)",
  
    chart1: "Hot Pink",
    chart2: "Acid Yellow",
    chart3: "Electric Blue",
    chart4: "Chart Green",
    chart5: "Chart Purple",
  };
  
  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT
  \*───────────────────────────────────────────────────────────────────────*/
  const colors = generateBrandColors("neon-pop", rawColors);
  
  export const neonPopBrand: Brand = {
    name: "Neon Pop",
    businessDetails: {
      name: "Neon Pop Studio",
      industry: "creative",
      personality: {
        vintageModern: 30,
        seasonedYouthful: 80,
        gracefulBold: 90,
        playfulElegant: 70,
        valueSmartLuxurious: 40,
        structuredNatural: 40,
        symbolicRealistic: 50,
      },
    },
    colors,
    fonts: [
      {
        name: "DM Sans",
        distributor: "Google Fonts",
        description: "Friendly geometric sans-serif.",
        family: "'DM Sans', sans-serif",
        roles: ["body", "sans"],
        weights: { regular: 400, medium: 500, bold: 700 },
      },
      {
        name: "Space Mono",
        distributor: "Google Fonts",
        description: "Retro-tech mono.",
        family: "'Space Mono', monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, bold: 700 },
      },
    ],
    style: styleGuide,
    themeCssVariables: createThemeCssVars("neon-pop", colors, styleGuide, otherVars),
    prefersDarkSchemeForChrome: false,
  };
  