"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/features/unorganized-utils/utils"
import { KeyboardEvent } from "react"
// pathname
import { NavContextValue, NavStyleProps, NavThemeConfig, NextgenDesktopNavContentProps, NextgenDesktopNavDropdownItemProps, NextgenDesktopNavItemProps, NextgenDesktopNavLinkProps, NextgenDesktopNavProps, NextgenDesktopNavTriggerProps } from "./nextgen-desktop-nav.types"
import { createThemeConfig, DEFAULT_THEME } from "./nextgen-desktop-nav.default-config"


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



function NextgenDesktopNav({ 
  className, 
  children, 
  styleProps = {}, 
  isTopDark = false,
  justifyContent,
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
          "hidden xl:flex items-center w-full font-supplement", 
          theme.layout.gap,
          theme.layout.fontSize,
          currentTheme.text.transform?.default,
          currentTheme.text.weight?.default,
          theme.layout.height,
          theme.layout.maxWidth,
          justifyContent,
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



function NextgenDesktopNavLink({ external, className, children, href, ...props }: NextgenDesktopNavLinkProps) {
  const { mode } = useNavContext()
  const currentTheme = useThemeStyles()
  const [isPressed, setIsPressed] = React.useState(false)
  
  // Get animation durations
  const defaultDuration = "600ms"; // Default longer duration for visibility
  
  // Get animation durations for each property
  const animationConfig = DEFAULT_THEME.animation?.properties || {};
  const backgroundDuration = animationConfig.background || defaultDuration;
  const colorDuration = animationConfig.color || defaultDuration;
  const borderDuration = animationConfig.border || defaultDuration;
  const transformDuration = animationConfig.transform || defaultDuration;
  
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
    transitionProperty: "background-color, color, border-color, transform",
    transitionDuration: `${backgroundDuration}, ${colorDuration}, ${borderDuration}, ${transformDuration}`,
    transitionTimingFunction: "ease-in-out",
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
    "flex items-center rounded transition-colors duration-600", 
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
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Always apply hover styles on mouseenter, regardless of pressed state
    if (hoverBgClass === '') {
      e.currentTarget.style.backgroundColor = currentTheme.background.hover;
    }
    
    // Apply hover border styles
    if (currentTheme.border?.color?.hover) {
      e.currentTarget.style.borderColor = currentTheme.border.color.hover;
    }
    if (currentTheme.border?.width?.hover) {
      e.currentTarget.style.borderWidth = currentTheme.border.width.hover;
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
      // Apply active border styles
      if (currentTheme.border?.color?.active) {
        e.currentTarget.style.borderColor = currentTheme.border.color.active;
      }
      if (currentTheme.border?.width?.active) {
        e.currentTarget.style.borderWidth = currentTheme.border.width.active;
      }
      
      // Use setProperty with !important for active state text
      e.currentTarget.style.setProperty('color', currentTheme.text.color.active || currentTheme.text.color.default, 'important');
    } else {
      // Reset to default when not pressed
      if (hoverBgClass === '') {
        e.currentTarget.style.backgroundColor = currentTheme.background.default;
      }
      // Reset border to default
      if (currentTheme.border?.color?.default) {
        e.currentTarget.style.borderColor = currentTheme.border.color.default;
      }
      if (currentTheme.border?.width?.default) {
        e.currentTarget.style.borderWidth = currentTheme.border.width.default;
      }
      
      // Reset text color directly with !important
      e.currentTarget.style.setProperty('color', currentTheme.text.color.default, 'important');
    }
    // Call the original onMouseLeave if it exists
    props.onMouseLeave?.(e);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsPressed(true);
    if (activeBgClass === '') {
      e.currentTarget.style.backgroundColor = currentTheme.background.active || '';
    }
    if (activeTextClass === '') {
      e.currentTarget.style.color = currentTheme.text.color.active || '';
    }
    // Apply active border styles
    if (currentTheme.border?.color?.active) {
      e.currentTarget.style.borderColor = currentTheme.border.color.active;
    }
    if (currentTheme.border?.width?.active) {
      e.currentTarget.style.borderWidth = currentTheme.border.width.active;
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
    
    // Reset border to hover state since we're still hovering
    if (currentTheme.border?.color?.hover) {
      e.currentTarget.style.borderColor = currentTheme.border.color.hover;
    }
    if (currentTheme.border?.width?.hover) {
      e.currentTarget.style.borderWidth = currentTheme.border.width.hover;
    }
    
    // Call the original onMouseUp if it exists
    props.onMouseUp?.(e);
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


function NextgenDesktopNavTrigger({ id, className, children, ...props }: NextgenDesktopNavTriggerProps) {
  const { activeId, setActiveId } = useNavContext()
  const currentTheme = useThemeStyles()
  const isActive = activeId === id
  
  // Get animation durations for each property
  const animationConfig = DEFAULT_THEME.animation?.properties || {};
  const backgroundDuration = animationConfig.background || '600ms';
  const colorDuration = animationConfig.color || '400ms';
  const borderDuration = animationConfig.border || '300ms';
  const transformDuration = animationConfig.transform || '200ms';
  
  function handleClick() {
    setActiveId(prev => prev === id ? null : id)
  }
  
  return (
    <button
      id={`nav-trigger-${id}`}
      type="button"
      className={cn(
        "flex items-center cursor-pointer transition-colors duration-600",
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
        transitionProperty: "background-color, color, border-color, transform",
        transitionDuration: `${backgroundDuration}, ${colorDuration}, ${borderDuration}, ${transformDuration}`,
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
          transition-property: background-color, color, border-color, transform;
          transition-duration: ${backgroundDuration}, ${colorDuration}, ${borderDuration}, ${transformDuration};
        }
        button:not([aria-expanded="true"]):focus-visible {
          background-color: var(--focus-bg);
          color: var(--focus-color);
          outline: none;
          ring: 2px;
          ring-offset: 2px;
          transition-property: background-color, color, border-color, transform;
          transition-duration: ${backgroundDuration}, ${colorDuration}, ${borderDuration}, ${transformDuration};
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
    ? theme.light.dropdown.border.color.default
    : theme.dark.dropdown.border.color.default;
  
  // Animation settings
  const animDuration = dropdownStyle.animation?.duration || '200ms';
  const animEasing = dropdownStyle.animation?.easing || 'ease-in-out';
  
  // Get animation durations for each property
  const backgroundDuration = dropdownStyle.animation?.properties?.background || animDuration;
  const colorDuration = dropdownStyle.animation?.properties?.color || animDuration;
  const borderDuration = dropdownStyle.animation?.properties?.border || animDuration;
  const transformDuration = dropdownStyle.animation?.properties?.transform || animDuration;
  const opacityDuration = dropdownStyle.animation?.properties?.opacity || animDuration;
  
  // Force style updates whenever relevant props change
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // Force immediate style application to the container
    const container = containerRef.current;
    container.style.backgroundColor = dropdownBackground;
    container.style.color = dropdownTextColor;
    container.style.borderColor = dropdownBorderColor;
    
    // Apply styles to all menu items
    const menuItems = container.querySelectorAll('[role="menuitem"]');
    menuItems.forEach(item => {
      (item as HTMLElement).style.color = dropdownTextColor;
    });
    
    // Set custom properties for hover effects
    container.style.setProperty('--dropdown-hover-text', dropdownHoverTextColor);
    container.style.setProperty('--dropdown-text', dropdownTextColor);
    
    // Set custom properties for border states
    const borderHoverColor = mode === 'dark'
      ? theme.light.dropdown.border.color.hover
      : theme.dark.dropdown.border.color.hover;
      
    const borderActiveColor = mode === 'dark'
      ? theme.light.dropdown.border.color.active
      : theme.dark.dropdown.border.color.active;
      
    container.style.setProperty('--dropdown-border', dropdownBorderColor);
    container.style.setProperty('--dropdown-border-hover', borderHoverColor);
    container.style.setProperty('--dropdown-border-active', borderActiveColor);
    
    // Set transition durations as CSS variables
    container.style.setProperty('--transition-background', backgroundDuration);
    container.style.setProperty('--transition-color', colorDuration);
    container.style.setProperty('--transition-border', borderDuration);
    container.style.setProperty('--transition-transform', transformDuration);
    container.style.setProperty('--transition-opacity', opacityDuration);
    
  }, [
    dropdownBackground, 
    dropdownTextColor, 
    dropdownHoverTextColor, 
    dropdownBorderColor, 
    isActive, 
    theme, 
    mode,
    backgroundDuration,
    colorDuration,
    borderDuration,
    transformDuration,
    opacityDuration
  ]);
  
  return (
    <div
      ref={containerRef}
      id={`dropdown-${id}`}
      className={cn(
        "absolute z-50 left-1/2 -translate-x-1/2",
        "top-[calc(100%+8px)]",
        dropdownStyle.layout?.minWidth,
        dropdownStyle.layout?.maxHeight,
        dropdownStyle.border?.width?.default,
        dropdownStyle.border?.radius,
        dropdownStyle.spacing?.padding,
        dropdownStyle.layout?.shadow,
        dropdownStyle.layout?.blur && "backdrop-blur",
        "transition-all transform",
        isActive 
          ? "opacity-100 translate-y-0 visible pointer-events-auto" 
          : "opacity-0 translate-y-1 invisible pointer-events-none",
        activeId === null && "group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover:pointer-events-auto",
        className
      )}
      style={{
        backdropFilter: dropdownStyle.layout?.blur ? `blur(${dropdownStyle.layout.blur})` : undefined,
        backgroundColor: dropdownBackground,
        color: dropdownTextColor,
        borderColor: dropdownBorderColor,
        // Apply property-specific transition durations
        transitionProperty: "transform, opacity, background-color, color, border-color",
        transitionDuration: `${transformDuration}, ${opacityDuration}, ${backgroundDuration}, ${colorDuration}, ${borderDuration}`,
        transitionTimingFunction: animEasing,
        willChange: 'transform, opacity',
        // CSS variables for use in child elements
        '--dropdown-text': dropdownTextColor,
        '--dropdown-hover-text': dropdownHoverTextColor,
        '--dropdown-border': dropdownBorderColor,
        '--dropdown-border-hover': mode === 'dark'
          ? theme.light.dropdown.border.color.hover
          : theme.dark.dropdown.border.color.hover,
        '--dropdown-border-active': mode === 'dark'
          ? theme.light.dropdown.border.color.active
          : theme.dark.dropdown.border.color.active,
        // Transition duration variables
        '--transition-background': backgroundDuration,
        '--transition-color': colorDuration,
        '--transition-border': borderDuration,
        '--transition-transform': transformDuration,
        '--transition-opacity': opacityDuration,
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
  
  // Get item-specific styles
  const itemStyle = dropdownStyle.items || {
    background: dropdownStyle.background,
    border: dropdownStyle.border
  };
  
  // Get animation durations
  const defaultDuration = dropdownStyle.animation?.duration || "200ms";
  
  // Get animation durations for each property
  const backgroundDuration = dropdownStyle.animation?.properties?.background || defaultDuration;
  const colorDuration = dropdownStyle.animation?.properties?.color || defaultDuration;
  const borderDuration = dropdownStyle.animation?.properties?.border || defaultDuration;
  const transformDuration = dropdownStyle.animation?.properties?.transform || defaultDuration;
  const opacityDuration = dropdownStyle.animation?.properties?.opacity || defaultDuration;
  
  // Animation easing
  const animEasing = dropdownStyle.animation?.easing || 'ease-in-out';
  
  // Convert color values to Tailwind-compatible format for hover
  const getHoverBgClass = () => {
    // If it's a variable or transparent, use inline style instead
    if (itemStyle.background.hover.includes('var(') || 
        itemStyle.background.hover.includes('transparent') ||
        itemStyle.background.hover.includes('rgba')) {
      return '';
    }
    return `hover:bg-[${itemStyle.background.hover}]`;
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
    if (!itemStyle.background.active || 
        itemStyle.background.active.includes('var(') || 
        itemStyle.background.active.includes('transparent') ||
        itemStyle.background.active.includes('rgba')) {
      return '';
    }
    return `active:bg-[${itemStyle.background.active}]`;
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
  

  // Define hover classes
  const hoverClasses = "hover:bg-opacity-100 active:bg-opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1";
  
  const sharedStyles = {
    '--hover-bg': itemStyle.background.hover,
    '--hover-color': dropdownStyle.text.color.hover,
    '--active-bg': itemStyle.background.active,
    '--active-color': dropdownStyle.text.color.active,
    // Apply property-specific transition durations
    transitionProperty: "background-color, color, border-color, transform, opacity",
    transitionDuration: `${backgroundDuration}, ${colorDuration}, ${borderDuration}, ${transformDuration}, ${opacityDuration}`,
    transitionTimingFunction: animEasing,
  } as React.CSSProperties;
  
  // Add hover styles as inline styles if they can't be expressed as Tailwind classes
  if (hoverBgClass === '' || hoverTextClass === '') {
    sharedStyles['--hover-bg'] = itemStyle.background.hover;
    sharedStyles['--hover-color'] = dropdownStyle.text.color.hover;
  }
  
  // Add active styles as inline styles if they can't be expressed as Tailwind classes
  if (activeBgClass === '' || activeTextClass === '' || isPressed) {
    sharedStyles['--active-bg'] = itemStyle.background.active;
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
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Always apply hover styles on mouseenter, regardless of pressed state
    if (hoverBgClass === '') {
      e.currentTarget.style.backgroundColor = itemStyle.background.hover;
    }
    
    // Apply hover border styles using CSS variables for reliability
    e.currentTarget.style.borderColor = 'var(--dropdown-border-hover)';
    if (itemStyle.border?.width?.hover) {
      e.currentTarget.style.borderWidth = itemStyle.border.width.hover;
    }
    
    // Use CSS variable for color to ensure it gets the latest value
    e.currentTarget.style.setProperty('color', 'var(--dropdown-hover-text)', 'important');
    
    // Call the original onMouseEnter if it exists
    props.onMouseEnter?.(e);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPressed) {
      if (activeBgClass === '') {
        e.currentTarget.style.backgroundColor = itemStyle.background.active || '';
      }
      
      // Apply active border styles using CSS variables
      e.currentTarget.style.borderColor = 'var(--dropdown-border-active)';
      if (itemStyle.border?.width?.active) {
        e.currentTarget.style.borderWidth = itemStyle.border.width.active;
      }
      
      // Use CSS variable for active color
      e.currentTarget.style.setProperty('color', dropdownStyle.text.color.active || 'var(--dropdown-text)', 'important');
    } else {
      // Reset to default when not pressed
      if (hoverBgClass === '') {
        e.currentTarget.style.backgroundColor = itemStyle.background.default;
      }
      
      // Reset border to default using CSS variables
      e.currentTarget.style.borderColor = 'var(--dropdown-border)';
      if (itemStyle.border?.width?.default) {
        e.currentTarget.style.borderWidth = itemStyle.border.width.default;
      }
      
      // Use CSS variable for default color
      e.currentTarget.style.setProperty('color', 'var(--dropdown-text)', 'important');
    }
    // Call the original onMouseLeave if it exists
    props.onMouseLeave?.(e);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsPressed(true);
    if (activeBgClass === '') {
      e.currentTarget.style.backgroundColor = itemStyle.background.active || '';
    }
    if (activeTextClass === '') {
      e.currentTarget.style.color = dropdownStyle.text.color.active || '';
    }
    
    // Apply active border styles using CSS variables
    e.currentTarget.style.borderColor = 'var(--dropdown-border-active)';
    if (itemStyle.border?.width?.active) {
      e.currentTarget.style.borderWidth = itemStyle.border.width.active;
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
    
    // Reset border to hover state since we're still hovering, using CSS variables
    e.currentTarget.style.borderColor = 'var(--dropdown-border-hover)';
    if (itemStyle.border?.width?.hover) {
      e.currentTarget.style.borderWidth = itemStyle.border.width.hover;
    }
    
    // Call the original onMouseUp if it exists
    props.onMouseUp?.(e);
  };
  
  const titleComponent = (
    <span className={cn(
      "block font-medium mb-1 transition-all duration-200 ease-out flex items-center",
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