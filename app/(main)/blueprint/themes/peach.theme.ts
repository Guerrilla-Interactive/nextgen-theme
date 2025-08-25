// peachParfaitTheme.ts  –  M1‑L‑Ps‑G1‑Ax‑RdF
//---------------------------------------------------------
// Theme spec generated from the 7‑axis code:
// Monochrome · Light · Pastel · Single‑hue Gradient · Accent‑neutral · Rounded‑Flat
// Uses a single peach hue (OKLCH hue ≈ 40°) plus neutral grays.

import { generateBrandColors, createThemeCssVars } from "../brand-utils";
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from "./theme-types";
  
  /* --------------------------------------------------------
     1. RAW COLOR TOKENS (Light mode theme)
     ----------------------------------------------------- */
  const peachParfaitRawColors = [
    // Vanilla‑Cream — overall page background (very light warm gray)
    {
      tokenSpecificName: "Vanilla Cream",
      description: "Page background",
      oklch: "oklch(0.98 0.01 100)" as OklchString,
      roles: ["background"],
      category: "shade",
    },
  
    // Charcoal — main foreground text
    {
      tokenSpecificName: "Charcoal",
      description: "Primary text color for body content",
      oklch: "oklch(0.30 0.01 255)" as OklchString,
      roles: [
        "foreground",
        "card-foreground",
        "popover-foreground",
        "input-foreground",
        "sidebar-foreground",
        "sidebar-accent-foreground",
      ],
      category: "shade",
    },
  
    // White — card & popover surfaces, plus text on peach
    {
      tokenSpecificName: "White",
      description: "Surface for cards / popovers & on‑color text",
      oklch: "oklch(1 0 0)" as OklchString,
      roles: ["card", "popover", "primary-foreground", "sidebar-primary-foreground"],
      category: "shade",
      onColor: "oklch(0.30 0.01 255)" as OklchString,
    },
  
    // Peach — the single chromatic accent (primary / accent / ring)
    {
      tokenSpecificName: "Peach",
      description: "Primary actions, accent surfaces, focus ring",
      oklch: "oklch(0.90 0.05 40)" as OklchString,   // pastel peach
      roles: ["primary", "accent", "ring", "chart-1", "sidebar-primary", "sidebar-accent"],
      category: "color",
      onColor: "oklch(1 0 0)" as OklchString,
    },
  
    // Light Peach — muted surfaces (chips, subtle UI)
    {
      tokenSpecificName: "Light Peach",
      description: "Muted backgrounds / subtle fills",
      oklch: "oklch(0.96 0.03 40)" as OklchString,
      roles: ["muted"],
      category: "shade",
      onColor: "oklch(0.40 0.01 255)" as OklchString,
    },
  
    // Slate — text on muted
    {
      tokenSpecificName: "Slate",
      description: "Text on muted surfaces",
      oklch: "oklch(0.40 0.01 255)" as OklchString,
      roles: ["muted-foreground"],
      category: "shade",
    },
  
    // Scarlet — destructive actions only
    {
      tokenSpecificName: "Scarlet",
      description: "Destructive actions",
      oklch: "oklch(0.78 0.11 25)" as OklchString,
      roles: ["destructive"],
      category: "color",
      onColor: "oklch(1 0 0)" as OklchString,
    },
  
    // Extra chart hues (monochrome ramp)
    {
      tokenSpecificName: "Peach 2",
      description: "Chart color 2 (darker peach)",
      oklch: "oklch(0.80 0.06 40)" as OklchString,
      roles: ["chart-2"],
      category: "color",
    },
    {
      tokenSpecificName: "Peach 3",
      description: "Chart color 3 (medium peach)",
      oklch: "oklch(0.70 0.07 40)" as OklchString,
      roles: ["chart-3"],
      category: "color",
    },
    {
      tokenSpecificName: "Peach 4",
      description: "Chart color 4 (deep peach)",
      oklch: "oklch(0.60 0.08 40)" as OklchString,
      roles: ["chart-4"],
      category: "color",
    },
    {
      tokenSpecificName: "Peach 5",
      description: "Chart color 5 (rich peach)",
      oklch: "oklch(0.50 0.10 40)" as OklchString,
      roles: ["chart-5"],
      category: "color",
    },
  ] as RawColorDefinition[];
  
  /* --------------------------------------------------------
     2. STYLE GUIDE (rounded‑flat geometry per RdF)
     ----------------------------------------------------- */
  const peachParfaitStyleGuide: StyleGuide = {
    primaryColors:       { primary: "Peach", primaryForeground: "White" },
    secondaryColors:     { secondary: "Light Peach", secondaryForeground: "Slate" },
    accentColors:        { accent: "Peach", accentForeground: "White" },
    cardColors:          { card: "White", cardForeground: "Charcoal" },
    popoverColors:       { popover: "White", popoverForeground: "Charcoal" },
    mutedColors:         { muted: "Light Peach", mutedForeground: "Slate" },
    destructiveColors:   { destructive: "Scarlet", destructiveForeground: "White" },
    successColors:       { success: "Peach", successForeground: "White" },
    inputColors:         { input: "Light Peach", inputForeground: "Charcoal" },
    borderColors:        { border: "Light Peach" },
    ringColors:          { ring: "Peach" },
    radius: {
      radiusSm: "0.25rem",   // slightly softer than squares
      radiusMd: "0.5rem",
      radiusLg: "0.75rem",   // matches RdF tag (rounded-flat)
      radiusXl: "1rem",
    },
    spacing: {
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "1.5rem",
      spacingXl: "2rem",
    },
  };
  
  /* --------------------------------------------------------
     3. OTHER DESIGN‑TOKEN VARS
     ----------------------------------------------------- */
  const peachParfaitOtherVars = {
    background: "Vanilla Cream",
    foreground: "Charcoal",
    radiusBase: "0.75rem",
  
    // Sidebar mappings - using existing colors from rawColors
    sidebar: "White",
    sidebarForeground: "Charcoal",
    sidebarPrimary: "Peach",
    sidebarPrimaryForeground: "White",
    sidebarAccent: "Peach",
    sidebarAccentForeground: "White",
    sidebarBorder: "Light Peach",
    sidebarRing: "Peach",
  
    // Single‑hue gradient example (G1) — used on hero / banner
    heroGradient: "linear-gradient(135deg, oklch(0.98 0.01 100) 0%, oklch(0.90 0.05 40) 100%)",
  
    // Shadows (flat → minimal)
    shadowXs: "0 1px 2px 0 oklch(0 0 0 / 0.04)",
    shadowSm: "0 2px 4px -2px oklch(0 0 0 / 0.06)",
    shadowMd: "0 4px 8px -4px oklch(0 0 0 / 0.08)",
    shadowLg: "0 6px 12px -6px oklch(0 0 0 / 0.10)",
    shadowXl: "0 8px 16px -8px oklch(0 0 0 / 0.12)",
  
    borderWidthDefault: "1px",
    borderStyleDefault: "solid",
  
    // Chart tokens map
    chart1: "Peach",
    chart2: "Peach 2",
    chart3: "Peach 3",
    chart4: "Peach 4",
    chart5: "Peach 5",
  };
  
  /* --------------------------------------------------------
     4. BRAND OBJECT
     ----------------------------------------------------- */
  const peachParfaitColors = generateBrandColors("peach-parfait", peachParfaitRawColors);
  
  export const peachParfaitBrand: Brand = {
    rating: 90,
    name: "Peach Parfait",
    businessDetails: {
      name: "Peach Parfait Studio",
      industry: "web_design",
      personality: {
        vintageModern: 30,
        seasonedYouthful: 40,
        gracefulBold: 20,
        playfulElegant: 60,
        valueSmartLuxurious: 50,
        structuredNatural: 40,
        symbolicRealistic: 35,
      },
    },
    colors: peachParfaitColors,
    fonts: [
      {
        name: "Inter",
        distributor: "Google Fonts",
        description: "Neutral, highly legible sans-serif for body text.",
        family: "'Inter', system-ui, -apple-system, sans-serif",
        roles: [
          "body", "default", "sans", "p", "a", "li",
          "button", "button-label",
          "input", "form-input",
          "label",
          "serif-body", "serif",
          "h4", "h5", "h6"
        ],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Playfair Display",
        distributor: "Google Fonts",
        description: "Elegant serif for headings, pairs well with pastel palettes.",
        family: "'Playfair Display', 'Inter', serif",
        roles: ["display", "h1", "h2", "h3", "hero-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 900 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Monospaced font for code snippets.",
        family: "'JetBrains Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: peachParfaitStyleGuide,
    themeCssVariables: createThemeCssVars(
      "peach-parfait",
      peachParfaitColors,
      peachParfaitStyleGuide,
      peachParfaitOtherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'monochrome',     // Monochrome - single peach hue plus neutrals
      brightness: 'light',               // Light - defaults to light mode
      saturation: 'pastel',              // Pastel - soft, muted peach tones
      colorHarmony: 'single-hue',        // Single-hue gradient - one main hue (peach)
      accentUsage: 'subtle',             // Accent-neutral - subtle accent usage
      cornerStyle: 'rounded',            // Rounded-flat - 0.75rem base radius
      elevation: 'minimal-shadow',       // Flat - minimal shadow system
    },
  };
  