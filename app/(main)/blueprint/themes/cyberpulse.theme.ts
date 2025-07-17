// cyberPulseTheme.ts  –  M2-C-D-Ne-Fl-Pa-SqE
//--------------------------------------------------------------
// Duotone · Complementary · Dark · Neon · Flat · Paired-Accents · Square‑Elevated
// Neon‑cyan + neon‑red sit on a dark, square‑edged UI with crisp drop‑shadows.

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
  const cyberPulseRawColors = [
    // Void: main page background (very dark bluish navy)
    {
      tokenSpecificName: "Void",
      description: "Page background (dark mode default)",
      oklch: "oklch(0.14 0.01 260)" as OklchString,   // near‑black
      roles: ["background"],
      category: "shade",
    },
  
    // Mist: primary foreground text
    {
      tokenSpecificName: "Mist",
      description: "Primary text colour on dark surfaces",
      oklch: "oklch(0.92 0.01 260)" as OklchString,  // pale gray on dark bg
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
  
    // Panel: card & popover surfaces (slightly lighter than Void)
    {
      tokenSpecificName: "Panel",
      description: "Cards, popovers, and on‑colour text",
      oklch: "oklch(0.18 0.01 260)" as OklchString,
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColor: "oklch(0.92 0.01 260)" as OklchString,
    },
  
    // Neon Cyan – primary accent (complement 1)
    {
      tokenSpecificName: "Neon Cyan",
      description: "Primary actions, focus ring, chart‑1",
      oklch: "oklch(0.55 0.14 195)" as OklchString,
      roles: ["primary", "ring", "chart-1", "sidebar-primary"],
      category: "color",
      onColor: "oklch(0 0 0)" as OklchString,
    },
  
    // Neon Red – paired accent (complement 2)
    {
      tokenSpecificName: "Neon Red",
      description: "Secondary / accent actions, chart‑2, sidebar accent",
      oklch: "oklch(0.55 0.16 20)" as OklchString,
      roles: ["secondary", "accent", "chart-2", "sidebar", "sidebar-accent"],
      category: "color",
      onColor: "oklch(0 0 0)" as OklchString,
    },
  
    // Graphite – borders & inputs
    {
      tokenSpecificName: "Graphite",
      description: "Borders and input backgrounds",
      oklch: "oklch(0.25 0.02 260)" as OklchString,
      roles: ["border", "input"],
      category: "shade",
      onColor: "oklch(0.92 0.01 260)" as OklchString,
    },
  
    // Muted Panel – subtle surface fills
    {
      tokenSpecificName: "Muted Panel",
      description: "Muted surfaces (e.g. table rows)",
      oklch: "oklch(0.22 0.01 260)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.92 0.01 260)" as OklchString,
    },
  
    // Muted‑foreground
    {
      tokenSpecificName: "Smoke",
      description: "Text on muted surfaces",
      oklch: "oklch(0.80 0.01 260)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Destructive – re‑using Neon Red for simplicity
    {
      tokenSpecificName: "Alert Red",
      description: "Destructive actions & warnings",
      oklch: "oklch(0.55 0.16 20)" as OklchString,
      roles: ["destructive", "warning"],
      category: "color",
      onColor: "oklch(0 0 0)" as OklchString,
    },
  
    // Additional chart hues (monochrome ramps of cyan/red)
    {
      tokenSpecificName: "Cyan 2",
      description: "Chart‑3 (deeper cyan)",
      oklch: "oklch(0.45 0.14 195)" as OklchString,
      roles: ["chart-3"],
      category: "color",
    },
    {
      tokenSpecificName: "Red 2",
      description: "Chart‑4 (deeper red)",
      oklch: "oklch(0.45 0.16 20)" as OklchString,
      roles: ["chart-4"],
      category: "color",
    },
    {
      tokenSpecificName: "Cyan 3",
      description: "Chart‑5 (darkest cyan)",
      oklch: "oklch(0.37 0.14 195)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    },
  ] as RawColorDefinition[];
  
  /* -------------------------------------------------------------
     2. STYLE GUIDE (square + elevated → radius 0 & strong shadows)
     ---------------------------------------------------------- */
  const cyberPulseStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Neon Cyan", primaryForeground: "Panel" },
    secondaryColors:     { secondary: "Neon Red", secondaryForeground: "Panel" },
    accentColors:        { accent: "Neon Red", accentForeground: "Panel" },
    cardColors:          { card: "Panel", cardForeground: "Mist" },
    popoverColors:       { popover: "Panel", popoverForeground: "Mist" },
    mutedColors:         { muted: "Muted Panel", mutedForeground: "Smoke" },
    destructiveColors:   { destructive: "Alert Red", destructiveForeground: "Panel" },
    successColors:       { success: "Neon Cyan", successForeground: "Panel" },
    inputColors:         { input: "Graphite", inputForeground: "Mist" },
    borderColors:        { border: "Graphite" },
    ringColors:          { ring: "Neon Cyan" },
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
  const cyberPulseOtherVars = {
    background: "Void",
    foreground: "Mist",
    radiusBase: "0px",
  
    // Sidebar mappings - using colors already defined in rawColors
    sidebar: "Neon Red",
    sidebarForeground: "Mist",
    sidebarPrimary: "Neon Cyan",
    sidebarPrimaryForeground: "Panel",
    sidebarAccent: "Neon Red",
    sidebarAccentForeground: "Panel",
    sidebarBorder: "Graphite",
    sidebarRing: "Neon Cyan",
  
    // Elevation shadows (SqE → strong offsets)
    shadowXs: "0 0 1px 0 oklch(0 0 0 / 0.60)",
    shadowSm: "0 1px 3px 0 oklch(0 0 0 / 0.70)",
    shadowMd: "0 2px 6px 0 oklch(0 0 0 / 0.75)",
    shadowLg: "0 4px 8px 0 oklch(0 0 0 / 0.80)",
    shadowXl: "0 6px 12px 0 oklch(0 0 0 / 0.85)",
    "shadow-2xs": "0 0 0 1px oklch(0 0 0 / 0.50)",
    "shadow-2xl": "0 8px 16px 0 oklch(0 0 0 / 0.90)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    // Chart token map (already covered by roles)
    chart1: "Neon Cyan",
    chart2: "Neon Red",
    chart3: "Cyan 2",
    chart4: "Red 2",
    chart5: "Cyan 3",
  };
  
  /* -------------------------------------------------------------
     4. BRAND OBJECT
     ---------------------------------------------------------- */
  const cyberPulseColors = generateBrandColors("cyber-pulse", cyberPulseRawColors);
  
  export const cyberPulseBrand: Brand = {
    name: "Cyber Pulse",
    businessDetails: {
      name: "Cyber Pulse Inc",
      industry: "gaming_ui",
      personality: {
        vintageModern: 20,
        seasonedYouthful: 70,
        gracefulBold: 80,
        playfulElegant: 40,
        valueSmartLuxurious: 30,
        structuredNatural: 60,
        symbolicRealistic: 50,
      },
    },
    colors: cyberPulseColors,
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
        description: "Futuristic display font that matches neon aesthetics.",
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
    style: cyberPulseStyleGuide,
    themeCssVariables: createThemeCssVars(
      "cyber-pulse",
      cyberPulseColors,
      cyberPulseStyleGuide,
      cyberPulseOtherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',           // Duotone - cyan and red neon colors
      brightness: 'adaptive',              // Adaptive - dark mode default
      saturation: 'neon',                   // Neon - high saturation cyan and red
      colorHarmony: 'complementary',        // Complementary - cyan and red are opposite on color wheel
      accentUsage: 'prominent',             // Paired-accents - strong accent usage
      cornerStyle: 'sharp',                 // Square - 0px radius throughout
      elevation: 'layered',                 // Elevated - strong drop shadows
    },
    animationConfig: {
      preset: glowingBorderAnimationPreset,
      rootClassName: 'cyberpulse-glow-theme'
    }
  };
  