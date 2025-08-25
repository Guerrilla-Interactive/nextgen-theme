import { generateBrandColors, createThemeCssVars } from '../brand-utils';
import type { Brand, RawColorDefinition, StyleGuide, OklchString } from './theme-types';
import { modernAnimationPreset } from '../animation-presets';

// Combine: Nextgen colors + Violet Sky typography/radii/spacing/shadows/animations

// 1) Colors from Nextgen
const rawColors: RawColorDefinition[] = [
  // Core Dark Palette (Edgy Tech)
  {
    tokenSpecificName: "Midnight Ash",
    description: "Deep, dark background, almost black.",
    oklch: "oklch(0.15 0.01 260)" as OklchString,
    roles: ["background"],
    category: 'shade',
    onColor: "oklch(0.97 0.005 90)" as OklchString,
  },
  {
    tokenSpecificName: "Photon White",
    description: "Bright, clean white for high-contrast text and UI elements.",
    oklch: "oklch(0.97 0.005 90)" as OklchString,
    roles: [
      "foreground",
      "primary-foreground",
      "secondary-foreground",
      "accent-foreground",
      "destructive-foreground",
      "card-foreground",
      "popover-foreground",
      "input-foreground",
      "sidebar-foreground",
      "sidebar-primary-foreground",
      "sidebar-accent-foreground"
    ],
    category: 'shade',
  },
  {
    tokenSpecificName: "Carbon Fiber",
    description: "Dark surface for cards, popovers; slightly lighter than background.",
    oklch: "oklch(0.20 0.015 255)" as OklchString,
    roles: ["card", "popover", "secondary", "tooltip-background", "sidebar"],
    category: 'shade',
    onColor: "oklch(0.97 0.005 90)" as OklchString,
  },
  {
    tokenSpecificName: "Tungsten Gray",
    description: "Mid-dark gray for borders, inputs, and muted elements.",
    oklch: "oklch(0.35 0.01 250)" as OklchString,
    roles: ["border", "input", "muted"],
    category: 'shade',
    onColor: "oklch(0.97 0.005 90)" as OklchString,
  },
  {
    tokenSpecificName: "Titanium Mist",
    description: "Light gray for muted text, providing better accessibility.",
    oklch: "oklch(0.70 0.008 255)" as OklchString,
    roles: ["muted-foreground"],
    category: 'shade',
  },

  // Primary (FF3600) & Accents
  {
    tokenSpecificName: "Inferno Orange",
    description: "Primary action color, #FF3600 retained for high-energy actions, also used for accents, success, and info states.",
    oklch: "oklch(0.6484 0.239166 33.0098)" as OklchString,
    roles: ["primary", "ring", "accent", "chart-1", "sidebar-primary", "sidebar-accent"],
    category: 'color',
    onColor: "oklch(0.97 0.005 90)" as OklchString,
  },
  {
    tokenSpecificName: "Crimson Alert",
    description: "Intense red for destructive actions and warnings.",
    oklch: "oklch(0.50 0.26 15)" as OklchString,
    roles: ["destructive"],
    category: 'color',
    onColor: "oklch(0.97 0.005 90)" as OklchString,
  },

  // Vibrant Chart Colors (Digital Edge)
  {
    tokenSpecificName: "Chart Electric Blue",
    description: "Secondary chart data color (electric blue)",
    oklch: "oklch(0.62 0.20 230)" as OklchString,
    roles: ["chart-2"],
    category: 'color',
    onColor: "oklch(0.15 0.01 260)" as OklchString,
  },
  {
    tokenSpecificName: "Chart Neon Pink",
    description: "Tertiary chart data color (neon pink)",
    oklch: "oklch(0.62 0.23 330)" as OklchString,
    roles: ["chart-3"],
    category: 'color',
    onColor: "oklch(0.15 0.01 260)" as OklchString,
  },
  {
    tokenSpecificName: "Chart Ultraviolet",
    description: "Quaternary chart data color (ultraviolet)",
    oklch: "oklch(0.60 0.22 300)" as OklchString,
    roles: ["chart-4"],
    category: 'color',
    onColor: "oklch(0.15 0.01 260)" as OklchString,
  },
  {
    tokenSpecificName: "Chart Plasma Teal",
    description: "Quinary chart data color (plasma teal)",
    oklch: "oklch(0.68 0.21 190)" as OklchString,
    roles: ["chart-5"],
    category: 'color',
    onColor: "oklch(0.15 0.01 260)" as OklchString,
  },
];

