/**
 * Types for NextGen Desktop Navigation
 */
import * as React from "react"

/**
 * Theme configuration types
 */
export type ThemeMode = 'light' | 'dark'

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
 * Typography related properties
 */
export interface TypographyProperties {
  /** 
   * Text color for different states
   * @examples
   * Works:
   * - Tailwind colors: 'text-white', 'text-gray-800'
   * - CSS colors: '#ffffff', 'rgba(255, 255, 255, 0.8)'
   * - CSS variables: 'var(--color-primary)'
   * 
   * Doesn't work:
   * - Without prefix: 'white', 'blue'
   * - With just hex: 'ffffff' (missing # prefix)
   */
  color: StateProperties<string>
  /** 
   * Font weight for different states 
   * @examples
   * Works:
   * - Tailwind only: 'font-normal', 'font-medium', 'font-bold'
   * 
   * Doesn't work:
   * - CSS values: '400', '700'
   * - Direct values: 'normal', 'bold'
   */
  weight?: StateProperties<string>
  /** 
   * Text transform for different states 
   * @examples
   * Works:
   * - Tailwind only: 'uppercase', 'lowercase', 'capitalize', 'normal-case'
   * 
   * Doesn't work:
   * - CSS values: 'uppercase', 'lowercase' (without Tailwind prefix)
   */
  transform?: StateProperties<string>
  /** 
   * Font size (Tailwind class) 
   * @examples
   * Works:
   * - Tailwind only: 'text-sm', 'text-base', 'text-lg'
   * 
   * Doesn't work:
   * - CSS values: '14px', '1rem'
   */
  size?: string
}

/**
 * Border related properties
 */
