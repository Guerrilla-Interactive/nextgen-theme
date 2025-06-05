import { hexToRgbString, rgbToCmykString } from "../brands";
import { BrandDefinition } from "../brands-types";

export const AIRBNB_THEME: BrandDefinition = {
    name: "Airbnb",
    id: "airbnb",
    description:
      "Global hospitality company that operates an online marketplace for lodging, primarily homestays, or tourism experiences.",
    brandColors: [
      {
        name: "Airbnb Pink",
        color: "#FF5A5F",
        variableName: "brand-pink-primary",
        shades: {
          "50": { color: "#FFE6E6", variableName: "brand-pink-50" },
          "100": { color: "#FFCCCC", variableName: "brand-pink-100" },
          "200": { color: "#FF9999", variableName: "brand-pink-200" },
          "300": { color: "#FF6666", variableName: "brand-pink-300" },
          "400": { color: "#FF5A5F", variableName: "brand-pink-400" },
          "500": { color: "#FF5A5F", variableName: "brand-pink-500" },
          "600": { color: "#E6444A", variableName: "brand-pink-600" },
          "700": { color: "#CC2F35", variableName: "brand-pink-700" },
          "800": { color: "#B31A20", variableName: "brand-pink-800" },
          "900": { color: "#99050B", variableName: "brand-pink-900" },
        }
      },
      {
        name: "Airbnb Blue",
        color: "#00A699",
        variableName: "brand-blue-secondary",
        shades: {
          "50": { color: "#E0F7F6", variableName: "brand-blue-50" },
          "100": { color: "#B3EBE7", variableName: "brand-blue-100" },
          "200": { color: "#80DDD9", variableName: "brand-blue-200" },
          "300": { color: "#4DCFCB", variableName: "brand-blue-300" },
          "400": { color: "#1AC2BD", variableName: "brand-blue-400" },
          "500": { color: "#00A699", variableName: "brand-blue-500" },
          "600": { color: "#009285", variableName: "brand-blue-600" },
          "700": { color: "#007E72", variableName: "brand-blue-700" },
          "800": { color: "#006A5F", variableName: "brand-blue-800" },
          "900": { color: "#00564C", variableName: "brand-blue-900" },
        }
      },
      {
        name: "Airbnb Gray",
        color: "#767676",
        variableName: "brand-gray-neutral",
        shades: {
          "50": { color: "#F7F7F7", variableName: "brand-gray-50" },
          "100": { color: "#E8E8ED", variableName: "brand-gray-100" },
          "200": { color: "#D2D2D7", variableName: "brand-gray-200" },
          "300": { color: "#BDBDBD", variableName: "brand-gray-300" },
          "400": { color: "#999999", variableName: "brand-gray-400" },
          "500": { color: "#767676", variableName: "brand-gray-500" },
          "600": { color: "#5E5E5E", variableName: "brand-gray-600" },
          "700": { color: "#484848", variableName: "brand-gray-700" },
          "800": { color: "#333333", variableName: "brand-gray-800" },
          "900": { color: "#222222", variableName: "brand-gray-900" },
        }
      }
    ],
    brand: {
      main: {
        name: "Airbnb Pink (Primary)",
        hex: "#FF5A5F",
        rgb: hexToRgbString("#FF5A5F"),
        cmyk: rgbToCmykString(hexToRgbString("#FF5A5F")),
        variableName: "brand-main",
      },
      on: "#FFFFFF",
        secondary: {
        name: "Airbnb Blue (Secondary)",
        hex: "#00A699",
        rgb: hexToRgbString("#00A699"),
        cmyk: rgbToCmykString(hexToRgbString("#00A699")),
        variableName: "brand-secondary",
      },
    },
    supportPalette: [ // Defined first as the source of truth
      {
        name: "Airbnb Destructive",
        hex: "#FF171F",
        rgb: hexToRgbString("#FF171F"),
        cmyk: rgbToCmykString(hexToRgbString("#FF171F")),
        variableName: "semantic-destructive",
      },
      {
        name: "Airbnb Success",
        hex: "#008A0E",
        rgb: hexToRgbString("#008A0E"),
        cmyk: rgbToCmykString(hexToRgbString("#008A0E")),
        variableName: "semantic-success",
      },
      {
        name: "Airbnb Warning",
        hex: "#FFC107",
        rgb: hexToRgbString("#FFC107"),
        cmyk: rgbToCmykString(hexToRgbString("#FFC107")),
        variableName: "semantic-warning",
      },
      {
        name: "Airbnb Info",
        hex: "#007AFF",
        rgb: hexToRgbString("#007AFF"),
        cmyk: rgbToCmykString(hexToRgbString("#007AFF")),
        variableName: "semantic-info",
      },
    ],
    surface: {
      background: "#FFFFFF",
      card: "#FFFFFF",
      popover: "#FFFFFF",
      on: "#222222",
      muted: "#F7F7F7",
      mutedForeground: "#767676",
      brandSubtle: "#FFEDED",
      textMuted: "#999999",
    },
    semantic: { // References supportPalette
      destructive: "#FF171F",
      success: "#008A0E",
      warning: "#FFC107",
      info: "#007AFF",
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
      fontDisplay: "'Airbnb Cereal App', 'Helvetica Neue', sans-serif",
      fontSans: "'Airbnb Cereal Book', 'Helvetica Neue', sans-serif",
      fontMono: "'Airbnb Cereal Mono', 'Menlo', monospace",
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
      shadowXs: "0 1px 2px rgba(0,0,0,0.05)",
      shadowSm: "0 2px 5px rgba(0,0,0,0.07)",
      shadowMd: "0 4px 10px rgba(0,0,0,0.08)",
      shadowLg: "0 10px 15px rgba(0,0,0,0.1)",
      shadowXl: "0 20px 25px rgba(0,0,0,0.15)",
      shadowBrandSm: "0 2px 5px rgba(0,0,0,0.08)",
      shadowBrandMd: "0 4px 10px rgba(0,0,0,0.1)",
      shadowBrandLg: "0 10px 20px rgba(0,0,0,0.15)",
    },
    spacing: {
      space1: "0.5rem",  // 8px - Apple uses 8px as base unit
      space2: "1rem",    // 16px
      space3: "1.5rem",  // 24px
      space4: "2rem",    // 32px
      space5: "3rem",    // 48px
      space6: "4rem",    // 64px
      space8: "6rem",    // 96px
      space12: "8rem",   // 128px
      paddingInput: "0.75rem 1rem",
      paddingButton: "0.75rem 1.5rem",
      paddingCard: "1.5rem",
      paddingCompact: "0.5rem 0.75rem",
    },
    gradient: { 
      from: "#007AFF", 
      to: "#5AC8FA", 
      accent: "#5AC8FA" 
    },
    borderStyles: {
      defaultColor: "#D2D2D7",
      subtleColor: "#E8E8ED",
      strongColor: "#86868B",
      defaultWidth: "1px",
      thinWidth: "0.5px", // Apple often uses 0.5px borders
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: {
      preferBorderless: true, // Apple generally prefers borderless designs
      applySpecialLayout: false, // Apple generally prefers borderless designs
      containerMaxWidth: "max-w-5xl",
      overviewCardBoxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      contentFlexClass: "sm:flex-row",
      footerExtraMargin: "",
      headingMainText: "Think different.", 
      headingSubtitleText: "Experience Innovation.", 
      headingSubtitleClassName: "text-muted-foreground font-normal",
      navTitle: "Apple Design System",
    },
    componentStyles: {
      nav: {
        background: "rgba(255, 255, 255, 0.8)",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        boxShadow: "0 1px 0px rgba(0,0,0,0.1)",
        backdropFilter: "blur(20px)",
      },
      hero: { 
        background: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
      },
      tabs: {
        list: {
          background: "#F5F5F7",
          borderColor: "transparent",
          borderWidth: "0px",
          borderStyle: "solid",
          borderRadius: "12px",
          boxShadow: "none",
        },
        trigger: {
          borderRadius: "12px",
          backgroundActive: "#FFFFFF",
          textColorActive: "#000000",
          boxShadowActive: "0 1px 3px rgba(0,0,0,0.1)",
        }
      },
      overviewCard: {
        background: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      },
      chartShowcaseCard: {
        background: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      },
      chartShowcaseTitle: {
        fontWeight: "600",
        fontSize: "1.125rem",
        letterSpacing: "-0.015em",
      },
      componentShowcaseCard: {
        background: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      },
      componentShowcaseTitle: {
        fontWeight: "600",
        fontSize: "1.125rem",
        letterSpacing: "-0.015em",
      },
      brandPickerContainer: {
        overlayImage: "none",
        showOverlay: false,
      },
      tokenShowcaseCard: {
        background: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: "1.25rem",
        showOverlay: false,
        overlayImage: "none",
      },
      pageCard: {
        background: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: "0.75rem",
      },
      button: {
        primary: {
          default: {
            background: "var(--brand-main, #FF5A5F)",
            color: "var(--brand-on, #FFFFFF)",
            borderRadius: "var(--radius-md, 8px)",
            padding: "0.75rem 1.5rem",
            fontWeight: "var(--font-weight-semibold, 600)",
            boxShadow: "var(--shadow-sm, 0 2px 5px rgba(0,0,0,0.07))",
            borderWidth: "0px",
            letterSpacing: "normal",
          },
          hover: {
            background: "color-mix(in srgb, #FF5A5F 90%, #000 10%)",
            boxShadow: "var(--shadow-md, 0 4px 10px rgba(0,0,0,0.08))",
          },
          active: {
            background: "color-mix(in srgb, #FF5A5F 80%, #000 20%)",
            boxShadow: "var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.05))",
          },
          focus: { 
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--brand-main, #FF5A5F) 30%, transparent)",
          }
        },
        secondary: {
          default: {
            background: "var(--surface-bg, #FFFFFF)",
            color: "var(--brand-main, #FF5A5F)",
            borderColor: "var(--brand-main, #FF5A5F)",
            borderWidth: "1.5px",
            borderRadius: "var(--radius-md, 8px)",
            padding: "calc(0.75rem - 1.5px) calc(1.5rem - 1.5px)",
            fontWeight: "var(--font-weight-semibold, 600)",
          },
          hover: {
            background: "color-mix(in srgb, var(--brand-main, #FF5A5F) 5%, transparent)",
            borderColor: "color-mix(in srgb, var(--brand-main, #FF5A5F) 80%, #000 20%)",
          },
          active: { 
            background: "color-mix(in srgb, var(--brand-main, #FF5A5F) 10%, transparent)",
            borderColor: "color-mix(in srgb, var(--brand-main, #FF5A5F) 70%, #000 30%)",
          },
          focus: {
            borderColor: "var(--brand-main, #FF5A5F)",
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--brand-main, #FF5A5F) 25%, transparent)",
          }
        },
        fontFamily: "'Airbnb Cereal App', 'Helvetica Neue', sans-serif",
        fontSize: "0.9375rem",
      },
      input: {
        background: "var(--surface-bg, #FFFFFF)",
        color: "var(--surface-on, #484848)",
        borderColor: "var(--border-color-default, #DCE0E0)",
        borderRadius: "var(--radius-sm, 4px)",
        padding: "0.875rem 1rem",
        borderWidth: "1px",
        boxShadow: "var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.03))",
        focus: {
          borderColor: "var(--brand-secondary, #00A699)",
          boxShadow: "0 0 0 3px color-mix(in srgb, var(--brand-secondary, #00A699) 25%, transparent)",
        },
        placeholderColor: "var(--surface-muted-fg, #767676)",
        fontFamily: "'Airbnb Cereal App', 'Helvetica Neue', sans-serif",
        fontSize: "0.9375rem",
      },
      card: {
        background: "var(--surface-card, #FFFFFF)",
        borderColor: "var(--border-color-subtle, #F0F0F0)",
        borderWidth: "1px",
        borderRadius: "var(--radius-lg, 12px)", 
        boxShadow: "var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08))", 
        padding: "1.5rem",
        header: {
          padding: "1.25rem 1.5rem 0.75rem",
          titleColor: "var(--surface-on, #222222)",
          descriptionColor: "var(--surface-muted-fg, #767676)",
        },
        fontFamily: "'Airbnb Cereal App', 'Helvetica Neue', sans-serif",
      },
      badge: {
        variantDefault: {
          background: "var(--surface-muted, #F7F7F7)",
          color: "var(--surface-on, #222222)",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem", 
          fontWeight: 500,
        },
        variantDestructive: {
          background: "color-mix(in srgb, var(--semantic-destructive, #FF171F) 85%, #FFF 15%)",
          color: "var(--semantic-destructive, #FF171F)",
          borderColor: "var(--semantic-destructive, #FF171F)",
          borderWidth: "1px",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 500,
        },
        variantSuccess: {
          background: "color-mix(in srgb, var(--semantic-success, #008A0E) 15%, transparent)",
          color: "var(--semantic-success, #008A0E)",
          borderColor: "var(--semantic-success, #008A0E)",
          borderWidth: "1px",
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 500,
        },
      },
      tooltip: {
        background: "rgba(34, 34, 34, 0.95)",
        color: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderRadius: "var(--radius-md, 8px)",
        padding: "0.5rem 0.875rem",
        boxShadow: "var(--shadow-lg, 0 10px 15px rgba(0,0,0,0.1))",
        fontSize: "0.8125rem",
        backdropFilter: "blur(8px)",
      },
      charts: {
        gridStrokeColor: "rgba(210, 210, 215, 0.5)",
        axisStrokeColor: "#86868B",
        axisTextColor: "#86868B",
        legendTextColor: "#1D1D1F",
        tooltipCursorFill: "rgba(0, 113, 227, 0.05)",
      },
    },
    supplementaryChartColors: ["#FF5A5F", "#00A699", "#FC642D", "#767676", "#FFB400"],
  }
