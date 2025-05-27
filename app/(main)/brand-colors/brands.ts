import { BrandDefinition } from "./brands-types";
import { APPLE_THEME } from "./themes/apple.theme";
import { GOOGLE_THEME } from "./themes/google.theme";
import { AIRBNB_THEME } from "./themes/airbnb.theme";
import { NINTENDO_THEME } from "./themes/nintendo.theme";
import { RAZER_THEME } from "./themes/razer.theme";
export const BRANDS: BrandDefinition[] = [
    APPLE_THEME,
    GOOGLE_THEME,
    AIRBNB_THEME,
    NINTENDO_THEME,
    RAZER_THEME,
  // START OF NEW NEXTGEN THEME (Derived from Razer, initial setup)
  {
    name: "Nextgen",
    id: "nextgen",
    description:
      "Futuristic and bold, inspired by Razer\'s gamer aesthetic with a fiery orange-red twist and modern typography.",
    brand: {
      main: {
        name: "Nextgen Orange (Primary)",
        hex: "#FF3600",
        rgb: hexToRgbString("#FF3600"),
        cmyk: rgbToCmykString(hexToRgbString("#FF3600")),
        variableName: "brand-main",
      },
      on: "#FFFFFF", 
      secondary: {
        name: "Nextgen Dark (Secondary)",
        hex: "#1A1A1A", 
        rgb: hexToRgbString("#1A1A1A"),
        cmyk: rgbToCmykString(hexToRgbString("#1A1A1A")),
        variableName: "brand-secondary",
      },
    },
    supportPalette: [ 
      {
        name: "Nextgen Orange (Success)",
        hex: "#FF3600",
        rgb: hexToRgbString("#FF3600"),
        cmyk: rgbToCmykString(hexToRgbString("#FF3600")),
        variableName: "semantic-success", 
      },
      {
        name: "Nextgen Red (Destructive)",
        hex: "#D32F2F",
        rgb: hexToRgbString("#D32F2F"),
        cmyk: rgbToCmykString(hexToRgbString("#D32F2F")),
        variableName: "semantic-destructive",
      },
      {
        name: "Nextgen Amber (Warning)",
        hex: "#FFA000",
        rgb: hexToRgbString("#FFA000"),
        cmyk: rgbToCmykString(hexToRgbString("#FFA000")),
        variableName: "semantic-warning",
      },
      {
        name: "Nextgen Blue (Info)",
        hex: "#1976D2",
        rgb: hexToRgbString("#1976D2"),
        cmyk: rgbToCmykString(hexToRgbString("#1976D2")),
        variableName: "semantic-info",
      },
    ],
    surface: { // Inherited from Razer, mostly dark theme
      background: "#101010", 
      card: "#1C1C1C",       
      popover: "#282828",     
      on: "#FFFFFF",         
      muted: "#3A3A3A",      
      mutedForeground: "#A0A0A0", 
      brandSubtle: "rgba(255, 54, 0, 0.07)", // Adjusted to new primary #FF3600
      textMuted: "#777777",   
    },
    semantic: { // References Nextgen\'s supportPalette
      destructive: "#D32F2F", 
      success: "#FF3600",    
      warning: "#FFA000",     
      info: "#1976D2",        
    },
    shape: { // Inherited from Razer
      radiusXs: "2px",
      radiusSm: "4px",
      radius: "6px",
      radiusLg: "8px",
      radiusXl: "12px",
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "var(--font-syne), var(--font-titillium-web), var(--font-roboto), sans-serif",
      fontSans: "var(--font-inter), var(--font-titillium-web), var(--font-roboto), sans-serif",
      fontMono: "var(--font-roboto-mono), Consolas, monospace",
      weightNormal: "400",
      weightMedium: "500",
      weightSemibold: "600",
      weightBold: "700",
      leading: "1.6",
      tracking: "0.01em",
      fontSizeXs: "0.75rem",
      fontSizeSm: "0.875rem",
      fontSizeBase: "1rem",
      fontSizeLg: "1.125rem",
      fontSizeXl: "1.375rem",
    },
    motion: { // Inherited from Razer
      motionFast: "100ms",
      motionStandard: "200ms",
      motionSlow: "350ms",
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: { // Inherited from Razer, brand shadows will be re-colored
      shadowXs: "0 1px 2px rgba(0,0,0,0.2)",
      shadowSm: "0 2px 4px rgba(0,0,0,0.3)",
      shadowMd: "0 4px 8px rgba(0,0,0,0.4)",
      shadowLg: "0 8px 16px rgba(0,0,0,0.4)",
      shadowXl: "0 12px 24px rgba(0,0,0,0.5)",
      shadowBrandSm: "0 2px 6px rgba(255, 54, 0, 0.2)", 
      shadowBrandMd: "0 4px 10px rgba(255, 54, 0, 0.25)",
      shadowBrandLg: "0 8px 18px rgba(255, 54, 0, 0.3)",
    },
    spacing: { // Inherited from Razer
      space1: "0.2rem",
      space2: "0.4rem",
      space3: "0.6rem",
      space4: "0.8rem",
      space5: "1.2rem",
      space6: "1.6rem",
      space8: "2.4rem",
      space12: "3.2rem",
      paddingInput: "0.6rem 0.8rem",
      paddingButton: "0.5rem 1rem",
      paddingCard: "1.2rem",
      paddingCompact: "0.4rem 0.6rem",
    },
    gradient: { 
      from: "#FF3600", 
      to: "#CC2B00", // Darker shade of FF3600
      accent: "#FF531F", // Lighter shade
    }, 
    borderStyles: { // Inherited from Razer
      defaultColor: "#444444",
      subtleColor: "#333333",
      strongColor: "#555555",
      defaultWidth: "1px",
      thinWidth: "1px",
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: { // Adapted from Razer
      preferBorderless: false,
      applySpecialLayout: true,
      containerMaxWidth: "max-w-6xl",
      overviewCardBoxShadow: "var(--shadow-md)",
      contentFlexClass: "sm:flex-row items-start",
      footerExtraMargin: "mt-8",
      headingMainText: "NEXT GENERATION INTERFACE",
      headingSubtitleText: "Performance. Power. Precision.",
      headingSubtitleClassName: "text-[var(--brand-main)] font-normal tracking-wider uppercase text-sm",
      navTitle: "NEXTGEN",
    },
    componentStyles: {
      nav: {
        background: "rgba(16, 16, 16, 0.85)", 
        borderColor: "rgba(255, 54, 0, 0.2)", 
        borderWidth: "0 0 1px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        color: "#E0E0E0",
      },
      hero: {
        background: "#0A0A0A", 
        backgroundImage: "radial-gradient(circle, rgba(255, 54, 0, 0.05) 0%, transparent 60%)", 
        color: "#FFFFFF",
        boxShadow: "inset 0 -50px 50px -30px #0A0A0A",
      },
      tabs: {
        list: {
          background: "rgba(34,34,34,0.8)", 
          borderRadius: "var(--radius-md)",
          padding: "var(--space-1)",
        },
        trigger: {
          color: "var(--surface-muted-fg)",
          borderRadius: "var(--radius-sm)",
          backgroundActive: "var(--brand-main)", 
          textColorActive: "var(--brand-on)",
          boxShadowActive: "0 0 10px rgba(255, 54, 0, 0.4)", 
          fontWeight: "var(--font-weight-medium)",
          padding: "0.5rem 1rem",
          fontFamily: "var(--font-family-sans)", // Inter
        }
      },
      overviewCard: {
        background: "var(--surface-card)", 
        borderColor: "var(--border-color-subtle)",
        borderWidth: "1px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)", 
        overlayImage: "linear-gradient(145deg, rgba(255, 54, 0, 0.03) 0%, rgba(0,0,0,0) 40%)", 
      },
      chartShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "var(--border-color-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
      },
      chartShowcaseTitle: {
        color: "var(--brand-main)", 
        fontWeight: "var(--font-weight-semibold)",
        fontSize: "1.2rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontFamily: "var(--font-family-display)" // Syne
      },
      componentShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "var(--border-color-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
      },
      componentShowcaseTitle: {
        color: "var(--brand-main)", 
        fontWeight: "var(--font-weight-semibold)",
        fontSize: "1.2rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontFamily: "var(--font-family-display)" // Syne
      },
      brandPickerContainer: {
        background: "rgba(16,16,16,0.7)",
        // overlayImage: "url('/assets/nextgen-orange-grid.svg')", // Consider new asset if available
      },
      button: {
        primary: {
          default: {
            background: "var(--brand-main)",
            color: "var(--brand-on)",
            borderRadius: "var(--radius-sm, 4px)", 
            boxShadow: "0 1px 3px rgba(255, 54, 0, 0.2), inset 0 -1px 0px rgba(0,0,0,0.2), 0 0 0 1px rgba(255, 54, 0, 0.3)", 
            fontWeight: "var(--font-weight-bold)",
            textTransform: "uppercase",
            letterSpacing: "0.075em",
            padding: "0.6rem 1.3rem", 
          },
          hover: {
            background: "color-mix(in srgb, var(--brand-main) 95%, #fff 15%)", 
            boxShadow: "0 0 15px 3px rgba(255, 54, 0, 0.4), 0 0 25px 6px rgba(255, 54, 0, 0.25), inset 0 0 1.5px 1px rgba(255,150,100,0.4)", 
            transform: "translateY(-1.5px) scale(1.02)", 
          },
          active: {
            background: "color-mix(in srgb, var(--brand-main) 85%, #000 20%)", 
            transform: "translateY(0px) scale(1)",
            boxShadow: "0 1px 2px rgba(255, 54, 0, 0.15), inset 0 1px 1.5px rgba(0,0,0,0.3), inset 0 0 8px rgba(150,30,0,0.3)", 
          },
          focus: {
            boxShadow: "0 0 0 3px rgba(255, 54, 0, 0.5), 0 0 10px 2px rgba(255, 54, 0, 0.35), 0 1px 3px rgba(255, 54, 0, 0.2)", 
          }
        },
        secondary: {
          default: {
            background: "var(--surface-muted, #3A3A3A)",
            color: "var(--surface-on, #FFFFFF)",
            borderColor: "var(--border-color-strong, #555555)",
            borderWidth: "1px",
            borderRadius: "var(--radius-sm, 4px)",
            fontWeight: "var(--font-weight-semibold)", 
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            padding: "calc(0.6rem - 1px) calc(1.3rem - 1px)",
          },
          hover: {
            background: "color-mix(in srgb, var(--surface-muted, #3A3A3A) 90%, var(--brand-main, #00FF00) 8%)",
            borderColor: "var(--brand-main, #00FF00)", 
            color: "var(--brand-main, #00FF00)", 
            boxShadow: "0 0 8px 1px rgba(0,255,0,0.2)",
          },
          active: {
            background: "color-mix(in srgb, var(--surface-card, #1C1C1C) 85%, #000 15%)",
            borderColor: "color-mix(in srgb, var(--brand-main, #00FF00) 80%, #000 20%)",
          },
          focus: {
            borderColor: "var(--brand-main, #00FF00)",
            boxShadow: "0 0 0 2.5px rgba(255, 54, 0, 0.4)", 
          }
        },
        outline: {
           default: {
            background: "transparent",
            borderColor: "var(--brand-main)", 
            color: "var(--brand-main)", 
            borderRadius: "var(--radius-sm)",
            fontWeight: "var(--font-weight-medium)",
            textTransform: "uppercase",
            borderWidth: "1px",
            padding: "calc(0.6rem - 1px) calc(1.3rem - 1px)",
           },
           hover: {
            background: "rgba(255, 54, 0, 0.07)", 
            color: "color-mix(in srgb, var(--brand-main) 90%, #fff 10%)", 
            borderColor: "color-mix(in srgb, var(--brand-main) 80%, #fff 20%)",
           },
           active: {
            background: "rgba(255, 54, 0, 0.12)", 
           },
           focus: {
            boxShadow: "0 0 0 2.5px rgba(255, 54, 0, 0.35)", 
            borderColor: "color-mix(in srgb, var(--brand-main) 80%, #fff 20%)",
           }
        },
        destructive: {
          default: {
            background: "var(--semantic-destructive)",
            color: "var(--brand-on)",
            borderColor: "var(--semantic-destructive)", // Or a darker shade of destructive
            borderWidth: "1px", // Or 0px
            borderRadius: "var(--radius-sm, 4px)",
            boxShadow: "0 2px 5px rgba(211, 47, 47, 0.2), inset 0 -1px 1px rgba(0,0,0,0.25)", // Adjusted shadow
            fontWeight: "var(--font-weight-bold)",
            textTransform: "uppercase",
            letterSpacing: "0.075em",
            padding: "0.6rem 1.3rem",
          },
          hover: {
            background: "color-mix(in srgb, var(--semantic-destructive) 90%, #fff 10%)",
            boxShadow: "0 0 15px 3px rgba(211, 47, 47, 0.4), 0 0 25px 6px rgba(211, 47, 47, 0.25), inset 0 0 1.5px 1px rgba(255,150,150,0.4)",
          },
          active: {
            background: "color-mix(in srgb, var(--semantic-destructive) 80%, #000 20%)",
            boxShadow: "0 1px 2px rgba(211, 47, 47, 0.15), inset 0 1px 1.5px rgba(0,0,0,0.3), inset 0 0 8px rgba(150,0,0,0.3)",
          },
          focus: {
            boxShadow: "0 0 0 3px rgba(211, 47, 47, 0.5), 0 0 10px 2px rgba(211, 47, 47, 0.35)",
          }
        },
        fontFamily: "var(--font-family-sans)", // Inter
        fontSize: "0.875rem", 
      },
      input: {
        background: "var(--surface-card, #1C1C1C)", 
        color: "var(--surface-on, #FFFFFF)",
        borderColor: "var(--border-color-default, #444444)",
        borderRadius: "var(--radius-sm, 4px)",
        padding: "0.7rem 0.9rem", 
        borderWidth: "1px",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)", 
        focus: {
          borderColor: "var(--brand-main)", 
          boxShadow: "0 0 0 2.5px rgba(255, 54, 0, 0.4), inset 0 1px 2px rgba(0,0,0,0.3)", 
          background: "var(--surface-card, #1C1C1C)", 
        },
        placeholderColor: "var(--surface-muted-fg, #A0A0A0)",
        fontFamily: "var(--font-family-sans)", // Inter
        fontSize: "0.9375rem",
      },
      card: {
        background: "var(--surface-card, #1C1C1C)",
        borderColor: "var(--border-color-subtle, #333333)", 
        borderWidth: "1px",
        borderRadius: "var(--radius-md, 6px)", 
        boxShadow: "var(--shadow-lg), 0 0 0 0.5px rgba(255, 54, 0, 0.1)", 
        padding: "1.3rem",
        header: {
          padding: "1rem 1.3rem 0.75rem",
          titleColor: "var(--brand-main)", 
          descriptionColor: "var(--surface-muted-fg, #A0A0A0)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontFamily: "var(--font-family-display)" // Syne
        },
        fontFamily: "var(--font-family-display)", // Syne for card titles (if used directly on card)
      },
      badge: {
        variantDefault: {
          background: "var(--surface-muted, #3A3A3A)",
          color: "var(--brand-main)", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem", 
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          borderWidth: "1px",
          borderColor: "rgba(255, 54, 0, 0.2)", 
          fontFamily: "var(--font-family-sans)" // Inter
        },
        variantDestructive: {
          background: "var(--semantic-destructive)", 
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)" // Inter
        },
        variantSuccess: {
          background: "var(--brand-main)", 
          color: "var(--brand-on)", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)" // Inter
        },
        variantWarning: {
          background: "var(--semantic-warning)",
          color: "var(--surface-on)", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)" // Inter
        },
        variantInfo: {
          background: "var(--semantic-info)",
          color: "#FFFFFF", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)" // Inter
        },
      },
      tooltip: {
        background: "rgba(10,10,10,0.92)", 
        color: "var(--brand-main)", 
        borderColor: "rgba(255, 54, 0, 0.3)", 
        borderWidth: "1px",
        borderRadius: "var(--radius-sm, 4px)",
        padding: "0.4rem 0.7rem",
        boxShadow: "var(--shadow-md), 0 0 8px rgba(255, 54, 0, 0.2)", 
        fontSize: "0.8rem",
        backdropFilter: "blur(6px)",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        fontFamily: "var(--font-family-sans)" // Inter
      },
      charts: {
        gridStrokeColor: "rgba(68,68,68,0.5)", 
        axisStrokeColor: "#A0A0A0",
        axisTextColor: "#FFFFFF",
        legendTextColor: "var(--surface-on)",
        tooltipCursorFill: "rgba(255, 54, 0, 0.1)", 
      },
      loadingIndicator: {
        background: "var(--surface-muted)",
        color: "var(--brand-main)", 
        textColor: "var(--surface-muted-fg)", 
        fontFamily: "var(--font-family-sans)" // Inter
      }
    },
    componentShowcase: {
      title: "Nextgen UI Components",
      description: "Futuristic and bold UI elements for the Nextgen experience.",
      interactiveElements: [
        {
          id: "button-primary-nextgen",
          name: "Primary Button (Nextgen)",
          description: "Core action, high impact.",
          displayComponent: "ENGAGE"
        },
        {
          id: "button-secondary-nextgen",
          name: "Secondary Button (Nextgen)",
          description: "Alternative actions, system settings.",
          displayComponent: "SYSTEMS CHECK"
        },
        {
          id: "button-outline-nextgen",
          name: "Outline Button (Nextgen)",
          description: "Subtle options, mode switching.",
          displayComponent: "View Modes"
        },
        {
          id: "badge-status-nextgen",
          name: "Status Badge (Nextgen)",
          description: "Indicates system status or power levels.",
          displayComponent: "ONLINE"
        },
        {
          id: "badge-alert-nextgen",
          name: "Alert Badge (Nextgen)",
          description: "Critical system alerts or updates.",
          displayComponent: "Core Update"
        }
      ],
      forms: [
        {
          id: "input-text-nextgen",
          name: "Text Input (Nextgen)",
          description: "Sleek input fields for configurations.",
          displayComponent: "Enter Command"
        },
        {
          id: "input-search-nextgen",
          name: "Search Bar (Nextgen)",
          description: "Search within the Nextgen interface.",
          displayComponent: "Search Database"
        }
      ],
      feedbackIndicators: [
        {
          id: "loading-indicator-nextgen",
          name: "Loading Core (Nextgen)",
          description: "Loading indicator with a futuristic feel.",
          displayComponent: "Initializing Core..."
        }
      ]
    },
    supplementaryChartColors: ["#FF3600", "#D32F2F", "#FFA000", "#1976D2", "#AEAEAE"],
  },
  // END OF NEW NEXTGEN THEME
  // ... include all other brands (Microsoft, Spotify) with the same structure
];


