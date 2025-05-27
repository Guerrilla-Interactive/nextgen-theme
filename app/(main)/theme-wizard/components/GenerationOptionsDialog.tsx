'use client';

import React, { useEffect } from 'react';
import { ThemeJSON } from '../context/ThemeTypes';

interface GenerationOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: GenerationOptions) => void;
  theme: ThemeJSON;
  // What type of generation we're doing
  generationType: 'colors' | 'fonts' | 'both';
  // Checkboxes for what was selected in start screen
  hasLogoSelected: boolean;
  hasColoursSelected: boolean;
  hasFontsSelected: boolean;
}

export interface GenerationOptions {
  // What data to regenerate
  regenerateColors: boolean;
  regenerateFonts: boolean;
  // What inputs to use for generation
  useLogo: boolean;
  useColors: boolean;
  useFonts: boolean;
  useIcons: boolean;
  useBusinessDetails: boolean;
  // Influence levels (0.0 to 1.0)
  colorInfluence: number;
  fontInfluence: number;
  businessDetailsInfluence: number;
}

export default function GenerationOptionsDialog({
  isOpen,
  onClose,
  onConfirm,
  theme,
  generationType,
  hasLogoSelected,
  hasColoursSelected,
  hasFontsSelected
}: GenerationOptionsDialogProps) {
  // What to regenerate based on the generationType
  const [regenerateColors, setRegenerateColors] = React.useState(generationType === 'colors' || generationType === 'both');
  const [regenerateFonts, setRegenerateFonts] = React.useState(generationType === 'fonts' || generationType === 'both');
  
  // What to use as input for the generation
  const [useLogo, setUseLogo] = React.useState(hasLogoSelected && !!theme.logo);
  const [useColors, setUseColors] = React.useState(theme.colours.length > 0);
  const [useFonts, setUseFonts] = React.useState(hasFontsSelected && !!theme.fonts?.primary);
  const [useIcons, setUseIcons] = React.useState(!!theme.icons?.set);
  const [useBusinessDetails, setUseBusinessDetails] = React.useState(true);
  
  // Influence levels (0.0 means no influence from existing data, 1.0 means maximum influence)
  const [colorInfluence, setColorInfluence] = React.useState(0.5);
  const [fontInfluence, setFontInfluence] = React.useState(0.5);
  const [businessDetailsInfluence, setBusinessDetailsInfluence] = React.useState(0.5);
  
  // State for showing prompt preview
  const [showPrompt, setShowPrompt] = React.useState(false);
  
  // Reset options whenever dialog opens
  useEffect(() => {
    if (isOpen) {
      // Reset regeneration options based on generation type
      setRegenerateColors(generationType === 'colors' || generationType === 'both');
      setRegenerateFonts(generationType === 'fonts' || generationType === 'both');
      
      // Reset input options based on what data is available and what was selected in start screen
      setUseLogo(hasLogoSelected && !!theme.logo);
      
      // Always allow using existing colors for influence if available
      setUseColors(theme.colours.length > 0);
      
      setUseFonts(hasFontsSelected && !!theme.fonts?.primary);
      setUseIcons(!!theme.icons?.set);
      setUseBusinessDetails(true); // Always default to using business details
      
      // Reset influence levels to middle (0.5)
      setColorInfluence(0.5);
      setFontInfluence(0.5);
      setBusinessDetailsInfluence(0.5);
      
      // Hide prompt preview on dialog open
      setShowPrompt(false);
    }
  }, [isOpen, generationType, theme, hasLogoSelected, hasColoursSelected, hasFontsSelected]);
  
  // Helper function to format the influence value as a percentage
  const formatInfluence = (value: number) => `${Math.round(value * 100)}%`;
  
  // Generate a preview of the prompt that will be sent to the AI
  const generatePromptPreview = () => {
    let prompt = 'Generate a theme preset based on the following information:\n\n';
    
    // Add existing logo information if available and selected
    if (useLogo && theme.logo) {
      prompt += `Logo: ${theme.logo.alt}\n\n`;
    }
    
    // Add existing colors if available and selected
    if (useColors && theme.colours && theme.colours.length > 0) {
      const influenceText = getInfluenceText(colorInfluence);
      prompt += `Existing colors (${influenceText} influence, ${Math.round(colorInfluence * 100)}%): ${theme.colours.join(', ')}\n\n`;
    }
    
    // Add existing fonts if available and selected
    if (useFonts && theme.fonts?.primary) {
      const influenceText = getInfluenceText(fontInfluence);
      prompt += `Primary font (${influenceText} influence, ${Math.round(fontInfluence * 100)}%): ${theme.fonts.primary}\n`;
      if (theme.fonts.secondary) {
        prompt += `Secondary font (${influenceText} influence, ${Math.round(fontInfluence * 100)}%): ${theme.fonts.secondary}\n\n`;
      } else {
        prompt += '\n';
      }
    }
    
    // Add business metadata if available and selected
    if (useBusinessDetails && theme.metadata) {
      const influenceText = getInfluenceText(businessDetailsInfluence);
      prompt += `The following business details have ${influenceText} influence (${Math.round(businessDetailsInfluence * 100)}%):\n`;
      
      if (theme.metadata.businessType) {
        prompt += `Industry: ${theme.metadata.businessType}\n`;
      }
      if (theme.metadata.tone) {
        prompt += `Brand tone: ${theme.metadata.tone}\n`;
      }
      if (theme.metadata.audience) {
        prompt += `Target audience: ${theme.metadata.audience}\n`;
      }
      if (theme.metadata.description) {
        prompt += `Business description: ${theme.metadata.description}\n\n`;
      } else {
        prompt += '\n';
      }
    }
    
    // Add existing icons information if available and selected
    if (useIcons && theme.icons?.set) {
      prompt += `Icon style: ${theme.icons.set}\n`;
      if (theme.icons.primaryColour) {
        prompt += `Icon primary color: ${theme.icons.primaryColour}\n\n`;
      } else {
        prompt += '\n';
      }
    }
    
    // Specify what needs to be generated
    prompt += 'Please generate the following:\n';
    
    if (regenerateColors) {
      prompt += '- A color palette with 5 colors (primary, secondary, accent, background, text) in HEX format.\n';
      prompt += '- This palette must include:\n';
      
      const colorDNA = theme.metadata?.colorGenerationDNA || {
        numMainColors: 4,
        numSupplementColors: 5,
        hueVariety: 0.5,
      };

      prompt += `  * Main Colors (${colorDNA.numMainColors} colors): Foundational colors.\n`;
      
      // Simplified preview for main color handling, actual logic is more nuanced in backend
      if (colorInfluence > 0.7 && theme.colours.filter(c => c.category === 'main').length > 0) {
        prompt += `    * High Influence: Existing main colors will be prioritized and refined (descriptions/usecases) according to the target number (${colorDNA.numMainColors}). New main colors only generated if needed to meet the target count.\n`;
      } else {
        if (colorDNA.numMainColors === 2) {
          prompt += `    * Guidance for 2: Primary, Dark Contrast. Light Contrast derived.\n`;
        } else if (colorDNA.numMainColors === 3) {
          prompt += `    * Guidance for 3: Primary, Secondary, Dark Contrast. Light Contrast derived.\n`;
        } else if (colorDNA.numMainColors === 4) {
          prompt += `    * Guidance for 4: Primary, Secondary, Light & Dark Contrast.\n`;
        } else if (colorDNA.numMainColors >= 5) {
          prompt += `    * Guidance for ${colorDNA.numMainColors}: Primary, Secondary, Light & Dark Contrast, ${colorDNA.numMainColors - 4} Main Accent(s).\n`;
        }
      }

      prompt += `  * Supplement Colors (${colorDNA.numSupplementColors} colors) to complement Main Colors and cover all CSS variables.\n`;
      prompt += '- For each color: name, category (main/supplement), mainColorType (if main: primary/secondary/contrast/accent-main), description, and idealUsecases (CSS variables from the list: background, foreground, etc.).\n';
      prompt += '- CRITICAL: Review existing colors and their idealUsecases. Prioritize assigning remaining unassigned CSS variables. Each CSS variable in the final palette should ideally be unique.\n';

      prompt += '\n- Palette Style Guidance based on DNA settings:\n';
      prompt += `  * Generate ${colorDNA.numSupplementColors} supplement colors.\n`;
      prompt += `  * Hue Variety (0-1, current: ${colorDNA.hueVariety.toFixed(2)}): Adjust distinctness of hues for supplementals. Higher = more varied bases. Lower = monochromatic/analogous. AI to naturally incorporate tints/shades for harmony & CSS variable coverage.\n`;
      prompt += '  * Accessibility Colors (Error/Success) take precedence over strict Hue Variety if numSupplementColors >= 2. They will be functional yet harmonized.\n';
      
      // Add specific color influence instructions
      if (useColors && theme.colours && theme.colours.length > 0) {
        if (colorInfluence > 0.8) {
          prompt += '- The new colors MUST be extremely similar to the existing ones with only subtle refinements.\n';
        } else if (colorInfluence > 0.5) {
          prompt += '- The new colors should maintain the same general feel as the existing colors, with moderate variations.\n';
        } else if (colorInfluence > 0.2) {
          prompt += '- The new colors should be inspired by the existing colors but can be significantly different.\n';
        } else {
          prompt += '- The new colors can be completely different from the existing ones.\n';
        }
      }
    }
    
    if (regenerateFonts) {
      prompt += '- Font recommendations (primary for headings and secondary for body text).\n';
      
      // Add specific font influence instructions
      if (useFonts && theme.fonts?.primary) {
        if (fontInfluence > 0.8) {
          prompt += '- The new fonts should be very similar to the existing ones.\n';
        } else if (fontInfluence > 0.5) {
          prompt += '- The new fonts should be in the same style category as the existing fonts.\n';
        } else if (fontInfluence > 0.2) {
          prompt += '- The new fonts can be from different style categories but should maintain a similar mood.\n';
        } else {
          prompt += '- The new fonts can be completely different from the existing ones.\n';
        }
      }
    }
    
    // Add note about influence levels
    const usedSources = [];
    if (useLogo && theme.logo) usedSources.push('logo');
    if (useColors && theme.colours?.length > 0) {
      usedSources.push(`existing colors (${Math.round(colorInfluence * 100)}% influence)`);
      // Add DNA settings to the log for the prompt preview
      const dna = theme.metadata?.colorGenerationDNA || { numMainColors: 4, numSupplementColors: 5, hueVariety: 0.5 };
      usedSources.push(`color DNA (Main: ${dna.numMainColors}, Supplements: ${dna.numSupplementColors}, Hue Variety: ${dna.hueVariety.toFixed(2)})`);
    }
    if (useFonts && theme.fonts?.primary) usedSources.push(`existing fonts (${Math.round(fontInfluence * 100)}% influence)`);
    if (useIcons && theme.icons?.set) usedSources.push('existing icons');
    if (useBusinessDetails && theme.metadata) usedSources.push(`business details (${Math.round(businessDetailsInfluence * 100)}% influence)`);
    
    if (usedSources.length > 0) {
      prompt += `\nSources used: ${usedSources.join(', ')}`;
    } else {
      prompt += '\nNo specific sources selected for reference.';
    }
    
    return prompt;
  };
  
  // Helper function to get influence text
  const getInfluenceText = (value: number): string => {
    if (value >= 0.8) return "very high";
    if (value >= 0.6) return "high";
    if (value >= 0.4) return "medium";
    if (value >= 0.2) return "low";
    return "very low";
  };
  
  if (!isOpen) return null;
  
  // Determine if we have existing data for the options we're regenerating
  const hasExistingColors = theme.colours.length > 0;
  const hasExistingFonts = !!theme.fonts?.primary;
  
  // Create a summary of what we're using for generation
  const getGenerationSummary = () => {
    const inputs = [];
    if (useLogo) inputs.push("logo");
    if (useColors) inputs.push(`colors (${formatInfluence(colorInfluence)} influence)`);
    if (useFonts) inputs.push(`fonts (${formatInfluence(fontInfluence)} influence)`);
    if (useIcons) inputs.push("icons");
    if (useBusinessDetails) inputs.push(`business details (${formatInfluence(businessDetailsInfluence)} influence)`);
    
    if (inputs.length === 0) return "No data will be used for generation";
    return `Using ${inputs.join(", ")} for generation`;
  };
  
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/5  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">Generation Options</h3>
        
        {/* What to regenerate section */}
        {(hasExistingColors || hasExistingFonts) && (
          <>
            <h4 className="font-medium text-gray-700 mb-2">What to regenerate:</h4>
            <div className="space-y-3 mb-6">
              {hasExistingColors && generationType !== 'fonts' && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={regenerateColors}
                    onChange={(e) => setRegenerateColors(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Regenerate Colors</span>
                </label>
              )}
              
              {hasExistingFonts && generationType !== 'colors' && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={regenerateFonts}
                    onChange={(e) => setRegenerateFonts(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Regenerate Fonts</span>
                </label>
              )}
            </div>
          </>
        )}
        
        {/* What to use as input section */}
        <h4 className="font-medium text-gray-700 mb-2">Use these elements for generation:</h4>
        <div className="space-y-4 mb-6">
          {/* Logo */}
          {theme.logo && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useLogo}
                onChange={(e) => setUseLogo(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Logo</span>
            </label>
          )}
          
          {/* Colors with influence slider */}
          {theme.colours.length > 0 && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useColors}
                  onChange={(e) => setUseColors(e.target.checked)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Existing Colors</span>
              </label>
              
              {useColors && (
                <div className="pl-6 pt-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Low Influence</span>
                    <span>{formatInfluence(colorInfluence)}</span>
                    <span>High Influence</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={colorInfluence}
                    onChange={(e) => setColorInfluence(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Higher values will make new colors more similar to existing ones
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Fonts with influence slider */}
          {theme.fonts?.primary && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useFonts}
                  onChange={(e) => setUseFonts(e.target.checked)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Existing Fonts</span>
              </label>
              
              {useFonts && (
                <div className="pl-6 pt-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Low Influence</span>
                    <span>{formatInfluence(fontInfluence)}</span>
                    <span>High Influence</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={fontInfluence}
                    onChange={(e) => setFontInfluence(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Higher values will make new fonts more similar to existing ones
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Icons */}
          {theme.icons?.set && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useIcons}
                onChange={(e) => setUseIcons(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Existing Icons</span>
            </label>
          )}
          
          {/* Business Details with influence slider */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useBusinessDetails}
                onChange={(e) => setUseBusinessDetails(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Business Details</span>
            </label>
            
            {useBusinessDetails && (
              <div className="pl-6 pt-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Low Influence</span>
                  <span>{formatInfluence(businessDetailsInfluence)}</span>
                  <span>High Influence</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={businessDetailsInfluence}
                  onChange={(e) => setBusinessDetailsInfluence(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher values will make generation more closely match your business type and tone
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Summary */}
        <div className="mb-6 p-3 bg-blue-50 rounded text-sm text-blue-800">
          {getGenerationSummary()}
        </div>
        
        {/* Show Prompt Toggle */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowPrompt(!showPrompt)}
            className="text-blue-600 text-sm flex items-center"
          >
            {showPrompt ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Hide AI Prompt
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Show AI Prompt
              </>
            )}
          </button>
          
          {showPrompt && (
            <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200 text-xs font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
              {generatePromptPreview()}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={() => {
              onConfirm({
                regenerateColors,
                regenerateFonts,
                useLogo,
                useColors,
                useFonts,
                useIcons,
                useBusinessDetails,
                colorInfluence,
                fontInfluence,
                businessDetailsInfluence
              });
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
} 