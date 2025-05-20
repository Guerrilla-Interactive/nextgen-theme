/**
 * ReadOnlySlugInput for nextgen-styleguide
 * Makes slug fields read-only after a document has been published
 * This preserves token IDs once they're in production use
 */
import React, {useEffect, useState} from 'react'
import {Card, Text, Stack} from '@sanity/ui'
import {useClient, useFormValue} from 'sanity'
import {SlugInputProps} from 'sanity'

/**
 * ReadOnlySlugInput
 * A custom input component that makes slugs read-only after a document is published
 * This is used to prevent breaking changes to token IDs once in production
 */
export default function ReadOnlySlugInput(props: SlugInputProps) {
  const {renderDefault} = props
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const client = useClient({apiVersion: '2023-01-01'})
  
  // Get the document ID from form value
  const documentId = useFormValue(['_id']) as string

  // Check if the document has been published
  useEffect(() => {
    if (!documentId || documentId.startsWith('drafts.')) {
      // For new or draft-only documents, extract the actual ID
      const actualId = documentId?.replace('drafts.', '') || ''
      
      // Skip for brand new documents or if we've already loaded
      if (!actualId || hasLoaded) return
      
      // Check if a published version exists
      client.fetch(`*[_id == $id && !(_id in path("drafts.**"))] { _id }`, {
        id: actualId
      }).then(published => {
        if (published && published.length > 0) {
          setIsReadOnly(true)
        }
        setHasLoaded(true)
      }).catch(err => {
        console.error('Error checking document publish status:', err)
        setHasLoaded(true)
      })
    } else {
      // If we're viewing a published document (not a draft), it's read-only
      setIsReadOnly(true)
      setHasLoaded(true)
    }
  }, [documentId, client, hasLoaded])

  // If read-only, modify the props to make the field non-editable
  if (isReadOnly) {
    const readOnlyProps = {
      ...props,
      readOnly: true,
    }
    
    return (
      <Stack space={2}>
        {renderDefault(readOnlyProps)}
        <Card padding={2} tone="caution">
          <Text size={1}>This slug is read-only because the document has been published. Changing token IDs after publication could break existing implementations.</Text>
        </Card>
      </Stack>
    )
  }
  
  // Otherwise, render the default slug input
  return renderDefault(props)
} 