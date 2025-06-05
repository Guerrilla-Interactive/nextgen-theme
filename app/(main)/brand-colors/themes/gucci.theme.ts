import { BrandDefinition } from "../brands-types";
import { rgbToCmykString, hexToRgbString } from "../brands";

export const GUCCI_THEME: BrandDefinition = {
    name: "Gucci",
    id: "gucci",
    description:
      "Bold maximalist design system inspired by Gucci's eclectic Italian luxury, featuring deep forest green, rich burgundy red, and ornate golden details with dramatic visual flair.",
    brandColors: [
      {
        name: "Gucci Forest Green",
        color: "#1B4332", // Deeper, more authentic Gucci green
        variableName: "brand-green-primary",
        shades: {
          "50": { color: "#F0F4F1", variableName: "brand-green-50" },
          "100": { color: "#D4E6D7", variableName: "brand-green-100" },
          "200": { color: "#A8CCAF", variableName: "brand-green-200" },
          "300": { color: "#7CB387", variableName: "brand-green-300" },
          "400": { color: "#509A5F", variableName: "brand-green-400" },
          "500": { color: "#1B4332", variableName: "brand-green-500" },
          "600": { color: "#163B2B", variableName: "brand-green-600" },
          "700": { color: "#123225", variableName: "brand-green-700" },
          "800": { color: "#0D291E", variableName: "brand-green-800" },
          "900": { color: "#081F16", variableName: "brand-green-900" }
        }
      },
      {
        name: "Gucci Burgundy",
        color: "#800020", // Rich burgundy red
        variableName: "brand-red-primary",
        shades: {
          "50": { color: "#FDF2F4", variableName: "brand-red-50" },
          "100": { color: "#FCE7EA", variableName: "brand-red-100" },
          "200": { color: "#F9CFD5", variableName: "brand-red-200" },
          "300": { color: "#F6B7C0", variableName: "brand-red-300" },
          "400": { color: "#F39FAB", variableName: "brand-red-400" },
          "500": { color: "#800020", variableName: "brand-red-500" },
          "600": { color: "#70001C", variableName: "brand-red-600" },
          "700": { color: "#600018", variableName: "brand-red-700" },
          "800": { color: "#500014", variableName: "brand-red-800" },
          "900": { color: "#400010", variableName: "brand-red-900" }
        }
      },
      {
        name: "Gucci Antique Gold",
        color: "#B8860B", // More muted, antique gold
        variableName: "brand-gold-primary",
        shades: {
          "50": { color: "#FEF9E7", variableName: "brand-gold-50" },
          "100": { color: "#FDF2CF", variableName: "brand-gold-100" },
          "200": { color: "#FBE59F", variableName: "brand-gold-200" },
          "300": { color: "#F9D86F", variableName: "brand-gold-300" },
          "400": { color: "#F7CB3F", variableName: "brand-gold-400" },
          "500": { color: "#B8860B", variableName: "brand-gold-500" },
          "600": { color: "#A07609", variableName: "brand-gold-600" },
          "700": { color: "#886608", variableName: "brand-gold-700" },
          "800": { color: "#705506", variableName: "brand-gold-800" },
          "900": { color: "#584504", variableName: "brand-gold-900" }
        }
      },
      {
        name: "Gucci Cream",
        color: "#F7F3E9", // Warmer cream
        variableName: "brand-cream-primary",
        shades: {
          "50": { color: "#FEFDFB", variableName: "brand-cream-50" },
          "100": { color: "#FDFBF7", variableName: "brand-cream-100" },
          "200": { color: "#FBF7EF", variableName: "brand-cream-200" },
          "300": { color: "#F9F3E7", variableName: "brand-cream-300" },
          "400": { color: "#F7F3E9", variableName: "brand-cream-400" },
          "500": { color: "#F7F3E9", variableName: "brand-cream-500" },
          "600": { color: "#E8E4DA", variableName: "brand-cream-600" },
          "700": { color: "#D9D5CB", variableName: "brand-cream-700" },
          "800": { color: "#CAC6BC", variableName: "brand-cream-800" },
          "900": { color: "#BBB7AD", variableName: "brand-cream-900" }
        }
      },
      {
        name: "Gucci Black",
        color: "#000000", // True black for contrast
        variableName: "brand-black-primary",
        shades: {
          "50": { color: "#F5F5F5", variableName: "brand-black-50" },
          "100": { color: "#E5E5E5", variableName: "brand-black-100" },
          "200": { color: "#CCCCCC", variableName: "brand-black-200" },
          "300": { color: "#B3B3B3", variableName: "brand-black-300" },
          "400": { color: "#808080", variableName: "brand-black-400" },
          "500": { color: "#666666", variableName: "brand-black-500" },
          "600": { color: "#4D4D4D", variableName: "brand-black-600" },
          "700": { color: "#333333", variableName: "brand-black-700" },
          "800": { color: "#1A1A1A", variableName: "brand-black-800" },
          "900": { color: "#000000", variableName: "brand-black-900" }
        }
      },
      {
        name: "Gucci Neutral",
        color: "#8B7355", // Warmer, more sophisticated neutral
        variableName: "brand-neutral-primary",
        shades: {
          "50": { color: "#F9F7F4", variableName: "brand-neutral-50" },
          "100": { color: "#F2EFE9", variableName: "brand-neutral-100" },
          "200": { color: "#E5DFD3", variableName: "brand-neutral-200" },
          "300": { color: "#D8CFBD", variableName: "brand-neutral-300" },
          "400": { color: "#CBBFA7", variableName: "brand-neutral-400" },
          "500": { color: "#8B7355", variableName: "brand-neutral-500" },
          "600": { color: "#7A644A", variableName: "brand-neutral-600" },
          "700": { color: "#69553F", variableName: "brand-neutral-700" },
          "800": { color: "#584634", variableName: "brand-neutral-800" },
          "900": { color: "#473729", variableName: "brand-neutral-900" }
        }
      }
    ],
    brand: {
      main: {
        name: "Gucci Forest Green (Primary)",
        hex: "#1B4332",
        rgb: hexToRgbString("#1B4332"),
        cmyk: rgbToCmykString(hexToRgbString("#1B4332")),
        variableName: "brand-green-primary",
      },
      on: "#F7F3E9",
      secondary: {
        name: "Gucci Antique Gold (Secondary)",
        hex: "#B8860B",
        rgb: hexToRgbString("#B8860B"),
        cmyk: rgbToCmykString(hexToRgbString("#B8860B")),
        variableName: "brand-gold-primary",
      },
    },
    supportPalette: [
      { name: "Gucci Forest Green (Success)", hex: "#1B4332", rgb: hexToRgbString("#1B4332"), cmyk: rgbToCmykString(hexToRgbString("#1B4332")), variableName: "semantic-success" },
      { name: "Gucci Burgundy (Destructive)", hex: "#800020", rgb: hexToRgbString("#800020"), cmyk: rgbToCmykString(hexToRgbString("#800020")), variableName: "semantic-destructive" },
      { name: "Gucci Antique Gold (Warning)", hex: "#B8860B", rgb: hexToRgbString("#B8860B"), cmyk: rgbToCmykString(hexToRgbString("#B8860B")), variableName: "semantic-warning" },
      { name: "Gucci Black (Info)", hex: "#000000", rgb: hexToRgbString("#000000"), cmyk: rgbToCmykString(hexToRgbString("#000000")), variableName: "semantic-info" },
    ],
    surface: {
      background: "#F7F3E9", // Warm cream background
      card: "#FEFDFB",
      popover: "#FFFFFF",
      on: "#000000",
      muted: "#F2EFE9",
      mutedForeground: "#584634",
      brandSubtle: "rgba(27, 67, 50, 0.08)",
      textMuted: "#8B7355",
    },
    semantic: {
      destructive: "#800020",
      success: "#1B4332",
      warning: "#B8860B",
      info: "#000000",
    },
    shape: {
      radiusXs: "0px", // More angular, less rounded for Gucci's bold aesthetic
      radiusSm: "2px",
      radius: "4px",
      radiusLg: "6px",
      radiusXl: "8px",
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "var(--font-playfair-display), var(--font-libre-baskerville), serif",
      fontSans: "var(--font-inter), var(--font-source-sans-pro), sans-serif",
      fontMono: "var(--font-roboto-mono), 'SF Mono', Consolas, monospace",
      weightNormal: "400",
      weightMedium: "500",
      weightSemibold: "600",
      weightBold: "700",
      leading: "1.4", // Tighter leading for more dramatic feel
      tracking: "0.05em", // More letter spacing for luxury feel
      fontSizeXs: "0.75rem",
      fontSizeSm: "0.875rem",
      fontSizeBase: "1rem",
      fontSizeLg: "1.125rem",
      fontSizeXl: "1.375rem",
    },
    motion: {
      motionFast: "200ms", // Slightly slower, more dramatic
      motionStandard: "350ms",
      motionSlow: "500ms",
      ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // More pronounced easing
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: {
      shadowXs: "0 2px 4px rgba(0,0,0,0.15)", // More dramatic shadows
      shadowSm: "0 4px 8px rgba(0,0,0,0.2)",
      shadowMd: "0 6px 12px rgba(0,0,0,0.25)",
      shadowLg: "0 10px 20px rgba(0,0,0,0.3)",
      shadowXl: "0 15px 30px rgba(0,0,0,0.35)",
      shadowBrandSm: "0 4px 8px rgba(27, 67, 50, 0.3)",
      shadowBrandMd: "0 6px 12px rgba(27, 67, 50, 0.35)",
      shadowBrandLg: "0 10px 20px rgba(27, 67, 50, 0.4)",
    },
    spacing: {
      space1: "0.25rem",
      space2: "0.5rem",
      space3: "0.75rem",
      space4: "1rem",
      space5: "1.5rem", // More generous spacing
      space6: "2rem",
      space8: "3rem",
      space12: "4.5rem",
      paddingInput: "1rem 1.25rem", // More substantial padding
      paddingButton: "1rem 2rem",
      paddingCard: "2rem",
      paddingCompact: "0.75rem 1rem",
    },
    gradient: {
      from: "#1B4332",
      to: "#0D291E",
      accent: "#B8860B",
    },
    borderStyles: {
      defaultColor: "#D8CFBD",
      subtleColor: "#E5DFD3",
      strongColor: "#8B7355",
      defaultWidth: "2px", // Thicker borders for more presence
      thinWidth: "1px",
      thickWidth: "3px",
      defaultStyle: "solid",
    },
    stylingPreferences: {
      preferBorderless: false,
      applySpecialLayout: true,
      containerMaxWidth: "max-w-7xl", // Wider for more dramatic layouts
      overviewCardBoxShadow: "var(--shadow-lg)",
      contentFlexClass: "sm:flex-row items-start",
      footerExtraMargin: "mt-16",
      headingMainText: "GUCCI",
      headingSubtitleText: "Italian Luxury & Maximalist Design",
      headingSubtitleClassName: "text-[var(--brand-main)] font-bold tracking-widest text-xl uppercase",
      navTitle: "GUCCI",
    },
    componentStyles: {
      nav: {
        background: "rgba(247, 243, 233, 0.95)",
        borderColor: "rgba(27, 67, 50, 0.2)",
        borderWidth: "0 0 3px 0", // Thicker bottom border
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        backdropFilter: "blur(12px)",
        color: "#000000",
      },
      hero: {
        background: "linear-gradient(135deg, #F7F3E9 0%, #F2EFE9 100%)",
        backgroundImage: "radial-gradient(ellipse at center, rgba(184, 134, 11, 0.08) 0%, transparent 60%)",
        color: "#000000",
        boxShadow: "inset 0 -3px 0 rgba(27, 67, 50, 0.2)",
      },
      tabs: {
        list: {
          background: "rgba(242, 239, 233, 0.9)",
          borderRadius: "var(--radius)",
          padding: "var(--space-2)",
          border: "2px solid rgba(27, 67, 50, 0.15)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
        trigger: {
          color: "#584634",
          borderRadius: "var(--radius-sm)",
          backgroundActive: "var(--brand-main)",
          textColorActive: "var(--brand-on)",
          boxShadowActive: "0 4px 8px rgba(27, 67, 50, 0.4)",
          fontWeight: "var(--font-weight-bold)",
          padding: "1rem 1.5rem",
          fontFamily: "var(--font-family-display)",
          letterSpacing: "0.075em",
          textTransform: "uppercase",
        }
      },
      overviewCard: {
        background: "var(--surface-card)",
        borderColor: "rgba(27, 67, 50, 0.15)",
        borderWidth: "2px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(184, 134, 11, 0.1)",
        overlayImage: "linear-gradient(145deg, rgba(184, 134, 11, 0.05) 0%, rgba(27, 67, 50, 0.02) 100%)",
      },
      chartShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "rgba(27, 67, 50, 0.15)",
        borderWidth: "2px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      },
      chartShowcaseTitle: {
        color: "var(--brand-main)",
        fontWeight: "var(--font-weight-bold)",
        fontSize: "1.5rem",
        letterSpacing: "0.075em",
        textTransform: "uppercase",
        fontFamily: "var(--font-family-display)"
      },
      componentShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "rgba(27, 67, 50, 0.15)",
        borderWidth: "2px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      },
      componentShowcaseTitle: {
        color: "var(--brand-main)",
        fontWeight: "var(--font-weight-bold)",
        fontSize: "1.5rem",
        letterSpacing: "0.075em",
        textTransform: "uppercase",
        fontFamily: "var(--font-family-display)"
      },
      brandPickerContainer: {
        background: "rgba(247, 243, 233, 0.95)",
        backdropFilter: "blur(12px)",
        border: "2px solid rgba(27, 67, 50, 0.2)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      },
      tokenGroupCard: {
        background: "var(--surface-card)",
        backgroundImage: "linear-gradient(145deg, rgba(184, 134, 11, 0.05) 0%, rgba(27, 67, 50, 0.02) 100%)",
        borderWidth: "2px",
        borderStyle: "var(--border-style-default)",
        borderColor: "rgba(27, 67, 50, 0.15)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(184, 134, 11, 0.1)",
        padding: "var(--padding-card)",
      },
      button: {
        primary: {
          default: {
            background: "var(--brand-main)",
            color: "var(--brand-on)",
            borderRadius: "var(--radius)",
            boxShadow: "0 4px 8px rgba(27, 67, 50, 0.4), inset 0 1px 0 rgba(184, 134, 11, 0.2)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.075em",
            padding: "1rem 2rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-family-display)",
            textTransform: "uppercase",
            border: "2px solid transparent",
          },
          hover: {
            background: "color-mix(in srgb, var(--brand-main) 85%, #000 15%)",
            boxShadow: "0 6px 16px rgba(27, 67, 50, 0.5), 0 0 0 2px rgba(184, 134, 11, 0.3)",
            transform: "translateY(-2px) scale(1.02)",
          },
          active: {
            background: "color-mix(in srgb, var(--brand-main) 75%, #000 25%)",
            transform: "translateY(0px) scale(1)",
            boxShadow: "0 2px 4px rgba(27, 67, 50, 0.6), inset 0 2px 4px rgba(0,0,0,0.2)",
          },
          focus: {
            boxShadow: "0 0 0 4px rgba(27, 67, 50, 0.5), 0 4px 8px rgba(27, 67, 50, 0.4)",
          }
        },
        secondary: {
          default: {
            background: "var(--surface-card)",
            color: "var(--brand-main)",
            borderColor: "var(--brand-main)",
            borderWidth: "2px",
            borderRadius: "var(--radius)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.075em",
            padding: "calc(1rem - 2px) calc(2rem - 2px)",
            textTransform: "uppercase",
            fontSize: "0.875rem",
            boxShadow: "0 4px 8px rgba(27, 67, 50, 0.2)",
          },
          hover: {
            background: "rgba(27, 67, 50, 0.08)",
            borderColor: "color-mix(in srgb, var(--brand-main) 80%, #000 20%)",
            color: "color-mix(in srgb, var(--brand-main) 80%, #000 20%)",
            boxShadow: "0 6px 12px rgba(27, 67, 50, 0.3)",
            transform: "translateY(-1px)",
          },
          active: {
            background: "rgba(27, 67, 50, 0.15)",
            borderColor: "color-mix(in srgb, var(--brand-main) 70%, #000 30%)",
            transform: "translateY(0px)",
          },
          focus: {
            borderColor: "var(--brand-main)",
            boxShadow: "0 0 0 3px rgba(27, 67, 50, 0.4)",
          }
        },
        outline: {
          default: {
            background: "transparent",
            borderColor: "var(--brand-main)",
            color: "var(--brand-main)",
            borderRadius: "var(--radius)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.075em",
            borderWidth: "2px",
            padding: "calc(1rem - 2px) calc(2rem - 2px)",
            textTransform: "uppercase",
            fontSize: "0.875rem",
          },
          hover: {
            background: "rgba(27, 67, 50, 0.08)",
            color: "color-mix(in srgb, var(--brand-main) 80%, #000 20%)",
            borderColor: "color-mix(in srgb, var(--brand-main) 80%, #000 20%)",
            boxShadow: "0 4px 8px rgba(27, 67, 50, 0.2)",
          },
          active: {
            background: "rgba(27, 67, 50, 0.15)",
          },
          focus: {
            boxShadow: "0 0 0 3px rgba(27, 67, 50, 0.4)",
            borderColor: "color-mix(in srgb, var(--brand-main) 80%, #000 20%)",
          }
        },
        destructive: {
          default: {
            background: "var(--semantic-destructive)",
            color: "var(--brand-on)",
            borderRadius: "var(--radius)",
            boxShadow: "0 4px 8px rgba(128, 0, 32, 0.4), inset 0 1px 0 rgba(184, 134, 11, 0.2)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.075em",
            padding: "1rem 2rem",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            border: "2px solid transparent",
          },
          hover: {
            background: "color-mix(in srgb, var(--semantic-destructive) 85%, #000 15%)",
            boxShadow: "0 6px 16px rgba(128, 0, 32, 0.5)",
            transform: "translateY(-2px)",
          },
          active: {
            background: "color-mix(in srgb, var(--semantic-destructive) 75%, #000 25%)",
            boxShadow: "0 2px 4px rgba(128, 0, 32, 0.6), inset 0 2px 4px rgba(0,0,0,0.2)",
            transform: "translateY(0px)",
          },
          focus: {
            boxShadow: "0 0 0 4px rgba(128, 0, 32, 0.5)",
          }
        },
        fontFamily: "var(--font-family-display)",
        fontSize: "0.875rem",
      },
      input: {
        background: "var(--surface-card)",
        color: "var(--surface-on)",
        borderColor: "rgba(27, 67, 50, 0.3)",
        borderRadius: "var(--radius)",
        padding: "1rem 1.25rem",
        borderWidth: "2px",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
        focus: {
          borderColor: "var(--brand-main)",
          boxShadow: "0 0 0 3px rgba(27, 67, 50, 0.3), inset 0 2px 4px rgba(0,0,0,0.08)",
          background: "var(--surface-card)",
        },
        placeholderColor: "var(--surface-muted-fg)",
        fontFamily: "var(--font-family-sans)",
        fontSize: "1rem",
        fontWeight: "500",
      },
      card: {
        background: "var(--surface-card)",
        borderColor: "rgba(27, 67, 50, 0.15)",
        borderWidth: "2px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(184, 134, 11, 0.1)",
        padding: "2rem",
        header: {
          padding: "2rem 2rem 1.5rem",
          titleColor: "var(--brand-main)",
          descriptionColor: "var(--surface-muted-fg)",
          letterSpacing: "0.075em",
          fontFamily: "var(--font-family-display)",
          textTransform: "uppercase",
        },
        fontFamily: "var(--font-family-display)",
      },
      badge: {
        variantDefault: {
          background: "var(--brand-main)",
          color: "var(--brand-on)",
          borderRadius: "var(--radius)",
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.075em",
          fontFamily: "var(--font-family-display)",
          textTransform: "uppercase",
          boxShadow: "0 2px 4px rgba(27, 67, 50, 0.3)",
          border: "1px solid rgba(184, 134, 11, 0.2)",
        },
        variantDestructive: {
          background: "var(--semantic-destructive)",
          color: "var(--brand-on)",
          borderRadius: "var(--radius)",
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-display)",
          textTransform: "uppercase",
          boxShadow: "0 2px 4px rgba(128, 0, 32, 0.3)",
        },
        variantSuccess: {
          background: "var(--semantic-success)",
          color: "var(--brand-on)",
          borderRadius: "var(--radius)",
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-display)",
          textTransform: "uppercase",
          boxShadow: "0 2px 4px rgba(27, 67, 50, 0.3)",
        },
        variantWarning: {
          background: "var(--semantic-warning)",
          color: "#000000",
          borderRadius: "var(--radius)",
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-display)",
          textTransform: "uppercase",
          boxShadow: "0 2px 4px rgba(184, 134, 11, 0.3)",
        },
        variantInfo: {
          background: "var(--semantic-info)",
          color: "var(--brand-on)",
          borderRadius: "var(--radius)",
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-display)",
          textTransform: "uppercase",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        },
      },
      tooltip: {
        background: "rgba(0, 0, 0, 0.95)",
        color: "#B8860B",
        borderColor: "rgba(184, 134, 11, 0.3)",
        borderWidth: "2px",
        borderRadius: "var(--radius)",
        padding: "0.75rem 1rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 0 8px rgba(184, 134, 11, 0.2)",
        fontSize: "0.8125rem",
        backdropFilter: "blur(8px)",
        letterSpacing: "0.05em",
        fontFamily: "var(--font-family-display)",
        fontWeight: "600",
        textTransform: "uppercase",
      },
      charts: {
        gridStrokeColor: "rgba(216, 207, 189, 0.6)",
        axisStrokeColor: "#8B7355",
        axisTextColor: "#584634",
        legendTextColor: "#000000",
        tooltipCursorFill: "rgba(27, 67, 50, 0.1)",
      },
      loadingIndicator: {
        background: "var(--surface-muted)",
        color: "var(--brand-main)",
        textColor: "var(--surface-muted-fg)",
        fontFamily: "var(--font-family-display)",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.075em",
      }
    },
    componentShowcase: {
      title: "GUCCI Design System",
      description: "Bold maximalist components that embody Gucci's eclectic luxury and Italian craftsmanship.",
      interactiveElements: [
        { id: "button-primary-gucci", name: "Signature Action", description: "Bold forest green buttons with dramatic shadows and ornate details.", displayComponent: "SHOP NOW" },
        { id: "button-secondary-gucci", name: "Heritage Action", description: "Refined bordered buttons maintaining luxury presence.", displayComponent: "EXPLORE COLLECTION" },
        { id: "button-outline-gucci", name: "Luxury Choice", description: "Outlined buttons with dramatic hover effects.", displayComponent: "VIEW LOOKBOOK" },
        { id: "badge-status-gucci", name: "Luxury Badge", description: "Ornate status indicators with rich styling.", displayComponent: "EXCLUSIVE" },
        { id: "badge-alert-gucci", name: "Heritage Alert", description: "Bold alerts with maximalist luxury styling.", displayComponent: "LIMITED EDITION" }
      ],
      forms: [
        { id: "input-text-gucci", name: "Luxury Input", description: "Substantial input fields with rich borders and dramatic focus states.", displayComponent: "Enter details" },
        { id: "input-search-gucci", name: "Heritage Search", description: "Bold search interface with ornate styling.", displayComponent: "Search collections" }
      ],
      feedbackIndicators: [
        { id: "loading-indicator-gucci", name: "Heritage Loading", description: "Dramatic loading states with bold typography and rich colors.", displayComponent: "Loading luxury experience..." }
      ]
    },
    supplementaryChartColors: ["#1B4332", "#B8860B", "#800020", "#000000", "#8B7355"],
  }
  