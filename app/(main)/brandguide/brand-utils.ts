/*Mak
 * Shared types and utility functions for brand definitions.
 */
import { wcagContrast } from 'culori/fn';

export const influenceHierarchy = {
    /** Primary actionable hue or surface */                            primary: 10,
    "primary-foreground": 9.9,
    /** Highest contrast background colour */                         background: 9,
    /** Highest contrast foreground (text) colour */                  foreground: 9,
    /** Secondary actionable hue or surface */                         secondary: 8,
    "secondary-foreground": 7.9,
    /** Standard border colour */                                         border: 7,
    /** Form control foregrounds/backgrounds */                           input: 7,
    "input-foreground": 6.9,
    /** Outline / focus‑ring colour */                                      ring: 6,
    /** Error & destructive messaging */                              destructive: 5,
    "destructive-foreground": 4.9,
    /** Positive (success) messaging */                                   success: 4,
    "success-foreground": 3.9,
    /** Neutral info messaging */                                           info: 4,
    "info-foreground": 3.8, // slightly different to avoid exact tie with warning-fg if sorting matters
    /** Caution / warning messaging */                                   warning: 4,
    "warning-foreground": 3.7,
    /** Subdued surface background */                                      muted: 4,
    /** Subdued surface text */                                "muted-foreground": 4,
    /** Accent highlight / tertiary CTA */                               accent: 3,
    "accent-foreground": 2.9,
    /** Shared low‑elevation surfaces */                                    card: 2,
    popover: 2,
    /** Specific foregrounds for surfaces, if directly assigned */
    "card-foreground": 1.9, 
    "popover-foreground": 1.9,
    
    "tooltip-background": 2,
    "surface-muted": 2,
    "text-brand": 2,
    "chart-outline": 2,
    "chart-1": 1,
    "chart-2": 1,
    "chart-3": 1,
    "chart-4": 1,
    "chart-5": 1,
    /** Any decorative or component‑specific role defaults to 1 */       default: 1
  } as const;
  
export type Role = keyof typeof influenceHierarchy;
  
// Define which roles are considered surfaces for applying "on" colors
export const SURFACE_ROLES: ReadonlySet<Role> = new Set<Role>([
  "background", "card", "popover", "input", "muted", "secondary", "primary", "destructive", "success", "info", "warning", "accent", "surface-muted"
]);

/** Shade keys for color-mix lightness steps */
export type LightnessStepKey = "bright" | "brighter" | "dark" | "darker";

/**
 * Represents an OKLCH color value.
 * Example: "oklch(0.91 0.05 82.78)"
 */
export type OklchString = `oklch(${string})`;

/**
 * Represents a color-mix string.
 * Example: "color-mix(in oklch, var(--emerald-light) 92%, white 8%)"
 */
export type ColorMixString = `color-mix(${string})`;
  
/**
 * Named colour shade, simplified. Value can be direct OKLCH or a color-mix.
 */
export interface Shade {
  /** CSS custom property reference (without the leading `--`) */
  variableName: string;
  /** The actual color value for this shade (e.g., OklchString or ColorMixString) */
  value: OklchString | ColorMixString; 
}
  
/**
 * Base colour token with its semantic roles and OKLCH definitions.
 */
export interface ColorToken {
  /** Human‑friendly name (e.g., "Emerald", "Sage 0") */
  name: string;
  /** CSS variable-friendly name (e.g., "emerald", "sage-0") */
  variableName: string;
  /** Usage explanation for designers & devs */
  description: string;
  
  /** Base OKLCH value for the light theme */
  oklchLight: OklchString;
  /** Base OKLCH value for the dark theme */
  oklchDark: OklchString;

  /** Original tokenSpecificName used to create this token (can be same as name) */
  rawTokenSpecificName: string;
  /** Semantic roles sorted by influence priority */
  roles: Role[];
  
  /** Pre-calculated color-mix steps for the light theme */
  lightThemeSteps: Partial<Record<LightnessStepKey, ColorMixString>>;
  /** Pre-calculated color-mix steps for the dark theme */
  darkThemeSteps: Partial<Record<LightnessStepKey, ColorMixString>>;

  /** Category of the color (e.g. a base foundation color or an accent) */
  category: 'color' | 'shade'; // 'shade' could be foundation, 'color' for accents that get steps

  /** Optional: Direct OKLCH definition for foreground/on-color in light theme. */
  onColorLight?: OklchString;
  /** Optional: Direct OKLCH definition for foreground/on-color in dark theme. */
  onColorDark?: OklchString;
}
  
/**
 * Font family token.
 */
export interface FontToken {
  /** Public font name */
  name: string;
  /** Supplier or licence owner */
  distributor: string;
  /** Design‑intent description */
  description: string;
  /** Ready‑to‑use CSS `font-family` declaration */
  family: string;
  /** Semantic usage list */
  roles: string[];
  /** Available numeric weights */
  weights: Record<string, number>;
}
  
