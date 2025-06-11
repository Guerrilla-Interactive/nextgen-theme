/*───────────────────────────────────────────────────────────────────────────*
  Terracotta Orchid  •  Duotone-Adjacent · Light · Muted · Flat · Accent-Neutral · Square-Flat
 *──────────────────────────────────────────────────────────────────────────*/

  import {
    type Brand,
    generateBrandColors,
    type RawColorDefinition,
    type StyleGuide,
    createThemeCssVars,
    OklchString,
  } from "../brand-utils";
  
  /*───────────────────────────────────────────────────────────────────────────*
    1.  Raw colour tokens (light ↔ dark OKLCH pairs + role list)
   *──────────────────────────────────────────────────────────────────────────*/
  const terracottaOrchidThemeDefinition = {
    rawColors: [
      // ◆ Ivory Surface
      {
        tokenSpecificName: "Ivory",
        description: "Base page background / top-level surface",
        oklchLight: "oklch(0.9383 0.0042 236.4993)" as OklchString, // variable: --background
        oklchDark:  "oklch(0.2598 0.0306 262.6666)" as OklchString, // variable: --background (dark)
        roles: ["background"],
        category: "shade",
      },
  
      // ◆ Snow (cards / popovers)
      {
        tokenSpecificName: "Snow",
        description: "Cards and popover surfaces",
        oklchLight: "oklch(1.0 0 0)" as OklchString,   // --card / --popover
        oklchDark:  "oklch(0.3106 0.0301 268.6365)" as OklchString,
        roles: ["card", "popover"],
        category: "shade",
        onColorLight: "oklch(0.3211 0 0)" as OklchString,  // body text on Snow
        onColorDark:  "oklch(0.9219 0 0)" as OklchString,  // body text on card in dark
      },
  
      // ◆ Midnight Text
      {
        tokenSpecificName: "Midnight Charcoal",
        description: "Primary foreground text colour",
        oklchLight: "oklch(0.3211 0 0)" as OklchString,  // --foreground
        oklchDark:  "oklch(0.9219 0 0)" as OklchString,  // --foreground (dark)
        roles: [
          "foreground",
          "card-foreground",
          "popover-foreground",
          "sidebar-foreground",
          "sidebar-accent-foreground",
          "input-foreground",
        ],
        category: "shade",
      },
  
      // ◆ Terracotta
      {
        tokenSpecificName: "Terracotta",
        description: "Primary actions, ring focus",
        oklchLight: "oklch(0.6397 0.1720 36.4421)" as OklchString, // --primary / --ring
        oklchDark:  "oklch(0.6397 0.1720 36.4421)" as OklchString,
        roles: ["primary", "ring", "chart-2", "sidebar-primary"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
  
      // ◆ Orchid
      {
        tokenSpecificName: "Soft Orchid",
        description: "Secondary / muted lavender surface & borders",
        oklchLight: "oklch(0.9670 0.0029 264.5419)" as OklchString, // --secondary & --input
        oklchDark:  "oklch(0.3095 0.0266 266.7132)" as OklchString,
        roles: ["secondary", "input", "border", "sidebar", "muted"],
        category: "shade",
        onColorLight: "oklch(0.4461 0.0263 256.8018)" as OklchString, // secondary-foreground
        onColorDark:  "oklch(0.9219 0 0)" as OklchString,             // secondary-foreground (dark)
      },
  
      // ◆ Orchid Text
      {
        tokenSpecificName: "Orchid Text",
        description: "Text on Orchid-light surfaces",
        oklchLight: "oklch(0.4461 0.0263 256.8018)" as OklchString,
        oklchDark:  "oklch(0.9219 0 0)" as OklchString,
        roles: ["secondary-foreground", "muted-foreground"],
        category: "shade",
      },
  
      // ◆ Pale Lavender (accent & sidebar-accent)
      {
        tokenSpecificName: "Pale Lavender",
        description: "Accent highlight colour & sidebar accent",
        oklchLight: "oklch(0.9119 0.0222 243.8174)" as OklchString, // --accent
        oklchDark:  "oklch(0.3380 0.0589 267.5867)" as OklchString,
        roles: ["accent", "sidebar-accent", "chart-1", "chart-3"],
        category: "color",
        onColorLight: "oklch(0.3791 0.1378 265.5222)" as OklchString, // accent-foreground
        onColorDark:  "oklch(0.8823 0.0571 254.1284)" as OklchString,
      },
  
      // ◆ Charcoal-Border
      {
        tokenSpecificName: "Orchid Border",
        description: "UI borders & outlines",
        oklchLight: "oklch(0.9022 0.0052 247.8822)" as OklchString, // --border
        oklchDark:  "oklch(0.3843 0.0301 269.7337)" as OklchString,
        roles: ["border", "sidebar-border"],
        category: "shade",
      },
  
      // ◆ Input lavender ring colour lives in Terracotta token (ring)
  
      // ◆ Destructive (reuse library red)
      {
        tokenSpecificName: "Crimson",
        description: "Destructive / error actions",
        oklchLight: "oklch(0.6368 0.2078 25.3313)" as OklchString,
        oklchDark:  "oklch(0.6368 0.2078 25.3313)" as OklchString,
        roles: ["destructive", "warning"],
        category: "color",
        onColorLight: "oklch(1 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
  
      // ◆ Success (derive from Terracotta mid-tone)
      {
        tokenSpecificName: "Terracotta Light",
        description: "Success messaging (toned-down Terracotta)",
        oklchLight: "oklch(0.7875 0.0917 35.9616)" as OklchString, // chart-2 light variant
        oklchDark:  "oklch(0.7693 0.0876 34.1875)" as OklchString,
        roles: ["success", "chart-4"],
        category: "color",
        onColorLight: "oklch(0.3211 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
  
      // ◆ Info (cool lavender)
      {
        tokenSpecificName: "Cool Lavender",
        description: "Informational state",
        oklchLight: "oklch(0.7156 0.0605 248.6845)" as OklchString,
        oklchDark:  "oklch(0.7156 0.0605 248.6845)" as OklchString,
        roles: ["info", "chart-5"],
        category: "color",
        onColorLight: "oklch(0.3211 0 0)" as OklchString,
        onColorDark:  "oklch(1 0 0)" as OklchString,
      },
    ] as RawColorDefinition[],
  
    /*───────────────────────────────────────────────────────────────────────*
      2.  Style-guide role mapping
     *───────────────────────────────────────────────────────────────────────*/
    styleGuide: {
      primaryColors:     { primary: "Terracotta", primaryForeground: "Snow" },
      secondaryColors:   { secondary: "Soft Orchid", secondaryForeground: "Orchid Text" },
      accentColors:      { accent: "Pale Lavender", accentForeground: "Orchid Text" },
      cardColors:        { card: "Snow", cardForeground: "Midnight Charcoal" },
      popoverColors:     { popover: "Snow", popoverForeground: "Midnight Charcoal" },
      mutedColors:       { muted: "Soft Orchid", mutedForeground: "Orchid Text" },
      destructiveColors: { destructive: "Crimson", destructiveForeground: "Snow" },
      successColors:     { success: "Terracotta Light", successForeground: "Midnight Charcoal" },
      infoColors:        { info: "Cool Lavender", infoForeground: "Midnight Charcoal" },
      warningColors:     { warning: "Crimson", warningForeground: "Snow" },
  
      inputColors:  { input: "Soft Orchid", inputForeground: "Midnight Charcoal" },
      borderColors: { border: "Orchid Border" },
      ringColors:   { ring: "Terracotta" },
  
      radius: {
        radiusSm: "calc(var(--radius) - 2px)",
        radiusMd: "var(--radius)",
        radiusLg: "calc(var(--radius) + 2px)",
        radiusXl: "calc(var(--radius) + 4px)",
      },
      spacing: {
        spacingSm: "0.5rem",
        spacingMd: "1rem",
        spacingLg: "1.5rem",
        spacingXl: "2rem",
      },
    } as StyleGuide,
  
    /*───────────────────────────────────────────────────────────────────────*
      3. Misc design tokens / util vars
     *───────────────────────────────────────────────────────────────────────*/
    otherVars: {
      background: "Ivory",
      foreground: "Midnight Charcoal",
      radiusBase: "0.05rem",
  
      // Shadows (copied from CSS)
      shadowXs:  "0px 1px 3px 0px hsl(0 0% 0% / 0.05)",
      shadowSm:  "0px 1px 3px 0px hsl(0 0% 0% / 0.10), 0px 1px 2px -1px hsl(0 0% 0% / 0.10)",
      shadowMd:  "0px 1px 3px 0px hsl(0 0% 0% / 0.10), 0px 2px 4px -1px hsl(0 0% 0% / 0.10)",
      shadowLg:  "0px 1px 3px 0px hsl(0 0% 0% / 0.10), 0px 4px 6px -1px hsl(0 0% 0% / 0.10)",
      shadowXl:  "0px 1px 3px 0px hsl(0 0% 0% / 0.10), 0px 8px 10px -1px hsl(0 0% 0% / 0.10)",
      "shadow-2xs": "0px 1px 3px 0px hsl(0 0% 0% / 0.05)",
      "shadow-2xl": "0px 1px 3px 0px hsl(0 0% 0% / 0.25)",
  
      borderWidthDefault: "1px",
      borderStyleDefault: "solid",
  
      // Quick chart aliases
      chart1: "Cool Lavender",
      chart2: "Terracotta",
      chart3: "Pale Lavender",
      chart4: "Terracotta Light",
      chart5: "Cool Lavender",
    },
  };
  
  /*──────────────────────────────────────────────────────────────────────────*
    4.  Build Brand object
   *──────────────────────────────────────────────────────────────────────────*/
  const terracottaOrchidBrandColors = generateBrandColors("terracotta-orchid", terracottaOrchidThemeDefinition.rawColors);
  
  export const terracottaOrchidBrand: Brand = {
    name: "Terracotta Orchid",
    businessDetails: {
      name: "Terracotta Orchid Studios",
      industry: "creative_services",
      personality: {
        vintageModern: 50,
        seasonedYouthful: 55,
        gracefulBold: 60,
        playfulElegant: 40,
        valueSmartLuxurious: 70,
        structuredNatural: 45,
        symbolicRealistic: 50,
      },
    },
    colors: terracottaOrchidBrandColors,
    fonts: [
      {
        name: "Inter",
        distributor: "Google Fonts",
        description: "Clean, functional sans-serif for UI and body copy.",
        family: "Inter, sans-serif",
        roles: ["body", "default", "sans"],
        weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "Source Serif 4",
        distributor: "Adobe Fonts / Google Fonts",
        description: "Elegant serif for long-form content and quotations.",
        family: "'Source Serif 4', serif",
        roles: ["serif", "blockquote"],
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
      },
      {
        name: "JetBrains Mono",
        distributor: "Google Fonts",
        description: "Monospaced font for code snippets.",
        family: "'JetBrains Mono', monospace",
        roles: ["code", "mono"],
        weights: { regular: 400, medium: 500, bold: 700 },
      },
    ],
    style: terracottaOrchidThemeDefinition.styleGuide,
    themeCssVariables: createThemeCssVars(
      "terracotta-orchid",
      terracottaOrchidBrandColors,
      terracottaOrchidThemeDefinition.styleGuide,
      terracottaOrchidThemeDefinition.otherVars
    ),
    prefersDarkSchemeForChrome: false,
  };
  
  export default terracottaOrchidBrand;
  