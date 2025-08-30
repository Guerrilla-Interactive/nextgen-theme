"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/features/unorganized-utils/utils"
import { KeyboardEvent } from "react"
import { NextgenDesktopNavContentProps, NextgenDesktopNavDropdownItemProps, NextgenDesktopNavItemProps, NextgenDesktopNavLinkProps, NextgenDesktopNavProps, NextgenDesktopNavTriggerProps } from "./nextgen-desktop-nav.types"
import { stegaClean } from "next-sanity"


const NavContext = React.createContext<{
  activeId: string | null
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
} | null>(null)

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



function NextgenDesktopNav({ 
  className, 
  children, 
  isTopDark = false,
  justifyContent,
  ...props 
}: NextgenDesktopNavProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const cleanedJustify = (stegaClean(justifyContent) as typeof justifyContent) || undefined

  return (
    <NavContext.Provider value={{ activeId, setActiveId }}>
      <nav 
        className={cn(
          "hidden md:flex items-center w-full gap-4 h-12 max-w-7xl",
          "text-sm font-medium",
          cleanedJustify,
          className
        )} 
        style={{
          
          color: "var(--foreground)",
          fontFamily: "var(--font-display)",
        }}
        aria-label="Main"
        data-theme={isTopDark ? 'dark' : undefined}
        {...props}
      >
        {children}
      </nav>
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
  const cleanedExternal = !!stegaClean(external)
  const cleanedHref = (stegaClean(href) as typeof href) || href
  const sharedClassNames = cn(
    "flex items-center rounded px-3 py-2 text-sm font-medium",
    "transition-colors duration-200 ease-in-out",
    "text-[var(--foreground)]",
    "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
    "active:bg-[var(--accent-dark)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1",
    className
  )

  if (cleanedExternal) {
    return (
      <a
        className={sharedClassNames}
        role="menuitem"
        rel="noopener noreferrer"
        target="_blank"
        href={cleanedHref}
        {...props}
      >
        {children}
        <span className="sr-only">(opens in new tab)</span>
      </a>
    )
  }

  return (
    <Link
      className={sharedClassNames}
      role="menuitem"
      href={cleanedHref || '#'}
      {...props}
    >
      {children}
    </Link>
  )
}


function NextgenDesktopNavTrigger({ id, className, children, ...props }: NextgenDesktopNavTriggerProps) {
  const { activeId, setActiveId } = useNavContext()
  const isActive = activeId === id

  function handleClick() {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <button
      id={`nav-trigger-${id}`}
      type="button"
      className={cn(
        "flex items-center cursor-pointer px-3 py-2 rounded text-sm -mt-0.5 !font-semibold ",
        "transition-colors duration-200",
        isActive
          ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
          : "text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1",
        className
      )}
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
            isActive && "rotate-180"
          )}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </span>
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
  const { activeId } = useNavContext()
  const isActive = activeId === id
  const containerRef = React.useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = React.useRef<number | null>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  const shouldBeVisible = isActive || isHovered

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = React.useCallback(() => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovered(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false)
      hoverTimeoutRef.current = null
    }, 200)
  }, [])

  React.useEffect(() => {
    const dropdownEl = containerRef.current
    if (!dropdownEl) return

    dropdownEl.addEventListener('mouseenter', handleMouseEnter)
    dropdownEl.addEventListener('mouseleave', handleMouseLeave)

    const parentItem = document.getElementById(`nav-trigger-${id}`)?.closest('.group')
    if (parentItem) {
      parentItem.addEventListener('mouseenter', handleMouseEnter)
      parentItem.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      dropdownEl.removeEventListener('mouseenter', handleMouseEnter)
      dropdownEl.removeEventListener('mouseleave', handleMouseLeave)
      if (parentItem) {
        parentItem.removeEventListener('mouseenter', handleMouseEnter)
        parentItem.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [id, handleMouseEnter, handleMouseLeave])

  return (
    <div
      ref={containerRef}
      id={`dropdown-${id}`}
      className={cn(
        "absolute z-50 left-1/2 -translate-x-1/2",
        "top-[calc(100%+12px)] min-w-[320px] max-h-[80vh] overflow-y-auto",
        "border rounded shadow-lg p-2",
        "bg-[var(--popover)] text-[var(--popover-foreground)] border-[var(--border)]",
        "transition-all duration-200 transform",
        shouldBeVisible ? "opacity-100 visible pointer-events-auto translate-y-0" : "opacity-0 invisible pointer-events-none translate-y-1",
        className
      )}
      style={{ fontFamily: "var(--font-display)" }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`nav-trigger-${id}`}
      data-state={shouldBeVisible ? 'open' : 'closed'}
      {...props}
    >
      <div className="space-y-1">
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
  const { activeId } = useNavContext()
  const isActive = activeId !== null

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
  

  const sharedClassNames = cn(
    "block rounded px-3.5 py-3 overflow-hidden relative normal-case text-sm font-medium",
    "transition-colors duration-200 ease-out",
    "text-[var(--popover-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1",
    className
  )

  const titleComponent = (
    <span className={cn(
      "mb-1 transition-all duration-200 ease-out flex items-center",
      "text-sm font-medium"
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
  )

  const descriptionComponent = description && (
    <span className={cn(
      "block leading-relaxed transition-all duration-200 ease-out",
      "text-xs opacity-80"
    )}>
      {description}
    </span>
  )

  if (external) {
    return (
      <a 
        className={sharedClassNames}
        role="menuitem"
        tabIndex={isActive ? 0 : -1}
        onKeyDown={handleKeyDown}
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        {...props}
      >
        {titleComponent}
        {descriptionComponent}
      </a>
    )
  }

  return (
    <Link
      className={sharedClassNames}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown as any}
      href={href || '#'}
      {...props}
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
}; 