/** Personality slider scores (0‑100, where 0 = far‑left, 100 = far‑right). */
export interface Personality {
  vintageModern: number;
  seasonedYouthful: number;
  gracefulBold: number;
  playfulElegant: number;
  valueSmartLuxurious: number;
  structuredNatural: number;
  symbolicRealistic: number;
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
  infoColors?: { info: string; infoForeground: string };
  warningColors?: { warning: string; warningForeground: string };
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
  /** Industry vertical for analytics / theming context. */
  name: string;
  industry: string;
  personality: Personality;
}
  
/**
 * Interface for theme-level CSS variables, mapping them to brand-specific variables.
 */
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
  info?: string;
  "info-foreground"?: string;
  warning?: string;
  "warning-foreground"?: string;
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

// START: Added types for ComponentStyles and ComponentShowcaseConfig

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
  header?: ComponentStateStyles & {
    titleColor?: string;
    descriptionColor?: string;
  };
  content?: ComponentStateStyles;
  footer?: ComponentStateStyles;
}

export interface BadgeStyles extends ComponentStateStyles {
  variantDefault?: ComponentStateStyles;
  variantDestructive?: ComponentStateStyles;
  variantSuccess?: ComponentStateStyles;
  variantWarning?: ComponentStateStyles;
  variantInfo?: ComponentStateStyles;
}

export interface NavStyles extends ComponentStateStyles {
  backdropFilter?: string;
}

export interface HeroStyles extends ComponentStateStyles {
  backgroundSize?: string;
  backgroundPosition?: string;
}

export interface TabsListStyles extends ComponentStateStyles {}

export interface TabsTriggerStyles extends ComponentStateStyles {
  textColorActive?: string;
  backgroundActive?: string;
  boxShadowActive?: string;
  textColor?: string;
  borderColor?: string;
}

export interface OverviewCardStyles extends ComponentStateStyles {}

// Using Record<string, any> for simplicity as in brands-types.ts
export type ShowcaseCardStyles = Record<string, any>;
export type ShowcaseTitleStyles = Record<string, any>;


export interface BrandPickerContainerStyle extends ComponentStateStyles {
  marginTop?: string;
  marginBottom?: string;
}

export interface PageCardStyles extends ComponentStateStyles {}

export interface TooltipStyles extends ComponentStateStyles {
  backdropFilter?: string;
}

export interface ChartStyling {
  gridStrokeColor?: string;
  axisStrokeColor?: string;
  axisTextColor?: string;
  legendTextColor?: string;
  tooltipCursorFill?: string;
}

export interface LoadingIndicatorStyles extends ComponentStateStyles {
  textColor?: string;
}

export interface ComponentStyles {
  nav?: NavStyles;
  hero?: HeroStyles;
  tabs?: {
    list?: TabsListStyles;
    trigger?: TabsTriggerStyles;
  };
  overviewCard?: OverviewCardStyles;
  chartShowcaseCard?: ShowcaseCardStyles;
  chartShowcaseTitle?: ShowcaseTitleStyles;
  componentShowcaseCard?: ShowcaseCardStyles;
  componentShowcaseTitle?: ShowcaseTitleStyles;
  brandPickerContainer?: BrandPickerContainerStyle;
  button?: ButtonStyles;
  input?: InputStyles;
  card?: CardComponentStyles;
  tokenShowcaseCard?: ShowcaseCardStyles; // Was TokenShowcaseCardStyles in brands-types
  pageCard?: PageCardStyles;
  tooltip?: TooltipStyles;
  charts?: ChartStyling;
  loadingIndicator?: LoadingIndicatorStyles;
  badge?: BadgeStyles;
  tokenGroupCard?: ComponentStateStyles;
}

export interface ComponentShowcaseItem {
  id: string;
  name: string;
  description: string;
  displayComponent: string;
  variant?: string;
  state?: 'default' | 'hover' | 'focus' | 'active' | 'disabled';
}

export interface ComponentShowcaseConfig { // This was ComponentShowcaseDefinition in brands-types.ts
  title?: string;
  description?: string;
  interactiveElements?: ComponentShowcaseItem[];
  forms?: ComponentShowcaseItem[];
  feedbackIndicators?: ComponentShowcaseItem[];
  navigation?: ComponentShowcaseItem[];
  dataDisplay?: ComponentShowcaseItem[];
  overlays?: ComponentShowcaseItem[];
  // Added from brands-types.ts BrandDefinition
  styleOverrides?: Record<string, string>; // For styling the showcase UI itself
}

// END: Added types

export interface Brand {
  businessDetails: BusinessDetails;
  /** Array of ColorToken objects */
  colors: ColorToken[];
  /** Array of FontToken objects */
  fonts: FontToken[];
  /** Style guide for easy CSS variable application */
  style: StyleGuide;
  /** Theme-specific CSS variables */
  themeCssVariables: ThemeCssVars;
  /** A human-friendly name for the brand theme */
  name: string; 
  /** Indicates if the theme prefers a dark browser/OS chrome (e.g., for top bars, window frames) */
  prefersDarkSchemeForChrome?: boolean;
  // Added optional properties
  componentStyles?: ComponentStyles;
  componentShowcase?: ComponentShowcaseConfig;
}
  
/**
 * Raw definition for a color before it is processed into a full ColorToken.
 */
export interface RawColorDefinition {
  tokenSpecificName: string;
  description: string;
  
