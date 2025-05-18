/**
 * NextGen Desktop Navigation System
 * A highly customizable navigation system with dropdowns, theming, and accessibility features
 */

export {
  NextgenDesktopNav,
  NextgenDesktopNavItem,
  NextgenDesktopNavLink,
  NextgenDesktopNavTrigger,
  NextgenDesktopNavBridge,
  NextgenDesktopNavContent,
  NextgenDesktopNavDropdownItem,
} from './components'

export { DEFAULT_THEME, createThemeConfig } from './theme'

export type {
  ThemeMode,
  StateProperties,
  TypographyProperties,
  BorderProperties,
  SpacingProperties,
  AnimationProperties,
  DropdownIndicatorProperties,
  DropdownLayoutProperties,
  BaseThemeProps,
  DropdownThemeProps,
  LayoutProperties,
  NavThemeConfig,
  TextStyleProps,
  BorderStyleProps,
  NavStyleProps,
  NextgenDesktopNavProps,
  NextgenDesktopNavItemProps,
  NextgenDesktopNavLinkProps,
  NextgenDesktopNavTriggerProps,
  NextgenDesktopNavContentProps,
  NextgenDesktopNavDropdownItemProps,
  NavContextValue
} from './types' 