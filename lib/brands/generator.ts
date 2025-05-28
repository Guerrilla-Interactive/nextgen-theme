import { BrandConfig, BrandDefinition, BrandCategory, StyleIntensity } from './types';

// Chart data interfaces
interface ChartDataPoint {
  name: string;
  value: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
}

interface DistributionData {
  name: string;
  value: number;
  fill: string;
}

interface QuickStat {
  label: string;
  value: string;
}

interface ComponentElement {
  id: string;
  name: string;
  description: string;
  displayComponent?: string;
}

// Component style template interfaces
interface ComponentStyleTemplate {
  nav?: {
    background?: string;
    borderColor?: string;
    boxShadow?: string;
    overlayImage?: string;
    showOverlay?: boolean;
  };
  tabs?: {
    trigger?: {
      textTransform?: 'uppercase' | 'none' | 'capitalize';
      letterSpacing?: string;
      fontWeight?: string | number;
    };
  };
}

interface StyleTemplates {
  [category: string]: ComponentStyleTemplate;
}

interface GeneratedColors {
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
  gradient: { from: string; to: string; accent?: string };
}

// Default token families
export const DEFAULT_SHAPE = {
  radiusSm: "0.25rem",
  radius: "0.5rem",
  radiusLg: "1rem",
  radiusXl: "1.5rem",
};

export const DEFAULT_TYPOGRAPHY = {
  fontSans: "'Inter', sans-serif",
  fontDisplay: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  weightNormal: "400",
  weightMedium: "500",
  weightBold: "700",
  leading: "1.55",
  tracking: "0",
};

export const DEFAULT_MOTION = {
  motionFast: "120ms",
  motionStandard: "240ms",
  motionSlow: "360ms",
  ease: "cubic-bezier(.4,0,.2,1)",
  easeIn: "cubic-bezier(.4,0,1,1)",
  easeOut: "cubic-bezier(0,0,.2,1)",
};

export const DEFAULT_ELEVATION = {
  shadowSm: "0 1px 2px rgba(0,0,0,.02)",
  shadowMd: "0 2px 4px rgba(0,0,0,.04)",
  shadowLg: "0 4px 8px rgba(0,0,0,.06)",
  shadowXl: "0 8px 16px rgba(0,0,0,.08)",
};

export const DEFAULT_SPACING = {
  space1: "0.25rem",
  space2: "0.5rem",
  space3: "0.75rem",
  space4: "1rem",
  space5: "1.5rem",
  space6: "2rem",
  space8: "3rem",
  space12: "4rem",
};

// Color manipulation utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function adjustBrightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const adjust = (value: number) => Math.max(0, Math.min(255, value + amount));
  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}

export function generateColorPalette(primaryColor: string, isDark: boolean = false) {
  const rgb = hexToRgb(primaryColor);
  if (!rgb) throw new Error('Invalid primary color');

  // Generate a comprehensive color palette based on the primary color and theme
  const baseColors = {
    primary: primaryColor,
    primaryDark: adjustBrightness(primaryColor, isDark ? 40 : -40),
    primaryLight: adjustBrightness(primaryColor, isDark ? -20 : 60),
  };

  // Generate surface colors based on whether it's a dark theme
  const surfaceColors = isDark ? {
    background: "#0A0A0A",
    card: "#111111", 
    popover: "#1A1A1A",
    on: "#FFFFFF",
    muted: "#262626",
    mutedForeground: "#A1A1AA",
  } : {
    background: "#FFFFFF",
    card: "#FAFAFA",
    popover: "#FFFFFF", 
    on: "#0A0A0A",
    muted: "#F4F4F5",
    mutedForeground: "#71717A",
  };

  // Generate semantic colors that work with the primary
  const semanticColors = {
    destructive: "#EF4444",
    success: "#22C55E", 
    warning: "#F59E0B",
    info: "#3B82F6",
  };

  // Determine text on primary color (white or black)
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  const onPrimary = brightness > 128 ? "#000000" : "#FFFFFF";

  return {
    brand: {
      main: primaryColor,
      on: onPrimary,
      secondary: baseColors.primaryLight,
    },
    surface: surfaceColors,
    semantic: semanticColors,
    gradient: {
      from: primaryColor,
      to: baseColors.primaryLight,
      accent: baseColors.primaryDark,
    }
  };
}

