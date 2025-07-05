/*───────────────────────────────────────────────────────────────────────*\
  Twitter/X Theme
  – Clean blue primary with excellent typography and high contrast
  – duotone · adaptive · medium saturation · complementary harmony
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
    1. RAW COLOUR TOKENS - Twitter/X Inspired Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const twitterXThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Pure White",
        description: "Clean white background for light mode",
        oklchLight: "oklch(1 0 0)" as OklchString,
        oklchDark:  "oklch(0.05 0 0)" as OklchString, // #000000
        roles: ["background"],
        category: "shade",
        onColorLight: "oklch(0.12 0.01 284.32)" as OklchString, // #0f1419
        onColorDark:  "oklch(0.91 0.003 225)" as OklchString, // #e7e9ea
      },
      {
        tokenSpecificName: "Light Gray Card",
        description: "Subtle gray surface for cards and elevated content",
        oklchLight: "oklch(0.97 0.003 225)" as OklchString, // #f7f8f8
        oklchDark:  "oklch(0.12 0.006 257.14)" as OklchString, // #17181c
        roles: ["card", "sidebar"],
        category: "shade",
        onColorLight: "oklch(0.12 0.01 284.32)" as OklchString,
        onColorDark:  "oklch(0.85 0.003 225)" as OklchString, // #d9d9d9
      },
      {
        tokenSpecificName: "Popover White",
        description: "Pure white for popovers and dropdowns",
        oklchLight: "oklch(1 0 0)" as OklchString,
        oklchDark:  "oklch(0.05 0 0)" as OklchString,
        roles: ["popover"],
        category: "shade",
        onColorLight: "oklch(0.12 0.01 284.32)" as OklchString,
        onColorDark:  "oklch(0.91 0.003 225)" as OklchString,
      },
      {
        tokenSpecificName: "Dark Text",
        description: "Primary text color with excellent contrast",
        oklchLight: "oklch(0.12 0.01 284.32)" as OklchString, // #0f1419
        oklchDark:  "oklch(0.91 0.003 225)" as OklchString, // #e7e9ea
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
        oklchLight: "oklch(1 0 0)" as OklchString,
        oklchDark:  "oklch(1 0 0)" as OklchString,
        roles: ["primary-foreground", "destructive-foreground", "sidebar-primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Inverted Text",
        description: "Text that inverts - dark on light, light on dark",
        oklchLight: "oklch(0.12 0.01 284.32)" as OklchString,
        oklchDark:  "oklch(0.12 0.01 284.32)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Gray Text",
        description: "Subdued text for less important content",
        oklchLight: "oklch(0.12 0.01 284.32)" as OklchString,
        oklchDark:  "oklch(0.47 0.005 257.14)" as OklchString, // #72767a
        roles: [],
        category: "shade",
      },

      /* Interactive Elements */
      {
        tokenSpecificName: "Twitter Blue",
        description: "Primary Twitter blue for main actions",
        oklchLight: "oklch(0.64 0.13 230.48)" as OklchString, // #1e9df1
        oklchDark:  "oklch(0.64 0.13 229.59)" as OklchString, // #1c9cf0
        roles: ["primary", "ring", "sidebar-primary", "accent-foreground", "sidebar-accent-foreground"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Secondary Dark",
        description: "Dark secondary surface",
        oklchLight: "oklch(0.12 0.01 284.32)" as OklchString, // #0f1419
        oklchDark:  "oklch(0.94 0.003 225)" as OklchString, // #f0f3f4
        roles: ["secondary"],
        category: "shade",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Muted Surface",
        description: "Muted background for less prominent content",
        oklchLight: "oklch(0.9 0.002 225)" as OklchString, // #e5e5e6
        oklchDark:  "oklch(0.11 0.003 225)" as OklchString, // #181818
        roles: ["muted"],
        category: "shade",
        onColorLight: "oklch(0.12 0.01 284.32)" as OklchString,
        onColorDark:  "oklch(0.47 0.005 257.14)" as OklchString,
      },
      {
        tokenSpecificName: "Light Blue Accent",
        description: "Subtle blue accent for highlights",
        oklchLight: "oklch(0.93 0.025 229.59)" as OklchString, // #e3ecf6
        oklchDark:  "oklch(0.1 0.025 229.59)" as OklchString, // #061622
        roles: ["accent", "sidebar-accent"],
        category: "color",
        onColorLight: "oklch(0.64 0.13 230.48)" as OklchString,
        onColorDark:  "oklch(0.64 0.13 229.59)" as OklchString,
      },
      {
        tokenSpecificName: "Border Gray",
        description: "Subtle borders for UI elements",
        oklchLight: "oklch(0.91 0.01 201.37)" as OklchString, // #e1eaef
        oklchDark:  "oklch(0.16 0.005 257.14)" as OklchString, // #242628
        roles: ["border"],
        category: "shade",
      },
      {
        tokenSpecificName: "Input Background",
        description: "Background for input fields",
        oklchLight: "oklch(0.98 0.005 201.37)" as OklchString, // #f7f9fa
        oklchDark:  "oklch(0.17 0.02 201.37)" as OklchString, // #22303c
        roles: ["input"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Border",
        description: "Borders specific to sidebar elements",
        oklchLight: "oklch(0.9 0.01 201.37)" as OklchString, // #e1e8ed
        oklchDark:  "oklch(0.25 0.01 201.37)" as OklchString, // #38444d
        roles: ["sidebar-border"],
        category: "shade",
      },

      /* System Status Colors */
      {
        tokenSpecificName: "Alert Red",
        description: "Destructive actions and error states",
        oklchLight: "oklch(0.55 0.22 27.33)" as OklchString, // #f4212e
        oklchDark:  "oklch(0.55 0.22 27.33)" as OklchString,
        roles: ["destructive"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },

      /* Chart Colors - Data Visualization Palette */
      {
        tokenSpecificName: "Chart Blue",
        description: "Primary chart color - Twitter blue",
        oklchLight: "oklch(0.64 0.13 230.48)" as OklchString, // #1e9df1
        oklchDark:  "oklch(0.64 0.13 230.48)" as OklchString,
        roles: ["chart-1"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Green",
        description: "Success green for positive metrics",
        oklchLight: "oklch(0.65 0.15 164.25)" as OklchString, // #00b87a
        oklchDark:  "oklch(0.65 0.15 164.25)" as OklchString,
        roles: ["chart-2"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Yellow",
        description: "Warning yellow for attention metrics",
        oklchLight: "oklch(0.78 0.15 85.87)" as OklchString, // #f7b928
        oklchDark:  "oklch(0.78 0.15 85.87)" as OklchString,
        roles: ["chart-3"],
        category: "color",
        onColorLight: "oklch(0.12 0.01 284.32)" as OklchString,
        onColorDark:  "oklch(0.12 0.01 284.32)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Bright Green",
        description: "Bright green for growth metrics",
        oklchLight: "oklch(0.68 0.17 145.77)" as OklchString, // #17bf63
        oklchDark:  "oklch(0.68 0.17 145.77)" as OklchString,
        roles: ["chart-4"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Pink",
        description: "Pink for engagement metrics",
        oklchLight: "oklch(0.55 0.22 348.32)" as OklchString, // #e0245e
        oklchDark:  "oklch(0.55 0.22 348.32)" as OklchString,
        roles: ["chart-5"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Twitter Blue", primaryForeground: "Pure White Text" },
      secondaryColors:     { secondary: "Secondary Dark", secondaryForeground: "Inverted Text" },
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
    4. BRAND EXPORT - Twitter/X Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const twitterXBrandColors = generateBrandColors("twitter-x", twitterXThemeDefinition.rawColors);

  export const twitterXTheme: Brand = {
    name: "Twitter/X",
    businessDetails: {
      name: "Twitter/X Theme",
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
    colors: twitterXBrandColors,
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
    style: twitterXThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "twitter-x",
      twitterXBrandColors,
      twitterXThemeDefinition.styleGuide,
      twitterXThemeDefinition.otherVars
    ),
    defaultMode: 'light' as const, // Twitter/X traditionally starts in light mode
    prefersDarkSchemeForChrome: false,
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Blue and neutral with accent colors
      brightness: 'adaptive',            // Works well in both light and dark
      saturation: 'medium',              // Vibrant blue but not overwhelming
      colorHarmony: 'complementary',     // Blue primary with complementary accents
      accentUsage: 'balanced',           // Good use of blue accents throughout
      cornerStyle: 'very-rounded',       // 1.3rem is quite rounded
      elevation: 'flat',                 // No shadows, flat design
    },
  }; 