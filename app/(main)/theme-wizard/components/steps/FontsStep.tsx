'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';
import GenerationOptionsDialog, { GenerationOptions } from '../GenerationOptionsDialog';
import { FontInfo } from '../../context/ThemeTypes';
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/features/unorganized-components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/features/unorganized-components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/unorganized-components/ui/popover";
import { cn } from '@/features/unorganized-utils/utils';

// --- NEW STRUCTURE FOR GOOGLE FONTS ---
interface GoogleFontFamily {
  name: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
  // variants?: string[]; // For future enhancement: e.g., ['regular', 'italic', '700', '700italic']
  // subsets?: string[];  // For future enhancement: e.g., ['latin', 'cyrillic']
}

// IMPORTANT: For a production application, this list should be fetched dynamically
// at build time or runtime from a reliable Google Fonts API source or a regularly updated JSON file.
// Hardcoding a massive list here is not scalable or maintainable.
// This is a small, SIMULATED list for demonstration purposes.
// For a production app, this list **MUST** be fetched dynamically (e.g., at build time)
// from a reliable Google Fonts API source or a regularly updated JSON file,
// and the Combobox CommandList **MUST** be virtualized for performance with large datasets.
const ALL_GOOGLE_FONTS_SIMULATED_LIST: GoogleFontFamily[] = [
  { name: 'Roboto', category: 'sans-serif' },
  { name: 'Open Sans', category: 'sans-serif' },
  { name: 'Lato', category: 'sans-serif' },
  { name: 'Montserrat', category: 'sans-serif' },
  { name: 'Slabo 27px', category: 'serif' },
  { name: 'Merriweather', category: 'serif' },
  { name: 'Playfair Display', category: 'serif' },
  { name: 'Dancing Script', category: 'handwriting' },
  { name: 'Pacifico', category: 'handwriting' },
  { name: 'Lobster', category: 'display' },
  { name: 'Patua One', category: 'display' },
  { name: 'Inconsolata', category: 'monospace' },
  { name: 'Source Code Pro', category: 'monospace' },
  { name: 'Nunito', category: 'sans-serif' },
  { name: 'Poppins', category: 'sans-serif' },
  { name: 'Oswald', category: 'sans-serif' },
  { name: 'Raleway', category: 'sans-serif' },
  { name: 'Lora', category: 'serif' },
  { name: 'PT Serif', category: 'serif' },
  { name: 'Indie Flower', category: 'handwriting' },
  { name: 'Bebas Neue', category: 'display' },
  { name: 'Ubuntu Mono', category: 'monospace' },
  { name: 'Syne', category: 'sans-serif' },
  { name: 'Inter', category: 'sans-serif' }, 
  { name: 'Work Sans', category: 'sans-serif' },
  { name: 'DM Sans', category: 'sans-serif' },
  { name: 'Rubik', category: 'sans-serif' },
  { name: 'Karla', category: 'sans-serif' },
  { name: 'Zilla Slab', category: 'serif' },
  { name: 'Bitter', category: 'serif' },
  { name: 'Domine', category: 'serif' },
  { name: 'Caveat', category: 'handwriting' },
  { name: 'Shadows Into Light Two', category: 'handwriting' },
  { name: 'Abril Fatface', category: 'display' },
  { name: 'Anton', category: 'display' }, 
  { name: 'Fira Code', category: 'monospace' },
  { name: 'JetBrains Mono', category: 'monospace' },
];

// Updated helper: if a font is in our list (and not custom/none), it's a Google Font
// This might need adjustment if we mix Google Fonts with system fonts from a single source later.
const isGoogleFont = (fontName: string): boolean => 
  ALL_GOOGLE_FONTS_SIMULATED_LIST.some(font => font.name === fontName);

// Dynamically create categories for the Combobox based on the simulated list
const DYNAMIC_FONT_CATEGORIES = ALL_GOOGLE_FONTS_SIMULATED_LIST.reduce((acc, font) => {
  if (!acc[font.category]) {
    acc[font.category] = [];
  }
  acc[font.category].push(font);
  return acc;
}, {} as Record<string, GoogleFontFamily[]>);

// Font usage options
const FONT_USAGE_OPTIONS = {
  primary: ['Headings', 'Headers', 'Titles', 'Logos', 'Display', 'Brand Elements'],
  secondary: ['Body Text', 'Paragraphs', 'Content', 'UI Elements', 'Navigation']
};

// Sample text for font preview
const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Sphinx of black quartz, judge my vow."
];

// Ensure POPULAR_FONTS is also available if used in initial state logic, or remove that dependency.
const POPULAR_FONTS: string[] = []; // Placeholder if not used elsewhere for initialization

