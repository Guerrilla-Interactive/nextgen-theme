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
import {useClient} from 'sanity'

// Import theme components
import {themePresets} from './theme-presets'
import ThemePresetCard from './theme-preset-card'
import LogoExtractor from './logo-extractor'

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

/**
 * Pane component that displays theme preset options and logo extraction
 * Appears as a tab in the document view
 */
export default function ThemeWizardPane(props: any) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'presets' | 'logo'>('presets')
  const client = useClient({apiVersion: '2023-01-01'})
  const toast = useToast()
  
  // Extract document info from props
  const {documentId, document} = props
  
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
        document?.displayed?.primaryColor?.wcagColorPair?.background?.hex
      
      if (hasContent) {
        toast.push({
          status: 'warning',
          title: 'Overwriting existing values',
          description: 'The preset will replace your current design token settings.',
          closable: true,
          duration: 5000,
        })
      }
      
      // Apply the preset to the document using the client
      // Start a transaction
      const tx = client.transaction()
      
      // The document ID is in the format 'drafts.designTokens'
      const docId = documentId.startsWith('drafts.') 
        ? documentId 
        : `drafts.${documentId}`
        
      // Apply each field from the preset
      Object.entries(preset.values).forEach(([field, value]) => {
        tx.patch(docId, patch => patch.set({[field]: value}))
      })
      
      // Commit the transaction
      await tx.commit()
      
      // Show success message
      toast.push({
        status: 'success',
        title: 'Theme applied',
        description: `Applied the "${preset.name}" theme to your document.`,
        closable: true,
        duration: 3000,
      })
      
      // Show instructions for viewing colors
      setTimeout(() => {
        toast.push({
          status: 'info',
          title: 'View colors in Basic Settings',
          description: 'Go to the Basic Settings tab to see your new colors.',
          closable: true,
          duration: 5000,
        })
      }, 3000)
      
      setIsProcessing(false)
    } catch (error) {
      console.error('Error applying theme preset:', error)
      
      // Show error message
      toast.push({
        status: 'error',
        title: 'Error applying theme',
        description: 'There was an error applying the theme preset.',
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
      
      // In a real implementation, we would create a transaction to update colors
      const tx = client.transaction()
      
      // Extract colors from the logo
      const primaryColor = colors.primary || '#3b82f6'
      const secondaryColor = colors.secondary || '#f97316'
      
      // Set up primaryColors array
      tx.patch(docId, patch => patch.set({
        primaryColors: [{
          colorName: 'Primary (from logo)',
          wcagColorPair: {
            background: {
              hex: primaryColor,
              alpha: 1
            },
            foreground: {
              hex: '#ffffff', // Default white text
              alpha: 1
            }
          }
        }]
      }))
      
      // Set up secondaryColors array
      tx.patch(docId, patch => patch.set({
        secondaryColors: [{
          colorName: 'Secondary (from logo)',
          wcagColorPair: {
            background: {
              hex: secondaryColor,
              alpha: 1
            },
            foreground: {
              hex: '#ffffff', // Default white text
              alpha: 1
            }
          }
        }]
      }))
      
      // Also update legacy fields for backward compatibility
      tx.patch(docId, patch => patch.set({
        primaryColor: {
          wcagColorPair: {
            background: {
              hex: primaryColor,
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      }))
      
      tx.patch(docId, patch => patch.set({
        secondaryColor: {
          wcagColorPair: {
            background: {
              hex: secondaryColor,
              alpha: 1
            },
            foreground: {
              hex: '#ffffff',
              alpha: 1
            }
          }
        }
      }))
      
      // Commit transaction
      await tx.commit()
      
      toast.push({
        status: 'success',
        title: 'Colors extracted',
        description: 'Theme generated from logo colors.',
        closable: true,
        duration: 3000,
      })
      
      // Show instructions for viewing colors
      setTimeout(() => {
        toast.push({
          status: 'info',
          title: 'View colors in Basic Settings',
          description: 'Go to the Basic Settings tab to see your new colors.',
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
    <Card padding={4}>
      <Stack space={4}>
        <Heading size={1}>Theme Wizard</Heading>
        <Text size={2}>
          Choose a preset theme or extract colors from your logo to quickly style your design tokens.
        </Text>
        
        {/* Simple tab navigation */}
        <Flex>
          <Button
            mode={activeTab === 'presets' ? 'default' : 'ghost'}
            text="Theme Presets"
            onClick={() => setActiveTab('presets')}
            padding={3}
            style={{ marginRight: '8px' }}
          />
          <Button
            mode={activeTab === 'logo' ? 'default' : 'ghost'}
            text="Extract from Logo"
            onClick={() => setActiveTab('logo')}
            padding={3}
          />
        </Flex>
        
        {/* Tab content */}
        <Box marginTop={4}>
          <TabContent isActive={activeTab === 'presets'}>
            {/* Theme Presets Tab */}
            <Stack space={4}>
              <Grid columns={[1, 2, 3]} gap={3}>
                {themePresets.map(preset => (
                  <ThemePresetCard
                    key={preset.id}
                    preset={preset}
                    selected={selectedPreset === preset.id}
                    onSelect={() => handleApplyPreset(preset.id)}
                  />
                ))}
              </Grid>
            </Stack>
          </TabContent>
          
          <TabContent isActive={activeTab === 'logo'}>
            {/* Logo Extractor Tab */}
            <LogoExtractor
              onExtract={handleLogoExtraction}
              onCancel={() => setActiveTab('presets')}
            />
          </TabContent>
        </Box>
      </Stack>
    </Card>
  )
} 