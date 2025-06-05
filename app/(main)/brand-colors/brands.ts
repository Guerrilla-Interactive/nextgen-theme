import { BrandDefinition, SurfaceSet, ColorFormat } from "./brands-types";
import { APPLE_THEME } from "./themes/apple.theme";
import { GOOGLE_THEME } from "./themes/google.theme";
import { AIRBNB_THEME } from "./themes/airbnb.theme";
import { NINTENDO_THEME } from "./themes/nintendo.theme";
import { RAZER_THEME } from "./themes/razer.theme";
import { GUCCI_THEME } from "./themes/gucci.theme";
import { TWITCH_THEME } from "./themes/twitch.theme";
import { MCDONALDS_THEME } from "./themes/mcdonalds.theme";
import { IKEA_THEME } from "./themes/ikea.theme";
import { hexToRgbString, parseColorString, rgbToCmykString, rgbToHsl, srgbToOklch } from "@/features/unorganized-utils/color-stuff";



export const BRANDS: BrandDefinition[] = [
    APPLE_THEME,
    // GUCCI_THEME,
    

    
  { // Nextgen Theme - Modified to follow Razer aesthetics, now Orange primary
    name: "Nextgen",
    id: "nextgen",
    description:
      "Futuristic and bold, with a fiery orange-red core and modern typography.", // Updated description
    brandColors: [
      {
        name: "Nextgen Orange",
        color: "#FF3600",   
        variableName: "brand-orange-primary", 
        shades: { 
          "50": { color: "color-mix(in srgb, var(--brand-orange-primary) 5%, white);", variableName: "brand-orange-50" }, // Example placeholder, makeCssVars derives
          "100": { color: "color-mix(in srgb, var(--brand-orange-primary) 10%, white);", variableName: "brand-orange-100" },
          "200": { color: "color-mix(in srgb, var(--brand-orange-primary) 20%, white);", variableName: "brand-orange-200" },
          "300": { color: "color-mix(in srgb, var(--brand-orange-primary) 30%, white);", variableName: "brand-orange-300" },
          "400": { color: "color-mix(in srgb, var(--brand-orange-primary) 40%, white);", variableName: "brand-orange-400" },
          "500": { color: "var(--brand-orange-primary)", variableName: "brand-orange-500" },
          "600": { color: "color-mix(in srgb, var(--brand-orange-primary) 60%, white);", variableName: "brand-orange-600" },
          "700": { color: "color-mix(in srgb, var(--brand-orange-primary) 70%, white);", variableName: "brand-orange-700" },
          "800": { color: "color-mix(in srgb, var(--brand-orange-primary) 80%, white);", variableName: "brand-orange-800" },
          "900": { color: "color-mix(in srgb, var(--brand-orange-primary) 90%, white);", variableName: "brand-orange-900" }
        }
      },
      { // Nextgen Dark - aligns with Razer's secondary
        name: "Nextgen Dark",
        color: "#1A1A1A",
        variableName: "brand-dark-primary",
        shades: { // Reference Razer's dark shades
          "50": { color: "color-mix(in srgb, var(--brand-dark-primary) 5%, white);", variableName: "brand-dark-50" },
          "100": { color: "color-mix(in srgb, var(--brand-dark-primary) 10%, white);", variableName: "brand-dark-100" },
          "200": { color: "color-mix(in srgb, var(--brand-dark-primary) 20%, white);", variableName: "brand-dark-200" },
          "300": { color: "color-mix(in srgb, var(--brand-dark-primary) 30%, white);", variableName: "brand-dark-300" },
          "400": { color: "color-mix(in srgb, var(--brand-dark-primary) 40%, white);", variableName: "brand-dark-400" },
          "500": { color: "var(--brand-dark-primary)", variableName: "brand-dark-500" },
          "600": { color: "color-mix(in srgb, var(--brand-dark-primary) 60%, white);", variableName: "brand-dark-600" },
          "700": { color: "color-mix(in srgb, var(--brand-dark-primary) 70%, white);", variableName: "brand-dark-700" },
          "800": { color: "color-mix(in srgb, var(--brand-dark-primary) 80%, white);", variableName: "brand-dark-800" },
          "900": { color: "color-mix(in srgb, var(--brand-dark-primary) 90%, white);", variableName: "brand-dark-900" },
        }
      },
       {
        name: "Nextgen Gray", // Was Razer Gray in inspiration
        color: "#808080", // Razer's gray-500
        variableName: "brand-gray-neutral", // Using gray naming
        shades: { // Reference Razer's gray shades
          "50": { color: "color-mix(in srgb, var(--brand-gray-neutral) 5%, white);", variableName: "brand-gray-50" },
          "100": { color: "color-mix(in srgb, var(--brand-gray-neutral) 10%, white);", variableName: "brand-gray-100" },
          "200": { color: "color-mix(in srgb, var(--brand-gray-neutral) 20%, white);", variableName: "brand-gray-200" },
          "300": { color: "color-mix(in srgb, var(--brand-gray-neutral) 30%, white);", variableName: "brand-gray-300" },
          "400": { color: "color-mix(in srgb, var(--brand-gray-neutral) 40%, white);", variableName: "brand-gray-400" },
          "500": { color: "var(--brand-gray-neutral)", variableName: "brand-gray-500" },
          "600": { color: "color-mix(in srgb, var(--brand-gray-neutral) 60%, white);", variableName: "brand-gray-600" },
          "700": { color: "color-mix(in srgb, var(--brand-gray-neutral) 70%, white);", variableName: "brand-gray-700" },
          "800": { color: "color-mix(in srgb, var(--brand-gray-neutral) 80%, white);", variableName: "brand-gray-800" },
          "900": { color: "color-mix(in srgb, var(--brand-gray-neutral) 90%, white);", variableName: "brand-gray-900" },
        }
      },
      { // Kept Red for destructive, but distinct from primary brand color
       name: "Nextgen Red Destructive",
       color: "#D32F2F", // A common destructive red
       variableName: "brand-red-destructive",
       shades: {
        "50": { color: "color-mix(in srgb, var(--brand-red-destructive)  5%, white);", variableName: "brand-red-destructive-50" },
        "100": { color: "color-mix(in srgb, var(--brand-red-destructive) 10%, white);", variableName: "brand-red-destructive-100" },
        "200": { color: "color-mix(in srgb, var(--brand-red-destructive) 20%, white);", variableName: "brand-red-destructive-200" },
        "300": { color: "color-mix(in srgb, var(--brand-red-destructive) 30%, white);", variableName: "brand-red-destructive-300" },
        "400": { color: "color-mix(in srgb, var(--brand-red-destructive) 40%, white);", variableName: "brand-red-destructive-400" },
        "500": { color: "var(--brand-red-destructive)", variableName: "brand-red-destructive-500" },
        "600": { color: "color-mix(in srgb, var(--brand-red-destructive) 60%, white);", variableName: "brand-red-destructive-600" }, // mix with black for darker
        "700": { color: "color-mix(in srgb, var(--brand-red-destructive) 70%, white);", variableName: "brand-red-destructive-700" },
        "800": { color: "color-mix(in srgb, var(--brand-red-destructive) 80%, white);", variableName: "brand-red-destructive-800" },
        "900": { color: "color-mix(in srgb, var(--brand-red-destructive) 90%, white);", variableName: "brand-red-destructive-900" },
       }
      },
    ],
    brand: {
      main: {
        name: "Nextgen Orange (Primary)",
        hex: "#FF3600", // Orange
        rgb: hexToRgbString("#FF3600"),
        cmyk: rgbToCmykString(hexToRgbString("#FF3600")),
        variableName: "brand-orange-primary", // Changed
      } as ColorFormat,
      on: "#FFFFFF", // White text on Orange
      secondary: {
        name: "Nextgen Dark (Secondary)",
        hex: "#1A1A1A", // Razer's Dark
        rgb: hexToRgbString("#1A1A1A"),
        cmyk: rgbToCmykString(hexToRgbString("#1A1A1A")),
        variableName: "brand-dark-primary",
      } as ColorFormat,
    },
    supportPalette: [
      { name: "Nextgen Orange (Success)", hex: "#FF3600", rgb: hexToRgbString("#FF3600"), cmyk: rgbToCmykString(hexToRgbString("#FF3600")), variableName: "semantic-success" },
      { name: "Nextgen Red (Destructive)", hex: "#D32F2F", rgb: hexToRgbString("#D32F2F"), cmyk: rgbToCmykString(hexToRgbString("#D32F2F")), variableName: "semantic-destructive" },
      { name: "Nextgen Amber (Warning)", hex: "#FFA000", rgb: hexToRgbString("#FFA000"), cmyk: rgbToCmykString(hexToRgbString("#FFA000")), variableName: "semantic-warning" }, // Kept Amber
      { name: "Nextgen Blue (Info)", hex: "#03A9F4", rgb: hexToRgbString("#03A9F4"), cmyk: rgbToCmykString(hexToRgbString("#03A9F4")), variableName: "semantic-info" },       // Kept Blue
    ],
    surface: {
      background: "#101010",
      card: "#1C1C1C",
      popover: "#282828",
      on: "#FFFFFF",
      muted: "#3A3A3A",
      mutedForeground: "#A0A0A0",
      brandSubtle: "rgba(255, 54, 0, 0.07)", // Orange subtle
      textMuted: "#777777",
    },
    semantic: {
      destructive: "#D32F2F",
      success: "#FF3600", // Orange for success
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
    typography: { // Prioritize Titillium Web, Syne as fallback
      fontDisplay: "var(--font-syne), \'Titillium Web\', sans-serif",
      fontSans: "var(--font-inter), \'Titillium Web\', sans-serif",
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
    elevation: { // Shadows with orange glow
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
    gradient: { // Orange gradient
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
      headingMainText: "NEXT GENERATION INTERFACE", // Reverted to original
      headingSubtitleText: "Performance. Power. Precision.", // Reverted
      headingSubtitleClassName: "text-[var(--brand-main)] font-normal tracking-wider uppercase text-sm",
      navTitle: "NEXTGEN",
    },
    componentStyles: {
        nav: {
            background: "rgba(16, 16, 16, 0.85)",
            borderColor: "rgba(255, 54, 0, 0.2)", // Orange border
            borderWidth: "0 0 1px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            color: "#E0E0E0",
        },
        hero: {
            background: "#0A0A0A",
            backgroundImage: "radial-gradient(circle, rgba(255, 54, 0, 0.05) 0%, transparent 60%)", // Orange radial
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
                boxShadowActive: "0 0 10px rgba(255, 54, 0, 0.4)", // Orange shadow
                fontWeight: "var(--font-weight-medium)",
                padding: "0.5rem 1rem",
            }
        },
        overviewCard: {
            background: "var(--surface-card)",
            borderColor: "var(--border-color-subtle)",
            borderWidth: "1px",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            overlayImage: "linear-gradient(145deg, rgba(255, 54, 0, 0.03) 0%, rgba(0,0,0,0) 40%)", // Orange overlay
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
        },
        tokenGroupCard: {
            background: "var(--surface-card)",
            backgroundImage: "linear-gradient(145deg, rgba(255, 54, 0, 0.04) 0%, rgba(0,0,0,0) 35%)", // Orange bg image
            borderWidth: "var(--border-width-default)",
            borderStyle: "var(--border-style-default)",
            borderColor: "var(--border-color-subtle)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(255, 54, 0, 0.12)", // Orange shadow
            padding: "var(--padding-card)",
        },
        button: {
            primary: {
                default: {
                    background: "var(--brand-main)",
                    color: "var(--brand-on)",
                    borderRadius: "var(--radius-sm, 4px)",
                    boxShadow: "0 1px 3px rgba(255, 54, 0, 0.2), inset 0 -1px 0px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,54,0,0.3)", // Orange shadow
                    fontWeight: "var(--font-weight-bold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.075em",
                    padding: "0.6rem 1.3rem",
                },
                hover: {
                    background: "color-mix(in srgb, var(--brand-main) 95%, #fff 15%)",
                    boxShadow: "0 0 15px 3px rgba(255, 54, 0, 0.4), 0 0 25px 6px rgba(255, 54, 0, 0.25), inset 0 0 1.5px 1px rgba(255,150,100,0.4)", // Orange glow
                    transform: "translateY(-1.5px) scale(1.02)",
                },
                active: {
                    background: "color-mix(in srgb, var(--brand-main) 85%, #000 20%)",
                    transform: "translateY(0px) scale(1)",
                    boxShadow: "0 1px 2px rgba(255, 54, 0, 0.15), inset 0 1px 1.5px rgba(0,0,0,0.3), inset 0 0 8px rgba(150,30,0,0.3)", // Orange shadow
                },
                focus: {
                    boxShadow: "0 0 0 3px rgba(255,54,0,0.5), 0 0 10px 2px rgba(255,54,0,0.35), 0 1px 3px rgba(255, 54, 0, 0.2)", // Orange focus
                }
            },
            secondary: { // Kept Razer's secondary button style as it's fairly neutral
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
                    background: "color-mix(in srgb, var(--surface-muted, #3A3A3A) 90%, var(--brand-main) 8%)", // Use brand-main for hover accent
                    borderColor: "var(--brand-main)",
                    color: "var(--brand-main)",
                    boxShadow: "0 0 8px 1px color-mix(in srgb, var(--brand-main) 20%, transparent)",
                },
                active: {
                    background: "color-mix(in srgb, var(--surface-muted, #3A3A3A) 80%, var(--brand-main) 10%)",
                    borderColor: "color-mix(in srgb, var(--brand-main) 80%, #000 20%)",
                },
                focus: {
                    borderColor: "var(--brand-main)",
                    boxShadow: "0 0 0 2.5px color-mix(in srgb, var(--brand-main) 40%, transparent)",
                }
            },

            ghost: {
                default: {
                  
                    background: "var(--brand-main)",
                    borderColor: "var(--brand-main)",
                    color: "var(--brand-main)",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    textTransform: "uppercase",
                    borderWidth: "1px",
                    padding: "calc(0.6rem - 1px) calc(1.3rem - 1px)",
                },
                
            },
            outline: { // Orange outline
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
                background: "rgba(255, 54, 0, 0.07)", // Orange subtle bg
                color: "color-mix(in srgb, var(--brand-main) 90%, #fff 10%)",
                borderColor: "color-mix(in srgb, var(--brand-main) 80%, #fff 20%)",
               },
               active: {
                background: "rgba(255, 54, 0, 0.12)", 
               },
               focus: {
                boxShadow: "0 0 0 2.5px rgba(255, 54, 0, 0.35)", // Orange focus
                borderColor: "color-mix(in srgb, var(--brand-main) 80%, #fff 20%)",
               }
            },
            destructive: { // Destructive uses its own semantic color, not brand-main
                default: {
                    background: "var(--semantic-destructive)",
                    color: "var(--brand-on)", // White on red
                    borderColor: "var(--semantic-destructive)",
                    borderWidth: "1px",
                    borderRadius: "var(--radius-sm, 4px)",
                    boxShadow: "0 2px 5px rgba(211, 47, 47, 0.2), inset 0 -1px 1px rgba(0,0,0,0.25)", // Red shadow
                    fontWeight: "var(--font-weight-bold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.075em",
                    padding: "0.6rem 1.3rem",
                },
                hover: {
                    background: "color-mix(in srgb, var(--semantic-destructive) 90%, #fff 10%)",
                    boxShadow: "0 0 15px 3px rgba(211, 47, 47, 0.4), 0 0 25px 6px rgba(211, 47, 47, 0.25), inset 0 0 1.5px 1px rgba(255,150,150,0.4)", // Red glow
                },
                active: {
                    background: "color-mix(in srgb, var(--semantic-destructive) 80%, #000 20%)",
                    boxShadow: "0 1px 2px rgba(211, 47, 47, 0.15), inset 0 1px 1.5px rgba(0,0,0,0.3), inset 0 0 8px rgba(150,0,0,0.3)", // Red shadow
                },
                focus: { // Destructive focus should use destructive color
                    boxShadow: "0 0 0 3px rgba(211, 47, 47, 0.5), 0 0 10px 2px rgba(211, 47, 47, 0.35)",
                }
            },
            fontFamily: "var(--font-family-sans)", // From typography
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
                borderColor: "var(--brand-main)", // Orange focus
                boxShadow: "0 0 0 2.5px rgba(255,54,0,0.4), inset 0 1px 2px rgba(0,0,0,0.3)", // Orange focus
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
            boxShadow: "var(--shadow-lg), 0 0 0 0.5px rgba(255, 54, 0, 0.1)", // Orange edge highlight
            padding: "1.3rem",
            header: {
                padding: "1rem 1.3rem 0.75rem",
                titleColor: "var(--brand-main)", // Orange title
                descriptionColor: "var(--surface-muted-fg, #A0A0A0)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
            },
        },
        badge: {
            variantDefault: {
                background: "var(--surface-muted, #3A3A3A)",
                color: "var(--brand-main, #FF3600)", // Orange text
                borderRadius: "var(--radius-sm, 4px)",
                padding: "0.3rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderWidth: "1px",
                borderColor: "rgba(255, 54, 0, 0.2)", // Orange border
            },
            variantDestructive: { // Uses semantic color
                background: "var(--semantic-destructive)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-sm, 4px)",
                padding: "0.3rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
            },
            variantSuccess: { // Uses semantic color (which is now brand-main orange)
                background: "var(--semantic-success)", // Orange
                color: "var(--brand-on)", // White on orange
                borderRadius: "var(--radius-sm, 4px)",
                padding: "0.3rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
            },
            variantWarning: { // Uses semantic color
                background: "var(--semantic-warning)",
                color: "#000000",
                borderRadius: "var(--radius-sm, 4px)",
                padding: "0.3rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
            },
            variantInfo: { // Uses semantic color
                background: "var(--semantic-info)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-sm, 4px)",
                padding: "0.3rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
            },
        },
        tooltip: {
            background: "rgba(10,10,10,0.92)",
            color: "var(---brand-dark-50)", // Changed to direct white for maximum visibility
            fontWeight: "var(--font-weight-medium)", // Added for better legibility
            borderColor: "rgba(255, 54, 0, 0.3)", // Orange border
            borderWidth: "1px",
            borderRadius: "var(--radius-sm, 4px)",
            padding: "0.4rem 0.7rem",
            boxShadow: "var(--shadow-md), 0 0 8px rgba(255, 54, 0, 0.2)", // Orange glow
            fontSize: "0.8rem",
            backdropFilter: "blur(6px)",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
        },
        charts: {
            gridStrokeColor: "rgba(68,68,68,0.5)",
            axisStrokeColor: "#A0A0A0",
            axisTextColor: "#FFFFFF",
            legendTextColor: "#FFFFFF",
            tooltipCursorFill: "rgba(255, 54, 0, 0.1)", // Orange cursor
        },
        loadingIndicator: {
            background: "var(--surface-muted)",
            color: "var(--brand-main)", // Orange
            textColor: "var(--surface-muted-fg)",
        }
    },
    componentShowcase: { // Reverted text to original Nextgen
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
    supplementaryChartColors: ["#FF3600", "#D32F2F", "#FFA000", "#03A9F4", "#AEAEAE"], // Orange first
  },
  
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

// Helper to resolve a value to a CSS variable or a color-mix expression
function resolveCssValue(value: string | undefined, colorMap: Record<string, string>, brandMainVar: string, brandSecondaryVar: string): string {
  if (typeof value !== 'string') return String(value ?? ''); // Fallback for non-string or undefined

  const upperHex = value.toUpperCase();
  if (colorMap[upperHex]) {
    return colorMap[upperHex];
  }

  const rgbaMatch = value.match(/rgba?\(([^,]+),\s*([^,]+),\s*([^,]+)(?:,\s*([^\)]+))?\)/i);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b_color = parseInt(rgbaMatch[3]);
    const alphaString = rgbaMatch[4];
    const alpha = alphaString !== undefined ? parseFloat(alphaString) : 1;

    if (!isNaN(r) && !isNaN(g) && !isNaN(b_color) && !isNaN(alpha)) {
      const tempHex = ("#" + ((1 << 24) + (r << 16) + (g << 8) + b_color).toString(16).slice(1)).toUpperCase();
      if (colorMap[tempHex]) {
        const validAlpha = Math.max(0, Math.min(1, alpha));
        if (validAlpha === 1) {
          return colorMap[tempHex];
        }
        // Use color-mix; transparent will take the remaining percentage
        return `color-mix(in srgb, ${colorMap[tempHex]} ${Math.round(validAlpha * 100)}%, transparent)`;
      }
    }
  }
  // Try to see if it's a mix of brand-main or brand-secondary
  // This is a simple check, more sophisticated might be needed for complex color strings
  if (value.includes(brandMainVar.slice(4,-1)) && value.includes('rgba')) { // check for var name within rgba()
      return `color-mix(in srgb, ${brandMainVar} ${value.includes('0.07') || value.includes('0.05') ? '7' : '10'}%, transparent)`; // Simplified
  }

  return value; // Fallback to original if no mapping found
}

