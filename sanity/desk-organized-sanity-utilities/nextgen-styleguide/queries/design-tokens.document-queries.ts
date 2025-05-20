// Design tokens GROQ queries for nextgen-styleguide
// Contains queries to fetch design tokens for the generator CLI and preview components
import {groq} from 'next-sanity'

/**
 * Main query to fetch all design tokens
 * Used by the token generator CLI to create CSS variables
 */
export const DESIGN_TOKENS_QUERY = groq`
  *[_type == "designTokens"][0] {
    advancedMode,
    "colors": {
      "primary": primaryColor.wcagColorPair,
      "secondary": secondaryColor.wcagColorPair,
      // Only include colorPalette if advancedMode is true
      ...(advancedMode && colorPalette != null && {
        "palette": colorPalette[] {
          name,
          "slug": slug.current,
          "value": wcagColorPair.background.hex,
          "foreground": wcagColorPair.foreground.hex,
          "shades": shades[] {
            name,
            "value": value.hex
          }
        }
      })
    },
    "typography": {
      "fontFamily": {
        "heading": fontFamily.heading,
        "body": fontFamily.body
      },
      // Only include typographyScale if advancedMode is true
      ...(advancedMode && typographyScale != null && {
        "scale": typographyScale[] {
          name,
          "slug": slug.current,
          fontSize,
          lineHeight
        }
      })
    },
    "borderRadius": {
      "value": radius.value,
      "unit": radius.unit
    },
    // Only include spacingScale if advancedMode is true
    ...(advancedMode && spacingScale != null && {
      "spacing": spacingScale[] {
        name,
        "slug": slug.current,
        value
      }
    }),
    // Only include componentOverrides if advancedMode is true
    ...(advancedMode && componentOverrides != null && {
      "components": componentOverrides[] {
        component,
        "slug": slug.current,
        "radius": radiusOverride,
        "colorOverrides": colorOverrides[]->
      }
    }),
    _updatedAt
  }
`

/**
 * Query to fetch design tokens for the preview component
 * Uses the document ID parameter for draft/published mode support
 */
export const DESIGN_TOKENS_PREVIEW_QUERY = groq`
  *[_type == "designTokens" && _id == $id][0] {
    advancedMode,
    "colors": {
      "primary": primaryColor.wcagColorPair,
      "secondary": secondaryColor.wcagColorPair,
      // Only include colorPalette if advancedMode is true
      ...(advancedMode && colorPalette != null && {
        "palette": colorPalette[] {
          name,
          "slug": slug.current,
          "value": wcagColorPair.background.hex,
          "foreground": wcagColorPair.foreground.hex
        }
      })
    },
    "typography": {
      "fontFamily": {
        "heading": fontFamily.heading,
        "body": fontFamily.body
      },
      // Only include typographyScale if advancedMode is true
      ...(advancedMode && typographyScale != null && {
        "scale": typographyScale[] {
          name,
          fontSize,
          lineHeight
        }
      })
    },
    "borderRadius": {
      "value": radius.value,
      "unit": radius.unit
    },
    _updatedAt
  }
`

/**
 * Simple query to check if design tokens exist
 * Used to determine if initial setup is needed
 */
export const DESIGN_TOKENS_EXISTS_QUERY = groq`
  *[_type == "designTokens"] | count
` 