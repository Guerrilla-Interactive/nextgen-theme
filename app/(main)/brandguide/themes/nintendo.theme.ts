import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';

const nintendoThemeDefinition = {
  rawColors: [
    // Core Nintendo Palette (Revised with Bootstrap inspiration)
    {
      tokenSpecificName: "Nintendo Red", // from --bs-red: #E60012
      description: "Iconic Nintendo red, vibrant and playful.",
      oklchLight: "oklch(0.57 0.24 24)" as OklchString,
      oklchDark: "oklch(0.57 0.24 24)" as OklchString,
      roles: ["primary", "ring", "accent", "info", "destructive", "chart-1"], // Destructive can also be this red
      category: 'color',
      onColorLight: "oklch(1 0 0)" as OklchString, // Super White
      onColorDark: "oklch(1 0 0)" as OklchString,  // Super White
    },
    {
      tokenSpecificName: "Super White", // from --bs-white: #fff
      description: "Clean, bright white, primarily for text on dark/colored backgrounds.",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark: "oklch(1 0 0)" as OklchString, // Stays white for text
      roles: [
        "primary-foreground",
        "secondary-foreground-dark", // White text on dark secondary surfaces
        "accent-foreground",
        "destructive-foreground",
        "info-foreground",
        "success-foreground",
        "warning-foreground-dark", // White text on dark yellow
        "card-foreground-dark",
        "popover-foreground-dark",
        "input-foreground-dark",
        // Foregrounds for new accents if they are dark enough
      ],
      category: 'shade',
    },
    {
      tokenSpecificName: "Body Background Light", // from --bs-body-bg: #fff
      description: "Main background color for light theme.",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark: "oklch(0.22 0.002 270)" as OklchString, // Near Black for dark mode background
      roles: ["background"],
      category: 'shade',
      onColorLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black text
      onColorDark: "oklch(1 0 0)" as OklchString,          // Super White text
    },
    {
      tokenSpecificName: "Near Black", // from --bs-dark: #212529 or --bs-body-color
      description: "Default text color for light theme, very dark gray.",
      oklchLight: "oklch(0.22 0.002 270)" as OklchString,
      oklchDark: "oklch(1 0 0)" as OklchString, // Becomes white text in dark mode
      roles: [
        "foreground", // Default text on Body Background Light
        "secondary-foreground", // Text on Surface Light Gray
        "card-foreground",
        "popover-foreground",
        "input-foreground",
        "muted-foreground",
        // Foreground for light warning yellow
      ],
      category: 'shade',
    },
    {
      tokenSpecificName: "Surface Light Gray", // from --bs-gray-100: #f8f9fa
      description: "Very light gray for cards, popovers, secondary surfaces in light mode.",
      oklchLight: "oklch(0.97 0.001 270)" as OklchString,
      oklchDark: "oklch(0.26 0.002 270)" as OklchString, // Darker Gray (bs-gray-900) for dark mode cards
      roles: ["card", "popover", "secondary"],
      category: 'shade',
      onColorLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black text
      onColorDark: "oklch(1 0 0)" as OklchString,          // Super White text
    },
    {
      tokenSpecificName: "Muted Border Gray", // from --bs-gray: #B4B5BA or --bs-gray-600
      description: "Mid-gray for borders, inputs, and muted elements.",
      oklchLight: "oklch(0.74 0.003 270)" as OklchString,
      oklchDark: "oklch(0.51 0.003 270)" as OklchString, // Darker Mid Gray (bs-gray-700)
      roles: ["border", "input", "muted"],
      category: 'shade',
      onColorLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black text
      onColorDark: "oklch(1 0 0)" as OklchString,          // Super White text
    },
    {
      tokenSpecificName: "Nintendo Coin Yellow", // Replaces Warning Yellow, more thematic
      description: "A warm, coin-like yellow, also for warnings.",
      oklchLight: "oklch(0.80 0.15 85)" as OklchString, // Brighter, warmer yellow
      oklchDark: "oklch(0.75 0.16 85)" as OklchString, // Stays vibrant
      roles: ["warning", "chart-3"], // Using as a chart color too
      category: 'color',
      onColorLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black for good contrast
      onColorDark: "oklch(0.22 0.002 270)" as OklchString, // Near Black for good contrast
    },
    {
      tokenSpecificName: "Success Green", // from --bs-green: #3DC372
      description: "A standard green for success states, also Yoshi Green for charts.",
      oklchLight: "oklch(0.72 0.13 155)" as OklchString,
      oklchDark: "oklch(0.68 0.13 155)" as OklchString,
      roles: ["success", "chart-4"], // Assigning a chart role
      category: 'color',
      onColorLight: "oklch(1 0 0)" as OklchString, // Super White text
      onColorDark: "oklch(1 0 0)" as OklchString,  // Super White text
    },
    {
      tokenSpecificName: "Nintendo Sky Blue", // New vibrant accent
      description: "Bright, cheerful blue, like a Mario sky or blue Joy-Con.",
      oklchLight: "oklch(0.65 0.15 250)" as OklchString,
      oklchDark: "oklch(0.60 0.16 250)" as OklchString,
      roles: ["chart-2"], // Key chart color
      category: 'color',
      onColorLight: "oklch(1 0 0)" as OklchString, // Super White text
      onColorDark: "oklch(1 0 0)" as OklchString,  // Super White text
    },
    {
      tokenSpecificName: "Chart Outline Gray",
      oklchLight: "oklch(0.74 0.003 270)" as OklchString, // Muted Border Gray
      oklchDark: "oklch(0.51 0.003 270)" as OklchString,
      roles: ["chart-outline"],
      category: 'shade',
    },
    {
      tokenSpecificName: "Tooltip Background",
      description: "Tooltip surface, same as card",
      oklchLight: "oklch(0.97 0.001 270)" as OklchString, // Surface Light Gray
      oklchDark: "oklch(0.26 0.002 270)" as OklchString, // Darker Gray for dark
      roles: ["tooltip-background"],
      category: 'shade',
      onColorLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black text
      onColorDark: "oklch(1 0 0)" as OklchString,          // Super White text
    },

    {
      tokenSpecificName: "Text Brand Red",
      description: "Brand text color, same as primary",
      oklchLight: "oklch(0.57 0.24 24)" as OklchString, // Nintendo Red
      oklchDark: "oklch(0.57 0.24 24)" as OklchString,
      roles: ["text-brand"],
      category: 'color',
    },
    {
      tokenSpecificName: "Default Color", // Fallback
      description: "Default fallback color.",
      oklchLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black for light mode
      oklchDark: "oklch(1 0 0)" as OklchString,          // Super White for dark mode
      roles: ["default"],
      category: 'shade',
    },
     // Ensure Near Black has a definition for warning foreground if Coin Yellow is light
    {
      tokenSpecificName: "Warning Foreground Light",
      description: "Text on light warning yellow",
      oklchLight: "oklch(0.22 0.002 270)" as OklchString, // Near Black
      oklchDark: "oklch(0.22 0.002 270)" as OklchString, // Near Black
      roles: ["warning-foreground"],
      category: 'shade',
    },

  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Nintendo Red", primaryForeground: "Super White" },
    secondaryColors: { secondary: "Surface Light Gray", secondaryForeground: "Near Black" },
    accentColors: { accent: "Nintendo Red", accentForeground: "Super White" }, // Could use Sky Blue here too
    cardColors: { card: "Surface Light Gray", cardForeground: "Near Black" },
    popoverColors: { popover: "Surface Light Gray", popoverForeground: "Near Black" },
    mutedColors: { muted: "Muted Border Gray", mutedForeground: "Near Black" },
    destructiveColors: { destructive: "Nintendo Red", destructiveForeground: "Super White" },
    successColors: { success: "Success Green", successForeground: "Super White" },
    infoColors: { info: "Nintendo Red", infoForeground: "Super White" }, // Or Sky Blue for info
    warningColors: { warning: "Nintendo Coin Yellow", warningForeground: "Warning Foreground Light" },
    inputColors: { input: "Muted Border Gray", inputForeground: "Near Black" },
    borderColors: { border: "Muted Border Gray" },
    ringColors: { ring: "Nintendo Red" },
    radius: {
      radiusSm: "4px",
      radiusMd: "8px",
      radiusLg: "12px",
      radiusXl: "16px"
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem"
    },
  } as StyleGuide,

  otherVars: {
    background: "Body Background Light",
    foreground: "Near Black",
    generalTextLightOnDark: "Super White",
    generalTextDarkOnLight: "Near Black",

    // Softer, warmer shadows with a subtle Nintendo hint
    shadowXs: "0 0.05rem 0.1rem hsla(20, 15%, 50%, 0.06)",
    shadowSm: "0 0.125rem 0.25rem hsla(20, 15%, 50%, 0.08)",
    shadowMd: "0 0.25rem 0.5rem hsla(20, 15%, 45%, 0.1)",
    shadowLg: "0 0.5rem 1rem hsla(20, 15%, 45%, 0.12)",
    shadowXl: "0 1rem 2rem hsla(20, 15%, 40%, 0.15)",

    borderWidthDefault: "1px",
    borderStyleDefault: "solid",

    chart1: "Nintendo Red",
    chart2: "Nintendo Sky Blue",
    chart3: "Nintendo Coin Yellow", // Sunshine Yellow was a bit too light for chart, Coin Yellow is better
    chart4: "Success Green", // Renamed chart5 to chart4 for sequence
    chartOutline: "Chart Outline Gray",
    radiusBase: "8px",
  }
};

