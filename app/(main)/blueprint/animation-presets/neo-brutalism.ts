import { AnimationPreset } from '../brand-utils';

/**
 * Neo-Brutalism Animation Preset
 * Features dramatic shadow effects that simulate button pressing
 * Now with variant-specific animations for enhanced user experience
 */
export const neoBrutalismAnimationPreset: AnimationPreset = {
  name: 'neo-brutalism',
  description: 'Sophisticated tactile button effects with refined shadows that simulate physical interaction, with variant-specific animations',
  
  button: {
    global: {
      transition: 'all 100ms cubic-bezier(0.3, 0.7, 0.4, 1)',
      transformOrigin: 'center center',
      willChange: 'transform, box-shadow'
    },
    // Default variant - Strong shadow press effect
    default: {
      default: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00)',
      },
      hover: {
        duration: '80ms', 
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1.5)',
        transform: {
          scale: '1.01',
          translate: 'translate(-1px, -1px)'
        },
        boxShadow: '5px 5px 0px 0px hsl(0 0% 10.1961% / 1.00)',
      },
      focus: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00), 0 0 0 2px var(--ring)',
      },
      active: {
        duration: '50ms',
        easing: 'ease-out',
        transform: {
          scale: '0.98',
          translate: 'translate(3px, 3px)'
        },
        boxShadow: '1px 1px 0px 0px hsl(0 0% 10.1961% / 1.00)',
      },
      disabled: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        opacity: '0.5',
        transform: {
          scale: '1',
          translate: 'translate(1px, 1px)'
        },
        boxShadow: '2px 2px 0px 0px hsl(0 0% 30% / 0.3)',
      }
    },
    // Destructive variant - Red glow with aggressive press
    destructive: {
      default: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '4px 4px 0px 0px hsl(0 72% 25% / 1.00)',
      },
      hover: {
        duration: '80ms', 
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1.5)',
        transform: {
          scale: '1.02',
          translate: 'translate(-1px, -1px)'
        },
        boxShadow: '5px 5px 0px 0px hsl(0 72% 25% / 1.00), 0 0 8px hsl(0 72% 50% / 0.3)',
        filter: 'brightness(1.05)',
      },
      focus: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '4px 4px 0px 0px hsl(0 72% 25% / 1.00), 0 0 0 2px var(--ring)',
      },
      active: {
        duration: '40ms',
        easing: 'ease-out',
        transform: {
          scale: '0.96',
          translate: 'translate(4px, 4px)'
        },
        boxShadow: '0px 0px 0px 0px hsl(0 72% 25% / 1.00)',
        filter: 'brightness(1.1)',
      },
      disabled: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        opacity: '0.5',
        transform: {
          scale: '1',
          translate: 'translate(1px, 1px)'
        },
        boxShadow: '2px 2px 0px 0px hsl(0 0% 30% / 0.3)',
      }
    },
    // Outline variant - Subtle press with border emphasis
    outline: {
      default: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '2px 2px 0px 0px hsl(0 0% 10.1961% / 0.3)',
      },
      hover: {
        duration: '80ms', 
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1.5)',
        transform: {
          scale: '1.005',
          translate: 'translate(-0.5px, -0.5px)'
        },
        boxShadow: '3px 3px 0px 0px hsl(0 0% 10.1961% / 0.4)',
      },
      focus: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '2px 2px 0px 0px hsl(0 0% 10.1961% / 0.3), 0 0 0 2px var(--ring)',
      },
      active: {
        duration: '50ms',
        easing: 'ease-out',
        transform: {
          scale: '0.99',
          translate: 'translate(1px, 1px)'
        },
        boxShadow: '1px 1px 0px 0px hsl(0 0% 10.1961% / 0.3)',
      },
      disabled: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        opacity: '0.5',
        transform: {
          scale: '1',
          translate: 'translate(0.5px, 0.5px)'
        },
        boxShadow: '1px 1px 0px 0px hsl(0 0% 30% / 0.2)',
      }
    },
    // Secondary variant - Moderate press effect
    secondary: {
      default: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '3px 3px 0px 0px hsl(0 0% 20% / 0.6)',
      },
      hover: {
        duration: '80ms', 
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1.5)',
        transform: {
          scale: '1.008',
          translate: 'translate(-0.5px, -0.5px)'
        },
        boxShadow: '4px 4px 0px 0px hsl(0 0% 20% / 0.7)',
      },
      focus: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '3px 3px 0px 0px hsl(0 0% 20% / 0.6), 0 0 0 2px var(--ring)',
      },
      active: {
        duration: '50ms',
        easing: 'ease-out',
        transform: {
          scale: '0.99',
          translate: 'translate(2px, 2px)'
        },
        boxShadow: '1px 1px 0px 0px hsl(0 0% 20% / 0.6)',
      },
      disabled: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        opacity: '0.5',
        transform: {
          scale: '1',
          translate: 'translate(1px, 1px)'
        },
        boxShadow: '2px 2px 0px 0px hsl(0 0% 30% / 0.3)',
      }
    },
    // Ghost variant - Minimal shadow with subtle feedback
    ghost: {
      default: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: 'none',
      },
      hover: {
        duration: '80ms', 
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1.5)',
        transform: {
          scale: '1.02',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '2px 2px 0px 0px hsl(0 0% 10.1961% / 0.15)',
      },
      focus: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: '0 0 0 2px var(--ring)',
      },
      active: {
        duration: '50ms',
        easing: 'ease-out',
        transform: {
          scale: '0.98',
          translate: 'translate(1px, 1px)'
        },
        boxShadow: '1px 1px 0px 0px hsl(0 0% 10.1961% / 0.1)',
      },
      disabled: {
        duration: '100ms',
        easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        opacity: '0.5',
        transform: {
          scale: '1',
          translate: 'translate(0px, 0px)'
        },
        boxShadow: 'none',
      }
    }
  },
  
  link: {
    global: {
      transition: 'color 150ms ease-out, text-decoration-color 150ms ease-out',
      transformOrigin: 'left center',
      willChange: 'color'
    },
    default: {
      duration: '150ms',
      easing: 'ease-out'
    },
    hover: {
      duration: '120ms',
      easing: 'ease-out',
      opacity: '0.8'
    },
    focus: {
      duration: '120ms',
      easing: 'ease-out',
      boxShadow: '0 0 0 2px var(--ring)',
    },
    active: {
      duration: '80ms',
      easing: 'ease-out',
      opacity: '0.6'
    }
  },

  input: {
    global: {
      transition: 'all 150ms ease-out',
      transformOrigin: 'center center',
      willChange: 'border-color, box-shadow'
    },
    default: {
      duration: '150ms',
      easing: 'ease-out',
      boxShadow: 'var(--shadow-xs)',
    },
    hover: {
      duration: '120ms',
      easing: 'ease-out',
      boxShadow: 'var(--shadow-sm)',
    },
    focus: {
      duration: '120ms',
      easing: 'ease-out',
      boxShadow: 'var(--shadow-md), 0 0 0 2px var(--ring)',
    },
    active: {
      duration: '80ms',
      easing: 'ease-out',
      boxShadow: 'var(--shadow-sm)',
    }
  },

  keyframes: {
    'neo-brutal-press': `
      @keyframes neo-brutal-press {
        0% { transform: translateY(0px) scale(1); box-shadow: var(--shadow); }
        100% { transform: translateY(1px) scale(0.995); box-shadow: 2px 2px 0px 0px hsl(0 0% 10.1961% / 1.00); }
      }
    `,
    'neo-brutal-hover': `
      @keyframes neo-brutal-hover {
        0% { transform: translateY(0px) scale(1); box-shadow: var(--shadow); }
        100% { transform: translateY(-0.5px) scale(1.005); box-shadow: var(--shadow-md); }
      }
    `
  },

  globalClasses: {
    'neo-brutal-interactive': `
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    `,
    'neo-brutal-press-effect': `
      animation: neo-brutal-press 80ms ease-out;
    `,
    'neo-brutal-hover-effect': `
      animation: neo-brutal-hover 120ms ease-out;
    `
  }
}; 