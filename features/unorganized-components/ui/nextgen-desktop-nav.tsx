"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/features/unorganized-utils/utils"
import { KeyboardEvent } from "react"

/**
 * Theme configuration types
 */
type ThemeMode = 'light' | 'dark'

/**
 * State-based property configuration
 */
interface StateProperties<T> {
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
interface TypographyProperties {
  /** Text color for different states */
  color: StateProperties<string>
  /** Font weight for different states */
  weight?: StateProperties<string>
  /** Text transform for different states */
  transform?: StateProperties<string>
  /** Font size (Tailwind class) */
  size?: string
}

/**
 * Border related properties
 */
interface BorderProperties {
  /** Border color */
  color?: string
  /** Border width */
  width?: string
  /** Border radius */
  radius?: string
}

/**
 * Spacing properties
 */
interface SpacingProperties {
  /** Padding */
  padding?: string
  /** Spacing between items */
  itemSpacing?: string
}

/**
 * Animation properties
 */
interface AnimationProperties {
  /** Animation duration */
  duration: string
  /** Animation easing */
  easing: string
  /** Animation type */
  type?: 'fade' | 'slide' | 'scale' | 'none'
}

/**
 * Base style properties for the navigation system
 */
interface BaseThemeProps {
  /** Background colors for different states */
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
 * Dropdown indicator properties
 */
interface DropdownIndicatorProperties {
  /** Show dropdown arrow indicator */
  showArrow?: boolean
  /** Arrow size */
  arrowSize?: string
  /** Arrow color */
  arrowColor?: string
  /** Hover indicator color */
  hoverIndicatorColor?: string
  /** Hover indicator width */
  hoverIndicatorWidth?: string
}

/**
 * Dropdown layout properties
 */
interface DropdownLayoutProperties {
  /** Dropdown max height */
  maxHeight?: string
  /** Dropdown min width */
  minWidth?: string
  /** Backdrop blur amount (CSS value) */
  blur?: string
  /** Dropdown shadow (Tailwind class) */
  shadow: string
}

/**
 * Dropdown-specific style properties
 */
interface DropdownThemeProps {
  /** Background colors for the dropdown */
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
  /** Description text color */
  descriptionColor?: string
}

/**
 * Layout properties for the navigation
 */
interface LayoutProperties {
  /** Font size (Tailwind class) */
  fontSize: string
  /** Gap between items (Tailwind class) */
  gap: string
  /** Height */
  height?: string
  /** Max width */
  maxWidth?: string
  /** Position */
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
  /** Z-index */
  zIndex?: number
}

/**
 * Complete theme configuration
 */
interface NavThemeConfig {
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
 * Default theme configuration
 */
const DEFAULT_THEME: NavThemeConfig = {
  light: {
    background: {
      default: 'transparent',
      hover: 'rgba(255, 255, 255, 0.05)',
      focus: 'rgba(255, 255, 255, 0.10)',
      active: 'rgba(255, 255, 255, 0.10)',
    },
    text: {
      color: {
        default: 'rgba(255, 255, 255, 1)',
        hover: 'rgba(255, 255, 255, 1)',
        focus: 'rgba(255, 255, 255, 1',
        active: 'rgba(255, 255, 255, 0.9)',
      },
      weight: {
        default: 'font-medium',
      },
      transform: {
        default: 'uppercase',
      },
    },
    border: {
      radius: 'rounded',
    },
    spacing: {
      padding: 'px-3 py-2',
    },
    dropdown: {
      background: {
        default: 'transparent',
        hover: 'rgba(255, 255, 255, 0.05)',
        focus: 'rgba(255, 255, 255, 0.10)',
        active: 'rgba(255, 255, 255, 0.10)',
      },
      text: {
        color: {
          default: 'rgba(255, 255, 255, 1)',
          hover: 'rgba(255, 255, 255, 1)',
          focus: 'rgba(255, 255, 255, 1',
          active: 'rgba(255, 255, 255, 0.9)',
        },
      },
      border: {
        radius: 'rounded-md',
        color: '#ffffff20',
        width: 'border',
      },
      spacing: {
        padding: 'p-3',
        itemSpacing: 'space-y-1',
      },
      layout: {
        shadow: 'shadow-lg',
        blur: '2px',
        maxHeight: 'max-h-[80vh]',
        minWidth: 'min-w-[200px]',
      },
      animation: {
        duration: '200ms',
        easing: 'ease-out',
      },
      indicators: {
        showArrow: false,
        arrowSize: 'w-[10px] h-[10px]',
        arrowColor: 'border-border',
        hoverIndicatorColor: 'bg-accent',
        hoverIndicatorWidth: 'w-[3px]',
      },
      descriptionColor: 'text-muted-foreground',
    },
  },
  dark: {
    background: {
      default: 'transparent',
      hover: 'rgba(255, 255, 255, 0.05)',
      focus: 'rgba(255, 255, 255, 0.10)',
      active: 'rgba(255, 255, 255, 0.10)',
    },
    text: {
      color: {
        default: 'rgba(0, 0, 0, 1)',
        hover: 'rgba(0, 0, 0, 1)',
        focus: 'rgba(0, 0, 0, 1)',
        active: 'rgba(0, 0, 0, 0.9)',
      },
      weight: {
        default: 'font-medium',
      },
      transform: {
        default: 'uppercase',
      },
    },
    border: {
      radius: 'rounded',
    },
    spacing: {
      padding: 'px-3 py-2',
    },
    dropdown: {
      background: {
        default: 'transparent',
        hover: 'rgba(255, 255, 255, 0.05)',
        focus: 'rgba(255, 255, 255, 0.10)',
        active: 'rgba(255, 255, 255, 0.10)',
      },
      text: {
        color: {
          default: 'rgba(0, 0, 0, 1)',
          hover: 'rgba(0, 0, 0, 1)',
          focus: 'rgba(0, 0, 0, 1)',
          active: 'rgba(0, 0, 0, 0.9)',
        },
      },
      border: {
        radius: 'rounded-md',
        color: 'rgba(255, 255, 255, 0.1)',
        width: 'border',
      },
      spacing: {
        padding: 'p-3',
        itemSpacing: 'space-y-1',
      },
      layout: {
        shadow: 'shadow-lg',
        blur: '2px',
        maxHeight: 'max-h-[80vh]',
        minWidth: 'min-w-[200px]',
      },
      animation: {
        duration: '200ms',
        easing: 'ease-out',
      },
      indicators: {
        showArrow: false,
        arrowSize: 'w-[10px] h-[10px]',
        arrowColor: 'border-border',
        hoverIndicatorColor: 'bg-accent',
        hoverIndicatorWidth: 'w-[3px]',
      },
      descriptionColor: 'text-muted-foreground',
    },
  },
  layout: {
    fontSize: 'text-sm',
    gap: 'gap-6',
    height: 'h-16',
    maxWidth: 'max-w-screen-xl',
    position: 'relative',
    zIndex: 50,
  },
  animation: {
    type: 'fade',
    duration: '200ms',
    easing: 'ease-in-out',
  },
}

/**
 * User-configurable text properties
 */
interface TextStyleProps {
  /** Color override for different states */
  color?: Partial<StateProperties<string>>
  /** Font weight override for different states */
  weight?: Partial<StateProperties<string>>
  /** Text transform override for different states */
  transform?: Partial<StateProperties<string>>
  /** Font size override */
  size?: string
}

/**
 * User-configurable border properties
 */
interface BorderStyleProps {
  /** Border color override */
  color?: string
  /** Border width override */
  width?: string
  /** Border radius override */
  radius?: string
}

/**
 * User-configurable properties for the navigation
 */
interface NavStyleProps {
  /** Override light mode styles */
  light?: {
    /** Background colors override */
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
    /** Background colors override */
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
  }
  
