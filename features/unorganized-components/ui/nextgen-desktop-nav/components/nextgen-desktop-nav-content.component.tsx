"use client"

import * as React from "react"
import { cn } from "@/features/unorganized-utils/utils"
import { NextgenDesktopNavContentProps } from '../types'
import { useNavContext } from './context'

/**
 * Dropdown content container
 */
export function NextgenDesktopNavContent({ id, className, children, ...props }: NextgenDesktopNavContentProps) {
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