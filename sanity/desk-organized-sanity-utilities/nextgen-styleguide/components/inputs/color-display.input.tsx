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
  Badge
} from '@sanity/ui'
import {useClient, useFormValue} from 'sanity'

// Color swatch component for reuse
const ColorSwatch = ({
  colorName,
  background,
  foreground,
  showSample = true
}) => (
  <Card padding={3} radius={2} shadow={1} marginY={2}>
    <Stack space={3}>
      <Flex align="center" justify="space-between">
        <Text size={2} weight="semibold">{colorName}</Text>
        {/* Optional badge for primary/secondary indicators */}
        {colorName.toLowerCase().includes('primary') && (
          <Badge tone="primary" padding={1}>Primary</Badge>
        )}
        {colorName.toLowerCase().includes('secondary') && (
          <Badge tone="positive" padding={1}>Secondary</Badge>
        )}
      </Flex>
      
      <Flex gap={3}>
        <Box style={{
          width: '100px',
          height: '40px',
          background: background,
          border: '1px solid #ddd',
          borderRadius: '4px',
        }} />
        <Box>
          <Text size={1}>Background: {background}</Text>
          <Text size={1}>Foreground: {foreground}</Text>
        </Box>
      </Flex>
      
      {showSample && (
        <Card padding={3} style={{
          background: background,
          color: foreground
        }}>
          <Text align="center" weight="bold">Sample Text</Text>
        </Card>
      )}
    </Stack>
  </Card>
);

// Color array display component
const ColorArrayDisplay = ({colors, title}) => {
  if (!colors || colors.length === 0) {
    return (
      <Card padding={3} tone="caution" marginY={2}>
        <Text size={1}>No {title.toLowerCase()} colors defined.</Text>
      </Card>
    );
  }
  
  return (
    <Stack space={2}>
      <Text size={2} weight="medium">{title}</Text>
      {colors.map((color, index) => (
        <ColorSwatch
          key={`${title}-${index}`}
          colorName={color.colorName || `${title} ${index + 1}`}
          background={color.wcagColorPair?.background?.hex || '#CCCCCC'}
          foreground={color.wcagColorPair?.foreground?.hex || '#333333'}
        />
      ))}
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
  
  // Get the document ID from the form
  const documentId = useFormValue(['_id']) as string | undefined
  
  // Fetch document data directly to ensure we have the latest values
  const fetchDocument = useCallback(async () => {
    if (!documentId) return;
    
    setIsLoading(true)
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

  // Support both new array fields and legacy single color fields
  const primaryColors = documentData?.primaryColors || []
  const secondaryColors = documentData?.secondaryColors || []
  
  // Support legacy color format for backward compatibility
  if (documentData?.primaryColor?.wcagColorPair && primaryColors.length === 0) {
    primaryColors.push({
      colorName: 'Primary (Legacy)',
      wcagColorPair: documentData.primaryColor.wcagColorPair
    })
  }
  
  if (documentData?.secondaryColor?.wcagColorPair && secondaryColors.length === 0) {
    secondaryColors.push({
      colorName: 'Secondary (Legacy)',
      wcagColorPair: documentData.secondaryColor.wcagColorPair
    })
  }

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
                <Button 
                  text="Refresh"
                  mode="ghost" 
                  onClick={handleManualRefresh}
                  disabled={isLoading}
                  title="Manually refresh color preview"
                />
              </Flex>
            </Flex>
            
            {/* Color Arrays Display */}
            <ColorArrayDisplay colors={primaryColors} title="Primary Colors" />
            <ColorArrayDisplay colors={secondaryColors} title="Secondary Colors" />
            
            <Flex justify="flex-end" align="center" gap={3}>
              <Text size={0} muted>Auto-refreshed {refreshCount} times</Text>
              <Text size={0} muted>Last refresh: {lastRefresh}</Text>
            </Flex>
            
            {refreshCount === 0 && (
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