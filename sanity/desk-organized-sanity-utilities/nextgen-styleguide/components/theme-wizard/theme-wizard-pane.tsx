/**
 * ThemeWizardPane Component
 * Renders theme presets and logo extractor as a document pane
 */
import React, {useState} from 'react'
import {
  Card,
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Grid,
  Spinner,
  Heading,
  useToast,
  Tab,
  TabList,
  TabPanel
} from '@sanity/ui'
import {useClient, useEditState} from 'sanity'

// Import theme components
import ThemePresetCard from './theme-preset-card'
import LogoExtractor from './logo-extractor'
import {themePresets, ThemePreset} from './theme-presets'

// Create a simple tab implementation without Sanity's Tabs component
interface TabContentProps {
  children: React.ReactNode
  isActive: boolean
}

// Component to render tab content only when active
const TabContent = ({ isActive, children }: TabContentProps) => {
  if (!isActive) return null
  return <>{children}</>
}

// Define component props
interface ThemeWizardPaneProps {
  documentId: string
  onApplyPreset?: (primaryColor: string, secondaryColor: string) => void;
  onExtract?: (colors: Record<string, string>) => void;
  onCancel?: () => void;
}

export const ThemeWizardPane: React.FC<ThemeWizardPaneProps> = ({ 
  documentId,
  onApplyPreset,
  onExtract,
  onCancel
}) => {
  // Tabs and mode state
  const [activeTab, setActiveTab] = useState('presets')
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  
  // Sanity client and utilities
  const client = useClient({apiVersion: '2023-01-01'})
  const toast = useToast()
  
  // Get the current document
  const document: any = useEditState(documentId || '', 'designTokens')
  
  // Apply a theme preset to the document
  const handleApplyPreset = async (presetId: string) => {
    setSelectedPreset(presetId)
    setIsProcessing(true)
    
    try {
      // Get the preset data
      const preset = themePresets.find(p => p.id === presetId)
      if (!preset) throw new Error(`Preset ${presetId} not found`)
      
      // Check if the document already has content
      const hasContent = 
        document?.displayed?.primaryColors?.length > 0 || 
        document?.displayed?.secondaryColors?.length > 0 || 
        document?.displayed?.primaryColor?.colorPair?.background?.hex || 
        document?.displayed?.secondaryColor?.colorPair?.background?.hex
      
      // Show confirmation dialog if content exists
      if (hasContent && !isConfirmed) {
        setIsProcessing(false)
        setShowConfirmModal(true)
        return
      }
      
      // Get document ID, using drafts prefix if not present
      const docId = documentId.startsWith('drafts.') 
        ? documentId 
        : `drafts.${documentId}`
      
      // Create transaction and patch the document with preset values
      const tx = client.transaction()
      
      // Ensure we handle both new array format and legacy fields for backwards compatibility
      const presetValues = {...preset.values}
      
      // Make sure values are properly structured for the schema
      // Create a transaction to update arrays with proper keys
      if (presetValues.primaryColors) {
        // Ensure each item has proper structure and keys
        const primaryColors = presetValues.primaryColors.map(color => {
          // Generate a unique key if not present
          if (!color._key) {
            color._key = Math.random().toString(36).substring(2, 15)
          }
          
          // Ensure the colorName field exists
          if (!color.colorName && color.colorPair?.title) {
            color.colorName = color.colorPair.title
          }
          
          return color
        })
        
        // Update primaryColors array
        tx.patch(docId, patch => patch.set({
          primaryColors: primaryColors
        }))
        
        // Also update legacy primaryColor field for backward compatibility
        if (primaryColors[0]?.colorPair) {
          tx.patch(docId, patch => patch.set({
            primaryColor: {
              colorPair: primaryColors[0].colorPair
            }
          }))
        }
      }
      
      if (presetValues.secondaryColors) {
        // Ensure each item has proper structure and keys
        const secondaryColors = presetValues.secondaryColors.map(color => {
          // Generate a unique key if not present
          if (!color._key) {
            color._key = Math.random().toString(36).substring(2, 15)
          }
          
          // Ensure the colorName field exists
          if (!color.colorName && color.colorPair?.title) {
            color.colorName = color.colorPair.title
          }
          
          return color
        })
        
        // Update secondaryColors array
        tx.patch(docId, patch => patch.set({
          secondaryColors: secondaryColors
        }))
        
        // Also update legacy secondaryColor field for backward compatibility
        if (secondaryColors[0]?.colorPair) {
          tx.patch(docId, patch => patch.set({
            secondaryColor: {
              colorPair: secondaryColors[0].colorPair
            }
          }))
        }
      }
      
      // Handle color palette
      if (presetValues.colorPalette) {
        tx.patch(docId, patch => patch.set({
          colorPalette: presetValues.colorPalette.map(palette => ({
            ...palette,
            // Ensure _key exists
            _key: palette._key || Math.random().toString(36).substring(2, 15),
            // Ensure slug has proper structure
            slug: palette.slug || {
              _type: 'slug', 
              current: palette.name.toLowerCase().replace(/\s+/g, '-')
            }
          }))
        }))
      }
      
      // Handle typography
      if (presetValues.typographyScale) {
        tx.patch(docId, patch => patch.set({
          typographyScale: presetValues.typographyScale.map(size => ({
            ...size,
            // Ensure _key exists
            _key: size._key || Math.random().toString(36).substring(2, 15),
            // Ensure slug has proper structure
            slug: size.slug || {
              _type: 'slug', 
              current: size.name.toLowerCase().replace(/\s+/g, '-')
            }
          }))
        }))
      }
      
      // Handle spacing
      if (presetValues.spacingScale) {
        tx.patch(docId, patch => patch.set({
          spacingScale: presetValues.spacingScale.map(space => ({
            ...space,
            // Ensure _key exists
            _key: space._key || Math.random().toString(36).substring(2, 15),
            // Ensure slug has proper structure
            slug: space.slug || {
              _type: 'slug', 
              current: space.name.toLowerCase().replace(/\s+/g, '-')
            }
          }))
        }))
      }
      
      // Handle radius
      if (presetValues.radius) {
        tx.patch(docId, patch => patch.set({
          radius: presetValues.radius
        }))
      }
      
      // Handle font family
      if (presetValues.fontFamily) {
        tx.patch(docId, patch => patch.set({
          fontFamily: presetValues.fontFamily
        }))
      }
      
      // Handle component overrides
      if (presetValues.componentOverrides) {
        tx.patch(docId, patch => patch.set({
          componentOverrides: presetValues.componentOverrides.map(override => ({
            ...override,
            // Ensure _key exists
            _key: override._key || Math.random().toString(36).substring(2, 15),
            // Ensure slug has proper structure
            slug: override.slug || {
              _type: 'slug', 
              current: override.component.toLowerCase().replace(/\s+/g, '-')
            }
          }))
        }))
      }
      
      // Commit transaction
      await tx.commit()
      
      toast.push({
        status: 'success',
        title: 'Theme Applied',
        description: `The ${preset.name} theme has been applied to your design tokens`,
        closable: true,
        duration: 3000,
      })
      
      // Reset state
      setIsProcessing(false)
      setIsConfirmed(false)
      setShowConfirmModal(false)
      
      // Notify parent
      if (onApplyPreset) {
        onApplyPreset(preset.primaryColor, preset.secondaryColor)
      }
    } catch (error) {
      console.error('Error applying preset:', error)
      toast.push({
        status: 'error',
        title: 'Error',
        description: 'Failed to apply the theme preset. Check console for details.',
        closable: true,
        duration: 5000,
      })
      setIsProcessing(false)
    }
  }
  
  // Handle logo color extraction and theme generation
  const handleLogoExtraction = async (colors: Record<string, string>) => {
    setIsProcessing(true)
    
    try {
      // Get document ID
      const docId = documentId.startsWith('drafts.') 
        ? documentId 
        : `drafts.${documentId}`
      
      // Create a transaction to update colors
      const tx = client.transaction()
      
      // Extract colors from the logo
      const primaryColor = colors.primary || '#3b82f6'
      const secondaryColor = colors.secondary || '#f97316'
      
      // Calculate contrasting foreground colors
      const primaryForeground = determineContrastColor(primaryColor)
      const secondaryForeground = determineContrastColor(secondaryColor)
      
      // Generate unique keys for all array items
      const generateKey = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Set up primaryColors array
      tx.patch(docId, patch => patch.set({
        primaryColors: [{
          _key: generateKey(),
          colorName: 'Primary (from logo)',
          colorPair: {
            title: 'Primary Color',
            background: {
              hex: primaryColor,
              alpha: 1
            },
            foreground: {
              hex: primaryForeground,
              alpha: 1
            }
          }
        }]
      }))
      
      // Set up secondaryColors array
      tx.patch(docId, patch => patch.set({
        secondaryColors: [{
          _key: generateKey(),
          colorName: 'Secondary (from logo)',
          colorPair: {
            title: 'Secondary Color',
            background: {
              hex: secondaryColor,
              alpha: 1
            },
            foreground: {
              hex: secondaryForeground,
              alpha: 1
            }
          }
        }]
      }))
      
      // Also update legacy fields for backward compatibility
      tx.patch(docId, patch => patch.set({
        primaryColor: {
          colorPair: {
            title: 'Primary Color',
            background: {
              hex: primaryColor,
              alpha: 1
            },
            foreground: {
              hex: primaryForeground,
              alpha: 1
            }
          }
        }
      }))
      
      tx.patch(docId, patch => patch.set({
        secondaryColor: {
          colorPair: {
            title: 'Secondary Color',
            background: {
              hex: secondaryColor,
              alpha: 1
            },
            foreground: {
              hex: secondaryForeground,
              alpha: 1
            }
          }
        }
      }))
      
      // Set up color palette with shades for both primary and secondary colors
      // Import the shades generation utility
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
      
      // Create color palette with primary, secondary, and neutral colors
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
          },
          {
            _key: generateKey(),
            name: 'Gray',
            slug: { _type: 'slug', current: 'gray' },
            colorPair: {
              title: 'Gray',
              background: { hex: '#64748b', alpha: 1 },
              foreground: { hex: '#ffffff', alpha: 1 }
            },
            shades: generateShades('#64748b')
          }
        ]
      }))
      
      // Add default radius and font family settings
      tx.patch(docId, patch => patch.set({
        radius: {
          unit: 'rem',
          value: 0.375
        },
        fontFamily: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif'
        }
      }))
      
      // Commit transaction
      await tx.commit()
      
      toast.push({
        status: 'success',
        title: 'Colors extracted',
        description: 'Theme generated from logo colors with complete color palette.',
        closable: true,
        duration: 3000,
      })
      
      // Show instructions for viewing colors
      setTimeout(() => {
        toast.push({
          status: 'info',
          title: 'View all settings',
          description: 'Check Basic Settings for main colors and Colors tab for the full palette.',
          closable: true,
          duration: 5000,
        })
      }, 3000)
      
      setIsProcessing(false)
    } catch (error) {
      console.error('Error processing logo colors:', error)
      
      toast.push({
        status: 'error',
        title: 'Error extracting colors',
        description: 'There was an error generating a theme from your logo.',
        closable: true,
        duration: 5000,
      })
      
      setIsProcessing(false)
    }
  }
  
  // Simple function to determine a contrasting color (white or black)
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
  
  // Render loading state
  if (isProcessing) {
    return (
      <Card padding={4}>
        <Flex direction="column" align="center" justify="center" padding={5} gap={4}>
          <Spinner />
          <Text align="center" size={2}>Applying theme settings...</Text>
        </Flex>
      </Card>
    )
  }
  
  return (
    <div>
      {showConfirmModal && (
        <Card padding={4} tone="caution" radius={2} marginY={4}>
          <Stack space={4}>
            <Text size={2} weight="semibold">Replace Existing Theme?</Text>
            <Text>This will overwrite your current design token settings. Continue?</Text>
            <Flex gap={2}>
              <Button 
                text="Cancel" 
                mode="ghost" 
                onClick={() => {
                  setShowConfirmModal(false)
                  setIsProcessing(false)
                  setSelectedPreset(null)
                }} 
              />
              <Button 
                text="Continue" 
                tone="primary" 
                onClick={() => {
                  setIsConfirmed(true)
                  if (selectedPreset) {
                    handleApplyPreset(selectedPreset)
                  }
                }} 
              />
            </Flex>
          </Stack>
        </Card>
      )}
      
      <Card padding={0}>
        <TabList space={2}>
          <Tab
            aria-controls="presets-panel"
            id="presets-tab"
            label="Theme Presets"
            onClick={() => setActiveTab('presets')}
            selected={activeTab === 'presets'}
          />
          <Tab
            aria-controls="logo-panel"
            id="logo-tab"
            label="Extract From Logo"
            onClick={() => setActiveTab('logo')}
            selected={activeTab === 'logo'}
          />
        </TabList>
        
        {activeTab === 'presets' && (
          <Box padding={4}>
            <Stack space={4}>
              <Text size={1} muted>
                Choose a theme preset to quickly apply professionally designed color palettes, typography, and spacing.
              </Text>
              
              <Grid columns={[1, 2, 3]} gap={3}>
                {themePresets.map(preset => (
                  <ThemePresetCard
                    key={preset.id}
                    preset={preset}
                    onClick={() => handleApplyPreset(preset.id)}
                    isSelected={selectedPreset === preset.id}
                    isLoading={isProcessing && selectedPreset === preset.id}
                  />
                ))}
              </Grid>
            </Stack>
          </Box>
        )}
        
        {activeTab === 'logo' && (
          <Box padding={4}>
            <Stack space={3}>
              <Text size={1} muted>
                Upload your logo to extract colors and generate a complete theme with color palettes, shades, and component settings.
              </Text>
              <LogoExtractor
                documentId={documentId}
                onExtract={onExtract}
                onCancel={() => setActiveTab('presets')}
              />
            </Stack>
          </Box>
        )}
      </Card>
    </div>
  )
}

// Default export
export default ThemeWizardPane 