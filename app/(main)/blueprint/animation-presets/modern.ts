import { AnimationPreset } from '../brand-utils';

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