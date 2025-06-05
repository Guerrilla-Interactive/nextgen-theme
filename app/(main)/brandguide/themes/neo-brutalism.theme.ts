import { type Brand, generateBrandColors, type RawColorDefinition, type StyleGuide, createThemeCssVars, OklchString } from '../brand-utils';

const neoBrutalismThemeDefinition = {
  rawColors: [
    // White: used for page, card, and popover backgrounds
    {
      tokenSpecificName: "White",
      description: "White, used for page background, card & popover backgrounds",
      oklchLight: "oklch(1.00 0 0)" as OklchString,
      oklchDark: "oklch(0 0 0)" as OklchString,
      roles: ["background", "card", "popover"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,  // text on white in light mode
      onColorDark: "oklch(1.00 0 0)" as OklchString   // text on black (dark-mode white) 
    },

    // Black: used for main text, card & popover text, secondary text, destructive actions, inputs, borders, and sidebar text/borders
    {
      tokenSpecificName: "Black",
      description: "Black, used for main text, card/popover text, secondary text, destructive actions, inputs, borders, and sidebar text/borders",
      oklchLight: "oklch(0 0 0)" as OklchString,
      oklchDark: "oklch(1.00 0 0)" as OklchString,
      roles: [
        "foreground",
        "card-foreground",
        "popover-foreground",
        "secondary-foreground",
        "destructive",
        "warning",
        "input",
        "border",
        "sidebar-foreground",
        "sidebar-border"
      ],
      category: "shade",
      onColorLight: "oklch(1.00 0 0)" as OklchString, // text on black in light mode
      onColorDark: "oklch(0 0 0)" as OklchString       // text on white (dark-mode black)
    },

    // Light Gray: used for muted surfaces and sidebar backgrounds
    {
      tokenSpecificName: "Light Gray",
      description: "Light Gray, used for muted surfaces and sidebar backgrounds",
      oklchLight: "oklch(0.96 0 0)" as OklchString,
      oklchDark: "oklch(0.32 0 0)" as OklchString,
      roles: ["muted", "nav"],
      category: "shade",
      onColorLight: "oklch(0 0 0)" as OklchString,   // text on light gray in light mode
      onColorDark: "oklch(1.00 0 0)" as OklchString   // text on darker gray in dark mode
    },

    // Dark Gray: used for muted foreground text
    {
      tokenSpecificName: "Dark Gray",
      description: "Dark Gray, used for muted foreground text",
      oklchLight: "oklch(0.32 0 0)" as OklchString,
      oklchDark: "oklch(0.85 0 0)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade"
    },

    // Orange: used for primary actions, focus ring (success), chart-1, and sidebar primary
    {
      tokenSpecificName: "Orange",
      description: "Orange, used for primary actions, focus ring/success, chart color 1, and sidebar primary",
      oklchLight: "oklch(0.65 0.24 26.92)" as OklchString,
      oklchDark: "oklch(0.70 0.19 23.04)" as OklchString,
      roles: ["primary", "ring", "success", "chart-1", "sidebar-primary"],
      category: "color",
      onColorLight: "oklch(1.00 0 0)" as OklchString,  // text on orange in light mode
      onColorDark: "oklch(0 0 0)" as OklchString       // text on darker-orange in dark mode
    },

    // Green: used for secondary actions and chart-2
    {
      tokenSpecificName: "Green",
      description: "Green, used for secondary actions and chart color 2",
      oklchLight: "oklch(0.97 0.21 109.74)" as OklchString,
      oklchDark: "oklch(0.97 0.20 109.61)" as OklchString,
      roles: ["secondary", "chart-2"],
      category: "color",
      onColorLight: "oklch(0 0 0)" as OklchString,    // text on green in light mode
      onColorDark: "oklch(0 0 0)" as OklchString      // text on darker-green in dark mode
    },

    // Purple: used for accent, info, chart-3, and sidebar accent
    {
      tokenSpecificName: "Purple",
      description: "Purple, used for accent color (info), chart color 3, and sidebar accent",
      oklchLight: "oklch(0.56 0.24 260.83)" as OklchString,
      oklchDark: "oklch(0.68 0.18 251.63)" as OklchString,
      roles: ["accent", "info", "chart-3", "sidebar-accent"],
      category: "color",
      onColorLight: "oklch(1.00 0 0)" as OklchString,  // text on purple in light mode
      onColorDark: "oklch(0 0 0)" as OklchString       // text on darker-purple in dark mode
    },

    // Teal: used for chart-4
    {
      tokenSpecificName: "Teal",
      description: "Teal, used for chart color 4",
      oklchLight: "oklch(0.73 0.25 142.50)" as OklchString,
      oklchDark: "oklch(0.74 0.23 142.87)" as OklchString,
      roles: ["chart-4"],
      category: "color"
    },

    // Pink: used for chart-5
    {
      tokenSpecificName: "Pink",
      description: "Pink, used for chart color 5",
      oklchLight: "oklch(0.59 0.27 328.36)" as OklchString,
      oklchDark: "oklch(0.61 0.25 328.13)" as OklchString,
      roles: ["chart-5"],
      category: "color"
    }
  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors:       { primary: "Orange", primaryForeground: "White" },
    secondaryColors:     { secondary: "Green", secondaryForeground: "Black" },
    accentColors:        { accent: "Purple", accentForeground: "White" },
    cardColors:          { card: "White", cardForeground: "Black" },
    popoverColors:       { popover: "White", popoverForeground: "Black" },
    mutedColors:         { muted: "Light Gray", mutedForeground: "Dark Gray" },
    destructiveColors:   { destructive: "Black", destructiveForeground: "White" },
    successColors:       { success: "Orange", successForeground: "White" },
    infoColors:          { info: "Purple", infoForeground: "White" },
    warningColors:       { warning: "Black", warningForeground: "White" },
    inputColors:         { input: "Black", inputForeground: "White" },
    borderColors:        { border: "Black" },
    ringColors:          { ring: "Orange" },
    radius: {
      radiusSm: "0px",  // calc(var(--radius) - 0px)
      radiusMd: "0px",  // var(--radius)
      radiusLg: "0px",  // var(--radius)
      radiusXl: "0px"   // calc(var(--radius) + 0px)
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
    radiusBase: "0px",

    // Shadows (unchanged)
    shadowXs: "4px 4px 0px 0px oklch(0.00 0 0 / 0.50)",
    shadowSm: "4px 4px 0px 0px oklch(0.00 0 0 / 1.00), 4px 1px 2px -1px oklch(0.00 0 0 / 1.00)",
    shadowMd: "4px 4px 0px 0px oklch(0.00 0 0 / 1.00), 4px 2px 4px -1px oklch(0.00 0 0 / 1.00)",
    shadowLg: "4px 4px 0px 0px oklch(0.00 0 0 / 1.00), 4px 4px 6px -1px oklch(0.00 0 0 / 1.00)",
    shadowXl: "4px 4px 0px 0px oklch(0.00 0 0 / 1.00), 4px 8px 10px -1px oklch(0.00 0 0 / 1.00)",
    "shadow-2xs": "4px 4px 0px 0px oklch(0.00 0 0 / 0.50)",
    shadow: "4px 4px 0px 0px oklch(0.00 0 0 / 1.00), 4px 1px 2px -1px oklch(0.00 0 0 / 1.00)",
    "shadow-2xl": "4px 4px 0px 0px oklch(0.00 0 0 / 2.50)",

    borderWidthDefault: "2px",
    borderStyleDefault: "solid",

    // Chart tokens
    chart1: "Orange",
    chart2: "Green",
    chart3: "Purple",
    chart4: "Teal",
    chart5: "Pink",

    // Sidebar tokens
    sidebarBackground: "Light Gray",
    sidebarForeground: "Black",
    sidebarPrimary: "Orange",
    sidebarPrimaryForeground: "White",
    sidebarAccent: "Purple",
    sidebarAccentForeground: "White",
    sidebarBorder: "Black",
    sidebarRing: "Orange"
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
      description: "Default sans-serif font.",
      family: "'DM Sans', sans-serif",
      roles: ["body", "default", "sans"],
      weights: { regular: 400, medium: 500, bold: 700 }
    },
    {
      name: "Space Mono",
      distributor: "Google Fonts",
      description: "Default monospaced font.",
      family: "'Space Mono', monospace",
      roles: ["code", "mono"],
      weights: { regular: 400, bold: 700 }
    },
    {
      name: "UI Serif Fallback",
      distributor: "System",
      description: "Default serif font.",
      family: "ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
      roles: ["serif"],
      weights: { regular: 400, bold: 700 }
    }
  ],
  style: neoBrutalismThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "neo-brutalism",
    neoBrutalismBrandColors,
    neoBrutalismThemeDefinition.styleGuide,
    neoBrutalismThemeDefinition.otherVars
  ),
  prefersDarkSchemeForChrome: false
};
