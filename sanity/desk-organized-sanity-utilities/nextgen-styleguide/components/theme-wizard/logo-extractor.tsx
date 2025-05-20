/**
 * LogoExtractor Component
 * Handles logo upload and color extraction for theme generation
 */
import React, {useState, useCallback} from 'react'
import {Box, Card, Text, Button, Stack, Flex, Grid} from '@sanity/ui'
// Using inline SVG for icons to avoid dependency on @sanity/icons
const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.999 19.549 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.451 2.999 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.001 4.451 21 5V19C21 19.55 20.804 20.021 20.412 20.413C20.02 20.805 19.549 21.001 19 21H5ZM5 19H19V5H5V19ZM7 17H17L13.5 12L11 15.5L9.5 13.5L7 17Z" fill="currentColor" />
  </svg>
)

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 19V16H5V19H19V16H21V19C21 19.55 20.804 20.021 20.412 20.413C20.02 20.805 19.549 21.001 19 21H5C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.999 19.549 3 19ZM13 13.175L17.15 9.025L18.575 10.45L13 16.025L7.425 10.45L8.85 9.025L13 13.175ZM13 3V13.175L11 11.175V3H13Z" fill="currentColor" />
  </svg>
)

const RefreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20C9.783 20 7.8755 19.221 6.277 17.662C4.6785 16.103 3.867 14.199 3.844 11.95H5.844C5.867 13.717 6.5205 15.1875 7.8045 16.3615C9.0885 17.5355 10.6113 18.1217 12.373 18.12C14.156 18.12 15.6903 17.5125 16.976 16.2975C18.2617 15.0825 18.9047 13.575 18.905 11.775C18.905 9.975 18.2667 8.46125 16.99 7.23375C15.7133 6.00625 14.156 5.3925 12.318 5.3925C11.3803 5.3925 10.5033 5.57125 9.687 5.92875C8.8707 6.28625 8.1427 6.80017 7.503 7.4705H9.5V9.0705H5V4.5705H6.6V6.5505C7.367 5.75717 8.2705 5.13542 9.3105 4.68525C10.3505 4.23508 11.4513 4.01 12.613 4.01C13.8863 4.01 15.0693 4.28708 16.162 4.84125C17.2547 5.39542 18.171 6.15025 18.911 7.10575C19.651 8.06125 20.021 9.125 20.021 10.297C20.021 12.647 19.221 14.5795 17.621 16.0945C16.021 17.6095 14.0907 18.3667 11.83 18.365L12 20Z" fill="currentColor" />
  </svg>
)

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
              <ImageIcon />
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