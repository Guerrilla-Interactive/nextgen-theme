/*Mak
 * Shared types and utility functions for brand definitions.
 * Tailwind v4 + shadcn/ui CSS generator included.
 *
 * Install peer deps if needed:
 *   npm i culori
 */

import { wcagContrast } from 'culori/fn';
import { parse, converter } from 'culori';
import type { Brand, StyleGuide, RawColorDefinition, OklchString, BusinessDetails, Personality, SevenAxisCode } from './themes/theme-types';
export type { Brand, OklchString } from './themes/theme-types';

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

// Theme-related types (Brand, StyleGuide, RawColorDefinition, OklchString, etc.)
// are defined in ./themes/theme-types and imported as types above.

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
  success: string;
  "success-foreground": string;

  /** Sidebar tokens (required across all themes) */
  sidebar: string;
  "sidebar-foreground": string;
  "sidebar-primary": string;
  "sidebar-primary-foreground": string;
  "sidebar-accent": string;
  "sidebar-accent-foreground": string;
  "sidebar-border": string;
  "sidebar-ring": string;

  border: string;
  input: string;
  "input-foreground": string;
  ring: string;
  /** Chart tokens (required across all themes) */
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  chartOutline: string;

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
  "shadow-2xs"?: string;
  "shadow-2xl"?: string;
  "border-width-default"?: string;
  "border-style-default"?: string;
  "default-card-border"?: string;
  "default-card-border-hover"?: string;

  "spacing-sm"?: string;
  "spacing-md"?: string;
  "spacing-lg"?: string;
  "spacing-xl"?: string;
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

// Brand and RawColorDefinition are imported as types from theme-types

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
    background?: string;
    foreground?: string;
    defaultCardBorder?: string;
    defaultCardBorderHover?: string;
    shadowXs?: string;
    shadowSm?: string;
    shadowMd?: string;
    shadowLg?: string;
    shadowXl?: string;
    borderWidthDefault?: string;
    borderStyleDefault?: string;
    // Chart tokens are optional inputs but required in output; fallbacks will be applied
    chart1?: string;
    chart2?: string;
    chart3?: string;
    chart4?: string;
    chart5?: string;
    chartOutline?: string;
    // Sidebar tokens — optional here (may come from styleGuide.sidebarColors)
    sidebar?: string;
    sidebarForeground?: string;
    sidebarPrimary?: string;
    sidebarPrimaryForeground?: string;
    sidebarAccent?: string;
    sidebarAccentForeground?: string;
    sidebarBorder?: string;
    sidebarRing?: string;
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
    background: resolve((style as any).rootColors?.background) || resolve(otherVars.background) || resolve(style.primaryColors.primary)!,
    foreground: resolve((style as any).rootColors?.foreground) || resolve(otherVars.foreground) || resolve(style.primaryColors.primaryForeground)!,
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
    // Success defaults to primary if not provided in style
    success: resolve((style as any).successColors?.success) || resolve(style.primaryColors.primary)!,
    "success-foreground": resolve((style as any).successColors?.successForeground) || resolve(style.primaryColors.primaryForeground)!,
    // Sidebar tokens — prefer style.sidebarColors, then otherVars, then sensible fallbacks
    sidebar: resolve((style as any).sidebarColors?.sidebar) || resolve((otherVars as any).sidebar) || resolve(style.cardColors.card)!,
    "sidebar-foreground": resolve((style as any).sidebarColors?.sidebarForeground) || resolve((otherVars as any).sidebarForeground) || resolve(style.cardColors.cardForeground)!,
    "sidebar-primary": resolve((style as any).sidebarColors?.sidebarPrimary) || resolve((otherVars as any).sidebarPrimary) || resolve(style.primaryColors.primary)!,
    "sidebar-primary-foreground": resolve((style as any).sidebarColors?.sidebarPrimaryForeground) || resolve((otherVars as any).sidebarPrimaryForeground) || resolve(style.primaryColors.primaryForeground)!,
    "sidebar-accent": resolve((style as any).sidebarColors?.sidebarAccent) || resolve((otherVars as any).sidebarAccent) || resolve(style.accentColors.accent)!,
    "sidebar-accent-foreground": resolve((style as any).sidebarColors?.sidebarAccentForeground) || resolve((otherVars as any).sidebarAccentForeground) || resolve(style.accentColors.accentForeground)!,
    "sidebar-border": resolve((style as any).sidebarColors?.sidebarBorder) || resolve((otherVars as any).sidebarBorder) || resolve(style.borderColors.border)!,
    "sidebar-ring": resolve((style as any).sidebarColors?.sidebarRing) || resolve((otherVars as any).sidebarRing) || resolve(style.ringColors.ring)!,
    border: resolve(style.borderColors.border)!,
    input: resolve(style.inputColors.input)!,
    "input-foreground": resolve(style.inputColors.inputForeground) || resolve(style.secondaryColors.secondaryForeground) || resolve(style.primaryColors.primaryForeground)!,
    ring: resolve(style.ringColors.ring)!,
    "radius-sm": style.radius.radiusSm,
    "radius-md": style.radius.radiusMd,
    "radius-lg": style.radius.radiusLg,
    "radius-xl": style.radius.radiusXl,
    "spacing-sm": style.spacing.spacingSm,
    "spacing-md": style.spacing.spacingMd,
    "spacing-lg": style.spacing.spacingLg,
    "spacing-xl": style.spacing.spacingXl,
    "shadow-2xs": (otherVars as any)["shadow-2xs"],
    "shadow-xs": otherVars.shadowXs,
    "shadow-sm": otherVars.shadowSm,
    "shadow-md": otherVars.shadowMd,
    "shadow-lg": otherVars.shadowLg,
    "shadow-xl": otherVars.shadowXl,
    "shadow-2xl": (otherVars as any)["shadow-2xl"],
    "border-width-default": otherVars.borderWidthDefault,
    "border-style-default": otherVars.borderStyleDefault,
    "default-card-border": otherVars.defaultCardBorder,
    "default-card-border-hover": otherVars.defaultCardBorderHover,
    // Charts — prefer style.chartColors, then otherVars, with robust fallbacks
    chart1: resolve((style as any).chartColors?.chart1) || resolve(otherVars.chart1) || resolve(style.primaryColors.primary)!,
    chart2: resolve((style as any).chartColors?.chart2) || resolve(otherVars.chart2) || resolve(style.secondaryColors.secondary)!,
    chart3: resolve((style as any).chartColors?.chart3) || resolve(otherVars.chart3) || resolve(style.accentColors.accent)!,
    chart4: resolve((style as any).chartColors?.chart4) || resolve(otherVars.chart4) || resolve(style.ringColors.ring)!,
    chart5: resolve((style as any).chartColors?.chart5) || resolve(otherVars.chart5) || resolve(style.borderColors.border)!,
    chartOutline: resolve((style as any).chartColors?.chartOutline) || resolve(otherVars.chartOutline) || resolve(style.borderColors.border)!,
    radius: otherVars.radiusBase,
  };

  // Already set success and input-foreground above with fallbacks
  return cssVars;
};

