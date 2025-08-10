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

    const colorNameOnly = ref.split(':')[0];
    return resolveAbstractColorRef(colorNameOnly, brandName, colorTokens);
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
   CSS Generators (runtime-safe; NO Tailwind directives)
   ──────────────────────────────────────────────────────────── */

/**
 * Tailwind/shadcn-compatible globals.css generator (runtime-safe).
 * - OKLCH foundations stay as OKLCH
 * - shadcn semantic tokens emitted as HSL triplets (H S% L%)
 * - Dark is default; optional light override via `.light` / `[data-theme="light"]`
 * - Typography is variable-driven (no utilities / @apply)
 */
export const generateGlobalCssV2 = (brand: Brand, options?: {
  emitLightTheme?: boolean;
  lightOverrides?: Partial<Record<keyof ThemeCssVars, string>>;
}) => {
  const { colors: tokens, themeCssVariables: ov } = brand;
  const emitLight = options?.emitLightTheme ?? true;

  let css = '';
  const add = (line: string, i = 0) => (css += `${'  '.repeat(i)}${line}\n`);

  /* Header */
  add('/* ──────────────────────────────────────────────────────────── */');
  add('/* globals.css · Runtime-safe CSS from Brand definition          */');
  add('/* Foundations in OKLCH, shadcn tokens in HSL triplets           */');
  add('/* ──────────────────────────────────────────────────────────── */\n');

  /* 1) Foundations (OKLCH) + mix steps + semantic tokens */
  add(':root {');
  add('/* ——— Foundation swatches (OKLCH) ——— */', 1);
  brand.colors.forEach(tok => add(`--${tok.variableName}: ${tok.oklch};`, 1));

  const hasSage2 = tokens.some(t => t.variableName === 'sage-2');
  if (hasSage2) add(`--sage-3: color-mix(in oklch, var(--sage-2) 70%, black 25%);`, 1);
  if (tokens.some(t => t.variableName === 'graphite'))
    add(`--graphite-strong: color-mix(in oklch, var(--graphite) 55%, black 45%);`, 1);

  add('', 1);
  add('/* ——— Color-mix steps (OKLCH) ——— */', 1);
  tokens.forEach(tok => {
    if (tok.category === 'color' && tok.themeSteps) {
      (Object.keys(tok.themeSteps) as LightnessStepKey[]).forEach(step => {
        add(`--${tok.variableName}-${step}: ${tok.themeSteps![step]};`, 1);
      });
    }
  });

  add('', 1);
  add('/* ——— Semantic tokens (HSL triplets for shadcn) ——— */', 1);
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
    if (triplet) add(`--${key}: ${triplet};`, 1);
  };
  roles.forEach(writeRoleHsl);

  // step aliases
  (['primary','secondary','accent','destructive','success','ring','chart1','chart2','chart3','chart4','chart5'] as (keyof ThemeCssVars)[])
    .forEach(role => emitRoleStepAliases(role, tokens, ov, add));

  // Fonts / radii / shadows (variables only)
  const fontSans = brand.fonts.find(f => f.roles.includes('sans'))?.family
                || brand.fonts.find(f => f.roles.includes('body'))?.family
                || "ui-sans-serif, system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
  const fontMono = brand.fonts.find(f => f.roles.includes('mono'))?.family
                || "ui-monospace, 'Fira Code', 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas";
  const fontHeading = brand.fonts.find(f => f.roles.includes('heading'))?.family
                   || brand.fonts.find(f => f.roles.includes('display'))?.family
                   || fontSans;

  add('', 1);
  add('/* Typography + radii + shadows (variables only) */', 1);
  add(`--font-body: ${fontSans};`, 1);
  add(`--font-sans: var(--font-body);`, 1);
  add(`--font-heading: ${fontHeading};`, 1);
  add(`--font-display: var(--font-heading);`, 1);
  add(`--font-mono: ${fontMono};`, 1);
  add(`--radius: ${brand.themeCssVariables.radius ?? '0.75rem'};`, 1);
  ['shadow-xs','shadow-sm','shadow-md','shadow-lg','shadow-xl'].forEach(sh => {
    const v = (brand.themeCssVariables as any)[sh];
    if (v) add(`--${sh}: ${v};`, 1);
  });

  add('color-scheme: dark;', 1);
  add('}'); // end :root

  /* 2) Optional light overrides (only semantic colors) */
  if (emitLight) {
    add('');
    add('.light, [data-theme="light"] {');
    roles.forEach(key => {
      const override = options?.lightOverrides?.[key];
      if (override) {
        const tok = findTokenForCssVar(tokens, override);
        const trip = tok ? oklchToHslTriplet(tok.oklch as OklchString) : override;
        add(`--${key}: ${trip};`, 1);
      }
    });
    add('color-scheme: light;', 1);
    add('}');
  }

  /* 3) Base resets (pure CSS) */
  add('');
  add('/* Base / reset */');
  add('*, *::before, *::after { border-color: hsl(var(--border)); }');
  add('html { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }');
  add('body { background: hsl(var(--background)); color: hsl(var(--foreground)); font-family: var(--font-sans); margin: 0; }');
  add('::selection { background-color: hsl(var(--primary) / 0.18); color: hsl(var(--foreground)); }');
  add(':where(button,[role="button"],input,select,textarea,a,summary):focus-visible { outline: none; box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring)); border-radius: var(--radius); }');

  /* 4) Typography consumption (variable-driven) */
  add('');
  add('/* Typography (variable-driven; override-friendly) */');
  const heading = (n: 1|2|3|4|5|6, size: string, weightFallback = 600, lh = 1.2, ls = '0em') => {
    add(`h${n} {`);
    add(`font-family: var(--font-h${n}, var(--font-heading));`, 1);
    add(`font-weight: var(--font-weight-h${n}, ${weightFallback});`, 1);
    add(`font-size: var(--font-size-h${n}, ${size});`, 1);
    add(`line-height: var(--line-height-h${n}, var(--line-height-heading, ${lh}));`, 1);
    add(`letter-spacing: var(--letter-spacing-h${n}, var(--letter-spacing-heading, ${ls}));`, 1);
    add('}');
  };
  heading(1, '2.25rem', 700, 1.1);
  heading(2, '1.875rem', 700, 1.15);
  heading(3, '1.5rem', 600, 1.2);
  heading(4, '1.25rem', 600, 1.25);
  heading(5, '1.125rem', 600, 1.3);
  heading(6, '1rem', 600, 1.35);

  add('p { font-family: var(--font-p, var(--font-body)); font-weight: var(--font-weight-p, 400); font-size: var(--font-size-p, 1rem); line-height: var(--line-height-p, var(--line-height-body, 1.5)); letter-spacing: var(--letter-spacing-p, var(--letter-spacing-body, 0em)); }');
  add('p + p { margin-top: 1rem; }');
  add('blockquote { font-family: var(--font-blockquote, var(--font-body)); font-weight: var(--font-weight-blockquote, var(--font-weight-p, 400)); font-size: var(--font-size-blockquote, var(--font-size-p, 1rem)); line-height: var(--line-height-blockquote, var(--line-height-p, var(--line-height-body, 1.5))); letter-spacing: var(--letter-spacing-blockquote, var(--letter-spacing-p, var(--letter-spacing-body, 0em))); margin: 0; padding: 0; font-style: normal; quotes: none; border: 0; text-indent: 0; }');
  add('[data-slot="button"], button { font-family: var(--font-button, var(--font-body)); font-weight: var(--font-weight-button, 600); font-size: var(--font-size-button, 0.875rem); line-height: var(--line-height-button, 1.2); }');

  /* 5) Simple component primitives (pure CSS) */
  add('');
  add('/* Component primitives */');
  add('.surface { background: hsl(var(--card)); color: hsl(var(--card-foreground)); border: var(--border-width-default,1px) var(--border-style-default,solid) hsl(var(--border)); border-radius: var(--radius-xl, 0.75rem); }');
  add('.muted-surface { background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); border-radius: var(--radius-xl, 0.75rem); }');
  add('.interactive { transition: color 150ms, background-color 150ms, border-color 150ms, box-shadow 150ms; }');
  add('.interactive:hover { background: hsl(var(--accent)); color: hsl(var(--accent-foreground)); }');

  return css;
};

