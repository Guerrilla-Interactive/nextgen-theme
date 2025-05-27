'use client';

import React, { useState, useEffect } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';
import GenerationOptionsDialog, { GenerationOptions } from '../GenerationOptionsDialog';
import { ColorInfo } from '../../context/ThemeTypes'; // Assuming ColorInfo is here
import { palettePresets } from './palette-presets';

// Industry options for the form
const INDUSTRY_OPTIONS = [
  'Technology', 
  'Healthcare', 
  'Finance', 
  'Education', 
  'Retail', 
  'Food & Beverage', 
  'Entertainment', 
  'Travel', 
  'Manufacturing',
  'Professional Services',
  'Construction',
  'Real Estate',
  'Agriculture',
  'Energy',
  'Transportation',
  'Media',
  'Nonprofit',
  'Other'
];

// Brand tone options for the form
const TONE_OPTIONS = [
  'Professional', 
  'Friendly', 
  'Luxurious', 
  'Playful', 
  'Minimalist', 
  'Bold', 
  'Traditional', 
  'Innovative', 
  'Eco-friendly',
  'Trustworthy',
  'Energetic',
  'Sophisticated',
  'Creative',
  'Authoritative',
  'Warm',
  'Technical',
  'Approachable',
  'Other'
];



// NEW: Define structures for Palette Presets
interface PresetColor {
  name: 'Primary' | 'Secondary' | 'Accent' | 'Text' | 'Background';
  hex: string;
}

interface PalettePreset {
  id: string; // Unique ID for the preset
  name: string; // e.g., "Tech Blue", "Earthy Tones"
  colors: PresetColor[]; // Exactly 5 colors in the order: Primary, Secondary, Accent, Text, Background
  tags: string[]; // Keywords for filtering, e.g., ['technology', 'professional', 'modern']
  relevance: number; // Added for sorting by relevance
  primaryHue?: number; // Optional: for more advanced filtering later
}

// Color Similarity Helper Functions
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  if (!hex) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const colorDistance = (
  rgb1: { r: number; g: number; b: number },
  rgb2: { r: number; g: number; b: number }
): number => {
  if (!rgb1 || !rgb2) return Infinity; // Should not happen if hexToRgb is sound
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
};

const calculatePaletteSimilarity = (
  userColors: {
    primary?: string; 
    secondary?: string; 
    accent?: string;
  },
  preset: PalettePreset
): number => {
  let totalDistance = 0;
  let colorsCompared = 0;

  const userPrimaryRgb = userColors.primary ? hexToRgb(userColors.primary) : null;
  const userSecondaryRgb = userColors.secondary ? hexToRgb(userColors.secondary) : null;
  const userAccentRgb = userColors.accent ? hexToRgb(userColors.accent) : null;

  const presetPrimary = preset.colors.find(c => c.name === 'Primary');
  const presetSecondary = preset.colors.find(c => c.name === 'Secondary');
  const presetAccent = preset.colors.find(c => c.name === 'Accent');

  if (userPrimaryRgb && presetPrimary) {
    const presetPrimaryRgb = hexToRgb(presetPrimary.hex);
    if (presetPrimaryRgb) {
      totalDistance += colorDistance(userPrimaryRgb, presetPrimaryRgb);
      colorsCompared++;
    }
  }
  if (userSecondaryRgb && presetSecondary) {
    const presetSecondaryRgb = hexToRgb(presetSecondary.hex);
    if (presetSecondaryRgb) {
      totalDistance += colorDistance(userSecondaryRgb, presetSecondaryRgb);
      colorsCompared++;
    }
  }
  if (userAccentRgb && presetAccent) {
    const presetAccentRgb = hexToRgb(presetAccent.hex);
    if (presetAccentRgb) {
      totalDistance += colorDistance(userAccentRgb, presetAccentRgb);
      colorsCompared++;
    }
  }

  if (colorsCompared === 0) return Infinity; // No valid colors to compare
  return totalDistance / colorsCompared; // Average distance
};

// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]; // Create a copy to avoid mutating the original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
};

