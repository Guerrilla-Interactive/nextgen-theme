import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';
import { glowingBorderAnimationPreset } from '../animation-presets';

const nextgenLightThemeDefinition = {
  rawColors: [
    // Core Light Palette (Clean Tech)
    {
      tokenSpecificName: "Pure White",
      description: "Clean, bright white background for professional appearance.",
      oklch: "oklch(1.00 0 0)" as OklchString,
      roles: ["background"],
      category: 'shade',
      onColor: "oklch(0.15 0.01 260)" as OklchString,  // Tech Charcoal
    },
    {
      tokenSpecificName: "Tech Charcoal",
      description: "Dark charcoal for high-contrast text and UI elements on light backgrounds.",
      oklch: "oklch(0.15 0.01 260)" as OklchString,
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
      tokenSpecificName: "Light Panel",
      description: "Light surface for cards, popovers; slightly darker than background.",
      oklch: "oklch(0.98 0.005 260)" as OklchString,
      roles: ["card", "popover", "secondary", "tooltip-background"],
      category: 'shade',
      onColor: "oklch(0.15 0.01 260)" as OklchString,  // Tech Charcoal
    },
    {
      tokenSpecificName: "Silver Border",
      description: "Mid-light gray for borders, inputs, and muted elements.",
      oklch: "oklch(0.90 0.005 250)" as OklchString,
      roles: ["border", "input", "muted"],
      category: 'shade',
      onColor: "oklch(0.15 0.01 260)" as OklchString,
    },
    {
      tokenSpecificName: "Graphite Text",
      description: "Medium gray for muted text, providing good accessibility.",
      oklch: "oklch(0.55 0.008 260)" as OklchString,
      roles: ["muted-foreground"],
      category: 'shade',
    },

    // Primary (FF3600) & Accents - maintaining signature orange
    {
      tokenSpecificName: "Inferno Orange",
      description: "Primary action color, #FF3600 signature color for high-energy actions, also used for accents, success, and info states.",
      oklch: "oklch(0.6484 0.239166 33.0098)" as OklchString,
      roles: ["primary", "ring",  "accent", "success", "info", "chart-1", "text-brand"],
      category: 'color',
      onColor: "oklch(1.00 0 0)" as OklchString,  // Pure White
    },
    {
      tokenSpecificName: "Crimson Warning",
      description: "Professional red for destructive actions and warnings in light mode.",
      oklch: "oklch(0.55 0.25 15)" as OklchString,
      roles: ["destructive", "warning"],
      category: 'color',
      onColor: "oklch(1.00 0 0)" as OklchString,
    },

    // Vibrant Chart Colors (Professional Tech)
    {
      tokenSpecificName: "Chart Professional Blue",
      oklch: "oklch(0.58 0.18 230)" as OklchString,
      roles: ["chart-2"],
      category: 'color',
      onColor: "oklch(1.00 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Tech Pink",
      oklch: "oklch(0.58 0.20 330)" as OklchString,
      roles: ["chart-3"],
      category: 'color',
      onColor: "oklch(1.00 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Corporate Teal",
      oklch: "oklch(0.64 0.18 190)" as OklchString,
      roles: ["chart-5"],
      category: 'color',
      onColor: "oklch(1.00 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Border Gray",
      oklch: "oklch(0.65 0.005 250)" as OklchString,
      roles: ["chart-outline"],
      category: 'shade',
    },

  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Inferno Orange", primaryForeground: "Pure White" },
    secondaryColors: { secondary: "Inferno Orange", secondaryForeground: "Pure White" },
    accentColors: { accent: "Inferno Orange", accentForeground: "Pure White" },
    cardColors: { card: "Light Panel", cardForeground: "Tech Charcoal" },
    popoverColors: { popover: "Light Panel", popoverForeground: "Tech Charcoal" },
    mutedColors: { muted: "Silver Border", mutedForeground: "Graphite Text" },
    destructiveColors: { destructive: "Crimson Warning", destructiveForeground: "Pure White" },
    successColors: { success: "Inferno Orange", successForeground: "Pure White" },
    inputColors: { input: "Silver Border", inputForeground: "Tech Charcoal" },
    borderColors: { border: "Silver Border" },
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
    background: "Pure White",
    foreground: "Tech Charcoal",
    generalTextLightOnDark: "Pure White",
    generalTextDarkOnLight: "Tech Charcoal",

    // Sidebar mappings - using existing colors
    sidebar: "Light Panel",
    sidebarForeground: "Tech Charcoal",
    sidebarPrimary: "Inferno Orange",
    sidebarPrimaryForeground: "Pure White",
    sidebarAccent: "Inferno Orange",
    sidebarAccentForeground: "Pure White",
    sidebarBorder: "Silver Border",
    sidebarRing: "Inferno Orange",

    // Professional, clean shadows for light mode
    shadowXs: "0px 1px 2px 0px hsla(260, 10%, 20%, 0.08)",
    shadowSm: "0px 2px 4px -1px hsla(260, 10%, 20%, 0.12), 0px 1px 2px -1px hsla(260, 10%, 20%, 0.08)",
    shadowMd: "0px 3px 6px -1px hsla(260, 10%, 20%, 0.15), 0px 2px 4px -2px hsla(260, 10%, 20%, 0.12)",
    shadowLg: "0px 5px 10px -2px hsla(260, 10%, 20%, 0.18), 0px 3px 6px -3px hsla(260, 10%, 20%, 0.15)",
    shadowXl: "0px 8px 16px -4px hsla(260, 10%, 20%, 0.22), 0px 4px 8px -4px hsla(260, 10%, 20%, 0.18)",

    borderWidthDefault: "1px",
    borderStyleDefault: "solid",

    chart1: "Inferno Orange",
    chart2: "Chart Professional Blue",
    chart3: "Chart Tech Pink",
    chart5: "Chart Corporate Teal",
    chartOutline: "Chart Border Gray",
    radiusBase: "3px",
  }
};

