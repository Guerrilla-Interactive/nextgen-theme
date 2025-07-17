import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';
import { neoBrutalismAnimationPreset } from '../animation-presets';

const darkBrutalismThemeDefinition = {
  rawColors: [
    // Black: used for page, card, and popover backgrounds
    {
      tokenSpecificName: "Black",
      description: "Black, used for page background, card & popover backgrounds",
      oklch: "oklch(0 0 0)" as OklchString,
      roles: ["background", "card", "popover"],
      category: "shade",
      onColor: "oklch(1.0000 0 0)" as OklchString,  // text on black
    },

    // White: used for main text, card & popover text, sidebar text
    {
      tokenSpecificName: "White",
      description: "White, used for main text, card/popover text, and sidebar text",
      oklch: "oklch(1.0000 0 0)" as OklchString,
      roles: [
        "foreground",
        "card-foreground",
        "popover-foreground",
        "sidebar-foreground",
      ],
      category: "shade",
      onColor: "oklch(0 0 0)" as OklchString, // text on white
    },

    // Dark Gray: used for muted surfaces and sidebar backgrounds
    {
      tokenSpecificName: "Dark Gray",
      description: "Dark Gray, used for muted surfaces and sidebar backgrounds",
      oklch: "oklch(0.15 0 0)" as OklchString,
      roles: ["muted", "sidebar"],
      category: "shade",
      onColor: "oklch(1.0000 0 0)" as OklchString,   // text on dark gray
    },

    // Light Gray: used for muted foreground text
    {
      tokenSpecificName: "Light Gray",
      description: "Light Gray, used for muted foreground text",
      oklch: "oklch(0.75 0 0)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade"
    },

    // Hot Red: used for primary actions, focus ring, chart-1, and sidebar primary
    {
      tokenSpecificName: "Hot Red",
      description: "Hot Red, used for primary actions, focus ring, chart color 1, and sidebar primary",
      oklch: "oklch(0.70 0.25 25)" as OklchString,
      roles: ["primary", "ring", "chart-1", "sidebar-primary", "sidebar-ring"],
      category: "color",
      onColor: "oklch(0 0 0)" as OklchString,  // text on hot red
    },

    // Electric Yellow: used for secondary actions and chart-2
    {
      tokenSpecificName: "Electric Yellow",
      description: "Electric Yellow, used for secondary actions and chart color 2",
      oklch: "oklch(0.85 0.20 70)" as OklchString,
      roles: ["secondary", "chart-2"],
      category: "color",
      onColor: "oklch(0 0 0)" as OklchString,    // text on electric yellow
    },

    // Cyber Blue: used for accent, chart-3, and sidebar accent
    {
      tokenSpecificName: "Cyber Blue",
      description: "Cyber Blue, used for accent color, chart color 3, and sidebar accent",
      oklch: "oklch(0.65 0.25 250)" as OklchString,
      roles: ["accent", "chart-3", "sidebar-accent"],
      category: "color",
      onColor: "oklch(1.0000 0 0)" as OklchString,  // text on cyber blue
    },

    // Toxic Green: used for chart-4
    {
      tokenSpecificName: "Toxic Green",
      description: "Toxic Green, used for chart color 4",
      oklch: "oklch(0.75 0.25 140)" as OklchString,
      roles: ["chart-4"],
      category: "color"
    },

    // Neon Purple: used for chart-5
    {
      tokenSpecificName: "Neon Purple",
      description: "Neon Purple, used for chart color 5",
      oklch: "oklch(0.65 0.28 320)" as OklchString,
      roles: ["chart-5"],
      category: "color"
    },

    // White Destructive: used for destructive actions, inputs, borders, and sidebar borders
    {
      tokenSpecificName: "White Destructive",
      description: "White, used for destructive actions, inputs, borders, and sidebar borders",
      oklch: "oklch(1.0000 0 0)" as OklchString,
      roles: ["destructive", "border", "input", "sidebar-border"],
      category: "shade",
      onColor: "oklch(0 0 0)" as OklchString, // text on white
    }
  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Hot Red", primaryForeground: "Black" },
    secondaryColors: { secondary: "Electric Yellow", secondaryForeground: "Black" },
    accentColors: { accent: "Cyber Blue", accentForeground: "White" },
    cardColors: { card: "Black", cardForeground: "White" },
    popoverColors: { popover: "Black", popoverForeground: "White" },
    mutedColors: { muted: "Dark Gray", mutedForeground: "Light Gray" },
    destructiveColors: { destructive: "White Destructive", destructiveForeground: "Black" },
    successColors: { success: "Hot Red", successForeground: "Black" },
    inputColors: { input: "White Destructive", inputForeground: "Black" },
    borderColors: { border: "White Destructive" },
    ringColors: { ring: "Hot Red" },
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
    background: "Black",
    foreground: "White",
    radiusBase: "0.125rem",

    // INVERTED BRUTAL SHADOWS - Sharp white shadows on black background
    "shadow-2xs": "4px 4px 0px 0px hsl(0 0% 100% / 0.25), 4px 1px 2px -1px hsl(0 0% 100% / 0.25)",
    shadowXs: "4px 4px 0px 0px hsl(0 0% 100% / 0.25), 4px 1px 2px -1px hsl(0 0% 100% / 0.25)",
    shadowSm: "4px 4px 0px 0px hsl(0 0% 100% / 0.50), 4px 1px 2px -1px hsl(0 0% 100% / 0.50)",
    shadow: "4px 4px 0px 0px hsl(0 0% 100% / 0.50), 4px 1px 2px -1px hsl(0 0% 100% / 0.50)",
    shadowMd: "4px 4px 0px 0px hsl(0 0% 100% / 0.50), 4px 1px 2px -1px hsl(0 0% 100% / 0.50)",
    shadowLg: "4px 4px 0px 0px hsl(0 0% 100% / 0.50), 4px 1px 2px -1px hsl(0 0% 100% / 0.50)",
    shadowXl: "4px 4px 0px 0px hsl(0 0% 100% / 0.50), 4px 1px 2px -1px hsl(0 0% 100% / 0.50)",
    "shadow-2xl": "4px 4px 0px 0px hsl(0 0% 100% / 0.75), 4px 1px 2px -1px hsl(0 0% 100% / 0.75)",

    borderWidthDefault: "2px",
    borderStyleDefault: "solid",

    // Chart tokens
    chart1: "Hot Red",
    chart2: "Electric Yellow", 
    chart3: "Cyber Blue",
    chart4: "Toxic Green",
    chart5: "Neon Purple",

    // Sidebar tokens
    sidebarBackground: "Dark Gray",
    sidebarForeground: "White",
    sidebarPrimary: "Hot Red",
    sidebarPrimaryForeground: "Black",
    sidebarAccent: "Cyber Blue",
    sidebarAccentForeground: "White",
    sidebarBorder: "White Destructive",
    sidebarRing: "Hot Red"
  }
};

