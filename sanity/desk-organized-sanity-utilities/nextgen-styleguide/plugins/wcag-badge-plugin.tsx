/**
 * WCAG Badge Plugin for Sanity Studio
 * Registers the custom input component for WCAG color pairs
 */
import {definePlugin} from 'sanity'
import React from 'react'

// Import our custom input component
import WcagBadgeInput from '../components/inputs/wcag-badge.input'

export const wcagBadgePlugin = definePlugin({
  name: 'wcag-badge-plugin',
  
  schema: {
    types: (prev) => {
      return [
        ...prev,
        // No need to add schema types here, they're defined in the schema folder
      ]
    },
  },
  
  form: {
    components: {
      input: (props) => {
        // Only apply our custom input to color fields in wcagColorPair objects
        if (
          props.schemaType.name === 'color' && 
          props.path.length >= 2 && 
          props.path[props.path.length - 2] === 'wcagColorPair'
        ) {
          // Return our custom input component
          return <WcagBadgeInput {...props} />
        }
        
        // For all other fields, render the default input
        return props.renderDefault(props)
      },
    },
  },
}) 