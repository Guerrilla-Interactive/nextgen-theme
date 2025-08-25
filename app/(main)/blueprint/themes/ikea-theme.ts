/*───────────────────────────────────────────────────────────────────────────────*\
  IKEA Bright Theme – Iconic Blue‑Yellow Duotone Interface
  – bold yet joyful colour pairing inspired by the Swedish home‑furnishing brand
  – light‑first · vibrant accents · minimal shadows · clean rounded corners
\*───────────────────────────────────────────────────────────────────────────────*/

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString, SevenAxisCode } from "./theme-types";
  
  /* Seven‑Axis Personality Interface imported from theme-types */
  
  /*───────────────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS – IKEA Blue & Yellow Palette
  \*───────────────────────────────────────────────────────────────────────────────*/
  const ikeaThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Pure White",
        description: "Clean white background and text on brand surfaces",
        oklch: "oklch(1 0 0)" as OklchString,
        roles: [
          "background",
          "primary-foreground",
          "destructive-foreground",
        ],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Card White",
        description: "Elevated white cards and popovers",
        oklch: "oklch(0.99 0 0)" as OklchString,
        roles: ["card", "popover"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "IKEA Black",
        description: "Primary text colour on light surfaces",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "secondary-foreground",
          "accent-foreground",
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Muted Gray",
        description: "Muted secondary text",
        oklch: "oklch(0.55 0 0)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Light Gray Surface",
        description: "Subtle gray for secondary UI elements",
        oklch: "oklch(0.94 0 0)" as OklchString,
        roles: ["secondary", "muted", "border", "input"],
        category: "shade",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
  
      /* Brand Colours */
      {
        tokenSpecificName: "IKEA Blue",
        description: "Signature IKEA blue for primary actions and focus states",
        oklch: "oklch(0.45 0.20 250)" as OklchString, // ~#0058A3
        roles: ["primary", "ring"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "IKEA Yellow",
        description: "Vibrant yellow accent colour",
        oklch: "oklch(0.90 0.18 102)" as OklchString, // ~#FFDA00
        roles: ["accent"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
  
      /* System Status Colours */
      {
        tokenSpecificName: "Success Green",
        description: "Positive success state",
        oklch: "oklch(0.55 0.16 145)" as OklchString,
        roles: ["success"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Info Blue",
        description: "Informational state",
        oklch: "oklch(0.55 0.18 245)" as OklchString,
        roles: ["info"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Error Red",
        description: "Destructive actions / errors",
        oklch: "oklch(0.55 0.19 29)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
  
      /* Chart Colours */
      {
        tokenSpecificName: "Chart Blue",
        description: "Primary chart colour in IKEA blue",
        oklch: "oklch(0.45 0.20 250)" as OklchString,
        roles: ["chart-1"],
        category: "color",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Yellow",
        description: "Secondary chart colour in IKEA yellow",
        oklch: "oklch(0.90 0.18 102)" as OklchString,
        roles: ["chart-2"],
        category: "color",
        onColor: "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Black",
        description: "Neutral chart colour in black",
        oklch: "oklch(0.05 0 0)" as OklchString,
        roles: ["chart-3"],
        category: "shade",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Gray",
        description: "Supporting neutral chart colour",
        oklch: "oklch(0.65 0 0)" as OklchString,
        roles: ["chart-4"],
        category: "shade",
        onColor: "oklch(1 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Outline",
        description: "Light gray grid / outline",
        oklch: "oklch(0.85 0 0)" as OklchString,
        roles: ["chart-outline"],
        category: "shade",
      },
    ] as RawColorDefinition[],
  
    /*───────────────────────────────────────────────────────────────────────────*\
      2. STYLE GUIDE – Blue Primary, Yellow Accent
    \*───────────────────────────────────────────────────────────────────────────*/
    styleGuide: {
      rootColors: { background: "Pure White", foreground: "IKEA Black" },
      primaryColors:       { primary: "IKEA Blue", primaryForeground: "Pure White" },
      secondaryColors:     { secondary: "Light Gray Surface", secondaryForeground: "IKEA Black" },
      accentColors:        { accent: "IKEA Yellow", accentForeground: "IKEA Black" },
      cardColors:          { card: "Card White", cardForeground: "IKEA Black" },
      popoverColors:       { popover: "Card White", popoverForeground: "IKEA Black" },
      mutedColors:         { muted: "Light Gray Surface", mutedForeground: "Muted Gray" },
      destructiveColors:   { destructive: "Error Red", destructiveForeground: "Pure White" },
      successColors:       { success: "Success Green", successForeground: "Pure White" },
      infoColors:          { info: "Info Blue", infoForeground: "Pure White" },
      warningColors:       { warning: "Error Red", warningForeground: "Pure White" },
      inputColors:         { input: "Light Gray Surface", inputForeground: "IKEA Black" },
      borderColors:        { border: "Light Gray Surface" },
      ringColors:          { ring: "IKEA Blue" },
      sidebarColors: {
        sidebar: "Card White",
        sidebarForeground: "IKEA Black",
        sidebarPrimary: "IKEA Blue",
        sidebarPrimaryForeground: "Pure White",
        sidebarAccent: "IKEA Yellow",
        sidebarAccentForeground: "IKEA Black",
        sidebarBorder: "Light Gray Surface",
        sidebarRing: "IKEA Blue",
      },
      chartColors: {
        chart1: "Chart Blue",
        chart2: "Chart Yellow",
        chart3: "Chart Black",
        chart4: "Chart Gray",
        chart5: "Chart Yellow",
        chartOutline: "Chart Outline",
      },
      radius: {
        radiusSm: "0.25rem",
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
  
    /*───────────────────────────────────────────────────────────────────────────*\
      3. OTHER VARS – Shadows & Sidebar
    \*───────────────────────────────────────────────────────────────────────────*/
    otherVars: {
      radiusBase: "0.5rem",
  
      // Minimal flat shadows (matches other themes)
      shadowXs: "0px 0px 0px 0px transparent",
      shadowSm: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.05)",
      shadowMd: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.08)",
      shadowLg: "0px 2px 4px -1px hsla(0, 0%, 0%, 0.12), 0px 1px 2px -1px hsla(0, 0%, 0%, 0.08)",
      shadowXl: "0px 4px 8px -2px hsla(0, 0%, 0%, 0.16), 0px 2px 4px -2px hsla(0, 0%, 0%, 0.12)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
    },
  };
  
  /*───────────────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT – IKEA Bright
  \*───────────────────────────────────────────────────────────────────────────────*/
  const ikeaBrandColors = generateBrandColors(
    "ikea-bright",
    ikeaThemeDefinition.rawColors,
  );
  
  export const ikeaBrand: Brand = {
    name: "IKEA Bright",
    rating: 92,
    businessDetails: {
      name: "IKEA",
      industry: "furniture_retail",
      personality: {
        vintageModern: 50,      // Timeless yet modern Scandinavian design
        seasonedYouthful: 60,   // Youthful, friendly tone
        gracefulBold: 70,       // Bold colours with graceful utilitarian forms
        playfulElegant: 45,     // Playful accessibility
        valueSmartLuxurious: 70,// Democratic design (high value)
        structuredNatural: 75,  // Clean, structured layouts with natural sensibility
        symbolicRealistic: 40,  // Realistic lifestyle imagery
      },
    },
    colors: ikeaBrandColors,
    fonts: [
      {
        name: "Noto Sans",
        distributor: "Google Fonts",
        description: "Humanist sans-serif used by IKEA globally.",
        family: "'Noto Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        roles: [
          "heading",
          "body",
          "display",
          "sans",
          "default",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "a",
          "li",
          "button-label",
          "form-input",
        ],
        weights: {
          thin: 100,
          light: 300,
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
        },
      },
      {
        name: "Noto Serif",
        distributor: "Google Fonts",
        description: "Serif companion for lifestyle headings and editorial sections.",
        family: "'Noto Serif', 'Noto Sans', serif",
        roles: ["display", "hero-title"],
        weights: {
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          black: 900,
        },
      },
      {
        name: "JetBrains Mono",
        distributor: "JetBrains / Google Fonts",
        description: "Monospaced font for code snippets and technical content.",
        family: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: {
          thin: 100,
          light: 300,
          regular: 400,
          medium: 500,
          bold: 700,
        },
      },
    ],
    style: ikeaThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "ikea-bright",
      ikeaBrandColors,
      ikeaThemeDefinition.styleGuide,
      ikeaThemeDefinition.otherVars,
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',
      brightness: 'light',
      saturation: 'vibrant',
      colorHarmony: 'complementary',
      accentUsage: 'prominent',
      cornerStyle: 'slightly-rounded',
      elevation: 'minimal-shadow',
    } satisfies SevenAxisCode,
  };
  