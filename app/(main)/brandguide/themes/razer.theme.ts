import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const razerThemeDefinition = {
    rawColors: [
      // Razer Off-White: Main foreground text
      {
        tokenSpecificName: "Razer Off-White",
        description: "Primary off-white text color for dark surfaces.",
        oklchLight: "oklch(0.88 0.01 100)" as OklchString, // Slightly less stark than pure white
        oklchDark:  "oklch(0.88 0.01 100)" as OklchString,
        roles:      ["foreground"],
        category:   "shade",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   // Razer Black for contrast
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Razer Black: background, card, popover, sidebar
      {
        tokenSpecificName: "Razer Black",
        description: "Primary dark surface color",
        oklchLight: "oklch(0.10 0.00 0.00)" as OklchString,
        oklchDark:  "oklch(0.15 0.01 100)" as OklchString, // Made slightly lighter and neutral for dark theme base
        roles:      ["background", "card", "popover", "sidebar"],
        category:   "shade",
        onColorLight: "oklch(0.88 0.01 100)" as OklchString,   // Razer Off-White text
        onColorDark:  "oklch(0.88 0.01 100)" as OklchString,   // Razer Off-White text
      },
  
      // Razer Green: primary, ring, success, chart-1
      {
        tokenSpecificName: "Razer Green",
        description: "Iconic neon green for primary actions and success",
        oklchLight: "oklch(0.70 0.24 142.00)" as OklchString, // Adjusted Chroma for more realistic #00FF00 feel in OKLCH
        oklchDark:  "oklch(0.70 0.24 142.00)" as OklchString,
        roles:      ["primary", "ring", "success", "chart-1"],
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   // Razer Black text
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Razer Gray: muted, input, border, secondary
      {
        tokenSpecificName: "Razer Gray",
        description: "Neutral gray for muted surfaces, inputs, and secondary actions",
        oklchLight: "oklch(0.37 0.00 0.00)" as OklchString,
        oklchDark:  "oklch(0.38 0.00 0.00)" as OklchString,
        roles:      ["muted", "input", "border", "secondary"],
        category:   "shade",
        onColorLight: "oklch(0.88 0.01 100)" as OklchString,  // Razer Off-White text
        onColorDark:  "oklch(0.88 0.01 100)" as OklchString,
      },
  
      // Razer Red: destructive, warning
      {
        tokenSpecificName: "Razer Red",
        description: "Destructive and warning color",
        oklchLight: "oklch(0.57 0.22 28.00)" as OklchString,   // Adjusted for better #FF4136 feel
        oklchDark:  "oklch(0.50 0.19 27.43)" as OklchString,
        roles:      ["destructive", "warning"],
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   // Razer Black text
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Razer Yellow: chart-2
      {
        tokenSpecificName: "Razer Yellow",
        description: "Secondary warning accent / Chart color",
        oklchLight: "oklch(0.85 0.20 95.00)" as OklchString, // Adjusted for better yellow feel
        oklchDark:  "oklch(0.85 0.20 95.00)" as OklchString,
        roles:      ["chart-2"], 
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Razer Cyan: info
      {
        tokenSpecificName: "Razer Cyan",
        description: "Informational accent color",
        oklchLight: "oklch(0.70 0.15 195.00)" as OklchString,  // Adjusted for better cyan feel
        oklchDark:  "oklch(0.70 0.15 195.00)" as OklchString,
        roles:      ["info"],
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   // Razer Black text
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Quartz Pink: accent
      {
        tokenSpecificName: "Quartz Pink",
        description: "Support accent pink",
        oklchLight: "oklch(0.80 0.08 350.00)" as OklchString, // Adjusted for a lighter pink
        oklchDark:  "oklch(0.75 0.10 350.00)" as OklchString,   
        roles:      ["accent"],
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Original Razer White (now a very light surface, if needed)
      {
        tokenSpecificName: "Razer Bright Surface", // Renamed from Razer White
        description: "Very light support surface, rarely used",
        oklchLight: "oklch(0.92 0.00 0.00)" as OklchString,   
        oklchDark:  "oklch(0.95 0.00 0.00)" as OklchString,   
        roles:      [], 
        category:   "shade",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Synapse Blue: chart-5
      {
        tokenSpecificName: "Synapse Blue",
        description: "Support accent blue / Chart color",
        oklchLight: "oklch(0.65 0.18 230.00)" as OklchString,  // Adjusted
        oklchDark:  "oklch(0.65 0.18 230.00)" as OklchString,
        roles:      ["chart-5"], 
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,   
        onColorDark:  "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Gold: chart-3
      {
        tokenSpecificName: "Gold",
        description: "Chart color 3",
        oklchLight: "oklch(0.78 0.15 90.00)" as OklchString, // Adjusted for better gold feel
        oklchDark:  "oklch(0.78 0.15 90.00)" as OklchString,
        roles:      ["chart-3"],
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,
        onColorDark: "oklch(0.10 0.00 0.00)" as OklchString,
      },
  
      // Silver: chart-4
      {
        tokenSpecificName: "Silver",
        description: "Chart color 4",
        oklchLight: "oklch(0.80 0.02 240.00)" as OklchString, // Adjusted for silver/gray feel
        oklchDark:  "oklch(0.80 0.02 240.00)" as OklchString,
        roles:      ["chart-4"],
        category:   "color",
        onColorLight: "oklch(0.10 0.00 0.00)" as OklchString,
        onColorDark: "oklch(0.10 0.00 0.00)" as OklchString,
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors:       { primary: "Razer Green", primaryForeground: "Razer Black" },
      secondaryColors:     { secondary: "Razer Gray", secondaryForeground: "Razer Off-White" },
      accentColors:        { accent: "Quartz Pink", accentForeground: "Razer Black" }, // Or Razer Green if Quartz too soft
      cardColors:          { card: "Razer Black", cardForeground: "Razer Off-White" },
      popoverColors:       { popover: "Razer Black", popoverForeground: "Razer Off-White" },
      mutedColors:         { muted: "Razer Gray", mutedForeground: "Razer Off-White" },
      destructiveColors:   { destructive: "Razer Red", destructiveForeground: "Razer Black" },
      successColors:       { success: "Razer Green", successForeground: "Razer Black" },
      infoColors:          { info: "Razer Cyan", infoForeground: "Razer Black" },
      warningColors:       { warning: "Razer Red", warningForeground: "Razer Black" },
      inputColors:         { input: "Razer Gray", inputForeground: "Razer Off-White" },
      borderColors:        { border: "Razer Gray" }, // Could be a darker Razer Gray variant
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
      shadowXs:      "0px 1px 2px rgba(0,0,0,0.3)",
      shadowSm:      "0px 2px 4px rgba(0,0,0,0.4)",
      shadowMd:      "0px 3px 6px rgba(0,0,0,0.5)",
      shadowLg:      "0px 5px 10px rgba(0,0,0,0.5)",
      shadowXl:      "0px 7px 14px rgba(0,0,0,0.6)",
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
      borderSubtleColor:  "color-mix(in oklch, var(--razer-gray) 50%, black 50%)", // Darker gray
      borderStrongColor:  "color-mix(in oklch, var(--razer-gray) 70%, white 30%)", // Lighter gray
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
      name: "Razer Inc.",
      industry: "gaming_hardware_software_services", // Expanded
      personality: {
        vintageModern: 20,    // More modern
        seasonedYouthful: 80, // Youthful
        gracefulBold: 90,     // Bold
        playfulElegant: 50,   // Balanced
        valueSmartLuxurious: 75, // Premium feel
        structuredNatural: 40, // More structured
        symbolicRealistic: 60,
      },
    },
    colors: razerBrandColors,
    fonts: [
      {
        name: "Rajdhani",
        distributor: "Google Fonts",
        description: "Sharp, tech-inspired sans-serif perfect for gaming interfaces.",
        family: "'Rajdhani', 'Exo 2', system-ui, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "button-label", "form-input", "serif"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Orbitron",
        distributor: "Google Fonts",
        description: "Futuristic display font perfect for Razer's cutting-edge gaming brand.",
        family: "'Orbitron', 'Rajdhani', sans-serif",
        roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
      },
      {
        name: "Fira Code",
        distributor: "Google Fonts",
        description: "Developer-focused monospaced font perfect for gaming tech code.",
        family: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
    ],
    style: razerThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "razer",
      razerBrandColors,
      razerThemeDefinition.styleGuide,
      razerThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: true,
  };
  