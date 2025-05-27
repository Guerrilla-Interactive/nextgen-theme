/**
 * Re-export all color-related plugins and schemas
 * This is a convenience module that consolidates all color-related exports
 */

// Import color input components
import ColorPairPreviewInput from '../components/inputs/color-pair-preview.input'
import ColorDisplayInput from '../components/inputs/color-display.input'

// Import color field schemas
import { colorPairField } from '../schema/fields/color-pair-field'

// Export everything for external use
export { ColorPairPreviewInput, ColorDisplayInput, colorPairField } 