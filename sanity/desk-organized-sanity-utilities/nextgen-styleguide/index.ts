// NextGen Styleguide Module Index
// This file exports all components, schemas, and plugins from the nextgen-styleguide

// Export schemas
import {nextgenStyleguideSchemas} from './schema'
import {colorPairField} from './schema/fields/color-pair.field'
import {wcagColorPairField} from './schema/fields/wcag-color-pair.field'
import {colorDisplayField} from './schema/fields/color-display.field'

// Export custom input components
import ColorPairPreviewInput from './components/inputs/color-pair-preview.input'
import ReadOnlySlugInput from './components/inputs/read-only-slug.input'
import ColorDisplayInput from './components/inputs/color-display.input'

// Export plugins
import {colorPreviewPlugin} from './plugins/color-preview-plugin'
import {readOnlySlugPlugin} from './plugins/read-only-slug-plugin'
import {themeWizardPanePlugin} from './plugins/theme-wizard-pane-plugin'
import {colorDisplayPlugin} from './plugins/color-display-plugin'

// Export structure
import {designTokensStructure} from './structure/design-tokens.document-structure'

// Export queries
import {
  DESIGN_TOKENS_QUERY,
  DESIGN_TOKENS_PREVIEW_QUERY,
  DESIGN_TOKENS_EXISTS_QUERY
} from './queries'

// Main exports
export {
  // Schemas
  nextgenStyleguideSchemas,
  colorPairField,
  wcagColorPairField,
  colorDisplayField,
  
  // Components
  ColorPairPreviewInput,
  ReadOnlySlugInput,
  ColorDisplayInput,
  
  // Plugins
  colorPreviewPlugin,
  readOnlySlugPlugin,
  themeWizardPanePlugin,
  colorDisplayPlugin,
  
  // Structure
  designTokensStructure,
  
  // Queries
  DESIGN_TOKENS_QUERY,
  DESIGN_TOKENS_PREVIEW_QUERY,
  DESIGN_TOKENS_EXISTS_QUERY
}

// Helper function to easily add the design tokens to a desk structure
export const addDesignTokensToStructure = (S: any, items: any[]) => {
  return [
    ...items.slice(0, 1), // Keep the first item (usually settings)
    designTokensStructure(S), // Add design tokens after the first item
    ...items.slice(1) // Add the rest of the items
  ]
} 