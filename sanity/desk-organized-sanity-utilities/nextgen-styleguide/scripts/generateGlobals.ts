#!/usr/bin/env node
/**
 * Token Generator CLI
 * This script fetches design tokens from Sanity and generates:
 * 1. globals.css with CSS variables
 * 2. tailwind.config.cjs extension
 */
import {createClient} from '@sanity/client'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import chroma from 'chroma-js'

// Load environment variables from .env file
dotenv.config()

// Import the GROQ query
import {DESIGN_TOKENS_QUERY} from '../queries'

// Configuration
const OUTPUT_DIR = process.env.OUTPUT_DIR || './styles'
const CSS_OUTPUT = path.join(OUTPUT_DIR, 'globals.css')
const TAILWIND_OUTPUT = path.join(OUTPUT_DIR, 'tailwind.theme.cjs')

// Required token paths for validation
const REQUIRED_TOKENS = [
  'colors.primary',
  'typography.fontFamily',
  'borderRadius'
]

// Create a Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false, // We want fresh data
  apiVersion: process.env.SANITY_API_VERSION || '2023-01-01',
  token: process.env.SANITY_READ_TOKEN // Read-only token
})

/**
 * Main function to generate files
 */
async function generateGlobals() {
  console.time('Generation time')
  try {
    console.log('Fetching design tokens from Sanity...')
    const tokens = await client.fetch(DESIGN_TOKENS_QUERY)
    
    if (!tokens) {
      throw new Error('No design tokens found in Sanity')
    }
    
    // Validate that all required tokens exist
    validateCriticalTokens(tokens)
    
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true })
    
    // Generate and write CSS variables
    console.log('Generating CSS variables...')
    const css = generateCssVariables(tokens)
    await fs.writeFile(CSS_OUTPUT, css)
    
    // Generate and write Tailwind config
    console.log('Generating Tailwind configuration...')
    const tailwindConfig = generateTailwindConfig(tokens)
    await fs.writeFile(TAILWIND_OUTPUT, tailwindConfig)
    
    console.log(`✅ Successfully generated theme files:
    - ${CSS_OUTPUT}
    - ${TAILWIND_OUTPUT}
    `)
  } catch (error) {
    console.error('❌ Error generating theme files:', error)
    process.exit(1)
  }
  console.timeEnd('Generation time')
}

/**
 * Validates that all critical tokens exist
 */
function validateCriticalTokens(tokens) {
  console.log('Validating critical tokens...')
  const missingTokens = []
  
  for (const path of REQUIRED_TOKENS) {
    if (!getNestedValue(tokens, path)) {
      missingTokens.push(path)
    }
  }
  
  if (missingTokens.length > 0) {
    throw new Error(`Missing critical tokens: ${missingTokens.join(', ')}`)
  }
}

/**
 * Generates CSS variables from design tokens
 */
