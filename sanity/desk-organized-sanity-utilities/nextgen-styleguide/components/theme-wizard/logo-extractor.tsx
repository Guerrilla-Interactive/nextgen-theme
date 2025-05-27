/**
 * LogoExtractor Component
 * Handles logo upload and color extraction for theme generation
 */
import React, {useState, useCallback} from 'react'
import {Box, Card, Text, Button, Stack, Flex, Grid, useToast} from '@sanity/ui'
import {useClient} from 'sanity'
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
  documentId?: string // Document ID for Sanity operations
}

/**
 * Simple function to determine a contrasting color (white or black)
 */
function determineContrastColor(hexColor: string): string {
  // Remove the # if it exists
  hexColor = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate perceived brightness (YIQ formula)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Return black for bright colors, white for dark colors
  return yiq >= 128 ? '#000000' : '#ffffff';
}

/**
 * Component for uploading a logo and extracting its color palette
 */
export default function LogoExtractor({onExtract, onCancel, documentId}: LogoExtractorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<Record<string, string> | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const client = useClient({apiVersion: '2023-01-01'})
  const toast = useToast()
  
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
  
  // Handle logo color extraction and theme generation
  const handleLogoExtraction = async (colors: Record<string, string>) => {
    setIsProcessing(true);
    
    try {
      // Get document ID
      const docId = documentId.startsWith('drafts.') 
        ? documentId 
        : `drafts.${documentId}`;
      
      // Create a transaction to update colors
      const tx = client.transaction();
      
      // Extract colors from the logo
      const primaryColor = colors.primary || '#3b82f6';
      const secondaryColor = colors.secondary || '#f97316';
      
      // Calculate contrasting foreground colors
      const primaryForeground = determineContrastColor(primaryColor);
      const secondaryForeground = determineContrastColor(secondaryColor);
      
      // Generate unique keys for array items
      const generateKey = () => Math.random().toString(36).substring(2, 15);
      
      // Update legacy fields for backward compatibility
      tx.patch(docId, patch => 
        patch.set({
          primaryColor: {
            colorPair: {
              title: 'Primary Color',
              background: { hex: primaryColor, alpha: 1 },
              foreground: { hex: primaryForeground, alpha: 1 }
            }
          },
          secondaryColor: {
            colorPair: {
              title: 'Secondary Color',
              background: { hex: secondaryColor, alpha: 1 },
              foreground: { hex: secondaryForeground, alpha: 1 }
            }
          }
        })
      );
      
      // Create array-based color fields with the correct nested structure
      const primaryColorObj = {
        _key: generateKey(),
        colorName: 'Primary Color',
        colorPair: {
          title: 'Primary Color',
          background: { hex: primaryColor, alpha: 1 },
          foreground: { hex: primaryForeground, alpha: 1 }
        }
      };
      
      const secondaryColorObj = {
        _key: generateKey(),
        colorName: 'Secondary Color',
        colorPair: {
          title: 'Secondary Color',
          background: { hex: secondaryColor, alpha: 1 },
          foreground: { hex: secondaryForeground, alpha: 1 }
        }
      };
      
      // Set arrays (preserving any existing items)
      tx.patch(docId, patch => {
        return patch
          .setIfMissing({ primaryColors: [] })
          .setIfMissing({ secondaryColors: [] })
          .insert('replace', 'primaryColors[0]', [primaryColorObj])
          .insert('replace', 'secondaryColors[0]', [secondaryColorObj]);
      });
      
      // Also generate a color palette with shades
      const generateShades = (baseColor: string) => {
        // Convert hex to RGB
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        
        // Generate shades by adjusting lightness
        const shades = [
          { name: '50', factor: 0.9 },
          { name: '100', factor: 0.8 },
          { name: '200', factor: 0.6 },
          { name: '300', factor: 0.4 },
          { name: '400', factor: 0.2 },
          { name: '500', factor: 0 },
          { name: '600', factor: -0.15 },
          { name: '700', factor: -0.3 },
          { name: '800', factor: -0.45 },
          { name: '900', factor: -0.6 },
          { name: '950', factor: -0.75 }
        ];
        
        return shades.map(shade => {
          const factor = shade.factor;
          let newR, newG, newB;
          
          if (factor > 0) {
            // Lighten
            newR = Math.min(255, r + (255 - r) * factor);
            newG = Math.min(255, g + (255 - g) * factor);
            newB = Math.min(255, b + (255 - b) * factor);
          } else {
            // Darken
            newR = Math.max(0, r * (1 + factor));
            newG = Math.max(0, g * (1 + factor));
            newB = Math.max(0, b * (1 + factor));
          }
          
          // Convert back to hex
          const hex = '#' + 
            Math.round(newR).toString(16).padStart(2, '0') + 
            Math.round(newG).toString(16).padStart(2, '0') + 
            Math.round(newB).toString(16).padStart(2, '0');
          
          return {
            _key: generateKey(),
            name: shade.name,
            value: {
              hex,
              alpha: 1
            }
          };
        });
      };
      
      // Add a color palette
      tx.patch(docId, patch => patch.set({
        colorPalette: [
          {
            _key: generateKey(),
            name: 'Primary',
            slug: { _type: 'slug', current: 'primary' },
            colorPair: {
              title: 'Primary',
              background: { hex: primaryColor, alpha: 1 },
              foreground: { hex: primaryForeground, alpha: 1 }
            },
            shades: generateShades(primaryColor)
          },
          {
            _key: generateKey(),
            name: 'Secondary',
            slug: { _type: 'slug', current: 'secondary' },
            colorPair: {
              title: 'Secondary',
              background: { hex: secondaryColor, alpha: 1 },
              foreground: { hex: secondaryForeground, alpha: 1 }
            },
            shades: generateShades(secondaryColor)
          }
        ]
      }));
      
      // Commit all changes
      await tx.commit();
      
      // Show success message
      toast.push({
        status: 'success',
        title: 'Colors Extracted',
        description: 'Theme colors have been extracted from your logo',
        closable: true,
      });
      
      // Notify parent
      if (onExtract) {
        onExtract({ primary: primaryColor, secondary: secondaryColor });
      }
    } catch (error) {
      console.error('Error extracting colors:', error);
      toast.push({
        status: 'error',
        title: 'Error',
        description: 'Failed to extract colors from the logo',
        closable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Use the extracted colors to generate a theme
  const handleUseColors = () => {
    if (extractedColors) {
      handleLogoExtraction(extractedColors)
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
              disabled={isProcessing}
              loading={isProcessing}
            />
          </Stack>
        </Card>
      )}
      
      <Flex justify="space-between">
        <Button
          mode="ghost"
          text="Back to presets"
          onClick={onCancel}
          disabled={isProcessing}
        />
      </Flex>
    </Stack>
  )
} 