/*───────────────────────────────────────────────────────────────────────────*\
  Coca‑Cola Classic Theme – Bold Heritage Red & White Light UI
  – iconic duotone palette inspired by the world‑famous beverage brand
  – light‑first · energetic · minimal shadows · crisp rounded corners
\*───────────────────────────────────────────────────────────────────────────*/

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /*───────────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS – Coca‑Cola Signature Palette
  \*───────────────────────────────────────────────────────────────────────────*/
  const cocaColaThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Pure White",
        description: "Clean white background and text on red surfaces",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: [
          "background",
          "primary-foreground",
          "destructive-foreground",
        ],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Card White",
        description: "Elevated white cards and popovers",
        oklch: "oklch(0.99 0 0)" as OklchString,
        roles: ["card", "popover"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Coke Black",
        description: "Primary text colour on light surfaces",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "secondary-foreground",
          "accent-foreground",
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Gray",
        description: "Muted secondary text",
        oklch: "oklch(0.55 0 0)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Light Gray Surface",
        description: "Subtle gray for secondary and muted UI",
        oklch: "oklch(0.94 0 0)" as OklchString,
        roles: ["secondary", "muted", "border", "input"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
  
      /* Brand Reds */
      {
        tokenSpecificName: "Coke Red",
        description: "Signature Coca‑Cola red for primary actions and focus states",
        oklch: "oklch(0.60 0.23 29)" as OklchString,
        roles: ["primary", "ring", "accent"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Coke Dark Red",
        description: "Darker red for destructive actions and hover states",
        oklch: "oklch(0.50 0.23 29)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
  
      /* System Status Colours */
      {
        tokenSpecificName: "Success Green",
        description: "Positive success state",
        oklch: "oklch(0.55 0.16 145)" as OklchString,
        roles: ["success"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Info Blue",
        description: "Informational state",
        oklch: "oklch(0.55 0.15 245)" as OklchString,
        roles: ["info"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Warning Orange",
        description: "Warning indication",
        oklch: "oklch(0.65 0.18 55)" as OklchString,
        roles: ["warning"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
  
      /* Chart Colours */
      {
        tokenSpecificName: "Chart Red",
        description: "Primary chart colour in Coca‑Cola red",
        oklch: "oklch(0.60 0.23 29)" as OklchString,
        roles: ["chart-1"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Dark Red",
        description: "Secondary chart colour in darker red",
        oklch: "oklch(0.50 0.23 29)" as OklchString,
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Black",
        description: "Neutral chart colour in black",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["chart-3"],
        category: "shade",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Gray",
        description: "Supporting neutral chart colour",
        oklch: "oklch(0.65 0 0)" as OklchString,
        roles: ["chart-4"],
        category: "shade",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Outline",
        description: "Light gray grid / outline",
        oklch: "oklch(0.85 0 0)" as OklchString,
        roles: ["chart-outline"],
        category: "shade",
      },
    ] as RawColorDefinition[],
  
    /*───────────────────────────────────────────────────────────────────────*\
      2. STYLE GUIDE – Bold Red Minimal
    \*───────────────────────────────────────────────────────────────────────*/
    styleGuide: {
      rootColors: { background: "Pure White", foreground: "Coke Black" },
      primaryColors:       { primary: "Coke Red", primaryForeground: "Pure White" },
      secondaryColors:     { secondary: "Light Gray Surface", secondaryForeground: "Coke Black" },
      accentColors:        { accent: "Coke Dark Red", accentForeground: "Pure White" },
      cardColors:          { card: "Card White", cardForeground: "Coke Black" },
      popoverColors:       { popover: "Card White", popoverForeground: "Coke Black" },
      mutedColors:         { muted: "Light Gray Surface", mutedForeground: "Muted Gray" },
      destructiveColors:   { destructive: "Coke Dark Red", destructiveForeground: "Pure White" },
      successColors:       { success: "Success Green", successForeground: "Pure White" },
      infoColors:          { info: "Info Blue", infoForeground: "Pure White" },
      warningColors:       { warning: "Warning Orange", warningForeground: "Pure White" },
      inputColors:         { input: "Light Gray Surface", inputForeground: "Coke Black" },
      borderColors:        { border: "Light Gray Surface" },
      ringColors:          { ring: "Coke Red" },
      sidebarColors: {
        sidebar: "Card White",
        sidebarForeground: "Coke Black",
        sidebarPrimary: "Coke Red",
        sidebarPrimaryForeground: "Pure White",
        sidebarAccent: "Coke Dark Red",
        sidebarAccentForeground: "Pure White",
        sidebarBorder: "Light Gray Surface",
        sidebarRing: "Coke Red",
      },
      chartColors: {
        chart1: "Chart Red",
        chart2: "Chart Dark Red",
        chart3: "Chart Black",
        chart4: "Chart Gray",
        chart5: "Chart Dark Red",
        chartOutline: "Chart Outline",
      },
      radius: {
        radiusSm: "0.25rem",
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
    } as StyleGuide,
  
    /*───────────────────────────────────────────────────────────────────────*\
      3. OTHER VARS – Shadows & Sidebar
    \*───────────────────────────────────────────────────────────────────────*/
    otherVars: {
      radiusBase: "0.5rem",
  
      shadowXs: "0px 0px 0px 0px transparent",
      shadowSm: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.05)",
      shadowMd: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.08)",
      shadowLg: "0px 2px 4px -1px hsla(0, 0%, 0%, 0.12), 0px 1px 2px -1px hsla(0, 0%, 0%, 0.08)",
      shadowXl: "0px 4px 8px -2px hsla(0, 0%, 0%, 0.16), 0px 2px 4px -2px hsla(0, 0%, 0%, 0.12)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
    },
  };
  
  /*───────────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT – Coca‑Cola
  \*───────────────────────────────────────────────────────────────────────────*/
  const cocaColaBrandColors = generateBrandColors(
    "coca-cola",
    cocaColaThemeDefinition.rawColors,
  );
  
  export const cocaColaBrand: Brand = {
    rating: 88,
    name: "Coca‑Cola Classic",
    businessDetails: {
      name: "The Coca‑Cola Company",
      industry: "beverage",
      personality: {
        vintageModern: 60,      // Heritage with modern interface
        seasonedYouthful: 50,   // Timeless excitement
        gracefulBold: 80,       // Bold red but graceful white
        playfulElegant: 40,     // More energetic than playful
        valueSmartLuxurious: 55,// Approachable premium
        structuredNatural: 70,  // Structured layouts
        symbolicRealistic: 45,  // Iconic symbolism balanced with realism
      },
    },
    colors: cocaColaBrandColors,
    fonts: [
      {
        name: "TCCC Unity Sans",
        distributor: "Coca‑Cola Company",
        description: "Coca‑Cola’s proprietary sans-serif for modern digital touch‑points.",
        family: "'TCCC Unity Sans', 'Helvetica Neue', Arial, sans-serif",
        roles: [
          "heading",
          "body",
          "display",
          "sans",
          "default",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "a",
          "li",
          "button-label",
          "form-input",
        ],
        weights: {
          thin: 100,
          light: 300,
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
        },
      },
      {
        name: "TCCC Unity Slab",
        distributor: "Coca‑Cola Company",
        description: "Slab-serif companion for nostalgic headlines.",
        family: "'TCCC Unity Slab', 'Georgia', serif",
        roles: ["display", "hero-title"],
        weights: {
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          black: 900,
        },
      },
      {
        name: "JetBrains Mono",
        distributor: "JetBrains / Google Fonts",
        description: "Monospaced font for code examples and technical details.",
        family: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: {
          thin: 100,
          light: 300,
          regular: 400,
          medium: 500,
          bold: 700,
        },
      },
    ],
    style: cocaColaThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "coca-cola",
      cocaColaBrandColors,
      cocaColaThemeDefinition.styleGuide,
      cocaColaThemeDefinition.otherVars,
    ),
    sevenAxisCode: {
      colorComplexity: "duotone",
      brightness: "light",
      saturation: "vibrant",
      colorHarmony: "single-hue",
      accentUsage: "prominent",
      cornerStyle: "slightly-rounded",
      elevation: "minimal-shadow",
    },
  };
  