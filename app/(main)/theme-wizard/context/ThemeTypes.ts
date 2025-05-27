export interface ThemeJSON {
  logo: { src: string; alt: string } | null;
  colours: ColorInfo[];
  fonts: FontInfo | null;
  icons: { set: string; primaryColour?: string } | null;
  metadata: {
    businessType?: string;
    tone?: string;
    audience?: string;
    usp?: string;
    description?: string;
    source: "manual" | "brandGuide";
    createdAt: string;
    aiGenerated?: boolean;
    generationDate?: string;
    useAiSuggestions?: boolean;
    aiProvider?: string;
    lastPrompt?: string;
    // Explanation fields for AI-generated elements
    colorExplanation?: string;
    fontExplanation?: string;
    iconExplanation?: string;
    colorGenerationDNA?: ColorGenerationDNA;
  };
  presets?: ThemePreset[];
  name?: string;
}

export interface ColorInfo {
  hex: string;
  name?: string;
  category: 'main' | 'supplement' | string;
  mainColorType?: 'primary' | 'secondary' | 'contrast';
  description?: string;
  idealUsecases?: string[];
}

export interface FontInfo {
  primary: string;
  secondary?: string;
  primaryUsage?: string;
  secondaryUsage?: string;
  heading1?: string;
  heading2?: string;
  heading3?: string;
  body?: string;
  accent?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  colours: ColorInfo[];
  fonts: FontInfo;
  icons?: { set: string; primaryColour?: string };
}

export interface ColorGenerationDNA {
  numMainColors: number;         // e.g., 2-5 (default 4)
  numSupplementColors: number; // e.g., 3-10
  hueVariety: number;          // 0-1 (0 = monochromatic, 1 = diverse hues)
  includeErrorColor?: boolean;
  includeSuccessColor?: boolean;
}

export interface ColorProfilePreferenceValues {
  // ... existing code ...
}

// Default initial theme data
export const initialTheme: ThemeJSON = {
  logo: null,
  colours: [],
  fonts: null,
  icons: null,
  metadata: {
    source: "manual",
    createdAt: new Date().toISOString()
  },
  name: 'My Theme'
}; 