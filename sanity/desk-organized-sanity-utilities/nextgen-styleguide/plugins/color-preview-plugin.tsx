/**
 * Color Preview Plugin for Sanity Studio
 * Registers the custom input component for color pairs
 */
import {definePlugin} from 'sanity'
import React from 'react'

// Import our custom input component
import ColorPairPreviewInput from '../components/inputs/color-pair-preview.input'

export const colorPreviewPlugin = definePlugin({
  name: 'color-preview-plugin',
  
  form: {
    components: {
      input: (props) => {
        // Only apply our custom input to color fields in colorPair objects
        if (
          props.schemaType.name === 'color' && 
          props.path.length >= 2 && 
          (props.path[props.path.length - 2] === 'colorPair' ||
           props.path[props.path.length - 2] === 'wcagColorPair') // Support both naming conventions for compatibility
        ) {
          // Return our custom input component
          return <ColorPairPreviewInput {...props} />
        }
        
        // For all other fields, render the default input
        return props.renderDefault(props)
      },
    },
  },
}) 