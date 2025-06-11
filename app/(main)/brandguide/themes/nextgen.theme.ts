import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';



const nextgenThemeDefinition = {
  rawColors: [
    // Core Dark Palette (Edgy Tech)
    {
      tokenSpecificName: "Midnight Ash",
      description: "Deep, dark background, almost black.",
      oklchLight: "oklch(0.15 0.01 260)" as OklchString, // Dark mode default
      oklchDark: "oklch(0.15 0.01 260)" as OklchString,  // Stays dark
      roles: ["background"],
      category: 'shade',
      onColorLight: "oklch(0.97 0.005 90)" as OklchString, // Photon White
      onColorDark: "oklch(0.97 0.005 90)" as OklchString,  // Photon White
    },
    {
      tokenSpecificName: "Photon White",
      description: "Bright, clean white for high-contrast text and UI elements.",
      oklchLight: "oklch(0.97 0.005 90)" as OklchString,
      oklchDark: "oklch(0.97 0.005 90)" as OklchString,
      roles: [
        "foreground",
        "primary-foreground",
        "secondary-foreground",
        "accent-foreground",
        "destructive-foreground",
        "info-foreground",
        "warning-foreground",
        "card-foreground",
        "popover-foreground",
        "input-foreground",
        "success-foreground",
        "default"
      ],
      category: 'shade',
    },
    {
      tokenSpecificName: "Carbon Fiber",
      description: "Dark surface for cards, popovers; slightly lighter than background.",
      oklchLight: "oklch(0.20 0.015 255)" as OklchString,
      oklchDark: "oklch(0.20 0.015 255)" as OklchString,
      roles: ["card", "popover", "secondary", "tooltip-background"],
      category: 'shade',
      onColorLight: "oklch(0.97 0.005 90)" as OklchString, // Photon White
      onColorDark: "oklch(0.97 0.005 90)" as OklchString,  // Photon White
    },
    {
      tokenSpecificName: "Tungsten Gray",
      description: "Mid-dark gray for borders, inputs, and muted elements.",
      oklchLight: "oklch(0.35 0.01 250)" as OklchString,
      oklchDark: "oklch(0.35 0.01 250)" as OklchString,
      roles: ["border", "input", "muted"],
      category: 'shade',
      onColorLight: "oklch(0.97 0.005 90)" as OklchString, // Photon White
      onColorDark: "oklch(0.97 0.005 90)" as OklchString,
    },
    {
      tokenSpecificName: "Titanium Mist",
      description: "Light gray for muted text, providing better accessibility.",
      oklchLight: "oklch(0.70 0.008 255)" as OklchString,
      oklchDark: "oklch(0.70 0.008 255)" as OklchString,
      roles: ["muted-foreground"],
      category: 'shade',
    },

    // Primary (FF3600) & Accents
    {
      tokenSpecificName: "Inferno Orange",
      description: "Primary action color, #FF3600 retained for high-energy actions, also used for accents, success, and info states.",
      oklchLight: "oklch(0.6484 0.239166 33.0098)" as OklchString,
      oklchDark: "oklch(0.6484 0.239166 33.0098)" as OklchString,
      roles: ["primary", "ring",  "accent", "success", "info", "chart-1", "text-brand"],
      category: 'color',
      onColorLight: "oklch(0.97 0.005 90)" as OklchString, // Photon White
      onColorDark: "oklch(0.97 0.005 90)" as OklchString,  // Photon White
    },
    {
      tokenSpecificName: "Crimson Alert",
      description: "Intense red for destructive actions and warnings.",
      oklchLight: "oklch(0.55 0.25 15)" as OklchString,
      oklchDark: "oklch(0.50 0.26 15)" as OklchString,
      roles: ["destructive", "warning"],
      category: 'color',
      onColorLight: "oklch(0.97 0.005 90)" as OklchString, // Photon White
      onColorDark: "oklch(0.97 0.005 90)" as OklchString,
    },

    // Vibrant Chart Colors (Digital Edge)
    {
      tokenSpecificName: "Chart Electric Blue",
      oklchLight: "oklch(0.62 0.20 230)" as OklchString,
      oklchDark: "oklch(0.62 0.20 230)" as OklchString,
      roles: ["chart-2"],
      category: 'color',
      onColorLight: "oklch(0.15 0.01 260)" as OklchString,
      onColorDark: "oklch(0.15 0.01 260)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Neon Pink",
      oklchLight: "oklch(0.62 0.23 330)" as OklchString,
      oklchDark: "oklch(0.62 0.23 330)" as OklchString,
      roles: ["chart-3"],
      category: 'color',
      onColorLight: "oklch(0.15 0.01 260)" as OklchString,
      onColorDark: "oklch(0.15 0.01 260)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Plasma Teal",
      oklchLight: "oklch(0.68 0.21 190)" as OklchString,
      oklchDark: "oklch(0.68 0.21 190)" as OklchString,
      roles: ["chart-5"],
      category: 'color',
      onColorLight: "oklch(0.15 0.01 260)" as OklchString,
      onColorDark: "oklch(0.15 0.01 260)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Outline Gray",
      oklchLight: "oklch(0.45 0.01 250)" as OklchString,
      oklchDark: "oklch(0.40 0.01 250)" as OklchString,
      roles: ["chart-outline"],
      category: 'shade',
    },
    {
      tokenSpecificName: "Surface Muted Dark",
      description: "Muted surface, darker than card but lighter than background",
      oklchLight: "oklch(0.18 0.01 258)" as OklchString,
      oklchDark: "oklch(0.18 0.01 258)" as OklchString,
      roles: ["surface-muted"],
      category: 'shade',
      onColorLight: "oklch(0.97 0.005 90)" as OklchString,
      onColorDark: "oklch(0.97 0.005 90)" as OklchString,
    },
  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Inferno Orange", primaryForeground: "Photon White" },
    secondaryColors: { secondary: "Inferno Orange", secondaryForeground: "Photon White" },
    accentColors: { accent: "Inferno Orange", accentForeground: "Photon White" },
    cardColors: { card: "Carbon Fiber", cardForeground: "Photon White" },
    popoverColors: { popover: "Carbon Fiber", popoverForeground: "Photon White" },
    mutedColors: { muted: "Tungsten Gray", mutedForeground: "Titanium Mist" },
    destructiveColors: { destructive: "Crimson Alert", destructiveForeground: "Photon White" },
    successColors: { success: "Inferno Orange", successForeground: "Photon White" },
    infoColors: { info: "Inferno Orange", infoForeground: "Photon White" },
    warningColors: { warning: "Crimson Alert", warningForeground: "Photon White" },
    inputColors: { input: "Tungsten Gray", inputForeground: "Photon White" },
    borderColors: { border: "Tungsten Gray" },
    ringColors: { ring: "Inferno Orange" },
    radius: {
      radiusSm: "2px",
      radiusMd: "3px",
      radiusLg: "4px",
      radiusXl: "6px"
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem"
    },
  } as StyleGuide,

  otherVars: {
    background: "Midnight Ash",
    foreground: "Photon White",
    generalTextLightOnDark: "Photon White",
    generalTextDarkOnLight: "Midnight Ash",

    // Edgy, cool-toned sharp shadows
    shadowXs: "0px 1px 2px 0px hsla(260, 10%, 8%, 0.2)",
    shadowSm: "0px 2px 4px -1px hsla(260, 10%, 8%, 0.25), 0px 1px 2px -1px hsla(260, 10%, 8%, 0.2)",
    shadowMd: "0px 3px 6px -1px hsla(260, 10%, 8%, 0.3), 0px 2px 4px -2px hsla(260, 10%, 8%, 0.25)",
    shadowLg: "0px 5px 10px -2px hsla(260, 10%, 8%, 0.35), 0px 3px 6px -3px hsla(260, 10%, 8%, 0.3)",
    shadowXl: "0px 8px 16px -4px hsla(260, 10%, 8%, 0.4), 0px 4px 8px -4px hsla(260, 10%, 8%, 0.35)",

    borderWidthDefault: "1px",
    borderStyleDefault: "solid",

    chart1: "Inferno Orange",
    chart2: "Chart Electric Blue",
    chart3: "Chart Neon Pink",
    chart5: "Chart Plasma Teal",
    chartOutline: "Chart Outline Gray",
    radiusBase: "3px",
  }
};

