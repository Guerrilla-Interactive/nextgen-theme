import { BrandDefinition } from "../brands-types";
import { rgbToCmykString, hexToRgbString } from "../brands";

export const GOOGLE_THEME: BrandDefinition =  {
    name: "Google",
    id: "google",
    description:
      "Global technology leader specializing in internet-related services, renowned for its clean, intuitive design language and vibrant branding.",
    brandColors: [
      {
        name: "Google Blue",
        hex: "#4285F4",
        variableName: "brand-blue-primary",
        shades: {
          // Assuming 500 is the main hex, other shades would be derived if available
          // For now, only 500 is listed unless specific shades are known for Google Blue
          "500": { hex: "#4285F4", variableName: "brand-blue-500" }
        }
      },
      {
        name: "Google Red",
        hex: "#EA4335", // As used in destructive semantic and supportPalette
        variableName: "brand-red-primary",
        shades: {
          "500": { hex: "#EA4335", variableName: "brand-red-500" }
        }
      },
      {
        name: "Google Green",
        hex: "#34A853", // As used in success semantic and supportPalette
        variableName: "brand-green-primary",
        shades: {
          "500": { hex: "#34A853", variableName: "brand-green-500" }
        }
      },
      {
        name: "Google Yellow",
        hex: "#FBBC05", // As used in warning semantic and supportPalette
        variableName: "brand-yellow-primary",
        shades: {
          "500": { hex: "#FBBC05", variableName: "brand-yellow-500" }
        }
      },
      {
        name: "Google Grey",
        hex: "#5F6368", // Based on mutedForeground / text colors
        variableName: "brand-grey-primary",
        shades: {
          "50":  { hex: "#F8F9FA", variableName: "brand-grey-50" },    // surface.muted
          "100": { hex: "#E8EAED", variableName: "brand-grey-100" }, // borderStyles.subtleColor
          "200": { hex: "#DADCE0", variableName: "brand-grey-200" }, // borderStyles.defaultColor
          "300": { hex: "#BDC1C6", variableName: "brand-grey-300" }, // borderStyles.strongColor
          "400": { hex: "#9AA0A6", variableName: "brand-grey-400" }, // Common darker grey (e.g., icons)
          "500": { hex: "#5F6368", variableName: "brand-grey-500" }, // surface.mutedForeground, common text
          "600": { hex: "#3C4043", variableName: "brand-grey-600" }, // Darker text/elements
          "700": { hex: "#202124", variableName: "brand-grey-700" }  // surface.on (main text, near black)
        }
      }
    ],
    brand: {
      main: {
        name: "Google Blue (Primary)",
        hex: "#4285F4",
        rgb: hexToRgbString("#4285F4"),
        cmyk: rgbToCmykString(hexToRgbString("#4285F4")),
        variableName: "brand-main",
      },
      on: "#FFFFFF",
      secondary: {
        name: "Google Red (Secondary)",
        hex: "#DB4437",
        rgb: hexToRgbString("#DB4437"),
        cmyk: rgbToCmykString(hexToRgbString("#DB4437")),
        variableName: "brand-secondary",
      },
    },
    supportPalette: [ // Defined first as the source of truth
      {
        name: "Google Red (Destructive)",
        hex: "#EA4335",
        rgb: hexToRgbString("#EA4335"),
        cmyk: rgbToCmykString(hexToRgbString("#EA4335")),
        variableName: "semantic-destructive",
      },
      {
        name: "Google Green (Success)",
        hex: "#34A853",
        rgb: hexToRgbString("#34A853"),
        cmyk: rgbToCmykString(hexToRgbString("#34A853")),
        variableName: "semantic-success",
      },
      {
        name: "Google Yellow (Warning)",
        hex: "#FBBC05",
        rgb: hexToRgbString("#FBBC05"),
        cmyk: rgbToCmykString(hexToRgbString("#FBBC05")),
        variableName: "semantic-warning",
      },
      {
        name: "Google Blue (Info)",
        hex: "#4285F4",
        rgb: hexToRgbString("#4285F4"),
        cmyk: rgbToCmykString(hexToRgbString("#4285F4")),
        variableName: "semantic-info",
      },
    ],
    surface: {
      background: "#FFFFFF",
      card: "#FFFFFF",
      popover: "#FFFFFF",
      on: "#202124",
      muted: "#F8F9FA",
      mutedForeground: "#5F6368",
      brandSubtle: "#E8F0FE",
      textMuted: "#70757A",
    },
    semantic: { // References supportPalette
      destructive: "#EA4335",
      success: "#34A853",
      warning: "#FBBC05",
      info: "#4285F4",
    },
    shape: {
      radiusXs: "2px",
      radiusSm: "4px",
      radius: "8px",
      radiusLg: "12px",
      radiusXl: "16px",
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "'Google Sans Display', 'Roboto', sans-serif",
      fontSans: "'Google Sans', 'Roboto', sans-serif",
      fontMono: "'Roboto Mono', monospace",
      weightNormal: "400",
      weightMedium: "500",
      weightSemibold: "600",
      weightBold: "700",
      leading: "1.5",
      tracking: "0.005em",
      fontSizeXs: "0.75rem",
      fontSizeSm: "0.875rem",
      fontSizeBase: "1rem",
      fontSizeLg: "1.25rem",
      fontSizeXl: "1.5rem",
    },
    motion: {
      motionFast: "150ms",
      motionStandard: "250ms",
      motionSlow: "400ms",
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: {
      shadowXs: "0 1px 2px rgba(60,64,67,0.1)",
      shadowSm: "0 2px 4px rgba(60,64,67,0.15)",
      shadowMd: "0 4px 8px rgba(60,64,67,0.2)",
      shadowLg: "0 8px 16px rgba(60,64,67,0.25)",
      shadowXl: "0 16px 24px rgba(60,64,67,0.3)",
    },
    spacing: {
      space1: "0.25rem",
      space2: "0.5rem",
      space3: "0.75rem", 
      space4: "1rem",
      space5: "1.5rem",
      space6: "2rem",
      space8: "3rem",
      space12: "4rem",
      paddingInput: "0.75rem 1rem",
      paddingButton: "0.625rem 1.25rem",
      paddingCard: "1.5rem",
      paddingCompact: "0.5rem 0.75rem",
    },
    gradient: { from: "#4285F4", to: "#DB4437", accent: "#FBBC05" },
    borderStyles: {
      defaultColor: "#DADCE0",
      subtleColor: "#E8EAED",
      strongColor: "#BDC1C6",
      defaultWidth: "1px",
      thinWidth: "0.5px",
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: {
      preferBorderless: true,
      applySpecialLayout: false,
      containerMaxWidth: "max-w-5xl",
      overviewCardBoxShadow: "0 2px 8px rgba(60,64,67,0.12)",
      headingMainText: "Explore Google's Innovations",
      headingSubtitleText: "Simplicity meets functionality.",
      headingSubtitleClassName: "text-muted-foreground font-normal",
      navTitle: "Google Design System",
    },
    componentStyles: {
      nav: {
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 1px 4px rgba(60,64,67,0.15)",
        backdropFilter: "blur(10px)",
      },
      hero: { 
        background: "linear-gradient(135deg, #E8F0FE, transparent)",
      },
      button: {
        primary: {
          default: {
            background: "#4285F4", 
            color: "#FFFFFF",
            borderRadius: "var(--radius-md, 8px)",
            boxShadow: "0 1px 2px rgba(60,64,67,0.15), inset 0 -1px 0 rgba(0,0,0,0.05)",
            fontWeight: "var(--font-weight-medium)",
            padding: "0.625rem 1.25rem", // Consistent padding
          },
          hover: {
            background: "color-mix(in srgb, #4285F4 92%, #000 8%)", // Darker hover
            boxShadow: "0 2px 4px rgba(60,64,67,0.2), inset 0 -1px 0 rgba(0,0,0,0.05)", 
          },
          active: {
            background: "color-mix(in srgb, #4285F4 80%, #000 20%)", 
          },
          focus: {
            boxShadow: "0 0 0 3.5px rgba(66,133,244,0.4)", // Slightly larger focus ring
          }
        },
        secondary: {
          default: {
            background: "transparent",
            color: "var(--brand-main)",
            borderColor: "var(--border-color-default)",
            borderWidth: "1px",
            borderRadius: "var(--radius-md, 8px)",
            fontWeight: "var(--font-weight-medium)",
            padding: "calc(0.625rem - 1px) calc(1.25rem - 1px)", // Adjust for border
          },
          hover: {
            background: "rgba(66,133,244,0.06)", 
            borderColor: "color-mix(in srgb, var(--brand-main) 85%, #fff 15%)", 
          },
          active: {
            background: "rgba(66,133,244,0.12)", 
          },
          focus: { 
            borderColor: "var(--brand-main)",
            boxShadow: "0 0 0 3px rgba(66,133,244,0.3)", 
          }
        },
        fontFamily: "'Google Sans', sans-serif",
        fontSize: "0.9375rem", // Standard Google button font size (15px)
      },
      input: {
        background: "var(--surface-bg, #FFFFFF)", // Use surface-bg as base
        color: "var(--surface-on, #202124)",
        borderColor: "#DADCE0",
        borderRadius: "8px",
        padding: "0.875rem 1rem", // 14px vertical padding
        focus: {
          borderColor: "#4285F4", 
          boxShadow: "0 0 0 2.5px rgba(66,133,244,0.35)", // Adjusted focus glow
          background: "var(--surface-bg, #FFFFFF)", // Ensure bg doesn't change weirdly
        },
        fontFamily: "'Google Sans', 'Roboto', sans-serif",
        fontSize: "1rem", // 16px for input text
      },
      card: {
        background: "#FFFFFF",
        borderRadius: "12px", // Slightly larger radius for cards
        boxShadow: "0 4px 12px rgba(60,64,67,0.15)", // Softer, more spread shadow
        padding: "1.5rem",
      },
      badge: { // Added default badge styles for Google
        variantDefault: {
          background: "var(--surface-muted, #F8F9FA)",
          color: "var(--surface-on, #202124)",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.8rem", 
          fontWeight: 500,
        },
        variantDestructive: {
          background: "var(--semantic-destructive, #EA4335)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.8rem",
          fontWeight: 500,
        },
        variantSuccess: {
          background: "var(--semantic-success, #34A853)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.8rem",
          fontWeight: 500,
        },
      },
      tooltip: {
        background: "rgba(32,33,36,0.92)", // Google's dark tooltip
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "0.5rem 0.75rem",
        fontSize: "0.8125rem", // 13px
        boxShadow: "0 2px 6px rgba(60,64,67,0.2)",
        backdropFilter: "blur(5px)",
      },
      charts: {
        gridStrokeColor: "rgba(218,220,224,0.7)",
        axisStrokeColor: "#5F6368",
        axisTextColor: "#70757A",
        legendTextColor: "#202124",
        tooltipCursorFill: "rgba(66,133,244,0.1)",
      },
    },
    componentShowcase: {
      title: "Google UI Components",
      description: "Material You inspired components for Google services.",
      interactiveElements: [
        {
          id: "button-primary-google",
          name: "Primary Button (Google)",
          description: "Main call to action button.",
          displayComponent: "Get Started"
        },
        {
          id: "button-secondary-google",
          name: "Secondary Button (Google)",
          description: "Alternative action or less prominent button.",
          displayComponent: "Learn More"
        },
        {
          id: "button-outline-google",
          name: "Outline Button (Google)",
          description: "Subtle action, often for settings or filters.",
          displayComponent: "View Options"
        },
        {
          id: "badge-status-google",
          name: "Status Badge (Google)",
          description: "Informational badge, e.g., for status updates.",
          displayComponent: "Active"
        },
        {
          id: "badge-alert-google",
          name: "Alert Badge (Google)",
          description: "Attention-grabbing badge for notifications.",
          displayComponent: "New Update"
        }
      ],
      forms: [
        {
          id: "input-text-google",
          name: "Text Field (Google)",
          description: "Standard text input field.",
          displayComponent: "Enter your name"
        },
        {
          id: "input-search-google",
          name: "Search Bar (Google)",
          description: "Search input with integrated icon.",
          displayComponent: "Search Google"
        }
      ],
      feedbackIndicators: [
        {
          id: "loading-indicator-google",
          name: "Progress Bar (Google)",
          description: "Linear progress indicator.",
          displayComponent: "Loading..."
        }
      ]
    },
    supplementaryChartColors: ["#4285F4", "#DB4437", "#FBBC05", "#34A853", "#70757A"],
  }