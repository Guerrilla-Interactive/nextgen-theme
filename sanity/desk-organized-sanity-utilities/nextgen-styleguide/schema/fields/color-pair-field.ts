// Color pair field for nextgen-styleguide
// A reusable field component for color pairs with background and foreground colors
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
 * A reusable object field for defining color pairs with background and foreground colors
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
      type: 'object',
      description: 'Background/brand color',
      validation: Rule => Rule.required().error('Background color is required'),
      fields: [
        defineField({
          name: 'hex',
          title: 'Hex Color',
          type: 'string',
          description: 'Hexadecimal color value',
          validation: Rule => Rule.required().error('Hex color is required')
        }),
        defineField({
          name: 'alpha',
          title: 'Alpha (Opacity)',
          type: 'number',
          description: 'Opacity level (0-1)',
          initialValue: 1,
          validation: Rule => Rule.min(0).max(1)
        })
      ]
    }),
    defineField({
      name: 'foreground',
      title: 'Foreground/Text Color',
      type: 'object',
      description: 'Text/foreground color to use with this background',
      validation: Rule => Rule.required().error('Foreground color is required'),
      fields: [
        defineField({
          name: 'hex',
          title: 'Hex Color',
          type: 'string',
          description: 'Hexadecimal color value',
          validation: Rule => Rule.required().error('Hex color is required')
        }),
        defineField({
          name: 'alpha',
          title: 'Alpha (Opacity)',
          type: 'number',
          description: 'Opacity level (0-1)',
          initialValue: 1,
          validation: Rule => Rule.min(0).max(1)
        })
      ]
    }),
  ],
  
  // Add an improved preview that shows the color combination
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
      
      // Choose an emoji based on the background color brightness
      // Simple heuristic: convert hex to RGB and check luminance
      const hexToRgb = (hex: string) => {
        const cleaned = hex.replace('#', '');
        const r = parseInt(cleaned.substring(0, 2), 16);
        const g = parseInt(cleaned.substring(2, 4), 16);
        const b = parseInt(cleaned.substring(4, 6), 16);
        return { r, g, b };
      };
      
      const rgb = hexToRgb(bg);
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      
      // Choose appropriate emoji
      let colorEmoji = '🎨';
      if (brightness < 128) {
        colorEmoji = '⬛'; // Dark color
      } else if (rgb.r > Math.max(rgb.g, rgb.b) + 50) {
        colorEmoji = '🟥'; // Red-ish
      } else if (rgb.g > Math.max(rgb.r, rgb.b) + 50) {
        colorEmoji = '🟩'; // Green-ish
      } else if (rgb.b > Math.max(rgb.r, rgb.g) + 50) {
        colorEmoji = '🟦'; // Blue-ish
      } else if (rgb.r > 200 && rgb.g > 200 && rgb.b < 100) {
        colorEmoji = '🟨'; // Yellow-ish
      } else if (rgb.r > 200 && rgb.g < 100 && rgb.b > 200) {
        colorEmoji = '🟪'; // Purple-ish
      } else if (rgb.r > 200 && rgb.g > 100 && rgb.b < 100) {
        colorEmoji = '🟧'; // Orange-ish
      } else if (brightness > 200) {
        colorEmoji = '⬜'; // Very light color
      }
      
      return {
        title: title || `${bg}`,
        subtitle: `Background: ${bg} | Text: ${fg}`,
        media: colorEmoji
      };
    },
  },
}); 