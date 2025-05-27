// Design tokens GROQ queries for nextgen-styleguide
// Contains queries to fetch design tokens for the generator CLI and preview components
import {groq} from 'next-sanity'

/**
 * Main query to fetch all design tokens
 * Used by the token generator CLI to create CSS variables
 */
export const DESIGN_TOKENS_QUERY = groq`
  *[_type == "designTokens"][0] {
    "colors": {
      "primary": primaryColor.colorPair,
      "secondary": secondaryColor.colorPair,
      "primaryColors": primaryColors[] {
        colorName,
        colorPair
      },
      "secondaryColors": secondaryColors[] {
        colorName,
        colorPair
      },
      "palette": colorPalette[] {
        name,
        "slug": slug.current,
        "value": colorPair.background.hex,
        "foreground": colorPair.foreground.hex,
        "shades": shades[] {
          name,
          "value": value.hex
        }
      }
    },
    "typography": {
      "fontFamily": {
        "heading": fontFamily.heading,
        "body": fontFamily.body
      },
      "scale": typographyScale[] {
        name,
        "slug": slug.current,
        fontSize,
        lineHeight
      }
    },
    "borderRadius": {
      "value": radius.value,
      "unit": radius.unit
    },
    "spacing": spacingScale[] {
      name,
      "slug": slug.current,
      value
    },
    "components": componentOverrides[] {
      component,
      "slug": slug.current,
      "radius": radiusOverride,
      "colorOverrides": colorOverrides[]->
    },
    _updatedAt
  }
`

/**
 * Query to fetch design tokens for the preview component
 * Uses the document ID parameter for draft/published mode support
 */
export const DESIGN_TOKENS_PREVIEW_QUERY = groq`
  *[_type == "designTokens" && _id == $id][0] {
    "colors": {
      "primary": primaryColor.colorPair,
      "secondary": secondaryColor.colorPair,
      "primaryColors": primaryColors[] {
        colorName,
        colorPair
      },
      "secondaryColors": secondaryColors[] {
        colorName,
        colorPair
      },
      "palette": colorPalette[] {
        name,
        "slug": slug.current,
        "value": colorPair.background.hex,
        "foreground": colorPair.foreground.hex
      }
    },
    "typography": {
      "fontFamily": {
        "heading": fontFamily.heading,
        "body": fontFamily.body
      },
      "scale": typographyScale[] {
        name,
        fontSize,
        lineHeight
      }
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