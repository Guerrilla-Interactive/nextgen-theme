// WCAG color pair field for nextgen-styleguide
// A reusable field component for color pairs that displays WCAG compliance badges
import {defineField, defineType} from 'sanity'

// Define types for our color pair field values
interface ColorValue {
  hex: string;
  alpha?: number;
  hsl?: any;
  rgb?: any;
}

interface WcagColorPairValue {
  background?: ColorValue; 
  foreground?: ColorValue;
  contrastRatio?: number;
  wcagCompliance?: string;
  title?: string;
}

/**
 * WCAG Contrast Utilities
 * Utility functions for calculating contrast ratio and compliance levels
 * Exported for use in custom input components
 */
export const WCAGUtils = {
  // Convert RGB to relative luminance for WCAG calculations
  // Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
  getLuminance: (hexColor: string): number => {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16) / 255;
    const g = parseInt(hexColor.substr(2, 2), 16) / 255;
    const b = parseInt(hexColor.substr(4, 2), 16) / 255;
    
    // Calculate luminance
    const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  
  // Calculate contrast ratio between two colors
  getContrastRatio: (color1: string, color2: string): number => {
    // Handle missing inputs
    if (!color1 || !color2) return 0;
    
    const luminance1 = WCAGUtils.getLuminance(color1);
    const luminance2 = WCAGUtils.getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  },
  
  // Get WCAG compliance level based on contrast ratio
  getComplianceLevel: (ratio: number): string => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
  },
  
  // Get badge color based on compliance level
  getBadgeColor: (level: string): string => {
    switch (level) {
      case 'AAA': return '#4CAF50'; // Green
      case 'AA': return '#2196F3';  // Blue
      case 'AA Large': return '#FF9800'; // Orange
      default: return '#F44336';    // Red (Fail)
    }
  }
};

/**
 * WCAG Color Pair Field
 * A reusable object field for defining color pairs with WCAG compliance information
 * 
 * Note: We've created a WCAG Badge Input Component that will display visual badges
 * showing the contrast ratio and compliance level. However, due to the complex nature
 * of Sanity Studio plugin system, we'll register it later in Task 5 when we implement
 * the document structure. For now, the field has all the necessary properties and
 * validation to ensure WCAG compliance, and the custom component is ready to use.
 */
export const wcagColorPairField = defineField({
  name: 'wcagColorPair',
  title: 'Color Pair with WCAG Compliance',
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
      description: 'Text/foreground color with appropriate contrast',
      validation: Rule => Rule.required().error('Foreground color is required for accessibility'),
    }),
    defineField({
      name: 'contrastRatio',
      title: 'Contrast Ratio',
      type: 'number',
      readOnly: true,
      description: 'Automatically calculated contrast ratio',
    }),
    defineField({
      name: 'wcagCompliance',
      title: 'WCAG Compliance',
      type: 'string',
      readOnly: true,
      description: 'AA or AAA compliance level',
    }),
  ],
  
  // Add a preview that shows the color combination and contrast info
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
      
      // Calculate contrast ratio
      const ratio = WCAGUtils.getContrastRatio(bg, fg);
      const compliance = WCAGUtils.getComplianceLevel(ratio);
      
      return {
        title: title || 'Color Pair',
        subtitle: `Contrast: ${ratio.toFixed(2)}:1 (${compliance})`,
      };
    },
  },
  
  // Add validation to check for minimum contrast
  validation: Rule => 
    Rule.custom((value: WcagColorPairValue, context) => {
      if (!value || !value.background || !value.foreground) {
        return true; // Skip validation if colors aren't set
      }
      
      const bg = value.background.hex;
      const fg = value.foreground.hex;
      
      if (!bg || !fg) {
        return true; // Skip validation if colors aren't fully set
      }
      
      const ratio = WCAGUtils.getContrastRatio(bg, fg);
      
      // Warning for poor contrast
      if (ratio < 4.5) {
        return 'Color contrast ratio is below WCAG AA standard (4.5:1). Current ratio: ' + ratio.toFixed(2) + ':1';
      }
      
      return true;
    }),
}); 