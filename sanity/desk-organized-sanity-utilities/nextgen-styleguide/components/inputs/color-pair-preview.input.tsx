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
 * Color Preview Component
 * Displays a visual preview of background and foreground color combinations
 */
const ColorPreview = ({background, foreground}) => {
  // Don't render if we don't have both colors
  if (!background || !foreground) return null;
  
  return (
    <Stack space={2}>
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
      
      {/* Preview of how text will look with these colors */}
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
    </Stack>
  );
};

/**
 * Color Pair Preview Input Component
 * Extends the default color input in Sanity Studio to show a visual preview of color combinations
 * Works with both traditional color pairs and the new array-based structure
 */
export default function ColorPairPreviewInput(props: ColorPairPreviewInputProps) {
  const {
    renderDefault,
  } = props

  // Don't render preview if we are still at the top level
  if (props.path.length <= 1) {
    return renderDefault(props)
  }

  // Extract path segments to determine context
  const pathSegments = props.path || []
  const fieldName = pathSegments[pathSegments.length - 1] || ''
  
  // Try to determine parent context by examining the path
  let isColorField = false
  let isInWcagPair = false
  let parentValue: Record<string, any> | null = null
  
  // Check if we're in a colorPair field structure
  for (let i = 0; i < pathSegments.length; i++) {
    if (pathSegments[i] === 'colorPair') {
      isInWcagPair = true
      break
    }
  }
  
  // Check if we're in a color field
  isColorField = props.schemaType?.name === 'color' || fieldName === 'background' || fieldName === 'foreground'
  
  // Only render preview for color fields in color pairs
  if (!isColorField || !isInWcagPair || fieldName !== 'foreground') {
    return renderDefault(props)
  }
  
  try {
    // Get color values from the parent object
    parentValue = props.parent as Record<string, any>
    
    // Safely extract color values
    const background = parentValue?.background?.hex
    const foreground = parentValue?.foreground?.hex
    
    // Only render preview if we have valid colors
    if (background && foreground) {
      return (
        <Stack space={2}>
          {renderDefault(props)}
          
          <ColorPreview background={background} foreground={foreground} />
        </Stack>
      )
    }
  } catch (err) {
    console.error('Error rendering color preview:', err)
  }
  
  // If we can't get valid colors or encounter an error, just render the default
  return renderDefault(props)
} 