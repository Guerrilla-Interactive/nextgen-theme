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
    fontFamily?: string; // Added to base
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
    tertiary?: ButtonVariantStyles;    // Added for Nintendo theme
    quaternary?: ButtonVariantStyles;  // Added for Nintendo theme
    disabled?: ButtonVariantStyles;    // Added for Nintendo theme
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
      // fontFamily?: string; // Covered by ComponentStateStyles if header also extends/uses it
    };
    content?: ComponentStateStyles;
    footer?: ComponentStateStyles;
    // fontFamily?: string; // Already in ComponentStateStyles if this should apply to the whole card
  }
  
  export interface BadgeStyles extends ComponentStateStyles {
    // Badge-specific properties can be added here if needed
    // For now, it can extend ComponentStateStyles or be a direct alias
    // Example: if badges have distinct variants not covered by general states
    variantDefault?: ComponentStateStyles;
    variantDestructive?: ComponentStateStyles;
    variantSuccess?: ComponentStateStyles;
    variantWarning?: ComponentStateStyles;
    variantInfo?: ComponentStateStyles;
  }
  
  export interface TokenShowcaseCardStyles extends ComponentStateStyles {}
  export interface PageCardStyles extends ComponentStateStyles {}
  
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
    textColor?: string; // Added for Nintendo theme
    borderColor?: string;
    // fontFamily?: string; // Covered by ComponentStateStyles
  }
  export interface OverviewCardStyles extends ComponentStateStyles {}
  export interface BrandPickerContainerStyle extends ComponentStateStyles {
    marginTop?: string;
    marginBottom?: string;
  }
  export interface TooltipStyles extends ComponentStateStyles { 
      backdropFilter?: string;
      // fontFamily?: string; // Covered by ComponentStateStyles
  }
  
  export interface ChartStyling {
    gridStrokeColor?: string;
    axisStrokeColor?: string;
    axisTextColor?: string;
    legendTextColor?: string;
    tooltipCursorFill?: string;
  }
  
  // Add a specific type for LoadingIndicator styles if it needs more than ComponentStateStyles
  export interface LoadingIndicatorStyles extends ComponentStateStyles {
    textColor?: string; // Example: if the loading text color is separate
    // fontFamily?: string; // Covered by ComponentStateStyles
  }
  
  export type ShowcaseCardStyles = Record<string, any>;
  export type ShowcaseTitleStyles = Record<string, any>;
  
  export interface ColorFormat {
    name: string;
    hex: string;
    rgb: string;
    cmyk: string;
    variableName: string;
  }
  
  // New Definition for ComponentShowcaseItem
  export interface ComponentShowcaseItem {
    id: string;
    name: string;
    description: string;
    displayComponent: string; // Could be text for a button, or a type identifier
    variant?: string; // e.g., 'primary', 'secondary' for buttons or inputs
    state?: 'default' | 'hover' | 'focus' | 'active' | 'disabled'; // for showcasing specific states
  }
  
  // New Definition for the structure of componentShowcase
  export interface ComponentShowcaseDefinition {
    title?: string;
    description?: string;
    interactiveElements?: ComponentShowcaseItem[];
    forms?: ComponentShowcaseItem[];
    feedbackIndicators?: ComponentShowcaseItem[];
    navigation?: ComponentShowcaseItem[];
    dataDisplay?: ComponentShowcaseItem[];
    overlays?: ComponentShowcaseItem[];
  }
  
  // New Interface for a single set of surface properties
  export interface SurfaceSet {
    background: string;
    card: string;
    popover: string;
    on: string;
    muted: string;
    mutedForeground: string;
    brandSubtle?: string;
    textMuted?: string;
  }
  
  export interface BrandDefinition {
    name: string;
    id: string;
    description: string;
    brandColors: 
      {
        name: string; // e.g. "Nextgen Orange"
        hex: string; // e.g. "#FF3600"
        variableName: string; // e.g. "nextgen-orange"
        shades: {
          "50"?: {
            hex: string;
            variableName: string;
          },
          "100"?: {
            hex: string;
            variableName: string;
          },
          "200"?: {
            hex: string;
            variableName: string;
          },
          "300"?: {
            hex: string;
            variableName: string;
          },
          "400"?: {
            hex: string;
            variableName: string;
          },
          "500"?: {
            hex: string;
            variableName: string;
          },
          "600"?: {
            hex: string;
            variableName: string;
          },
          "700"?: {
            hex: string;
            variableName: string;
          },
          "800"?: {
            hex: string;
            variableName: string;
          },
          "900"? : {
            hex: string;
            variableName: string;
          },
        }
      }[]
    
    brand: { main: ColorFormat; on: string; secondary: ColorFormat };
    surface: SurfaceSet; // Use the new SurfaceSet interface
    semantic: {
      destructive: string;
      success: string;
      warning: string;
      info: string;
    };
    shape?: {
      radiusXs?: string;
      radiusSm?: string;
      radius?: string;
      radiusLg?: string;
      radiusXl?: string;
      radiusFull?: string;
    };
    typography?: {
      fontDisplay?: string;
      fontSans?: string;
      fontMono?: string;
      weightLight?: string; // Added for Nintendo theme
      weightNormal?: string;
      weightMedium?: string;
      weightSemibold?: string;
      weightBold?: string;
      leading?: string;
      tracking?: string;
      fontSizeXs?: string;
      fontSizeSm?: string;
      fontSizeBase?: string;
      fontSizeLg?: string;
      fontSizeXl?: string;
    };
    motion?: {
      motionFast?: string;
      motionStandard?: string;
      motionSlow?: string;
      ease?: string;
      easeIn?: string;
      easeOut?: string;
    };
    elevation?: {
      shadowXs?: string;
      shadowSm?: string;
      shadowMd?: string;
      shadowLg?: string;
      shadowXl?: string;
      shadowBrandSm?: string;
      shadowBrandMd?: string;
      shadowBrandLg?: string;
    };
    spacing?: {
      space1?: string;
      space2?: string;
      space3?: string;
      space4?: string;
      space5?: string;
      space6?: string;
      space8?: string;
      space12?: string;
      paddingInput?: string;
      paddingButton?: string;
      paddingCard?: string;
      paddingCompact?: string;
    };
    gradient?: { from: string; to: string; accent?: string };
    
    borderStyles?: { 
      defaultColor?: string; 
      subtleColor?: string; 
      strongColor?: string;
      defaultWidth?: string;
      thinWidth?: string;
      thickWidth?: string;
      defaultStyle?: string;
    };
    stylingPreferences?: { 
      preferBorderless?: boolean;
      applySpecialLayout?: boolean;
      containerMaxWidth?: string;
      overviewCardBoxShadow?: string; 
      contentFlexClass?: string;
      footerExtraMargin?: string;
      headingMainText?: string; 
      headingSubtitleText?: string; 
      headingSubtitleClassName?: string; 
      navTitle?: string;
      // Default fallbacks if specific ones aren't set (used by helper functions in page.tsx)
      defaultContainerMaxWidth?: string; 
      defaultOverviewCardBoxShadowVar?: string; 
      defaultContentFlexClass?: string;
      defaultFooterExtraMargin?: string;
    };
  
    componentStyles?: {
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
      tokenShowcaseCard?: TokenShowcaseCardStyles; 
      pageCard?: PageCardStyles; 
      tooltip?: TooltipStyles; 
      charts?: ChartStyling;
      loadingIndicator?: LoadingIndicatorStyles; // Added loadingIndicator
      badge?: BadgeStyles; // Added BadgeStyles
    };
  
    chartShowcase?: {}; // Consider defining a proper type like ComponentShowcaseDefinition if needed
    componentShowcase?: ComponentShowcaseDefinition; // Updated to use the new definition
    supplementaryChartColors?: string[];
    supportPalette?: ColorFormat[];
    additionalSurfaceSets?: { // New optional property for alternative surface sets
      [setName: string]: SurfaceSet;
    };
  }
  