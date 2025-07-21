/*───────────────────────────────────────────────────────────────────────*\
  Vercel Light - Clean, Minimal Light Theme
  – ultra-high-contrast black / white UI with precision-crafted shadows
  – monochrome-duotone · light-first · sophisticated · modern-minimal
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
    1. RAW COLOUR TOKENS - Precision-Crafted Light Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const vercelLightThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Pure White",
        description: "Clean white background for maximum clarity and readability",
        oklch: "oklch(0.99 0 0)" as OklchString,
        roles: ["background"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Card White",
        description: "Elevated white surfaces that provide subtle contrast",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["card", "popover"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Deep Black",
        description: "Primary text color for maximum readability on light backgrounds",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "accent-foreground",
          "secondary-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "White Text",
        description: "Text that appears on dark primary buttons and destructive actions",
        oklch: "oklch(0.99 0 0)" as OklchString,
        roles: [
          "primary-foreground",
          "destructive-foreground",
          "success-foreground",
          "info-foreground",
          "warning-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Black Text", 
        description: "Text that appears on light secondary surfaces",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Status White Text",
        description: "White text that appears on colored status buttons",
        oklch: "oklch(0.99 0 0)" as OklchString,
        roles: ["destructive-foreground", "success-foreground", "info-foreground", "warning-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Gray",
        description: "Subtle muted text for secondary information",
        oklch: "oklch(0.55 0 0)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },
  
      /* Interactive Elements */
      {
        tokenSpecificName: "Primary Black",
        description: "Primary actions in pure black for maximum contrast",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["primary", "ring"],
        category: "shade",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Light Gray Surface",
        description: "Secondary interactions with subtle gray background",
        oklch: "oklch(0.94 0 0)" as OklchString,
        roles: ["secondary", "muted", "border", "input"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Subtle Gray",
        description: "Very light gray for subtle accent states",
        oklch: "oklch(0.97 0 0)" as OklchString,
        roles: ["accent"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
  
      /* System Status Colors */
      {
        tokenSpecificName: "Success Green",
        description: "Clean success state for positive actions",
        oklch: "oklch(0.45 0.14 155)" as OklchString,
        roles: ["success"],
        category: "color",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Info Blue",
        description: "Information state with refined blue tone",
        oklch: "oklch(0.45 0.15 240)" as OklchString,
        roles: ["info"],
        category: "color",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Error Red",
        description: "Destructive actions with clear red indication",
        oklch: "oklch(0.55 0.19 23)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
  
      /* Chart Colors - Light Theme Data Visualization */
      {
        tokenSpecificName: "Chart Black",
        description: "Primary chart color in black",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["chart-1"],
        category: "shade",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Violet",
        description: "Purple for data differentiation",
        oklch: "oklch(0.50 0.22 264)" as OklchString,
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Green",
        description: "Green for positive metrics",
        oklch: "oklch(0.50 0.12 155)" as OklchString,
        roles: ["chart-3"],
        category: "color",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Gray",
        description: "Neutral chart color for baseline data",
        oklch: "oklch(0.65 0 0)" as OklchString,
        roles: ["chart-4"],
        category: "shade",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Dark Gray",
        description: "Dark gray for highlighted data points",
        oklch: "oklch(0.50 0 0)" as OklchString,
        roles: ["chart-5"],
        category: "shade",
        onColor: "oklch(0.99 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Outline",
        description: "Light gray for chart outlines and grid lines",
        oklch: "oklch(0.85 0 0)" as OklchString,
        roles: ["chart-outline"],
        category: "shade",
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Primary Black", primaryForeground: "White Text" },
      secondaryColors:     { secondary: "Light Gray Surface", secondaryForeground: "Deep Black" },
      accentColors:        { accent: "Subtle Gray", accentForeground: "Deep Black" },
      cardColors:          { card: "Card White", cardForeground: "Deep Black" },
      popoverColors:       { popover: "Card White", popoverForeground: "Deep Black" },
      mutedColors:         { muted: "Light Gray Surface", mutedForeground: "Muted Gray" },
      destructiveColors:   { destructive: "Error Red", destructiveForeground: "White Text" },
      successColors:       { success: "Success Green", successForeground: "White Text" },
      infoColors:          { info: "Info Blue", infoForeground: "White Text" },
      warningColors:       { warning: "Error Red", warningForeground: "White Text" },
      inputColors:         { input: "Light Gray Surface", inputForeground: "Deep Black" },
      borderColors:        { border: "Light Gray Surface" },
      ringColors:          { ring: "Primary Black" },
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
      background: "Pure White",
      foreground: "Deep Black",
      radiusBase: "0.5rem",

      // Sidebar mappings
      sidebar: "Card White",
      sidebarForeground: "Deep Black",
      sidebarPrimary: "Primary Black",
      sidebarPrimaryForeground: "White Text",
      sidebarAccent: "Subtle Gray",
      sidebarAccentForeground: "Deep Black",
      sidebarBorder: "Light Gray Surface",
      sidebarRing: "Primary Black",

      // Clean light shadows
      shadowXs: "0px 0px 0px 0px transparent",
      shadowSm: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.05)",
      shadowMd: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.08)",
      shadowLg: "0px 2px 4px -1px hsla(0, 0%, 0%, 0.12), 0px 1px 2px -1px hsla(0, 0%, 0%, 0.08)",
      shadowXl: "0px 4px 8px -2px hsla(0, 0%, 0%, 0.16), 0px 2px 4px -2px hsla(0, 0%, 0%, 0.12)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      chart1: "Chart Black",
      chart2: "Chart Violet",
      chart3: "Chart Green",
      chart4: "Chart Gray",
      chart5: "Chart Dark Gray",
      chartOutline: "Chart Outline",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Vercel Light
  \*───────────────────────────────────────────────────────────────────────*/
  const vercelLightBrandColors = generateBrandColors("vercel-light", vercelLightThemeDefinition.rawColors);

  export const vercelMinimalBrand: Brand = {
    name: "Vercel Light",
    businessDetails: {
      name: "Vercel Light",
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
    colors: vercelLightBrandColors,
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
    style: vercelLightThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "vercel-light",
      vercelLightBrandColors,
      vercelLightThemeDefinition.styleGuide,
      vercelLightThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'monochrome',     // Black, white, and grays only
      brightness: 'light',               // Light-first approach
      saturation: 'muted',               // Minimal color, mostly grayscale
      colorHarmony: 'single-hue',        // Essentially grayscale system
      accentUsage: 'minimal',            // Ultra-minimal accent usage
      cornerStyle: 'slightly-rounded',   // 0.375rem to 1rem radius range  
      elevation: 'minimal-shadow',       // Clean, subtle shadows
    },
  };
  