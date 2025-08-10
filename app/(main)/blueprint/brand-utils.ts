/*Mak
 * Shared types and utility functions for brand definitions.
 * Tailwind v4 + shadcn/ui CSS generator included.
 *
 * Install peer deps if needed:
 *   npm i culori
 */

import { wcagContrast } from 'culori/fn';
import { parse, converter } from 'culori';

/* ────────────────────────────────────────────────────────────
   Influence / roles
   ──────────────────────────────────────────────────────────── */

export const influenceHierarchy = {
  /** Primary actionable hue or surface */                            primary: 10,
  "primary-foreground": 9.9,
  /** Highest contrast background colour */                         background: 9,
  /** Highest contrast foreground (text) colour */                  foreground: 9,
  /** Secondary actionable hue or surface */                         secondary: 8,
  "secondary-foreground": 7.9,
  /** Sidebar surface */                                               sidebar: 7.5,
  "sidebar-foreground": 7.4,
  "sidebar-primary": 7.3,
  "sidebar-primary-foreground": 7.2,
  "sidebar-accent": 7.1,
  "sidebar-accent-foreground": 7.0,
  "sidebar-border": 6.9,
  "sidebar-ring": 6.8,
  /** Standard border colour */                                         border: 7,
  /** Form control foregrounds/backgrounds */                           input: 7,
  "input-foreground": 6.9,
  /** Outline / focus-ring colour */                                      ring: 6,
  /** Error & destructive messaging */                              destructive: 5,
  "destructive-foreground": 4.9,
  /** Subdued surface background */                                      muted: 4,
  /** Subdued surface text */                                "muted-foreground": 4,
  /** Accent highlight / tertiary CTA */                               accent: 3,
  "accent-foreground": 2.9,
  /** Shared low-elevation surfaces */                                    card: 2,
  popover: 2,
  /** Specific foregrounds for surfaces, if directly assigned */
  "card-foreground": 1.9,
  "popover-foreground": 1.9,

  "tooltip-background": 2,
  "chart-outline": 2,
  "chart-1": 1,
  "chart-2": 1,
  "chart-3": 1,
  "chart-4": 1,
  "chart-5": 1
} as const;

export type Role = keyof typeof influenceHierarchy;

export const SURFACE_ROLES: ReadonlySet<Role> = new Set<Role>([
  "background", "card", "popover", "input", "muted", "secondary", "primary", "destructive", "accent", "sidebar"
]);

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

export type LightnessStepKey = "bright" | "brighter" | "dark" | "darker";
export type OklchString = `oklch(${string})`;
export type ColorMixString = `color-mix(${string})`;

export interface Shade {
  variableName: string;
  value: OklchString | ColorMixString;
}

export interface ColorToken {
  name: string;
  variableName: string;
  description: string;
  oklch: OklchString;
  rawTokenSpecificName: string;
  roles: Role[];
  themeSteps: Partial<Record<LightnessStepKey, ColorMixString>>;
  category: 'color' | 'shade';
  onColor?: OklchString;
}

export interface FontToken {
  name: string;
  distributor: string;
  description: string;
  family: string;
  roles: string[];
  weights: Record<string, number>;
  fontWeights?: Record<string, string>;
  fontSizes?: Record<string, number>;
}

export interface Personality {
  vintageModern: number;
  seasonedYouthful: number;
  gracefulBold: number;
  playfulElegant: number;
  valueSmartLuxurious: number;
  structuredNatural: number;
  symbolicRealistic: number;
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

export interface StyleGuide {
  primaryColors: { primary: string; primaryForeground: string };
  secondaryColors: { secondary: string; secondaryForeground: string };
  accentColors: { accent: string; accentForeground: string };
  cardColors: { card: string; cardForeground: string };
  popoverColors: { popover: string; popoverForeground: string };
  mutedColors: { muted: string; mutedForeground: string };
  destructiveColors: { destructive: string; destructiveForeground: string };
  successColors: { success: string; successForeground: string };
  inputColors: { input: string; inputForeground?: string };
  borderColors: { border: string };
  ringColors: { ring: string };
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

export interface BusinessDetails {
  name: string;
  industry: string;
  personality: Personality;
}

export interface ThemeCssVars {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  success?: string;
  "success-foreground"?: string;

  sidebar?: string;
  "sidebar-foreground"?: string;
  "sidebar-primary"?: string;
  "sidebar-primary-foreground"?: string;
  "sidebar-accent"?: string;
  "sidebar-accent-foreground"?: string;
  "sidebar-border"?: string;
  "sidebar-ring"?: string;

  border: string;
  input: string;
  "input-foreground"?: string;
  ring: string;
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  chartOutline?: string;

  "radius-sm"?: string;
  "radius-md"?: string;
  "radius-lg"?: string;
  "radius-xl"?: string;
  radius?: string;
  "shadow-xs"?: string;
  "shadow-sm"?: string;
  "shadow-md"?: string;
  "shadow-lg"?: string;
  "shadow-xl"?: string;
  "border-width-default"?: string;
  "border-style-default"?: string;
  "default-card-border"?: string;
  "default-card-border-hover"?: string;

