import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';
import { neoBrutalismAnimationPreset } from '../animation-presets';

const neoBrutalismThemeDefinition = {
  rawColors: [
    // White: used for page, card, and popover backgrounds
    {
      tokenSpecificName: "White",
      description: "White, used for page background, card & popover backgrounds",
      oklchLight: "oklch(1.0000 0 0)" as OklchString,
      oklchDark: "oklch(0 0 0)" as OklchString,
      roles: ["background", "card", "popover"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,  // text on white in light mode
      onColorDark: "oklch(1.0000 0 0)" as OklchString   // text on black (dark-mode white) 
    },

    // Black: used for main text, card & popover text, destructive actions, inputs, borders, and sidebar text/borders
    {
      tokenSpecificName: "Black",
      description: "Black, used for main text, card/popover text, destructive actions, inputs, borders, and sidebar text/borders",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark: "oklch(1.0000 0 0)" as OklchString,
      roles: [
        "foreground",
        "card-foreground",
        "popover-foreground",
        "destructive",
        "border",
        "input",
        "sidebar-foreground",
        "sidebar-border"
      ],
      category: "shade",
      onColorLight: "oklch(1.0000 0 0)" as OklchString, // text on black in light mode
      onColorDark: "oklch(0 0 0)" as OklchString       // text on white (dark-mode black)
    },

    // Light Gray: used for muted surfaces and sidebar backgrounds
    {
      tokenSpecificName: "Light Gray",
      description: "Light Gray, used for muted surfaces and sidebar backgrounds",
      oklchLight: "oklch(0.9551 0 0)" as OklchString,
      oklchDark: "oklch(0.32 0 0)" as OklchString,
      roles: ["muted", "sidebar"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,   // text on light gray in light mode
      onColorDark: "oklch(1.0000 0 0)" as OklchString   // text on darker gray in dark mode
    },

    // Dark Gray: used for muted foreground text
    {
      tokenSpecificName: "Dark Gray",
      description: "Dark Gray, used for muted foreground text",
      oklchLight: "oklch(0.3211 0 0)" as OklchString,
      oklchDark: "oklch(0.85 0 0)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade"
    },

    // Red Primary: used for primary actions, focus ring, chart-1, and sidebar primary
    {
      tokenSpecificName: "Red Primary",
      description: "Red Primary, used for primary actions, focus ring, chart color 1, and sidebar primary",
      oklchLight: "oklch(0.6670 0.2428 359.7106)" as OklchString,
      oklchDark: "oklch(0.70 0.19 23.04)" as OklchString,
      roles: ["primary", "ring", "chart-1", "sidebar-primary", "sidebar-ring"],
      category: "color",
      onColorLight: "oklch(1.0000 0 0)" as OklchString,  // text on red in light mode
      onColorDark: "oklch(0 0 0)" as OklchString       // text on darker-red in dark mode
    },

    // Yellow Secondary: used for secondary actions and chart-2
    {
      tokenSpecificName: "Yellow Secondary",
      description: "Yellow Secondary, used for secondary actions and chart color 2",
      oklchLight: "oklch(0.7505 0.1791 58.2827)" as OklchString,
      oklchDark: "oklch(0.75 0.18 58)" as OklchString,
      roles: ["secondary", "chart-2"],
      category: "color",
      onColorLight: "oklch(0 0 0)" as OklchString,    // text on yellow in light mode
      onColorDark: "oklch(0 0 0)" as OklchString      // text on yellow in dark mode
    },

    // Blue Accent: used for accent, chart-3, and sidebar accent
    {
      tokenSpecificName: "Blue Accent",
      description: "Blue Accent, used for accent color, chart color 3, and sidebar accent",
      oklchLight: "oklch(0.8160 0.1453 216.5023)" as OklchString,
      oklchDark: "oklch(0.68 0.18 251.63)" as OklchString,
      roles: ["accent", "chart-3", "sidebar-accent"],
      category: "color",
      onColorLight: "oklch(1.0000 0 0)" as OklchString,  // text on blue in light mode
      onColorDark: "oklch(0 0 0)" as OklchString       // text on darker-blue in dark mode
    },

    // Green Chart: used for chart-4
    {
      tokenSpecificName: "Green Chart",
      description: "Green, used for chart color 4",
      oklchLight: "oklch(0.7492 0.2275 137.1080)" as OklchString,
      oklchDark: "oklch(0.74 0.23 142.87)" as OklchString,
      roles: ["chart-4"],
      category: "color"
    },

    // Purple Chart: used for chart-5
    {
      tokenSpecificName: "Purple Chart",
      description: "Purple, used for chart color 5",
      oklchLight: "oklch(0.4614 0.2486 298.2946)" as OklchString,
      oklchDark: "oklch(0.61 0.25 328.13)" as OklchString,
      roles: ["chart-5"],
      category: "color"
    }
  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors:       { primary: "Red Primary", primaryForeground: "White" },
    secondaryColors:     { secondary: "Yellow Secondary", secondaryForeground: "Black" },
    accentColors:        { accent: "Blue Accent", accentForeground: "White" },
    cardColors:          { card: "White", cardForeground: "Black" },
    popoverColors:       { popover: "White", popoverForeground: "Black" },
    mutedColors:         { muted: "Light Gray", mutedForeground: "Dark Gray" },
    destructiveColors:   { destructive: "Black", destructiveForeground: "White" },
    successColors:       { success: "Red Primary", successForeground: "White" },
    infoColors:          { info: "Blue Accent", infoForeground: "White" },
    warningColors:       { warning: "Black", warningForeground: "White" },
    inputColors:         { input: "Black", inputForeground: "White" },
    borderColors:        { border: "Black" },
    ringColors:          { ring: "Red Primary" },
    radius: {
      radiusSm: "0.125rem",
      radiusMd: "0.125rem",
      radiusLg: "0.125rem",
      radiusXl: "0.125rem"
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem"
    }
  } as StyleGuide,

  otherVars: {
    background: "White",
    foreground: "Black",
    radiusBase: "0.125rem",

    // BRUTAL SHADOWS - The defining characteristic of neo-brutalism
    "shadow-2xs": "4px 4px 0px 0px hsl(0 0% 10.1961% / 0.50), 4px 1px 2px -1px hsl(0 0% 10.1961% / 0.50)",
    shadowXs: "4px 4px 0px 0px hsl(0 0% 10.1961% / 0.50), 4px 1px 2px -1px hsl(0 0% 10.1961% / 0.50)",
    shadowSm: "4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00), 4px 1px 2px -1px hsl(0 0% 10.1961% / 1.00)",
    shadow: "4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00), 4px 1px 2px -1px hsl(0 0% 10.1961% / 1.00)",
    shadowMd: "4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00), 4px 1px 2px -1px hsl(0 0% 10.1961% / 1.00)",
    shadowLg: "4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00), 4px 1px 2px -1px hsl(0 0% 10.1961% / 1.00)",
    shadowXl: "4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00), 4px 1px 2px -1px hsl(0 0% 10.1961% / 1.00)",
    "shadow-2xl": "4px 4px 0px 0px hsl(0 0% 10.1961% / 2.50), 4px 1px 2px -1px hsl(0 0% 10.1961% / 2.50)",

    borderWidthDefault: "2px",
    borderStyleDefault: "solid",

    // Chart tokens
    chart1: "Red Primary",
    chart2: "Yellow Secondary", 
    chart3: "Blue Accent",
    chart4: "Green Chart",
    chart5: "Purple Chart",

    // Sidebar tokens
    sidebarBackground: "Light Gray",
    sidebarForeground: "Black",
    sidebarPrimary: "Red Primary",
    sidebarPrimaryForeground: "White",
    sidebarAccent: "Blue Accent",
    sidebarAccentForeground: "White",
    sidebarBorder: "Black",
    sidebarRing: "Red Primary"
  }
};

const neoBrutalismBrandColors = generateBrandColors("neo-brutalism", neoBrutalismThemeDefinition.rawColors);

export const neoBrutalismBrand: Brand = {
  name: "Neo-Brutalism",
  businessDetails: {
    name: "Neo-Brutalism Systems",
    industry: "digital_art_design",
    personality: {
      vintageModern: 5,
      seasonedYouthful: 60,
      gracefulBold: 95,
      playfulElegant: 15,
      valueSmartLuxurious: 25,
      structuredNatural: 85,
      symbolicRealistic: 40
    }
  },
  colors: neoBrutalismBrandColors,
  fonts: [
    {
      name: "DM Sans",
      distributor: "Google Fonts",
      description: "Clean sans-serif for body text and paragraphs.",
      family: "'DM Sans', sans-serif",
      roles: ["body", "default", "sans", "p", "a", "li", "display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title", "serif"],
      weights: { regular: 400, medium: 500, bold: 700, extrabold: 800, black: 900 }
    },
    {
      name: "Space Mono",
      distributor: "Google Fonts",
      description: "Monospaced font for code and technical content.",
      family: "'Space Mono', monospace",
      roles: ["code", "mono"],
      weights: { regular: 400, bold: 700 }
    },
  ],
  style: neoBrutalismThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "neo-brutalism",
    neoBrutalismBrandColors,
    neoBrutalismThemeDefinition.styleGuide,
    neoBrutalismThemeDefinition.otherVars
  ),
  prefersDarkSchemeForChrome: false,
  sevenAxisCode: {
    colorComplexity: 'duotone',
    brightness: 'light',
    saturation: 'vibrant',
    colorHarmony: 'complementary',
    accentUsage: 'prominent',
    cornerStyle: 'sharp',
    elevation: 'dramatic'
  },
  animationConfig: {
    preset: neoBrutalismAnimationPreset,
    rootClassName: 'neo-brutal-theme'
  }
};
