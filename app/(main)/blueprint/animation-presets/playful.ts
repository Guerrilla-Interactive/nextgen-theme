import { AnimationPreset } from '../brand-utils';

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