import { rgbToCmykString, hexToRgbString } from "../brands";
import { BrandDefinition } from "../brands-types";

export const APPLE_THEME: BrandDefinition = {
  name: "Apple",
  id: "apple",
  description:
    "Modern Apple design system inspired by iOS 17+ with enhanced readability, vibrant system colors, and contemporary styling.",
  brandColors: [
    {
      name: "Apple Blue",
      color: "#007AFF", // System Blue
      variableName: "brand-blue-primary",
      shades: {
        "50": { color: "#F0F8FF", variableName: "brand-blue-50" },
        "100": { color: "#E1F2FF", variableName: "brand-blue-100" },
        "200": { color: "#C2E5FF", variableName: "brand-blue-200" },
        "300": { color: "#84CBFF", variableName: "brand-blue-300" },
        "400": { color: "#4DB8FF", variableName: "brand-blue-400" },
        "500": { color: "#007AFF", variableName: "brand-blue-500" },
        "600": { color: "#0051D5", variableName: "brand-blue-600" },
        "700": { color: "#004299", variableName: "brand-blue-700" },
        "800": { color: "#002E66", variableName: "brand-blue-800" },
        "900": { color: "#001A33", variableName: "brand-blue-900" },
      },
    },
    {
      name: "Apple Green",
      color: "#32D74B", // Modern System Green (iOS 17)
      variableName: "brand-green-primary",
      shades: {
        "50": { color: "#F0FDF4", variableName: "brand-green-50" },
        "100": { color: "#E6FFEC", variableName: "brand-green-100" },
        "200": { color: "#C7F9CC", variableName: "brand-green-200" },
        "300": { color: "#86EFAC", variableName: "brand-green-300" },
        "400": { color: "#4ADE80", variableName: "brand-green-400" },
        "500": { color: "#32D74B", variableName: "brand-green-500" },
        "600": { color: "#22C55E", variableName: "brand-green-600" },
        "700": { color: "#16A34A", variableName: "brand-green-700" },
        "800": { color: "#15803D", variableName: "brand-green-800" },
        "900": { color: "#14532D", variableName: "brand-green-900" },
      },
    },
    {
      name: "Apple Gray",
      color: "#000000", // True black for maximum readability
      variableName: "brand-gray-primary",
      shades: {
        "50": { color: "#FFFFFF", variableName: "brand-gray-50" },
        "100": { color: "#F9F9FB", variableName: "brand-gray-100" },
        "200": { color: "#F2F2F7", variableName: "brand-gray-200" },
        "300": { color: "#E5E5EA", variableName: "brand-gray-300" },
        "400": { color: "#D1D1D6", variableName: "brand-gray-400" },
        "500": { color: "#AEAEB2", variableName: "brand-gray-500" },
        "600": { color: "#424242", variableName: "brand-gray-600" },
        "700": { color: "#2E2E2E", variableName: "brand-gray-700" },
        "800": { color: "#1A1A1A", variableName: "brand-gray-800" },
        "900": { color: "#000000", variableName: "brand-gray-900" },
      },
    },
    {
      name: "Apple Red",
      color: "#FF3B30", // System Red
      variableName: "brand-red-primary",
      shades: {
        "50": { color: "#FEF2F2", variableName: "brand-red-50" },
        "100": { color: "#FEE2E2", variableName: "brand-red-100" },
        "200": { color: "#FECACA", variableName: "brand-red-200" },
        "300": { color: "#FCA5A5", variableName: "brand-red-300" },
        "400": { color: "#F87171", variableName: "brand-red-400" },
        "500": { color: "#FF3B30", variableName: "brand-red-500" },
        "600": { color: "#DC2626", variableName: "brand-red-600" },
        "700": { color: "#B91C1C", variableName: "brand-red-700" },
        "800": { color: "#991B1B", variableName: "brand-red-800" },
        "900": { color: "#7F1D1D", variableName: "brand-red-900" },
      },
    },
    {
      name: "Apple Orange",
      color: "#FF9500", // Modern System Orange
      variableName: "brand-orange-primary",
      shades: {
        "50": { color: "#FFF7ED", variableName: "brand-orange-50" },
        "100": { color: "#FFEDD5", variableName: "brand-orange-100" },
        "200": { color: "#FED7AA", variableName: "brand-orange-200" },
        "300": { color: "#FDBA74", variableName: "brand-orange-300" },
        "400": { color: "#FB923C", variableName: "brand-orange-400" },
        "500": { color: "#FF9500", variableName: "brand-orange-500" },
        "600": { color: "#EA580C", variableName: "brand-orange-600" },
        "700": { color: "#C2410C", variableName: "brand-orange-700" },
        "800": { color: "#9A3412", variableName: "brand-orange-800" },
        "900": { color: "#7C2D12", variableName: "brand-orange-900" },
      },
    },
    {
      name: "Apple Purple",
      color: "#BF5AF2", // Modern System Purple (iOS 17)
      variableName: "brand-purple-primary",
      shades: {
        "50": { color: "#FAF5FF", variableName: "brand-purple-50" },
        "100": { color: "#F3E8FF", variableName: "brand-purple-100" },
        "200": { color: "#E9D5FF", variableName: "brand-purple-200" },
        "300": { color: "#D8B4FE", variableName: "brand-purple-300" },
        "400": { color: "#C084FC", variableName: "brand-purple-400" },
        "500": { color: "#BF5AF2", variableName: "brand-purple-500" },
        "600": { color: "#9333EA", variableName: "brand-purple-600" },
        "700": { color: "#7C3AED", variableName: "brand-purple-700" },
        "800": { color: "#6B21A8", variableName: "brand-purple-800" },
        "900": { color: "#581C87", variableName: "brand-purple-900" },
      },
    },
  ],
  brand: {
    main: {
      name: "Apple Blue (Primary)",
      hex: "#007AFF",
      rgb: "0, 122, 255",
      cmyk: "100, 52, 0, 0",
      variableName: "brand-blue-primary",
    },
    on: "var(--apple-brand-gray-50)",
    secondary: {
      name: "Apple Black (Secondary)",
      hex: "#000000",
      rgb: "0, 0, 0",
      cmyk: "0, 0, 0, 100",
      variableName: "brand-gray-primary",
    },
  },
  supportPalette: [
    {
      name: "Apple Green (Success)",
      hex: "#32D74B",
      rgb: "50, 215, 75",
      cmyk: "77, 0, 65, 16",
      variableName: "semantic-success",
    },
    {
      name: "Apple Red (Destructive)",
      hex: "#FF3B30",
      rgb: "255, 59, 48",
      cmyk: "0, 77, 81, 0",
      variableName: "semantic-destructive",
    },
    {
      name: "Apple Orange (Warning)",
      hex: "#FF9500",
      rgb: "255, 149, 0",
      cmyk: "0, 42, 100, 0",
      variableName: "semantic-warning",
    },
    {
      name: "Apple Blue (Info)",
      hex: "#007AFF",
      rgb: "0, 122, 255",
      cmyk: "100, 52, 0, 0",
      variableName: "semantic-info",
    },
  ],
  surface: {
    background: "var(--apple-brand-gray-50)", // Pure white
    card: "var(--apple-brand-gray-50)", // Cards use white
    popover: "var(--apple-brand-gray-50)", // Clean white
    on: "var(--apple-brand-gray-900)", // True black for maximum readability
    muted: "var(--apple-brand-gray-100)", // Lighter muted background
    mutedForeground: "var(--apple-brand-gray-600)", // Darker Apple System Gray for secondary text
    brandSubtle: "rgba(0, 122, 255, 0.04)",
    textMuted: "var(--apple-brand-gray-500)", // Previous mutedForeground, now for more muted text
  },
  semantic: {
    destructive: "var(--apple-brand-red-primary)",
    success: "var(--apple-brand-green-primary)",
    warning: "var(--apple-brand-orange-primary)",
    info: "var(--apple-brand-blue-primary)",
  },
  shape: {
    radiusXs: "4px",
    radiusSm: "8px",
    radius: "12px",
    radiusLg: "16px",
    radiusXl: "20px",
    radiusFull: "9999px",
  },
  typography: {
    fontDisplay:
      "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    fontSans:
      "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    fontMono:
      "'SF Mono', ui-monospace, 'Menlo', 'Monaco', 'Cascadia Code', monospace",
    weightNormal: "400",
    weightMedium: "500",
    weightSemibold: "600",
    weightBold: "700",
    leading: "1.55",
    tracking: "-0.015em",
    fontSizeXs: "0.75rem", // 12pt
    fontSizeSm: "0.875rem", // 14pt
    fontSizeBase: "1rem", // 16pt
    fontSizeLg: "1.125rem", // 18pt
    fontSizeXl: "1.25rem", // 20pt
  },
  motion: {
    motionFast: "200ms",
    motionStandard: "300ms",
    motionSlow: "500ms",
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  },
  elevation: {
    shadowXs: "0 1px 2px rgba(0,0,0,0.04)",
    shadowSm: "0 1px 3px rgba(0,0,0,0.08)",
    shadowMd: "0 6px 16px rgba(0,0,0,0.07)",
    shadowLg: "0 8px 25px rgba(0,0,0,0.12)",
    shadowXl: "0 16px 40px rgba(0,0,0,0.15)",
    shadowBrandSm: "0 2px 8px rgba(0, 122, 255, 0.15)",
    shadowBrandMd: "0 6px 20px rgba(0, 122, 255, 0.15)",
    shadowBrandLg: "0 8px 25px rgba(0, 122, 255, 0.25)",
  },
  spacing: {
    space1: "0.25rem",
    space2: "0.5rem",
    space3: "0.75rem",
    space4: "1rem",
    space5: "1.25rem",
    space6: "1.5rem",
    space8: "2rem",
    space12: "3rem",
    paddingInput: "var(--space-3) var(--space-md)",
    paddingButton: "0.75rem var(--space-lg)",
    paddingCard: "var(--space-xl)",
    paddingCompact: "var(--space-sm) var(--space-3)",
  },
  gradient: {
    from: "var(--apple-brand-blue-primary)",
    to: "var(--apple-brand-purple-primary)",
    accent: "var(--apple-brand-green-primary)",
  },
  borderStyles: {
    defaultColor: "var(--apple-brand-gray-300)",
    subtleColor: "var(--apple-brand-gray-200)",
    strongColor: "var(--apple-brand-gray-500)",
    defaultWidth: "0.5px",
    thinWidth: "0.5px",
    thickWidth: "1px",
    defaultStyle: "solid",
  },
  stylingPreferences: {
    preferBorderless: false,
    applySpecialLayout: true,
    containerMaxWidth: "max-w-6xl",
    overviewCardBoxShadow: "var(--shadow-md)",
    contentFlexClass: "sm:flex-row items-start",
    footerExtraMargin: "mt-20",
    headingMainText: "Designed for Everyone",
    headingSubtitleText: "Beautiful, accessible, and thoughtfully crafted",
    headingSubtitleClassName:
      "text-[var(--surface-muted-fg)] font-semibold tracking-tight text-lg",
    navTitle: "",
  },
  componentStyles: {
    nav: {
      background: "rgba(255, 255, 255, 0.8)",
      borderColor: "var(--border-color-subtle)",
      borderWidth: "var(--border-default-width)",
      boxShadow: "var(--shadow-sm)",
      backdropFilter: "blur(20px) saturate(1.8)",
      color: "var(--surface-on)", // True black nav text
      fontFamily: "var(--font-family-display)",
    },
    hero: {
      background: "linear-gradient(180deg, var(--surface-background) 0%, var(--surface-muted) 100%)",
      backgroundImage: "none",
      color: "var(--surface-on)", // True black hero text
      boxShadow: "none",
    },
    tabs: {
      list: {
        background: "var(--apple-brand-gray-200)",
        borderRadius: "var(--radius)",
        padding: "var(--space-xs)",
        borderWidth: "var(--border-default-width)",
        borderStyle: "var(--border-default-style)",
        borderColor: "var(--border-color-subtle)",
      },
      trigger: {
        color: "var(--surface-muted-fg)", // Darker Apple System Gray for inactive tab text
        borderRadius: "calc(var(--radius) - var(--space-xs))",
        backgroundActive: "var(--surface-card)",
        textColorActive: "var(--surface-on)", // Black active tab text
        boxShadowActive: "var(--shadow-sm)",
        fontWeight: "var(--font-weight-semibold)", // Bolder tab text
        padding: "var(--space-sm) var(--space-md)",
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-sm)",
      },
    },
    overviewCard: {
      background: "var(--surface-card)",
      borderColor: "var(--border-color-subtle)",
      borderWidth: "var(--border-default-width)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      overlayImage: "none",
    },
    chartShowcaseCard: {
      background: "var(--surface-card)",
      borderColor: "var(--border-color-subtle)",
      borderWidth: "var(--border-default-width)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
    },
    chartShowcaseTitle: {
      color: "var(--surface-on)", // True black titles
      fontWeight: "var(--font-weight-bold)", // Even bolder titles
      fontSize: "var(--font-size-xl)", // Larger titles
      letterSpacing: "var(--letter-spacing)",
      fontFamily: "var(--font-family-display)",
    },
    componentShowcaseCard: {
      background: "var(--surface-card)",
      borderColor: "var(--border-color-subtle)",
      borderWidth: "var(--border-default-width)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
    },
    componentShowcaseTitle: {
      color: "var(--surface-on)", // True black titles
      fontWeight: "var(--font-weight-bold)", // Bolder titles
      fontSize: "var(--font-size-xl)", // Larger titles
      letterSpacing: "var(--letter-spacing)",
      fontFamily: "var(--font-family-display)",
    },
    tokenGroupCard: {
      background: "var(--apple-brand-gray-100)",
      borderColor: "var(--apple-brand-gray-200)",
      borderWidth: "var(--border-default-width)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)",
      padding: "var(--padding-card)",
    },
    brandPickerContainer: {
      background: "rgba(255,255,255,0.9)",
      borderWidth: "var(--border-default-width)",
      borderStyle: "var(--border-default-style)",
      borderColor: "var(--border-color-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
    },
    button: {
      primary: {
        default: {
          background: "var(--apple-brand-blue-primary)",
          color: "var(--apple-brand-gray-50)",
          borderRadius: "var(--radius)",
          boxShadow: "0 3px 8px rgba(0, 122, 255, 0.12), 0 1px 2px rgba(0,0,0,0.03)",
          fontWeight: "var(--font-weight-semibold)",
          letterSpacing: "var(--letter-spacing)",
          padding: "var(--padding-button)",
          textTransform: "none",
          fontSize: "var(--font-size-base)",
          fontFamily: "var(--font-family-sans)",
        },
        hover: {
          background: "var(--apple-brand-blue-600)",
          color: "var(--apple-brand-gray-50)",
          boxShadow: "0 5px 12px rgba(0, 122, 255, 0.18), 0 2px 4px rgba(0,0,0,0.04)",
          transform: "translateY(-1px)",
        },
        active: {
          background: "var(--apple-brand-blue-700)",
          transform: "translateY(0) scale(0.98)",
          boxShadow: "0 2px 6px rgba(0, 122, 255, 0.12), 0 1px 1px rgba(0,0,0,0.03)",
        },
        focus: {
          boxShadow: "0 0 0 4px rgba(0, 122, 255, 0.3)",
        },
      },
      destructive: {
        default: {
          background: "var(--semantic-destructive)",
          color: "var(--apple-brand-gray-50)",
          boxShadow: "0 1px 3px rgba(255, 59, 48, 0.3)",
          fontWeight: "var(--font-weight-semibold)",
          letterSpacing: "var(--letter-spacing)",
          borderRadius: "var(--radius)",
          padding: "var(--padding-button)",
          textTransform: "none",
          fontSize: "var(--font-size-base)",
        },
        hover: {
          background: "var(--apple-brand-red-600)",
          color: "var(--apple-brand-gray-50)",
          boxShadow: "0 2px 8px rgba(255, 59, 48, 0.4)",
          transform: "translateY(-1px)",
        },
        active: {
          background: "var(--apple-brand-red-700)",
          boxShadow: "0 1px 3px rgba(255, 59, 48, 0.3)",
          transform: "translateY(0) scale(0.98)",
        },
      },
      outline: {
        default: {
          background: "transparent",
          borderColor: "var(--apple-brand-blue-primary)",
          borderWidth: "var(--border-thick-width)",
          color: "var(--apple-brand-blue-primary)",
          fontWeight: "var(--font-weight-semibold)",
          borderRadius: "var(--radius)",
          padding: "calc(var(--padding-button) - var(--border-thick-width))",
          textTransform: "none",
          fontSize: "var(--font-size-base)",
        },
        hover: {
          background: "rgba(0, 122, 255, 0.06)",
          color: "var(--apple-brand-blue-600)",
          borderColor: "var(--apple-brand-blue-600)",
          transform: "translateY(-1px)",
        },
        active: {
          background: "rgba(0, 122, 255, 0.12)",
          transform: "translateY(0) scale(0.98)",
        },
      },
      secondary: {
        default: {
          background: "var(--apple-brand-gray-200)",
          color: "var(--surface-on)", // True black button text
          borderColor: "var(--border-color-subtle)",
          borderWidth: "var(--border-default-width)",
          boxShadow: "var(--shadow-xs)",
          fontWeight: "var(--font-weight-semibold)",
          letterSpacing: "var(--letter-spacing)",
          borderRadius: "var(--radius)",
          padding: "calc(var(--padding-button) - var(--border-default-width))",
          textTransform: "none",
          fontSize: "var(--font-size-base)",
        },
        hover: {
          background: "var(--apple-brand-gray-300)",
          borderColor: "var(--border-default-color)",
          boxShadow: "var(--shadow-sm)",
          transform: "translateY(-1px)",
        },
        active: {
          background: "var(--apple-brand-gray-400)",
          borderColor: "var(--apple-brand-gray-500)",
          transform: "translateY(0) scale(0.98)",
        },
      },
      ghost: {
        default: {
          color: "var(--surface-muted-fg)", // Darker Apple System Gray for ghost text
          background: "transparent",
          fontWeight: "var(--font-weight-semibold)",
          padding: "var(--padding-button)",
          borderRadius: "var(--radius)",
          fontSize: "var(--font-size-base)",
        },
        hover: {
          background: "rgba(66, 66, 66, 0.1)",
          color: "var(--apple-brand-gray-700)",
        },
        active: {
          background: "rgba(66, 66, 66, 0.15)",
          transform: "scale(0.98)",
        },
      },
      link: {
        default: {
          color: "var(--apple-brand-blue-primary)",
          fontWeight: "var(--font-weight-semibold)",
          fontSize: "var(--font-size-base)",
        },
        hover: {
          color: "var(--apple-brand-blue-600)",
        },
        active: {
          color: "var(--apple-brand-blue-700)",
          transform: "scale(0.98)",
        },
      },
      fontFamily: "var(--font-family-sans)",
      fontSize: "var(--font-size-base)",
    },
    input: {
      background: "var(--surface-background)",
      color: "var(--surface-on)", // True black input text
      borderColor: "var(--border-color-subtle)",
      borderRadius: "var(--radius)",
      padding: "var(--padding-input)",
      borderWidth: "var(--border-default-width)",
      boxShadow: "var(--shadow-xs)",
      focus: {
        borderColor: "var(--apple-brand-blue-primary)",
        boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.2), var(--shadow-xs)",
        background: "var(--surface-background)",
      },
      placeholderColor: "var(--surface-text-muted)", // Previous textMuted, for placeholder
      fontFamily: "var(--font-family-sans)",
      fontSize: "var(--font-size-base)",
    },
    card: {
      background: "var(--surface-card)",
      borderColor: "var(--border-color-subtle)",
      borderWidth: "var(--border-default-width)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      padding: "var(--padding-card)",
      header: {
        padding: "var(--padding-card) var(--padding-card) var(--space-3)",
        titleColor: "var(--surface-on)", // True black card titles
        descriptionColor: "var(--surface-muted-fg)", // Darker Apple System Gray for descriptions
        letterSpacing: "var(--letter-spacing)",
        fontFamily: "var(--font-family-display)",
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.015) 0%, transparent 10%)",
      },
      fontFamily: "var(--font-family-display)",
    },
    badge: {
      variantDefault: {
        background: "var(--apple-brand-gray-200)",
        color: "var(--surface-on)", // True black badge text
        borderRadius: "var(--radius)",
        padding: "var(--space-xs) var(--space-3)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        letterSpacing: "var(--letter-spacing)",
        fontFamily: "var(--font-family-sans)",
        textTransform: "none",
        borderWidth: "var(--border-default-width)",
        borderStyle: "var(--border-default-style)",
        borderColor: "var(--border-color-subtle)",
      },
      variantDestructive: {
        background: "var(--semantic-destructive)",
        color: "var(--apple-brand-gray-50)",
        borderRadius: "var(--radius)",
        padding: "var(--space-xs) var(--space-3)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        fontFamily: "var(--font-family-sans)",
        textTransform: "none",
        borderWidth: "var(--border-default-width)",
        borderStyle: "var(--border-default-style)",
        borderColor: "var(--border-color-subtle)",
      },
      variantSuccess: {
        background: "var(--semantic-success)",
        color: "var(--apple-brand-gray-50)",
        borderRadius: "var(--radius)",
        padding: "var(--space-xs) var(--space-3)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        fontFamily: "var(--font-family-sans)",
      },
      variantWarning: {
        background: "var(--semantic-warning)",
        color: "var(--apple-brand-gray-50)",
        borderRadius: "var(--radius)",
        padding: "var(--space-xs) var(--space-3)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        fontFamily: "var(--font-family-sans)",
      },
      variantInfo: {
        background: "var(--semantic-info)",
        color: "var(--apple-brand-gray-50)",
        borderRadius: "var(--radius)",
        padding: "var(--space-xs) var(--space-3)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        fontFamily: "var(--font-family-sans)",
      },
    },
    tooltip: {
      background: "rgba(0, 0, 0, 0.95)", // Darker tooltip background
      color: "var(--apple-brand-gray-50)",
      borderRadius: "var(--radius)",
      padding: "var(--space-sm) var(--space-3)",
      boxShadow: "var(--shadow-md)",
      fontSize: "var(--font-size-sm)",
      letterSpacing: "var(--letter-spacing)",
      fontFamily: "var(--font-family-sans)",
      fontWeight: "var(--font-weight-medium)",
      backdropFilter: "blur(20px) saturate(1.8)",
    },
    charts: {
      gridStrokeColor: "rgba(209,209,214,0.5)",
      axisStrokeColor: "var(--apple-brand-gray-500)",
      axisTextColor: "var(--surface-muted-fg)", // Darker Apple System Gray for chart text
      legendTextColor: "var(--surface-on)", // True black legend text
      tooltipCursorFill: "rgba(0, 122, 255, 0.1)",
    },
    loadingIndicator: {
      background: "var(--surface-muted)",
      color: "var(--apple-brand-blue-primary)",
      textColor: "var(--surface-muted-fg)", // Darker Apple System Gray for loading text
      fontFamily: "var(--font-family-sans)",
    },
  },
  componentShowcase: {
    title: "Modern Apple Design",
    description:
      "Contemporary Apple design system with maximum readability and vibrant colors for accessibility.",
    interactiveElements: [
      {
        id: "button-primary-apple",
        name: "Primary Button",
        description:
          "Bold, accessible buttons with enhanced shadows and micro-interactions.",
        displayComponent: "Continue",
      },
      {
        id: "button-secondary-apple",
        name: "Secondary Button",
        description: "Clean secondary buttons with dark, readable text.",
        displayComponent: "Not Now",
      },
      {
        id: "button-outline-apple",
        name: "Outline Button",
        description:
          "Modern outlined buttons with enhanced hover states.",
        displayComponent: "Learn More",
      },
      {
        id: "badge-status-apple",
        name: "Status Badge",
        description: "High-contrast badges with maximum readability.",
        displayComponent: "New",
      },
      {
        id: "badge-alert-apple",
        name: "System Badge",
        description:
          "Vibrant system badges with accessible contrast ratios.",
        displayComponent: "Beta",
      },
    ],
    forms: [
      {
        id: "input-text-apple",
        name: "Text Field",
        description:
          "Modern inputs with dark, readable text and enhanced focus states.",
        displayComponent: "Enter your email",
      },
      {
        id: "input-search-apple",
        name: "Search Field",
        description:
          "Contemporary search interface with high-contrast text.",
        displayComponent: "Search",
      },
    ],
    feedbackIndicators: [
      {
        id: "loading-indicator-apple",
        name: "Loading State",
        description: "Clean loading indicators with dark, readable text.",
        displayComponent: "Loading...",
      },
    ],
  },
  supplementaryChartColors: [
    "var(--apple-brand-blue-primary)",
    "var(--apple-brand-green-primary)",
    "var(--apple-brand-red-primary)",
    "var(--apple-brand-orange-primary)",
    "var(--apple-brand-purple-primary)",
    "var(--apple-brand-purple-600)",
  ],
};
