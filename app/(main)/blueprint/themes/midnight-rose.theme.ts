/*───────────────────────────────────────────────────────────────────────*\
  Midnight Rose - Elegant Dark Theme
  – Deep purples and midnight tones with sophisticated rose accents
  – duotone · dark-first · medium saturation · analogous harmony
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
    1. RAW COLOUR TOKENS - Midnight Rose Dark Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const midnightRoseThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Midnight Purple Background",
        description: "Deep midnight purple background with rose undertones",
        oklch: "oklch(0.15 0.02 285)" as OklchString, // #221d27
        roles: ["background"],
        category: "shade",
        onColor: "oklch(0.84 0.03 310)" as OklchString, // #d2c4de
      },
      {
        tokenSpecificName: "Dark Purple Card",
        description: "Elevated dark surface with purple undertones",
        oklch: "oklch(0.18 0.02 285)" as OklchString, // #2c2632
        roles: ["card"],
        category: "shade",
        onColor: "oklch(0.86 0.03 320)" as OklchString, // #dbc5d2
      },
      {
        tokenSpecificName: "Deep Midnight Popover",
        description: "Deepest midnight for popovers and dropdowns",
        oklch: "oklch(0.12 0.02 315)" as OklchString, // #1f141b
        roles: ["popover"],
        category: "shade",
        onColor: "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
      },
      {
        tokenSpecificName: "Soft Rose Text",
        description: "Primary text in soft rose-lavender",
        oklch: "oklch(0.84 0.03 310)" as OklchString, // #d2c4de
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Pure White Text",
        description: "Pure white for high contrast elements",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["primary-foreground", "destructive-foreground"],
        category: "shade",
      },

      /* Interactive Elements */
      {
        tokenSpecificName: "Midnight Rose Primary",
        description: "Deep rose primary for elegant actions",
        oklch: "oklch(0.55 0.15 350)" as OklchString, // #a3004c
        roles: ["primary"],
        category: "color",
        onColor: "oklch(0.925 0.025 325)" as OklchString, // #efc0d8
      },
      {
        tokenSpecificName: "Dark Purple Secondary",
        description: "Dark purple secondary surface",
        oklch: "oklch(0.25 0.03 285)" as OklchString, // #362d3d
        roles: ["secondary"],
        category: "color",
        onColor: "oklch(0.85 0.03 310)" as OklchString, // #d4c7e1
      },
      {
        tokenSpecificName: "Lavender Secondary Text",
        description: "Soft lavender text for secondary elements",
        oklch: "oklch(0.85 0.03 310)" as OklchString, // #d4c7e1
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Midnight Surface",
        description: "Muted midnight background for less prominent content",
        oklch: "oklch(0.16 0.02 285)" as OklchString, // #28222d
        roles: ["muted"],
        category: "color",
        onColor: "oklch(0.78 0.03 310)" as OklchString, // #c2b6cf
      },
      {
        tokenSpecificName: "Muted Lavender Text",
        description: "Muted lavender text for subdued content",
        oklch: "oklch(0.78 0.03 310)" as OklchString, // #c2b6cf
        roles: ["muted-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Deep Purple Accent",
        description: "Deep purple accent for highlights",
        oklch: "oklch(0.3 0.04 285)" as OklchString, // #463753
        roles: ["accent"],
        category: "color",
        onColor: "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
      },
      {
        tokenSpecificName: "Rose Accent Text",
        description: "Soft rose text for accent surfaces",
        oklch: "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
        roles: ["accent-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Purple Rose Border",
        description: "Dark purple-rose borders for UI elements",
        oklch: "oklch(0.22 0.03 285)" as OklchString, // #3b3237
        roles: ["border"],
        category: "color",
      },
      {
        tokenSpecificName: "Input Midnight Background",
        description: "Midnight purple background for input fields",
        oklch: "oklch(0.24 0.03 285)" as OklchString, // #3e343c
        roles: ["input"],
        category: "color",
      },
      {
        tokenSpecificName: "Bright Rose Focus",
        description: "Bright rose for focus rings and highlights",
        oklch: "oklch(0.6 0.22 340)" as OklchString, // #db2777
        roles: ["ring"],
        category: "color",
      },

      /* Sidebar Elements */
      {
        tokenSpecificName: "Sidebar Midnight Surface",
        description: "Deep midnight surface for sidebar",
        oklch: "oklch(0.115 0.02 315)" as OklchString, // #1e151d
        roles: ["sidebar"],
        category: "color",
        onColor: "oklch(0.88 0.03 325)" as OklchString, // #e0cad6
      },
      {
        tokenSpecificName: "Sidebar Rose Text",
        description: "Soft rose text for sidebar",
        oklch: "oklch(0.88 0.03 325)" as OklchString, // #e0cad6
        roles: ["sidebar-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Bright Purple",
        description: "Bright purple primary color for sidebar elements",
        oklch: "oklch(0.55 0.18 250)" as OklchString, // #1d4ed8
        roles: ["sidebar-primary"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Sidebar Primary Text",
        description: "White text for sidebar primary elements",
        oklch: "oklch(1 0 0)" as OklchString, // #ffffff
        roles: ["sidebar-primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Dark Accent",
        description: "Dark accent for sidebar highlights",
        oklch: "oklch(0.14 0.02 315)" as OklchString, // #261922
        roles: ["sidebar-accent"],
        category: "shade",
        onColor: "oklch(0.96 0.005 60)" as OklchString, // #f4f4f5
      },
      {
        tokenSpecificName: "Sidebar Accent Text",
        description: "Light text for sidebar accent elements",
        oklch: "oklch(0.96 0.005 60)" as OklchString, // #f4f4f5
        roles: ["sidebar-accent-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Black Border",
        description: "Pure black borders for sidebar elements",
        oklch: "oklch(0.05 0 0)" as OklchString, // #000000
        roles: ["sidebar-border"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Rose Ring",
        description: "Rose focus ring for sidebar elements",
        oklch: "oklch(0.6 0.22 340)" as OklchString, // #db2777
        roles: ["sidebar-ring"],
        category: "color",
      },

      /* System Status Colors */
      {
        tokenSpecificName: "Dark Crimson Red",
        description: "Dark crimson for destructive actions in dark theme",
        oklch: "oklch(0.15 0.05 25)" as OklchString, // #301015
        roles: ["destructive"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },

      /* Chart Colors - Midnight Rose Visualization Palette */
      {
        tokenSpecificName: "Chart Rose",
        description: "Elegant rose for primary chart data",
        oklch: "oklch(0.62 0.12 340)" as OklchString, // #a84370
        roles: ["chart-1"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Amethyst",
        description: "Rich amethyst purple for secondary chart data",
        oklch: "oklch(0.62 0.2 285)" as OklchString, // #934dcb
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Gold",
        description: "Warm gold for tertiary chart data",
        oklch: "oklch(0.7 0.12 60)" as OklchString, // #e88c30
        roles: ["chart-3"],
        category: "color",
        onColor: "oklch(0.15 0.05 60)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Lavender",
        description: "Soft lavender for quaternary chart data",
        oklch: "oklch(0.7 0.22 285)" as OklchString, // #af57db
        roles: ["chart-4"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Pink",
        description: "Vibrant pink for quinary chart data",
        oklch: "oklch(0.65 0.22 350)" as OklchString, // #e23670
        roles: ["chart-5"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Midnight Rose Primary", primaryForeground: "Pure White Text" },
      secondaryColors:     { secondary: "Dark Purple Secondary", secondaryForeground: "Lavender Secondary Text" },
      accentColors:        { accent: "Deep Purple Accent", accentForeground: "Rose Accent Text" },
      cardColors:          { card: "Dark Purple Card", cardForeground: "Soft Rose Text" },
      popoverColors:       { popover: "Deep Midnight Popover", popoverForeground: "Soft Rose Text" },
      mutedColors:         { muted: "Muted Midnight Surface", mutedForeground: "Muted Lavender Text" },
      destructiveColors:   { destructive: "Dark Crimson Red", destructiveForeground: "Pure White Text" },
      inputColors:         { input: "Input Midnight Background", inputForeground: "Soft Rose Text" },
      borderColors:        { border: "Purple Rose Border" },
      ringColors:          { ring: "Bright Rose Focus" },
      radius: {
        radiusSm: "calc(0.5rem - 4px)", // 0.125rem (2px)
        radiusMd: "calc(0.5rem - 2px)", // 0.25rem (4px)
        radiusLg: "0.5rem", // 8px
        radiusXl: "calc(0.5rem + 4px)", // 0.875rem (14px)
      },
      spacing: {
        spacingSm: "0.5rem",
        spacingMd: "1rem",
        spacingLg: "1.5rem",
        spacingXl: "2rem",
      },
    } as StyleGuide,

    otherVars: {
      background: "Midnight Purple Background",
      foreground: "Soft Rose Text",
      radiusBase: "0.5rem",

      // Deep shadows for elegant depth
      shadowXs: "0 1px 3px 0px hsl(285 20% 5% / 0.6)",
      shadowSm: "0 1px 3px 0px hsl(285 20% 5% / 0.7), 0 1px 2px -1px hsl(285 20% 5% / 0.7)",
      shadowMd: "0 1px 3px 0px hsl(285 20% 5% / 0.8), 0 2px 4px -1px hsl(285 20% 5% / 0.8)",
      shadowLg: "0 1px 3px 0px hsl(285 20% 5% / 0.9), 0 4px 6px -1px hsl(285 20% 5% / 0.9)",
      shadowXl: "0 1px 3px 0px hsl(285 20% 5% / 1.0), 0 8px 10px -1px hsl(285 20% 5% / 1.0)",
      shadow2xl: "0 1px 3px 0px hsl(285 20% 5% / 1.0)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      // Sidebar-specific mappings
      sidebar: "Sidebar Midnight Surface",
      sidebarForeground: "Sidebar Rose Text",
      sidebarPrimary: "Sidebar Bright Purple",
      sidebarPrimaryForeground: "Sidebar Primary Text",
      sidebarAccent: "Sidebar Dark Accent",
      sidebarAccentForeground: "Sidebar Accent Text",
      sidebarBorder: "Sidebar Black Border",
      sidebarRing: "Sidebar Rose Ring",

      chart1: "Chart Rose",
      chart2: "Chart Amethyst", 
      chart3: "Chart Gold",
      chart4: "Chart Lavender",
      chart5: "Chart Pink",
      chartOutline: "Purple Rose Border",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Midnight Rose Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const midnightRoseBrandColors = generateBrandColors("midnight-rose", midnightRoseThemeDefinition.rawColors);

  export const midnightRoseTheme: Brand = {
    name: "Midnight Rose",
    businessDetails: {
      name: "Midnight Rose Dark Theme",
      industry: "creative",
      personality: {
        vintageModern: 75,      // Strong vintage elegance with midnight tones
        seasonedYouthful: 35,   // More sophisticated and mature
        gracefulBold: 85,       // Extremely graceful and elegant
        playfulElegant: 90,     // Peak elegance
        valueSmartLuxurious: 80, // Very luxurious feel with deep colors
        structuredNatural: 65,  // Well-structured but softer
        symbolicRealistic: 65,  // More symbolic and artistic
      },
    },
    colors: midnightRoseBrandColors,
    fonts: [
      {
        name: "Inter",
        distributor: "Google Fonts",
        description: "Modern sans-serif font optimized for digital interfaces with excellent readability.",
        family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
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
          extrabold: 800,
          black: 900
        },
      },
      {
        name: "Georgia",
        distributor: "System",
        description: "Classic serif font for editorial content and elegant typography.",
        family: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        roles: ["serif", "editorial"],
        weights: { 
          regular: 400, 
          bold: 700
        },
      },
      {
        name: "SF Mono",
        distributor: "System", 
        description: "Clean monospace font for code and technical content.",
        family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        roles: ["code", "mono", "pre"],
        weights: { 
          regular: 400, 
          medium: 500,
          bold: 700
        },
      },
    ],
    style: midnightRoseThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "midnight-rose",
      midnightRoseBrandColors,
      midnightRoseThemeDefinition.styleGuide,
      midnightRoseThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Purple/rose with elegant accents
      brightness: 'adaptive',            // Adaptive for sophisticated dark theme
      saturation: 'medium',              // Rich but not overwhelming
      colorHarmony: 'analogous',         // Purple and rose are analogous colors
      accentUsage: 'balanced',           // Elegant use of rose/purple accents
      cornerStyle: 'slightly-rounded',   // 0.5rem is moderately rounded
      elevation: 'layered',              // Rich shadows and depth for luxury feel
    },
  }; 