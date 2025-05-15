// ────────────────────────────────────────────────────────────────────────────────
// sanity-plugin-image-brightness
// A Sanity Studio v3 (React/Vite) plugin that inspects the current document,
// finds every block that references an image, and analyzes whether the *upper portion*
// of each image is predominantly DARK or LIGHT using pixel-based analysis.
// The result appears as a live inspector panel while you edit.
//
// USAGE
//  • Add `@sanity/image-url` to your Studio deps.
//  • In `sanity.config.ts`, add  `plugins: [imageBrightnessPlugin()]`  
//  • Open any document that contains a `blocks` array.
//     A new "Image brightness" inspector panel will appear on the right.
//
// Customize the slice analysed (TOP_FRACTION) as needed.
// ────────────────────────────────────────────────────────────────────────────────

// index.ts — plugin entry --------------------------------------------------------
import {definePlugin} from 'sanity'
import {NavigationSettingsInput} from './navigation-settings-input'

export const imageBrightnessPlugin = definePlugin({
  name: 'sanity-plugin-image-brightness',
})

// Export the navigation settings input component
export {NavigationSettingsInput}