/** Back-compat alias */
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
  addLine(`}`);

  const universalStates = ['', ':hover:not(:disabled)', ':focus-visible:not(:disabled)', ':active:not(:disabled)', ':disabled'];
  universalStates.forEach(state => {
    addLine(`[data-slot="button"]:not([class*="link"])${state} {`);
    addLine(`box-shadow: ${state === ':focus-visible:not(:disabled)' ? '0 0 0 2px var(--ring)' : 'none'} !important;`, 1);
    addLine(`transform: translate(0px, 0px) !important;`, 1);
    addLine(`}`);
  });
  addLine('');

  // Theme-specific base
  addLine(`/* Theme-specific styles for ${preset.name} */`);
  addLine(`.${rootClassName} [data-slot="button"]:not([class*="link"]) {`);
  if ((preset.button as any)?.global?.transition) addLine(`transition: ${(preset.button as any).global.transition} !important;`, 1);
  if ((preset.button as any)?.global?.transformOrigin) addLine(`transform-origin: ${(preset.button as any).global.transformOrigin} !important;`, 1);
  if ((preset.button as any)?.global?.willChange) addLine(`will-change: ${(preset.button as any).global.willChange} !important;`, 1);
  addLine(`}`);
  addLine('');

  if (preset.keyframes) {
    Object.values(preset.keyframes).forEach(keyframe => {
      addLine(keyframe);
      addLine('');
    });
  }
  if (preset.globalClasses) {
    Object.entries(preset.globalClasses).forEach(([className, styles]) => {
      addLine(`.${rootClassName} .${className} {`);
      addLine(styles, 1);
      addLine('}');
      addLine('');
    });
  }

  const generateComponentCss = (componentName: string, componentConfig: any) => {
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
        let transformValue = transform ?? [translate ? translate : '', scale ? `scale(${scale})` : ''].filter(Boolean).join(' ');
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

  const isVariantAnimationConfig = (config: any): config is any =>
    'default' in config || 'destructive' in config || 'outline' in config || 'secondary' in config || 'ghost' in config;

  const generateVariantSpecificCss = (componentName: string, variantConfig: any) => {
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
          let transformValue = transform ?? [translate ? translate : '', scale ? `scale(${scale})` : ''].filter(Boolean).join(' ');
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

  if (isVariantAnimationConfig(preset.button)) {
    generateVariantSpecificCss('button', preset.button);
    if (preset.button.global) {
      addLine(`/* Global button styles for ${preset.name} theme */`);
      addLine(`.${rootClassName} [data-slot="button"] {`);
      if (preset.button.global.transition) addLine(`transition: ${preset.button.global.transition} !important;`, 1);
      if (preset.button.global.transformOrigin) addLine(`transform-origin: ${preset.button.global.transformOrigin} !important;`, 1);
      if (preset.button.global.willChange) addLine(`will-change: ${preset.button.global.willChange} !important;`, 1);
      addLine(`}`);
      addLine('');
    }
  } else {
    generateComponentCss('button', preset.button);
  }
  generateComponentCss('link', preset.link);
  if (preset.input) generateComponentCss('input', preset.input);
  if (preset.card) generateComponentCss('card', preset.card);

  return css;
};

/* ────────────────────────────────────────────────────────────
   Contrast helpers
   ──────────────────────────────────────────────────────────── */

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