const darkBrutalismBrandColors = generateBrandColors("dark-brutalism", darkBrutalismThemeDefinition.rawColors);

export const darkBrutalismBrand: Brand = {
  name: "Dark Brutalism",
  businessDetails: {
    name: "Dark Brutalism Systems",
    industry: "digital_art_design",
    personality: {
      vintageModern: 10,         // Slightly more modern with dark aesthetic
      seasonedYouthful: 80,      // More mature and aggressive
      gracefulBold: 98,          // Maximum boldness with dark edge
      playfulElegant: 5,         // Raw and unrefined
      valueSmartLuxurious: 15,   // Anti-luxury, underground aesthetic
      structuredNatural: 95,     // Highly structured brutalist approach
      symbolicRealistic: 60      // Strong symbolic representation of rebellion
    }
  },
  colors: darkBrutalismBrandColors,
  fonts: [
    {
      name: "DM Sans",
      distributor: "Google Fonts",
      description: "Clean sans-serif for body text and paragraphs in dark brutalism.",
      family: "'DM Sans', sans-serif",
      roles: ["body", "default", "sans", "p", "a", "li", "display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title", "serif"],
      weights: { regular: 400, medium: 500, bold: 700, extrabold: 800, black: 900 }
    },
    {
      name: "Space Mono",
      distributor: "Google Fonts",
      description: "Monospaced font for code and technical content in the void.",
      family: "'Space Mono', monospace",
      roles: ["code", "mono"],
      weights: { regular: 400, bold: 700 }
    },
  ],
  style: darkBrutalismThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "dark-brutalism",
    darkBrutalismBrandColors,
    darkBrutalismThemeDefinition.styleGuide,
    darkBrutalismThemeDefinition.otherVars
  ),
  sevenAxisCode: {
    colorComplexity: 'polychrome',         // Multiple aggressive neon colors (red, yellow, blue, green, purple)
    brightness: 'adaptive',               // Dark theme with aggressive contrast
    saturation: 'vibrant',                 // Maximum saturation for cyberpunk brutalism
    colorHarmony: 'complementary',         // Harsh contrasting colors for maximum impact
    accentUsage: 'prominent',              // Aggressive use of multiple neon accents
    cornerStyle: 'sharp',                  // Sharp 0.125rem corners for brutal edge
    elevation: 'dramatic',                 // Dramatic inverted shadows for underground feel
  },
  animationConfig: {
    preset: neoBrutalismAnimationPreset,
    rootClassName: 'dark-brutal-theme'
  }
}; 