import { AnimationType, NavStyleProps, NavThemeConfig } from "../nextgen-desktop-nav.types"
import { nextgenDesktopNavColorProperties } from "./themes/nextgen-desktop-nav.color-properties";
import { nextgenDesktopNavDarkConfig } from "./themes/nextgen-desktop-nav.dark-theme"
import { nextgenDesktopNavLightConfig } from "./themes/nextgen-desktop-nav.light-theme"

/**
 * Default theme configuration
 * 
 * ARCHITECTURE OVERVIEW:
 * ---------------------
 * The theme is now organized by WHAT rather than by WHEN:
 * - color: Contains all color-based properties (light/dark variants)
 * - structure: Contains all spacing, layout, border width/radius properties
 * - animation: Contains all animation settings
 * 
 * COLOR PROPERTIES are the only properties that have light/dark variants.
 * All non-color properties are defined once outside of light/dark themes.
 */



export const DEFAULT_THEME: NavThemeConfig = {
  color: nextgenDesktopNavColorProperties,
  // Structure properties (no light/dark variants)
  // Define these directly instead of pulling from light/dark themes
  structure: {
    // Text properties
    text: {
      weight: 'font-medium',
      transform: '',
      size: 'text-[18px]',
    },
    // Border properties
    border: {
      width: 'border',
      radius: 'rounded',
    },
    // Spacing properties
    spacing: {
      padding: 'px-3 py-2',
      gap: 'gap-6',
    },
    // Layout properties
    layout: {
      height: 'h-16',
      maxWidth: '',
      position: 'relative',
      zIndex: 50,
    },
    // Dropdown structure
    dropdown: {
      // Border properties
      border: {
        width: 'border',
        radius: 'rounded-md',
      },
      // Spacing properties
      spacing: {
        padding: 'p-3',
        itemSpacing: 'space-y-1',
        gap: 'gap-1',
      },
      // Layout properties
      layout: {
        shadow: 'shadow-lg',
        blur: '4px',
        maxHeight: 'max-h-[80vh]',
        minWidth: 'min-w-[200px]',
      },
      // Indicators (excluding colors)
      indicators: {
        showArrow: true,
        arrowSize: 'w-[20px] h-[20px]',
        hoverIndicatorWidth: 'w-[6px]',
      },
      // Item structure
      items: {
        border: {
          width: 'border',
          radius: 'rounded',
        }
      }
    }
  },
  
  // Animation properties
  animation: {
    // Global animation type 
    type: 'scale' as AnimationType,
    // Global animation duration (default fallback for all animations)
    duration: '200ms',
    // Global animation easing function
    easing: 'ease-in-out',
    // Delay before dropdown disappears when mouse leaves
    hoverExitDelay: '700ms',
    // Duration for dropdown items
    itemDuration: '150ms',
    // Property-specific durations - these override the global duration
    properties: {
      background: '200ms',
      color: '200ms',
      border: '200ms',
      transform: '200ms',
      opacity: '200ms'
    }
  }
}

/**
 * Creates a complete theme configuration by merging user properties with defaults
 * 
 * This function has been updated to handle the new theme structure where:
 * - color properties have light/dark variants
 * - structure and animation properties don't have light/dark variants
 */
