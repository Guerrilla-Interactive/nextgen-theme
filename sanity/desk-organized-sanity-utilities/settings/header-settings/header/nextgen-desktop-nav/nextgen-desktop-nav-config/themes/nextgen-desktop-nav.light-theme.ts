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
        hover: 'var(--accent-bright)',
        focus: 'var(--accent-brighter)',
        active: 'var(--accent)',
    },
    text: {
        color: {
            default: 'var(--foreground)',
            hover: 'var(--accent-foreground)',
            focus: 'var(--accent-foreground)',
            active: 'var(--accent-foreground)',
        }
    },
    border: {
        color: {
            default: 'var(--border)',
            hover: 'var(--ring)',
            focus: 'var(--ring-bright)',
            active: 'var(--ring-darker)',
        }
    },
    // Dropdown colors
    dropdown: {
        background: {
            default: 'var(--card)',
            hover: 'var(--card)',
            focus: 'var(--card)',
            active: 'var(--card)',
        },
        text: {
            color: {
                default: 'var(--card-foreground)',
                hover: 'var(--accent-foreground)',
                focus: 'var(--accent-foreground)',
                active: 'var(--accent-foreground)',
            }
        },
        border: {
            color: {
                default: 'var(--border)',
                hover: 'var(--ring)',
                focus: 'var(--ring-bright)',
                active: 'var(--ring-darker)',
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
                hover: 'var(--accent-bright)',
                focus: 'var(--accent-brighter)',
                active: 'var(--accent)',
            },
            border: {
                color: {
                    default: 'transparent',
                    hover: 'var(--border)',
                    focus: 'var(--ring)',
                    active: 'var(--ring-dark)',
                }
            }
        }
    }
}
      