export default function FontsStep() {
  const { 
    getThemeData, 
    updateTheme, 
    completeCurrentStep, 
    previous, 
    next, 
    setHasFonts,
    hasLogo,
    hasColours,
    hasFonts: hasFontsFlag
  } = useWizardNavigation();
  
  const theme = getThemeData();
  
  const [primaryPopoverOpen, setPrimaryPopoverOpen] = useState(false);
  const [secondaryPopoverOpen, setSecondaryPopoverOpen] = useState(false);
  
  const activePrimaryFontLinkRef = useRef<HTMLLinkElement | null>(null);
  const activeSecondaryFontLinkRef = useRef<HTMLLinkElement | null>(null);
  
  const [allGoogleFonts, setAllGoogleFonts] = useState<GoogleFontFamily[]>([]);
  const [isLoadingFonts, setIsLoadingFonts] = useState(true);
  const [dynamicFontCategories, setDynamicFontCategories] = useState<Record<string, GoogleFontFamily[]>>({});

  // State for font source selection
  const [primaryFontSource, setPrimaryFontSource] = useState<'google' | 'custom'>(
    theme.fonts?.primary && !allGoogleFonts.some(f => f.name === theme.fonts?.primary) && POPULAR_FONTS.includes(theme.fonts?.primary || '') === false // Basic initial guess
    ? 'custom' 
    : 'google'
  );
  const [secondaryFontSource, setSecondaryFontSource] = useState<'google' | 'custom' | 'none'>(
    theme.fonts?.secondary === undefined || theme.fonts?.secondary === 'none' 
      ? 'none' 
      : theme.fonts?.secondary && !allGoogleFonts.some(f => f.name === theme.fonts?.secondary) && POPULAR_FONTS.includes(theme.fonts?.secondary || '') === false // Basic initial guess
        ? 'custom' 
        : 'google'
  );
  
  const [primaryFont, setPrimaryFont] = useState(theme.fonts?.primary || '');
  const [secondaryFont, setSecondaryFont] = useState(theme.fonts?.secondary || 'none'); // Default to 'none' if undefined
  const [customPrimaryFont, setCustomPrimaryFont] = useState(primaryFontSource === 'custom' ? theme.fonts?.primary || '' : '');
  const [customSecondaryFont, setCustomSecondaryFont] = useState(secondaryFontSource === 'custom' ? theme.fonts?.secondary || '' : '');
  const [fontError, setFontError] = useState<string | null>(null);
  const [sampleText, setSampleText] = useState(SAMPLE_TEXTS[0]);
  
  // Additional state for font usage details
  const [primaryUsage, setPrimaryUsage] = useState(theme.fonts?.primaryUsage || '');
  const [secondaryUsage, setSecondaryUsage] = useState(theme.fonts?.secondaryUsage || '');
  const [heading1Font, setHeading1Font] = useState(theme.fonts?.heading1 || '');
  const [heading2Font, setHeading2Font] = useState(theme.fonts?.heading2 || '');
  const [heading3Font, setHeading3Font] = useState(theme.fonts?.heading3 || '');
  const [bodyFont, setBodyFont] = useState(theme.fonts?.body || '');
  const [accentFont, setAccentFont] = useState(theme.fonts?.accent || '');
  
  // Show/hide detailed font settings
  const [showFontDetails, setShowFontDetails] = useState(false);
  
  // AI generation state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  
  // Replace RegenerationDialog with GenerationOptionsDialog
  const [showGenerationOptions, setShowGenerationOptions] = useState(false);
  
  // Mark step as complete when fonts are selected (but don't override user's hasFonts choice)
  useEffect(() => {
    // Only mark as complete if user said they have fonts and they've actually selected some
    // OR if user said they don't have fonts (they can still complete this step)
    if ((theme.fonts && theme.fonts.primary) || !hasFontsFlag) {
      completeCurrentStep();
    }
  }, [theme.fonts, hasFontsFlag, completeCurrentStep]);
  
  // Rotate through sample texts
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSampleText(prevText => {
        const currentIndex = SAMPLE_TEXTS.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % SAMPLE_TEXTS.length;
        return SAMPLE_TEXTS[nextIndex];
      });
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Effect to load Google Fonts dynamically
  useEffect(() => {
    const head = document.head;

    const updateFontLink = (
      fontName: string | undefined,
      fontType: 'primary' | 'secondary',
      activeLinkRef: React.MutableRefObject<HTMLLinkElement | null>
    ) => {
      // Remove previous link for this type if it exists
      if (activeLinkRef.current) {
        if (head.contains(activeLinkRef.current)) {
          head.removeChild(activeLinkRef.current);
        }
        activeLinkRef.current = null;
        // console.log(`Removed old Google Font stylesheet for ${fontType}`);
      }

      if (fontName && fontName !== 'custom' && fontName !== 'none' && isGoogleFont(fontName)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        // Request common weights and italic styles
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName.replace(/ /g, '+'))}:ital,wght@0,400;0,700;1,400;1,700&display=swap`;
        link.onload = () => console.log(`${fontName} stylesheet loaded successfully.`);
        link.onerror = () => console.error(`Error loading stylesheet for ${fontName}.`);
        head.appendChild(link);
        activeLinkRef.current = link;
        // console.log(`Added Google Font stylesheet for ${fontType}: ${fontName}`);
      }
    };

    updateFontLink(primaryFont, 'primary', activePrimaryFontLinkRef);
    updateFontLink(secondaryFont, 'secondary', activeSecondaryFontLinkRef);

    // Cleanup on component unmount
    return () => {
      if (activePrimaryFontLinkRef.current && head.contains(activePrimaryFontLinkRef.current)) {
        head.removeChild(activePrimaryFontLinkRef.current);
      }
      if (activeSecondaryFontLinkRef.current && head.contains(activeSecondaryFontLinkRef.current)) {
        head.removeChild(activeSecondaryFontLinkRef.current);
      }
      // console.log('Cleaned up Google Font stylesheets on unmount.');
    };
  }, [primaryFont, secondaryFont]);
  
  // Effect to load Google Fonts dynamically (keep this as is)
  useEffect(() => {
    // ...
    // One small adjustment for initialization of font source based on loaded fonts
    if (!isLoadingFonts && allGoogleFonts.length > 0) {
      setPrimaryFontSource(
        theme.fonts?.primary && !allGoogleFonts.some(f => f.name === theme.fonts?.primary)
        ? 'custom'
        : 'google'
      );
      setSecondaryFontSource(
        !theme.fonts?.secondary || theme.fonts.secondary === 'none'
        ? 'none'
        : theme.fonts?.secondary && !allGoogleFonts.some(f => f.name === theme.fonts?.secondary)
          ? 'custom'
          : 'google'
      );
      if (primaryFontSource === 'custom') {
        setCustomPrimaryFont(theme.fonts?.primary || '');
      }
      // Initialize customSecondaryFont if the source is initially 'custom'
      if (secondaryFontSource === 'custom' && theme.fonts?.secondary) {
        setCustomSecondaryFont(theme.fonts.secondary);
      }
    }
  }, [isLoadingFonts, allGoogleFonts, theme.fonts?.primary, theme.fonts?.secondary]); // Removed primary/secondaryFontSource

  // ... (useEffect for loading JSON data) ...
  useEffect(() => {
    const loadFonts = async () => {
      try {
        setIsLoadingFonts(true);
        const response = await fetch('/data/google-fonts.json');
        if (!response.ok) {
          // Fallback to simulated list if JSON fails (for development)
          console.warn(`Failed to fetch google-fonts.json: ${response.statusText}. Using simulated list.`);
          // Keep ALL_GOOGLE_FONTS_SIMULATED_LIST defined for this fallback
          setAllGoogleFonts(ALL_GOOGLE_FONTS_SIMULATED_LIST); 
          const categories = ALL_GOOGLE_FONTS_SIMULATED_LIST.reduce((acc, font) => {
            const category = font.category || 'other';
            if (!acc[category]) acc[category] = [];
            acc[category].push(font);
            return acc;
          }, {} as Record<string, GoogleFontFamily[]>);
          setDynamicFontCategories(categories);
        } else {
          const fonts: GoogleFontFamily[] = await response.json();
          setAllGoogleFonts(fonts);
          const categories = fonts.reduce((acc, font) => {
            const category = font.category || 'other';
            if (!acc[category]) acc[category] = [];
            acc[category].push(font);
            return acc;
          }, {} as Record<string, GoogleFontFamily[]>);
          setDynamicFontCategories(categories);
        }
      } catch (error) {
        console.error("Error loading Google Fonts list, falling back to simulated:", error);
        setAllGoogleFonts(ALL_GOOGLE_FONTS_SIMULATED_LIST); // Fallback
        const categories = ALL_GOOGLE_FONTS_SIMULATED_LIST.reduce((acc, font) => {
            const category = font.category || 'other';
            if (!acc[category]) acc[category] = [];
            acc[category].push(font);
            return acc;
        }, {} as Record<string, GoogleFontFamily[]>);
        setDynamicFontCategories(categories);
      } finally {
        setIsLoadingFonts(false);
      }
    };
    loadFonts();
  }, []);
  
  // Handle primary font selection from Combobox
  const handlePrimaryFontSelect = (value: string) => {
    setPrimaryFont(value); // This is the selected Google Font name
    setFontError(null);
    setPrimaryPopoverOpen(false);
    // setPrimaryFontSource('google'); // Source is implicitly google here

    updateTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        primary: value,
        primaryUsage: primaryUsage || 'Headings', // Keep existing or default
        heading1: value, // Default H1 to selected primary
        heading2: value, // Default H2 to selected primary
        heading3: value, // Default H3 to selected primary
      },
    });
  };

  // Apply custom primary font
  const applyCustomPrimaryFont = () => {
    if (!customPrimaryFont.trim()) {
      setFontError('Please enter a font name');
      return;
    }
    const trimmedCustomFont = customPrimaryFont.trim();
    updateTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        primary: trimmedCustomFont,
        primaryUsage: primaryUsage || 'Headings',
        heading1: trimmedCustomFont,
        heading2: trimmedCustomFont,
        heading3: trimmedCustomFont,
      }
    });
    setPrimaryFont(trimmedCustomFont); // Update main font state
    setFontError(null);
    // setPrimaryFontSource('custom'); // Source is implicitly custom here
  };
  
  const handlePrimaryFontSourceChange = (source: 'google' | 'custom') => {
    setPrimaryFontSource(source);
    if (source === 'google') {
      // If switching to Google, and current primaryFont isn't a known Google Font,
      // clear it to force selection. Otherwise, keep it.
      if (primaryFont && !allGoogleFonts.some(f => f.name === primaryFont)) {
        setPrimaryFont(''); // Clear to force re-selection
        // Also clear from theme if it was a custom one
        // updateTheme({ ...theme, fonts: { ...theme.fonts, primary: undefined } }); // Or set to a default Google font
      }
      // If primaryFont is already a Google Font, it's fine
    } else { // source === 'custom'
      // If switching to custom, set primaryFont to the current customPrimaryFont value or empty
      // The actual application of custom font to theme happens in applyCustomPrimaryFont
      setPrimaryFont(customPrimaryFont.trim() || ''); 
    }
  };

  // Handle custom primary font input
  const handleCustomPrimaryFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrimaryFont(e.target.value);
  };
  
  // Handle custom secondary font input
  const handleCustomSecondaryFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSecondaryFont(e.target.value);
  };
  
  // Update font usage details
  const updateFontUsageDetails = () => {
    if (!theme.fonts) return;
    
    updateTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        primaryUsage: primaryUsage,
        secondaryUsage: secondaryUsage,
        heading1: heading1Font || theme.fonts.primary,
        heading2: heading2Font || theme.fonts.primary,
        heading3: heading3Font || theme.fonts.primary,
        body: bodyFont || theme.fonts.secondary || theme.fonts.primary,
        accent: accentFont || theme.fonts.secondary || theme.fonts.primary
      }
    });
  };
  
  // Get the actual fonts to display in preview
  const currentPrimaryFont = primaryFont === 'custom' ? customPrimaryFont : primaryFont;
  const currentSecondaryFont = secondaryFont === 'custom' ? customSecondaryFont : 
                             secondaryFont === 'none' ? undefined : secondaryFont;
  
  // Helper to get font category
  const getFontCategory = (fontName: string): string => {
    const font = ALL_GOOGLE_FONTS_SIMULATED_LIST.find(f => f.name === fontName);
    if (font) {
      return font.category;
    }
    return 'sans-serif'; // Default fallback if font not in our list (e.g. custom)
  };
  
  // Font pair suggestions based on primary font
  const getFontPairSuggestions = (): GoogleFontFamily[] => {
    if (!primaryFont || primaryFont === 'custom') return [];
    
    const primaryFontData = ALL_GOOGLE_FONTS_SIMULATED_LIST.find(f => f.name === primaryFont);
    if (!primaryFontData) return [];

    const primaryCategory = primaryFontData.category;
    
    // Suggest fonts from different categories for contrast
    let suggestedCategoryKey: GoogleFontFamily['category'] = 'sans-serif';
    if (primaryCategory === 'sans-serif') suggestedCategoryKey = 'serif';
    else if (primaryCategory === 'serif') suggestedCategoryKey = 'sans-serif';
    else if (primaryCategory === 'display') suggestedCategoryKey = 'sans-serif';
    else if (primaryCategory === 'handwriting') suggestedCategoryKey = 'sans-serif'; // Or serif
    else if (primaryCategory === 'monospace') suggestedCategoryKey = 'serif'; // Or sans-serif
    
    const suggestions = ALL_GOOGLE_FONTS_SIMULATED_LIST.filter(
      font => font.category === suggestedCategoryKey && font.name !== primaryFont
    );
    
    return suggestions.slice(0, 5);
  };
  
  // Update to always show the generation options dialog
  const handleGenerateClick = () => {
    // Always show the generation options dialog
    setShowGenerationOptions(true);
  };
  
  // Clear secondary font
  const clearSecondaryFont = () => {
    updateTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        secondary: undefined,
        secondaryUsage: undefined,
        body: undefined
      }
    });
    
    setSecondaryFont('none');
  };
  
  // Update the generateAIFontPair function to use the options from the dialog
  const generateAIFontPair = async (options: GenerationOptions) => {
    // Destructure the options
    const {
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
    
    // Only proceed if we're actually regenerating fonts
    if (!regenerateFonts) {
      setShowGenerationOptions(false);
      return;
    }
    
    // Reset state and start loading
    setIsAiGenerating(true);
    
    try {
      // Always get the latest theme state
      const currentTheme = getThemeData();
      
      // Create a version of the theme that preserves or clears fonts
      // based on the useFonts setting. We need to keep the fonts for influence.
      const preparedTheme = {
        ...currentTheme,
        // Only clear fonts if we're not using them for influence
        fonts: useFonts ? currentTheme.fonts : null,
        metadata: {
          ...currentTheme.metadata,
          fontExplanation: undefined // Clear previous explanation
        }
      };
      
      // Prepare request payload
      const generateRequest = {
        themeData: preparedTheme, // Use the prepared theme as the base
        generateRequest: {
          colors: false,
          fonts: true,
          icons: false,
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
      
      console.log("Sending AI generation request for fonts with options:", generateRequest);
      
      // Call the generate API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generateRequest),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate font recommendations');
      }
      
      // Parse response
      const data = await response.json();
      
      if (data.proposal && data.proposal.fonts) {
        // Log received data for debugging
        console.log("Received API font response:", data);
        console.log("Font explanation:", data.proposal.fontExplanation);
        
        const fontRecommendation = data.proposal.fonts;
        
        // Create a new theme object from the prepared theme
        const updatedTheme = JSON.parse(JSON.stringify(preparedTheme));
        
        // Create enhanced font information with usages
        const enhancedFonts: FontInfo = {
          primary: fontRecommendation.primary,
          secondary: fontRecommendation.secondary || undefined,
          primaryUsage: 'Headings, Titles, H1, H2, H3',
          secondaryUsage: fontRecommendation.secondary ? 'Body Text, Paragraphs, UI Elements' : undefined,
          heading1: fontRecommendation.primary,
          heading2: fontRecommendation.primary,
          heading3: fontRecommendation.primary,
          body: fontRecommendation.secondary || fontRecommendation.primary,
          accent: fontRecommendation.secondary || undefined
        };
        
        // Update fonts with enhanced structure
        updatedTheme.fonts = enhancedFonts;
        
        // Update metadata
        updatedTheme.metadata = {
          ...updatedTheme.metadata,
          aiGenerated: true,
          generationDate: new Date().toISOString(),
          aiProvider: "Gemini",
          fontExplanation: data.proposal.fontExplanation || "AI-recommended font pairing"
        };
        
        // Update the theme with the fully updated object
        console.log("Updating theme with new fonts:", updatedTheme.fonts);
        updateTheme(updatedTheme);
        
        // Update local state
        setPrimaryFont(fontRecommendation.primary);
        setSecondaryFont(fontRecommendation.secondary || 'none');
        setPrimaryUsage('Headings, Titles, H1, H2, H3');
        setSecondaryUsage(fontRecommendation.secondary ? 'Body Text, Paragraphs, UI Elements' : '');
        setHeading1Font(fontRecommendation.primary);
        setHeading2Font(fontRecommendation.primary);
        setHeading3Font(fontRecommendation.primary);
        setBodyFont(fontRecommendation.secondary || fontRecommendation.primary);
        setAccentFont(fontRecommendation.secondary || '');
        
        console.log("Updated theme with font explanation:", updatedTheme.metadata.fontExplanation);
      } else {
        throw new Error('No font recommendations returned from AI generation');
      }
    } catch (error) {
      console.error("Error generating AI font pair:", error);
    } finally {
      // Always finish loading regardless of success or failure
      setIsAiGenerating(false);
      // Close the dialog if it was open
      setShowGenerationOptions(false);
    }
  };
  
  // Add a function to handle actual Gemini API calls (for future implementation)
  const fetchFromGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      // This would be replaced with an actual API call to Gemini
      // For example:
      // const response = await fetch('/api/gemini', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt })
      // });
      // return await response.text();
      
      // For now, just return a mock response
      return JSON.stringify({
        primary: "Montserrat",
        secondary: "Open Sans"
      });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };
  
  // Handle secondary font selection from Combobox
  const handleSecondaryFontSelect = (value: string) => {
    setSecondaryFont(value); // Google Font name
    setSecondaryPopoverOpen(false);

    updateTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        secondary: value,
        secondaryUsage: secondaryUsage || 'Body Text',
        body: value, 
      },
    });
  };

  // Apply custom secondary font
  const applyCustomSecondaryFont = () => {
    if (!customSecondaryFont.trim()) { 
      return;
    }
    const trimmedCustomFont = customSecondaryFont.trim();
    updateTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        secondary: trimmedCustomFont,
        secondaryUsage: secondaryUsage || 'Body Text',
        body: trimmedCustomFont,
      }
    });
    setSecondaryFont(trimmedCustomFont);
  };

  const handleSecondaryFontSourceChange = (source: 'google' | 'custom' | 'none') => {
    setSecondaryFontSource(source);
    if (source === 'google') {
      if (secondaryFont && secondaryFont !== 'none' && !allGoogleFonts.some(f => f.name === secondaryFont)) {
        setSecondaryFont(''); 
        // Clear from theme as well if it was a custom one that's no longer active source
        // updateTheme({ ...theme, fonts: { ...theme.fonts, secondary: undefined }});
      } else if (!secondaryFont || secondaryFont === 'none') {
        setSecondaryFont(''); // if it was 'none' or empty, prepare for Google selection
      }
    } else if (source === 'custom') {
      setSecondaryFont(customSecondaryFont.trim() || '');
      // If customSecondaryFont is empty, theme.fonts.secondary won't be set until 'Apply'
      // but secondaryFont state reflects the intent to use custom.
      if (customSecondaryFont.trim()) {
         // Optional: update theme immediately if customSecondaryFont has a value
         // This makes the preview reflect custom font name as user types, before hitting apply
         // However, the actual font style might not apply until CSS for it exists or it's a system font
      } else {
        // if customSecondaryFont is empty, and we switch to custom, what should theme.fonts.secondary be?
        // perhaps it should be undefined until applied.
      }
    } else { // source === 'none'
      setSecondaryFont('none');
      updateTheme({
        ...theme,
        fonts: {
          ...theme.fonts,
          secondary: undefined,
          secondaryUsage: undefined,
          body: bodyFont && bodyFont === theme.fonts?.secondary && theme.fonts?.primary ? theme.fonts.primary : bodyFont === theme.fonts?.secondary ? undefined : bodyFont,
        },
      });
    }
  };
  
  return (
    <div className="fonts-step-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Typography</h2>
        <p className="text-gray-600">
          Select fonts for your brand. A good combination uses a primary font for headings 
          and a secondary font for body text.
        </p>
      </div>
      
      {/* Primary Font Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Primary Font</h3>
        
        {/* Font Source Radio Buttons */}
        <div className="mb-3 flex items-center space-x-4">
          {(['google', 'custom'] as const).map((source) => (
            <label key={source} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="primaryFontSource"
                value={source}
                checked={primaryFontSource === source}
                onChange={() => handlePrimaryFontSourceChange(source)}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm text-gray-700">
                {source === 'google' ? 'Select from Google Fonts' : 'Use Custom Font'}
              </span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            {primaryFontSource === 'google' && !isLoadingFonts && (
              <Popover open={primaryPopoverOpen} onOpenChange={setPrimaryPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={primaryPopoverOpen}
                    className="w-full justify-between text-left font-normal"
                    disabled={isLoadingFonts}
                  >
                    {isLoadingFonts ? 'Loading fonts...' : 
                      (primaryFont && primaryFontSource === 'google' && allGoogleFonts.find(f => f.name === primaryFont)?.name) || 
                      (primaryFontSource === 'google' ? 'Select Google Font...' : primaryFont) || 
                      'Select Google Font...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                  <Command>
                    <CommandInput placeholder="Search Google Font..." />
                    <CommandList>
                      {/* CRITICAL PERFORMANCE NOTE: VIRTUALIZE THIS LIST */}
                      {isLoadingFonts ? (
                        <CommandEmpty>Loading fonts...</CommandEmpty>
                      ) : Object.keys(dynamicFontCategories).length === 0 ? (
                         <CommandEmpty>No fonts loaded. Check console or ensure /public/data/google-fonts.json exists.</CommandEmpty>
                      ) : (
                        Object.entries(dynamicFontCategories).map(([category, fontsInCategory]) => (
                          <CommandGroup heading={category.charAt(0).toUpperCase() + category.slice(1)} key={category}>
                            {fontsInCategory.map((fontFamily) => (
                              <CommandItem
                                key={fontFamily.name}
                                value={fontFamily.name}
                                onSelect={() => handlePrimaryFontSelect(fontFamily.name)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    primaryFont === fontFamily.name && primaryFontSource === 'google' ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {fontFamily.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
            
            {primaryFontSource === 'custom' && (
              <div className="mt-0 flex"> {/* Adjusted mt-3 to mt-0 */}
                <input
                  type="text"
                  value={customPrimaryFont}
                  onChange={handleCustomPrimaryFontChange}
                  placeholder="Enter custom font name (e.g., Arial)"
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={applyCustomPrimaryFont}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            
            {fontError && (
              <p className="mt-2 text-red-600 text-sm">{fontError}</p>
            )}
          </div>
          
          <div className="preview">
            {/* Preview logic needs to consider primaryFontSource */}
            {(primaryFontSource === 'google' && primaryFont) || (primaryFontSource === 'custom' && customPrimaryFont.trim()) ? (
              <div 
                className="p-3 bg-gray-50 rounded-md"
                style={{ fontFamily: primaryFontSource === 'custom' ? customPrimaryFont.trim() : primaryFont }}
              >
                <p className="text-lg font-bold">Heading</p>
                <p className="text-sm">
                  This is a sample of {primaryFontSource === 'custom' ? customPrimaryFont.trim() : primaryFont}.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Secondary Font Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Secondary Font</h3>

        {/* Font Source Radio Buttons for Secondary */}
        <div className="mb-3 flex items-center space-x-4">
          {(['google', 'custom', 'none'] as const).map((source) => (
            <label key={source} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="secondaryFontSource"
                value={source}
                checked={secondaryFontSource === source}
                onChange={() => handleSecondaryFontSourceChange(source)}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm text-gray-700">
                {source === 'google' ? 'Select from Google Fonts' : 
                 source === 'custom' ? 'Use Custom Font' : 'No Secondary Font'}
              </span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            {secondaryFontSource === 'google' && !isLoadingFonts && (
              <Popover open={secondaryPopoverOpen} onOpenChange={setSecondaryPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={secondaryPopoverOpen}
                    className="w-full justify-between text-left font-normal"
                    disabled={isLoadingFonts}
                  >
                    {isLoadingFonts ? 'Loading fonts...' : 
                      (secondaryFont && secondaryFontSource === 'google' && allGoogleFonts.find(f => f.name === secondaryFont)?.name) || 
                      (secondaryFontSource === 'google' ? 'Select Google Font...' : secondaryFont) || 
                      'Select Google Font...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                  <Command>
                    <CommandInput placeholder="Search Google Font..." />
                    <CommandList>
                      {isLoadingFonts ? (
                        <CommandEmpty>Loading fonts...</CommandEmpty>
                      ) : Object.keys(dynamicFontCategories).length === 0 ? (
                        <CommandEmpty>No fonts loaded. Check console or ensure /public/data/google-fonts.json exists.</CommandEmpty>
                      ) : (
                        Object.entries(dynamicFontCategories).map(([category, fontsInCategory]) => (
                          <CommandGroup heading={category.charAt(0).toUpperCase() + category.slice(1)} key={category}>
                            {fontsInCategory.map((fontFamily) => (
                              <CommandItem
                                key={fontFamily.name}
                                value={fontFamily.name}
                                onSelect={() => handleSecondaryFontSelect(fontFamily.name)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    secondaryFont === fontFamily.name && secondaryFontSource === 'google' ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {fontFamily.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}

            {secondaryFontSource === 'custom' && (
              <div className="mt-0 flex">
                <input
                  type="text"
                  value={customSecondaryFont}
                  onChange={handleCustomSecondaryFontChange}
                  placeholder="Enter custom font name (e.g., Arial)"
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={applyCustomSecondaryFont}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {/* No input shown if secondaryFontSource === 'none' */}
          </div>

          <div className="preview">
            {(secondaryFontSource === 'google' && secondaryFont && secondaryFont !== 'none') || (secondaryFontSource === 'custom' && customSecondaryFont.trim()) ? (
              <div 
                className="p-3 bg-gray-50 rounded-md"
                style={{ fontFamily: secondaryFontSource === 'custom' ? customSecondaryFont.trim() : (secondaryFont !== 'none' ? secondaryFont : undefined) }}
              >
                <p className="text-lg font-bold">Body Text Sample</p>
                <p className="text-sm">
                  This is a sample of {secondaryFontSource === 'custom' ? customSecondaryFont.trim() : (secondaryFont !== 'none' ? secondaryFont : 'N/A')}.
                </p>
              </div>
            ) : secondaryFontSource === 'none' ? (
              <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-500">
                No secondary font selected.
              </div>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Font Usage Details */}
      {(primaryFont || secondaryFont !== 'none') && (
        <div className="font-usage-details mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Font Usage Details</h3>
            <button
              type="button"
              onClick={() => setShowFontDetails(!showFontDetails)}
              className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
            >
              {showFontDetails ? 'Hide Details' : 'Show Details'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transition-transform ${showFontDetails ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {showFontDetails && (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-4">
              {/* Primary Font Usage */}
              {primaryFont && primaryFont !== 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Font Usage
                  </label>
                  <input
                    type="text"
                    value={primaryUsage}
                    onChange={(e) => setPrimaryUsage(e.target.value)}
                    placeholder="e.g., Headings, Titles, Logos"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Describe how the primary font should be used in your design
                  </p>
                </div>
              )}
              
              {/* Secondary Font Usage */}
              {secondaryFont && secondaryFont !== 'none' && secondaryFont !== 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Font Usage
                  </label>
                  <input
                    type="text"
                    value={secondaryUsage}
                    onChange={(e) => setSecondaryUsage(e.target.value)}
                    placeholder="e.g., Body Text, Paragraphs, UI Elements"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Describe how the secondary font should be used in your design
                  </p>
                </div>
              )}
              
              {/* Specific Element Mapping */}
              <div className="specific-mappings mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Specific Element Mapping</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Heading 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading 1 (H1)
                    </label>
                    <select
                      value={heading1Font || primaryFont}
                      onChange={(e) => setHeading1Font(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {primaryFont && <option value={primaryFont}>{primaryFont} (Primary)</option>}
                      {secondaryFont && secondaryFont !== 'none' && <option value={secondaryFont}>{secondaryFont} (Secondary)</option>}
                    </select>
                  </div>
                  
                  {/* Heading 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading 2 (H2)
                    </label>
                    <select
                      value={heading2Font || primaryFont}
                      onChange={(e) => setHeading2Font(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {primaryFont && <option value={primaryFont}>{primaryFont} (Primary)</option>}
                      {secondaryFont && secondaryFont !== 'none' && <option value={secondaryFont}>{secondaryFont} (Secondary)</option>}
                    </select>
                  </div>
                  
                  {/* Heading 3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading 3 (H3)
                    </label>
                    <select
                      value={heading3Font || primaryFont}
                      onChange={(e) => setHeading3Font(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {primaryFont && <option value={primaryFont}>{primaryFont} (Primary)</option>}
                      {secondaryFont && secondaryFont !== 'none' && <option value={secondaryFont}>{secondaryFont} (Secondary)</option>}
                    </select>
                  </div>
                  
                  {/* Body Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Body Text
                    </label>
                    <select
                      value={bodyFont || (secondaryFont !== 'none' ? secondaryFont : primaryFont)}
                      onChange={(e) => setBodyFont(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {primaryFont && <option value={primaryFont}>{primaryFont} (Primary)</option>}
                      {secondaryFont && secondaryFont !== 'none' && <option value={secondaryFont}>{secondaryFont} (Secondary)</option>}
                    </select>
                  </div>
                </div>
              </div>
              
              <button
                type="button"
                onClick={updateFontUsageDetails}
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Font Usage Details
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* AI Font Generation */}
      <div className="ai-generation mb-8">
        <h3 className="text-lg font-medium mb-3">AI Font Generation</h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Let our AI suggest font pairings based on your business information.
            {theme.metadata?.businessType 
              ? ` We'll create font pairings that match your ${theme.metadata.businessType} industry with a ${theme.metadata.tone || 'professional'} tone.` 
              : ' For best results, complete the Business Context step first.'}
          </p>
          
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
                Generating Fonts...
              </span>
            ) : (
              'Generate AI Font Recommendation'
            )}
          </button>
        </div>
      </div>
      
      {/* Font Pairing Preview */}
      {currentPrimaryFont && (
        <div className="font-pairing-preview mb-8">
          <h3 className="text-lg font-medium mb-3">Font Pairing Preview</h3>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h1 
              className="text-3xl font-bold mb-3" 
              style={{ fontFamily: heading1Font || currentPrimaryFont }}
            >
              H1: {heading1Font || currentPrimaryFont}
            </h1>
            
            <h2 
              className="text-2xl font-semibold mb-2" 
              style={{ fontFamily: heading2Font || currentPrimaryFont }}
            >
              H2: {heading2Font || currentPrimaryFont}
            </h2>
            
            <h3 
              className="text-xl font-medium mb-3" 
              style={{ fontFamily: heading3Font || currentPrimaryFont }}
            >
              H3: {heading3Font || currentPrimaryFont}
            </h3>
            
            <p 
              className="mb-4" 
              style={{ fontFamily: bodyFont || currentSecondaryFont || currentPrimaryFont }}
            >
              {sampleText} This is an example of body text using <strong>{bodyFont || currentSecondaryFont || currentPrimaryFont}</strong>. This paragraph demonstrates how your typography will look in real content.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 
                className="text-lg font-semibold mb-2" 
                style={{ fontFamily: heading3Font || currentPrimaryFont }}
              >
                Element Examples
              </h4>
              
              <ul className="space-y-2">
                <li style={{ fontFamily: bodyFont || currentSecondaryFont || currentPrimaryFont }}>
                  <strong>Primary font</strong>: {currentPrimaryFont}
                  {primaryUsage && <span className="text-gray-600"> — Used for: {primaryUsage}</span>}
                </li>
                
                {currentSecondaryFont && (
                  <li style={{ fontFamily: bodyFont || currentSecondaryFont }}>
                    <strong>Secondary font</strong>: {currentSecondaryFont}
                    {secondaryUsage && <span className="text-gray-600"> — Used for: {secondaryUsage}</span>}
                  </li>
                )}
                
                <li style={{ fontFamily: bodyFont || currentSecondaryFont || currentPrimaryFont }}>
                  <strong>Button example</strong>: 
                  <button 
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md"
                    style={{ fontFamily: bodyFont || currentSecondaryFont || currentPrimaryFont }}
                  >
                    Click me
                  </button>
                </li>
                
                <li style={{ fontFamily: bodyFont || currentSecondaryFont || currentPrimaryFont }}>
                  <strong>Link example</strong>: 
                  <a 
                    href="#" 
                    className="ml-2 text-blue-600 underline"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontFamily: bodyFont || currentSecondaryFont || currentPrimaryFont }}
                  >
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Font Explanation - Show only if AI generated */}
          {theme.metadata?.fontExplanation && (
            <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-1">AI Reasoning</h4>
              <p className="text-sm text-blue-700">{theme.metadata.fontExplanation}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Font Pairing Suggestions */}
      {primaryFont && primaryFont !== 'custom' && !currentSecondaryFont && (
        <div className="font-suggestions mb-8">
          <h3 className="text-lg font-medium mb-3">Suggested Pairings with {primaryFont}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {getFontPairSuggestions().map((fontFamily) => (
              <button
                key={fontFamily.name}
                onClick={() => {
                  setSecondaryFont(fontFamily.name);
                  updateTheme({
                    ...theme,
                    fonts: {
                      ...theme.fonts,
                      primary: currentPrimaryFont,
                      secondary: fontFamily.name
                    }
                  });
                }}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <span className="block font-medium" style={{ fontFamily: primaryFont }}>
                  {primaryFont}
                </span>
                <span style={{ fontFamily: fontFamily.name }}>
                  with {fontFamily.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Font Tips */}
      <div className="font-tips p-4 bg-blue-50 border border-blue-100 rounded-md mb-8">
        <h4 className="font-medium text-blue-800 mb-2">Typography Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Use sans-serif fonts for modern, clean designs</li>
          <li>Serif fonts convey tradition and reliability</li>
          <li>Limit your design to 2-3 fonts maximum</li>
          <li>Ensure your fonts are readable at different sizes</li>
          <li>Consider contrast between heading and body fonts</li>
        </ul>
      </div>
      
      {/* Replace the RegenerationDialog with the GenerationOptionsDialog */}
      <GenerationOptionsDialog
        isOpen={showGenerationOptions}
        onClose={() => setShowGenerationOptions(false)}
        onConfirm={(options) => {
          generateAIFontPair(options);
        }}
        theme={theme}
        generationType="fonts"
        hasLogoSelected={hasLogo}
        hasColoursSelected={hasColours}
        hasFontsSelected={hasFontsFlag}
      />
    </div>
  );
} 