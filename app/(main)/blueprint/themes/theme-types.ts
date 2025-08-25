// Centralized theme-specific type definitions used by theme files
// Define the types here (do not just re-export), so themes have a single source

// Primitive theme token helpers
export type OklchString = `oklch(${string})`;
import type { Role } from "../brand-utils";

// Color definition shape used by theme files
export interface RawColorDefinition {
  tokenSpecificName: string;
  description: string;
  oklch: OklchString;
  roles: Role[];
  category: 'color' | 'shade';
  onColor?: OklchString;
}

// Style guide structure for composing theme groups
export interface StyleGuide {
  primaryColors: { primary: string; primaryForeground: string };
  secondaryColors: { secondary: string; secondaryForeground: string };
  accentColors: { accent: string; accentForeground: string };
  cardColors: { card: string; cardForeground: string };
  popoverColors: { popover: string; popoverForeground: string };
  mutedColors: { muted: string; mutedForeground: string };
  destructiveColors: { destructive: string; destructiveForeground: string };
  successColors: { success: string; successForeground: string };
  infoColors?: { info: string; infoForeground?: string };
  warningColors?: { warning: string; warningForeground?: string };
  inputColors: { input: string; inputForeground?: string };
  borderColors: { border: string };
  ringColors: { ring: string };
  rootColors: { background: string; foreground: string };
  sidebarColors: {
    sidebar: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarPrimaryForeground: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;
  };
  chartColors: {
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
    chartOutline?: string;
  };
  radius: {
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
  };
  spacing: {
    spacingSm: string;
    spacingMd: string;
    spacingLg: string;
    spacingXl: string;
  };
}

// Typography role requirements (all themes should cover these via fonts.roles)
export type RequiredTypographyRole =
  | 'body' | 'default' | 'sans'
  | 'p' | 'a' | 'li'
  | 'button' | 'button-label'
  | 'input' | 'form-input'
  | 'label'
  | 'serif-body' | 'serif'
  | 'display'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'hero-title' | 'nav-title'
  | 'code' | 'mono';

export const REQUIRED_TYPOGRAPHY_ROLES: ReadonlyArray<RequiredTypographyRole> = [
  'body','default','sans',
  'p','a','li',
  'button','button-label',
  'input','form-input',
  'label',
  'serif-body','serif',
  'display',
  'h1','h2','h3','h4','h5','h6',
  'hero-title','nav-title',
  'code','mono'
];

// Brand meta
export interface Personality {
  vintageModern: number;
  seasonedYouthful: number;
  gracefulBold: number;
  playfulElegant: number;
  valueSmartLuxurious: number;
  structuredNatural: number;
  symbolicRealistic: number;
}

export interface BusinessDetails {
  name: string;
  industry: string;
  personality: Personality;
}

export interface SevenAxisCode {
  colorComplexity: 'monochrome' | 'duotone' | 'triad' | 'polychrome';
  brightness: 'light' | 'adaptive';
  saturation: 'muted' | 'pastel' | 'medium' | 'vibrant' | 'neon';
  colorHarmony: 'single-hue' | 'analogous' | 'complementary' | 'triadic' | 'tetradic';
  accentUsage: 'minimal' | 'subtle' | 'balanced' | 'prominent' | 'dominant';
  cornerStyle: 'sharp' | 'slightly-rounded' | 'rounded' | 'very-rounded' | 'pill';
  elevation: 'flat' | 'minimal-shadow' | 'subtle-depth' | 'layered' | 'dramatic';
}

// Pull in non-theme core tokens referenced by Brand
import type { ColorToken, FontToken } from "../brand-utils";
import type { ThemeCssVars } from "../brand-utils";
import type { ThemeAnimationConfig } from "../brand-utils";

// Theme Brand surface used by theme definitions
export interface Brand {
  businessDetails: BusinessDetails;
  colors: ColorToken[];
  fonts: FontToken[];
  style: StyleGuide;
  themeCssVariables: ThemeCssVars;
  name: string;
  rating: number;
  sevenAxisCode: SevenAxisCode;
  animationConfig?: ThemeAnimationConfig;
}



