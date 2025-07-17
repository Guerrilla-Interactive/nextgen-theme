import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';

const sageMinimalThemeDefinition = {
  rawColors: [
    // Pure White: used for backgrounds and cards
    {
      tokenSpecificName: "Pure White",
      description: "Pure white, used for page background, card & popover backgrounds",
      oklch: "oklch(1.0000 0 0)" as OklchString,
      roles: ["background", "card", "popover", "sidebar", "input"],
      category: "shade",
      onColor: "oklch(0.4533 0.0327 109.8917)" as OklchString,
    },
    
    // Sage Foreground: main text color with subtle green undertone
    {
      tokenSpecificName: "Sage Foreground",
      description: "Primary text color with subtle green undertone",
      oklch: "oklch(0.4533 0.0327 109.8917)" as OklchString,
      roles: ["foreground"],
      category: "shade",
      onColor: "oklch(1.0000 0 0)" as OklchString,
    },

    // Sage Primary: main brand color
    {
      tokenSpecificName: "Sage Primary",
      description: "Primary brand color with balanced green tone",
      oklch: "oklch(0.7575 0.0599 122.8008)" as OklchString,
      roles: ["primary", "ring"],
      category: "color",
      onColor: "oklch(1.0000 0 0)" as OklchString,
    },

    // Sage Secondary: very light green for secondary elements
    {
      tokenSpecificName: "Sage Secondary",
      description: "Very light green for secondary surfaces",
      oklch: "oklch(0.9925 0.0041 121.5586)" as OklchString,
      roles: ["secondary"],
      category: "color",
      onColor: "oklch(0.4533 0.0327 109.8917)" as OklchString,
    },

    // Sage Muted: subtle background variation
    {
      tokenSpecificName: "Sage Muted",
      description: "Muted background with hint of green",
      oklch: "oklch(0.9775 0.0041 121.5599)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.6369 0.0376 112.8165)" as OklchString,
    },

    // Sage Accent: blue-green accent color
    {
      tokenSpecificName: "Sage Accent",
      description: "Blue-green accent for highlights and tertiary actions",
      oklch: "oklch(0.9207 0.0440 176.7905)" as OklchString,
      roles: ["accent"],
      category: "color",
      onColor: "oklch(0.4144 0.0409 174.5287)" as OklchString,
    },

    // Sage Destructive: soft red for errors
    {
      tokenSpecificName: "Sage Destructive",
      description: "Soft red for error states and destructive actions",
      oklch: "oklch(0.8419 0.0963 195.4785)" as OklchString,
      roles: ["destructive"],
      category: "color",
      onColor: "oklch(1.0000 0 0)" as OklchString,
    },

    // Sage Border: subtle border color
    {
      tokenSpecificName: "Sage Border",
      description: "Subtle border color with green undertone",
      oklch: "oklch(0.9386 0.0111 123.4631)" as OklchString,
      roles: ["border"],
      category: "shade",
    },

    // Chart Colors
    {
      tokenSpecificName: "Chart Rose",
      description: "Rose color for charts",
      oklch: "oklch(0.7014 0.0700 356.1866)" as OklchString,
      roles: [],
      category: "color",
    },

    {
      tokenSpecificName: "Chart Purple",
      description: "Purple color for charts",
      oklch: "oklch(0.8418 0.0634 258.0875)" as OklchString,
      roles: [],
      category: "color",
    },

    {
      tokenSpecificName: "Chart Yellow",
      description: "Yellow color for charts",
      oklch: "oklch(0.8993 0.0399 77.1500)" as OklchString,
      roles: [],
      category: "color",
    },
  ] as RawColorDefinition[],

  fonts: [
    {
      name: "Geist",
      distributor: "Vercel",
      description: "Modern, clean sans-serif designed for interfaces",
      family: "Geist, sans-serif",
      roles: ["sans", "body", "heading"],
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
    },
    {
      name: "Lora",
      distributor: "Google Fonts",
      description: "Elegant serif with calligraphic touches",
      family: '"Lora", Georgia, serif',
      roles: ["serif", "display"],
      weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
    },
    {
      name: "Fira Code",
      distributor: "Google Fonts",
      description: "Monospace font with programming ligatures",
      family: '"Fira Code", "Courier New", monospace',
      roles: ["mono", "code"],
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
    },
  ],

  styleGuide: {
    primaryColors: { primary: "Sage Primary", primaryForeground: "Pure White" },
    secondaryColors: { secondary: "Sage Secondary", secondaryForeground: "Sage Foreground" },
    accentColors: { accent: "Sage Accent", accentForeground: "Sage Accent" },
    cardColors: { card: "Pure White", cardForeground: "Sage Foreground" },
    popoverColors: { popover: "Pure White", popoverForeground: "Sage Foreground" },
    mutedColors: { muted: "Sage Muted", mutedForeground: "Sage Foreground" },
    destructiveColors: { destructive: "Sage Destructive", destructiveForeground: "Pure White" },
    successColors: { success: "Sage Primary", successForeground: "Pure White" },
    inputColors: { input: "Pure White", inputForeground: "Sage Foreground" },
    borderColors: { border: "Sage Border" },
    ringColors: { ring: "Sage Primary" },
    radius: {
      radiusSm: "0.375rem",
      radiusMd: "0.5rem",
      radiusLg: "0.75rem",
      radiusXl: "1rem",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  } as StyleGuide,

  businessDetails: {
    name: "Sage Minimal",
    industry: "Design & Technology",
    personality: {
      vintageModern: 75,
      seasonedYouthful: 60,
      gracefulBold: 25,
      playfulElegant: 80,
      valueSmartLuxurious: 70,
      structuredNatural: 85,
      symbolicRealistic: 40,
    },
  },
};

const brandName = "sage-minimal";
const generatedColors = generateBrandColors(brandName, sageMinimalThemeDefinition.rawColors);

const themeCssVars = createThemeCssVars(
  brandName,
  generatedColors,
  sageMinimalThemeDefinition.styleGuide,
  {
    background: "Pure White",
    foreground: "Sage Foreground",
    radiusBase: "0.5rem",

    // Soft, subtle shadows with minimal opacity
    shadowXs: "1px 2px 5px 1px hsl(0 0% 10.1961% / 0.03)",
    shadowSm: "1px 2px 5px 1px hsl(0 0% 10.1961% / 0.06), 1px 1px 2px 0px hsl(0 0% 10.1961% / 0.06)",
    shadowMd: "1px 2px 5px 1px hsl(0 0% 10.1961% / 0.06), 1px 2px 4px 0px hsl(0 0% 10.1961% / 0.06)",
    shadowLg: "1px 2px 5px 1px hsl(0 0% 10.1961% / 0.06), 1px 4px 6px 0px hsl(0 0% 10.1961% / 0.06)",
    shadowXl: "1px 2px 5px 1px hsl(0 0% 10.1961% / 0.06), 1px 8px 10px 0px hsl(0 0% 10.1961% / 0.06)",
    chart1: "Sage Primary",
    chart2: "Sage Accent", 
    chart3: "Chart Rose",
    chart4: "Chart Purple",
    chart5: "Chart Yellow",
  }
);

export const sageMinimalBrand: Brand = {
  name: "Sage Minimal",
  businessDetails: sageMinimalThemeDefinition.businessDetails,
  colors: generatedColors,
  fonts: sageMinimalThemeDefinition.fonts,
  style: sageMinimalThemeDefinition.styleGuide,
  themeCssVariables: themeCssVars,
  sevenAxisCode: {
    colorComplexity: 'monochrome',        // Monochrome - primarily sage green with minimal accents
    brightness: 'light',                  // Light - white background with subtle green tones
    saturation: 'muted',                  // Muted - very subtle, minimal saturation
    colorHarmony: 'analogous',            // Analogous - green-based color harmony
    accentUsage: 'minimal',               // Minimal - very clean and minimal design approach
    cornerStyle: 'rounded',               // Rounded - uses standard rounded corners
    elevation: 'flat',                    // Flat - very minimal shadows with low opacity
  },
};

export default sageMinimalBrand; 