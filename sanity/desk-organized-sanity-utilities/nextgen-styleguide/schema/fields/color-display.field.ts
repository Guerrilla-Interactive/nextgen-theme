/**
 * Color Display Field
 * A special field for showing live color previews
 */
import {defineField} from 'sanity'
import ColorDisplayInput from '../../components/inputs/color-display.input'

export const colorDisplayField = defineField({
  name: 'colorDisplay',
  title: 'Color Preview',
  description: 'Live preview of your primary and secondary colors',
  type: 'string', // Use string type as a base but it's just a display field
  readOnly: true, // Make it read only since it's just for display
  components: {
    input: ColorDisplayInput
  }
}) 