/*───────────────────────────────────────────────────────────────────────*\
  Rose Purple Theme
  – Elegant pink and purple palette with sophisticated shadows
  – duotone · adaptive · medium saturation · analogous harmony
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
    1. RAW COLOUR TOKENS - Rose Purple Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const rosePurpleThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Light Rose Background",
        description: "Soft rose-tinted background for light mode",
        oklchLight: "oklch(0.975 0.01 330)" as OklchString, // #faf5fa
        oklchDark:  "oklch(0.15 0.02 285)" as OklchString, // #221d27
        roles: ["background"],
        category: "shade",
        onColorLight: "oklch(0.35 0.08 320)" as OklchString, // #501854
        onColorDark:  "oklch(0.84 0.03 310)" as OklchString, // #d2c4de
      },
      {
        tokenSpecificName: "Rose Card Surface",
        description: "Subtle rose surface for cards and elevated content",
        oklchLight: "oklch(0.975 0.01 330)" as OklchString, // #faf5fa
        oklchDark:  "oklch(0.18 0.02 285)" as OklchString, // #2c2632
        roles: ["card"],
        category: "shade",
        onColorLight: "oklch(0.35 0.08 320)" as OklchString, // #501854
        onColorDark:  "oklch(0.86 0.03 320)" as OklchString, // #dbc5d2
      },
      {
        tokenSpecificName: "Pure White Popover",
        description: "Clean white for popovers and dropdowns",
        oklchLight: "oklch(1 0 0)" as OklchString, // #ffffff
        oklchDark:  "oklch(0.12 0.02 315)" as OklchString, // #1f141b
        roles: ["popover"],
        category: "shade",
        onColorLight: "oklch(0.35 0.08 320)" as OklchString, // #501854
        onColorDark:  "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
      },
      {
        tokenSpecificName: "Deep Purple Text",
        description: "Primary text color with excellent contrast",
        oklchLight: "oklch(0.35 0.08 320)" as OklchString, // #501854
        oklchDark:  "oklch(0.84 0.03 310)" as OklchString, // #d2c4de
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
        oklchLight: "oklch(1 0 0)" as OklchString,
        oklchDark:  "oklch(1 0 0)" as OklchString,
        roles: ["primary-foreground", "destructive-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Light Pink Text on Popover",
        description: "Light pink text for dark popover surfaces",
        oklchLight: "oklch(0.35 0.08 320)" as OklchString,
        oklchDark:  "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
        roles: [],
        category: "shade",
      },
      {
        tokenSpecificName: "Primary Rose Foreground",
        description: "Soft rose text for primary surfaces",
        oklchLight: "oklch(1 0 0)" as OklchString,
        oklchDark:  "oklch(0.925 0.025 325)" as OklchString, // #efc0d8
        roles: [],
        category: "shade",
      },

      /* Interactive Elements */
      {
        tokenSpecificName: "Rose Primary",
        description: "Primary rose color for main actions",
        oklchLight: "oklch(0.62 0.12 340)" as OklchString, // #a84370
        oklchDark:  "oklch(0.55 0.15 350)" as OklchString, // #a3004c
        roles: ["primary"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(0.925 0.025 325)" as OklchString,
      },
      {
        tokenSpecificName: "Light Pink Secondary",
        description: "Soft pink secondary surface",
        oklchLight: "oklch(0.88 0.05 330)" as OklchString, // #f1c4e6
        oklchDark:  "oklch(0.25 0.03 285)" as OklchString, // #362d3d
        roles: ["secondary"],
        category: "color",
        onColorLight: "oklch(0.52 0.08 295)" as OklchString, // #77347c
        onColorDark:  "oklch(0.85 0.03 310)" as OklchString, // #d4c7e1
      },
      {
        tokenSpecificName: "Purple Secondary Text",
        description: "Purple text for secondary elements",
        oklchLight: "oklch(0.52 0.08 295)" as OklchString, // #77347c
        oklchDark:  "oklch(0.85 0.03 310)" as OklchString, // #d4c7e1
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Rose Surface",
        description: "Muted rose background for less prominent content",
        oklchLight: "oklch(0.94 0.02 330)" as OklchString, // #f6e5f3
        oklchDark:  "oklch(0.16 0.02 285)" as OklchString, // #28222d
        roles: ["muted"],
        category: "color",
        onColorLight: "oklch(0.56 0.06 295)" as OklchString, // #834588
        onColorDark:  "oklch(0.78 0.03 310)" as OklchString, // #c2b6cf
      },
      {
        tokenSpecificName: "Muted Purple Text",
        description: "Muted purple text for less important content",
        oklchLight: "oklch(0.56 0.06 295)" as OklchString, // #834588
        oklchDark:  "oklch(0.78 0.03 310)" as OklchString, // #c2b6cf
        roles: ["muted-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Pink Accent",
        description: "Light pink accent for highlights",
        oklchLight: "oklch(0.88 0.05 330)" as OklchString, // #f1c4e6
        oklchDark:  "oklch(0.3 0.04 285)" as OklchString, // #463753
        roles: ["accent"],
        category: "color",
        onColorLight: "oklch(0.52 0.08 295)" as OklchString, // #77347c
        onColorDark:  "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
      },
      {
        tokenSpecificName: "Accent Foreground Text",
        description: "Text for accent surfaces",
        oklchLight: "oklch(0.52 0.08 295)" as OklchString, // #77347c
        oklchDark:  "oklch(0.97 0.01 330)" as OklchString, // #f8f1f5
        roles: ["accent-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Pink Rose Border",
        description: "Soft pink borders for UI elements",
        oklchLight: "oklch(0.86 0.05 325)" as OklchString, // #efbdeb
        oklchDark:  "oklch(0.22 0.03 285)" as OklchString, // #3b3237
        roles: ["border"],
        category: "color",
      },
      {
        tokenSpecificName: "Input Rose Background",
        description: "Rose-tinted background for input fields",
        oklchLight: "oklch(0.83 0.05 325)" as OklchString, // #e7c1dc
        oklchDark:  "oklch(0.24 0.03 285)" as OklchString, // #3e343c
        roles: ["input"],
        category: "color",
      },
      {
        tokenSpecificName: "Pink Ring Focus",
        description: "Bright pink for focus rings",
        oklchLight: "oklch(0.6 0.22 340)" as OklchString, // #db2777
        oklchDark:  "oklch(0.6 0.22 340)" as OklchString, // #db2777
        roles: ["ring"],
        category: "color",
      },

      /* Sidebar Elements */
      {
        tokenSpecificName: "Sidebar Rose Surface",
        description: "Light rose surface for sidebar",
        oklchLight: "oklch(0.955 0.02 330)" as OklchString, // #f3e4f6
        oklchDark:  "oklch(0.115 0.02 315)" as OklchString, // #1e151d
        roles: ["sidebar"],
        category: "color",
        onColorLight: "oklch(0.6 0.12 350)" as OklchString, // #ac1668
        onColorDark:  "oklch(0.88 0.03 325)" as OklchString, // #e0cad6
      },
      {
        tokenSpecificName: "Sidebar Deep Pink Text",
        description: "Deep pink text for sidebar",
        oklchLight: "oklch(0.6 0.12 350)" as OklchString, // #ac1668
        oklchDark:  "oklch(0.88 0.03 325)" as OklchString, // #e0cad6
        roles: ["sidebar-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Primary Dark",
        description: "Dark primary color for sidebar elements",
        oklchLight: "oklch(0.3 0.02 260)" as OklchString, // #454554
        oklchDark:  "oklch(0.55 0.18 250)" as OklchString, // #1d4ed8
        roles: ["sidebar-primary"],
        category: "color",
        onColorLight: "oklch(0.95 0.02 330)" as OklchString, // #faf1f7
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Sidebar Primary Foreground",
        description: "Text for sidebar primary elements",
        oklchLight: "oklch(0.95 0.02 330)" as OklchString, // #faf1f7
        oklchDark:  "oklch(1 0 0)" as OklchString, // #ffffff
        roles: ["sidebar-primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Light Accent",
        description: "Light accent for sidebar highlights",
        oklchLight: "oklch(0.97 0.005 60)" as OklchString, // #f8f8f7
        oklchDark:  "oklch(0.14 0.02 315)" as OklchString, // #261922
        roles: ["sidebar-accent"],
        category: "shade",
        onColorLight: "oklch(0.3 0.02 260)" as OklchString, // #454554
        onColorDark:  "oklch(0.96 0.005 60)" as OklchString, // #f4f4f5
      },
      {
        tokenSpecificName: "Sidebar Accent Foreground",
        description: "Text for sidebar accent elements",
        oklchLight: "oklch(0.3 0.02 260)" as OklchString, // #454554
        oklchDark:  "oklch(0.96 0.005 60)" as OklchString, // #f4f4f5
        roles: ["sidebar-accent-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Border",
        description: "Borders for sidebar elements",
        oklchLight: "oklch(0.92 0.005 60)" as OklchString, // #eceae9
        oklchDark:  "oklch(0.05 0 0)" as OklchString, // #000000
        roles: ["sidebar-border"],
        category: "shade",
      },
      {
        tokenSpecificName: "Sidebar Ring",
        description: "Focus ring for sidebar elements",
        oklchLight: "oklch(0.6 0.22 340)" as OklchString, // #db2777
        oklchDark:  "oklch(0.6 0.22 340)" as OklchString, // #db2777
        roles: ["sidebar-ring"],
        category: "color",
      },

      /* System Status Colors */
      {
        tokenSpecificName: "Destructive Red",
        description: "Red for destructive actions and error states",
        oklchLight: "oklch(0.55 0.15 25)" as OklchString, // #ab4347
        oklchDark:  "oklch(0.15 0.05 25)" as OklchString, // #301015
        roles: ["destructive"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },

      /* Chart Colors - Data Visualization Palette */
      {
        tokenSpecificName: "Chart Magenta",
        description: "Bright magenta for primary chart data",
        oklchLight: "oklch(0.65 0.25 320)" as OklchString, // #d926a2
        oklchDark:  "oklch(0.62 0.12 340)" as OklchString, // #a84370
        roles: ["chart-1"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Purple",
        description: "Deep purple for secondary chart data",
        oklchLight: "oklch(0.5 0.25 285)" as OklchString, // #6c12b9
        oklchDark:  "oklch(0.62 0.2 285)" as OklchString, // #934dcb
        roles: ["chart-2"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Teal",
        description: "Dark teal for tertiary chart data",
        oklchLight: "oklch(0.35 0.05 200)" as OklchString, // #274754
        oklchDark:  "oklch(0.7 0.12 60)" as OklchString, // #e88c30
        roles: ["chart-3"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(0.15 0.05 60)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Yellow",
        description: "Warm yellow for quaternary chart data",
        oklchLight: "oklch(0.8 0.12 80)" as OklchString, // #e8c468
        oklchDark:  "oklch(0.7 0.22 285)" as OklchString, // #af57db
        roles: ["chart-4"],
        category: "color",
        onColorLight: "oklch(0.2 0.05 80)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Orange",
        description: "Warm orange for quinary chart data",
        oklchLight: "oklch(0.75 0.15 50)" as OklchString, // #f4a462
        oklchDark:  "oklch(0.65 0.22 350)" as OklchString, // #e23670
        roles: ["chart-5"],
        category: "color",
        onColorLight: "oklch(0.2 0.05 50)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
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
    4. BRAND EXPORT - Rose Purple Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const rosePurpleBrandColors = generateBrandColors("rose-purple", rosePurpleThemeDefinition.rawColors);

  export const rosePurpleTheme: Brand = {
    name: "Rose Purple",
    businessDetails: {
      name: "Rose Purple Theme",
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
    colors: rosePurpleBrandColors,
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
    style: rosePurpleThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "rose-purple",
      rosePurpleBrandColors,
      rosePurpleThemeDefinition.styleGuide,
      rosePurpleThemeDefinition.otherVars
    ),
    defaultMode: 'light' as const, // Rose themes traditionally start in light mode to show off the soft colors
    prefersDarkSchemeForChrome: false,
    sevenAxisCode: {
      colorComplexity: 'duotone',        // Pink/purple with complementary colors
      brightness: 'adaptive',            // Works well in both light and dark
      saturation: 'medium',              // Beautiful saturated but not overwhelming
      colorHarmony: 'analogous',         // Pink and purple are analogous colors
      accentUsage: 'balanced',           // Good use of pink/purple accents throughout
      cornerStyle: 'slightly-rounded',   // 0.5rem is moderately rounded
      elevation: 'layered',              // Has proper shadows and depth
    },
  }; 