const nextgenLightBrandColors = generateBrandColors("nextgen-light", nextgenLightThemeDefinition.rawColors);

export const nextgenLightBrand: Brand = {
  name: "Nextgen Light",
  businessDetails: {
    name: "Nextgen Light Systems",
    industry: "technology_innovation",
    personality: {
      vintageModern: 80,        // More modern with clean aesthetic
      seasonedYouthful: 65,     // Professional but innovative
      gracefulBold: 75,         // Bold but more refined than dark version
      playfulElegant: 60,       // Balanced playfulness and elegance
      valueSmartLuxurious: 80,  // High-tech luxury feel
      structuredNatural: 70,    // Structured corporate approach
      symbolicRealistic: 60,    // Strong symbolic representation
    },
  },
  colors: nextgenLightBrandColors,
  fonts: [
    {
      name: "Inter",
      distributor: "Google Fonts",
      description: "Clean, technical sans-serif perfect for professional tech interfaces.",
      family: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      roles: ["body", "default", "sans", "p", "a", "li", "button-label", "form-input", "serif-body", "serif", "h4", "h5", "h6"],
      weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Orbitron",
      distributor: "Google Fonts",
      description: "Futuristic, tech-forward display font perfect for innovative corporate aesthetic.",
      family: "'Orbitron', 'Exo 2', sans-serif",
      roles: ["display", "h1", "h2", "h3", "hero-title", "nav-title"],
      weights: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Fira Code",
      distributor: "Google Fonts",
      description: "Developer-focused monospaced font with ligatures for code and data.",
      family: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
      roles: ["code", "mono"],
      weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
  ],
  style: nextgenLightThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "nextgen-light",
    nextgenLightBrandColors,
    nextgenLightThemeDefinition.styleGuide,
    nextgenLightThemeDefinition.otherVars
  ),
  sevenAxisCode: {
    colorComplexity: 'duotone',           // Duotone - orange primary with supporting colors
    brightness: 'light',                 // Light - pure white background
    saturation: 'neon',                   // Neon - bright, high-saturation orange and vibrant chart colors
    colorHarmony: 'complementary',        // Complementary - orange with contrasting blues/teals
    accentUsage: 'prominent',             // Prominent - strong orange accent usage
    cornerStyle: 'sharp',                 // Sharp - minimal radius (3px base)
    elevation: 'layered',                 // Layered - professional shadows for depth
  },
  animationConfig: {
    preset: glowingBorderAnimationPreset,
    rootClassName: 'nextgen-light-theme'
  }
};

export default nextgenLightBrand; 