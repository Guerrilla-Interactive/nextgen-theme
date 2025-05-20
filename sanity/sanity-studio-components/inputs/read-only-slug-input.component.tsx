import React from 'react'
import {useFormValue, SanityDocument, SlugInputProps} from 'sanity'

/**
 * ReadOnlySlugInput Component
 * 
 * A wrapper component for Sanity's built-in slug input that makes slugs
 * read-only if the document has been published (has a publishedAt field).
 * 
 * This prevents changing critical token IDs after they've been published,
 * which could break theme references.
 */
export const ReadOnlySlugInput = (props: SlugInputProps) => {
  // Get the full document to check if it's been published
  const document = useFormValue([]) as SanityDocument
  
  // Check if document has been published by looking for _publishedAt field
  const isPublished = Boolean(document?._publishedAt)
  
  // If published, display a notice that this field is read-only
  const readOnlyMessage = isPublished ? (
    <div style={{
      padding: '0.5rem',
      marginBottom: '0.5rem',
      backgroundColor: 'var(--card-fg-color)',
      borderRadius: 'var(--border-radius-medium)',
      fontSize: 'var(--font-size-1)',
      color: 'var(--card-bg-color)'
    }}>
      ID can't be changed after publishing to avoid breaking references
    </div>
  ) : null

  // Pass through the props but set readOnly if published
  return (
    <>
      {readOnlyMessage}
      {props.renderDefault({
        ...props,
        readOnly: isPublished || props.readOnly,
      })}
    </>
  )
} 