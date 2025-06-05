import { hexToRgbString, rgbToCmykString } from "../brands";
import { BrandDefinition } from "../brands-types";



export const TWITCH_THEME: BrandDefinition = {
    name: "Twitch",
    id: "twitch",
    description:
      "Authentic streaming platform design system that reflects Twitch's clean, community-focused aesthetic with signature purple, professional dark themes, and creator-friendly interface design.",
    brandColors: [
      {
        name: "Twitch Purple",
        color: "#9146FF", // Authentic Twitch brand purple
        variableName: "brand-purple-primary",
        shades: {
          "50": { color: "#F7F4FF", variableName: "brand-purple-50" },
          "100": { color: "#F0E9FF", variableName: "brand-purple-100" },
          "200": { color: "#E1D4FF", variableName: "brand-purple-200" },
          "300": { color: "#C8B5FF", variableName: "brand-purple-300" },
          "400": { color: "#AD7DFF", variableName: "brand-purple-400" },
          "500": { color: "#9146FF", variableName: "brand-purple-500" },
          "600": { color: "#7C3AED", variableName: "brand-purple-600" },
          "700": { color: "#6D28D9", variableName: "brand-purple-700" },
          "800": { color: "#5B21B6", variableName: "brand-purple-800" },
          "900": { color: "#4C1D95", variableName: "brand-purple-900" }
        }
      },
      {
        name: "Twitch Dark",
        color: "#0E0E10", // Authentic Twitch dark background
        variableName: "brand-dark-primary",
        shades: {
          "50": { color: "#F9FAFB", variableName: "brand-dark-50" },
          "100": { color: "#F3F4F6", variableName: "brand-dark-100" },
          "200": { color: "#E5E7EB", variableName: "brand-dark-200" },
          "300": { color: "#D1D5DB", variableName: "brand-dark-300" },
          "400": { color: "#9CA3AF", variableName: "brand-dark-400" },
          "500": { color: "#6B7280", variableName: "brand-dark-500" },
          "600": { color: "#4B5563", variableName: "brand-dark-600" },
          "700": { color: "#374151", variableName: "brand-dark-700" },
          "800": { color: "#1F2937", variableName: "brand-dark-800" },
          "900": { color: "#0E0E10", variableName: "brand-dark-900" }
        }
      },
      {
        name: "Twitch Success Green",
        color: "#00F593", // Actual Twitch success green
        variableName: "brand-green-primary",
        shades: {
          "50": { color: "#F0FDF9", variableName: "brand-green-50" },
          "100": { color: "#DCFCE7", variableName: "brand-green-100" },
          "200": { color: "#BBF7D0", variableName: "brand-green-200" },
          "300": { color: "#86EFAC", variableName: "brand-green-300" },
          "400": { color: "#4ADE80", variableName: "brand-green-400" },
          "500": { color: "#00F593", variableName: "brand-green-500" },
          "600": { color: "#16A34A", variableName: "brand-green-600" },
          "700": { color: "#15803D", variableName: "brand-green-700" },
          "800": { color: "#166534", variableName: "brand-green-800" },
          "900": { color: "#14532D", variableName: "brand-green-900" }
        }
      },
      {
        name: "Twitch Error Red",
        color: "#EC1C24", // Twitch's actual error red
        variableName: "brand-red-primary",
        shades: {
          "50": { color: "#FEF2F2", variableName: "brand-red-50" },
          "100": { color: "#FEE2E2", variableName: "brand-red-100" },
          "200": { color: "#FECACA", variableName: "brand-red-200" },
          "300": { color: "#FCA5A5", variableName: "brand-red-300" },
          "400": { color: "#F87171", variableName: "brand-red-400" },
          "500": { color: "#EC1C24", variableName: "brand-red-500" },
          "600": { color: "#DC2626", variableName: "brand-red-600" },
          "700": { color: "#B91C1C", variableName: "brand-red-700" },
          "800": { color: "#991B1B", variableName: "brand-red-800" },
          "900": { color: "#7F1D1D", variableName: "brand-red-900" }
        }
      },
      {
        name: "Twitch Warning Orange",
        color: "#FF6905", // Actual Twitch warning orange
        variableName: "brand-orange-primary",
        shades: {
          "50": { color: "#FFF7ED", variableName: "brand-orange-50" },
          "100": { color: "#FFEDD5", variableName: "brand-orange-100" },
          "200": { color: "#FED7AA", variableName: "brand-orange-200" },
          "300": { color: "#FDBA74", variableName: "brand-orange-300" },
          "400": { color: "#FB923C", variableName: "brand-orange-400" },
          "500": { color: "#FF6905", variableName: "brand-orange-500" },
          "600": { color: "#EA580C", variableName: "brand-orange-600" },
          "700": { color: "#C2410C", variableName: "brand-orange-700" },
          "800": { color: "#9A3412", variableName: "brand-orange-800" },
          "900": { color: "#7C2D12", variableName: "brand-orange-900" }
        }
      },
      {
        name: "Twitch Blue",
        color: "#0099FE", // Actual Twitch info blue
        variableName: "brand-blue-primary",
        shades: {
          "50": { color: "#EFF6FF", variableName: "brand-blue-50" },
          "100": { color: "#DBEAFE", variableName: "brand-blue-100" },
          "200": { color: "#BFDBFE", variableName: "brand-blue-200" },
          "300": { color: "#93C5FD", variableName: "brand-blue-300" },
          "400": { color: "#60A5FA", variableName: "brand-blue-400" },
          "500": { color: "#0099FE", variableName: "brand-blue-500" },
          "600": { color: "#2563EB", variableName: "brand-blue-600" },
          "700": { color: "#1D4ED8", variableName: "brand-blue-700" },
          "800": { color: "#1E40AF", variableName: "brand-blue-800" },
          "900": { color: "#1E3A8A", variableName: "brand-blue-900" }
        }
      },
      {
        name: "Twitch Neutral",
        color: "#1F1F23", // Twitch card/surface color
        variableName: "brand-neutral-primary",
        shades: {
          "50": { color: "#FAFAFA", variableName: "brand-neutral-50" },
          "100": { color: "#F4F4F5", variableName: "brand-neutral-100" },
          "200": { color: "#E4E4E7", variableName: "brand-neutral-200" },
          "300": { color: "#D4D4D8", variableName: "brand-neutral-300" },
          "400": { color: "#A1A1AA", variableName: "brand-neutral-400" },
          "500": { color: "#71717A", variableName: "brand-neutral-500" },
          "600": { color: "#52525B", variableName: "brand-neutral-600" },
          "700": { color: "#3F3F46", variableName: "brand-neutral-700" },
          "800": { color: "#27272A", variableName: "brand-neutral-800" },
          "900": { color: "#1F1F23", variableName: "brand-neutral-900" }
        }
      }
    ],
    brand: {
      main: {
        name: "Twitch Purple (Primary)",
        hex: "#9146FF",
        rgb: hexToRgbString("#9146FF"),
        cmyk: rgbToCmykString(hexToRgbString("#9146FF")),
        variableName: "brand-purple-primary",
      },
      on: "#FFFFFF",
      secondary: {
        name: "Twitch Dark (Secondary)",
        hex: "#1F1F23",
        rgb: hexToRgbString("#1F1F23"),
        cmyk: rgbToCmykString(hexToRgbString("#1F1F23")),
        variableName: "brand-neutral-primary",
      },
    },
    supportPalette: [
      { name: "Twitch Success Green", hex: "#00F593", rgb: hexToRgbString("#00F593"), cmyk: rgbToCmykString(hexToRgbString("#00F593")), variableName: "semantic-success" },
      { name: "Twitch Error Red", hex: "#EC1C24", rgb: hexToRgbString("#EC1C24"), cmyk: rgbToCmykString(hexToRgbString("#EC1C24")), variableName: "semantic-destructive" },
      { name: "Twitch Warning Orange", hex: "#FF6905", rgb: hexToRgbString("#FF6905"), cmyk: rgbToCmykString(hexToRgbString("#FF6905")), variableName: "semantic-warning" },
      { name: "Twitch Info Blue", hex: "#0099FE", rgb: hexToRgbString("#0099FE"), cmyk: rgbToCmykString(hexToRgbString("#0099FE")), variableName: "semantic-info" },
    ],
    surface: {
      background: "#0E0E10", // True Twitch dark background
      card: "#1F1F23",       // Twitch card background
      popover: "#26262C",    // Slightly lighter for popovers
      on: "#EFEFF1",         // Twitch text color
      muted: "#3A3A40",      // Muted background
      mutedForeground: "#ADADB8", // Muted text
      brandSubtle: "rgba(145, 70, 255, 0.1)",
      textMuted: "#7D7D8A",  // Secondary text
    },
    semantic: {
      destructive: "#EC1C24",
      success: "#00F593",
      warning: "#FF6905",
      info: "#0099FE",
    },
    shape: {
      radiusXs: "2px",
      radiusSm: "4px",
      radius: "6px",
      radiusLg: "8px",
      radiusXl: "12px",
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "var(--font-inter), 'Roobert', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSans: "var(--font-inter), 'Roobert', -apple-system, BlinkMacSystemFont, sans-serif",
      fontMono: "var(--font-roboto-mono), 'SF Mono', Consolas, monospace",
      weightNormal: "400",
      weightMedium: "500",
      weightSemibold: "600",
      weightBold: "700",
      leading: "1.5",
      tracking: "0",
      fontSizeXs: "0.75rem",
      fontSizeSm: "0.875rem",
      fontSizeBase: "1rem",
      fontSizeLg: "1.125rem",
      fontSizeXl: "1.25rem",
    },
    motion: {
      motionFast: "150ms",
      motionStandard: "200ms",
      motionSlow: "300ms",
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: {
      shadowXs: "0 1px 2px rgba(0,0,0,0.25)",
      shadowSm: "0 2px 4px rgba(0,0,0,0.35)",
      shadowMd: "0 4px 6px rgba(0,0,0,0.45)",
      shadowLg: "0 8px 15px rgba(0,0,0,0.55)",
      shadowXl: "0 12px 25px rgba(0,0,0,0.65)",
      shadowBrandSm: "0 2px 4px rgba(145, 70, 255, 0.25)",
      shadowBrandMd: "0 4px 8px rgba(145, 70, 255, 0.3)",
      shadowBrandLg: "0 8px 16px rgba(145, 70, 255, 0.35)",
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
      paddingInput: "0.75rem 1rem",
      paddingButton: "0.6rem 1rem",
      paddingCard: "1.25rem",
      paddingCompact: "0.5rem 0.75rem",
    },
    gradient: {
      from: "#9146FF",
      to: "#5B21B6",
      accent: "#7C3AED",
    },
    borderStyles: {
      defaultColor: "#3F3F46",
      subtleColor: "#27272A",
      strongColor: "#52525B",
      defaultWidth: "1px",
      thinWidth: "1px",
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: {
      preferBorderless: false,
      applySpecialLayout: true,
      containerMaxWidth: "max-w-6xl",
      overviewCardBoxShadow: "var(--shadow-md)",
      contentFlexClass: "sm:flex-row items-start",
      footerExtraMargin: "mt-8",
      headingMainText: "Twitch Design System",
      headingSubtitleText: "Empowering creators and communities",
      headingSubtitleClassName: "text-[var(--surface-muted-fg)] font-medium tracking-normal text-lg",
      navTitle: "Twitch",
    },
    componentStyles: {
      nav: {
        background: "rgba(14, 14, 16, 0.9)",
        borderColor: "rgba(63, 63, 70, 0.3)",
        borderWidth: "0 0 1px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        color: "#EFEFF1",
      },
      hero: {
        background: "linear-gradient(135deg, #0E0E10 0%, #1F1F23 100%)",
        backgroundImage: "radial-gradient(ellipse at center, rgba(145, 70, 255, 0.08) 0%, transparent 60%)",
        color: "#EFEFF1",
        boxShadow: "inset 0 -1px 0 rgba(63, 63, 70, 0.2)",
      },
      tabs: {
        list: {
          background: "rgba(31, 31, 35, 0.8)",
          borderRadius: "var(--radius)",
          padding: "var(--space-1)",
          border: "1px solid rgba(63, 63, 70, 0.3)",
        },
        trigger: {
          color: "#ADADB8",
          borderRadius: "var(--radius-sm)",
          backgroundActive: "var(--brand-main)",
          textColorActive: "var(--brand-on)",
          boxShadowActive: "0 2px 4px rgba(145, 70, 255, 0.25)",
          fontWeight: "var(--font-weight-semibold)",
          padding: "0.6rem 1rem",
          fontFamily: "var(--font-family-sans)",
        }
      },
      overviewCard: {
        background: "var(--surface-card)",
        borderColor: "rgba(63, 63, 70, 0.3)",
        borderWidth: "1px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        overlayImage: "none",
      },
      chartShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "rgba(63, 63, 70, 0.3)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      },
      chartShowcaseTitle: {
        color: "var(--brand-main)",
        fontWeight: "var(--font-weight-semibold)",
        fontSize: "1.25rem",
        fontFamily: "var(--font-family-display)"
      },
      componentShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "rgba(63, 63, 70, 0.3)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      },
      componentShowcaseTitle: {
        color: "var(--brand-main)",
        fontWeight: "var(--font-weight-semibold)",
        fontSize: "1.25rem",
        fontFamily: "var(--font-family-display)"
      },
      brandPickerContainer: {
        background: "rgba(14,14,16,0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(63, 63, 70, 0.3)",
        borderRadius: "var(--radius-lg)",
      },
      tokenGroupCard: {
        background: "var(--surface-card)",
        backgroundImage: "none",
        borderWidth: "var(--border-width-default)",
        borderStyle: "var(--border-style-default)",
        borderColor: "rgba(63, 63, 70, 0.3)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        padding: "var(--padding-card)",
      },
      button: {
        primary: {
          default: {
            background: "var(--brand-main)",
            color: "var(--brand-on)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "none",
            fontWeight: "var(--font-weight-semibold)",
            padding: "0.6rem 1rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-family-sans)",
          },
          hover: {
            background: "color-mix(in srgb, var(--brand-main) 85%, #fff 15%)",
            boxShadow: "none",
            transform: "none",
          },
          active: {
            background: "color-mix(in srgb, var(--brand-main) 75%, #000 25%)",
            transform: "none",
            boxShadow: "none",
          },
          focus: {
            boxShadow: "0 0 0 2px rgba(145, 70, 255, 0.5)",
          }
        },
        secondary: {
          default: {
            background: "var(--surface-muted)",
            color: "var(--surface-on)",
            borderColor: "rgba(63, 63, 70, 0.3)",
            borderWidth: "1px",
            borderRadius: "var(--radius-sm)",
            fontWeight: "var(--font-weight-semibold)",
            padding: "calc(0.6rem - 1px) calc(1rem - 1px)",
            fontSize: "0.875rem",
          },
          hover: {
            background: "color-mix(in srgb, var(--surface-muted) 85%, #fff 15%)",
            borderColor: "rgba(63, 63, 70, 0.5)",
          },
          active: {
            background: "color-mix(in srgb, var(--surface-muted) 70%, #000 30%)",
          },
          focus: {
            borderColor: "var(--brand-main)",
            boxShadow: "0 0 0 2px rgba(145, 70, 255, 0.3)",
          }
        },
        outline: {
          default: {
            background: "transparent",
            borderColor: "var(--brand-main)",
            color: "var(--brand-main)",
            borderRadius: "var(--radius-sm)",
            fontWeight: "var(--font-weight-semibold)",
            borderWidth: "1px",
            padding: "calc(0.6rem - 1px) calc(1rem - 1px)",
            fontSize: "0.875rem",
          },
          hover: {
            background: "rgba(145, 70, 255, 0.1)",
            color: "var(--brand-main)",
            borderColor: "var(--brand-main)",
          },
          active: {
            background: "rgba(145, 70, 255, 0.2)",
          },
          focus: {
            boxShadow: "0 0 0 2px rgba(145, 70, 255, 0.3)",
          }
        },
        destructive: {
          default: {
            background: "var(--semantic-destructive)",
            color: "var(--brand-on)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "none",
            fontWeight: "var(--font-weight-semibold)",
            padding: "0.6rem 1rem",
            fontSize: "0.875rem",
          },
          hover: {
            background: "color-mix(in srgb, var(--semantic-destructive) 85%, #fff 15%)",
          },
          active: {
            background: "color-mix(in srgb, var(--semantic-destructive) 75%, #000 25%)",
          },
          focus: {
            boxShadow: "0 0 0 2px rgba(236, 28, 36, 0.5)",
          }
        },
        fontFamily: "var(--font-family-sans)",
        fontSize: "0.875rem",
      },
      input: {
        background: "var(--surface-card)",
        color: "var(--surface-on)",
        borderColor: "rgba(63, 63, 70, 0.5)",
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem 1rem",
        borderWidth: "1px",
        boxShadow: "none",
        focus: {
          borderColor: "var(--brand-main)",
          boxShadow: "0 0 0 2px rgba(145, 70, 255, 0.3)",
          background: "var(--surface-card)",
        },
        placeholderColor: "var(--surface-muted-fg)",
        fontFamily: "var(--font-family-sans)",
        fontSize: "0.9375rem",
      },
      card: {
        background: "var(--surface-card)",
        borderColor: "rgba(63, 63, 70, 0.3)",
        borderWidth: "1px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        padding: "1.25rem",
        header: {
          padding: "1.25rem 1.25rem 1rem",
          titleColor: "var(--surface-on)",
          descriptionColor: "var(--surface-muted-fg)",
          letterSpacing: "0",
          fontFamily: "var(--font-family-display)"
        },
        fontFamily: "var(--font-family-display)",
      },
      badge: {
        variantDefault: {
          background: "var(--brand-main)",
          color: "var(--brand-on)",
          borderRadius: "var(--radius-sm)",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          letterSpacing: "0.025em",
        },
        variantDestructive: {
          background: "var(--semantic-destructive)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm)",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
        },
        variantSuccess: {
          background: "var(--semantic-success)",
          color: "#000000",
          borderRadius: "var(--radius-sm)",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
        },
        variantWarning: {
          background: "var(--semantic-warning)",
          color: "#000000",
          borderRadius: "var(--radius-sm)",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
        },
        variantInfo: {
          background: "var(--semantic-info)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm)",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
        },
      },
      tooltip: {
        background: "rgba(14, 14, 16, 0.95)",
        color: "#EFEFF1",
        borderColor: "rgba(63, 63, 70, 0.5)",
        borderWidth: "1px",
        borderRadius: "var(--radius-sm)",
        padding: "0.5rem 0.75rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
        fontSize: "0.8125rem",
        backdropFilter: "blur(8px)",
        fontFamily: "var(--font-family-sans)"
      },
      charts: {
        gridStrokeColor: "rgba(63, 63, 70, 0.4)",
        axisStrokeColor: "#7D7D8A",
        axisTextColor: "#ADADB8",
        legendTextColor: "#EFEFF1",
        tooltipCursorFill: "rgba(145, 70, 255, 0.1)",
      },
      loadingIndicator: {
        background: "var(--surface-muted)",
        color: "var(--brand-main)",
        textColor: "var(--surface-muted-fg)",
        fontFamily: "var(--font-family-sans)"
      }
    },
    componentShowcase: {
      title: "Twitch Design System",
      description: "Clean, creator-focused components designed for streaming communities and content creators.",
      interactiveElements: [
        { id: "button-primary-twitch", name: "Primary Action", description: "Clean purple buttons for main streaming and community actions.", displayComponent: "Follow" },
        { id: "button-secondary-twitch", name: "Secondary Action", description: "Subtle secondary buttons for supporting actions.", displayComponent: "Subscribe" },
        { id: "button-outline-twitch", name: "Outlined Action", description: "Outlined buttons for less prominent actions.", displayComponent: "Clips" },
        { id: "badge-status-twitch", name: "Status Badge", description: "Clean status indicators for stream states.", displayComponent: "LIVE" },
        { id: "badge-alert-twitch", name: "Category Badge", description: "Simple badges for categories and notifications.", displayComponent: "Just Chatting" }
      ],
      forms: [
        { id: "input-text-twitch", name: "Text Input", description: "Clean dark inputs optimized for streaming interfaces.", displayComponent: "Search for streams" },
        { id: "input-search-twitch", name: "Search Input", description: "Focused search interface for discovering content.", displayComponent: "Browse categories" }
      ],
      feedbackIndicators: [
        { id: "loading-indicator-twitch", name: "Loading State", description: "Clean loading states for content discovery.", displayComponent: "Loading streams..." }
      ]
    },
    supplementaryChartColors: ["#9146FF", "#00F593", "#FF6905", "#0099FE", "#EC1C24"],
  }
  