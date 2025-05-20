# Sanity Webhook Setup

This script sets up a Sanity webhook that triggers GitHub Actions when the `designTokens` document is published.

## Purpose

The webhook is a critical part of the CI/CD pipeline, ensuring that any changes to design tokens in Sanity Studio automatically trigger theme regeneration and package publishing.

## Prerequisites

1. A GitHub repository with the GitHub Actions workflow in place
2. A GitHub Personal Access Token with `repo` scope
3. Sanity write token with permissions to create webhooks

## Usage

### Environment Variables

Create a `.env` file with the following variables:

```
SANITY_PROJECT_ID="your-project-id"
SANITY_DATASET="production"
SANITY_API_VERSION="2023-01-01"
SANITY_WRITE_TOKEN="your-write-token"  # Need write access to create webhooks
```

### Running the Script

```bash
npm run setup-webhook
```

The script will prompt you for:
1. Your GitHub repository in the format `owner/repo`
2. Your GitHub Personal Access Token

### How It Works

The webhook:
1. Listens for publish events on the `designTokens` document type
2. Filters to only trigger on this specific document type
3. Sends a POST request to GitHub's repository dispatch API
4. Includes the document ID and type in the payload
5. GitHub Actions workflow responds to the `sanity-publish-designTokens` event type

## Verification

After setting up the webhook, you can verify it works by:

1. Making a change to the Design Tokens in Sanity Studio
2. Publishing the document
3. Checking the Actions tab in your GitHub repository to see if the workflow runs
4. Confirming the theme files are generated and the package is published

## Troubleshooting

If the webhook isn't triggering:

1. Check webhook logs in your Sanity project settings
2. Verify your GitHub token has the correct permissions
3. Ensure the webhook filter is correctly set to `_type == "designTokens"`
4. Check the event type name matches between the webhook and GitHub workflow 