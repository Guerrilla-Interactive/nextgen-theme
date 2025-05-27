
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';
import GenerationOptionsDialog, { GenerationOptions } from '../GenerationOptionsDialog';
import { ColorGenerationDNA, ColorInfo } from '../../context/ThemeTypes';


import { Checkbox } from '@/features/unorganized-components/ui/checkbox';


import { Palette } from 'lucide-react';
import { Label } from '@/features/unorganized-components/ui/label';

const DEFAULT_COLOR_DNA: ColorGenerationDNA = {
  numMainColors: 4,
  numSupplementColors: 5,
  hueVariety: 0.5,
  includeErrorColor: false,
  includeSuccessColor: false,
};

export default function ColoursStep() {
  const { 
    getThemeData, 
    updateTheme, 
    completeCurrentStep, 
    previous, 
    next, 
    setHasColours,
    hasLogo,
    hasColours: hasColoursFlag,
    hasFonts
  } = useWizardNavigation();
  
  const theme = getThemeData();
  const [colorInput, setColorInput] = useState('#000000');
  const [colorError, setColorError] = useState<string | null>(null);
  
  // Updated state for color details
  const [colorName, setColorName] = useState('');
  const [colorCategory, setColorCategory] = useState<'main' | 'supplement' | string>('supplement'); // Default to supplement
  const [mainColorType, setMainColorType] = useState<'primary' | 'secondary' | 'contrast' | undefined>(undefined);
  const [colorDescription, setColorDescription] = useState('');
  const [colorUsecases, setColorUsecases] = useState<string[]>([]);
  const [usecaseInput, setUsecaseInput] = useState('');
  
  const [editingColorIndex, setEditingColorIndex] = useState<number | 'new' | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showGenerationOptions, setShowGenerationOptions] = useState(false);

  // New state for Color Generation DNA
  const [numMainColors, setNumMainColors] = useState<number>(
    theme.metadata.colorGenerationDNA?.numMainColors || 4
  );
  const [numSupplementColors, setNumSupplementColors] = useState<number>(
    theme.metadata.colorGenerationDNA?.numSupplementColors || 5
  );
  const [hueVariety, setHueVariety] = useState<number>(
    theme.metadata.colorGenerationDNA?.hueVariety || 0.5
  );
  const [includeErrorColor, setIncludeErrorColor] = useState<boolean>(
    theme.metadata.colorGenerationDNA?.includeErrorColor || false
  );
  const [includeSuccessColor, setIncludeSuccessColor] = useState<boolean>(
    theme.metadata.colorGenerationDNA?.includeSuccessColor || false
  );

  // Update theme metadata when colorGenerationDNA settings change
  useEffect(() => {
    const newDNA = {
      numMainColors,
      numSupplementColors,
      hueVariety,
      includeErrorColor,
      includeSuccessColor,
    };
    // Check if the new DNA is different from what's in the theme to prevent unnecessary updates
    if (
      theme.metadata?.colorGenerationDNA?.numMainColors !== numMainColors ||
      theme.metadata?.colorGenerationDNA?.numSupplementColors !== numSupplementColors ||
      theme.metadata?.colorGenerationDNA?.hueVariety !== hueVariety ||
      theme.metadata?.colorGenerationDNA?.includeErrorColor !== includeErrorColor ||
      theme.metadata?.colorGenerationDNA?.includeSuccessColor !== includeSuccessColor
    ) {
      updateTheme({
        ...theme,
        metadata: {
          ...theme.metadata,
          colorGenerationDNA: newDNA,
        },
      });
    }
  }, [numMainColors, numSupplementColors, hueVariety, includeErrorColor, includeSuccessColor, theme, updateTheme]);

  const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const getDefaultColorName = useCallback((hex: string): string => {
    const colorMap: Record<string, string> = {
      '#FF0000': 'Red', '#00FF00': 'Green', '#0000FF': 'Blue', '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta', '#00FFFF': 'Cyan', '#000000': 'Black', '#FFFFFF': 'White',
      '#808080': 'Gray', '#FFA500': 'Orange', '#800080': 'Purple', '#A52A2A': 'Brown'
    };
    return colorMap[hex.toUpperCase()] || 'Custom Color';
  }, []);
  
  const globallyUsedUsecasesSet = useMemo(() => {
    const set = new Set<string>();
    theme.colours.forEach((color, idx) => {
      if (typeof editingColorIndex === 'number' && idx === editingColorIndex) {
        return;
      }
      color.idealUsecases?.forEach(usecase => set.add(usecase));
    });
    return set;
  }, [theme.colours, editingColorIndex]);

  useEffect(() => {
    if (theme.colours.length > 0 || !hasColoursFlag) {
      completeCurrentStep();
    }
  }, [theme.colours.length, hasColoursFlag, completeCurrentStep]);

  const arraysEqual = useCallback((a: string[] | undefined, b: string[] | undefined): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }, []);

  // Autosave Effect
  useEffect(() => {
    if (editingColorIndex === null) return;

    const currentHex = colorInput;
    const currentName = colorName || getDefaultColorName(currentHex);
    // Ensure mainColorType is undefined if category is not 'main'
    const currentMainColorType = colorCategory === 'main' ? mainColorType : undefined;
    const currentDescription = colorDescription || undefined;
    const currentIdealUsecases = colorUsecases.length > 0 ? [...colorUsecases] : undefined;

    if (editingColorIndex === 'new') {
      if (currentHex !== '#000000' || 
          (colorName !== '' && colorName !== getDefaultColorName('#000000')) || 
          currentDescription !== undefined || 
          (currentIdealUsecases && currentIdealUsecases.length > 0) ||
          colorCategory !== 'supplement' || 
          currentMainColorType !== undefined
      ) {
        const newColorData: ColorInfo = {
          hex: currentHex, name: currentName, category: colorCategory,
          mainColorType: currentMainColorType, description: currentDescription,
          idealUsecases: currentIdealUsecases,
        };
        const newColorsList = [...theme.colours, newColorData];
        const newActualIndex = newColorsList.length - 1;
        updateTheme({ ...theme, colours: newColorsList });
        setEditingColorIndex(newActualIndex);
      }
    } else if (typeof editingColorIndex === 'number' && editingColorIndex < theme.colours.length) {
      const existingColor = theme.colours[editingColorIndex];
      if (
        existingColor.hex !== currentHex || existingColor.name !== currentName ||
        existingColor.category !== colorCategory || existingColor.mainColorType !== currentMainColorType ||
        existingColor.description !== currentDescription ||
        !arraysEqual(existingColor.idealUsecases, currentIdealUsecases)
      ) {
        const updatedColor: ColorInfo = {
          hex: currentHex, name: currentName, category: colorCategory,
          mainColorType: currentMainColorType, description: currentDescription,
          idealUsecases: currentIdealUsecases,
        };
        const updatedColorsList = [...theme.colours];
        updatedColorsList[editingColorIndex] = updatedColor;
        updateTheme({ ...theme, colours: updatedColorsList });
      }
    }
  }, [
    colorInput, colorName, colorCategory, mainColorType, colorDescription, colorUsecases, 
    editingColorIndex, theme.colours, updateTheme, arraysEqual, getDefaultColorName
  ]);
  
  const handleRemoveColor = (index: number) => {
    const newColors = [...theme.colours];
    newColors.splice(index, 1);
    updateTheme({ ...theme, colours: newColors });
    if (editingColorIndex === index) {
      setEditingColorIndex(null);
      // Reset form for next potential new color
      setColorInput('#000000'); setColorName(''); setColorCategory('supplement'); setMainColorType(undefined);
      setColorDescription(''); setColorUsecases([]); setColorError(null);
    }
  };

  const handleEditColor = (index: number) => {
    setEditingColorIndex(index);
    const color = theme.colours[index];
    setColorInput(color.hex);
    setColorName(color.name || '');
    setColorCategory(color.category || 'supplement');
    setMainColorType(color.mainColorType);
    setColorDescription(color.description || '');
    setColorUsecases(color.idealUsecases || []);
    setUsecaseInput('');
    setColorError(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorInput(value);
    if (isValidHexColor(value)) setColorError(null);
  };

  const getContrastColor = (hexColor: string): string => {
    hexColor = hexColor.replace('#', '');
    if (!/^[0-9A-Fa-f]{6}$/.test(hexColor) && !/^[0-9A-Fa-f]{3}$/.test(hexColor)) return '#000000';
    let r, g, b;
    if (hexColor.length === 3) {
        r = parseInt(hexColor[0] + hexColor[0], 16);
        g = parseInt(hexColor[1] + hexColor[1], 16);
        b = parseInt(hexColor[2] + hexColor[2], 16);
    } else {
        r = parseInt(hexColor.substring(0, 2), 16);
        g = parseInt(hexColor.substring(2, 4), 16);
        b = parseInt(hexColor.substring(4, 6), 16);
    }
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000000' : '#FFFFFF';
  };
  
  const handleGenerateClick = () => setShowGenerationOptions(true);
  
  const generateAIColorPalette = async (options: GenerationOptions) => {
    // Add colorGenerationDNA to the request
    const currentTheme = getThemeData(); // Get latest theme data
    const updatedThemeForRequest = {
      ...currentTheme,
      metadata: {
        ...currentTheme.metadata,
        colorGenerationDNA: {
          numMainColors,
          numSupplementColors,
          hueVariety,
          includeErrorColor,
          includeSuccessColor,
        }
      }
    };

    if (!options.regenerateColors) {
      setShowGenerationOptions(false);
      return;
    }
    setAiError(null);
    setIsAiGenerating(true);
    try {
      const generateRequestPayload = {
        themeData: updatedThemeForRequest, // Use theme with updated preference
        generateRequest: {
          colors: true, fonts: false, icons: false,
          useLogo: options.useLogo, useColors: options.useColors, useFonts: options.useFonts,
          useIcons: options.useIcons, useBusinessDetails: options.useBusinessDetails,
          colorInfluence: options.colorInfluence, fontInfluence: options.fontInfluence,
          businessDetailsInfluence: options.businessDetailsInfluence,
          colorGenerationDNA: {
            numMainColors,
            numSupplementColors,
            hueVariety,
            includeErrorColor,
            includeSuccessColor,
          },
        }
      };
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generateRequestPayload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate color palette');
      }
      const data = await response.json();
      if (data.proposal && data.proposal.colors) {
        // The AI response should now include category and mainColorType
        const newColorsFromAI: ColorInfo[] = data.proposal.colors.map((c: any) => ({
          hex: c.hex,
          name: c.name || getDefaultColorName(c.hex),
          category: c.category || 'supplement', // Default if missing
          mainColorType: c.mainColorType, // Will be undefined if not 'main' or not provided
          description: c.description,
          idealUsecases: c.idealUsecases || [],
        }));

        updateTheme({
          ...updatedThemeForRequest, // Base on the theme used for request
          colours: newColorsFromAI,
          metadata: {
            ...updatedThemeForRequest.metadata,
            aiGenerated: true,
            generationDate: new Date().toISOString(),
            aiProvider: "Gemini", 
            colorExplanation: data.proposal.colorExplanation || "AI-generated color palette"
          }
        });
      } else {
        throw new Error('No colors returned from AI generation');
      }
    } catch (error) {
      console.error("Error generating AI color palette:", error);
      setAiError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsAiGenerating(false);
      setShowGenerationOptions(false);
    }
  };
  
  const suggestedPalettes: { name: string, colors: ColorInfo[] }[] = [
    {
      name: 'Corporate Blue',
      colors: [
        { hex: '#1A4B84', name: 'Deep Blue', category: 'main', mainColorType: 'primary', description: 'Main brand color', idealUsecases: ['primary', 'chart-1'] },
        { hex: '#2D72C9', name: 'Bright Blue', category: 'main', mainColorType: 'secondary', description: 'Supporting color', idealUsecases: ['secondary', 'chart-3'] },
        { hex: '#FFFFFF', name: 'White', category: 'main', mainColorType: 'contrast', description: 'Light contrast', idealUsecases: ['background', 'card', 'popover', 'primary-foreground', 'secondary-foreground', 'accent-foreground', 'destructive-foreground'] },
        { hex: '#333333', name: 'Dark Gray', category: 'main', mainColorType: 'contrast', description: 'Dark contrast', idealUsecases: ['foreground', 'card-foreground', 'popover-foreground', 'muted-foreground'] },
        { hex: '#5DA0FF', name: 'Light Blue', category: 'supplement', description: 'Highlights and accents', idealUsecases: ['accent', 'chart-2'] },
        { hex: '#E0E4EB', name: 'Light Gray', category: 'supplement', description: 'Borders and dividers', idealUsecases: ['border', 'input', 'ring', 'muted'] },
        { hex: '#D32F2F', name: 'Alert Red', category: 'supplement', description: 'Error messages', idealUsecases: ['destructive'] },
        { hex: '#F39C12', name: 'Amber', category: 'supplement', description: 'Data viz', idealUsecases: ['chart-4', 'chart-5'] }
      ]
    },
    // ... (Update other suggested palettes similarly)
  ];
  
  const applySuggestedPalette = (colors: ColorInfo[]) => {
    updateTheme({ ...theme, colours: colors });
  };

  const renderColorForm = (isNew: boolean) => {
    return (
      <div className="color-edit-form-inline w-full p-3 flex flex-col h-full">
        <div className="relative mb-3">
          <div 
            className="color-preview-edit h-20 w-full rounded-md border border-gray-300 cursor-pointer"
            style={{ backgroundColor: colorInput }}
            onClick={() => document.getElementById(`color-picker-input-${isNew ? 'new' : editingColorIndex}`)?.click()}
          />
          <input
            id={`color-picker-input-${isNew ? 'new' : editingColorIndex}`}
            type="color" value={colorInput} onChange={handleInputChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <input
          type="text" value={colorInput} onChange={handleInputChange} placeholder="#RRGGBB"
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm mb-2 font-mono"
        />
        {colorError && (<p className="text-red-600 text-xs mb-2">{colorError}</p>)}

        <div className="color-details-fields space-y-2 mb-3 flex-grow overflow-auto pr-1">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Name</label>
            <input type="text" value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="e.g., Brand Blue"
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Category</label>
              <select value={colorCategory} onChange={(e) => {
                  const cat = e.target.value as 'main' | 'supplement' | string;
                  setColorCategory(cat);
                  if (cat !== 'main') setMainColorType(undefined); // Reset mainColorType if not 'main'
                }}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
              >
                <option value="main">Main Color</option>
                <option value="supplement">Supplement Color</option>
              </select>
            </div>
            {colorCategory === 'main' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Main Color Type</label>
                <select value={mainColorType || ''} onChange={(e) => setMainColorType(e.target.value as 'primary' | 'secondary' | 'contrast')}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                >
                  <option value="" disabled>Select type</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="contrast">Contrast</option>
                </select>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Description (optional)</label>
            <textarea value={colorDescription} onChange={(e) => setColorDescription(e.target.value)} placeholder="Purpose in your design"
              rows={2} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Ideal Use Cases (CSS Variables)</label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1 bg-white">
              {ALL_CSS_VARIABLES.map(cssVar => {
                const isChecked = colorUsecases.includes(cssVar.id);
                const isUsedByOtherColor = globallyUsedUsecasesSet.has(cssVar.id);
                const isDisabled = isUsedByOtherColor && !isChecked;
                return (
                  <label key={cssVar.id} title={isDisabled ? `Used by another color: ${cssVar.label}` : cssVar.label}
                    className={`flex items-center space-x-2 p-1 rounded-md transition-colors text-xs ${isDisabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50 cursor-pointer'}`}
                  > <input type="checkbox" checked={isChecked} disabled={isDisabled}
                      onChange={() => {
                        const newUsecases = isChecked ? colorUsecases.filter(u => u !== cssVar.id) : [...colorUsecases, cssVar.id];
                        setColorUsecases(newUsecases.sort());
                      }}
                      className={`${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 focus:ring-1`}
                    />
                    <span className={isChecked && !isDisabled ? 'font-medium text-blue-700' : 'text-gray-700'}>
                      --{cssVar.id}
                      <span className="text-gray-500 text-xs ml-1">({cssVar.label.split(' (')[0]})</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="mt-auto pt-2 border-t border-gray-200">
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setEditingColorIndex(null);
                setColorInput('#000000'); setColorName(''); setColorCategory('supplement'); setMainColorType(undefined);
                setColorDescription(''); setColorUsecases([]); setColorError(null);
              }}
              className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-xs"
            > Close Editing </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="colours-step-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Define Your Brand Colors</h2>
        <p className="text-gray-600">
          Categorize colors as 'Main' (Primary, Secondary, Contrast) or 'Supplement'. Assign CSS variables for theme integration.
        </p>
      </div>

      {/* Color Profile Preference */}
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-md">
        <h3 className="text-md font-semibold text-indigo-800 mb-2">Color Palette DNA</h3>
        <p className="text-sm text-indigo-700 mb-4">
          Fine-tune how the AI generates your color palette using the sliders below.
        </p>
        <div className="space-y-5">
          {/* Number of Main Colors Slider */}
          <div>
            <label htmlFor="numMainColors" className="block text-sm font-medium text-indigo-700">
              Number of Main Colors: <span className="font-bold">{numMainColors}</span>
            </label>
            <input
              id="numMainColors"
              type="range"
              min="2"
              max="6"
              step="1"
              value={numMainColors}
              onChange={(e) => setNumMainColors(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Number of Supplement Colors Slider */}
          <div>
            <label htmlFor="numSupplementColors" className="block text-sm font-medium text-indigo-700">
              Number of Supplement Colors: <span className="font-bold">{numSupplementColors}</span>
            </label>
            <input
              id="numSupplementColors"
              type="range"
              min="0"
              max="10"
              step="1"
              value={numSupplementColors}
              onChange={(e) => setNumSupplementColors(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Hue Variety Slider */}
          <div>
            <label htmlFor="hueVariety" className="block text-sm font-medium text-indigo-700">
              Hue Variety: <span className="font-bold">{Math.round(hueVariety * 100)}%</span>
              <span className="text-xs text-indigo-500 ml-1">({hueVariety === 0 ? 'Monochromatic' : hueVariety === 1 ? 'Max Diverse' : 'Varied'})</span>
            </label>
            <input
              id="hueVariety"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={hueVariety}
              onChange={(e) => setHueVariety(parseFloat(e.target.value))}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Accessibility Colors</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeErrorColor"
                checked={includeErrorColor}
                onCheckedChange={(checked) => setIncludeErrorColor(Boolean(checked))}
              />
              <Label htmlFor="includeErrorColor" className="text-sm font-normal cursor-pointer">
                Generate distinct Error/Warning color (red-ish, harmonized with Primary)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeSuccessColor"
                checked={includeSuccessColor}
                onCheckedChange={(checked) => setIncludeSuccessColor(Boolean(checked))}
              />
              <Label htmlFor="includeSuccessColor" className="text-sm font-normal cursor-pointer">
                Generate distinct Success/Confirm color (green-ish, harmonized with Primary)
              </Label>
            </div>
          </div>
        </div>
      </div>
      
      {theme.colours.length > 0 && (
        <div className="current-palette mb-8">
          <h3 className="text-lg font-medium mb-3">Your Color Palette</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
            {theme.colours.map((color, index) => (
              <div key={index} 
                className={`color-item flex flex-col border rounded-md overflow-hidden transition-all duration-200 ${editingColorIndex === index ? 'border-blue-300 shadow-lg' : 'border-gray-200 bg-white'}`}
              >
                {editingColorIndex === index ? (
                  renderColorForm(false)
                ) : (
                  <>
                    <div className="color-swatch h-24 w-full cursor-pointer" style={{ backgroundColor: color.hex }}
                      onClick={() => handleEditColor(index)}
                    />
                    <div className="p-3 bg-white">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-medium text-base">{color.name || getDefaultColorName(color.hex)}</h4>
                          <p className="text-xs text-gray-500 capitalize">
                            {color.category}
                            {color.category === 'main' && color.mainColorType ? `: ${color.mainColorType}` : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-xs uppercase">{color.hex}</div>
                        </div>
                      </div>
                      {color.description && (<p className="text-xs text-gray-600 mt-1 mb-2 italic">"{color.description}"</p>)}
                      {/* Display idealUsecases if needed */}
                      <div className="flex space-x-2 mt-3 pt-2 border-t border-gray-100">
                        <button onClick={() => handleEditColor(index)}
                          className="flex-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >Edit Details</button>
                        <button onClick={() => handleRemoveColor(index)}
                          className="flex-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                        >Remove</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div
              className={`color-item flex flex-col items-center justify-center border-2 rounded-md h-full min-h-[210px] transition-colors p-3 ${editingColorIndex === 'new' ? 'border-blue-300 shadow-lg' : 'border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'}`}
            >
              {editingColorIndex === 'new' ? (
                renderColorForm(true)
              ) : (
                <div onClick={() => {
                  setEditingColorIndex('new');
                  setColorInput('#000000'); setColorName(''); setColorCategory('supplement'); setMainColorType(undefined);
                  setColorDescription(''); setColorUsecases([]); setColorError(null);
                }} className="flex flex-col items-center justify-center w-full h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-gray-500 text-sm text-center">Add New Color</span>
                </div>
              )}
            </div>
          </div>
          {theme.metadata?.colorExplanation && (
            <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-1">AI Reasoning</h4>
              <p className="text-sm text-blue-700">{theme.metadata.colorExplanation}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="ai-generation mb-8">
        <h3 className="text-lg font-medium mb-3">AI Color Generation</h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
           <p className="text-sm text-gray-600 mb-4">
            Let our AI suggest a color palette based on your selections and chosen Color Palette Style.
            {theme.metadata?.businessType 
              ? ` We'll create colors that match your ${theme.metadata.businessType} industry with a ${theme.metadata.tone || 'professional'} tone.` 
              : ' For best results, complete the Business Context step first.'}
          </p>
          
          {aiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              <p>{aiError}</p>
            </div>
          )}
          
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
                Generating Color Palette...
              </span>
            ) : (
              'Generate AI Color Palette'
            )}
          </button>
        </div>
      </div>
      
      <div className="suggested-palettes mb-8">
         <h3 className="text-lg font-medium mb-3">Or Choose a Suggested Palette</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestedPalettes.map((palette, paletteIndex) => (
            <div 
              key={paletteIndex}
              className="palette-item border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => applySuggestedPalette(palette.colors)}
            >
              <h4 className="font-medium mb-2">{palette.name}</h4>
              <div className="flex space-x-1 mb-2">
                {palette.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-full h-10 first:rounded-l-md last:rounded-r-md"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name}: ${color.hex} (${color.category}${color.mainColorType ? ` - ${color.mainColorType}` : ''})`}
                  />
                ))}
              </div>
              {/* Optionally display a summary of categories */}
            </div>
          ))}
        </div>
      </div>
      
      <div className="color-usage-guide p-4 bg-blue-50 border border-blue-100 rounded-md mb-8">
        <h4 className="font-medium text-blue-800 mb-2">CSS Variables Guide</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-semibold text-blue-800 mb-1">Base Colors</h5>
            <ul className="text-sm text-blue-700 space-y-1 ml-2">
              <li><code className="bg-blue-100 px-1 rounded">--background</code>: Main page background</li>
              <li><code className="bg-blue-100 px-1 rounded">--foreground</code>: Primary text color</li>
            </ul>
            
            <h5 className="text-sm font-semibold text-blue-800 mt-3 mb-1">Primary/Secondary</h5>
            <ul className="text-sm text-blue-700 space-y-1 ml-2">
              <li><code className="bg-blue-100 px-1 rounded">--primary</code>: Main brand color</li>
              <li><code className="bg-blue-100 px-1 rounded">--primary-foreground</code>: Text on primary</li>
              <li><code className="bg-blue-100 px-1 rounded">--secondary</code>: Secondary brand color</li>
              <li><code className="bg-blue-100 px-1 rounded">--secondary-foreground</code>: Text on secondary</li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold text-blue-800 mb-1">UI Elements</h5>
            <ul className="text-sm text-blue-700 space-y-1 ml-2">
              <li><code className="bg-blue-100 px-1 rounded">--card</code>/<code className="bg-blue-100 px-1 rounded">--popover</code>: Component backgrounds</li>
              <li><code className="bg-blue-100 px-1 rounded">--card-foreground</code>/<code className="bg-blue-100 px-1 rounded">--popover-foreground</code>: Text on components</li>
              <li><code className="bg-blue-100 px-1 rounded">--muted</code>/<code className="bg-blue-100 px-1 rounded">--muted-foreground</code>: Subtle UI elements</li>
              <li><code className="bg-blue-100 px-1 rounded">--accent</code>/<code className="bg-blue-100 px-1 rounded">--accent-foreground</code>: Highlight elements</li>
              <li><code className="bg-blue-100 px-1 rounded">--destructive</code>/<code className="bg-blue-100 px-1 rounded">--destructive-foreground</code>: Error states</li>
              <li><code className="bg-blue-100 px-1 rounded">--border</code>/<code className="bg-blue-100 px-1 rounded">--input</code>/<code className="bg-blue-100 px-1 rounded">--ring</code>: Form controls</li>
              <li><code className="bg-blue-100 px-1 rounded">--chart-1</code> to <code className="bg-blue-100 px-1 rounded">--chart-5</code>: Data visualization</li>
            </ul>
          </div>
        </div>
        
        <p className="text-xs text-blue-600 mt-3">
          These variables are defined in <code className="bg-blue-100 px-1 rounded">globals.css</code> and used throughout the application to maintain consistent styling.
        </p>
      </div>
      
      <GenerationOptionsDialog
        isOpen={showGenerationOptions}
        onClose={() => setShowGenerationOptions(false)}
        onConfirm={(options) => {
          generateAIColorPalette(options);
        }}
        theme={theme}
        generationType="colors" // This might need adjustment if dialog handles other types
        hasLogoSelected={hasLogo}
        hasColoursSelected={hasColoursFlag} // This is the general flag
        hasFontsSelected={hasFonts}
      />
    </div>
  );
} 