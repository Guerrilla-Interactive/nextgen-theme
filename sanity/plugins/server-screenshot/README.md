# Server-Side Screenshot Plugin for Sanity Studio

This plugin provides server-side screenshot functionality for Sanity Studio, using Playwright to capture frontend pages reliably without browser permission issues.

## Features

- **Server-Side Capture**: Screenshots are taken on the server using Playwright, avoiding browser permission issues
- **Custom Schema Type**: The plugin provides a `screenshotImage` type that extends the standard image type with screenshot capabilities
- **Auto-Capture on Publish**: Option to automatically capture frontend screenshots when publishing documents
- **Manual Capture**: Simple UI for manually capturing screenshots
- **Reliable Across Browsers**: Works in all browsers, including Brave and other privacy-focused browsers
- **Rich Metadata**: Captures and stores metadata about the screenshot

## Usage

### Using in Document Schemas

To add a screenshot field to a document schema, use the `screenshotImage` type:

```js
// In your schema file
export const myDocumentType = defineType({
  name: 'myDocument',
  type: 'document',
  fields: [
    // Other fields...
    {
      name: 'frontendScreenshot',
      title: 'Frontend Screenshot',
      type: 'screenshotImage',
      description: 'A screenshot of how this page appears on the frontend'
    }
  ]
})
```

### Document Actions

The plugin also adds a "Server Screenshot" action to supported document types. This action appears in the document menu and can be used to quickly capture a screenshot of the current document.

### How It Works

1. The plugin uses the document's slug to determine the frontend URL
2. It calls a server-side API that uses Playwright to navigate to the page and capture a screenshot
3. The screenshot is uploaded to Sanity and attached to the document

## Requirements

- The document must have a `slug` field with a `current` property
- The server must have access to the frontend URL being captured
- Playwright must be installed in the project

## Development

The plugin uses the Next.js API route `/api/screenshot` to handle the server-side screenshot capture. You can customize this route as needed. 