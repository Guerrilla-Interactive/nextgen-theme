import { hexToRgbString, rgbToCmykString } from "../brands";

export const RAZER_THEME = {
    name: "Razer",
    id: "razer",
    description:
      "Global gaming hardware manufacturing company, known for its iconic green logo and high-performance peripherals.",
    brand: {
      main: {
        name: "Razer Green (Primary)",
        hex: "#00FF00",
        rgb: hexToRgbString("#00FF00"),
        cmyk: rgbToCmykString(hexToRgbString("#00FF00")),
        variableName: "brand-main",
      },
      on: "#000000", // Black text on Green buttons
      secondary: {
        name: "Razer Black (Secondary)",
        hex: "#1A1A1A", // Darker black for secondary elements
        rgb: hexToRgbString("#1A1A1A"),
        cmyk: rgbToCmykString(hexToRgbString("#1A1A1A")),
        variableName: "brand-secondary",
      },
    },
    supportPalette: [ // Defined first as the source of truth
      {
        name: "Razer Red (Destructive)",
        hex: "#FF4136",
        rgb: hexToRgbString("#FF4136"),
        cmyk: rgbToCmykString(hexToRgbString("#FF4136")),
        variableName: "semantic-destructive",
      },
      {
        name: "Razer Green (Success)",
        hex: "#00FF00",
        rgb: hexToRgbString("#00FF00"),
        cmyk: rgbToCmykString(hexToRgbString("#00FF00")),
        variableName: "semantic-success",
      },
      {
        name: "Razer Yellow (Warning)",
        hex: "#FFDC00",
        rgb: hexToRgbString("#FFDC00"),
        cmyk: rgbToCmykString(hexToRgbString("#FFDC00")),
        variableName: "semantic-warning",
      },
      {
        name: "Razer Cyan (Info)",
        hex: "#00C4FF",
        rgb: hexToRgbString("#00C4FF"),
        cmyk: rgbToCmykString(hexToRgbString("#00C4FF")),
        variableName: "semantic-info",
      },
      // Existing Razer-specific support colors are kept
      {
        name: "Razer Quartz Pink",
        hex: "#F7CFDD",
        rgb: hexToRgbString("#F7CFDD"),
        cmyk: rgbToCmykString(hexToRgbString("#F7CFDD")),
        variableName: "brand-razer-pink",
      },
      {
        name: "Razer Mercury White",
        hex: "#EAEAEA",
        rgb: hexToRgbString("#EAEAEA"),
        cmyk: rgbToCmykString(hexToRgbString("#EAEAEA")),
        variableName: "brand-razer-white",
      },
      {
        name: "Razer Synapse Blue",
        hex: "#00A5E7", 
        rgb: hexToRgbString("#00A5E7"),
        cmyk: rgbToCmykString(hexToRgbString("#00A5E7")),
        variableName: "brand-razer-blue",
      },
    ],
    surface: {
      background: "#101010", 
      card: "#1C1C1C",       
      popover: "#282828",     
      on: "#FFFFFF",         
      muted: "#3A3A3A",      
      mutedForeground: "#A0A0A0", 
      brandSubtle: "rgba(0, 255, 0, 0.07)", 
      textMuted: "#777777",   
    },
    semantic: { // References supportPalette
      destructive: "#FF4136", 
      success: "#00FF00",    
      warning: "#FFDC00",     
      info: "#00C4FF",        
    },
    shape: {
      radiusXs: "2px",       // Slightly rounded
      radiusSm: "4px",
      radius: "6px",         // General radius, slightly less than default 8px
      radiusLg: "8px",
      radiusXl: "12px",
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "'Titillium Web', 'Roboto', sans-serif", // Using Titillium Web as primary
      fontSans: "'Titillium Web', 'Roboto', sans-serif",
      fontMono: "'Roboto Mono', 'Consolas', monospace",
      weightNormal: "400",
      weightMedium: "500", // Titillium often looks good slightly bolder
      weightSemibold: "600",
      weightBold: "700",
      leading: "1.6",        // Slightly more leading for readability on dark backgrounds
      tracking: "0.01em",     // Subtle tracking
      fontSizeXs: "0.75rem",
      fontSizeSm: "0.875rem",
      fontSizeBase: "1rem",
      fontSizeLg: "1.125rem", // Slightly smaller H3/Lg
      fontSizeXl: "1.375rem", // Slightly smaller H2/Xl
    },
    motion: { // Kept mostly default, good for tech feel
      motionFast: "100ms",
      motionStandard: "200ms",
      motionSlow: "350ms",
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)", // Smoother ease
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: {
      shadowXs: "0 1px 2px rgba(0,0,0,0.2)",
      shadowSm: "0 2px 4px rgba(0,0,0,0.3)",
      shadowMd: "0 4px 8px rgba(0,0,0,0.4)",
      shadowLg: "0 8px 16px rgba(0,0,0,0.4)",
      shadowXl: "0 12px 24px rgba(0,0,0,0.5)",
      shadowBrandSm: "0 2px 6px rgba(0, 255, 0, 0.2)", // Subtle green glow
      shadowBrandMd: "0 4px 10px rgba(0, 255, 0, 0.25)",
      shadowBrandLg: "0 8px 18px rgba(0, 255, 0, 0.3)",
    },
    spacing: { // Slightly tighter spacing for a "dense UI" feel common in gaming apps
      space1: "0.2rem",   // ~3px
      space2: "0.4rem",   // ~6px
      space3: "0.6rem",   // ~9px
      space4: "0.8rem",   // ~12px
      space5: "1.2rem",   // ~18px
      space6: "1.6rem",   // ~24px
      space8: "2.4rem",   // ~36px
      space12: "3.2rem",  // ~48px
      paddingInput: "0.6rem 0.8rem",
      paddingButton: "0.5rem 1rem", // Slimmer buttons
      paddingCard: "1.2rem",
      paddingCompact: "0.4rem 0.6rem",
    },
    gradient: { from: "#00FF00", to: "#00AA00", accent: "#33FF33" }, // Green gradient
    borderStyles: {
      defaultColor: "#444444",   // Darker borders
      subtleColor: "#333333",    // Very subtle borders
      strongColor: "#555555",
      defaultWidth: "1px",
      thinWidth: "1px", // No 0.5px for better visibility on dark themes
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: {
      preferBorderless: false, // Allow some defined borders for a tech look
      applySpecialLayout: true, // Indicate a unique layout might be applied
      containerMaxWidth: "max-w-6xl", // Generous width
      overviewCardBoxShadow: "var(--shadow-md)", // Use defined shadow
      contentFlexClass: "sm:flex-row items-start", // Align items at the start
      footerExtraMargin: "mt-8",
      headingMainText: "FOR GAMERS. BY GAMERS.",
      headingSubtitleText: "Precision. Performance. Perfection.",
      headingSubtitleClassName: "text-[var(--brand-main)] font-normal tracking-wider uppercase text-sm", // Green, uppercase subtitle
      navTitle: "RAZER",
    },
    componentStyles: {
      nav: {
        background: "rgba(16, 16, 16, 0.85)", // Dark, slightly transparent nav
        borderColor: "rgba(0, 255, 0, 0.2)", // Subtle green border bottom
        borderWidth: "0 0 1px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        color: "#E0E0E0",
      },
      hero: {
        background: "#0A0A0A", // Very dark hero
        backgroundImage: "radial-gradient(circle, rgba(0,255,0,0.05) 0%, transparent 60%)", // Subtle green radial
        color: "#FFFFFF",
        boxShadow: "inset 0 -50px 50px -30px #0A0A0A", // Inner shadow at bottom
      },
      tabs: {
        list: {
          background: "rgba(34,34,34,0.8)", // --surface-card with alpha
          borderRadius: "var(--radius-md)",
          padding: "var(--space-1)",
        },
        trigger: {
          color: "var(--surface-muted-fg)",
          borderRadius: "var(--radius-sm)",
          backgroundActive: "var(--brand-main)",
          textColorActive: "var(--brand-on)",
          boxShadowActive: "0 0 10px rgba(0,255,0,0.4)",
          fontWeight: "var(--font-weight-medium)",
          padding: "0.5rem 1rem",
        }
      },
      overviewCard: {
        background: "var(--surface-card)", // Matches general card
        borderColor: "var(--border-color-subtle)",
        borderWidth: "1px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)", // More prominent shadow
        overlayImage: "linear-gradient(145deg, rgba(0,255,0,0.03) 0%, rgba(0,0,0,0) 40%)", // Subtle green angular overlay
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
      },
      brandPickerContainer: {
        background: "rgba(16,16,16,0.7)",
        overlayImage: "url('/assets/razer-green-grid.svg')", // Hypothetical SVG grid
      },
      button: {
        primary: {
          default: {
            background: "var(--brand-main)",
            color: "var(--brand-on)",
            borderRadius: "var(--radius-sm, 4px)", // Sharper radius
            boxShadow: "0 1px 3px rgba(0, 255, 0, 0.2), inset 0 -1px 0px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,255,0,0.3)", 
            fontWeight: "var(--font-weight-bold)",
            textTransform: "uppercase",
            letterSpacing: "0.075em", // More pronounced letter spacing
            padding: "0.6rem 1.3rem", 
          },
          hover: {
            background: "color-mix(in srgb, #FF5A5F 95%, #fff 15%)", 
            boxShadow: "0 0 15px 3px rgba(0, 255, 0, 0.4), 0 0 25px 6px rgba(0, 255, 0, 0.25), inset 0 0 1.5px 1px rgba(200,255,200,0.4)", 
            transform: "translateY(-1.5px) scale(1.02)", 
          },
          active: {
            background: "color-mix(in srgb, #FF5A5F 85%, #000 20%)", 
            transform: "translateY(0px) scale(1)",
            boxShadow: "0 1px 2px rgba(0, 255, 0, 0.15), inset 0 1px 1.5px rgba(0,0,0,0.3), inset 0 0 8px rgba(0,100,0,0.3)", 
          },
          focus: {
            boxShadow: "0 0 0 3px rgba(0,255,0,0.5), 0 0 10px 2px rgba(0,255,0,0.35), 0 1px 3px rgba(0, 255, 0, 0.2)", 
          }
        },
        secondary: {
          default: {
            background: "var(--surface-muted, #3A3A3A)",
            color: "var(--surface-on, #FFFFFF)",
            borderColor: "var(--border-color-strong, #555555)",
            borderWidth: "1px",
            borderRadius: "var(--radius-sm, 4px)",
            fontWeight: "var(--font-weight-semibold)", // Bolder secondary
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
            boxShadow: "0 0 0 2.5px rgba(0,255,0,0.4)", 
          }
        },
        fontFamily: "'Titillium Web', 'Roboto', sans-serif",
        fontSize: "0.875rem", // 14px, good for uppercase
      },
      input: {
        background: "var(--surface-card, #1C1C1C)", // Darker input background
        color: "var(--surface-on, #FFFFFF)",
        borderColor: "var(--border-color-default, #444444)",
        borderRadius: "var(--radius-sm, 4px)",
        padding: "0.7rem 0.9rem", // Slightly more padding
        borderWidth: "1px",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)", // Inner shadow for depth
        focus: {
          borderColor: "var(--brand-main, #00FF00)", 
          boxShadow: "0 0 0 2.5px rgba(0,255,0,0.4), inset 0 1px 2px rgba(0,0,0,0.3)", 
          background: "var(--surface-card, #1C1C1C)", // Keep bg consistent
        },
        placeholderColor: "var(--surface-muted-fg, #A0A0A0)",
        fontFamily: "'Titillium Web', 'Roboto', sans-serif",
        fontSize: "0.9375rem", // 15px
      },
      card: {
        background: "var(--surface-card, #1C1C1C)",
        borderColor: "var(--border-color-subtle, #333333)", 
        borderWidth: "1px",
        borderRadius: "var(--radius-md, 6px)", // Slightly more rounded than buttons
        boxShadow: "var(--shadow-lg), 0 0 0 0.5px rgba(0,255,0,0.1)", // Added subtle green edge highlight
        padding: "1.3rem",
        header: {
          padding: "1rem 1.3rem 0.75rem",
          titleColor: "var(--brand-main, #00FF00)",
          descriptionColor: "var(--surface-muted-fg, #A0A0A0)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
        fontFamily: "'Titillium Web', 'Roboto', sans-serif",
      },
      badge: { // Added default badge styles for Razer
        variantDefault: {
          background: "var(--surface-muted, #3A3A3A)",
          color: "var(--brand-main, #00FF00)", // Green text on dark gray
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem", 
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          borderWidth: "1px",
          borderColor: "rgba(0,255,0,0.2)",
        },
        variantDestructive: {
          background: "var(--semantic-destructive, #FF4136)", 
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
        },
        variantSuccess: {
          background: "var(--brand-main, #00FF00)",
          color: "var(--brand-on, #000000)", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
        },
      },
      tooltip: {
        background: "rgba(10,10,10,0.92)", // Very dark, almost opaque
        color: "var(--brand-main, #00FF00)", // Green text
        borderColor: "rgba(0,255,0,0.3)",
        borderWidth: "1px",
        borderRadius: "var(--radius-sm, 4px)",
        padding: "0.4rem 0.7rem",
        boxShadow: "var(--shadow-md), 0 0 8px rgba(0,255,0,0.2)", // Green glow
        fontSize: "0.8rem",
        backdropFilter: "blur(6px)",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
      },
      charts: {
        gridStrokeColor: "rgba(68,68,68,0.5)", // #444444 at 50%
        axisStrokeColor: "#A0A0A0",
        axisTextColor: "#FFFFFF",
        legendTextColor: "#1A1A1A",
        tooltipCursorFill: "rgba(0, 255, 0, 0.1)",
      },
    },
    componentShowcase: {
      title: "Razer Synapse Components",
      description: "High-performance UI elements for the Razer ecosystem.",
      interactiveElements: [
        {
          id: "button-primary-razer",
          name: "Primary Button (Razer)",
          description: "Main action, often with Chroma effects.",
          displayComponent: "LAUNCH GAME"
        },
        {
          id: "button-secondary-razer",
          name: "Secondary Button (Razer)",
          description: "Alternative actions, device settings.",
          displayComponent: "Device Settings"
        },
        {
          id: "button-outline-razer",
          name: "Outline Button (Razer)",
          description: "Subtle options, profile switching.",
          displayComponent: "Switch Profile"
        },
        {
          id: "badge-status-razer",
          name: "Status Badge (Razer)",
          description: "Indicates device status or connectivity.",
          displayComponent: "Connected"
        },
        {
          id: "badge-alert-razer",
          name: "Alert Badge (Razer)",
          description: "Firmware updates or critical notifications.",
          displayComponent: "Firmware Update"
        }
      ],
      forms: [
        {
          id: "input-text-razer",
          name: "Text Input (Razer)",
          description: "Sleek input fields for settings.",
          displayComponent: "Enter Macro Name"
        },
        {
          id: "input-search-razer",
          name: "Search Bar (Razer)",
          description: "Search within Razer Synapse or support.",
          displayComponent: "Search Settings"
        }
      ],
      feedbackIndicators: [
        {
          id: "loading-indicator-razer",
          name: "Loading Chroma (Razer)",
          description: "Loading indicator with a Chroma flair.",
          displayComponent: "Syncing Chroma..."
        }
      ]
    },
    supplementaryChartColors: ["#00FF00", "#FF4136", "#FFDC00", "#00C4FF", "#AEAEAE"],
  }