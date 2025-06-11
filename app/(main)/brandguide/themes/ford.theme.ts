import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const fordThemeDefinition = {
    rawColors: [
      // Core Ford Palette - Refined for Elegance & Brand Authenticity
      {
        tokenSpecificName: "Ford Midnight Blue",
        description: "A deep, near-black blue, darker than the official Ford Blue, for a premium, elegant background.",
        oklchLight: "oklch(0.15 0.03 255)" as OklchString, // Darker and less saturated
        oklchDark:  "oklch(0.15 0.03 255)" as OklchString,
        roles:      ["background", "card", "popover", "nav", "tooltip-background", "secondary-foreground"],
        category:   "shade",
        onColorLight: "oklch(0.99 0.005 260)" as OklchString,
        onColorDark:  "oklch(0.99 0.005 260)" as OklchString,
      },
      {
        tokenSpecificName: "Ford Off-White",
        description: "A very light, slightly warm off-white for main text, reducing harshness for a more elegant feel.",
        oklchLight: "oklch(0.99 0.005 260)" as OklchString,
        oklchDark:  "oklch(0.99 0.005 260)" as OklchString,
        roles:      ["foreground", "primary-foreground", "accent-foreground", "destructive-foreground", "success-foreground", "info-foreground", "warning-foreground", "card-foreground", "popover-foreground", "muted-foreground"],
        category:   "shade",
      },
      {
        tokenSpecificName: "Ford Brand Blue", // Official Ford Blue
        description: "The official, iconic Ford Blue for primary actions and core branding moments.",
        oklchLight: "oklch(0.31 0.15 265)" as OklchString, // Hex: #00095B
        oklchDark:  "oklch(0.35 0.14 265)" as OklchString,
        roles:      ["primary", "ring", "chart-1", "text-brand"],
        category:   "color",
        onColorLight: "oklch(0.99 0.005 260)" as OklchString,
        onColorDark:  "oklch(0.99 0.005 260)" as OklchString,
      },
      {
        tokenSpecificName: "Ford Metallic Silver",
        description: "A refined metallic silver for borders, inputs, and muted surfaces.",
        oklchLight: "oklch(0.82 0.005 255)" as OklchString, // Lighter, more like a subtle chrome
        oklchDark:  "oklch(0.75 0.005 255)" as OklchString,
        roles:      ["secondary", "border", "input", "muted", "chart-4", "surface-muted", "chart-outline", "default"],
        category:   "shade",
        onColorLight: "oklch(0.15 0.03 255)" as OklchString, // Dark blue text
        onColorDark:  "oklch(0.15 0.03 255)" as OklchString,
      },
      {
        tokenSpecificName: "Ford Performance Red", // Official Performance Red
        description: "Vibrant red for destructive actions, warnings, and performance highlights.",
        oklchLight: "oklch(0.6 0.25 25)" as OklchString, // Hex: #D50032
        oklchDark:  "oklch(0.62 0.24 25)" as OklchString,
        roles:      ["destructive", "warning", "chart-2"],
        category:   "color",
        onColorLight: "oklch(0.99 0.005 260)" as OklchString,
        onColorDark:  "oklch(0.99 0.005 260)" as OklchString,
      },
      {
        tokenSpecificName: "Ford Eco Green",
        description: "A friendly green for success states, slightly desaturated for a more mature feel.",
        oklchLight: "oklch(0.62 0.17 150)" as OklchString,
        oklchDark:  "oklch(0.67 0.16 150)" as OklchString,
        roles:      ["success", "chart-3"],
        category:   "color",
        onColorLight: "oklch(0.15 0.03 255)" as OklchString,
        onColorDark:  "oklch(0.99 0.005 260)" as OklchString,
      },
      {
        tokenSpecificName: "Ford Skyview Blue", // Official Skyview
        description: "A brighter, modern blue for informational accents, inspired by the Mustang Cup guidelines.",
        oklchLight: "oklch(0.65 0.2 240)" as OklchString, // Hex: #066FEF
        oklchDark:  "oklch(0.68 0.19 240)" as OklchString,
        roles:      ["accent", "info", "chart-5"],
        category:   "color",
        onColorLight: "oklch(0.99 0.005 260)" as OklchString,
        onColorDark:  "oklch(0.15 0.03 255)" as OklchString,
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors:       { primary: "Ford Brand Blue", primaryForeground: "Ford Off-White" },
      secondaryColors:     { secondary: "Ford Metallic Silver", secondaryForeground: "Ford Midnight Blue" },
      accentColors:        { accent: "Ford Skyview Blue", accentForeground: "Ford Off-White" },
      cardColors:          { card: "Ford Midnight Blue", cardForeground: "Ford Off-White" },
      popoverColors:       { popover: "Ford Midnight Blue", popoverForeground: "Ford Off-White" },
      mutedColors:         { muted: "Ford Metallic Silver", mutedForeground: "Ford Off-White" },
      destructiveColors:   { destructive: "Ford Performance Red", destructiveForeground: "Ford Off-White" },
      successColors:       { success: "Ford Eco Green", successForeground: "Ford Midnight Blue" },
      infoColors:          { info: "Ford Skyview Blue", infoForeground: "Ford Off-White" },
      warningColors:       { warning: "Ford Performance Red", warningForeground: "Ford Off-White" },
      inputColors:         { input: "Ford Metallic Silver", inputForeground: "Ford Midnight Blue" },
      borderColors:        { border: "Ford Metallic Silver" },
      ringColors:          { ring: "Ford Skyview Blue" },
      radius: {
        radiusSm: "4px",
        radiusMd: "6px",
        radiusLg: "8px",
        radiusXl: "12px",
      },
      spacing: {
        spacingSm: "0.5rem",
        spacingMd: "1rem",
        spacingLg: "1.75rem",
        spacingXl: "2.5rem",
      },
    } as StyleGuide,
  
    otherVars: {
      background: "Ford Midnight Blue",
      foreground: "Ford Off-White",
      radiusBase: "6px",
  
      shadowXs:  "0px 1px 2px hsla(255, 40%, 4%, 0.5)",
      shadowSm:  "0px 2px 4px hsla(255, 40%, 4%, 0.6)",
      shadowMd:  "0px 4px 8px hsla(255, 40%, 4%, 0.7)",
      shadowLg:  "0px 6px 12px hsla(255, 40%, 4%, 0.7)",
      shadowXl:  "0px 8px 16px hsla(255, 40%, 4%, 0.8)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      chart1: "Ford Brand Blue",
      chart2: "Ford Performance Red",
      chart3: "Ford Eco Green",
      chart4: "Ford Metallic Silver",
      chart5: "Ford Skyview Blue",
    },
  };
  
  const fordBrandColors = generateBrandColors("ford", fordThemeDefinition.rawColors);
  
  export const fordBrand: Brand = {
    name: "Ford",
    businessDetails: {
      name: "Ford Motor Company",
      industry: "automotive",
      personality: {
        vintageModern: 60,
        seasonedYouthful: 40,
        gracefulBold: 80, // Increased bold
        playfulElegant: 40, // Increased elegant
        valueSmartLuxurious: 60, // Leaning more luxurious
        structuredNatural: 80,
        symbolicRealistic: 90,
      },
    },
    colors: fordBrandColors,
    fonts: [
      {
        name: "Inter",
        distributor: "Google Fonts",
        description: "A highly legible and versatile sans-serif for body text and general UI, providing a clean and modern feel.",
        family: "'Inter', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "button-label", "form-input", "h4", "h5", "h6", "serif"], // Consolidating serif into Inter for a cleaner look
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Orbitron",
        distributor: "Google Fonts",
        description: "A geometric, futuristic display font that evokes a sense of technology and engineering, fitting for a modern car brand.",
        family: "'Orbitron', 'Inter', sans-serif",
        roles: ["display", "h1", "h2", "h3", "hero-title"],
        weights: { medium: 500, semibold: 600, bold: 700, black: 900 },
      },
      {
        name: "Roboto Mono",
        distributor: "Google Fonts",
        description: "Clean and technical monospaced font for code and data representation.",
        family: "'Roboto Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, bold: 700 },
      },
    ],
    style: fordThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "ford",
      fordBrandColors,
      fordThemeDefinition.styleGuide,
      fordThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: true,
  }; 