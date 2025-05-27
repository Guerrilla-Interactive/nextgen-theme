/**
 * Color Display Field
 * A special field for showing live color previews with enhanced visualization
 */
import {defineField} from 'sanity'
import ColorDisplayInput from '../../components/inputs/color-display.input'

export const colorDisplayField = defineField({
  name: 'colorDisplay',
  title: 'Color Preview',
  description: 'Interactive preview of your design system colors with visual examples of UI elements',
  type: 'string', // Use string type as a base but it's just a display field
  readOnly: true, // Make it read only since it's just for display
  components: {
    input: ColorDisplayInput
  }
}) 