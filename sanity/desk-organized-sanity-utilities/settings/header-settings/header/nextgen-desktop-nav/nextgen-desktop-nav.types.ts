import { ReactNode } from "react"

/**
 * Theme configuration types
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Valid animation types for dropdowns
 */
export type AnimationType = 'fade' | 'slide' | 'scale' | 'none';

/**
 * State-based property configuration
 */
export interface StateProperties<T> {
  /** Default state value */
  default: T
  /** Hover state value */
  hover?: T
  /** Focus state value */
  focus?: T
  /** Active state value */
  active?: T
}

/**
 * Color properties for different states
 */
export interface ColorProperties {
  /** Background color for different states */
  background: StateProperties<string>;
  /** Text color for different states */
  text: StateProperties<string>;
  /** Border color for different states */
  border: StateProperties<string>;
  /** Dropdown-specific colors */
  dropdown: {
    /** Background color for dropdown */
    background: StateProperties<string>;
    /** Text color for dropdown */
    text: StateProperties<string>;
    /** Border color for dropdown */
    border: StateProperties<string>;
    /** Description text color */
    description: string;
    /** Dropdown items colors */
    items: {
      /** Background color for dropdown items */
      background: StateProperties<string>;
      /** Border color for dropdown items */
      border: StateProperties<string>;
    };
    /** Indicator colors */
    indicators: {
      /** Arrow color */
      arrow: string;
      /** Hover indicator color */
      hover: string;
    }
  }
}

/**
 * Typography related properties
 */
export interface TypographyProperties {
  /** 
   * Font weight 
   * @examples
   * Works:
   * - Tailwind only: 'font-normal', 'font-medium', 'font-bold'
   * 
   * Doesn't work:
   * - CSS values: '400', '700'
   * - Direct values: 'normal', 'bold'
   */
  weight: string
  /** 
   * Text transform 
   * @examples
   * Works:
   * - Tailwind only: 'uppercase', 'lowercase', 'capitalize', 'normal-case'
   * 
   * Doesn't work:
   * - CSS values: 'uppercase', 'lowercase' (without Tailwind prefix)
   */
  transform: string
  /** 
   * Font size (Tailwind class) 
   * @examples
   * Works:
   * - Tailwind only: 'text-sm', 'text-base', 'text-lg'
   * 
   * Doesn't work:
   * - CSS values: '14px', '1rem'
   */
  size: string
}

/**
 * Border related properties (excluding color)
 */
export interface BorderStyleProperties {
  /** 
   * Border width 
   * @examples
   * Works:
   * - Tailwind only: 'border', 'border-2', 'border-0'
   * 
   * Doesn't work:
   * - CSS values: '1px', '2px'
   */
  width: string
  /** 
   * Border radius 
   * @examples
   * Works:
   * - Tailwind only: 'rounded', 'rounded-md', 'rounded-none', 'rounded-full'
   * 
   * Doesn't work:
   * - CSS values: '4px', '0.5rem'
   */
  radius: string
}

/**
 * Spacing properties
 */
export interface SpacingProperties {
  /** 
   * Padding 
   * @examples
   * Works:
   * - Tailwind only: 'p-4', 'px-3 py-2', 'pt-4 pb-6'
   * 
   * Doesn't work:
   * - CSS values: '16px', '1rem'
   * - Mixed: 'p-4 16px'
   */
  padding: string
  /** 
   * Gap between items 
   * @examples
   * Works:
   * - Tailwind only: 'gap-2', 'gap-6'
   * 
   * Doesn't work:
   * - CSS values: 'gap: 16px'
   * - Direct values: '1rem', '16px'
   */
  gap: string
  /** 
   * Spacing between items 
   * @examples
   * Works:
   * - Tailwind only: 'space-y-2', 'space-x-4'
   * 
   * Doesn't work:
   * - CSS values: 'gap: 16px'
   * - Direct values: '1rem', '16px'
   */
  itemSpacing?: string
}

/**
 * Animation properties
 */
