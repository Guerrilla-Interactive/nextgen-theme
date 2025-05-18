"use client"

import * as React from "react"
import { cn } from "@/features/unorganized-utils/utils"
import { NextgenDesktopNavTriggerProps } from '../types'
import { useNavContext, useThemeStyles } from './context'

/**
 * Button that toggles dropdown visibility
 */
export function NextgenDesktopNavTrigger({ id, className, children, ...props }: NextgenDesktopNavTriggerProps) {
  const { activeId, setActiveId } = useNavContext()
  const currentTheme = useThemeStyles()
  const isActive = activeId === id
  
  // Get animation durations for each property
  const animationConfig = {
    background: '200ms',
    color: '400ms',
    border: '300ms',
    transform: '200ms'
  };
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