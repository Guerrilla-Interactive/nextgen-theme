/**
 * Theme Wizard Pane Plugin
 * Adds a "Theme Wizard" pane to designTokens documents
 */
import {definePlugin} from 'sanity'
import ThemeWizardPane from '../components/theme-wizard/theme-wizard-pane'


/**
 * Plugin that adds a Theme Wizard pane to designTokens documents
 * Appears as a tab alongside the Document, History, and Validation tabs
 */
export const themeWizardPanePlugin = definePlugin(() => {
  return {
    name: 'theme-wizard-pane-plugin',
    // Use the documented structure for adding document views
    document: {
      // Documentation: https://www.sanity.io/docs/structure-builder-document-views
      views: [
        (S, context) => {
          // Extract schema type from context
          const {schemaType} = context
          
          // Only show for designTokens documents
          if (schemaType !== 'designTokens') {
            return null
          }
          
          // Add our custom document view
          return S.view
            .component(ThemeWizardPane)
            .id('theme-wizard')
            .title('Theme Wizard')
        }
      ]
    }
  }
}) 