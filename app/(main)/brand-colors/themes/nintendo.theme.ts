import { hexToRgbString, rgbToCmykString } from "../brands";

export const NINTENDO_THEME = { // Nintendo
    name: "Nintendo",
    id: "nintendo",
    description: "Japanese video game company known for iconic consoles and beloved game franchises, with a playful yet precise design approach.",
    brand: { 
      main: {
        name: "Nintendo Red (Primary)",
        hex: "#E60012",
        rgb: hexToRgbString("#E60012"),
        cmyk: rgbToCmykString(hexToRgbString("#E60012")),
        variableName: "brand-main",
      },
      on: "#FFFFFF", 
      secondary: {
        name: "Nintendo Dark Gray (Secondary)",
        hex: "#1F1F1F",
        rgb: hexToRgbString("#1F1F1F"),
        cmyk: rgbToCmykString(hexToRgbString("#1F1F1F")),
        variableName: "brand-secondary",
      }
    },
    supportPalette: [ // Defined first as the source of truth
      {
        name: "Nintendo Red (Destructive)",
        hex: "#E60012",
        rgb: hexToRgbString("#E60012"),
        cmyk: rgbToCmykString(hexToRgbString("#E60012")),
        variableName: "semantic-destructive",
      },
      {
        name: "Nintendo Green (Success)",
        hex: "#00C300",
        rgb: hexToRgbString("#00C300"),
        cmyk: rgbToCmykString(hexToRgbString("#00C300")),
        variableName: "semantic-success",
      },
      {
        name: "Nintendo Yellow (Warning)",
        hex: "#FFC303",
        rgb: hexToRgbString("#FFC303"),
        cmyk: rgbToCmykString(hexToRgbString("#FFC303")),
        variableName: "semantic-warning",
      },
      {
        name: "Nintendo Blue (Info)",
        hex: "#0AB9E6",
        rgb: hexToRgbString("#0AB9E6"),
        cmyk: rgbToCmykString(hexToRgbString("#0AB9E6")),
        variableName: "semantic-info",
      },
    ],
    surface: {
      background: "#FFFFFF",
      card: "#F7F7F7",
      popover: "#FFFFFF",
      on: "#1F1F1F",
      muted: "#F0F0F0",
      mutedForeground: "#6E6E6E",
      brandSubtle: "#FFEBE9", // Subtle red background
      textMuted: "#8C8C8C",
    },
    semantic: { // References supportPalette
      destructive: "#E60012", 
      success: "#00C300",     
      warning: "#FFC303",    
      info: "#0AB9E6",        
    },
    shape: {
      radiusXs: "0px",       // Sharp corners for most elements
      radiusSm: "2px",
      radius: "4px",
      radiusLg: "8px",
      radiusXl: "12px",
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "'UD Shin Go', 'Rodin NTLG', -apple-system, sans-serif",
      fontSans: "'UD Shin Go', 'Rodin NTLG', -apple-system, sans-serif",
      fontMono: "'SF Mono', 'Source Code Pro', monospace",
      weightNormal: "400",
      weightMedium: "500",
      weightSemibold: "600",
      weightBold: "700",
      leading: "1.5",
      tracking: "0.005em", // Very slight tracking
      fontSizeXs: "0.75rem",
      fontSizeSm: "0.875rem",
      fontSizeBase: "1rem", 
      fontSizeLg: "1.125rem",
      fontSizeXl: "1.5rem",
    },
    motion: {
      motionFast: "150ms",
      motionStandard: "300ms",
      motionSlow: "500ms",
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      easeIn: "cubic-bezier(0.4, 0, 0.6, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    },
    elevation: {
      shadowXs: "0 1px 2px rgba(0,0,0,0.06)",
      shadowSm: "0 2px 4px rgba(0,0,0,0.08)",
      shadowMd: "0 4px 6px rgba(0,0,0,0.1)",
      shadowLg: "0 6px 12px rgba(0,0,0,0.12)",
      shadowXl: "0 12px 24px rgba(0,0,0,0.14)",
      shadowBrandSm: "0 2px 4px rgba(230,0,18,0.15)",
      shadowBrandMd: "0 4px 8px rgba(230,0,18,0.2)",
      shadowBrandLg: "0 8px 16px rgba(230,0,18,0.25)",
    },
    spacing: {
      space1: "0.25rem", // 4px
      space2: "0.5rem",  // 8px
      space3: "0.75rem", // 12px
      space4: "1rem",    // 16px
      space5: "1.5rem",  // 24px
      space6: "2rem",    // 32px
      space8: "3rem",    // 48px
      space12: "4rem",   // 64px
      paddingInput: "0.625rem 0.875rem",
      paddingButton: "0.625rem 1.25rem",
      paddingCard: "1.25rem",
      paddingCompact: "0.375rem 0.75rem",
    },
    gradient: {
      from: "#E60012",
      to: "#D10000",
      accent: "#0AB9E6", // Nintendo Switch Blue
    },
    borderStyles: {
      defaultColor: "#E0E0E0",
      subtleColor: "#EBEBEB",
      strongColor: "#CCCCCC",
      defaultWidth: "1px",
      thinWidth: "1px",
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: {
      preferBorderless: false,
      applySpecialLayout: false,
      containerMaxWidth: "max-w-6xl",
      overviewCardBoxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      contentFlexClass: "sm:flex-row",
      footerExtraMargin: "",
      headingMainText: "Nintendo Switch", 
      headingSubtitleText: "Play anytime, anywhere, with anyone", 
      headingSubtitleClassName: "text-muted-foreground font-normal",
      navTitle: "Nintendo Design System",
    },
    componentStyles: {
      nav: {
        background: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      },
      hero: { 
        background: "#FFFFFF",
        backgroundImage: "linear-gradient(to right, rgba(230, 0, 18, 0.03), transparent, rgba(10, 185, 230, 0.03))",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        showOverlay: true,
      },
      tabs: {
        list: {
          background: "#F0F0F0",
          borderColor: "transparent",
          borderWidth: "0px",
          borderStyle: "solid",
          borderRadius: "4px",
          boxShadow: "none",
        },
        trigger: {
          borderRadius: "4px",
          backgroundActive: "#FFFFFF",
          textColorActive: "#E60012",
          boxShadowActive: "0 1px 3px rgba(0,0,0,0.1)",
        }
      },
      overviewCard: {
        background: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      },
      chartShowcaseCard: {
        background: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      },
      chartShowcaseTitle: {
        fontWeight: "600",
        fontSize: "1.125rem",
        letterSpacing: "0.005em",
      },
      componentShowcaseCard: {
        background: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      },
      componentShowcaseTitle: {
        fontWeight: "600",
        fontSize: "1.125rem",
        letterSpacing: "0.005em",
      },
      brandPickerContainer: {
        overlayImage: "linear-gradient(to right, rgba(230, 0, 18, 0.03), transparent, rgba(10, 185, 230, 0.03))",
        showOverlay: true,
      },
      tokenShowcaseCard: {
        background: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: "1.25rem",
      },
      pageCard: {
        background: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        padding: "0.75rem",
      },
      button: {
        primary: {
          default: {
            background: "var(--brand-main, #E60012)",
            color: "var(--brand-on, #FFFFFF)",
            borderRadius: "var(--radius-full, 9999px)", // Pill shape for Nintendo
            padding: "0.75rem 1.75rem", // Adjusted padding for pill shape
            fontWeight: "var(--font-weight-bold)", 
            boxShadow: "0 2px 3px rgba(0,0,0,0.1), inset 0 -2px 0px rgba(0,0,0,0.15)", // Subtle 3D effect
            borderWidth: "0px", // No border for cleaner pill
          },
          hover: {
            background: "color-mix(in srgb, #E60012 90%, #fff 10%)", 
            boxShadow: "0 3px 5px rgba(0,0,0,0.12), inset 0 -2px 0px rgba(0,0,0,0.15)", 
          },
          active: {
            background: "color-mix(in srgb, #E60012 85%, #000 15%)", 
            boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 -1px 0px rgba(0,0,0,0.2)", 
          },
          focus: {
            boxShadow: "0 0 0 3.5px color-mix(in srgb, var(--brand-main, #E60012) 40%, transparent), 0 2px 3px rgba(0,0,0,0.1)", 
          }
        },
        secondary: {
          default: {
            background: "var(--surface-card, #F7F7F7)",
            color: "var(--brand-secondary, #1F1F1F)", // Using Nintendo Dark Gray
            borderColor: "var(--border-color-default, #E0E0E0)",
            borderWidth: "1px",
            borderRadius: "var(--radius-full, 9999px)",
            padding: "calc(0.75rem - 1px) calc(1.75rem - 1px)",
            fontWeight: "var(--font-weight-semibold)",
          },
          hover: {
            background: "color-mix(in srgb, var(--surface-card, #F7F7F7) 90%, #000 5%)", 
            borderColor: "color-mix(in srgb, var(--brand-secondary, #1F1F1F) 80%, #fff 20%)", 
          },
          active: {
            background: "color-mix(in srgb, var(--surface-card, #F7F7F7) 80%, #000 10%)",
          },
          focus: {
            borderColor: "var(--brand-secondary, #1F1F1F)", 
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--brand-secondary, #1F1F1F) 30%, transparent)", 
          }
        },
        fontFamily: "'UD Shin Go', 'Rodin NTLG', sans-serif",
        fontSize: "0.9375rem", // 15px, common for Nintendo UI text
      },
      input: {
        background: "var(--surface-bg, #FFFFFF)",
        color: "var(--surface-on, #1F1F1F)",
        borderColor: "var(--border-color-default, #E0E0E0)",
        borderRadius: "var(--radius, 4px)", // Standard radius, not pill
        padding: "0.75rem 1rem", // Good padding
        borderWidth: "1px",
        boxShadow: "var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.04))",
        focus: {
          borderColor: "var(--semantic-info, #0AB9E6)", // Using Nintendo Blue for focus
          boxShadow: "0 0 0 3px color-mix(in srgb, var(--semantic-info, #0AB9E6) 30%, transparent)",
          background: "var(--surface-bg, #FFFFFF)",
        },
        placeholderColor: "var(--surface-muted-fg, #8C8C8C)",
        fontFamily: "'UD Shin Go', 'Rodin NTLG', sans-serif",
        fontSize: "0.9375rem",
      },
      card: {
        background: "var(--surface-card, #F7F7F7)",
        borderColor: "var(--border-color-default, #E0E0E0)",
        borderWidth: "1px",
        borderRadius: "var(--radius-lg, 8px)", // Slightly larger radius
        boxShadow: "var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))",
        padding: "1.25rem",
        header: {
          padding: "1rem 1.25rem",
          titleColor: "var(--surface-on, #1F1F1F)",
          descriptionColor: "var(--surface-muted-fg, #6E6E6E)",
        },
        fontFamily: "'UD Shin Go', 'Rodin NTLG', sans-serif",
      },
      badge: { // Added default badge styles for Nintendo
        variantDefault: {
          background: "var(--surface-muted, #F0F0F0)",
          color: "var(--brand-secondary, #1F1F1F)",
          borderRadius: "var(--radius, 4px)",
          padding: "0.3rem 0.6rem",
          fontSize: "0.8rem", 
          fontWeight: 600,
          borderWidth: "1px",
          borderColor: "var(--border-color-subtle, #EBEBEB)",
        },
        variantDestructive: {
          background: "var(--brand-main, #E60012)", // Using brand red
          color: "var(--brand-on, #FFFFFF)",
          borderRadius: "var(--radius, 4px)",
          padding: "0.3rem 0.6rem",
          fontSize: "0.8rem",
          fontWeight: 600,
        },
        variantSuccess: {
          background: "var(--semantic-success, #00C300)",
          color: "var(--brand-on, #FFFFFF)", // Assuming white text on green
          borderRadius: "var(--radius, 4px)",
          padding: "0.3rem 0.6rem",
          fontSize: "0.8rem",
          fontWeight: 600,
        },
      },
      tooltip: {
        background: "var(--brand-secondary, #1F1F1F)", // Dark gray tooltip
        color: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: "0px",
        borderRadius: "var(--radius, 4px)",
        padding: "0.5rem 0.75rem",
        boxShadow: "var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))",
        fontSize: "0.8125rem", // 13px
      },
      charts: {
        gridStrokeColor: "rgba(230, 230, 230, 0.6)",
        axisStrokeColor: "#8C8C8C",
        axisTextColor: "#8C8C8C",
        legendTextColor: "#1D1D1F",
        tooltipCursorFill: "rgba(230, 0, 18, 0.05)",
      },
    },
    chartShowcase: {
      title: "Gaming Performance Metrics",
      description: "Console usage data and player engagement statistics",
      usageData: [
        {
          month: "Jan",
          console: 380,
          mobile: 120,
          online: 290,
          playtime: 3.2,
        },
        {
          month: "Feb",
          console: 420,
          mobile: 140,
          online: 310,
          playtime: 3.4,
        },
        {
          month: "Mar",
          console: 460,
          mobile: 160,
          online: 340,
          playtime: 3.7,
        },
        {
          month: "Apr",
          console: 520,
          mobile: 190,
          online: 390,
          playtime: 4.1,
        },
        {
          month: "May",
          console: 580,
          mobile: 210,
          online: 450,
          playtime: 4.5,
        },
        {
          month: "Jun",
          console: 650,
          mobile: 250,
          online: 520,
          playtime: 4.8,
        },
      ],
      performanceData: [
        { name: "Player Engagement", value: 94, trend: "+8%" },
        { name: "Game Completion", value: 86, trend: "+5%" },
        { name: "Online Play", value: 92, trend: "+12%" },
        { name: "Player Retention", value: 89, trend: "+3%" },
      ],
      distributionData: [
        { name: "Console Gaming", value: 650, fill: "var(--chart-1)", count: "65M players" },
        { name: "Mobile Play", value: 250, fill: "var(--chart-2)", count: "25M players" },
        { name: "Online Services", value: 520, fill: "var(--chart-3)", count: "52M players" },
      ],
      quickStats: [
        { label: "Active Players", value: "102M" },
        { label: "Games Played", value: "2.4B hrs" },
        { label: "Player Satisfaction", value: "94%" },
        { label: "New Releases", value: "18" },
      ],
    },
    componentShowcase: {
      title: "Nintendo UI Components",
      description: "Clean, playful interface elements for Nintendo platforms.",
      interactiveElements: [
        {
          id: "button-primary-nintendo",
          name: "Primary Button (Nintendo)",
          description: "Core action buttons for primary functions.",
          displayComponent: "START GAME"
        },
        {
          id: "button-secondary-nintendo",
          name: "Secondary Button (Nintendo)",
          description: "For alternative or supplementary actions.",
          displayComponent: "OPTIONS"
        },
        {
          id: "button-outline-nintendo",
          name: "Outline Button (Nintendo)",
          description: "For less emphasized actions.",
          displayComponent: "BACK"
        },
        {
          id: "badge-status-nintendo",
          name: "Status Badge (Nintendo)",
          description: "For indicating game or player status.",
          displayComponent: "ONLINE"
        },
        {
          id: "badge-alert-nintendo",
          name: "Alert Badge (Nintendo)",
          description: "For important game notifications.",
          displayComponent: "NEW!"
        }
      ],
      forms: [
        {
          id: "input-text-nintendo",
          name: "Text Input (Nintendo)",
          description: "Clean, accessible text entry fields.",
          displayComponent: "Enter Name"
        },
        {
          id: "input-search-nintendo",
          name: "Search Bar (Nintendo)",
          description: "For finding games and content.",
          displayComponent: "Search Games"
        }
      ],
      feedbackIndicators: [
        {
          id: "loading-indicator-nintendo",
          name: "Loading State (Nintendo)",
          description: "Clean, minimalist loading indicators.",
          displayComponent: "Loading Game"
        }
      ]
    },
    supplementaryChartColors: ["#E60012", "#0AB9E6", "#FFB400", "#00C300", "#7B0099"],
  }
