// Core brand system types
export type BrandCategory = 'gaming' | 'enterprise' | 'creative' | 'minimal' | 'luxury' | 'tech' | 'healthcare' | 'finance' | 'retail' | 'education';
export type StyleIntensity = 'subtle' | 'moderate' | 'bold' | 'extreme';

// Minimal configuration for dynamic brand generation
export interface BrandConfig {
  name: string;
  id: string;
  category: BrandCategory;
  intensity: StyleIntensity;
  primaryColor: string;
  description?: string;
  isDark?: boolean;
}

// Component styling interfaces
export interface ComponentSpecificStyle {
  background?: string;
  borderColor?: string;
  boxShadow?: string;
  overlayImage?: string;
}

export interface ShowcaseTextStyles {
  color?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textTransform?: 'uppercase' | 'none' | 'capitalize';
  fontSize?: string;
}

export interface NavStyles extends ComponentSpecificStyle {
  showOverlay?: boolean;
}

export interface HeroStyles extends ComponentSpecificStyle {
  showOverlay?: boolean;
}

export interface TabsListStyles extends ComponentSpecificStyle {}

export interface TabsTriggerStyles extends ComponentSpecificStyle {
  textColor?: string;
  textColorActive?: string;
  backgroundActive?: string;
  boxShadowActive?: string;
  textTransform?: 'uppercase' | 'none' | 'capitalize';
  letterSpacing?: string;
  fontWeight?: string | number;
}

export interface OverviewCardStyles extends ComponentSpecificStyle {
  showOverlay?: boolean;
}

export interface ShowcaseCardStyles extends ComponentSpecificStyle {}
export interface ShowcaseTitleStyles extends ShowcaseTextStyles {}

export interface BrandPickerContainerStyle {
  overlayImage?: string;
  showOverlay?: boolean;
}

// Full brand definition (generated from config)
export interface BrandDefinition {
  name: string;
  id: string;
  description: string;
  category: BrandCategory;
  intensity: StyleIntensity;
  brand: { main: string; on: string; secondary: string };
  surface: {
    background: string;
    card: string;
    popover: string;
    on: string;
    muted: string;
    mutedForeground: string;
  };
  semantic: {
    destructive: string;
    success: string;
    warning: string;
    info: string;
  };
  shape?: { radiusSm?: string; radius?: string; radiusLg?: string; radiusXl?: string };
  typography?: {
    fontDisplay?: string;
    fontSans?: string;
    fontMono?: string;
    weightNormal?: string;
    weightMedium?: string;
    weightBold?: string;
    leading?: string;
    tracking?: string;
  };
  motion?: any;
  elevation?: any;
  spacing?: any;
  gradient?: { from: string; to: string; accent?: string };
  borderStyles?: { default?: string; };
  stylingPreferences?: { preferBorderless?: boolean; };
  componentStyles?: {
    nav?: NavStyles;
    hero?: HeroStyles;
    tabs?: { list?: TabsListStyles; trigger?: TabsTriggerStyles; };
    overviewCard?: OverviewCardStyles;
    chartShowcaseCard?: ShowcaseCardStyles;
    chartShowcaseTitle?: ShowcaseTitleStyles;
    componentShowcaseCard?: ShowcaseCardStyles;
    componentShowcaseTitle?: ShowcaseTitleStyles;
    brandPickerContainer?: BrandPickerContainerStyle;
  };
  chartShowcase?: {
    title: string;
    description: string;
    usageData: Array<any>;
    performanceData: Array<any>;
    distributionData: Array<any>;
    quickStats: Array<any>;
  };
  componentShowcase?: {
    title: string;
    description: string;
    interactiveElements: Array<{ id: string; name: string; description: string; displayComponent?: string; }>;
    forms: Array<{ id: string; name: string; description: string; displayComponent?: string; }>;
    feedbackIndicators: Array<{ id: string; name: string; description: string; displayComponent?: string; }>;
  };
}

// API response types
export interface BrandApiResponse {
  data: BrandConfig[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  categories?: BrandCategory[];
}

export interface BrandFilters {
  categories?: BrandCategory[];
  intensities?: StyleIntensity[];
  search?: string;
  page?: number;
  limit?: number;
} 