export interface AnimationProperties {
  /** 
   * Default animation duration (applies to all properties unless overridden)
   * @examples
   * Works:
   * - CSS time values only: '200ms', '0.3s'
   * 
   * Doesn't work:
   * - Numbers without units: '200', '0.3'
   * - Tailwind classes: 'duration-200'
   */
  duration: string
  /** 
   * Animation easing 
   * @examples
   * Works:
   * - CSS timing functions: 'ease-in-out', 'ease', 'linear', 'cubic-bezier(0.4, 0, 0.2, 1)'
   * 
   * Doesn't work:
   * - Tailwind classes: 'ease-in-out'
   * - Numeric values: '0.4, 0, 0.2, 1'
   */
  easing: string
  /** 
   * Animation type 
   * @examples
   * Works:
   * - Only these specific values: 'fade', 'slide', 'scale', 'none'
   * 
   * Doesn't work:
   * - Other strings: 'zoom', 'rotate'
   */
  type?: AnimationType
  /** 
   * Delay before dropdown disappears on mouse leave (hover exit)
   * @examples
   * Works:
   * - CSS time values only: '700ms', '0.5s'
   * 
   * Doesn't work:
   * - Numbers without units: '700', '0.5'
   * - Tailwind classes: 'duration-700'
   */
  hoverExitDelay?: string
  /** 
   * Specific duration for dropdown item animations
   * @examples
   * Works:
   * - CSS time values only: '150ms', '0.25s'
   * 
   * Doesn't work:
   * - Numbers without units: '150', '0.25'
   * - Tailwind classes: 'duration-150'
   */
  itemDuration?: string
  /**
   * Property-specific durations
   */
  properties?: {
    /** 
     * Background transition duration 
     * @examples
     * Works:
     * - CSS time values only: '200ms', '0.3s'
     */
    background?: string
    /** 
     * Text color transition duration 
     * @examples
     * Works:
     * - CSS time values only: '200ms', '0.3s'
     */
    color?: string
    /** 
     * Border transition duration 
     * @examples
     * Works:
     * - CSS time values only: '200ms', '0.3s'
     */
    border?: string
    /** 
     * Transform transition duration 
     * @examples
     * Works:
     * - CSS time values only: '200ms', '0.3s'
     */
    transform?: string
    /** 
     * Opacity transition duration 
     * @examples
     * Works:
     * - CSS time values only: '200ms', '0.3s'
     */
    opacity?: string
  }
}

/**
 * Layout properties for the navigation
 */
export interface LayoutProperties {
  /** 
   * Height 
   * @examples
   * Works:
   * - Tailwind height: 'h-12', 'h-16', 'h-[64px]'
   * 
   * Doesn't work:
   * - CSS values: '3rem', '64px'
   * - Without prefix: '12', '16'
   */
  height: string
  /** 
   * Max width 
   * @examples
   * Works:
   * - Tailwind max-width: 'max-w-screen-xl', 'max-w-7xl', 'max-w-[1280px]'
   * 
   * Doesn't work:
   * - CSS values: '1280px', '100%'
   * - Regular width: 'w-full'
   */
  maxWidth: string
  /** 
   * Position 
   * @examples
   * Works:
   * - Only these exact values: 'relative', 'absolute', 'fixed', 'sticky'
   * 
   * Doesn't work:
   * - Tailwind classes: 'static', 'position-absolute'
   * - Other strings: 'top', 'bottom'
   */
  position: 'relative' | 'absolute' | 'fixed' | 'sticky'
  /** 
   * Z-index 
   * @examples
   * Works:
   * - Numbers only: 10, 50, 100
   * 
   * Doesn't work:
   * - Strings: '10', '50'
   * - Tailwind classes: 'z-10', 'z-50'
   */
  zIndex: number
}

/**
 * Dropdown indicator properties (excluding colors)
 */
export interface DropdownIndicatorStyleProperties {
  /** 
   * Show dropdown arrow indicator 
   * @examples
   * Works:
   * - Boolean values only: true, false
   * 
   * Doesn't work:
   * - Strings: 'true', 'false'
   * - Numbers: 1, 0
   */
  showArrow: boolean
  /** 
   * Arrow size 
   * @examples
   * Works:
   * - Tailwind width/height: 'w-2 h-2', 'w-[10px] h-[10px]'
   * 
   * Doesn't work:
   * - CSS values: '10px', '0.5rem'
   * - Single dimension: 'w-2'
   */
  arrowSize: string
  /** 
   * Hover indicator width 
   * @examples
   * Works:
   * - Tailwind width: 'w-[3px]', 'w-1'
   * 
   * Doesn't work:
   * - CSS values: '3px', '0.25rem'
   */
  hoverIndicatorWidth: string
}

/**
 * Dropdown layout properties
 */
export interface DropdownLayoutProperties {
  /** 
   * Dropdown max height 
   * @examples
   * Works:
   * - Tailwind max-height: 'max-h-[80vh]', 'max-h-96'
   * 
   * Doesn't work:
   * - CSS values: '80vh', '400px'
   * - Without max prefix: 'h-[80vh]'
   */
  maxHeight: string
  /** 
   * Dropdown min width 
   * @examples
   * Works:
   * - Tailwind min-width: 'min-w-[200px]', 'min-w-full'
   * 
   * Doesn't work:
   * - CSS values: '200px', '100%'
   * - Without min prefix: 'w-[200px]'
   */
  minWidth: string
  /** 
   * Backdrop blur amount (CSS value) 
   * @examples
   * Works:
   * - CSS blur values: '2px', '5px'
   * - For no blur: undefined or ''
   * 
   * Doesn't work:
   * - Tailwind classes: 'blur-sm', 'blur-md'
   * - Without units: '2', '5'
   */
  blur: string
  /** 
   * Dropdown shadow (Tailwind class) 
   * @examples
   * Works:
   * - Tailwind shadows: 'shadow', 'shadow-lg', 'shadow-none'
   * 
   * Doesn't work:
   * - CSS values: '0 4px 6px rgba(0,0,0,0.1)'
   */
  shadow: string
}

