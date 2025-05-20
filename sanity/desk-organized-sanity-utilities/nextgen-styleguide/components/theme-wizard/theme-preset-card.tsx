/**
 * ThemePresetCard Component
 * Displays a visual card for a theme preset with color preview
 */
import React from 'react'
import {Card, Flex, Text, Box, Stack} from '@sanity/ui'
import {ThemePreset} from './theme-presets'

interface ThemePresetCardProps {
  preset: ThemePreset
  selected: boolean
  onSelect: () => void
}

/**
 * Card component that displays a theme preset with color preview
 */
export default function ThemePresetCard({preset, selected, onSelect}: ThemePresetCardProps) {
  const {name, description, icon: Icon, primaryColor, secondaryColor, textColor, backgroundColor} = preset

  return (
    <Card
      padding={3}
      radius={2}
      shadow={1}
      tone={selected ? 'primary' : 'default'}
      onClick={onSelect}
      style={{cursor: 'pointer'}}
    >
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <Box style={{color: primaryColor}}>
            <Icon />
          </Box>
          <Text weight="semibold" size={2}>{name}</Text>
        </Flex>
        
        <Text size={1} muted style={{minHeight: '2.5em'}}>{description}</Text>
        
        {/* Color preview */}
        <Flex gap={2}>
          <ColorBox color={primaryColor} />
          <ColorBox color={secondaryColor} />
          <Box flex={1}>
            <Card
              radius={1}
              padding={2}
              style={{
                backgroundColor,
                border: '1px solid var(--card-border-color)'
              }}
            >
              <Text size={0} style={{color: textColor}}>Aa</Text>
            </Card>
          </Box>
        </Flex>
      </Stack>
    </Card>
  )
}

/**
 * Simple color box component for displaying color swatches
 */
function ColorBox({color}: {color: string}) {
  return (
    <Box flex={1}>
      <Card
        radius={1}
        padding={2}
        style={{
          backgroundColor: color,
          border: '1px solid var(--card-border-color)'
        }}
      />
    </Box>
  )
} 