export interface BorderProperties {
  /** 
   * Border color for different states 
   * @examples
   * Works:
   * - Tailwind with opacity: 'rgba(255, 255, 255, 0.2)'
   * - CSS hex: '#ffffff', '#ffffff20'
   * - CSS variables: 'var(--border-color)'
   * 
   * Doesn't work:
   * - Tailwind color classes: 'border-gray-200' (use raw color values)
   */
  color: StateProperties<string>
  /** 
   * Border width for different states 
   * @examples
   * Works:
   * - Tailwind only: 'border', 'border-2', 'border-0'
   * 
   * Doesn't work:
   * - CSS values: '1px', '2px'
   */
  width?: StateProperties<string>
  /** 
   * Border radius 
   * @examples
   * Works:
   * - Tailwind only: 'rounded', 'rounded-md', 'rounded-none', 'rounded-full'
   * 
   * Doesn't work:
   * - CSS values: '4px', '0.5rem'
   */
  radius?: string
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
  padding?: string
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
  type?: 'fade' | 'slide' | 'scale' | 'none'
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
 * Dropdown indicator properties
 */
export interface DropdownIndicatorProperties {
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
  showArrow?: boolean
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
  arrowSize?: string
  /** 
   * Arrow color 
   * @examples
   * Works:
   * - Border color Tailwind class: 'border-border', 'border-gray-200'
   * 
   * Doesn't work:
   * - Direct color values: '#ffffff', 'rgba(255,255,255,0.5)'
   */
  arrowColor?: string
  /** 
   * Hover indicator color 
   * @examples
   * Works:
   * - Background Tailwind class: 'bg-accent', 'bg-blue-500'
   * 
   * Doesn't work:
   * - Direct color values: '#0000ff', 'blue'
   */
  hoverIndicatorColor?: string
  /** 
   * Hover indicator width 
   * @examples
   * Works:
   * - Tailwind width: 'w-[3px]', 'w-1'
   * 
   * Doesn't work:
   * - CSS values: '3px', '0.25rem'
   */
  hoverIndicatorWidth?: string
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
  maxHeight?: string
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
  minWidth?: string
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
  blur?: string
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
 * Base style properties for the navigation system
 */
export interface BaseThemeProps {
  /** 
   * Background colors for different states 
   * @examples
   * Works:
   * - CSS colors: '#ffffff', 'rgba(255, 255, 255, 0.05)', 'transparent'
   * - CSS variables: 'var(--bg-primary)'
   * 
   * Doesn't work:
   * - Tailwind classes: 'bg-white', 'bg-opacity-5'
   */
  background: StateProperties<string>
  /** Typography properties */
  text: TypographyProperties
  /** Border properties */
  border?: BorderProperties
  /** Spacing properties */
  spacing?: SpacingProperties
  /** Dropdown styling */
  dropdown: DropdownThemeProps
}

/**
 * Dropdown-specific style properties
 */
export interface DropdownThemeProps {
  /** 
   * Background colors for the dropdown container
   * @examples
   * Works:
   * - CSS colors: '#ffffff', 'rgba(255, 255, 255, 0.05)', 'transparent'
   * - CSS variables: 'var(--bg-primary)'
   * 
   * Doesn't work:
   * - Tailwind classes: 'bg-white', 'bg-opacity-5'
   */
  background: StateProperties<string>
  /** Typography properties for dropdown */
  text: TypographyProperties
  /** Border properties for dropdown */
  border?: BorderProperties
  /** Spacing properties for dropdown */
  spacing?: SpacingProperties
  /** Animation properties for dropdown */
  animation?: AnimationProperties
  /** Layout properties for dropdown */
  layout?: DropdownLayoutProperties
  /** Indicator properties for dropdown */
  indicators?: DropdownIndicatorProperties
  /** 
   * Description text color 
   * @examples
   * Works:
   * - Tailwind class: 'text-muted-foreground', 'text-gray-400'
   * 
   * Doesn't work:
   * - CSS values: '#9ca3af'
   */
  descriptionColor?: string
  /**
   * Individual dropdown item styling
   */
  items?: {
    /** 
     * Background colors for dropdown items (different states)
     * @examples
     * Works:
     * - CSS colors: '#ffffff', 'rgba(255, 255, 255, 0.05)', 'transparent'
     * - CSS variables: 'var(--bg-primary)'
     * 
     * Doesn't work:
     * - Tailwind classes: 'bg-white', 'bg-opacity-5'
     */
    background: StateProperties<string>
    /** Border properties for dropdown items */
    border?: BorderProperties
  }
}

/**
 * Layout properties for the navigation
 */
export interface LayoutProperties {
  /** 
   * Font size (Tailwind class) 
   * @examples
   * Works:
   * - Tailwind text sizes: 'text-sm', 'text-base', 'text-lg'
   * 
   * Doesn't work:
   * - CSS values: '14px', '1rem'
   * - Without prefix: 'sm', 'base'
   */
  fontSize: string
  /** 
   * Gap between items (Tailwind class) 
   * @examples
   * Works:
   * - Tailwind gap: 'gap-4', 'gap-6', 'gap-x-2 gap-y-4'
   * 
   * Doesn't work:
   * - CSS values: '16px', '1rem'
   * - Without prefix: '4', '6'
   */
  gap: string
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
  height?: string
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
  maxWidth?: string
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
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
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
  zIndex?: number
}

/**
 * Complete theme configuration
 */
export interface NavThemeConfig {
  /** Light mode styles */
  light: BaseThemeProps
  /** Dark mode styles */
  dark: BaseThemeProps
  /** Layout properties */
  layout: LayoutProperties
  /** Animation properties */
  animation?: AnimationProperties
}

/**
 * User-configurable text properties
 */
export interface TextStyleProps {
  /** 
   * Color override for different states 
   * @examples
   * Works:
   * - Tailwind colors: 'text-white', 'text-gray-800'
   * - CSS colors: '#ffffff', 'rgba(255, 255, 255, 0.8)'
   * - CSS variables: 'var(--color-primary)'
   * 
   * Doesn't work:
   * - Without prefix: 'white', 'blue'
   * - With just hex: 'ffffff' (missing # prefix)
   */
  color?: Partial<StateProperties<string>>
  /** 
   * Font weight override for different states 
   * @examples
   * Works:
   * - Tailwind only: 'font-normal', 'font-medium', 'font-bold'
   * 
   * Doesn't work:
   * - CSS values: '400', '700'
   * - Direct values: 'normal', 'bold'
   */
  weight?: Partial<StateProperties<string>>
  /** 
   * Text transform override for different states 
   * @examples
   * Works:
   * - Tailwind only: 'uppercase', 'lowercase', 'capitalize', 'normal-case'
   * 
   * Doesn't work:
   * - CSS values: 'uppercase', 'lowercase' (without Tailwind prefix)
   */
  transform?: Partial<StateProperties<string>>
  /** 
   * Font size override 
   * @examples
   * Works:
   * - Tailwind only: 'text-sm', 'text-base', 'text-lg'
   * 
   * Doesn't work:
   * - CSS values: '14px', '1rem'
   */
  size?: string
}

/**
 * User-configurable border properties
 */
export interface BorderStyleProps {
  /** 
   * Border color override for different states 
   * @examples
   * Works:
   * - Tailwind with opacity: 'rgba(255, 255, 255, 0.2)'
   * - CSS hex: '#ffffff', '#ffffff20'
   * - CSS variables: 'var(--border-color)'
   * 
   * Doesn't work:
   * - Tailwind color classes: 'border-gray-200' (use raw color values)
   */
  color?: Partial<StateProperties<string>>
  /** 
   * Border width override for different states 
   * @examples
   * Works:
   * - Tailwind only: 'border', 'border-2', 'border-0'
   * 
   * Doesn't work:
   * - CSS values: '1px', '2px'
   */
  width?: Partial<StateProperties<string>>
  /** 
   * Border radius override 
   * @examples
   * Works:
   * - Tailwind only: 'rounded', 'rounded-md', 'rounded-none', 'rounded-full'
   * 
   * Doesn't work:
   * - CSS values: '4px', '0.5rem'
   */
  radius?: string
}

/**
 * User-configurable properties for the navigation
 */
export interface NavStyleProps {
  /** Override light mode styles */
  light?: {
    /** 
     * Background colors override 
     * @examples
     * Works:
     * - CSS colors: '#ffffff', 'rgba(255, 255, 255, 0.05)', 'transparent'
     * - CSS variables: 'var(--bg-primary)'
     * 
     * Doesn't work:
     * - Tailwind classes: 'bg-white', 'bg-opacity-5'
     */
    background?: Partial<StateProperties<string>>
    /** Text properties override */
    text?: TextStyleProps
    /** Border properties override */
    border?: BorderStyleProps
    /** Spacing properties override */
    spacing?: Partial<SpacingProperties>
  }
  