const nintendoBrandColors = generateBrandColors("nintendo", nintendoThemeDefinition.rawColors);

export const nintendoBrand: Brand = {
  name: "Nintendo",
  businessDetails: {
    name: "Nintendo Co., Ltd.",
    industry: "video_games_entertainment",
    personality: {
      vintageModern: 30,
      seasonedYouthful: 90,
      gracefulBold: 60,
      playfulElegant: 85,
      valueSmartLuxurious: 40,
      structuredNatural: 50,
      symbolicRealistic: 70,
    },
  },
  colors: nintendoBrandColors,
  fonts: [
    {
      name: "Nunito",
      distributor: "Google Fonts",
      description: "Friendly, rounded sans-serif perfect for Nintendo's approachable brand.",
      family: "'Nunito', system-ui, -apple-system, sans-serif",
      roles: ["body", "default", "sans", "p", "a", "li", "button-label", "form-input"],
      weights: { extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Fredoka",
      distributor: "Google Fonts",
      description: "Playful, fun display font perfect for Nintendo's joyful gaming spirit.",
      family: "'Fredoka', 'Fredoka One', cursive, sans-serif",
      roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title", "nav-title"],
      weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
    {
      name: "JetBrains Mono",
      distributor: "Google Fonts",
      description: "Clean monospaced font for technical content and game code.",
      family: "'JetBrains Mono', 'Roboto Mono', Consolas, monospace",
      roles: ["code", "mono"],
      weights: { thin: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
    },
  ],
  style: nintendoThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "nintendo",
    nintendoBrandColors,
    nintendoThemeDefinition.styleGuide,
    nintendoThemeDefinition.otherVars
  ),
  prefersDarkSchemeForChrome: false,
}; 