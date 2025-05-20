/**
 * ColorDisplayInput Component
 * 
 * Custom input component that directly displays color swatches from the document
 * without relying on the default color input component
 */
import React, {useEffect, useState} from 'react'
import {
  Stack,
  Card,
  Flex,
  Box,
  Text,
  useToast,
  Button,
  Spinner
} from '@sanity/ui'
import {useClient, useFormValue} from 'sanity'

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
  const fetchDocument = async () => {
    if (documentId) {
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
            description: 'The color display component is now actively monitoring color changes',
            closable: true,
            duration: 3000,
          })
        }
      } catch (error) {
        console.error('Error fetching document data:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchDocument()
    
    // Set up periodic refresh - more frequent initially to catch updates faster
    const initialRefreshInterval = setInterval(() => {
      fetchDocument()
    }, 2000) // Refresh every 2 seconds initially
    
    // After 30 seconds, switch to a less frequent refresh schedule to reduce load
    const slowRefreshTimeout = setTimeout(() => {
      clearInterval(initialRefreshInterval)
      
      const ongoingRefreshInterval = setInterval(() => {
        fetchDocument() 
      }, 5000) // Refresh every 5 seconds for ongoing work
      
      return () => clearInterval(ongoingRefreshInterval)
    }, 30000) // After 30 seconds
    
    return () => {
      clearInterval(initialRefreshInterval)
      clearTimeout(slowRefreshTimeout)
    }
  }, [documentId]) // Only re-run if document ID changes

  // Extract color values
  const primaryColorBg = documentData?.primaryColor?.wcagColorPair?.background?.hex || '#CCCCCC'
  const primaryColorFg = documentData?.primaryColor?.wcagColorPair?.foreground?.hex || '#333333'
  const secondaryColorBg = documentData?.secondaryColor?.wcagColorPair?.background?.hex || '#CCCCCC'
  const secondaryColorFg = documentData?.secondaryColor?.wcagColorPair?.foreground?.hex || '#333333'

  // Render a manual refresh button
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

  // Determine if this is the colorDisplay field or a regular color field
  const isColorDisplayField = props.schemaType.name === 'colorDisplay'
  
  return (
    <Stack space={4}>
      {/* Render the default input */}
      {renderDefault(props)}
   
      {/* Only show our detailed preview for the colorDisplay field */}
      {isColorDisplayField && (
        <Card padding={4} radius={2} shadow={1} tone="primary">
          <Stack space={4}>
            <Flex align="center" justify="space-between">
              <Text weight="semibold" size={2}>Live Color Preview</Text>
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
            
            <Flex direction="column" gap={4}>
              {/* Primary Color */}
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={3}>
                  <Text size={2} weight="semibold">Primary Color</Text>
                  <Flex gap={3}>
                    <Box style={{
                      width: '100px',
                      height: '40px',
                      background: primaryColorBg,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }} />
                    <Box>
                      <Text size={1}>Background: {primaryColorBg}</Text>
                      <Text size={1}>Foreground: {primaryColorFg}</Text>
                    </Box>
                  </Flex>
                  <Card padding={3} style={{
                    background: primaryColorBg,
                    color: primaryColorFg
                  }}>
                    <Text align="center" weight="bold">Sample Text</Text>
                  </Card>
                </Stack>
              </Card>
              
              {/* Secondary Color */}
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={3}>
                  <Text size={2} weight="semibold">Secondary Color</Text>
                  <Flex gap={3}>
                    <Box style={{
                      width: '100px',
                      height: '40px',
                      background: secondaryColorBg,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }} />
                    <Box>
                      <Text size={1}>Background: {secondaryColorBg}</Text>
                      <Text size={1}>Foreground: {secondaryColorFg}</Text>
                    </Box>
                  </Flex>
                  <Card padding={3} style={{
                    background: secondaryColorBg,
                    color: secondaryColorFg
                  }}>
                    <Text align="center" weight="bold">Sample Text</Text>
                  </Card>
                </Stack>
              </Card>
            </Flex>
            
            <Flex justify="flex-end" align="center" gap={3}>
              <Text size={0} muted>Auto-refreshed {refreshCount} times</Text>
              <Text size={0} muted>Last refresh: {lastRefresh}</Text>
            </Flex>
            
            <Card padding={3} tone="caution">
              <Text size={1}>
                If you don't see your colors updating in the regular inputs, please use this preview to see the actual colors applied to your document.
              </Text>
            </Card>
          </Stack>
        </Card>
      )}
    </Stack>
  )
} 