export default function BusinessQuestionStep() {
  const { 
    getThemeData, 
    updateTheme, 
    completeCurrentStep, 
    previous, 
    next,
    getPath,
    hasLogo,
    hasColours,
    hasFonts
  } = useWizardNavigation();
  
  const theme = getThemeData();
  const path = getPath();
  
  // Initialize form state from theme metadata if it exists
  const [industry, setIndustry] = useState(theme.metadata?.businessType || '');
  const [customIndustry, setCustomIndustry] = useState('');
  const [tone, setTone] = useState(theme.metadata?.tone || '');
  const [customTone, setCustomTone] = useState('');
  
  // State for Palette Presets
  // Initialize with imported JSON and use type assertion
  const [allPalettePresets, setAllPalettePresets] = useState<PalettePreset[]>(palettePresets as PalettePreset[]);
  const [filteredPalettePresets, setFilteredPalettePresets] = useState<PalettePreset[]>(palettePresets as PalettePreset[]); // Initially show all
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  
  // NEW State for Color Picker and Tags
  const [pickedColor, setPickedColor] = useState<string>(''); // Stores hex value from color picker
  const [activeColorTags, setActiveColorTags] = useState<string[]>([]); // Stores selected color tags
  const [harmonyTags, setHarmonyTags] = useState<string[]>([]); // NEW: For harmony tags only
  
  // AI generation state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [useAiSuggestions, setUseAiSuggestions] = useState(true);
  
  // Validation state - simplify since nothing is required
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});
  
  // Replace RegenerationDialog with GenerationOptionsDialog
  const [showGenerationOptions, setShowGenerationOptions] = useState(false);
  
  // Effect to mark this step as complete no matter what
  useEffect(() => {
    completeCurrentStep();
  }, [completeCurrentStep]);
  
  // useEffect for filtering palette presets
  useEffect(() => {
    let processedPresets = [...allPalettePresets]; // Start with a copy of all presets

    // 1. Filter by Industry (if selected)
    const selectedIndustry = industry === 'Other' ? customIndustry.toLowerCase() : industry.toLowerCase();
    if (selectedIndustry) {
      processedPresets = processedPresets.filter(preset => 
        preset.tags.some(tag => tag.toLowerCase().includes(selectedIndustry))
      );
    }

    // 2. Filter by Tone (if selected)
    const selectedTone = tone === 'Other' ? customTone.toLowerCase() : tone.toLowerCase();
    if (selectedTone) {
      processedPresets = processedPresets.filter(preset => 
        preset.tags.some(tag => tag.toLowerCase().includes(selectedTone))
      );
    }

    // 3. Filter by Active Color Tags (harmony tags)
    if (activeColorTags.length > 0) {
      processedPresets = processedPresets.filter(preset =>
        activeColorTags.some(activeTag => 
          preset.tags.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
        )
      );
    }

    // 4. Calculate scores and sort
    const rgbPickedColor = pickedColor ? hexToRgb(pickedColor) : null;
    const harmonyPenaltyMap: Record<string, number> = {
      'monochromatic': 100,
      'analogous': 70,
      'complementary': 50,
      'split-complementary': 40,
      'triadic': 30,
      'tetradic': 20,
    };
    const PREMIUM_BOOST_FACTOR = 5;

    if (rgbPickedColor) {
      processedPresets = processedPresets
        .map(preset => {
          const isPremium = preset.tags.some(tag => tag.toLowerCase() === 'premium');
          const presetPrimary = preset.colors.find(c => c.name === 'Primary');
          const presetSecondary = preset.colors.find(c => c.name === 'Secondary');
          const presetAccent = preset.colors.find(c => c.name === 'Accent');

          const distPrimary = presetPrimary && rgbPickedColor ? colorDistance(rgbPickedColor, hexToRgb(presetPrimary.hex)!) : Infinity;
          const distSecondary = presetSecondary && rgbPickedColor ? colorDistance(rgbPickedColor, hexToRgb(presetSecondary.hex)!) : Infinity;
          const distAccent = presetAccent && rgbPickedColor ? colorDistance(rgbPickedColor, hexToRgb(presetAccent.hex)!) : Infinity;
          
          let rawWeightedScore = 0;
          if (distPrimary !== Infinity) rawWeightedScore += distPrimary * 4;
          if (distSecondary !== Infinity) rawWeightedScore += distSecondary * 1.5;
          if (distAccent !== Infinity) rawWeightedScore += distAccent * 1;
          
          if (distPrimary === Infinity && distSecondary === Infinity && distAccent === Infinity) {
            rawWeightedScore = Infinity; 
          }

          if (rawWeightedScore !== Infinity) {
            preset.tags.forEach(tag => {
              const lowerTag = tag.toLowerCase();
              if (harmonyPenaltyMap[lowerTag]) {
                rawWeightedScore += harmonyPenaltyMap[lowerTag];
              }
            });
          }

          const finalWeightedScore = isPremium && rawWeightedScore !== Infinity ? rawWeightedScore / PREMIUM_BOOST_FACTOR : rawWeightedScore;

          return { ...preset, finalSortScore: finalWeightedScore };
        })
        .sort((a, b) => {
          if (Math.abs(a.finalSortScore - b.finalSortScore) > 1e-6) { 
            return a.finalSortScore - b.finalSortScore; // Ascending for weighted score
          }
          // Tie-break with original relevance if scores are identical
          const aIsPremium = a.tags.some(tag => tag.toLowerCase() === 'premium');
          const bIsPremium = b.tags.some(tag => tag.toLowerCase() === 'premium');
          const aRelevance = aIsPremium ? a.relevance * PREMIUM_BOOST_FACTOR : a.relevance;
          const bRelevance = bIsPremium ? b.relevance * PREMIUM_BOOST_FACTOR : b.relevance; 
          return bRelevance - aRelevance; // Descending for relevance
        });
    } else {
      // No color picked, sort by relevance (with premium boost)
      processedPresets = processedPresets
        .map(preset => {
          const isPremium = preset.tags.some(tag => tag.toLowerCase() === 'premium');
          const effectiveRelevance = isPremium ? preset.relevance * PREMIUM_BOOST_FACTOR : preset.relevance;
          return { ...preset, finalSortScore: effectiveRelevance };
        })
        .sort((a, b) => b.finalSortScore - a.finalSortScore); // Descending for relevance
    }
    
    // 5. Conditional Shuffle and Limit final results (remains the same)
    const FINAL_LIMIT = 30;
    let limitedPresets;

    if (pickedColor) {
      const PRE_SHUFFLE_LIMIT = 60;
      const candidatesToShuffle = processedPresets.slice(0, PRE_SHUFFLE_LIMIT);
      const shuffledTopCandidates = shuffleArray(candidatesToShuffle);
      limitedPresets = shuffledTopCandidates.slice(0, FINAL_LIMIT);
    } else {
      const shuffledProcessedPresets = shuffleArray([...processedPresets]);
      limitedPresets = shuffledProcessedPresets.slice(0, FINAL_LIMIT);
    }
    
    setFilteredPalettePresets(limitedPresets);

  }, [
    industry, 
    customIndustry, 
    tone, 
    customTone, 
    allPalettePresets, 
    pickedColor,       
    activeColorTags,   
  ]);
  
  // NEW: useEffect to extract available color tags from presets and categorize them
  useEffect(() => {
    const allPresetTags = allPalettePresets.flatMap(preset => preset.tags.map(tag => tag.toLowerCase()));
    const uniquePresetTags = [...new Set(allPresetTags)];

    // Define specific harmony types we are looking for
    const targetHarmonyKeywords = [
      'monochromatic', 'analogous', 'complementary', 'split-complementary', 'triadic', 'tetradic'
    ];

    const availableHarmonies: string[] = [];

    uniquePresetTags.forEach(tag => {
      if (targetHarmonyKeywords.includes(tag)) {
        if (!availableHarmonies.includes(tag)) {
          availableHarmonies.push(tag);
        }
      }
    });

    availableHarmonies.sort(); 

    setHarmonyTags(availableHarmonies);

  }, [allPalettePresets]);
  
  // NEW: Handler for toggling color tags
  const handleColorTagToggle = (tagToToggle: string) => {
    setActiveColorTags(prevTags => 
      prevTags.includes(tagToToggle) 
        ? prevTags.filter(tag => tag !== tagToToggle) 
        : [...prevTags, tagToToggle]
    );
    // When a color tag is toggled, it implies user is not selecting a single preset directly
    // So, clear selectedPresetId to ensure filtering logic re-evaluates based on tags/industry/tone etc.
    setSelectedPresetId(null);
  };
  
  // Add a useEffect to check if we need to generate both colors and fonts
  useEffect(() => {
    // Log the current theme state for debugging
    console.log("Current theme state:", theme);
  }, [theme]);
  
  // Validate the form - now always returns true since nothing is required
  const isFormValid = () => {
    return true;
  };
  
  // Split the AI generation function into two parts: one to show the dialog if needed, one to actually generate
  const handleGenerateClick = () => {
    // Always show the generation options dialog
    setShowGenerationOptions(true);
  };
  
  // Modify the generateWithAI function to use the options from the dialog
  const generateWithAI = async (options: GenerationOptions) => {
    // Destructure the options
    const {
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
    } = options;
    
    // Mark fields as touched for tracking
    const touchedFields: Record<string, boolean> = {};
    ['industry', 'tone'].forEach(field => {
      touchedFields[field] = true;
    });
    setIsTouched(touchedFields);
    
    // Save business info to theme metadata
    const businessData = {
      businessType: industry === 'Other' ? customIndustry : industry,
      tone: tone === 'Other' ? customTone : tone,
      useAiSuggestions: true
    };
    
    // Always get the latest theme state
    const currentTheme = getThemeData();
    
    // Create a base theme with business data, but preserve colors/fonts if using them for influence
    const preparedTheme = {
      ...currentTheme,
      metadata: {
        ...currentTheme.metadata,
        ...businessData,
        // Clear explanations if we're regenerating
        colorExplanation: regenerateColors ? undefined : currentTheme.metadata?.colorExplanation,
        fontExplanation: regenerateFonts ? undefined : currentTheme.metadata?.fontExplanation,
        iconExplanation: currentTheme.metadata?.iconExplanation
      }
    };
    
    // Only clear colors if we're regenerating AND not using existing colors for influence
    if (regenerateColors && !useColors) {
      preparedTheme.colours = [];
    }
    
    // Only clear fonts if we're regenerating AND not using existing fonts for influence
    if (regenerateFonts && !useFonts) {
      preparedTheme.fonts = null;
    }
    
    // Start AI generation
    setIsAiGenerating(true);
    
    // Prepare request payload for Gemini API
    const generateRequest = {
      themeData: preparedTheme, // Use the prepared theme as the base
      generateRequest: {
        colors: regenerateColors,
        fonts: regenerateFonts,
        icons: false, // Icons are handled separately in the Icons step
        // Add the options for what to use as input
        useLogo: useLogo,
        useColors: useColors,
        useFonts: useFonts,
        useIcons: useIcons,
        useBusinessDetails: useBusinessDetails,
        colorInfluence: colorInfluence,
        fontInfluence: fontInfluence,
        businessDetailsInfluence: businessDetailsInfluence
      }
    };
    
    console.log("Sending AI generation request with options:", generateRequest);
    
    // Implement retry logic
    const MAX_RETRIES = 3;
    let attempts = 0;
    let success = false;
    let lastError = null;
    let data = null;
    
    while (attempts < MAX_RETRIES && !success) {
      attempts++;
      try {
        // Call the generate API
        let response;
        try {
          console.log(`Attempt ${attempts} of ${MAX_RETRIES}...`);
          response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateRequest),
          });
        } catch (fetchError) {
          console.error(`Network error during fetch (attempt ${attempts}):`, fetchError);
          throw new Error(`Network error: ${fetchError.message}`);
        }
        
        if (!response.ok) {
          try {
            const errorText = await response.text();
            console.error(`API Error Response (attempt ${attempts}):`, errorText);
            
            try {
              const errorData = JSON.parse(errorText);
              
              // Special handling for API key issues
              if (errorData.missingApiKey) {
                throw new Error("Gemini API key is missing. Please add your API key to the environment variables.");
              }
              
              if (errorData.invalidApiKey) {
                throw new Error("Gemini API key appears to be invalid. Please check your API key format.");
              }
              
              throw new Error(errorData.error || `Failed with status: ${response.status}`);
            } catch (jsonError) {
              throw new Error(`Failed with status: ${response.status}. Response was not valid JSON: ${errorText.substring(0, 150)}...`);
            }
          } catch (textError) {
            throw new Error(`Failed with status: ${response.status}. Could not read response body.`);
          }
        }
        
        // Parse response
        try {
          data = await response.json();
          console.log(`Received API response (attempt ${attempts}):`, data);
          success = true; // If we got here, the request was successful
        } catch (jsonError) {
          console.error(`Failed to parse JSON response (attempt ${attempts}):`, jsonError);
          throw new Error("Failed to parse API response as JSON");
        }
      } catch (error) {
        lastError = error;
        console.error(`Error in attempt ${attempts}:`, error);
        
        // If this isn't our last attempt, wait a moment before retrying
        if (attempts < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        }
      }
    }
    
    // Handle final outcome
    try {
      if (!success) {
        throw new Error(`Failed after ${MAX_RETRIES} attempts. ${lastError?.message || "Unknown error"}`);
      }
      
      // Start with the prepared theme to avoid any stale data
      const updatedThemeData = JSON.parse(JSON.stringify(preparedTheme));
      
      // Update metadata
      updatedThemeData.metadata = {
        ...updatedThemeData.metadata,
        aiGenerated: true,
        generationDate: new Date().toISOString(),
        aiProvider: "Gemini"
      };
      
      // Apply color updates if we generated colors
      if (regenerateColors && data.proposal && data.proposal.colors) {
        console.log("Applying generated colors:", data.proposal.colors);
        updatedThemeData.colours = data.proposal.colors;
        updatedThemeData.metadata.colorExplanation = data.proposal.colorExplanation || "AI-generated color palette";
      }
      
      // Apply font updates if we generated fonts
      if (regenerateFonts && data.proposal && data.proposal.fonts) {
        console.log("Applying generated fonts:", data.proposal.fonts);
        updatedThemeData.fonts = {
          primary: data.proposal.fonts.primary,
          secondary: data.proposal.fonts.secondary || undefined,
          primaryUsage: data.proposal.fonts.primaryUsage,
          secondaryUsage: data.proposal.fonts.secondaryUsage,
          heading1: data.proposal.fonts.heading1,
          heading2: data.proposal.fonts.heading2,
          heading3: data.proposal.fonts.heading3,
          body: data.proposal.fonts.body,
          accent: data.proposal.fonts.accent
        };
        updatedThemeData.metadata.fontExplanation = data.proposal.fontExplanation || "AI-recommended font pairing";
      }
      
      // Update the theme with the fully updated object
      console.log("Final updated theme with reset data:", updatedThemeData);
      updateTheme(updatedThemeData);
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      alert(`Sorry, the AI service is having trouble right now. ${attempts > 1 ? `We tried ${attempts} times but` : "We"} couldn't generate suggestions. Please try again later or proceed without AI recommendations.`);
    } finally {
      // Always finish loading regardless of success or failure
      setIsAiGenerating(false);
      // Close the dialog if it was open
      setShowGenerationOptions(false);
    }
  };
  
  // Handle form submission - simplified to just save data without AI generation
  const handleSubmit = (e?: React.FormEvent) => {
    // Always prevent default form submission
    if (e) {
      e.preventDefault();
    }
    
    // Mark fields as touched for tracking
    const touchedFields: Record<string, boolean> = {};
    ['industry', 'tone'].forEach(field => {
      touchedFields[field] = true;
    });
    setIsTouched(touchedFields);
    
    // Save business info to theme metadata
    const businessData = {
      businessType: industry === 'Other' ? customIndustry : industry,
      tone: tone === 'Other' ? customTone : tone,
      useAiSuggestions: useAiSuggestions
    };
    
    updateTheme({
      ...theme,
      metadata: {
        ...theme.metadata,
        ...businessData
      }
    });
    
    // Just proceed to next step
    next();
  };
  
  // Handle field touch state
  const handleBlur = (field: string) => {
    // Ensure only valid fields are tracked
    if (['industry', 'tone'].includes(field)) {
      setIsTouched({
        ...isTouched,
        [field]: true
      });
    }
  };
  
  // For testing/debugging purposes
  const forceNext = () => {
    // Save business info to theme metadata
    const businessData = {
      businessType: industry === 'Other' ? customIndustry : industry,
      tone: tone === 'Other' ? customTone : tone,
      useAiSuggestions: useAiSuggestions
    };
    
    updateTheme({
      ...theme,
      metadata: {
        ...theme.metadata,
        ...businessData
      }
    });
    
    // Skip AI simulation and proceed directly
    next();
  };
  
  // Helper to generate button text based on what needs to be generated
  const getGenerateButtonText = () => {
    return 'Generate AI Recommendations';
  };
  
  // Define handlePresetSelect function
  const handlePresetSelect = (preset: PalettePreset) => {
    setSelectedPresetId(preset.id);

    // Transform PresetColors to ColorInfo[]
    const presetColorsToColorInfo = (presetColors: PresetColor[]): ColorInfo[] => {
      const colorInfoArray: ColorInfo[] = [];
      const cssVarMap: Record<PresetColor['name'], string[]> = {
        Background: ['background', 'card'],
        Text: ['foreground', 'card-foreground', 'muted', 'muted-foreground', 'popover-foreground'], // Text covers more
        Primary: ['primary', 'primary-foreground', 'ring', 'popover'], // Primary can be popover bg
        Secondary: ['secondary', 'secondary-foreground', 'input', 'border'], // Secondary for inputs/borders
        Accent: ['accent', 'accent-foreground', 'chart-1'] // Accent for main accent and a chart color
      };

      presetColors.forEach(pc => {
        let category: 'main' | 'supplement' = 'supplement';
        let mainColorType: 'primary' | 'secondary' | 'contrast' | undefined = undefined;

        switch (pc.name) {
          case 'Primary':
            category = 'main';
            mainColorType = 'primary';
            break;
          case 'Secondary':
            category = 'main';
            mainColorType = 'secondary';
            break;
          case 'Text': // Considered main contrast
            category = 'main';
            mainColorType = 'contrast';
            break;
          case 'Background': // Considered main contrast
            category = 'main';
            mainColorType = 'contrast';
            break;
          case 'Accent':
            category = 'supplement'; // Accent colors from presets are treated as supplementary
            // mainColorType remains undefined for supplement category
            break;
        }

        colorInfoArray.push({
          hex: pc.hex,
          name: pc.name,
          category: category,
          mainColorType: mainColorType,
          description: `A ${pc.name.toLowerCase()} color for the theme, part of the "${preset.name}" preset.`, // Generic description
          idealUsecases: cssVarMap[pc.name] || [],
        });
      });
      
      // Ensure we have distinct destructive and success colors, even if not in preset
      // These will be empty for now, AI can fill them if requested later.
      // Or, we could add default hex values if desired.
      if (!colorInfoArray.some(c => c.idealUsecases.includes('destructive'))) {
        colorInfoArray.push({
          hex: '#dc3545', // Default destructive (Bootstrap red)
          name: 'Destructive',
          category: 'supplement',
          description: 'Default destructive/error color.',
          idealUsecases: ['destructive', 'destructive-foreground'],
        });
      }
       if (!colorInfoArray.some(c => c.idealUsecases.includes('chart-2'))) { // Using chart-2 for success for now
        colorInfoArray.push({
          hex: '#28a745', // Default success (Bootstrap green)
          name: 'Success',
          category: 'supplement',
          description: 'Default success/confirmation color.',
          idealUsecases: ['chart-2'], // Map to a chart var or a new semantic var
        });
      }

      return colorInfoArray;
    };

    const newColors = presetColorsToColorInfo(preset.colors);

    updateTheme({
      ...theme,
      colours: newColors,
      metadata: {
        ...theme.metadata,
        colorExplanation: `Selected the "${preset.name}" color palette preset.`, // Update explanation
        // Reset AI generation DNA if a preset is selected, as it might not match AI params
        colorGenerationDNA: undefined, 
      }
    });
  };
  
  return (
    <div className="business-question-step">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Tell Us About Your Business</h2>
        <p className="text-gray-600">
          {path === 'A' 
            ? "This information will help us better understand your brand when processing your guide." 
            : "This information will help us generate design elements that match your brand identity."}
          {path === 'B' && " Missing theme elements will be AI-generated based on your responses."}
        </p>
      </div>
      
      {/* Debug button - Remove in production */}
      <button 
        type="button" 
        onClick={forceNext}
        className="mb-4 px-3 py-1 bg-green-500 text-white text-xs rounded"
      >
        Debug: Force Next
      </button>
      
      <form 
        className="business-form space-y-6" 
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Industry Selection */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="industry">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              handleBlur('industry');
            }}
            onBlur={() => handleBlur('industry')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an industry</option>
            {INDUSTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          
          {industry === 'Other' && (
            <input
              type="text"
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
              onBlur={() => handleBlur('industry')}
              placeholder="Enter your industry"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
        
        {/* MOVED and MODIFIED Color Picker and Tags Filter Section HERE */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h4 className="text-md font-semibold text-gray-700 mb-3">Filter Palette Suggestions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-end">
            {/* Color Picker Input */}
            <div>
              <label htmlFor="colorPickerInput" className="block text-sm font-medium text-gray-700 mb-1">
                Find palettes close to this color:
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="colorPickerInput"
                  value={pickedColor || '#ffffff'} 
                  onChange={(e) => setPickedColor(e.target.value)}
                  className="h-10 w-16 p-1 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {pickedColor && (
                  <button 
                    type="button"
                    onClick={() => setPickedColor('')} 
                    className="ml-2 text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Color Harmony Tags Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by color harmony:
              </label>
              <div className="flex flex-wrap gap-2" id="harmonyTagsContainer">
                {harmonyTags.length === 0 && <p className="text-xs text-gray-500">No harmony tags available from presets.</p>}
                {harmonyTags.map(tag => (
                  <button
                    key={`harmony-${tag}`}
                    type="button"
                    onClick={() => handleColorTagToggle(tag)}
                    className={`px-3 py-1 text-xs rounded-full border 
                                ${activeColorTags.includes(tag) 
                                  ? 'bg-blue-500 text-white border-blue-500' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Brand Tone - This was previously above the filter section, now below. */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tone">
            Brand Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => {
              setTone(e.target.value);
              handleBlur('tone');
            }}
            onBlur={() => handleBlur('tone')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a brand tone</option>
            {TONE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          
          {tone === 'Other' && (
            <input
              type="text"
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
              onBlur={() => handleBlur('tone')}
              placeholder="Enter your brand tone"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
        
        {/* Palette Preset Selection Section */}
        <div className="form-group mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Palette Suggestions</h3>
          {filteredPalettePresets.length > 0 ? (
            <div key="palette-grid-container" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {filteredPalettePresets.map((preset) => (
                <button // Changed from div to button for click handling & accessibility
                  key={preset.id} // Correctly keyed by unique preset.id
                  id={`preset-${preset.id}`}
                  type="button" // Important for forms
                  onClick={() => handlePresetSelect(preset)} // Define this handler next
                  className={` rounded-lg p-2 transition-all text-left 
                              ${selectedPresetId === preset.id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'}`}
                >
                  <p className="font-semibold hidden text-gray-700 mb-2">{preset.name}</p>
                  <div className="flex space-x-1 mb-2">
                    {preset.colors.map((color, index) => (
                      <div 
                        key={`${preset.id}-${color.name}-${index}`}
                        className="h-24 w-full rounded border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name}: ${color.hex}`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 capitalize">
                    Tags: {preset.tags.join(', ')}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No palette suggestions match your current selections. Try adjusting industry/tone or explore our full range by clearing selections.
            </p>
          )}
        </div>
        
        {/* AI Options Section */}
        <div className="form-group bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-3">AI Generation</h3>
          
          <p className="text-sm text-gray-600 mb-4">
            Our AI can analyze your business information to recommend colors, fonts, and other design elements that align with your brand identity.
          </p>
          
          {/* AI Generation Button */}
          <button
            type="button"
            onClick={handleGenerateClick}
            disabled={isAiGenerating}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              isAiGenerating 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isAiGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              getGenerateButtonText()
            )}
          </button>
          
          {/* Show generated explanations if available */}
          {!isAiGenerating && (
            <>
              {theme.metadata?.colorExplanation && (
                <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-1">AI Generated Colors</h4>
                  <p className="text-sm text-blue-700">{theme.metadata.colorExplanation}</p>
                </div>
              )}
              
              {theme.metadata?.fontExplanation && (
                <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-1">AI Generated Fonts</h4>
                  <p className="text-sm text-blue-700">{theme.metadata.fontExplanation}</p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Replace the RegenerationDialog with the GenerationOptionsDialog */}
        <GenerationOptionsDialog
          isOpen={showGenerationOptions}
          onClose={() => setShowGenerationOptions(false)}
          onConfirm={(options) => {
            generateWithAI(options);
          }}
          theme={theme}
          generationType="both"
          hasLogoSelected={hasLogo}
          hasColoursSelected={hasColours}
          hasFontsSelected={hasFonts}
        />
        
        {/* Hidden submit button for form validation */}
        <button type="submit" className="hidden">Submit</button>
      </form>
    </div>
  );
} 