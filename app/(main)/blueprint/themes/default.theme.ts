/*───────────────────────────────────────────────────────────────────────*\
  Default Theme (Based on Vercel Excellence)
  – ultra-high-contrast black / white UI with precision-crafted shadows
  – monochrome-duotone · dark-first · sophisticated · modern-minimal
\*───────────────────────────────────────────────────────────────────────*/

import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
import { modernAnimationPreset } from '../animation-presets';
  
  /*───────────────────────────────────────────────────────────────────────*\
    1. RAW COLOUR TOKENS - Precision-Crafted Palette
  \*───────────────────────────────────────────────────────────────────────*/
  const defaultThemeDefinition = {
    rawColors: [
      /* Core Neutral Architecture */
      {
        tokenSpecificName: "Void Black",
        description: "Signature ultra-deep background, the perfect digital black",
        oklchLight: "oklch(0.99 0 0)" as OklchString,
        oklchDark:  "oklch(0.05 0 0)" as OklchString,
        roles: ["background"],
        category: "shade",
        onColorLight: "oklch(0.05 0 0)" as OklchString,
        onColorDark:  "oklch(0.95 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Carbon Panel",
        description: "Elevated surfaces that float above the void with precision",
        oklchLight: "oklch(1 0 0)" as OklchString,
        oklchDark:  "oklch(0.11 0 0)" as OklchString,
        roles: ["card", "popover"],
        category: "shade",
        onColorLight: "oklch(0.05 0 0)" as OklchString,
        onColorDark:  "oklch(0.95 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Pure Ink",
        description: "Universal text color, absolute contrast for maximum readability",
        oklchLight: "oklch(0.05 0 0)" as OklchString,
        oklchDark:  "oklch(0.95 0 0)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground"
        ],
        category: "shade",
      },
      {
        tokenSpecificName: "Primary Text",
        description: "Text that appears on primary buttons - white on dark buttons, black on light buttons",
        oklchLight: "oklch(0.99 0 0)" as OklchString,
        oklchDark:  "oklch(0.05 0 0)" as OklchString,
        roles: ["primary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Secondary Text", 
        description: "Text that appears on secondary surfaces",
        oklchLight: "oklch(0.05 0 0)" as OklchString,
        oklchDark:  "oklch(0.95 0 0)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Status Text",
        description: "Text that appears on colored status buttons and surfaces",
        oklchLight: "oklch(0.99 0 0)" as OklchString,
        oklchDark:  "oklch(0.05 0 0)" as OklchString,
        roles: ["destructive-foreground", "success-foreground", "info-foreground", "warning-foreground"],
        category: "shade",
      },
      {
        tokenSpecificName: "Ghost Grey",
        description: "Subtle muted text, providing hierarchy without losing readability",
        oklchLight: "oklch(0.55 0 0)" as OklchString,
        oklchDark:  "oklch(0.65 0 0)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },
  
      /* Interactive Elements */
      {
        tokenSpecificName: "Absolute Black",
        description: "Primary actions that demand attention, pure black in light, pure white in dark",
        oklchLight: "oklch(0.05 0 0)" as OklchString,
        oklchDark:  "oklch(0.95 0 0)" as OklchString,
        roles: ["primary", "ring"],
        category: "shade",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Neutral Surface",
        description: "Secondary interactions, perfectly balanced neutral tone",
        oklchLight: "oklch(0.94 0 0)" as OklchString,
        oklchDark:  "oklch(0.18 0 0)" as OklchString,
        roles: ["secondary", "muted", "border", "input"],
        category: "shade",
        onColorLight: "oklch(0.05 0 0)" as OklchString,
        onColorDark:  "oklch(0.95 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Accent Shadow",
        description: "Subtle accent state, barely perceptible but meaningful",
        oklchLight: "oklch(0.97 0 0)" as OklchString,
        oklchDark:  "oklch(0.22 0 0)" as OklchString,
        roles: ["accent"],
        category: "shade",
        onColorLight: "oklch(0.05 0 0)" as OklchString,
        onColorDark:  "oklch(0.95 0 0)" as OklchString,
      },
  
      /* System Status Colors */
      {
        tokenSpecificName: "Success Emerald",
        description: "Clean success state inspired by deployment success",
        oklchLight: "oklch(0.45 0.14 155)" as OklchString,
        oklchDark:  "oklch(0.65 0.13 155)" as OklchString,
        roles: ["success"],
        category: "color",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Info Blue",
        description: "Information state with refined blue tone",
        oklchLight: "oklch(0.45 0.15 240)" as OklchString,
        oklchDark:  "oklch(0.60 0.16 240)" as OklchString,
        roles: ["info"],
        category: "color",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Alert Crimson",
        description: "Destructive actions with precision and clarity",
        oklchLight: "oklch(0.55 0.19 23.03)" as OklchString,
        oklchDark:  "oklch(0.69 0.20 23.91)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
  
      /* Chart Colors - Data Visualization Palette */
      {
        tokenSpecificName: "Chart Primary",
        description: "Primary chart color matching branding",
        oklchLight: "oklch(0.05 0 0)" as OklchString,
        oklchDark:  "oklch(0.95 0 0)" as OklchString,
        roles: ["chart-1"],
        category: "shade",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Violet",
        description: "Sophisticated purple for data differentiation",
        oklchLight: "oklch(0.50 0.22 264.53)" as OklchString,
        oklchDark: "oklch(0.65 0.21 260.84)" as OklchString,
        roles: ["chart-2"],
        category: "color",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Emerald",
        description: "Success-toned green for positive metrics",
        oklchLight: "oklch(0.50 0.12 155)" as OklchString,
        oklchDark: "oklch(0.65 0.13 155)" as OklchString,
        roles: ["chart-3"],
        category: "color",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Slate",
        description: "Neutral chart color for baseline data",
        oklchLight: "oklch(0.65 0 0)" as OklchString,
        oklchDark: "oklch(0.70 0 0)" as OklchString,
        roles: ["chart-4"],
        category: "shade",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Accent",
        description: "Accent chart color for highlighted data points",
        oklchLight: "oklch(0.50 0 0)" as OklchString,
        oklchDark: "oklch(0.85 0 0)" as OklchString,
        roles: ["chart-5"],
        category: "shade",
        onColorLight: "oklch(0.99 0 0)" as OklchString,
        onColorDark:  "oklch(0.05 0 0)" as OklchString,
      },
      {
        tokenSpecificName: "Chart Outline",
        description: "Precise chart outlines and grid lines",
        oklchLight: "oklch(0.85 0 0)" as OklchString,
        oklchDark: "oklch(0.35 0 0)" as OklchString,
        roles: ["chart-outline"],
        category: "shade",
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Absolute Black", primaryForeground: "Primary Text" },
      secondaryColors:     { secondary: "Neutral Surface", secondaryForeground: "Secondary Text" },
      accentColors:        { accent: "Accent Shadow", accentForeground: "Pure Ink" },
      cardColors:          { card: "Carbon Panel", cardForeground: "Pure Ink" },
      popoverColors:       { popover: "Carbon Panel", popoverForeground: "Pure Ink" },
      mutedColors:         { muted: "Neutral Surface", mutedForeground: "Ghost Grey" },
      destructiveColors:   { destructive: "Alert Crimson", destructiveForeground: "Status Text" },
      successColors:       { success: "Success Emerald", successForeground: "Status Text" },
      infoColors:          { info: "Info Blue", infoForeground: "Status Text" },
      warningColors:       { warning: "Alert Crimson", warningForeground: "Status Text" },
      inputColors:         { input: "Neutral Surface", inputForeground: "Pure Ink" },
      borderColors:        { border: "Neutral Surface" },
      ringColors:          { ring: "Absolute Black" },
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

    otherVars: {
      background: "Void Black",
      foreground: "Pure Ink",
      generalTextLightOnDark: "Pure Ink",
      generalTextDarkOnLight: "Void Black",
      radiusBase: "0.5rem",

      // Sidebar mappings - using existing colors from rawColors
      sidebar: "Carbon Panel",
      sidebarForeground: "Pure Ink",
      sidebarPrimary: "Absolute Black",
      sidebarPrimaryForeground: "Primary Text",
      sidebarAccent: "Accent Shadow",
      sidebarAccentForeground: "Pure Ink",
      sidebarBorder: "Neutral Surface",
      sidebarRing: "Absolute Black",

      // Ultra-clean shadow system - invisible unless intentionally heavy
      shadowXs: "0px 0px 0px 0px transparent",
      shadowSm: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.01)",
      shadowMd: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.02)",
      shadowLg: "0px 2px 4px -1px hsla(0, 0%, 0%, 0.06), 0px 1px 2px -1px hsla(0, 0%, 0%, 0.04)",
      shadowXl: "0px 4px 8px -2px hsla(0, 0%, 0%, 0.08), 0px 2px 4px -2px hsla(0, 0%, 0%, 0.06)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      chart1: "Chart Primary",
      chart2: "Chart Violet",
      chart3: "Chart Emerald",
      chart4: "Chart Slate",
      chart5: "Chart Accent",
      chartOutline: "Chart Outline",
    }
  };

  /*───────────────────────────────────────────────────────────────────────*\
    4. BRAND EXPORT - Default Theme
  \*───────────────────────────────────────────────────────────────────────*/
  const defaultBrandColors = generateBrandColors("default", defaultThemeDefinition.rawColors);

export const defaultTheme: Brand = {
    name: "Default",
  businessDetails: {
      name: "Default Theme",
      industry: "developer_platform",
    personality: {
        vintageModern: 15,      // Very modern, cutting-edge
        seasonedYouthful: 85,   // Youthful innovation
        gracefulBold: 90,       // Bold simplicity with grace
        playfulElegant: 25,     // Elegant but not playful
        valueSmartLuxurious: 45, // Smart value over luxury
        structuredNatural: 85,  // Highly structured, systematic
        symbolicRealistic: 25,  // Realistic, practical approach
      },
    },
    colors: defaultBrandColors,
    fonts: [
      {
        name: "Geist",
        distributor: "Vercel",
        description: "Signature sans-serif, engineered for perfect readability and modern web interfaces.",
        family: "'Geist', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        roles: [
          "heading", "body", "display", "sans", "default",
          "h1", "h2", "h3", "h4", "h5", "h6",
          "p", "a", "li", "button-label", "form-input"
        ],
        weights: { 
          thin: 100, 
          light: 300, 
          regular: 400, 
          medium: 500, 
          semibold: 600, 
          bold: 700,
          extrabold: 800
        },
      },
      {
        name: "Geist Mono",
        distributor: "Vercel",
        description: "Precision-crafted monospace font, optimized for code readability and technical content.",
        family: "'Geist Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
        roles: ["code", "mono", "pre"],
        weights: { 
          light: 300, 
          regular: 400, 
          medium: 500,
          semibold: 600,
          bold: 700
        },
      },
    ],
    style: defaultThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "default",
      defaultBrandColors,
      defaultThemeDefinition.styleGuide,
      defaultThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: false, // Default starts in light mode
    sevenAxisCode: {
      colorComplexity: 'monochrome',     // Black, white, and grays
      brightness: 'light',               // Default starts in light mode
      saturation: 'muted',               // Minimal color, mostly grayscale
      colorHarmony: 'single-hue',        // Essentially grayscale with minimal accent
      accentUsage: 'minimal',            // Very clean, minimal accent usage
      cornerStyle: 'slightly-rounded',   // 0.375rem to 1rem radius range
      elevation: 'minimal-shadow',       // Ultra-clean shadow system
    },
    animationConfig: {
      preset: {
        ...modernAnimationPreset,
        button: {
          ...modernAnimationPreset.button,
          active: {
            ...modernAnimationPreset.button.active,
          }
        }
      },
      rootClassName: 'modern-theme'
    },
}; 