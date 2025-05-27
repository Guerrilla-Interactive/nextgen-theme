# Color Array System Documentation

This document explains the new color array system implemented in the NextGen Theme Studio.

## Overview

The color system has been updated to support multiple primary and secondary colors, improving flexibility and design options. The system uses arrays of color objects, each with metadata and WCAG compliance information.

## Schema Structure

### New Array-Based Fields

```ts
// Primary Colors
primaryColors: [
  {
    colorName: 'Primary Blue',
    colorPair: {
      background: { hex: '#3b82f6', alpha: 1 },
      foreground: { hex: '#ffffff', alpha: 1 }
    }
  },
  // Additional primary colors...
]

// Secondary Colors
secondaryColors: [
  {
    colorName: 'Secondary Orange',
    colorPair: {
      background: { hex: '#f97316', alpha: 1 },
      foreground: { hex: '#ffffff', alpha: 1 }
    }
  },
  // Additional secondary colors...
]
```

### Legacy Fields (Backward Compatibility)

For backward compatibility, the system maintains the original single-value fields:

```ts
// Legacy Primary Color
primaryColor: {
  colorPair: {
    background: { hex: '#3b82f6', alpha: 1 },
    foreground: { hex: '#ffffff', alpha: 1 }
  }
}

// Legacy Secondary Color
secondaryColor: {
  colorPair: {
    background: { hex: '#f97316', alpha: 1 },
    foreground: { hex: '#ffffff', alpha: 1 }
  }
}
```

## Migration

A migration utility is available to convert existing single-value color fields to the new array format:

```bash
npx ts-node sanity/desk-organized-sanity-utilities/nextgen-styleguide/scripts/migrateToColorArrays.ts
```

See the [migration README](../scripts/ColorMigrationReadme.md) for detailed instructions.

## Components

### Color Display

The `ColorDisplayInput` component has been updated to:

1. Display all colors in the primaryColors and secondaryColors arrays
2. Fall back to legacy color fields if arrays are empty
3. Provide automatic refresh functionality to ensure UI stays current

### Color Pair Preview

The `ColorPairPreviewInput` component displays color combinations with:

1. Support for both the new array structure and legacy fields
2. Visual previews of background/foreground pairs
3. Sample text rendering with the selected colors

### WCAG Accessibility

The `WcagBadgeInput` component shows accessibility information:

1. Contrast ratio calculation for each color pair
2. WCAG compliance level badges (AAA, AA, AA Large, or Fail)
3. Warnings for color combinations with insufficient contrast

## Plugin Architecture

The color system uses a consolidated plugin architecture:

```ts
// Import the color plugin
import { colorPlugin } from './sanity/desk-organized-sanity-utilities/nextgen-styleguide'

// Add to your Sanity config
export default defineConfig({
  // ...
  plugins: [
    // ...
    colorPlugin,
    // ...
  ]
})
```

This plugin handles all color-related functionality, including display, previews, and accessibility checks.

## Theme Wizard

The Theme Wizard supports:

1. Applying preset themes with multiple primary and secondary colors
2. Extracting colors from logos and adding them to the arrays
3. Previewing all color combinations before applying

## Best Practices

1. **Always Add Color Names**: Provide descriptive names for each color (e.g., "Primary Blue", "Secondary Orange").
2. **Check WCAG Compliance**: Ensure color pairs meet accessibility standards (minimum AA compliance).
3. **Limit Array Size**: Keep color arrays manageable (3-5 colors per type is recommended).
4. **Primary vs. Secondary**: Use primary colors for main UI elements and secondary colors for accents and highlights.

## Accessing Colors in Queries

When querying colors, remember to handle both array and legacy formats:

```groq
*[_type == "designTokens"][0]{
  primaryColors[]{
    colorName,
    colorPair
  },
  secondaryColors[]{
    colorName,
    colorPair
  },
  // Legacy fallbacks
  primaryColor,
  secondaryColor
}
```

## Frontend Implementation

When implementing the colors in your frontend, use this pattern to handle both formats:

```tsx
// Get the first primary color, falling back to legacy format if needed
const primaryColor = document.primaryColors && document.primaryColors.length > 0
  ? document.primaryColors[0].colorPair.background.hex
  : document.primaryColor.colorPair.background.hex;

// Get all primary colors when available
const allPrimaryColors = document.primaryColors 
  ? document.primaryColors.map(c => c.colorPair.background.hex)
  : [document.primaryColor.colorPair.background.hex];
```

## Troubleshooting

If colors aren't displaying correctly in the Studio:

1. Try refreshing the color preview with the "Refresh" button
2. Switch to the "Basic Settings" tab after applying a theme
3. Ensure your document has been saved and published
4. Check the browser console for any error messages

For more support, please contact the development team. 