/**
 * Structural properties for dropdown
 */
export interface DropdownStructureProperties {
  /** Border properties (width, radius) */
  border: BorderStyleProperties
  /** Spacing properties */
  spacing: SpacingProperties
  /** Layout properties */
  layout: DropdownLayoutProperties
  /** Indicator properties (excluding colors) */
  indicators: DropdownIndicatorStyleProperties
  /** Item structure properties */
  items: {
    /** Border properties (width, radius) */
    border: BorderStyleProperties
  }
}

/**
 * Structure properties for the entire navigation
 */
export interface StructureProperties {
  /** Text style properties (excluding colors) */
  text: TypographyProperties
  /** Border properties (excluding colors) */
  border: BorderStyleProperties
  /** Spacing properties */
  spacing: SpacingProperties
  /** Layout properties */
  layout: LayoutProperties
  /** Dropdown structure */
  dropdown: DropdownStructureProperties
}

/**
 * Complete theme configuration
 */
export interface NavThemeConfig {
  /** Color properties with light/dark variants */
  color: {
    light: ColorProperties
    dark: ColorProperties
  }
  /** Structure properties (no light/dark variants) */
  structure: StructureProperties
  /** Animation properties */
  animation: AnimationProperties
}

/**
 * User-configurable properties for the color theme
 */
export interface ColorStyleProps {
  light?: Partial<ColorProperties>
  dark?: Partial<ColorProperties>
}

/**
 * User-configurable properties for the structure
 */
export interface StructureStyleProps {
  text?: Partial<TypographyProperties>
  border?: Partial<BorderStyleProperties>
  spacing?: Partial<SpacingProperties>
  layout?: Partial<LayoutProperties>
  dropdown?: {
    border?: Partial<BorderStyleProperties>
    spacing?: Partial<SpacingProperties>
    layout?: Partial<DropdownLayoutProperties>
    indicators?: Partial<DropdownIndicatorStyleProperties>
    items?: {
      border?: Partial<BorderStyleProperties>
    }
  }
}

/**
 * User-configurable properties for the navigation
 */
export interface NavStyleProps {
  /** Override color properties */
  color?: ColorStyleProps
  /** Override structure properties */
  structure?: StructureStyleProps
  /** Override animation properties */
  animation?: Partial<AnimationProperties>
}

/**
 * Regular navigation link (not a dropdown)
 */
export interface NextgenDesktopNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Whether this is an external link */
    external?: boolean
    /** Children elements */
    children: React.ReactNode
    /** Optional href */
    href?: string
  }

/**
 * Navigation Context
 */
export interface NavContextValue {
    /** Currently active dropdown ID */
    activeId: string | null
    /** Set active dropdown ID */
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>
    /** Theme configuration */
    theme: NavThemeConfig
    /** Current theme mode */
    mode: ThemeMode
  }
  
/**
 * Root container for the navigation
 */
export interface NextgenDesktopNavProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether to use dark mode styling */
    isTopDark?: boolean
    /** Children elements */
    children: React.ReactNode
    /** Style customization properties */
    styleProps?: NavStyleProps
    /** Content alignment (justify-between, justify-center, etc.) */
    justifyContent?: string
  }

/**
 * Container for a nav item and its dropdown
 */
export interface NextgenDesktopNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Unique ID for this item */
    id: string
    /** Children elements */
    children: React.ReactNode
  }

/**
 * Button that toggles dropdown visibility
 */
export interface NextgenDesktopNavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ID for the dropdown this button controls */
    id: string
    /** Children elements */
    children: React.ReactNode
  }

/**
 * Dropdown content container
 */
export interface NextgenDesktopNavContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** ID matching the trigger ID */
    id: string
    /** Children elements */
    children: React.ReactNode
  }
  
/**
 * Navigation dropdown item
 */
export interface NextgenDesktopNavDropdownItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Whether this is an external link */
    external?: boolean
    /** Optional description text */
    description?: string
    /** Item position for animation timing and keyboard navigation */
    index?: number
    /** Children elements */
    children: React.ReactNode
    /** Optional href */
    href?: string
  }