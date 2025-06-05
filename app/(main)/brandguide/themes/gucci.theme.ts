import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';

  const gucciThemeDefinition = {
    rawColors: [
      // Cream: page background
      {
        tokenSpecificName: "Cream",
        description: "Main page background",
        oklchLight: "oklch(0.98 0.012 90.0)" as OklchString, // Softer, warmer white
        oklchDark:  "oklch(0.15 0.01 90.0)" as OklchString, // Dark, desaturated warm
        roles:      ["background"],
        category:   "shade",
      },

      // Gucci Black: main text, sidebar text
      {
        tokenSpecificName: "Gucci Black",
        description: "Text for foreground, sidebar",
        oklchLight: "oklch(0.12 0.005 0)" as OklchString,     // Deep black
        oklchDark:  "oklch(0.96 0.005 0)" as OklchString,    // Off-white for dark mode text
        roles:      ["foreground", "sidebar-foreground", "input-foreground"],
        category:   "shade",
      },

      // Off-White: card background
      {
        tokenSpecificName: "Off-White",
        description: "Card background",
        oklchLight: "oklch(0.96 0.008 90.0)" as OklchString, // Slightly off-white
        oklchDark:  "oklch(0.20 0.01 90.0)" as OklchString,  // Darker cream for cards
        roles:      ["card"],
        category:   "shade",
        onColorLight: "oklch(0.12 0.005 0)" as OklchString,     // Gucci Black on card light
        onColorDark:  "oklch(0.96 0.005 0)" as OklchString,    // Off-white on card dark
      },

      // Dark Gray: card & accent foreground
      {
        tokenSpecificName: "Dark Gray",
        description: "Text on card and accent",
        oklchLight: "oklch(0.25 0.005 0)" as OklchString,    // Darker gray for less emphasis
        oklchDark:  "oklch(0.85 0.005 0)" as OklchString,   // Lighter gray for dark mode
        roles:      ["card-foreground", "accent-foreground"],
        category:   "shade",
      },

      // Light Cream: popover background
      {
        tokenSpecificName: "Light Cream",
        description: "Popover background",
        oklchLight: "oklch(0.97 0.01 85.0)" as OklchString, // Very light cream
        oklchDark:  "oklch(0.18 0.01 85.0)" as OklchString, // Dark cream for popovers
        roles:      ["popover"],
        category:   "shade",
        onColorLight: "oklch(0.12 0.005 0)" as OklchString,    // Gucci Black on popover light
        onColorDark:  "oklch(0.96 0.005 0)" as OklchString,   // Off-white on popover dark
      },

      // Charcoal Gray: popover text
      {
        tokenSpecificName: "Charcoal Gray",
        description: "Text on popover",
        oklchLight: "oklch(0.20 0.005 0)" as OklchString,    // Softer black
        oklchDark:  "oklch(0.90 0.005 0)" as OklchString,   // Lighter gray for popover dark
        roles:      ["popover-foreground"],
        category:   "shade",
      },

      // Gucci Green: primary action
      {
        tokenSpecificName: "Gucci Green",
        description: "Primary action color (Gucci's dark green)",
        oklchLight: "oklch(0.35 0.08 150.0)" as OklchString, // Rich, dark green
        oklchDark:  "oklch(0.45 0.09 150.0)" as OklchString, // Slightly lighter green for dark
        roles:      ["primary"],
        category:   "color",
        onColorLight: "oklch(0.98 0.005 90.0)" as OklchString, // Cream text on green
        onColorDark:  "oklch(0.98 0.005 90.0)" as OklchString, // Cream text on green (dark)
      },

      // Pure White: for primary/secondary/success/sidebar-primary foregrounds
      {
        tokenSpecificName: "Pure White",
        description: "Text on primary, secondary, success, and sidebar-primary",
        oklchLight: "oklch(0.99 0 0)" as OklchString, // Pure white for high contrast
        oklchDark:  "oklch(0.99 0 0)" as OklchString,
        roles:      ["primary-foreground", "secondary-foreground", "success-foreground", "sidebar-primary-foreground", "destructive-foreground"],
        category:   "shade",
      },

      // Gucci Red: secondary, sidebar-primary, sidebar-ring
      {
        tokenSpecificName: "Gucci Red",
        description: "Secondary action and sidebar-primary/ring color (Gucci's signature red)",
        oklchLight: "oklch(0.50 0.20 25.0)" as OklchString,  // Vibrant, rich red
        oklchDark:  "oklch(0.55 0.21 25.0)" as OklchString,  // Slightly brighter red for dark
        roles:      ["secondary", "sidebar-primary", "sidebar-ring", "destructive", "warning"], // Also for destructive/warning
        category:   "color",
        onColorLight: "oklch(0.99 0 0)" as OklchString,         // Pure White text
        onColorDark:  "oklch(0.99 0 0)" as OklchString,         // Pure White text
      },

      // Light Gold: muted surfaces
      {
        tokenSpecificName: "Light Gold",
        description: "Muted surfaces with a touch of gold",
        oklchLight: "oklch(0.90 0.03 85.0)" as OklchString, // Pale gold
        oklchDark:  "oklch(0.30 0.02 85.0)" as OklchString, // Darker, muted gold
        roles:      ["muted"],
        category:   "shade",
        onColorLight: "oklch(0.30 0.05 50.0)" as OklchString, // Dark gold/brown text
        onColorDark:  "oklch(0.80 0.03 85.0)" as OklchString, // Lighter gold text
      },

      // Dark Gold Brown: muted text
      {
        tokenSpecificName: "Dark Gold Brown",
        description: "Text on muted surfaces",
        oklchLight: "oklch(0.30 0.05 50.0)" as OklchString,
        oklchDark:  "oklch(0.80 0.03 85.0)" as OklchString,
        roles:      ["muted-foreground"],
        category:   "shade",
      },

      // Gold Accent: accent/info and sidebar-accent
      {
        tokenSpecificName: "Gold Accent",
        description: "Accent and sidebar-accent color (metallic gold)",
        oklchLight: "oklch(0.75 0.10 88.0)" as OklchString, // Bright gold
        oklchDark:  "oklch(0.65 0.12 88.0)" as OklchString, // Richer gold for dark
        roles:      ["accent", "info", "sidebar-accent"],
        category:   "color",
        onColorLight: "oklch(0.15 0.01 40.0)" as OklchString, // Dark brown/black text
        onColorDark:  "oklch(0.95 0.01 90.0)" as OklchString, // Cream text
      },

      // Dark Brown: border
      {
        tokenSpecificName: "Dark Brown",
        description: "Border color, subtly luxurious",
        oklchLight: "oklch(0.35 0.04 45.0)" as OklchString, // Deep brown
        oklchDark:  "oklch(0.50 0.03 45.0)" as OklchString, // Muted brown for dark
        roles:      ["border"],
        category:   "shade",
      },

      // Beige: input background
      {
        tokenSpecificName: "Beige",
        description: "Input background, warm neutral",
        oklchLight: "oklch(0.92 0.015 80.0)" as OklchString,
        oklchDark:  "oklch(0.25 0.015 80.0)" as OklchString,
        roles:      ["input"],
        category:   "shade",
        onColorLight: "oklch(0.12 0.005 0)" as OklchString,    // Gucci Black
        onColorDark:  "oklch(0.96 0.005 0)" as OklchString,   // Off-white
      },

      // Forest Green: focus ring/success
      {
        tokenSpecificName: "Forest Green",
        description: "Focus ring and success color (deeper green)",
        oklchLight: "oklch(0.30 0.09 145.0)" as OklchString,
        oklchDark:  "oklch(0.40 0.10 145.0)" as OklchString,
        roles:      ["ring", "success"],
        category:   "color",
        onColorLight: "oklch(0.98 0.005 90.0)" as OklchString, // Cream text
        onColorDark:  "oklch(0.98 0.005 90.0)" as OklchString, // Cream text
      },

      // Chart Gucci Green: chart-1
      {
        tokenSpecificName: "Chart Gucci Green",
        description: "Chart color 1",
        oklchLight: "oklch(0.40 0.10 150.0)" as OklchString,
        oklchDark:  "oklch(0.50 0.11 150.0)" as OklchString,
        roles:      ["chart-1"],
        category:   "color",
      },

      // Chart Gucci Red: chart-2
      {
        tokenSpecificName: "Chart Gucci Red",
        description: "Chart color 2",
        oklchLight: "oklch(0.55 0.22 25.0)" as OklchString,
        oklchDark:  "oklch(0.60 0.23 25.0)" as OklchString,
        roles:      ["chart-2"],
        category:   "color",
      },

      // Chart Gold: chart-3
      {
        tokenSpecificName: "Chart Gold",
        description: "Chart color 3",
        oklchLight: "oklch(0.80 0.12 88.0)" as OklchString,
        oklchDark:  "oklch(0.70 0.14 88.0)" as OklchString,
        roles:      ["chart-3"],
        category:   "color",
      },

      // Chart Brown: chart-4
      {
        tokenSpecificName: "Chart Brown",
        description: "Chart color 4 (classic Gucci leather brown)",
        oklchLight: "oklch(0.40 0.08 40.0)" as OklchString,
        oklchDark:  "oklch(0.50 0.09 40.0)" as OklchString,
        roles:      ["chart-4"],
        category:   "color",
      },

      // Chart Black: chart-5
      {
        tokenSpecificName: "Chart Black",
        description: "Chart color 5",
        oklchLight: "oklch(0.20 0.005 0)" as OklchString,
        oklchDark:  "oklch(0.30 0.005 0)" as OklchString,
        roles:      ["chart-5"],
        category:   "color",
      },

      // Darker Cream: sidebar background
      {
        tokenSpecificName: "Darker Cream",
        description: "Sidebar background, slightly richer than page",
        oklchLight: "oklch(0.95 0.015 88.0)" as OklchString,
        oklchDark:  "oklch(0.18 0.012 88.0)" as OklchString,
        roles:      ["nav"], // Typically 'nav' is used for sidebar background
        category:   "shade",
        onColorLight: "oklch(0.12 0.005 0)" as OklchString,    // Gucci Black
        onColorDark:  "oklch(0.96 0.005 0)" as OklchString,   // Off-white
      },

      // Rich Gold: sidebar accent text (matching Gold Accent's base)
      {
        tokenSpecificName: "Rich Gold", // for sidebar-accent-foreground
        description: "Text on sidebar accent, rich gold",
        oklchLight: "oklch(0.15 0.01 40.0)" as OklchString, // Dark brown/black from Gold Accent onColorLight
        oklchDark:  "oklch(0.95 0.01 90.0)" as OklchString, // Cream from Gold Accent onColorDark
        roles:      ["sidebar-accent-foreground"],
        category:   "shade",
      },


      // Muted Gold: sidebar accent color
      // Already have Gold Accent for sidebar-accent, this definition is for its onColor for text.
      // Let's ensure sidebar-accent is Gold Accent itself.

      // Light Brown: sidebar border
      {
        tokenSpecificName: "Light Brown",
        description: "Sidebar border color, subtle",
        oklchLight: "oklch(0.80 0.03 60.0)" as OklchString,
        oklchDark:  "oklch(0.40 0.02 60.0 / 50%)" as OklchString, // Muted with opacity
        roles:      ["sidebar-border"],
        category:   "shade",
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors:       { primary: "Gucci Green", primaryForeground: "Pure White" },
      secondaryColors:     { secondary: "Gucci Red", secondaryForeground: "Pure White" },
      accentColors:        { accent: "Gold Accent", accentForeground: "Dark Gray" }, // Dark Gray for text on Gold
      cardColors:          { card: "Off-White", cardForeground: "Gucci Black" },
      popoverColors:       { popover: "Light Cream", popoverForeground: "Charcoal Gray" },
      mutedColors:         { muted: "Light Gold", mutedForeground: "Dark Gold Brown" },
      destructiveColors:   { destructive: "Gucci Red", destructiveForeground: "Pure White" },
      successColors:       { success: "Forest Green", successForeground: "Pure White" },
      infoColors:          { info: "Gold Accent", infoForeground: "Dark Gray" }, // Dark Gray for text on Gold
      warningColors:       { warning: "Gucci Red", warningForeground: "Pure White" },
      inputColors:         { input: "Beige", inputForeground: "Gucci Black" },
      borderColors:        { border: "Dark Brown" },
      ringColors:          { ring: "Forest Green" },
      radius: {
        radiusSm: "calc(var(--radius) - 2px)", // Softer rounding
        radiusMd: "var(--radius)",
        radiusLg: "calc(var(--radius) + 2px)",
        radiusXl: "calc(var(--radius) + 6px)",
      },
      spacing: {
        spacingSm: "0.6rem", // Slightly more generous spacing
        spacingMd: "1.2rem",
        spacingLg: "1.8rem",
        spacingXl: "2.4rem",
      },
    } as StyleGuide,

    otherVars: {
      background: "Cream",
      foreground: "Gucci Black",
      radiusBase: "0.375rem", // 6px base radius for a subtle curve

      // Sophisticated, subtle shadows
      shadowXs:  "0px 1px 2px 0px oklch(0 0 0 / 0.03)",
      shadowSm:  "0px 2px 4px -1px oklch(0 0 0 / 0.04), 0px 1px 2px -1px oklch(0 0 0 / 0.03)",
      shadowMd:  "0px 4px 6px -1px oklch(0 0 0 / 0.05), 0px 2px 4px -2px oklch(0 0 0 / 0.04)",
      shadowLg:  "0px 6px 10px -2px oklch(0 0 0 / 0.06), 0px 3px 6px -3px oklch(0 0 0 / 0.05)",
      shadowXl:  "0px 10px 15px -3px oklch(0 0 0 / 0.07), 0px 4px 6px -4px oklch(0 0 0 / 0.06)",
      "shadow-2xs": "0px 1px 2px 0px oklch(0 0 0 / 0.02)",
      "shadow-2xl": "0px 20px 25px -5px oklch(0 0 0 / 0.08), 0px 8px 10px -6px oklch(0 0 0 / 0.07)",


      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      // Chart tokens
      chart1: "Chart Gucci Green",
      chart2: "Chart Gucci Red",
      chart3: "Chart Gold",
      chart4: "Chart Brown",
      chart5: "Chart Black",

      // Sidebar tokens
      sidebarBackground:        "Darker Cream",
      sidebarForeground:        "Gucci Black",
      sidebarPrimary:           "Gucci Red", // Using Red for sidebar primary
      sidebarPrimaryForeground: "Pure White",
      sidebarAccent:            "Gold Accent",
      sidebarAccentForeground:  "Rich Gold", // Text on Gold Accent
      sidebarBorder:            "Light Brown",
      sidebarRing:              "Gucci Red", // Match sidebar primary

      // Fonts (Removed from here, defined in fonts array below)
      // fontSans:  "EB Garamond, serif",
      // fontSerif: "Playfair Display, serif",
      // fontMono:  "Courier Prime, monospace",
    },
  };

  const gucciBrandColors = generateBrandColors("gucci", gucciThemeDefinition.rawColors);

  export const gucciBrand: Brand = {
    name: "Gucci",
    businessDetails: {
      name: "Gucci Group",
      industry: "luxury_fashion",
      personality: {
        vintageModern: 70,     // Strong vintage feel, but modern execution
        seasonedYouthful: 40,  // Established, but with youthful appeal
        gracefulBold: 85,      // Very bold and graceful
        playfulElegant: 75,    // Elegant with a playful edge
        valueSmartLuxurious: 95,// Peak luxury
        structuredNatural: 60, // Structured, but with some organic/natural elements
        symbolicRealistic: 50, // Balanced
      },
    },
    colors: gucciBrandColors,
    fonts: [
      {
        name: "EB Garamond",
        distributor: "Google Fonts",
        description: "Primary elegant serif font for body text and some headings.",
        family: "'EB Garamond', serif",
        roles: ["body", "default", "sans", "h3", "h4", "h5", "h6"], // Using serif as primary sans
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Playfair Display",
        distributor: "Google Fonts",
        description: "Decorative serif for main headings.",
        family: "'Playfair Display', serif",
        roles: ["serif", "h1", "h2", "hero-title"],
        weights: { regular: 400, bold: 700, black: 900 },
      },
      {
        name: "Courier Prime",
        distributor: "Google Fonts",
        description: "Classic monospaced font.",
        family: "'Courier Prime', monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, bold: 700 },
      },
       {
        name: "Montserrat",
        distributor: "Google Fonts",
        description: "Clean sans-serif for UI elements if needed.",
        family: "Montserrat, sans-serif",
        roles: ["button-label", "form-input", "caption"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      }
    ],
    style: gucciThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "gucci",
      gucciBrandColors,
      gucciThemeDefinition.styleGuide,
      gucciThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: false, // Gucci aesthetic typically leans light
  }; 