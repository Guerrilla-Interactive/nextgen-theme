/*───────────────────────────────────────────────────────────────────────*\
  Rose Purple Light Theme
  – Elegant pink and purple palette with sophisticated shadows
  – duotone · light-first · medium saturation · analogous harmony
\*───────────────────────────────────────────────────────────────────────*/

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /*───────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS - Rose Purple Light Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const rosePurpleLightThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Light Rose Background",
        description: "Soft rose-tinted background for light mode",
        oklch: "oklch(0.975 0.01 330)" as OklchString, // #faf5fa
        roles: ["background"],
        category: "shade",
        onColor: "oklch(0.35 0.08 320)" as OklchString, // #501854
      },
      {
        tokenSpecificName: "Rose Card Surface",
        description: "Subtle rose surface for cards and elevated content",
        oklch: "oklch(0.975 0.01 330)" as OklchString, // #faf5fa
        roles: ["card"],
        category: "shade",
        onColor: "oklch(0.35 0.08 320)" as OklchString, // #501854
      },
      {
        tokenSpecificName: "Pure White Popover",
        description: "Clean white for popovers and dropdowns",
        oklch: "oklch(1 0 0)" as OklchString, // #ffffff
        roles: ["popover"],
        category: "shade",
        onColor: "oklch(0.35 0.08 320)" as OklchString, // #501854
      },
      {
        tokenSpecificName: "Deep Purple Text",
        description: "Primary text color with excellent contrast",
        oklch: "oklch(0.35 0.08 320)" as OklchString, // #501854
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Pure White Text",
        description: "White text for dark surfaces",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: ["primary-foreground", "destructive-foreground"],
        category: "shade",
      },

      /* Interactive Elements */
      {
        tokenSpecificName: "Rose Primary",
        description: "Primary rose color for main actions",
        oklch: "oklch(0.62 0.12 340)" as OklchString, // #a84370
        roles: ["primary"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Light Pink Secondary",
        description: "Soft pink secondary surface",
        oklch: "oklch(0.88 0.05 330)" as OklchString, // #f1c4e6
        roles: ["secondary"],
        category: "color",
        onColor: "oklch(0.52 0.08 295)" as OklchString, // #77347c
      },
      {
        tokenSpecificName: "Purple Secondary Text",
        description: "Purple text for secondary elements",
        oklch: "oklch(0.52 0.08 295)" as OklchString, // #77347c
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Rose Surface",
        description: "Muted rose background for less prominent content",
        oklch: "oklch(0.94 0.02 330)" as OklchString, // #f6e5f3
        roles: ["muted"],
        category: "color",
        onColor: "oklch(0.56 0.06 295)" as OklchString, // #834588
      },
      {
        tokenSpecificName: "Muted Purple Text",
        description: "Muted purple text for less important content",
        oklch: "oklch(0.56 0.06 295)" as OklchString, // #834588
        roles: ["muted-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Pink Accent",
        description: "Light pink accent for highlights",
        oklch: "oklch(0.88 0.05 330)" as OklchString, // #f1c4e6
        roles: ["accent"],
        category: "color",
        onColor: "oklch(0.52 0.08 295)" as OklchString, // #77347c
      },
      {
        tokenSpecificName: "Accent Foreground Text",
        description: "Text for accent surfaces",
        oklch: "oklch(0.52 0.08 295)" as OklchString, // #77347c
        roles: ["accent-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Pink Rose Border",
        description: "Soft pink borders for UI elements",
        oklch: "oklch(0.86 0.05 325)" as OklchString, // #efbdeb
        roles: ["border"],
        category: "color",
      },
      {
        tokenSpecificName: "Input Rose Background",
        description: "Rose-tinted background for input fields",
        oklch: "oklch(0.83 0.05 325)" as OklchString, // #e7c1dc
        roles: ["input"],
        category: "color",
      },
      {
        tokenSpecificName: "Pink Ring Focus",
        description: "Bright pink for focus rings",
        oklch: "oklch(0.6 0.22 340)" as OklchString, // #db2777
        roles: ["ring"],
        category: "color",
      },

      /* Sidebar Elements */
      {
        tokenSpecificName: "Sidebar Rose Surface",
        description: "Light rose surface for sidebar",
        oklch: "oklch(0.955 0.02 330)" as OklchString, // #f3e4f6
        roles: ["sidebar"],
        category: "color",
        onColor: "oklch(0.6 0.12 350)" as OklchString, // #ac1668
      },
      {
        tokenSpecificName: "Sidebar Deep Pink Text",
        description: "Deep pink text for sidebar",
        oklch: "oklch(0.6 0.12 350)" as OklchString, // #ac1668
        roles: ["sidebar-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Primary Dark",
        description: "Dark primary color for sidebar elements",
        oklch: "oklch(0.3 0.02 260)" as OklchString, // #454554
        roles: ["sidebar-primary"],
        category: "color",
        onColor: "oklch(0.95 0.02 330)" as OklchString, // #faf1f7
      },
      {
        tokenSpecificName: "Sidebar Primary Foreground",
        description: "Text for sidebar primary elements",
        oklch: "oklch(0.95 0.02 330)" as OklchString, // #faf1f7
        roles: ["sidebar-primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Light Accent",
        description: "Light accent for sidebar highlights",
        oklch: "oklch(0.97 0.005 60)" as OklchString, // #f8f8f7
        roles: ["sidebar-accent"],
        category: "shade",
        onColor: "oklch(0.3 0.02 260)" as OklchString, // #454554
      },
      {
        tokenSpecificName: "Sidebar Accent Foreground",
        description: "Text for sidebar accent elements",
        oklch: "oklch(0.3 0.02 260)" as OklchString, // #454554
        roles: ["sidebar-accent-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Border",
        description: "Borders for sidebar elements",
        oklch: "oklch(0.92 0.005 60)" as OklchString, // #eceae9
        roles: ["sidebar-border"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Ring",
        description: "Focus ring for sidebar elements",
        oklch: "oklch(0.6 0.22 340)" as OklchString, // #db2777
        roles: ["sidebar-ring"],
        category: "color",
      },

      /* System Status Colors */
      {
        tokenSpecificName: "Destructive Red",
        description: "Red for destructive actions and error states",
        oklch: "oklch(0.55 0.15 25)" as OklchString, // #ab4347
        roles: ["destructive"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },

      /* Chart Colors - Data Visualization Palette */
      {
        tokenSpecificName: "Chart Magenta",
        description: "Bright magenta for primary chart data",
        oklch: "oklch(0.65 0.25 320)" as OklchString, // #d926a2
        roles: ["chart-1"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Purple",
        description: "Deep purple for secondary chart data",
        oklch: "oklch(0.5 0.25 285)" as OklchString, // #6c12b9
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Teal",
        description: "Dark teal for tertiary chart data",
        oklch: "oklch(0.35 0.05 200)" as OklchString, // #274754
        roles: ["chart-3"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Yellow",
        description: "Warm yellow for quaternary chart data",
        oklch: "oklch(0.8 0.12 80)" as OklchString, // #e8c468
        roles: ["chart-4"],
        category: "color",
        onColor: "oklch(0.2 0.05 80)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Orange",
        description: "Warm orange for quinary chart data",
        oklch: "oklch(0.75 0.15 50)" as OklchString, // #f4a462
        roles: ["chart-5"],
        category: "color",
        onColor: "oklch(0.2 0.05 50)" as OklchString,
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Rose Primary", primaryForeground: "Pure White Text" },
      secondaryColors:     { secondary: "Light Pink Secondary", secondaryForeground: "Purple Secondary Text" },
      accentColors:        { accent: "Pink Accent", accentForeground: "Accent Foreground Text" },
      cardColors:          { card: "Rose Card Surface", cardForeground: "Deep Purple Text" },
      popoverColors:       { popover: "Pure White Popover", popoverForeground: "Deep Purple Text" },
      mutedColors:         { muted: "Muted Rose Surface", mutedForeground: "Muted Purple Text" },
      destructiveColors:   { destructive: "Destructive Red", destructiveForeground: "Pure White Text" },
      inputColors:         { input: "Input Rose Background", inputForeground: "Deep Purple Text" },
      borderColors:        { border: "Pink Rose Border" },
      ringColors:          { ring: "Pink Ring Focus" },
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
      background: "Light Rose Background",
      foreground: "Deep Purple Text",
      radiusBase: "0.5rem",

      // Subtle shadows with proper opacity
      shadowXs: "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
      shadowSm: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
      shadowMd: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
      shadowLg: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
      shadowXl: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
      shadow2xl: "0 1px 3px 0px hsl(0 0% 0% / 0.25)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      // Sidebar-specific mappings
      sidebar: "Sidebar Rose Surface",
      sidebarForeground: "Sidebar Deep Pink Text",
      sidebarPrimary: "Sidebar Primary Dark",
      sidebarPrimaryForeground: "Sidebar Primary Foreground",
      sidebarAccent: "Sidebar Light Accent",
      sidebarAccentForeground: "Sidebar Accent Foreground",
      sidebarBorder: "Sidebar Border",
      sidebarRing: "Sidebar Ring",

      chart1: "Chart Magenta",
      chart2: "Chart Purple", 
      chart3: "Chart Teal",
      chart4: "Chart Yellow",
      chart5: "Chart Orange",
      chartOutline: "Pink Rose Border",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Rose Purple Light Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const rosePurpleLightBrandColors = generateBrandColors("rose-purple-light", rosePurpleLightThemeDefinition.rawColors);

  export const rosePurpleTheme: Brand = {
    name: "Rose Purple",
    rating: 85,
    businessDetails: {
      name: "Rose Purple Light Theme",
      industry: "creative",
      personality: {
        vintageModern: 65,      // Leans vintage with the soft pink tones
        seasonedYouthful: 45,   // More youthful and playful
        gracefulBold: 80,       // Very graceful and elegant
        playfulElegant: 85,     // Highly elegant
        valueSmartLuxurious: 70, // Luxurious feel with the rose tones
        structuredNatural: 60,  // Balanced structure
        symbolicRealistic: 55,  // Slightly symbolic
      },
    },
    colors: rosePurpleLightBrandColors,
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
    style: rosePurpleLightThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "rose-purple-light",
      rosePurpleLightBrandColors,
      rosePurpleLightThemeDefinition.styleGuide,
      rosePurpleLightThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Pink/purple with complementary colors
      brightness: 'light',               // Light theme
      saturation: 'medium',              // Beautiful saturated but not overwhelming
      colorHarmony: 'analogous',         // Pink and purple are analogous colors
      accentUsage: 'balanced',           // Good use of pink/purple accents throughout
      cornerStyle: 'slightly-rounded',   // 0.5rem is moderately rounded
      elevation: 'layered',              // Has proper shadows and depth
    },
  }; 