import { nextgenDesktopNavDarkConfig } from "./nextgen-desktop-nav.dark-theme"
import { nextgenDesktopNavLightConfig } from "./nextgen-desktop-nav.light-theme"

export const nextgenDesktopNavColorProperties = {
    light: {
        background: {
          default: nextgenDesktopNavLightConfig.background.default,
          hover: nextgenDesktopNavLightConfig.background.hover,
          focus: nextgenDesktopNavLightConfig.background.focus,
          active: nextgenDesktopNavLightConfig.background.active,
        },
        text: {
          default: nextgenDesktopNavLightConfig.text.color.default,
          hover: nextgenDesktopNavLightConfig.text.color.hover,
          focus: nextgenDesktopNavLightConfig.text.color.focus,
          active: nextgenDesktopNavLightConfig.text.color.active,
        },
        border: {
          default: nextgenDesktopNavLightConfig.border?.color?.default || 'transparent',
          hover: nextgenDesktopNavLightConfig.border?.color?.hover || 'transparent',
          focus: nextgenDesktopNavLightConfig.border?.color?.focus || 'transparent',
          active: nextgenDesktopNavLightConfig.border?.color?.active || 'transparent',
        },
        dropdown: {
          background: {
            default: nextgenDesktopNavLightConfig.dropdown.background.default,
            hover: nextgenDesktopNavLightConfig.dropdown.background.hover,
            focus: nextgenDesktopNavLightConfig.dropdown.background.focus,
            active: nextgenDesktopNavLightConfig.dropdown.background.active || 'transparent',
          },
          text: {
            default: nextgenDesktopNavLightConfig.dropdown.text.color.default,
            hover: nextgenDesktopNavLightConfig.dropdown.text.color.hover,
            focus: nextgenDesktopNavLightConfig.dropdown.text.color.focus,
            active: nextgenDesktopNavLightConfig.dropdown.text.color.active || 'transparent',
          },
          border: {
            default: nextgenDesktopNavLightConfig.dropdown.border?.color?.default || 'transparent',
            hover: nextgenDesktopNavLightConfig.dropdown.border?.color?.hover || 'transparent',
            focus: nextgenDesktopNavLightConfig.dropdown.border?.color?.focus || 'transparent',
            active: nextgenDesktopNavLightConfig.dropdown.border?.color?.active || 'transparent',
          },
          description: nextgenDesktopNavLightConfig.dropdown.descriptionColor || 'text-muted-foreground',
          items: {
            background: {
              default: nextgenDesktopNavLightConfig.dropdown.items?.background.default || 'transparent',
              hover: nextgenDesktopNavLightConfig.dropdown.items?.background.hover || 'rgba(255, 255, 255, 0.1)',
              focus: nextgenDesktopNavLightConfig.dropdown.items?.background.focus || 'rgba(255, 255, 255, 0.15)',
              active: nextgenDesktopNavLightConfig.dropdown.items?.background.active || 'rgba(255, 255, 255, 0.15)',
            },
            border: {
              default: nextgenDesktopNavLightConfig.dropdown.items?.border?.color?.default || 'transparent',
              hover: nextgenDesktopNavLightConfig.dropdown.items?.border?.color?.hover || 'transparent',
              focus: nextgenDesktopNavLightConfig.dropdown.items?.border?.color?.focus || 'transparent',
              active: nextgenDesktopNavLightConfig.dropdown.items?.border?.color?.active || 'transparent',
            },
          },
          indicators: {
            arrow: nextgenDesktopNavLightConfig.dropdown.indicators?.arrowColor || '',
            hover: nextgenDesktopNavLightConfig.dropdown.indicators?.hoverIndicatorColor || 'bg-accent',
          }
        }
      },
      dark: {
        background: {
          default: nextgenDesktopNavDarkConfig.background.default,
          hover: nextgenDesktopNavDarkConfig.background.hover,
          focus: nextgenDesktopNavDarkConfig.background.focus,
          active: nextgenDesktopNavDarkConfig.background.active,
        },
        text: {
          default: nextgenDesktopNavDarkConfig.text.color.default,
          hover: nextgenDesktopNavDarkConfig.text.color.hover,
          focus: nextgenDesktopNavDarkConfig.text.color.focus,
          active: nextgenDesktopNavDarkConfig.text.color.active,
        },
        border: {
          default: nextgenDesktopNavDarkConfig.border?.color?.default || 'transparent',
          hover: nextgenDesktopNavDarkConfig.border?.color?.hover || 'transparent',
          focus: nextgenDesktopNavDarkConfig.border?.color?.focus || 'transparent',
          active: nextgenDesktopNavDarkConfig.border?.color?.active || 'transparent',
        },
        dropdown: {
          background: {
            default: nextgenDesktopNavDarkConfig.dropdown.background.default,
            hover: nextgenDesktopNavDarkConfig.dropdown.background.hover,
            focus: nextgenDesktopNavDarkConfig.dropdown.background.focus,
            active: nextgenDesktopNavDarkConfig.dropdown.background.active || 'transparent',
          },
          text: {
            default: nextgenDesktopNavDarkConfig.dropdown.text.color.default,
            hover: nextgenDesktopNavDarkConfig.dropdown.text.color.hover,
            focus: nextgenDesktopNavDarkConfig.dropdown.text.color.focus,
            active: nextgenDesktopNavDarkConfig.dropdown.text.color.active || 'transparent',
          },
          border: {
            default: nextgenDesktopNavDarkConfig.dropdown.border?.color?.default || 'transparent',
            hover: nextgenDesktopNavDarkConfig.dropdown.border?.color?.hover || 'transparent',
            focus: nextgenDesktopNavDarkConfig.dropdown.border?.color?.focus || 'transparent',
            active: nextgenDesktopNavDarkConfig.dropdown.border?.color?.active || 'transparent',
          },
          description: nextgenDesktopNavDarkConfig.dropdown.descriptionColor || 'text-muted-foreground',
          items: {
            background: {
              default: nextgenDesktopNavDarkConfig.dropdown.items?.background.default || 'transparent',
              hover: nextgenDesktopNavDarkConfig.dropdown.items?.background.hover || 'rgba(0, 0, 0, 0.05)',
              focus: nextgenDesktopNavDarkConfig.dropdown.items?.background.focus || 'rgba(0, 0, 0, 0.10)',
              active: nextgenDesktopNavDarkConfig.dropdown.items?.background.active || 'rgba(0, 0, 0, 0.10)',
            },
            border: {
              default: nextgenDesktopNavDarkConfig.dropdown.items?.border?.color?.default || 'transparent',
              hover: nextgenDesktopNavDarkConfig.dropdown.items?.border?.color?.hover || 'transparent',
              focus: nextgenDesktopNavDarkConfig.dropdown.items?.border?.color?.focus || 'transparent',
              active: nextgenDesktopNavDarkConfig.dropdown.items?.border?.color?.active || 'transparent',
            },
          },
          indicators: {
            arrow: nextgenDesktopNavDarkConfig.dropdown.indicators?.arrowColor || '',
            hover: nextgenDesktopNavDarkConfig.dropdown.indicators?.hoverIndicatorColor || 'bg-accent',
          }
        }
      }
    }