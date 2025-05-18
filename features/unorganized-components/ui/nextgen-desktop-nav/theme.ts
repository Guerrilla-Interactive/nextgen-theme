/**
 * Theme configuration for NextGen Desktop Navigation
 */
import {
  NavThemeConfig,
  NavStyleProps
} from './types';

/**
 * Default theme configuration
 */
export const DEFAULT_THEME: NavThemeConfig = {
  light: {
    background: {
      default: 'transparent',
      hover: 'rgba(255, 255, 255, 0.05)',
      focus: 'rgba(255, 255, 255, 0.10)',
      active: 'rgba(255, 255, 255, 0.10)',
    },
    text: {
      color: {
        default: 'rgba(255, 255, 255, 1)',
        hover: 'rgba(255, 255, 255, 1)',
        focus: 'rgba(255, 255, 255, 1',
        active: 'rgba(255, 255, 255, 0.9)',
      },
      weight: {
        default: 'font-medium',
      },
      transform: {
        default: 'uppercase',
      },
    },
    border: {
      color: {
        default: 'transparent',
        hover: 'rgba(255, 255, 255, 0.1)',
        focus: 'rgba(255, 255, 255, 0.2)',
        active: 'rgba(255, 255, 255, 0.3)',
      },
      width: {
        default: 'border',
        hover: 'border',
        focus: 'border',
        active: 'border',
      },
      radius: 'rounded',
    },
    spacing: {
      padding: 'px-3 py-2',
    },
    dropdown: {
      background: {
        default: '#ffffff05',
        hover: 'rgba(255, 255, 255, 0.05)',
        focus: 'rgba(255, 255, 255, 0.10)',
        active: 'rgba(255, 255, 255, 0.10)',
      },
      text: {
        color: {
          default: '#ffffff',
          hover: 'rgba(255, 255, 255, 1)',
          focus: 'rgba(255, 255, 255, 1',
          active: 'rgba(255, 255, 255, 0.9)',
        },
      },
      border: {
        color: {
          default: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.2)',
          focus: 'rgba(255, 255, 255, 0.3)',
          active: 'rgba(255, 255, 255, 0.4)',
        },
        width: {
          default: 'border',
          hover: 'border',
          focus: 'border',
          active: 'border',
        },
        radius: 'rounded-md',
      },
      spacing: {
        padding: 'p-3',
        itemSpacing: 'space-y-1',
      },
      layout: {
        shadow: 'shadow-lg',
        blur: '4px',
        maxHeight: 'max-h-[80vh]',
        minWidth: 'min-w-[200px]',
      },
      animation: {
        duration: '200ms',
        easing: 'ease-out',
        properties: {
          background: '300ms',
          color: '200ms',
          border: '250ms',
          transform: '200ms',
          opacity: '200ms'
        }
      },
      indicators: {
        showArrow: false,
        arrowSize: 'w-[10px] h-[10px]',
        arrowColor: 'border-border',
        hoverIndicatorColor: 'bg-accent',
        hoverIndicatorWidth: 'w-[3px]',
      },
      descriptionColor: 'text-muted-foreground',
      items: {
        background: {
          default: 'transparent',
          hover: 'rgba(255, 255, 255, 0.1)',
          focus: 'rgba(255, 255, 255, 0.15)',
          active: 'rgba(255, 255, 255, 0.15)',
        },
        border: {
          color: {
            default: 'transparent',
            hover: 'rgba(255, 255, 255, 0.1)',
            focus: 'rgba(255, 255, 255, 0.2)',
            active: 'rgba(255, 255, 255, 0.2)',
          },
          width: {
            default: 'border',
            hover: 'border',
            focus: 'border',
            active: 'border',
          },
          radius: 'rounded',
        },
      },
    },
  },
  dark: {
    background: {
      default: 'transparent',
      hover: 'rgba(0, 0, 0, 0.03)',
      focus: 'rgba(0, 0, 0, 0.06)',
      active: 'rgba(0, 0, 0, 0.06)',
    },
    text: {
      color: {
        default: 'rgba(0, 0, 0, 1)',
        hover: 'rgba(0, 0, 0, 1)',
        focus: 'rgba(0, 0, 0, 1)',
        active: 'rgba(0, 0, 0, 0.9)',
      },
      weight: {
        default: 'font-medium',
      },
      transform: {
        default: 'uppercase',
      },
    },
    border: {
      color: {
        default: 'rgba(0, 0, 0, 0.1)',
        hover: 'rgba(0, 0, 0, 0.2)',
        focus: 'rgba(0, 0, 0, 0.3)',
        active: 'rgba(0, 0, 0, 0.4)',
      },
      width: {
        default: 'border',
        hover: 'border',
        focus: 'border',
        active: 'border',
      },
      radius: 'rounded-md',
    },
    spacing: {
      padding: 'px-3 py-2',
    },
    dropdown: {
      background: {
        default: 'transparent',
        hover: 'rgba(0, 0, 0, 0.05)',
        focus: 'rgba(0, 0, 0, 0.10)',
        active: 'rgba(0, 0, 0, 0.10)',
      },
      text: {
        color: {
          default: 'rgba(0, 0, 0, 1)',
          hover: 'rgba(0, 0, 0, 1)',
          focus: 'rgba(0, 0, 0, 1)',
          active: 'rgba(0, 0, 0, 0.9)',
        },
      },
      border: {
        color: {
          default: 'rgba(0, 0, 0, 0.1)',
          hover: 'rgba(0, 0, 0, 0.2)',
          focus: 'rgba(0, 0, 0, 0.3)',
          active: 'rgba(0, 0, 0, 0.4)',
        },
        width: {
          default: 'border',
          hover: 'border',
          focus: 'border',
          active: 'border',
        },
        radius: 'rounded-md',
      },
      spacing: {
        padding: 'p-3',
        itemSpacing: 'space-y-1',
      },
      layout: {
        shadow: 'shadow-lg',
        blur: '4px',
        maxHeight: 'max-h-[80vh]',
        minWidth: 'min-w-[200px]',
      },
      animation: {
        duration: '200ms',
        easing: 'ease-out',
        properties: {
          background: '300ms',
          color: '200ms',
          border: '250ms',
          transform: '200ms',
          opacity: '200ms'
        }
      },
      indicators: {
        showArrow: false,
        arrowSize: 'w-[10px] h-[10px]',
        arrowColor: 'border-border',
        hoverIndicatorColor: 'bg-accent',
        hoverIndicatorWidth: 'w-[3px]',
      },
      descriptionColor: 'text-muted-foreground',
      items: {
        background: {
          default: 'transparent',
          hover: 'rgba(0, 0, 0, 0.05)',
          focus: 'rgba(0, 0, 0, 0.10)',
          active: 'rgba(0, 0, 0, 0.10)',
        },
        border: {
          color: {
            default: 'transparent',
            hover: 'rgba(0, 0, 0, 0.1)',
            focus: 'rgba(0, 0, 0, 0.2)',
            active: 'rgba(0, 0, 0, 0.2)',
          },
          width: {
            default: 'border',
            hover: 'border',
            focus: 'border',
            active: 'border',
          },
          radius: 'rounded',
        },
      },
    },
  },
  layout: {
    fontSize: 'text-sm',
    gap: 'gap-6',
    height: 'h-16',
    maxWidth: 'max-w-screen-xl',
    position: 'relative',
    zIndex: 50,
  },
  animation: {
    type: 'fade',
    duration: '200ms',
    easing: 'ease-in-out',
    properties: {
      background: '600ms',
      color: '400ms',
      border: '300ms',
      transform: '200ms',
      opacity: '200ms'
    }
  },
};

