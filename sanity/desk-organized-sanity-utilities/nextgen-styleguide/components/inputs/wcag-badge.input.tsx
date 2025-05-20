// WCAG Badge Input Component for nextgen-styleguide
// Displays WCAG compliance badges next to color inputs
import React, {useCallback, useEffect, useState} from 'react'
import {Box, Card, Flex, Stack, Text, useTheme} from '@sanity/ui'
import {ObjectInputProps, set, unset} from 'sanity'
import {WCAGUtils} from '../../schema/fields/wcag-color-pair.field'

// Define a more specific type for our input component
type WcagBadgeInputProps = ObjectInputProps & {
  parent?: Record<string, any>
  path: string[]
}

/**
 * WCAG Badge Input Component
 * Extends the default color input in Sanity Studio to show WCAG compliance badges
 */
export default function WcagBadgeInput(props: WcagBadgeInputProps) {
  const {
    value,
    onChange,
    schemaType,
    readOnly,
    renderDefault,
  } = props

  const theme = useTheme()
  const [contrastRatio, setContrastRatio] = useState<number>(0)
  const [complianceLevel, setComplianceLevel] = useState<string>('')
  const [badgeColor, setBadgeColor] = useState<string>('#888888')

  // Get paired color values from the parent object
  const parentValue = props.parent as Record<string, any>
  const background = parentValue?.background?.hex
  const foreground = parentValue?.foreground?.hex

  // Calculate contrast ratio and update badge when colors change
  useEffect(() => {
    if (background && foreground) {
      const ratio = WCAGUtils.getContrastRatio(background, foreground)
      const level = WCAGUtils.getComplianceLevel(ratio)
      const color = WCAGUtils.getBadgeColor(level)
      
      setContrastRatio(ratio)
      setComplianceLevel(level)
      setBadgeColor(color)

      // Update the contrastRatio and wcagCompliance fields if they exist
      if (parentValue && parentValue.contrastRatio !== undefined) {
        // Path is relative to the parent object
        onChange(set(Math.round(ratio * 100) / 100, ['contrastRatio']))
      }
      
      if (parentValue && parentValue.wcagCompliance !== undefined) {
        onChange(set(level, ['wcagCompliance']))
      }
    }
  }, [background, foreground, onChange, parentValue])
  
  // Style based on compliance level
  const getBadgeStyle = useCallback(() => {
    return {
      background: badgeColor,
      color: '#FFFFFF',
      fontWeight: 600,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      marginLeft: '8px',
    }
  }, [badgeColor])

  // Don't render badge if we are still at the top level
  if (props.path.length <= 1) {
    return renderDefault(props)
  }

  // Extract last segment to determine if we're on a background or foreground field
  const fieldName = props.path[props.path.length - 1]
  
  // Only render badge next to foreground field
  if (fieldName !== 'foreground') {
    return renderDefault(props)
  }
  
  // Create badge with contrast ratio
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
                Contrast: {contrastRatio.toFixed(2)}:1
              </Text>
              
              <Box marginLeft={2}>
                <div style={getBadgeStyle()}>
                  {complianceLevel}
                </div>
              </Box>
            </Flex>
          </Card>
        </Flex>
      )}
      
      {/* Show warning when contrast is below AA standard */}
      {contrastRatio > 0 && contrastRatio < 4.5 && (
        <Card padding={3} radius={2} tone="caution">
          <Text size={1}>
            Warning: Contrast ratio is below WCAG AA standard (4.5:1).
            This may cause accessibility issues for users with low vision.
          </Text>
        </Card>
      )}
    </Stack>
  )
} 