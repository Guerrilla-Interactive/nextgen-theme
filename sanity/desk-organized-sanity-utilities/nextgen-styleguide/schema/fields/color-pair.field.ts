// Color pair field for nextgen-styleguide
// A reusable field component for color pairs
import {defineField, defineType} from 'sanity'

// Define types for our color pair field values
interface ColorValue {
  hex: string;
  alpha?: number;
  hsl?: any;
  rgb?: any;
}

interface ColorPairValue {
  background?: ColorValue; 
  foreground?: ColorValue;
  title?: string;
}

/**
 * Color Pair Field
 * A reusable object field for defining color pairs
 */
export const colorPairField = defineField({
  name: 'colorPair',
  title: 'Color Pair',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional name for this color pair',
    }),
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'color',
      description: 'Background/brand color',
      validation: Rule => Rule.required().error('Background color is required'),
    }),
    defineField({
      name: 'foreground',
      title: 'Foreground/Text Color',
      type: 'color',
      description: 'Text/foreground color to use with this background',
      validation: Rule => Rule.required().error('Foreground color is required'),
    }),
  ],
  
  // Add a preview that shows the color combination
  preview: {
    select: {
      background: 'background.hex',
      foreground: 'foreground.hex',
      title: 'title',
    },
    prepare({background, foreground, title}) {
      // Default values if colors aren't set yet
      const bg = background || '#ffffff';
      const fg = foreground || '#000000';
      
      return {
        title: title || 'Color Pair',
        subtitle: `${bg} / ${fg}`,
      };
    },
  },
}); 