const DEFAULT_SHAPE = {
  radiusSm: "0.25rem",
  radius: "0.5rem",
  radiusLg: "0.75rem",
  radiusXl: "1rem",
  componentStyles: {}, // Deep copy Razer's componentStyles
  componentShowcase: {}, // Deep copy Razer's componentShowcase
  supplementaryChartColors: ["#FF3600", "#D32F2F", "#FFA000", "#1976D2", "#AEAEAE"], // New primary and semantic colors
};

const DEFAULT_TYPOGRAPHY = {
  fontDisplay: "swap",
  fontSans: "system-ui, sans-serif",
  fontMono: "ui-monospace, monospace",
  weightNormal: "400",
  weightMedium: "500",
  weightSemibold: "600",
  weightBold: "700",
  leading: "1.5",
      tracking: "0",
};

const DEFAULT_MOTION = {
  motionFast: "120ms",
  motionStandard: "240ms",
  motionSlow: "360ms",
  ease: "cubic-bezier(.4,0,.2,1)",
  easeIn: "cubic-bezier(.4,0,1,1)",
  easeOut: "cubic-bezier(0,0,.2,1)",
};

const DEFAULT_ELEVATION = {
  shadowSm: "0 1px 2px rgba(0,0,0,.02)",
  shadowMd: "0 2px 4px rgba(0,0,0,.04)",
  shadowLg: "0 4px 8px rgba(0,0,0,.06)",
  shadowXl: "0 8px 16px rgba(0,0,0,.08)",
};

