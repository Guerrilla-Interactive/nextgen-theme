"use client"

import * as React from "react"
import { NavContextValue, ThemeMode, NavThemeConfig } from '../types'
import { DEFAULT_THEME } from '../theme'

/**
 * Navigation Context
 */
export const NavContext = React.createContext<NavContextValue>({
  activeId: null,
  setActiveId: () => {},
  theme: DEFAULT_THEME,
  mode: 'light'
})

/**
 * Hook to use navigation context with type safety
 */
export function useNavContext() {
  const context = React.useContext(NavContext)
  if (!context) {
    throw new Error('Navigation components must be used within a NextgenDesktopNav component')
  }
  return context
}

/**
 * Helper to get current theme based on mode
 */
export function useThemeStyles() {
  const { theme, mode } = useNavContext()
  return mode === 'dark' ? theme.light : theme.dark
} 