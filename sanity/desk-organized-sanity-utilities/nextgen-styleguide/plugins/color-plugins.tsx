/**
 * Consolidated Color Plugins Module
 * 
 * A unified plugin system for color-related functionality in Sanity Studio.
 * Combines previously separate plugins into a single coherent API.
 */
import {definePlugin} from 'sanity'
import React from 'react'

// Import our custom input components
import ColorPairPreviewInput from '../components/inputs/color-pair-preview.input'
import ColorDisplayInput from '../components/inputs/color-display.input'
import WcagBadgeInput from '../components/inputs/wcag-badge.input'

// Utility to check if a path is related to a color field
const isColorField = (schemaType: any, path: string[]) => 
  schemaType.name === 'color';

// Check if path is within a WCAG color pair
const isInWcagColorPair = (path: string[]) => 
  path.length >= 2 && path[path.length - 2] === 'wcagColorPair';

// Check if path is within primary or secondary colors array
const isInColorArray = (path: string[]) => 
  path.length >= 4 && 
  ['primaryColors', 'secondaryColors'].includes(path[path.length - 4]);

// Check if it's a legacy color field
const isLegacyColor = (path: string[]) => 
  path.length >= 3 &&
  ['primaryColor', 'secondaryColor'].includes(path[path.length - 3]);

// Check if it's the colorDisplay field
const isColorDisplayField = (schemaType: any) => 
  schemaType.name === 'colorDisplay';

/**
 * Primary Color Plugin
 * Combines all color-related functionality into a single plugin
 */
export const colorPlugin = definePlugin({
  name: 'nextgen-color-plugin',
  
  form: {
    components: {
      input: (props: any) => {
        const {schemaType, path} = props;
        
        // Handle the color display field (preview component)
        if (isColorDisplayField(schemaType)) {
          return <ColorDisplayInput {...props} />
        }
        
        // Handle color pair previews
        if (isColorField(schemaType, path) && 
            (isInWcagColorPair(path) || isInColorArray(path) || isLegacyColor(path))) {
          
          // Add WCAG badge for foreground colors
          if (path[path.length - 1] === 'foreground') {
            return <WcagBadgeInput {...props} />
          }
          
          // Apply color pair preview
          return <ColorPairPreviewInput {...props} />
        }
        
        // For all other fields, render default input
        return props.renderDefault(props)
      }
    }
  }
})

// Legacy plugin exports for backward compatibility
export const colorPreviewPlugin = definePlugin(() => ({
  name: 'color-preview-legacy',
  
  form: {
    components: {
      input: (props: any) => {
        console.warn('colorPreviewPlugin is deprecated, use colorPlugin instead')
        return props.renderDefault(props)
      }
    }
  }
}))

export const colorDisplayPlugin = definePlugin(() => ({
  name: 'color-display-legacy',
  
  form: {
    components: {
      input: (props: any) => {
        console.warn('colorDisplayPlugin is deprecated, use colorPlugin instead')
        return props.renderDefault(props)
      }
    }
  }
}))

export const wcagBadgePlugin = definePlugin(() => ({
  name: 'wcag-badge-legacy',
  
  form: {
    components: {
      input: (props: any) => {
        console.warn('wcagBadgePlugin is deprecated, use colorPlugin instead')
        return props.renderDefault(props)
      }
    }
  }
})) 