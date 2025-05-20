# Token Generator CLI

This CLI tool fetches design tokens from Sanity and generates CSS variables and Tailwind configuration.

## Features

- Fetches design tokens from Sanity Studio
- Generates CSS variables in a globals.css file
- Creates a Tailwind theme extension
- Validates required tokens
- Auto-infers foreground (text) colors when not specified
- Performance optimized (< 2 second generation time for 100 tokens)

## Usage

### Prerequisites

Install required dependencies:

```bash
npm install dotenv chroma-js ts-node @types/chroma-js --save
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
# Sanity project configuration
SANITY_PROJECT_ID="your-project-id"
SANITY_DATASET="production"
SANITY_API_VERSION="2023-01-01"
SANITY_READ_TOKEN="your-read-token"  # Create a read-only token in Sanity

# Output directory (relative to project root)
OUTPUT_DIR="./styles"
```

### Running the CLI

Run manually:

```bash
npm run generate-theme
```

### Output Files

The CLI generates two files:

1. `globals.css` - CSS variables for all design tokens
2. `tailwind.theme.cjs` - A Tailwind theme extension

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Generate Theme

on:
  workflow_dispatch:
  push:
    branches: [main]
    paths:
      - 'sanity/desk-organized-sanity-utilities/nextgen-styleguide/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Generate theme
        run: npm run generate-theme
        env:
          SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          SANITY_DATASET: production
          SANITY_API_VERSION: 2023-01-01
          SANITY_READ_TOKEN: ${{ secrets.SANITY_READ_TOKEN }}
          OUTPUT_DIR: ./styles
      - name: Commit and push if changed
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add ./styles/globals.css ./styles/tailwind.theme.cjs
          git diff --quiet && git diff --staged --quiet || (git commit -m "Update design tokens" && git push)
``` 