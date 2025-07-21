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
    /** Outline / focus‑ring colour */                                      ring: 6,
    /** Error & destructive messaging */                              destructive: 5,
    "destructive-foreground": 4.9,
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
    "chart-outline": 2,
    "chart-1": 1,
    "chart-2": 1,
    "chart-3": 1,
    "chart-4": 1,
    "chart-5": 1
  } as const;
  
export type Role = keyof typeof influenceHierarchy;
  
// Define which roles are considered surfaces for applying "on" colors
export const SURFACE_ROLES: ReadonlySet<Role> = new Set<Role>([
  "background", "card", "popover", "input", "muted", "secondary", "primary", "destructive", "accent", "sidebar"
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
  
  /** Base OKLCH value */
  oklch: OklchString;

  /** Original tokenSpecificName used to create this token (can be same as name) */
  rawTokenSpecificName: string;
  /** Semantic roles sorted by influence priority */
  roles: Role[];
  
  /** Pre-calculated color-mix steps */
  themeSteps: Partial<Record<LightnessStepKey, ColorMixString>>;

  /** Category of the color (e.g. a base foundation color or an accent) */
  category: 'color' | 'shade'; // 'shade' could be foundation, 'color' for accents that get steps

  /** Optional: Direct OKLCH definition for foreground/on-color. */
  onColor?: OklchString;
}
  
/**
 * Font family token.
 */
export interface FontToken {
  name: string;
  distributor: string;
  description: string;
  family: string;
  roles: string[];
  weights: Record<string, number>; // e.g., { regular: 400, bold: 700, light: 300 }
  fontWeights?: Record<string, string>; // role -> weight name mapping, e.g., { "body": "regular", "heading": "bold" }
  fontSizes?: Record<string, number>; // role -> font size in rem, e.g., { "body": 1, "heading": 2.25 }
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
  
/**
 * 7-axis design code that describes the visual characteristics of a theme.
 * Each axis represents a fundamental design dimension.
 */
export interface SevenAxisCode {
  /** Color complexity: Monochrome (simple) vs. Polychrome (complex) */
  colorComplexity: 'monochrome' | 'duotone' | 'triad' | 'polychrome';
  
  /** Default brightness preference */
  brightness: 'light' | 'adaptive';
  
  /** Color saturation: Muted/Pastel vs. Vibrant/Neon */
  saturation: 'muted' | 'pastel' | 'medium' | 'vibrant' | 'neon';
  
  /** Color relationships: Single-hue vs. Multi-hue gradients/schemes */
  colorHarmony: 'single-hue' | 'analogous' | 'complementary' | 'triadic' | 'tetradic';
  
  /** Visual hierarchy: Accent-heavy vs. Accent-neutral */
  accentUsage: 'minimal' | 'subtle' | 'balanced' | 'prominent' | 'dominant';
  
  /** Border radius: Sharp/Angular vs. Rounded */
  cornerStyle: 'sharp' | 'slightly-rounded' | 'rounded' | 'very-rounded' | 'pill';
  
  /** Visual depth: Flat vs. Elevated/Layered */
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

/**
 * Animation timing and easing configuration
 */
export interface AnimationTiming {
  /** Animation duration (e.g., "200ms", "0.2s") */
  duration: string;
  /** Animation easing function (e.g., "ease-in-out", "cubic-bezier(...)") */
  easing: string;
  /** Optional delay before animation starts */
  delay?: string;
}

/**
 * Transform-based animation properties
 */
export interface AnimationTransform {
  /** Scale transformation (e.g., "scale(0.95)" for press effect) */
  scale?: string;
  /** Translation transformation (e.g., "translateY(2px)" for press effect) */
  translate?: string;
  /** Combined transform string if needed */
  transform?: string;
}

/**
 * Animation state configuration for different interaction states
 */
export interface AnimationState extends AnimationTiming {
  /** Transform properties for this state */
  transform?: AnimationTransform;
  /** Box shadow for this state (useful for neo-brutalism press effects) */
  boxShadow?: string;
  /** Filter effects (e.g., brightness, contrast) */
  filter?: string;
  /** Opacity for this state */
  opacity?: string;
  /** Border properties that animate */
  border?: string;
  /** Background color changes */
  backgroundColor?: string;
  /** Custom properties for theme-specific effects */
  custom?: Record<string, string>;
}

/**
 * Complete animation configuration for interactive elements
 */
export interface InteractiveAnimationConfig {
  /** Default/idle state */
  default: AnimationState;
  /** Hover state animation */
  hover: AnimationState;
  /** Focus state animation */
  focus: AnimationState;
  /** Active/pressed state animation */
  active: AnimationState;
  /** Disabled state animation */
  disabled?: AnimationState;
  /** Global animation settings that apply to all states */
  global?: {
    /** CSS transition property */
    transition: string;
    /** Transform origin for animations */
    transformOrigin?: string;
    /** Will-change property for performance */
    willChange?: string;
  };
}

/**
 * Variant-specific animation configuration for components that have multiple variants
 */
export interface VariantAnimationConfig {
  /** Default variant animations (fallback for variants not explicitly defined) */
  default?: InteractiveAnimationConfig;
  /** Destructive variant animations */
  destructive?: InteractiveAnimationConfig;
  /** Outline variant animations */
  outline?: InteractiveAnimationConfig;
  /** Secondary variant animations */
  secondary?: InteractiveAnimationConfig;
  /** Ghost variant animations */
  ghost?: InteractiveAnimationConfig;
  /** Link variant animations */
  link?: InteractiveAnimationConfig;
  /** Global settings that apply to all variants */
  global?: {
    /** CSS transition property */
    transition: string;
    /** Transform origin for animations */
    transformOrigin?: string;
    /** Will-change property for performance */
    willChange?: string;
  };
}

/**
 * Animation preset definitions for different themes
 */
export interface AnimationPreset {
  /** Preset identifier */
  name: string;
  /** Description of the animation style */
  description: string;
  /** Button animation configuration - can be variant-specific or universal */
  button: InteractiveAnimationConfig | VariantAnimationConfig;
  /** Link animation configuration */
  link: InteractiveAnimationConfig;
  /** Input field animation configuration */
  input?: InteractiveAnimationConfig;
  /** Card animation configuration */
  card?: InteractiveAnimationConfig;
  /** Custom CSS classes that get applied globally */
  globalClasses?: Record<string, string>;
  /** Custom CSS keyframes */
  keyframes?: Record<string, string>;
}

/**
 * Theme-specific animation configuration
 */
export interface ThemeAnimationConfig {
  /** The animation preset to use */
  preset: AnimationPreset;
  /** Override specific animations for this theme */
  overrides?: Partial<AnimationPreset>;
  /** CSS class name that gets applied to the root element */
  rootClassName: string;
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
  /** 7-axis design code describing the visual characteristics of this theme */
  sevenAxisCode: SevenAxisCode;
  // Added optional properties
  componentStyles?: ComponentStyles;
  componentShowcase?: ComponentShowcaseConfig;
  /** Animation configuration for interactive elements */
  animationConfig?: ThemeAnimationConfig;
}
  
/**
 * Raw definition for a color before it is processed into a full ColorToken.
 */
export interface RawColorDefinition {
  tokenSpecificName: string;
  description: string;
  
  oklch: OklchString;
  
  roles: Role[];
  category: 'color' | 'shade';

  /** Optional: Explicit OKLCH string for the 'on' color. If not provided, one might be generated or aliased. */
  onColor?: OklchString;
}
  
/**
 * Creates a full ColorToken object from a raw definition.
 */
export const createColorToken = ({
  tokenSpecificName,
  description,
  oklch,
  roles,
  category,
  onColor,
}: RawColorDefinition, 
brandNameForPrefix: string // brandNameForPrefix might become less relevant if var names are direct from tokenSpecificName
): ColorToken => {
  const cssFriendlyName = tokenSpecificName.toLowerCase().replace(/\s+/g, '-');
  const baseVariableName = cssFriendlyName;

  const generateSteps = (baseVar: string): Partial<Record<LightnessStepKey, ColorMixString>> => {
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
    oklch,
    rawTokenSpecificName: tokenSpecificName,
    roles: roles.sort((a, b) => (influenceHierarchy[b] ?? 0) - (influenceHierarchy[a] ?? 0)),
    themeSteps: category === 'color' ? generateSteps(baseVariableName) : {},
    category,
    onColor,
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
  // by direct onColorLight in RawColorDefinition, or generated if not provided.
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
  addLine("/* Brand theme variables */");
  addLine("");

  // --- Light Theme Only --- 
  addLine("/* ╔════════════════════════╗ */");
  addLine("/* ║  THEME VARIABLES       ║ */");
  addLine("/* ╚════════════════════════╝ */");
  addLine(":root {");
  addLine("  /* ——— Foundation swatches ——— */", 1);
  brand.colors.forEach(color => {
    if (color.category === 'shade' || color.category === 'color') { // All base colors
      addLine(`--${color.variableName}: ${color.oklch};`, 2);
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
      Object.entries(color.themeSteps).forEach(([stepKey, value]) => {
        addLine(`--${color.variableName}-${stepKey}: ${value};`, 2);
      });
    }
  });
  addLine("", 1);
  addLine("  /* ——— Semantic aliases ——— */", 1);
  const sg = brand.style;
  const ov = brand.themeCssVariables; 

  const semanticRolesToGetSteps: Array<keyof ThemeCssVars> = [
    'primary', 'secondary', 'accent', 'destructive', 'success', 'ring',
    'chart1', 'chart2', 'chart3', 'chart4', 'chart5'
  ];

  const addStepAliases = () => {
    semanticRolesToGetSteps.forEach(roleKeyStr => {
      const roleKey = roleKeyStr as keyof ThemeCssVars;
      const targetTokenVar = ov[roleKey];

      if (roleKey === 'primary') {
        console.log(`[BrandUtils Debug] Attempting to generate step aliases for role: ${roleKey}`);
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
        const steps = sourceToken.themeSteps;
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

  // Add debugging for role assignments
  console.log("[BrandUtils] Role assignments in generateGlobalCss:");
  console.log(`  --primary: ${ov.primary}`);
  console.log(`  --secondary: ${ov.secondary}`);
  console.log(`  --accent: ${ov.accent}`);
  console.log(`  --destructive: ${ov.destructive}`);
  
  // Show what actual colors these resolve to
  if (ov.primary && ov.primary.startsWith('var(--') && ov.primary.endsWith(')')) {
    const primaryVarName = ov.primary.slice(6, -1);
    const primaryToken = brand.colors.find(c => c.variableName === primaryVarName);
    if (primaryToken) {
      console.log(`  🎨 --primary resolves to: "${primaryToken.name}" with color ${primaryToken.oklch}`);
    }
  }
  
  if (ov.accent && ov.accent.startsWith('var(--') && ov.accent.endsWith(')')) {
    const accentVarName = ov.accent.slice(6, -1);
    const accentToken = brand.colors.find(c => c.variableName === accentVarName);
    if (accentToken) {
      console.log(`  🎨 --accent resolves to: "${accentToken.name}" with color ${accentToken.oklch}`);
    }
  }

  addStepAliases();

  const primaryTokenName = sg.primaryColors.primary;
  const primaryToken = brand.colors.find(c => c.name === primaryTokenName);
  if (primaryToken?.onColor) addLine(`--primary-foreground: ${primaryToken.onColor};`, 2);
  else if (sg.primaryColors.primaryForeground) addLine(`--primary-foreground: ${resolveAbstractColorRef(sg.primaryColors.primaryForeground, brand.name, brand.colors)};`,2);
  
  const secondaryTokenName = sg.secondaryColors.secondary;
  const secondaryToken = brand.colors.find(c => c.name === secondaryTokenName);
  if (secondaryToken?.onColor) addLine(`--secondary-foreground: ${secondaryToken.onColor};`, 2);
  else if (sg.secondaryColors.secondaryForeground) addLine(`--secondary-foreground: ${resolveAbstractColorRef(sg.secondaryColors.secondaryForeground, brand.name, brand.colors)};`,2);

  const accentTokenName = sg.accentColors.accent;
  const accentToken = brand.colors.find(c => c.name === accentTokenName);
  if (accentToken?.onColor) addLine(`--accent-foreground: ${accentToken.onColor};`, 2);
  else if (sg.accentColors.accentForeground) addLine(`--accent-foreground: ${resolveAbstractColorRef(sg.accentColors.accentForeground, brand.name, brand.colors)};`,2);
  
  const destructiveTokenName = sg.destructiveColors.destructive;
  const destructiveToken = brand.colors.find(c => c.name === destructiveTokenName);
  if (destructiveToken?.onColor) addLine(`--destructive-foreground: ${destructiveToken.onColor};`,2);
  else if (sg.destructiveColors.destructiveForeground) addLine(`--destructive-foreground: ${resolveAbstractColorRef(sg.destructiveColors.destructiveForeground, brand.name, brand.colors)};`,2);

  // Sidebar variables
  if (ov.sidebar) addLine(`--sidebar: ${ov.sidebar};`, 2);
  if (ov["sidebar-foreground"]) addLine(`--sidebar-foreground: ${ov["sidebar-foreground"]};`, 2);
  if (ov["sidebar-primary"]) addLine(`--sidebar-primary: ${ov["sidebar-primary"]};`, 2);
  if (ov["sidebar-primary-foreground"]) addLine(`--sidebar-primary-foreground: ${ov["sidebar-primary-foreground"]};`, 2);
  if (ov["sidebar-accent"]) addLine(`--sidebar-accent: ${ov["sidebar-accent"]};`, 2);
  if (ov["sidebar-accent-foreground"]) addLine(`--sidebar-accent-foreground: ${ov["sidebar-accent-foreground"]};`, 2);
  if (ov["sidebar-border"]) addLine(`--sidebar-border: ${ov["sidebar-border"]};`, 2);
  if (ov["sidebar-ring"]) addLine(`--sidebar-ring: ${ov["sidebar-ring"]};`, 2);

  const cardBaseTokenName = sg.cardColors.card;
  const cardToken = brand.colors.find(c => c.name === cardBaseTokenName);
  if (cardToken?.onColor) {
    addLine(`--card-foreground: ${cardToken.onColor};`, 2);
  } else if (sg.cardColors.cardForeground) { 
    addLine(`--card-foreground: ${resolveAbstractColorRef(sg.cardColors.cardForeground, brand.name, brand.colors)};`, 2);
  } else if (cardToken) { 
    addLine(`--card-foreground: ${cardToken.oklch.includes("0.9") || cardToken.oklch.includes("1") ? "oklch(0.05 0.01 0)" : "oklch(0.95 0.01 0)"};`, 2);
  }

  const popoverBaseTokenName = sg.popoverColors.popover;
  const popoverToken = brand.colors.find(c => c.name === popoverBaseTokenName);
  if (popoverToken?.onColor) {
    addLine(`--popover-foreground: ${popoverToken.onColor};`, 2);
  } else if (sg.popoverColors.popoverForeground) {
    addLine(`--popover-foreground: ${resolveAbstractColorRef(sg.popoverColors.popoverForeground, brand.name, brand.colors)};`, 2);
  } else if (popoverToken) {
    addLine(`--popover-foreground: ${popoverToken.oklch.includes("0.9") || popoverToken.oklch.includes("1") ? "oklch(0.05 0.01 0)" : "oklch(0.95 0.01 0)"};`, 2);
  }
  
  if (sg.successColors) {
    const successToken = brand.colors.find(c => c.name === sg.successColors?.success); // Corrected: find by name
    if (successToken?.onColor) addLine(`--success-foreground: ${successToken.onColor};`,2);
    else if (sg.successColors.successForeground) addLine(`--success-foreground: ${resolveAbstractColorRef(sg.successColors.successForeground, brand.name, brand.colors)};`,2);
  }
 
  addLine("", 1);
  addLine("  /* Typography etc. */", 1);
  const fontSans = brand.fonts.find(f => f.roles.includes('sans'))?.family || "sans-serif";
  const fontSerif = brand.fonts.find(f => f.roles.includes('serif'))?.family || "serif";
  const fontMono = brand.fonts.find(f => f.roles.includes('mono'))?.family || "monospace";
  addLine(`--font-sans: ${fontSans};`, 2);
  addLine(`--font-serif: ${fontSerif};`, 2);
  addLine(`--font-mono: ${fontMono};`, 2);
  
  // Add font weight variables for each role
  const addFontWeightVariables = () => {
    // Collect all unique roles that have font weight assignments
    const roleWeightMap = new Map<string, string>();
    
    brand.fonts.forEach(font => {
      if (font.fontWeights) {
        Object.entries(font.fontWeights).forEach(([role, weightName]) => {
          if (font.weights && font.weights[weightName]) {
            const weightValue = font.weights[weightName];
            roleWeightMap.set(role, weightValue.toString());
          }
        });
      }
    });
    
    // Generate CSS variables for font weights
    if (roleWeightMap.size > 0) {
      addLine("", 1);
      addLine("  /* Font weights for roles */", 1);
      roleWeightMap.forEach((weight, role) => {
        addLine(`--font-weight-${role}: ${weight};`, 2);
      });
    }
  };

  // Add font size variables for each role
  const addFontSizeVariables = () => {
    // Collect all unique roles that have font size assignments
    const roleSizeMap = new Map<string, string>();
    
    brand.fonts.forEach(font => {
      if (font.fontSizes) {
        Object.entries(font.fontSizes).forEach(([role, sizeValue]) => {
          roleSizeMap.set(role, `${sizeValue}rem`);
        });
      }
    });
    
    // Generate CSS variables for font sizes
    if (roleSizeMap.size > 0) {
      addLine("", 1);
      addLine("  /* Font sizes for roles */", 1);
      roleSizeMap.forEach((size, role) => {
        addLine(`--font-size-${role}: ${size};`, 2);
      });
    }
  };
  
  addFontWeightVariables();
  addFontSizeVariables();
  
  const radiusBase = brand.themeCssVariables.radius || "0.625rem"; 
  addLine(`--radius: ${radiusBase};`, 2);
  
  // Add shadow variables
  if (brand.themeCssVariables["shadow-xs"]) addLine(`--shadow-xs: ${brand.themeCssVariables["shadow-xs"]};`, 2);
  if (brand.themeCssVariables["shadow-sm"]) addLine(`--shadow-sm: ${brand.themeCssVariables["shadow-sm"]};`, 2);
  if (brand.themeCssVariables["shadow-md"]) addLine(`--shadow-md: ${brand.themeCssVariables["shadow-md"]};`, 2);
  if (brand.themeCssVariables["shadow-lg"]) addLine(`--shadow-lg: ${brand.themeCssVariables["shadow-lg"]};`, 2);
  if (brand.themeCssVariables["shadow-xl"]) addLine(`--shadow-xl: ${brand.themeCssVariables["shadow-xl"]};`, 2);
  
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
      Object.keys(color.themeSteps).forEach(stepKey => { 
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

  addLine("", 1);
  addLine("  /* Shadows for @apply */", 1);
  if (brand.themeCssVariables["shadow-xs"]) addLine(`--shadow-xs: ${brand.themeCssVariables["shadow-xs"]};`, 2);
  if (brand.themeCssVariables["shadow-sm"]) addLine(`--shadow-sm: ${brand.themeCssVariables["shadow-sm"]};`, 2);
  if (brand.themeCssVariables["shadow-md"]) addLine(`--shadow-md: ${brand.themeCssVariables["shadow-md"]};`, 2);
  if (brand.themeCssVariables["shadow-lg"]) addLine(`--shadow-lg: ${brand.themeCssVariables["shadow-lg"]};`, 2);
  if (brand.themeCssVariables["shadow-xl"]) addLine(`--shadow-xl: ${brand.themeCssVariables["shadow-xl"]};`, 2);

  addLine("}");
  addLine("");

  // Helper function to get font family for a role
  const getFontFamilyForRole = (role: string): string => {
    const assignedFont = brand.fonts.find(font => font.roles?.includes(role));
    if (assignedFont?.family) {
      return assignedFont.family;
    }
    // Fallback logic
    if (role.includes('h') || role === 'heading' || role === 'display') {
      return brand.fonts.find(f => f.roles?.includes('heading') || f.roles?.includes('display'))?.family || 
             brand.fonts.find(f => f.roles?.includes('sans'))?.family || 'sans-serif';
    }
    return brand.fonts.find(f => f.roles?.includes('body') || f.roles?.includes('p'))?.family ||
           brand.fonts.find(f => f.roles?.includes('sans'))?.family || 'sans-serif';
  };
  
  // Helper function to get default font size for a role
  const getDefaultFontSizeForRole = (role: string): string => {
    const sizeMap: Record<string, string> = {
      'h1': '2.25rem', 'h2': '1.875rem', 'h3': '1.5rem', 'h4': '1.25rem', 'h5': '1.125rem', 'h6': '1rem',
      'p': '1rem', 'body': '1rem', 'default': '1rem', 'display': '3rem',
      'button': '0.875rem', 'caption': '0.75rem', 'badge': '0.75rem', 'code': '0.875rem'
    };
    return sizeMap[role] || '1rem';
  };

  // Create brand-specific class name for high specificity
  const brandClassName = brand.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // FIXED: Typography selectors that allow Tailwind utilities to override brand styles
  // Previous issue: High-specificity selectors with !important were overriding text-sm, text-lg, etc.
  // Solution: Use :not() to exclude elements with specific Tailwind text size classes
  const semanticElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
  semanticElements.forEach(element => {
    const fontFamily = getFontFamilyForRole(element);
    const defaultFontSize = getDefaultFontSizeForRole(element);
    const defaultWeight = element === 'p' ? '400' : element.includes('h') ? '700' : '400';
    
    // Only target elements without specific Tailwind text size classes
    // This allows Tailwind size utilities to override brand defaults while preserving other functionality
    const tailwindSizeClasses = 'text-xs,text-sm,text-base,text-lg,text-xl,text-2xl,text-3xl,text-4xl,text-5xl,text-6xl,text-7xl,text-8xl,text-9xl';
    const notSelectors = tailwindSizeClasses.split(',').map(cls => `[class*="${cls}"]`).join(',');
    
    addLine(`html.theme-${brandClassName} ${element}:not(${notSelectors}), .theme-${brandClassName} ${element}:not(${notSelectors}) {`);
    addLine(`font-family: ${fontFamily};`, 2);
    addLine(`font-size: var(--font-size-${element}, ${defaultFontSize});`, 2);
    addLine(`font-weight: var(--font-weight-${element}, ${defaultWeight});`, 2);
    addLine(`}`, 0);
    addLine("");
    
    // Only apply font-family with !important (but not size/weight) to maintain brand consistency
    addLine(`html.theme-${brandClassName} ${element}, .theme-${brandClassName} ${element} {`);
    addLine(`font-family: ${fontFamily} !important;`, 2);
    addLine(`}`, 0);
    addLine("");
  });

  return cssString;
};

/**
 * Generates CSS for animation configurations
 */
export const generateAnimationCss = (animationConfig: ThemeAnimationConfig): string => {
  const { preset, rootClassName } = animationConfig;
  let css = '';

  const addLine = (line: string, indentLevel = 0) => {
    css += `${'  '.repeat(indentLevel)}${line}\n`;
  };

  // Universal reset - ALWAYS reset all animation styles first to prevent bleeding
  addLine(`/* Universal animation reset - prevents style bleeding between themes */`);
  addLine(`[data-slot="button"]:not([class*="link"]) {`);
  addLine(`box-shadow: none !important;`, 1);
  addLine(`transform: translate(0px, 0px) !important;`, 1);
  addLine(`transition: all 200ms ease !important;`, 1);
  addLine(`}`, 0);
  
  // Reset all possible button states universally
  const universalStates = ['', ':hover:not(:disabled)', ':focus-visible:not(:disabled)', ':active:not(:disabled)', ':disabled'];
  universalStates.forEach(state => {
    addLine(`[data-slot="button"]:not([class*="link"])${state} {`);
    addLine(`box-shadow: ${state === ':focus-visible:not(:disabled)' ? '0 0 0 2px var(--ring)' : 'none'} !important;`, 1);
    addLine(`transform: translate(0px, 0px) !important;`, 1);
    addLine(`}`, 0);
  });
  addLine('');

  // Now apply theme-specific styles with higher specificity
  addLine(`/* Theme-specific styles for ${preset.name} */`);
  addLine(`.${rootClassName} [data-slot="button"]:not([class*="link"]) {`);
  
  // Apply theme-specific base styles
  if (preset.button.global?.transition) {
    addLine(`transition: ${preset.button.global.transition} !important;`, 1);
  }
  if (preset.button.global?.transformOrigin) {
    addLine(`transform-origin: ${preset.button.global.transformOrigin} !important;`, 1);
  }
  if (preset.button.global?.willChange) {
    addLine(`will-change: ${preset.button.global.willChange} !important;`, 1);
  }
  addLine(`}`, 0);
  addLine('');

  // Add keyframes first
  if (preset.keyframes) {
    Object.values(preset.keyframes).forEach(keyframe => {
      addLine(keyframe);
      addLine('');
    });
  }

  // Add global classes
  if (preset.globalClasses) {
    Object.entries(preset.globalClasses).forEach(([className, styles]) => {
      addLine(`.${rootClassName} .${className} {`);
      addLine(styles, 1);
      addLine('}');
      addLine('');
    });
  }

  // Generate component-specific animation classes
  const generateComponentCss = (
    componentName: string,
    componentConfig: InteractiveAnimationConfig
  ) => {
    addLine(`/* ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} animations for ${preset.name} theme */`);
    
    // State-specific styles
    const states = ['default', 'hover', 'focus', 'active', 'disabled'] as const;
    states.forEach(state => {
      const stateConfig = componentConfig[state];
      if (!stateConfig) return;

      let selector = `.${rootClassName} [data-slot="${componentName}"]`;
      
      // For buttons, exclude link variants from animations
      if (componentName === 'button') {
        selector += ':not([class*="link"])';
      }
      
      switch (state) {
        case 'hover':
          selector += ':hover:not(:disabled)';
          break;
        case 'focus':
          selector += ':focus-visible:not(:disabled)';
          break;
        case 'active':
          selector += ':active:not(:disabled)';
          break;
        case 'disabled':
          selector += ':disabled';
          break;
      }

      addLine(`${selector} {`);

      // Add transform properties
      if (stateConfig.transform) {
        const { scale, translate, transform } = stateConfig.transform;
        let transformValue = '';
        
        if (transform) {
          transformValue = transform;
        } else {
          const transformParts = [];
          if (translate) transformParts.push(translate);
          if (scale) transformParts.push(`scale(${scale})`);
          transformValue = transformParts.join(' ');
        }
        
        if (transformValue) {
          addLine(`transform: ${transformValue} !important;`, 1);
        }
      }

      // Add other properties with !important to ensure they override previous theme styles
      if (stateConfig.boxShadow) {
        // Normalize multiline box-shadow values by removing extra whitespace and newlines
        const normalizedBoxShadow = stateConfig.boxShadow
          .replace(/\s*\n\s*/g, ' ')  // Replace newlines and surrounding whitespace with single space
          .replace(/\s+/g, ' ')       // Replace multiple spaces with single space
          .trim();                    // Remove leading/trailing whitespace
        addLine(`box-shadow: ${normalizedBoxShadow} !important;`, 1);
      }
      
      if (stateConfig.opacity) {
        addLine(`opacity: ${stateConfig.opacity} !important;`, 1);
      }
      if (stateConfig.backgroundColor) {
        addLine(`background-color: ${stateConfig.backgroundColor} !important;`, 1);
      }
      if (stateConfig.border) {
        addLine(`border: ${stateConfig.border} !important;`, 1);
      }
      if (stateConfig.filter) {
        addLine(`filter: ${stateConfig.filter} !important;`, 1);
      }

      // Add custom properties
      if (stateConfig.custom) {
        Object.entries(stateConfig.custom).forEach(([prop, value]) => {
          addLine(`${prop}: ${value} !important;`, 1);
        });
      }

      addLine('}');
      addLine('');
    });
  };

  // Helper function to check if animation config is variant-specific
  const isVariantAnimationConfig = (config: InteractiveAnimationConfig | VariantAnimationConfig): config is VariantAnimationConfig => {
    return 'default' in config || 'destructive' in config || 'outline' in config || 'secondary' in config || 'ghost' in config;
  };

  // Generate variant-specific animation classes for buttons
  const generateVariantSpecificCss = (
    componentName: string,
    variantConfig: VariantAnimationConfig
  ) => {
    addLine(`/* ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} variant-specific animations for ${preset.name} theme */`);
    
    // Define button variants that should get animations
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
          case 'hover':
            selector += ':hover:not(:disabled)';
            break;
          case 'focus':
            selector += ':focus-visible:not(:disabled)';
            break;
          case 'active':
            selector += ':active:not(:disabled)';
            break;
          case 'disabled':
            selector += ':disabled';
            break;
        }

        addLine(`${selector} {`);

        // Add transform properties
        if (stateConfig.transform) {
          const { scale, translate, transform } = stateConfig.transform;
          let transformValue = '';
          
          if (transform) {
            transformValue = transform;
          } else {
            const transformParts = [];
            if (translate) transformParts.push(translate);
            if (scale) transformParts.push(`scale(${scale})`);
            transformValue = transformParts.join(' ');
          }
          
          if (transformValue) {
            addLine(`transform: ${transformValue} !important;`, 1);
          }
        }

        // Add other properties with !important to ensure they override previous theme styles
        if (stateConfig.boxShadow) {
          // Normalize multiline box-shadow values by removing extra whitespace and newlines
          const normalizedBoxShadow = stateConfig.boxShadow
            .replace(/\s*\n\s*/g, ' ')  // Replace newlines and surrounding whitespace with single space
            .replace(/\s+/g, ' ')       // Replace multiple spaces with single space
            .trim();                    // Remove leading/trailing whitespace
          addLine(`box-shadow: ${normalizedBoxShadow} !important;`, 1);
        }
        
        if (stateConfig.opacity) {
          addLine(`opacity: ${stateConfig.opacity} !important;`, 1);
        }
        if (stateConfig.backgroundColor) {
          addLine(`background-color: ${stateConfig.backgroundColor} !important;`, 1);
        }
        if (stateConfig.border) {
          addLine(`border: ${stateConfig.border} !important;`, 1);
        }
        if (stateConfig.filter) {
          addLine(`filter: ${stateConfig.filter} !important;`, 1);
        }

        // Add custom properties
        if (stateConfig.custom) {
          Object.entries(stateConfig.custom).forEach(([prop, value]) => {
            addLine(`${prop}: ${value} !important;`, 1);
          });
        }

        addLine('}');
        addLine('');
      });
    });
  };

  // Generate CSS for each component type
  if (isVariantAnimationConfig(preset.button)) {
    // Handle variant-specific button animations
    generateVariantSpecificCss('button', preset.button);
    
    // Also apply global button styles if they exist
    if (preset.button.global) {
      addLine(`/* Global button styles for ${preset.name} theme */`);
      addLine(`.${rootClassName} [data-slot="button"] {`);
      
      if (preset.button.global.transition) {
        addLine(`transition: ${preset.button.global.transition} !important;`, 1);
      }
      if (preset.button.global.transformOrigin) {
        addLine(`transform-origin: ${preset.button.global.transformOrigin} !important;`, 1);
      }
      if (preset.button.global.willChange) {
        addLine(`will-change: ${preset.button.global.willChange} !important;`, 1);
      }
      
      addLine(`}`, 0);
      addLine('');
    }
  } else {
    // Handle universal button animations (backwards compatibility)
    generateComponentCss('button', preset.button);
  }
  
  generateComponentCss('link', preset.link);
  
  if (preset.input) {
    generateComponentCss('input', preset.input);
  }
  
  if (preset.card) {
    generateComponentCss('card', preset.card);
  }

  return css;
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
