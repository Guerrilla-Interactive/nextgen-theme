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
    document: {
      // Sanity v3 API for document plugins
      newDocumentOptions: {},
      actions: (prev, context) => prev,
      views: [
        // Function that returns a view or null
        (S, viewContext) => {
          // Only add the Theme Wizard pane to designTokens documents
          const {schemaType} = viewContext
          if (schemaType !== 'designTokens') {
            return null
          }
          
          // Return the Theme Wizard pane view
          return S.view
            .component(ThemeWizardPane)
            .id('theme-wizard')
            .title('Theme Wizard')
        }
      ]
    }
  }
}) 