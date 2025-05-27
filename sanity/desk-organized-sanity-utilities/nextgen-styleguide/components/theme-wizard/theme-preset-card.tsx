/**
 * ThemePresetCard Component
 * Displays a visual card for a theme preset with color preview
 */
import React from 'react'
import {Card, Flex, Text, Box, Stack, Badge} from '@sanity/ui'
import {ThemePreset} from './theme-presets'

interface ThemePresetCardProps {
  preset: ThemePreset
  isSelected?: boolean
  isLoading?: boolean
  onClick: () => void
}

/**
 * Card component that displays a theme preset with color preview
 */
export default function ThemePresetCard({
  preset, 
  isSelected, 
  isLoading,
  onClick
}: ThemePresetCardProps) {
  const {name, description, icon: Icon, primaryColor, secondaryColor, textColor, backgroundColor} = preset
  
  // Get feature counts for display
  const hasPrimaryColors = preset.values.primaryColors?.length > 0
  const hasSecondaryColors = preset.values.secondaryColors?.length > 0
  const hasColorPalette = preset.values.colorPalette?.length > 0
  const colorCount = preset.values.primaryColors?.length || 0 + preset.values.secondaryColors?.length || 0
  const paletteCount = preset.values.colorPalette?.length || 0

  // If we have a color palette, show a color swatch grid
  const renderColorPalette = (palette: any[], title: string) => {
    if (!palette || palette.length === 0) return null;
    
    // Process each palette color (limit to first 3)
    const colorBoxes = palette.slice(0, 3).map((paletteItem, index) => {
      // Correctly access nested colorPair structure
      const backgroundColor = paletteItem.colorPair?.background?.hex || '#cccccc';
      
      return (
        <Box 
          key={index}
          flex={1} 
          style={{
            height: '8px', 
            background: backgroundColor
          }} 
        />
      );
    });

    return (
      <Flex gap={1}>
        {colorBoxes}
      </Flex>
    );
  }

  return (
    <Card 
      padding={3}
      radius={2}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        opacity: isLoading ? 0.5 : 1,
        border: isSelected ? '2px solid #2276FC' : '1px solid #e2e8f0',
        transition: 'all 0.2s ease'
      }}
    >
      <Stack space={3}>
        {/* Header with icon and title */}
        <Flex align="center" gap={2}>
          {Icon && <Icon />}
          <Stack space={2} flex={1}>
            <Text weight="semibold">{name}</Text>
            <Text size={1} muted>{description}</Text>
          </Stack>
        </Flex>
        
        {/* Feature badges */}
        <Flex gap={1} wrap="wrap">
          {hasPrimaryColors && <Badge tone="primary">Primary Colors</Badge>}
          {hasSecondaryColors && <Badge tone="positive">Secondary Colors</Badge>}
          {hasColorPalette && <Badge tone="caution">Color Palette ({paletteCount})</Badge>}
        </Flex>
        
        {/* Color previews */}
        {hasPrimaryColors && renderColorPalette(preset.values.primaryColors, 'Primary Colors')}
        {hasSecondaryColors && renderColorPalette(preset.values.secondaryColors, 'Secondary Colors')}
        {hasColorPalette && renderColorPalette(preset.values.colorPalette, 'Color Palette')}
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