/**
 * Creates a complete theme configuration by merging user properties with defaults
 */
export function createThemeConfig(props: NavStyleProps = {}): NavThemeConfig {
  return {
    light: {
      background: {
        default: props.light?.background?.default || DEFAULT_THEME.light.background.default,
        hover: props.light?.background?.hover || DEFAULT_THEME.light.background.hover,
        focus: props.light?.background?.focus || DEFAULT_THEME.light.background.focus,
        active: props.light?.background?.active || DEFAULT_THEME.light.background.active,
      },
      text: {
        color: {
          default: props.light?.text?.color?.default || DEFAULT_THEME.light.text.color.default,
          hover: props.light?.text?.color?.hover || DEFAULT_THEME.light.text.color.hover,
          focus: props.light?.text?.color?.focus || DEFAULT_THEME.light.text.color.focus,
          active: props.light?.text?.color?.active || DEFAULT_THEME.light.text.color.active,
        },
        weight: {
          default: props.light?.text?.weight?.default || DEFAULT_THEME.light.text.weight?.default,
          hover: props.light?.text?.weight?.hover || DEFAULT_THEME.light.text.weight?.hover,
          focus: props.light?.text?.weight?.focus || DEFAULT_THEME.light.text.weight?.focus,
          active: props.light?.text?.weight?.active || DEFAULT_THEME.light.text.weight?.active,
        },
        transform: {
          default: props.light?.text?.transform?.default || DEFAULT_THEME.light.text.transform?.default,
        },
        size: props.light?.text?.size || props.layout?.fontSize || DEFAULT_THEME.light.text.size,
      },
      border: {
        color: {
          default: props.light?.border?.color?.default || DEFAULT_THEME.light.border.color.default,
          hover: props.light?.border?.color?.hover || DEFAULT_THEME.light.border.color.hover,
          focus: props.light?.border?.color?.focus || DEFAULT_THEME.light.border.color.focus,
          active: props.light?.border?.color?.active || DEFAULT_THEME.light.border.color.active,
        },
        width: {
          default: props.light?.border?.width?.default || DEFAULT_THEME.light.border.width?.default,
          hover: props.light?.border?.width?.hover || DEFAULT_THEME.light.border.width?.hover,
          focus: props.light?.border?.width?.focus || DEFAULT_THEME.light.border.width?.focus,
          active: props.light?.border?.width?.active || DEFAULT_THEME.light.border.width?.active,
        },
        radius: props.light?.border?.radius || DEFAULT_THEME.light.border?.radius,
      },
      spacing: {
        padding: props.light?.spacing?.padding || DEFAULT_THEME.light.spacing?.padding,
      },
      dropdown: {
        background: {
          default: props.lightDropdown?.background?.default || DEFAULT_THEME.light.dropdown.background.default,
          hover: props.lightDropdown?.background?.hover || DEFAULT_THEME.light.dropdown.background.hover,
          focus: props.lightDropdown?.background?.focus || DEFAULT_THEME.light.dropdown.background.focus,
          active: props.lightDropdown?.background?.active || DEFAULT_THEME.light.dropdown.background.active,
        },
        text: {
          color: {
            default: props.lightDropdown?.text?.color?.default || DEFAULT_THEME.light.dropdown.text.color.default,
            hover: props.lightDropdown?.text?.color?.hover || DEFAULT_THEME.light.dropdown.text.color.hover,
            focus: props.lightDropdown?.text?.color?.focus || DEFAULT_THEME.light.dropdown.text.color.focus,
            active: props.lightDropdown?.text?.color?.active || DEFAULT_THEME.light.dropdown.text.color.active,
          },
        },
        border: {
          color: {
            default: props.lightDropdown?.border?.color?.default || DEFAULT_THEME.light.dropdown.border.color.default,
            hover: props.lightDropdown?.border?.color?.hover || DEFAULT_THEME.light.dropdown.border.color.hover,
            focus: props.lightDropdown?.border?.color?.focus || DEFAULT_THEME.light.dropdown.border.color.focus,
            active: props.lightDropdown?.border?.color?.active || DEFAULT_THEME.light.dropdown.border.color.active,
          },
          width: {
            default: props.lightDropdown?.border?.width?.default || DEFAULT_THEME.light.dropdown.border.width?.default,
            hover: props.lightDropdown?.border?.width?.hover || DEFAULT_THEME.light.dropdown.border.width?.hover,
            focus: props.lightDropdown?.border?.width?.focus || DEFAULT_THEME.light.dropdown.border.width?.focus,
            active: props.lightDropdown?.border?.width?.active || DEFAULT_THEME.light.dropdown.border.width?.active,
          },
          radius: props.lightDropdown?.border?.radius || DEFAULT_THEME.light.dropdown.border?.radius,
        },
        spacing: {
          padding: props.lightDropdown?.spacing?.padding || DEFAULT_THEME.light.dropdown.spacing?.padding,
          itemSpacing: props.lightDropdown?.spacing?.itemSpacing || DEFAULT_THEME.light.dropdown.spacing?.itemSpacing,
        },
        layout: {
          shadow: props.lightDropdown?.layout?.shadow || DEFAULT_THEME.light.dropdown.layout?.shadow,
          blur: props.lightDropdown?.layout?.blur || DEFAULT_THEME.light.dropdown.layout?.blur,
          maxHeight: props.lightDropdown?.layout?.maxHeight || DEFAULT_THEME.light.dropdown.layout?.maxHeight,
          minWidth: props.lightDropdown?.layout?.minWidth || DEFAULT_THEME.light.dropdown.layout?.minWidth,
        },
        animation: {
          type: props.lightDropdown?.animation?.type || DEFAULT_THEME.light.dropdown.animation?.type,
          duration: props.lightDropdown?.animation?.duration || DEFAULT_THEME.light.dropdown.animation?.duration,
          easing: props.lightDropdown?.animation?.easing || DEFAULT_THEME.light.dropdown.animation?.easing,
          properties: {
            background: props.lightDropdown?.animation?.properties?.background || DEFAULT_THEME.light.dropdown.animation?.properties?.background,
            color: props.lightDropdown?.animation?.properties?.color || DEFAULT_THEME.light.dropdown.animation?.properties?.color,
            border: props.lightDropdown?.animation?.properties?.border || DEFAULT_THEME.light.dropdown.animation?.properties?.border,
            transform: props.lightDropdown?.animation?.properties?.transform || DEFAULT_THEME.light.dropdown.animation?.properties?.transform,
            opacity: props.lightDropdown?.animation?.properties?.opacity || DEFAULT_THEME.light.dropdown.animation?.properties?.opacity,
          }
        },
        indicators: {
          showArrow: props.lightDropdown?.indicators?.showArrow !== undefined ? props.lightDropdown.indicators.showArrow : DEFAULT_THEME.light.dropdown.indicators?.showArrow,
          arrowSize: props.lightDropdown?.indicators?.arrowSize || DEFAULT_THEME.light.dropdown.indicators?.arrowSize,
          arrowColor: props.lightDropdown?.indicators?.arrowColor || DEFAULT_THEME.light.dropdown.indicators?.arrowColor,
          hoverIndicatorColor: props.lightDropdown?.indicators?.hoverIndicatorColor || DEFAULT_THEME.light.dropdown.indicators?.hoverIndicatorColor,
          hoverIndicatorWidth: props.lightDropdown?.indicators?.hoverIndicatorWidth || DEFAULT_THEME.light.dropdown.indicators?.hoverIndicatorWidth,
        },
        descriptionColor: props.lightDropdown?.descriptionColor || DEFAULT_THEME.light.dropdown.descriptionColor,
        items: {
          background: {
            default: props.lightDropdown?.items?.background?.default || DEFAULT_THEME.light.dropdown.items?.background.default,
            hover: props.lightDropdown?.items?.background?.hover || DEFAULT_THEME.light.dropdown.items?.background.hover,
            focus: props.lightDropdown?.items?.background?.focus || DEFAULT_THEME.light.dropdown.items?.background.focus,
            active: props.lightDropdown?.items?.background?.active || DEFAULT_THEME.light.dropdown.items?.background.active,
          },
          border: {
            color: {
              default: props.lightDropdown?.items?.border?.color?.default || DEFAULT_THEME.light.dropdown.items?.border?.color?.default,
              hover: props.lightDropdown?.items?.border?.color?.hover || DEFAULT_THEME.light.dropdown.items?.border?.color?.hover,
              focus: props.lightDropdown?.items?.border?.color?.focus || DEFAULT_THEME.light.dropdown.items?.border?.color?.focus,
              active: props.lightDropdown?.items?.border?.color?.active || DEFAULT_THEME.light.dropdown.items?.border?.color?.active,
            },
            width: {
              default: props.lightDropdown?.items?.border?.width?.default || DEFAULT_THEME.light.dropdown.items?.border?.width?.default,
              hover: props.lightDropdown?.items?.border?.width?.hover || DEFAULT_THEME.light.dropdown.items?.border?.width?.hover,
              focus: props.lightDropdown?.items?.border?.width?.focus || DEFAULT_THEME.light.dropdown.items?.border?.width?.focus,
              active: props.lightDropdown?.items?.border?.width?.active || DEFAULT_THEME.light.dropdown.items?.border?.width?.active,
            },
            radius: props.lightDropdown?.items?.border?.radius || DEFAULT_THEME.light.dropdown.items?.border?.radius,
          },
        },
      }
    },
    dark: {
      background: {
        default: props.dark?.background?.default || DEFAULT_THEME.dark.background.default,
        hover: props.dark?.background?.hover || DEFAULT_THEME.dark.background.hover,
        focus: props.dark?.background?.focus || DEFAULT_THEME.dark.background.focus,
        active: props.dark?.background?.active || DEFAULT_THEME.dark.background.active,
      },
      text: {
        color: {
          default: props.dark?.text?.color?.default || DEFAULT_THEME.dark.text.color.default,
          hover: props.dark?.text?.color?.hover || DEFAULT_THEME.dark.text.color.hover,
          focus: props.dark?.text?.color?.focus || DEFAULT_THEME.dark.text.color.focus,
          active: props.dark?.text?.color?.active || DEFAULT_THEME.dark.text.color.active,
        },
        weight: {
          default: props.dark?.text?.weight?.default || DEFAULT_THEME.dark.text.weight?.default,
          hover: props.dark?.text?.weight?.hover || DEFAULT_THEME.dark.text.weight?.hover,
          focus: props.dark?.text?.weight?.focus || DEFAULT_THEME.dark.text.weight?.focus,
          active: props.dark?.text?.weight?.active || DEFAULT_THEME.dark.text.weight?.active,
        },
        transform: {
          default: props.dark?.text?.transform?.default || DEFAULT_THEME.dark.text.transform?.default,
        },
        size: props.dark?.text?.size || props.layout?.fontSize || DEFAULT_THEME.dark.text.size,
      },
      border: {
        color: {
          default: props.dark?.border?.color?.default || DEFAULT_THEME.dark.border.color.default,
          hover: props.dark?.border?.color?.hover || DEFAULT_THEME.dark.border.color.hover,
          focus: props.dark?.border?.color?.focus || DEFAULT_THEME.dark.border.color.focus,
          active: props.dark?.border?.color?.active || DEFAULT_THEME.dark.border.color.active,
        },
        width: {
          default: props.dark?.border?.width?.default || DEFAULT_THEME.dark.border.width?.default,
          hover: props.dark?.border?.width?.hover || DEFAULT_THEME.dark.border.width?.hover,
          focus: props.dark?.border?.width?.focus || DEFAULT_THEME.dark.border.width?.focus,
          active: props.dark?.border?.width?.active || DEFAULT_THEME.dark.border.width?.active,
        },
        radius: props.dark?.border?.radius || DEFAULT_THEME.dark.border?.radius,
      },
      spacing: {
        padding: props.dark?.spacing?.padding || DEFAULT_THEME.dark.spacing?.padding,
      },
      dropdown: {
        background: {
          default: props.darkDropdown?.background?.default || DEFAULT_THEME.dark.dropdown.background.default,
          hover: props.darkDropdown?.background?.hover || DEFAULT_THEME.dark.dropdown.background.hover,
          focus: props.darkDropdown?.background?.focus || DEFAULT_THEME.dark.dropdown.background.focus,
          active: props.darkDropdown?.background?.active || DEFAULT_THEME.dark.dropdown.background.active,
        },
        text: {
          color: {
            default: props.darkDropdown?.text?.color?.default || DEFAULT_THEME.dark.dropdown.text.color.default,
            hover: props.darkDropdown?.text?.color?.hover || DEFAULT_THEME.dark.dropdown.text.color.hover,
            focus: props.darkDropdown?.text?.color?.focus || DEFAULT_THEME.dark.dropdown.text.color.focus,
            active: props.darkDropdown?.text?.color?.active || DEFAULT_THEME.dark.dropdown.text.color.active,
          },
        },
        border: {
          color: {
            default: props.darkDropdown?.border?.color?.default || DEFAULT_THEME.dark.dropdown.border.color.default,
            hover: props.darkDropdown?.border?.color?.hover || DEFAULT_THEME.dark.dropdown.border.color.hover,
            focus: props.darkDropdown?.border?.color?.focus || DEFAULT_THEME.dark.dropdown.border.color.focus,
            active: props.darkDropdown?.border?.color?.active || DEFAULT_THEME.dark.dropdown.border.color.active,
          },
          width: {
            default: props.darkDropdown?.border?.width?.default || DEFAULT_THEME.dark.dropdown.border.width?.default,
            hover: props.darkDropdown?.border?.width?.hover || DEFAULT_THEME.dark.dropdown.border.width?.hover,
            focus: props.darkDropdown?.border?.width?.focus || DEFAULT_THEME.dark.dropdown.border.width?.focus,
            active: props.darkDropdown?.border?.width?.active || DEFAULT_THEME.dark.dropdown.border.width?.active,
          },
          radius: props.darkDropdown?.border?.radius || DEFAULT_THEME.dark.dropdown.border?.radius,
        },
        spacing: {
          padding: props.darkDropdown?.spacing?.padding || DEFAULT_THEME.dark.dropdown.spacing?.padding,
          itemSpacing: props.darkDropdown?.spacing?.itemSpacing || DEFAULT_THEME.dark.dropdown.spacing?.itemSpacing,
        },
        layout: {
          shadow: props.darkDropdown?.layout?.shadow || DEFAULT_THEME.dark.dropdown.layout?.shadow,
          blur: props.darkDropdown?.layout?.blur || DEFAULT_THEME.dark.dropdown.layout?.blur,
          maxHeight: props.darkDropdown?.layout?.maxHeight || DEFAULT_THEME.dark.dropdown.layout?.maxHeight,
          minWidth: props.darkDropdown?.layout?.minWidth || DEFAULT_THEME.dark.dropdown.layout?.minWidth,
        },
        animation: {
          type: props.darkDropdown?.animation?.type || DEFAULT_THEME.dark.dropdown.animation?.type,
          duration: props.darkDropdown?.animation?.duration || DEFAULT_THEME.dark.dropdown.animation?.duration,
          easing: props.darkDropdown?.animation?.easing || DEFAULT_THEME.dark.dropdown.animation?.easing,
          properties: {
            background: props.darkDropdown?.animation?.properties?.background || DEFAULT_THEME.dark.dropdown.animation?.properties?.background,
            color: props.darkDropdown?.animation?.properties?.color || DEFAULT_THEME.dark.dropdown.animation?.properties?.color,
            border: props.darkDropdown?.animation?.properties?.border || DEFAULT_THEME.dark.dropdown.animation?.properties?.border,
            transform: props.darkDropdown?.animation?.properties?.transform || DEFAULT_THEME.dark.dropdown.animation?.properties?.transform,
            opacity: props.darkDropdown?.animation?.properties?.opacity || DEFAULT_THEME.dark.dropdown.animation?.properties?.opacity,
          }
        },
        indicators: {
          showArrow: props.darkDropdown?.indicators?.showArrow !== undefined ? props.darkDropdown.indicators.showArrow : DEFAULT_THEME.dark.dropdown.indicators?.showArrow,
          arrowSize: props.darkDropdown?.indicators?.arrowSize || DEFAULT_THEME.dark.dropdown.indicators?.arrowSize,
          arrowColor: props.darkDropdown?.indicators?.arrowColor || DEFAULT_THEME.dark.dropdown.indicators?.arrowColor,
          hoverIndicatorColor: props.darkDropdown?.indicators?.hoverIndicatorColor || DEFAULT_THEME.dark.dropdown.indicators?.hoverIndicatorColor,
          hoverIndicatorWidth: props.darkDropdown?.indicators?.hoverIndicatorWidth || DEFAULT_THEME.dark.dropdown.indicators?.hoverIndicatorWidth,
        },
        descriptionColor: props.darkDropdown?.descriptionColor || DEFAULT_THEME.dark.dropdown.descriptionColor,
        items: {
          background: {
            default: props.darkDropdown?.items?.background?.default || DEFAULT_THEME.dark.dropdown.items?.background.default,
            hover: props.darkDropdown?.items?.background?.hover || DEFAULT_THEME.dark.dropdown.items?.background.hover,
            focus: props.darkDropdown?.items?.background?.focus || DEFAULT_THEME.dark.dropdown.items?.background.focus,
            active: props.darkDropdown?.items?.background?.active || DEFAULT_THEME.dark.dropdown.items?.background.active,
          },
          border: {
            color: {
              default: props.darkDropdown?.items?.border?.color?.default || DEFAULT_THEME.dark.dropdown.items?.border?.color?.default,
              hover: props.darkDropdown?.items?.border?.color?.hover || DEFAULT_THEME.dark.dropdown.items?.border?.color?.hover,
              focus: props.darkDropdown?.items?.border?.color?.focus || DEFAULT_THEME.dark.dropdown.items?.border?.color?.focus,
              active: props.darkDropdown?.items?.border?.color?.active || DEFAULT_THEME.dark.dropdown.items?.border?.color?.active,
            },
            width: {
              default: props.darkDropdown?.items?.border?.width?.default || DEFAULT_THEME.dark.dropdown.items?.border?.width?.default,
              hover: props.darkDropdown?.items?.border?.width?.hover || DEFAULT_THEME.dark.dropdown.items?.border?.width?.hover,
              focus: props.darkDropdown?.items?.border?.width?.focus || DEFAULT_THEME.dark.dropdown.items?.border?.width?.focus,
              active: props.darkDropdown?.items?.border?.width?.active || DEFAULT_THEME.dark.dropdown.items?.border?.width?.active,
            },
            radius: props.darkDropdown?.items?.border?.radius || DEFAULT_THEME.dark.dropdown.items?.border?.radius,
          },
        },
      }
    },
    layout: {
      fontSize: props.layout?.fontSize || DEFAULT_THEME.layout.fontSize,
      gap: props.layout?.gap || DEFAULT_THEME.layout.gap,
      height: props.layout?.height || DEFAULT_THEME.layout.height,
      maxWidth: props.layout?.maxWidth || DEFAULT_THEME.layout.maxWidth,
      position: props.layout?.position || DEFAULT_THEME.layout.position,
      zIndex: props.layout?.zIndex || DEFAULT_THEME.layout.zIndex,
    },
    animation: {
      type: props.animation?.type || DEFAULT_THEME.animation?.type,
      duration: props.animation?.duration || DEFAULT_THEME.animation?.duration,
      easing: props.animation?.easing || DEFAULT_THEME.animation?.easing,
      properties: {
        background: props.animation?.properties?.background || DEFAULT_THEME.animation?.properties?.background,
        color: props.animation?.properties?.color || DEFAULT_THEME.animation?.properties?.color,
        border: props.animation?.properties?.border || DEFAULT_THEME.animation?.properties?.border,
        transform: props.animation?.properties?.transform || DEFAULT_THEME.animation?.properties?.transform,
        opacity: props.animation?.properties?.opacity || DEFAULT_THEME.animation?.properties?.opacity,
      }
    }
  };
} 