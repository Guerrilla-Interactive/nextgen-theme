/*───────────────────────────────────────────────────────────────────────*\
  Twitter/X Light Theme
  – Clean blue primary with excellent typography and high contrast
  – duotone · light-first · medium saturation · complementary harmony
\*───────────────────────────────────────────────────────────────────────*/

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /*───────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS - Twitter/X Light Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const twitterXLightThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Pure White",
        description: "Clean white background for light mode",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["background"],
        category: "shade",
        onColor: "oklch(0.12 0.01 284.32)" as OklchString, // #0f1419
      },
      {
        tokenSpecificName: "Light Gray Card",
        description: "Subtle gray surface for cards and elevated content",
        oklch: "oklch(0.97 0.003 225)" as OklchString, // #f7f8f8
        roles: ["card", "sidebar"],
        category: "shade",
        onColor: "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Popover White",
        description: "Pure white for popovers and dropdowns",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["popover"],
        category: "shade",
        onColor: "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Dark Text",
        description: "Primary text color with excellent contrast",
        oklch: "oklch(0.12 0.01 284.32)" as OklchString, // #0f1419
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "muted-foreground",
          "sidebar-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Pure White Text",
        description: "White text for dark surfaces",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["primary-foreground", "destructive-foreground", "sidebar-primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Dark Secondary Text",
        description: "Dark text for secondary surfaces",
        oklch: "oklch(0.12 0.01 284.32)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },

      /* Interactive Elements */
      {
        tokenSpecificName: "Twitter Blue",
        description: "Primary Twitter blue for main actions",
        oklch: "oklch(0.64 0.13 230.48)" as OklchString, // #1e9df1
        roles: ["primary", "ring", "sidebar-primary", "accent-foreground", "sidebar-accent-foreground"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Secondary Light",
        description: "Light secondary surface",
        oklch: "oklch(0.94 0.003 225)" as OklchString, // #f0f3f4
        roles: ["secondary"],
        category: "shade",
        onColor: "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Muted Surface",
        description: "Muted background for less prominent content",
        oklch: "oklch(0.9 0.002 225)" as OklchString, // #e5e5e6
        roles: ["muted"],
        category: "shade",
        onColor: "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Light Blue Accent",
        description: "Subtle blue accent for highlights",
        oklch: "oklch(0.93 0.025 229.59)" as OklchString, // #e3ecf6
        roles: ["accent", "sidebar-accent"],
        category: "color",
        onColor: "oklch(0.64 0.13 230.48)" as OklchString,
      },
      {
        tokenSpecificName: "Border Gray",
        description: "Subtle borders for UI elements",
        oklch: "oklch(0.91 0.01 201.37)" as OklchString, // #e1eaef
        roles: ["border"],
        category: "shade",
      },
      {
        tokenSpecificName: "Input Background",
        description: "Background for input fields",
        oklch: "oklch(0.98 0.005 201.37)" as OklchString, // #f7f9fa
        roles: ["input"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Border",
        description: "Borders specific to sidebar elements",
        oklch: "oklch(0.9 0.01 201.37)" as OklchString, // #e1e8ed
        roles: ["sidebar-border"],
        category: "shade",
      },

      /* System Status Colors */
      {
        tokenSpecificName: "Alert Red",
        description: "Destructive actions and error states",
        oklch: "oklch(0.55 0.22 27.33)" as OklchString, // #f4212e
        roles: ["destructive"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },

      /* Chart Colors - Data Visualization Palette */
      {
        tokenSpecificName: "Chart Blue",
        description: "Primary chart color - Twitter blue",
        oklch: "oklch(0.64 0.13 230.48)" as OklchString, // #1e9df1
        roles: ["chart-1"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Green",
        description: "Success green for positive metrics",
        oklch: "oklch(0.65 0.15 164.25)" as OklchString, // #00b87a
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Yellow",
        description: "Warning yellow for attention metrics",
        oklch: "oklch(0.78 0.15 85.87)" as OklchString, // #f7b928
        roles: ["chart-3"],
        category: "color",
        onColor: "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Bright Green",
        description: "Bright green for growth metrics",
        oklch: "oklch(0.68 0.17 145.77)" as OklchString, // #17bf63
        roles: ["chart-4"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Pink",
        description: "Pink for engagement metrics",
        oklch: "oklch(0.55 0.22 348.32)" as OklchString, // #e0245e
        roles: ["chart-5"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Twitter Blue", primaryForeground: "Pure White Text" },
      secondaryColors:     { secondary: "Secondary Light", secondaryForeground: "Dark Secondary Text" },
      accentColors:        { accent: "Light Blue Accent", accentForeground: "Twitter Blue" },
      cardColors:          { card: "Light Gray Card", cardForeground: "Dark Text" },
      popoverColors:       { popover: "Popover White", popoverForeground: "Dark Text" },
      mutedColors:         { muted: "Muted Surface", mutedForeground: "Dark Text" },
      destructiveColors:   { destructive: "Alert Red", destructiveForeground: "Pure White Text" },
      inputColors:         { input: "Input Background", inputForeground: "Dark Text" },
      borderColors:        { border: "Border Gray" },
      ringColors:          { ring: "Twitter Blue" },
      radius: {
        radiusSm: "calc(1.3rem - 4px)", // 0.9rem
        radiusMd: "calc(1.3rem - 2px)", // 1.1rem  
        radiusLg: "1.3rem",
        radiusXl: "calc(1.3rem + 4px)", // 1.7rem
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
      foreground: "Dark Text",
      radiusBase: "1.3rem",

      // Sidebar mappings - using colors already defined in rawColors
      sidebar: "Light Gray Card",
      sidebarForeground: "Dark Text", 
      sidebarPrimary: "Twitter Blue",
      sidebarPrimaryForeground: "Pure White Text",
      sidebarAccent: "Light Blue Accent",
      sidebarAccentForeground: "Twitter Blue",
      sidebarBorder: "Sidebar Border",
      sidebarRing: "Twitter Blue",

      // Transparent shadows - all set to 0 opacity
      shadowXs: "0px 2px 0px 0px hsla(202.8169, 89.1213%, 53.1373%, 0.00)",
      shadowSm: "0px 2px 0px 0px hsla(202.8169, 89.1213%, 53.1373%, 0.00), 0px 1px 2px -1px hsla(202.8169, 89.1213%, 53.1373%, 0.00)",
      shadowMd: "0px 2px 0px 0px hsla(202.8169, 89.1213%, 53.1373%, 0.00), 0px 2px 4px -1px hsla(202.8169, 89.1213%, 53.1373%, 0.00)",
      shadowLg: "0px 2px 0px 0px hsla(202.8169, 89.1213%, 53.1373%, 0.00), 0px 4px 6px -1px hsla(202.8169, 89.1213%, 53.1373%, 0.00)",
      shadowXl: "0px 2px 0px 0px hsla(202.8169, 89.1213%, 53.1373%, 0.00), 0px 8px 10px -1px hsla(202.8169, 89.1213%, 53.1373%, 0.00)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      chart1: "Chart Blue",
      chart2: "Chart Green", 
      chart3: "Chart Yellow",
      chart4: "Chart Bright Green",
      chart5: "Chart Pink",
      chartOutline: "Border Gray",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Twitter/X Light Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const twitterXLightBrandColors = generateBrandColors("twitter-x-light", twitterXLightThemeDefinition.rawColors);

  export const twitterXTheme: Brand = {
    rating: 77,
    name: "Twitter/X Light",
    businessDetails: {
      name: "Twitter/X Light Theme",
      industry: "social_media",
      personality: {
        vintageModern: 25,      // Modern, contemporary
        seasonedYouthful: 60,   // Balanced, appeals to all ages
        gracefulBold: 70,       // Bold but still graceful
        playfulElegant: 40,     // More playful than elegant
        valueSmartLuxurious: 30, // Value-focused, accessible
        structuredNatural: 75,  // Well-structured interface
        symbolicRealistic: 60,  // Balanced approach
      },
    },
    colors: twitterXLightBrandColors,
    fonts: [
      {
        name: "Open Sans",
        distributor: "Google Fonts",
        description: "Highly readable sans-serif font optimized for digital interfaces and social content.",
        family: "'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        roles: [
          "heading", "body", "display", "sans", "default",
          "h1", "h2", "h3", "h4", "h5", "h6",
          "p", "a", "li", "button-label", "form-input"
        ],
        weights: { 
          light: 300, 
          regular: 400, 
          medium: 500, 
          semibold: 600, 
          bold: 700,
          extrabold: 800
        },
      },
      {
        name: "Georgia",
        distributor: "System",
        description: "Classic serif font for editorial content and emphasis.",
        family: "'Georgia', 'Times New Roman', serif",
        roles: ["serif", "editorial"],
        weights: { 
          regular: 400, 
          bold: 700
        },
      },
      {
        name: "Menlo",
        distributor: "System", 
        description: "Clean monospace font for code and technical content.",
        family: "'Menlo', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
        roles: ["code", "mono", "pre"],
        weights: { 
          regular: 400, 
          medium: 500,
          bold: 700
        },
      },
    ],
    style: twitterXLightThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "twitter-x-light",
      twitterXLightBrandColors,
      twitterXLightThemeDefinition.styleGuide,
      twitterXLightThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Blue and neutral with accent colors
      brightness: 'light',               // Light theme
      saturation: 'medium',              // Vibrant blue but not overwhelming
      colorHarmony: 'complementary',     // Blue primary with complementary accents
      accentUsage: 'balanced',           // Good use of blue accents throughout
      cornerStyle: 'very-rounded',       // 1.3rem is quite rounded
      elevation: 'flat',                 // No shadows, flat design
    },
  }; 