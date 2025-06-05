import {
  type Brand,
  generateBrandColors,
  type RawColorDefinition,
  type StyleGuide,
  createThemeCssVars,
  OklchString,
} from '../brand-utils';

const ikeaThemeDefinition = {
  rawColors: [
    // Core Ikea Palette (Refined for Sophistication)
    {
      tokenSpecificName: "Ikea Deep Blue",
      description: "Iconic Ikea blue, refined for depth and branding.",
      oklchLight: "oklch(0.43 0.16 261)" as OklchString, // Slightly deeper & adjusted hue
      oklchDark: "oklch(0.48 0.155 261)" as OklchString, // Adjusted for dark mode
      roles: ["primary", "ring", "chart-1", "text-brand"],
      category: 'color',
      onColorLight: "oklch(0.98 0.003 90)" as OklchString, // Near White
      onColorDark: "oklch(0.98 0.003 90)" as OklchString,  // Near White
    },
    {
      tokenSpecificName: "Ikea Golden Yellow",
      description: "Iconic Ikea yellow, refined for a golden touch.",
      oklchLight: "oklch(0.89 0.17 95)" as OklchString,  // Deeper, warmer
      oklchDark: "oklch(0.87 0.165 95)" as OklchString, // Adjusted for dark mode
      roles: ["accent", "chart-2"],
      category: 'color',
      onColorLight: "oklch(0.22 0.01 260)" as OklchString, // Darker Gray for text on yellow
      onColorDark: "oklch(0.18 0.01 260)" as OklchString,  // Even darker for contrast
    },
    {
      tokenSpecificName: "Birch White", // Light theme background
      description: "Warm, off-white for backgrounds and large surfaces.",
      oklchLight: "oklch(0.985 0.004 92)" as OklchString, // Very light, slightly warm
      oklchDark: "oklch(0.12 0.003 260)" as OklchString,  // Very dark blue/gray for dark mode bg
      roles: ["background"],
      category: 'shade',
      onColorLight: "oklch(0.20 0.008 260)" as OklchString, // Refined Dark Gray for text
      onColorDark: "oklch(0.96 0.004 90)" as OklchString,   // Refined Light Gray for text
    },
    {
      tokenSpecificName: "Pine Wood White", // Light theme cards
      description: "Clean white for cards, popovers in light mode.",
      oklchLight: "oklch(1 0 0)" as OklchString, // Pure White
      oklchDark: "oklch(0.18 0.004 258)" as OklchString, // Darker surface for dark mode cards
      roles: ["card", "popover"],
      category: 'shade',
      onColorLight: "oklch(0.20 0.008 260)" as OklchString, // Refined Dark Gray
      onColorDark: "oklch(0.96 0.004 90)" as OklchString,   // Refined Light Gray
    },
    {
      tokenSpecificName: "Charcoal Gray", // Primary text color
      description: "Primary text color, sophisticated near-black.",
      oklchLight: "oklch(0.20 0.008 260)" as OklchString, // Dark, slightly desaturated blue-gray
      oklchDark: "oklch(0.96 0.004 90)" as OklchString,   // Very light gray for dark mode text
      roles: ["foreground", "card-foreground", "popover-foreground", "input-foreground", "secondary-foreground", "primary-foreground", "accent-foreground", "destructive-foreground", "success-foreground", "info-foreground", "warning-foreground"],
      category: 'shade',
    },
    {
      tokenSpecificName: "Mist Gray", // Borders, inputs, muted bg
      description: "Light, cool gray for borders, inputs, and muted backgrounds.",
      oklchLight: "oklch(0.93 0.004 258)" as OklchString, // Lighter, cooler
      oklchDark: "oklch(0.25 0.004 255)" as OklchString,  // Darker than dark card bg
      roles: ["border", "input", "muted", "secondary"],
      category: 'shade',
      onColorLight: "oklch(0.20 0.008 260)" as OklchString, // Charcoal Gray
      onColorDark: "oklch(0.96 0.004 90)" as OklchString,   // Light Gray
    },
    {
      tokenSpecificName: "Stone Gray", // Muted text
      description: "Medium gray for muted text and secondary information.",
      oklchLight: "oklch(0.55 0.005 260)" as OklchString, // Softer mid-gray
      oklchDark: "oklch(0.70 0.005 255)" as OklchString,  // Lighter for dark mode muted text
      roles: ["muted-foreground"],
      category: 'shade',
    },
    {
      tokenSpecificName: "Lingonberry Red",
      description: "Red for destructive actions and warnings.",
      oklchLight: "oklch(0.58 0.23 26)" as OklchString, // Adjusted for better feel
      oklchDark: "oklch(0.60 0.22 26)" as OklchString,
      roles: ["destructive", "warning"],
      category: 'color',
      onColorLight: "oklch(0.99 0.002 0)" as OklchString, // Near white
      onColorDark: "oklch(0.99 0.002 0)" as OklchString,
    },
    {
      tokenSpecificName: "Forest Green",
      description: "Green for success states.",
      oklchLight: "oklch(0.53 0.16 150)" as OklchString, // Adjusted
      oklchDark: "oklch(0.58 0.15 150)" as OklchString,
      roles: ["success", "chart-3"],
      category: 'color',
      onColorLight: "oklch(0.99 0.002 0)" as OklchString,
      onColorDark: "oklch(0.99 0.002 0)" as OklchString,
    },
     {
      tokenSpecificName: "Sky Blue Info",
      description: "A calm blue for informational messages.",
      oklchLight: "oklch(0.68 0.11 230)" as OklchString, // Adjusted
      oklchDark: "oklch(0.72 0.10 230)" as OklchString,
      roles: ["info", "chart-4"],
      category: 'color',
      onColorLight: "oklch(0.99 0.002 0)" as OklchString, // Near White for text on info blue light
      onColorDark: "oklch(0.15 0.008 260)" as OklchString, // Dark text for info blue dark
    },
    {
      tokenSpecificName: "Graphite Chart Outline",
      oklchLight: "oklch(0.70 0.005 260)" as OklchString, // Lighter for better visibility
      oklchDark: "oklch(0.45 0.005 255)" as OklchString, // Darker for dark mode
      roles: ["chart-outline"],
      category: 'shade',
    },
     {
      tokenSpecificName: "Default Color",
      description: "Default fallback color.",
      oklchLight: "oklch(0.20 0.008 260)" as OklchString, // Charcoal Gray
      oklchDark: "oklch(0.96 0.004 90)" as OklchString,   // Light Gray
      roles: ["default"],
      category: 'shade',
    },

  ] as RawColorDefinition[],

  styleGuide: {
    primaryColors: { primary: "Ikea Deep Blue", primaryForeground: "Charcoal Gray" }, // Text on blue is Near White, but this is for UI elements where 'primary-foreground' is the direct text color role.
    secondaryColors: { secondary: "Mist Gray", secondaryForeground: "Charcoal Gray" },
    accentColors: { accent: "Ikea Golden Yellow", accentForeground: "Charcoal Gray" },
    cardColors: { card: "Pine Wood White", cardForeground: "Charcoal Gray" },
    popoverColors: { popover: "Pine Wood White", popoverForeground: "Charcoal Gray" },
    mutedColors: { muted: "Mist Gray", mutedForeground: "Stone Gray" },
    destructiveColors: { destructive: "Lingonberry Red", destructiveForeground: "Charcoal Gray" }, // Text on red is Near White
    successColors: { success: "Forest Green", successForeground: "Charcoal Gray" },       // Text on green is Near White
    infoColors: { info: "Sky Blue Info", infoForeground: "Charcoal Gray" },             // Text on info is Near White or dark
    warningColors: { warning: "Lingonberry Red", warningForeground: "Charcoal Gray" },     // Text on red is Near White
    inputColors: { input: "Mist Gray", inputForeground: "Charcoal Gray" },
    borderColors: { border: "Mist Gray" },
    ringColors: { ring: "Ikea Deep Blue" },
    radius: { 
      radiusSm: "3px",
      radiusMd: "5px",
      radiusLg: "7px",
      radiusXl: "10px"
    },
    spacing: { 
      spacingSm: "0.5rem", 
      spacingMd: "1rem",   
      spacingLg: "1.5rem", 
      spacingXl: "2rem"    
    },
  } as StyleGuide,

  otherVars: {
    background: "Birch White",
    foreground: "Charcoal Gray",
    radiusBase: "5px", 

    // Sophisticated, subtly blue-tinted shadows
    shadowXs: "0 1px 3px 0 oklch(0.43 0.16 261 / 0.06)",
    shadowSm: "0 2px 5px 0 oklch(0.43 0.16 261 / 0.07), 0 1px 2px -1px oklch(0.43 0.16 261 / 0.05)",
    shadowMd: "0 3px 8px -1px oklch(0.43 0.16 261 / 0.08), 0 2px 5px -2px oklch(0.43 0.16 261 / 0.06)",
    shadowLg: "0 5px 15px -2px oklch(0.43 0.16 261 / 0.09), 0 3px 9px -3px oklch(0.43 0.16 261 / 0.07)",
    shadowXl: "0 8px 25px -4px oklch(0.43 0.16 261 / 0.10), 0 6px 12px -6px oklch(0.43 0.16 261 / 0.08)",
    
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",

    chart1: "Ikea Deep Blue",
    chart2: "Ikea Golden Yellow",
    chart3: "Forest Green",
    chart4: "Sky Blue Info",
    chart5: "Stone Gray", 
    chartOutline: "Graphite Chart Outline",
  }
};

