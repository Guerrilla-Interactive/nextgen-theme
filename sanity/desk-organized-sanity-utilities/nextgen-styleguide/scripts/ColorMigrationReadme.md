# Color Array Migration Utility

This utility helps migrate your existing designTokens documents from the old single-color format to the new array-based format for primary and secondary colors.

## What This Script Does

The migration script:
1. Fetches all designTokens documents in your dataset
2. For each document:
   - Checks if it already has the new array fields populated
   - Converts the existing `primaryColor` to an item in the `primaryColors` array
   - Converts the existing `secondaryColor` to an item in the `secondaryColors` array
3. Provides detailed logging of the migration process

## Prerequisites

To run this script, you'll need:
- Node.js installed
- Access to your Sanity project
- A Sanity management token with write permissions

## Setup

1. Install the required dependencies:
   ```bash
   npm install @sanity/client dotenv ts-node typescript
   ```

2. Create a `.env` file in the same directory as the script with the following variables:
   ```
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_TOKEN=your-sanity-management-token
   ```

## Running the Migration

Execute the script using ts-node:

```bash
npx ts-node migrateToColorArrays.ts
```

The script will:
- Log its progress to the console
- Report how many documents were processed, migrated, skipped, or had errors
- Exit with a status code of 0 if successful, or 1 if there were errors

## Post-Migration

After running the migration:

1. Verify that your documents now have properly populated `primaryColors` and `secondaryColors` arrays
2. Update any components that were accessing the old `primaryColor` and `secondaryColor` fields to use the new arrays
3. The old fields are kept for backward compatibility but are hidden in the Studio UI

## Troubleshooting

If you encounter errors during migration:
- Check the console output for specific error messages
- Verify your Sanity management token has write permissions
- Make sure your .env file contains the correct project ID and dataset

## Reverting

If you need to revert the migration:
- The original `primaryColor` and `secondaryColor` fields are preserved
- You can manually remove the `primaryColors` and `secondaryColors` arrays from affected documents

## Questions or Issues

If you have questions or encounter issues, please contact the development team. 