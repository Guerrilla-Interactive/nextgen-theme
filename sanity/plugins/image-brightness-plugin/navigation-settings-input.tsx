import React, { useState, useEffect } from 'react'
import { Button, Card, Flex, Stack, Text, Spinner, Badge, Box } from '@sanity/ui'
import { ObjectInputProps, set, useClient, useFormValue } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

// Fraction of the image height to evaluate from the top (0 – 1)
const TOP_FRACTION = 0.15

// Direct pixel-based analysis of image brightness
async function analyzeImageBrightness(imageBlob: Blob): Promise<'dark' | 'light'> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    const handleImageLoad = () => {
      // Create canvas for image analysis
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(img.src); // Clean up URL
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      // Draw the image
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate average brightness
      let brightness = 0;
      let pixelCount = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        // Calculate perceived brightness using common formula
        // (0.299*R + 0.587*G + 0.114*B)
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        brightness += 0.299 * r + 0.587 * g + 0.114 * b;
        pixelCount++;
      }
      
      // Average brightness (0-255)
      const avgBrightness = brightness / pixelCount;
      
      // Clean up URL before resolving
      URL.revokeObjectURL(img.src);
      
      // Use a buffer zone to make results more stable
      if (avgBrightness < 115) {
        resolve('dark');
      } else if (avgBrightness > 140) {
        resolve('light');
      } else {
        // For values in the middle, bias toward dark for better readability
        resolve('dark');
      }
    };
    
    // Set up event handlers
    img.onload = handleImageLoad;
    
    img.onerror = () => {
      URL.revokeObjectURL(img.src); // Clean up URL on error too
      reject(new Error('Failed to load image for analysis'));
    };
    
    // Create a URL for the blob and set it as the source
    const blobUrl = URL.createObjectURL(imageBlob);
    img.src = blobUrl;
  });
}

// Function to evaluate contrast and accessibility
function evaluateContrast(backgroundBrightness: 'dark' | 'light', textColor: 'dark' | 'white'): {
  ratio: number;
  passes: boolean;
  level: 'AAA' | 'AA' | 'Fails';
  comment: string;
} {
  // Approximate contrast ratios based on general dark/light combinations
  // These are estimates as we don't have exact colors
  let ratio = 0;
  
  if (backgroundBrightness === 'dark' && textColor === 'white') {
    ratio = 10; // High contrast - white on dark
  } else if (backgroundBrightness === 'light' && textColor === 'dark') {
    ratio = 12; // Very high contrast - dark on light
  } else if (backgroundBrightness === 'dark' && textColor === 'dark') {
    ratio = 2.5; // Poor contrast - dark on dark
  } else if (backgroundBrightness === 'light' && textColor === 'white') {
    ratio = 1.8; // Very poor contrast - white on light
  }
  
  // WCAG 2.1 standards: 
  // AAA: 7:1, AA: 4.5:1 for normal text
  const passes = ratio >= 4.5;
  const level = ratio >= 7 ? 'AAA' : (ratio >= 4.5 ? 'AA' : 'Fails');
  
  let comment = '';
  if (level === 'AAA') {
    comment = 'Excellent contrast for accessibility.';
  } else if (level === 'AA') {
    comment = 'Good contrast that meets minimum accessibility standards.';
  } else {
    comment = 'Poor contrast that fails accessibility standards. Consider adjusting colors.';
  }
  
  return { ratio, passes, level, comment };
}

// Function to crop an image using canvas
async function cropTopPortion(imageUrl: string, topFraction: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Calculate the crop height (top portion only)
      const cropHeight = Math.round(img.height * topFraction);
      
      // Create a canvas to draw the cropped portion
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = cropHeight;
      
      // Draw only the top portion of the image
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, img.width, cropHeight, 0, 0, img.width, cropHeight);
      
      // Convert the canvas to a blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      }, 'image/jpeg', 0.9);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for cropping'));
    };
    
    // Set the source and start loading the image
    img.src = imageUrl;
  });
}