const nextgenBrandColors = generateBrandColors("nextgen", nextgenThemeDefinition.rawColors);

export const nextgenBrand: Brand = {
  name: "Nextgen",
  businessDetails: {
    name: "Nextgen Systems",
    industry: "gaming_tech_innovation",
    personality: {
      vintageModern: 70,
      seasonedYouthful: 75,
      gracefulBold: 85,
      playfulElegant: 50,
      valueSmartLuxurious: 70,
      structuredNatural: 60,
      symbolicRealistic: 65,
    },
  },
  colors: nextgenBrandColors,
  fonts: [
    {
      name: "Inter",
      distributor: "Google Fonts",
      description: "Clean, technical sans-serif perfect for gaming tech interfaces.",
      family: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      roles: ["body", "default", "sans", "p", "a", "li", "button-label", "form-input", "serif-body", "serif", "h4", "h5", "h6"],
      weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Orbitron",
      distributor: "Google Fonts",
      description: "Futuristic, sci-fi display font perfect for next-gen gaming aesthetic.",
      family: "'Orbitron', 'Exo 2', sans-serif",
      roles: ["display", "h1", "h2", "h3", "hero-title", "nav-title"],
      weights: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Fira Code",
      distributor: "Google Fonts",
      description: "Developer-focused monospaced font with ligatures for code.",
      family: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
      roles: ["code", "mono"],
      weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
  ],
  style: nextgenThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "nextgen",
    nextgenBrandColors,
    nextgenThemeDefinition.styleGuide,
    nextgenThemeDefinition.otherVars
  ),
  prefersDarkSchemeForChrome: true, // Dark-first, edgy tech preference
};
