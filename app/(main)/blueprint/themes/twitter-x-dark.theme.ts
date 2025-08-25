/*───────────────────────────────────────────────────────────────────────*\
  Twitter/X Dark Theme
  – Clean blue primary with excellent typography and high contrast
  – duotone · dark-first · medium saturation · complementary harmony
\*───────────────────────────────────────────────────────────────────────*/

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /*───────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS - Twitter/X Dark Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const twitterXDarkThemeDefinition = {
    
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Pure Black",
        description: "Deep black background for dark mode",
        oklch: "oklch(0.05 0 0)" as OklchString, // #000000
        roles: ["background"],
        category: "shade",
        onColor: "oklch(0.91 0.003 225)" as OklchString, // #e7e9ea
      },
      {
        tokenSpecificName: "Dark Gray Card",
        description: "Dark surface for cards and elevated content",
        oklch: "oklch(0.12 0.006 257.14)" as OklchString, // #17181c
        roles: ["card", "sidebar"],
        category: "shade",
        onColor: "oklch(0.85 0.003 225)" as OklchString, // #d9d9d9
      },
      {
        tokenSpecificName: "Popover Black",
        description: "Pure black for popovers and dropdowns",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["popover"],
        category: "shade",
        onColor: "oklch(0.91 0.003 225)" as OklchString,
      },
      {
        tokenSpecificName: "Light Text",
        description: "Primary text color with excellent contrast on dark background",
        oklch: "oklch(0.91 0.003 225)" as OklchString, // #e7e9ea
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
        description: "White text for blue buttons",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["primary-foreground", "destructive-foreground", "sidebar-primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Light Secondary Text",
        description: "Light text for secondary surfaces",
        oklch: "oklch(0.91 0.003 225)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Gray Text",
        description: "Subdued text for less important content",
        oklch: "oklch(0.47 0.005 257.14)" as OklchString, // #72767a
        roles: [],
        category: "shade",
      },

      /* Interactive Elements */
      {
        tokenSpecificName: "Twitter Blue",
        description: "Primary Twitter blue for main actions",
        oklch: "oklch(0.64 0.13 229.59)" as OklchString, // #1c9cf0
        roles: ["primary", "ring", "sidebar-primary", "accent-foreground", "sidebar-accent-foreground"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Secondary Dark",
        description: "Dark secondary surface",
        oklch: "oklch(0.18 0.01 284.32)" as OklchString,
        roles: ["secondary"],
        category: "shade",
        onColor: "oklch(0.91 0.003 225)" as OklchString,
      },
      {
        tokenSpecificName: "Muted Dark Surface",
        description: "Dark muted background for less prominent content",
        oklch: "oklch(0.11 0.003 225)" as OklchString, // #181818
        roles: ["muted"],
        category: "shade",
        onColor: "oklch(0.47 0.005 257.14)" as OklchString,
      },
      {
        tokenSpecificName: "Dark Blue Accent",
        description: "Dark blue accent for highlights",
        oklch: "oklch(0.1 0.025 229.59)" as OklchString, // #061622
        roles: ["accent", "sidebar-accent"],
        category: "color",
        onColor: "oklch(0.64 0.13 229.59)" as OklchString,
      },
      {
        tokenSpecificName: "Border Dark Gray",
        description: "Dark borders for UI elements",
        oklch: "oklch(0.16 0.005 257.14)" as OklchString, // #242628
        roles: ["border"],
        category: "shade",
      },
      {
        tokenSpecificName: "Input Dark Background",
        description: "Dark background for input fields",
        oklch: "oklch(0.17 0.02 201.37)" as OklchString, // #22303c
        roles: ["input"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Dark Border",
        description: "Dark borders specific to sidebar elements",
        oklch: "oklch(0.25 0.01 201.37)" as OklchString, // #38444d
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
      secondaryColors:     { secondary: "Secondary Dark", secondaryForeground: "Light Secondary Text" },
      accentColors:        { accent: "Dark Blue Accent", accentForeground: "Twitter Blue" },
      cardColors:          { card: "Dark Gray Card", cardForeground: "Light Text" },
      popoverColors:       { popover: "Popover Black", popoverForeground: "Light Text" },
      mutedColors:         { muted: "Muted Dark Surface", mutedForeground: "Muted Gray Text" },
      destructiveColors:   { destructive: "Alert Red", destructiveForeground: "Pure White Text" },
      inputColors:         { input: "Input Dark Background", inputForeground: "Light Text" },
      borderColors:        { border: "Border Dark Gray" },
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
      background: "Pure Black",
      foreground: "Light Text",
      radiusBase: "1.3rem",

      // Sidebar mappings - using colors already defined in rawColors
      sidebar: "Dark Gray Card",
      sidebarForeground: "Light Text", 
      sidebarPrimary: "Twitter Blue",
      sidebarPrimaryForeground: "Pure White Text",
      sidebarAccent: "Dark Blue Accent",
      sidebarAccentForeground: "Twitter Blue",
      sidebarBorder: "Sidebar Dark Border",
      sidebarRing: "Twitter Blue",

      // Subtle dark shadows for depth
      shadowXs: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.8)",
      shadowSm: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.8), 0px 1px 3px -1px hsla(0, 0%, 0%, 0.8)",
      shadowMd: "0px 2px 4px 0px hsla(0, 0%, 0%, 0.8), 0px 2px 6px -1px hsla(0, 0%, 0%, 0.8)",
      shadowLg: "0px 4px 6px 0px hsla(0, 0%, 0%, 0.8), 0px 4px 8px -1px hsla(0, 0%, 0%, 0.8)",
      shadowXl: "0px 8px 10px 0px hsla(0, 0%, 0%, 0.8), 0px 8px 12px -1px hsla(0, 0%, 0%, 0.8)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      chart1: "Chart Blue",
      chart2: "Chart Green", 
      chart3: "Chart Yellow",
      chart4: "Chart Bright Green",
      chart5: "Chart Pink",
      chartOutline: "Border Dark Gray",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Twitter/X Dark Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const twitterXDarkBrandColors = generateBrandColors("twitter-x-dark", twitterXDarkThemeDefinition.rawColors);

  export const twitterXDarkTheme: Brand = {
    rating: 77,
    name: "Twitter/X Dark",
    businessDetails: {
      name: "Twitter/X Dark Theme",
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
    colors: twitterXDarkBrandColors,
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
    style: twitterXDarkThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "twitter-x-dark",
      twitterXDarkBrandColors,
      twitterXDarkThemeDefinition.styleGuide,
      twitterXDarkThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Blue and neutral with accent colors
      brightness: 'adaptive',            // Adaptive for dark theme
      saturation: 'medium',              // Vibrant blue but not overwhelming
      colorHarmony: 'complementary',     // Blue primary with complementary accents
      accentUsage: 'balanced',           // Good use of blue accents throughout
      cornerStyle: 'very-rounded',       // 1.3rem is quite rounded
      elevation: 'layered',              // Subtle shadows for depth in dark mode
    },
  }; 