import { BrandDefinition, SurfaceSet } from "./brands-types";
import { APPLE_THEME } from "./themes/apple.theme";
import { GOOGLE_THEME } from "./themes/google.theme";
import { AIRBNB_THEME } from "./themes/airbnb.theme";
import { NINTENDO_THEME } from "./themes/nintendo.theme";
import { RAZER_THEME } from "./themes/razer.theme";

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
  if (!match) return "cmyk(0%, 0%, 0%, 100%)";

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


export const BRANDS: BrandDefinition[] = [
    APPLE_THEME,
    GOOGLE_THEME,
    AIRBNB_THEME,
    NINTENDO_THEME, // Use the direct import
    RAZER_THEME,
  {
    name: "Nextgen",
    id: "nextgen",
    description:
      "Futuristic and bold, inspired by Razer's gamer aesthetic with a fiery orange-red twist and modern typography.",
    brandColors: [
      {
        name: "Nextgen Orange",
        hex: "#FF3600",
        variableName: "brand-orange-primary",
        shades: {
          "50": { hex: "#FFF2E6", variableName: "brand-orange-50" },
          "100": { hex: "#FFE0D0", variableName: "brand-orange-100" },
          "200": { hex: "#FFB380", variableName: "brand-orange-200" },
          "300": { hex: "#FF8530", variableName: "brand-orange-300" },
          "400": { hex: "#FF5700", variableName: "brand-orange-400" },
          "500": { hex: "#FF3600", variableName: "brand-orange-500" },
          "600": { hex: "#CC2B00", variableName: "brand-orange-600" },
          "700": { hex: "#992100", variableName: "brand-orange-700" },
          "800": { hex: "#661600", variableName: "brand-orange-800" },
          "900": { hex: "#330B00", variableName: "brand-orange-900" }
        }
      },
      {
        name: "Nextgen Dark", // This is a primary dark, distinct from general neutrals
        hex: "#1A1A1A", 
        variableName: "brand-dark-primary",
        shades: {
          "50": { hex: "#2C2C2C", variableName: "brand-dark-50" },
          "100": { hex: "#252525", variableName: "brand-dark-100" },
          "200": { hex: "#1E1E1E", variableName: "brand-dark-200" },
          "300": { hex: "#1B1B1B", variableName: "brand-dark-300" },
          "400": { hex: "#1A1A1A", variableName: "brand-dark-400" }, 
          "500": { hex: "#1A1A1A", variableName: "brand-dark-500" }, 
          "600": { hex: "#171717", variableName: "brand-dark-600" },
          "700": { hex: "#131313", variableName: "brand-dark-700" },
          "800": { hex: "#101010", variableName: "brand-dark-800" },
          "900": { hex: "#0A0A0A", variableName: "brand-dark-900" },
        }
      },
      {
       name: "Nextgen Red",
       hex: "#D32F2F",
       variableName: "brand-red-primary",
       shades: {
        "50": { hex: "#FDECEA", variableName: "brand-red-50" },
        "100": { hex: "#FAD9D5", variableName: "brand-red-100" },
        "200": { hex: "#F5B6AC", variableName: "brand-red-200" },
        "300": { hex: "#F09383", variableName: "brand-red-300" },
        "400": { hex: "#EB705A", variableName: "brand-red-400" },
        "500": { hex: "#D32F2F", variableName: "brand-red-500" },
        "600": { hex: "#B82929", variableName: "brand-red-600" },
        "700": { hex: "#9D2323", variableName: "brand-red-700" },
        "800": { hex: "#821D1D", variableName: "brand-red-800" },
        "900": { hex: "#671717", variableName: "brand-red-900" },
       }
      },
      {
        name: "Nextgen Amber",
        hex: "#FFA000",
        variableName: "brand-amber-primary",
        shades: {
          "50": { hex: "#FFF8E1", variableName: "brand-amber-50" },
          "100": { hex: "#FFECB3", variableName: "brand-amber-100" },
          "200": { hex: "#FFE082", variableName: "brand-amber-200" },
          "300": { hex: "#FFD54F", variableName: "brand-amber-300" },
          "400": { hex: "#FFCA28", variableName: "brand-amber-400" },
          "500": { hex: "#FFA000", variableName: "brand-amber-500" },
          "600": { hex: "#FF8F00", variableName: "brand-amber-600" },
          "700": { hex: "#FF6F00", variableName: "brand-amber-700" },
          "800": { hex: "#FF4F00", variableName: "brand-amber-800" },
          "900": { hex: "#E65100", variableName: "brand-amber-900" },
        }
      },
      {
        name: "Nextgen Blue",
        hex: "#03A9F4",
        variableName: "brand-blue-primary",
        shades: {
          "50": { hex: "#E1F5FE", variableName: "brand-blue-50" },
          "100": { hex: "#B3E5FC", variableName: "brand-blue-100" },
          "200": { hex: "#81D4FA", variableName: "brand-blue-200" },
          "300": { hex: "#4FC3F7", variableName: "brand-blue-300" },
          "400": { hex: "#29B6F6", variableName: "brand-blue-400" },
          "500": { hex: "#03A9F4", variableName: "brand-blue-500" },
          "600": { hex: "#039BE5", variableName: "brand-blue-600" },
          "700": { hex: "#0288D1", variableName: "brand-blue-700" },
          "800": { hex: "#0277BD", variableName: "brand-blue-800" },
          "900": { hex: "#01579B", variableName: "brand-blue-900" },
        }
      },
      // New "Nextgen Neutral" family
      {
        name: "Nextgen Neutral",
        hex: "#A0A0A0", // Representative hex for the family (e.g., a mid-tone)
        variableName: "brand-neutral-primary", // The primary alias for this family
        shades: {
          "50":  { hex: "#E0E0E0", variableName: "brand-neutral-50" },  // Nav Text
          "100": { hex: "#A0A0A0", variableName: "brand-neutral-100" }, // Muted Foreground
          "200": { hex: "#777777", variableName: "brand-neutral-200" }, // Text Muted
          "300": { hex: "#555555", variableName: "brand-neutral-300" }, // Border Strong
          "400": { hex: "#444444", variableName: "brand-neutral-400" }, // Border Default
          "500": { hex: "#3A3A3A", variableName: "brand-neutral-500" }, // Surface Muted
          "600": { hex: "#333333", variableName: "brand-neutral-600" }, // Border Subtle, was #282828 (Popover)
          "700": { hex: "#282828", variableName: "brand-neutral-700" }, // Surface Popover, was #222222 (Tabs List BG)
          "800": { hex: "#1C1C1C", variableName: "brand-neutral-800" }, // Surface Card, was #222222 (Tabs List BG)
          "900": { hex: "#222222", variableName: "brand-neutral-900" }  // Tabs List BG, was a generic #151515
        }
      }
      // Removed the individual specific color entries like "Nextgen Surface Card", etc.
    ],
    brand: {
      main: {
        name: "Nextgen Orange (Primary)",
        hex: "#FF3600",
        rgb: hexToRgbString("#FF3600"),
        cmyk: rgbToCmykString(hexToRgbString("#FF3600")),
        variableName: "brand-orange-primary",
      },
      on: "#FFFFFF", 
      secondary: {
        name: "Nextgen Dark (Secondary)",
        hex: "#1A1A1A", 
        rgb: hexToRgbString("#1A1A1A"),
        cmyk: rgbToCmykString(hexToRgbString("#1A1A1A")),
        variableName: "brand-dark-primary",
      },
    },
    supportPalette: [ 
      { name: "Nextgen Orange (Success)", hex: "#FF3600", rgb: hexToRgbString("#FF3600"), cmyk: rgbToCmykString(hexToRgbString("#FF3600")), variableName: "semantic-success" }, // Will use brand-orange-500
      { name: "Nextgen Red (Destructive)", hex: "#D32F2F", rgb: hexToRgbString("#D32F2F"), cmyk: rgbToCmykString(hexToRgbString("#D32F2F")), variableName: "semantic-destructive" }, // Will use brand-red-500
      { name: "Nextgen Amber (Warning)", hex: "#FFA000", rgb: hexToRgbString("#FFA000"), cmyk: rgbToCmykString(hexToRgbString("#FFA000")), variableName: "semantic-warning" }, // Will use brand-amber-500
      { name: "Nextgen Blue (Info)", hex: "#03A9F4", rgb: hexToRgbString("#03A9F4"), cmyk: rgbToCmykString(hexToRgbString("#03A9F4")), variableName: "semantic-info" }, // Will use brand-blue-500
    ],
    surface: {
      background: "#101010", // Corresponds to brand-dark-800
      card: "#1C1C1C",       // Will use brand-neutral-800 (previously brand-surface-card-500)
      popover: "#282828",     // Will use brand-neutral-700 (previously brand-surface-popover-500)
      on: "#FFFFFF",         
      muted: "#3A3A3A",      // Will use brand-neutral-500 (previously brand-surface-muted-500)
      mutedForeground: "#E0E0E0", // Changed from #A0A0A0. Will use brand-neutral-50
      brandSubtle: "rgba(255, 54, 0, 0.07)", 
      textMuted: "#777777",   // Will use brand-neutral-200 (previously brand-text-muted-500)
    },
    semantic: {
      destructive: "#D32F2F", 
      success: "#FF3600",    
      warning: "#FFA000",     
      info: "#03A9F4",        
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
    motion: { 
      motionFast: "100ms",
      motionStandard: "200ms",
      motionSlow: "350ms",
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
    elevation: { 
      shadowXs: "0 1px 2px rgba(0,0,0,0.2)",
      shadowSm: "0 2px 4px rgba(0,0,0,0.3)",
      shadowMd: "0 4px 8px rgba(0,0,0,0.4)",
      shadowLg: "0 8px 16px rgba(0,0,0,0.4)",
      shadowXl: "0 12px 24px rgba(0,0,0,0.5)",
      shadowBrandSm: "0 2px 6px rgba(255, 54, 0, 0.2)", 
      shadowBrandMd: "0 4px 10px rgba(255, 54, 0, 0.25)",
      shadowBrandLg: "0 8px 18px rgba(255, 54, 0, 0.3)",
    },
    spacing: { 
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
      to: "#CC2B00", 
      accent: "#FF5700",
    }, 
    borderStyles: { 
      defaultColor: "#444444",
      subtleColor: "#333333",
      strongColor: "#555555",
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
          padding: "var(--space-sm)",
        },
        trigger: {
          color: "var(--surface-muted-fg)",
          borderRadius: "var(--radius-sm)",
          backgroundActive: "var(--brand-main)", 
          textColorActive: "var(--brand-on)",
          boxShadowActive: "0 0 10px rgba(255, 54, 0, 0.4)", 
          fontWeight: "var(--font-weight-medium)",
          padding: "0.5rem 1rem",
          fontFamily: "var(--font-family-sans)",
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
        fontFamily: "var(--font-family-display)"
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
        fontFamily: "var(--font-family-display)"
      },
      brandPickerContainer: {
        background: "rgba(16,16,16,0.7)",
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
            background: "color-mix(in srgb, var(--surface-muted, #3A3A3A) 90%, var(--brand-main, #FF3600) 8%)",
            borderColor: "var(--brand-main, #FF3600)", 
            color: "var(--brand-main, #FF3600)", 
            boxShadow: "0 0 8px 1px color-mix(in srgb, var(--brand-main) 20%, transparent)",
          },
          active: {
            background: "color-mix(in srgb, var(--surface-muted, #3A3A3A88) 90%, var(--brand-main, #FF3600) 8%)",
            borderColor: "color-mix(in srgb, var(--brand-main, #FF3600) 80%, #000 20%)",
          },
          focus: {
            borderColor: "var(--brand-main, #FF3600)",
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
            borderColor: "var(--semantic-destructive)",
            borderWidth: "1px",
            borderRadius: "var(--radius-sm, 4px)",
            boxShadow: "0 2px 5px rgba(211, 47, 47, 0.2), inset 0 -1px 1px rgba(0,0,0,0.25)",
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
        fontFamily: "var(--font-family-sans)",
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
        fontFamily: "var(--font-family-sans)",
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
          fontFamily: "var(--font-family-display)"
        },
        fontFamily: "var(--font-family-display)",
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
          fontFamily: "var(--font-family-sans)"
        },
        variantDestructive: {
          background: "var(--semantic-destructive)", 
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)"
        },
        variantSuccess: {
          background: "var(--brand-main)", 
          color: "var(--brand-on)", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)"
        },
        variantWarning: {
          background: "var(--semantic-warning)",
          color: "var(--surface-on)", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)"
        },
        variantInfo: {
          background: "var(--semantic-info)",
          color: "#FFFFFF", 
          borderRadius: "var(--radius-sm, 4px)",
          padding: "0.3rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          fontFamily: "var(--font-family-sans)"
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
        fontFamily: "var(--font-family-sans)"
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
        fontFamily: "var(--font-family-sans)"
      }
    },
    componentShowcase: {
      title: "Nextgen UI Components",
      description: "Futuristic and bold UI elements for the Nextgen experience.",
      interactiveElements: [
        { id: "button-primary-nextgen", name: "Primary Button (Nextgen)", description: "Core action, high impact.", displayComponent: "ENGAGE" },
        { id: "button-secondary-nextgen", name: "Secondary Button (Nextgen)", description: "Alternative actions, system settings.", displayComponent: "SYSTEMS CHECK" },
        { id: "button-outline-nextgen", name: "Outline Button (Nextgen)", description: "Subtle options, mode switching.", displayComponent: "View Modes" },
        { id: "badge-status-nextgen", name: "Status Badge (Nextgen)", description: "Indicates system status or power levels.", displayComponent: "ONLINE" },
        { id: "badge-alert-nextgen", name: "Alert Badge (Nextgen)", description: "Critical system alerts or updates.", displayComponent: "Core Update" }
      ],
      forms: [
        { id: "input-text-nextgen", name: "Text Input (Nextgen)", description: "Sleek input fields for configurations.", displayComponent: "Enter Command" },
        { id: "input-search-nextgen", name: "Search Bar (Nextgen)", description: "Search within the Nextgen interface.", displayComponent: "Search Database" }
      ],
      feedbackIndicators: [
        { id: "loading-indicator-nextgen", name: "Loading Core (Nextgen)", description: "Loading indicator with a futuristic feel.", displayComponent: "Initializing Core..." }
      ]
    },
    supplementaryChartColors: ["#FF3600", "#D32F2F", "#FFA000", "#03A9F4", "#AEAEAE"],
  },
  {
    name: "Ikea",
    id: "ikea",
    description:
      "Bold and authentically Swedish design system that captures IKEA's democratic design philosophy with confident use of signature blue and yellow, strong typography, and functional aesthetics.",
    brandColors: [
      {
        name: "Ikea Blue",
        hex: "#0051BA", // True IKEA blue
        variableName: "brand-blue-primary",
        shades: {
          "50": { hex: "#E5F2FF", variableName: "brand-blue-50" },
          "100": { hex: "#CCE5FF", variableName: "brand-blue-100" },
          "200": { hex: "#99CBFF", variableName: "brand-blue-200" },
          "300": { hex: "#66B0FF", variableName: "brand-blue-300" },
          "400": { hex: "#3396FF", variableName: "brand-blue-400" },
          "500": { hex: "#0051BA", variableName: "brand-blue-500" },
          "600": { hex: "#0045A3", variableName: "brand-blue-600" },
          "700": { hex: "#00398C", variableName: "brand-blue-700" },
          "800": { hex: "#002E75", variableName: "brand-blue-800" },
          "900": { hex: "#00225E", variableName: "brand-blue-900" }
        }
      },
      {
        name: "Ikea Yellow",
        hex: "#FBD914", // Vibrant IKEA yellow
        variableName: "brand-yellow-primary",
        shades: {
          "50": { hex: "#FFFBEA", variableName: "brand-yellow-50" },
          "100": { hex: "#FFF7D4", variableName: "brand-yellow-100" },
          "200": { hex: "#FFEEA9", variableName: "brand-yellow-200" },
          "300": { hex: "#FFE67E", variableName: "brand-yellow-300" },
          "400": { hex: "#FFDD53", variableName: "brand-yellow-400" },
          "500": { hex: "#FBD914", variableName: "brand-yellow-500" },
          "600": { hex: "#E0C312", variableName: "brand-yellow-600" },
          "700": { hex: "#C5AD10", variableName: "brand-yellow-700" },
          "800": { hex: "#AA970E", variableName: "brand-yellow-800" },
          "900": { hex: "#8F810C", variableName: "brand-yellow-900" }
        }
      },
      {
        name: "Ikea Gray",
        hex: "#111111", 
        variableName: "brand-gray-primary",
        shades: {
          "50": { hex: "#F7F7F7", variableName: "brand-gray-50" },
          "100": { hex: "#EEEEEE", variableName: "brand-gray-100" },
          "200": { hex: "#DDDDDD", variableName: "brand-gray-200" },
          "300": { hex: "#BBBBBB", variableName: "brand-gray-300" },
          "400": { hex: "#999999", variableName: "brand-gray-400" },
          "500": { hex: "#777777", variableName: "brand-gray-500" },
          "600": { hex: "#555555", variableName: "brand-gray-600" },
          "700": { hex: "#333333", variableName: "brand-gray-700" },
          "800": { hex: "#222222", variableName: "brand-gray-800" },
          "900": { hex: "#111111", variableName: "brand-gray-900" }
        }
      },
      {
       name: "Ikea Green",
       hex: "#2E7D32",
       variableName: "brand-green-primary",
       shades: {
        "50": { hex: "#E8F5E8", variableName: "brand-green-50" },
        "100": { hex: "#C8E6C9", variableName: "brand-green-100" },
        "200": { hex: "#A5D6A7", variableName: "brand-green-200" },
        "300": { hex: "#81C784", variableName: "brand-green-300" },
        "400": { hex: "#66BB6A", variableName: "brand-green-400" },
        "500": { hex: "#2E7D32", variableName: "brand-green-500" },
        "600": { hex: "#2E7D32", variableName: "brand-green-600" },
        "700": { hex: "#1B5E20", variableName: "brand-green-700" },
        "800": { hex: "#2E7D32", variableName: "brand-green-800" },
        "900": { hex: "#1B5E20", variableName: "brand-green-900" },
       }
      },
      {
        name: "Ikea Orange",
        hex: "#FF6D00",
        variableName: "brand-orange-primary",
        shades: {
          "50": { hex: "#FFF3E0", variableName: "brand-orange-50" },
          "100": { hex: "#FFE0B2", variableName: "brand-orange-100" },
          "200": { hex: "#FFCC80", variableName: "brand-orange-200" },
          "300": { hex: "#FFB74D", variableName: "brand-orange-300" },
          "400": { hex: "#FFA726", variableName: "brand-orange-400" },
          "500": { hex: "#FF6D00", variableName: "brand-orange-500" },
          "600": { hex: "#FF6D00", variableName: "brand-orange-600" },
          "700": { hex: "#F57C00", variableName: "brand-orange-700" },
          "800": { hex: "#EF6C00", variableName: "brand-orange-800" },
          "900": { hex: "#E65100", variableName: "brand-orange-900" },
        }
      },
      {
        name: "Ikea Red",
        hex: "#D84315",
        variableName: "brand-red-primary",
        shades: {
          "50": { hex: "#FFEDE8", variableName: "brand-red-50" },
          "100": { hex: "#FFDBD1", variableName: "brand-red-100" },
          "200": { hex: "#FFB7A3", variableName: "brand-red-200" },
          "300": { hex: "#FF9375", variableName: "brand-red-300" },
          "400": { hex: "#FF6F47", variableName: "brand-red-400" },
          "500": { hex: "#D84315", variableName: "brand-red-500" },
          "600": { hex: "#D84315", variableName: "brand-red-600" },
          "700": { hex: "#BF360C", variableName: "brand-red-700" },
          "800": { hex: "#BF360C", variableName: "brand-red-800" },
          "900": { hex: "#BF360C", variableName: "brand-red-900" },
        }
      },
      {
        name: "Ikea Neutral",
        hex: "#111111", 
        variableName: "brand-neutral-primary",
        shades: {
          "50":  { hex: "#F7F7F7", variableName: "brand-neutral-50" },  
          "100": { hex: "#EEEEEE", variableName: "brand-neutral-100" }, 
          "200": { hex: "#DDDDDD", variableName: "brand-neutral-200" }, 
          "300": { hex: "#BBBBBB", variableName: "brand-neutral-300" }, 
          "400": { hex: "#999999", variableName: "brand-neutral-400" }, 
          "500": { hex: "#777777", variableName: "brand-neutral-500" }, 
          "600": { hex: "#555555", variableName: "brand-neutral-600" }, 
          "700": { hex: "#333333", variableName: "brand-neutral-700" }, 
          "800": { hex: "#222222", variableName: "brand-neutral-800" }, 
          "900": { hex: "#111111", variableName: "brand-neutral-900" }  
        }
      }
    ],
    brand: {
      main: {
        name: "Ikea Blue (Primary)",
        hex: "#0051BA",
        rgb: hexToRgbString("#0051BA"),
        cmyk: rgbToCmykString(hexToRgbString("#0051BA")),
        variableName: "brand-blue-primary",
      },
      on: "#FFFFFF", 
      secondary: {
        name: "Ikea Yellow (Secondary)",
        hex: "#FBD914", 
        rgb: hexToRgbString("#FBD914"),
        cmyk: rgbToCmykString(hexToRgbString("#FBD914")),
        variableName: "brand-yellow-primary",
      },
    },
    supportPalette: [ 
      { name: "Ikea Green (Success)", hex: "#2E7D32", rgb: hexToRgbString("#2E7D32"), cmyk: rgbToCmykString(hexToRgbString("#2E7D32")), variableName: "semantic-success" },
      { name: "Ikea Red (Destructive)", hex: "#D84315", rgb: hexToRgbString("#D84315"), cmyk: rgbToCmykString(hexToRgbString("#D84315")), variableName: "semantic-destructive" },
      { name: "Ikea Orange (Warning)", hex: "#FF6D00", rgb: hexToRgbString("#FF6D00"), cmyk: rgbToCmykString(hexToRgbString("#FF6D00")), variableName: "semantic-warning" },
      { name: "Ikea Blue (Info)", hex: "#0051BA", rgb: hexToRgbString("#0051BA"), cmyk: rgbToCmykString(hexToRgbString("#0051BA")), variableName: "semantic-info" },
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
      }
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
  
];