export function NavigationSettingsInput(props: ObjectInputProps) {
  const { members, renderDefault, value = {} } = props
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<'dark' | 'light' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [contrast, setContrast] = useState<ReturnType<typeof evaluateContrast> | null>(null)
  const [updating, setUpdating] = useState(false)
  
  // Get the client to fetch image data
  const client = useClient({ apiVersion: '2025-02-10' })
  const imageBuilder = imageUrlBuilder(client)
  
  // Get blocks from the document to analyze the first block's image
  const blocks = useFormValue(['blocks']) as any[] | undefined
  const documentId = useFormValue(['_id']) as string
  const currentNavColor = (value?.navigationTextColor || 'dark') as 'dark' | 'white'
  
  // Get document operations for patching blocks
  const patchDoc = client.patch(documentId)

  // Update contrast evaluation when result or navigation color changes
  useEffect(() => {
    if (result) {
      setContrast(evaluateContrast(result, currentNavColor));
    }
  }, [result, currentNavColor]);
  
  // Function to ensure hero blocks have correct overlayColor based on navigation color
  const updateHeroBlocksOverlayColor = async (navColor: 'dark' | 'white') => {
    if (!blocks || blocks.length === 0 || !patchDoc) return;
    
    try {
      // Find all blocks with backgroundImage
      const blocksWithBackground = blocks
        .map((block, index) => ({ block, index }))
        .filter(item => item.block.backgroundImage?.asset?._ref);
      
      if (blocksWithBackground.length === 0) {
        return;
      }
      
      // Set correct overlay color (opposite of navigation text color)
      const overlayColor = navColor === 'white' ? 'dark' : 'light';
      
      // Prepare patch operations for all blocks with background
      const patches = {};
      
      blocksWithBackground.forEach(({ block, index }) => {
        // Only update if overlay color is missing or different
        if (block.overlayColor !== overlayColor) {
          patches[`blocks[${index}].overlayColor`] = overlayColor;
        }
        // Ensure overlay is enabled if the block has the showOverlay property
        if (block.hasOwnProperty('showOverlay') && block.showOverlay !== true) {
          patches[`blocks[${index}].showOverlay`] = true;
        }
      });
      
      // Only apply patch if there are changes
      if (Object.keys(patches).length > 0) {
        await patchDoc.set(patches).commit();
        console.log(`Updated overlayColor to "${overlayColor}" for blocks with background images`);
      }
    } catch (err) {
      console.error('Error updating blocks with background:', err);
      // Silent error - don't disrupt the UI
    }
  };
  
  const analyzeFirstBlockImage = async () => {
    setAnalyzing(true)
    setError(null)
    setCroppedImageUrl(null)
    
    try {
      if (!blocks || blocks.length === 0) {
        throw new Error('No blocks found in document')
      }
      
      // Find the first block with an image
      let blockWithImage = null
      let assetRef = null
      
      for (const block of blocks) {
        // Check for backgroundImage or image in the block
        assetRef = block.backgroundImage?.asset?._ref || block.image?.asset?._ref || null
        
        if (assetRef) {
          blockWithImage = block
          break
        }
      }
      
      if (!blockWithImage || !assetRef) {
        throw new Error('No block with image found in document')
      }
      
      // Get full image URL 
      const url = imageBuilder.image(assetRef).width(896).height(512).url()
      
      // Crop the image to only include the top portion
      try {
        const croppedBlob = await cropTopPortion(url, TOP_FRACTION);
        
        // Create a temporary URL for the cropped image (for preview)
        const croppedUrl = URL.createObjectURL(croppedBlob);
        setCroppedImageUrl(croppedUrl);
        
        // Analyze the image
        const label = await analyzeImageBrightness(croppedBlob);
        
        setResult(label)
        
        // If background is dark, use white text, if light use dark text
        const recommendedColor = label === 'dark' ? 'white' : 'dark'
        
        // Update the color
        props.onChange(set(recommendedColor, ['navigationTextColor']))
        
        // Calculate and set contrast information
        setContrast(evaluateContrast(label, recommendedColor));

        // Update hero blocks in the background
        setTimeout(() => {
          updateHeroBlocksOverlayColor(recommendedColor);
        }, 500);
        
      } catch (cropError) {
        console.error('Error cropping image:', cropError);
        throw new Error(`Failed to crop image: ${cropError.message}`);
      }
      
    } catch (err) {
      console.error('Error analyzing image:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setAnalyzing(false)
    }
  }
  
  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }
    };
  }, [croppedImageUrl]);
  
  return (
    <Stack space={4}>
      {/* Render the original input */}
      {renderDefault(props)}
      
      {/* Add the analyze button */}
      <Card padding={3} radius={2} tone="primary">
        <Flex direction="column" gap={3}>
          <Text>Automatic Navigation Theme</Text>
          <Text size={1} muted>
            Analyzes your hero image to set optimal navigation text color. 
            Automatically configures overlay settings for hero sections.
          </Text>
          
          <Button
            mode="ghost"
            tone="primary"
            text={
              analyzing ? "Analyzing..." : 
              result ? "Re-analyze Hero Image" : 
              "Analyze Hero Image"}
            icon={analyzing ? Spinner : undefined}
            disabled={analyzing || updating}
            onClick={() => analyzeFirstBlockImage()}
          />
          
          {result && (
            <Stack space={3}>
              <Card padding={2} radius={2} tone="default">
                <Stack space={3}>
                  <Flex gap={2} align="center">
                    <Text weight="semibold">Analysis Result:</Text>
                    <Badge tone={result === 'dark' ? 'critical' : 'positive'}>
                      {result.toUpperCase()}
                    </Badge>
                    <Text>→</Text>
                    <Text weight="semibold">Navigation:</Text>
                    <Badge tone={result === 'dark' ? 'primary' : 'default'}>
                      {(result === 'dark' ? 'WHITE' : 'DARK')} TEXT
                    </Badge>
                  </Flex>

                  <Text size={0} muted>
                    Hero section overlay has been configured to match navigation for optimal visibility.
                  </Text>
                </Stack>
              </Card>
              
              {croppedImageUrl && (
                <Card padding={2} radius={2}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      Analyzed top {Math.round(TOP_FRACTION * 100)}% of the hero image:
                    </Text>
                    <Box style={{ maxWidth: '100%', maxHeight: '120px', overflow: 'hidden' }}>
                      <img 
                        src={croppedImageUrl} 
                        alt="Top portion of hero" 
                        style={{ 
                          width: '100%', 
                          objectFit: 'cover',
                          border: `2px solid ${result === 'dark' ? '#F03E2F' : '#46B13D'}`
                        }} 
                      />
                    </Box>
                  </Stack>
                </Card>
              )}
              
              {contrast && (
                <Card 
                  padding={2} 
                  radius={2} 
                  tone={contrast.passes ? "positive" : "critical"}
                >
                  <Stack space={2}>
                    <Flex gap={2} align="center">
                      <Text weight="semibold">Contrast ratio:</Text>
                      <Text>{contrast.ratio.toFixed(1)}:1</Text>
                      <Badge tone={contrast.level === 'AAA' ? "positive" : (contrast.level === 'AA' ? "primary" : "critical")}>
                        {contrast.level}
                      </Badge>
                    </Flex>
                    <Text size={1}>{contrast.comment}</Text>
                  </Stack>
                </Card>
              )}
            </Stack>
          )}
          
          {error && (
            <Card padding={2} tone="critical" radius={2}>
              <Text size={1}>{error}</Text>
            </Card>
          )}
        </Flex>
      </Card>
    </Stack>
  )
} 