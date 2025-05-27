/**
 * Color Migration Utility
 * 
 * This script migrates designTokens documents from the old single-color format
 * to the new array-based format for primary and secondary colors.
 * 
 * Usage:
 * npx ts-node migrateToColorArrays.ts
 */
import {createClient} from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Create a Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_STUDIO_TOKEN, // Required for write operations
  apiVersion: '2023-01-01',
  useCdn: false
})

async function migrateColorValues() {
  try {
    // Log start of migration
    console.log('Starting color migration...')
    
    // Fetch all designTokens documents
    const documents = await client.fetch(`*[_type == "designTokens"]`)
    console.log(`Found ${documents.length} design token documents to migrate.`)
    
    let migratedCount = 0
    let skippedCount = 0
    let errorCount = 0
    
    // Process each document
    for (const doc of documents) {
      const docId = doc._id
      console.log(`Processing document: ${docId}`)
      
      try {
        // Check if document already has the new array fields populated
        if (doc.primaryColors?.length > 0 || doc.secondaryColors?.length > 0) {
          console.log(`Document ${docId} already has array fields populated. Skipping.`)
          skippedCount++
          continue
        }
        
        // Initialize transaction
        let tx = client.transaction()
        let hasChanges = false
        
        // Migrate primary color if it exists
        if (doc.primaryColor?.colorPair?.background?.hex) {
          console.log(`Migrating primary color for ${docId}`)
          
          // Create the primaryColors array with the existing value
          tx = tx.patch(docId, {
            set: {
              primaryColors: [{
                colorName: 'Primary',
                colorPair: doc.primaryColor.colorPair
              }]
            }
          })
          
          hasChanges = true
        }
        
        // Migrate secondary color if it exists
        if (doc.secondaryColor?.colorPair?.background?.hex) {
          console.log(`Migrating secondary color for ${docId}`)
          
          // Create the secondaryColors array with the existing value
          tx = tx.patch(docId, {
            set: {
              secondaryColors: [{
                colorName: 'Secondary',
                colorPair: doc.secondaryColor.colorPair
              }]
            }
          })
          
          hasChanges = true
        }
        
        // Commit the transaction if we have changes
        if (hasChanges) {
          await tx.commit()
          console.log(`Successfully migrated document: ${docId}`)
          migratedCount++
        } else {
          console.log(`No color values to migrate in document: ${docId}`)
          skippedCount++
        }
      } catch (docError) {
        console.error(`Error migrating document ${docId}:`, docError)
        errorCount++
      }
    }
    
    // Log migration summary
    console.log('\nMigration Summary:')
    console.log(`Total documents: ${documents.length}`)
    console.log(`Successfully migrated: ${migratedCount}`)
    console.log(`Skipped: ${skippedCount}`)
    console.log(`Errors: ${errorCount}`)
    
    if (errorCount > 0) {
      console.log('\nThere were errors during migration. Please check the logs.')
    } else {
      console.log('\nMigration completed successfully.')
    }
    
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  }
}

// Run the migration
migrateColorValues()
  .then(() => {
    console.log('Migration script completed.')
    process.exit(0)
  })
  .catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
  }) 