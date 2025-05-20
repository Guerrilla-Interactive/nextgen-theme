// This file exports all schema types from the nextgen-styleguide
import {designTokensType} from './design-tokens.document-schema'
import {wcagColorPairField} from './fields/wcag-color-pair.field'
import {colorPairField} from './fields/color-pair.field'

// Export all schema types
export const nextgenStyleguideSchemas = [
  designTokensType
  // Add other schema types here as they are created
]

// Export field schemas for reuse
export {wcagColorPairField, colorPairField} 