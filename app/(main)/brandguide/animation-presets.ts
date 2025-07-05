/**
 * Animation presets for different theme styles
 */
import { AnimationPreset } from './brand-utils';

/**
 * Neo-Brutalism Animation Preset
 * Features dramatic shadow effects that simulate button pressing
 */
export const neoBrutalismAnimationPreset: AnimationPreset = {
  name: 'neo-brutalism',
  description: 'Sophisticated tactile button effects with refined shadows that simulate physical interaction',
  
  button: {
    global: {
      transition: 'all 100ms cubic-bezier(0.3, 0.7, 0.4, 1)',
      transformOrigin: 'center center',
      willChange: 'transform, box-shadow'
    },
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
        scale: '1',
        translate: 'translate(0px, 0px)'
      },
      boxShadow: '4px 4px 0px 0px hsl(0 0% 10.1961% / 1.00)',
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
        scale: '1',
        translate: 'translate(2px, 2px)'
      },
      boxShadow: '2px 2px 0px 0px hsl(0 0% 10.1961% / 1.00)',
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

/**
 * Modern/Subtle Animation Preset
 * Features smooth, refined animations with minimal movement
 */
export const modernAnimationPreset: AnimationPreset = {
  name: 'modern',
  description: 'Very subtle, refined animations with minimal transitions',
  
  button: {
    global: {
      transition: 'all 180ms ease-out',
      transformOrigin: 'center center',
      willChange: 'opacity, background-color'
    },
    default: {
      duration: '180ms',
      easing: 'ease-out',
      opacity: '1'
    },
    hover: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.9'
    },
    focus: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.95',
      boxShadow: '0 0 0 2px var(--ring)',
    },
    active: {
      duration: '100ms',
      easing: 'ease-out',
      opacity: '0.8'
    },
    disabled: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.5'
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
      opacity: '0.75'
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
      easing: 'ease-out'
    },
    hover: {
      duration: '120ms',
      easing: 'ease-out'
    },
    focus: {
      duration: '120ms',
      easing: 'ease-out',
      boxShadow: '0 0 0 2px var(--ring)',
    },
    active: {
      duration: '80ms',
      easing: 'ease-out'
    }
  },

  keyframes: {
    'modern-fade-in': `
      @keyframes modern-fade-in {
        0% { opacity: 0; transform: translateY(2px); }
        100% { opacity: 1; transform: translateY(0px); }
      }
    `,
    'modern-scale-in': `
      @keyframes modern-scale-in {
        0% { opacity: 0; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1); }
      }
    `
  },

  globalClasses: {
    'modern-interactive': `
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    `,
    'modern-fade-in': `
      animation: modern-fade-in 250ms ease-out;
    `,
    'modern-scale-in': `
      animation: modern-scale-in 200ms ease-out;
    `
  }
};

/**
 * Playful Animation Preset
 * Features bouncy, energetic animations with elastic easing
 */
export const playfulAnimationPreset: AnimationPreset = {
  name: 'playful',
  description: 'Subtle but energetic animations with light spring effects',
  
  button: {
    global: {
      transition: 'all 200ms ease-out',
      transformOrigin: 'center center',
      willChange: 'transform, opacity'
    },
    default: {
      duration: '200ms',
      easing: 'ease-out',
      transform: {
        scale: '1'
      }
    },
    hover: {
      duration: '150ms',
      easing: 'ease-out',
      transform: {
        scale: '1.02'
      },
      opacity: '0.9'
    },
    focus: {
      duration: '150ms',
      easing: 'ease-out',
      transform: {
        scale: '1.01'
      },
      boxShadow: '0 0 0 3px var(--ring)',
    },
    active: {
      duration: '100ms',
      easing: 'ease-out',
      transform: {
        scale: '0.98'
      },
      opacity: '0.8'
    },
    disabled: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.5',
      transform: {
        scale: '1'
      }
    }
  },
  
  link: {
    global: {
      transition: 'all 150ms ease-out',
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
      opacity: '0.75'
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
      transition: 'all 180ms ease-out',
      transformOrigin: 'center center',
      willChange: 'border-color, box-shadow'
    },
    default: {
      duration: '180ms',
      easing: 'ease-out'
    },
    hover: {
      duration: '150ms',
      easing: 'ease-out',
      transform: {
        scale: '1.005'
      }
    },
    focus: {
      duration: '150ms',
      easing: 'ease-out',
      transform: {
        scale: '1.01'
      },
      boxShadow: '0 0 0 3px var(--ring)',
    },
    active: {
      duration: '100ms',
      easing: 'ease-out',
      transform: {
        scale: '0.995'
      }
    }
  },

  keyframes: {
    'playful-bounce': `
      @keyframes playful-bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
    `,
    'playful-wiggle': `
      @keyframes playful-wiggle {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(0.5deg); }
        75% { transform: rotate(-0.5deg); }
        100% { transform: rotate(0deg); }
      }
    `
  },

  globalClasses: {
    'playful-interactive': `
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    `,
    'playful-bounce': `
      animation: playful-bounce 300ms ease-out;
    `,
    'playful-wiggle': `
      animation: playful-wiggle 150ms ease-in-out;
    `
  }
};