export function createThemeConfig(props: NavStyleProps = {}): NavThemeConfig {
  // Create the unified animation settings
  const animations = {
    type: props.animation?.type || DEFAULT_THEME.animation?.type || 'fade',
    duration: props.animation?.duration || DEFAULT_THEME.animation?.duration || '200ms',
    easing: props.animation?.easing || DEFAULT_THEME.animation?.easing || 'ease-in-out',
    hoverExitDelay: props.animation?.hoverExitDelay || DEFAULT_THEME.animation?.hoverExitDelay || '700ms',
    itemDuration: props.animation?.itemDuration || DEFAULT_THEME.animation?.itemDuration || '150ms',
    properties: {
      background: props.animation?.properties?.background || DEFAULT_THEME.animation?.properties?.background || '200ms',
      color: props.animation?.properties?.color || DEFAULT_THEME.animation?.properties?.color || '200ms',
      border: props.animation?.properties?.border || DEFAULT_THEME.animation?.properties?.border || '200ms',
      transform: props.animation?.properties?.transform || DEFAULT_THEME.animation?.properties?.transform || '200ms',
      opacity: props.animation?.properties?.opacity || DEFAULT_THEME.animation?.properties?.opacity || '200ms',
    }
  };

  // Build the structure properties
  const structureConfig = {
    text: {
      weight: props.structure?.text?.weight || DEFAULT_THEME.structure.text.weight,
      transform: props.structure?.text?.transform || DEFAULT_THEME.structure.text.transform,
      size: props.structure?.text?.size || DEFAULT_THEME.structure.text.size,
    },
    border: {
      width: props.structure?.border?.width || DEFAULT_THEME.structure.border.width,
      radius: props.structure?.border?.radius || DEFAULT_THEME.structure.border.radius,
    },
    spacing: {
      padding: props.structure?.spacing?.padding || DEFAULT_THEME.structure.spacing.padding,
      gap: props.structure?.spacing?.gap || DEFAULT_THEME.structure.spacing.gap,
    },
    layout: {
      height: props.structure?.layout?.height || DEFAULT_THEME.structure.layout.height,
      maxWidth: props.structure?.layout?.maxWidth || DEFAULT_THEME.structure.layout.maxWidth,
      position: props.structure?.layout?.position || DEFAULT_THEME.structure.layout.position,
      zIndex: props.structure?.layout?.zIndex || DEFAULT_THEME.structure.layout.zIndex,
    },
    dropdown: {
      border: {
        width: props.structure?.dropdown?.border?.width || DEFAULT_THEME.structure.dropdown.border.width,
        radius: props.structure?.dropdown?.border?.radius || DEFAULT_THEME.structure.dropdown.border.radius,
      },
      spacing: {
        padding: props.structure?.dropdown?.spacing?.padding || DEFAULT_THEME.structure.dropdown.spacing.padding,
        itemSpacing: props.structure?.dropdown?.spacing?.itemSpacing || DEFAULT_THEME.structure.dropdown.spacing.itemSpacing,
        gap: props.structure?.dropdown?.spacing?.gap || DEFAULT_THEME.structure.dropdown.spacing.gap,
      },
      layout: {
        shadow: props.structure?.dropdown?.layout?.shadow || DEFAULT_THEME.structure.dropdown.layout.shadow,
        blur: props.structure?.dropdown?.layout?.blur || DEFAULT_THEME.structure.dropdown.layout.blur,
        maxHeight: props.structure?.dropdown?.layout?.maxHeight || DEFAULT_THEME.structure.dropdown.layout.maxHeight,
        minWidth: props.structure?.dropdown?.layout?.minWidth || DEFAULT_THEME.structure.dropdown.layout.minWidth,
      },
      indicators: {
        showArrow: props.structure?.dropdown?.indicators?.showArrow !== undefined 
          ? props.structure.dropdown.indicators.showArrow 
          : DEFAULT_THEME.structure.dropdown.indicators.showArrow,
        arrowSize: props.structure?.dropdown?.indicators?.arrowSize || DEFAULT_THEME.structure.dropdown.indicators.arrowSize,
        hoverIndicatorWidth: props.structure?.dropdown?.indicators?.hoverIndicatorWidth || DEFAULT_THEME.structure.dropdown.indicators.hoverIndicatorWidth,
      },
      items: {
        border: {
          width: props.structure?.dropdown?.items?.border?.width || DEFAULT_THEME.structure.dropdown.items.border.width,
          radius: props.structure?.dropdown?.items?.border?.radius || DEFAULT_THEME.structure.dropdown.items.border.radius,
        },
      }
    }
  };

  // Build the light mode color config
  const lightColorConfig = {
    background: {
      default: props.color?.light?.background?.default || DEFAULT_THEME.color.light.background.default,
      hover: props.color?.light?.background?.hover || DEFAULT_THEME.color.light.background.hover,
      focus: props.color?.light?.background?.focus || DEFAULT_THEME.color.light.background.focus,
      active: props.color?.light?.background?.active || DEFAULT_THEME.color.light.background.active,
    },
    text: {
      default: props.color?.light?.text?.default || DEFAULT_THEME.color.light.text.default,
      hover: props.color?.light?.text?.hover || DEFAULT_THEME.color.light.text.hover,
      focus: props.color?.light?.text?.focus || DEFAULT_THEME.color.light.text.focus,
      active: props.color?.light?.text?.active || DEFAULT_THEME.color.light.text.active,
    },
    border: {
      default: props.color?.light?.border?.default || DEFAULT_THEME.color.light.border.default,
      hover: props.color?.light?.border?.hover || DEFAULT_THEME.color.light.border.hover,
      focus: props.color?.light?.border?.focus || DEFAULT_THEME.color.light.border.focus,
      active: props.color?.light?.border?.active || DEFAULT_THEME.color.light.border.active,
    },
    dropdown: {
      background: {
        default: props.color?.light?.dropdown?.background?.default || DEFAULT_THEME.color.light.dropdown.background.default,
        hover: props.color?.light?.dropdown?.background?.hover || DEFAULT_THEME.color.light.dropdown.background.hover,
        focus: props.color?.light?.dropdown?.background?.focus || DEFAULT_THEME.color.light.dropdown.background.focus,
        active: props.color?.light?.dropdown?.background?.active || DEFAULT_THEME.color.light.dropdown.background.active,
      },
      text: {
        default: props.color?.light?.dropdown?.text?.default || DEFAULT_THEME.color.light.dropdown.text.default,
        hover: props.color?.light?.dropdown?.text?.hover || DEFAULT_THEME.color.light.dropdown.text.hover,
        focus: props.color?.light?.dropdown?.text?.focus || DEFAULT_THEME.color.light.dropdown.text.focus,
        active: props.color?.light?.dropdown?.text?.active || DEFAULT_THEME.color.light.dropdown.text.active,
      },
      border: {
        default: props.color?.light?.dropdown?.border?.default || DEFAULT_THEME.color.light.dropdown.border.default,
        hover: props.color?.light?.dropdown?.border?.hover || DEFAULT_THEME.color.light.dropdown.border.hover,
        focus: props.color?.light?.dropdown?.border?.focus || DEFAULT_THEME.color.light.dropdown.border.focus,
        active: props.color?.light?.dropdown?.border?.active || DEFAULT_THEME.color.light.dropdown.border.active,
      },
      description: props.color?.light?.dropdown?.description || DEFAULT_THEME.color.light.dropdown.description,
      items: {
        background: {
          default: props.color?.light?.dropdown?.items?.background?.default || DEFAULT_THEME.color.light.dropdown.items.background.default,
          hover: props.color?.light?.dropdown?.items?.background?.hover || DEFAULT_THEME.color.light.dropdown.items.background.hover,
          focus: props.color?.light?.dropdown?.items?.background?.focus || DEFAULT_THEME.color.light.dropdown.items.background.focus,
          active: props.color?.light?.dropdown?.items?.background?.active || DEFAULT_THEME.color.light.dropdown.items.background.active,
        },
        border: {
          default: props.color?.light?.dropdown?.items?.border?.default || DEFAULT_THEME.color.light.dropdown.items.border.default,
          hover: props.color?.light?.dropdown?.items?.border?.hover || DEFAULT_THEME.color.light.dropdown.items.border.hover,
          focus: props.color?.light?.dropdown?.items?.border?.focus || DEFAULT_THEME.color.light.dropdown.items.border.focus,
          active: props.color?.light?.dropdown?.items?.border?.active || DEFAULT_THEME.color.light.dropdown.items.border.active,
        },
      },
      indicators: {
        arrow: props.color?.light?.dropdown?.indicators?.arrow || DEFAULT_THEME.color.light.dropdown.indicators.arrow,
        hover: props.color?.light?.dropdown?.indicators?.hover || DEFAULT_THEME.color.light.dropdown.indicators.hover,
      }
    }
  };

  // Build the dark mode color config
  const darkColorConfig = {
    background: {
      default: props.color?.dark?.background?.default || DEFAULT_THEME.color.dark.background.default,
      hover: props.color?.dark?.background?.hover || DEFAULT_THEME.color.dark.background.hover,
      focus: props.color?.dark?.background?.focus || DEFAULT_THEME.color.dark.background.focus,
      active: props.color?.dark?.background?.active || DEFAULT_THEME.color.dark.background.active,
    },
    text: {
      default: props.color?.dark?.text?.default || DEFAULT_THEME.color.dark.text.default,
      hover: props.color?.dark?.text?.hover || DEFAULT_THEME.color.dark.text.hover,
      focus: props.color?.dark?.text?.focus || DEFAULT_THEME.color.dark.text.focus,
      active: props.color?.dark?.text?.active || DEFAULT_THEME.color.dark.text.active,
    },
    border: {
      default: props.color?.dark?.border?.default || DEFAULT_THEME.color.dark.border.default,
      hover: props.color?.dark?.border?.hover || DEFAULT_THEME.color.dark.border.hover,
      focus: props.color?.dark?.border?.focus || DEFAULT_THEME.color.dark.border.focus,
      active: props.color?.dark?.border?.active || DEFAULT_THEME.color.dark.border.active,
    },
    dropdown: {
      background: {
        default: props.color?.dark?.dropdown?.background?.default || DEFAULT_THEME.color.dark.dropdown.background.default,
        hover: props.color?.dark?.dropdown?.background?.hover || DEFAULT_THEME.color.dark.dropdown.background.hover,
        focus: props.color?.dark?.dropdown?.background?.focus || DEFAULT_THEME.color.dark.dropdown.background.focus,
        active: props.color?.dark?.dropdown?.background?.active || DEFAULT_THEME.color.dark.dropdown.background.active,
      },
      text: {
        default: props.color?.dark?.dropdown?.text?.default || DEFAULT_THEME.color.dark.dropdown.text.default,
        hover: props.color?.dark?.dropdown?.text?.hover || DEFAULT_THEME.color.dark.dropdown.text.hover,
        focus: props.color?.dark?.dropdown?.text?.focus || DEFAULT_THEME.color.dark.dropdown.text.focus,
        active: props.color?.dark?.dropdown?.text?.active || DEFAULT_THEME.color.dark.dropdown.text.active,
      },
      border: {
        default: props.color?.dark?.dropdown?.border?.default || DEFAULT_THEME.color.dark.dropdown.border.default,
        hover: props.color?.dark?.dropdown?.border?.hover || DEFAULT_THEME.color.dark.dropdown.border.hover,
        focus: props.color?.dark?.dropdown?.border?.focus || DEFAULT_THEME.color.dark.dropdown.border.focus,
        active: props.color?.dark?.dropdown?.border?.active || DEFAULT_THEME.color.dark.dropdown.border.active,
      },
      description: props.color?.dark?.dropdown?.description || DEFAULT_THEME.color.dark.dropdown.description,
      items: {
        background: {
          default: props.color?.dark?.dropdown?.items?.background?.default || DEFAULT_THEME.color.dark.dropdown.items.background.default,
          hover: props.color?.dark?.dropdown?.items?.background?.hover || DEFAULT_THEME.color.dark.dropdown.items.background.hover,
          focus: props.color?.dark?.dropdown?.items?.background?.focus || DEFAULT_THEME.color.dark.dropdown.items.background.focus,
          active: props.color?.dark?.dropdown?.items?.background?.active || DEFAULT_THEME.color.dark.dropdown.items.background.active,
        },
        border: {
          default: props.color?.dark?.dropdown?.items?.border?.default || DEFAULT_THEME.color.dark.dropdown.items.border.default,
          hover: props.color?.dark?.dropdown?.items?.border?.hover || DEFAULT_THEME.color.dark.dropdown.items.border.hover,
          focus: props.color?.dark?.dropdown?.items?.border?.focus || DEFAULT_THEME.color.dark.dropdown.items.border.focus,
          active: props.color?.dark?.dropdown?.items?.border?.active || DEFAULT_THEME.color.dark.dropdown.items.border.active,
        },
      },
      indicators: {
        arrow: props.color?.dark?.dropdown?.indicators?.arrow || DEFAULT_THEME.color.dark.dropdown.indicators.arrow,
        hover: props.color?.dark?.dropdown?.indicators?.hover || DEFAULT_THEME.color.dark.dropdown.indicators.hover,
      }
    }
  };

  // Return the complete theme config
  return {
    color: {
      light: lightColorConfig,
      dark: darkColorConfig
    },
    structure: structureConfig,
    animation: animations
  };
}
  

