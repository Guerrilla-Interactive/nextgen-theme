import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const sunsetGlowThemeDefinition = {
    rawColors: [
      // Deep Amber: page background
      {
        tokenSpecificName: "Deep Amber",
        description: "Main page background (deep sunset amber)",
        oklch: "oklch(0.15 0.02 45)" as OklchString,
        roles: ["background"],
        category: "shade",
      },
  
      // Golden Sand: primary text color
      {
        tokenSpecificName: "Golden Sand",
        description: "Text for foreground, cards, popovers, sidebars, and secondary/muted contexts",
        oklch: "oklch(0.92 0.03 65)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "sidebar-foreground",
          "secondary-foreground",
          "muted-foreground",
          "sidebar-accent-foreground",
          "input-foreground",
        ],
        category: "shade",
      },
  
      // Rich Chocolate: card & sidebar background
      {
        tokenSpecificName: "Rich Chocolate",
        description: "Card and sidebar background",
        oklch: "oklch(0.22 0.03 50)" as OklchString,
        roles: ["card", "sidebar"],
        category: "shade",
        onColor: "oklch(0.92 0.03 65)" as OklchString, // text on chocolate
      },
  
      // Warm Ochre: popover background
      {
        tokenSpecificName: "Warm Ochre",
        description: "Popover background",
        oklch: "oklch(0.28 0.04 55)" as OklchString,
        roles: ["popover"],
        category: "shade",
        onColor: "oklch(0.92 0.03 65)" as OklchString, // text on ochre
      },
  
      // Sunset Orange: primary actions, focus ring, chart-1, sidebar-primary
      {
        tokenSpecificName: "Sunset Orange",
        description: "Primary action, focus ring, and chart color 1",
        oklch: "oklch(0.75 0.18 35)" as OklchString,
        roles: ["primary", "ring", "chart-1", "sidebar-primary"],
        category: "color",
        onColor: "oklch(0.15 0.02 45)" as OklchString, // dark text on bright orange
      },
  
      // Midnight: primary-foreground, accent-foreground, sidebar-primary-foreground, destructive-foreground
      {
        tokenSpecificName: "Midnight",
        description: "Text on primary, accent, sidebar-primary, and destructive",
        oklch: "oklch(0.12 0.01 0)" as OklchString,
        roles: [
          "primary-foreground",
          "accent-foreground",
          "sidebar-primary-foreground",
          "destructive-foreground",
          "secondary-foreground",
        ],
        category: "shade",
      },
  
      // Neon Lime: secondary actions, chart-2, sidebar-accent, border
      {
        tokenSpecificName: "Neon Lime",
        description: "Secondary action, chart color 2, sidebar accent, and border",
        oklch: "oklch(0.85 0.16 75)" as OklchString,
        roles: ["secondary", "chart-2", "sidebar-accent", "border"],
        category: "color",
        onColor: "oklch(0.15 0.02 45)" as OklchString, // dark text on bright lime
      },
  
      // Dusky Mint: muted surfaces
      {
        tokenSpecificName: "Dusky Mint",
        description: "Muted surfaces",
        oklch: "oklch(0.35 0.04 65)" as OklchString,
        roles: ["muted"],
        category: "shade",
        onColor: "oklch(0.88 0.02 70)" as OklchString, // light text on dusky mint
      },
  
      // Sunset Coral: accent color
      {
        tokenSpecificName: "Sunset Coral",
        description: "Accent color",
        oklch: "oklch(0.68 0.24 25)" as OklchString,
        roles: ["accent", "chart-5"],
        category: "color",
        onColor: "oklch(0.12 0.01 0)" as OklchString, // dark text on bright coral
      },
  
      // Burnished Gold: chart color 3
      {
        tokenSpecificName: "Burnished Gold",
        description: "Chart color 3",
        oklch: "oklch(0.75 0.20 42)" as OklchString,
        roles: ["chart-3"],
        category: "color",
      },
  
      // Citrus Glow: chart color 4
      {
        tokenSpecificName: "Citrus Glow",
        description: "Chart color 4",
        oklch: "oklch(0.90 0.18 95)" as OklchString,
        roles: ["chart-4"],
        category: "color",
      },
  
      // Ember Red: chart color 5
      {
        tokenSpecificName: "Ember Red",
        description: "Chart color 5",
        oklch: "oklch(0.62 0.22 30)" as OklchString,
        roles: ["chart-5"],
        category: "color",
      },
  
      // Molten Rust: destructive color
      {
        tokenSpecificName: "Molten Rust",
        description: "Destructive and warning color",
        oklch: "oklch(0.65 0.25 25)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(0.12 0.01 0)" as OklchString, // dark text on bright rust
      },
  
      // Dark Sage: input background
      {
        tokenSpecificName: "Dark Sage",
        description: "Input field background",
        oklch: "oklch(0.32 0.03 75)" as OklchString,
        roles: ["input"],
        category: "shade",
        onColor: "oklch(0.92 0.03 65)" as OklchString, // light text on dark sage
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors: { primary: "Sunset Orange", primaryForeground: "Midnight" },
      secondaryColors: { secondary: "Neon Lime", secondaryForeground: "Midnight" },
      accentColors: { accent: "Sunset Coral", accentForeground: "Midnight" },
      cardColors: { card: "Rich Chocolate", cardForeground: "Golden Sand" },
      popoverColors: { popover: "Warm Ochre", popoverForeground: "Golden Sand" },
      mutedColors: { muted: "Dusky Mint", mutedForeground: "Golden Sand" },
      destructiveColors: { destructive: "Molten Rust", destructiveForeground: "Midnight" },
      successColors: { success: "Sunset Orange", successForeground: "Midnight" },
      infoColors: { info: "Sunset Coral", infoForeground: "Midnight" },
      warningColors: { warning: "Molten Rust", warningForeground: "Midnight" },
      inputColors: { input: "Dark Sage", inputForeground: "Golden Sand" },
      borderColors: { border: "Neon Lime" },
      ringColors: { ring: "Sunset Orange" },
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
    } as StyleGuide,
  
    otherVars: {
      background: "Deep Amber",
      foreground: "Golden Sand",
      radiusBase: "0.6rem",
  
      // Glowing shadows for sunset effect
      shadowXs: "0px 1px 3px 0px oklch(0.75 0.18 35 / 0.4)",
      shadowSm: "0px 1px 3px 0px oklch(0.75 0.18 35 / 0.4), 0px 1px 2px -1px oklch(0.75 0.18 35 / 0.4)",
      shadowMd: "0px 1px 3px 0px oklch(0.75 0.18 35 / 0.5), 0px 2px 4px -1px oklch(0.75 0.18 35 / 0.5)",
      shadowLg: "0px 1px 3px 0px oklch(0.75 0.18 35 / 0.5), 0px 4px 6px -1px oklch(0.75 0.18 35 / 0.5)",
      shadowXl: "0px 1px 3px 0px oklch(0.75 0.18 35 / 0.6), 0px 8px 10px -1px oklch(0.75 0.18 35 / 0.6)",
      shadow2Xl: "0px 1px 3px 0px oklch(0.75 0.18 35 / 0.8)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      // Chart tokens
      chart1: "Sunset Orange",
      chart2: "Neon Lime",
      chart3: "Burnished Gold",
      chart4: "Citrus Glow",
      chart5: "Ember Red",
  
      // Sidebar tokens
      sidebarBackground: "Rich Chocolate",
      sidebarForeground: "Golden Sand",
      sidebarPrimary: "Sunset Orange",
      sidebarPrimaryForeground: "Midnight",
      sidebarAccent: "Neon Lime",
      sidebarAccentForeground: "Midnight",
      sidebarBorder: "Neon Lime",
      sidebarRing: "Sunset Orange",
  
      // Fonts
      fontSans: "Nunito, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      fontSerif: "Lora, ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
      fontMono: "Fira Code, ui-monospace, SFMono-Regular",
    },
  };
  
  const sunsetGlowBrandColors = generateBrandColors("sunset-glow", sunsetGlowThemeDefinition.rawColors);
  
  export const sunsetGlowBrand: Brand = {
    name: "Sunset Glow",
    businessDetails: {
      name: "Sunset Glow Co",
      industry: "digital_design",
      personality: {
        vintageModern: 55,         // Slightly more vintage with warm sunset tones
        seasonedYouthful: 65,      // More seasoned and sophisticated
        gracefulBold: 75,          // Bold sunset colors with graceful transitions
        playfulElegant: 50,        // Balanced between playful and elegant
        valueSmartLuxurious: 60,   // Luxurious sunset aesthetic
        structuredNatural: 40,     // More artistic than structured
        symbolicRealistic: 50,     // Balanced symbolic representation
      },
    },
    colors: sunsetGlowBrandColors,
    fonts: [
      {
        name: "Quicksand",
        distributor: "Google Fonts",
        description: "Warm, friendly sans-serif perfect for sunset-inspired design.",
        family: "'Quicksand', 'Nunito', system-ui, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "serif"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Comfortaa",
        distributor: "Google Fonts",
        description: "Playful, rounded display font that captures the warmth of sunset glow.",
        family: "'Comfortaa', 'Quicksand', cursive, sans-serif",
        roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title"],
        weights: { light: 300, regular: 400, bold: 700 },
      },
      {
        name: "Source Code Pro",
        distributor: "Google Fonts",
        description: "Clean, readable monospaced font for technical content.",
        family: "'Source Code Pro', 'Fira Code', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: sunsetGlowThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "sunset-glow",
      sunsetGlowBrandColors,
      sunsetGlowThemeDefinition.styleGuide,
      sunsetGlowThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'polychrome',        // Multiple warm sunset colors
      brightness: 'adaptive',              // Dark theme with glowing accents
      saturation: 'vibrant',                // Bright glowing sunset colors
      colorHarmony: 'triadic',              // Orange, lime, coral form a triadic relationship
      accentUsage: 'prominent',             // Multiple accent colors prominently used
      cornerStyle: 'rounded',               // 0.6rem rounded corners
      elevation: 'dramatic',                // Glowing shadows for sunset atmosphere
    },
  }; 