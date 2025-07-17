/*───────────────────────────────────────────────────────────────────────*\
  Playful Theme - Fun and Energetic
  – bright colors · bouncy animations · child-friendly · energetic
\*───────────────────────────────────────────────────────────────────────*/

import {
  type Brand,
  generateBrandColors,
  type RawColorDefinition,
  type StyleGuide,
  createThemeCssVars,
  OklchString,
} from "../brand-utils";
import { playfulAnimationPreset } from '../animation-presets';

const playfulThemeDefinition = {
  rawColors: [
    // Bright backgrounds
    {
      tokenSpecificName: "Sunshine Yellow",
      description: "Bright, cheerful yellow background",
      oklchLight: "oklch(0.95 0.08 85)" as OklchString,
      oklchDark: "oklch(0.15 0.05 85)" as OklchString,
      roles: ["background"],
      category: "color",
      onColorLight: "oklch(0.1 0 0)" as OklchString,
      onColorDark: "oklch(0.9 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Cotton Candy",
      description: "Soft pink for cards and surfaces",
      oklchLight: "oklch(0.98 0.02 350)" as OklchString,
      oklchDark: "oklch(0.12 0.02 350)" as OklchString,
      roles: ["card", "popover"],
      category: "color",
      onColorLight: "oklch(0.1 0 0)" as OklchString,
      onColorDark: "oklch(0.9 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Deep Purple",
      description: "Fun purple for text and primary actions",
      oklchLight: "oklch(0.25 0.2 280)" as OklchString,
      oklchDark: "oklch(0.85 0.15 280)" as OklchString,
      roles: ["foreground", "primary", "ring"],
      category: "color",
      onColorLight: "oklch(0.95 0 0)" as OklchString,
      onColorDark: "oklch(0.05 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Bright Orange",
      description: "Energetic orange for secondary actions",
      oklchLight: "oklch(0.7 0.15 50)" as OklchString,
      oklchDark: "oklch(0.6 0.12 50)" as OklchString,
      roles: ["secondary"],
      category: "color",
      onColorLight: "oklch(0.05 0 0)" as OklchString,
      onColorDark: "oklch(0.95 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Electric Blue",
      description: "Vibrant blue for accents",
      oklchLight: "oklch(0.6 0.2 240)" as OklchString,
      oklchDark: "oklch(0.7 0.18 240)" as OklchString,
      roles: ["accent"],
      category: "color",
      onColorLight: "oklch(0.95 0 0)" as OklchString,
      onColorDark: "oklch(0.05 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Forest Green",
      description: "Nature-inspired green",
      oklchLight: "oklch(0.5 0.15 140)" as OklchString,
      oklchDark: "oklch(0.65 0.12 140)" as OklchString,
      roles: ["success"],
      category: "color",
      onColorLight: "oklch(0.95 0 0)" as OklchString,
      onColorDark: "oklch(0.05 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Cherry Red",
      description: "Bold red for warnings and destructive actions",
      oklchLight: "oklch(0.55 0.22 25)" as OklchString,
      oklchDark: "oklch(0.7 0.18 25)" as OklchString,
      roles: ["destructive"],
      category: "color",
      onColorLight: "oklch(0.95 0 0)" as OklchString,
      onColorDark: "oklch(0.05 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Soft Gray",
      description: "Muted gray for subtle elements",
      oklchLight: "oklch(0.7 0 0)" as OklchString,
      oklchDark: "oklch(0.4 0 0)" as OklchString,
      roles: ["muted", "border", "input"],
      category: "shade",
      onColorLight: "oklch(0.1 0 0)" as OklchString,
      onColorDark: "oklch(0.9 0 0)" as OklchString,
    },
    {
      tokenSpecificName: "Medium Gray",
      description: "Medium gray for muted text",
      oklchLight: "oklch(0.5 0 0)" as OklchString,
      oklchDark: "oklch(0.6 0 0)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    }
  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Deep Purple", primaryForeground: "Cotton Candy" },
    secondaryColors: { secondary: "Bright Orange", secondaryForeground: "Deep Purple" },
    accentColors: { accent: "Electric Blue", accentForeground: "Cotton Candy" },
    cardColors: { card: "Cotton Candy", cardForeground: "Deep Purple" },
    popoverColors: { popover: "Cotton Candy", popoverForeground: "Deep Purple" },
    mutedColors: { muted: "Soft Gray", mutedForeground: "Medium Gray" },
    destructiveColors: { destructive: "Cherry Red", destructiveForeground: "Cotton Candy" },
    successColors: { success: "Forest Green", successForeground: "Cotton Candy" },
    inputColors: { input: "Soft Gray", inputForeground: "Deep Purple" },
    borderColors: { border: "Soft Gray" },
    ringColors: { ring: "Deep Purple" },
    radius: {
      radiusSm: "0.75rem",
      radiusMd: "1rem",
      radiusLg: "1.25rem",
      radiusXl: "1.5rem"
    },
    spacing: {
      spacingSm: "0.75rem",
      spacingMd: "1.25rem",
      spacingLg: "2rem",
      spacingXl: "2.5rem"
    }
  } as StyleGuide,

  otherVars: {
    background: "Sunshine Yellow",
    foreground: "Deep Purple",
    radiusBase: "1rem",

    // Playful shadows with color
    shadowXs: "0 1px 2px rgba(138, 43, 226, 0.1)",
    shadowSm: "0 2px 4px rgba(138, 43, 226, 0.15)",
    shadowMd: "0 4px 8px rgba(138, 43, 226, 0.2)",
    shadowLg: "0 8px 16px rgba(138, 43, 226, 0.25)",
    shadowXl: "0 16px 32px rgba(138, 43, 226, 0.3)",

    borderWidthDefault: "2px",
    borderStyleDefault: "solid",

    // Chart colors using the same playful palette
    chart1: "Deep Purple",
    chart2: "Bright Orange",
    chart3: "Electric Blue",
    chart4: "Forest Green",
    chart5: "Cherry Red",
  }
};

const playfulBrandColors = generateBrandColors("playful", playfulThemeDefinition.rawColors);

export const playfulBrand: Brand = {
  name: "Playful",
  businessDetails: {
    name: "Playful Theme",
    industry: "entertainment",
    personality: {
      vintageModern: 20,
      seasonedYouthful: 95,
      gracefulBold: 85,
      playfulElegant: 95,
      valueSmartLuxurious: 30,
      structuredNatural: 25,
      symbolicRealistic: 15
    }
  },
  colors: playfulBrandColors,
  fonts: [
    {
      name: "Comic Neue",
      distributor: "Google Fonts",
      description: "A friendly, casual font perfect for playful interfaces",
      family: "'Comic Neue', cursive",
      roles: ["heading", "body", "display", "sans", "default", "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "li"],
      weights: { light: 300, regular: 400, bold: 700 }
    },
    {
      name: "Space Mono",
      distributor: "Google Fonts",
      description: "Quirky monospace font for code",
      family: "'Space Mono', monospace",
      roles: ["code", "mono"],
      weights: { regular: 400, bold: 700 }
    }
  ],
  style: playfulThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "playful",
    playfulBrandColors,
    playfulThemeDefinition.styleGuide,
    playfulThemeDefinition.otherVars
  ),
  prefersDarkSchemeForChrome: false,
  sevenAxisCode: {
    colorComplexity: 'polychrome',
    brightness: 'light',
    saturation: 'vibrant',
    colorHarmony: 'triadic',
    accentUsage: 'prominent',
    cornerStyle: 'very-rounded',
    elevation: 'layered'
  },
  animationConfig: {
    preset: playfulAnimationPreset,
    rootClassName: 'playful-theme'
  }
}; 