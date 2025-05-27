/**
 * Theme presets for the Theme Wizard
 * Defines preset themes that can be applied to a designTokens document
 */
import React from 'react'

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

// Simple component implementations - no JSX/SVG
const SunIcon = () => React.createElement('div', null, '☀️');
const MoonIcon = () => React.createElement('div', null, '🌙');
const DesktopIcon = () => React.createElement('div', null, '💻');
const HeartIcon = () => React.createElement('div', null, '❤️');
const BuildingIcon = () => React.createElement('div', null, '🏙️');

/**
 * Generate a random key for array items
 * This is crucial for Sanity arrays to ensure items can be properly tracked
 */
function generateKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Generate color shades for palette based on a base color
 * This is a simple algorithm for demo purposes
 */
function generateShades(baseColor: string): Array<{name: string, value: {hex: string, alpha: number}, _key: string}> {
  // Convert hex to RGB
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);
  
  // Generate shades by adjusting lightness
  const shades = [
    { name: '50', factor: 0.9 },   // Lightest
    { name: '100', factor: 0.8 },
    { name: '200', factor: 0.6 },
    { name: '300', factor: 0.4 },
    { name: '400', factor: 0.2 },
    { name: '500', factor: 0 },    // Base color
    { name: '600', factor: -0.15 },
    { name: '700', factor: -0.3 },
    { name: '800', factor: -0.45 },
    { name: '900', factor: -0.6 },
    { name: '950', factor: -0.75 } // Darkest
  ];
  
  return shades.map(shade => {
    const factor = shade.factor;
    let newR, newG, newB;
    
    if (factor > 0) {
      // Lighten
      newR = Math.min(255, r + (255 - r) * factor);
      newG = Math.min(255, g + (255 - g) * factor);
      newB = Math.min(255, b + (255 - b) * factor);
    } else {
      // Darken
      newR = Math.max(0, r * (1 + factor));
      newG = Math.max(0, g * (1 + factor));
      newB = Math.max(0, b * (1 + factor));
    }
    
    // Convert back to hex
    const hex = '#' + 
      Math.round(newR).toString(16).padStart(2, '0') + 
      Math.round(newG).toString(16).padStart(2, '0') + 
      Math.round(newB).toString(16).padStart(2, '0');
    
    return {
      _key: generateKey(),
      name: shade.name,
      value: {
        hex,
        alpha: 1
      }
    };
  });
}

/**
 * Generate a standard typography scale
 */
