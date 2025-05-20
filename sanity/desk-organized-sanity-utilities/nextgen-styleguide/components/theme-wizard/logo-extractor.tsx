/**
 * LogoExtractor Component
 * Handles logo upload and color extraction for theme generation
 */
import React, {useState, useCallback} from 'react'
import {Box, Card, Text, Button, Stack, Flex, Grid} from '@sanity/ui'
import {ImageIcon, UploadIcon, RefreshIcon} from '@sanity/icons'

// In a real implementation, we would use a color extraction library
// For this prototype, we'll simulate color extraction

interface LogoExtractorProps {
  onExtract: (colors: Record<string, string>) => void
  onCancel: () => void
}

/**
 * Component for uploading a logo and extracting its color palette
 */
export default function LogoExtractor({onExtract, onCancel}: LogoExtractorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<Record<string, string> | null>(null)
  
  // Handle file upload
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
    
    // Simulate color extraction (in a real implementation, we would use a library)
    simulateColorExtraction(imageUrl)
  }, [])
  
  // Simulated color extraction (would be replaced with an actual algorithm)
  const simulateColorExtraction = (imageUrl: string) => {
    // In a real implementation, we would analyze the image and extract colors
    // For now, we'll use a timeout to simulate processing and return predetermined colors
    setTimeout(() => {
      // Simulated extracted colors
      const colors = {
        primary: '#3b82f6',
        secondary: '#f97316',
        accent: '#14b8a6',
        neutral: '#64748b',
        background: '#ffffff',
        text: '#1e293b'
      }
      
      setExtractedColors(colors)
    }, 1500)
  }
  
  // Use the extracted colors to generate a theme
  const handleUseColors = () => {
    if (extractedColors) {
      onExtract(extractedColors)
    }
  }
  
  return (
    <Stack space={4}>
      <Text size={2} weight="semibold">Upload your logo to extract colors:</Text>
      
      {/* Upload area */}
      <Card 
        padding={4} 
        radius={2} 
        tone="primary" 
        border
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!uploadedImage ? (
          // Upload prompt
          <>
            <Box marginBottom={3}>
              <ImageIcon fontSize={32} />
            </Box>
            <Text align="center" size={1} muted style={{maxWidth: '300px', marginBottom: '1rem'}}>
              Drag & drop a PNG or JPG logo, or click to browse
            </Text>
            <Button text="Choose file" icon={UploadIcon} tone="primary" />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </>
        ) : (
          // Display uploaded image
          <>
            <img
              src={uploadedImage}
              alt="Uploaded logo"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                objectFit: 'contain'
              }}
            />
            <Button
              text="Upload different image"
              icon={RefreshIcon}
              tone="primary"
              onClick={() => {
                setUploadedImage(null)
                setExtractedColors(null)
              }}
              style={{marginTop: '1rem'}}
            />
          </>
        )}
      </Card>
      
      {/* Extracted colors display */}
      {extractedColors && (
        <Card padding={3} radius={2} border>
          <Stack space={3}>
            <Text size={2} weight="semibold">Extracted Colors:</Text>
            
            <Grid columns={[2, 3]} gap={2}>
              {Object.entries(extractedColors).map(([name, color]) => (
                <Card key={name} padding={2} radius={1} border>
                  <Stack space={2}>
                    <Box 
                      style={{
                        backgroundColor: color,
                        height: '40px',
                        borderRadius: 'var(--border-radius-small)',
                        border: '1px solid var(--card-border-color)'
                      }} 
                    />
                    <Flex justify="space-between" align="center">
                      <Text size={1} muted style={{textTransform: 'capitalize'}}>{name}</Text>
                      <Text size={0} muted>{color}</Text>
                    </Flex>
                  </Stack>
                </Card>
              ))}
            </Grid>
            
            <Button 
              text="Use these colors" 
              tone="positive" 
              onClick={handleUseColors}
              style={{marginTop: '0.5rem'}}
            />
          </Stack>
        </Card>
      )}
      
      <Flex justify="space-between">
        <Button
          mode="ghost"
          text="Back to presets"
          onClick={onCancel}
        />
      </Flex>
    </Stack>
  )
} 