const DEFAULT_SPACING = {
  space1: "0.25rem",
  space2: "0.5rem",
  space3: "0.75rem",
  space4: "1rem",
  space5: "1.5rem",
  space6: "2rem",
  space8: "3rem",
  space12: "4rem",
};

// Define TokenGroup type
type TokenGroup = {
  prefix: string;
  source: any;
  keys: { themeKey: string; name: string; fallback: string }[];
};

// Completely refactored CSS variable generation with theme-first approach
export function makeCssVars(b: BrandDefinition): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Merge defaults with theme overrides - THEME FIRST!
  const shape = { ...DEFAULT_SHAPE, ...(b.shape ?? {}) };
  const typography = { ...DEFAULT_TYPOGRAPHY, ...(b.typography ?? {}) };
  const motion = { ...DEFAULT_MOTION, ...(b.motion ?? {}) };
  const elevation = { ...DEFAULT_ELEVATION, ...(b.elevation ?? {}) };
  const spacing = { ...DEFAULT_SPACING, ...(b.spacing ?? {}) };
  const gradient =
    b.gradient ?? {
      from: b.brand.main.hex, 
      to: b.brand.secondary.hex, 
      accent: b.brand.main.hex, 
    };

  // 1. FOUNDATION TOKENS - Core colors and values
  const foundationTokens: Record<string, string> = {
    // Brand colors
    "brand-main": b.brand.main.hex, 
    "brand-on": b.brand.on,
    "brand-secondary": b.brand.secondary.hex, 

    // Surface colors
    "surface-bg": b.surface.background,
    "surface-card": b.surface.card,
    "surface-popover": b.surface.popover,
    "surface-on": b.surface.on,
    "surface-muted": b.surface.muted,
    "surface-muted-fg": b.surface.mutedForeground,

    // Semantic colors
    "semantic-destructive": b.semantic.destructive,
    "semantic-success": b.semantic.success,
    "semantic-warning": b.semantic.warning,
    "semantic-info": b.semantic.info,
  };

  // 2. DESIGN TOKENS (DRY via tokenGroups)
  const tokenGroups: TokenGroup[] = [
    {
      prefix: 'border-color',
      source: b.borderStyles ?? {},
      keys: [
        { themeKey: 'defaultColor', name: 'default', fallback: 'transparent' },
        { themeKey: 'subtleColor', name: 'subtle', fallback: 'color-mix(in srgb, var(--surface-muted-fg) 20%, transparent)' },
        { themeKey: 'strongColor', name: 'strong', fallback: 'color-mix(in srgb, var(--surface-muted-fg) 40%, transparent)' },
      ],
    },
    {
      prefix: 'border-width', // Added border-width group
      source: b.borderStyles ?? {},
      keys: [
        { themeKey: 'thinWidth', name: 'thin', fallback: '0.5px' },
        { themeKey: 'defaultWidth', name: 'default', fallback: '1px' },
        { themeKey: 'thickWidth', name: 'thick', fallback: '2px' },
      ],
    },
    { // Added border-style
      prefix: 'border-style',
      source: b.borderStyles ?? {},
      keys: [
        { themeKey: 'defaultStyle', name: 'default', fallback: 'solid' },
      ]
    },
    {
      prefix: 'shadow',
      source: elevation, // Use merged elevation
      keys: [
        { themeKey: 'shadowXs', name: 'xs', fallback: '0 1px 2px rgba(0,0,0,0.02)' },
        { themeKey: 'shadowSm', name: 'sm', fallback: '0 1px 3px rgba(0,0,0,0.04)' },
        { themeKey: 'shadowMd', name: 'md', fallback: '0 2px 6px rgba(0,0,0,0.06)' },
        { themeKey: 'shadowLg', name: 'lg', fallback: '0 4px 12px rgba(0,0,0,0.08)' },
        { themeKey: 'shadowXl', name: 'xl', fallback: '0 8px 24px rgba(0,0,0,0.12)' },
      ],
    },
    { // Added brand-specific shadows
      prefix: 'shadow-brand',
      source: b.elevation ?? {},
      keys: [
        { themeKey: 'shadowBrandSm', name: 'sm', fallback: '0 2px 4px color-mix(in srgb, var(--brand-main) 15%, transparent)' },
        { themeKey: 'shadowBrandMd', name: 'md', fallback: '0 4px 8px color-mix(in srgb, var(--brand-main) 20%, transparent)' },
        { themeKey: 'shadowBrandLg', name: 'lg', fallback: '0 8px 16px color-mix(in srgb, var(--brand-main) 25%, transparent)' },
      ]
    },
    {
      prefix: 'radius',
      source: shape, // Use merged shape
      keys: [
        { themeKey: 'radiusXs', name: 'xs', fallback: '0.125rem' },
        { themeKey: 'radiusSm', name: 'sm', fallback: '0.25rem' },
        { themeKey: 'radius', name: 'md', fallback: '0.5rem' }, // Note: themeKey 'radius' for 'md'
        { themeKey: 'radiusLg', name: 'lg', fallback: '0.75rem' },
        { themeKey: 'radiusXl', name: 'xl', fallback: '1rem' },
        { themeKey: 'radiusFull', name: 'full', fallback: '9999px' },
      ],
    },
    { // Added bg tokens
      prefix: 'bg',
      source: b.surface,
      keys: [
        { themeKey: 'background', name: 'primary', fallback: 'var(--surface-bg)'}, //  CSS var correct
        { themeKey: 'card', name: 'secondary', fallback: 'var(--surface-card)'}, //  CSS var correct
        { themeKey: 'muted', name: 'muted', fallback: 'var(--surface-muted)'}, //  CSS var correct
        { themeKey: 'popover', name: 'popover', fallback: 'var(--surface-popover)'}, //  CSS var correct
        { themeKey: 'brandSubtle', name: 'brand-subtle', fallback: 'color-mix(in srgb, var(--brand-main) 10%, transparent)'}, // CSS var correct
      ]
    },
    { // Added text tokens
      prefix: 'text',
      source: b.surface,
      keys: [
        { themeKey: 'on', name: 'primary', fallback: 'var(--surface-on)' }, // CSS var correct
        { themeKey: 'mutedForeground', name: 'secondary', fallback: 'var(--surface-muted-fg)' }, // CSS var correct
        { themeKey: 'textMuted', name: 'muted', fallback: 'var(--surface-muted-fg)' }, // CSS var correct
      ]
    },
    {
      prefix: 'space',
      source: spacing, // Use merged spacing
      keys: [
        { themeKey: 'space1', name: 'xs', fallback: '0.25rem' },
        { themeKey: 'space2', name: 'sm', fallback: '0.5rem' },
        { themeKey: 'space4', name: 'md', fallback: '1rem' }, // Note: themeKey 'space4' for 'md'
        { themeKey: 'space5', name: 'lg', fallback: '1.5rem' },
        { themeKey: 'space6', name: 'xl', fallback: '2rem' },
        { themeKey: 'space8', name: '2xl', fallback: '3rem' },
      ],
    },
    { // Added padding tokens
        prefix: 'padding',
        source: b.spacing ?? {},
        keys: [
            { themeKey: 'paddingInput', name: 'input', fallback: '0.75rem 1rem'},
            { themeKey: 'paddingButton', name: 'button', fallback: '0.75rem 1.5rem'},
            { themeKey: 'paddingCard', name: 'card', fallback: '1.25rem'},
            { themeKey: 'paddingCompact', name: 'compact', fallback: '0.5rem 0.75rem'},
        ]
    },
    { // Added font-weight tokens
        prefix: 'font-weight',
        source: typography, // Use merged typography
        keys: [
            { themeKey: 'weightNormal', name: 'normal', fallback: '400'},
            { themeKey: 'weightMedium', name: 'medium', fallback: '500'},
            { themeKey: 'weightSemibold', name: 'semibold', fallback: '600'},
            { themeKey: 'weightBold', name: 'bold', fallback: '700'},
        ]
    },
    { // Added font-family tokens
        prefix: 'font-family',
        source: typography, // Use merged typography
        keys: [
            { themeKey: 'fontSans', name: 'sans', fallback: 'system-ui, sans-serif'},
            { themeKey: 'fontDisplay', name: 'display', fallback: typography.fontSans ?? 'system-ui, sans-serif'},
            { themeKey: 'fontMono', name: 'mono', fallback: 'ui-monospace, monospace'},
        ]
    },
     { // Added font-size tokens
        prefix: 'font-size',
        source: typography, // Use merged typography
        keys: [
            { themeKey: 'fontSizeXs', name: 'xs', fallback: '0.75rem'},
            { themeKey: 'fontSizeSm', name: 'sm', fallback: '0.875rem'},
            { themeKey: 'fontSizeBase', name: 'base', fallback: '1rem'},
            { themeKey: 'fontSizeLg', name: 'lg', fallback: '1.125rem'},
            { themeKey: 'fontSizeXl', name: 'xl', fallback: '1.25rem'}, // Corrected from 1.375rem to 1.25rem based on original
        ]
    },
    { // Added line-height and letter-spacing
        prefix: '', // No prefix for these direct properties
        source: typography,
        keys: [
            { themeKey: 'leading', name: 'line-height', fallback: '1.5'},
            { themeKey: 'tracking', name: 'letter-spacing', fallback: '0'},
        ]
    },
    {
      prefix: 'motion',
      source: motion, // Use merged motion
      keys: [
        { themeKey: 'motionFast', name: 'fast', fallback: '120ms' },
        { themeKey: 'motionStandard', name: 'standard', fallback: '240ms' },
        { themeKey: 'motionSlow', name: 'slow', fallback: '360ms' },
        { themeKey: 'ease', name: 'ease', fallback: 'cubic-bezier(.4,0,.2,1)' },
        { themeKey: 'easeIn', name: 'ease-in', fallback: 'cubic-bezier(.4,0,1,1)' },
        { themeKey: 'easeOut', name: 'ease-out', fallback: 'cubic-bezier(0,0,.2,1)' },
      ],
    },
    {
      prefix: 'gradient',
      source: gradient, // Use merged gradient
      keys: [
        { themeKey: 'from', name: 'from', fallback: gradient.from }, // Fallback uses merged gradient
        { themeKey: 'to', name: 'to', fallback: gradient.to }, // Fallback uses merged gradient
        { themeKey: 'accent', name: 'accent', fallback: gradient.accent ?? gradient.from }, // Fallback uses merged gradient
      ],
    },
  ];

  const designTokens = tokenGroups.reduce((tokens, group) => {
    group.keys.forEach(({ themeKey, name, fallback }) => {
      const varName = group.prefix ? `${group.prefix}-${name}` : name; // Handle empty prefix for direct properties
      const themeValue = group.source?.[themeKey];
      tokens[varName] = String(themeValue ?? fallback); // Ensure value is string
    });
    return tokens;
  }, {} as Record<string, string>);
  
  // Add 'border-color-brand' and 'text-brand', 'text-on-brand' separately as they directly use CSS vars
  designTokens['border-color-brand'] = 'var(--brand-main)';
  designTokens['text-brand'] = 'var(--brand-main)';
  designTokens['text-on-brand'] = 'var(--brand-on)';
  designTokens['bg-brand'] = 'var(--brand-main)'; // Added missing bg-brand

  // Add 'border-width-none' and 'shadow-none', 'radius-none', 'bg-transparent'
  designTokens['border-width-none'] = '0px';
  designTokens['shadow-none'] = 'none';
  designTokens['radius-none'] = '0';
  designTokens['bg-transparent'] = 'transparent';


  // Add foundation and design tokens
  Object.entries({ ...foundationTokens, ...designTokens }).forEach(
    ([key, value]) => {
      cssVars[`--${key}`] = String(value);
    }
  );

  // 3. STANDARD DESIGN SYSTEM TOKENS - These are the main tokens used by components
  const standardTokens = {
    // Core semantic tokens
    background: "var(--surface-bg)",
    foreground: "var(--surface-on)",
    card: "var(--surface-card)",
    "card-foreground": "var(--surface-on)",
    popover: "var(--surface-popover)",
    "popover-foreground": "var(--surface-on)",
    primary: "var(--brand-main)",
    "primary-foreground": "var(--brand-on)",
    secondary: "var(--surface-muted)",
    "secondary-foreground": "var(--surface-on)",
    muted: "var(--surface-muted)",
    "muted-foreground": "var(--surface-muted-fg)",
    accent: "var(--surface-popover)",
    "accent-foreground": "var(--surface-on)",
    destructive: "var(--semantic-destructive)",
    "destructive-foreground": "#FFFFFF", // Assuming white text on destructive, can be themed
    success: "var(--semantic-success)",
    "success-foreground": "#FFFFFF", // Assuming white text on success
    warning: "var(--semantic-warning)",
    "warning-foreground": "var(--surface-on)", // Assuming dark text on warning
    info: "var(--semantic-info)",
    "info-foreground": "#FFFFFF", // Assuming white text on info
    input: "var(--bg-primary)",
    ring: "var(--brand-main)",

    // Chart colors
    "chart-1": "var(--brand-main)", // Uses CSS var, correct
    "chart-2": "var(--semantic-success)",
    "chart-3": "var(--semantic-info)",
    "chart-4": "var(--semantic-warning)",
    "chart-5": "var(--semantic-destructive)",
  };

  Object.entries(standardTokens).forEach(([key, value]) => {
    cssVars[`--${key}`] = value;

    // Add brand-specific aliases for semantic colors
    if (key === "destructive" || key === "success" || key === "warning" || key === "info") {
      // Determine the core color name (e.g., 'red', 'green')
      let colorName = key;
      if (key === "destructive") colorName = "red";
      else if (key === "success") colorName = "green";
      else if (key === "warning") colorName = "yellow"; // or orange depending on preference
      else if (key === "info") colorName = "blue";

      cssVars[`--brand-${b.id}-${colorName}`] = `var(--semantic-${key})`;
      
      // Also add aliases for their foregrounds if they exist
      if (standardTokens[`${key}-foreground`]) {
        cssVars[`--brand-${b.id}-${colorName}-foreground`] = `var(--${key}-foreground)`;
      }
    }
  });

  // 4. COMPONENT DEFAULTS - Using theme values first, then reusable tokens
  const componentDefaults = {
    // Card defaults - theme component styles first, then token fallbacks
    "card-bg": b.componentStyles?.card?.background ?? "var(--card)",
    "card-border-color":
      b.componentStyles?.card?.borderColor ?? "var(--border-color-default)",
    "card-border-width":
      b.componentStyles?.card?.borderWidth ?? "var(--border-width-default)",
    "card-border-style":
      b.componentStyles?.card?.borderStyle ?? "var(--border-style)",
    "card-radius":
      b.componentStyles?.card?.borderRadius ?? "var(--radius-lg)",
    "card-shadow": b.componentStyles?.card?.boxShadow ?? "var(--shadow-md)",
    "card-padding": b.componentStyles?.card?.padding ?? "var(--padding-card)",

    // Button defaults - theme first
    "button-radius":
      b.componentStyles?.button?.primary?.default?.borderRadius ??
      "var(--radius-md)",
    "button-padding":
      b.componentStyles?.button?.primary?.default?.padding ??
      "var(--padding-button)",
    "button-font-weight":
      b.componentStyles?.button?.primary?.default?.fontWeight ??
      "var(--font-weight-semibold)",
    "button-font-family":
      b.componentStyles?.button?.fontFamily ?? "var(--font-family-sans)",
    "button-shadow":
      b.componentStyles?.button?.primary?.default?.boxShadow ??
      "var(--shadow-sm)",

    // Input defaults - theme first
    "input-bg": b.componentStyles?.input?.background ?? "var(--input)",
    "input-border-color":
      b.componentStyles?.input?.borderColor ?? "var(--border-color-subtle)",
    "input-border-width":
      b.componentStyles?.input?.borderWidth ?? "var(--border-width-default)",
    "input-border-style":
      b.componentStyles?.input?.borderStyle ?? "var(--border-style)",
    "input-radius":
      b.componentStyles?.input?.borderRadius ?? "var(--radius-md)",
    "input-padding":
      b.componentStyles?.input?.padding ?? "var(--padding-input)",
    "input-text": b.componentStyles?.input?.color ?? "var(--foreground)",
    "input-font-family":
      b.componentStyles?.input?.fontFamily ?? "var(--font-family-sans)",

    // Navigation defaults - theme first
    "nav-bg": b.componentStyles?.nav?.background ?? "var(--background)",
    "nav-border-color":
      b.componentStyles?.nav?.borderColor ?? "var(--border-color-default)",
    "nav-border-width":
      b.componentStyles?.nav?.borderWidth ?? "var(--border-width-none)",
    "nav-border-style":
      b.componentStyles?.nav?.borderStyle ?? "var(--border-style)",
    "nav-shadow": b.componentStyles?.nav?.boxShadow ?? "var(--shadow-sm)",
    "nav-backdrop-filter": b.componentStyles?.nav?.backdropFilter ?? "none",

    // Tooltip defaults - theme first
    "tooltip-bg": b.componentStyles?.tooltip?.background ?? "var(--popover)",
    "tooltip-text":
      b.componentStyles?.tooltip?.color ?? "var(--popover-foreground)",
    "tooltip-border-color":
      b.componentStyles?.tooltip?.borderColor ?? "var(--border-color-subtle)",
    "tooltip-border-width":
      b.componentStyles?.tooltip?.borderWidth ?? "var(--border-width-default)",
    "tooltip-border-style":
      b.componentStyles?.tooltip?.borderStyle ?? "var(--border-style)",
    "tooltip-radius":
      b.componentStyles?.tooltip?.borderRadius ?? "var(--radius-sm)",
    "tooltip-shadow":
      b.componentStyles?.tooltip?.boxShadow ?? "var(--shadow-md)",
    "tooltip-padding":
      b.componentStyles?.tooltip?.padding ?? "var(--padding-compact)",
    "tooltip-font-size":
      b.componentStyles?.tooltip?.fontSize ?? "var(--font-size-sm)",
  };

  Object.entries(componentDefaults).forEach(([key, value]) => {
    cssVars[`--${key}`] = String(value);
  });

  // 5. COMPONENT OVERRIDES - Only add specific overrides for complex components
  addSmartComponentOverrides(cssVars, b);

  return cssVars;
}