// 2) StyleGuide: color mappings from Nextgen + radii/spacing from Violet Sky
const styleGuide: StyleGuide = {
  sidebarColors: {
    sidebar: "Carbon Fiber",
    sidebarForeground: "Photon White",
    sidebarPrimary: "Inferno Orange",
    sidebarPrimaryForeground: "Photon White",
    sidebarAccent: "Inferno Orange",
    sidebarAccentForeground: "Photon White",
    sidebarBorder: "Tungsten Gray",
    sidebarRing: "Inferno Orange",
  },
  chartColors: {
    chart1: "Inferno Orange",
    chart2: "Chart Electric Blue",
    chart3: "Chart Neon Pink",
    chart4: "Chart Ultraviolet",
    chart5: "Chart Plasma Teal",
  },
  rootColors: { background: "Midnight Ash", foreground: "Photon White" },
  primaryColors: { primary: "Inferno Orange", primaryForeground: "Photon White" },
  secondaryColors: { secondary: "Inferno Orange", secondaryForeground: "Photon White" },
  accentColors: { accent: "Inferno Orange", accentForeground: "Photon White" },
  cardColors: { card: "Carbon Fiber", cardForeground: "Photon White" },
  popoverColors: { popover: "Carbon Fiber", popoverForeground: "Photon White" },
  mutedColors: { muted: "Tungsten Gray", mutedForeground: "Titanium Mist" },
  destructiveColors: { destructive: "Crimson Alert", destructiveForeground: "Photon White" },
  successColors: { success: "Inferno Orange", successForeground: "Photon White" },
  inputColors: { input: "Tungsten Gray", inputForeground: "Photon White" },
  borderColors: { border: "Tungsten Gray" },
  ringColors: { ring: "Inferno Orange" },
  radius: {
    // From Violet Sky
    radiusSm: "calc(var(--radius) - 4px)",
    radiusMd: "calc(var(--radius) - 2px)",
    radiusLg: "var(--radius)",
    radiusXl: "calc(var(--radius) + 4px)",
  },
  spacing: {
    // From Violet Sky
    spacingSm: "0.5rem",
    spacingMd: "1rem",
    spacingLg: "1.5rem",
    spacingXl: "2rem",
  },
};

// 3) Other vars: keep Nextgen mappings for semantic color refs, adopt Violet Sky shadows/radiusBase
const otherVars = {
  // Shadows from Violet Sky
  shadowXs: "0px 8px 16px -4px oklch(0 0 0 / 0.04)",
  shadowSm: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 1px 2px -5px oklch(0 0 0 / 0.08)",
  shadowMd: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 2px 4px -5px oklch(0 0 0 / 0.08)",
  shadowLg: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 4px 6px -5px oklch(0 0 0 / 0.08)",
  shadowXl: "0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 8px 10px -5px oklch(0 0 0 / 0.08)",
  "shadow-2xs": "0px 8px 16px -4px oklch(0 0 0 / 0.04)",
  "shadow-2xl": "0px 8px 16px -4px oklch(0 0 0 / 0.20)",

  borderWidthDefault: "1px",
  borderStyleDefault: "solid",

  // Chart colors mapped in styleGuide
  // Radius from Violet Sky
  radiusBase: "1.5rem",
};

const colors = generateBrandColors("nextgen-violet-sky", rawColors);

export const nextgenVioletSkyBrand: Brand = {
  name: "Nextgen Violet Sky",
  rating: 99,
  businessDetails: {
    name: "Nextgen × Violet Sky",
    industry: "design_systems",
    personality: {
      vintageModern: 55,
      seasonedYouthful: 65,
      gracefulBold: 80,
      playfulElegant: 55,
      valueSmartLuxurious: 68,
      structuredNatural: 58,
      symbolicRealistic: 55,
    },
  },
  colors,
  // Fonts from Nextgen
  fonts: [
    {
      name: "Inter",
      distributor: "Google Fonts",
      description: "Clean, technical sans-serif perfect for gaming tech interfaces.",
      family: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      roles: [
        "body", "default", "sans", "p", "a", "li",
        // Canonical interactive roles + legacy aliases
        "button", "button-label",
        "input", "form-input",
        "label",
        // Additional stacks and headings
        "serif-body", "serif", "h4", "h5", "h6"
      ],
      weights: { thin: 100, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Orbitron",
      distributor: "Google Fonts",
      description: "Futuristic, sci-fi display font perfect for next-gen gaming aesthetic.",
      family: "'Orbitron', 'Exo 2', sans-serif",
      roles: ["display", "h1", "h2", "h3", "hero-title", "nav-title"],
      weights: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 },
    },
    {
      name: "Fira Code",
      distributor: "Google Fonts",
      description: "Developer-focused monospaced font with ligatures for code.",
      family: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
      roles: ["code", "mono"],
      weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
  ],
  style: styleGuide,
  themeCssVariables: createThemeCssVars(
    "nextgen-violet-sky",
    colors,
    styleGuide,
    otherVars
  ),
  sevenAxisCode: {
    colorComplexity: 'duotone',
    brightness: 'adaptive',
    saturation: 'neon',
    colorHarmony: 'complementary',
    accentUsage: 'balanced',
    cornerStyle: 'very-rounded',
    elevation: 'minimal-shadow',
  },
  animationConfig: {
    preset: {
      ...modernAnimationPreset,
      button: {
        ...modernAnimationPreset.button,
        // Enhanced outline variant with stronger active effect (from Violet Sky)
        outline: {
          default: {
            duration: '180ms',
            easing: 'ease-out',
            opacity: '1',
            transform: { scale: '1' }
          },
          hover: {
            duration: '150ms',
            easing: 'ease-out',
            opacity: '0.9'
          },
          focus: {
            duration: '150ms',
            easing: 'ease-out',
            opacity: '0.95',
            boxShadow: '0 0 0 2px var(--ring)',
            transform: { scale: '1' }
          },
          active: {
            duration: '100ms',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: '0.7',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
          },
          disabled: {
            duration: '150ms',
            easing: 'ease-out',
            opacity: '0.5',
            transform: { scale: '1' }
          }
        }
      }
    },
    rootClassName: 'nextgen-violet-sky-theme'
  }
};

export default nextgenVioletSkyBrand;


