# Custom Input Components

This directory contains custom input components that enhance the Sanity Studio user experience.

## Color Pair Preview Input Component

The Color Pair Preview Input Component (`color-pair-preview.input.tsx`) extends Sanity's default color input to display a visual preview of color combinations:

- Shows a visual preview of background and foreground colors together
- Displays color swatches for both colors
- Provides a text sample showing how text will look with the selected colors

### Features

- Visual color swatches for both background and foreground
- Live preview of text appearance with the selected colors
- Simple, visual interface for designers to make color decisions
- Works with both new `colorPair` fields and existing `wcagColorPair` fields for compatibility

### Implementation Details

The component:

1. Gets the parent field values to access both colors in the pair
2. Renders the default color picker along with custom preview elements
3. Shows a live sample of text with the chosen colors

### Integration with Sanity

The component is integrated through a Sanity Studio plugin that overrides the input component for specific fields:

```ts
form: {
  components: {
    input: (props) => {
      if (props.schemaType.name === 'color' && 
          props.path.length >= 2 && 
          (props.path[props.path.length - 2] === 'colorPair' ||
           props.path[props.path.length - 2] === 'wcagColorPair')) {
        return <ColorPairPreviewInput {...props} />
      }
      return props.renderDefault(props)
    },
  },
}
```

This ensures the preview appears only for color fields that are part of a color pair, giving designers an immediate visual reference while maintaining a clean interface. 