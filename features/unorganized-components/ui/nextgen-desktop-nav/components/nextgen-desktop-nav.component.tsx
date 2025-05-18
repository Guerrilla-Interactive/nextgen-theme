"use client"

import * as React from "react"
import { cn } from "@/features/unorganized-utils/utils"
import { NavContext } from './context'
import { NextgenDesktopNavProps } from '../types'
import { createThemeConfig } from '../theme'

/**
 * Root container for the navigation
 */
export function NextgenDesktopNav({ 
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