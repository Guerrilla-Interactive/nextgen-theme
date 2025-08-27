"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/features/unorganized-utils/utils"

/**
 * Nav context — keeps only interaction state.
 * (No theme or color values here anymore.)
 */
interface NavContextValue {
  activeId: string | null
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
}
const NavContext = React.createContext<NavContextValue | null>(null)

function useNavContext() {
  const ctx = React.useContext(NavContext)
  if (!ctx) throw new Error("Navigation components must be used within a NextgenDesktopNav")
  return ctx
}

/**
 * Root container
 * - Styling now comes entirely from global.css via CSS variables & selectors.
 * - You can still pass className for layout tweaks if needed.
 */
interface NextgenDesktopNavProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** If you want to flip the nav to a “contrast on dark header” look, set data-contrast */
  contrast?: "auto" | "light-on-dark" | "dark-on-light"
}
function NextgenDesktopNav({
  children,
  className,
  contrast = "auto",
  ...props
}: NextgenDesktopNavProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  return (
    <NavContext.Provider value={{ activeId, setActiveId }}>
      <nav
        className={cn(
          "ng-nav hidden xl:flex items-center font-supplement",
          "gap-[var(--nav-gap)]",
          "text-[length:var(--nav-font-size)]",
          "h-[var(--nav-height)]",
          "max-w-[var(--nav-max-w)]",
          "relative z-[var(--nav-z)]",
          className
        )}
        data-contrast={contrast}
        aria-label="Main"
        {...props}
      >
        {children}
      </nav>
    </NavContext.Provider>
  )
}

/**
 * Group wrapper per nav item (keeps hover groups & outside click close)
 */
interface NextgenDesktopNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: React.ReactNode
}
function NextgenDesktopNavItem({ id, className, children, ...props }: NextgenDesktopNavItemProps) {
  const { activeId, setActiveId } = useNavContext()
  const ref = React.useRef<HTMLDivElement>(null)
  const isOpen = activeId === id

  // close on click outside
  React.useEffect(() => {
    if (!isOpen) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setActiveId(null)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [isOpen, setActiveId])

  // close on Escape
  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null)
    }
    document.addEventListener("keydown", onKey as any)
    return () => document.removeEventListener("keydown", onKey as any)
  }, [isOpen, setActiveId])

  // hovering another item closes this one to avoid “sticky” menus
  const onMouseEnter = () => {
    if (activeId && activeId !== id) setActiveId(null)
  }

  return (
    <div
      ref={ref}
      className={cn("relative group ng-nav__item", className)}
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Plain link (non-dropdown)
 * - Styling classes are semantic; colors & transitions come from globals.css
 */
interface NextgenDesktopNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
  children: React.ReactNode
  href?: string
}
function NextgenDesktopNavLink({ external, className, children, href, ...props }: NextgenDesktopNavLinkProps) {
  const base = cn("ng-nav__link inline-flex items-center rounded-[var(--nav-radius)] px-[var(--nav-px)] py-[var(--nav-py)]", className)

  if (external) {
    return (
      <a
        className={base}
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        {...props}
      >
        {children}
        <span className="sr-only">(opens in new tab)</span>
      </a>
    )
  }

  return (
    <Link
      className={base}
      href={href || "#"}
      {...props}
    >
      {children}
    </Link>
  )
}

/**
 * Trigger button for dropdowns
 */
interface NextgenDesktopNavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  children: React.ReactNode
}
function NextgenDesktopNavTrigger({ id, className, children, ...props }: NextgenDesktopNavTriggerProps) {
  const { activeId, setActiveId } = useNavContext()
  const isOpen = activeId === id

  return (
    <button
      id={`nav-trigger-${id}`}
      type="button"
      className={cn(
        "ng-nav__trigger inline-flex items-center cursor-pointer",
        "rounded-[var(--nav-radius)] px-[var(--nav-px)] py-[var(--nav-py)]",
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={`dropdown-${id}`}
      onClick={() => setActiveId(prev => (prev === id ? null : id))}
      {...props}
    >
      <span className="relative flex items-center">
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={cn("ml-1 h-3 w-3 ng-nav__chevron", isOpen && "rotate-180")}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </button>
  )
}

/** Invisible bridge to keep hover path alive */
function NextgenDesktopNavBridge() {
  return <div className="absolute -bottom-2 left-0 w-full h-2 bg-transparent" aria-hidden="true" />
}

/**
 * Dropdown panel
 * - Visibility, motion, background, borders all handled in globals via .ng-nav__dropdown
 */
interface NextgenDesktopNavContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: React.ReactNode
}
function NextgenDesktopNavContent({ id, className, children, ...props }: NextgenDesktopNavContentProps) {
  const { activeId } = useNavContext()
  const isOpen = activeId === id

  return (
    <div
      id={`dropdown-${id}`}
      className={cn(
        "ng-nav__dropdown absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)]",
        "min-w-[var(--dropdown-min-w)] max-h-[var(--dropdown-max-h)]",
        "rounded-[var(--dropdown-radius)] border",
        "shadow-[var(--dropdown-shadow)]",
        "backdrop-blur-[var(--dropdown-blur)]",
        "px-[var(--dropdown-px)] py-[var(--dropdown-py)]",
        isOpen ? "data-[open=true]:opacity-100" : "",
        className
      )}
      data-open={isOpen}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`nav-trigger-${id}`}
      {...props}
    >
      <div className="ng-nav__dropdown-items space-y-[var(--dropdown-item-gap)]">
        {children}
      </div>
    </div>
  )
}

/**
 * Dropdown item
 */
interface NextgenDesktopNavDropdownItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
  description?: string
  index?: number
  children: React.ReactNode
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
  const base = cn(
    "ng-nav__dropdown-item block rounded-[var(--dropdown-item-radius)] border",
    "px-[var(--dropdown-item-px)] py-[var(--dropdown-item-py)]",
    "opacity-0 translate-y-1 will-change-transform will-change-opacity",
    className
  )

  const style: React.CSSProperties = {
    // simple stagger
    animationDelay: `${Math.min(index * 50, 400)}ms`,
  }

  const title = (
    <span className="block font-medium mb-1 ng-nav__dropdown-title">
      {children}
      {external && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="ml-1 inline-block"
            aria-hidden="true"
          >
            <path d="M7 7h10v10M7 17 17 7"/>
          </svg>
          <span className="sr-only">(opens in new tab)</span>
        </>
      )}
    </span>
  )

  const descr = description ? (
    <span className="block leading-relaxed ng-nav__dropdown-desc">{description}</span>
  ) : null

  if (external) {
    return (
      <a
        className={base}
        style={style}
        role="menuitem"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
        {...props}
      >
        {title}
        {descr}
      </a>
    )
  }

  return (
    <Link
      className={base}
      style={style}
      role="menuitem"
      href={href || "#"}
      {...props}
    >
      {title}
      {descr}
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
}
