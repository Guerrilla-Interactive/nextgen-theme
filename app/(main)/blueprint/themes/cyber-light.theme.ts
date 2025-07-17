// cyberLightTheme.ts  –  Light variant of Cyber Pulse
//--------------------------------------------------------------
// Duotone · Complementary · Light · Professional · Clean · Tech-Corporate
// Bright cyan + red accents on clean white backgrounds with professional shadows.

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
import { glowingBorderAnimationPreset } from '../animation-presets';
  
  /* -------------------------------------------------------------
     1. RAW COLOR TOKENS
     ---------------------------------------------------------- */
  const cyberLightRawColors = [
    // Pure White: main page background
    {
      tokenSpecificName: "Pure White",
      description: "Page background (light mode default)",
      oklch: "oklch(1.00 0 0)" as OklchString,   // pure white
      roles: ["background"],
      category: "shade",
    },
  
    // Tech Gray: primary foreground text
    {
      tokenSpecificName: "Tech Gray",
      description: "Primary text colour on light surfaces",
      oklch: "oklch(0.25 0.01 260)" as OklchString,  // dark text on light bg
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
  
    // Light Panel: card & popover surfaces (slightly darker than background)
    {
      tokenSpecificName: "Light Panel",
      description: "Cards, popovers, and on‑colour text",
      oklch: "oklch(0.98 0.005 260)" as OklchString,
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColor: "oklch(0.25 0.01 260)" as OklchString,
    },
  
    // Bright Cyan – primary accent (complement 1)
    {
      tokenSpecificName: "Bright Cyan",
      description: "Primary actions, focus ring, chart‑1",
      oklch: "oklch(0.65 0.18 195)" as OklchString,
      roles: ["primary", "ring", "chart-1", "sidebar-primary"],
      category: "color",
      onColor: "oklch(1.00 0 0)" as OklchString,
    },
  
    // Bright Red – paired accent (complement 2)
    {
      tokenSpecificName: "Bright Red",
      description: "Secondary / accent actions, chart‑2, sidebar accent",
      oklch: "oklch(0.65 0.20 20)" as OklchString,
      roles: ["secondary", "accent", "chart-2", "sidebar", "sidebar-accent"],
      category: "color",
      onColor: "oklch(1.00 0 0)" as OklchString,
    },
  
    // Light Graphite – borders & inputs
    {
      tokenSpecificName: "Light Graphite",
      description: "Borders and input backgrounds",
      oklch: "oklch(0.90 0.01 260)" as OklchString,
      roles: ["border", "input"],
      category: "shade",
      onColor: "oklch(0.25 0.01 260)" as OklchString,
    },
  
    // Muted Light – subtle surface fills
    {
      tokenSpecificName: "Muted Light",
      description: "Muted surfaces (e.g. table rows)",
      oklch: "oklch(0.96 0.005 260)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.25 0.01 260)" as OklchString,
    },
  
    // Muted‑foreground
    {
      tokenSpecificName: "Light Smoke",
      description: "Text on muted surfaces",
      oklch: "oklch(0.55 0.01 260)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Destructive – using Bright Red for consistency
    {
      tokenSpecificName: "Alert Red Light",
      description: "Destructive actions & warnings",
      oklch: "oklch(0.65 0.20 20)" as OklchString,
      roles: ["destructive", "warning"],
      category: "color",
      onColor: "oklch(1.00 0 0)" as OklchString,
    },
  
    // Additional chart hues (lighter variants of cyan/red)
    {
      tokenSpecificName: "Cyan Light 2",
      description: "Chart‑3 (lighter cyan)",
      oklch: "oklch(0.75 0.16 195)" as OklchString,
      roles: ["chart-3"],
      category: "color",
    },
    {
      tokenSpecificName: "Red Light 2",
      description: "Chart‑4 (lighter red)",
      oklch: "oklch(0.75 0.18 20)" as OklchString,
      roles: ["chart-4"],
      category: "color",
    },
    {
      tokenSpecificName: "Cyan Light 3",
      description: "Chart‑5 (brightest cyan)",
      oklch: "oklch(0.85 0.14 195)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    },
  ] as RawColorDefinition[];
  
  /* -------------------------------------------------------------
     2. STYLE GUIDE (square + elevated → radius 0 & strong shadows)
     ---------------------------------------------------------- */
  const cyberLightStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Bright Cyan", primaryForeground: "Light Panel" },
    secondaryColors:     { secondary: "Bright Red", secondaryForeground: "Light Panel" },
    accentColors:        { accent: "Bright Red", accentForeground: "Light Panel" },
    cardColors:          { card: "Light Panel", cardForeground: "Tech Gray" },
    popoverColors:       { popover: "Light Panel", popoverForeground: "Tech Gray" },
    mutedColors:         { muted: "Muted Light", mutedForeground: "Light Smoke" },
    destructiveColors:   { destructive: "Alert Red Light", destructiveForeground: "Light Panel" },
    successColors:       { success: "Bright Cyan", successForeground: "Light Panel" },
    inputColors:         { input: "Light Graphite", inputForeground: "Tech Gray" },
    borderColors:        { border: "Light Graphite" },
    ringColors:          { ring: "Bright Cyan" },
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
     3. OTHER DESIGN-TOKEN VARS
     ---------------------------------------------------------- */
  const cyberLightOtherVars = {
    background: "Pure White",
    foreground: "Tech Gray",
    radiusBase: "0px",
  
    // Sidebar mappings - using colors already defined in rawColors
    sidebar: "Bright Red",
    sidebarForeground: "Tech Gray",
    sidebarPrimary: "Bright Cyan",
    sidebarPrimaryForeground: "Light Panel",
    sidebarAccent: "Bright Red",
    sidebarAccentForeground: "Light Panel",
    sidebarBorder: "Light Graphite",
    sidebarRing: "Bright Cyan",
  
    // Professional shadows for light mode
    shadowXs: "0 0 1px 0 oklch(0.25 0.01 260 / 0.15)",
    shadowSm: "0 1px 3px 0 oklch(0.25 0.01 260 / 0.20)",
    shadowMd: "0 2px 6px 0 oklch(0.25 0.01 260 / 0.25)",
    shadowLg: "0 4px 8px 0 oklch(0.25 0.01 260 / 0.30)",
    shadowXl: "0 6px 12px 0 oklch(0.25 0.01 260 / 0.35)",
    "shadow-2xs": "0 0 0 1px oklch(0.25 0.01 260 / 0.10)",
    "shadow-2xl": "0 8px 16px 0 oklch(0.25 0.01 260 / 0.40)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    // Chart token map (already covered by roles)
    chart1: "Bright Cyan",
    chart2: "Bright Red",
    chart3: "Cyan Light 2",
    chart4: "Red Light 2",
    chart5: "Cyan Light 3",
  };
  
  /* -------------------------------------------------------------
     4. BRAND OBJECT
     ---------------------------------------------------------- */
  const cyberLightColors = generateBrandColors("cyber-light", cyberLightRawColors);
  
  export const cyberLightBrand: Brand = {
    name: "Cyber Light",
    businessDetails: {
      name: "Cyber Light Systems",
      industry: "technology_software",
      personality: {
        vintageModern: 25,      // More modern with clean aesthetic
        seasonedYouthful: 60,   // Professional but youthful
        gracefulBold: 75,       // Bold but more refined than dark version
        playfulElegant: 50,     // Balanced playfulness and elegance
        valueSmartLuxurious: 65, // High-tech luxury feel
        structuredNatural: 75,  // Structured corporate approach
        symbolicRealistic: 45,  // Balanced symbolic representation
      },
    },
    colors: cyberLightColors,
    fonts: [
      {
        name: "Inter",
        distributor: "Google Fonts",
        description: "Neutral sans-serif for body text.",
        family: "'Inter', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Orbitron",
        distributor: "Google Fonts",
        description: "Futuristic display font that matches tech aesthetics.",
        family: "'Orbitron', 'Inter', sans-serif",
        roles: ["display", "h1", "h2", "h3", "hero-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 900 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Monospaced font for code and numeric data.",
        family: "'JetBrains Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: cyberLightStyleGuide,
    themeCssVariables: createThemeCssVars(
      "cyber-light",
      cyberLightColors,
      cyberLightStyleGuide,
      cyberLightOtherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',           // Duotone - cyan and red bright colors
      brightness: 'light',                 // Light - clean white backgrounds
      saturation: 'vibrant',               // Vibrant - bright cyan and red accents
      colorHarmony: 'complementary',        // Complementary - cyan and red are opposite on color wheel
      accentUsage: 'prominent',             // Paired-accents - strong accent usage
      cornerStyle: 'sharp',                 // Square - 0px radius throughout
      elevation: 'layered',                 // Layered - professional drop shadows
    },
    animationConfig: {
      preset: glowingBorderAnimationPreset,
      rootClassName: 'cyber-light-theme'
    }
  };

export default cyberLightBrand; 