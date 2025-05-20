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

  // Extract last segments to determine path context
  const fieldName = props.path[props.path.length - 1]
  const parentFieldName = props.path[props.path.length - 2]
  
  // Support both legacy wcagColorPair and new array structure
  const isColorField = props.schemaType.name === 'color';
  const isInWcagPair = parentFieldName === 'wcagColorPair';
  const isInArrayItem = 
    props.path.length >= 4 && 
    ['primaryColors', 'secondaryColors'].includes(props.path[props.path.length - 4]);
  
  // Only render preview for foreground field in color pairs
  if (!isColorField || !isInWcagPair || fieldName !== 'foreground') {
    return renderDefault(props)
  }
  
  // Get paired color values from the parent object
  const parentValue = props.parent as Record<string, any>
  const background = parentValue?.background?.hex
  const foreground = parentValue?.foreground?.hex
  
  // Create preview with color samples
  return (
    <Stack space={2}>
      {renderDefault(props)}
      
      <ColorPreview background={background} foreground={foreground} />
    </Stack>
  )
} 