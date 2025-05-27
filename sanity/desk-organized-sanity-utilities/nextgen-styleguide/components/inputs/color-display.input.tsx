/**
 * ColorDisplayInput Component
 * 
 * Custom input component that displays color arrays from the document
 * in a clean, organized way with automatic refresh functionality.
 */
import React, {useEffect, useState, useCallback} from 'react'
import {
  Stack,
  Card,
  Flex,
  Box,
  Text,
  useToast,
  Button,
  Spinner,
  Badge,
  Grid,
  Label,
  Inline
} from '@sanity/ui'
import {useClient, useFormValue} from 'sanity'


// Accessible color swatch with enhanced visual display
const ColorSwatch = ({
  colorName,
  background,
  foreground,
  showSample = true,
  showShades = true
}) => {
  // Fallback for missing colors
  const bgColor = background || '#EEEEEE'
  const fgColor = foreground || '#333333'
  
  return (
    <Card padding={3} radius={2} shadow={1} marginY={2}>
      <Stack space={3}>
        <Flex align="center" justify="space-between">
          <Text size={2} weight="semibold">{colorName || 'Unnamed Color'}</Text>
          <Inline space={2}>
            {/* Color type badges */}
            {colorName?.toLowerCase().includes('primary') && (
              <Badge tone="primary" padding={1}>Primary</Badge>
            )}
            {colorName?.toLowerCase().includes('secondary') && (
              <Badge tone="positive" padding={1}>Secondary</Badge>
            )}
          </Inline>
        </Flex>
        
        <Flex align="flex-start" gap={3}>
          {/* Enhanced color display with shades */}
          <Card shadow={1} radius={2} overflow="hidden" style={{ minWidth: '120px' }}>
            <Stack>
              {/* Main color swatch */}
              <Box style={{
                height: '80px',
                background: bgColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: fgColor,
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}>
                Aa
              </Box>
              
              {/* Color shades preview (only if showShades is true) */}
              {showShades && (
                <Flex>
                  {/* Lighter shades */}
                  <Box style={{ flex: 1, height: '24px', background: addOpacity(bgColor, 0.25) }} />
                  <Box style={{ flex: 1, height: '24px', background: addOpacity(bgColor, 0.5) }} />
                  <Box style={{ flex: 1, height: '24px', background: addOpacity(bgColor, 0.75) }} />
                  <Box style={{ flex: 1, height: '24px', background: bgColor }} />
                </Flex>
              )}
            </Stack>
          </Card>
          
          {/* Color information details */}
          <Box flex={1}>
            <Stack space={2}>
              <ColorInfoRow label="Hex" value={bgColor} isColor={true} />
            </Stack>
          </Box>
        </Flex>
        
        {/* Text sample with the selected colors */}
        {showSample && (
          <Card padding={3} style={{
            background: bgColor,
            color: fgColor,
            border: '1px solid #eee',
            borderRadius: '4px'
          }}>
            <Stack space={3}>
              <Text align="center" weight="bold" size={2}>Heading Example</Text>
              <Text size={1}>This sample text shows how content will appear with these colors. Good contrast between background and text is essential for readability and accessibility.</Text>
              <Flex>
                <Button text="Sample Button" mode="ghost" style={{ margin: '0 auto' }} />
              </Flex>
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  );
};

// Helper function to add opacity to hex colors
const addOpacity = (hexColor, opacity) => {
  try {
    // Remove # if present
    hexColor = (hexColor || '#CCCCCC').replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Return rgba color
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } catch (err) {
    console.warn('Error calculating color opacity:', err)
    return `rgba(204, 204, 204, ${opacity})`; // Fallback gray with opacity
  }
};

// Enhanced color info row with better formatting and visual indicators
const ColorInfoRow = ({label, value, isColor = false, badge = null}) => (
  <Flex align="center" gap={2}>
    <Text size={1} style={{ width: '70px', fontWeight: 'medium' }}>{label}:</Text>
    <Flex align="center" gap={2}>
      {isColor && (
        <Box style={{
          width: '16px',
          height: '16px',
          background: value,
          border: '1px solid #ddd',
          borderRadius: '3px',
          display: 'inline-block',
          marginRight: '4px'
        }} />
      )}
      <Text size={1} muted style={{ 
        fontFamily: isColor ? 'monospace' : 'inherit',
        fontWeight: isColor ? 'bold' : 'normal'
      }}>
        {value}
      </Text>
      
      {badge && (
        <Badge 
          tone={
            badge === 'AAA' ? 'positive' : 
            badge === 'AA' ? 'primary' : 
            badge === 'AA Large' ? 'caution' : 
            'critical'
          } 
          padding={1}
          fontSize={0}
        >
          {badge}
        </Badge>
      )}
    </Flex>
  </Flex>
);

// Enhanced color array display component with grid for multiple colors
const ColorArrayDisplay = ({colors, title}) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!colors || colors.length === 0) {
    return (
      <Card padding={3} tone="caution" marginY={2}>
        <Text size={1}>No {title.toLowerCase()} colors defined.</Text>
      </Card>
    );
  }
  
  const displayColors = showAll ? colors : colors.slice(0, 2);
  const hasMoreColors = colors.length > 2;
  
  // Make sure colors are processed correctly
  const processedColors = displayColors.map(color => {
    // Normalize data structure to handle different formats
    const processedColor = {
      _key: color._key || Math.random().toString(36).substring(2, 9),
      colorName: color.colorName || `${title} ${colors.indexOf(color) + 1}`,
      background: color.colorPair?.background?.hex || '#CCCCCC',
      foreground: color.colorPair?.foreground?.hex || '#333333'
    }
    
    return processedColor
  })
  
  return (
    <Stack space={3}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={2}>
          <Text size={2} weight="medium">{title}</Text>
          <Badge padding={1}>{colors.length}</Badge>
        </Flex>
        
        {hasMoreColors && (
          <Button 
            text={showAll ? "Show Fewer" : "Show All"} 
            mode="ghost" 
            onClick={() => setShowAll(!showAll)}
            size={0}
          />
        )}
      </Flex>
      
      {/* Use grid for multiple colors, stack for single color */}
      {processedColors.length > 1 ? (
        <Grid columns={[1, 1, 2]} gap={3}>
          {processedColors.map((color, index) => (
            <ColorSwatch
              key={color._key || `${title}-${index}`}
              colorName={color.colorName}
              background={color.background}
              foreground={color.foreground}
              showShades={true}
            />
          ))}
        </Grid>
      ) : (
        <Stack space={2}>
          {processedColors.map((color, index) => (
            <ColorSwatch
              key={color._key || `${title}-${index}`}
              colorName={color.colorName}
              background={color.background}
              foreground={color.foreground}
              showShades={true}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

// Palette color swatch component for displaying multiple shades
const PaletteColorSwatch = ({palette}) => {
  if (!palette || !palette.shades || palette.shades.length === 0) return null;
  
  const baseColor = palette.colorPair?.background?.hex || '#CCCCCC';
  
  return (
    <Card padding={3} radius={2} shadow={1} marginY={2}>
      <Stack space={3}>
        <Text size={2} weight="semibold">{palette.name || 'Unnamed Palette'}</Text>
        
        {/* Shades display */}
        <Flex>
          {palette.shades.map((shade, i) => (
            <Box 
              key={shade._key || i}
              style={{
                flex: 1,
                height: '30px',
                background: shade.value?.hex || '#CCCCCC',
                borderRight: i < palette.shades.length - 1 ? '1px solid #fff' : 'none',
                borderTopLeftRadius: i === 0 ? '4px' : '0',
                borderBottomLeftRadius: i === 0 ? '4px' : '0',
                borderTopRightRadius: i === palette.shades.length - 1 ? '4px' : '0',
                borderBottomRightRadius: i === palette.shades.length - 1 ? '4px' : '0',
              }}
              title={`${shade.name}: ${shade.value?.hex}`}
            />
          ))}
        </Flex>
        
        {/* Base color info */}
        <Flex align="center" gap={2}>
          <Box style={{
            width: '40px',
            height: '40px',
            background: baseColor,
            border: '1px solid #ddd',
            borderRadius: '4px',
          }} />
          <Box>
            <Text size={1} weight="semibold">{palette.name}</Text>
            <Text size={1} muted style={{ fontFamily: 'monospace' }}>{baseColor}</Text>
          </Box>
        </Flex>
      </Stack>
    </Card>
  );
};

// Color palette display component
const ColorPaletteDisplay = ({palettes}) => {
  if (!palettes || palettes.length === 0) {
    return null;
  }
  
  return (
    <Stack space={3}>
      <Flex align="center" gap={2}>
        <Text size={2} weight="medium">Color Palette</Text>
        <Badge padding={1}>{palettes.length}</Badge>
      </Flex>
      
      <Grid columns={[1, 2, 3]} gap={3}>
        {palettes.map((palette, index) => (
          <PaletteColorSwatch key={palette._key || `palette-${index}`} palette={palette} />
        ))}
      </Grid>
    </Stack>
  );
};

// Accept the standard props that Sanity Studio passes to input components
export default function ColorDisplayInput(props: any) {
  const {renderDefault} = props
  const client = useClient({apiVersion: '2023-01-01'})
  const toast = useToast()
  const [documentData, setDocumentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)
  const [lastRefresh, setLastRefresh] = useState<string>('Never')
  const [showPalette, setShowPalette] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Get the document ID from the form
  const documentId = useFormValue(['_id']) as string | undefined
  
  // Fetch document data directly to ensure we have the latest values
  const fetchDocument = useCallback(async () => {
    if (!documentId) {
      setError('No document ID available')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await client.getDocument(documentId)
      setDocumentData(data)
      setLastRefresh(new Date().toLocaleTimeString())
      setRefreshCount(prev => prev + 1)
      
      if (refreshCount === 1) {
        toast.push({
          status: 'info',
          title: 'Color Display Active',
          description: 'The color display component is now monitoring color changes',
          closable: true,
          duration: 3000,
        })
      }
    } catch (error) {
      console.error('Error fetching document data:', error)
      setError('Error loading color data')
    } finally {
      setIsLoading(false)
    }
  }, [client, documentId, refreshCount, toast])

  useEffect(() => {
    // Initial fetch
    fetchDocument()
    
    // Set up refresh interval - less frequent than before to reduce overhead
    const refreshInterval = setInterval(() => {
      fetchDocument()
    }, 5000) // Refresh every 5 seconds
    
    return () => clearInterval(refreshInterval)
  }, [fetchDocument]) // Include fetchDocument in dependencies

  // Get colors with proper fallbacks for different data structures
  const processColors = useCallback(() => {
    try {
      // Initialize color arrays
      let primaryColors = []
      let secondaryColors = []
      
      // Process the newer array-based structure - primaryColors array
      if (documentData?.primaryColors && Array.isArray(documentData.primaryColors)) {
        primaryColors = documentData.primaryColors
      }
      
      // Process the newer array-based structure - secondaryColors array
      if (documentData?.secondaryColors && Array.isArray(documentData.secondaryColors)) {
        secondaryColors = documentData.secondaryColors
      }
      
      // Add legacy colors if arrays are empty (backward compatibility)
      if (primaryColors.length === 0 && documentData?.primaryColor?.colorPair) {
        primaryColors.push({
          _key: 'legacy-primary',
          colorName: 'Primary (Legacy)',
          colorPair: documentData.primaryColor.colorPair
        })
      }
      
      if (secondaryColors.length === 0 && documentData?.secondaryColor?.colorPair) {
        secondaryColors.push({
          _key: 'legacy-secondary',
          colorName: 'Secondary (Legacy)',
          colorPair: documentData.secondaryColor.colorPair
        })
      }
      
      // Get color palette
      const colorPalette = documentData?.colorPalette || []
      
      return {
        primaryColors,
        secondaryColors,
        colorPalette
      }
    } catch (err) {
      console.error('Error processing colors:', err)
      return {
        primaryColors: [],
        secondaryColors: [],
        colorPalette: []
      }
    }
  }, [documentData])
  
  // Get processed colors
  const {primaryColors, secondaryColors, colorPalette} = processColors()

  // Handle manual refresh
  const handleManualRefresh = async () => {
    await fetchDocument()
    toast.push({
      status: 'success',
      title: 'Colors Refreshed',
      description: 'The color display has been manually refreshed',
      closable: true,
      duration: 2000,
    })
  }

  // Only show detailed preview for the colorDisplay field
  const isColorDisplayField = props.schemaType.name === 'colorDisplay'
  
  return (
    <Stack space={4}>
      {/* Render the default input */}
      {renderDefault(props)}
   
      {/* Only show our detailed preview for the colorDisplay field */}
      {isColorDisplayField && (
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Flex align="center" justify="space-between">
              <Text weight="semibold" size={2}>Color Palette Preview</Text>
              <Flex align="center" gap={3}>
                {isLoading && <Spinner muted />}
                {colorPalette && colorPalette.length > 0 && (
                  <Button 
                    text={showPalette ? "Hide Full Palette" : "Show Full Palette"} 
                    mode="ghost" 
                    onClick={() => setShowPalette(!showPalette)}
                    title="Toggle full color palette display"
                  />
                )}
                <Button 
                  text="Refresh"
                  mode="ghost" 
                  onClick={handleManualRefresh}
                  disabled={isLoading}
                  title="Manually refresh color preview"
                />
              </Flex>
            </Flex>
            
            {/* Error message if needed */}
            {error && (
              <Card padding={3} tone="critical" marginY={2}>
                <Text size={1}>{error}</Text>
              </Card>
            )}
            
            {/* Color Arrays Display */}
            <ColorArrayDisplay colors={primaryColors} title="Primary Colors" />
            <ColorArrayDisplay colors={secondaryColors} title="Secondary Colors" />
            
            {/* Full palette display (optional) */}
            {showPalette && colorPalette.length > 0 && (
              <ColorPaletteDisplay palettes={colorPalette} />
            )}
            
            <Flex justify="flex-end" align="center" gap={3}>
              <Text size={0} muted>Auto-refreshed {refreshCount} times</Text>
              <Text size={0} muted>Last refresh: {lastRefresh}</Text>
            </Flex>
            
            {refreshCount === 0 && !error && (
              <Card padding={3} tone="caution">
                <Text size={1}>
                  Loading color data... If you don't see your colors, please try refreshing.
                </Text>
              </Card>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  )
} 