  oklchLight: OklchString;
  oklchDark: OklchString;
  
  roles: Role[];
  category: 'color' | 'shade';

  /** Optional: Explicit OKLCH string for the 'on' color in light theme. If not provided, one might be generated or aliased. */
  onColorLight?: OklchString;
  /** Optional: Explicit OKLCH string for the 'on' color in dark theme. */
  onColorDark?: OklchString;
}
  
/**
 * Creates a full ColorToken object from a raw definition.
 */
export const createColorToken = ({
  tokenSpecificName,
  description,
  oklchLight,
  oklchDark,
  roles,
  category,
  onColorLight,
  onColorDark,
}: RawColorDefinition, 
brandNameForPrefix: string // brandNameForPrefix might become less relevant if var names are direct from tokenSpecificName
): ColorToken => {
  const cssFriendlyName = tokenSpecificName.toLowerCase().replace(/\s+/g, '-');
  const baseVariableName = cssFriendlyName;

  const generateSteps = (baseVar: string, forDarkTheme: boolean): Partial<Record<LightnessStepKey, ColorMixString>> => {
    return {
      bright: `color-mix(in oklch, var(--${baseVar}) 92%, white 8%)` as ColorMixString,
      brighter: `color-mix(in oklch, var(--${baseVar}) 85%, white 15%)` as ColorMixString,
      dark: `color-mix(in oklch, var(--${baseVar}) 92%, black 8%)` as ColorMixString,
      darker: `color-mix(in oklch, var(--${baseVar}) 85%, black 15%)` as ColorMixString,
    };
  };
  
  return {
    name: tokenSpecificName,
    variableName: baseVariableName,
    description,
    oklchLight,
    oklchDark,
    rawTokenSpecificName: tokenSpecificName,
    roles: roles.sort((a, b) => (influenceHierarchy[b] ?? 0) - (influenceHierarchy[a] ?? 0)),
    lightThemeSteps: category === 'color' ? generateSteps(baseVariableName, false) : {},
    darkThemeSteps: category === 'color' ? generateSteps(baseVariableName, true) : {},
    category,
    onColorLight,
    onColorDark,
  };
};

/**
 * Generates an array of ColorToken objects from raw color definitions.
 */
export const generateBrandColors = (
  brandNameForPrefix: string, // May not be needed if var names are direct from tokenSpecificName
  rawColorDefinitions: RawColorDefinition[]
): ColorToken[] => {
  return rawColorDefinitions.map(rawColor => {
    // Pass brandNameForPrefix for now, though createColorToken might ignore it
    // if variableName is now directly from tokenSpecificName.
    return createColorToken(rawColor, brandNameForPrefix);
  });
  // Second pass for 'on' colors or complex relations is removed for now,
  // as 'on' colors are simpler (direct oklch or generated).
  // The previous 'on' color logic based on SURFACE_ROLES and onColorAbstractRef is superseded
  // by direct onColorLight/onColorDark in RawColorDefinition, or generated if not provided.
};

export const resolveAbstractColorRef = (
  abstractRef: string,
  brandName: string, // e.g., "nextgen", "apple"
  colorTokens: ColorToken[],
): string => {
  const [refTokenName, refStepKey = "base"] = abstractRef.split(':') as [string, LightnessStepKey | "base"];

  const targetToken = colorTokens.find(token => token.name === refTokenName || token.rawTokenSpecificName === refTokenName);

  if (!targetToken) {
    console.warn(`[resolveAbstractColorRef] Color token with name "${refTokenName}" not found for brand "${brandName}". Using fallback.`);
    return "var(--fallback-color-not-found)"; // Fallback CSS variable
  }

  if (refStepKey === "base") {
    return `var(--${targetToken.variableName})`;
  }

  // Check if it's a valid LightnessStepKey for which a variable would be explicitly defined (e.g., --emerald-bright)
  const validStepKeys: LightnessStepKey[] = ["bright", "brighter", "dark", "darker"];
  if (validStepKeys.includes(refStepKey as LightnessStepKey)) {
    // Construct the variable name for the step, e.g., var(--emerald-bright)
    return `var(--${targetToken.variableName}-${refStepKey})`;
  }
  
  console.warn(`[resolveAbstractColorRef] Invalid step key "${refStepKey}" for token "${targetToken.name}" (raw: "${refTokenName}") in brand "${brandName}". Using base or fallback.`);
  // Fallback to base if the step key is not one of the standard ones for which we generate variables
  return `var(--${targetToken.variableName})`; 
};

/**
 * Creates the ThemeCssVars object from a StyleGuide and other theme-specific variables.
 */
