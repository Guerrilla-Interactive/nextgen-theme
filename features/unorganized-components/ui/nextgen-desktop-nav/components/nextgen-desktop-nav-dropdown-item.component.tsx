"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/features/unorganized-utils/utils"
import { NextgenDesktopNavDropdownItemProps } from '../types'
import { useNavContext } from './context'

/**
 * Navigation dropdown item
 */
export function NextgenDesktopNavDropdownItem({ 
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