  /** Override dark mode styles */
  dark?: {
    /** 
     * Background colors override 
     * @examples
     * Works:
     * - CSS colors: '#ffffff', 'rgba(0, 0, 0, 0.05)', 'transparent'
     * - CSS variables: 'var(--bg-primary)'
     * 
     * Doesn't work:
     * - Tailwind classes: 'bg-white', 'bg-opacity-5'
     */
    background?: Partial<StateProperties<string>>
    /** Text properties override */
    text?: TextStyleProps
    /** Border properties override */
    border?: BorderStyleProps
    /** Spacing properties override */
    spacing?: Partial<SpacingProperties>
  }
  
  /** Override light mode dropdown styles */
  lightDropdown?: {
    /** Background colors override */
    background?: Partial<StateProperties<string>>
    /** Text properties override */
    text?: TextStyleProps
    /** Border properties override */
    border?: BorderStyleProps
    /** Spacing properties override */
    spacing?: Partial<SpacingProperties>
    /** Animation properties override */
    animation?: Partial<AnimationProperties>
    /** Layout properties override */
    layout?: Partial<DropdownLayoutProperties>
    /** Indicator properties override */
    indicators?: Partial<DropdownIndicatorProperties>
    /** Description color override */
    descriptionColor?: string
    /** Override dropdown item styles */
    items?: {
      /** Background colors for dropdown items */
      background?: Partial<StateProperties<string>>
      /** Border properties for dropdown items */
      border?: BorderStyleProps
    }
  }
  
  /** Override dark mode dropdown styles */
  darkDropdown?: {
    /** Background colors override */
    background?: Partial<StateProperties<string>>
    /** Text properties override */
    text?: TextStyleProps
    /** Border properties override */
    border?: BorderStyleProps
    /** Spacing properties override */
    spacing?: Partial<SpacingProperties>
    /** Animation properties override */
    animation?: Partial<AnimationProperties>
    /** Layout properties override */
    layout?: Partial<DropdownLayoutProperties>
    /** Indicator properties override */
    indicators?: Partial<DropdownIndicatorProperties>
    /** Description color override */
    descriptionColor?: string
    /** Override dropdown item styles */
    items?: {
      /** Background colors for dropdown items */
      background?: Partial<StateProperties<string>>
      /** Border properties for dropdown items */
      border?: BorderStyleProps
    }
  }
  
  /** 
   * Override layout properties 
   * @examples
   * fontSize: 'text-sm'
   * gap: 'gap-6'
   * height: 'h-16'
   * maxWidth: 'max-w-screen-xl'
   * position: 'relative'
   * zIndex: 50
   */
  layout?: Partial<LayoutProperties>
  
  /** 
   * Override animation properties 
   * @examples
   * type: 'fade'
   * duration: '200ms'
   * easing: 'ease-in-out'
   * properties: {
   *   background: '600ms',
   *   color: '400ms', 
   *   border: '300ms'
   * }
   */
  animation?: Partial<AnimationProperties>
}

/**
 * Root container for the navigation props
 */
export interface NextgenDesktopNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to use dark mode styling */
  isTopDark?: boolean
  /** Children elements */
  children: React.ReactNode
  /** Style customization properties */
  styleProps?: NavStyleProps
}

/**
 * Container for a nav item and its dropdown props
 */
export interface NextgenDesktopNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique ID for this item */
  id: string
  /** Children elements */
  children: React.ReactNode
}

/**
 * Regular navigation link (not a dropdown) props
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
 * Button that toggles dropdown visibility props
 */
export interface NextgenDesktopNavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ID for the dropdown this button controls */
  id: string
  /** Children elements */
  children: React.ReactNode
}

/**
 * Dropdown content container props
 */
export interface NextgenDesktopNavContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ID matching the trigger ID */
  id: string
  /** Children elements */
  children: React.ReactNode
}

/**
 * Navigation dropdown item props
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

/**
 * Navigation Context type
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