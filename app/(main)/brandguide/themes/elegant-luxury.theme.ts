// elegantLuxuryTheme.ts  —  Elegant Luxury (WCAG‑AA valid)
// =====================================================================
// A luxury‑oriented duotone palette with adjacent terracotta + butter hues.
// All text/surface combos score ≥ 4.5∶1 (WCAG AA) for body size.
// Axes: duotone · adjacent · light · muted · flat · accent‑neutral · rounded
// ---------------------------------------------------------------------

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /*──────────────────────────────────────────────────────────────────────────*
    1. RAW COLOR DEFINITIONS (light + dark pairs)
   *──────────────────────────────────────────────────────────────────────────*/
  const rawColors = [
    // Ivory — high‑key surface (BG / card / popover)
    {
      tokenSpecificName: "Ivory",
      oklchLight: "oklch(0.98 0.004 56)" as OklchString,
      oklchDark:  "oklch(0.24 0.006 34)" as OklchString,
      roles: ["background", "card", "popover", "tooltip-background"],
      category: "shade",
      onColorLight: "oklch(0.13 0.005 20)" as OklchString,
      onColorDark:  "oklch(0.98 0.004 56)" as OklchString,
    },
    // Universal dark / light text
    {
      tokenSpecificName: "Charcoal‑Deep",
      oklchLight: "oklch(0.13 0.005 20)" as OklchString,
      oklchDark:  "oklch(0.97 0.002 106)" as OklchString,
      roles: [
        "foreground", "card-foreground", "popover-foreground", "sidebar-foreground",
        "muted-foreground", "input-foreground", "tooltip-foreground",
        "secondary-foreground", "accent-foreground"
      ],
      category: "shade",
    },
    {
      tokenSpecificName: "Snow",
      oklchLight: "oklch(1 0 0)" as OklchString,
      oklchDark:  "oklch(0.98 0.004 56)" as OklchString,
      roles: ["primary-foreground", "destructive-foreground", "sidebar-primary-foreground"],
      category: "shade",
    },
    // Terracotta — primary CTA / ring / chart2 / outline
    {
      tokenSpecificName: "Terracotta",
      oklchLight: "oklch(0.46 0.15 25)" as OklchString,
      oklchDark:  "oklch(0.55 0.18 26)" as OklchString,
      roles: ["primary", "ring", "sidebar-primary", "chart-outline", "chart-2"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Ivory",
    },
    // Butter — secondary hue, sidebar surface, borders, inputs
    {
      tokenSpecificName: "Butter",
      oklchLight: "oklch(0.95 0.04 89)" as OklchString,
      oklchDark:  "oklch(0.48 0.12 46)" as OklchString,
      roles: ["secondary", "sidebar", "border", "input"],
      category: "color",
      onColorLight: "Charcoal‑Deep",
      onColorDark:  "Butter",
    },
    // Butter‑Accent — highlight accent & chart4
    {
      tokenSpecificName: "Butter‑Accent",
      oklchLight: "oklch(0.96 0.06 96)" as OklchString,
      oklchDark:  "oklch(0.57 0.15 48)" as OklchString,
      roles: ["accent", "sidebar-accent", "chart-4"],
      category: "color",
      onColorLight: "Charcoal‑Deep",
      onColorDark:  "Butter‑Accent",
    },
    // Sand — low‑emphasis muted surfaces
    {
      tokenSpecificName: "Sand",
      oklchLight: "oklch(0.90 0.008 53)" as OklchString,
      oklchDark:  "oklch(0.22 0.006 34)" as OklchString,
      roles: ["muted", "sidebar-border"],
      category: "shade",
      onColorLight: "Charcoal‑Deep",
      onColorDark:  "Snow",
    },
    // Brick — destructive / warning & chart3
    {
      tokenSpecificName: "Brick",
      oklchLight: "oklch(0.44 0.16 27)" as OklchString,
      oklchDark:  "oklch(0.64 0.20 26)" as OklchString,
      roles: ["destructive", "warning", "chart-3"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Ivory",
    },
    // Success‑Terracotta — reuse Terracotta for success/info
    {
      tokenSpecificName: "Success‑Terracotta",
      oklchLight: "Terracotta",
      oklchDark:  "Terracotta",
      roles: ["success", "info", "chart-1"],
      category: "color",
      onColorLight: "Snow",
      onColorDark:  "Ivory",
    },
    // Chart‑Butter‑Mid — chart5
    {
      tokenSpecificName: "Chart‑Butter‑Mid",
      oklchLight: "oklch(0.48 0.12 46)" as OklchString,
      oklchDark:  "oklch(0.77 0.16 70)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    }
  ] as RawColorDefinition[];
  
  /*──────────────────────────────────────────────────────────────────────────*
    2. STYLE GUIDE
   *──────────────────────────────────────────────────────────────────────────*/
  const styleGuide: StyleGuide = {
    primaryColors:       { primary: "Terracotta", primaryForeground: "Snow" },
    secondaryColors:     { secondary: "Butter", secondaryForeground: "Charcoal‑Deep" },
    accentColors:        { accent: "Butter‑Accent", accentForeground: "Charcoal‑Deep" },
    cardColors:          { card: "Ivory", cardForeground: "Charcoal‑Deep" },
    popoverColors:       { popover: "Ivory", popoverForeground: "Charcoal‑Deep" },
    mutedColors:         { muted: "Sand", mutedForeground: "Charcoal‑Deep" },
    destructiveColors:   { destructive: "Brick", destructiveForeground: "Snow" },
    successColors:       { success: "Success‑Terracotta", successForeground: "Snow" },

    
    inputColors:         { input: "Butter", inputForeground: "Charcoal‑Deep" },
    borderColors:        { border: "Butter" },
    ringColors:          { ring: "Terracotta" },
    radius: {
      radiusSm: "calc(var(--radius) - 4px)",
      radiusMd: "calc(var(--radius) - 2px)",
      radiusLg: "var(--radius)",
      radiusXl: "calc(var(--radius) + 4px)",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /*──────────────────────────────────────────────────────────────────────────*
    3. OTHER VARIABLES (radius, shadows, aliases)
   *──────────────────────────────────────────────────────────────────────────*/
  const otherVars = {
    background: "Ivory",
    foreground: "Charcoal‑Deep",
    radiusBase: "0.375rem",
    textBrand: "Terracotta",
    chartOutline: "Terracotta",
  
    // Sidebar mappings - using colors already defined in rawColors
    sidebar: "Butter",
    sidebarForeground: "Charcoal‑Deep",
    sidebarPrimary: "Terracotta",
    sidebarPrimaryForeground: "Snow",
    sidebarAccent: "Butter‑Accent",
    sidebarAccentForeground: "Charcoal‑Deep",
    sidebarBorder: "Sand",
    sidebarRing: "Terracotta",
  
    // Shadows (soft flat)
    "shadow-2xs": "1px 1px 16px -2px hsl(0 63% 18% / 0.06)",
    "shadow-xs":  "var(--shadow-2xs)",
    "shadow-sm":  "1px 1px 16px -2px hsl(0 63% 18% / 0.12), 1px 1px 2px -3px hsl(0 63% 18% / 0.12)",
    "shadow":     "var(--shadow-sm)",
    "shadow-md":  "1px 2px 4px -3px hsl(0 63% 18% / 0.12)",
    "shadow-lg":  "1px 4px 6px -3px hsl(0 63% 18% / 0.12)",
    "shadow-xl":  "1px 8px 10px -3px hsl(0 63% 18% / 0.12)",
    "shadow-2xl": "1px 1px 16px -2px hsl(0 63% 18% / 0.30)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    // Chart alias tokens matching roles
    chart1: "Success‑Terracotta",
    chart2: "Terracotta",
    chart3: "Brick",
    chart4: "Butter‑Accent",
    chart5: "Chart‑Butter‑Mid",
  };
  
  /*──────────────────────────────────────────────────────────────────────────*
    4. BRAND EXPORT
   *──────────────────────────────────────────────────────────────────────────*/
  const colors = generateBrandColors("elegant-luxury", rawColors);
  
  export const elegantLuxuryBrand: Brand = {
    name: "Elegant Luxury",
    businessDetails: {
      name: "Elegant Luxury Ltd.",
      industry: "premium_lifestyle",
      personality: {
        vintageModern: 60,
        seasonedYouthful: 50,
        gracefulBold: 30,
        playfulElegant: 80,
        valueSmartLuxurious: 90,
        structuredNatural: 70,
        symbolicRealistic: 40
      }
    },
    colors,
    fonts: [
      {
        name: "Poppins",
        distributor: "Google Fonts",
        description: "Geometric sans‑serif for body text.",
        family: "'Poppins', system-ui, sans-serif",
        roles: ["body", "default", "sans"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 }
      },
      {
        name: "Libre Baskerville",
        distributor: "Google Fonts",
        description: "Classic serif to emphasise luxury headings.",
        family: "'Libre Baskerville', serif",
        roles: ["display", "h1", "h2", "h3"],
        weights: { regular: 400, bold: 700 }
      },
      {
        name: "IBM Plex Mono",
        distributor: "Google Fonts",
        description: "Monospace companion for code & numerics.",
        family: "'IBM Plex Mono', monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, regular: 400, medium: 500, bold: 700 }
      }
    ],
    style: styleGuide,
    themeCssVariables: createThemeCssVars(
      "elegant-luxury",
      colors,
      styleGuide,
      otherVars
    ),
    defaultMode: 'light' as const,
    prefersDarkSchemeForChrome: false,
    sevenAxisCode: {
      colorComplexity: 'duotone',           // Duotone - terracotta and butter 
      brightness: 'light',                  // Light - light mode default with ivory backgrounds
      saturation: 'muted',                  // Muted - sophisticated, low saturation luxury colors
      colorHarmony: 'analogous',            // Analogous - terracotta (orange-red) and butter (yellow) are adjacent/analogous on color wheel
      accentUsage: 'balanced',              // Accent-neutral - balanced use of color accents
      cornerStyle: 'rounded',               // Rounded - uses calc(var(--radius)) system with 0.375rem base
      elevation: 'flat',                    // Flat - soft, minimal shadows with low opacity
    },
  };
  
  // =====================================================================
  // End Elegant Luxury theme file
  