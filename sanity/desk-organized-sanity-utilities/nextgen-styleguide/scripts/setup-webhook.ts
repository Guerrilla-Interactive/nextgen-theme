#!/usr/bin/env node
/**
 * Setup Webhook Script
 * This script sets up a Sanity webhook that triggers when the designTokens document is published
 */
import {createClient} from '@sanity/client'
import dotenv from 'dotenv'
import readline from 'readline'

// Load environment variables
dotenv.config()

// Configuration
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || '2023-01-01'
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN // Need write token to create webhooks

// Create a Sanity client with write permissions
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_TOKEN, // Write token required
  useCdn: false,
})

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * Main function to set up the webhook
 */
async function setupWebhook() {
  try {
    // Validate environment
    if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
      throw new Error('Missing required environment variables. Please set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN.')
    }

    console.log('Setting up Sanity webhook for designTokens...')
    
    // Ask for the GitHub repository information
    const githubRepo = await askQuestion('Enter your GitHub repository (e.g., owner/repo): ')
    const githubToken = await askQuestion('Enter your GitHub Personal Access Token: ')
    
    // Create the webhook in Sanity
    const webhook = await client.request({
      url: `/projects/${SANITY_PROJECT_ID}/hooks`,
      method: 'POST',
      body: {
        name: 'Design Tokens Update',
        description: 'Triggers theme generation when designTokens document is published',
        url: `https://api.github.com/repos/${githubRepo}/dispatches`,
        dataset: SANITY_DATASET,
        projection: '',
        headers: [
          {
            name: 'Authorization',
            value: `token ${githubToken}`,
          },
          {
            name: 'Accept',
            value: 'application/vnd.github.everest-preview+json',
          },
          {
            name: 'Content-Type',
            value: 'application/json',
          },
        ],
        httpMethod: 'POST',
        // Only trigger when designTokens document is published
        filter: '_type == "designTokens"',
        // Payload to send to GitHub
        payload: JSON.stringify({
          event_type: 'sanity-publish-designTokens',
          client_payload: {
            documentId: '{{documentId}}',
            type: '{{type}}',
          },
        }),
        enabled: true,
        isSystemHook: false,
      },
    })
    
    console.log('✅ Webhook created successfully!')
    console.log(`Webhook ID: ${webhook.id}`)
    console.log(`Webhook will trigger when designTokens document is published in the ${SANITY_DATASET} dataset.`)
    
  } catch (error) {
    console.error('❌ Error setting up webhook:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

/**
 * Helper function to ask questions using readline
 */
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Execute if run directly
if (require.main === module) {
  setupWebhook()
}

// Export for programmatic use
export default setupWebhook 