import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';

const sageShadowThemeDefinition = {
  rawColors: [
    // Deep Shadow: used for backgrounds and cards
    {
      tokenSpecificName: "Deep Shadow",
      description: "Deep dark background, used for page background, card & popover backgrounds",
      oklch: "oklch(0.1200 0.0050 120)" as OklchString,
      roles: ["background", "card", "popover", "sidebar", "input"],
      category: "shade",
      onColor: "oklch(0.9200 0.0180 125)" as OklchString,
    },
    
    // Sage Light: main text color with gentle green undertone
    {
      tokenSpecificName: "Sage Light",
      description: "Primary text color with gentle green undertone for dark mode",
      oklch: "oklch(0.9200 0.0180 125)" as OklchString,
      roles: ["foreground"],
      category: "shade",
      onColor: "oklch(0.1200 0.0050 120)" as OklchString,
    },

    // Moonlit Sage: main brand color with darker tone
    {
      tokenSpecificName: "Moonlit Sage",
      description: "Primary brand color with moonlit sage tone",
      oklch: "oklch(0.6200 0.0480 128)" as OklchString,
      roles: ["primary", "ring"],
      category: "color",
      onColor: "oklch(0.1200 0.0050 120)" as OklchString,
    },

    // Sage Whisper: very dark green for secondary elements
    {
      tokenSpecificName: "Sage Whisper",
      description: "Dark green for secondary surfaces",
      oklch: "oklch(0.2200 0.0200 122)" as OklchString,
      roles: ["secondary"],
      category: "color",
      onColor: "oklch(0.9200 0.0180 125)" as OklchString,
    },

    // Shadow Muted: subtle background variation
    {
      tokenSpecificName: "Shadow Muted",
      description: "Muted background with hint of green in darkness",
      oklch: "oklch(0.1800 0.0080 121)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.7500 0.0200 125)" as OklchString,
    },

    // Sage Glow: blue-green accent color
    {
      tokenSpecificName: "Sage Glow",
      description: "Blue-green accent for highlights and tertiary actions in dark mode",
      oklch: "oklch(0.5500 0.0320 180)" as OklchString,
      roles: ["accent"],
      category: "color",
      onColor: "oklch(0.1200 0.0050 120)" as OklchString,
    },

    // Crimson Mist: soft red for errors
    {
      tokenSpecificName: "Crimson Mist",
      description: "Soft red for error states and destructive actions in dark mode",
      oklch: "oklch(0.6800 0.0800 15)" as OklchString,
      roles: ["destructive"],
      category: "color",
      onColor: "oklch(0.1200 0.0050 120)" as OklchString,
    },

    // Sage Border: subtle border color
    {
      tokenSpecificName: "Sage Border Dark",
      description: "Subtle border color with green undertone for dark mode",
      oklch: "oklch(0.2800 0.0150 123)" as OklchString,
      roles: ["border"],
      category: "shade",
    },

    // Chart Colors - adjusted for dark mode
    {
      tokenSpecificName: "Chart Rose Dark",
      description: "Rose color for charts in dark mode",
      oklch: "oklch(0.6200 0.0600 356)" as OklchString,
      roles: [],
      category: "color",
    },

    {
      tokenSpecificName: "Chart Purple Dark",
      description: "Purple color for charts in dark mode",
      oklch: "oklch(0.7000 0.0550 258)" as OklchString,
      roles: [],
      category: "color",
    },

    {
      tokenSpecificName: "Chart Yellow Dark",
      description: "Yellow color for charts in dark mode",
      oklch: "oklch(0.7500 0.0350 77)" as OklchString,
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
    primaryColors: { primary: "Moonlit Sage", primaryForeground: "Deep Shadow" },
    secondaryColors: { secondary: "Sage Whisper", secondaryForeground: "Sage Light" },
    accentColors: { accent: "Sage Glow", accentForeground: "Deep Shadow" },
    cardColors: { card: "Deep Shadow", cardForeground: "Sage Light" },
    popoverColors: { popover: "Deep Shadow", popoverForeground: "Sage Light" },
    mutedColors: { muted: "Shadow Muted", mutedForeground: "Sage Light" },
    destructiveColors: { destructive: "Crimson Mist", destructiveForeground: "Deep Shadow" },
    successColors: { success: "Moonlit Sage", successForeground: "Deep Shadow" },
    inputColors: { input: "Deep Shadow", inputForeground: "Sage Light" },
    borderColors: { border: "Sage Border Dark" },
    ringColors: { ring: "Moonlit Sage" },
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
    name: "Sage Shadow",
    industry: "Design & Technology",
    personality: {
      vintageModern: 80,      // Slightly more modern with dark aesthetic
      seasonedYouthful: 75,   // More mature and sophisticated
      gracefulBold: 30,       // Gentle boldness in the shadows
      playfulElegant: 85,     // Highly elegant with subtle playfulness
      valueSmartLuxurious: 80, // More luxurious feel in dark mode
      structuredNatural: 90,  // Natural structure enhanced by darkness
      symbolicRealistic: 50,  // Balanced symbolic representation
    },
  },
};

const brandName = "sage-shadow";
const generatedColors = generateBrandColors(brandName, sageShadowThemeDefinition.rawColors);

const themeCssVars = createThemeCssVars(
  brandName,
  generatedColors,
  sageShadowThemeDefinition.styleGuide,
  {
    background: "Deep Shadow",
    foreground: "Sage Light",
    radiusBase: "0.5rem",

    // Subtle glowing shadows for dark mode
    shadowXs: "1px 2px 5px 1px hsl(120 30% 50% / 0.05)",
    shadowSm: "1px 2px 5px 1px hsl(120 30% 50% / 0.08), 1px 1px 2px 0px hsl(120 30% 50% / 0.08)",
    shadowMd: "1px 2px 5px 1px hsl(120 30% 50% / 0.10), 1px 2px 4px 0px hsl(120 30% 50% / 0.10)",
    shadowLg: "1px 2px 5px 1px hsl(120 30% 50% / 0.12), 1px 4px 6px 0px hsl(120 30% 50% / 0.12)",
    shadowXl: "1px 2px 5px 1px hsl(120 30% 50% / 0.15), 1px 8px 10px 0px hsl(120 30% 50% / 0.15)",
    chart1: "Moonlit Sage",
    chart2: "Sage Glow", 
    chart3: "Chart Rose Dark",
    chart4: "Chart Purple Dark",
    chart5: "Chart Yellow Dark",
  }
);

export const sageShadowBrand: Brand = {
  name: "Sage Shadow",
  businessDetails: sageShadowThemeDefinition.businessDetails,
  colors: generatedColors,
  fonts: sageShadowThemeDefinition.fonts,
  style: sageShadowThemeDefinition.styleGuide,
  themeCssVariables: themeCssVars,
  sevenAxisCode: {
    colorComplexity: 'monochrome',        // Monochrome - primarily sage green with minimal accents
    brightness: 'adaptive',              // Adaptive - deep shadow background with sage tones
    saturation: 'muted',                  // Muted - very subtle, minimal saturation
    colorHarmony: 'analogous',            // Analogous - green-based color harmony
    accentUsage: 'minimal',               // Minimal - very clean and minimal design approach
    cornerStyle: 'rounded',               // Rounded - uses standard rounded corners
    elevation: 'subtle-depth',            // Subtle depth - gentle glowing shadows for dark mode
  },
};

export default sageShadowBrand; 