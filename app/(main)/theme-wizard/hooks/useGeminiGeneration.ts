'use client';

import { useState } from 'react';
import { ThemeJSON, ThemePreset } from '../context/ThemeTypes';

// Define the request structure for specifying what to generate
export interface GenerateRequest {
  colors: boolean;
  fonts: boolean;
  icons: boolean;
}

// Define the response structure from the API
export interface GenerateResponse {
  proposal: {
    colors?: string[];
    colorExplanation?: string;
    fonts?: {
      primary: string;
      secondary?: string;
    };
    fontExplanation?: string;
    icons?: {
      set: string;
      primaryColour: string;
    };
    iconExplanation?: string;
  };
}

export function useGeminiGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retries, setRetries] = useState(0);
  
  // Max retries and backoff time (ms)
  const MAX_RETRIES = 3;
  const RETRY_BACKOFF = 1000;
  
  const generateThemeElements = async (
    themeData: ThemeJSON,
    generateRequest: GenerateRequest
  ): Promise<GenerateResponse['proposal'] | null> => {
    setIsLoading(true);
    setError(null);
    setRetries(0);
    
    let currentRetry = 0;
    
    while (currentRetry <= MAX_RETRIES) {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ themeData, generateRequest }),
        });
        
        // Handle HTTP errors
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `API error: ${response.status}`
          );
        }
        
        // Parse the response
        const data: GenerateResponse = await response.json();
        
        // Validate the response structure
        if (!data.proposal) {
          throw new Error('Invalid response format from API');
        }
        
        // Reset retries on success
        setRetries(0);
        return data.proposal;
      } catch (err) {
        currentRetry++;
        setRetries(currentRetry);
        
        // If we've reached max retries, throw the error
        if (currentRetry > MAX_RETRIES) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(`Failed after ${MAX_RETRIES} attempts: ${errorMessage}`);
          return null;
        }
        
        // Otherwise, wait and retry
        await new Promise(resolve => setTimeout(resolve, RETRY_BACKOFF * currentRetry));
      }
    }
    
    // This should never be reached due to the return above
    setError('Unexpected error in retry logic');
    return null;
  };
  
  // Create a theme preset from the generated data
  const createThemePreset = (
    proposal: GenerateResponse['proposal'],
    name: string = 'AI Generated'
  ): ThemePreset => {
    return {
      id: `ai-${Date.now()}`,
      name,
      colours: proposal.colors || [],
      fonts: proposal.fonts || { primary: 'Arial' },
      icons: proposal.icons
    };
  };
  
  // Apply generated elements to the current theme
  const applyGeneratedElements = (
    currentTheme: ThemeJSON,
    proposal: GenerateResponse['proposal']
  ): ThemeJSON => {
    // Create a deep copy to avoid mutation issues
    const updatedTheme = JSON.parse(JSON.stringify(currentTheme));
    
    // Apply colors if they were generated
    if (proposal.colors && proposal.colors.length > 0) {
      updatedTheme.colours = proposal.colors;
    }
    
    // Apply fonts if they were generated
    if (proposal.fonts) {
      updatedTheme.fonts = proposal.fonts;
    }
    
    // Apply icons if they were generated
    if (proposal.icons) {
      updatedTheme.icons = proposal.icons;
    }
    
    // Make sure metadata exists
    if (!updatedTheme.metadata) {
      updatedTheme.metadata = {
        source: "manual",
        createdAt: new Date().toISOString()
      };
    }
    
    // Update metadata with basic AI information
    updatedTheme.metadata = {
      ...updatedTheme.metadata,
      aiGenerated: true,
      generationDate: new Date().toISOString(),
      aiProvider: "Gemini"
    };
    
    // Add explanations if they exist
    if (proposal.colorExplanation) {
      updatedTheme.metadata.colorExplanation = proposal.colorExplanation;
    }
    
    if (proposal.fontExplanation) {
      updatedTheme.metadata.fontExplanation = proposal.fontExplanation;
    }
    
    if (proposal.iconExplanation) {
      updatedTheme.metadata.iconExplanation = proposal.iconExplanation;
    }
    
    // Add the proposal as a preset
    const newPreset = createThemePreset(proposal);
    updatedTheme.presets = [
      ...(updatedTheme.presets || []),
      newPreset
    ];
    
    return updatedTheme;
  };
  
  return {
    generateThemeElements,
    applyGeneratedElements,
    createThemePreset,
    isLoading,
    error,
    retries,
    maxRetries: MAX_RETRIES
  };
} 