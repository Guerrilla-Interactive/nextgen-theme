import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
  
  const cosmicDuskThemeDefinition = {
    rawColors: [
      // Deep Void: page background
      {
        tokenSpecificName: "Deep Void",
        description: "Page background (deep cosmic void)",
        oklch: "oklch(0.12 0.01 280)" as OklchString,
        roles: ["background"],
        category: "shade",
      },
  
      // Stellar Light: primary text color
      {
        tokenSpecificName: "Stellar Light",
        description: "Text color for primary content and card/popover/sidebar text",
        oklch: "oklch(0.93 0.03 273.66)" as OklchString,
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "sidebar-foreground",
          "sidebar-accent-foreground",
          "input-foreground",
        ],
        category: "shade",
      },
  
      // Cosmic Card: card & popover background
      {
        tokenSpecificName: "Cosmic Card",
        description: "Background for cards, popovers, and elevated surfaces",
        oklch: "oklch(0.18 0.02 290)" as OklchString,
        roles: [
          "card",
          "popover",
          "primary-foreground",
          "sidebar-primary-foreground",
        ],
        category: "shade",
        onColor: "oklch(0.93 0.03 273.66)" as OklchString, // text on cosmic card
      },
  
      // Nebula Violet: primary actions, focus ring, chart-1, sidebar-primary
      {
        tokenSpecificName: "Nebula Violet",
        description: "Primary action and focus ring",
        oklch: "oklch(0.79 0.12 295.97)" as OklchString,
        roles: ["primary", "ring", "chart-1", "sidebar-primary"],
        category: "color",
        onColor: "oklch(0.12 0.01 280)" as OklchString, // dark text on bright violet
      },
  
      // Dark Nebula: secondary surfaces, sidebar, border, input
      {
        tokenSpecificName: "Dark Nebula",
        description: "Secondary action, sidebar background, borders, and inputs",
        oklch: "oklch(0.24 0.04 309.13)" as OklchString,
        roles: ["secondary", "sidebar", "border", "input"],
        category: "color",
        onColor: "oklch(0.87 0.01 261.81)" as OklchString, // text on dark nebula
      },
  
      // Starlight: text on secondary
      {
        tokenSpecificName: "Starlight",
        description: "Text on secondary",
        oklch: "oklch(0.87 0.01 261.81)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },
  
      // Shadow Indigo: muted surfaces
      {
        tokenSpecificName: "Shadow Indigo",
        description: "Muted surfaces",
        oklch: "oklch(0.22 0.03 307.25)" as OklchString,
        roles: ["muted"],
        category: "shade",
        onColor: "oklch(0.71 0.02 261.33)" as OklchString, // text on shadow indigo
      },
  
      // Cosmic Slate: text on muted surfaces
      {
        tokenSpecificName: "Cosmic Slate",
        description: "Text on muted surfaces",
        oklch: "oklch(0.71 0.02 261.33)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },
  
      // Galaxy Rose: accent color, sidebar accent
      {
        tokenSpecificName: "Galaxy Rose",
        description: "Accent color and sidebar accent",
        oklch: "oklch(0.55 0.08 320)" as OklchString,
        roles: ["accent", "sidebar-accent"],
        category: "color",
        onColor: "oklch(0.95 0.01 280)" as OklchString, // light text on galaxy rose
      },
  
      // Plasma Red: destructive and warning
      {
        tokenSpecificName: "Plasma Red",
        description: "Destructive actions and warnings",
        oklch: "oklch(0.68 0.15 25)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(0.12 0.01 280)" as OklchString, // dark text on bright red
      },
  
      // Chart Cosmic Violet: chart color 2
      {
        tokenSpecificName: "Chart Cosmic Violet",
        description: "Chart color 2",
        oklch: "oklch(0.71 0.16 293.40)" as OklchString,
        roles: ["chart-2"],
        category: "color",
      },
  
      // Chart Deep Space: chart color 3
      {
        tokenSpecificName: "Chart Deep Space",
        description: "Chart color 3",
        oklch: "oklch(0.61 0.22 292.63)" as OklchString,
        roles: ["chart-3"],
        category: "color",
      },
  
      // Chart Void Blue: chart color 4
      {
        tokenSpecificName: "Chart Void Blue",
        description: "Chart color 4",
        oklch: "oklch(0.54 0.25 293.03)" as OklchString,
        roles: ["chart-4"],
        category: "color",
      },
  
      // Chart Abyss: chart color 5
      {
        tokenSpecificName: "Chart Abyss",
        description: "Chart color 5",
        oklch: "oklch(0.49 0.24 292.70)" as OklchString,
        roles: ["chart-5"],
        category: "color",
      },
    ] as RawColorDefinition[],
  
    styleGuide: {
      primaryColors: { primary: "Nebula Violet", primaryForeground: "Cosmic Card" },
      secondaryColors: { secondary: "Dark Nebula", secondaryForeground: "Starlight" },
      accentColors: { accent: "Galaxy Rose", accentForeground: "Stellar Light" },
      cardColors: { card: "Cosmic Card", cardForeground: "Stellar Light" },
      popoverColors: { popover: "Cosmic Card", popoverForeground: "Stellar Light" },
      mutedColors: { muted: "Shadow Indigo", mutedForeground: "Cosmic Slate" },
      destructiveColors: { destructive: "Plasma Red", destructiveForeground: "Cosmic Card" },
      successColors: { success: "Nebula Violet", successForeground: "Cosmic Card" },
      infoColors: { info: "Galaxy Rose", infoForeground: "Stellar Light" },
      warningColors: { warning: "Plasma Red", warningForeground: "Cosmic Card" },
      inputColors: { input: "Dark Nebula", inputForeground: "Stellar Light" },
      borderColors: { border: "Dark Nebula" },
      ringColors: { ring: "Nebula Violet" },
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
      background: "Deep Void",
      foreground: "Stellar Light",
      radiusBase: "1.5rem",
  
      // Sidebar mappings
      sidebar: "Cosmic Card",
      sidebarForeground: "Stellar Light",
      sidebarPrimary: "Nebula Violet",
      sidebarPrimaryForeground: "Cosmic Card",
      sidebarAccent: "Galaxy Rose",
      sidebarAccentForeground: "Stellar Light",
      sidebarBorder: "Dark Nebula",
      sidebarRing: "Nebula Violet",
  
      // Cosmic glowing shadows
      shadowXs: "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.3)",
      shadowSm: "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.4), 0px 1px 2px -5px oklch(0.79 0.12 295.97 / 0.4)",
      shadowMd: "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.5), 0px 2px 4px -5px oklch(0.79 0.12 295.97 / 0.5)",
      shadowLg: "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.6), 0px 4px 6px -5px oklch(0.79 0.12 295.97 / 0.6)",
      shadowXl: "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.7), 0px 8px 10px -5px oklch(0.79 0.12 295.97 / 0.7)",
      "shadow-2xs": "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.2)",
      "shadow-2xl": "0px 8px 16px -4px oklch(0.79 0.12 295.97 / 0.8)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      // Chart tokens
      chart1: "Nebula Violet",
      chart2: "Chart Cosmic Violet",
      chart3: "Chart Deep Space",
      chart4: "Chart Void Blue",
      chart5: "Chart Abyss",
    },
  };
  
  const cosmicDuskBrandColors = generateBrandColors("cosmic-dusk", cosmicDuskThemeDefinition.rawColors);
  
  export const cosmicDuskBrand: Brand = {
    name: "Cosmic Dusk",
    businessDetails: {
      name: "Cosmic Dusk Co",
      industry: "digital_design",
      personality: {
        vintageModern: 60,         // More vintage with cosmic mystery
        seasonedYouthful: 70,      // More seasoned and mature
        gracefulBold: 80,          // Bold cosmic colors with graceful depth
        playfulElegant: 40,        // More elegant than playful
        valueSmartLuxurious: 85,   // Very luxurious cosmic aesthetic
        structuredNatural: 30,     // More organic and flowing
        symbolicRealistic: 70,     // Highly symbolic of cosmic mystery
      },
    },
    colors: cosmicDuskBrandColors,
    fonts: [
      {
        name: "Manrope",
        distributor: "Google Fonts",
        description: "Modern, geometric sans-serif with ethereal elegance for cosmic interfaces.",
        family: "'Manrope', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "serif"],
        weights: { extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
      },
      {
        name: "Space Grotesk",
        distributor: "Google Fonts",
        description: "Distinctive, futuristic display font perfect for cosmic dusk aesthetics.",
        family: "'Space Grotesk', 'Manrope', sans-serif",
        roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Clean, modern monospaced font for technical content in the cosmic void.",
        family: "'JetBrains Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: cosmicDuskThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "cosmic-dusk",
      cosmicDuskBrandColors,
      cosmicDuskThemeDefinition.styleGuide,
      cosmicDuskThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',            // Duotone - nebula violet and dark nebula with galaxy rose accent
      brightness: 'adaptive',               // Adaptive dark theme with cosmic depth
      saturation: 'medium',                  // Medium - balanced cosmic saturation
      colorHarmony: 'analogous',             // Analogous - violet, indigo, and rose are near each other
      accentUsage: 'balanced',               // Balanced - good use of galaxy rose accents
      cornerStyle: 'very-rounded',           // Very-rounded - 1.5rem base radius
      elevation: 'dramatic',                 // Dramatic - glowing cosmic shadows
    },
  }; 