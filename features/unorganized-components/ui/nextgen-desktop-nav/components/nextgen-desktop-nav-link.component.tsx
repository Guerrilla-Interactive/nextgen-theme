"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/features/unorganized-utils/utils"
import { NextgenDesktopNavLinkProps } from '../types'
import { useNavContext, useThemeStyles } from './context'

/**
 * Regular navigation link (not a dropdown)
 */
export function NextgenDesktopNavLink({ external, className, children, href, ...props }: NextgenDesktopNavLinkProps) {
  const { mode } = useNavContext()
  const currentTheme = useThemeStyles()
  const [isPressed, setIsPressed] = React.useState(false)
  
  // Get animation durations
  const defaultDuration = "600ms"; // Default longer duration for visibility
  
  // Get animation durations for each property
  const animationConfig = {
    background: '200ms',
    color: '400ms',
    border: '300ms',
    transform: '200ms',
    opacity: '200ms'
  };
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