// Data generation functions
export function generateUsageData(category: BrandCategory): Array<ChartDataPoint> {
  const baseData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ];

  // Modify based on category
  const multiplier = category === 'gaming' ? 1.5 : category === 'enterprise' ? 0.8 : 1.0;
  return baseData.map(item => ({ ...item, value: Math.round(item.value * multiplier) }));
}

export function generatePerformanceData(category: BrandCategory): Array<PerformanceMetric> {
  const baseMetrics = [
    { name: "Load Time", value: 1.2, target: 2.0 },
    { name: "Bundle Size", value: 245, target: 500 },
    { name: "Accessibility", value: 98, target: 95 },
    { name: "Performance", value: 92, target: 90 },
  ];

  // Adjust based on category characteristics
  if (category === 'gaming') {
    baseMetrics[0].value = 0.8; // Faster load time for gaming
    baseMetrics[3].value = 96; // Higher performance
  } else if (category === 'enterprise') {
    baseMetrics[2].value = 99; // Higher accessibility for enterprise
  }

  return baseMetrics;
}

export function generateDistributionData(category: BrandCategory): Array<DistributionData> {
  const baseDistribution = [
    { name: "Desktop", value: 60, fill: "var(--chart-1)" },
    { name: "Mobile", value: 30, fill: "var(--chart-2)" },
    { name: "Tablet", value: 10, fill: "var(--chart-3)" },
  ];

  // Adjust distribution based on category
  if (category === 'gaming') {
    return [
      { name: "Desktop", value: 80, fill: "var(--chart-1)" },
      { name: "Mobile", value: 15, fill: "var(--chart-2)" },
      { name: "Tablet", value: 5, fill: "var(--chart-3)" },
    ];
  } else if (category === 'retail') {
    return [
      { name: "Mobile", value: 55, fill: "var(--chart-2)" },
      { name: "Desktop", value: 35, fill: "var(--chart-1)" },
      { name: "Tablet", value: 10, fill: "var(--chart-3)" },
    ];
  }

  return baseDistribution;
}

export function generateQuickStats(category: BrandCategory): Array<QuickStat> {
  const baseStats = [
    { label: "Active Users", value: "2.4K" },
    { label: "Conversion", value: "3.2%" },
    { label: "Bounce Rate", value: "42%" },
    { label: "Session Duration", value: "4m 32s" },
  ];

  // Customize based on category
  if (category === 'gaming') {
    return [
      { label: "Active Players", value: "12.4K" },
      { label: "Playtime", value: "45m" },
      { label: "Retention", value: "87%" },
      { label: "Matches", value: "156" },
    ];
  } else if (category === 'enterprise') {
    return [
      { label: "Team Members", value: "1.2K" },
      { label: "Projects", value: "89" },
      { label: "Uptime", value: "99.9%" },
      { label: "Response Time", value: "120ms" },
    ];
  } else if (category === 'finance') {
    return [
      { label: "Transactions", value: "$2.4M" },
      { label: "Security Score", value: "AAA" },
      { label: "Compliance", value: "100%" },
      { label: "Processing", value: "1.2s" },
    ];
  }

  return baseStats;
}

