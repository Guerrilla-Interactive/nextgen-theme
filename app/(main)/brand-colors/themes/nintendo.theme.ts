import { hexToRgbString, rgbToCmykString } from "../brands";
import { BrandDefinition } from "../brands-types";

export const NINTENDO_THEME: BrandDefinition = {
    name: "Nintendo Light Theme",
    id: "nintendo-light-theme",
    description: "This is the default theme used on nintendo.com",
    brandColors: [
      {
        name: "Nintendo Red", // Primary
        hex: "#e60012",
        variableName: "brand-red-primary",
        shades: {
          "50":  { hex: "#fde6e7", variableName: "brand-red-50" },  // primaryLight
          "100": { hex: "#facdd1", variableName: "brand-red-100" }, // Lighter version of 50
          "200": { hex: "#f599a2", variableName: "brand-red-200" },
          "300": { hex: "#f06672", variableName: "brand-red-300" },
          "400": { hex: "#eb3343", variableName: "brand-red-400" },
          "500": { hex: "#e60012", variableName: "brand-red-500" },  // primary
          "600": { hex: "#ac000d", variableName: "brand-red-600" },  // primaryHover
          "700": { hex: "#8B000A", variableName: "brand-red-700" },  // Darker
          "800": { hex: "#650008", variableName: "brand-red-800" },
          "900": { hex: "#3E0005", variableName: "brand-red-900" },
        }
      },
      {
        name: "Nintendo Blue", // Secondary
        hex: "#3946a0",
        variableName: "brand-blue-primary",
        shades: {
          "50":  { hex: "#bdc3e8", variableName: "brand-blue-50" },  // secondaryLight
          "100": { hex: "#a7b0df", variableName: "brand-blue-100" },
          "200": { hex: "#7e8ccd", variableName: "brand-blue-200" },
          "300": { hex: "#5567ba", variableName: "brand-blue-300" },
          "400": { hex: "#4255AD", variableName: "brand-blue-400" },
          "500": { hex: "#3946a0", variableName: "brand-blue-500" },  // secondary
          "600": { hex: "#2a3477", variableName: "brand-blue-600" },  // secondaryHover
          "700": { hex: "#21295F", variableName: "brand-blue-700" },
          "800": { hex: "#181F47", variableName: "brand-blue-800" },
          "900": { hex: "#0F142F", variableName: "brand-blue-900" },
        }
      },
      {
        name: "Nintendo Gray", // Neutral Family
        hex: "#727272", // Using darkGray3 as a representative mid-tone
        variableName: "brand-gray-neutral", // Changed variableName for clarity
        shades: {
          "50":  { hex: "#ffffff", variableName: "brand-gray-50" },    // white, ui-bgMain
          "100": { hex: "#f8f8f8", variableName: "brand-gray-100" },   // lightGray4, ui-bgAccent
          "200": { hex: "#efefef", variableName: "brand-gray-200" },   // lightGray3
          "300": { hex: "#dadada", variableName: "brand-gray-300" },   // lightGray2, ui-line, button-disabled-bg
          "400": { hex: "#c8c8c8", variableName: "brand-gray-400" },   // lightGray1
          "500": { hex: "#969696", variableName: "brand-gray-500" },   // darkGray4
          "600": { hex: "#727272", variableName: "brand-gray-600" },   // darkGray3
          "700": { hex: "#484848", variableName: "brand-gray-700" },   // darkGray2, text-standard, icon-standard
          "800": { hex: "#242424", variableName: "brand-gray-800" },   // darkGray1
          "900": { hex: "#000000", variableName: "brand-gray-900" },   // black
        }
      }
    ],
    brand: {
      main: {
        name: "Nintendo Red (Primary)",
        hex: "#e60012",
        rgb: hexToRgbString("#e60012"),
        cmyk: rgbToCmykString(hexToRgbString("#e60012")),
        variableName: "brand-red-primary",
      },
      on: "#ffffff",
      secondary: {
        name: "Nintendo Blue (Secondary)",
        hex: "#3946a0",
        rgb: hexToRgbString("#3946a0"),
        cmyk: rgbToCmykString(hexToRgbString("#3946a0")),
        variableName: "brand-blue-primary",
      }
    },
    supportPalette: [
      {
        name: "Nintendo Red (Destructive)",
        hex: "#e60012", // --theme-colors-alert-errorIcon
        rgb: hexToRgbString("#e60012"),
        cmyk: rgbToCmykString(hexToRgbString("#e60012")),
        variableName: "semantic-destructive",
      },
      {
        name: "Nintendo Site Green (Success)", // New name from sheet
        hex: "#2d8513", // --theme-colors-alert-successIcon
        rgb: hexToRgbString("#2d8513"),
        cmyk: rgbToCmykString(hexToRgbString("#2d8513")),
        variableName: "semantic-success",
      },
      {
        name: "Nintendo Site Yellow (Warning)", // New name from sheet
        hex: "#bea000", // --theme-colors-alert-warningIcon
        rgb: hexToRgbString("#bea000"),
        cmyk: rgbToCmykString(hexToRgbString("#bea000")),
        variableName: "semantic-warning",
      },
      {
        name: "Nintendo Site Blue (Info/Attention)", // New name from sheet
        hex: "#3946a0", // --theme-colors-alert-attentionIcon (same as secondary)
        rgb: hexToRgbString("#3946a0"),
        cmyk: rgbToCmykString(hexToRgbString("#3946a0")),
        variableName: "semantic-info",
      },
    ],
    surface: {
      background: "#ffffff",        // --theme-colors-ui-bgMain -> brand-gray-50
      card: "#f8f8f8",              // --theme-colors-ui-bgAccent -> brand-gray-100
      popover: "#f8f8f8",           // Assuming similar to card -> brand-gray-100
      on: "#484848",                // --theme-colors-text-standard -> brand-gray-700
      muted: "#efefef",             // --theme-color-lightGray3 -> brand-gray-200
      mutedForeground: "#727272",    // --theme-color-darkGray3 -> brand-gray-600
      brandSubtle: "#fde6e7",        // --theme-color-primaryLight -> brand-red-50
      textMuted: "#969696",          // --theme-color-darkGray4 -> brand-gray-500
    },
    semantic: { // References supportPalette hex values directly
      destructive: "#e60012",
      success: "#2d8513",
      warning: "#bea000",
      info: "#3946a0",
    },
    shape: {
      radiusXs: "0px",       // Generally sharp
      radiusSm: "2px",       // For slightly rounded elements
      radius: "4px",         // --theme-borderRadius (assuming base value for components)
      radiusLg: "8px",
      radiusXl: "1rem",      // --theme-borderRadiusRound
      radiusFull: "9999px",
    },
    typography: {
      fontDisplay: "'museo-sans', -apple-system, BlinkMacSystemFont, sans-serif", // --theme-font-family
      fontSans: "'museo-sans', -apple-system, BlinkMacSystemFont, sans-serif",    // --theme-font-family
      fontMono: "'SF Mono', 'Source Code Pro', monospace", // Kept from previous
      weightLight: "300",    // --theme-font-weight-light
      weightNormal: "400",   // Default assumption
      weightMedium: "500",   // Default assumption
      weightSemibold: "600", // Default assumption
      weightBold: "700",     // --theme-font-weight-bold
      leading: "1.4",        // --theme-font-lineHeight
      tracking: "0",         // Default assumption
      fontSizeXs: "0.75rem", // legalDesktop
      fontSizeSm: "0.875rem",// captionDesktop
      fontSizeBase: "1rem",  // bodyDesktop
      fontSizeLg: "1.125rem",// h3Desktop
      fontSizeXl: "1.3125rem",// h2Desktop
      // Other h# sizes can be added if needed: h1SDesktop: 1.75rem, h1LDesktop: 2.375rem
    },
    motion: {
      motionFast: "150ms", // Adjusted slightly from 200ms to have distinct values
      motionStandard: "200ms", // --theme-movement-duration
      motionSlow: "300ms",   // Adjusted
      ease: "ease-in-out", // --theme-movement-easing
      easeIn: "ease-in",   // Standard
      easeOut: "ease-out", // Standard
    },
    elevation: { // Kept existing subtle shadows, as sheet has scrims not box-shadows
      shadowXs: "0 1px 2px rgba(0,0,0,0.03)",
      shadowSm: "0 2px 4px rgba(0,0,0,0.04)",
      shadowMd: "0 3px 6px rgba(0,0,0,0.05)",
      shadowLg: "0 4px 8px rgba(0,0,0,0.06)",
      shadowXl: "0 6px 12px rgba(0,0,0,0.07)",
      shadowBrandSm: "0 2px 4px color-mix(in srgb, var(--brand-red-500, #e60012) 10%, transparent)",
      shadowBrandMd: "0 3px 6px color-mix(in srgb, var(--brand-red-500, #e60012) 12%, transparent)",
      shadowBrandLg: "0 4px 8px color-mix(in srgb, var(--brand-red-500, #e60012) 15%, transparent)",
    },
    spacing: { // Mapped from --theme-spacing-*
      space1: "0.125rem", // theme-spacing-2
      space2: "0.25rem",  // theme-spacing-4
      space3: "0.5rem",   // theme-spacing-8
      space4: "0.75rem",  // theme-spacing-12
      space5: "1rem",     // theme-spacing-16
      space6: "1.25rem",  // theme-spacing-20
      space8: "1.5rem",   // theme-spacing-24
      space12: "2rem",    // theme-spacing-32
      // Added for larger gaps, can be expanded
      paddingInput: "0.625rem 0.875rem", // Kept from before, seems reasonable
      paddingButton: "0.625rem 1.25rem", // Kept from before
      paddingCard: "1rem", // theme-spacing-16
      paddingCompact: "0.5rem", // theme-spacing-8
    },
    gradient: { // Derived from new primary and secondary
      from: "var(--brand-red-400, #eb3343)",
      to: "var(--brand-red-600, #ac000d)",
      accent: "var(--brand-blue-500, #3946a0)",
    },
    borderStyles: {
      defaultColor: "#dadada",   // --theme-colors-ui-line -> brand-gray-300
      subtleColor: "#efefef",    // lightGray3 -> brand-gray-200
      strongColor: "#c8c8c8",   // lightGray1 -> brand-gray-400
      defaultWidth: "1px",
      thinWidth: "1px",
      thickWidth: "2px",
      defaultStyle: "solid",
    },
    stylingPreferences: { // Some kept, some from sheet
      preferBorderless: false,
      applySpecialLayout: false, // Defaulting to simpler layout
      containerMaxWidth: "90rem", // --theme-page-maxWidth
      overviewCardBoxShadow: "var(--shadow-sm)", // Existing subtle
      contentFlexClass: "sm:flex-row",
      footerExtraMargin: "",
      headingMainText: "Nintendo Switch", // Kept existing
      headingSubtitleText: "Play anytime, anywhere, with anyone",  // Kept existing
      headingSubtitleClassName: "text-[var(--brand-gray-600)] font-normal", // text-darkGray3
      navTitle: "Nintendo", // Simplified
    },
    componentStyles: {
      nav: {
        background: "var(--brand-gray-50, #ffffff)", // ui-bgMain
        borderColor: "var(--brand-gray-300, #dadada)", // ui-line
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        boxShadow: "var(--shadow-xs)", // Subtle shadow
        color: "var(--brand-gray-700, #484848)", // text-standard
      },
      hero: {
        background: "var(--brand-gray-50, #ffffff)", // ui-bgMain
        // backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--brand-red-500) 3%, transparent), transparent, color-mix(in srgb, var(--brand-blue-500) 3%, transparent))",
        borderColor: "transparent",
        borderWidth: "0px",
        borderStyle: "solid",
        showOverlay: false, // Simplified
        color: "var(--brand-gray-700, #484848)",
      },
      tabs: { // Simplified, using button styles as base for triggers
        list: {
          background: "var(--brand-gray-100, #f8f8f8)", // ui-bgAccent
          borderColor: "transparent",
          borderWidth: "0px",
          borderStyle: "solid",
          borderRadius: "var(--radius, 4px)",
          boxShadow: "none",
          padding: "var(--space-1, 0.125rem)"
        },
        trigger: { // Mimics tertiary button
          borderRadius: "var(--radius, 4px)",
          background: "transparent",
          backgroundActive: "var(--brand-red-500, #e60012)",
          textColor: "var(--brand-red-500, #e60012)",
          textColorActive: "var(--brand-gray-50, #ffffff)",
          boxShadowActive: "var(--shadow-sm)",
          borderColor: "var(--brand-red-500, #e60012)",
          borderWidth: "1px",
          padding: "var(--padding-compact)"
        }
      },
      // Cards
      overviewCard: {
        background: "var(--brand-gray-50, #ffffff)",
        borderColor: "var(--brand-gray-300, #dadada)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "var(--radius, 4px)",
        boxShadow: "var(--shadow-sm)",
        padding: "var(--padding-card)"
      },
      chartShowcaseCard: { // Assuming similar styling to overviewCard
        background: "var(--brand-gray-50, #ffffff)",
        borderColor: "var(--brand-gray-300, #dadada)",
        borderWidth: "1px",
        borderRadius: "var(--radius, 4px)",
        boxShadow: "var(--shadow-sm)",
        padding: "var(--padding-card)"
      },
      chartShowcaseTitle: {
        fontWeight: "var(--font-weight-bold)",
        fontSize: "var(--font-size-lg)",
        color: "var(--brand-gray-700, #484848)",
      },
      componentShowcaseCard: { // Assuming similar styling to overviewCard
        background: "var(--brand-gray-50, #ffffff)",
        borderColor: "var(--brand-gray-300, #dadada)",
        borderWidth: "1px",
        borderRadius: "var(--radius, 4px)",
        boxShadow: "var(--shadow-sm)",
        padding: "var(--padding-card)"
      },
      componentShowcaseTitle: {
        fontWeight: "var(--font-weight-bold)",
        fontSize: "var(--font-size-lg)",
        color: "var(--brand-gray-700, #484848)",
      },
      tokenShowcaseCard: {
        background: "var(--brand-gray-50, #ffffff)",
        borderColor: "var(--brand-gray-300, #dadada)",
        borderWidth: "1px",
        borderRadius: "var(--radius, 4px)",
        boxShadow: "var(--shadow-sm)",
        padding: "var(--padding-card)",
      },
      pageCard: { // General small card
        background: "var(--brand-gray-50, #ffffff)",
        borderColor: "var(--brand-gray-300, #dadada)",
        borderWidth: "1px",
        borderRadius: "var(--radius, 4px)",
        boxShadow: "var(--shadow-xs)",
        padding: "var(--padding-compact)",
      },

      // BUTTONS from --theme-colors-button-*
      button: {
        primary: { // --theme-colors-button-background-primary, primaryHover, content-primary
          default: {
            background: "var(--brand-red-500, #e60012)",
            color: "var(--brand-gray-50, #ffffff)",
            borderRadius: "var(--radius-xl, 1rem)", // borderRadiusRound
            padding: "var(--padding-button)",
            fontWeight: "var(--font-weight-bold)",
            borderWidth: "0px",
          },
          hover: {
            background: "var(--brand-red-600, #ac000d)",
          },
          // active and focus states can be derived or kept simple
        },
        secondary: { // --theme-colors-button-background-secondary, secondaryHover, content-secondary
          default: {
            background: "var(--brand-blue-500, #3946a0)",
            color: "var(--brand-gray-50, #ffffff)",
            borderRadius: "var(--radius-xl, 1rem)",
            padding: "var(--padding-button)",
            fontWeight: "var(--font-weight-bold)",
            borderWidth: "0px",
          },
          hover: {
            background: "var(--brand-blue-600, #2a3477)",
          }
        },
        tertiary: { // background-tertiary, content-tertiary, stroke-tertiary, selected states
          default: {
            background: "var(--brand-gray-50, #ffffff)",
            color: "var(--brand-red-500, #e60012)",
            borderColor: "var(--brand-red-500, #e60012)",
            borderWidth: "1px", // Assuming 1px for stroke
            borderRadius: "var(--radius-xl, 1rem)",
            padding: "calc(var(--padding-button) - 1px)",
            fontWeight: "var(--font-weight-bold)",
          },
          hover: { // Assuming hover darkens border/text slightly or subtle bg change
             borderColor: "var(--brand-red-600, #ac000d)",
             color: "var(--brand-red-600, #ac000d)",
             background: "var(--brand-red-50, #fde6e7)",
          },
          active: { // Selected state
            background: "var(--brand-red-500, #e60012)", // tertiarySelected BG
            color: "var(--brand-gray-50, #ffffff)",    // tertiarySelected Content
            borderColor: "var(--brand-red-500, #e60012)",
          }
        },
        quaternary: { // background-quaternary, content-quaternary, stroke-quaternary, selected states
           default: {
            background: "var(--brand-gray-50, #ffffff)",
            color: "var(--brand-blue-500, #3946a0)",
            borderColor: "var(--brand-blue-500, #3946a0)",
            borderWidth: "1px",
            borderRadius: "var(--radius-xl, 1rem)",
            padding: "calc(var(--padding-button) - 1px)",
            fontWeight: "var(--font-weight-bold)",
           },
           hover: {
            background: "var(--brand-gray-200, #efefef)", // quaternaryHover BG
            borderColor: "var(--brand-blue-600, #2a3477)",
            color: "var(--brand-blue-600, #2a3477)",
           },
           active: { // Selected state
            background: "var(--brand-blue-500, #3946a0)", // quaternarySelected BG
            color: "var(--brand-gray-50, #ffffff)",    // quaternarySelected Content
            borderColor: "var(--brand-blue-500, #3946a0)",
           }
        },
        ghost: { // background-ghost, content-ghost, stroke-ghost
          default: {
            background: "rgba(0,0,0, 0.25)", // Needs to be themeable (dark/light mode)
            color: "var(--brand-gray-50, #ffffff)",
            // Assuming no border or white border for ghost on dark bg
            // borderColor: "var(--brand-gray-50, #ffffff)",
            // borderWidth: "1px",
            borderRadius: "var(--radius-xl, 1rem)",
            padding: "var(--padding-button)",
            fontWeight: "var(--font-weight-bold)",
          },
          hover: {
            background: "rgba(0,0,0, 0.5)",
          }
          // Focus: rgba(255,255,255, 0.25) - needs careful thought for context
        },
        disabled: { // background-disabled, assuming text color would be a muted gray
          default: {
            background: "var(--brand-gray-300, #dadada)",
            color: "var(--brand-gray-500, #969696)", // darkGray4
            borderRadius: "var(--radius-xl, 1rem)",
            padding: "var(--padding-button)",
            fontWeight: "var(--font-weight-bold)",
            borderWidth: "0px",
            cursor: "not-allowed",
          }
        },
        fontFamily: "var(--font-family-sans)", // museo-sans
        fontSize: "var(--font-size-base)", // 1rem (bodyDesktop)
      },
      input: { // Generalizing, not much detail in sheet beyond colors
        background: "var(--brand-gray-50, #ffffff)",
        color: "var(--brand-gray-700, #484848)", // text-standard
        borderColor: "var(--brand-gray-300, #dadada)", // ui-line
        borderRadius: "var(--radius, 4px)",
        padding: "var(--padding-input)",
        borderWidth: "1px",
        boxShadow: "var(--shadow-xs)",
        focus: { // Using primary red for focus, similar to ui-accent
          borderColor: "var(--brand-red-500, #e60012)",
          boxShadow: "0 0 0 3px color-mix(in srgb, var(--brand-red-500, #e60012) 30%, transparent)",
        },
        placeholderColor: "var(--brand-gray-500, #969696)", // darkGray4
      },
      card: { // Re-iterating with more general values
        background: "var(--brand-gray-100, #f8f8f8)", // ui-bgAccent
        borderColor: "var(--brand-gray-300, #dadada)", // ui-line
        borderWidth: "1px",
        borderRadius: "var(--radius, 4px)",
        boxShadow: "var(--shadow-sm)",
        padding: "var(--padding-card)",
        header: {
          padding: "calc(var(--padding-card) * 0.75) var(--padding-card) calc(var(--padding-card) * 0.5)",
          titleColor: "var(--brand-gray-700, #484848)",
          descriptionColor: "var(--brand-gray-600, #727272)",
        },
      },
      badge: { // Simplified badge styles
        variantDefault: {
          background: "var(--brand-gray-200, #efefef)", // lightGray3
          color: "var(--brand-gray-700, #484848)", // text-standard
          borderRadius: "var(--radius-xl, 1rem)", // borderRadiusRound
          padding: "0.25rem 0.75rem", // Spacing 4 and 12
          fontSize: "var(--font-size-sm)", // captionDesktop
          fontWeight: "var(--font-weight-bold)",
        },
        variantDestructive: { // Using alert-errorIcon
          background: "var(--brand-red-50, #fde6e7)", // primaryLight
          color: "var(--brand-red-500, #e60012)",
        },
        variantSuccess: { // Using alert-successIcon
          background: "#E1F7D6", // --theme-colors-alert-successBg
          color: "var(--semantic-success, #2d8513)",
        },
         variantWarning: { // Using alert-warningIcon
          background: "#FFFBB1", // --theme-colors-alert-warningBg
          color: "var(--semantic-warning, #bea000)",
        },
        variantInfo: { // Using alert-attentionIcon
           background: "#E8EBFC", // --theme-colors-alert-attentionBg
           color: "var(--semantic-info, #3946a0)",
        }
      },
      tooltip: { // Kept simple dark tooltip
        background: "var(--brand-gray-800, #242424)", // darkGray1
        color: "var(--brand-gray-50, #ffffff)", // white
        borderColor: "transparent",
        borderRadius: "var(--radius, 4px)",
        padding: "var(--space-3, 0.5rem) var(--space-4, 0.75rem)",
        boxShadow: "var(--shadow-md)",
        fontSize: "var(--font-size-sm)", // captionDesktop
      },
      // ICON COLORS
      // These will be primarily consumed by CSS vars, not direct component styles here
      // --icon-standard: var(--brand-gray-700, #484848)
      // --icon-primary: var(--brand-red-500, #e60012)
      // --icon-inverse: var(--brand-gray-50, #ffffff)

      // ALERT COLORS (Backgrounds for alert components)
      // --alert-error-bg: (not specified, use primaryLight or destructive badge bg)
      // --alert-warning-bg: #FFFBB1
      // --alert-success-bg: #E1F7D6
      // --alert-attention-bg: #E8EBFC
      // --alert-maintenance-bg: #EFEFEF (lightGray3)
      // --alert-text-color: var(--brand-gray-700, #484848)
      
      charts: { // Kept previous simple mapping
        gridStrokeColor: "color-mix(in srgb, var(--brand-gray-300, #dadada) 60%, transparent)", 
        axisStrokeColor: "var(--brand-gray-500, #969696)",
        axisTextColor: "var(--brand-gray-600, #727272)",
        legendTextColor: "var(--brand-gray-700, #484848)",
        tooltipCursorFill: "color-mix(in srgb, var(--brand-red-500, #e60012) 5%, transparent)",
      },
      loadingIndicator: {
        background: "var(--brand-gray-100, #f8f8f8)",
        color: "var(--brand-red-500, #e60012)", // Primary red for spinner
        textColor: "var(--brand-gray-700, #484848)",
      },
      brandPickerContainer: { // Added styles for brand picker
        background: "var(--brand-gray-800, #242424)", // --theme-color-darkGray1
        color: "var(--brand-gray-50, #ffffff)",      // White text for contrast
        padding: "1.5rem",                           // [padding:var(--brand-picker-padding,1.5rem)]
        borderRadius: "var(--radius-lg, 8px)",       // [border-radius:var(--brand-picker-radius,var(--radius-lg))]
        boxShadow: "var(--shadow-md, 0 3px 6px rgba(0,0,0,0.05))", // [shadow:var(--brand-picker-shadow,var(--shadow-md))]
        marginTop: "2.5rem",                         // [margin-top:var(--brand-picker-container-margin-top,2.5rem)]
        marginBottom: "0",                           // [margin-bottom:var(--brand-picker-container-margin-bottom,0)]
        showOverlay: false, // Assuming no specific overlay image from the snippet
      }
    },
    chartShowcase: { // Kept existing structure, colors will adapt
      title: "Nintendo Gaming Stats",
      description: "Usage data and player engagement for Nintendo platforms.",
      usageData: [
        // ... (data can remain, will pick up new theme colors)
        { month: "Jan", console: 380, mobile: 120, online: 290, playtime: 3.2 }, { month: "Feb", console: 420, mobile: 140, online: 310, playtime: 3.4 }, { month: "Mar", console: 460, mobile: 160, online: 340, playtime: 3.7 }, { month: "Apr", console: 520, mobile: 190, online: 390, playtime: 4.1 }, { month: "May", console: 580, mobile: 210, online: 450, playtime: 4.5 }, { month: "Jun", console: 650, mobile: 250, online: 520, playtime: 4.8 },
      ],
      performanceData: [
        { name: "Player Engagement", value: 94, trend: "+8%" }, { name: "Game Completion", value: 86, trend: "+5%" }, { name: "Online Play", value: 92, trend: "+12%" }, { name: "Player Retention", value: 89, trend: "+3%" },
      ],
      distributionData: [
        { name: "Console Gaming", value: 650, fill: "var(--chart-1)", count: "65M players" }, { name: "Mobile Play", value: 250, fill: "var(--chart-2)", count: "25M players" }, { name: "Online Services", value: 520, fill: "var(--chart-3)", count: "52M players" },
      ],
      quickStats: [
        { label: "Active Players", value: "102M" }, { label: "Games Played", value: "2.4B hrs" }, { label: "Player Satisfaction", value: "94%" }, { label: "New Releases", value: "18" },
      ],
    },
    componentShowcase: { // Kept existing structure
      title: "Nintendo UI Kit",
      description: "Standard interface elements for Nintendo online experiences.",
      interactiveElements: [
        { id: "button-primary-nintendo", name: "Primary Button", description: "Main call to action.", displayComponent: "BUY NOW" },
        { id: "button-secondary-nintendo", name: "Secondary Button", description: "Alternative action.", displayComponent: "LEARN MORE" },
        { id: "button-tertiary-nintendo", name: "Tertiary Button", description: "Less emphasized, often with border.", displayComponent: "VIEW DETAILS" },
        { id: "badge-status-nintendo", name: "Status Badge", description: "For indicating status.", displayComponent: "NEW" }
      ],
      forms: [ { id: "input-text-nintendo", name: "Text Input", description: "Standard text field.", displayComponent: "Enter your Nickname" } ],
      feedbackIndicators: [ { id: "loading-indicator-nintendo", name: "Loading...", description: "Activity indicator.", displayComponent: "Loading Content..." } ]
    },
    supplementaryChartColors: [ // From --theme-colors-descriptionTag-*
      "#e60012", // red
      "#4B5CCE", // blue
      "#9531B9", // violet
      "#484848", // charcoal
      "#2d8513", // success green (added for variety)
      "#bea000", // warning yellow (added for variety)
    ],
  }
