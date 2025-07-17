import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
import { glowingBorderAnimationPreset } from '../animation-presets';
  
  const razerThemeDefinition = {
    rawColors: [
      // Razer Off-White: Main foreground text (dark mode)
      {
        tokenSpecificName: "Razer Off-White",
        description: "Primary text color for dark gaming theme.",
        oklch: "oklch(0.88 0.01 100)" as OklchString, // Light text for dark mode
        roles: ["foreground"],
        category: "shade",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString, // On Razer Black background
      },
  
      // Razer Black: background, card, popover, sidebar (dark mode)
      {
        tokenSpecificName: "Razer Black",
        description: "Primary dark surface color for gaming theme.",
        oklch: "oklch(0.10 0.00 0.00)" as OklchString, // Dark gaming background
        roles: ["background", "card", "popover", "sidebar"],
        category: "shade",
        onColor: "oklch(0.88 0.01 100)" as OklchString, // Light text
      },
  
      // Razer Green: primary, ring, success, chart-1
      {
        tokenSpecificName: "Razer Green",
        description: "Iconic neon green for primary actions and success",
        oklch: "oklch(0.70 0.24 142.00)" as OklchString, // Razer's signature green
        roles: ["primary", "ring", "success", "chart-1"],
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString, // Razer Black text
      },
  
      // Razer Gray: muted, input, border, secondary
      {
        tokenSpecificName: "Razer Gray",
        description: "Neutral gray for muted surfaces, inputs, and secondary actions",
        oklch: "oklch(0.25 0.01 100)" as OklchString, // Dark gray for dark mode
        roles: ["muted", "input", "border", "secondary"],
        category: "shade",
        onColor: "oklch(0.88 0.01 100)" as OklchString, // Light text
      },
  
      // Razer Red: destructive
      {
        tokenSpecificName: "Razer Red",
        description: "Destructive action color",
        oklch: "oklch(0.57 0.22 28.00)" as OklchString,
        roles: ["destructive"],
        category: "color",
        onColor: "oklch(0.98 0.01 100)" as OklchString, // White text for better contrast
      },
  
      // Razer Yellow: chart-2
      {
        tokenSpecificName: "Razer Yellow",
        description: "Secondary warning accent / Chart color",
        oklch: "oklch(0.85 0.20 95.00)" as OklchString,
        roles: ["chart-2"], 
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Razer Cyan: accent
      {
        tokenSpecificName: "Razer Cyan",
        description: "Informational accent color",
        oklch: "oklch(0.70 0.15 195.00)" as OklchString,
        roles: ["accent"],
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString, // Razer Black text
      },
  
      // Quartz Pink: secondary foreground
      {
        tokenSpecificName: "Quartz Pink",
        description: "Support accent pink for secondary elements",
        oklch: "oklch(0.75 0.10 350.00)" as OklchString,
        roles: ["secondary-foreground"],
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Original Razer White (now a very light surface, if needed)
      {
        tokenSpecificName: "Razer Bright Surface",
        description: "Very light support surface, rarely used",
        oklch: "oklch(0.20 0.00 0.00)" as OklchString, // Darker version for dark mode
        roles: [], 
        category: "shade",
        onColor: "oklch(0.88 0.01 100)" as OklchString,
      },
  
      // Synapse Blue: chart-5
      {
        tokenSpecificName: "Synapse Blue",
        description: "Support accent blue / Chart color",
        oklch: "oklch(0.65 0.18 230.00)" as OklchString,
        roles: ["chart-5"], 
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Gold: chart-3
      {
        tokenSpecificName: "Gold",
        description: "Chart color 3",
        oklch: "oklch(0.78 0.15 90.00)" as OklchString,
        roles: ["chart-3"],
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Silver: chart-4
      {
        tokenSpecificName: "Silver",
        description: "Chart color 4",
        oklch: "oklch(0.80 0.02 240.00)" as OklchString,
        roles: ["chart-4"],
        category: "color",
        onColor: "oklch(0.10 0.00 0.00)" as OklchString,
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors:       { primary: "Razer Green", primaryForeground: "Razer Black" },
      secondaryColors:     { secondary: "Razer Gray", secondaryForeground: "Razer Off-White" },
      accentColors:        { accent: "Razer Cyan", accentForeground: "Razer Black" },
      cardColors:          { card: "Razer Black", cardForeground: "Razer Off-White" },
      popoverColors:       { popover: "Razer Black", popoverForeground: "Razer Off-White" },
      mutedColors:         { muted: "Razer Gray", mutedForeground: "Razer Off-White" },
      destructiveColors:   { destructive: "Razer Red", destructiveForeground: "Razer Off-White" },
      successColors:       { success: "Razer Green", successForeground: "Razer Black" },
      inputColors:         { input: "Razer Gray", inputForeground: "Razer Off-White" },
      borderColors:        { border: "Razer Gray" },
      ringColors:          { ring: "Razer Green" },
      radius: {
        radiusSm:   "2px", // Razer tends to have sharper edges
        radiusMd:   "4px",
        radiusLg:   "6px",
        radiusXl:   "8px",
      },
      spacing: { // Standard spacing is fine
        spacingSm:       "0.5rem",
        spacingMd:       "1rem",
        spacingLg:       "1.5rem",
        spacingXl:       "2rem",
      },
    } as StyleGuide,
  
    otherVars: {
      background: "Razer Black",
      foreground: "Razer Off-White",
      radiusBase: "4px", // Consistent with sharper edges
  
      // Shadows - Razer uses subtle, sharp shadows or glows
      shadowXs:      "0px 1px 2px rgba(0,0,0,0.05)",
      shadowSm:      "0px 2px 4px rgba(0,0,0,0.07)",
      shadowMd:      "0px 3px 6px rgba(0,0,0,0.1)",
      shadowLg:      "0px 5px 10px rgba(0,0,0,0.12)",
      shadowXl:      "0px 7px 14px rgba(0,0,0,0.15)",
      // Green glow effect for brand elements
      shadowBrandSm: "0px 0px 8px rgba(0,255,0,0.3)",
      shadowBrandMd: "0px 0px 12px rgba(0,255,0,0.35)",
      shadowBrandLg: "0px 0px 16px rgba(0,255,0,0.4)",
  
      // Gradient - Classic Razer Green gradient
      gradientFrom:   "var(--razer-green)", // Use token var
      gradientTo:     "color-mix(in oklch, var(--razer-green) 70%, black 30%)",
      gradientAccent: "color-mix(in oklch, var(--razer-green) 85%, white 15%)", // Brighter accent
  
      // Typography - Razer uses modern, slightly condensed sans-serif fonts
      fontDisplay:   "'Titillium Web', 'Exo 2', 'Roboto', sans-serif",
      fontSans:      "'Titillium Web', 'Exo 2', 'Roboto', sans-serif",
      fontMono:      "'Roboto Mono', Consolas, monospace",
      weightNormal:  "400",
      weightMedium:  "500", // Often uses medium for body
      weightSemibold:"600",
      weightBold:    "700",
      leading:       "1.5", // Tighter leading
      tracking:      "0.02em", // Slight tracking
      fontSizeXs:    "0.75rem",
      fontSizeSm:    "0.875rem",
      fontSizeBase:  "0.9375rem", // Base slightly smaller (15px)
      fontSizeLg:    "1.125rem",
      fontSizeXl:    "1.25rem",
  
      // Borders - Often thin or non-existent, relying on contrast
      borderDefaultColor: "var(--razer-gray)", // Uses token
      borderSubtleColor:  "color-mix(in oklch, var(--razer-gray) 50%, transparent 50%)", // Muted border
      borderStrongColor:  "color-mix(in oklch, var(--razer-gray) 70%, black 30%)", // Darker gray for light mode
      borderDefaultWidth: "1px",
      borderThinWidth:    "1px",
      borderThickWidth:   "1px", // Often not very thick
      borderStyle:        "solid",
    },
  };
  
  const razerBrandColors = generateBrandColors("razer", razerThemeDefinition.rawColors);
  
  export const razerBrand: Brand = {
    name: "Razer",
    businessDetails: {
      name: "Razer",
      industry: "gaming",
      personality: {
        vintageModern: 25,
        seasonedYouthful: 80,
        gracefulBold: 90,
        playfulElegant: 30,
        valueSmartLuxurious: 75,
        structuredNatural: 70,
        symbolicRealistic: 65,
      },
    },
    colors: razerBrandColors,
    fonts: [
      {
        name: "Titillium Web",
        distributor: "Google Fonts",
        description: "Clean, modern sans-serif perfect for gaming interfaces.",
        family: "'Titillium Web', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "button-label", "form-input"],
        weights: { light: 300, regular: 400, semibold: 600, bold: 700 },
      },
      {
        name: "Exo 2",
        distributor: "Google Fonts",
        description: "Futuristic display font that matches Razer's tech aesthetic.",
        family: "'Exo 2', 'Titillium Web', sans-serif",
        roles: ["display", "h1", "h2", "h3", "hero-title", "nav-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 900 },
      },
      {
        name: "Roboto Mono",
        distributor: "Google Fonts",
        description: "Technical monospace font for gaming data and code.",
        family: "'Roboto Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: razerThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "razer",
      razerBrandColors,
      razerThemeDefinition.styleGuide,
      razerThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',           // Duotone - green primary with supporting colors
      brightness: 'adaptive',              // Adaptive - optimized for dark gaming aesthetic
      saturation: 'neon',                  // Neon - bright, high-saturation green
      colorHarmony: 'complementary',       // Complementary - green with contrasting accents
      accentUsage: 'prominent',            // Prominent - strong green accent usage
      cornerStyle: 'sharp',                // Sharp - angular, tech-focused design
      elevation: 'layered',                // Layered - gaming UI depth and shadows
    },
    animationConfig: {
      preset: glowingBorderAnimationPreset,
      rootClassName: 'razer-glow-theme'
    }
  };
  