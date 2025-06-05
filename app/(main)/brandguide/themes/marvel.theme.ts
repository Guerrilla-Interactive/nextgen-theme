import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const marvelThemeDefinition = {
    rawColors: [
      // Beige: page background
      {
        tokenSpecificName: "Beige",
        description: "Main page background",
        oklchLight: "oklch(0.98 0.01 25.23)" as OklchString,
        oklchDark:  "oklch(0.12 0.01 38.49)" as OklchString,
        roles:      ["background"],
        category:   "shade",
      },
  
      // Charcoal: main text, sidebar text, sidebar accent text
      {
        tokenSpecificName: "Charcoal",
        description: "Text for foreground, sidebar, and sidebar-accent",
        oklchLight: "oklch(0.20 0.01 18.05)" as OklchString,
        oklchDark:  "oklch(0.95 0.01 25.23)" as OklchString,
        roles:      ["foreground", "sidebar-foreground", "sidebar-accent-foreground", "input-foreground"],
        category:   "shade",
      },
  
      // Pale Beige: card background
      {
        tokenSpecificName: "Pale Beige",
        description: "Card background",
        oklchLight: "oklch(0.95 0.01 25.23)" as OklchString,
        oklchDark:  "oklch(0.18 0.01 29.18)" as OklchString,
        roles:      ["card"],
        category:   "shade",
        onColorLight: "oklch(0.18 0.01 29.18)" as OklchString, // text on card light
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on card dark
      },
  
      // Taupe: card & accent foreground
      {
        tokenSpecificName: "Taupe",
        description: "Text on card and accent",
        oklchLight: "oklch(0.18 0.01 29.18)" as OklchString,
        oklchDark:  "oklch(0.95 0.01 25.23)" as OklchString,
        roles:      ["card-foreground", "accent-foreground"],
        category:   "shade",
      },
  
      // Off White: popover background
      {
        tokenSpecificName: "Off White",
        description: "Popover background",
        oklchLight: "oklch(0.94 0.01 25.23)" as OklchString,
        oklchDark:  "oklch(0.18 0.01 29.18)" as OklchString,
        roles:      ["popover"],
        category:   "shade",
        onColorLight: "oklch(0.22 0.01 29.09)" as OklchString, // text on popover light
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on popover dark
      },
  
      // Warm Taupe: popover text
      {
        tokenSpecificName: "Warm Taupe",
        description: "Text on popover",
        oklchLight: "oklch(0.22 0.01 29.09)" as OklchString,
        oklchDark:  "oklch(0.95 0.01 25.23)" as OklchString,
        roles:      ["popover-foreground"],
        category:   "shade",
      },
  
      // Orange: primary action
      {
        tokenSpecificName: "Orange",
        description: "Primary action color",
        oklchLight: "oklch(0.55 0.22 27.03)" as OklchString,
        oklchDark:  "oklch(0.65 0.23 27.09)" as OklchString,
        roles:      ["primary"],
        category:   "color",
        onColorLight: "oklch(0.98 0.01 100.72)" as OklchString, // text on primary light
        onColorDark:  "oklch(0.98 0.01 100.72)" as OklchString, // text on primary dark
      },
  
      // White: for primary/secondary/success/sidebar-primary foregrounds
      {
        tokenSpecificName: "White",
        description: "Text on primary, secondary, success, and sidebar-primary",
        oklchLight: "oklch(0.98 0.01 100.72)" as OklchString,
        oklchDark:  "oklch(0.98 0.01 100.72)" as OklchString,
        roles:      ["primary-foreground", "secondary-foreground", "success-foreground", "sidebar-primary-foreground"],
        category:   "shade",
      },
  
      // Indigo: secondary, sidebar-primary, sidebar-ring
      {
        tokenSpecificName: "Indigo",
        description: "Secondary action and sidebar-primary/ring color",
        oklchLight: "oklch(0.52 0.14 247.51)" as OklchString,
        oklchDark:  "oklch(0.50 0.14 249.16)" as OklchString,
        roles:      ["secondary", "sidebar-primary", "sidebar-ring"],
        category:   "color",
        onColorLight: "oklch(0.98 0.01 100.72)" as OklchString, // text on secondary light
        onColorDark:  "oklch(0.98 0.01 100.72)" as OklchString, // text on secondary dark
      },
  
      // Light Gray: muted surfaces
      {
        tokenSpecificName: "Light Gray",
        description: "Muted surfaces",
        oklchLight: "oklch(0.91 0.01 25.23)" as OklchString,
        oklchDark:  "oklch(0.20 0.01 18.05)" as OklchString,
        roles:      ["muted"],
        category:   "shade",
        onColorLight: "oklch(0.38 0.01 17.71)" as OklchString, // text on muted light
        onColorDark:  "oklch(0.70 0.01 25.22)" as OklchString, // text on muted dark
      },
  
      // Gray: muted text
      {
        tokenSpecificName: "Gray",
        description: "Text on muted surfaces",
        oklchLight: "oklch(0.38 0.01 17.71)" as OklchString,
        oklchDark:  "oklch(0.70 0.01 25.22)" as OklchString,
        roles:      ["muted-foreground"],
        category:   "shade",
      },
  
      // Apricot: accent/info and sidebar-accent
      {
        tokenSpecificName: "Apricot",
        description: "Accent and sidebar-accent color",
        oklchLight: "oklch(0.86 0.04 33.45)" as OklchString,
        oklchDark:  "oklch(0.59 0.12 78.19)" as OklchString,
        roles:      ["accent", "info", "sidebar-accent"],
        category:   "color",
        onColorLight: "oklch(0.18 0.01 29.18)" as OklchString, // text on accent light
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on accent dark
      },
  
      // Rust: destructive/warning
      {
        tokenSpecificName: "Rust",
        description: "Destructive and warning color",
        oklchLight: "oklch(0.56 0.23 29.23)" as OklchString,
        oklchDark:  "oklch(0.56 0.23 29.23)" as OklchString,
        roles:      ["destructive", "warning"],
        category:   "color",
        onColorLight: "oklch(0.95 0.01 25.23)" as OklchString, // text on destructive
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on destructive
      },
  
      // Light Beige: destructive foreground (uniform)
      {
        tokenSpecificName: "Light Beige",
        description: "Text on destructive",
        oklchLight: "oklch(0.95 0.01 25.23)" as OklchString,
        oklchDark:  "oklch(0.95 0.01 25.23)" as OklchString,
        roles:      ["destructive-foreground"],
        category:   "shade",
      },
  
      // Silver: border
      {
        tokenSpecificName: "Silver",
        description: "Border color",
        oklchLight: "oklch(0.84 0.01 25.22)" as OklchString,
        oklchDark:  "oklch(0.38 0.01 17.71)" as OklchString,
        roles:      ["border"],
        category:   "shade",
      },
  
      // Cream: input background
      {
        tokenSpecificName: "Cream",
        description: "Input background",
        oklchLight: "oklch(0.80 0.01 25.22)" as OklchString,
        oklchDark:  "oklch(0.38 0.01 17.71)" as OklchString,
        roles:      ["input"],
        category:   "shade",
        onColorLight: "oklch(0.95 0.01 25.23)" as OklchString, // text on input light
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on input dark
      },
  
      // Deep Indigo: focus ring/success
      {
        tokenSpecificName: "Deep Indigo",
        description: "Focus ring and success color",
        oklchLight: "oklch(0.50 0.12 244.86)" as OklchString,
        oklchDark:  "oklch(0.49 0.14 250.75)" as OklchString,
        roles:      ["ring", "success"],
        category:   "color",
        onColorLight: "oklch(0.98 0.01 100.72)" as OklchString, // text on success
        onColorDark:  "oklch(0.98 0.01 100.72)" as OklchString, // text on success
      },
  
      // Chart Orange: chart-1
      {
        tokenSpecificName: "Chart Orange",
        description: "Chart color 1",
        oklchLight: "oklch(0.58 0.23 27.06)" as OklchString,
        oklchDark:  "oklch(0.64 0.25 26.85)" as OklchString,
        roles:      ["chart-1"],
        category:   "color",
      },
  
      // Chart Indigo: chart-2
      {
        tokenSpecificName: "Chart Indigo",
        description: "Chart color 2",
        oklchLight: "oklch(0.61 0.18 251.95)" as OklchString,
        oklchDark:  "oklch(0.66 0.19 250.17)" as OklchString,
        roles:      ["chart-2"],
        category:   "color",
      },
  
      // Chart Green: chart-3
      {
        tokenSpecificName: "Chart Green",
        description: "Chart color 3",
        oklchLight: "oklch(0.72 0.15 83.50)" as OklchString,
        oklchDark:  "oklch(0.78 0.16 87.01)" as OklchString,
        roles:      ["chart-3"],
        category:   "color",
      },
  
      // Chart Teal: chart-4
      {
        tokenSpecificName: "Chart Teal",
        description: "Chart color 4",
        oklchLight: "oklch(0.67 0.15 144.89)" as OklchString,
        oklchDark:  "oklch(0.68 0.15 144.94)" as OklchString,
        roles:      ["chart-4"],
        category:   "color",
      },
  
      // Chart Magenta: chart-5
      {
        tokenSpecificName: "Chart Magenta",
        description: "Chart color 5",
        oklchLight: "oklch(0.75 0.15 304.74)" as OklchString,
        oklchDark:  "oklch(0.75 0.15 304.74)" as OklchString,
        roles:      ["chart-5"],
        category:   "color",
      },
  
      // Ivory: sidebar background
      {
        tokenSpecificName: "Ivory",
        description: "Sidebar background",
        oklchLight: "oklch(0.97 0 0)" as OklchString,
        oklchDark:  "oklch(0.14 0.01 33.25)" as OklchString,
        roles:      ["nav"],
        category:   "shade",
        onColorLight: "oklch(0.20 0.01 18.05)" as OklchString, // text on sidebar light
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on sidebar dark
      },
  
      // Sage: sidebar accent
      {
        tokenSpecificName: "Sage",
        description: "Sidebar accent color",
        oklchLight: "oklch(0.69 0.14 79.70)" as OklchString,
        oklchDark:  "oklch(0.59 0.12 78.19)" as OklchString,
        roles:      ["sidebar-accent"],
        category:   "color",
        onColorLight: "oklch(0.20 0.01 18.05)" as OklchString, // text on sidebar accent light
        onColorDark:  "oklch(0.95 0.01 25.23)" as OklchString, // text on sidebar accent dark
      },
  
      // Light Silver: sidebar border
      {
        tokenSpecificName: "Light Silver",
        description: "Sidebar border color",
        oklchLight: "oklch(0.87 0.01 25.23)" as OklchString,
        oklchDark:  "oklch(0.32 0.01 27.45 / 30%)" as OklchString,
        roles:      ["sidebar-border"],
        category:   "shade",
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors:       { primary: "Orange", primaryForeground: "White" },
      secondaryColors:     { secondary: "Indigo", secondaryForeground: "White" },
      accentColors:        { accent: "Apricot", accentForeground: "Taupe" },
      cardColors:          { card: "Pale Beige", cardForeground: "Taupe" },
      popoverColors:       { popover: "Off White", popoverForeground: "Warm Taupe" },
      mutedColors:         { muted: "Light Gray", mutedForeground: "Gray" },
      destructiveColors:   { destructive: "Rust", destructiveForeground: "Light Beige" },
      successColors:       { success: "Deep Indigo", successForeground: "White" },
      infoColors:          { info: "Apricot", infoForeground: "Taupe" },
      warningColors:       { warning: "Rust", warningForeground: "Light Beige" },
      inputColors:         { input: "Cream", inputForeground: "Charcoal" },
      borderColors:        { border: "Silver" },
      ringColors:          { ring: "Deep Indigo" },
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
      background: "Beige",
      foreground: "Charcoal",
      radiusBase: "0rem",
  
      // Shadows (unchanged)
      shadowXs:  "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.01)",
      shadowSm:  "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.01), 0px 1px 2px -1px oklch(0 0 0 / 1% / 0.01)",
      shadowMd:  "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.01), 0px 2px 4px -1px oklch(0 0 0 / 1% / 0.01)",
      shadowLg:  "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.01), 0px 4px 6px -1px oklch(0 0 0 / 1% / 0.01)",
      shadowXl:  "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.01), 0px 8px 10px -1px oklch(0 0 0 / 1% / 0.01)",
      "shadow-2xs": "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.01)",
      "shadow-2xl": "0px 1px 3px 0px oklch(0 0 0 / 1% / 0.03)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      // Chart tokens
      chart1: "Chart Orange",
      chart2: "Chart Indigo",
      chart3: "Chart Green",
      chart4: "Chart Teal",
      chart5: "Chart Magenta",
  
      // Sidebar tokens
      sidebarBackground:        "Ivory",
      sidebarForeground:        "Charcoal",
      sidebarPrimary:           "Indigo",
      sidebarPrimaryForeground: "White",
      sidebarAccent:            "Apricot",
      sidebarAccentForeground:  "Charcoal",
      sidebarBorder:            "Light Silver",
      sidebarRing:              "Indigo",
  
      // Fonts
      fontSans:  "Outfit, sans-serif",
      fontSerif: "Merriweather, serif",
      fontMono:  "Geist Mono, monospace",
    },
  };
  
  const marvelBrandColors = generateBrandColors("marvel", marvelThemeDefinition.rawColors);
  
  export const marvelBrand: Brand = {
    name: "Marvel",
    businessDetails: {
      name: "Marvel Systems",
      industry: "digital_art_design",
      personality: {
        vintageModern: 30,
        seasonedYouthful: 50,
        gracefulBold: 80,
        playfulElegant: 40,
        valueSmartLuxurious: 60,
        structuredNatural: 70,
        symbolicRealistic: 55,
      },
    },
    colors: marvelBrandColors,
    fonts: [
      {
        name: "Outfit",
        distributor: "Google Fonts",
        description: "Primary sans-serif font.",
        family: "Outfit, sans-serif",
        roles: ["body", "default", "sans"],
        weights: { regular: 400, medium: 500, bold: 700 },
      },
      {
        name: "Merriweather",
        distributor: "Google Fonts",
        description: "Primary serif font.",
        family: "Merriweather, serif",
        roles: ["serif"],
        weights: { regular: 400, bold: 700 },
      },
      {
        name: "Geist Mono",
        distributor: "Foundry",
        description: "Primary monospaced font.",
        family: "Geist Mono, monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, bold: 700 },
      },
    ],
    style: marvelThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "marvel",
      marvelBrandColors,
      marvelThemeDefinition.styleGuide,
      marvelThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: true,
  };
  