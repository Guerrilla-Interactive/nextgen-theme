// WCAG Badge Input Component for nextgen-styleguide
// Displays WCAG compliance badges next to color inputs
import React, {useCallback, useEffect, useState} from 'react'
import {Box, Card, Flex, Stack, Text, useTheme} from '@sanity/ui'
import {ObjectInputProps, set} from 'sanity'
import {WCAGUtils} from '../../schema/fields/wcag-color-pair.field'

// Define a more specific type for our input component
type WcagBadgeInputProps = ObjectInputProps & {
  parent?: Record<string, any>
  path: string[]
}

/**
 * WCAG Badge Component
 * Displays the contrast ratio and compliance level between two colors
 */
const WcagBadge = ({contrastRatio, complianceLevel, badgeColor}) => (
  <Flex align="center" justify="flex-start" marginTop={2}>
    <Card padding={2} radius={2} tone="default">
      <Flex align="center">
        <Text size={1} weight="semibold">
          Contrast: {contrastRatio.toFixed(2)}:1
        </Text>
        
        <Box marginLeft={2}>
          <div style={{
            background: badgeColor,
            color: '#FFFFFF',
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
          }}>
            {complianceLevel}
          </div>
        </Box>
      </Flex>
    </Card>
  </Flex>
);

/**
 * Color Swatches Component
 * Displays color swatches for background and foreground
 */
const ColorSwatches = ({background, foreground}) => (
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
      </Flex>
    </Card>
  </Flex>
);

/**
 * Accessibility Warning Component
 * Displays a warning when contrast is below AA standard
 */
const AccessibilityWarning = ({contrastRatio}) => (
  contrastRatio > 0 && contrastRatio < 4.5 ? (
    <Card padding={3} radius={2} tone="caution">
      <Text size={1}>
        Warning: Contrast ratio is below WCAG AA standard (4.5:1).
        This may cause accessibility issues for users with low vision.
      </Text>
    </Card>
  ) : null
);

/**
 * WCAG Badge Input Component
 * Extends the default color input in Sanity Studio to show WCAG compliance badges
 * Works with both traditional color pairs and the new array-based structure
 */
export default function WcagBadgeInput(props: WcagBadgeInputProps) {
  const {
    onChange,
    renderDefault,
  } = props

  const [contrastRatio, setContrastRatio] = useState<number>(0)
  const [complianceLevel, setComplianceLevel] = useState<string>('')
  const [badgeColor, setBadgeColor] = useState<string>('#888888')

  // Don't render if we are still at the top level
  if (props.path.length <= 1) {
    return renderDefault(props)
  }

  // Extract path segments for context awareness
  const fieldName = props.path[props.path.length - 1]
  const parentFieldName = props.path[props.path.length - 2]
  
  // Support both legacy wcagColorPair and new array structure
  const isColorField = props.schemaType.name === 'color';
  const isInWcagPair = parentFieldName === 'wcagColorPair';
  
  // Only render for foreground field in color pairs
  if (!isColorField || !isInWcagPair || fieldName !== 'foreground') {
    return renderDefault(props)
  }
  
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
      if (parentValue && typeof parentValue.contrastRatio !== 'undefined') {
        // Path is relative to the parent object
        onChange(set(Math.round(ratio * 100) / 100, ['contrastRatio']))
      }
      
      if (parentValue && typeof parentValue.wcagCompliance !== 'undefined') {
        onChange(set(level, ['wcagCompliance']))
      }
    }
  }, [background, foreground, onChange, parentValue])
  
  // Create badge with contrast ratio
  return (
    <Stack space={2}>
      {renderDefault(props)}
      
      {background && foreground && (
        <>
          <ColorSwatches background={background} foreground={foreground} />
          <WcagBadge 
            contrastRatio={contrastRatio} 
            complianceLevel={complianceLevel} 
            badgeColor={badgeColor} 
          />
          <AccessibilityWarning contrastRatio={contrastRatio} />
        </>
      )}
    </Stack>
  )
} 