/**
 * Read-Only Slug Plugin for Sanity Studio
 * Makes slug fields read-only after a document has been published
 */
import {definePlugin} from 'sanity'
import React from 'react'

// Import our custom input component
import ReadOnlySlugInput from '../components/inputs/read-only-slug.input'

/**
 * Plugin that makes slug fields read-only after a document has been published
 * This is important for design tokens because changing token IDs (slugs)
 * after they're in use can break implementations that depend on them
 */
export const readOnlySlugPlugin = definePlugin({
  name: 'read-only-slug-plugin',
  
  form: {
    components: {
      input: (props) => {
        // Apply our custom input only to slug fields in designTokens documents
        if (
          props.schemaType.name === 'slug' && 
          props.path.length >= 2 &&
          ['designTokens', 'colorPalette', 'typographyScale', 'spacingScale', 'componentOverrides'].some(
            type => props.path.some(path => path === type)
          )
        ) {
          // Return our custom input component
          return <ReadOnlySlugInput {...props} />
        }
        
        // For all other fields, render the default input
        return props.renderDefault(props)
      },
    },
  },
}) 