function generateCssVariables(tokens) {
  let css = `/**
 * Auto-generated design token variables
 * Generated on: ${new Date().toISOString()}
 * DO NOT EDIT DIRECTLY!
 */

:root {
`
  
  // Add color variables
  css += `  /* Colors */\n`
  
  // Primary color
  if (tokens.colors.primary) {
    const primary = tokens.colors.primary
    css += `  --color-primary: ${primary.background?.hex || '#000000'};\n`
    css += `  --color-primary-foreground: ${primary.foreground?.hex || inferForegroundColor(primary.background?.hex)};\n\n`
  }
  
  // Secondary color
  if (tokens.colors.secondary) {
    const secondary = tokens.colors.secondary
    css += `  --color-secondary: ${secondary.background?.hex || '#ffffff'};\n`
    css += `  --color-secondary-foreground: ${secondary.foreground?.hex || inferForegroundColor(secondary.background?.hex)};\n\n`
  }
  
  // Advanced color palette
  if (tokens.colors.palette) {
    tokens.colors.palette.forEach(color => {
      css += `  --color-${color.slug}: ${color.value};\n`
      css += `  --color-${color.slug}-foreground: ${color.foreground || inferForegroundColor(color.value)};\n`
      
      // Add shades if they exist
      if (color.shades && color.shades.length > 0) {
        color.shades.forEach(shade => {
          css += `  --color-${color.slug}-${shade.name}: ${shade.value};\n`
        })
      }
      
      css += '\n'
    })
  }
  
  // Typography variables
  css += `  /* Typography */\n`
  if (tokens.typography.fontFamily) {
    css += `  --font-heading: ${tokens.typography.fontFamily.heading || 'sans-serif'};\n`
    css += `  --font-body: ${tokens.typography.fontFamily.body || 'sans-serif'};\n\n`
  }
  
  // Typography scale
  if (tokens.typography.scale) {
    tokens.typography.scale.forEach(item => {
      css += `  --font-size-${item.slug}: ${item.fontSize};\n`
      css += `  --line-height-${item.slug}: ${item.lineHeight};\n`
    })
    css += '\n'
  }
  
  // Border radius
  if (tokens.borderRadius) {
    css += `  /* Border Radius */\n`
    css += `  --radius: ${tokens.borderRadius.value}${tokens.borderRadius.unit};\n\n`
  }
  
  // Spacing scale
  if (tokens.spacing) {
    css += `  /* Spacing */\n`
    tokens.spacing.forEach(space => {
      css += `  --spacing-${space.slug}: ${space.value};\n`
    })
    css += '\n'
  }
  
  // Component overrides
  if (tokens.components) {
    css += `  /* Component-specific tokens */\n`
    tokens.components.forEach(component => {
      // Component-specific radius
      if (component.radius) {
        css += `  --${component.slug}-radius: ${component.radius.value}${component.radius.unit};\n`
      }
      
      // Other component-specific overrides can be added here
    })
    css += '\n'
  }
  
  css += `}\n\n`
  
  // Add dark mode variables if needed in the future
  css += `/* Dark mode variables can be added here */\n`
  css += `/* 
.dark {
  --color-primary: var(--color-primary-dark);
  --color-secondary: var(--color-secondary-dark);
}
*/\n`
  
  return css
}

/**
 * Generates Tailwind config extension from design tokens
 */
function generateTailwindConfig(tokens) {
  const config = `/**
 * Auto-generated Tailwind theme configuration
 * Generated on: ${new Date().toISOString()}
 * DO NOT EDIT DIRECTLY!
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },${tokens.colors.palette ? generatePaletteConfig(tokens.colors.palette) : ''}
      },
      
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) * 1.5)',
        md: 'calc(var(--radius) * 0.75)',
        sm: 'calc(var(--radius) * 0.5)',
      },${tokens.spacing ? generateSpacingConfig(tokens.spacing) : ''}
    },
  },
};
`
  return config
}

/**
 * Helper to generate the palette config for Tailwind
 */
function generatePaletteConfig(palette) {
  if (!palette || palette.length === 0) return ''
  
  let result = '\n'
  
  palette.forEach(color => {
    result += `        "${color.slug}": {\n`
    result += `          DEFAULT: 'var(--color-${color.slug})',\n`
    result += `          foreground: 'var(--color-${color.slug}-foreground)',\n`
    
    // Add shades if they exist
    if (color.shades && color.shades.length > 0) {
      color.shades.forEach(shade => {
        result += `          "${shade.name}": 'var(--color-${color.slug}-${shade.name})',\n`
      })
    }
    
    result += `        },\n`
  })
  
  return result
}

/**
 * Helper to generate the spacing config for Tailwind
 */
function generateSpacingConfig(spacing) {
  if (!spacing || spacing.length === 0) return ''
  
  let result = '\n      spacing: {\n'
  
  spacing.forEach(space => {
    result += `        "${space.slug}": 'var(--spacing-${space.slug})',\n`
  })
  
  result += '      },'
  
  return result
}

/**
 * Infers appropriate foreground color (black or white) based on background color luminance
 */
function inferForegroundColor(backgroundColor) {
  if (!backgroundColor) return '#000000'
  
  try {
    // Use chroma.js to calculate luminance and determine if white or black text is better
    const luminance = chroma(backgroundColor).luminance()
    return luminance > 0.5 ? '#000000' : '#ffffff'  // Dark text on light backgrounds, light text on dark backgrounds
  } catch (error) {
    console.warn(`Failed to infer foreground color for ${backgroundColor}, defaulting to black`)
    return '#000000'
  }
}

/**
 * Gets a nested value from an object using a dot-notation path
 */
function getNestedValue(obj, path) {
  const keys = path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (current === undefined || current === null) {
      return undefined
    }
    current = current[key]
  }
  
  return current
}

// Execute if run directly
if (require.main === module) {
  generateGlobals()
}

// Export for programmatic use (e.g. in CI/CD pipelines)
export default generateGlobals 