  /** Override layout properties */
  layout?: Partial<LayoutProperties>
  
  /** Override animation properties */
  animation?: Partial<AnimationProperties>
}

/**
 * Creates a complete theme configuration by merging user properties with defaults
 */
function createThemeConfig(props: NavStyleProps = {}): NavThemeConfig {
  return {
    light: {
      background: {
        default: props.light?.background?.default || DEFAULT_THEME.light.background.default,
        hover: props.light?.background?.hover || DEFAULT_THEME.light.background.hover,
        focus: props.light?.background?.focus || DEFAULT_THEME.light.background.focus,
        active: props.light?.background?.active || DEFAULT_THEME.light.background.active,
      },
      text: {
        color: {
          default: props.light?.text?.color?.default || DEFAULT_THEME.light.text.color.default,
          hover: props.light?.text?.color?.hover || DEFAULT_THEME.light.text.color.hover,
          focus: props.light?.text?.color?.focus || DEFAULT_THEME.light.text.color.focus,
          active: props.light?.text?.color?.active || DEFAULT_THEME.light.text.color.active,
        },
        weight: {
          default: props.light?.text?.weight?.default || DEFAULT_THEME.light.text.weight?.default,
          hover: props.light?.text?.weight?.hover || DEFAULT_THEME.light.text.weight?.hover,
          focus: props.light?.text?.weight?.focus || DEFAULT_THEME.light.text.weight?.focus,
          active: props.light?.text?.weight?.active || DEFAULT_THEME.light.text.weight?.active,
        },
        transform: {
          default: props.light?.text?.transform?.default || DEFAULT_THEME.light.text.transform?.default,
        },
        size: props.light?.text?.size || props.layout?.fontSize || DEFAULT_THEME.light.text.size,
      },
      border: {
        radius: props.light?.border?.radius || DEFAULT_THEME.light.border?.radius,
        color: props.light?.border?.color || DEFAULT_THEME.light.border?.color,
        width: props.light?.border?.width || DEFAULT_THEME.light.border?.width,
      },
      spacing: {
        padding: props.light?.spacing?.padding || DEFAULT_THEME.light.spacing?.padding,
      },
      dropdown: {
        background: {
          default: props.lightDropdown?.background?.default || DEFAULT_THEME.light.dropdown.background.default,
          hover: props.lightDropdown?.background?.hover || DEFAULT_THEME.light.dropdown.background.hover,
          focus: props.lightDropdown?.background?.focus || DEFAULT_THEME.light.dropdown.background.focus,
        },
        text: {
          color: {
            default: props.lightDropdown?.text?.color?.default || DEFAULT_THEME.light.dropdown.text.color.default,
            hover: props.lightDropdown?.text?.color?.hover || DEFAULT_THEME.light.dropdown.text.color.hover,
            focus: props.lightDropdown?.text?.color?.focus || DEFAULT_THEME.light.dropdown.text.color.focus,
          },
        },
        border: {
          radius: props.lightDropdown?.border?.radius || DEFAULT_THEME.light.dropdown.border?.radius,
          color: props.lightDropdown?.border?.color || DEFAULT_THEME.light.dropdown.border?.color,
          width: props.lightDropdown?.border?.width || DEFAULT_THEME.light.dropdown.border?.width,
        },
        spacing: {
          padding: props.lightDropdown?.spacing?.padding || DEFAULT_THEME.light.dropdown.spacing?.padding,
          itemSpacing: props.lightDropdown?.spacing?.itemSpacing || DEFAULT_THEME.light.dropdown.spacing?.itemSpacing,
        },
        layout: {
          shadow: props.lightDropdown?.layout?.shadow || DEFAULT_THEME.light.dropdown.layout?.shadow,
          blur: props.lightDropdown?.layout?.blur || DEFAULT_THEME.light.dropdown.layout?.blur,
          maxHeight: props.lightDropdown?.layout?.maxHeight || DEFAULT_THEME.light.dropdown.layout?.maxHeight,
          minWidth: props.lightDropdown?.layout?.minWidth || DEFAULT_THEME.light.dropdown.layout?.minWidth,
        },
        animation: {
          duration: props.lightDropdown?.animation?.duration || props.animation?.duration || DEFAULT_THEME.light.dropdown.animation?.duration,
          easing: props.lightDropdown?.animation?.easing || props.animation?.easing || DEFAULT_THEME.light.dropdown.animation?.easing,
        },
        indicators: {
          showArrow: props.lightDropdown?.indicators?.showArrow !== undefined ? props.lightDropdown.indicators.showArrow : DEFAULT_THEME.light.dropdown.indicators?.showArrow,
          arrowSize: props.lightDropdown?.indicators?.arrowSize || DEFAULT_THEME.light.dropdown.indicators?.arrowSize,
          arrowColor: props.lightDropdown?.indicators?.arrowColor || DEFAULT_THEME.light.dropdown.indicators?.arrowColor,
          hoverIndicatorColor: props.lightDropdown?.indicators?.hoverIndicatorColor || DEFAULT_THEME.light.dropdown.indicators?.hoverIndicatorColor,
          hoverIndicatorWidth: props.lightDropdown?.indicators?.hoverIndicatorWidth || DEFAULT_THEME.light.dropdown.indicators?.hoverIndicatorWidth,
        },
        descriptionColor: props.lightDropdown?.descriptionColor || DEFAULT_THEME.light.dropdown.descriptionColor,
      }
    },
    dark: {
      background: {
        default: props.dark?.background?.default || DEFAULT_THEME.dark.background.default,
        hover: props.dark?.background?.hover || DEFAULT_THEME.dark.background.hover,
        focus: props.dark?.background?.focus || DEFAULT_THEME.dark.background.focus,
        active: props.dark?.background?.active || DEFAULT_THEME.dark.background.active,
      },
      text: {
        color: {
          default: props.dark?.text?.color?.default || DEFAULT_THEME.dark.text.color.default,
          hover: props.dark?.text?.color?.hover || DEFAULT_THEME.dark.text.color.hover,
          focus: props.dark?.text?.color?.focus || DEFAULT_THEME.dark.text.color.focus,
          active: props.dark?.text?.color?.active || DEFAULT_THEME.dark.text.color.active,
        },
        weight: {
          default: props.dark?.text?.weight?.default || DEFAULT_THEME.dark.text.weight?.default,
          hover: props.dark?.text?.weight?.hover || DEFAULT_THEME.dark.text.weight?.hover,
          focus: props.dark?.text?.weight?.focus || DEFAULT_THEME.dark.text.weight?.focus,
          active: props.dark?.text?.weight?.active || DEFAULT_THEME.dark.text.weight?.active,
        },
        transform: {
          default: props.dark?.text?.transform?.default || DEFAULT_THEME.dark.text.transform?.default,
        },
        size: props.dark?.text?.size || props.layout?.fontSize || DEFAULT_THEME.dark.text.size,
      },
      border: {
        radius: props.dark?.border?.radius || DEFAULT_THEME.dark.border?.radius,
        color: props.dark?.border?.color || DEFAULT_THEME.dark.border?.color,
        width: props.dark?.border?.width || DEFAULT_THEME.dark.border?.width,
      },
      spacing: {
        padding: props.dark?.spacing?.padding || DEFAULT_THEME.dark.spacing?.padding,
      },
      dropdown: {
        background: {
          default: props.darkDropdown?.background?.default || DEFAULT_THEME.dark.dropdown.background.default,
          hover: props.darkDropdown?.background?.hover || DEFAULT_THEME.dark.dropdown.background.hover,
          focus: props.darkDropdown?.background?.focus || DEFAULT_THEME.dark.dropdown.background.focus,
        },
        text: {
          color: {
            default: props.darkDropdown?.text?.color?.default || DEFAULT_THEME.dark.dropdown.text.color.default,
            hover: props.darkDropdown?.text?.color?.hover || DEFAULT_THEME.dark.dropdown.text.color.hover,
            focus: props.darkDropdown?.text?.color?.focus || DEFAULT_THEME.dark.dropdown.text.color.focus,
          },
        },
        border: {
          radius: props.darkDropdown?.border?.radius || DEFAULT_THEME.dark.dropdown.border?.radius,
          color: props.darkDropdown?.border?.color || DEFAULT_THEME.dark.dropdown.border?.color,
          width: props.darkDropdown?.border?.width || DEFAULT_THEME.dark.dropdown.border?.width,
        },
        spacing: {
          padding: props.darkDropdown?.spacing?.padding || DEFAULT_THEME.dark.dropdown.spacing?.padding,
          itemSpacing: props.darkDropdown?.spacing?.itemSpacing || DEFAULT_THEME.dark.dropdown.spacing?.itemSpacing,
        },
        layout: {
          shadow: props.darkDropdown?.layout?.shadow || DEFAULT_THEME.dark.dropdown.layout?.shadow,
          blur: props.darkDropdown?.layout?.blur || DEFAULT_THEME.dark.dropdown.layout?.blur,
          maxHeight: props.darkDropdown?.layout?.maxHeight || DEFAULT_THEME.dark.dropdown.layout?.maxHeight,
          minWidth: props.darkDropdown?.layout?.minWidth || DEFAULT_THEME.dark.dropdown.layout?.minWidth,
        },
        animation: {
          duration: props.darkDropdown?.animation?.duration || props.animation?.duration || DEFAULT_THEME.dark.dropdown.animation?.duration,
          easing: props.darkDropdown?.animation?.easing || props.animation?.easing || DEFAULT_THEME.dark.dropdown.animation?.easing,
        },
        indicators: {
          showArrow: props.darkDropdown?.indicators?.showArrow !== undefined ? props.darkDropdown.indicators.showArrow : DEFAULT_THEME.dark.dropdown.indicators?.showArrow,
          arrowSize: props.darkDropdown?.indicators?.arrowSize || DEFAULT_THEME.dark.dropdown.indicators?.arrowSize,
          arrowColor: props.darkDropdown?.indicators?.arrowColor || DEFAULT_THEME.dark.dropdown.indicators?.arrowColor,
          hoverIndicatorColor: props.darkDropdown?.indicators?.hoverIndicatorColor || DEFAULT_THEME.dark.dropdown.indicators?.hoverIndicatorColor,
          hoverIndicatorWidth: props.darkDropdown?.indicators?.hoverIndicatorWidth || DEFAULT_THEME.dark.dropdown.indicators?.hoverIndicatorWidth,
        },
        descriptionColor: props.darkDropdown?.descriptionColor || DEFAULT_THEME.dark.dropdown.descriptionColor,
      }
    },
    layout: {
      fontSize: props.layout?.fontSize || DEFAULT_THEME.layout.fontSize,
      gap: props.layout?.gap || DEFAULT_THEME.layout.gap,
      height: props.layout?.height || DEFAULT_THEME.layout.height,
      maxWidth: props.layout?.maxWidth || DEFAULT_THEME.layout.maxWidth,
      position: props.layout?.position || DEFAULT_THEME.layout.position,
      zIndex: props.layout?.zIndex || DEFAULT_THEME.layout.zIndex,
    },
    animation: {
      type: props.animation?.type || DEFAULT_THEME.animation?.type,
      duration: props.animation?.duration || DEFAULT_THEME.animation?.duration,
      easing: props.animation?.easing || DEFAULT_THEME.animation?.easing,
    }
  }
}

/**
 * Navigation Context
 */
interface NavContextValue {
  /** Currently active dropdown ID */
  activeId: string | null
  /** Set active dropdown ID */
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
  /** Theme configuration */
  theme: NavThemeConfig
  /** Current theme mode */
  mode: ThemeMode
}

const NavContext = React.createContext<NavContextValue>({
  activeId: null,
  setActiveId: () => {},
  theme: DEFAULT_THEME,
  mode: 'light'
})

/**
 * Hook to use navigation context with type safety
 */
function useNavContext() {
  const context = React.useContext(NavContext)
  if (!context) {
    throw new Error('Navigation components must be used within a NextgenDesktopNav component')
  }
  return context
}

/**
 * Helper to get current theme based on mode
 */
function useThemeStyles() {
  const { theme, mode } = useNavContext()
  return mode === 'dark' ? theme.light : theme.dark
}

/**
 * Root container for the navigation
 */
interface NextgenDesktopNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to use dark mode styling */
  isTopDark?: boolean
  /** Children elements */
  children: React.ReactNode
  /** Style customization properties */
  styleProps?: NavStyleProps
}

function NextgenDesktopNav({ 
  className, 
  children, 
  styleProps = {}, 
  isTopDark = false,
  ...props 
}: NextgenDesktopNavProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const theme = React.useMemo(() => createThemeConfig(styleProps), [styleProps])
  const mode = isTopDark ? 'dark' : 'light'
  
  // Stable reference for style props to prevent infinite updates
  const stylePropsRef = React.useRef(styleProps);
  
  // Track dark mode changes only
  const [themeVersion, setThemeVersion] = React.useState(0)
  
  // Update theme version only when isTopDark changes
  React.useEffect(() => {
    setThemeVersion(prev => prev + 1);
  }, [isTopDark]); // Removed styleProps from dependencies
  
  // Update stylePropsRef when styleProps changes - separate effect
  React.useEffect(() => {
    const hasDeepChanges = JSON.stringify(stylePropsRef.current) !== JSON.stringify(styleProps);
    if (hasDeepChanges) {
      stylePropsRef.current = styleProps;
      // Only increment theme version if there are actual changes to avoid loops
      setThemeVersion(prev => prev + 1);
    }
  }, [styleProps]);
  
  const currentTheme = mode === 'dark' ? theme.dark : theme.light
  
  return (
    <NavContext.Provider value={{ activeId, setActiveId, theme, mode }}>
      <nav 
        className={cn(
          "hidden xl:flex items-center font-supplement", 
          theme.layout.gap,
          theme.layout.fontSize,
          currentTheme.text.transform?.default,
          currentTheme.text.weight?.default,
          theme.layout.height,
          theme.layout.maxWidth,
          className
        )} 
        style={{
          backgroundColor: currentTheme.background.default,
          color: currentTheme.text.color.default,
          position: theme.layout.position,
          zIndex: theme.layout.zIndex,
        }}
        aria-label="Main"
        data-theme-mode={mode} // Add data attribute for debugging
        data-theme-version={themeVersion} // Add version for debugging
        {...props}
      >
        {children}
      </nav>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Force dropdown to inherit styles immediately */
        [role="menu"] {
          transition-property: opacity, transform, visibility;
        }
        
        /* Force immediate style application even when invisible */
        [role="menu"][data-state="closed"] {
          transition: none !important;
        }
        
        /* Ensure menu items get proper text color immediately */
        [role="menu"] [role="menuitem"] {
          color: inherit;
        }
      `}</style>
    </NavContext.Provider>
  )
}

/**
 * Container for a nav item and its dropdown
 */
interface NextgenDesktopNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique ID for this item */
  id: string
  /** Children elements */
  children: React.ReactNode
}

function NextgenDesktopNavItem({ id, className, children, ...props }: NextgenDesktopNavItemProps) {
  const { activeId, setActiveId } = useNavContext()
  const isActive = activeId === id
  const ref = React.useRef<HTMLDivElement>(null)
  
  // Handle click outside to close dropdown
  React.useEffect(() => {
    if (!isActive) return
    
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActiveId(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isActive, setActiveId])
  
  // Handle escape key to close dropdown
  React.useEffect(() => {
    if (!isActive) return
    
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveId(null)
      }
    }
    
    document.addEventListener('keydown', handleEscape as any)
    return () => document.removeEventListener('keydown', handleEscape as any)
  }, [isActive, setActiveId])
  
  // Close active dropdown when hovering a different item
  function handleMouseEnter() {
    if (activeId && activeId !== id) {
      setActiveId(null)
    }
  }
  
  return (
    <div 
      ref={ref}
      className={cn("relative group", className)} 
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Regular navigation link (not a dropdown)
 */
interface NextgenDesktopNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Whether this is an external link */
  external?: boolean
  /** Children elements */
  children: React.ReactNode
  /** Optional href */
  href?: string
}

function NextgenDesktopNavLink({ external, className, children, href, ...props }: NextgenDesktopNavLinkProps) {
  const { mode } = useNavContext()
  const currentTheme = useThemeStyles()
  const [isPressed, setIsPressed] = React.useState(false)
  
  // Convert color values to Tailwind-compatible format for hover
  const getHoverBgClass = () => {
    // If it's a variable or transparent, use inline style instead
    if (currentTheme.background.hover.includes('var(') || 
        currentTheme.background.hover.includes('transparent') ||
        currentTheme.background.hover.includes('rgba')) {
      return '';
    }
    return `hover:bg-[${currentTheme.background.hover}]`;
  }
  
  const getHoverTextClass = () => {
    // If it's a variable, use inline style instead
    if (currentTheme.text.color.hover.includes('var(')) {
      return '';
    }
    return `hover:text-[${currentTheme.text.color.hover}]`;
  }
  
  // Convert color values to Tailwind-compatible format for active
  const getActiveBgClass = () => {
    // If it's a variable or transparent, use inline style instead
    if (!currentTheme.background.active || 
        currentTheme.background.active.includes('var(') || 
        currentTheme.background.active.includes('transparent') ||
        currentTheme.background.active.includes('rgba')) {
      return '';
    }
    return `active:bg-[${currentTheme.background.active}]`;
  }
  
  const getActiveTextClass = () => {
    // If it's a variable, use inline style instead
    if (!currentTheme.text.color.active ||
        currentTheme.text.color.active.includes('var(')) {
      return '';
    }
    return `active:text-[${currentTheme.text.color.active}]`;
  }
  
  const hoverBgClass = getHoverBgClass();
  const hoverTextClass = getHoverTextClass();
  const activeBgClass = getActiveBgClass();
  const activeTextClass = getActiveTextClass();
  
  const sharedStyles = {
    color: currentTheme.text.color.default,
  } as React.CSSProperties;
  
  // Add hover and active styles as inline styles if they can't be expressed as Tailwind classes
  if (hoverBgClass === '' || hoverTextClass === '') {
    sharedStyles['--hover-bg'] = currentTheme.background.hover;
    sharedStyles['--hover-color'] = currentTheme.text.color.hover;
  }
  
  if (activeBgClass === '' || activeTextClass === '' || isPressed) {
    sharedStyles['--active-bg'] = currentTheme.background.active;
    sharedStyles['--active-color'] = currentTheme.text.color.active;
  }
  
  const sharedClassNames = cn(
    "flex items-center rounded transition-colors duration-200", 
    currentTheme.spacing?.padding,
    currentTheme.border?.radius,
    currentTheme.text.weight?.default,
    currentTheme.text.transform?.default,
    hoverBgClass,
    hoverTextClass,
    activeBgClass,
    activeTextClass,
    "hover:bg-opacity-100",
    "active:bg-opacity-100",
    className
  );

  // Define hover classes based on theme
  const hoverClasses = cn(
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
  );
  
  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsPressed(true);
    if (activeBgClass === '') {
      e.currentTarget.style.backgroundColor = currentTheme.background.active || '';
    }
    if (activeTextClass === '') {
      e.currentTarget.style.color = currentTheme.text.color.active || '';
    }
    // Call the original onMouseDown if it exists
    props.onMouseDown?.(e);
  };
  
  const handleMouseUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsPressed(false);
    if (activeBgClass === '') {
      e.currentTarget.style.backgroundColor = '';
    }
    if (activeTextClass === '') {
      e.currentTarget.style.color = currentTheme.text.color.default;
    }
    // Call the original onMouseUp if it exists
    props.onMouseUp?.(e);
  };
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Always apply hover styles on mouseenter, regardless of pressed state
    if (hoverBgClass === '') {
      e.currentTarget.style.backgroundColor = currentTheme.background.hover;
    }
    
    // Always apply hover text color with !important to override any conflicting styles
    e.currentTarget.style.setProperty('color', currentTheme.text.color.hover, 'important');
    
    // Call the original onMouseEnter if it exists
    props.onMouseEnter?.(e);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPressed) {
      if (activeBgClass === '') {
        e.currentTarget.style.backgroundColor = currentTheme.background.active || '';
      }
      // Use setProperty with !important for active state text
      e.currentTarget.style.setProperty('color', currentTheme.text.color.active || currentTheme.text.color.default, 'important');
    } else {
      // Reset to default when not pressed
      if (hoverBgClass === '') {
        e.currentTarget.style.backgroundColor = currentTheme.background.default;
      }
      // Reset text color directly with !important
      e.currentTarget.style.setProperty('color', currentTheme.text.color.default, 'important');
    }
    // Call the original onMouseLeave if it exists
    props.onMouseLeave?.(e);
  };
  
  // For external links, use a regular anchor tag
  if (external) {
    return (
      <a
        className={cn(sharedClassNames, hoverClasses)}
        style={sharedStyles}
        role="menuitem"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
        <span className="sr-only">(opens in new tab)</span>
      </a>
    )
  }
  
  // For internal links, use Next.js Link component
  return (
    <Link
      className={cn(sharedClassNames, hoverClasses)}
      style={sharedStyles}
      role="menuitem"
      href={href || '#'}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </Link>
  )
}

/**
 * Button that toggles dropdown visibility
 */
interface NextgenDesktopNavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ID for the dropdown this button controls */
  id: string
  /** Children elements */
  children: React.ReactNode
}

function NextgenDesktopNavTrigger({ id, className, children, ...props }: NextgenDesktopNavTriggerProps) {
  const { activeId, setActiveId } = useNavContext()
  const currentTheme = useThemeStyles()
  const isActive = activeId === id
  
  function handleClick() {
    setActiveId(prev => prev === id ? null : id)
  }
  
  return (
    <button
      id={`nav-trigger-${id}`}
      type="button"
      className={cn(
        "flex items-center cursor-pointer transition-colors duration-200",
        currentTheme.spacing?.padding,
        currentTheme.border?.radius,
        currentTheme.text.weight?.default,
        currentTheme.text.transform?.default,
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      style={{
        color: isActive ? (currentTheme.text.color.active || undefined) : currentTheme.text.color.default,
        backgroundColor: isActive ? currentTheme.background.active : undefined,
        '--hover-bg': currentTheme.background.hover,
        '--hover-color': currentTheme.text.color.hover,
        '--focus-bg': currentTheme.background.focus,
        '--focus-color': currentTheme.text.color.focus,
      } as React.CSSProperties}
      onClick={handleClick}
      aria-expanded={isActive}
      aria-haspopup="true"
      aria-controls={`dropdown-${id}`}
      role="button"
      {...props}
    >
      <span className="relative flex items-center">
      {children}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={cn(
            "ml-1 h-3 w-3 transition-transform duration-200",
            activeId === null && "group-hover:rotate-180",
            isActive && "rotate-180"
        )}
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
      </span>
      
      <style jsx>{`
        button:not([aria-expanded="true"]):hover {
          background-color: var(--hover-bg);
          color: var(--hover-color);
        }
        button:not([aria-expanded="true"]):focus-visible {
          background-color: var(--focus-bg);
          color: var(--focus-color);
          outline: none;
          ring: 2px;
          ring-offset: 2px;
        }
      `}</style>
    </button>
  )
}

/**
 * Invisible bridge to prevent dropdown from closing when moving mouse
 */
function NextgenDesktopNavBridge() {
  return (
    <div className="absolute -bottom-2 left-0 w-full h-2 bg-transparent" aria-hidden="true" />
  )
}

/**
 * Dropdown content container
 */
interface NextgenDesktopNavContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ID matching the trigger ID */
  id: string
  /** Children elements */
  children: React.ReactNode
}

function NextgenDesktopNavContent({ id, className, children, ...props }: NextgenDesktopNavContentProps) {
  const { activeId, theme, mode } = useNavContext()
  const isActive = activeId === id
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Always use the correct theme based on the current mode
  // For dropdown, we use the contrasting theme from the nav
  const dropdownStyle = mode === 'dark' 
    ? theme.light.dropdown
    : theme.dark.dropdown;
  
  // Background/text colors should also be contrasting
  const dropdownBackground = mode === 'dark' 
    ? theme.light.dropdown.background.default 
    : theme.dark.dropdown.background.default;
    
  const dropdownTextColor = mode === 'dark' 
    ? theme.light.dropdown.text.color.default 
    : theme.dark.dropdown.text.color.default;
  
  const dropdownHoverTextColor = mode === 'dark'
    ? theme.light.dropdown.text.color.hover
    : theme.dark.dropdown.text.color.hover;
  
  const dropdownBorderColor = mode === 'dark'
    ? theme.light.dropdown.border?.color
    : theme.dark.dropdown.border?.color;
  
  // Animation settings
  const animDuration = dropdownStyle.animation?.duration || '200ms';
  const animEasing = dropdownStyle.animation?.easing || 'ease-in-out';
  
  // Check if we should apply blur (must be a valid blur value, not string "undefined")
  const shouldApplyBlur = dropdownStyle.layout?.blur && 
                         dropdownStyle.layout.blur !== 'undefined' && 
                         dropdownStyle.layout.blur !== 'none';
  
  // Get blur amount (default to 2px if true but no specific value)
  const blurAmount = shouldApplyBlur 
    ? (typeof dropdownStyle.layout?.blur === 'string' && dropdownStyle.layout.blur !== 'true' 
        ? dropdownStyle.layout.blur 
        : '2px')
    : null;
  
  // Force style updates whenever relevant props change
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // Force immediate style application to the container
    const container = containerRef.current;
    container.style.backgroundColor = dropdownBackground;
    container.style.color = dropdownTextColor;
    container.style.borderColor = dropdownBorderColor || '';
    
    // Explicitly set or remove backdrop filter
    if (shouldApplyBlur) {
      container.style.backdropFilter = `blur(${blurAmount})`;
    } else {
      container.style.backdropFilter = 'none';
    }
    
    // Apply styles to all menu items
    const menuItems = container.querySelectorAll('[role="menuitem"]');
    menuItems.forEach(item => {
      (item as HTMLElement).style.color = dropdownTextColor;
    });
    
    // Set custom properties for hover effects
    container.style.setProperty('--dropdown-hover-text', dropdownHoverTextColor);
    container.style.setProperty('--dropdown-text', dropdownTextColor);
  }, [dropdownBackground, dropdownTextColor, dropdownHoverTextColor, dropdownBorderColor, isActive, shouldApplyBlur, blurAmount]);
  
  return (
    <div
      ref={containerRef}
      id={`dropdown-${id}`}
      className={cn(
        "absolute z-50 left-1/2 -translate-x-1/2",
        "top-[calc(100%+8px)]",
        dropdownStyle.layout?.minWidth,
        dropdownStyle.layout?.maxHeight,
        dropdownStyle.border?.width,
        dropdownStyle.border?.radius,
        dropdownStyle.spacing?.padding,
        dropdownStyle.layout?.shadow,
        shouldApplyBlur && "backdrop-blur",
        "transition-all transform",
        isActive 
          ? "opacity-100 translate-y-0 visible pointer-events-auto" 
          : "opacity-0 translate-y-1 invisible pointer-events-none",
        activeId === null && "group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover:pointer-events-auto",
        className
      )}
      style={{
        backdropFilter: shouldApplyBlur ? `blur(${blurAmount})` : 'none',
        backgroundColor: dropdownBackground,
        color: dropdownTextColor,
        borderColor: dropdownBorderColor,
        transitionDuration: animDuration,
        transitionTimingFunction: animEasing,
        willChange: 'transform, opacity',
        '--dropdown-text': dropdownTextColor,
        '--dropdown-hover-text': dropdownHoverTextColor,
      } as React.CSSProperties}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`nav-trigger-${id}`}
      data-theme-mode={mode}
      data-state={isActive ? 'open' : 'closed'}
      {...props}
    >
      {dropdownStyle.indicators?.showArrow && (
        <div 
          className={cn(
            "absolute -top-[5px] left-1/2 -translate-x-1/2 rotate-45 border-l border-t z-[-1]",
            dropdownStyle.indicators?.arrowSize
          )}
          style={{ 
            backgroundColor: dropdownBackground,
            borderColor: dropdownBorderColor || 'var(--border)',
          }}
          aria-hidden="true"
        />
      )}
      
      <div className={dropdownStyle.spacing?.itemSpacing}>
        {children}
      </div>
    </div>
  )
}

/**
 * Navigation dropdown item
 */
interface NextgenDesktopNavDropdownItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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

function NextgenDesktopNavDropdownItem({ 
  external, 
  description, 
  index = 0, 
  className, 
  children,
  href,
  ...props 
}: NextgenDesktopNavDropdownItemProps) {
  const { activeId, theme, mode } = useNavContext()
  const isActive = activeId !== null
  const [isPressed, setIsPressed] = React.useState(false)
  
  // Use opposite theme for the dropdown item styling
  const dropdownStyle = mode === 'dark' 
    ? theme.light.dropdown
    : theme.dark.dropdown;
  
  // Convert color values to Tailwind-compatible format for hover
  const getHoverBgClass = () => {
    // If it's a variable or transparent, use inline style instead
    if (dropdownStyle.background.hover.includes('var(') || 
        dropdownStyle.background.hover.includes('transparent') ||
        dropdownStyle.background.hover.includes('rgba')) {
      return '';
    }
    return `hover:bg-[${dropdownStyle.background.hover}]`;
  }
  
  const getHoverTextClass = () => {
    // If it's a variable, use inline style instead
    if (dropdownStyle.text.color.hover.includes('var(')) {
      return '';
    }
    return `hover:text-[${dropdownStyle.text.color.hover}]`;
  }
  
  // Convert color values to Tailwind-compatible format for active
  const getActiveBgClass = () => {
    // If it's a variable or transparent, use inline style instead
    if (!dropdownStyle.background.active || 
        dropdownStyle.background.active.includes('var(') || 
        dropdownStyle.background.active.includes('transparent') ||
        dropdownStyle.background.active.includes('rgba')) {
      return '';
    }
    return `active:bg-[${dropdownStyle.background.active}]`;
  }
  
  const getActiveTextClass = () => {
    // If it's a variable, use inline style instead
    if (!dropdownStyle.text.color.active ||
        dropdownStyle.text.color.active.includes('var(')) {
      return '';
    }
    return `active:text-[${dropdownStyle.text.color.active}]`;
  }
  
  const hoverBgClass = getHoverBgClass();
  const hoverTextClass = getHoverTextClass();
  const activeBgClass = getActiveBgClass();
  const activeTextClass = getActiveTextClass();
  
  const textSizes = {
    'text-xs': { title: 'text-xs', description: 'text-[10px]' },
    'text-sm': { title: 'text-sm', description: 'text-xs' },
    'text-base': { title: 'text-base', description: 'text-sm' },
    'text-lg': { title: 'text-base', description: 'text-sm' },
    'text-xl': { title: 'text-lg', description: 'text-base' },
    'text-2xl': { title: 'text-xl', description: 'text-lg' },
  }
  
  const sizeKey = Object.keys(textSizes).includes(theme.layout.fontSize) 
    ? theme.layout.fontSize as keyof typeof textSizes
    : 'text-sm'
  
  const titleSize = textSizes[sizeKey].title
  const descriptionSize = textSizes[sizeKey].description
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      
      const dropdown = e.currentTarget.closest('[role="menu"]')
      if (!dropdown) return
      
      const allItems = Array.from(
        dropdown.querySelectorAll<HTMLElement>('[role="menuitem"]')
      )
      
      let nextIndex = -1
      
      if (e.key === 'ArrowDown') {
        nextIndex = Math.min(index + 1, allItems.length - 1)
      } else if (e.key === 'ArrowUp') {
        nextIndex = Math.max(index - 1, 0)
      } else if (e.key === 'Home') {
        nextIndex = 0
      } else if (e.key === 'End') {
        nextIndex = allItems.length - 1
      }
      
      if (nextIndex >= 0) {
        allItems[nextIndex]?.focus()
      }
    }
  }
  
  // Animation delay for staggered animation
  const getAnimationDelay = () => {
    if (index === 0) return '0ms';
    if (index === 1) return '50ms';
    if (index === 2) return '100ms';
    if (index === 3) return '150ms';
    return `${index * 50}ms`;
  };

  // Define hover classes
  const hoverClasses = "hover:bg-opacity-100 active:bg-opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1";
  
  const sharedStyles = {
    animationDelay: getAnimationDelay(),
  } as React.CSSProperties;
  
  // Add hover styles as inline styles if they can't be expressed as Tailwind classes
  if (hoverBgClass === '' || hoverTextClass === '') {
    sharedStyles['--hover-bg'] = dropdownStyle.background.hover;
    sharedStyles['--hover-color'] = dropdownStyle.text.color.hover;
  }
  
  // Add active styles as inline styles if they can't be expressed as Tailwind classes
  if (activeBgClass === '' || activeTextClass === '' || isPressed) {
    sharedStyles['--active-bg'] = dropdownStyle.background.active;
    sharedStyles['--active-color'] = dropdownStyle.text.color.active;
  }
  
  const sharedClassNames = cn(
    "block rounded px-3.5 py-3 overflow-hidden relative normal-case",
    "transition-all duration-200 ease-out",
    "animate-[fadeIn_0.2s_ease-in-out_forwards]",
    hoverBgClass,
    hoverTextClass,
    activeBgClass,
    activeTextClass,
    hoverClasses,
    className
  );
  
  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsPressed(true);
    if (activeBgClass === '') {
      e.currentTarget.style.backgroundColor = dropdownStyle.background.active || '';
    }
    if (activeTextClass === '') {
      e.currentTarget.style.color = dropdownStyle.text.color.active || '';
    }
    // Call the original onMouseDown if it exists
    props.onMouseDown?.(e);
  };
  
  const handleMouseUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsPressed(false);
    if (activeBgClass === '') {
      e.currentTarget.style.backgroundColor = '';
    }
    if (activeTextClass === '') {
      e.currentTarget.style.color = '';
    }
    // Call the original onMouseUp if it exists
    props.onMouseUp?.(e);
  };
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Always apply hover styles on mouseenter, regardless of pressed state
    if (hoverBgClass === '') {
      e.currentTarget.style.backgroundColor = dropdownStyle.background.hover;
    }
    
    // Use CSS variable for color to ensure it gets the latest value
    e.currentTarget.style.setProperty('color', 'var(--dropdown-hover-text)', 'important');
    
    // Call the original onMouseEnter if it exists
    props.onMouseEnter?.(e);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPressed) {
      if (activeBgClass === '') {
        e.currentTarget.style.backgroundColor = dropdownStyle.background.active || '';
      }
      // Use CSS variable for active color
      e.currentTarget.style.setProperty('color', dropdownStyle.text.color.active || 'var(--dropdown-text)', 'important');
    } else {
      // Reset to default when not pressed
      if (hoverBgClass === '') {
        e.currentTarget.style.backgroundColor = dropdownStyle.background.default;
      }
      // Use CSS variable for default color
      e.currentTarget.style.setProperty('color', 'var(--dropdown-text)', 'important');
    }
    // Call the original onMouseLeave if it exists
    props.onMouseLeave?.(e);
  };
  
  const titleComponent = (
    <span className={cn(
      "block font-medium mb-1 transition-all duration-200 ease-out",
      titleSize
    )}>
      {children}
      {external && (
        <>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-1 inline-block transition-all duration-200 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M7 7h10v10M7 17 17 7"/>
          </svg>
          <span className="sr-only">(opens in new tab)</span>
        </>
      )}
    </span>
  );
  
  const descriptionComponent = description && (
    <span className={cn(
      "block leading-relaxed transition-all duration-200 ease-out",
      descriptionSize,
      dropdownStyle.descriptionColor
    )}>
      {description}
    </span>
  );
  
  // For external links, use a regular anchor tag
  if (external) {
    return (
      <a 
        className={sharedClassNames}
        style={sharedStyles}
        role="menuitem"
        tabIndex={isActive ? 0 : -1}
        onKeyDown={handleKeyDown}
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {titleComponent}
        {descriptionComponent}
      </a>
    )
  }
  
  // For internal links, use Next.js Link component
  return (
    <Link
      className={sharedClassNames}
      style={sharedStyles}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown as any}
      href={href || '#'}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {titleComponent}
      {descriptionComponent}
    </Link>
  )
}

export {
  NextgenDesktopNav,
  NextgenDesktopNavItem,
  NextgenDesktopNavLink,
  NextgenDesktopNavTrigger,
  NextgenDesktopNavBridge,
  NextgenDesktopNavContent,
  NextgenDesktopNavDropdownItem,
  // Also export theme types for consumers
  type NavStyleProps,
  type NavThemeConfig,
} 