/**
 * Minimal Animation Preset
 * Ultra-subtle animations for clean, professional interfaces
 */
export const minimalAnimationPreset: AnimationPreset = {
  name: 'minimal',
  description: 'Ultra-subtle animations for clean, professional interfaces with barely perceptible feedback',
  
  button: {
    global: {
      transition: 'all 150ms ease-out',
      transformOrigin: 'center center',
      willChange: 'opacity, transform'
    },
    default: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '1'
    },
    hover: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.85'
    },
    focus: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.9',
      boxShadow: '0 0 0 2px var(--ring)',
    },
    active: {
      duration: '100ms',
      easing: 'ease-out',
      opacity: '0.7'
    },
    disabled: {
      duration: '150ms',
      easing: 'ease-out',
      opacity: '0.5'
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
      duration: '100ms',
      easing: 'ease-out',
      custom: {
        'text-decoration-color': 'currentColor'
      }
    },
    focus: {
      duration: '100ms',
      easing: 'ease-out',
      boxShadow: '0 0 0 1px var(--ring)',
    },
    active: {
      duration: '50ms',
      easing: 'ease-out',
      opacity: '0.8'
    }
  },

  input: {
    global: {
      transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
      transformOrigin: 'center center',
      willChange: 'border-color, box-shadow'
    },
    default: {
      duration: '150ms',
      easing: 'ease-out'
    },
    hover: {
      duration: '150ms',
      easing: 'ease-out',
      custom: {
        'border-color': 'var(--border)'
      }
    },
    focus: {
      duration: '150ms',
      easing: 'ease-out',
      boxShadow: '0 0 0 1px var(--ring)',
    },
    active: {
      duration: '100ms',
      easing: 'ease-out'
    }
  }
};

/**
 * Glowing Border Animation Preset
 * Features dynamic glowing border effects with animated color shifts and living light
 */