function generateTypographyScale() {
  return [
    {
      _key: generateKey(),
      name: 'xs',
      slug: { _type: 'slug', current: 'xs' },
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    {
      _key: generateKey(),
      name: 'sm',
      slug: { _type: 'slug', current: 'sm' },
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    {
      _key: generateKey(),
      name: 'base',
      slug: { _type: 'slug', current: 'base' },
      fontSize: '1rem',
      lineHeight: '1.5rem'
    },
    {
      _key: generateKey(),
      name: 'lg',
      slug: { _type: 'slug', current: 'lg' },
      fontSize: '1.125rem',
      lineHeight: '1.75rem'
    },
    {
      _key: generateKey(),
      name: 'xl',
      slug: { _type: 'slug', current: 'xl' },
      fontSize: '1.25rem',
      lineHeight: '1.75rem'
    },
    {
      _key: generateKey(),
      name: '2xl',
      slug: { _type: 'slug', current: '2xl' },
      fontSize: '1.5rem',
      lineHeight: '2rem'
    },
    {
      _key: generateKey(),
      name: '3xl',
      slug: { _type: 'slug', current: '3xl' },
      fontSize: '1.875rem',
      lineHeight: '2.25rem'
    },
    {
      _key: generateKey(),
      name: '4xl',
      slug: { _type: 'slug', current: '4xl' },
      fontSize: '2.25rem',
      lineHeight: '2.5rem'
    },
    {
      _key: generateKey(),
      name: '5xl',
      slug: { _type: 'slug', current: '5xl' },
      fontSize: '3rem',
      lineHeight: '1'
    },
    {
      _key: generateKey(),
      name: '6xl',
      slug: { _type: 'slug', current: '6xl' },
      fontSize: '3.75rem',
      lineHeight: '1'
    }
  ];
}

/**
 * Generate Aker Brygge typography scale
 */
function generateAkerBryggeTypographyScale() {
  return [
    {
      _key: generateKey(),
      name: 'h1',
      slug: { _type: 'slug', current: 'h1' },
      fontSize: '75px',
      lineHeight: '125%',
      fontWeight: 300,
      fontFamily: "'Aker Brygge Display', serif"
    },
    {
      _key: generateKey(),
      name: 'h2',
      slug: { _type: 'slug', current: 'h2' },
      fontSize: '48px',
      lineHeight: '120%',
      fontWeight: 300,
      fontFamily: "'Aker Brygge Display', serif"
    },
    {
      _key: generateKey(),
      name: 'h3',
      slug: { _type: 'slug', current: 'h3' },
      fontSize: '36px',
      lineHeight: '120%',
      fontWeight: 300,
      fontFamily: "'Aker Brygge Display', serif"
    },
    {
      _key: generateKey(),
      name: 'h4',
      slug: { _type: 'slug', current: 'h4' },
      fontSize: '24px',
      lineHeight: '120%',
      fontWeight: 300,
      fontFamily: "'Aker Brygge Display', serif"
    },
    {
      _key: generateKey(),
      name: 'subtitle-1',
      slug: { _type: 'slug', current: 'subtitle-1' },
      fontSize: '16px',
      lineHeight: '140%',
      fontWeight: 600,
      fontFamily: "'Studio Pro', sans-serif"
    },
    {
      _key: generateKey(),
      name: 'subtitle-2',
      slug: { _type: 'slug', current: 'subtitle-2' },
      fontSize: '14px',
      lineHeight: '140%',
      fontWeight: 600,
      fontFamily: "'Studio Pro', sans-serif"
    },
    {
      _key: generateKey(),
      name: 'body-1',
      slug: { _type: 'slug', current: 'body-1' },
      fontSize: '16px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: "'Studio Pro', sans-serif"
    },
    {
      _key: generateKey(),
      name: 'body-2',
      slug: { _type: 'slug', current: 'body-2' },
      fontSize: '14px',
      lineHeight: '160%',
      fontWeight: 400,
      fontFamily: "'Studio Pro', sans-serif"
    }
  ];
}

/**
 * Generate a standard spacing scale
 */
function generateSpacingScale() {
  return [
    { _key: generateKey(), name: '0', slug: { _type: 'slug', current: '0' }, value: '0px' },
    { _key: generateKey(), name: 'px', slug: { _type: 'slug', current: 'px' }, value: '1px' },
    { _key: generateKey(), name: '0.5', slug: { _type: 'slug', current: '0.5' }, value: '0.125rem' },
    { _key: generateKey(), name: '1', slug: { _type: 'slug', current: '1' }, value: '0.25rem' },
    { _key: generateKey(), name: '1.5', slug: { _type: 'slug', current: '1.5' }, value: '0.375rem' },
    { _key: generateKey(), name: '2', slug: { _type: 'slug', current: '2' }, value: '0.5rem' },
    { _key: generateKey(), name: '2.5', slug: { _type: 'slug', current: '2.5' }, value: '0.625rem' },
    { _key: generateKey(), name: '3', slug: { _type: 'slug', current: '3' }, value: '0.75rem' },
    { _key: generateKey(), name: '3.5', slug: { _type: 'slug', current: '3.5' }, value: '0.875rem' },
    { _key: generateKey(), name: '4', slug: { _type: 'slug', current: '4' }, value: '1rem' },
    { _key: generateKey(), name: '5', slug: { _type: 'slug', current: '5' }, value: '1.25rem' },
    { _key: generateKey(), name: '6', slug: { _type: 'slug', current: '6' }, value: '1.5rem' },
    { _key: generateKey(), name: '8', slug: { _type: 'slug', current: '8' }, value: '2rem' },
    { _key: generateKey(), name: '10', slug: { _type: 'slug', current: '10' }, value: '2.5rem' },
    { _key: generateKey(), name: '12', slug: { _type: 'slug', current: '12' }, value: '3rem' },
    { _key: generateKey(), name: '16', slug: { _type: 'slug', current: '16' }, value: '4rem' },
    { _key: generateKey(), name: '20', slug: { _type: 'slug', current: '20' }, value: '5rem' },
    { _key: generateKey(), name: '24', slug: { _type: 'slug', current: '24' }, value: '6rem' },
    { _key: generateKey(), name: '32', slug: { _type: 'slug', current: '32' }, value: '8rem' }
  ];
}

/**
 * Generate component overrides
 */
function generateComponentOverrides(primaryColor: string, borderRadius: any) {
  return [
    {
      _key: generateKey(),
      component: 'button',
      slug: { _type: 'slug', current: 'button' },
      radiusOverride: borderRadius
    },
    {
      _key: generateKey(),
      component: 'card',
      slug: { _type: 'slug', current: 'card' },
      radiusOverride: {
        ...borderRadius,
        value: borderRadius.value * 2 // Double the border radius for cards
      }
    },
    {
      _key: generateKey(),
      component: 'input',
      slug: { _type: 'slug', current: 'input' },
      radiusOverride: borderRadius
    }
  ];
}

/**
 * Theme presets for quick-start design tokens
 */
export const themePresets: ThemePreset[] = [
  {
    id: 'aker-brygge',
    name: 'Aker Brygge',
    description: 'Contemporary Norwegian design with dual font system for different target groups',
    icon: BuildingIcon,
    primaryColor: '#3A66F8',
    secondaryColor: '#DB5526',
    textColor: '#000000',
    backgroundColor: '#EFE3D3',
    values: {
      // Legacy fields kept for backward compatibility
      primaryColor: {
        colorPair: {
          title: 'Primary Blue',
          background: {
            hex: '#3A66F8',
            alpha: 1
          },
          foreground: {
            hex: '#FFFFFF',
            alpha: 1
          }
        }
      },
      secondaryColor: {
        colorPair: {
          title: 'Secondary Orange',
          background: {
            hex: '#DB5526',
            alpha: 1
          },
          foreground: {
            hex: '#FFFFFF',
            alpha: 1
          }
        }
      },
      // New array-based color fields for main colors - correct structure
      primaryColors: [
        {
          _key: generateKey(),
          colorName: 'Sand',
          colorPair: {
            title: 'Sand',
            background: {
              hex: '#EFE3D3',
              alpha: 1
            },
            foreground: {
              hex: '#000000',
              alpha: 1
            }
          }
        },
        {
          _key: generateKey(),
          colorName: 'Blå',
          colorPair: {
            title: 'Blå',
            background: {
              hex: '#3A66F8',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          }
        }
      ],
      secondaryColors: [
        {
          _key: generateKey(),
          colorName: 'Oransje',
          colorPair: {
            title: 'Oransje',
            background: {
              hex: '#DB5526',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          }
        },
        {
          _key: generateKey(),
          colorName: 'Gul',
          colorPair: {
            title: 'Gul',
            background: {
              hex: '#DFBC50',
              alpha: 1
            },
            foreground: {
              hex: '#000000',
              alpha: 1
            }
          }
        }
      ],
      // Border radius - keeping it minimal
      radius: {
        unit: 'px',
        value: 2
      },
      // Custom font settings
      fontFamily: {
        heading: "'Aker Brygge Display', serif",
        body: "'Studio Pro', sans-serif"
      },
      // Advanced fields for Aker Brygge
      colorPalette: [
        {
          _key: generateKey(),
          name: 'Sand',
          slug: { _type: 'slug', current: 'sand' },
          colorPair: {
            title: 'Sand',
            background: {
              hex: '#EFE3D3',
              alpha: 1
            },
            foreground: {
              hex: '#000000',
              alpha: 1
            }
          },
          shades: generateShades('#EFE3D3')
        },
        {
          _key: generateKey(),
          name: 'Sort',
          slug: { _type: 'slug', current: 'sort' },
          colorPair: {
            title: 'Sort',
            background: {
              hex: '#000000',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          },
          shades: [
            { _key: generateKey(), name: '950', value: { hex: '#000000', alpha: 1 } },
            { _key: generateKey(), name: '900', value: { hex: '#1f1f1f', alpha: 1 } },
            { _key: generateKey(), name: '800', value: { hex: '#383838', alpha: 1 } },
            { _key: generateKey(), name: '700', value: { hex: '#434343', alpha: 1 } },
            { _key: generateKey(), name: '600', value: { hex: '#515151', alpha: 1 } },
            { _key: generateKey(), name: '500', value: { hex: '#666666', alpha: 1 } },
            { _key: generateKey(), name: '400', value: { hex: '#818181', alpha: 1 } },
            { _key: generateKey(), name: '300', value: { hex: '#a4a4a4', alpha: 1 } },
            { _key: generateKey(), name: '200', value: { hex: '#c8c8c8', alpha: 1 } },
            { _key: generateKey(), name: '100', value: { hex: '#e3e3e3', alpha: 1 } },
            { _key: generateKey(), name: '50', value: { hex: '#f7f7f7', alpha: 1 } }
          ]
        },
        {
          _key: generateKey(),
          name: 'Hvit',
          slug: { _type: 'slug', current: 'hvit' },
          colorPair: {
            title: 'Hvit',
            background: {
              hex: '#FFFFFF',
              alpha: 1
            },
            foreground: {
              hex: '#000000',
              alpha: 1
            }
          },
          shades: [
            { _key: generateKey(), name: '50', value: { hex: '#FFFFFF', alpha: 1 } },
            { _key: generateKey(), name: '100', value: { hex: '#FAFAFA', alpha: 1 } },
            { _key: generateKey(), name: '200', value: { hex: '#F5F5F5', alpha: 1 } },
            { _key: generateKey(), name: '300', value: { hex: '#F0F0F0', alpha: 1 } },
            { _key: generateKey(), name: '400', value: { hex: '#EBEBEB', alpha: 1 } },
            { _key: generateKey(), name: '500', value: { hex: '#E5E5E5', alpha: 1 } },
            { _key: generateKey(), name: '600', value: { hex: '#D6D6D6', alpha: 1 } },
            { _key: generateKey(), name: '700', value: { hex: '#C2C2C2', alpha: 1 } },
            { _key: generateKey(), name: '800', value: { hex: '#ADADAD', alpha: 1 } },
            { _key: generateKey(), name: '900', value: { hex: '#8F8F8F', alpha: 1 } },
            { _key: generateKey(), name: '950', value: { hex: '#767676', alpha: 1 } }
          ]
        },
        {
          _key: generateKey(),
          name: 'Blå',
          slug: { _type: 'slug', current: 'bla' },
          colorPair: {
            title: 'Blå',
            background: {
              hex: '#3A66F8',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          },
          shades: generateShades('#3A66F8')
        },
        {
          _key: generateKey(),
          name: 'Oransje',
          slug: { _type: 'slug', current: 'oransje' },
          colorPair: {
            title: 'Oransje',
            background: {
              hex: '#DB5526',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          },
          shades: generateShades('#DB5526')
        },
        {
          _key: generateKey(),
          name: 'Rosa',
          slug: { _type: 'slug', current: 'rosa' },
          colorPair: {
            title: 'Rosa',
            background: {
              hex: '#E94465',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          },
          shades: generateShades('#E94465')
        },
        {
          _key: generateKey(),
          name: 'Lilla',
          slug: { _type: 'slug', current: 'lilla' },
          colorPair: {
            title: 'Lilla',
            background: {
              hex: '#872EEC',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          },
          shades: generateShades('#872EEC')
        },
        {
          _key: generateKey(),
          name: 'Grønn',
          slug: { _type: 'slug', current: 'gronn' },
          colorPair: {
            title: 'Grønn',
            background: {
              hex: '#408F81',
              alpha: 1
            },
            foreground: {
              hex: '#FFFFFF',
              alpha: 1
            }
          },
          shades: generateShades('#408F81')
        },
        {
          _key: generateKey(),
          name: 'Gul',
          slug: { _type: 'slug', current: 'gul' },
          colorPair: {
            title: 'Gul',
            background: {
              hex: '#DFBC50',
              alpha: 1
            },
            foreground: {
              hex: '#000000',
              alpha: 1
            }
          },
          shades: generateShades('#DFBC50')
        }
      ],
      // Custom typography scale for Aker Brygge
      typographyScale: generateAkerBryggeTypographyScale(),
      // Standard spacing scale
      spacingScale: generateSpacingScale(),
      // Component overrides with minimal styling
      componentOverrides: generateComponentOverrides('#3A66F8', { unit: 'px', value: 2 })
    }
  },
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
      // Legacy fields kept for backward compatibility
      primaryColor: {
        colorPair: {
          title: 'Primary Blue',
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
        colorPair: {
          title: 'Secondary Orange',
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
      // New array-based color fields - correct structure
      primaryColors: [
        {
          _key: generateKey(),
          colorName: 'Primary Blue',
          colorPair: {
            title: 'Primary Blue',
            background: {
              hex: '#3b82f6',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      ],
      secondaryColors: [
        {
          _key: generateKey(),
          colorName: 'Secondary Orange',
          colorPair: {
            title: 'Secondary Orange',
            background: {
              hex: '#f97316',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      ],
      // Border radius
      radius: {
        unit: 'rem',
        value: 0.375
      },
      // Font settings
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      },
      // Advanced fields
      colorPalette: [
        {
          _key: generateKey(),
          name: 'Blue',
          slug: { _type: 'slug', current: 'blue' },
          colorPair: {
            title: 'Blue',
            background: {
              hex: '#3b82f6',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#3b82f6')
        },
        {
          _key: generateKey(),
          name: 'Orange',
          slug: { _type: 'slug', current: 'orange' },
          colorPair: {
            title: 'Orange',
            background: {
              hex: '#f97316',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#f97316')
        },
        {
          _key: generateKey(),
          name: 'Gray',
          slug: { _type: 'slug', current: 'gray' },
          colorPair: {
            title: 'Gray',
            background: {
              hex: '#64748b',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#64748b')
        }
      ],
      typographyScale: generateTypographyScale(),
      spacingScale: generateSpacingScale(),
      componentOverrides: generateComponentOverrides('#3b82f6', { unit: 'rem', value: 0.375 })
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
      // Legacy fields kept for backward compatibility
      primaryColor: {
        colorPair: {
          title: 'Primary Indigo',
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
        colorPair: {
          title: 'Secondary Pink',
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
      // New array-based color fields - correct structure
      primaryColors: [
        {
          _key: generateKey(),
          colorName: 'Primary Indigo',
          colorPair: {
            title: 'Primary Indigo',
            background: {
              hex: '#818cf8',
              alpha: 1
            },
            foreground: {
              hex: '#0f172a',
              alpha: 1
            }
          }
        }
      ],
      secondaryColors: [
        {
          _key: generateKey(),
          colorName: 'Secondary Pink',
          colorPair: {
            title: 'Secondary Pink',
            background: {
              hex: '#fb7185',
              alpha: 1
            },
            foreground: {
              hex: '#0f172a',
              alpha: 1
            }
          }
        }
      ],
      radius: {
        unit: 'rem',
        value: 0.5
      },
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      },
      // Advanced fields
      colorPalette: [
        {
          _key: generateKey(),
          name: 'Indigo',
          slug: { _type: 'slug', current: 'indigo' },
          colorPair: {
            title: 'Indigo',
            background: {
              hex: '#818cf8',
              alpha: 1
            },
            foreground: {
              hex: '#0f172a',
              alpha: 1
            }
          },
          shades: generateShades('#818cf8')
        },
        {
          _key: generateKey(),
          name: 'Pink',
          slug: { _type: 'slug', current: 'pink' },
          colorPair: {
            title: 'Pink',
            background: {
              hex: '#fb7185',
              alpha: 1
            },
            foreground: {
              hex: '#0f172a',
              alpha: 1
            }
          },
          shades: generateShades('#fb7185')
        },
        {
          _key: generateKey(),
          name: 'Slate',
          slug: { _type: 'slug', current: 'slate' },
          colorPair: {
            title: 'Slate',
            background: {
              hex: '#64748b',
              alpha: 1
            },
            foreground: {
              hex: '#f1f5f9',
              alpha: 1
            }
          },
          shades: generateShades('#64748b')
        }
      ],
      typographyScale: generateTypographyScale(),
      spacingScale: generateSpacingScale(),
      componentOverrides: generateComponentOverrides('#818cf8', { unit: 'rem', value: 0.5 })
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
      // Legacy fields kept for backward compatibility
      primaryColor: {
        colorPair: {
          title: 'Primary Green',
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
        colorPair: {
          title: 'Secondary Purple',
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
      // New array-based color fields - correct structure
      primaryColors: [
        {
          _key: generateKey(),
          colorName: 'Primary Green',
          colorPair: {
            title: 'Primary Green',
            background: {
              hex: '#10b981',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      ],
      secondaryColors: [
        {
          _key: generateKey(),
          colorName: 'Secondary Purple',
          colorPair: {
            title: 'Secondary Purple',
            background: {
              hex: '#8b5cf6',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      ],
      radius: {
        unit: 'rem',
        value: 0.25
      },
      fontFamily: {
        heading: 'Merriweather, serif',
        body: 'Inter, sans-serif'
      },
      // Advanced fields
      colorPalette: [
        {
          _key: generateKey(),
          name: 'Green',
          slug: { _type: 'slug', current: 'green' },
          colorPair: {
            title: 'Green',
            background: {
              hex: '#10b981',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#10b981')
        },
        {
          _key: generateKey(),
          name: 'Purple',
          slug: { _type: 'slug', current: 'purple' },
          colorPair: {
            title: 'Purple',
            background: {
              hex: '#8b5cf6',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#8b5cf6')
        },
        {
          _key: generateKey(),
          name: 'Beige',
          slug: { _type: 'slug', current: 'beige' },
          colorPair: {
            title: 'Beige',
            background: {
              hex: '#d2c2a9',
              alpha: 1
            },
            foreground: {
              hex: '#1e293b',
              alpha: 1
            }
          },
          shades: generateShades('#d2c2a9')
        }
      ],
      // Custom typography scale with larger text for serif heading
      typographyScale: generateTypographyScale().map(scale => ({
        ...scale, 
        fontSize: scale.name.includes('xl') ? 
          `calc(${scale.fontSize} * 1.1)` : 
          scale.fontSize,
        _key: generateKey()
      })),
      spacingScale: generateSpacingScale(),
      componentOverrides: generateComponentOverrides('#10b981', { unit: 'rem', value: 0.25 })
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
      // Legacy fields kept for backward compatibility
      primaryColor: {
        colorPair: {
          title: 'Primary Black',
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
        colorPair: {
          title: 'Secondary Blue',
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
      // New array-based color fields - correct structure
      primaryColors: [
        {
          _key: generateKey(),
          colorName: 'Primary Black',
          colorPair: {
            title: 'Primary Black',
            background: {
              hex: '#000000',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      ],
      secondaryColors: [
        {
          _key: generateKey(),
          colorName: 'Secondary Blue',
          colorPair: {
            title: 'Secondary Blue',
            background: {
              hex: '#2563eb',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      ],
      radius: {
        unit: 'rem',
        value: 0.25
      },
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      },
      // Advanced fields - high contrast palette
      colorPalette: [
        {
          _key: generateKey(),
          name: 'Black',
          slug: { _type: 'slug', current: 'black' },
          colorPair: {
            title: 'Black',
            background: {
              hex: '#000000',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: [
            { _key: generateKey(), name: '50', value: { hex: '#f7f7f7', alpha: 1 } },
            { _key: generateKey(), name: '100', value: { hex: '#e3e3e3', alpha: 1 } },
            { _key: generateKey(), name: '200', value: { hex: '#c8c8c8', alpha: 1 } },
            { _key: generateKey(), name: '300', value: { hex: '#a4a4a4', alpha: 1 } },
            { _key: generateKey(), name: '400', value: { hex: '#818181', alpha: 1 } },
            { _key: generateKey(), name: '500', value: { hex: '#666666', alpha: 1 } },
            { _key: generateKey(), name: '600', value: { hex: '#515151', alpha: 1 } },
            { _key: generateKey(), name: '700', value: { hex: '#434343', alpha: 1 } },
            { _key: generateKey(), name: '800', value: { hex: '#383838', alpha: 1 } },
            { _key: generateKey(), name: '900', value: { hex: '#1f1f1f', alpha: 1 } },
            { _key: generateKey(), name: '950', value: { hex: '#000000', alpha: 1 } }
          ]
        },
        {
          _key: generateKey(),
          name: 'Blue',
          slug: { _type: 'slug', current: 'blue' },
          colorPair: {
            title: 'Blue',
            background: {
              hex: '#2563eb',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#2563eb')
        },
        {
          _key: generateKey(),
          name: 'Red',
          slug: { _type: 'slug', current: 'red' },
          colorPair: {
            title: 'Red',
            background: {
              hex: '#dc2626',
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          },
          shades: generateShades('#dc2626')
        }
      ],
      // Larger typography for accessibility
      typographyScale: generateTypographyScale().map(scale => ({
        ...scale,
        fontSize: scale.name === 'base' ? '1.125rem' : scale.fontSize,
        lineHeight: scale.name === 'base' ? '1.75rem' : scale.lineHeight,
        _key: generateKey()
      })),
      spacingScale: generateSpacingScale(),
      // Component overrides for high contrast
      componentOverrides: [
        {
          component: 'button',
          slug: { _type: 'slug', current: 'button' },
          radiusOverride: { unit: 'rem', value: 0.25 },
          _key: generateKey()
        },
        {
          component: 'input',
          slug: { _type: 'slug', current: 'input' },
          radiusOverride: { unit: 'rem', value: 0.25 },
          _key: generateKey()
        },
        {
          component: 'card',
          slug: { _type: 'slug', current: 'card' },
          radiusOverride: { unit: 'rem', value: 0.375 },
          _key: generateKey()
        }
      ]
    }
  }
] 