import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from '../brand-utils';
import { modernAnimationPreset } from '../animation-presets';

  const violetSkyThemeDefinition = {
    rawColors: [
      // Lavender: used for page background
      {
        tokenSpecificName: "Lavender",
        description: "Page background",
        oklch: "oklch(0.97 0.01 316.68)" as OklchString,
        roles: ["background"],
        category: "shade",
      },

      // Periwinkle: used for foreground, card-foreground, popover-foreground, sidebar-foreground, sidebar-accent-foreground
      {
        tokenSpecificName: "Periwinkle",
        description: "Text color for primary content and card/popover/sidebar text",
        oklch: "oklch(0.37 0.03 259.73)" as OklchString,
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

      // White: used for card background, popover background, primary-foreground, sidebar-primary-foreground
      {
        tokenSpecificName: "White",
        description: "Background for cards, popovers, and text on primary/sidebar-primary",
        oklch: "oklch(1.00 0 0)" as OklchString,
        roles: [
          "card",
          "popover",
          "primary-foreground",
          "sidebar-primary-foreground",
        ],
        category: "shade",
        onColor: "oklch(0.37 0.03 259.73)" as OklchString, // text on white
      },

      // Violet: used for primary, ring, chart-1, sidebar-primary
      {
        tokenSpecificName: "Violet",
        description: "Primary action and focus ring",
        oklch: "oklch(0.71 0.16 293.40)" as OklchString,
        roles: ["primary", "ring", "chart-1", "sidebar-primary"],
        category: "color",
        onColor: "oklch(1.00 0 0)" as OklchString, // text on violet
      },

      // Indigo: used for secondary, sidebar, border, input
      {
        tokenSpecificName: "Indigo",
        description: "Secondary action, sidebar background, borders, and inputs",
        oklch: "oklch(0.91 0.05 306.07)" as OklchString,
        roles: ["secondary", "sidebar", "border", "input"],
        category: "color",
        onColor: "oklch(0.45 0.03 257.68)" as OklchString, // text on indigo
      },

      // Dark Periwinkle: used for secondary-foreground
      {
        tokenSpecificName: "Dark Periwinkle",
        description: "Text on secondary",
        oklch: "oklch(0.45 0.03 257.68)" as OklchString,
        roles: ["secondary-foreground"],
        category: "shade",
      },

      // Light Indigo: used for muted surfaces
      {
        tokenSpecificName: "Light Indigo",
        description: "Muted surfaces",
        oklch: "oklch(0.95 0.03 307.19)" as OklchString,
        roles: ["muted"],
        category: "shade",
        onColor: "oklch(0.55 0.02 264.41)" as OklchString, // text on muted
      },

      // Slate: used for muted-foreground
      {
        tokenSpecificName: "Slate",
        description: "Text on muted surfaces",
        oklch: "oklch(0.55 0.02 264.41)" as OklchString,
        roles: ["muted-foreground"],
        category: "shade",
      },

      // Cerise: used for accent, sidebar-accent
      {
        tokenSpecificName: "Cerise",
        description: "Accent color and sidebar accent",
        oklch: "oklch(0.94 0.03 322.47)" as OklchString,
        roles: ["accent", "sidebar-accent"],
        category: "color",
        onColor: "oklch(0.37 0.03 259.73)" as OklchString, // text on accent
      },

      // Red: used for destructive and warning
      {
        tokenSpecificName: "Red",
        description: "Destructive actions and warnings",
        oklch: "oklch(0.81 0.10 19.47)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColor: "oklch(1.00 0 0)" as OklchString, // text on red
      },

      // White: used for destructive-foreground
      {
        tokenSpecificName: "White Destructive Text",
        description: "Text on destructive (red) backgrounds",
        oklch: "oklch(1.00 0 0)" as OklchString,
        roles: ["destructive-foreground"],
        category: "shade",
      },

      // Periwinkle: used for accent-foreground
      {
        tokenSpecificName: "Periwinkle Accent Text",
        description: "Text on accent (cerise) backgrounds",
        oklch: "oklch(0.37 0.03 259.73)" as OklchString,
        roles: ["accent-foreground"],
        category: "shade",
      },

      // Chart Indigo 2: used for chart-2
      {
        tokenSpecificName: "Chart Indigo 2",
        description: "Chart color 2",
        oklch: "oklch(0.61 0.22 292.63)" as OklchString,
        roles: ["chart-2"],
        category: "color",
      },

      // Chart Blue: used for chart-3
      {
        tokenSpecificName: "Chart Blue",
        description: "Chart color 3",
        oklch: "oklch(0.54 0.25 293.03)" as OklchString,
        roles: ["chart-3"],
        category: "color",
      },

      // Chart Deep Blue: used for chart-4
      {
        tokenSpecificName: "Chart Deep Blue",
        description: "Chart color 4",
        oklch: "oklch(0.49 0.24 292.70)" as OklchString,
        roles: ["chart-4"],
        category: "color",
      },

      // Chart Navy: used for chart-5
      {
        tokenSpecificName: "Chart Navy",
        description: "Chart color 5",
        oklch: "oklch(0.43 0.21 292.63)" as OklchString,
        roles: ["chart-5"],
        category: "color",
      },
    ] as RawColorDefinition[],

    styleGuide: {
      primaryColors: { primary: "Violet", primaryForeground: "White" },
      secondaryColors: { secondary: "Indigo", secondaryForeground: "Dark Periwinkle" },
      accentColors: { accent: "Cerise", accentForeground: "Periwinkle" },
      cardColors: { card: "White", cardForeground: "Periwinkle" },
      popoverColors: { popover: "White", popoverForeground: "Periwinkle" },
      mutedColors: { muted: "Light Indigo", mutedForeground: "Slate" },
      destructiveColors: { destructive: "Red", destructiveForeground: "White" },
      successColors: { success: "Violet", successForeground: "White" },
      infoColors: { info: "Cerise", infoForeground: "Periwinkle" },
      warningColors: { warning: "Red", warningForeground: "White" },
      inputColors: { input: "Indigo", inputForeground: "Periwinkle" },
      borderColors: { border: "Indigo" },
      ringColors: { ring: "Violet" },
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
      background: "Lavender",
      foreground: "Periwinkle",
      radiusBase: "1.5rem",

      // Sidebar mappings - using existing colors from rawColors
      sidebar: "White",
      sidebarForeground: "Periwinkle",
      sidebarPrimary: "Violet",
      sidebarPrimaryForeground: "White",
      sidebarAccent: "Cerise",
      sidebarAccentForeground: "Periwinkle",
      sidebarBorder: "Indigo",
      sidebarRing: "Violet",

      // Shadows
      shadowXs: "0px 8px 16px -4px oklch(0 0 0 / 0.04)",
      shadowSm: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 1px 2px -5px oklch(0 0 0 / 0.08)",
      shadowMd: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 2px 4px -5px oklch(0 0 0 / 0.08)",
      shadowLg: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 4px 6px -5px oklch(0 0 0 / 0.08)",
      shadowXl: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 8px 10px -5px oklch(0 0 0 / 0.08)",
      "shadow-2xs": "0px 8px 16px -4px oklch(0 0 0 / 0.04)",
      "shadow-2xl": "0px 8px 16px -4px oklch(0 0 0 / 0.20)",

      borderWidthDefault: "1px",
      borderStyleDefault: "solid",

      // Chart tokens
      chart1: "Violet",
      chart2: "Chart Indigo 2",
      chart3: "Chart Blue",
      chart4: "Chart Deep Blue",
      chart5: "Chart Navy",
    },
  };

  const violetSkyBrandColors = generateBrandColors("violet-sky", violetSkyThemeDefinition.rawColors);

  export const violetSkyBrand: Brand = {
    name: "Violet Sky",
    businessDetails: {
      name: "Violet Sky Co",
      industry: "digital_design",
      personality: {
        vintageModern: 40,
        seasonedYouthful: 60,
        gracefulBold: 70,
        playfulElegant: 50,
        valueSmartLuxurious: 65,
        structuredNatural: 55,
        symbolicRealistic: 45,
      },
    },
    colors: violetSkyBrandColors,
    fonts: [
      {
        name: "Manrope",
        distributor: "Google Fonts",
        description: "Modern, geometric sans-serif with ethereal elegance for body text.",
        family: "'Manrope', system-ui, -apple-system, sans-serif",
        roles: ["body", "default", "sans", "p", "a", "li", "serif"],
        weights: { extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
      },
      {
        name: "Space Grotesk",
        distributor: "Google Fonts",
        description: "Distinctive, futuristic display font perfect for dreamy sky aesthetics.",
        family: "'Space Grotesk', 'Manrope', sans-serif",
        roles: ["display", "h1", "h2", "h3", "h4", "h5", "h6", "hero-title"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Clean, modern monospaced font for technical content.",
        family: "'JetBrains Mono', 'IBM Plex Mono', Consolas, monospace",
        roles: ["code", "mono"],
        weights: { thin: 100, light: 300, regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: violetSkyThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "violet-sky",
      violetSkyBrandColors,
      violetSkyThemeDefinition.styleGuide,
      violetSkyThemeDefinition.otherVars
    ),
    sevenAxisCode: {
      colorComplexity: 'duotone',            // Duotone - violet and indigo with cerise accent
      brightness: 'light',                   // Light - lavender background suggests light mode
      saturation: 'medium',                  // Medium - balanced violet/indigo saturation
      colorHarmony: 'analogous',             // Analogous - violet, indigo, and cerise are near each other
      accentUsage: 'balanced',               // Balanced - good use of cerise accents
      cornerStyle: 'very-rounded',           // Very-rounded - 1.5rem base radius is quite rounded
      elevation: 'minimal-shadow',           // Minimal-shadow - soft, ethereal shadows
    },
    animationConfig: {
      preset: {
        ...modernAnimationPreset,
        button: {
          ...modernAnimationPreset.button,
          // Enhanced outline variant with stronger active effect
          outline: {
            default: {
              duration: '180ms',
              easing: 'ease-out',
              opacity: '1',
              transform: {
                scale: '1'
              }
            },
            hover: {
              duration: '150ms',
              easing: 'ease-out',
              opacity: '0.9'
            },
            focus: {
              duration: '150ms',
              easing: 'ease-out',
              opacity: '0.95',
              boxShadow: '0 0 0 2px var(--ring)',
              transform: {
                scale: '1'
              }
            },
            active: {
              duration: '100ms',
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: '0.7',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            },
            disabled: {
              duration: '150ms',
              easing: 'ease-out',
              opacity: '0.5',
              transform: {
                scale: '1'
              }
            }
          }
        }
      },
      rootClassName: 'violet-sky-theme'
    },
  };
  