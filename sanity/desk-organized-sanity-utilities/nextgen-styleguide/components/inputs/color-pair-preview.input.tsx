// Color Pair Preview Input Component for nextgen-styleguide
// Displays a simple preview of color pairs
import React from 'react'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {ObjectInputProps} from 'sanity'

// Define a type for our input component
type ColorPairPreviewInputProps = ObjectInputProps & {
  parent?: Record<string, any>
  path: string[]
}

/**
 * Color Pair Preview Input Component
 * Extends the default color input in Sanity Studio to show a visual preview of color combinations
 */
export default function ColorPairPreviewInput(props: ColorPairPreviewInputProps) {
  const {
    renderDefault,
  } = props

  // Get paired color values from the parent object
  const parentValue = props.parent as Record<string, any>
  const background = parentValue?.background?.hex
  const foreground = parentValue?.foreground?.hex

  // Don't render preview if we are still at the top level
  if (props.path.length <= 1) {
    return renderDefault(props)
  }

  // Extract last segment to determine if we're on a background or foreground field
  const fieldName = props.path[props.path.length - 1]
  
  // Only render preview next to foreground field
  if (fieldName !== 'foreground') {
    return renderDefault(props)
  }
  
  // Create preview with color samples
  return (
    <Stack space={2}>
      {renderDefault(props)}
      
      {background && foreground && (
        <Flex align="center" justify="flex-start" marginTop={2}>
          <Card padding={2} radius={2} tone="default">
            <Flex align="center">
              <Box
                padding={3}
                style={{
                  width: 40,
                  height: 40,
                  background: background,
                  borderRadius: '3px',
                  marginRight: '8px',
                  border: '1px solid #ddd',
                }}
              />
              <Box
                padding={3}
                style={{
                  width: 40,
                  height: 40,
                  background: foreground,
                  borderRadius: '3px',
                  marginRight: '8px',
                  border: '1px solid #ddd',
                }}
              />
              
              <Text size={1} weight="semibold">
                Color Combination
              </Text>
            </Flex>
          </Card>
        </Flex>
      )}
      
      {/* Preview of how text will look with these colors */}
      {background && foreground && (
        <Card 
          padding={3} 
          radius={2} 
          style={{
            background: background,
            color: foreground,
            textAlign: 'center',
            fontWeight: 600,
            marginTop: '8px'
          }}
        >
          Sample Text with These Colors
        </Card>
      )}
    </Stack>
  )
} 