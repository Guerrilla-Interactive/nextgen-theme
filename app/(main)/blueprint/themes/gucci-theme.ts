import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
import { glowingBorderAnimationPreset } from "../animation-presets";

// Gucci-inspired light luxury theme
const gucciThemeDefinition = {
  rawColors: [
    // Foundations (light, warm, luxurious)
    {
      tokenSpecificName: "Porcelain Cream",
      description: "Soft, warm off‑white used as primary background.",
      oklch: "oklch(0.97 0.01 95)" as OklchString,
      roles: ["background", "card", "popover"],
      category: "shade",
      onColor: "oklch(0.18 0.03 275)" as OklchString, // Deep Ink
    },
    {
      tokenSpecificName: "Deep Ink",
      description: "Rich near‑black for text on light surfaces.",
      oklch: "oklch(0.18 0.03 275)" as OklchString,
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
      category: "shade",
    },
    {
      tokenSpecificName: "Parchment",
      description: "Very light warm grey for subtle surfaces and inputs.",
      oklch: "oklch(0.93 0.01 100)" as OklchString,
      roles: ["muted", "input"],
      category: "shade",
      onColor: "oklch(0.18 0.03 275)" as OklchString,
    },
    {
      tokenSpecificName: "Antique Nickel",
      description: "Elegant mid‑tone warm grey for borders and outlines.",
      oklch: "oklch(0.70 0.015 95)" as OklchString,
      roles: ["border"],
      category: "shade",
    },

    // Brand colors
    {
      tokenSpecificName: "Gucci Green",
      description: "Signature deep green for primary actions.",
      // approx of #0B6A39 in OKLCH
      oklch: "oklch(0.53 0.12 150)" as OklchString,
      roles: ["primary", "ring", "success", "sidebar", "sidebar-primary"],
      category: "color",
      onColor: "oklch(0.97 0.01 95)" as OklchString, // Porcelain Cream
    },
    {
      tokenSpecificName: "Gucci Red",
      description: "Signature red accent and emphasis color.",
      // approx of #B32428 in OKLCH
      oklch: "oklch(0.55 0.17 27)" as OklchString,
      roles: ["accent", "destructive", "warning", "sidebar-accent"],
      category: "color",
      onColor: "oklch(0.97 0.01 95)" as OklchString,
    },
    {
      tokenSpecificName: "Gilded Gold",
      description: "Understated gold for highlights and info states.",
      // approx of #C5A253 in OKLCH
      oklch: "oklch(0.75 0.12 85)" as OklchString,
      roles: ["info", "secondary"],
      category: "color",
      onColor: "oklch(0.18 0.03 275)" as OklchString,
    },

    // Charts — refined, muted complements
    {
      tokenSpecificName: "Chart Forest",
      oklch: "oklch(0.62 0.10 150)" as OklchString,
      roles: ["chart-1"],
      category: "color",
      onColor: "oklch(0.18 0.03 275)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Merlot",
      oklch: "oklch(0.52 0.14 20)" as OklchString,
      roles: ["chart-2"],
      category: "color",
      onColor: "oklch(0.97 0.01 95)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Olive",
      oklch: "oklch(0.70 0.10 110)" as OklchString,
      roles: ["chart-3"],
      category: "color",
      onColor: "oklch(0.18 0.03 275)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Brass",
      oklch: "oklch(0.78 0.10 85)" as OklchString,
      roles: ["chart-4"],
      category: "color",
      onColor: "oklch(0.18 0.03 275)" as OklchString,
    },
    {
      tokenSpecificName: "Chart Porcelain",
      oklch: "oklch(0.95 0.02 95)" as OklchString,
      roles: ["chart-5"],
      category: "color",
      onColor: "oklch(0.18 0.03 275)" as OklchString,
    },
  ] as RawColorDefinition[],

  styleGuide: {
    rootColors: { background: "Porcelain Cream", foreground: "Deep Ink" },
    primaryColors: { primary: "Gucci Green", primaryForeground: "Porcelain Cream" },
    secondaryColors: { secondary: "Gilded Gold", secondaryForeground: "Deep Ink" },
    accentColors: { accent: "Gucci Red", accentForeground: "Porcelain Cream" },
    cardColors: { card: "Porcelain Cream", cardForeground: "Deep Ink" },
    popoverColors: { popover: "Porcelain Cream", popoverForeground: "Deep Ink" },
    mutedColors: { muted: "Parchment", mutedForeground: "Deep Ink" },
    destructiveColors: { destructive: "Gucci Red", destructiveForeground: "Porcelain Cream" },
    successColors: { success: "Gucci Green", successForeground: "Porcelain Cream" },
    infoColors: { info: "Gilded Gold", infoForeground: "Deep Ink" },
    warningColors: { warning: "Gucci Red", warningForeground: "Porcelain Cream" },
    inputColors: { input: "Parchment", inputForeground: "Deep Ink" },
    borderColors: { border: "Antique Nickel" },
    ringColors: { ring: "Gucci Green" },
    sidebarColors: {
      sidebar: "Gucci Green",
      sidebarForeground: "Porcelain Cream",
      sidebarPrimary: "Gucci Green",
      sidebarPrimaryForeground: "Porcelain Cream",
      sidebarAccent: "Gucci Red",
      sidebarAccentForeground: "Porcelain Cream",
      sidebarBorder: "Antique Nickel",
      sidebarRing: "Gucci Green",
    },
    chartColors: {
      chart1: "Chart Forest",
      chart2: "Chart Merlot",
      chart3: "Chart Olive",
      chart4: "Chart Brass",
      chart5: "Chart Porcelain",
    },

    // Softer, more luxurious radii and spacing
    radius: {
      radiusSm: "6px",
      radiusMd: "8px",
      radiusLg: "12px",
      radiusXl: "18px",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.75rem",
      spacingXl: "2.5rem",
    },
  } as StyleGuide,

  otherVars: {
    generalTextLightOnDark: "Porcelain Cream",
    generalTextDarkOnLight: "Deep Ink",

    // Warm, soft elevation
    shadowXs: "0px 1px 2px 0px hsla(50, 15%, 20%, 0.05)",
    shadowSm: "0px 2px 4px -1px hsla(50, 15%, 20%, 0.08), 0px 1px 2px -1px hsla(50, 15%, 20%, 0.06)",
    shadowMd: "0px 4px 8px -2px hsla(50, 15%, 20%, 0.10), 0px 2px 4px -2px hsla(50, 15%, 20%, 0.08)",
    shadowLg: "0px 8px 16px -4px hsla(50, 15%, 20%, 0.12), 0px 4px 8px -4px hsla(50, 15%, 20%, 0.10)",
    shadowXl: "0px 14px 28px -6px hsla(50, 15%, 20%, 0.14), 0px 6px 12px -6px hsla(50, 15%, 20%, 0.12)",
    "shadow-2xs": "0px 1px 1px 0px hsla(50, 15%, 20%, 0.04)",
    "shadow-2xl": "0px 22px 44px -10px hsla(50, 15%, 20%, 0.16), 0px 12px 24px -10px hsla(50, 15%, 20%, 0.14)",

    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
    radiusBase: "8px",
  },
};

