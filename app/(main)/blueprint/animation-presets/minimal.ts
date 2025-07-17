import { AnimationPreset } from '../brand-utils';

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