export function makeCssVars(b: BrandDefinition): Record<string, string> {
  const cssVars: Record<string, string> = {};
  const allDefinedColorVarsMap: Record<string, string> = {}; // Stores HEX -> var(--name) for direct hex defs

  // Tier 1: Foundation Tokens
  // 1.1: Brand Colors: Primary definition and derived shades via CSS oklch()
  b.brandColors?.forEach((brandColorGroup) => {
    const groupPrimaryHex = brandColorGroup.color;
    const groupPrimaryVarName = `--${brandColorGroup.variableName}`; // e.g., --brand-orange-primary
    const groupPrimaryOklchCVarName = `${groupPrimaryVarName}-oklch-c`;
    const groupPrimaryOklchHVarName = `${groupPrimaryVarName}-oklch-h`;
    // It's also useful to have the primary L value as a variable if other things might want to reference it
    const groupPrimaryOklchLVarName = `${groupPrimaryVarName}-oklch-l`;

    let oklchOfPrimary: { l: number; c: number; h: number } | null = null;

    // Define the primary color variable with its hex value
    cssVars[groupPrimaryVarName] = groupPrimaryHex;
    allDefinedColorVarsMap[groupPrimaryHex.toUpperCase()] = `var(${groupPrimaryVarName})`;

    const rgbFromPrimary = parseColorString(groupPrimaryHex);
    if (rgbFromPrimary) {
      oklchOfPrimary = srgbToOklch(rgbFromPrimary.r, rgbFromPrimary.g, rgbFromPrimary.b);
    }

    if (oklchOfPrimary) {
      const baseL_oklch = oklchOfPrimary.l;
      const primaryChroma = oklchOfPrimary.c;
      const primaryHue = oklchOfPrimary.h;

      // Define intermediate CSS vars for the primary color's L, C, H components
      cssVars[groupPrimaryOklchLVarName] = baseL_oklch.toFixed(5);
      cssVars[groupPrimaryOklchCVarName] = primaryChroma.toFixed(5);
      cssVars[groupPrimaryOklchHVarName] = primaryHue.toFixed(2);

      const refinedLightnessScale: Record<string, number> = {
        "50": 0.972,
        "100": 0.945,
        "200": 0.875,
        "300": 0.785,
        "400": 0.690,
        "500": baseL_oklch, // Anchor: the L of the primary color itself
        "600": baseL_oklch > 0.4 ? Math.max(0.05, baseL_oklch - 0.10) : Math.max(0.05, baseL_oklch * 0.75),
        "700": baseL_oklch > 0.4 ? Math.max(0.05, baseL_oklch - 0.20) : Math.max(0.05, baseL_oklch * 0.55),
        "800": baseL_oklch > 0.4 ? Math.max(0.05, baseL_oklch - 0.30) : Math.max(0.05, baseL_oklch * 0.35),
        "900": baseL_oklch > 0.4 ? Math.max(0.05, baseL_oklch - 0.40) : Math.max(0.05, baseL_oklch * 0.20),
      };

      for (const shadeKey in brandColorGroup.shades) {
        const shadeInfo = (brandColorGroup.shades as any)[shadeKey];
        if (!shadeInfo || !shadeInfo.variableName) continue;

        const shadeCssVarName = `--${shadeInfo.variableName}`;
        
        if (refinedLightnessScale[shadeKey] !== undefined) {
          const targetL = refinedLightnessScale[shadeKey];
          // Define shade using oklch() CSS function referencing the intermediate C and H vars
          cssVars[shadeCssVarName] = `oklch(${targetL.toFixed(5)} var(${groupPrimaryOklchCVarName}) var(${groupPrimaryOklchHVarName}))`;
        } else {
          // Fallback for shades not in refinedLightnessScale (should not happen if scale is comprehensive)
          // Or if a shade is explicitly defined with a different mechanism (e.g. direct var(--primary))
          if (shadeInfo.color.startsWith('var(')) { // If it's already a variable reference, keep it
            cssVars[shadeCssVarName] = shadeInfo.color;
          } else { // Otherwise, assume it's a hex to be mapped or used directly
            cssVars[shadeCssVarName] = shadeInfo.color; 
            allDefinedColorVarsMap[shadeInfo.color.toUpperCase()] = `var(${shadeCssVarName})`;
          }
        }
      }
    } else {
      // Fallback: If oklchOfPrimary couldn't be determined for the group primary hex,
      // fall back to HSL-derived hexes for shades (or predefined hexes).
      const rgbFromPrimaryForHsl = parseColorString(groupPrimaryHex);
      let primaryHsl: { h: number; s: number; l: number } | null = null;
      if (rgbFromPrimaryForHsl) {
        primaryHsl = rgbToHsl(rgbFromPrimaryForHsl.r, rgbFromPrimaryForHsl.g, rgbFromPrimaryForHsl.b);
      }

      if (primaryHsl) {
          const baseH = primaryHsl.h;
          const baseS = primaryHsl.s;
          const referenceLightnessForScale = primaryHsl.l;
          const fallbackLightnessScale: Record<string, number> = {
            "50": 0.95, "100": 0.90, "200": 0.80, "300": 0.70, "400": 0.60,
            "500": referenceLightnessForScale, 
            "600": Math.max(0, referenceLightnessForScale - 0.12),
            "700": Math.max(0, referenceLightnessForScale - 0.24),
            "800": Math.max(0, referenceLightnessForScale - 0.36),
            "900": Math.max(0, referenceLightnessForScale - 0.48),
          };
          for (const shadeKey in brandColorGroup.shades) {
            const shadeInfo = (brandColorGroup.shades as any)[shadeKey];
            if (!shadeInfo || !shadeInfo.variableName) continue;
            const shadeCssVarName = `--${shadeInfo.variableName}`;
            let derivedHexFallback = shadeInfo.hex; // Use existing hex as ultimate fallback
            if (fallbackLightnessScale[shadeKey] !== undefined && baseH !== undefined && baseS !== undefined) { // Check baseH and baseS also
              const targetL_hsl = fallbackLightnessScale[shadeKey];
              // Make saturation slightly lower for very light/dark shades to avoid harsh colors
              const targetS_hsl = (targetL_hsl > 0.9 || targetL_hsl < 0.1) ? Math.max(0, baseS * 0.85) : baseS;
              // hslToHex was removed, so we just use the predefined hex from shadeInfo.hex
              // derivedHexFallback = hslToHex(baseH, targetS_hsl, Math.min(1, Math.max(0, targetL_hsl)));
            }
            cssVars[shadeCssVarName] = derivedHexFallback;
            allDefinedColorVarsMap[derivedHexFallback.toUpperCase()] = `var(${shadeCssVarName})`;
          }
      } else { // Absolute fallback to predefined hex if even HSL fails
        for (const shadeKey in brandColorGroup.shades) {
            const shadeInfo = (brandColorGroup.shades as any)[shadeKey];
            if (!shadeInfo || !shadeInfo.variableName || !shadeInfo.hex) continue;
            const shadeCssVarName = `--${shadeInfo.variableName}`;
            cssVars[shadeCssVarName] = shadeInfo.hex;
            allDefinedColorVarsMap[shadeInfo.hex.toUpperCase()] = `var(${shadeCssVarName})`;
        }
      }
    }
  });
  
  // Define --brand-main
  let brandMainVar = "";
  const firstBrandColor = b.brandColors?.[0];
  if (firstBrandColor) {
      // --brand-main should now point to the group's primary variable name, e.g., var(--brand-orange-primary)
      brandMainVar = `var(--${firstBrandColor.variableName})`; 
    } else {
      const mainVarName = `--brand-main-fallback`;
      cssVars[mainVarName] = b.brand.main.hex;
      allDefinedColorVarsMap[b.brand.main.hex.toUpperCase()] = `var(${mainVarName})`;
      brandMainVar = `var(${mainVarName})`;
  }
  cssVars['--brand-main'] = brandMainVar;

  // Define --brand-secondary
  let brandSecondaryVar = "";
  if (b.brand.secondary) {
    const secondaryHexUpper = b.brand.secondary.hex.toUpperCase();
        if (allDefinedColorVarsMap[secondaryHexUpper]) {
            brandSecondaryVar = allDefinedColorVarsMap[secondaryHexUpper];
        } else {
      // Check if a brandColor group matches the secondary variableName
      const matchingBrandColorSec = b.brandColors?.find(bc => bc.variableName === b.brand.secondary.variableName);
      if (matchingBrandColorSec) {
          const secShadeVarNamePart = matchingBrandColorSec.shades["500"]?.variableName || matchingBrandColorSec.variableName;
          brandSecondaryVar = `var(--${secShadeVarNamePart})`;
      } else {
          const secVarName = `--brand-secondary-fallback`;
          cssVars[secVarName] = b.brand.secondary.hex;
          allDefinedColorVarsMap[secondaryHexUpper] = `var(${secVarName})`;
          brandSecondaryVar = `var(${secVarName})`;
      }
    }
  } else { // Fallback if no brand.secondary, try a darker shade of main or main itself
     const primary700Shade = b.brandColors?.[0]?.shades?.["700"];
      if (primary700Shade) {
        brandSecondaryVar = `var(--${primary700Shade.variableName})`;
      } else {
      brandSecondaryVar = brandMainVar; // Default to main if no 700 shade
    }
  }
  cssVars['--brand-secondary'] = brandSecondaryVar;
  cssVars['--brand-on'] = b.brand.on; // Typically #FFFFFF or #000000

  // 1.2: Base Typography, Spacing, Radii, Motion, Elevation
  const typography = { ...DEFAULT_TYPOGRAPHY, ...(b.typography ?? {}) };
  const spacing = { ...DEFAULT_SPACING, ...(b.spacing ?? {}) };
  const shape = { ...DEFAULT_SHAPE, ...(b.shape ?? {}) };
  const motion = { ...DEFAULT_MOTION, ...(b.motion ?? {}) };
  const elevation = { ...DEFAULT_ELEVATION, ...(b.elevation ?? {}) };
  const gradientConfig = b.gradient ?? { from: cssVars['--brand-main'], to: cssVars['--brand-secondary'], accent: cssVars['--brand-main'] };

  cssVars['--font-family-sans'] = typography.fontSans;
  cssVars['--font-family-display'] = typography.fontDisplay;
  cssVars['--font-family-mono'] = typography.fontMono;
  cssVars['--font-weight-normal'] = String(typography.weightNormal);
  cssVars['--font-weight-medium'] = String(typography.weightMedium);
  cssVars['--font-weight-semibold'] = String(typography.weightSemibold);
  cssVars['--font-weight-bold'] = String(typography.weightBold);
  cssVars['--line-height-base'] = String(typography.leading);
  cssVars['--letter-spacing-base'] = String(typography.tracking);
  cssVars['--font-size-base'] = typography.fontSizeBase || "1rem"; // Ensure base exists

  // Define base spacing unit (e.g., --space-1 from theme or default)
  // The user wants specific --space-N tokens if they are defined, for calc() usage in CSS.
  Object.keys(spacing).forEach(key => {
    if (key.startsWith('space')) { // Capture space1, space2, etc.
        cssVars[`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`] = (spacing as any)[key];
    }
  });
   // Ensure a base for calc if specific ones are missing.
  cssVars['--spacing-unit'] = spacing.space1 || DEFAULT_SPACING.space1;


  cssVars['--radius-xs'] = shape.radiusXs || "0.125rem";
  cssVars['--radius-sm'] = shape.radiusSm || "0.25rem";
  cssVars['--radius'] = shape.radius || "0.5rem"; // often used as md
  cssVars['--radius-lg'] = shape.radiusLg || "0.75rem";
  cssVars['--radius-xl'] = shape.radiusXl || "1rem";
  cssVars['--radius-full'] = shape.radiusFull || "9999px";


  cssVars['--motion-fast'] = motion.motionFast;
  cssVars['--motion-standard'] = motion.motionStandard;
  cssVars['--motion-slow'] = motion.motionSlow;
  cssVars['--ease'] = motion.ease;
  cssVars['--ease-in'] = motion.easeIn;
  cssVars['--ease-out'] = motion.easeOut;

  cssVars['--shadow-xs'] = elevation.shadowXs || "0 1px 2px rgba(0,0,0,0.02)";
  cssVars['--shadow-sm'] = elevation.shadowSm;
  cssVars['--shadow-md'] = elevation.shadowMd;
  cssVars['--shadow-lg'] = elevation.shadowLg;
  cssVars['--shadow-xl'] = elevation.shadowXl;
  
  // Tier 2: Semantic Tokens
  cssVars['--surface-bg'] = resolveCssValue(b.surface.background, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--surface-card'] = resolveCssValue(b.surface.card, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--surface-popover'] = resolveCssValue(b.surface.popover, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--surface-on'] = resolveCssValue(b.surface.on, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--surface-muted'] = resolveCssValue(b.surface.muted, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--surface-muted-fg'] = resolveCssValue(b.surface.mutedForeground, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  
  cssVars['--text-primary'] = cssVars['--surface-on'];
  cssVars['--text-secondary'] = cssVars['--surface-muted-fg'];
  cssVars['--text-muted'] = resolveCssValue(b.surface.textMuted, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar) || `color-mix(in srgb, ${cssVars['--surface-on']} 60%, transparent)`;
  cssVars['--text-brand'] = cssVars['--brand-main'];
  cssVars['--text-on-brand'] = cssVars['--brand-on'];

  cssVars['--border-color-default'] = resolveCssValue(b.borderStyles?.defaultColor, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar) || `color-mix(in srgb, ${cssVars['--surface-muted-fg']} 30%, transparent)`;
  cssVars['--border-color-subtle'] = resolveCssValue(b.borderStyles?.subtleColor, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar) || `color-mix(in srgb, ${cssVars['--surface-muted-fg']} 15%, transparent)`;
  cssVars['--border-color-strong'] = resolveCssValue(b.borderStyles?.strongColor, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar) || `color-mix(in srgb, ${cssVars['--surface-muted-fg']} 50%, transparent)`;
  cssVars['--border-color-brand'] = cssVars['--brand-main'];

  cssVars['--border-width-thin'] = b.borderStyles?.thinWidth || "0.5px";
  cssVars['--border-width-default'] = b.borderStyles?.defaultWidth || "1px";
  cssVars['--border-width-thick'] = b.borderStyles?.thickWidth || "2px";
  cssVars['--border-style-default'] = b.borderStyles?.defaultStyle || "solid";


  cssVars['--bg-brand-subtle'] = resolveCssValue(b.surface.brandSubtle, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar) || `color-mix(in srgb, ${cssVars['--brand-main']} 8%, transparent)`;
  cssVars['--bg-transparent'] = 'transparent';
  cssVars['--bg-brand'] = cssVars['--brand-main'];


  b.supportPalette?.forEach(sp => {
    const semanticVarName = `--semantic-${sp.variableName.replace("semantic-", "")}`; // e.g. --semantic-destructive
    const colorHexUpper = sp.hex.toUpperCase();
    if (allDefinedColorVarsMap[colorHexUpper]) {
      cssVars[semanticVarName] = allDefinedColorVarsMap[colorHexUpper];
        } else {
      cssVars[semanticVarName] = sp.hex; // Fallback to direct hex if not in brandColors
      allDefinedColorVarsMap[colorHexUpper] = `var(${semanticVarName})`; // Add so it can be referenced
    }
  });
  // Ensure fallbacks for key semantic colors
  cssVars['--semantic-destructive'] = cssVars['--semantic-destructive'] || '#D32F2F';
  cssVars['--semantic-success'] = cssVars['--semantic-success'] || '#2E7D32';
  cssVars['--semantic-warning'] = cssVars['--semantic-warning'] || '#FFA000';
  cssVars['--semantic-info'] = cssVars['--semantic-info'] || '#03A9F4';
  
  cssVars['--shadow-brand-sm'] = b.elevation?.shadowBrandSm || `0 2px 6px color-mix(in srgb, ${cssVars['--brand-main']} 15%, transparent)`;
  cssVars['--shadow-brand-md'] = b.elevation?.shadowBrandMd || `0 4px 10px color-mix(in srgb, ${cssVars['--brand-main']} 20%, transparent)`;
  cssVars['--shadow-brand-lg'] = b.elevation?.shadowBrandLg || `0 8px 18px color-mix(in srgb, ${cssVars['--brand-main']} 25%, transparent)`;

  cssVars['--gradient-from'] = resolveCssValue(gradientConfig.from, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--gradient-to'] = resolveCssValue(gradientConfig.to, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
  cssVars['--gradient-accent'] = resolveCssValue(gradientConfig.accent, allDefinedColorVarsMap, brandMainVar, brandSecondaryVar) || `color-mix(in srgb, ${cssVars['--brand-main']} 110%, white 10%)`;
  
  // Shadcn UI compatible standard tokens
  cssVars['--background'] = cssVars['--surface-bg'];
  cssVars['--foreground'] = cssVars['--surface-on'];
  cssVars['--card'] = cssVars['--surface-card'];
  cssVars['--card-foreground'] = cssVars['--surface-on'];
  cssVars['--popover'] = cssVars['--surface-popover'];
  cssVars['--popover-foreground'] = cssVars['--surface-on'];
  cssVars['--primary'] = cssVars['--brand-main'];
  cssVars['--primary-foreground'] = cssVars['--brand-on'];
  cssVars['--secondary'] = cssVars['--brand-secondary'];
  cssVars['--secondary-foreground'] = cssVars['--surface-on']; // Assuming secondary bg is darkish
  cssVars['--muted'] = cssVars['--surface-muted'];
  cssVars['--muted-foreground'] = cssVars['--surface-muted-fg'];
  cssVars['--accent'] = cssVars['--brand-secondary']; // Or another accent color
  cssVars['--accent-foreground'] = cssVars['--surface-on'];
  cssVars['--destructive'] = cssVars['--semantic-destructive'];
  cssVars['--destructive-foreground'] = cssVars['--brand-on']; // Default for red
  cssVars['--success'] = cssVars['--semantic-success'];
  cssVars['--success-foreground'] = cssVars['--brand-on']; // Default for green
  cssVars['--warning'] = cssVars['--semantic-warning'];
  cssVars['--warning-foreground'] = '#000000'; // Default for yellow/amber
  cssVars['--info'] = cssVars['--semantic-info'];
  cssVars['--info-foreground'] = cssVars['--brand-on']; // Default for blue
  cssVars['--border'] = cssVars['--border-color-default'];
  cssVars['--input'] = cssVars['--border-color-default']; // Input often refers to border color
  cssVars['--ring'] = cssVars['--brand-main']; // Focus ring

  cssVars["--chart-1"] = cssVars['--brand-main'];
  cssVars["--chart-2"] = cssVars['--semantic-success'];
  cssVars["--chart-3"] = cssVars['--semantic-info'];
  cssVars["--chart-4"] = cssVars['--semantic-warning'];
  cssVars["--chart-5"] = cssVars['--semantic-destructive'];

  // Tier 3: Component-Specific Overrides (Minimal)
  // This function will now only set variables for the *default* state of components,
  // and values should ideally be semantic tokens or derivable.
  // Hover, active, focus states are to be handled by CSS.
  if (b.componentStyles) {
    for (const originalComponentKey in b.componentStyles) { 
      // Explicitly clean the component key here to remove any leading hyphens
      const cleanedComponentKey = originalComponentKey.replace(/^--+/, ''); 
      const componentLevelStyles = (b.componentStyles as any)[originalComponentKey];

      if (typeof componentLevelStyles === 'object' && componentLevelStyles !== null) {
        let isVariantContainer = false;
        for (const styleKey in componentLevelStyles) {
            if (typeof componentLevelStyles[styleKey] === 'object' && 
                componentLevelStyles[styleKey] !== null && 
                componentLevelStyles[styleKey].hasOwnProperty('default')) {
                isVariantContainer = true;
                break;
            }
        }

        if (isVariantContainer) {
          for (const variantKey in componentLevelStyles) { 
            const variantObject = componentLevelStyles[variantKey];
            if (typeof variantObject === 'object' && variantObject !== null && variantObject.default) {
              const defaultStateStyles = variantObject.default;
              // Use the cleanedComponentKey for constructing the base variable name
              const baseVariantVarName = `--${cleanedComponentKey.replace(/([A-Z])/g, "-$1").toLowerCase()}-${variantKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

              if (typeof defaultStateStyles === 'object' && defaultStateStyles !== null) {
                for (const propKey in defaultStateStyles) { 
                  const propValue = defaultStateStyles[propKey];
                  const finalVarName = `${baseVariantVarName}-${propKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
                  cssVars[finalVarName] = resolveCssValue(String(propValue), allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
                }
              }
            } else if (typeof variantObject !== 'object' || variantObject === null) {
              // Use the cleanedComponentKey for constructing the direct property variable name
              const directPropVarName = `--${cleanedComponentKey.replace(/([A-Z])/g, "-$1").toLowerCase()}-${variantKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
              cssVars[directPropVarName] = resolveCssValue(String(variantObject), allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
            }
          }
        } else {
          const processDirectStyles = (stylesObject: any, nameParts: string[]) => {
            for (const key in stylesObject) {
              const value = stylesObject[key];
              // nameParts will receive the cleanedComponentKey as its first element from the initial call
              const currentNameParts = [...nameParts, key.replace(/([A-Z])/g, "-$1").toLowerCase()];
              if (typeof value === 'object' && value !== null && !value.hasOwnProperty('default')) {
                  processDirectStyles(value, currentNameParts);
              } else if (typeof value !== 'object' || value === null || (typeof value === 'object' && value.hasOwnProperty('default'))){
                  const actualValueToResolve = (typeof value === 'object' && value !== null && value.default) ? value.default : value;
                  
                  if (typeof actualValueToResolve === 'object' && actualValueToResolve !== null) {
                     for (const subPropKey in actualValueToResolve) {
                        const subPropValue = actualValueToResolve[subPropKey];
                        const finalVarName = `--${currentNameParts.join('-')}-${subPropKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
                        cssVars[finalVarName] = resolveCssValue(String(subPropValue), allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
                        // If we are setting --tooltip-color, also set --tooltip-foreground to var(--tooltip-color)
                        if (finalVarName === '--tooltip-color') {
                          cssVars['--tooltip-foreground'] = 'var(--tooltip-color)';
                        }
            }
          } else {
                    const finalVarName = `--${currentNameParts.join('-')}`;
                    cssVars[finalVarName] = resolveCssValue(String(actualValueToResolve), allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
                    // If we are setting --tooltip-color, also set --tooltip-foreground to var(--tooltip-color)
                    if (finalVarName === '--tooltip-color') {
                      cssVars['--tooltip-foreground'] = 'var(--tooltip-color)';
                    }
                  }
              }
            }
          };
          // Pass the cleanedComponentKey (as an array element) to processDirectStyles
          processDirectStyles(componentLevelStyles, [cleanedComponentKey.replace(/([A-Z])/g, "-$1").toLowerCase()]);
        }
      }
    }
  }
  
  // Define additional surface sets if they exist
  if (b.additionalSurfaceSets) {
    Object.entries(b.additionalSurfaceSets).forEach(([setName, surfaceSet]) => {
      const prefix = `--surface-set-${setName.toLowerCase().replace(/\s+/g, '-')}`;
      Object.entries(surfaceSet).forEach(([key, value]) => {
        cssVars[`${prefix}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`] = resolveCssValue(String(value), allDefinedColorVarsMap, brandMainVar, brandSecondaryVar);
      });
    });
  }

  // Ensure some common component aliases for themes that might not define them deeply
  // but are expected by components like page.tsx or specific UI elements
  cssVars['--hero-background'] = cssVars['--hero-background'] || cssVars['--surface-bg'];
  cssVars['--nav-background'] = cssVars['--nav-background'] || cssVars['--surface-card'];
  cssVars['--tooltip-background'] = cssVars['--tooltip-background'] || cssVars['--surface-popover'];
  cssVars['--tabs-list-background'] = cssVars['--tabs-list-background'] || cssVars['--surface-muted'];

  // Ensure --button-link-color has a fallback to --brand-main if not explicitly set by componentStyles
  cssVars['--button-link-color'] = cssVars['--button-link-color'] || cssVars['--brand-main'];

  // Clean up: Remove variables that are just aliases to themselves (e.g. --brand-main: var(--brand-main))
  for (const key in cssVars) {
    if (cssVars[key] === `var(${key})`) {
      delete cssVars[key];
    }
  }

  // Ensure --tooltip-foreground is set if --tooltip-color is, even if not directly from componentStyles loop
  if (cssVars['--tooltip-color'] && !cssVars['--tooltip-foreground']) {
    cssVars['--tooltip-foreground'] = 'var(--tooltip-color)';
  }

  return cssVars;
}
