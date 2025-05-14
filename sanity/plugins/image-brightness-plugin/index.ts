// ────────────────────────────────────────────────────────────────────────────────
// sanity-plugin-image-brightness
// A Sanity Studio v3 (React/Vite) plugin that inspects the current document,
// finds every block that references an image, sends the image to Google Gemini 
// Vision, and tells you whether the *upper 25 %* of each image is predominantly
// DARK or LIGHT. The result appears as a live inspector panel while you edit.
//
// USAGE
//  • Add `@google/generative-ai` and `@sanity/image-url` to your Studio deps.
//  • Expose Gemini API Key in your `.env` using one of these options:
//      GEMINI_API_KEY="sk‑..."
//      NEXT_PUBLIC_GEMINI_API_KEY="sk‑..."
//      VITE_GEMINI_API_KEY="sk‑..." 
//      SANITY_STUDIO_GEMINI_API_KEY="sk‑..."
//  • In `sanity.config.ts`, add  `plugins: [imageBrightnessPlugin()]`  
//  • Open any document that contains a `blocks` array (as in your example).
//     A new "Image brightness" inspector panel will appear on the right.
//
// Customize the slice analysed (TOP_FRACTION) or the prompt wording as needed.
// ────────────────────────────────────────────────────────────────────────────────

// index.ts — plugin entry --------------------------------------------------------
import {definePlugin} from 'sanity'
import {NavigationSettingsInput} from './navigation-settings-input'

export const imageBrightnessPlugin = definePlugin({
  name: 'sanity-plugin-image-brightness',
})

// Export the navigation settings input component
export {NavigationSettingsInput}
