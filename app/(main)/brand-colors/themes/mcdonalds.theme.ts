import { hexToRgbString, rgbToCmykString } from "../brands";
import { BrandDefinition } from "../brands-types";


export const MCDONALDS_THEME: BrandDefinition = {
    "name": "McDonald's",
    "id": "mcdonalds",
    "description": "Clean, family-friendly design system inspired by McDonald's welcoming brand featuring classic red and golden yellow with simple, approachable styling that feels warm and trustworthy.",
    "brandColors": [
      {
        "name": "McDonald's Red",
        "color": "#DA020E",
        "variableName": "brand-red-primary",
        "shades": {
          "50": { "color": "#FEF2F2", "variableName": "brand-red-50" },
          "100": { "color": "#FEE2E2", "variableName": "brand-red-100" },
          "200": { "color": "#FECACA", "variableName": "brand-red-200" },
          "300": { "color": "#FCA5A5", "variableName": "brand-red-300" },
          "400": { "color": "#F87171", "variableName": "brand-red-400" },
          "500": { "color": "#DA020E", "variableName": "brand-red-500" },
          "600": { "color": "#C10108", "variableName": "brand-red-600" },
          "700": { "color": "#A80107", "variableName": "brand-red-700" },
          "800": { "color": "#8F0106", "variableName": "brand-red-800" },
          "900": { "color": "#760105", "variableName": "brand-red-900" }
        }
      },
      {
        "name": "McDonald's Golden Yellow",
        "color": "#FFC72C",
        "variableName": "brand-yellow-primary",
        "shades": {
          "50": { "color": "#FFFBEB", "variableName": "brand-yellow-50" },
          "100": { "color": "#FEF3C7", "variableName": "brand-yellow-100" },
          "200": { "color": "#FDE68A", "variableName": "brand-yellow-200" },
          "300": { "color": "#FCD34D", "variableName": "brand-yellow-300" },
          "400": { "color": "#FBBF24", "variableName": "brand-yellow-400" },
          "500": { "color": "#FFC72C", "variableName": "brand-yellow-500" },
          "600": { "color": "#D69E2E", "variableName": "brand-yellow-600" },
          "700": { "color": "#B7791F", "variableName": "brand-yellow-700" },
          "800": { "color": "#975A16", "variableName": "brand-yellow-800" },
          "900": { "color": "#744210", "variableName": "brand-yellow-900" }
        }
      },
      {
        "name": "McDonald's Green",
        "color": "#00A651",
        "variableName": "brand-green-primary",
        "shades": {
          "50": { "color": "#F0FDF4", "variableName": "brand-green-50" },
          "100": { "color": "#DCFCE7", "variableName": "brand-green-100" },
          "200": { "color": "#BBF7D0", "variableName": "brand-green-200" },
          "300": { "color": "#86EFAC", "variableName": "brand-green-300" },
          "400": { "color": "#4ADE80", "variableName": "brand-green-400" },
          "500": { "color": "#00A651", "variableName": "brand-green-500" },
          "600": { "color": "#009546", "variableName": "brand-green-600" },
          "700": { "color": "#00843B", "variableName": "brand-green-700" },
          "800": { "color": "#007330", "variableName": "brand-green-800" },
          "900": { "color": "#006225", "variableName": "brand-green-900" }
        }
      },
      {
        "name": "McDonald's Orange",
        "color": "#FF6900",
        "variableName": "brand-orange-primary",
        "shades": {
          "50": { "color": "#FFF7ED", "variableName": "brand-orange-50" },
          "100": { "color": "#FFEDD5", "variableName": "brand-orange-100" },
          "200": { "color": "#FED7AA", "variableName": "brand-orange-200" },
          "300": { "color": "#FDBA74", "variableName": "brand-orange-300" },
          "400": { "color": "#FB923C", "variableName": "brand-orange-400" },
          "500": { "color": "#FF6900", "variableName": "brand-orange-500" },
          "600": { "color": "#EA580C", "variableName": "brand-orange-600" },
          "700": { "color": "#C2410C", "variableName": "brand-orange-700" },
          "800": { "color": "#9A3412", "variableName": "brand-orange-800" },
          "900": { "color": "#7C2D12", "variableName": "brand-orange-900" }
        }
      },
      {
        "name": "McDonald's Brown",
        "color": "#8B4513",
        "variableName": "brand-brown-primary",
        "shades": {
          "50": { "color": "#FAF7F2", "variableName": "brand-brown-50" },
          "100": { "color": "#F5EFE5", "variableName": "brand-brown-100" },
          "200": { "color": "#EBDFCB", "variableName": "brand-brown-200" },
          "300": { "color": "#E1CFB1", "variableName": "brand-brown-300" },
          "400": { "color": "#D7BF97", "variableName": "brand-brown-400" },
          "500": { "color": "#8B4513", "variableName": "brand-brown-500" },
          "600": { "color": "#7A3D10", "variableName": "brand-brown-600" },
          "700": { "color": "#69350E", "variableName": "brand-brown-700" },
          "800": { "color": "#582D0B", "variableName": "brand-brown-800" },
          "900": { "color": "#472509", "variableName": "brand-brown-900" }
        }
      },
      {
        "name": "McDonald's Neutral",
        "color": "#F5F5F5",
        "variableName": "brand-neutral-primary",
        "shades": {
          "50": { "color": "#FFFFFF", "variableName": "brand-neutral-50" },
          "100": { "color": "#FAFAFA", "variableName": "brand-neutral-100" },
          "200": { "color": "#F5F5F5", "variableName": "brand-neutral-200" },
          "300": { "color": "#E5E5E5", "variableName": "brand-neutral-300" },
          "400": { "color": "#D4D4D4", "variableName": "brand-neutral-400" },
          "500": { "color": "#A3A3A3", "variableName": "brand-neutral-500" },
          "600": { "color": "#737373", "variableName": "brand-neutral-600" },
          "700": { "color": "#525252", "variableName": "brand-neutral-700" },
          "800": { "color": "#404040", "variableName": "brand-neutral-800" },
          "900": { "color": "#262626", "variableName": "brand-neutral-900" }
        }
      }
    ],
    "brand": {
      "main": {
        "name": "McDonald's Red (Primary)",
        "hex": "#DA020E",
        "rgb": "rgb(218, 2, 14)",
        "cmyk": "cmyk(0%, 99%, 94%, 15%)",
        "variableName": "brand-red-primary"
      },
      "on": "#FFFFFF",
      "secondary": {
        "name": "McDonald's Golden Yellow (Secondary)",
        "hex": "#FFC72C",
        "rgb": "rgb(255, 199, 44)",
        "cmyk": "cmyk(0%, 22%, 83%, 0%)",
        "variableName": "brand-yellow-primary"
      }
    },
    "supportPalette": [
      { "name": "McDonald's Green (Success)", "hex": "#00A651", "rgb": "rgb(0, 166, 81)", "cmyk": "cmyk(100%, 0%, 51%, 35%)", "variableName": "semantic-success" },
      { "name": "McDonald's Red (Destructive)", "hex": "#DA020E", "rgb": "rgb(218, 2, 14)", "cmyk": "cmyk(0%, 99%, 94%, 15%)", "variableName": "semantic-destructive" },
      { "name": "McDonald's Orange (Warning)", "hex": "#FF6900", "rgb": "rgb(255, 105, 0)", "cmyk": "cmyk(0%, 59%, 100%, 0%)", "variableName": "semantic-warning" },
      { "name": "McDonald's Golden Yellow (Info)", "hex": "#FFC72C", "rgb": "rgb(255, 199, 44)", "cmyk": "cmyk(0%, 22%, 83%, 0%)", "variableName": "semantic-info" }
    ],
    "surface": {
      "background": "#FFFFFF",
      "card": "#FFFFFF",
      "popover": "#FFFFFF",
      "on": "#262626",
      "muted": "#F5F5F5",
      "mutedForeground": "#737373",
      "brandSubtle": "rgba(218, 2, 14, 0.03)",
      "textMuted": "#A3A3A3"
    },
    "semantic": {
      "destructive": "#DA020E",
      "success": "#00A651",
      "warning": "#FF6900",
      "info": "#FFC72C"
    },
    "shape": {
      "radiusXs": "2px",
      "radiusSm": "4px",
      "radius": "6px",
      "radiusLg": "8px",
      "radiusXl": "12px",
      "radiusFull": "9999px"
    },
    "typography": {
      "fontDisplay": "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "fontSans": "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "fontMono": "var(--font-roboto-mono), 'SF Mono', Consolas, monospace",
      "weightNormal": "400",
      "weightMedium": "500",
      "weightSemibold": "600",
      "weightBold": "700",
      "leading": "1.5",
      "tracking": "0",
      "fontSizeXs": "0.75rem",
      "fontSizeSm": "0.875rem",
      "fontSizeBase": "1rem",
      "fontSizeLg": "1.125rem",
      "fontSizeXl": "1.375rem"
    },
    "motion": {
      "motionFast": "150ms",
      "motionStandard": "200ms",
      "motionSlow": "300ms",
      "ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "easeOut": "cubic-bezier(0, 0, 0.2, 1)"
    },
    "elevation": {
      "shadowXs": "0 1px 2px rgba(0,0,0,0.03)",
      "shadowSm": "0 1px 2px rgba(0,0,0,0.05)",
      "shadowMd": "0 2px 4px rgba(0,0,0,0.06)",
      "shadowLg": "0 4px 8px rgba(0,0,0,0.08)",
      "shadowXl": "0 8px 16px rgba(0,0,0,0.10)",
      "shadowBrandSm": "0 1px 2px rgba(0,0,0,0.05)",
      "shadowBrandMd": "0 2px 4px rgba(0,0,0,0.06)",
      "shadowBrandLg": "0 4px 8px rgba(0,0,0,0.08)"
    },
    "spacing": {
      "space1": "0.25rem",
      "space2": "0.5rem",
      "space3": "0.75rem",
      "space4": "1rem",
      "space5": "1.25rem",
      "space6": "1.5rem",
      "space8": "2rem",
      "space12": "3rem",
      "paddingInput": "0.75rem 1rem",
      "paddingButton": "0.75rem 1.5rem",
      "paddingCard": "1.5rem",
      "paddingCompact": "0.5rem 0.75rem"
    },
    "gradient": {
      "from": "#DA020E",
      "to": "#A80107",
      "accent": "#FFC72C"
    },
    "borderStyles": {
      "defaultColor": "#E5E5E5",
      "subtleColor": "#F5F5F5",
      "strongColor": "#D4D4D4",
      "defaultWidth": "1px",
      "thinWidth": "1px",
      "thickWidth": "2px",
      "defaultStyle": "solid"
    },
    "stylingPreferences": {
      "preferBorderless": false,
      "applySpecialLayout": true,
      "containerMaxWidth": "max-w-6xl",
      "overviewCardBoxShadow": "var(--shadow-sm)",
      "contentFlexClass": "sm:flex-row items-start",
      "footerExtraMargin": "mt-8",
      "headingMainText": "McDonald's Design System",
      "headingSubtitleText": "I'm Lovin' It",
      "headingSubtitleClassName": "text-[var(--brand-main)] font-semibold",
      "navTitle": "McDonald's"
    },
    "componentStyles": {
      "nav": {
        "background": "#FFFFFF",
        "borderColor": "#E5E5E5",
        "borderWidth": "0 0 1px 0",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.03)",
        "backdropFilter": "none",
        "color": "#262626"
      },
      "hero": {
        "background": "#FFFFFF",
        "backgroundImage": "none",
        "color": "#262626",
        "boxShadow": "none"
      },
      "tabs": {
        "list": {
          "background": "#F5F5F5",
          "borderRadius": "var(--radius)",
          "padding": "var(--space-1)",
          "border": "1px solid #E5E5E5",
          "boxShadow": "none"
        },
        "trigger": {
          "color": "#737373",
          "borderRadius": "var(--radius-sm)",
          "backgroundActive": "var(--brand-main)",
          "textColorActive": "var(--brand-on)",
          "boxShadowActive": "none",
          "fontWeight": "var(--font-weight-medium)",
          "padding": "0.75rem 1rem",
          "fontFamily": "var(--font-family-sans)",
          "textTransform": "none",
          "letterSpacing": "0"
        }
      },
      "overviewCard": {
        "background": "var(--surface-card)",
        "borderColor": "#E5E5E5",
        "borderWidth": "1px",
        "borderRadius": "var(--radius-lg)",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.05)",
        "overlayImage": "none"
      },
      "chartShowcaseCard": {
        "background": "var(--surface-card)",
        "borderColor": "#E5E5E5",
        "borderWidth": "1px",
        "borderRadius": "var(--radius-lg)",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.05)"
      },
      "chartShowcaseTitle": {
        "color": "var(--brand-main)",
        "fontWeight": "var(--font-weight-semibold)",
        "fontSize": "1.25rem",
        "textTransform": "none",
        "letterSpacing": "0",
        "fontFamily": "var(--font-family-sans)"
      },
      "componentShowcaseCard": {
        "background": "var(--surface-card)",
        "borderColor": "#E5E5E5",
        "borderWidth": "1px",
        "borderRadius": "var(--radius-lg)",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.05)"
      },
      "componentShowcaseTitle": {
        "color": "var(--brand-main)",
        "fontWeight": "var(--font-weight-semibold)",
        "fontSize": "1.25rem",
        "textTransform": "none",
        "letterSpacing": "0",
        "fontFamily": "var(--font-family-sans)"
      },
      "brandPickerContainer": {
        "background": "#FFFFFF",
        "backdropFilter": "none",
        "border": "1px solid #E5E5E5",
        "borderRadius": "var(--radius-lg)",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.05)"
      },
      "tokenGroupCard": {
        "background": "var(--surface-card)",
        "backgroundImage": "none",
        "borderWidth": "1px",
        "borderStyle": "var(--border-style-default)",
        "borderColor": "#E5E5E5",
        "borderRadius": "var(--radius-lg)",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.05)",
        "padding": "var(--padding-card)"
      },
      "button": {
        "primary": {
          "default": {
            "background": "var(--brand-main)",
            "color": "var(--brand-on)",
            "borderRadius": "var(--radius)",
            "boxShadow": "none",
            "fontWeight": "var(--font-weight-medium)",
            "textTransform": "none",
            "letterSpacing": "0",
            "padding": "0.75rem 1.5rem",
            "fontSize": "1rem",
            "fontFamily": "var(--font-family-sans)",
            "border": "none"
          },
          "hover": {
            "background": "color-mix(in srgb, var(--brand-main) 90%, #000 10%)",
            "boxShadow": "0 2px 4px rgba(0,0,0,0.06)",
            "transform": "none"
          },
          "active": {
            "background": "color-mix(in srgb, var(--brand-main) 85%, #000 15%)",
            "transform": "none",
            "boxShadow": "none"
          },
          "focus": {
            "boxShadow": "0 0 0 3px rgba(218, 2, 14, 0.2)"
          }
        },
        "secondary": {
          "default": {
            "background": "var(--brand-secondary)",
            "color": "#262626",
            "borderColor": "transparent",
            "borderWidth": "1px",
            "borderRadius": "var(--radius)",
            "fontWeight": "var(--font-weight-medium)",
            "textTransform": "none",
            "letterSpacing": "0",
            "padding": "0.75rem 1.5rem",
            "fontSize": "1rem",
            "boxShadow": "none"
          },
          "hover": {
            "background": "color-mix(in srgb, var(--brand-secondary) 90%, #000 10%)",
            "borderColor": "transparent",
            "color": "#262626",
            "boxShadow": "0 2px 4px rgba(0,0,0,0.06)",
            "transform": "none"
          },
          "active": {
            "background": "color-mix(in srgb, var(--brand-secondary) 85%, #000 15%)",
            "transform": "none"
          },
          "focus": {
            "borderColor": "transparent",
            "boxShadow": "0 0 0 3px rgba(255, 199, 44, 0.3)"
          }
        },
        "outline": {
          "default": {
            "background": "transparent",
            "borderColor": "var(--brand-main)",
            "color": "var(--brand-main)",
            "borderRadius": "var(--radius)",
            "fontWeight": "var(--font-weight-medium)",
            "textTransform": "none",
            "letterSpacing": "0",
            "borderWidth": "1px",
            "padding": "0.75rem 1.5rem",
            "fontSize": "1rem"
          },
          "hover": {
            "background": "rgba(218, 2, 14, 0.05)",
            "color": "var(--brand-main)",
            "borderColor": "var(--brand-main)",
            "boxShadow": "none"
          },
          "active": {
            "background": "rgba(218, 2, 14, 0.1)"
          },
          "focus": {
            "boxShadow": "0 0 0 3px rgba(218, 2, 14, 0.2)"
          }
        },
        "destructive": {
          "default": {
            "background": "var(--semantic-destructive)",
            "color": "var(--brand-on)",
            "borderRadius": "var(--radius)",
            "boxShadow": "none",
            "fontWeight": "var(--font-weight-medium)",
            "textTransform": "none",
            "letterSpacing": "0",
            "padding": "0.75rem 1.5rem",
            "fontSize": "1rem",
            "border": "none"
          },
          "hover": {
            "background": "color-mix(in srgb, var(--semantic-destructive) 90%, #000 10%)",
            "boxShadow": "0 2px 4px rgba(0,0,0,0.06)"
          },
          "active": {
            "background": "color-mix(in srgb, var(--semantic-destructive) 85%, #000 15%)",
            "boxShadow": "none"
          },
          "focus": {
            "boxShadow": "0 0 0 3px rgba(218, 2, 14, 0.2)"
          }
        },
        "fontFamily": "var(--font-family-sans)",
        "fontSize": "1rem"
      },
      "input": {
        "background": "var(--surface-card)",
        "color": "var(--surface-on)",
        "borderColor": "#E5E5E5",
        "borderRadius": "var(--radius)",
        "padding": "0.75rem 1rem",
        "borderWidth": "1px",
        "boxShadow": "none",
        "focus": {
          "borderColor": "var(--brand-main)",
          "boxShadow": "0 0 0 3px rgba(218, 2, 14, 0.1)",
          "background": "var(--surface-card)"
        },
        "placeholderColor": "var(--surface-muted-fg)",
        "fontFamily": "var(--font-family-sans)",
        "fontSize": "1rem",
        "fontWeight": "400"
      },
      "card": {
        "background": "var(--surface-card)",
        "borderColor": "#E5E5E5",
        "borderWidth": "1px",
        "borderRadius": "var(--radius-lg)",
        "boxShadow": "0 1px 2px rgba(0,0,0,0.05)",
        "padding": "1.5rem",
        "header": {
          "padding": "1.5rem 1.5rem 1rem",
          "titleColor": "var(--brand-main)",
          "descriptionColor": "var(--surface-muted-fg)",
          "textTransform": "none",
          "letterSpacing": "0",
          "fontFamily": "var(--font-family-sans)",
          "fontWeight": "600"
        },
        "fontFamily": "var(--font-family-sans)"
      },
      "badge": {
        "variantDefault": {
          "background": "var(--brand-main)",
          "color": "var(--brand-on)",
          "borderRadius": "var(--radius)",
          "padding": "0.25rem 0.75rem",
          "fontSize": "0.75rem",
          "fontWeight": 500,
          "textTransform": "none",
          "letterSpacing": "0",
          "fontFamily": "var(--font-family-sans)",
          "boxShadow": "none"
        },
        "variantDestructive": {
          "background": "var(--semantic-destructive)",
          "color": "var(--brand-on)",
          "borderRadius": "var(--radius)",
          "padding": "0.25rem 0.75rem",
          "fontSize": "0.75rem",
          "fontWeight": 500,
          "fontFamily": "var(--font-family-sans)",
          "textTransform": "none",
          "boxShadow": "none"
        },
        "variantSuccess": {
          "background": "var(--semantic-success)",
          "color": "var(--brand-on)",
          "borderRadius": "var(--radius)",
          "padding": "0.25rem 0.75rem",
          "fontSize": "0.75rem",
          "fontWeight": 500,
          "fontFamily": "var(--font-family-sans)",
          "textTransform": "none",
          "boxShadow": "none"
        },
        "variantWarning": {
          "background": "var(--semantic-warning)",
          "color": "#FFFFFF",
          "borderRadius": "var(--radius)",
          "padding": "0.25rem 0.75rem",
          "fontSize": "0.75rem",
          "fontWeight": 500,
          "fontFamily": "var(--font-family-sans)",
          "textTransform": "none",
          "boxShadow": "none"
        },
        "variantInfo": {
          "background": "var(--semantic-info)",
          "color": "#262626",
          "borderRadius": "var(--radius)",
          "padding": "0.25rem 0.75rem",
          "fontSize": "0.75rem",
          "fontWeight": 500,
          "fontFamily": "var(--font-family-sans)",
          "textTransform": "none",
          "boxShadow": "none"
        }
      },
      "tooltip": {
        "background": "rgba(38, 38, 38, 0.9)",
        "color": "#FFFFFF",
        "borderColor": "transparent",
        "borderWidth": "0",
        "borderRadius": "var(--radius)",
        "padding": "0.5rem 0.75rem",
        "boxShadow": "0 2px 4px rgba(0,0,0,0.1)",
        "fontSize": "0.875rem",
        "backdropFilter": "none",
        "textTransform": "none",
        "letterSpacing": "0",
        "fontFamily": "var(--font-family-sans)",
        "fontWeight": "400"
      },
      "charts": {
        "gridStrokeColor": "rgba(229, 229, 229, 0.8)",
        "axisStrokeColor": "#D4D4D4",
        "axisTextColor": "#737373",
        "legendTextColor": "#262626",
        "tooltipCursorFill": "rgba(218, 2, 14, 0.1)"
      },
      "loadingIndicator": {
        "background": "var(--surface-muted)",
        "color": "var(--brand-main)",
        "textColor": "var(--surface-muted-fg)",
        "fontFamily": "var(--font-family-sans)",
        "fontWeight": "400",
        "textTransform": "none",
        "letterSpacing": "0"
      }
    },
    "componentShowcase": {
      "title": "McDonald's Design System",
      "description": "Clean, family-friendly components that bring the warmth and approachability of McDonald's to digital experiences.",
      "interactiveElements": [
        { "id": "button-primary-mcdonalds", "name": "Primary Action", "description": "Clean red buttons for main ordering and promotional actions.", "displayComponent": "Order Now" },
        { "id": "button-secondary-mcdonalds", "name": "Golden Action", "description": "Friendly yellow buttons for secondary actions and promotions.", "displayComponent": "Find Store" },
        { "id": "button-outline-mcdonalds", "name": "Menu Choice", "description": "Simple outlined buttons for menu navigation and product selection.", "displayComponent": "View Menu" },
        { "id": "badge-status-mcdonalds", "name": "Promotional Badge", "description": "Clear badges for deals, promotions, and new products.", "displayComponent": "New!" },
        { "id": "badge-alert-mcdonalds", "name": "Special Offer", "description": "Friendly alerts for limited-time offers and special promotions.", "displayComponent": "Limited Time" }
      ],
      "forms": [
        { "id": "input-text-mcdonalds", "name": "Order Input", "description": "Clean input fields for ordering and contact forms.", "displayComponent": "Enter your location" },
        { "id": "input-search-mcdonalds", "name": "Menu Search", "description": "Simple search interface for finding menu items and locations.", "displayComponent": "Search menu items" }
      ],
      "feedbackIndicators": [
        { "id": "loading-indicator-mcdonalds", "name": "Order Loading", "description": "Clear loading states that maintain the friendly McDonald's experience.", "displayComponent": "Preparing your order..." }
      ]
    },
    "supplementaryChartColors": ["#DA020E", "#FFC72C", "#00A651", "#FF6900", "#8B4513"]
  }
  