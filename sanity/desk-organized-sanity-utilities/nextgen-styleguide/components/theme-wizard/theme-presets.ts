/**
 * Theme presets for the Theme Wizard
 * Defines preset themes that can be applied to a designTokens document
 */
import {MoonIcon, SunIcon, DesktopIcon, HeartIcon} from '@sanity/icons'

export interface ThemePreset {
  id: string
  name: string
  description: string
  icon: React.ComponentType
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
  values: Record<string, any>
}

/**
 * Theme presets for quick-start design tokens
 */
export const themePresets: ThemePreset[] = [
  {
    id: 'light-neutral',
    name: 'Light Neutral',
    description: 'Clean, minimalist light theme with neutral colors',
    icon: SunIcon,
    primaryColor: '#3b82f6',
    secondaryColor: '#f97316',
    textColor: '#1e293b',
    backgroundColor: '#ffffff',
    values: {
      // Basic mode values
      advancedMode: false,
      primaryColor: {
        wcagColorPair: {
          background: {
            hex: '#3b82f6',
            alpha: 1
          },
          foreground: {
            hex: '#ffffff',
            alpha: 1
          }
        }
      },
      secondaryColor: {
        wcagColorPair: {
          background: {
            hex: '#f97316',
            alpha: 1
          },
          foreground: {
            hex: '#ffffff',
            alpha: 1
          }
        }
      },
      radius: {
        unit: 'rem',
        value: 0.375
      },
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      }
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Elegant dark theme with high contrast and vibrant accents',
    icon: MoonIcon,
    primaryColor: '#818cf8',
    secondaryColor: '#fb7185',
    textColor: '#f1f5f9',
    backgroundColor: '#0f172a',
    values: {
      // Basic mode values
      advancedMode: false,
      primaryColor: {
        wcagColorPair: {
          background: {
            hex: '#818cf8',
            alpha: 1
          },
          foreground: {
            hex: '#0f172a',
            alpha: 1
          }
        }
      },
      secondaryColor: {
        wcagColorPair: {
          background: {
            hex: '#fb7185',
            alpha: 1
          },
          foreground: {
            hex: '#0f172a',
            alpha: 1
          }
        }
      },
      radius: {
        unit: 'rem',
        value: 0.5
      },
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      }
    }
  },
  {
    id: 'serif-brand',
    name: 'Serif Brand',
    description: 'Professional theme with serif typography and earthy tones',
    icon: DesktopIcon,
    primaryColor: '#10b981',
    secondaryColor: '#8b5cf6',
    textColor: '#1e293b',
    backgroundColor: '#f8fafc',
    values: {
      // Basic mode values
      advancedMode: false,
      primaryColor: {
        wcagColorPair: {
          background: {
            hex: '#10b981',
            alpha: 1
          },
          foreground: {
            hex: '#ffffff',
            alpha: 1
          }
        }
      },
      secondaryColor: {
        wcagColorPair: {
          background: {
            hex: '#8b5cf6',
            alpha: 1
          },
          foreground: {
            hex: '#ffffff',
            alpha: 1
          }
        }
      },
      radius: {
        unit: 'rem',
        value: 0.25
      },
      fontFamily: {
        heading: 'Merriweather, serif',
        body: 'Inter, sans-serif'
      }
    }
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum accessibility with high contrast ratios',
    icon: HeartIcon,
    primaryColor: '#000000',
    secondaryColor: '#2563eb',
    textColor: '#000000',
    backgroundColor: '#ffffff',
    values: {
      // Basic mode values
      advancedMode: false,
      primaryColor: {
        wcagColorPair: {
          background: {
            hex: '#000000',
            alpha: 1
          },
          foreground: {
            hex: '#ffffff',
            alpha: 1
          }
        }
      },
      secondaryColor: {
        wcagColorPair: {
          background: {
            hex: '#2563eb',
            alpha: 1
          },
          foreground: {
            hex: '#ffffff',
            alpha: 1
          }
        }
      },
      radius: {
        unit: 'rem',
        value: 0.25
      },
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      }
    }
  }
] 