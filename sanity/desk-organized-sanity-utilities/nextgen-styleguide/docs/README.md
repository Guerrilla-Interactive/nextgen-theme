# NextGen Styleguide

A comprehensive style management system for Sanity Studio, providing design token management, color accessibility tools, and theme generation.

## Features

- **Design Token Management**: Create and maintain design tokens for typography, colors, spacing, and more
- **Color Accessibility**: Built-in WCAG compliance checking and visualization
- **Theme Wizard**: Apply predefined themes or generate themes from brand assets
- **Multiple Color Support**: Manage arrays of primary and secondary colors with metadata
- **Consolidated Plugin Architecture**: Unified plugin system for cohesive user experience

## Documentation

- [Color Array System](./color-array-system.md) - Documentation for the new multi-color array functionality
- [Migration Guide](../scripts/ColorMigrationReadme.md) - Instructions for migrating from the single-color to multi-color system

## Components

The NextGen Styleguide includes several key components:

- **Color Display**: Visualize all colors in your design tokens
- **Color Pair Preview**: See background/foreground combinations with sample text
- **WCAG Badge**: Check accessibility compliance for all color pairs
- **Theme Wizard**: Apply predefined themes or extract colors from logos

## Plugins

All functionality is available through a consolidated plugin system:

```ts
// sanity.config.ts
import { colorPlugin, themeWizardPanePlugin } from './sanity/desk-organized-sanity-utilities/nextgen-styleguide'

export default defineConfig({
  // ...
  plugins: [
    // ...
    colorPlugin,
    themeWizardPanePlugin,
    // ...
  ]
})
```

## Schema

The styleguide includes a comprehensive `designTokens` schema that manages:

- Multiple primary and secondary colors (with backward compatibility)
- Typography scales and font family settings
- Spacing and layout values
- Component-specific overrides

## Usage

1. Import the schemas and plugins in your Sanity Studio configuration
2. Add the design tokens document type to your schema
3. Create a design tokens document to manage your style settings
4. Use the Theme Wizard to quickly apply predefined themes
5. Adjust individual colors, typography, and spacing as needed

## Development

The NextGen Styleguide is actively maintained. To contribute:

1. Follow the project structure and naming conventions
2. Ensure backward compatibility when adding new features
3. Update documentation for any significant changes
4. Run tests to ensure WCAG calculations remain accurate

## About

The NextGen Styleguide is designed to simplify the management of design tokens in Sanity Studio while ensuring accessibility compliance and maintainable styling systems. 