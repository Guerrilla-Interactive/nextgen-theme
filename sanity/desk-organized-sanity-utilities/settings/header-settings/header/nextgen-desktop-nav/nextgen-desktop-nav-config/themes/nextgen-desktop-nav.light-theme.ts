/**
 * Light theme configuration for the NextGen Desktop Nav
 * 
 * Note: Only color-related properties should be defined here.
 * All structural properties like sizes, spacing, etc. are defined in the 
 * DEFAULT_THEME structure in nextgen-desktop-nav.default-config.ts.
 */
export const nextgenDesktopNavLightConfig = {
    // Main navigation colors
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
        }
    },
    border: {
        color: {
            default: 'transparent',
            hover: 'rgba(255, 255, 255, 0.1)',
            focus: 'rgba(255, 255, 255, 0.2)',
            active: 'rgba(255, 255, 255, 0.3)',
        }
    },
    // Dropdown colors
    dropdown: {
        background: {
            default: '#000000',
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
            }
        },
        border: {
            color: {
                default: 'rgba(255, 255, 255, 0.1)',
                hover: 'rgba(255, 255, 255, 0.2)',
                focus: 'rgba(255, 255, 255, 0.3)',
                active: 'rgba(255, 255, 255, 0.4)',
            }
        },
        descriptionColor: 'text-muted-foreground',
        indicators: {
            arrowColor: '',
            hoverIndicatorColor: 'bg-accent',
        },
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
                }
            }
        }
    }
}
      