export const glowingBorderAnimationPreset: AnimationPreset = {
  name: 'glowing-border',
  description: 'Dynamic animated glowing border effects with living light, color shifts, and fluid motion',
  
  button: {
    global: {
      transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 200ms ease-out',
      transformOrigin: 'center center',
      willChange: 'border-color, box-shadow, opacity'
    },
    default: {
      duration: '300ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid var(--border)',
      boxShadow: 'none',
      opacity: '1',
      custom: {
        'animation': 'none'
      }
    },
    hover: {
      duration: '200ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid color-mix(in srgb, var(--primary) 60%, transparent)',
      boxShadow: `
        0 0 0 1px color-mix(in srgb, var(--primary) 30%, transparent),
        0 0 8px color-mix(in srgb, var(--primary) 20%, transparent),
        0 0 16px color-mix(in srgb, var(--primary) 10%, transparent)
      `,
      filter: 'brightness(1.05) saturate(1.1)',
      custom: {
        animation: 'glow-pulse-hover 2.5s ease-in-out infinite'
      }
    },
    focus: {
      duration: '150ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid color-mix(in srgb, var(--primary) 70%, transparent)',
      boxShadow: `
        0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent),
        0 0 12px color-mix(in srgb, var(--primary) 30%, transparent),
        0 0 24px color-mix(in srgb, var(--primary) 15%, transparent),
        inset 0 0 8px color-mix(in srgb, var(--primary) 10%, transparent)
      `,
      filter: 'brightness(1.1) saturate(1.2)',
      custom: {
        animation: 'glow-pulse-focus 2s ease-in-out infinite'
      }
    },
    active: {
      duration: '100ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid color-mix(in srgb, var(--primary) 80%, transparent)',
      boxShadow: `
        0 0 0 2px color-mix(in srgb, var(--primary) 50%, transparent),
        0 0 8px color-mix(in srgb, var(--primary) 30%, transparent),
        0 0 16px color-mix(in srgb, var(--primary) 20%, transparent)
      `,
      filter: 'brightness(1.15) saturate(1.3)',
      custom: {
        animation: 'glow-flash 0.3s ease-out'
      }
    },
    disabled: {
      duration: '200ms',
      easing: 'ease-out',
      opacity: '0.5',
      border: '1px solid var(--border)',
      boxShadow: 'none',
      filter: 'grayscale(0.5)'
    }
  },
  
  link: {
    global: {
      transition: 'all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformOrigin: 'left center',
      willChange: 'color, text-shadow'
    },
    default: {
      duration: '250ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    hover: {
      duration: '250ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      custom: {
        color: 'color-mix(in srgb, var(--primary) 90%, var(--foreground))',
        'text-shadow': `
          0 0 4px color-mix(in srgb, var(--primary) 40%, transparent),
          0 0 8px color-mix(in srgb, var(--primary) 20%, transparent)
        `,
        animation: 'glow-text-pulse 2s ease-in-out infinite'
      }
    },
    focus: {
      duration: '200ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      custom: {
        color: 'var(--primary)',
        'text-shadow': `
          0 0 6px color-mix(in srgb, var(--primary) 60%, transparent),
          0 0 12px color-mix(in srgb, var(--primary) 30%, transparent),
          0 0 18px color-mix(in srgb, var(--primary) 15%, transparent)
        `,
        'outline': '2px solid color-mix(in srgb, var(--primary) 50%, transparent)',
        'outline-offset': '2px',
        animation: 'glow-text-focus 1.8s ease-in-out infinite'
      }
    },
    active: {
      duration: '100ms',
      easing: 'ease-out',
      custom: {
        color: 'color-mix(in srgb, var(--primary) 80%, var(--foreground))',
        'text-shadow': `
          0 0 12px color-mix(in srgb, var(--primary) 90%, transparent),
          0 0 24px color-mix(in srgb, var(--primary) 60%, transparent),
          0 0 36px color-mix(in srgb, var(--primary) 30%, transparent)
        `,
        animation: 'glow-text-flash 0.2s ease-out'
      }
    },
    disabled: {
      duration: '200ms',
      easing: 'ease-out',
      opacity: '0.5',
      custom: {
        'text-shadow': 'none',
        color: 'var(--muted-foreground)'
      }
    }
  },

  input: {
    global: {
      transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 200ms ease-out',
      transformOrigin: 'center center',
      willChange: 'border-color, box-shadow'
    },
    default: {
      duration: '300ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid var(--border)',
      boxShadow: 'none'
    },
    hover: {
      duration: '300ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid color-mix(in srgb, var(--primary) 40%, var(--border))',
      boxShadow: `
        0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent),
        0 0 4px color-mix(in srgb, var(--primary) 15%, transparent)
      `,
      custom: {
        animation: 'glow-input-hover 2.5s ease-in-out infinite'
      }
    },
    focus: {
      duration: '250ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid color-mix(in srgb, var(--primary) 60%, transparent)',
      boxShadow: `
        0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent),
        0 0 8px color-mix(in srgb, var(--primary) 25%, transparent),
        inset 0 0 4px color-mix(in srgb, var(--primary) 10%, transparent)
      `,
      custom: {
        animation: 'glow-input-focus 2s ease-in-out infinite'
      }
    },
    active: {
      duration: '150ms',
      easing: 'ease-out',
      border: '1px solid color-mix(in srgb, var(--primary) 70%, transparent)',
      boxShadow: `
        0 0 0 1px color-mix(in srgb, var(--primary) 50%, transparent),
        0 0 4px color-mix(in srgb, var(--primary) 30%, transparent)
      `,
      custom: {
        animation: 'glow-input-typing 1.5s ease-in-out infinite'
      }
    },
    disabled: {
      duration: '200ms',
      easing: 'ease-out',
      opacity: '0.5',
      border: '1px solid var(--border)',
      boxShadow: 'none',
      filter: 'grayscale(0.8)'
    }
  },

  keyframes: {
    'glow-pulse-hover': `
      @keyframes glow-pulse-hover {
        0% { 
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 20%, transparent),
            0 0 16px color-mix(in srgb, var(--primary) 10%, transparent);
        }
        50% { 
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 50%, transparent),
            0 0 20px color-mix(in srgb, var(--primary) 35%, transparent),
            0 0 32px color-mix(in srgb, var(--primary) 20%, transparent),
            0 0 48px color-mix(in srgb, var(--primary) 10%, transparent);
        }
        100% { 
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 20%, transparent),
            0 0 16px color-mix(in srgb, var(--primary) 10%, transparent);
        }
      }
    `,
    'glow-pulse-focus': `
      @keyframes glow-pulse-focus {
        0% { 
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 15%, transparent),
            inset 0 0 8px color-mix(in srgb, var(--primary) 10%, transparent);
        }
        50% { 
          box-shadow: 
            0 0 0 3px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 45%, transparent),
            0 0 40px color-mix(in srgb, var(--primary) 25%, transparent),
            0 0 64px color-mix(in srgb, var(--primary) 15%, transparent),
            inset 0 0 16px color-mix(in srgb, var(--primary) 20%, transparent);
        }
        100% { 
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 15%, transparent),
            inset 0 0 8px color-mix(in srgb, var(--primary) 10%, transparent);
        }
      }
    `,
    'glow-shimmer-sweep': `
      @keyframes glow-shimmer-sweep {
        0% {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 30%,
            var(--primary/15) 50%,
            transparent 70%,
            transparent 100%
          );
          background-position: -100% center;
          background-size: 200% 100%;
        }
        50% {
          background-position: 100% center;
        }
        100% {
          background-position: 200% center;
        }
      }
    `,
    'glow-ripple-continuous': `
      @keyframes glow-ripple-continuous {
        0% {
          box-shadow: 
            0 0 0 0px var(--primary/40),
            0 0 0 0px var(--primary/20),
            0 0 0 0px var(--primary/10);
        }
        30% {
          box-shadow: 
            0 0 0 8px var(--primary/20),
            0 0 0 16px var(--primary/10),
            0 0 0 24px var(--primary/5);
        }
        60% {
          box-shadow: 
            0 0 0 16px var(--primary/10),
            0 0 0 32px var(--primary/5),
            0 0 0 48px transparent;
        }
        100% {
          box-shadow: 
            0 0 0 24px transparent,
            0 0 0 48px transparent,
            0 0 0 72px transparent;
        }
      }
    `,
    'glow-flash': `
      @keyframes glow-flash {
        0% {
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 6px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 30%, transparent);
        }
        50% {
          box-shadow: 
            0 0 0 4px color-mix(in srgb, var(--primary) 80%, transparent),
            0 0 16px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 32px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 48px color-mix(in srgb, var(--primary) 20%, transparent);
        }
        100% {
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 50%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 16px color-mix(in srgb, var(--primary) 20%, transparent);
        }
      }
    `,
    'glow-text-pulse': `
      @keyframes glow-text-pulse {
        0% {
          text-shadow: 
            0 0 4px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 20%, transparent);
        }
        50% {
          text-shadow: 
            0 0 8px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 16px color-mix(in srgb, var(--primary) 35%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 15%, transparent);
        }
        100% {
          text-shadow: 
            0 0 4px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 20%, transparent);
        }
      }
    `,
    'glow-text-wave': `
      @keyframes glow-text-wave {
        0% {
          text-shadow: 
            0 0 6px var(--primary/50),
            0 0 12px var(--primary/25);
        }
        25% {
          text-shadow: 
            0 0 8px var(--primary/60),
            0 0 16px var(--primary/30),
            2px 0 12px var(--primary/20);
        }
        50% {
          text-shadow: 
            0 0 10px var(--primary/70),
            0 0 20px var(--primary/35),
            0 2px 16px var(--primary/25);
        }
        75% {
          text-shadow: 
            0 0 8px var(--primary/60),
            0 0 16px var(--primary/30),
            -2px 0 12px var(--primary/20);
        }
        100% {
          text-shadow: 
            0 0 6px var(--primary/50),
            0 0 12px var(--primary/25);
        }
      }
    `,
    'glow-text-focus': `
      @keyframes glow-text-focus {
        0% {
          text-shadow: 
            0 0 6px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 18px color-mix(in srgb, var(--primary) 15%, transparent);
        }
        50% {
          text-shadow: 
            0 0 12px color-mix(in srgb, var(--primary) 80%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 50%, transparent),
            0 0 36px color-mix(in srgb, var(--primary) 25%, transparent),
            0 0 48px color-mix(in srgb, var(--primary) 10%, transparent);
        }
        100% {
          text-shadow: 
            0 0 6px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 18px color-mix(in srgb, var(--primary) 15%, transparent);
        }
      }
    `,
    'glow-text-flash': `
      @keyframes glow-text-flash {
        0% {
          text-shadow: 
            0 0 4px color-mix(in srgb, var(--primary) 70%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 40%, transparent);
        }
        100% {
          text-shadow: 
            0 0 12px color-mix(in srgb, var(--primary) 90%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 36px color-mix(in srgb, var(--primary) 30%, transparent);
        }
      }
    `,
    'glow-input-hover': `
      @keyframes glow-input-hover {
        0% {
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent),
            0 0 4px color-mix(in srgb, var(--primary) 15%, transparent);
        }
        50% {
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 35%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 25%, transparent),
            0 0 20px color-mix(in srgb, var(--primary) 10%, transparent);
        }
        100% {
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent),
            0 0 4px color-mix(in srgb, var(--primary) 15%, transparent);
        }
      }
    `,
    'glow-input-focus': `
      @keyframes glow-input-focus {
        0% {
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 25%, transparent),
            inset 0 0 4px color-mix(in srgb, var(--primary) 10%, transparent);
        }
        50% {
          box-shadow: 
            0 0 0 3px color-mix(in srgb, var(--primary) 60%, transparent),
            0 0 16px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 24px color-mix(in srgb, var(--primary) 20%, transparent),
            inset 0 0 8px color-mix(in srgb, var(--primary) 15%, transparent);
        }
        100% {
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 25%, transparent),
            inset 0 0 4px color-mix(in srgb, var(--primary) 10%, transparent);
        }
      }
    `,
    'glow-input-typing': `
      @keyframes glow-input-typing {
        0% {
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 50%, transparent),
            0 0 4px color-mix(in srgb, var(--primary) 30%, transparent);
        }
        50% {
          box-shadow: 
            0 0 0 2px color-mix(in srgb, var(--primary) 70%, transparent),
            0 0 8px color-mix(in srgb, var(--primary) 45%, transparent),
            0 0 12px color-mix(in srgb, var(--primary) 20%, transparent);
        }
        100% {
          box-shadow: 
            0 0 0 1px color-mix(in srgb, var(--primary) 50%, transparent),
            0 0 4px color-mix(in srgb, var(--primary) 30%, transparent);
        }
      }
    `,
    'glow-breathe-ambient': `
      @keyframes glow-breathe-ambient {
        0%, 100% {
          box-shadow: 
            0 0 0 1px var(--primary/15),
            0 0 8px var(--primary/10),
            0 0 16px var(--primary/5);
          filter: brightness(1) saturate(1);
        }
        50% {
          box-shadow: 
            0 0 0 2px var(--primary/25),
            0 0 16px var(--primary/20),
            0 0 32px var(--primary/10),
            0 0 48px var(--primary/5);
          filter: brightness(1.05) saturate(1.1);
        }
      }
    `,
    'glow-orbit': `
      @keyframes glow-orbit {
        0% {
          background: radial-gradient(
            circle at 0% 50%,
            var(--primary/20) 0%,
            transparent 50%
          );
        }
        25% {
          background: radial-gradient(
            circle at 50% 0%,
            var(--primary/20) 0%,
            transparent 50%
          );
        }
        50% {
          background: radial-gradient(
            circle at 100% 50%,
            var(--primary/20) 0%,
            transparent 50%
          );
        }
        75% {
          background: radial-gradient(
            circle at 50% 100%,
            var(--primary/20) 0%,
            transparent 50%
          );
        }
        100% {
          background: radial-gradient(
            circle at 0% 50%,
            var(--primary/20) 0%,
            transparent 50%
          );
        }
      }
    `
  },

  globalClasses: {
    'glow-interactive': `
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    `,
    'glow-ambient': `
      animation: glow-breathe-ambient 4s ease-in-out infinite;
    `,
    'glow-orbit-effect': `
      position: relative;
      overflow: hidden;
      animation: glow-orbit 6s linear infinite;
    `,
    'glow-enhanced': `
      filter: drop-shadow(0 0 8px var(--primary/25));
    `,
    'glow-alive': `
      position: relative;
      background: linear-gradient(
        45deg,
        transparent 30%,
        var(--primary/5) 50%,
        transparent 70%
      );
      background-size: 200% 200%;
      animation: glow-shimmer-sweep 4s ease-in-out infinite;
    `,
    'glow-particle-effect': `
      position: relative;
      overflow: hidden;
      background: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        var(--primary/15) 0%,
        transparent 40%
      );
    `,
    'glow-reactive': `
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      background: linear-gradient(
        135deg,
        transparent 0%,
        var(--primary/8) 25%,
        var(--primary/12) 50%,
        var(--primary/8) 75%,
        transparent 100%
      );
      background-size: 300% 300%;
      animation: glow-shimmer-sweep 5s ease-in-out infinite alternate;
    `
  }
};

/**
 * Available animation presets
 */
export const animationPresets = {
  'neo-brutalism': neoBrutalismAnimationPreset,
  'modern': modernAnimationPreset,
  'playful': playfulAnimationPreset,
  'minimal': minimalAnimationPreset,
  'glowing-border': glowingBorderAnimationPreset
} as const;

export type AnimationPresetName = keyof typeof animationPresets; 