function addSmartComponentOverrides(
  cssVars: Record<string, string>,
  b: BrandDefinition
) {
  // Hero overrides
  if (b.componentStyles?.hero) {
    const hero = b.componentStyles.hero;
    if (hero.background) cssVars["--hero-bg"] = hero.background;
    if (hero.backgroundImage) cssVars["--hero-bg-image"] = hero.backgroundImage;
    if (hero.backgroundSize) cssVars["--hero-bg-size"] = hero.backgroundSize;
    if (hero.backgroundPosition)
      cssVars["--hero-bg-position"] = hero.backgroundPosition;
    if (hero.borderColor) cssVars["--hero-border-color"] = hero.borderColor;
    if (hero.boxShadow) cssVars["--hero-shadow"] = hero.boxShadow;
    if (hero.overlayImage) cssVars["--hero-overlay"] = hero.overlayImage;
  }

  // Button state overrides
  if (b.componentStyles?.button) {
    const button = b.componentStyles.button;

    // Primary button states
    if (button.primary?.default) {
      const primary = button.primary.default;
      if (primary.background) cssVars["--button-primary-bg"] = primary.background;
      if (primary.color) cssVars["--button-primary-text"] = primary.color;
      if (primary.borderColor)
        cssVars["--button-primary-border-color"] = primary.borderColor;
      if (primary.borderWidth)
        cssVars["--button-primary-border-width"] = primary.borderWidth;
    }

    if (button.primary?.hover) {
      const hover = button.primary.hover;
      if (hover.background)
        cssVars["--button-primary-hover-bg"] = hover.background;
      if (hover.boxShadow)
        cssVars["--button-primary-hover-shadow"] = hover.boxShadow;
      if (hover.transform)
        cssVars["--button-primary-hover-transform"] = hover.transform;
    }

    if (button.primary?.focus) {
      const focus = button.primary.focus;
      if (focus.boxShadow)
        cssVars["--button-primary-focus-shadow"] = focus.boxShadow;
    }

    // Secondary button states
    if (button.secondary?.default) {
      const secondary = button.secondary.default;
      if (secondary.background)
        cssVars["--button-secondary-bg"] = secondary.background;
      if (secondary.color) cssVars["--button-secondary-text"] = secondary.color;
      if (secondary.borderColor)
        cssVars["--button-secondary-border-color"] = secondary.borderColor;
      if (secondary.borderWidth)
        cssVars["--button-secondary-border-width"] = secondary.borderWidth;
    }

    if (button.secondary?.hover) {
      const hover = button.secondary.hover;
      if (hover.background)
        cssVars["--button-secondary-hover-bg"] = hover.background;
      if (hover.borderColor)
        cssVars["--button-secondary-hover-border-color"] = hover.borderColor;
    }
  }

  // Input focus state overrides
  if (b.componentStyles?.input?.focus) {
    const focus = b.componentStyles.input.focus;
    if (focus.borderColor)
      cssVars["--input-focus-border-color"] = focus.borderColor;
    if (focus.boxShadow) cssVars["--input-focus-shadow"] = focus.boxShadow;
    if (focus.background) cssVars["--input-focus-bg"] = focus.background;
  }

  // Input placeholder
  if (b.componentStyles?.input?.placeholderColor) {
    cssVars["--input-placeholder-color"] =
      b.componentStyles.input.placeholderColor;
  }

  // Tabs overrides
  if (b.componentStyles?.tabs?.list) {
    const tabsList = b.componentStyles.tabs.list;
    if (tabsList.background) cssVars["--tabs-list-bg"] = tabsList.background;
    if (tabsList.borderColor)
      cssVars["--tabs-list-border-color"] = tabsList.borderColor;
    if (tabsList.borderWidth)
      cssVars["--tabs-list-border-width"] = tabsList.borderWidth;
    if (tabsList.borderRadius)
      cssVars["--tabs-list-radius"] = tabsList.borderRadius;
    if (tabsList.boxShadow) cssVars["--tabs-list-shadow"] = tabsList.boxShadow;
    if (tabsList.padding) cssVars["--tabs-list-padding"] = tabsList.padding;
  }

  if (b.componentStyles?.tabs?.trigger) {
    const trigger = b.componentStyles.tabs.trigger;
    if (trigger.color) cssVars["--tabs-trigger-color"] = trigger.color;
    if (trigger.textColorActive)
      cssVars["--tabs-trigger-active-color"] = trigger.textColorActive;
    if (trigger.background) cssVars["--tabs-trigger-bg"] = trigger.background;
    if (trigger.backgroundActive)
      cssVars["--tabs-trigger-active-bg"] = trigger.backgroundActive;
    if (trigger.borderRadius)
      cssVars["--tabs-trigger-radius"] = trigger.borderRadius;
    if (trigger.padding) cssVars["--tabs-trigger-padding"] = trigger.padding;
    if (trigger.fontSize) cssVars["--tabs-trigger-font-size"] = trigger.fontSize;
    if (trigger.fontWeight)
      cssVars["--tabs-trigger-font-weight"] = String(trigger.fontWeight);
    if (trigger.textTransform)
      cssVars["--tabs-trigger-text-transform"] = trigger.textTransform;
    if (trigger.letterSpacing)
      cssVars["--tabs-trigger-letter-spacing"] = trigger.letterSpacing;
  }

  // Card header overrides
  if (b.componentStyles?.card?.header) {
    const header = b.componentStyles.card.header;
    if (header.padding) cssVars["--card-header-padding"] = header.padding;
    if (header.titleColor)
      cssVars["--card-header-title-color"] = header.titleColor;
    if (header.descriptionColor)
      cssVars["--card-header-desc-color"] = header.descriptionColor;
    if (header.fontWeight)
      cssVars["--card-header-weight"] = String(header.fontWeight);
    if (header.textTransform)
      cssVars["--card-header-text-transform"] = header.textTransform;
  }

  // Showcase card overrides
  ["chart", "component"].forEach((type) => {
    const cardKey = `${type}ShowcaseCard` as keyof typeof b.componentStyles;
    const titleKey = `${type}ShowcaseTitle` as keyof typeof b.componentStyles;

    if (b.componentStyles?.[cardKey]) {
      const card = b.componentStyles[cardKey] as any;
      if (card.background)
        cssVars[`--${type}-showcase-card-bg`] = card.background;
      if (card.borderColor)
        cssVars[`--${type}-showcase-card-border-color`] = card.borderColor;
      if (card.borderWidth)
        cssVars[`--${type}-showcase-card-border-width`] = card.borderWidth;
      if (card.borderRadius)
        cssVars[`--${type}-showcase-card-radius`] = card.borderRadius;
      if (card.boxShadow)
        cssVars[`--${type}-showcase-card-shadow`] = card.boxShadow;
      if (card.overlayImage)
        cssVars[`--${type}-showcase-card-overlay`] = card.overlayImage;
    }

    if (b.componentStyles?.[titleKey]) {
      const title = b.componentStyles[titleKey] as any;
      if (title.color)
        cssVars[`--${type}-showcase-title-color`] = title.color;
      if (title.fontWeight)
        cssVars[`--${type}-showcase-title-weight`] = String(title.fontWeight);
      if (title.fontSize)
        cssVars[`--${type}-showcase-title-size`] = title.fontSize;
      if (title.letterSpacing)
        cssVars[`--${type}-showcase-title-spacing`] = title.letterSpacing;
      if (title.textTransform)
        cssVars[`--${type}-showcase-title-transform`] = title.textTransform;
    }
  });

  // Charts overrides
  if (b.componentStyles?.charts) {
    const charts = b.componentStyles.charts;
    if (charts.gridStrokeColor)
      cssVars["--charts-grid-color"] = charts.gridStrokeColor;
    if (charts.axisStrokeColor)
      cssVars["--charts-axis-color"] = charts.axisStrokeColor;
    if (charts.axisTextColor)
      cssVars["--charts-axis-text-color"] = charts.axisTextColor;
    if (charts.legendTextColor)
      cssVars["--charts-legend-color"] = charts.legendTextColor;
    if (charts.tooltipCursorFill)
      cssVars["--charts-cursor-fill"] = charts.tooltipCursorFill;
  }

  // Token showcase and page card overrides
  if (b.componentStyles?.tokenShowcaseCard) {
    const card = b.componentStyles.tokenShowcaseCard;
    if (card.background) cssVars["--token-card-bg"] = card.background;
    if (card.borderColor)
      cssVars["--token-card-border-color"] = card.borderColor;
    if (card.borderWidth)
      cssVars["--token-card-border-width"] = card.borderWidth;
    if (card.borderRadius) cssVars["--token-card-radius"] = card.borderRadius;
    if (card.boxShadow) cssVars["--token-card-shadow"] = card.boxShadow;
    if (card.padding) cssVars["--token-card-padding"] = card.padding;
    if (card.overlayImage) cssVars["--token-card-overlay"] = card.overlayImage;
  }
  
  if (b.componentStyles?.pageCard) {
    const card = b.componentStyles.pageCard;
    if (card.background) cssVars["--page-card-bg"] = card.background;
    if (card.borderColor)
      cssVars["--page-card-border-color"] = card.borderColor;
    if (card.borderWidth)
      cssVars["--page-card-border-width"] = card.borderWidth;
    if (card.borderRadius) cssVars["--page-card-radius"] = card.borderRadius;
    if (card.boxShadow) cssVars["--page-card-shadow"] = card.boxShadow;
    if (card.padding) cssVars["--page-card-padding"] = card.padding;
  }

  if (b.componentStyles?.overviewCard) {
    const card = b.componentStyles.overviewCard;
    if (card.background) cssVars["--overview-card-bg"] = card.background;
    if (card.borderColor)
      cssVars["--overview-card-border-color"] = card.borderColor;
    if (card.borderWidth)
      cssVars["--overview-card-border-width"] = card.borderWidth;
    if (card.borderRadius)
      cssVars["--overview-card-radius"] = card.borderRadius;
    if (card.boxShadow) cssVars["--overview-card-shadow"] = card.boxShadow;
    if (card.padding) cssVars["--overview-card-padding"] = card.padding;
    if (card.overlayImage)
      cssVars["--overview-card-overlay"] = card.overlayImage;
  }

  if (b.componentStyles?.brandPickerContainer) {
    const container = b.componentStyles.brandPickerContainer;
    if (container.background)
      cssVars["--brand-picker-bg"] = container.background;
    if (container.borderColor)
      cssVars["--brand-picker-border-color"] = container.borderColor;
    if (container.overlayImage)
      cssVars["--brand-picker-overlay"] = container.overlayImage;
  }
}

// Helper function to convert Hex to RGB string
export function hexToRgbString(hex: string): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// Helper function to convert RGB to CMYK string
export function rgbToCmykString(rgbString: string): string {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return "cmyk(0%, 0%, 0%, 100%)"; // Should not happen with valid rgbString

  let r = parseInt(match[1]);
  let g = parseInt(match[2]);
  let b = parseInt(match[3]);

  if (r === 0 && g === 0 && b === 0) {
    return "cmyk(0%, 0%, 0%, 100%)";
  }

  let c = 1 - (r / 255);
  let m = 1 - (g / 255);
  let y = 1 - (b / 255);
  const k = Math.min(c, m, y);

  if (k === 1) {
    return "cmyk(0%, 0%, 0%, 100%)";
  }
  
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}
