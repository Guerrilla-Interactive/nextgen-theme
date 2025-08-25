import { generateBrandColors, createThemeCssVars } from '../brand-utils';
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from './theme-types';
import { glowingBorderAnimationPreset } from '../animation-presets';

const nextgenLightThemeDefinition = {
  rawColors: [
    // Core Light Palette (Clean Tech)
    {
      tokenSpecificName: "Pure White",
      description: "Clean, bright white background for professional appearance.",
      oklch: "oklch(1.00 0 0)" as OklchString,
      roles: [
        "background",
        "sidebar-primary-foreground",
        "sidebar-accent-foreground"
      ],
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
        "card-foreground",
        "popover-foreground",
        "input-foreground",
        "sidebar-foreground"
      ],
      category: 'shade',
    },
    {
      tokenSpecificName: "Light Panel",
      description: "Light surface for cards, popovers; slightly darker than background.",
      oklch: "oklch(0.98 0.005 260)" as OklchString,
      roles: ["card", "popover", "secondary", "tooltip-background", "sidebar"],
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
      roles: ["primary", "ring",  "accent", "success", "info", "chart-1", "text-brand", "sidebar-primary", "sidebar-accent"],
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
      tokenSpecificName: "Chart Corporate Purple",
      oklch: "oklch(0.60 0.20 300)" as OklchString,
      roles: ["chart-4"],
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
  ] as RawColorDefinition[],

  styleGuide: {
    rootColors: { background: "Pure White", foreground: "Tech Charcoal" },
    primaryColors: { primary: "Inferno Orange", primaryForeground: "Pure White" },
    secondaryColors: { secondary: "Inferno Orange", secondaryForeground: "Pure White" },
    accentColors: { accent: "Inferno Orange", accentForeground: "Pure White" },
    cardColors: { card: "Light Panel", cardForeground: "Tech Charcoal" },
    popoverColors: { popover: "Light Panel", popoverForeground: "Tech Charcoal" },
    mutedColors: { muted: "Silver Border", mutedForeground: "Graphite Text" },
    destructiveColors: { destructive: "Crimson Warning", destructiveForeground: "Pure White" },
    successColors: { success: "Inferno Orange", successForeground: "Pure White" },
    infoColors: { info: "Inferno Orange", infoForeground: "Pure White" },
    warningColors: { warning: "Crimson Warning", warningForeground: "Pure White" },
    inputColors: { input: "Silver Border", inputForeground: "Tech Charcoal" },
    borderColors: { border: "Silver Border" },
    ringColors: { ring: "Inferno Orange" },
    sidebarColors: {
      sidebar: "Light Panel",
      sidebarForeground: "Tech Charcoal",
      sidebarPrimary: "Inferno Orange",
      sidebarPrimaryForeground: "Pure White",
      sidebarAccent: "Inferno Orange",
      sidebarAccentForeground: "Pure White",
      sidebarBorder: "Silver Border",
      sidebarRing: "Inferno Orange",
    },
    chartColors: {
      chart1: "Inferno Orange",
      chart2: "Chart Professional Blue",
      chart3: "Chart Tech Pink",
      chart4: "Chart Corporate Purple",
      chart5: "Chart Corporate Teal",
    },
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
    generalTextLightOnDark: "Pure White",
    generalTextDarkOnLight: "Tech Charcoal",

    // Professional, clean shadows for light mode
    shadowXs: "0px 1px 2px 0px hsla(260, 10%, 20%, 0.08)",
    shadowSm: "0px 2px 4px -1px hsla(260, 10%, 20%, 0.12), 0px 1px 2px -1px hsla(260, 10%, 20%, 0.08)",
    shadowMd: "0px 3px 6px -1px hsla(260, 10%, 20%, 0.15), 0px 2px 4px -2px hsla(260, 10%, 20%, 0.12)",
    shadowLg: "0px 5px 10px -2px hsla(260, 10%, 20%, 0.18), 0px 3px 6px -3px hsla(260, 10%, 20%, 0.15)",
    shadowXl: "0px 8px 16px -4px hsla(260, 10%, 20%, 0.22), 0px 4px 8px -4px hsla(260, 10%, 20%, 0.18)",
    "shadow-2xs": "0px 1px 1px 0px hsla(260, 10%, 20%, 0.06)",
    "shadow-2xl": "0px 12px 24px -6px hsla(260, 10%, 20%, 0.28), 0px 6px 12px -6px hsla(260, 10%, 20%, 0.22)",

    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
    radiusBase: "3px",
  }
};

const nextgenLightBrandColors = generateBrandColors("nextgen-light", nextgenLightThemeDefinition.rawColors);

export const nextgenLightBrand: Brand = {
  name: "Nextgen Light",
  rating: 99,
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