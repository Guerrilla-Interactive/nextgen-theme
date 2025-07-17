import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';
import { neoBrutalismAnimationPreset } from '../animation-presets';

const neoBrutalismThemeDefinition = {
  rawColors: [
    // White: used for page, card, and popover backgrounds
    {
      tokenSpecificName: "White",
      description: "White, used for page background, card & popover backgrounds",
      oklch: "oklch(1.0000 0 0)" as OklchString,
      roles: ["background", "card", "popover"],
      category: "shade",
      onColor: "oklch(0 0 0)" as OklchString,  // text on white
    },

    // Black: used for main text, card & popover text, destructive actions, inputs, borders, and sidebar text/borders
    {
      tokenSpecificName: "Black",
      description: "Black, used for main text, card/popover text, destructive actions, inputs, borders, and sidebar text/borders",
      oklch: "oklch(0 0 0)" as OklchString,
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
      onColor: "oklch(1.0000 0 0)" as OklchString, // text on black
    },

    // Light Gray: used for muted surfaces and sidebar backgrounds
    {
      tokenSpecificName: "Light Gray",
      description: "Light Gray, used for muted surfaces and sidebar backgrounds",
      oklch: "oklch(0.9551 0 0)" as OklchString,
      roles: ["muted", "sidebar"],
      category: "shade",
      onColor: "oklch(0 0 0)" as OklchString,   // text on light gray
    },

    // Dark Gray: used for muted foreground text
    {
      tokenSpecificName: "Dark Gray",
      description: "Dark Gray, used for muted foreground text",
      oklch: "oklch(0.3211 0 0)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade"
    },

    // Red Primary: used for primary actions, focus ring, chart-1, and sidebar primary
    {
      tokenSpecificName: "Red Primary",
      description: "Red Primary, used for primary actions, focus ring, chart color 1, and sidebar primary",
      oklch: "oklch(0.6670 0.2428 359.7106)" as OklchString,
      roles: ["primary", "ring", "chart-1", "sidebar-primary", "sidebar-ring"],
      category: "color",
      onColor: "oklch(1.0000 0 0)" as OklchString,  // text on red
    },

    // Yellow Secondary: used for secondary actions and chart-2
    {
      tokenSpecificName: "Yellow Secondary",
      description: "Yellow Secondary, used for secondary actions and chart color 2",
      oklch: "oklch(0.7505 0.1791 58.2827)" as OklchString,
      roles: ["secondary", "chart-2"],
      category: "color",
      onColor: "oklch(0 0 0)" as OklchString,    // text on yellow
    },

    // Blue Accent: used for accent, chart-3, and sidebar accent
    {
      tokenSpecificName: "Blue Accent",
      description: "Blue Accent, used for accent color, chart color 3, and sidebar accent",
      oklch: "oklch(0.8160 0.1453 216.5023)" as OklchString,
      roles: ["accent", "chart-3", "sidebar-accent"],
      category: "color",
      onColor: "oklch(1.0000 0 0)" as OklchString,  // text on blue
    },

    // Green Chart: used for chart-4
    {
      tokenSpecificName: "Green Chart",
      description: "Green, used for chart color 4",
      oklch: "oklch(0.7492 0.2275 137.1080)" as OklchString,
      roles: ["chart-4"],
      category: "color"
    },

    // Purple Chart: used for chart-5
    {
      tokenSpecificName: "Purple Chart",
      description: "Purple, used for chart color 5",
      oklch: "oklch(0.4614 0.2486 298.2946)" as OklchString,
      roles: ["chart-5"],
      category: "color"
    }
  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Red Primary", primaryForeground: "White" },
    secondaryColors: { secondary: "Yellow Secondary", secondaryForeground: "Black" },
    accentColors: { accent: "Blue Accent", accentForeground: "White" },
    cardColors: { card: "White", cardForeground: "Black" },
    popoverColors: { popover: "White", popoverForeground: "Black" },
    mutedColors: { muted: "Light Gray", mutedForeground: "Dark Gray" },
    destructiveColors: { destructive: "Black", destructiveForeground: "White" },
    successColors: { success: "Red Primary", successForeground: "White" },
    inputColors: { input: "Black", inputForeground: "White" },
    borderColors: { border: "Black" },
    ringColors: { ring: "Red Primary" },
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
  sevenAxisCode: {
    colorComplexity: 'polychrome',         // Multiple bold colors (red, yellow, blue, green, purple)
    brightness: 'light',                   // Light theme with white backgrounds
    saturation: 'vibrant',                 // High saturation brutalist colors
    colorHarmony: 'complementary',         // Bold contrasting colors
    accentUsage: 'prominent',              // Prominent use of multiple accent colors
    cornerStyle: 'sharp',                  // Sharp 0.125rem corners for brutalist feel
    elevation: 'dramatic',                 // Dramatic hard shadows for brutalist effect
  },
  animationConfig: {
    preset: neoBrutalismAnimationPreset,
    rootClassName: 'neo-brutal-theme'
  }
};
