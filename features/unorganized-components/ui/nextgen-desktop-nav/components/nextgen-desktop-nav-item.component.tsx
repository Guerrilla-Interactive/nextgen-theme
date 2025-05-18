"use client"

import * as React from "react"
import { cn } from "@/features/unorganized-utils/utils"
import { NextgenDesktopNavItemProps } from '../types'
import { useNavContext } from './context'

/**
 * Container for a nav item and its dropdown
 */
export function NextgenDesktopNavItem({ id, className, children, ...props }: NextgenDesktopNavItemProps) {
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