export const createThemeCssVars = (
  brandName: string,
  colorTokens: ColorToken[],
  style: StyleGuide, // Values here are expected to be abstract color refs or direct CSS values for non-color props
  otherVars: { // Values here are expected to be abstract color refs or direct CSS values
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
    
    const isNonColorCssValue = ref.startsWith("var(--") || ["px", "rem", "em", "%", "solid", "dashed", "rgba", "hsla"].some(u => ref.includes(u));
    
    if (isNonColorCssValue) {
      // If it starts with var( or contains typical CSS units/keywords for non-color values, pass it through.
      return ref; 
    }
    
    // If it doesn't contain spaces, it might be a single-word abstract color ref or a non-color keyword we missed.
    // If it contains spaces but no colon, it implies multi-word abstract color ref like "Vibrant Orange".
    // If it contains a colon, it implies a specific shade like "Vibrant Orange:dark".
    // For styleGuide and otherVars, we ONLY want the base color. So, we strip any shade declaration.
    const colorNameOnly = ref.split(':')[0];

    // Now, resolve this colorNameOnly, which will default to its base shade in resolveAbstractColorRef
    return resolveAbstractColorRef(colorNameOnly, brandName, colorTokens);
  };

  const cssVars: ThemeCssVars = {
    background: resolve(otherVars.background) || resolve(style.primaryColors.primary),
    foreground: resolve(otherVars.foreground) || resolve(style.primaryColors.primaryForeground),
    card: resolve(style.cardColors.card),
    "card-foreground": resolve(style.cardColors.cardForeground),
    popover: resolve(style.popoverColors.popover),
    "popover-foreground": resolve(style.popoverColors.popoverForeground),
    primary: resolve(style.primaryColors.primary),
    "primary-foreground": resolve(style.primaryColors.primaryForeground),
    secondary: resolve(style.secondaryColors.secondary),
    "secondary-foreground": resolve(style.secondaryColors.secondaryForeground),
    muted: resolve(style.mutedColors.muted),
    "muted-foreground": resolve(style.mutedColors.mutedForeground),
    accent: resolve(style.accentColors.accent),
    "accent-foreground": resolve(style.accentColors.accentForeground),
    destructive: resolve(style.destructiveColors.destructive),
    "destructive-foreground": resolve(style.destructiveColors.destructiveForeground),
    border: resolve(style.borderColors.border),
    input: resolve(style.inputColors.input),
    ring: resolve(style.ringColors.ring),
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
  if (style.infoColors) {
    cssVars.info = resolve(style.infoColors.info);
    cssVars["info-foreground"] = resolve(style.infoColors.infoForeground);
  }
  if (style.warningColors) {
    cssVars.warning = resolve(style.warningColors.warning);
    cssVars["warning-foreground"] = resolve(style.warningColors.warningForeground);
  }
  if (style.inputColors.inputForeground) {
    cssVars["input-foreground"] = resolve(style.inputColors.inputForeground);
  }
  
  return cssVars;
};

export const generateGlobalCss = (brand: Brand): string => {
  let cssString = "";

  // Helper to add lines with indentation
  const addLine = (line: string, indentLevel = 0) => {
    cssString += "  ".repeat(indentLevel) + line + "\n";
  };

  // Preamble
  addLine("/* ┌──────────────────────────────────────────────────────────┐ */");
  addLine("/*   global.css · Colour variants + bright / dark steps · Tailwind v4 ready   */");
  addLine("/* └──────────────────────────────────────────────────────────┘ */");
  addLine("");
  addLine("/* Tailwind layers */");
  addLine("@import \"tailwindcss\";");
  addLine("");

  // --- Light Theme --- 
  addLine("/* ╔════════════════════════╗ */");
  addLine("/* ║  LIGHT  THEME    ║ */");
  addLine("/* ╚════════════════════════╝ */");
  addLine(":root {");
  addLine("  /* ——— Foundation swatches ——— */", 1);
  brand.colors.forEach(color => {
    if (color.category === 'shade' || color.category === 'color') { // All base colors
      addLine(`--${color.variableName}: ${color.oklchLight};`, 2);
    }
  });
  const sage2TokenLight = brand.colors.find(c => c.variableName === 'sage-2');
  if (sage2TokenLight) {
    addLine(`--sage-3: color-mix(in oklch, var(--sage-2) 70%, black 25%);`, 2);
  }
  const graphiteTokenLight = brand.colors.find(c => c.variableName === 'graphite');
  if (graphiteTokenLight) {
    addLine(`--graphite-strong: color-mix(in oklch, var(--graphite) 55%, black 45%);`, 2);
  }

  addLine("", 1);
  addLine("  /* ——— Relative lightness steps ——— */", 1);
  brand.colors.forEach(color => {
    if (color.category === 'color') { 
      Object.entries(color.lightThemeSteps).forEach(([stepKey, value]) => {
        addLine(`--${color.variableName}-${stepKey}: ${value};`, 2);
      });
    }
  });
  addLine("", 1);
  addLine("  /* ——— Semantic aliases ——— */", 1);
  const sg = brand.style;
  const ov = brand.themeCssVariables; 

  const semanticRolesToGetSteps: Array<keyof ThemeCssVars> = [
    'primary', 'secondary', 'accent', 'destructive', 'success', 'info', 'warning', 'ring',
    'chart1', 'chart2', 'chart3', 'chart4', 'chart5'
  ];

  const addStepAliasesForScope = (forDarkTheme: boolean) => {
    semanticRolesToGetSteps.forEach(roleKeyStr => {
      const roleKey = roleKeyStr as keyof ThemeCssVars;
      const targetTokenVar = ov[roleKey];

      if (roleKey === 'primary') {
        console.log(`[BrandUtils Debug] Attempting to generate step aliases for role: ${roleKey}, DarkTheme: ${forDarkTheme}`);
        console.log(`[BrandUtils Debug]   - TargetTokenVar for ${roleKey} from themeCssVariables (ov.${roleKey}):`, targetTokenVar);
      }

      if (!targetTokenVar || typeof targetTokenVar !== 'string' || !targetTokenVar.startsWith('var(--') || !targetTokenVar.endsWith(')')) {
        if (roleKey === 'primary') {
          console.log(`[BrandUtils Debug]   - Skipping ${roleKey}: targetTokenVar ('${targetTokenVar}') is not a valid 'var(--name)' string.`);
        }
        return;
      }
      
      const tokenVarName = targetTokenVar.slice(6, -1);
      const sourceToken = brand.colors.find(c => c.variableName === tokenVarName);

      if (roleKey === 'primary') {
        console.log(`[BrandUtils Debug]   - Extracted tokenVarName for ${roleKey}: ${tokenVarName}`);
        if (sourceToken) {
          console.log(`[BrandUtils Debug]   - Found sourceToken for ${roleKey}: ${sourceToken.name}, Category: ${sourceToken.category}`);
        } else {
          console.log(`[BrandUtils Debug]   - No sourceToken found for ${roleKey} with variableName: ${tokenVarName}`);
        }
      }
      
      if (sourceToken && sourceToken.category === 'color') {
        if (roleKey === 'primary') {
          console.log(`[BrandUtils Debug]   - Proceeding to generate steps for ${roleKey} (source: ${sourceToken.name})`);
        }
        const steps = forDarkTheme ? sourceToken.darkThemeSteps : sourceToken.lightThemeSteps;
        (Object.keys(steps) as LightnessStepKey[]).forEach(stepKey => {
          if (steps[stepKey]) {
             addLine(`--${roleKey}-${stepKey}: var(--${sourceToken.variableName}-${stepKey});`, 2);
             if (roleKey === 'primary') {
               console.log(`[BrandUtils Debug]     - Generated: --${roleKey}-${stepKey}: var(--${sourceToken.variableName}-${stepKey});`);
             }
          }
        });
      } else if (roleKey === 'primary') {
        if (sourceToken) {
          console.log(`[BrandUtils Debug]   - Skipping step generation for ${roleKey}: sourceToken ${sourceToken.name} is category '${sourceToken.category}', not 'color'.`);
        } else {
          console.log(`[BrandUtils Debug]   - Skipping step generation for ${roleKey}: sourceToken not found.`);
        }
      }
    });
  };

  addLine(`--background: ${ov.background};`, 2); 
  addLine(`--card: ${ov.card};`, 2);           
  addLine(`--popover: ${ov.popover};`, 2);      
  const sidebarVar = brand.colors.find(c => c.roles.includes('sidebar' as Role))?.variableName || 'sage-2';
  addLine(`--sidebar: var(--${sidebarVar});`, 2);
  
  addLine(`--border: ${ov.border};`, 2);         
  addLine(`--input: ${ov.input};`, 2);           
  
  addLine(`--foreground: ${ov.foreground};`, 2);   
  addLine(`--ring: ${ov.ring};`, 2);             
  
  addLine(`--primary: ${ov.primary};`, 2);         
  addLine(`--secondary: ${ov.secondary};`, 2);       
  addLine(`--accent: ${ov.accent};`, 2);           
  addLine(`--destructive: ${ov.destructive};`, 2);   

  addStepAliasesForScope(false);

  const primaryTokenName = sg.primaryColors.primary;
  const primaryToken = brand.colors.find(c => c.name === primaryTokenName);
  if (primaryToken?.onColorLight) addLine(`--primary-foreground: ${primaryToken.onColorLight};`, 2);
  else if (sg.primaryColors.primaryForeground) addLine(`--primary-foreground: ${resolveAbstractColorRef(sg.primaryColors.primaryForeground, brand.name, brand.colors)};`,2);
  
  const secondaryTokenName = sg.secondaryColors.secondary;
  const secondaryToken = brand.colors.find(c => c.name === secondaryTokenName);
  if (secondaryToken?.onColorLight) addLine(`--secondary-foreground: ${secondaryToken.onColorLight};`, 2);
  else if (sg.secondaryColors.secondaryForeground) addLine(`--secondary-foreground: ${resolveAbstractColorRef(sg.secondaryColors.secondaryForeground, brand.name, brand.colors)};`,2);

  const accentTokenName = sg.accentColors.accent;
  const accentToken = brand.colors.find(c => c.name === accentTokenName);
  if (accentToken?.onColorLight) addLine(`--accent-foreground: ${accentToken.onColorLight};`, 2);
  else if (sg.accentColors.accentForeground) addLine(`--accent-foreground: ${resolveAbstractColorRef(sg.accentColors.accentForeground, brand.name, brand.colors)};`,2);
  
  const destructiveTokenName = sg.destructiveColors.destructive;
  const destructiveToken = brand.colors.find(c => c.name === destructiveTokenName);
  if (destructiveToken?.onColorLight) addLine(`--destructive-foreground: ${destructiveToken.onColorLight};`,2);
  else if (sg.destructiveColors.destructiveForeground) addLine(`--destructive-foreground: ${resolveAbstractColorRef(sg.destructiveColors.destructiveForeground, brand.name, brand.colors)};`,2);

  const cardBaseTokenName = sg.cardColors.card;
  const cardToken = brand.colors.find(c => c.name === cardBaseTokenName);
  if (cardToken?.onColorLight) {
    addLine(`--card-foreground: ${cardToken.onColorLight};`, 2);
  } else if (sg.cardColors.cardForeground) { 
    addLine(`--card-foreground: ${resolveAbstractColorRef(sg.cardColors.cardForeground, brand.name, brand.colors)};`, 2);
  } else if (cardToken) { 
    addLine(`--card-foreground: ${cardToken.oklchLight.includes("0.9") || cardToken.oklchLight.includes("1") ? "oklch(0.05 0.01 0)" : "oklch(0.95 0.01 0)"};`, 2);
  }

  const popoverBaseTokenName = sg.popoverColors.popover;
  const popoverToken = brand.colors.find(c => c.name === popoverBaseTokenName);
  if (popoverToken?.onColorLight) {
    addLine(`--popover-foreground: ${popoverToken.onColorLight};`, 2);
  } else if (sg.popoverColors.popoverForeground) {
    addLine(`--popover-foreground: ${resolveAbstractColorRef(sg.popoverColors.popoverForeground, brand.name, brand.colors)};`, 2);
  } else if (popoverToken) {
    addLine(`--popover-foreground: ${popoverToken.oklchLight.includes("0.9") || popoverToken.oklchLight.includes("1") ? "oklch(0.05 0.01 0)" : "oklch(0.95 0.01 0)"};`, 2);
  }
  
  if (sg.successColors) {
    const successToken = brand.colors.find(c => c.name === sg.successColors?.success); // Corrected: find by name
    if (successToken?.onColorLight) addLine(`--success-foreground: ${successToken.onColorLight};`,2);
    else if (sg.successColors.successForeground) addLine(`--success-foreground: ${resolveAbstractColorRef(sg.successColors.successForeground, brand.name, brand.colors)};`,2);
  }
  if (sg.infoColors) {
    const infoToken = brand.colors.find(c => c.name === sg.infoColors?.info); // Corrected: find by name
    if (infoToken?.onColorLight) addLine(`--info-foreground: ${infoToken.onColorLight};`,2);
    else if (sg.infoColors.infoForeground) addLine(`--info-foreground: ${resolveAbstractColorRef(sg.infoColors.infoForeground, brand.name, brand.colors)};`,2);
  }
   if (sg.warningColors) {
    const warningToken = brand.colors.find(c => c.name === sg.warningColors?.warning); // Corrected: find by name
    if (warningToken?.onColorLight) addLine(`--warning-foreground: ${warningToken.onColorLight};`,2);
    else if (sg.warningColors.warningForeground) addLine(`--warning-foreground: ${resolveAbstractColorRef(sg.warningColors.warningForeground, brand.name, brand.colors)};`,2);
  }

  addLine("", 1);
  addLine("  /* Typography etc. */", 1);
  const fontSans = brand.fonts.find(f => f.roles.includes('sans'))?.family || "sans-serif";
  const fontSerif = brand.fonts.find(f => f.roles.includes('serif'))?.family || "serif";
  const fontMono = brand.fonts.find(f => f.roles.includes('mono'))?.family || "monospace";
  addLine(`--font-sans: ${fontSans};`, 2);
  addLine(`--font-serif: ${fontSerif};`, 2);
  addLine(`--font-mono: ${fontMono};`, 2);
  const radiusBase = brand.themeCssVariables.radius || "0.625rem"; 
  addLine(`--radius: ${radiusBase};`, 2);
  addLine("}");
  addLine("");

  // --- Dark Theme --- 
  addLine("/* ╔════════════════════════╗ */");
  addLine("/* ║  DARK  THEME     ║ */");
  addLine("/* ╚════════════════════════╝ */");
  addLine(".dark {");
  addLine("  /* ——— Foundation swatches ——— */", 1);
  brand.colors.forEach(color => {
    if (color.category === 'shade' || color.category === 'color') {
      addLine(`--${color.variableName}: ${color.oklchDark};`, 2);
    }
  });
  const sage2TokenDark = brand.colors.find(c => c.variableName === 'sage-2');
  if (sage2TokenDark) {
    addLine(`--sage-3: color-mix(in oklch, var(--sage-2) 70%, white 30%);`, 2);
  }
  const graphiteTokenDark = brand.colors.find(c => c.variableName === 'graphite');
  if (graphiteTokenDark) {
    addLine(`--graphite-strong: color-mix(in oklch, var(--graphite) 60%, white 40%);`, 2);
  }

  addLine("", 1);
  addLine("  /* ——— Relative lightness steps ——— */", 1);
  brand.colors.forEach(color => {
    if (color.category === 'color') {
      Object.entries(color.darkThemeSteps).forEach(([stepKey, value]) => {
        addLine(`--${color.variableName}-${stepKey}: ${value};`, 2);
      });
    }
  });
  addLine("", 1);
  addLine("  /* ——— Semantic aliases ——— */", 1);
  addLine(`--background: ${ov.background};`, 2); 
  addLine(`--card: ${ov.card};`, 2);           
  addLine(`--popover: ${ov.popover};`, 2);    
  addLine(`--sidebar: var(--${sidebarVar});`, 2); 
  
  addLine(`--border: ${ov.border};`, 2);         
  addLine(`--input: ${ov.input};`, 2);         
  
  addLine(`--foreground: ${ov.foreground};`, 2);    
  addLine(`--ring: ${ov.ring};`, 2);           
  
  addLine(`--primary: ${ov.primary};`, 2);        
  addLine(`--secondary: ${ov.secondary};`, 2);      
  addLine(`--accent: ${ov.accent};`, 2);          
  addLine(`--destructive: ${ov.destructive};`, 2); 

  addStepAliasesForScope(true);

  if (primaryToken?.onColorDark) addLine(`--primary-foreground: ${primaryToken.onColorDark};`, 2);
  else if (sg.primaryColors.primaryForeground) addLine(`--primary-foreground: ${resolveAbstractColorRef(sg.primaryColors.primaryForeground, brand.name, brand.colors)};`,2); 
  
  if (secondaryToken?.onColorDark) addLine(`--secondary-foreground: ${secondaryToken.onColorDark};`, 2);
  else if (sg.secondaryColors.secondaryForeground) addLine(`--secondary-foreground: ${resolveAbstractColorRef(sg.secondaryColors.secondaryForeground, brand.name, brand.colors)};`,2);

  if (accentToken?.onColorDark) addLine(`--accent-foreground: ${accentToken.onColorDark};`, 2);
  else if (sg.accentColors.accentForeground) addLine(`--accent-foreground: ${resolveAbstractColorRef(sg.accentColors.accentForeground, brand.name, brand.colors)};`,2);
  
  if (destructiveToken?.onColorDark) addLine(`--destructive-foreground: ${destructiveToken.onColorDark};`,2);
  else if (sg.destructiveColors.destructiveForeground) addLine(`--destructive-foreground: ${resolveAbstractColorRef(sg.destructiveColors.destructiveForeground, brand.name, brand.colors)};`,2);

  if (cardToken?.onColorDark) {
    addLine(`--card-foreground: ${cardToken.onColorDark};`, 2);
  } else if (sg.cardColors.cardForeground) {
    addLine(`--card-foreground: ${resolveAbstractColorRef(sg.cardColors.cardForeground, brand.name, brand.colors)};`, 2);
  } else if (cardToken) {
    addLine(`--card-foreground: ${cardToken.oklchDark.includes("0.9") || cardToken.oklchDark.includes("1") ? "oklch(0.05 0.01 0)" : "oklch(0.95 0.01 0)"};`, 2);
  }

  if (popoverToken?.onColorDark) {
    addLine(`--popover-foreground: ${popoverToken.onColorDark};`, 2);
  } else if (sg.popoverColors.popoverForeground) {
    addLine(`--popover-foreground: ${resolveAbstractColorRef(sg.popoverColors.popoverForeground, brand.name, brand.colors)};`, 2);
  } else if (popoverToken) {
    addLine(`--popover-foreground: ${popoverToken.oklchDark.includes("0.9") || popoverToken.oklchDark.includes("1") ? "oklch(0.05 0.01 0)" : "oklch(0.95 0.01 0)"};`, 2);
  }

  if (sg.successColors) {
    const successToken = brand.colors.find(c => c.name === sg.successColors?.success); // Corrected: find by name
    if (successToken?.onColorDark) addLine(`--success-foreground: ${successToken.onColorDark};`,2);
    else if (sg.successColors.successForeground) addLine(`--success-foreground: ${resolveAbstractColorRef(sg.successColors.successForeground, brand.name, brand.colors)};`,2);
  }
  if (sg.infoColors) {
    const infoToken = brand.colors.find(c => c.name === sg.infoColors?.info); // Corrected: find by name
    if (infoToken?.onColorDark) addLine(`--info-foreground: ${infoToken.onColorDark};`,2);
    else if (sg.infoColors.infoForeground) addLine(`--info-foreground: ${resolveAbstractColorRef(sg.infoColors.infoForeground, brand.name, brand.colors)};`,2);
  }
   if (sg.warningColors) {
    const warningToken = brand.colors.find(c => c.name === sg.warningColors?.warning); // Corrected: find by name
    if (warningToken?.onColorDark) addLine(`--warning-foreground: ${warningToken.onColorDark};`,2);
    else if (sg.warningColors.warningForeground) addLine(`--warning-foreground: ${resolveAbstractColorRef(sg.warningColors.warningForeground, brand.name, brand.colors)};`,2);
  }
  addLine("}");
  addLine("");

  // --- @theme inline --- 
  addLine("/* ╔════════════════════════╗ */");
  addLine("/* ║  @theme inline   ║ */");
  addLine("/* ╚════════════════════════╝ */");
  addLine("@theme inline {");
  addLine("  /* Surface utilities */", 1);
  const sageTokens = brand.colors.filter(c => c.variableName.startsWith('sage-'));
  sageTokens.forEach(token => {
    addLine(`--color-${token.variableName}: var(--${token.variableName});`, 2);
  });
  if (brand.colors.find(c => c.variableName === 'sage-2')) { 
      addLine(`--color-sage-3: var(--sage-3);`, 2); 
  }

  const graphiteToken = brand.colors.find(c => c.variableName === 'graphite');
  if (graphiteToken) {
    addLine(`--color-border: var(--${graphiteToken.variableName});`, 2);
    addLine(`--color-border-strong: var(--graphite-strong);`, 2); 
  }

  brand.colors.forEach(color => {
    if (color.category === 'color') { 
      addLine(`--color-${color.variableName}: var(--${color.variableName});`, 2);
      Object.keys(color.lightThemeSteps).forEach(stepKey => { 
        addLine(`--color-${color.variableName}-${stepKey}: var(--${color.variableName}-${stepKey});`, 2);
      });
    }
  });
  addLine("", 1);
  addLine("  /* Semantic exports for shadcn/ui defaults */", 1);
  addLine(`--color-background: var(--background);`, 2);
  addLine(`--color-card: var(--card);`, 2);
  addLine(`--color-popover: var(--popover);`, 2);
  addLine(`--color-primary: var(--primary);`, 2);
  addLine(`--color-secondary: var(--secondary);`, 2);
  addLine(`--color-accent: var(--accent);`, 2);
  addLine(`--color-destructive: var(--destructive);`, 2);
  addLine(`--color-ring: var(--ring);`, 2);
  addLine(`--color-foreground: var(--foreground);`, 2);
  addLine(`--color-primary-foreground: var(--primary-foreground);`, 2);
  addLine(`--color-secondary-foreground: var(--secondary-foreground);`, 2);
  addLine(`--color-accent-foreground: var(--accent-foreground);`, 2);
  addLine(`--color-destructive-foreground: var(--destructive-foreground);`, 2);
  if (sg.successColors?.successForeground) addLine(`--color-success-foreground: var(--success-foreground);`, 2);
  if (sg.infoColors?.infoForeground) addLine(`--color-info-foreground: var(--info-foreground);`, 2);
  if (sg.warningColors?.warningForeground) addLine(`--color-warning-foreground: var(--warning-foreground);`, 2);
  addLine(`--color-card-foreground: var(--card-foreground);`,2); 
  addLine(`--color-popover-foreground: var(--popover-foreground);`,2);
  
  semanticRolesToGetSteps.forEach(roleKeyStr => {
    const roleKey = roleKeyStr as keyof ThemeCssVars;
    const targetTokenVar = ov[roleKey]; 
    if (!targetTokenVar || typeof targetTokenVar !== 'string' || !targetTokenVar.startsWith('var(--') || !targetTokenVar.endsWith(')')) return;
    
    const tokenVarName = targetTokenVar.slice(6, -1); 
    const sourceToken = brand.colors.find(c => c.variableName === tokenVarName);
    
    if (sourceToken && sourceToken.category === 'color') {
      const stepKeys: LightnessStepKey[] = ["bright", "brighter", "dark", "darker"];
      stepKeys.forEach(stepKey => {
        addLine(`--color-${roleKey}-${stepKey}: var(--${roleKey}-${stepKey});`, 2);
      });
    }
  });

  addLine("", 1);
  addLine("  /* Radii for @apply */", 1);
  addLine(`--radius-sm: ${sg.radius.radiusSm};`, 2); 
  addLine(`--radius-md: ${sg.radius.radiusMd};`, 2);
  addLine(`--radius-lg: ${sg.radius.radiusLg};`, 2);
  addLine(`--radius-xl: ${sg.radius.radiusXl};`, 2);

  addLine("}");

  return cssString;
};

/**
 * Calculates the WCAG contrast ratio between two colors.
 * Note: This is a simplified luminance-based calculation. For more advanced
 * accessibility, especially for text, consider using an APCA-based method if possible.
 * @param fgColor - The foreground color (text color).
 * @param bgColor - The background color.
 * @returns The contrast ratio.
 */

/**
 * A simple utility to get a high-contrast text color (black or white) for a given background color.
 * @param backgroundColor - The background color in any format culori can parse (e.g., hex, oklch).
 * @returns 'oklch(0.15 0 0)' (near-black) or 'oklch(0.98 0 0)' (near-white).
 */
export const getHighContrastTextColor = (backgroundColor: string): OklchString => {
  try {
    const onWhiteContrast = wcagContrast(backgroundColor, 'white');
    const onBlackContrast = wcagContrast(backgroundColor, 'black');

    // Return the color that provides higher contrast.
    // Using near-black and near-white for a less harsh look.
    return onWhiteContrast > onBlackContrast ? 'oklch(0.98 0 0)' : 'oklch(0.15 0 0)';
  } catch (e) {
    // If parsing fails, default to a safe value
    console.error("Failed to parse color for contrast check:", backgroundColor, e);
    return 'oklch(0.15 0 0)';
  }
};