const ikeaBrandColors = generateBrandColors("ikea", ikeaThemeDefinition.rawColors);

export const ikeaBrand: Brand = {
  name: "Ikea Sophisticated", // Updated name
  businessDetails: {
    name: "IKEA Systems B.V.",
    industry: "retail_furniture_homewares",
    personality: { 
      vintageModern: 25,    
      seasonedYouthful: 55, 
      gracefulBold: 50,     
      playfulElegant: 65,   // More elegant
      valueSmartLuxurious: 30, 
      structuredNatural: 75, 
      symbolicRealistic: 70, 
    },
  },
  colors: ikeaBrandColors,
  fonts: [
    {
      name: "Inter", // Changed from Noto Sans for a more contemporary feel
      distributor: "Google Fonts / RSMS",
      description: "Main sans-serif font. Highly legible, clean, and modern.",
      family: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      roles: ["body", "default", "sans", "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "li", "button-label", "form-input"],
      weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
    {
      name: "Roboto Mono", 
      distributor: "Google Fonts",
      description: "Monospaced font for specific needs, good pairing with Inter.",
      family: "'Roboto Mono', monospace",
      roles: ["code", "mono"],
      weights: { regular: 400, bold: 700 },
    },
  ],
  style: ikeaThemeDefinition.styleGuide,
  themeCssVariables: createThemeCssVars(
    "ikea",
    ikeaBrandColors,
    ikeaThemeDefinition.styleGuide,
    ikeaThemeDefinition.otherVars
  ),
  prefersDarkSchemeForChrome: false, 
}; 