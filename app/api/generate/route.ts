import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ColorInfo, FontInfo } from '@/app/(main)/theme-wizard/context/ThemeTypes';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { themeData, generateRequest } = await req.json();
    
    // Extract the use* flags and influence levels from the request with defaults
    const {
      useLogo = true, 
      useColors = true, 
      useFonts = true, 
      useIcons = true,
      useBusinessDetails = true,
      colorInfluence = 0.5,
      fontInfluence = 0.5,
      businessDetailsInfluence = 0.5
    } = generateRequest;
    
    // Extract colorGenerationDNA from themeData.metadata or use defaults
    const defaultDNA = {
      numMainColors: 4,
      numSupplementColors: 5,
      hueVariety: 0.5,
      includeErrorColor: false, // Default to false
      includeSuccessColor: false, // Default to false
    };
    const colorGenerationDNA = themeData.metadata?.colorGenerationDNA || defaultDNA;
    
    // Extract colorProfilePreference from themeData.metadata
    const colorProfilePreference = themeData.metadata?.colorProfilePreference || 'color-rich';
    
    // For very high color influence (>90%), just use the existing colors
    // if (useColors && colorInfluence > 0.9 && themeData.colours && themeData.colours.length > 0 && generateRequest.colors) {
    //   // If influence is practically 100%, just return existing colors with explanation
    //   return NextResponse.json({
    //     proposal: {
    //       colors: [...themeData.colours].map(c => ({ // Ensure full ColorInfo structure is returned
    //         hex: c.hex,
    //         name: c.name,
    //         category: c.category || 'supplement',
    //         mainColorType: c.mainColorType,
    //         description: c.description,
    //         idealUsecases: c.idealUsecases || []
    //       })),
    //       colorExplanation: "These colors were preserved from your existing palette due to your high influence setting (90%+)."
    //     }
    //   });
    // }
    
    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { 
          error: "API key for Gemini is not configured", 
          details: "Please add your Gemini API key to the .env file as GEMINI_API_KEY=your_api_key",
          missingApiKey: true
        },
        { status: 500 }
      );
    }
    
    // Validate that the API key looks legitimate (basic check)
    if (process.env.GEMINI_API_KEY.length < 20) {
      console.error("GEMINI_API_KEY appears to be invalid (too short)");
      return NextResponse.json(
        { 
          error: "Gemini API key appears to be invalid", 
          details: "The API key format is incorrect. Please check your Gemini API key.",
          invalidApiKey: true
        },
        { status: 500 }
      );
    }
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
    
    // Construct a prompt based on what needs to be generated and the existing theme data
    let prompt = 'Generate a theme preset based on the following information:\n';
    
    // Add existing logo information if available and selected
    if (useLogo && themeData.logo) {
      prompt += `Logo: ${themeData.logo.alt}\n`;
    }
    
    // Add existing colors if available and selected (even when regenerating)
    if (useColors && themeData.colours && themeData.colours.length > 0) {
      const influenceText = getInfluenceText(colorInfluence);
      
      // Format color information with details
      prompt += `Existing colors (${influenceText} influence, ${Math.round(colorInfluence * 100)}%):\n`;
      themeData.colours.forEach((color: ColorInfo) => {
        prompt += `- ${color.hex}${color.name ? ` (${color.name})` : ''}`; // Keep name
        prompt += ` [Category: ${color.category || 'supplement'}${color.mainColorType ? `, Type: ${color.mainColorType}` : ''}]`; // Add category/type
        prompt += ` (Usecases: ${color.idealUsecases?.join(', ') || 'none'})\n`; // Add usecases
      });
    }
    
    // Add existing fonts if available and selected
    if (useFonts && themeData.fonts?.primary) {
      const influenceText = getInfluenceText(fontInfluence);
      prompt += `Primary font (${influenceText} influence, ${Math.round(fontInfluence * 100)}%): ${themeData.fonts.primary}`;
      if (themeData.fonts.primaryUsage) {
        prompt += ` [${themeData.fonts.primaryUsage}]`;
      }
      prompt += '\n';
      
      if (themeData.fonts.secondary) {
        prompt += `Secondary font (${influenceText} influence, ${Math.round(fontInfluence * 100)}%): ${themeData.fonts.secondary}`;
        if (themeData.fonts.secondaryUsage) {
          prompt += ` [${themeData.fonts.secondaryUsage}]`;
        }
        prompt += '\n';
      }
      
      // Add specific element mappings if available
      if (themeData.fonts.heading1 || themeData.fonts.heading2 || themeData.fonts.heading3 || themeData.fonts.body) {
        prompt += "Font element mappings:\n";
        if (themeData.fonts.heading1) prompt += `- H1: ${themeData.fonts.heading1}\n`;
        if (themeData.fonts.heading2) prompt += `- H2: ${themeData.fonts.heading2}\n`;
        if (themeData.fonts.heading3) prompt += `- H3: ${themeData.fonts.heading3}\n`;
        if (themeData.fonts.body) prompt += `- Body: ${themeData.fonts.body}\n`;
        if (themeData.fonts.accent) prompt += `- Accent: ${themeData.fonts.accent}\n`;
      }
    }
    
    // Add business metadata if available and selected
    if (useBusinessDetails && themeData.metadata) {
      const influenceText = getInfluenceText(businessDetailsInfluence);
      prompt += `The following business details have ${influenceText} influence (${Math.round(businessDetailsInfluence * 100)}%):
`;
      
      if (themeData.metadata.businessType) {
        prompt += `Industry: ${themeData.metadata.businessType}
`;
      }
      if (themeData.metadata.tone) {
        prompt += `Brand tone: ${themeData.metadata.tone}
`;
      }
    }
    
    // Add existing icons information if available and selected
    if (useIcons && themeData.icons?.set) {
      prompt += `Icon style: ${themeData.icons.set}\n`;
      if (themeData.icons.primaryColour) {
        prompt += `Icon primary color: ${themeData.icons.primaryColour}\n`;
      }
    }
    
    // Specify what needs to be generated
    prompt += '\nPlease generate the following:\n';
    
    if (generateRequest.colors) {
      prompt += '- A comprehensive color palette. This palette must include:\n';
      prompt += `  * Main Colors (${colorGenerationDNA.numMainColors} colors): These are the foundational colors of the theme.\n`;
      
      // Guidance on handling existing main colors when influence is high
      if (useColors && themeData.colours && themeData.colours.filter((c: ColorInfo) => c.category === 'main').length > 0 && colorInfluence > 0.7) {
        prompt += `    * High Influence on Main Colors: You are provided with existing main colors. 
`;
        prompt += `      - If the number of existing main colors matches the target (${colorGenerationDNA.numMainColors}), your primary goal is to REFINE these existing main colors. Preserve their core HEX, name, category, and type. Focus on updating descriptions and ensuring their idealUsecases are comprehensive and cover necessary CSS variables. Avoid generating entirely new main colors unless explicitly adding to meet a higher target count.
`;
        prompt += `      - If the target (${colorGenerationDNA.numMainColors}) is GREATER than the number of existing main colors, refine the existing ones as above, and then generate ONLY the ADDITIONAL main colors needed, ensuring they harmonize.
`;
        prompt += `      - If the target (${colorGenerationDNA.numMainColors}) is LESS than the number of existing main colors, select the most suitable ${colorGenerationDNA.numMainColors} from the existing ones, refine them (preserving core identity), and these will be the new main color set.
`;
      } else {
        // Standard guidance if not high influence or no existing main colors
        if (colorGenerationDNA.numMainColors === 2) {
          prompt += `    * Guidance for 2 Main Colors: Generate one Primary and one versatile Dark Contrast. The Primary may need to cover secondary roles. A Light Contrast can often be derived (e.g., near-white).\n`;
        } else if (colorGenerationDNA.numMainColors === 3) {
          prompt += `    * Guidance for 3 Main Colors: Generate one Primary, one Secondary, and one Dark Contrast. A Light Contrast can often be derived.\n`;
        } else if (colorGenerationDNA.numMainColors === 4) {
          prompt += `    * Guidance for 4 Main Colors: Generate one Primary, one Secondary, one Light Contrast (e.g., near-white), and one Dark Contrast (e.g., near-black).\n`;
        } else if (colorGenerationDNA.numMainColors >= 5) {
          prompt += `    * Guidance for ${colorGenerationDNA.numMainColors} Main Colors: Generate one Primary, one Secondary, one Light Contrast, one Dark Contrast, and ${colorGenerationDNA.numMainColors - 4} additional Main Accent/Highlight color(s). These main accents should be distinct and purposeful.\n`;
        }
      }
      prompt += `  * Supplement Colors (${colorGenerationDNA.numSupplementColors} colors): These should complement the Main Colors and help cover all CSS variables.\n`;
      
      // Handle existing supplement colors
      const existingSupplementColors = themeData.colours?.filter((c: ColorInfo) => c.category === 'supplement') || [];
      if (useColors && existingSupplementColors.length > 0) {
        const influenceDetailText = colorInfluence > 0.7 ? "Given the high color influence, aim to preserve the essence of existing supplement colors, especially their HEX values." :
                                   colorInfluence > 0.4 ? "Aim to maintain harmony with existing supplement colors; moderate HEX changes are acceptable." :
                                   "You have more freedom with existing supplement colors, but ensure overall coherence.";

        prompt += `    * Guidance for Existing Supplement Colors: You are provided with ${existingSupplementColors.length} existing supplement color(s). ${influenceDetailText}\n`;
        prompt += `      - Your goal is to achieve a final set of ${colorGenerationDNA.numSupplementColors} supplement colors.\n`;
        if (colorGenerationDNA.numSupplementColors > existingSupplementColors.length) {
          prompt += `      - Refine the ${existingSupplementColors.length} existing supplement color(s). For these, focus on descriptions and idealUsecases. Adjust HEX values according to the overall colorInfluence setting (minimal change if high, more freedom if lower). Then, generate ONLY ${colorGenerationDNA.numSupplementColors - existingSupplementColors.length} NEW supplement colors to meet the target. Ensure new ones harmonize and help cover remaining CSS variables.\n`;
        } else if (colorGenerationDNA.numSupplementColors === existingSupplementColors.length) {
          prompt += `      - Your primary goal is to REFINE these ${existingSupplementColors.length} existing supplement color(s). Adjust HEX, name, description, and idealUsecases according to the overall colorInfluence. If influence is very high, prioritize preserving core HEX and names. Avoid generating entirely new supplement colors if the count matches.\n`;
        } else { // numSupplementColors < existingSupplementColors.length
          prompt += `      - Select the most suitable ${colorGenerationDNA.numSupplementColors} from the existing ${existingSupplementColors.length} supplement color(s). Refine them (HEX, name, description, idealUsecases) according to the overall colorInfluence. These will be the new supplement color set.\n`;
        }
      } else { // No existing supplement colors to consider, or useColors is false
        prompt += `  * Generate ${colorGenerationDNA.numSupplementColors} NEW supplement colors based on the following guidance and the overall colorInfluence setting (if applicable):\n`;
      }

      prompt += '- For each color, include: name, category ("main" or "supplement"), mainColorType (if category is "main", e.g., "primary", "secondary", "contrast", "accent-main"), a brief description, and an array of idealUsecases (CSS variables it should map to from the provided list: background, foreground, primary, primary-foreground, secondary, secondary-foreground, card, card-foreground, popover, popover-foreground, muted, muted-foreground, accent, accent-foreground, destructive, destructive-foreground, border, input, ring, chart-1, chart-2, chart-3, chart-4, chart-5).\n';
      prompt += '- CRITICAL: Review existing colors (if provided) and their assigned idealUsecases. Prioritize assigning the remaining unassigned CSS variables from the master list to the new/updated colors. Each CSS variable in the *final combined palette* should ideally be uniquely assigned to ensure full coverage.\n';
      
      prompt += '\n- Palette Style Guidance based on DNA settings (this influences the characteristics of any NEWLY generated supplement colors and the style of refinement for existing ones):\n';
      prompt += `  * Hue Variety (0-1, current: ${colorGenerationDNA.hueVariety.toFixed(2)}): This setting controls the distinctness of hues for the **supplemental colors, specifically in relation to the Main Primary and Main Secondary colors.**
    - Low values (near 0): Supplemental color hues should be monochromatic or very closely analogous to the Main Primary and/or Main Secondary. Aim for a highly unified look, deriving hues predominantly from these two main colors.
    - Medium values (around 0.5): Supplemental colors can introduce some new hues but must maintain a clear harmonic relationship (e.g., analogous, triadic) with the Main Primary and Main Secondary.
    - High values (near 1): Supplemental colors can be more distinct and introduce more diverse hues (e.g., complementary), but they must still be chosen to create an overall harmonious palette that complements the Main Primary and Main Secondary.
    - Regardless of hue variety, the AI should naturally incorporate necessary tints and shades for a complete and harmonious palette, ensuring all CSS variables are covered.\n`;

      // NEW LOGIC FOR EXPLICIT ACCESSIBILITY COLORS
      let requestedAccessibilityColors = 0;
      if (colorGenerationDNA.includeErrorColor) {
        prompt += '  * Generate a distinct Error/Warning color (red-ish). This color MUST be functionally effective as an error indicator. While doing so, try to harmonize its tint/tone with the Main Primary color to maintain overall palette cohesion. Assign appropriate CSS variables (e.g., destructive, destructive-foreground).\n';
        requestedAccessibilityColors++;
      }
      if (colorGenerationDNA.includeSuccessColor) {
        prompt += '  * Generate a distinct Success/Confirmation color (green-ish). This color MUST be functionally effective as a success indicator. While doing so, try to harmonize its tint/tone with the Main Primary color. Assign appropriate CSS variables.\n';
        requestedAccessibilityColors++;
      }

      if (requestedAccessibilityColors > 0) {
        prompt += `  * These ${requestedAccessibilityColors} specifically requested accessibility color(s) will count towards your total of ${colorGenerationDNA.numSupplementColors} supplement colors. The remaining ${Math.max(0, colorGenerationDNA.numSupplementColors - requestedAccessibilityColors)} supplement colors should be generated based on the Hue Variety setting and other general guidance.\n`;
        if (colorGenerationDNA.numSupplementColors < requestedAccessibilityColors) {
          prompt += `  * Note: You have requested ${requestedAccessibilityColors} accessibility colors but only set ${colorGenerationDNA.numSupplementColors} total supplement colors. The AI will prioritize generating the requested accessibility colors if possible, potentially at the expense of other supplement colors if the count is too low.\n`;
        }
      } else if (colorGenerationDNA.numSupplementColors > 0) {
        prompt += `  * Generate the ${colorGenerationDNA.numSupplementColors} supplement colors based on the Hue Variety setting and other general guidance, ensuring broad CSS variable coverage.\n`;
      }

      if (useColors && themeData.colours && themeData.colours.length > 0) {
        if (colorInfluence > 0.8) {
          prompt += '- CRITICAL: New colors MUST be extremely similar to existing ones. Preserve overall identity. Minimal adjustments to hue/saturation/brightness (<20% change) from existing colors with the same category/type if possible.\n';
        } else if (colorInfluence > 0.5) {
          prompt += '- New colors should maintain similar feel/harmony to existing colors, with moderate variations allowed.\n';
        } else if (colorInfluence > 0.2) {
          prompt += '- New colors can be inspired by existing colors but can differ significantly.\n';
        } else {
          prompt += '- New colors can be completely different, minimal inspiration from existing if any.\n';
        }
      }
      prompt += '- Include a brief explanation (2-3 sentences) for why these colors (and their categories/types) were chosen and how they relate to the business/industry and the chosen Color Profile Preference.\n';
    }
    
    if (generateRequest.fonts) {
      prompt += '- Font recommendations (primary for headings and secondary for body text) that work well with the brand identity. Use web-safe or popular Google Fonts.\n';
      prompt += '- For each font, include recommended usage scenarios (e.g., "Primary: Headings, Titles, Navigation", "Secondary: Body text, Paragraphs").\n';
      
      // Add specific font influence instructions
      if (useFonts && themeData.fonts?.primary) {
        if (fontInfluence > 0.8) {
          prompt += '- The new fonts should be very similar to the existing ones, possibly the same primary font with only a different secondary font.\n';
        } else if (fontInfluence > 0.5) {
          prompt += '- The new fonts should be in the same style category (serif, sans-serif, etc.) as the existing fonts but can be different typefaces.\n';
        } else if (fontInfluence > 0.2) {
          prompt += '- The new fonts can be from different style categories but should maintain a similar mood or character.\n';
        } else {
          prompt += '- The new fonts can be completely different from the existing ones, prioritizing what works best for the brand.\n';
        }
      }
      
      prompt += '- Include a brief explanation (2-3 sentences) for why these fonts were chosen and how they complement the brand identity.\n';
    }
    
    if (generateRequest.icons) {
      prompt += '- Icon style recommendation that matches the brand identity (e.g., outlined, filled, colorful, minimal, etc.) and a suggested primary color for the icons.\n';
      prompt += '- Include a brief explanation for why this icon style matches the brand.\n';
    }
    
    // Request JSON format response
    prompt += '\nRespond ONLY in valid JSON format with the following structure (ensure all requested fields are present for each color):\n';
    prompt += '{\n';
    if (generateRequest.colors) {
      prompt += '  "colors": [\n';
      prompt += '    { "hex": "#HEX1", "name": "ColorName1", "category": "main", "mainColorType": "primary", "description": "Desc1", "idealUsecases": ["primary", "primary-foreground"] },\n';
      prompt += '    { "hex": "#HEX2", "name": "ColorName2", "category": "main", "mainColorType": "secondary", "description": "Desc2", "idealUsecases": ["secondary"] },\n';
      prompt += '    { "hex": "#HEX3", "name": "LightContrast", "category": "main", "mainColorType": "contrast", "description": "Desc3", "idealUsecases": ["background", "card-foreground"] },\n';
      prompt += '    { "hex": "#HEX4", "name": "DarkContrast", "category": "main", "mainColorType": "contrast", "description": "Desc4", "idealUsecases": ["foreground", "popover-foreground"] },\n';
      prompt += '    { "hex": "#HEX5", "name": "Supplement1", "category": "supplement", "description": "Desc5", "idealUsecases": ["accent"] },\n';
      prompt += '    { "hex": "#HEX6", "name": "SupplementError", "category": "supplement", "description": "Desc6 for errors", "idealUsecases": ["destructive", "destructive-foreground"] }\n';
      prompt += '    // ... more supplement colors as needed, ensuring all CSS variables are covered ...\n';
      prompt += '  ],\n';
      prompt += '  "colorExplanation": "Brief explanation of color choices related to brand and Color Profile Preference.",\n';
    }
    if (generateRequest.fonts) {
      prompt += '  "fonts": { "primary": "Font1", "secondary": "Font2", "primaryUsage": "Usage1", "secondaryUsage": "Usage2", "heading1": "F1", "heading2": "F1", "heading3": "F2", "body": "F2", "accent": "F1" },\n';
      prompt += '  "fontExplanation": "Brief font explanation.",\n';
    }
    if (generateRequest.icons) {
      prompt += '  "icons": { "set": "style", "primaryColour": "#HEX" },\n';
      prompt += '  "iconExplanation": "Brief icon explanation."\n';
    }
    prompt += '}';
    
    prompt += '\nDo not include any other text or explanation outside the JSON.';
    
    // Add context about what input sources are being used to inform the AI
    const usedSources = [];
    if (useLogo && themeData.logo) usedSources.push('logo');
    if (useColors && themeData.colours?.length > 0) usedSources.push(`existing colors (${Math.round(colorInfluence * 100)}% influence)`);
    // Add DNA settings to the log
    usedSources.push(
      `color DNA (Main: ${colorGenerationDNA.numMainColors}, Supplements: ${colorGenerationDNA.numSupplementColors}, Hue Variety: ${colorGenerationDNA.hueVariety.toFixed(2)})`
    );
    if (useFonts && themeData.fonts?.primary) usedSources.push(`existing fonts (${Math.round(fontInfluence * 100)}% influence)`);
    if (useIcons && themeData.icons?.set) usedSources.push('existing icons');
    if (useBusinessDetails && themeData.metadata) usedSources.push(`business details (${Math.round(businessDetailsInfluence * 100)}% influence)`);
    
    console.log(`Generating theme based on: ${usedSources.join(', ')}`);
    
    // Generate content with the constructed prompt
    console.log("Constructed prompt:", prompt);
    
    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (genAIError) {
      console.error("Gemini API error:", genAIError);
      return NextResponse.json(
        { 
          error: "Error from Gemini API", 
          details: genAIError instanceof Error ? genAIError.message : 'Unknown error' 
        },
        { status: 500 }
      );
    }
    
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      // Extract JSON from response (in case there's any extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("Failed to extract JSON from response:", text);
        return NextResponse.json(
          { error: "Invalid response format from AI", details: "No JSON object found in response" },
          { status: 500 }
        );
      }
      
      let jsonString = jsonMatch[0];
      
      // Attempt to fix common JSON formatting issues from AI responses
      try {
        // Sometimes the AI response has malformed JSON with missing closing brackets
        // Try to clean it up before parsing
        const openBrackets = (jsonString.match(/\[/g) || []).length;
        const closeBrackets = (jsonString.match(/\]/g) || []).length;
        if (openBrackets > closeBrackets) {
          console.log(`Detected unbalanced brackets. Adding ${openBrackets - closeBrackets} closing brackets.`);
          jsonString = jsonString + ']'.repeat(openBrackets - closeBrackets);
        }
        
        const openBraces = (jsonString.match(/\{/g) || []).length;
        const closeBraces = (jsonString.match(/\}/g) || []).length;
        if (openBraces > closeBraces) {
          console.log(`Detected unbalanced braces. Adding ${openBraces - closeBraces} closing braces.`);
          jsonString = jsonString + '}'.repeat(openBraces - closeBraces);
        }
      } catch (fixError) {
        console.error("Error while attempting to fix JSON:", fixError);
        // Continue with original string
      }
      
      let generatedTheme;
      try {
        generatedTheme = JSON.parse(jsonString);
      } catch (jsonParseError) {
        console.error("Failed to parse JSON:", jsonString, jsonParseError);
        
        // If we couldn't parse the JSON, try one more fallback approach
        try {
          // Try to extract just the colors array if that's what's requested
          if (generateRequest.colors) {
            const colorsMatch = jsonString.match(/\"colors\"\s*:\s*\[\s*\{[\s\S]*?\}\s*\]/);
            if (colorsMatch) {
              const colorsJson = `{${colorsMatch[0]}}`;
              generatedTheme = JSON.parse(colorsJson);
              
              // Add an explanation if missing
              if (!generatedTheme.colorExplanation) {
                generatedTheme.colorExplanation = "Generated color palette based on your requirements.";
              }
            } else {
              throw new Error("Could not extract colors array");
            }
          } else {
            throw new Error("JSON parsing failed and no specific fallback available");
          }
        } catch (fallbackError) {
          return NextResponse.json(
            { error: "Failed to parse JSON from AI response", details: jsonString },
            { status: 500 }
          );
        }
      }
      
      // Process colors from AI, ensuring they match ColorInfo structure
      if (generateRequest.colors && Array.isArray(generatedTheme.colors)) {
        generatedTheme.colors = generatedTheme.colors.map((c: any, index: number) => ({
          hex: c.hex || `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
          name: c.name || `Color ${index + 1}`,
          category: c.category || 'supplement', // Default if AI omits
          mainColorType: c.category === 'main' ? (c.mainColorType || undefined) : undefined, // Default if AI omits for main
          description: c.description || '',
          idealUsecases: Array.isArray(c.idealUsecases) ? c.idealUsecases : [],
        }));
      } else if (generateRequest.colors) {
        generatedTheme.colors = []; // Ensure colors array exists if requested but AI failed
      }
      
      // For high color influence (70-90%), programmatically adjust the generated colors
      if (useColors && colorInfluence > 0.7 && colorInfluence <= 0.9 && 
          themeData.colours && themeData.colours.length > 0 && 
          generatedTheme.colors && generatedTheme.colors.length > 0) {
        
        // Blend the generated colors with existing colors based on influence level
        try {
          const blendFactor = (colorInfluence - 0.7) * (1 / 0.2); // Maps 0.7-0.9 to 0-1
          const originalColors = themeData.colours;
          const newColors = generatedTheme.colors;
          
          // Blend each color, using as many colors as available from both arrays
          const colorCount = Math.min(originalColors.length, newColors.length);
          for (let i = 0; i < colorCount; i++) {
            // Try to match by category and type for more relevant blending
            const originalMatch = originalColors.find(oc => 
                oc.category === newColors[i].category && 
                (oc.category !== 'main' || oc.mainColorType === newColors[i].mainColorType)
            ) || originalColors[i]; // Fallback to direct index match

            const blendedHex = blendColors(
              newColors[i].hex, 
              originalMatch.hex, 
              blendFactor
            );
            newColors[i].hex = blendedHex;
            // Preserve other details from the AI-generated color primarily
            newColors[i].name = newColors[i].name || originalMatch.name;
            newColors[i].description = newColors[i].description || originalMatch.description;
            newColors[i].idealUsecases = newColors[i].idealUsecases.length > 0 ? newColors[i].idealUsecases : originalMatch.idealUsecases;
          }
          
          // Make sure explanation mentions the blending
          generatedTheme.colorExplanation = `${generatedTheme.colorExplanation || ''} These colors were programmatically blended by ${Math.round(blendFactor*100)}% with your existing palette to maintain similarity.`;
        } catch (blendError) {
          console.error("Error blending colors:", blendError);
          // Continue without blending rather than failing completely
        }
      }
      
      return NextResponse.json({ proposal: generatedTheme });
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return NextResponse.json(
        { 
          error: 'Failed to parse AI response', 
          details: parseError instanceof Error ? parseError.message : 'Unknown error',
          rawResponse: text.substring(0, 500) // Include part of the raw response for debugging
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate theme', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Helper function to convert numeric influence to descriptive text
function getInfluenceText(value: number): string {
  if (value >= 0.8) return "very high";
  if (value >= 0.6) return "high";
  if (value >= 0.4) return "medium";
  if (value >= 0.2) return "low";
  return "very low";
}

// Helper function to blend two hex colors with a weight factor
function blendColors(color1Hex: string, color2Hex: string, weight: number): string {
  let hex1 = color1Hex.startsWith('#') ? color1Hex.substring(1) : color1Hex;
  let hex2 = color2Hex.startsWith('#') ? color2Hex.substring(1) : color2Hex;

  if (hex1.length === 3) hex1 = hex1[0]+hex1[0]+hex1[1]+hex1[1]+hex1[2]+hex1[2];
  if (hex2.length === 3) hex2 = hex2[0]+hex2[0]+hex2[1]+hex2[1]+hex2[2]+hex2[2];

  const r1 = parseInt(hex1.substring(0,2),16);
  const g1 = parseInt(hex1.substring(2,4),16);
  const b1 = parseInt(hex1.substring(4,6),16);
  const r2 = parseInt(hex2.substring(0,2),16);
  const g2 = parseInt(hex2.substring(2,4),16);
  const b2 = parseInt(hex2.substring(4,6),16);
  
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
} 