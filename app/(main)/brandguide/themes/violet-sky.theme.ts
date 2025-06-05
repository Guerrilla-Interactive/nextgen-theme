import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const violetSkyThemeDefinition = {
    rawColors: [
      // Lavender: used for page background
      {
        tokenSpecificName: "Lavender",
        description: "Page background",
        oklchLight: "oklch(0.97 0.01 316.68)" as OklchString,
        oklchDark:  "oklch(0.22 0.01 52.96)" as OklchString,
        roles:      ["background"],
        category:   "shade",
      },
  
      // Periwinkle: used for foreground, card-foreground, popover-foreground, sidebar-foreground, sidebar-accent-foreground
      {
        tokenSpecificName: "Periwinkle",
        description: "Text color for primary content and card/popover/sidebar text",
        oklchLight: "oklch(0.37 0.03 259.73)" as OklchString,
        oklchDark:  "oklch(0.93 0.03 273.66)" as OklchString,
        roles:      [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "sidebar-foreground",
          "sidebar-accent-foreground",
          "input-foreground",
        ],
        category:   "shade",
      },
  
      // White: used for card background, popover background, primary-foreground, sidebar-primary-foreground
      {
        tokenSpecificName: "White",
        description: "Background for cards, popovers, and text on primary/sidebar-primary",
        oklchLight: "oklch(1.00 0 0)" as OklchString,
        oklchDark:  "oklch(0.28 0.03 307.25)" as OklchString,
        roles:      [
          "card",
          "popover",
          "primary-foreground",
          "sidebar-primary-foreground",
        ],
        category:   "shade",
        onColorLight: "oklch(0.37 0.03 259.73)" as OklchString, // text on white in light mode
        onColorDark:  "oklch(0.93 0.03 273.66)" as OklchString, // text on dark card/popover
      },
  
      // Violet: used for primary, ring, chart-1, sidebar-primary
      {
        tokenSpecificName: "Violet",
        description: "Primary action and focus ring",
        oklchLight: "oklch(0.71 0.16 293.40)" as OklchString,
        oklchDark:  "oklch(0.79 0.12 295.97)" as OklchString,
        roles:      ["primary", "ring", "chart-1", "sidebar-primary"],
        category:   "color",
        onColorLight: "oklch(1.00 0 0)" as OklchString,         // text on violet
        onColorDark:  "oklch(0.22 0.01 52.96)" as OklchString,  // text on dark violet
      },
  
      // Indigo: used for secondary, sidebar, border, input
      {
        tokenSpecificName: "Indigo",
        description: "Secondary action, sidebar background, borders, and inputs",
        oklchLight: "oklch(0.91 0.05 306.07)" as OklchString,
        oklchDark:  "oklch(0.34 0.04 309.13)" as OklchString,
        roles:      ["secondary", "sidebar", "border", "input"],
        category:   "color",
        onColorLight: "oklch(0.45 0.03 257.68)" as OklchString, // text on indigo-light
        onColorDark:  "oklch(0.87 0.01 261.81)" as OklchString, // text on indigo-dark
      },
  
      // Dark Periwinkle: used for secondary-foreground
      {
        tokenSpecificName: "Dark Periwinkle",
        description: "Text on secondary",
        oklchLight: "oklch(0.45 0.03 257.68)" as OklchString,
        oklchDark:  "oklch(0.87 0.01 261.81)" as OklchString,
        roles:      ["secondary-foreground"],
        category:   "shade",
      },
  
      // Light Indigo: used for muted surfaces
      {
        tokenSpecificName: "Light Indigo",
        description: "Muted surfaces",
        oklchLight: "oklch(0.95 0.03 307.19)" as OklchString,
        oklchDark:  "oklch(0.28 0.03 307.25)" as OklchString,
        roles:      ["muted"],
        category:   "shade",
        onColorLight: "oklch(0.55 0.02 264.41)" as OklchString, // text on muted-light
        onColorDark:  "oklch(0.71 0.02 261.33)" as OklchString, // text on muted-dark
      },
  
      // Slate: used for muted-foreground
      {
        tokenSpecificName: "Slate",
        description: "Text on muted surfaces",
        oklchLight: "oklch(0.55 0.02 264.41)" as OklchString,
        oklchDark:  "oklch(0.71 0.02 261.33)" as OklchString,
        roles:      ["muted-foreground"],
        category:   "shade",
      },
  
      // Cerise: used for accent, sidebar-accent
      {
        tokenSpecificName: "Cerise",
        description: "Accent color and sidebar accent",
        oklchLight: "oklch(0.94 0.03 322.47)" as OklchString,
        oklchDark:  "oklch(0.39 0.05 304.68)" as OklchString,
        roles:      ["accent", "sidebar-accent"],
        category:   "color",
        onColorLight: "oklch(0.37 0.03 259.73)" as OklchString, // text on accent-light
        onColorDark:  "oklch(0.87 0.01 261.81)" as OklchString, // text on accent-dark
      },
  
      // Red: used for destructive and warning
      {
        tokenSpecificName: "Red",
        description: "Destructive actions and warnings",
        oklchLight: "oklch(0.81 0.10 19.47)" as OklchString,
        oklchDark:  "oklch(0.81 0.10 19.47)" as OklchString,
        roles:      ["destructive", "warning"],
        category:   "color",
        onColorLight: "oklch(1.00 0 0)" as OklchString,        // text on red
        onColorDark:  "oklch(1.00 0 0)" as OklchString,        // text on red
      },
  
      // Chart Indigo 2: used for chart-2
      {
        tokenSpecificName: "Chart Indigo 2",
        description: "Chart color 2",
        oklchLight: "oklch(0.61 0.22 292.63)" as OklchString,
        oklchDark:  "oklch(0.71 0.16 293.40)" as OklchString,
        roles:      ["chart-2"],
        category:   "color",
      },
  
      // Chart Blue: used for chart-3
      {
        tokenSpecificName: "Chart Blue",
        description: "Chart color 3",
        oklchLight: "oklch(0.54 0.25 293.03)" as OklchString,
        oklchDark:  "oklch(0.61 0.22 292.63)" as OklchString,
        roles:      ["chart-3"],
        category:   "color",
      },
  
      // Chart Deep Blue: used for chart-4
      {
        tokenSpecificName: "Chart Deep Blue",
        description: "Chart color 4",
        oklchLight: "oklch(0.49 0.24 292.70)" as OklchString,
        oklchDark:  "oklch(0.54 0.25 293.03)" as OklchString,
        roles:      ["chart-4"],
        category:   "color",
      },
  
      // Chart Navy: used for chart-5
      {
        tokenSpecificName: "Chart Navy",
        description: "Chart color 5",
        oklchLight: "oklch(0.43 0.21 292.63)" as OklchString,
        oklchDark:  "oklch(0.49 0.24 292.70)" as OklchString,
        roles:      ["chart-5"],
        category:   "color",
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors:       { primary: "Violet", primaryForeground: "White" },
      secondaryColors:     { secondary: "Indigo", secondaryForeground: "Dark Periwinkle" },
      accentColors:        { accent: "Cerise", accentForeground: "Periwinkle" },
      cardColors:          { card: "White", cardForeground: "Periwinkle" },
      popoverColors:       { popover: "White", popoverForeground: "Periwinkle" },
      mutedColors:         { muted: "Light Indigo", mutedForeground: "Slate" },
      destructiveColors:   { destructive: "Red", destructiveForeground: "White" },
      successColors:       { success: "Violet", successForeground: "White" },
      infoColors:          { info: "Cerise", infoForeground: "Periwinkle" },
      warningColors:       { warning: "Red", warningForeground: "White" },
      inputColors:         { input: "Indigo", inputForeground: "Periwinkle" },
      borderColors:        { border: "Indigo" },
      ringColors:          { ring: "Violet" },
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
      background: "Lavender",
      foreground: "Periwinkle",
      radiusBase: "1.5rem",
  
      // Shadows
      shadowXs:  "0px 8px 16px -4px oklch(0 0 0 / 0.04)",
      shadowSm:  "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 1px 2px -5px oklch(0 0 0 / 0.08)",
      shadowMd:  "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 2px 4px -5px oklch(0 0 0 / 0.08)",
      shadowLg:  "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 4px 6px -5px oklch(0 0 0 / 0.08)",
      shadowXl:  "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 8px 10px -5px oklch(0 0 0 / 0.08)",
      "shadow-2xs": "0px 8px 16px -4px oklch(0 0 0 / 0.04)",
      "shadow-2xl": "0px 8px 16px -4px oklch(0 0 0 / 0.20)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      // Chart tokens
      chart1: "Violet",
      chart2: "Chart Indigo 2",
      chart3: "Chart Blue",
      chart4: "Chart Deep Blue",
      chart5: "Chart Navy",
    },
  };
  
  const violetSkyBrandColors = generateBrandColors("violet-sky", violetSkyThemeDefinition.rawColors);
  
  export const violetSkyBrand: Brand = {
    name: "Violet Sky",
    businessDetails: {
      name: "Violet Sky Co",
      industry: "digital_design",
      personality: {
        vintageModern: 40,
        seasonedYouthful: 60,
        gracefulBold: 70,
        playfulElegant: 50,
        valueSmartLuxurious: 65,
        structuredNatural: 55,
        symbolicRealistic: 45,
      },
    },
    colors: violetSkyBrandColors,
    fonts: [
      {
        name: "Open Sans",
        distributor: "Google Fonts",
        description: "Primary sans-serif font.",
        family: "'Open Sans', sans-serif",
        roles: ["body", "default", "sans"],
        weights: { regular: 400, medium: 600, bold: 700 },
      },
      {
        name: "Source Serif 4",
        distributor: "Google Fonts",
        description: "Primary serif font.",
        family: "'Source Serif 4', serif",
        roles: ["serif"],
        weights: { regular: 400, bold: 700 },
      },
      {
        name: "IBM Plex Mono",
        distributor: "IBM Plex",
        description: "Primary monospaced font.",
        family: "'IBM Plex Mono', monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, bold: 700 },
      },
    ],
    style: violetSkyThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "violet-sky",
      violetSkyBrandColors,
      violetSkyThemeDefinition.styleGuide,
      violetSkyThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: false,
  };
  