// Component style generation
export function generateComponentStyles(config: BrandConfig, template: ComponentStyleTemplate, colors: GeneratedColors) {
  const { category, intensity } = config;

  // Base styles that vary by category and intensity
  const styleTemplates: StyleTemplates = {
    gaming: {
      nav: {
        background: intensity === 'extreme' ? `linear-gradient(135deg, ${colors.brand.main}20, ${colors.surface.background})` : colors.surface.card,
        borderColor: intensity === 'bold' || intensity === 'extreme' ? colors.brand.main : 'transparent',
        boxShadow: intensity === 'extreme' ? `0 0 20px ${colors.brand.main}40` : undefined,
        overlayImage: intensity === 'extreme' ? `radial-gradient(circle at 50% 50%, ${colors.brand.main}10 0%, transparent 70%)` : undefined,
        showOverlay: intensity === 'extreme',
      },
      tabs: {
        trigger: {
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          fontWeight: intensity === 'extreme' ? '700' : '600',
        }
      }
    },
    minimal: {
      nav: {
        background: colors.surface.background,
        borderColor: 'transparent',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
      tabs: {
        trigger: {
          textTransform: 'none' as const,
          letterSpacing: '0',
          fontWeight: '500',
        }
      }
    },
    luxury: {
      nav: {
        background: `linear-gradient(135deg, ${colors.brand.main}05, ${colors.surface.card})`,
        borderColor: colors.brand.main,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      },
      tabs: {
        trigger: {
          textTransform: intensity === 'extreme' ? 'uppercase' as const : 'none' as const,
          letterSpacing: intensity === 'extreme' ? '0.1em' : '0.02em',
          fontWeight: '600',
        }
      }
    },
    // Add more categories as needed
  };

  const categoryTemplate = styleTemplates[category] || styleTemplates.minimal;
  
  return {
    nav: categoryTemplate.nav,
    hero: {
      ...categoryTemplate.nav,
      background: colors.surface.background,
    },
    tabs: categoryTemplate.tabs,
    overviewCard: {
      background: colors.surface.card,
      borderColor: category === 'minimal' ? 'transparent' : colors.brand.main + '20',
      boxShadow: category === 'gaming' && intensity === 'extreme' ? `0 0 15px ${colors.brand.main}20` : undefined,
    },
    brandPickerContainer: {
      overlayImage: category === 'gaming' && intensity === 'extreme' ? `radial-gradient(circle at 80% 20%, ${colors.brand.main}15 0%, transparent 50%)` : undefined,
      showOverlay: category === 'gaming' && intensity === 'extreme',
    }
  };
}

export function generateDescription(category: BrandCategory, name: string): string {
  const descriptions = {
    gaming: `A high-performance gaming brand theme for ${name}, featuring bold neon accents, cyberpunk aesthetics, and RGB lighting effects designed for maximum visual impact.`,
    enterprise: `Professional enterprise theme for ${name} with clean layouts, accessible colors, and business-focused design patterns optimized for productivity.`,
    creative: `Creative and expressive theme for ${name} with vibrant colors, artistic flair, and design-forward components that inspire innovation.`,
    minimal: `Clean and minimal theme for ${name} emphasizing simplicity, white space, and subtle design elements for distraction-free experiences.`,
    luxury: `Premium luxury theme for ${name} with sophisticated color palettes, elegant typography, and refined design details.`,
    tech: `Modern tech theme for ${name} with sharp lines, monospace accents, and developer-friendly design patterns.`,
    healthcare: `Trustworthy healthcare theme for ${name} with calming colors, high accessibility, and medical industry design standards.`,
    finance: `Secure finance theme for ${name} with professional styling, data-focused layouts, and trust-building design elements.`,
    retail: `Customer-focused retail theme for ${name} with conversion-optimized layouts, product showcase components, and shopping-friendly design.`,
    education: `Educational theme for ${name} with learning-focused layouts, accessible design, and knowledge-sharing optimized components.`,
  };

  return descriptions[category] || `Custom theme for ${name} with unique styling and brand-specific design elements.`;
}

export function generateInteractiveElements(config: BrandConfig): Array<ComponentElement> {
  const { category } = config;
  
  const baseElements = [
    { id: "button-primary", name: "Primary Button", description: "Main call-to-action button" },
    { id: "button-secondary", name: "Secondary Button", description: "Secondary action button" },
    { id: "input-text", name: "Text Input", description: "Standard text input field" },
    { id: "select-dropdown", name: "Select Dropdown", description: "Dropdown selection component" },
    { id: "toggle-switch", name: "Toggle Switch", description: "Binary toggle control" },
    { id: "slider-range", name: "Range Slider", description: "Numeric range selector" },
  ];

  // Customize based on category
  if (category === 'gaming') {
    return [
      ...baseElements,
      { id: "neon-button", name: "Neon Button", description: "Gaming-style glowing button" },
      { id: "progress-bar", name: "XP Progress Bar", description: "Gaming progress indicator" },
    ];
  } else if (category === 'enterprise') {
    return [
      ...baseElements,
      { id: "data-table", name: "Data Table", description: "Enterprise data grid" },
      { id: "form-builder", name: "Form Builder", description: "Dynamic form component" },
    ];
  }

  return baseElements;
}

export function generateFormElements(config: BrandConfig): Array<ComponentElement> {
  const { category } = config;
  
  const baseElements = [
    { id: "login-form", name: "Login Form", description: "User authentication form" },
    { id: "contact-form", name: "Contact Form", description: "Customer contact form" },
    { id: "search-bar", name: "Search Bar", description: "Global search component" },
    { id: "filter-panel", name: "Filter Panel", description: "Content filtering interface" },
  ];

  if (category === 'retail') {
    return [
      ...baseElements,
      { id: "checkout-form", name: "Checkout Form", description: "E-commerce checkout" },
      { id: "product-review", name: "Product Review", description: "Customer review form" },
    ];
  } else if (category === 'healthcare') {
    return [
      ...baseElements,
      { id: "patient-form", name: "Patient Form", description: "Medical information form" },
      { id: "appointment-booking", name: "Appointment Booking", description: "Healthcare scheduling" },
    ];
  }

  return baseElements;
}

export function generateFeedbackElements(config: BrandConfig): Array<ComponentElement> {
  const { category } = config;
  
  const baseElements = [
    { id: "alert-success", name: "Success Alert", description: "Success notification" },
    { id: "alert-error", name: "Error Alert", description: "Error notification" },
    { id: "toast-info", name: "Info Toast", description: "Information toast" },
    { id: "loading-spinner", name: "Loading Spinner", description: "Loading indicator" },
    { id: "progress-linear", name: "Progress Bar", description: "Task progress indicator" },
  ];

  if (category === 'gaming') {
    return [
      ...baseElements,
      { id: "achievement-popup", name: "Achievement", description: "Gaming achievement notification" },
      { id: "level-up", name: "Level Up", description: "Player progression feedback" },
    ];
  } else if (category === 'finance') {
    return [
      ...baseElements,
      { id: "transaction-success", name: "Transaction Success", description: "Payment confirmation" },
      { id: "security-alert", name: "Security Alert", description: "Security notification" },
    ];
  }

  return baseElements;
}

// Main brand generation function
export function generateBrand(config: BrandConfig): BrandDefinition {
  const colors = generateColorPalette(config.primaryColor, config.isDark);
  const componentStyles = generateComponentStyles(config, {}, colors);
  
  return {
    name: config.name,
    id: config.id,
    description: config.description || generateDescription(config.category, config.name),
    category: config.category,
    intensity: config.intensity,
    brand: colors.brand,
    surface: colors.surface,
    semantic: colors.semantic,
    gradient: colors.gradient,
    
    // Use defaults but allow for category-specific overrides
    shape: DEFAULT_SHAPE,
    typography: DEFAULT_TYPOGRAPHY,
    motion: DEFAULT_MOTION,
    elevation: DEFAULT_ELEVATION,
    spacing: DEFAULT_SPACING,
    
    // Component-specific styles
    componentStyles: componentStyles,
    
    // Generated showcase data
    chartShowcase: {
      title: `${config.name} Analytics Dashboard`,
      description: `Performance metrics and usage analytics for the ${config.name} design system`,
      usageData: generateUsageData(config.category),
      performanceData: generatePerformanceData(config.category),
      distributionData: generateDistributionData(config.category),
      quickStats: generateQuickStats(config.category),
    },
    
    componentShowcase: {
      title: `${config.name} Component Library`,
      description: `Interactive components and design patterns for the ${config.name} design system`,
      interactiveElements: generateInteractiveElements(config),
      forms: generateFormElements(config),
      feedbackIndicators: generateFeedbackElements(config),
    },
  };
}

// CSS variable generation
export function makeCssVars(brand: BrandDefinition): Record<string, string> {
  const shape = { ...DEFAULT_SHAPE, ...(brand.shape ?? {}) };
  const typography = { ...DEFAULT_TYPOGRAPHY, ...(brand.typography ?? {}) };
  const motion = { ...DEFAULT_MOTION, ...(brand.motion ?? {}) };
  const elevation = { ...DEFAULT_ELEVATION, ...(brand.elevation ?? {}) };
  const spacing = { ...DEFAULT_SPACING, ...(brand.spacing ?? {}) };
  const brandGradient = brand.gradient ?? { from: brand.brand.main, to: brand.brand.secondary, accent: brand.brand.main };

  const cssVars: Record<string, string> = {
    // Base theme colors from brand definition
    "--background": brand.surface.background,
    "--foreground": brand.surface.on,
    "--card": brand.surface.card,
    "--card-foreground": brand.surface.on,
    "--popover": brand.surface.popover,
    "--popover-foreground": brand.surface.on,
    "--primary": brand.brand.main,
    "--primary-foreground": brand.brand.on,
    "--secondary": brand.surface.muted, 
    "--secondary-foreground": brand.surface.on,
    "--muted": brand.surface.muted,
    "--muted-foreground": brand.surface.mutedForeground,
    "--accent": brand.surface.popover, 
    "--accent-foreground": brand.surface.on,
    "--destructive": brand.semantic.destructive,
    "--destructive-foreground": "#FFFFFF", 
    "--success": brand.semantic.success,
    "--warning": brand.semantic.warning,
    "--info": brand.semantic.info,
    "--border": brand.borderStyles?.default ?? "transparent", 
    "--input": brand.componentStyles?.nav?.background ?? brand.surface.card,
    "--ring": brand.brand.main, 

    // Chart colors 
    "--chart-1": brand.brand.main,
    "--chart-2": brand.semantic.success,
    "--chart-3": brand.semantic.info,
    "--chart-4": brand.semantic.warning,
    "--chart-5": brand.semantic.destructive,

    // Component-specific styles
    "--nav-background-image": brand.componentStyles?.nav?.background ?? brand.surface.card,
    "--nav-border-color": brand.componentStyles?.nav?.borderColor ?? "transparent",
    "--nav-box-shadow": brand.componentStyles?.nav?.boxShadow ?? "none",
    "--nav-overlay-image": brand.componentStyles?.nav?.overlayImage ?? "none",

    "--hero-background-image": brand.componentStyles?.hero?.background ?? brand.surface.background,
    "--hero-border-color": brand.componentStyles?.hero?.borderColor ?? "transparent",
    "--hero-box-shadow": brand.componentStyles?.hero?.boxShadow ?? "none",
    "--hero-overlay-image": brand.componentStyles?.hero?.overlayImage ?? "none",

    "--tabs-list-background": brand.componentStyles?.tabs?.list?.background ?? brand.surface.muted,
    "--tabs-list-border-color": brand.componentStyles?.tabs?.list?.borderColor ?? "transparent",
    "--tabs-list-box-shadow": brand.componentStyles?.tabs?.list?.boxShadow ?? "none",

    "--tabs-trigger-text-color": brand.componentStyles?.tabs?.trigger?.textColor ?? brand.surface.mutedForeground,
    "--tabs-trigger-text-color-active": brand.componentStyles?.tabs?.trigger?.textColorActive ?? brand.surface.on,
    "--tabs-trigger-background": brand.componentStyles?.tabs?.trigger?.background ?? "transparent",
    "--tabs-trigger-background-active": brand.componentStyles?.tabs?.trigger?.backgroundActive ?? brand.surface.card,
    "--tabs-trigger-box-shadow-active": brand.componentStyles?.tabs?.trigger?.boxShadowActive ?? "none",

    "--overview-card-background": brand.componentStyles?.overviewCard?.background ?? brand.surface.card,
    "--overview-card-border-color": brand.componentStyles?.overviewCard?.borderColor ?? "transparent",
    "--overview-card-box-shadow": brand.componentStyles?.overviewCard?.boxShadow ?? "none",
    "--overview-card-overlay-image": brand.componentStyles?.overviewCard?.overlayImage ?? "none", 

    "--brand-picker-container-overlay-image": brand.componentStyles?.brandPickerContainer?.overlayImage ?? "none",
  };

  // Populate CSS variables from token families
  Object.entries(shape).forEach(([k, v]) => { cssVars[`--${k}`] = v as string; });
  Object.entries(typography).forEach(([k, v]) => { cssVars[`--${k}`] = v as string; });
  Object.entries(motion).forEach(([k, v]) => { cssVars[`--${k}`] = v as string; });
  Object.entries(elevation).forEach(([k, v]) => { cssVars[`--${k}`] = v as string; });
  Object.entries(spacing).forEach(([k, v]) => { cssVars[`--${k}`] = v as string; });
  Object.entries(brandGradient).forEach(([k, v]) => { cssVars[`--gradient-${k}`] = v as string; });

  return cssVars;
} 