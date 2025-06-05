import { hexToRgbString, rgbToCmykString } from "../brands";

export const IKEA_THEME = {
    name: "Ikea",
    id: "ikea",
    description:
      "Bold and authentically Swedish design system that captures IKEA's democratic design philosophy with confident use of signature blue and yellow, strong typography, and functional aesthetics.",
    brandColors: [
      {
        name: "Ikea Blue",
        color: "#0051BA", // True IKEA blue
        variableName: "brand-blue-primary",
        shades: {
          "50": { color: "#E5F2FF", variableName: "brand-blue-50" },
          "100": { color: "#CCE5FF", variableName: "brand-blue-100" },
          "200": { color: "#99CBFF", variableName: "brand-blue-200" },
          "300": { color: "#66B0FF", variableName: "brand-blue-300" },
          "400": { color: "#3396FF", variableName: "brand-blue-400" },
          "500": { color: "#0051BA", variableName: "brand-blue-500" },
          "600": { color: "#0045A3", variableName: "brand-blue-600" },
          "700": { color: "#00398C", variableName: "brand-blue-700" },
          "800": { color: "#002E75", variableName: "brand-blue-800" },
          "900": { color: "#00225E", variableName: "brand-blue-900" }
        }
      },
      {
        name: "Ikea Yellow",
        color: "#FBD914", // Vibrant IKEA yellow
        variableName: "brand-yellow-primary",
        shades: {
          "50": { color: "#FFFBEA", variableName: "brand-yellow-50" },
          "100": { color: "#FFF7D4", variableName: "brand-yellow-100" },
          "200": { color: "#FFEEA9", variableName: "brand-yellow-200" },
          "300": { color: "#FFE67E", variableName: "brand-yellow-300" },
          "400": { color: "#FFDD53", variableName: "brand-yellow-400" },
          "500": { color: "#FBD914", variableName: "brand-yellow-500" },
          "600": { color: "#E0C312", variableName: "brand-yellow-600" },
          "700": { color: "#C5AD10", variableName: "brand-yellow-700" },
          "800": { color: "#AA970E", variableName: "brand-yellow-800" },
          "900": { color: "#8F810C", variableName: "brand-yellow-900" }
        }
      },
      {
        name: "Ikea Gray",
        color: "#111111", 
        variableName: "brand-gray-primary",
        shades: {
          "50": { color: "#F7F7F7", variableName: "brand-gray-50" },
          "100": { color: "#EEEEEE", variableName: "brand-gray-100" },
          "200": { color: "#DDDDDD", variableName: "brand-gray-200" },
          "300": { color: "#BBBBBB", variableName: "brand-gray-300" },
          "400": { color: "#999999", variableName: "brand-gray-400" },
          "500": { color: "#777777", variableName: "brand-gray-500" },
          "600": { color: "#555555", variableName: "brand-gray-600" },
          "700": { color: "#333333", variableName: "brand-gray-700" },
          "800": { color: "#222222", variableName: "brand-gray-800" },
          "900": { color: "#111111", variableName: "brand-gray-900" }
        }
      },
      {
       name: "Ikea Green",
       color: "#2E7D32",
       variableName: "brand-green-primary",
       shades: {
        "50": { color: "#E8F5E8", variableName: "brand-green-50" },
        "100": { color: "#C8E6C9", variableName: "brand-green-100" },
        "200": { color: "#A5D6A7", variableName: "brand-green-200" },
        "300": { color: "#81C784", variableName: "brand-green-300" },
        "400": { color: "#66BB6A", variableName: "brand-green-400" },
        "500": { color: "#2E7D32", variableName: "brand-green-500" },
        "600": { color: "#2E7D32", variableName: "brand-green-600" },
        "700": { color: "#1B5E20", variableName: "brand-green-700" },
        "800": { color: "#2E7D32", variableName: "brand-green-800" },
        "900": { color: "#1B5E20", variableName: "brand-green-900" },
       }
      },
      {
        name: "Ikea Orange",
        color: "#FF6D00",
        variableName: "brand-orange-primary",
        shades: {
          "50": { color: "#FFF3E0", variableName: "brand-orange-50" },
          "100": { color: "#FFE0B2", variableName: "brand-orange-100" },
          "200": { color: "#FFCC80", variableName: "brand-orange-200" },
          "300": { color: "#FFB74D", variableName: "brand-orange-300" },
          "400": { color: "#FFA726", variableName: "brand-orange-400" },
          "500": { color: "#FF6D00", variableName: "brand-orange-500" },
          "600": { color: "#FF6D00", variableName: "brand-orange-600" },
          "700": { color: "#F57C00", variableName: "brand-orange-700" },
          "800": { color: "#EF6C00", variableName: "brand-orange-800" },
          "900": { color: "#E65100", variableName: "brand-orange-900" },
        }
      },
      {
        name: "Ikea Red",
        color: "#D84315",
        variableName: "brand-red-primary",
        shades: {
          "50": { color: "#FFEDE8", variableName: "brand-red-50" },
          "100": { color: "#FFDBD1", variableName: "brand-red-100" },
          "200": { color: "#FFB7A3", variableName: "brand-red-200" },
          "300": { color: "#FF9375", variableName: "brand-red-300" },
          "400": { color: "#FF6F47", variableName: "brand-red-400" },
          "500": { color: "#D84315", variableName: "brand-red-500" },
          "600": { color: "#D84315", variableName: "brand-red-600" },
          "700": { color: "#BF360C", variableName: "brand-red-700" },
          "800": { color: "#BF360C", variableName: "brand-red-800" },
          "900": { color: "#BF360C", variableName: "brand-red-900" },
        }
      },
      {
        name: "Ikea Neutral",
        color: "#111111", 
        variableName: "brand-neutral-primary",
        shades: {
          "50":  { color: "#F7F7F7", variableName: "brand-neutral-50" },  
          "100": { color: "#EEEEEE", variableName: "brand-neutral-100" }, 
          "200": { color: "#DDDDDD", variableName: "brand-neutral-200" }, 
          "300": { color: "#BBBBBB", variableName: "brand-neutral-300" }, 
          "400": { color: "#999999", variableName: "brand-neutral-400" }, 
          "500": { color: "#777777", variableName: "brand-neutral-500" }, 
          "600": { color: "#555555", variableName: "brand-neutral-600" }, 
          "700": { color: "#333333", variableName: "brand-neutral-700" }, 
          "800": { color: "#222222", variableName: "brand-neutral-800" }, 
          "900": { color: "#111111", variableName: "brand-neutral-900" }  
        }
      }
    ],
    brand: {
      main: {
        name: "Ikea Blue (Primary)",
        color: "#0051BA",
        rgb: hexToRgbString("#0051BA"),
        cmyk: rgbToCmykString(hexToRgbString("#0051BA")),
        variableName: "brand-blue-primary",
      },
      on: "#FFFFFF", 
      secondary: {
        name: "Ikea Yellow (Secondary)",
        color: "#FBD914", 
        rgb: hexToRgbString("#FBD914"),
        cmyk: rgbToCmykString(hexToRgbString("#FBD914")),
        variableName: "brand-yellow-primary",
      },
    },
    supportPalette: [ 
      { name: "Ikea Green (Success)", color: "#2E7D32", rgb: hexToRgbString("#2E7D32"), cmyk: rgbToCmykString(hexToRgbString("#2E7D32")), variableName: "semantic-success" },
      { name: "Ikea Red (Destructive)", color: "#D84315", rgb: hexToRgbString("#D84315"), cmyk: rgbToCmykString(hexToRgbString("#D84315")), variableName: "semantic-destructive" },
      { name: "Ikea Orange (Warning)", color: "#FF6D00", rgb: hexToRgbString("#FF6D00"), cmyk: rgbToCmykString(hexToRgbString("#FF6D00")), variableName: "semantic-warning" },
      { name: "Ikea Blue (Info)", color: "#0051BA", rgb: hexToRgbString("#0051BA"), cmyk: rgbToCmykString(hexToRgbString("#0051BA")), variableName: "semantic-info" },
    ],
    surface: {
      background: "#FFFFFF", 
      card: "#FFFFFF",       
      popover: "#FFFFFF",    
      on: "#111111",         
      muted: "#F7F7F7",      
      mutedForeground: "#555555", 
      brandSubtle: "rgba(0, 81, 186, 0.05)", 
      textMuted: "#777777",   
    },
    semantic: {
      destructive: "#D84315", 
      success: "#2E7D32",    
      warning: "#FF6D00",     
      info: "#0051BA",        
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
      fontDisplay: "var(--font-source-sans-pro), 'Noto IKEA', var(--font-system-ui), -apple-system, sans-serif",
      fontSans: "var(--font-source-sans-pro), 'Noto IKEA', var(--font-system-ui), -apple-system, sans-serif",
      fontMono: "var(--font-roboto-mono), 'SF Mono', Consolas, monospace",
      weightNormal: "400",
      weightMedium: "500",
      weightSemibold: "600", 
      weightBold: "700",
      leading: "1.4", 
      tracking: "0", 
      fontSizeXs: "0.75rem", 
      fontSizeSm: "0.875rem", 
      fontSizeBase: "1rem", 
      fontSizeLg: "1.125rem", 
      fontSizeXl: "1.25rem", 
    },
    motion: { 
      motionFast: "120ms", 
      motionStandard: "200ms",
      motionSlow: "300ms",
      ease: "cubic-bezier(0.2, 0, 0.38, 0.9)", 
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: { 
      shadowXs: "0 1px 2px rgba(0,0,0,0.08)", 
      shadowSm: "0 1px 3px rgba(0,0,0,0.12)",
      shadowMd: "0 4px 6px rgba(0,0,0,0.12)",
      shadowLg: "0 8px 15px rgba(0,0,0,0.15)",
      shadowXl: "0 12px 25px rgba(0,0,0,0.18)",
      shadowBrandSm: "0 2px 4px rgba(0, 81, 186, 0.15)", 
      shadowBrandMd: "0 4px 8px rgba(0, 81, 186, 0.2)",
      shadowBrandLg: "0 8px 16px rgba(0, 81, 186, 0.25)",
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
      paddingInput: "0.875rem 1rem", 
      paddingButton: "1rem 1.5rem", 
      paddingCard: "1.5rem", 
      paddingCompact: "0.5rem 0.75rem", 
    },
    gradient: { 
      from: "#0051BA", 
      to: "#00398C", 
      accent: "#FBD914",
    }, 
    borderStyles: { 
      defaultColor: "#DDDDDD", 
      subtleColor: "#EEEEEE",  
      strongColor: "#BBBBBB",  
      defaultWidth: "1px",
      thinWidth: "1px",
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: { 
      preferBorderless: false, 
      applySpecialLayout: true,
      containerMaxWidth: "max-w-7xl",
      overviewCardBoxShadow: "var(--shadow-sm)", 
      contentFlexClass: "sm:flex-row items-start",
      footerExtraMargin: "mt-16",
      headingMainText: "IKEA Design System",
      headingSubtitleText: "Democratic design that works for everyone",
      headingSubtitleClassName: "text-[var(--surface-on)] font-semibold tracking-wide text-xl",
      navTitle: "IKEA",
    },
    componentStyles: {
      nav: {
        background: "#FFFFFF", 
        borderColor: "#DDDDDD", 
        borderWidth: "0 0 3px 0", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
        color: "#111111",
      },
      hero: {
        background: "linear-gradient(135deg, #FFFFFF 0%, #F7F7F7 100%)", 
        backgroundImage: "radial-gradient(ellipse at top, rgba(0, 81, 186, 0.03) 0%, transparent 50%)",
        color: "#111111",
        boxShadow: "inset 0 -1px 0 #DDDDDD",
      },
      tabs: {
        list: {
          background: "#F7F7F7", 
          borderRadius: "var(--radius)",
          padding: "var(--space-1)",
          border: "2px solid #DDDDDD", 
        },
        trigger: {
          color: "#555555",
          borderRadius: "var(--radius-sm)",
          backgroundActive: "var(--brand-main)", 
          textColorActive: "var(--brand-on)",
          boxShadowActive: "0 2px 4px rgba(0, 81, 186, 0.25)", 
          fontWeight: "var(--font-weight-bold)", 
          padding: "0.875rem 1.25rem", 
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }
      },
      overviewCard: {
        background: "var(--surface-card)", 
        borderColor: "#DDDDDD",
        borderWidth: "2px", 
        borderRadius: "var(--radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
        overlayImage: "none",
      },
      chartShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "#DDDDDD",
        borderWidth: "2px",
        borderRadius: "var(--radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      chartShowcaseTitle: {
        color: "var(--brand-main)", 
        fontWeight: "var(--font-weight-bold)", 
        fontSize: "1.375rem", 
        letterSpacing: "0.025em",
        textTransform: "uppercase",
        fontFamily: "var(--font-family-display)"
      },
      componentShowcaseCard: {
        background: "var(--surface-card)",
        borderColor: "#DDDDDD",
        borderWidth: "2px",
        borderRadius: "var(--radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
      componentShowcaseTitle: {
        color: "var(--brand-main)", 
        fontWeight: "var(--font-weight-bold)",
        fontSize: "1.375rem",
        letterSpacing: "0.025em",
        textTransform: "uppercase",
        fontFamily: "var(--font-family-display)"
      },
      brandPickerContainer: {
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        border: "2px solid #DDDDDD",
        borderRadius: "var(--radius-lg)",
      },
      button: {
        // Primary button (default variant)
        primary: {
          default: {
            background: "#0051BA", // var(--button-bg)
            color: "#FFFFFF", // var(--button-foreground)
            borderRadius: "var(--radius-sm)", 
            boxShadow: "0 3px 6px rgba(0, 81, 186, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)", // var(--button-shadow)
            fontWeight: "700", // var(--button-primary-default-font-weight)
            letterSpacing: "0.075em", // var(--button-primary-default-letter-spacing)
            padding: "1rem 2rem", 
            textTransform: "uppercase",
            fontSize: "0.875rem",
            fontFamily: "var(--font-family-sans)",
          },
          hover: {
            background: "#00398C", // var(--button-hover-bg)
            color: "#FFFFFF", // var(--button-hover-foreground)
            boxShadow: "0 4px 12px rgba(0, 81, 186, 0.35), 0 0 0 1px rgba(255,255,255,0.1)", 
            transform: "translateY(-2px) scale(1.02)", 
          },
          active: {
            background: "#002E75", // var(--button-primary-active-background)
            transform: "translateY(0px) scale(1)", // var(--button-primary-active-transform)
            boxShadow: "0 1px 3px rgba(0, 81, 186, 0.4), inset 0 2px 4px rgba(0,0,0,0.1)", // var(--button-primary-active-box-shadow)
          },
          focus: {
            boxShadow: "0 0 0 4px rgba(0, 81, 186, 0.4), 0 3px 6px rgba(0, 81, 186, 0.25)", // var(--button-primary-focus-box-shadow)
          }
        },
        // Destructive button
        destructive: {
          default: {
            background: "#D84315", // var(--button-destructive-bg)
            color: "#FFFFFF", // var(--button-destructive-foreground)
            boxShadow: "0 3px 6px rgba(216, 67, 21, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)", // var(--button-destructive-shadow)
            fontWeight: "700", // var(--button-destructive-default-font-weight)
            letterSpacing: "0.075em", // var(--button-destructive-default-letter-spacing)
            borderRadius: "var(--radius-sm)",
            padding: "1rem 2rem",
            textTransform: "uppercase",
            fontSize: "0.875rem",
          },
          hover: {
            background: "#BF360C", // var(--button-destructive-hover-bg)
            color: "#FFFFFF", // var(--button-destructive-hover-foreground)
            boxShadow: "0 4px 12px rgba(216, 67, 21, 0.35), 0 0 0 1px rgba(255,255,255,0.1)", // var(--button-destructive-hover-box-shadow)
          },
          active: {
            background: "#BF360C", // var(--button-destructive-active-background)
            boxShadow: "0 1px 3px rgba(216, 67, 21, 0.4), inset 0 2px 4px rgba(0,0,0,0.1)", // var(--button-destructive-active-box-shadow)
            transform: "translateY(0px) scale(1)", // var(--button-destructive-active-transform)
          }
        },
        // Outline button
        outline: {
          default: {
            background: "transparent", // var(--button-outline-default-background)
            borderColor: "#0051BA", // var(--button-outline-default-border-color)
            borderWidth: "2px", // var(--button-outline-border-width)
            color: "#0051BA", // var(--button-outline-default-color)
            fontWeight: "600", // var(--button-outline-default-font-weight)
            borderRadius: "var(--radius-sm)",
            padding: "calc(1rem - 2px) calc(2rem - 2px)",
            textTransform: "uppercase",
            fontSize: "0.875rem",
          },
          hover: {
            background: "#E5F2FF", // var(--button-outline-hover-background)
            color: "#00398C", // var(--button-outline-hover-color)
            borderColor: "#00398C", // var(--button-outline-hover-border-color)
          },
          active: {
            background: "#CCE5FF", // var(--button-outline-active-background)
          }
        },
        // Secondary button
        secondary: {
          default: {
            background: "#FFFFFF", // var(--button-secondary-bg)
            color: "#111111", // var(--button-secondary-foreground)
            borderColor: "#BBBBBB", // var(--button-secondary-default-border-color)
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)", // var(--button-secondary-shadow)
            fontWeight: "600", // var(--button-secondary-default-font-weight)
            letterSpacing: "0.05em", // var(--button-secondary-default-letter-spacing)
            borderWidth: "2px",
            borderRadius: "var(--radius-sm)",
            padding: "calc(1rem - 2px) calc(2rem - 2px)",
            textTransform: "uppercase",
            fontSize: "0.875rem",
          },
          hover: {
            background: "#F7F7F7", // var(--button-secondary-hover-bg)
            borderColor: "#0051BA", // var(--button-secondary-hover-border-color)
            boxShadow: "0 3px 8px rgba(0,0,0,0.12)", // var(--button-secondary-hover-box-shadow)
          },
          active: {
            background: "#EEEEEE", // var(--button-secondary-active-background)
            borderColor: "#00398C", // var(--button-secondary-active-border-color)
          }
        },
        // Ghost button
        ghost: {
          default: {
            color: "#555555", // var(--button-ghost-text)
            background: "transparent",
            fontWeight: "500",
            padding: "1rem 1.5rem",
            borderRadius: "var(--radius-sm)",
          },
          hover: {
            background: "#F7F7F7", // var(--button-ghost-hover-bg)
            color: "#111111", // var(--button-ghost-hover-text)
          },
          active: {
            background: "#EEEEEE", // fallback for var(--button-ghost-active-background)
          }
        },
        // Link button
        link: {
          default: {
            color: "#0051BA", // var(--button-link-text)
            fontWeight: "500",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          },
          hover: {
            color: "#00398C", // var(--button-link-hover-text)
          },
          active: {
            color: "#002E75", // fallback for var(--button-link-active-text)
          }
        },
        fontFamily: "var(--font-family-sans)",
        fontSize: "0.875rem", 
      },
      input: {
        background: "#FFFFFF", 
        color: "#111111",
        borderColor: "#BBBBBB",
        borderRadius: "var(--radius-sm)",
        padding: "0.875rem 1rem", 
        borderWidth: "2px", 
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)", 
        focus: {
          borderColor: "#0051BA", 
          boxShadow: "0 0 0 3px rgba(0, 81, 186, 0.25), inset 0 1px 2px rgba(0,0,0,0.05)", 
          background: "#FFFFFF", 
        },
        placeholderColor: "#777777",
        fontFamily: "var(--font-family-sans)",
        fontSize: "1rem",
      },
      card: {
        background: "#FFFFFF",
        borderColor: "#DDDDDD", 
        borderWidth: "2px", 
        borderRadius: "var(--radius)", 
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
        padding: "1.5rem",
        header: {
          padding: "1.5rem 1.5rem 1rem",
          titleColor: "#111111", 
          descriptionColor: "#555555",
          letterSpacing: "0",
          fontFamily: "var(--font-family-display)"
        },
        fontFamily: "var(--font-family-display)",
      },
      badge: {
        variantDefault: {
          background: "#FBD914", 
          color: "#111111", 
          borderRadius: "var(--radius-sm)",
          padding: "0.5rem 0.875rem", 
          fontSize: "0.75rem", 
          fontWeight: 700, 
          letterSpacing: "0.05em",
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          border: "1px solid #E0C312",
          boxShadow: "0 1px 3px rgba(251, 217, 20, 0.3)",
        },
        variantDestructive: {
          background: "#D84315", 
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm)",
          padding: "0.5rem 0.875rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          boxShadow: "0 1px 3px rgba(216, 67, 21, 0.3)",
        },
        variantSuccess: {
          background: "#2E7D32", 
          color: "#FFFFFF", 
          borderRadius: "var(--radius-sm)",
          padding: "0.5rem 0.875rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          boxShadow: "0 1px 3px rgba(46, 125, 50, 0.3)",
        },
        variantWarning: {
          background: "#FF6D00",
          color: "#FFFFFF", 
          borderRadius: "var(--radius-sm)",
          padding: "0.5rem 0.875rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          boxShadow: "0 1px 3px rgba(255, 109, 0, 0.3)",
        },
        variantInfo: {
          background: "#0051BA",
          color: "#FFFFFF", 
          borderRadius: "var(--radius-sm)",
          padding: "0.5rem 0.875rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-family-sans)",
          textTransform: "uppercase",
          boxShadow: "0 1px 3px rgba(0, 81, 186, 0.3)",
        },
      },
      tooltip: {
        background: "#111111", 
        color: "#FFFFFF", 
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem 1rem",
        boxShadow: "0 6px 16px rgba(0,0,0,0.25)", 
        fontSize: "0.875rem",
        letterSpacing: "0",
        fontFamily: "var(--font-family-sans)",
        fontWeight: "500",
      },
      charts: {
        gridStrokeColor: "rgba(221,221,221,0.8)", 
        axisStrokeColor: "#BBBBBB",
        axisTextColor: "#555555",
        legendTextColor: "#111111",
        tooltipCursorFill: "rgba(0, 81, 186, 0.1)", 
      },
      loadingIndicator: {
        background: "#F7F7F7",
        color: "#0051BA", 
        textColor: "#555555", 
        fontFamily: "var(--font-family-sans)"
      },
      tokenGroupCard: {
        background: "var(--surface-card)",
        backgroundImage: "linear-gradient(145deg, rgba(255, 54, 0, 0.04) 0%, rgba(0,0,0,0) 35%)",
        borderWidth: "var(--border-width-default)",
        borderStyle: "var(--border-style-default)",
        borderColor: "var(--border-color-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(255, 54, 0, 0.12)",
        padding: "var(--padding-card)",
      },
    },
    componentShowcase: {
      title: "IKEA Design System",
      description: "Bold, democratic design components that bring Swedish functionality to digital experiences.",
      interactiveElements: [
        { id: "button-primary-ikea", name: "Primary Action", description: "Bold blue buttons for main actions with strong visual hierarchy.", displayComponent: "ADD TO BAG" },
        { id: "button-secondary-ikea", name: "Secondary Action", description: "Clean white buttons with subtle borders for supporting actions.", displayComponent: "FIND IN STORE" },
        { id: "button-outline-ikea", name: "Outline Action", description: "Outlined buttons maintaining brand consistency for tertiary actions.", displayComponent: "ADD TO FAVORITES" },
        { id: "badge-status-ikea", name: "Product Status", description: "Bright yellow badges using IKEA's signature color for status indicators.", displayComponent: "IN STOCK" },
        { id: "badge-alert-ikea", name: "Feature Badge", description: "Eye-catching badges for promotions and new features.", displayComponent: "NEW LOWER PRICE" }
      ],
      forms: [
        { id: "input-text-ikea", name: "Text Input", description: "Clean, accessible inputs with strong borders and clear focus states.", displayComponent: "Enter postcode" },
        { id: "input-search-ikea", name: "Search Input", description: "Bold search interface designed for easy product discovery.", displayComponent: "Search all products" }
      ],
      feedbackIndicators: [
        { id: "loading-indicator-ikea", name: "Loading State", description: "Confident loading states that maintain IKEA's brand personality.", displayComponent: "Loading your favorites..." }
      ]
    },
    supplementaryChartColors: ["#0051BA", "#FBD914", "#2E7D32", "#FF6D00", "#D84315"],
  }