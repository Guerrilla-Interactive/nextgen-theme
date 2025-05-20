/**
 * Color Display Plugin for Sanity Studio
 * Shows a direct color preview for primaryColor and secondaryColor fields
 */
import {definePlugin} from 'sanity'
import React from 'react'

import ColorDisplayInput from '../components/inputs/color-display.input'

export const colorDisplayPlugin = definePlugin({
  name: 'color-display-plugin',
  
  form: {
    components: {
      input: (props) => {
        // Apply to colorDisplay field and primaryColor/secondaryColor fields
        if (
          props.schemaType.name === 'colorDisplay' ||
          ((props.schemaType.name === 'object' || props.schemaType.name === 'reference') && 
           (props.path.includes('primaryColor') || props.path.includes('secondaryColor')))
        ) {
          return <ColorDisplayInput {...props} />
        }
        
        // For all other fields, render the default input
        return props.renderDefault(props)
      },
    },
  },
}) 