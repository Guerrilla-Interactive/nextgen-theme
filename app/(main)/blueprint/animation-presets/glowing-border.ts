import { AnimationPreset } from '../brand-utils';

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