const gucciBrandColors = generateBrandColors("gucci", gucciThemeDefinition.rawColors);

export const gucciBrand: Brand = {
  name: "Gucci",
  rating: 98,
  businessDetails: {
    name: "Gucci",
    industry: "luxury_fashion",
    personality: {
      vintageModern: 85,
      seasonedYouthful: 80,
      gracefulBold: 90,
      playfulElegant: 35,
      valueSmartLuxurious: 95,
      structuredNatural: 70,
      symbolicRealistic: 75,
    },
  },
  colors: gucciBrandColors,
  fonts: [
    {
      name: "Cormorant Garamond",
      distributor: "Google Fonts",
      description: "High‑contrast serif with classic luxury vibe for headings.",
      family: "'Cormorant Garamond', 'Garamond', 'Times New Roman', serif",
      roles: ["display", "h1", "h2", "h3", "hero-title", "nav-title"],
      weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
    {
      name: "Inter",
      distributor: "Google Fonts",
      description: "Clean sans for body copy and UI.",
      family: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      roles: ["body", "default", "sans", "p", "a", "li", "button", "label", "input"],
      weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
    {
      name: "Fira Code",
      distributor: "Google Fonts",
      description: "Monospace for code blocks.",
      family: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
      roles: ["code", "mono"],
      weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
  ],
  style: gucciThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "gucci",
    gucciBrandColors,
    gucciThemeDefinition.styleGuide,
    gucciThemeDefinition.otherVars
  ),
  sevenAxisCode: {
    colorComplexity: "triad", // cream + green + red
    brightness: "light",
    saturation: "muted",
    colorHarmony: "complementary",
    accentUsage: "balanced",
    cornerStyle: "rounded",
    elevation: "minimal-shadow",
  },
  animationConfig: {
    preset: glowingBorderAnimationPreset, // reuse slight glow; works well on gold/green accents
    rootClassName: "gucci-luxe-theme",
  },
};
