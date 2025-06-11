import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const summerThemeDefinition = {
    rawColors: [
      // Ivory: page background
      {
        tokenSpecificName: "Ivory",
        description: "Main page background",
        oklchLight: "oklch(0.98 0.01 81.76)" as OklchString,
        oklchDark:  "oklch(0.26 0.02 63.41)" as OklchString,
        roles:      ["background"],
        category:   "shade",
      },
  
      // Olive: primary text color, card & popover text, sidebar text, secondary text, muted-foreground, sidebar-accent-foreground
      {
        tokenSpecificName: "Olive",
        description: "Text for foreground, cards, popovers, sidebars, and secondary/muted contexts",
        oklchLight: "oklch(0.38 0.02 64.16)" as OklchString,
        oklchDark:  "oklch(0.87 0.08 65.83)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "sidebar-foreground",
          "secondary-foreground",
          "muted-foreground",
          "sidebar-accent-foreground",
          "input-foreground",
        ],
        category: "shade",
      },
  
      // Cream: card & sidebar background
      {
        tokenSpecificName: "Cream",
        description: "Card and sidebar background",
        oklchLight: "oklch(0.97 0.02 72.57)" as OklchString,
        oklchDark:  "oklch(0.31 0.03 60.03)" as OklchString,
        roles:      ["card", "sidebar"],
        category:   "shade",
        onColorLight: "oklch(0.38 0.02 64.16)" as OklchString, // text on cream light
        onColorDark:  "oklch(0.87 0.08 65.83)" as OklchString, // text on cream dark
      },
  
      // Pale Yellow: popover background
      {
        tokenSpecificName: "Pale Yellow",
        description: "Popover background",
        oklchLight: "oklch(0.96 0.04 83.12)" as OklchString,
        oklchDark:  "oklch(0.36 0.03 54.43)" as OklchString,
        roles:      ["popover"],
        category:   "shade",
        onColorLight: "oklch(0.38 0.02 64.16)" as OklchString, // text on pale yellow light
        onColorDark:  "oklch(0.87 0.08 65.83)" as OklchString, // text on pale yellow dark
      },
  
      // Orange: primary actions, focus ring, chart-1, sidebar-primary
      {
        tokenSpecificName: "Orange",
        description: "Primary action, focus ring, and chart color 1",
        oklchLight: "oklch(0.70 0.17 28.12)" as OklchString,
        oklchDark:  "oklch(0.70 0.17 28.12)" as OklchString,
        roles:      ["primary", "ring", "chart-1", "sidebarPrimary"],
        category:   "color",
        onColorLight: "oklch(1.00 0 0)" as OklchString,       // text on orange
        onColorDark:  "oklch(1.00 0 0)" as OklchString,       // text on orange
      },
  
      // White: primary-foreground, accent-foreground, sidebar-primary-foreground, destructive-foreground, secondary-foreground, chart-related foregrounds
      {
        tokenSpecificName: "White",
        description: "Text on primary, accent, sidebar-primary, destructive, and secondary",
        oklchLight: "oklch(1.00 0 0)" as OklchString,
        oklchDark:  "oklch(1.00 0 0)" as OklchString,
        roles:      [
          "primary-foreground",
          "accent-foreground",
          "sidebar-primary-foreground",
          "destructive-foreground",
          "secondary-foreground",
        ],
        category:   "shade",
      },
  
      // Lime: secondary actions, chart-2, sidebar-accent, border
      {
        tokenSpecificName: "Lime",
        description: "Secondary action, chart color 2, sidebar accent, and border",
        oklchLight: "oklch(0.81 0.15 71.81)" as OklchString,
        oklchDark:  "oklch(0.81 0.15 71.81)" as OklchString,
        roles:      ["secondary", "chart-2", "sidebarAccent", "border"],
        category:   "color",
        onColorLight: "oklch(0.38 0.02 64.16)" as OklchString,  // text on lime
        onColorDark:  "oklch(0.26 0.02 63.41)" as OklchString,  // text on lime dark
      },
  
      // Mint: muted surfaces
      {
        tokenSpecificName: "Mint",
        description: "Muted surfaces",
        oklchLight: "oklch(0.94 0.03 61.12)" as OklchString,
        oklchDark:  "oklch(0.56 0.05 59.94)" as OklchString,
        roles:      ["muted"],
        category:   "shade",
        onColorLight: "oklch(0.62 0.06 59.24)" as OklchString, // text on mint light
        onColorDark:  "oklch(0.79 0.06 71.87)" as OklchString, // text on mint dark
      },
  
      // Coral: accent color
      {
        tokenSpecificName: "Coral",
        description: "Accent color",
        oklchLight: "oklch(0.64 0.22 28.93)" as OklchString,
        oklchDark:  "oklch(0.61 0.21 27.04)" as OklchString,
        roles:      ["accent", "chart-5"],
        category:   "color",
        onColorLight: "oklch(1.00 0 0)" as OklchString,       // text on coral light
        onColorDark:  "oklch(1.00 0 0)" as OklchString,       // text on coral dark
      },
  
      // Gold: chart color 3
      {
        tokenSpecificName: "Gold",
        description: "Chart color 3",
        oklchLight: "oklch(0.71 0.18 37.63)" as OklchString,
        oklchDark:  "oklch(0.71 0.18 37.63)" as OklchString,
        roles:      ["chart-3"],
        category:   "color",
      },
  
      // Lime Light: chart color 4
      {
        tokenSpecificName: "Lime Light",
        description: "Chart color 4",
        oklchLight: "oklch(0.89 0.15 91.66)" as OklchString,
        oklchDark:  "oklch(0.89 0.15 91.66)" as OklchString,
        roles:      ["chart-4"],
        category:   "color",
      },
  
      // Burnt Orange: chart color 5
      {
        tokenSpecificName: "Burnt Orange",
        description: "Chart color 5",
        oklchLight: "oklch(0.59 0.19 36.05)" as OklchString,
        oklchDark:  "oklch(0.59 0.19 36.05)" as OklchString,
        roles:      ["chart-5"],
        category:   "color",
      },
  
      // Rust: destructive color
      {
        tokenSpecificName: "Rust",
        description: "Destructive and warning color",
        oklchLight: "oklch(0.57 0.20 26.34)" as OklchString,
        oklchDark:  "oklch(0.50 0.19 27.43)" as OklchString,
        roles:      ["destructive", "warning"],
        category:   "color",
        onColorLight: "oklch(1.00 0 0)" as OklchString,       // text on rust light
        onColorDark:  "oklch(1.00 0 0)" as OklchString,       // text on rust dark
      },
  
      // Light Mint: input background
      {
        tokenSpecificName: "Light Mint",
        description: "Input field background",
        oklchLight: "oklch(0.96 0.03 78.77)" as OklchString,
        oklchDark:  "oklch(0.40 0.04 60.31)" as OklchString,
        roles:      ["input"],
        category:   "shade",
        onColorLight: "oklch(0.38 0.02 64.16)" as OklchString, // text on light mint
        onColorDark:  "oklch(0.87 0.08 65.83)" as OklchString, // text on light mint dark
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors:       { primary: "Orange", primaryForeground: "White" },
      secondaryColors:     { secondary: "Lime", secondaryForeground: "Olive" },
      accentColors:        { accent: "Coral", accentForeground: "White" },
      cardColors:          { card: "Cream", cardForeground: "Olive" },
      popoverColors:       { popover: "Pale Yellow", popoverForeground: "Olive" },
      mutedColors:         { muted: "Mint", mutedForeground: "Olive" },
      destructiveColors:   { destructive: "Rust", destructiveForeground: "White" },
      successColors:       { success: "Orange", successForeground: "White" },
      infoColors:          { info: "Coral", infoForeground: "White" },
      warningColors:       { warning: "Rust", warningForeground: "White" },
      inputColors:         { input: "Light Mint", inputForeground: "Olive" },
      borderColors:        { border: "Lime" },
      ringColors:          { ring: "Orange" },
      radius: {
        radiusSm: "calc(var(--radius) - 4px)",
        radiusMd: "calc(var(--radius) - 2px)",
        radiusLg: "var(--radius)",
        radiusXl: "calc(var(--radius) + 4px)",
      },
      spacing: {
        spacingSm: "0.5rem",
        spacingMd: "1rem",
        spacingLg: "1.5rem",
        spacingXl: "2rem",
      },
    } as StyleGuide,
  
    otherVars: {
      background: "Ivory",
      foreground: "Olive",
      radiusBase: "0.6rem",
  
      // Shadows
      shadowXs:  "0px 1px 3px 0px oklch(0.70 0.17 28.12 / 30% / 0.03)",
      shadowSm:  "0px 1px 3px 0px oklch(0.70 0.17 28.12 / 30% / 0.05), 0px 1px 2px -1px oklch(0.70 0.17 28.12 / 30% / 0.05)",
      shadowMd:  "0px 1px 3px 0px oklch(0.70 0.17 28.12 / 30% / 0.05), 0px 2px 4px -1px oklch(0.70 0.17 28.12 / 30% / 0.05)",
      shadowLg:  "0px 1px 3px 0px oklch(0.70 0.17 28.12 / 30% / 0.05), 0px 4px 6px -1px oklch(0.70 0.17 28.12 / 30% / 0.05)",
      shadowXl:  "0px 1px 3px 0px oklch(0.70 0.17 28.12 / 30% / 0.05), 0px 8px 10px -1px oklch(0.70 0.17 28.12 / 30% / 0.05)",
      shadow2Xl: "0px 1px 3px 0px oklch(0.70 0.17 28.12 / 30% / 0.13)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      // Chart tokens
      chart1: "Orange",
      chart2: "Lime",
      chart3: "Gold",
      chart4: "Lime Light",
      chart5: "Burnt Orange",
  
      // Sidebar tokens
      sidebarBackground:        "Cream",
      sidebarForeground:        "Olive",
      sidebarPrimary:           "Orange",
      sidebarPrimaryForeground: "White",
      sidebarAccent:            "Lime",
      sidebarAccentForeground:  "Olive",
      sidebarBorder:            "Lime",
      sidebarRing:              "Orange",
  
      // Fonts
      fontSans:  "Nunito, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      fontSerif: "Lora, ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
      fontMono:  "Fira Code, ui-monospace, SFMono-Regular",
    },
  };
  
  const summerBrandColors = generateBrandColors("summer", summerThemeDefinition.rawColors);
  
  export const summerBrand: Brand = {
    name: "Summer",
    businessDetails: {
      name: "Summer Co",
      industry: "digital_design",
      personality: {
        vintageModern: 45,
        seasonedYouthful: 55,
        gracefulBold: 65,
        playfulElegant: 60,
        valueSmartLuxurious: 50,
        structuredNatural: 50,
        symbolicRealistic: 40,
      },
    },
    colors: summerBrandColors,
    fonts: [
      {
        name: "Quicksand",
        distributor: "Google Fonts",
        description: "Warm, friendly sans-serif perfect for sunny, cheerful design.",
        family: "'Quicksand', 'Nunito', system-ui, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "serif"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Comfortaa",
        distributor: "Google Fonts",
        description: "Playful, rounded display font that embodies summer joy and warmth.",
        family: "'Comfortaa', 'Quicksand', cursive, sans-serif",
        roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title"],
        weights: { light: 300, regular: 400, bold: 700 },
      },
      {
        name: "Source Code Pro",
        distributor: "Google Fonts",
        description: "Clean, readable monospaced font for technical content.",
        family: "'Source Code Pro', 'Fira Code', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: summerThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "summer",
      summerBrandColors,
      summerThemeDefinition.styleGuide,
      summerThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: false,
  };
  