const DEFAULT_SHAPE = {
  radiusSm: "0.25rem",
  radius: "0.5rem",
  radiusLg: "0.75rem",
  radiusXl: "1rem",
  // componentStyles: {}, // Removed as it's part of BrandDefinition
  // componentShowcase: {}, // Removed as it's part of BrandDefinition
  // supplementaryChartColors: [], // Removed as it's part of BrandDefinition
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

type TokenGroup = {
  prefix: string;
  source: any;
  keys: { themeKey: string; name: string; fallback: string }[];
};

export function makeCssVars(b: BrandDefinition): Record<string, string> {
  const cssVars: Record<string, string> = {};

  const shape = { ...DEFAULT_SHAPE, ...(b.shape ?? {}) };
  const typography = { ...DEFAULT_TYPOGRAPHY, ...(b.typography ?? {}) };
  const motion = { ...DEFAULT_MOTION, ...(b.motion ?? {}) };
  const elevation = { ...DEFAULT_ELEVATION, ...(b.elevation ?? {}) };
  const spacing = { ...DEFAULT_SPACING, ...(b.spacing ?? {}) };
  const gradientConfig = b.gradient ?? { from: b.brand.main.hex, to: b.brand.secondary?.hex ?? b.brand.main.hex, accent: b.brand.main.hex };

  // 0. Generate specific brand color & shade variables from brandColors
  let firstPrimary500Var = "";
  const allDefinedColorVarsMap: Record<string, string> = {}; // To map hex to its CSS var string

  b.brandColors?.forEach((brandColor, index) => {
    Object.entries(brandColor.shades).forEach(([shadeKey, shadeValue]) => {
      if (shadeValue) { 
        const varName = `--${b.id}-${shadeValue.variableName}`; 
        cssVars[varName] = shadeValue.hex;
        allDefinedColorVarsMap[shadeValue.hex.toUpperCase()] = `var(${varName})`;
        if (index === 0 && shadeKey === "500") {
          firstPrimary500Var = `var(${varName})`;
        }
      }
    });
    // Also map the main brandColor hex to its correct shade variable
    let matchingShadeKey: string | undefined = undefined;
    for (const key in brandColor.shades) {
        const shadeEntry = (brandColor.shades as any)[key];
        if (shadeEntry && shadeEntry.hex.toUpperCase() === brandColor.hex.toUpperCase()) {
            matchingShadeKey = key;
            break;
        }
    }

    if (matchingShadeKey && (brandColor.shades as any)[matchingShadeKey]) {
        const matchingShade = (brandColor.shades as any)[matchingShadeKey];
        const groupVarName = `--${b.id}-${brandColor.variableName}`;
        const specificShadeVarName = `--${b.id}-${matchingShade.variableName}`;

        allDefinedColorVarsMap[brandColor.hex.toUpperCase()] = `var(${specificShadeVarName})`;
        cssVars[groupVarName] = `var(${specificShadeVarName})`;

        // Ensure this group variable is also in the map if its hex matches the specific shade's hex
        if (brandColor.hex.toUpperCase() === matchingShade.hex.toUpperCase()) {
            allDefinedColorVarsMap[brandColor.hex.toUpperCase()] = `var(${groupVarName})`;
        }
    } else if (brandColor.shades["500"]) {
        // Fallback to 500 if no exact match found (legacy or default behavior)
        allDefinedColorVarsMap[brandColor.hex.toUpperCase()] = `var(--${b.id}-${brandColor.shades["500"].variableName})`;
        const groupVarName = `--${b.id}-${brandColor.variableName}`;
        const shade500VarName = `--${b.id}-${brandColor.shades["500"].variableName}`;
        cssVars[groupVarName] = `var(${shade500VarName})`;
        if (brandColor.hex.toUpperCase() === brandColor.shades["500"].hex.toUpperCase()) {
            allDefinedColorVarsMap[brandColor.hex.toUpperCase()] = `var(${groupVarName})`;
        }
    }
  });
  
  // Fallback for firstPrimary500Var if not set from brandColors (e.g. for themes not yet updated)
  if (!firstPrimary500Var) {
      const fallbackMainVarName = `--${b.id}-${b.brand.main.variableName || 'brand-main-fallback'}`;
      cssVars[fallbackMainVarName] = b.brand.main.hex;
      firstPrimary500Var = `var(${fallbackMainVarName})`;
      allDefinedColorVarsMap[b.brand.main.hex.toUpperCase()] = firstPrimary500Var;
  }

  const brandMainVar = firstPrimary500Var;
  cssVars["--brand-main"] = brandMainVar;

  let brandSecondaryVar = "";
  const secondaryDefinition = b.brand.secondary;

  // This function replaces direct hex/rgba values in componentStyles with var() references
  const processValueForVar = (value: any): string => {
    if (typeof value !== 'string') return String(value);
    const upperHex = value.toUpperCase();
    if (allDefinedColorVarsMap[upperHex]) {
      return allDefinedColorVarsMap[upperHex];
    }
    const rgbaMatch = value.match(/rgba?\(([^,]+),\s*([^,]+),\s*([^,]+)(?:,\s*([^\)]+))?\)/i);
    if (rgbaMatch) {
      const r = parseInt(rgbaMatch[1]);
      const g = parseInt(rgbaMatch[2]);
      const b_color = parseInt(rgbaMatch[3]);
      const alphaString = rgbaMatch[4]; // Group 4 is the alpha value string
      const alpha = alphaString !== undefined ? parseFloat(alphaString) : 1;

      // Add NaN checks for robustness
      if (isNaN(r) || isNaN(g) || isNaN(b_color) || isNaN(alpha)) {
        return value; // Fallback to original if parsing failed
      }

      const tempHex = ("#" + ((1 << 24) + (r << 16) + (g << 8) + b_color).toString(16).slice(1)).toUpperCase();
      if (allDefinedColorVarsMap[tempHex]) {
        const validAlpha = Math.max(0, Math.min(1, alpha));
        if (validAlpha === 1) { // Optimization for full opacity
          return allDefinedColorVarsMap[tempHex];
        }
        const alphaPercentage = validAlpha * 100;
        // Use color-mix; transparent will take the remaining percentage
        return `color-mix(in srgb, ${allDefinedColorVarsMap[tempHex]} ${alphaPercentage}%, transparent)`;
      }
    }
    return value; // Return original if no mapping found or not rgba/rgb
  };

  if (secondaryDefinition) {
    // Priority 1: Use brand.secondary.variableName if it maps to a brandColor group variableName
    const matchingBrandColorByVarName = b.brandColors?.find(bc => bc.variableName === secondaryDefinition.variableName);
    if (matchingBrandColorByVarName) {
        // Use the brandColor's primary variable name (e.g., var(--nextgen-brand-dark-primary))
        brandSecondaryVar = `var(--${b.id}-${matchingBrandColorByVarName.variableName})`;
    } else {
        // Priority 2: Use hex lookup in allDefinedColorVarsMap (maps to a specific shade var, e.g., var(--nextgen-brand-dark-500))
        const secondaryHexUpper = secondaryDefinition.hex.toUpperCase();
        if (allDefinedColorVarsMap[secondaryHexUpper]) {
            brandSecondaryVar = allDefinedColorVarsMap[secondaryHexUpper];
        } else {
            // Priority 3: Define a new variable for brand.secondary.hex if not in brandColors and use that
            const secondaryFallbackVarName = `--${b.id}-${secondaryDefinition.variableName || 'brand-secondary-fallback'}`;
            cssVars[secondaryFallbackVarName] = secondaryDefinition.hex;
            allDefinedColorVarsMap[secondaryHexUpper] = `var(${secondaryFallbackVarName})`; // Add to map for future lookups
            brandSecondaryVar = `var(${secondaryFallbackVarName})`;
        }
    }
} else {
    // Fallback if b.brand.secondary is not defined at all: use 700 shade of the first primary color, or brandMainVar
     const primary700Shade = b.brandColors?.[0]?.shades?.["700"];
      if (primary700Shade) {
        brandSecondaryVar = `var(--${b.id}-${primary700Shade.variableName})`;
      } else {
        brandSecondaryVar = brandMainVar;
      }
}
  cssVars["--brand-secondary"] = brandSecondaryVar;
  cssVars["--brand-on"] = b.brand.on;

  // Define support palette CSS vars and add to allDefinedColorVarsMap
  b.supportPalette?.forEach(sp => {
      const varName = `--${b.id}-${sp.variableName.replace("semantic-", "")}`;
      const hexUpper = sp.hex.toUpperCase();
      // Check if this hex is ALREADY in brandColors (i.e., allDefinedColorVarsMap)
      if (allDefinedColorVarsMap[hexUpper]) {
          // If yes, the support palette var should alias to the existing brandColor var
          cssVars[varName] = allDefinedColorVarsMap[hexUpper];
          // Ensure allDefinedColorVarsMap also maps the original support palette hex to this more primary var if they differ but map to same brandColor
          // This handles cases where sp.hex might be cased differently but is the same color
          if (allDefinedColorVarsMap[hexUpper] !== `var(${varName})`) {
            allDefinedColorVarsMap[sp.hex.toUpperCase()] = allDefinedColorVarsMap[hexUpper];
          }
      } else {
          // If not in brandColors, define it as a new variable and add to map
          cssVars[varName] = sp.hex;
          allDefinedColorVarsMap[hexUpper] = `var(${varName})`;
      }
  });

  const foundationTokens: Record<string, string> = {
    "brand-main": brandMainVar,
    "brand-on": b.brand.on,
    "brand-secondary": brandSecondaryVar,
  };

  // Populate surface tokens from b.surface, checking against allDefinedColorVarsMap
  if (b.surface) {
    const directSurfaceMap: { [key: string]: keyof BrandDefinition['surface'] } = {
        'surface-bg': 'background',
        'surface-card': 'card',
        'surface-popover': 'popover',
        'surface-on': 'on',
        'surface-muted': 'muted',
        'surface-muted-fg': 'mutedForeground',
    };
    for (const tokenName in directSurfaceMap) {
        const surfaceKey = directSurfaceMap[tokenName];
        const surfaceValue = b.surface[surfaceKey];
        if (surfaceValue && typeof surfaceValue === 'string') {
            const upperHex = surfaceValue.toUpperCase();
            if (allDefinedColorVarsMap[upperHex]) {
                foundationTokens[tokenName] = allDefinedColorVarsMap[upperHex];
            } else {
                foundationTokens[tokenName] = surfaceValue;
            }
        } else if (surfaceValue) {
            foundationTokens[tokenName] = String(surfaceValue); // Non-string fallback
        }
    }
  }

  // Populate semantic tokens from b.semantic, checking against allDefinedColorVarsMap
  // This loop correctly updates foundationTokens if a semantic color matches a brandColor
  if (b.semantic) {
    Object.keys(b.semantic).forEach(key => {
        const semanticValue = (b.semantic as any)[key];
        const tokenName = `semantic-${key}`;
        // Initialize with direct value, then try to upgrade if it matches a brandColor
        foundationTokens[tokenName] = String(semanticValue); 
        if (typeof semanticValue === 'string') {
            const semanticHexUpper = semanticValue.toUpperCase();
            if (allDefinedColorVarsMap[semanticHexUpper]) {
                foundationTokens[tokenName] = allDefinedColorVarsMap[semanticHexUpper];
            }
        }
    });
  }

  const tokenGroups: TokenGroup[] = [
    { prefix: 'border', source: b.borderStyles ?? {}, keys: [
      { themeKey: 'defaultColor', name: 'default-color', fallback: 'transparent' }, 
      { themeKey: 'subtleColor', name: 'subtle-color', fallback: 'color-mix(in srgb, var(--surface-muted-fg) 20%, transparent)' }, 
      { themeKey: 'strongColor', name: 'strong-color', fallback: 'color-mix(in srgb, var(--surface-muted-fg) 40%, transparent)' } 
    ] },
    { prefix: 'border-width', source: b.borderStyles ?? {}, keys: [ { themeKey: 'thinWidth', name: 'thin', fallback: '0.5px' }, { themeKey: 'defaultWidth', name: 'default', fallback: '1px' }, { themeKey: 'thickWidth', name: 'thick', fallback: '2px' } ] },
    { prefix: 'border-style', source: b.borderStyles ?? {}, keys: [ { themeKey: 'defaultStyle', name: 'default', fallback: 'solid' } ] },
    { prefix: 'shadow', source: elevation, keys: [ { themeKey: 'shadowXs', name: 'xs', fallback: '0 1px 2px rgba(0,0,0,0.02)' }, { themeKey: 'shadowSm', name: 'sm', fallback: '0 1px 3px rgba(0,0,0,0.04)' }, { themeKey: 'shadowMd', name: 'md', fallback: '0 2px 6px rgba(0,0,0,0.06)' }, { themeKey: 'shadowLg', name: 'lg', fallback: '0 4px 12px rgba(0,0,0,0.08)' }, { themeKey: 'shadowXl', name: 'xl', fallback: '0 8px 24px rgba(0,0,0,0.12)' } ] },
    { prefix: 'shadow-brand', source: b.elevation ?? {}, keys: [ { themeKey: 'shadowBrandSm', name: 'sm', fallback: `color-mix(in srgb, ${brandMainVar} 15%, transparent)` }, { themeKey: 'shadowBrandMd', name: 'md', fallback: `color-mix(in srgb, ${brandMainVar} 20%, transparent)` }, { themeKey: 'shadowBrandLg', name: 'lg', fallback: `color-mix(in srgb, ${brandMainVar} 25%, transparent)` } ] },
    { prefix: 'radius', source: shape, keys: [ { themeKey: 'radiusXs', name: 'xs', fallback: '0.125rem' }, { themeKey: 'radiusSm', name: 'sm', fallback: '0.25rem' }, { themeKey: 'radius', name: 'md', fallback: '0.5rem' }, { themeKey: 'radiusLg', name: 'lg', fallback: '0.75rem' }, { themeKey: 'radiusXl', name: 'xl', fallback: '1rem' }, { themeKey: 'radiusFull', name: 'full', fallback: '9999px' } ] },
    { prefix: 'bg', source: b.surface, keys: [ { themeKey: 'background', name: 'primary', fallback: 'var(--surface-bg)'},{ themeKey: 'card', name: 'secondary', fallback: 'var(--surface-card)'},{ themeKey: 'muted', name: 'muted', fallback: 'var(--surface-muted)'},{ themeKey: 'popover', name: 'popover', fallback: 'var(--surface-popover)'},{ themeKey: 'brandSubtle', name: 'brand-subtle', fallback: `color-mix(in srgb, ${brandMainVar} 10%, transparent)`} ] },
    { prefix: 'text', source: b.surface, keys: [ { themeKey: 'on', name: 'primary', fallback: 'var(--surface-on)' }, { themeKey: 'mutedForeground', name: 'secondary', fallback: 'var(--surface-muted-fg)' }, { themeKey: 'textMuted', name: 'muted', fallback: 'var(--surface-muted-fg)' } ] },
    { prefix: 'space', source: spacing, keys: [ { themeKey: 'space1', name: 'xs', fallback: '0.25rem' }, { themeKey: 'space2', name: 'sm', fallback: '0.5rem' }, { themeKey: 'space4', name: 'md', fallback: '1rem' }, { themeKey: 'space5', name: 'lg', fallback: '1.5rem' }, { themeKey: 'space6', name: 'xl', fallback: '2rem' }, { themeKey: 'space8', name: '2xl', fallback: '3rem' } ] },
    { prefix: 'padding', source: b.spacing ?? {}, keys: [ { themeKey: 'paddingInput', name: 'input', fallback: '0.75rem 1rem'}, { themeKey: 'paddingButton', name: 'button', fallback: '0.75rem 1.5rem'}, { themeKey: 'paddingCard', name: 'card', fallback: '1.25rem'}, { themeKey: 'paddingCompact', name: 'compact', fallback: '0.5rem 0.75rem'} ] },
    { prefix: 'font-weight', source: typography, keys: [ { themeKey: 'weightNormal', name: 'normal', fallback: '400'}, { themeKey: 'weightMedium', name: 'medium', fallback: '500'}, { themeKey: 'weightSemibold', name: 'semibold', fallback: '600'}, { themeKey: 'weightBold', name: 'bold', fallback: '700'} ] },
    { prefix: 'font-family', source: typography, keys: [ { themeKey: 'fontSans', name: 'sans', fallback: 'system-ui, sans-serif'}, { themeKey: 'fontDisplay', name: 'display', fallback: typography.fontSans ?? 'system-ui, sans-serif'}, { themeKey: 'fontMono', name: 'mono', fallback: 'ui-monospace, monospace'} ] },
    { prefix: 'font-size', source: typography, keys: [ { themeKey: 'fontSizeXs', name: 'xs', fallback: '0.75rem'}, { themeKey: 'fontSizeSm', name: 'sm', fallback: '0.875rem'}, { themeKey: 'fontSizeBase', name: 'base', fallback: '1rem'}, { themeKey: 'fontSizeLg', name: 'lg', fallback: '1.125rem'}, { themeKey: 'fontSizeXl', name: 'xl', fallback: '1.25rem'} ] },
    { prefix: '', source: typography, keys: [ { themeKey: 'leading', name: 'line-height', fallback: '1.5'}, { themeKey: 'tracking', name: 'letter-spacing', fallback: '0'} ] },
    { prefix: 'motion', source: motion, keys: [ { themeKey: 'motionFast', name: 'fast', fallback: '120ms' }, { themeKey: 'motionStandard', name: 'standard', fallback: '240ms' }, { themeKey: 'motionSlow', name: 'slow', fallback: '360ms' }, { themeKey: 'ease', name: 'ease', fallback: 'cubic-bezier(.4,0,.2,1)' }, { themeKey: 'easeIn', name: 'ease-in', fallback: 'cubic-bezier(.4,0,1,1)' }, { themeKey: 'easeOut', name: 'ease-out', fallback: 'cubic-bezier(0,0,.2,1)' } ] },
    { prefix: 'gradient', source: gradientConfig, keys: [ { themeKey: 'from', name: 'from', fallback: brandMainVar }, { themeKey: 'to', name: 'to', fallback: `color-mix(in srgb, ${brandSecondaryVar} 100%, black 0%)` }, { themeKey: 'accent', name: 'accent', fallback: `color-mix(in srgb, ${brandMainVar} 110%, white 10%)` } ] },
  ];

  const designTokens = tokenGroups.reduce<Record<string, string>>((tokens, group) => {
    group.keys.forEach(({ themeKey, name, fallback }) => {
      const varName = group.prefix ? `${group.prefix}-${name}` : name;
      const rawValue = group.source?.[themeKey];
      const resolvedValue = String(rawValue ?? fallback);
      
      // Use processValueForVar to ensure the value is mapped to a brandColor var if applicable
      tokens[varName] = processValueForVar(resolvedValue);
    });
    return tokens;
  }, {} as Record<string, string>);
  
  designTokens['border-color-brand'] = brandMainVar;
  designTokens['text-brand'] = brandMainVar;
  designTokens['text-on-brand'] = `var(--brand-on)`;
  designTokens['bg-brand'] = brandMainVar;
  designTokens['bg-transparent'] = 'transparent';

  // Ensure direct space-N variables are available if defined in theme's spacing
  // and potentially used as var(--space-N) in the theme definitions.
  if (b.spacing) {
    for (const key in b.spacing) {
      // Check if it's a direct space key like 'space1', 'space2', etc.,
      // and not a padding key like 'paddingInput'.
      if (key.match(/^space\d+$/)) {
        // const directVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase(); // OLD: Would make 'space1' into 'space1'
        let directVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase(); // Start with base conversion
        if (key.match(/^space\d+$/)) { // Specifically target keys like 'space1', 'space12'
            directVarName = key.replace(/(\d+)$/, '-$1').toLowerCase(); // Converts 'space1' to 'space-1', 'space12' to 'space-12'
        }

        const directValue = String(b.spacing[key as keyof typeof b.spacing]);

        let semanticAliasKey: string | undefined = undefined;
        // Check if this space key (e.g., space1) has a semantic alias (e.g., space-xs)
        // defined in the tokenGroups.
        for (const group of tokenGroups) {
            if (group.prefix === 'space') {
                const foundKey = group.keys.find(k => k.themeKey === key);
                if (foundKey) {
                    semanticAliasKey = `${group.prefix}-${foundKey.name}`; // e.g. space-xs
                    break;
                }
            }
        }

        if (semanticAliasKey && designTokens[semanticAliasKey]) {
            // If spaceN has a semantic alias (like space1 -> space-xs),
            // make --space-n an alias to var(--space-xs).
            // This ensures var(--space-1) and var(--space-xs) both work and resolve to the same value.
            if (directVarName !== semanticAliasKey) { // Avoid self-reference like --space-xs
                 designTokens[directVarName] = `var(--${semanticAliasKey})`;
            }
        } else {
            // If spaceN (like space3) has no semantic alias from tokenGroups,
            // define --space-n directly with its value.
            designTokens[directVarName] = processValueForVar(directValue);
        }
      }
    }
  }

  // Ensure var(--border-default-width) used in themes resolves correctly.
  // It will alias to var(--border-width-default) which is generated by tokenGroups.
  if (designTokens['border-width-default'] && !designTokens['border-default-width']) {
    designTokens['border-default-width'] = `var(--border-width-default)`;
  }

  // NEW: Ensure var(--border-default-color) used in themes resolves correctly.
  // It will alias to var(--border-color-default) which is generated by tokenGroups.
  // THIS ALIAS IS NOW REDUNDANT due to the tokenGroup change for border colors
  // if (designTokens['border-color-default'] && !designTokens['border-default-color']) {
  //   designTokens['border-default-color'] = `var(--border-color-default)`;
  // }
  // Corrected: the generated name is now --border-default-color, so this alias is not needed.
  // The alias for --border-default-width is still useful if themes use that exact name.

  Object.entries({ ...foundationTokens, ...designTokens }).forEach(
    ([key, value]) => {
      cssVars[`--${key}`] = String(value);
    }
  );

  const standardTokens = {
    background: "var(--surface-bg)",
    foreground: "var(--surface-on)",
    card: "var(--surface-card)",
    "card-foreground": "var(--surface-on)",
    popover: "var(--surface-popover)",
    "popover-foreground": "var(--surface-on)",
    primary: brandMainVar,
    "primary-foreground": `var(--brand-on)`,
    secondary: brandSecondaryVar,
    "secondary-foreground": "var(--surface-on)",
    muted: "var(--surface-muted)",
    "muted-foreground": "var(--surface-muted-fg)",
    accent: "var(--surface-popover)",
    "accent-foreground": "var(--surface-on)",
    destructive: "var(--semantic-destructive)",
    "destructive-foreground": "#FFFFFF",
    success: "var(--semantic-success)",
    "success-foreground": `var(--brand-on)`,
    warning: "var(--semantic-warning)",
    "warning-foreground": "var(--surface-on)",
    info: "var(--semantic-info)",
    "info-foreground": "#FFFFFF",
    input: "var(--bg-primary)",
    ring: brandMainVar,
    "border-input": "var(--border-color-default)",
    "chart-1": brandMainVar,
    "chart-2": "var(--semantic-success)",
    "chart-3": "var(--semantic-info)",
    "chart-4": "var(--semantic-warning)",
    "chart-5": "var(--semantic-destructive)",
  };

  Object.entries(standardTokens).forEach(([key, value]) => {
    cssVars[`--${key}`] = value;
    if (key === "destructive" || key === "success" || key === "warning" || key === "info") {
      let colorName = key;
      if (key === "destructive") colorName = "red";
      else if (key === "success") colorName = "green";
      else if (key === "warning") colorName = "yellow";
      else if (key === "info") colorName = "blue";

      const brandSpecificSemanticVar = `--brand-${b.id}-${colorName}`;
      if (!cssVars[brandSpecificSemanticVar] && value.startsWith('var(')) { 
          cssVars[brandSpecificSemanticVar] = value; // Alias to the semantic var if not directly from brandColors
      }
      const brandSpecificSemanticFgVar = `--brand-${b.id}-${colorName}-foreground`;
       if (standardTokens[`${key}-foreground`] && !cssVars[brandSpecificSemanticFgVar]) {
         cssVars[brandSpecificSemanticFgVar] = `var(--${key}-foreground)`;
      }
    }
  });

  // Function to add component-specific CSS variables
function addSmartComponentOverrides(
    cssVarsMap: Record<string, string>,
    brandDef: BrandDefinition
  ) {
    if (!brandDef.componentStyles) return;

    // componentKey: 'button', 'nav', 'card', etc.
    for (const componentKey in brandDef.componentStyles) {
      const componentLevelStyles = (brandDef.componentStyles as any)[componentKey]; // e.g., the 'button' object or 'nav' object

      if (typeof componentLevelStyles === 'object' && componentLevelStyles !== null) {
        // styleKey:
        // For 'button': 'primary', 'secondary', ..., 'fontFamily', 'fontSize'
        // For 'nav': 'background', 'borderColor', ...
        // For 'card': 'background', ..., 'header'
        for (const styleKey in componentLevelStyles) {
          const firstLevelValueOrObject = componentLevelStyles[styleKey]; // e.g., button.primary object, or nav.background value, or card.header object

          // baseCssVarName: --button-primary, --nav-background, --card-header
          const baseCssVarName = `--${componentKey.replace(/([A-Z])/g, "-$1").toLowerCase()}-${styleKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

          if (typeof firstLevelValueOrObject === 'object' && firstLevelValueOrObject !== null) {
            // This means firstLevelValueOrObject is something like button.primary object or card.header object
            // It's NOT a direct style value yet.
            // stateOrPropertyKey:
            // For button.primary: 'default', 'hover', ...
            // For card.header: 'padding', 'titleColor', ...
            for (const stateOrPropertyKey in firstLevelValueOrObject) {
              const secondLevelValueOrObject = firstLevelValueOrObject[stateOrPropertyKey]; // e.g., button.primary.default object or card.header.padding value

              // stateOrPropCssVarName: --button-primary-default, --card-header-padding
              const stateOrPropCssVarName = `${baseCssVarName}-${stateOrPropertyKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

              if (typeof secondLevelValueOrObject === 'object' && secondLevelValueOrObject !== null) {
                // This means secondLevelValueOrObject is a style object, e.g., button.primary.default object
                // propertyKey: 'background', 'color', ... for button.primary.default
                for (const propertyKey in secondLevelValueOrObject) {
                  const actualStyleValue = secondLevelValueOrObject[propertyKey]; // e.g., button.primary.default.background value

                  // finalCssVarName: --button-primary-default-background
                  const finalCssVarName = `${stateOrPropCssVarName}-${propertyKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
                  const processedValue = processValueForVar(actualStyleValue);

                  // Standard assignment logic, ensuring not to overwrite a var() with a non-var() if already set correctly
                  if (cssVarsMap[finalCssVarName] === undefined || !cssVarsMap[finalCssVarName].startsWith('var(') || processedValue.startsWith('var(') ) {
                    cssVarsMap[finalCssVarName] = processedValue;
                  }
                }
              } else {
                // secondLevelValueOrObject is a direct style value
                // e.g., card.header.padding value, or for button.fontFamily (where styleKey='fontFamily', firstLevelValueOrObject IS the value)
                // In this case, stateOrPropCssVarName is the final variable name for properties of an object like card.header
                const processedValue = processValueForVar(secondLevelValueOrObject);
                 if (cssVarsMap[stateOrPropCssVarName] === undefined || !cssVarsMap[stateOrPropCssVarName].startsWith('var(') || processedValue.startsWith('var(') ) {
                   cssVarsMap[stateOrPropCssVarName] = processedValue;
                }
              }
            }
          } else {
            // firstLevelValueOrObject is a direct style value
            // e.g., nav.background value, or button.fontFamily (if componentKey was button, and styleKey was fontFamily)
            // In this case, baseCssVarName is the final variable name.
            const processedValue = processValueForVar(firstLevelValueOrObject);
            if (cssVarsMap[baseCssVarName] === undefined || !cssVarsMap[baseCssVarName].startsWith('var(') || processedValue.startsWith('var(') ) {
               cssVarsMap[baseCssVarName] = processedValue;
            }
          }
        }
      }
    }
  }

  addSmartComponentOverrides(cssVars, b); // Call addSmartComponentOverrides after initial processing

  // Generate CSS variables for additionalSurfaceSets
  if (b.additionalSurfaceSets) {
    Object.entries(b.additionalSurfaceSets).forEach(([setName, surfaceSet]) => {
      const prefix = `--surface-set-${setName.toLowerCase().replace(/\s+/g, '-')}`;

      // Map SurfaceSet properties to their CSS variable counterparts
      const surfaceSetVars: { [K in keyof SurfaceSet]?: string } = {
        background: `${prefix}-background`,
        card: `${prefix}-card`,
        popover: `${prefix}-popover`,
        on: `${prefix}-on`,
        muted: `${prefix}-muted`,
        mutedForeground: `${prefix}-muted-foreground`,
        brandSubtle: `${prefix}-brand-subtle`,
        textMuted: `${prefix}-text-muted`,
      };

      (Object.keys(surfaceSet) as Array<keyof SurfaceSet>).forEach((key) => {
        const value = surfaceSet[key];
        if (surfaceSetVars[key] && value) {
          const processedValue = processValueForVar(String(value));
          // Ensure not to overwrite a var() with a non-var() if already set correctly by allDefinedColorVarsMap
          if (cssVars[surfaceSetVars[key]!] === undefined || 
              !cssVars[surfaceSetVars[key]!].startsWith('var(') || 
              processedValue.startsWith('var(') ) {
            cssVars[surfaceSetVars[key]!] = processedValue;
          }
        }
      });
    });
  }

  // Aliases for button.tsx generic variables
  const buttonVarMappings: Record<string, string | undefined> = {
    '--button-bg': cssVars['--button-primary-default-background'] || cssVars['--brand-main'],
    '--button-foreground': cssVars['--button-primary-default-color'] || cssVars['--brand-on'],
    '--button-shadow': cssVars['--button-primary-default-box-shadow'] || cssVars['--shadow-sm'],
    '--button-hover-bg': cssVars['--button-primary-hover-background'] || cssVars['--brand-secondary'],
    '--button-hover-foreground': cssVars['--button-primary-hover-color'] || cssVars['--brand-on'],
    // Destructive
    '--button-destructive-bg': cssVars['--button-destructive-default-background'] || cssVars['--semantic-destructive'],
    '--button-destructive-foreground': cssVars['--button-destructive-default-color'] || cssVars['--background'],
    '--button-destructive-shadow': cssVars['--button-destructive-default-box-shadow'] || cssVars['--shadow-xs'],
    '--button-destructive-hover-bg': cssVars['--button-destructive-hover-background'] || cssVars['--semantic-destructive'],
    '--button-destructive-hover-foreground': cssVars['--button-destructive-hover-color'] || cssVars['--background'],
    // Outline
    '--button-outline-border-width': cssVars['--button-outline-default-border-width'] || cssVars['--border-width-default'],
    '--button-outline-border-style': cssVars['--button-outline-default-border-style'] || cssVars['--border-style-default'],
    '--button-outline-border-color': cssVars['--button-outline-default-border-color'] || cssVars['--border-color-default'],
    '--button-outline-bg': cssVars['--button-outline-default-background'] || cssVars['--surface-card'],
    '--button-outline-text': cssVars['--button-outline-default-color'] || cssVars['--border-color-default'],
    '--button-outline-shadow': cssVars['--button-outline-default-box-shadow'] || cssVars['--shadow-xs'],
    '--button-outline-hover-bg': cssVars['--button-outline-hover-background'] || cssVars['--surface-muted'],
    '--button-outline-hover-text': cssVars['--button-outline-hover-color'] || cssVars['--surface-on'],
    // Secondary
    '--button-secondary-bg': cssVars['--button-secondary-default-background'] || cssVars['--surface-card'],
    '--button-secondary-foreground': cssVars['--button-secondary-default-color'] || cssVars['--surface-on'],
    '--button-secondary-shadow': cssVars['--button-secondary-default-box-shadow'] || cssVars['--shadow-xs'],
    '--button-secondary-hover-bg': cssVars['--button-secondary-hover-background'] || cssVars['--surface-muted'],
    '--button-secondary-hover-foreground': cssVars['--button-secondary-hover-color'] || cssVars['--surface-on'],
    // Ghost
    '--button-ghost-text': cssVars['--button-ghost-default-color'] || cssVars['--surface-on'],
    '--button-ghost-hover-bg': cssVars['--button-ghost-hover-background'] || cssVars['--surface-muted'],
    '--button-ghost-hover-text': cssVars['--button-ghost-hover-color'] || cssVars['--surface-on'],
    // Link
    '--button-link-text': cssVars['--button-link-default-color'] || cssVars['--brand-main'],
    '--button-link-hover-text': cssVars['--button-link-hover-color'] || cssVars['--brand-main'],
  };

  for (const [genericVar, specificVar] of Object.entries(buttonVarMappings)) {
    if (specificVar) {
      cssVars[genericVar] = specificVar;
    } 
    // If specificVar is undefined (meaning the theme didn't have that exact component style), 
    // it implies we want to rely on the fallback defined within button.tsx or a very basic default.
    // However, the goal is to make themes drive these, so ideally specificVar should always resolve.
  }

  return cssVars;
}
