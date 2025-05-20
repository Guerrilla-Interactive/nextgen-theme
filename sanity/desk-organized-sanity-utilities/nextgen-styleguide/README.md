# NextGen Styleguide

> Designer-first theming workflow for storing design tokens in Sanity Studio.

## Purpose

This module provides a complete workflow for managing design tokens (colors, typography, spacing, etc.) in Sanity Studio and generating CSS and Tailwind variables for consumption by web applications.

## Features

- Singleton `designTokens` document with Basic/Advanced UI modes
- Color pickers with visual preview
- Live preview of Shadcn components with applied tokens
- Node CLI to generate `globals.css` and `tailwind.theme.cjs`
- CI integration for automatic rebuilds on publish

## Usage

### Design Tokens Document

The `designTokens` singleton document allows designers to:
- Edit primary and secondary colors with foreground text colors
- Configure typography, spacing, and border radius
- Toggle Advanced Mode for more granular token control

### Token Generator CLI

A command-line tool that:
- Fetches design tokens from Sanity
- Generates CSS variables in `globals.css`
- Creates a Tailwind theme extension in `tailwind.theme.cjs`
- Handles token validation
- Auto-infers foreground colors when needed

Run the CLI with:
```bash
npm run generate-theme
```

See [scripts/README.md](./scripts/README.md) for detailed CLI usage instructions.

### CI/CD Pipeline

The theme system includes a complete CI/CD pipeline that:
- Automatically runs when design tokens are published in Sanity
- Regenerates theme files using the latest token values
- Publishes the theme as an npm package for consumption by apps
- Updates theme files in the repository

Setup the webhook with:
```bash
npm run setup-webhook
```

See [scripts/webhook-readme.md](./scripts/webhook-readme.md) for detailed webhook setup instructions.

## Folder Structure

- `schema/` - Sanity schema definitions
- `queries/` - GROQ queries for fetching tokens
- `structure/` - Desk structure configuration
- `components/` - Custom inputs and preview components
- `scripts/` - Token generator CLI and webhook setup
- `.github/workflows/` - GitHub Actions workflow for CI/CD 