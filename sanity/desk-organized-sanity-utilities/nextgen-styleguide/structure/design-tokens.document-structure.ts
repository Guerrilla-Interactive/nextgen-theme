// Design Tokens Document Structure for nextgen-styleguide
// Configures the Sanity desk structure to display the designTokens document as a singleton with custom icon
import {StructureBuilder} from 'sanity/desk'
import {PaletteIcon} from 'lucide-react'

// Import the token preview component
import TokenPreview from '../components/preview-pane/TokenPreview'
// Import the theme wizard pane component
import ThemeWizardPane from '../components/theme-wizard/theme-wizard-pane'

/**
 * Design Tokens Document Structure
 * Creates a custom desk structure for the designTokens document
 */
export const designTokensStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title('Design Tokens')
    .icon(PaletteIcon)
    .child(
      S.document()
        .schemaType('designTokens')
        .documentId('designTokens')
        .views([
          // Basic view - the standard form view
          S.view
            .form()
            .id('basic-form')
            .title('Basic'),
          
          // Advanced view - shows all fields including advanced options
          S.view
            .form()
            .id('advanced-form')
            .title('Advanced'),
          
          // Preview - shows components styled with the current tokens
          S.view
            .component(TokenPreview)
            .id('preview')
            .title('Preview'),
            
          // Theme Wizard - for applying theme presets
          S.view
            .component(ThemeWizardPane)
            .id('theme-wizard')
            .title('Theme Wizard')
        ])
    )
} 