/* ────────────────────────────────────────────────────────────
   Radius mapping from SevenAxis cornerStyle
   ──────────────────────────────────────────────────────────── */
export const mapCornerStyleToRadius = (cornerStyle?: SevenAxisCode['cornerStyle']): string | undefined => {
  switch (cornerStyle) {
    case 'sharp': return '0px';
    case 'slightly-rounded': return '0.375rem'; // 6px
    case 'rounded': return '0.75rem'; // 12px
    case 'very-rounded': return '1.5rem'; // 24px
    case 'pill': return '9999px';
    default: return undefined;
  }
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
  add('/* Foundations in OKLCH, shadcn tokens in HSL/OKLCH via CSS vars */');
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

  /* 2) Semantic tokens (aliases to attached foundation variables) */
  add('', 2);
  add('/* ——— Semantic tokens (aliases to attached foundation variables) ——— */', 2);
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
  roles.forEach(key => {
    const ref = (ov as any)[key];
    if (typeof ref === 'string' && ref.length > 0) {
      add(`--${key}: ${ref};`, 2);
    }
  });

  // Step aliases
  (['primary','secondary','accent','destructive','success','ring','chart1','chart2','chart3','chart4','chart5'] as (keyof ThemeCssVars)[])
    .forEach(role => emitRoleStepAliases(role, tokens, ov, add));

  // Typo/radii/shadows
  add('', 2);
  add('/* Typography + radii + shadows */', 2);
  add(`--font-sans: ${brand.fonts.find(f=>f.roles.includes('sans'))?.family ?? "ui-sans-serif, system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial"};`, 2);
  add(`--font-serif: ${brand.fonts.find(f=>f.roles.includes('serif'))?.family ?? "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"};`, 2);
  add(`--font-mono: ${brand.fonts.find(f=>f.roles.includes('mono'))?.family ?? "ui-monospace, 'Fira Code', 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas"};`, 2);
  const radiusFromCorner = mapCornerStyleToRadius(brand.sevenAxisCode?.cornerStyle);
  add(`--radius: ${brand.themeCssVariables.radius ?? radiusFromCorner ?? '0.75rem'};`, 2);
  ['shadow-2xs','shadow-xs','shadow-sm','shadow-md','shadow-lg','shadow-xl','shadow-2xl'].forEach(sh => {
    const v = (brand.themeCssVariables as any)[sh];
    if (v) add(`--${sh}: ${v};`, 2);
  });
  // Optionally expose general shadow aliases if not present
  const fallbackShadow = (brand.themeCssVariables as any)['shadow-sm'] || (brand.themeCssVariables as any)['shadow-md'];
  if (fallbackShadow) add(`--shadow: ${fallbackShadow};`, 2);

  add('color-scheme: light;', 2);
  add('}', 1); // end :root

  /* 3) Optional dark aliases (no new colors — just remaps if provided by overrides) */
  add('', 1);
  add('.dark, [data-theme="dark"] {', 1);
  add('color-scheme: dark;', 2);
  add('}', 1);

  add('}', 0); // end @layer base

  /* 4) Base resets / focus / type */
  add('');
  add('@layer base {');
  add('* { @apply border-border; }', 1);
  add('html { @apply antialiased; text-rendering: optimizeLegibility; }', 1);
  add('body { @apply bg-background text-foreground; font-family: var(--font-sans); }', 1);
  add('::selection { background-color: color-mix(in oklch, var(--primary) 18%, transparent); color: var(--foreground); }', 1);
  // Avoid forcing letter-spacing so role variables control tracking
  add('h1,h2,h3,h4 { @apply text-balance; }', 1);
  add('p { @apply leading-7; }', 1);
  add('p + p { @apply mt-4; }', 1);
  add(':is(button,[role="button"],input,select,textarea,a,summary):focus-visible {', 1);
  add('outline: none;', 2);
  add('box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);', 2);
  add('border-radius: var(--radius);', 2);
  add('}', 1);

  // Typography role mappings (CSS variable-driven)
  add('', 1);
  add('/* Typography role mappings driven by CSS variables */', 1);

  // Headings
  add(':where(h1), :where([data-typography-role="h1"]) {', 1);
  add('  font-family: var(--font-h1, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h1, var(--font-weight-heading, 700));', 2);
  add('  font-size: var(--font-size-h1, 2.25rem);', 2);
  add('  line-height: var(--line-height-h1, var(--line-height-heading, var(--line-height-body, 1.1)));', 2);
  add('  letter-spacing: var(--letter-spacing-h1, var(--letter-spacing-heading, 0em));', 2);
  add('}', 1);

  add(':where(h2), :where([data-typography-role="h2"]) {', 1);
  add('  font-family: var(--font-h2, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h2, var(--font-weight-heading, 700));', 2);
  add('  font-size: var(--font-size-h2, 1.875rem);', 2);
  add('  line-height: var(--line-height-h2, var(--line-height-heading, var(--line-height-body, 1.15)));', 2);
  add('  letter-spacing: var(--letter-spacing-h2, var(--letter-spacing-heading, 0em));', 2);
  add('}', 1);

  add(':where(h3), :where([data-typography-role="h3"]) {', 1);
  add('  font-family: var(--font-h3, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h3, var(--font-weight-heading, 600));', 2);
  add('  font-size: var(--font-size-h3, 1.5rem);', 2);
  add('  line-height: var(--line-height-h3, var(--line-height-heading, var(--line-height-body, 1.2)));', 2);
  add('  letter-spacing: var(--letter-spacing-h3, var(--letter-spacing-heading, 0em));', 2);
  add('}', 1);

  add(':where(h4), :where([data-typography-role="h4"]) {', 1);
  add('  font-family: var(--font-h4, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h4, var(--font-weight-heading, 600));', 2);
  add('  font-size: var(--font-size-h4, 1.25rem);', 2);
  add('  line-height: var(--line-height-h4, var(--line-height-heading, var(--line-height-body, 1.25)));', 2);
  add('  letter-spacing: var(--letter-spacing-h4, var(--letter-spacing-heading, 0em));', 2);
  add('}', 1);

  add(':where(h5), :where([data-typography-role="h5"]) {', 1);
  add('  font-family: var(--font-h5, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h5, var(--font-weight-heading, 600));', 2);
  add('  font-size: var(--font-size-h5, 1.125rem);', 2);
  add('  line-height: var(--line-height-h5, var(--line-height-heading, var(--line-height-body, 1.3)));', 2);
  add('  letter-spacing: var(--letter-spacing-h5, var(--letter-spacing-heading, 0em));', 2);
  add('}', 1);

  add(':where(h6), :where([data-typography-role="h6"]) {', 1);
  add('  font-family: var(--font-h6, var(--font-heading, var(--font-body)));', 2);
  add('  font-weight: var(--font-weight-h6, var(--font-weight-heading, 600));', 2);
  add('  font-size: var(--font-size-h6, 1rem);', 2);
  add('  line-height: var(--line-height-h6, var(--line-height-heading, var(--line-height-body, 1.35)));', 2);
  add('  letter-spacing: var(--letter-spacing-h6, var(--letter-spacing-heading, 0em));', 2);
  add('}', 1);

  // Paragraph-like text (avoid styling bare span)
  add(':where(p, li), :where([data-typography-role="p"]), :where([data-typography-role="span"]), :where([data-typography-role="default"]), :where([data-typography-role="div"]) {', 1);
  add('  font-family: var(--font-p, var(--font-body));', 2);
  add('  font-weight: var(--font-weight-p, 400);', 2);
  add('  font-size: var(--font-size-p, 1rem);', 2);
  add('  line-height: var(--line-height-p, var(--line-height-body, 1.5));', 2);
  add('  letter-spacing: var(--letter-spacing-p, var(--letter-spacing-body, 0em));', 2);
  add('}', 1);

  // Blockquote
  add(':where(blockquote), :where([data-typography-role="blockquote"]) {', 1);
  add('  font-family: var(--font-blockquote, var(--font-body));', 2);
  add('  font-weight: var(--font-weight-blockquote, var(--font-weight-p, 400));', 2);
  add('  font-size: var(--font-size-blockquote, var(--font-size-p, 1rem));', 2);
  add('  line-height: var(--line-height-blockquote, var(--line-height-p, var(--line-height-body, 1.5)));', 2);
  add('  letter-spacing: var(--letter-spacing-blockquote, var(--letter-spacing-p, 0em));', 2);
  add('}', 1);

  // Buttons
  add(':where([data-slot="button"], button, [data-typography-role="button"]) {', 1);
  add('  font-family: var(--font-button, var(--font-body));', 2);
  add('  font-weight: var(--font-weight-button, 600);', 2);
  add('  font-size: var(--font-size-button, 0.875rem);', 2);
  add('  line-height: var(--line-height-button, 1.2);', 2);
  add('  letter-spacing: var(--letter-spacing-button, 0em);', 2);
  add('}', 1);

  add('}', 0);

  // Motion preferences
  add('');
  add('@media (prefers-reduced-motion: reduce) {');
  add('  :root { scroll-behavior: auto; }');
  add('  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }');
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
  semantic.forEach(key => add(`--color-${key}: var(--${key});`, 1));

  ['chart1','chart2','chart3','chart4','chart5','chartOutline'].forEach(k => {
    const cssKey = k === 'chartOutline' ? 'chart-outline' : `chart-${k.replace('chart','')}`;
    add(`--color-${cssKey}: var(--${k});`, 1);
  });

  // expose foundations as raw variables (handy)
  tokens.forEach(t => add(`--color-${t.variableName}: var(--${t.variableName});`, 1));

  // radii passthrough for @apply
  add('--radius-sm: calc(var(--radius) - 4px);', 1);
  add('--radius-md: calc(var(--radius) - 2px);', 1);
  add('--radius-lg: var(--radius);', 1);
  add('--radius-xl: calc(var(--radius) + 4px);', 1);

  // forward shadows into theme variables for utilities/components
  ['shadow-2xs','shadow-xs','shadow-sm','shadow','shadow-md','shadow-lg','shadow-xl','shadow-2xl']
    .forEach(sh => add(`--${sh}: var(--${sh});`, 1));
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

/**
 * Export-oriented CSS generator that mirrors the 6-section globals.css template:
 * 1) Brand swatches in OKLCH
 * 2) Brand pure color aliases
 * 3) shadcn role tokens (HSL triplets) with dark + light blocks
 * 4) Pure shadcn aliases (hsl(var(--...)))
 * 5) @theme inline bridge
 * 6) Base defaults + accessibility
 */
export const generateGlobalCssTemplate = (brand: Brand): string => {
  const { colors: tokens, themeCssVariables: ov } = brand;

  let css = '';
  const add = (line: string, i = 0) => (css += `${'  '.repeat(i)}${line}\n`);

  // Header
  add('/* ──────────────────────────────────────────────────────────────────────────────');
  add('   globals.css — Tailwind v4 + shadcn/ui + Brand palette');
  add('   Layers:');
  add('   1. Brand tokens (OKLCH)');
  add('   2. Brand aliases (pure colors, named)');
  add('   3. shadcn HSL triplets');
  add('   4. Pure shadcn aliases');
  add('   5. Tailwind @theme inline bridge');
  add('   6. Base + A11y + sugar');
  add('   ───────────────────────────────────────────────────────────────────────────── */');
  add('');
  add('@import "tailwindcss";');
  add('');
  add('@layer base, components, utilities;');
  add('');

  // 1) BRAND SWATCHES — OKLCH
  add('/* -----------------------------------------------------------------------------');
  add('   1) BRAND SWATCHES — Authoring colors in OKLCH');
  add('   --------------------------------------------------------------------------- */');
  add('@layer base {');
  add(':root {', 1);
  add('/* ——— Foundation swatches (OKLCH) ——— */', 2);
  tokens.forEach(tok => add(`--${tok.variableName}: ${tok.oklch};`, 2));
  add('', 2);
  add('/* ——— Tint/shade steps (auto-generated for color tokens) ——— */', 2);
  tokens.forEach(tok => {
    if (tok.category === 'color' && tok.themeSteps) {
      (Object.keys(tok.themeSteps) as LightnessStepKey[]).forEach(step => {
        const stepVal = tok.themeSteps![step];
        if (stepVal) add(`--${tok.variableName}-${step}: ${stepVal};`, 2);
      });
    }
  });
  add('', 2);
  // Fonts and radius from brand
  const fontSans = brand.fonts.find(f => f.roles?.includes('sans') || f.roles?.includes('body'))?.family
    ?? "ui-sans-serif, system-ui, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif";
  const fontMono = brand.fonts.find(f => f.roles?.includes('mono') || f.roles?.includes('code'))?.family
    ?? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
  const radius = brand.themeCssVariables.radius ?? '0.5rem';
  add(`--font-sans: ${fontSans};`, 2);
  add(`--font-mono: ${fontMono};`, 2);
  add(`--radius: ${radius};`, 2);
  add('}', 1);
  add('}');
  add('');

  // 2) BRAND PURE COLOR ALIASES
  add('/* -----------------------------------------------------------------------------');
  add('   2) BRAND PURE COLOR ALIASES — ready-to-use');
  add('   --------------------------------------------------------------------------- */');
  add('@layer base {');
  add(':root {', 1);
  tokens.forEach(tok => add(`--color-${tok.variableName}: var(--${tok.variableName});`, 2));
  tokens.forEach(tok => {
    if (tok.category === 'color' && tok.themeSteps) {
      (Object.keys(tok.themeSteps) as LightnessStepKey[]).forEach(step => {
        const stepVal = tok.themeSteps![step];
        if (stepVal) add(`--color-${tok.variableName}-${step}: var(--${tok.variableName}-${step});`, 2);
      });
    }
  });
  add('}', 1);
  add('}');
  add('');

  // 3) shadcn/ui ROLE TOKENS — HSL triplets
  add('/* -----------------------------------------------------------------------------');
  add('   3) shadcn/ui ROLE TOKENS — HSL triplets');
  add('   --------------------------------------------------------------------------- */');
  add('@layer base {');
  add(':root,', 1);
  add(':root[data-theme="dark"],', 1);
  add('.dark {', 1);
  const roleKeys: (keyof ThemeCssVars)[] = [
    'background','foreground','card','card-foreground','primary','primary-foreground',
    'secondary','secondary-foreground','muted','muted-foreground','accent','accent-foreground',
    'destructive','destructive-foreground','success','success-foreground','border','input','ring',
    'chart1','chart2','chart3','chart4','chart5','chartOutline'
  ];
  roleKeys.forEach(key => {
    const triplet = resolveRoleToHslTriplet(key, tokens, ov);
    if (triplet) add(`--${key}: ${triplet};`, 2);
  });
  add('}', 1);
  add('');
  add('/* Light mode */', 1);
  add('.light,', 1);
  add(':root.light,', 1);
  add('[data-theme="light"] {', 1);
  roleKeys.forEach(key => {
    const triplet = resolveRoleToHslTriplet(key, tokens, ov);
    if (triplet) add(`--${key}: ${triplet};`, 2);
  });
  add('}', 1);
  add('}');
  add('');

  // 4) PURE shadcn ROLE COLOR ALIASES
  add('/* -----------------------------------------------------------------------------');
  add('   4) PURE shadcn ROLE COLOR ALIASES (hsl() wrapped)');
  add('   --------------------------------------------------------------------------- */');
  add('@layer base {');
  add(':root, .light, .dark {', 1);
  const aliasRoles: (keyof ThemeCssVars)[] = [
    'background','foreground','card','card-foreground','primary','primary-foreground',
    'secondary','secondary-foreground','muted','muted-foreground','accent','accent-foreground',
    'destructive','destructive-foreground','success','success-foreground','border','input','ring',
    'chart1','chart2','chart3','chart4','chart5','chartOutline'
  ];
  aliasRoles.forEach(key => {
    if (String(key).startsWith('chart')) {
      const mapped = key === 'chartOutline' ? 'chart-outline' : `chart-${String(key).replace('chart','')}`;
      add(`--color-${mapped}: hsl(var(--${key}));`, 2);
    } else {
      add(`--color-${key}: hsl(var(--${key}));`, 2);
    }
  });
  add('}', 1);
  add('}');
  add('');

  // 5) TAILWIND THEME BRIDGE — @theme inline
  add('/* -----------------------------------------------------------------------------');
  add('   5) TAILWIND THEME BRIDGE — @theme inline');
  add('   --------------------------------------------------------------------------- */');
  add('@theme inline {');
  [
    'background','foreground','primary','secondary','accent','muted','border','ring'
  ].forEach(key => add(`--color-${key}: hsl(var(--${key}));`, 1));
  // Charts as Tailwind colors
  const chartMap: Array<[string, string]> = [
    ['chart-1','chart1'],
    ['chart-2','chart2'],
    ['chart-3','chart3'],
    ['chart-4','chart4'],
    ['chart-5','chart5'],
    ['chart-outline','chartOutline']
  ];
  chartMap.forEach(([cssKey, varKey]) => add(`--color-${cssKey}: hsl(var(--${varKey}));`, 1));
  add('--font-sans: var(--font-sans);', 1);
  add('--font-serif: var(--font-serif);', 1);
  add('--font-mono: var(--font-mono);', 1);
  add('--radius: var(--radius);', 1);
  // spacing scale passthrough (if present)
  add('--spacing-sm: var(--spacing-sm);', 1);
  add('--spacing-md: var(--spacing-md);', 1);
  add('--spacing-lg: var(--spacing-lg);', 1);
  add('--spacing-xl: var(--spacing-xl);', 1);
  // border defaults passthrough (if present)
  add('--border-width-default: var(--border-width-default);', 1);
  add('--border-style-default: var(--border-style-default);', 1);
  add('}');
  add('');

  // 6) BASE DEFAULTS + ACCESSIBILITY
  add('/* -----------------------------------------------------------------------------');
  add('   6) BASE DEFAULTS + ACCESSIBILITY');
  add('   --------------------------------------------------------------------------- */');
  add('@layer base {');
  add('* { @apply border-border; }', 1);
  add('body { @apply bg-background text-foreground font-sans antialiased; }', 1);
  add('h1,h2,h3,h4 { @apply tracking-tight text-balance; }', 1);
  add('p { @apply leading-7; }', 1);
  add('p + p { @apply mt-4; }', 1);
  add('', 1);
  add('::selection {', 1);
  add('background-color: hsl(var(--primary) / 0.15);', 2);
  add('color: hsl(var(--foreground));', 2);
  add('}', 1);
  add('}');

  return css;
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
  if ((preset.button as any)?.global?.transition) addLine(`transition: ${(preset.button as any).global.transition} !important;`, 1);
  if ((preset.button as any)?.global?.transformOrigin) addLine(`transform-origin: ${(preset.button as any).global.transformOrigin} !important;`, 1);
  if ((preset.button as any)?.global?.willChange) addLine(`will-change: ${(preset.button as any).global.willChange} !important;`, 1);
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

  // Remove !important in general
  try {
    css = css.replace(/\s*!important\b/g, '');
  } catch {}
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