  "spacing-sm"?: string;
  "spacing-md"?: string;
  "spacing-lg"?: string;
  "spacing-xl"?: string;
}

/* Component style types (unchanged, trimmed only by grouping) */
export interface ComponentStateStyles {
  background?: string;
  backgroundImage?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderRadius?: string;
  boxShadow?: string;
  padding?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textTransform?: string;
  overlayImage?: string;
  showOverlay?: boolean;
  fontSize?: string;
  transform?: string;
  fontFamily?: string;
  cursor?: string;
  opacity?: number;
  minHeight?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  whiteSpace?: string;
  lineHeight?: string | number;
  border?: string;
  backdropFilter?: string;
  textDecoration?: string;
  textUnderlineOffset?: string;
}

export interface ButtonVariantStyles {
  default?: ComponentStateStyles;
  hover?: ComponentStateStyles;
  focus?: ComponentStateStyles;
  active?: ComponentStateStyles;
  disabled?: ComponentStateStyles;
}
export interface ButtonStyles {
  primary?: ButtonVariantStyles;
  secondary?: ButtonVariantStyles;
  ghost?: ButtonVariantStyles;
  destructive?: ButtonVariantStyles;
  outline?: ButtonVariantStyles;
  link?: ButtonVariantStyles;
  tertiary?: ButtonVariantStyles;
  quaternary?: ButtonVariantStyles;
  disabled?: ButtonVariantStyles;
  fontFamily?: string;
  fontSize?: string;
}
export interface InputStyles extends ComponentStateStyles {
  focus?: ComponentStateStyles;
  error?: ComponentStateStyles;
  disabled?: ComponentStateStyles;
  placeholderColor?: string;
  fontFamily?: string;
  fontSize?: string;
}
export interface CardComponentStyles extends ComponentStateStyles {
  header?: ComponentStateStyles & { titleColor?: string; descriptionColor?: string; };
  content?: ComponentStateStyles;
  footer?: ComponentStateStyles;
}
export interface BadgeStyles extends ComponentStateStyles {
  variantDefault?: ComponentStateStyles;
  variantDestructive?: ComponentStateStyles;
  variantSuccess?: ComponentStateStyles;
}
export interface NavStyles extends ComponentStateStyles { backdropFilter?: string; }
export interface HeroStyles extends ComponentStateStyles { backgroundSize?: string; backgroundPosition?: string; }
export interface TabsListStyles extends ComponentStateStyles {}
export interface TabsTriggerStyles extends ComponentStateStyles {
  textColorActive?: string; backgroundActive?: string; boxShadowActive?: string;
  textColor?: string; borderColor?: string;
}
export interface OverviewCardStyles extends ComponentStateStyles {}
export type ShowcaseCardStyles = Record<string, any>;
export type ShowcaseTitleStyles = Record<string, any>;
export interface BrandPickerContainerStyle extends ComponentStateStyles { marginTop?: string; marginBottom?: string; }
export interface PageCardStyles extends ComponentStateStyles {}
export interface TooltipStyles extends ComponentStateStyles { backdropFilter?: string; }
export interface ChartStyling {
  gridStrokeColor?: string; axisStrokeColor?: string; axisTextColor?: string;
  legendTextColor?: string; tooltipCursorFill?: string;
}
export interface LoadingIndicatorStyles extends ComponentStateStyles { textColor?: string; }
export interface ComponentStyles {
  nav?: NavStyles; hero?: HeroStyles;
  tabs?: { list?: TabsListStyles; trigger?: TabsTriggerStyles; };
  overviewCard?: OverviewCardStyles;
  chartShowcaseCard?: ShowcaseCardStyles; chartShowcaseTitle?: ShowcaseTitleStyles;
  componentShowcaseCard?: ShowcaseCardStyles; componentShowcaseTitle?: ShowcaseTitleStyles;
  brandPickerContainer?: BrandPickerContainerStyle;
  button?: ButtonStyles; input?: InputStyles; card?: CardComponentStyles;
  tokenShowcaseCard?: ShowcaseCardStyles; pageCard?: PageCardStyles;
  tooltip?: TooltipStyles; charts?: ChartStyling; loadingIndicator?: LoadingIndicatorStyles;
  badge?: BadgeStyles; tokenGroupCard?: ComponentStateStyles;
}
export interface ComponentShowcaseItem {
  id: string; name: string; description: string; displayComponent: string;
  variant?: string; state?: 'default' | 'hover' | 'focus' | 'active' | 'disabled';
}
export interface ComponentShowcaseConfig {
  title?: string; description?: string;
  interactiveElements?: ComponentShowcaseItem[]; forms?: ComponentShowcaseItem[];
  feedbackIndicators?: ComponentShowcaseItem[]; navigation?: ComponentShowcaseItem[];
  dataDisplay?: ComponentShowcaseItem[]; overlays?: ComponentShowcaseItem[];
  styleOverrides?: Record<string, string>;
}

/* Animation types */
export interface AnimationTiming { duration: string; easing: string; delay?: string; }
export interface AnimationTransform { scale?: string; translate?: string; transform?: string; }
export interface AnimationState extends AnimationTiming {
  transform?: AnimationTransform; boxShadow?: string; filter?: string; opacity?: string;
  border?: string; backgroundColor?: string; custom?: Record<string, string>;
}
export interface InteractiveAnimationConfig {
  default: AnimationState; hover: AnimationState; focus: AnimationState; active: AnimationState;
  disabled?: AnimationState;
  global?: { transition: string; transformOrigin?: string; willChange?: string; };
}
export interface VariantAnimationConfig {
  default?: InteractiveAnimationConfig; destructive?: InteractiveAnimationConfig;
  outline?: InteractiveAnimationConfig; secondary?: InteractiveAnimationConfig;
  ghost?: InteractiveAnimationConfig; link?: InteractiveAnimationConfig;
  global?: { transition: string; transformOrigin?: string; willChange?: string; };
}
export interface AnimationPreset {
  name: string; description: string;
  button: InteractiveAnimationConfig | VariantAnimationConfig;
  link: InteractiveAnimationConfig; input?: InteractiveAnimationConfig; card?: InteractiveAnimationConfig;
  globalClasses?: Record<string, string>; keyframes?: Record<string, string>;
}
export interface ThemeAnimationConfig {
  preset: AnimationPreset; overrides?: Partial<AnimationPreset>; rootClassName: string;
}

export interface Brand {
  businessDetails: BusinessDetails;
  colors: ColorToken[];
  fonts: FontToken[];
  style: StyleGuide;
  themeCssVariables: ThemeCssVars;
  name: string;
  sevenAxisCode: SevenAxisCode;
  componentStyles?: ComponentStyles;
  componentShowcase?: ComponentShowcaseConfig;
  animationConfig?: ThemeAnimationConfig;
}

export interface RawColorDefinition {
  tokenSpecificName: string;
  description: string;
  oklch: OklchString;
  roles: Role[];
  category: 'color' | 'shade';
  onColor?: OklchString;
}

/* ────────────────────────────────────────────────────────────
   Token factories
   ──────────────────────────────────────────────────────────── */

export const createColorToken = ({
  tokenSpecificName,
  description,
  oklch,
  roles,
  category,
  onColor,
}: RawColorDefinition,
_brandNameForPrefix: string
): ColorToken => {
  const cssFriendlyName = tokenSpecificName.toLowerCase().replace(/\s+/g, '-');
  const generateSteps = (baseVar: string): Partial<Record<LightnessStepKey, ColorMixString>> => ({
    bright:   `color-mix(in oklch, var(--${baseVar}) 92%, white 8%)` as ColorMixString,
    brighter: `color-mix(in oklch, var(--${baseVar}) 85%, white 15%)` as ColorMixString,
    dark:     `color-mix(in oklch, var(--${baseVar}) 92%, black 8%)` as ColorMixString,
    darker:   `color-mix(in oklch, var(--${baseVar}) 85%, black 15%)` as ColorMixString,
  });

  return {
    name: tokenSpecificName,
    variableName: cssFriendlyName,
    description,
    oklch,
    rawTokenSpecificName: tokenSpecificName,
    roles: roles.sort((a, b) => (influenceHierarchy[b] ?? 0) - (influenceHierarchy[a] ?? 0)),
    themeSteps: category === 'color' ? generateSteps(cssFriendlyName) : {},
    category,
    onColor,
  };
};

export const generateBrandColors = (
  brandNameForPrefix: string,
  rawColorDefinitions: RawColorDefinition[]
): ColorToken[] => {
  return rawColorDefinitions.map(raw => createColorToken(raw, brandNameForPrefix));
};

/* ────────────────────────────────────────────────────────────
   Resolvers & Theme CSS var mapping
   ──────────────────────────────────────────────────────────── */

export const resolveAbstractColorRef = (
  abstractRef: string,
  brandName: string,
  colorTokens: ColorToken[],
): string => {
  const [refTokenName, refStepKey = "base"] = abstractRef.split(':') as [string, LightnessStepKey | "base"];
  const targetToken = colorTokens.find(token => token.name === refTokenName || token.rawTokenSpecificName === refTokenName);

  if (!targetToken) {
    console.warn(`[resolveAbstractColorRef] "${refTokenName}" not found for brand "${brandName}".`);
    return "var(--fallback-color-not-found)";
  }
  if (refStepKey === "base") return `var(--${targetToken.variableName})`;

  const validStepKeys: LightnessStepKey[] = ["bright", "brighter", "dark", "darker"];
  if (validStepKeys.includes(refStepKey as LightnessStepKey)) {
    return `var(--${targetToken.variableName}-${refStepKey})`;
  }
  console.warn(`[resolveAbstractColorRef] Invalid step "${refStepKey}" for "${targetToken.name}"`);
  return `var(--${targetToken.variableName})`;
};

export const createThemeCssVars = (
  brandName: string,
  colorTokens: ColorToken[],
  style: StyleGuide,
  otherVars: {
    background: string;
    foreground: string;
    defaultCardBorder?: string;
    defaultCardBorderHover?: string;
    shadowXs?: string;
    shadowSm?: string;
    shadowMd?: string;
    shadowLg?: string;
    shadowXl?: string;
    borderWidthDefault?: string;
    borderStyleDefault?: string;
    chart1?: string;
    chart2?: string;
    chart3?: string;
    chart4?: string;
    chart5?: string;
    chartOutline?: string;
    radiusBase?: string;
  }
): ThemeCssVars => {
  const resolve = (ref: string | undefined) => {
    if (!ref) return undefined;
    const isNonColorCssValue =
      ref.startsWith("var(--") ||
      ["px", "rem", "em", "%", "solid", "dashed", "rgba", "hsla"].some(u => ref.includes(u));
    if (isNonColorCssValue) return ref;

    // IMPORTANT: keep the :step if provided (no stripping to base)
    return resolveAbstractColorRef(ref, brandName, colorTokens);
  };

  const cssVars: ThemeCssVars = {
    background: resolve(otherVars.background) || resolve(style.primaryColors.primary)!,
    foreground: resolve(otherVars.foreground) || resolve(style.primaryColors.primaryForeground)!,
    card: resolve(style.cardColors.card)!,
    "card-foreground": resolve(style.cardColors.cardForeground)!,
    popover: resolve(style.popoverColors.popover)!,
    "popover-foreground": resolve(style.popoverColors.popoverForeground)!,
    primary: resolve(style.primaryColors.primary)!,
    "primary-foreground": resolve(style.primaryColors.primaryForeground)!,
    secondary: resolve(style.secondaryColors.secondary)!,
    "secondary-foreground": resolve(style.secondaryColors.secondaryForeground)!,
    muted: resolve(style.mutedColors.muted)!,
    "muted-foreground": resolve(style.mutedColors.mutedForeground)!,
    accent: resolve(style.accentColors.accent)!,
    "accent-foreground": resolve(style.accentColors.accentForeground)!,
    destructive: resolve(style.destructiveColors.destructive)!,
    "destructive-foreground": resolve(style.destructiveColors.destructiveForeground)!,
    border: resolve(style.borderColors.border)!,
    input: resolve(style.inputColors.input)!,
    ring: resolve(style.ringColors.ring)!,
    "radius-sm": style.radius.radiusSm,
    "radius-md": style.radius.radiusMd,
    "radius-lg": style.radius.radiusLg,
    "radius-xl": style.radius.radiusXl,
    "spacing-sm": style.spacing.spacingSm,
    "spacing-md": style.spacing.spacingMd,
    "spacing-lg": style.spacing.spacingLg,
    "spacing-xl": style.spacing.spacingXl,
    "shadow-xs": otherVars.shadowXs,
    "shadow-sm": otherVars.shadowSm,
    "shadow-md": otherVars.shadowMd,
    "shadow-lg": otherVars.shadowLg,
    "shadow-xl": otherVars.shadowXl,
    "border-width-default": otherVars.borderWidthDefault,
    "border-style-default": otherVars.borderStyleDefault,
    "default-card-border": otherVars.defaultCardBorder,
    "default-card-border-hover": otherVars.defaultCardBorderHover,
    chart1: resolve(otherVars.chart1),
    chart2: resolve(otherVars.chart2),
    chart3: resolve(otherVars.chart3),
    chart4: resolve(otherVars.chart4),
    chart5: resolve(otherVars.chart5),
    chartOutline: resolve(otherVars.chartOutline),
    radius: otherVars.radiusBase,
  };

  if (style.successColors) {
    cssVars.success = resolve(style.successColors.success);
    cssVars["success-foreground"] = resolve(style.successColors.successForeground);
  }
  if (style.inputColors.inputForeground) {
    cssVars["input-foreground"] = resolve(style.inputColors.inputForeground);
  }
  return cssVars;
};

/* ────────────────────────────────────────────────────────────
   Color conversion helpers (OKLCH → HSL triplets for shadcn)
   ──────────────────────────────────────────────────────────── */

const toHsl = converter<'hsl'>('hsl');
const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

/** Format culori HSL to "H S% L%" triplet (what shadcn expects in CSS vars). */
export function oklchToHslTriplet(oklchStr: OklchString): string {
  const c = parse(oklchStr);
  const hsl = c ? toHsl(c) : null;
  if (!hsl || isNaN(hsl.h!) || isNaN(hsl.s!) || isNaN(hsl.l!)) {
    return `28 95% 50%`; // safe warm fallback
  }
  const H = Math.round(((hsl.h ?? 0) + 360) % 360);
  const S = clamp((hsl.s ?? 0) * 100);
  const L = clamp((hsl.l ?? 0) * 100);
  return `${H} ${S}% ${L}%`;
}

const extractCssVarName = (v?: string) =>
  v && v.startsWith('var(--') && v.endsWith(')') ? v.slice(6, -1) : undefined;

function findTokenForCssVar(tokens: ColorToken[], cssVarOrName?: string): ColorToken | undefined {
  if (!cssVarOrName) return undefined;
  const varName = cssVarOrName.startsWith('var(--') ? extractCssVarName(cssVarOrName) : cssVarOrName;
  return tokens.find(t => t.variableName === varName || t.name === cssVarOrName);
}

function resolveRoleToHslTriplet(roleKey: keyof ThemeCssVars, tokens: ColorToken[], ov: ThemeCssVars): string | undefined {
  const ref = ov[roleKey];
  const token = findTokenForCssVar(tokens, ref);
  return token ? oklchToHslTriplet(token.oklch as OklchString) : undefined;
}

function emitRoleStepAliases(
  roleKey: keyof ThemeCssVars,
  tokens: ColorToken[],
  ov: ThemeCssVars,
  add: (s: string, i?: number) => void
) {
  const ref = ov[roleKey];
  const token = findTokenForCssVar(tokens, ref);
  if (!token || token.category !== 'color') return;
  (['bright','brighter','dark','darker'] as LightnessStepKey[]).forEach(step => {
    const stepExists = token.themeSteps?.[step];
    if (stepExists) add(`--${roleKey}-${step}: var(--${token.variableName}-${step});`, 2);
  });
}

/* ────────────────────────────────────────────────────────────
   CSS Generators
   ──────────────────────────────────────────────────────────── */

/**
 * New: Tailwind v4 + shadcn/ui globals.css generator.
 * - OKLCH foundations remain as-is
 * - shadcn tokens are emitted as HSL triplets (H S% L%)
 * - Dark theme as default; optional light override via `.light` or `[data-theme="light"]`
 */
export const generateGlobalCssV2 = (brand: Brand, options?: {
  emitLightTheme?: boolean;
  lightOverrides?: Partial<Record<keyof ThemeCssVars, string>>;
}) => {
  const { colors: tokens, themeCssVariables: ov } = brand;
  const emitLight = options?.emitLightTheme ?? true;

  let css = '';
  const add = (line: string, i = 0) => (css += `${'  '.repeat(i)}${line}\n`);

  /* Header + Tailwind layers */
  add('/* ──────────────────────────────────────────────────────────── */');
  add('/* globals.css · Tailwind v4 + shadcn/ui from Brand definition  */');
  add('/* Foundations in OKLCH, shadcn tokens in HSL triplets          */');
  add('/* ──────────────────────────────────────────────────────────── */\n');
  add('@import "tailwindcss";\n');
  add('@layer base, components, utilities;\n');

  /* 1) Foundations (OKLCH) + mix steps */
  add('@layer base {');
  add(':root {', 1);
  add('/* ——— Foundation swatches (OKLCH) ——— */', 2);
  brand.colors.forEach(tok => add(`--${tok.variableName}: ${tok.oklch};`, 2));

  const hasSage2 = tokens.some(t => t.variableName === 'sage-2');
  if (hasSage2) add(`--sage-3: color-mix(in oklch, var(--sage-2) 70%, black 25%);`, 2);
  if (tokens.some(t => t.variableName === 'graphite'))
    add(`--graphite-strong: color-mix(in oklch, var(--graphite) 55%, black 45%);`, 2);

  add('', 2);
  add('/* ——— Color-mix steps (OKLCH) ——— */', 2);
  tokens.forEach(tok => {
    if (tok.category === 'color' && tok.themeSteps) {
      (Object.keys(tok.themeSteps) as LightnessStepKey[]).forEach(step => {
        add(`--${tok.variableName}-${step}: ${tok.themeSteps![step]};`, 2);
      });
    }
  });

  /* 2) Semantic HSL triplets (dark default) */
  add('', 2);
  add('/* ——— Semantic tokens (HSL triplets for shadcn) ——— */', 2);
  const roles: (keyof ThemeCssVars)[] = [
    'background','foreground','card','card-foreground','popover','popover-foreground',
    'primary','primary-foreground','secondary','secondary-foreground',
    'muted','muted-foreground','accent','accent-foreground',
    'destructive','destructive-foreground','success','success-foreground',
    'border','input','input-foreground','ring',
    'chart1','chart2','chart3','chart4','chart5','chartOutline',
    'sidebar','sidebar-foreground','sidebar-primary','sidebar-primary-foreground',
    'sidebar-accent','sidebar-accent-foreground','sidebar-border','sidebar-ring'
  ];
  const writeRoleHsl = (key: keyof ThemeCssVars) => {
    const triplet = resolveRoleToHslTriplet(key, tokens, ov);
    if (triplet) add(`--${key}: ${triplet};`, 2);
  };
  roles.forEach(writeRoleHsl);

  // Step aliases
  (['primary','secondary','accent','destructive','success','ring','chart1','chart2','chart3','chart4','chart5'] as (keyof ThemeCssVars)[])
    .forEach(role => emitRoleStepAliases(role, tokens, ov, add));

  // Typo/radii/shadows
  add('', 2);
  add('/* Typography + radii + shadows */', 2);
  add(`--font-sans: ${brand.fonts.find(f=>f.roles.includes('sans'))?.family ?? "ui-sans-serif, system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial"};`, 2);
  add(`--font-mono: ${brand.fonts.find(f=>f.roles.includes('mono'))?.family ?? "ui-monospace, 'Fira Code', 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas"};`, 2);
  add(`--radius: ${brand.themeCssVariables.radius ?? '0.75rem'};`, 2);
  ['shadow-xs','shadow-sm','shadow-md','shadow-lg','shadow-xl'].forEach(sh => {
    const v = (brand.themeCssVariables as any)[sh];
    if (v) add(`--${sh}: ${v};`, 2);
  });

  add('color-scheme: dark;', 2);
  add('}', 1); // end :root

  /* 3) Optional light overrides */
  if (emitLight) {
    add('', 1);
    add('.light, [data-theme="light"] {', 1);
    roles.forEach(key => {
      const override = options?.lightOverrides?.[key];
      if (override) {
        const tok = findTokenForCssVar(tokens, override);
        const trip = tok ? oklchToHslTriplet(tok.oklch as OklchString) : override;
        add(`--${key}: ${trip};`, 2);
      }
    });
    add('color-scheme: light;', 2);
    add('}', 1);
  }

  add('}', 0); // end @layer base

  /* 4) Base resets / focus / type */
  add('');
  add('@layer base {');
  add('* { @apply border-border; }', 1);
  add('html { @apply antialiased; text-rendering: optimizeLegibility; }', 1);
  add('body { @apply bg-background text-foreground; font-family: var(--font-sans); }', 1);
  add('::selection { background-color: hsl(var(--primary) / 0.18); color: hsl(var(--foreground)); }', 1);
  add('h1,h2,h3,h4 { @apply tracking-tight text-balance; }', 1);
  add('h1 { @apply text-4xl md:text-5xl font-bold; }', 1);
  add('h2 { @apply text-3xl md:text-4xl font-semibold; }', 1);
  add('h3 { @apply text-2xl md:text-3xl font-semibold; }', 1);
  add('h4 { @apply text-xl md:text-2xl font-medium; }', 1);
  add('p { @apply leading-7; }', 1);
  add('p + p { @apply mt-4; }', 1);
  add(':where(button,[role="button"],input,select,textarea,a,summary):focus-visible {', 1);
  add('outline: none;', 2);
  add('box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));', 2);
  add('border-radius: var(--radius);', 2);
  add('}', 1);

  // Typography role mappings (CSS variable-driven)
  add('', 1);
  add('/* Typography role mappings driven by CSS variables */', 1);

  // Headings
  add('h1, [data-typography-role="h1"] {', 1);
  add('  font-family: var(--font-h1, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h1, 700);', 2);
  add('  font-size: var(--font-size-h1, 2.25rem);', 2);
  add('  line-height: var(--line-height-h1, 1.1);', 2);
  add('  letter-spacing: var(--letter-spacing-h1, 0em);', 2);
  add('}', 1);

  add('h2, [data-typography-role="h2"] {', 1);
  add('  font-family: var(--font-h2, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h2, 700);', 2);
  add('  font-size: var(--font-size-h2, 1.875rem);', 2);
  add('  line-height: var(--line-height-h2, 1.15);', 2);
  add('  letter-spacing: var(--letter-spacing-h2, 0em);', 2);
  add('}', 1);

  add('h3, [data-typography-role="h3"] {', 1);
  add('  font-family: var(--font-h3, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h3, 600);', 2);
  add('  font-size: var(--font-size-h3, 1.5rem);', 2);
  add('  line-height: var(--line-height-h3, 1.2);', 2);
  add('  letter-spacing: var(--letter-spacing-h3, 0em);', 2);
  add('}', 1);

  add('h4, [data-typography-role="h4"] {', 1);
  add('  font-family: var(--font-h4, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h4, 600);', 2);
  add('  font-size: var(--font-size-h4, 1.25rem);', 2);
  add('  line-height: var(--line-height-h4, 1.25);', 2);
  add('  letter-spacing: var(--letter-spacing-h4, 0em);', 2);
  add('}', 1);

  add('h5, [data-typography-role="h5"] {', 1);
  add('  font-family: var(--font-h5, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h5, 600);', 2);
  add('  font-size: var(--font-size-h5, 1.125rem);', 2);
  add('  line-height: var(--line-height-h5, 1.3);', 2);
  add('  letter-spacing: var(--letter-spacing-h5, 0em);', 2);
  add('}', 1);

  add('h6, [data-typography-role="h6"] {', 1);
  add('  font-family: var(--font-h6, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h6, 600);', 2);
  add('  font-size: var(--font-size-h6, 1rem);', 2);
  add('  line-height: var(--line-height-h6, 1.35);', 2);
  add('  letter-spacing: var(--letter-spacing-h6, 0em);', 2);
  add('}', 1);

  // Paragraph-like text (avoid styling bare span)
  add('p, li, [data-typography-role="p"], [data-typography-role="span"], [data-typography-role="default"], [data-typography-role="div"] {', 1);
  add('  font-family: var(--font-p, var(--font-body));', 2);
  add('  font-weight: var(--font-weight-p, 400);', 2);
  add('  font-size: var(--font-size-p, 1rem);', 2);
  add('  line-height: var(--line-height-p, var(--line-height-body, 1.5));', 2);
  add('  letter-spacing: var(--letter-spacing-p, var(--letter-spacing-body, 0em));', 2);
  add('}', 1);

  // Blockquote
  add('blockquote, [data-typography-role="blockquote"] {', 1);
  add('  font-family: var(--font-blockquote, var(--font-body));', 2);
  add('  font-weight: var(--font-weight-blockquote, var(--font-weight-p, 400));', 2);
  add('  font-size: var(--font-size-blockquote, var(--font-size-p, 1rem));', 2);
  add('  line-height: var(--line-height-blockquote, var(--line-height-p, var(--line-height-body, 1.5)));', 2);
  add('  letter-spacing: var(--letter-spacing-blockquote, var(--letter-spacing-p, 0em));', 2);
  add('}', 1);

  // Buttons
  add('[data-slot="button"], button, [data-typography-role="button"] {', 1);
  add('  font-family: var(--font-button, var(--font-body));', 2);
  add('  font-weight: var(--font-weight-button, 600);', 2);
  add('  font-size: var(--font-size-button, 0.875rem);', 2);
  add('  line-height: var(--line-height-button, 1.2);', 2);
  add('  letter-spacing: var(--letter-spacing-button, 0em);', 2);
  add('}', 1);

  // Scoped overrides inside preview to beat Tailwind utilities
  add('', 1);
  add('/* Scoped role overrides for preview (force precedence over utility classes) */', 1);

  const scoped = (sel: string, role: string, fallbackSize: string) => {
    add(`[data-typography-scope] ${sel}, [data-typography-scope] [data-typography-role="${role}"] {`, 1);
    add(`  font-family: var(--font-${role}, var(--font-${role === 'p' ? 'body' : (role.startsWith('h') ? 'heading' : role)}, var(--font-body))) !important;`, 2);
    add(`  font-weight: var(--font-weight-${role}, ${role.startsWith('h') ? '700' : (role === 'button' ? '600' : '400')}) !important;`, 2);
    add(`  font-size: var(--font-size-${role}, ${fallbackSize}) !important;`, 2);
    add(`  line-height: var(--line-height-${role}, ${role.startsWith('h') ? '1.2' : (role === 'button' ? '1.2' : '1.5')}) !important;`, 2);
    add(`  letter-spacing: var(--letter-spacing-${role}, 0em) !important;`, 2);
    add('}', 1);
  };

  scoped('h1', 'h1', '2.25rem');
  scoped('h2', 'h2', '1.875rem');
  scoped('h3', 'h3', '1.5rem');
  scoped('h4', 'h4', '1.25rem');
  scoped('h5', 'h5', '1.125rem');
  scoped('h6', 'h6', '1rem');
  scoped('p, li', 'p', '1rem');
  scoped('blockquote', 'blockquote', '1rem');
  scoped('[data-slot="button"], button', 'button', '0.875rem');

  add('}', 0);

  /* 5) Tailwind @theme inline: map utilities to tokens */
  add('');
  add('@theme inline {');
  const semantic = [
    'background','foreground','card','card-foreground','popover','popover-foreground',
    'muted','muted-foreground','border','input','ring',
    'primary','primary-foreground','secondary','secondary-foreground',
    'accent','accent-foreground','destructive','destructive-foreground'
  ];
  semantic.forEach(key => add(`--color-${key}: hsl(var(--${key}));`, 1));

  ['chart1','chart2','chart3','chart4','chart5','chartOutline'].forEach(k => {
    add(`--color-${k.replace('chart','chart-')}: hsl(var(--${k}));`, 1);
  });

  // expose foundations as raw variables (handy)
  tokens.forEach(t => add(`--color-${t.variableName}: var(--${t.variableName});`, 1));

  // radii passthrough for @apply
  add('--radius-sm: 2px;', 1);
  add('--radius-md: 3px;', 1);
  add('--radius-lg: 4px;', 1);
  add('--radius-xl: 6px;', 1);
  add('}', 0);

  /* 6) Component primitives */
  add('');
  add('@layer components {');
  add('.surface { @apply bg-card text-card-foreground border rounded-xl; }', 1);
  add('.muted-surface { @apply bg-muted text-muted-foreground rounded-xl; }', 1);
  add('.interactive { @apply transition-colors duration-150; }', 1);
  add('.interactive:hover { @apply bg-accent text-accent-foreground; }', 1);
  add('}', 0);

  return css;
};

/**
 * Back-compat shim: original API name.
 * Delegates to V2 with defaults (light theme enabled but no overrides).
 */
export const generateGlobalCss = (brand: Brand): string => {
  return generateGlobalCssV2(brand, { emitLightTheme: true });
};

/* ────────────────────────────────────────────────────────────
   Animation CSS generator (unchanged except tiny hygiene)
   ──────────────────────────────────────────────────────────── */

export const generateAnimationCss = (animationConfig: ThemeAnimationConfig): string => {
  const { preset, rootClassName } = animationConfig;
  let css = '';
  const addLine = (line: string, indentLevel = 0) => { css += `${'  '.repeat(indentLevel)}${line}\n`; };

  // Universal animation reset
  addLine(`/* Universal animation reset - prevents style bleeding between themes */`);
  addLine(`[data-slot="button"]:not([class*="link"]) {`);
  addLine(`box-shadow: none !important;`, 1);
  addLine(`transform: translate(0px, 0px) !important;`, 1);
  addLine(`transition: all 200ms ease !important;`, 1);
  addLine(`}`, 0);

  const universalStates = ['', ':hover:not(:disabled)', ':focus-visible:not(:disabled)', ':active:not(:disabled)', ':disabled'];
  universalStates.forEach(state => {
    addLine(`[data-slot="button"]:not([class*="link"])${state} {`);
    addLine(`box-shadow: ${state === ':focus-visible:not(:disabled)' ? '0 0 0 2px var(--ring)' : 'none'} !important;`, 1);
    addLine(`transform: translate(0px, 0px) !important;`, 1);
    addLine(`}`, 0);
  });
  addLine('');

  // Theme-specific base
  addLine(`/* Theme-specific styles for ${preset.name} */`);
  addLine(`.${rootClassName} [data-slot="button"]:not([class*="link"]) {`);
  if ((preset.button as any)?.global?.transition) {
    addLine(`transition: ${(preset.button as any).global.transition} !important;`, 1);
  }
  if ((preset.button as any)?.global?.transformOrigin) {
    addLine(`transform-origin: ${(preset.button as any).global.transformOrigin} !important;`, 1);
  }
  if ((preset.button as any)?.global?.willChange) {
    addLine(`will-change: ${(preset.button as any).global.willChange} !important;`, 1);
  }
  addLine(`}`, 0);
  addLine('');

  // Keyframes
  if (preset.keyframes) {
    Object.values(preset.keyframes).forEach(keyframe => {
      addLine(keyframe);
      addLine('');
    });
  }
  // Global classes
  if (preset.globalClasses) {
    Object.entries(preset.globalClasses).forEach(([className, styles]) => {
      addLine(`.${rootClassName} .${className} {`);
      addLine(styles, 1);
      addLine('}');
      addLine('');
    });
  }

  // Helpers
  const generateComponentCss = (componentName: string, componentConfig: InteractiveAnimationConfig) => {
    addLine(`/* ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} animations for ${preset.name} theme */`);
    const states = ['default', 'hover', 'focus', 'active', 'disabled'] as const;
    states.forEach(state => {
      const stateConfig = componentConfig[state];
      if (!stateConfig) return;
      let selector = `.${rootClassName} [data-slot="${componentName}"]`;
      if (componentName === 'button') selector += ':not([class*="link"])';
      switch (state) {
        case 'hover': selector += ':hover:not(:disabled)'; break;
        case 'focus': selector += ':focus-visible:not(:disabled)'; break;
        case 'active': selector += ':active:not(:disabled)'; break;
        case 'disabled': selector += ':disabled'; break;
      }
      addLine(`${selector} {`);
      if (stateConfig.transform) {
        const { scale, translate, transform } = stateConfig.transform;
        let transformValue = transform ?? [
          translate ? translate : '',
          scale ? `scale(${scale})` : ''
        ].filter(Boolean).join(' ');
        if (transformValue) addLine(`transform: ${transformValue} !important;`, 1);
      }
      if (stateConfig.boxShadow) {
        const normalizedBoxShadow = stateConfig.boxShadow.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
        addLine(`box-shadow: ${normalizedBoxShadow} !important;`, 1);
      }
      if (stateConfig.opacity) addLine(`opacity: ${stateConfig.opacity} !important;`, 1);
      if (stateConfig.backgroundColor) addLine(`background-color: ${stateConfig.backgroundColor} !important;`, 1);
      if (stateConfig.border) addLine(`border: ${stateConfig.border} !important;`, 1);
      if (stateConfig.filter) addLine(`filter: ${stateConfig.filter} !important;`, 1);
      if (stateConfig.custom) Object.entries(stateConfig.custom).forEach(([prop, value]) => addLine(`${prop}: ${value} !important;`, 1));
      addLine('}');
      addLine('');
    });
  };

  const isVariantAnimationConfig = (config: InteractiveAnimationConfig | VariantAnimationConfig): config is VariantAnimationConfig =>
    'default' in config || 'destructive' in config || 'outline' in config || 'secondary' in config || 'ghost' in config;

  const generateVariantSpecificCss = (componentName: string, variantConfig: VariantAnimationConfig) => {
    addLine(`/* ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} variant-specific animations for ${preset.name} theme */`);
    const buttonVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost'] as const;
    buttonVariants.forEach(variant => {
      const config = variantConfig[variant];
      if (!config) return;
      const states = ['default', 'hover', 'focus', 'active', 'disabled'] as const;
      states.forEach(state => {
        const stateConfig = config[state];
        if (!stateConfig) return;
        let selector = `.${rootClassName} [data-slot="${componentName}"][data-variant="${variant}"]`;
        switch (state) {
          case 'hover': selector += ':hover:not(:disabled)'; break;
          case 'focus': selector += ':focus-visible:not(:disabled)'; break;
          case 'active': selector += ':active:not(:disabled)'; break;
          case 'disabled': selector += ':disabled'; break;
        }
        addLine(`${selector} {`);
        if (stateConfig.transform) {
          const { scale, translate, transform } = stateConfig.transform;
          let transformValue = transform ?? [
            translate ? translate : '',
            scale ? `scale(${scale})` : ''
          ].filter(Boolean).join(' ');
          if (transformValue) addLine(`transform: ${transformValue} !important;`, 1);
        }
        if (stateConfig.boxShadow) {
          const normalizedBoxShadow = stateConfig.boxShadow.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
          addLine(`box-shadow: ${normalizedBoxShadow} !important;`, 1);
        }
        if (stateConfig.opacity) addLine(`opacity: ${stateConfig.opacity} !important;`, 1);
        if (stateConfig.backgroundColor) addLine(`background-color: ${stateConfig.backgroundColor} !important;`, 1);
        if (stateConfig.border) addLine(`border: ${stateConfig.border} !important;`, 1);
        if (stateConfig.filter) addLine(`filter: ${stateConfig.filter} !important;`, 1);
        if (stateConfig.custom) Object.entries(stateConfig.custom).forEach(([prop, value]) => addLine(`${prop}: ${value} !important;`, 1));
        addLine('}');
        addLine('');
      });
    });
  };

  // Emit
  if (isVariantAnimationConfig(preset.button)) {
    generateVariantSpecificCss('button', preset.button);
    if (preset.button.global) {
      addLine(`/* Global button styles for ${preset.name} theme */`);
      addLine(`.${rootClassName} [data-slot="button"] {`);
      if (preset.button.global.transition) addLine(`transition: ${preset.button.global.transition} !important;`, 1);
      if (preset.button.global.transformOrigin) addLine(`transform-origin: ${preset.button.global.transformOrigin} !important;`, 1);
      if (preset.button.global.willChange) addLine(`will-change: ${preset.button.global.willChange} !important;`, 1);
      addLine(`}`, 0);
      addLine('');
    }
  } else {
    generateComponentCss('button', preset.button as InteractiveAnimationConfig);
  }
  generateComponentCss('link', preset.link);
  if (preset.input) generateComponentCss('input', preset.input);
  if (preset.card) generateComponentCss('card', preset.card);

  return css;
};

/* ────────────────────────────────────────────────────────────
   Contrast helpers
   ──────────────────────────────────────────────────────────── */

/**
 * Returns near-black or near-white text color (OKLCH) with better contrast.
 */
export const getHighContrastTextColor = (backgroundColor: string): OklchString => {
  try {
    const onWhiteContrast = wcagContrast(backgroundColor, 'white');
    const onBlackContrast = wcagContrast(backgroundColor, 'black');
    return (onWhiteContrast > onBlackContrast) ? 'oklch(0.98 0 0)' : 'oklch(0.15 0 0)';
  } catch (e) {
    console.error("Failed to parse color for contrast check:", backgroundColor, e);
    return 'oklch(0.15 0 0)';
  }
};
