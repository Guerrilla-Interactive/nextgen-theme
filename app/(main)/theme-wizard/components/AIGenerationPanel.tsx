'use client';

import React, { useState } from 'react';
import { useGeminiGeneration, GenerateRequest } from '../hooks/useGeminiGeneration';
import { useWizardNavigation } from '../context/useWizardNavigation';

interface AIGenerationPanelProps {
  onClose?: () => void;
}

export default function AIGenerationPanel({ onClose }: AIGenerationPanelProps) {
  const { getThemeData, updateTheme } = useWizardNavigation();
  const theme = getThemeData();
  
  const {
    generateThemeElements,
    applyGeneratedElements,
    isLoading,
    error,
    retries,
    maxRetries
  } = useGeminiGeneration();
  
  // Determine what assets are missing
  const hasColors = theme.colours.length > 0;
  const hasFonts = Boolean(theme.fonts?.primary);
  const hasIcons = Boolean(theme.icons?.set);
  
  // Generation request state (what to generate)
  const [generateRequest, setGenerateRequest] = useState<GenerateRequest>({
    colors: !hasColors,
    fonts: !hasFonts,
    icons: !hasIcons
  });
  
  // State for showing the generated results before applying
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [showingResult, setShowingResult] = useState(false);
  
  // Handle checkbox changes
  const handleCheckboxChange = (field: keyof GenerateRequest) => {
    setGenerateRequest(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  // Start the generation process
  const handleGenerate = async () => {
    // Ensure at least one option is selected
    if (!generateRequest.colors && !generateRequest.fonts && !generateRequest.icons) {
      return;
    }
    
    const result = await generateThemeElements(theme, generateRequest);
    
    if (result) {
      setGenerationResult(result);
      setShowingResult(true);
    }
  };
  
  // Apply the generated theme elements
  const handleApply = () => {
    if (generationResult) {
      // Create a deep copy of the current theme to ensure we don't miss any nested fields
      const currentTheme = JSON.parse(JSON.stringify(theme));
      
      // Apply generated elements to the theme
      const updatedTheme = applyGeneratedElements(currentTheme, generationResult);
      
      // Update the theme with all changes
      updateTheme(updatedTheme);
      
      // Log updates for debugging
      console.log("Applied theme updates:", updatedTheme);
      if (updatedTheme.metadata?.colorExplanation) {
        console.log("Color explanation:", updatedTheme.metadata.colorExplanation);
      }
      
      setShowingResult(false);
      onClose?.();
    }
  };
  
  // Cancel and reset
  const handleCancel = () => {
    setShowingResult(false);
    setGenerationResult(null);
  };
  
  // Format color value for display
  const formatColor = (color: string) => {
    return (
      <div className="flex items-center space-x-2">
        <div 
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: color }}
        />
        <span className="font-mono text-sm">{color}</span>
      </div>
    );
  };
  
  return (
    <div className="ai-generation-panel p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      {/* Header with explanation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">AI Theme Generator</h3>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-gray-600">
          Use AI to generate missing theme elements based on your business information and existing assets.
        </p>
      </div>
      
      {!showingResult ? (
        <>
          {/* Options for what to generate */}
          <div className="mb-6 space-y-4">
            <h4 className="font-medium">What would you like to generate?</h4>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={generateRequest.colors}
                  onChange={() => handleCheckboxChange('colors')}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <div>
                  <span className="font-medium">Color Palette</span>
                  {hasColors && (
                    <p className="text-xs text-amber-600">
                      (This will replace your existing colors)
                    </p>
                  )}
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={generateRequest.fonts}
                  onChange={() => handleCheckboxChange('fonts')}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <div>
                  <span className="font-medium">Font Recommendations</span>
                  {hasFonts && (
                    <p className="text-xs text-amber-600">
                      (This will replace your existing fonts)
                    </p>
                  )}
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={generateRequest.icons}
                  onChange={() => handleCheckboxChange('icons')}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <div>
                  <span className="font-medium">Icon Style</span>
                  {hasIcons && (
                    <p className="text-xs text-amber-600">
                      (This will replace your existing icon settings)
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>
          
          {/* Error display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {/* Loading state */}
          {isLoading && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700">Generating your theme elements...</span>
              </div>
              {retries > 0 && (
                <p className="mt-2 text-sm text-blue-600">
                  Retry attempt {retries} of {maxRetries}...
                </p>
              )}
            </div>
          )}
          
          {/* Generate button */}
          <div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || (!generateRequest.colors && !generateRequest.fonts && !generateRequest.icons)}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Theme Elements'}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Preview of generated results */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Generated Theme Elements</h4>
            
            <div className="space-y-4">
              {/* Colors preview */}
              {generationResult.colors && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="text-sm font-medium mb-2">Color Palette</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {generationResult.colors.map((color: string, index: number) => (
                      <div key={`color-${index}`} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {index === 0 ? 'Primary' : 
                           index === 1 ? 'Secondary' : 
                           index === 2 ? 'Accent' :
                           index === 3 ? 'Background' : 'Text'}
                        </span>
                        {formatColor(color)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Color explanation */}
                  {generationResult.colorExplanation && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h6 className="text-xs font-medium text-gray-700 mb-1">Reasoning</h6>
                      <p className="text-xs text-gray-600">{generationResult.colorExplanation}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Fonts preview */}
              {generationResult.fonts && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="text-sm font-medium mb-2">Font Recommendations</h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Primary (Headings)</p>
                      <p className="text-lg" style={{ fontFamily: generationResult.fonts.primary }}>
                        {generationResult.fonts.primary}
                      </p>
                    </div>
                    
                    {generationResult.fonts.secondary && (
                      <div>
                        <p className="text-sm text-gray-600">Secondary (Body)</p>
                        <p style={{ fontFamily: generationResult.fonts.secondary }}>
                          {generationResult.fonts.secondary}
                        </p>
                      </div>
                    )}
                    
                    {/* Font explanation */}
                    {generationResult.fontExplanation && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h6 className="text-xs font-medium text-gray-700 mb-1">Reasoning</h6>
                        <p className="text-xs text-gray-600">{generationResult.fontExplanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Icons preview */}
              {generationResult.icons && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h5 className="text-sm font-medium mb-2">Icon Style</h5>
                  <div>
                    <p className="text-sm text-gray-600">Style</p>
                    <p className="font-medium">{generationResult.icons.set}</p>
                  </div>
                  
                  {generationResult.icons.primaryColour && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Primary Color</p>
                      {formatColor(generationResult.icons.primaryColour)}
                    </div>
                  )}
                  
                  {/* Icon explanation */}
                  {generationResult.iconExplanation && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h6 className="text-xs font-medium text-gray-700 mb-1">Reasoning</h6>
                      <p className="text-xs text-gray-600">{generationResult.iconExplanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
} 