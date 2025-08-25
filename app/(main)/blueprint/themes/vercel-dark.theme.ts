/*───────────────────────────────────────────────────────────────────────*\
  Vercel Dark - Signature Dark Theme
  – ultra-high-contrast black / white UI with precision-crafted shadows
  – monochrome-duotone · dark-first · sophisticated · modern-minimal
\*───────────────────────────────────────────────────────────────────────*/

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /*───────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS - Precision-Crafted Dark Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const vercelDarkThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Void Black",
        description: "Vercel's signature ultra-deep background, the perfect digital black",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["background"],
        category: "shade",
        onColor: "oklch(0.95 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Carbon Panel",
        description: "Elevated surfaces that float above the void with precision",
        oklch: "oklch(0.11 0 0)" as OklchString,
        roles: ["card", "popover"],
        category: "shade",
        onColor: "oklch(0.95 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Pure White",
        description: "Primary text color for maximum readability on dark backgrounds",
        oklch: "oklch(0.95 0 0)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Black Text",
        description: "Text that appears on light primary buttons",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "White Text", 
        description: "Text that appears on dark secondary surfaces",
        oklch: "oklch(0.95 0 0)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Status Black Text",
        description: "Black text that appears on colored status buttons",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["destructive-foreground", "success-foreground", "info-foreground", "warning-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Gray",
        description: "Subtle muted text for secondary information",
        oklch: "oklch(0.65 0 0)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },
  
      /* Interactive Elements */
      {
        tokenSpecificName: "Primary White",
        description: "Primary actions in pure white for maximum contrast",
        oklch: "oklch(0.95 0 0)" as OklchString,
        roles: ["primary", "ring"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Dark Gray Surface",
        description: "Secondary interactions with dark gray background",
        oklch: "oklch(0.18 0 0)" as OklchString,
        roles: ["secondary", "muted", "border", "input"],
        category: "shade",
        onColor: "oklch(0.95 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Subtle Dark Gray",
        description: "Dark gray for subtle accent states",
        oklch: "oklch(0.22 0 0)" as OklchString,
        roles: ["accent"],
        category: "shade",
        onColor: "oklch(0.95 0 0)" as OklchString,
      },
  
      /* System Status Colors */
      {
        tokenSpecificName: "Success Green",
        description: "Clean success state for positive actions",
        oklch: "oklch(0.65 0.13 155)" as OklchString,
        roles: ["success"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Info Blue",
        description: "Information state with refined blue tone",
        oklch: "oklch(0.60 0.16 240)" as OklchString,
        roles: ["info"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Error Red",
        description: "Destructive actions with clear red indication",
        oklch: "oklch(0.69 0.20 24)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
  
      /* Chart Colors - Dark Theme Data Visualization */
      {
        tokenSpecificName: "Chart White",
        description: "Primary chart color in white",
        oklch: "oklch(0.95 0 0)" as OklchString,
        roles: ["chart-1"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Violet",
        description: "Purple for data differentiation",
        oklch: "oklch(0.65 0.21 260)" as OklchString,
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Green",
        description: "Green for positive metrics",
        oklch: "oklch(0.65 0.13 155)" as OklchString,
        roles: ["chart-3"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Gray",
        description: "Neutral chart color for baseline data",
        oklch: "oklch(0.70 0 0)" as OklchString,
        roles: ["chart-4"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Light Gray",
        description: "Light gray for highlighted data points",
        oklch: "oklch(0.85 0 0)" as OklchString,
        roles: ["chart-5"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Outline",
        description: "Dark gray for chart outlines and grid lines",
        oklch: "oklch(0.35 0 0)" as OklchString,
        roles: ["chart-outline"],
        category: "shade",
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Primary White", primaryForeground: "Black Text" },
      secondaryColors:     { secondary: "Dark Gray Surface", secondaryForeground: "White Text" },
      accentColors:        { accent: "Subtle Dark Gray", accentForeground: "Pure White" },
      cardColors:          { card: "Carbon Panel", cardForeground: "Pure White" },
      popoverColors:       { popover: "Carbon Panel", popoverForeground: "Pure White" },
      mutedColors:         { muted: "Dark Gray Surface", mutedForeground: "Muted Gray" },
      destructiveColors:   { destructive: "Error Red", destructiveForeground: "Status Black Text" },
      successColors:       { success: "Success Green", successForeground: "Status Black Text" },
      inputColors:         { input: "Dark Gray Surface", inputForeground: "Pure White" },
      borderColors:        { border: "Dark Gray Surface" },
      ringColors:          { ring: "Primary White" },
      radius: {
        radiusSm: "0.375rem",
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

    otherVars: {
      background: "Void Black",
      foreground: "Pure White",
      radiusBase: "0.5rem",

      // Sidebar mappings
      sidebar: "Carbon Panel",
      sidebarForeground: "Pure White",
      sidebarPrimary: "Primary White",
      sidebarPrimaryForeground: "Black Text",
      sidebarAccent: "Subtle Dark Gray",
      sidebarAccentForeground: "Pure White",
      sidebarBorder: "Dark Gray Surface",
      sidebarRing: "Primary White",

      // Vercel's ultra-clean shadow system - invisible unless intentionally heavy
      shadowXs: "0px 0px 0px 0px transparent",
      shadowSm: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.01)",
      shadowMd: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.02)",
      shadowLg: "0px 2px 4px -1px hsla(0, 0%, 0%, 0.06), 0px 1px 2px -1px hsla(0, 0%, 0%, 0.04)",
      shadowXl: "0px 4px 8px -2px hsla(0, 0%, 0%, 0.08), 0px 2px 4px -2px hsla(0, 0%, 0%, 0.06)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      chart1: "Chart White",
      chart2: "Chart Violet",
      chart3: "Chart Green",
      chart4: "Chart Gray",
      chart5: "Chart Light Gray",
      chartOutline: "Chart Outline",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Vercel Dark
  \*───────────────────────────────────────────────────────────────────────*/
  const vercelDarkBrandColors = generateBrandColors("vercel-dark", vercelDarkThemeDefinition.rawColors);

  export const vercelDarkBrand: Brand = {
    name: "Vercel Dark",
    rating: 92,
    businessDetails: {
      name: "Vercel Dark",
      industry: "developer_platform",
      personality: {
        vintageModern: 15,      // Very modern, cutting-edge
        seasonedYouthful: 85,   // Youthful innovation
        gracefulBold: 90,       // Bold simplicity with grace
        playfulElegant: 25,     // Elegant but not playful
        valueSmartLuxurious: 45, // Smart value over luxury
        structuredNatural: 85,  // Highly structured, systematic
        symbolicRealistic: 25,  // Realistic, practical approach
      },
    },
    colors: vercelDarkBrandColors,
    fonts: [
      {
        name: "Geist",
        distributor: "Vercel",
        description: "Vercel's signature sans-serif, engineered for perfect readability and modern web interfaces.",
        family: "'Geist', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        roles: [
          "heading", "body", "display", "sans", "default",
          "h1", "h2", "h3", "h4", "h5", "h6",
          "p", "a", "li", "button-label", "form-input"
        ],
        weights: { 
          thin: 100, 
          light: 300, 
          regular: 400, 
          medium: 500, 
          semibold: 600, 
          bold: 700,
          extrabold: 800
        },
      },
      {
        name: "Geist Mono",
        distributor: "Vercel",
        description: "Vercel's precision-crafted monospace font, optimized for code readability and technical content.",
        family: "'Geist Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
        roles: ["code", "mono", "pre"],
        weights: { 
          light: 300, 
          regular: 400, 
          medium: 500,
          semibold: 600,
          bold: 700
        },
      },
    ],
    style: vercelDarkThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "vercel-dark",
      vercelDarkBrandColors,
      vercelDarkThemeDefinition.styleGuide,
      vercelDarkThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'monochrome',     // Black, white, and grays only
      brightness: 'adaptive',            // Adaptive brightness for dark theme
      saturation: 'muted',               // Minimal color, mostly grayscale
      colorHarmony: 'single-hue',        // Essentially grayscale system
      accentUsage: 'minimal',            // Ultra-minimal accent usage
      cornerStyle: 'slightly-rounded',   // 0.375rem to 1rem radius range  
      elevation: 'minimal-shadow',       // Ultra-clean, nearly invisible shadows
    },
  }; 