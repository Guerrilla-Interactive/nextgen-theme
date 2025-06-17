"use client";

import React, { createContext, useContext, useEffect, ReactNode, useState, useCallback } from "react";

import nextgenBrand from "./brandguide"; // nextgenBrand is the default export
import {
  type OklchString, // Keep OklchString
  type ThemeCssVars,
  type Shade as BaseBrandUtilShade, // Renamed to avoid conflict if EnrichedShade is different
  type Role,
  type Brand,
  type ColorToken,
  // ShadeKey was removed from brand-utils, if needed here, define locally or adapt
  // For now, let LightnessStepKey (from brand-utils if exported, or define similar concept) guide steps.
  type LightnessStepKey, // Assuming this will be exported from brand-utils or defined appropriately
  generateGlobalCss
} from "./brand-utils";
import { converter, formatHex } from 'culori'; // Import from culori

// Enhanced types for context
// EnrichedShade's structure needs to be compatible with how it's used and what it represents.
// If it's a UI representation of the color-mix steps or base oklch values.
export interface EnrichedShade { // Simplified for now to address immediate errors
  variableName: string; // e.g., emerald-bright, sage-0
  value: string; // This will hold the actual CSS value (oklch string or color-mix string)
  resolvedValue: string; // Could be same as value, or resolved if value is a var()
  isAlias: boolean;
  aliasTarget?: string;
  sourceTokenName?: string;
  sourceShadeKey?: string; // Was ShadeKey, now string for flexibility
  calculatedLightness: number; // 0-1 scale, needs to be derived from OKLCH
  mappedThemeVars?: string[];
}

export interface EnrichedColorToken extends ColorToken { // Directly extend new ColorToken
  // 'shades' will represent a collection of displayable color variations for the UI, 
  // potentially derived from base oklch and steps.
  // The keys could be 'base', 'on', or step keys like 'bright', 'darker'.
  shades: Partial<Record<string, EnrichedShade>>; // Key is string (e.g. 'base', 'bright')
  referrers?: Array<{ tokenName: string; shadeKey: string; referringToWhat: 'main' | string }>;
  sortedDisplayShades?: EnrichedShade[];
  tokenLevelMappedThemeVars?: string[];
}

export interface EnrichedBrand extends Omit<Brand, 'colors'> {
  colors: EnrichedColorToken[];
}

interface BrandContextType {
  brand: Brand | null;
  committedBrand: Brand | null;
  processedBrand: EnrichedBrand | null;
  activeThemeKey: string;
  availableThemes: Record<string, Brand>;
  setActiveTheme: (themeKey: string) => void;
  previewColorUpdate: (colorName: string, newOklchValue: string) => void; // param changed
  commitColorUpdate: (colorName: string, newOklchValue: string) => void;  // param changed
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoStepsAvailable: number;
  redoStepsAvailable: number;
  updateRoleAssignment: (roleToUpdate: Role, targetColorVariableName: string | null) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

interface BrandProviderProps {
  children: ReactNode;
  initialThemes: Record<string, Brand>;
  initialThemeKey: string;
}

export const BrandProvider = ({ children, initialThemes, initialThemeKey }: BrandProviderProps) => {
  const [activeThemeKey, _internalSetActiveThemeKey] = useState<string>(initialThemeKey);
  const [history, setHistory] = useState<Brand[]>([initialThemes[initialThemeKey]]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
  const [liveBrand, setLiveBrand] = useState<Brand>(initialThemes[initialThemeKey]);
  const [processedBrand, setProcessedBrand] = useState<EnrichedBrand | null>(null);

  const currentThemeData = initialThemes[activeThemeKey] || nextgenBrand;

  // Define committedBrand and brandToDisplay here, before useEffect
  const committedBrand = history[currentHistoryIndex] || null;
  const brandToDisplay = liveBrand || committedBrand || currentThemeData;

  const handleSetActiveTheme = useCallback((newThemeKey: string) => {
    if (initialThemes[newThemeKey]) {
      _internalSetActiveThemeKey(newThemeKey);
      const newThemeBrand = initialThemes[newThemeKey];
      setLiveBrand(newThemeBrand);
      setHistory([newThemeBrand]);
      setCurrentHistoryIndex(0);
      // processedBrand will be updated by the main useEffect due to brandToDisplay changing
    } else {
      console.warn(`Theme key "${newThemeKey}" not found in initialThemes.`);
    }
  }, [initialThemes, _internalSetActiveThemeKey, setLiveBrand, setHistory, setCurrentHistoryIndex]);

  const applyPreviewOrCommit = (
    colorNameToUpdate: string,
    newOklchValue: string,
    brandStateToUpdate: Brand
  ): Brand => {
    const updatedColors = brandStateToUpdate.colors.map(color =>
      color.name === colorNameToUpdate ? { ...color, oklchLight: newOklchValue as OklchString } : color
    );
    return { ...brandStateToUpdate, colors: updatedColors };
  };

  const previewColorUpdate = useCallback((colorNameToUpdate: string, newOklchValue: string) => {
    setLiveBrand(currentLiveBrand =>
      applyPreviewOrCommit(colorNameToUpdate, newOklchValue, currentLiveBrand || currentThemeData)
    );
  }, [currentThemeData]);

  const commitColorUpdate = useCallback((colorNameToUpdate: string, newOklchValue: string) => {
    const brandToCommitFrom = liveBrand || history[currentHistoryIndex] || currentThemeData;
    const newBrandState = applyPreviewOrCommit(colorNameToUpdate, newOklchValue, brandToCommitFrom);

    setHistory(prevHistory => {
      const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
      return [...newHistorySlice, newBrandState];
    });
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setLiveBrand(newBrandState);

  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const undo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(history[newIndex]);
    }
  }, [history, currentHistoryIndex]);

  const redo = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(history[newIndex]);
    }
  }, [history, currentHistoryIndex]);

  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;
  const undoStepsAvailable = currentHistoryIndex;
  const redoStepsAvailable = history.length - 1 - currentHistoryIndex;

  const updateRoleAssignment = useCallback((roleToUpdate: Role, targetColorVariableName: string | null) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    // Create a new brand state by mapping over colors and updating roles immutably
    const updatedColors = brandToUpdate.colors.map(color => {
      const newRoles = color.roles.filter(r => r !== roleToUpdate);
      if (color.variableName === targetColorVariableName) {
        newRoles.push(roleToUpdate);
      }
      // Return a new color object if roles changed, otherwise the original
      return color.roles.length === newRoles.length && color.roles.every((r, i) => r === newRoles[i])
        ? color
        : { ...color, roles: newRoles };
    });

    // Only proceed if there's an actual change
    if (updatedColors.some((c, i) => c !== brandToUpdate.colors[i])) {
      const newBrandState: Brand = { ...brandToUpdate, colors: updatedColors };

      setHistory(prevHistory => {
        const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
        return [...newHistorySlice, newBrandState];
      });
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(newBrandState);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  useEffect(() => {
    const brandForCSS = brandToDisplay;
    if (typeof window !== "undefined" && brandForCSS && brandForCSS.colors) {
      const rootStyle = document.documentElement.style;
      const hslConverter = converter('hsl'); // Expects hex, rgb etc.
      const oklchConverter = converter('oklch');
      const expectedCssVariables = new Set<string>();

      const setAndTrackProperty = (varName: string, value: string) => {
        rootStyle.setProperty(varName, value);
        expectedCssVariables.add(varName);
      };

      const findSourceTokenAndShade = (aliasTargetVar: string): { tokenName?: string; shadeKey?: string } => {
        if (!aliasTargetVar.startsWith('var(--') || !aliasTargetVar.endsWith(')')) return {};
        const targetVar = aliasTargetVar.slice(6, -1);

        for (const token of brandForCSS.colors) { // These are ColorToken
          // Check against base variable name
          if (`--${token.variableName}` === targetVar) {
            return { tokenName: token.name, shadeKey: 'base' };
          }
          // Check against step variable names (e.g., token.variableName + '-bright')
          const stepKeys: LightnessStepKey[] = ['bright', 'brighter', 'dark', 'darker'];
          for (const step of stepKeys) {
            if (`--${token.variableName}-${step}` === targetVar) {
              return { tokenName: token.name, shadeKey: step };
            }
          }
          // Check against onColorLight/Dark variable names if they are structured (e.g. --token-on)
          // This part is TBD as onColorLight/Dark are direct OklchStrings now.
        }
        return {};
      };

      const newEnrichedColors: EnrichedColorToken[] = JSON.parse(JSON.stringify(brandForCSS.colors));
      newEnrichedColors.forEach((tokenBeingProcessed: EnrichedColorToken) => {
        tokenBeingProcessed.shades = tokenBeingProcessed.shades || {};
        tokenBeingProcessed.tokenLevelMappedThemeVars = tokenBeingProcessed.tokenLevelMappedThemeVars || [];
        tokenBeingProcessed.referrers = tokenBeingProcessed.referrers || [];

        if (!tokenBeingProcessed.oklchLight || !tokenBeingProcessed.category) {
          console.warn("Skipping enrichment for token due to missing oklchLight or category:", tokenBeingProcessed.name);
          return;
        }

        const baseOklchLight = tokenBeingProcessed.oklchLight;
        const baseOklchLightParts = oklchConverter(baseOklchLight);
        const baseL = baseOklchLightParts?.l || 0;

        // Populate .shades for EnrichedColorToken based on new structure
        const processedShades: Partial<Record<string, EnrichedShade>> = {};

        // Base shade (light theme)
        processedShades['base'] = {
          variableName: tokenBeingProcessed.variableName,
          value: baseOklchLight,
          resolvedValue: baseOklchLight,
          isAlias: false,
          calculatedLightness: baseL,
          mappedThemeVars: []
        };

        // 'on' color for light theme base
        if (tokenBeingProcessed.onColorLight) {
          const onL = oklchConverter(tokenBeingProcessed.onColorLight)?.l || (baseL < 0.55 ? 0.97 : 0.05);
          processedShades['on'] = {
            variableName: `${tokenBeingProcessed.variableName}-on`, // Convention
            value: tokenBeingProcessed.onColorLight,
            resolvedValue: tokenBeingProcessed.onColorLight,
            isAlias: false, // Or true if it aliases another token's onColor
            calculatedLightness: onL,
            mappedThemeVars: []
          };
        }

        // Light theme steps
        (Object.keys(tokenBeingProcessed.lightThemeSteps) as LightnessStepKey[]).forEach(stepKey => {
          const stepValue = tokenBeingProcessed.lightThemeSteps[stepKey];
          if (stepValue) {
            // Simplified: lightness calculation for color-mix is complex. Using baseL as placeholder.
            processedShades[stepKey] = {
              variableName: `${tokenBeingProcessed.variableName}-${stepKey}`,
              value: stepValue,
              resolvedValue: stepValue,
              isAlias: false, // color-mix is not an alias in this context
              calculatedLightness: baseL, // Placeholder - actual L of color-mix is non-trivial
              mappedThemeVars: []
            };
          }
        });
        tokenBeingProcessed.shades = processedShades;

        // Populate sortedDisplayShades
        const newSortedDisplayShades: EnrichedShade[] = [];
        const orderForSorting: Array<LightnessStepKey | 'base'> = ['brighter', 'bright', 'base', 'dark', 'darker'];

        orderForSorting.forEach(key => {
          const shade = processedShades[key];
          if (shade) {
            newSortedDisplayShades.push(shade);
          }
        });
        tokenBeingProcessed.sortedDisplayShades = newSortedDisplayShades;
        // Note: The 'on' shade is not typically included in this visual scale display.
      });

      newEnrichedColors.forEach(tokenToPopulateReferrersFor => {
        // Simplified Referrers: Find if any token's step *value* (a color-mix string) contains `var(--${tokenToPopulateReferrersFor.variableName})`
        if (!tokenToPopulateReferrersFor.referrers) tokenToPopulateReferrersFor.referrers = [];
        newEnrichedColors.forEach(potentialReferrer => {
          if (potentialReferrer === tokenToPopulateReferrersFor) return;
          Object.entries(potentialReferrer.lightThemeSteps).forEach(([stepKey, stepValue]) => {
            if (stepValue.includes(`var(--${tokenToPopulateReferrersFor.variableName})`)) {
              tokenToPopulateReferrersFor.referrers?.push({
                tokenName: potentialReferrer.name,
                shadeKey: stepKey,
                referringToWhat: 'main' // Simplified
              });
            }
          });
          // Could also check darkThemeSteps
        });
      });

      if (brandForCSS.themeCssVariables) {
        newEnrichedColors.forEach(token => {
          token.tokenLevelMappedThemeVars = token.tokenLevelMappedThemeVars || [];
          token.shades = token.shades || {};
          Object.values(token.shades).forEach(shade => { if (shade) shade.mappedThemeVars = shade.mappedThemeVars || []; });
        });
        Object.entries(brandForCSS.themeCssVariables).forEach(([themeVarKey, themeVarValueStr]) => {
          if (typeof themeVarValueStr === 'string' && themeVarValueStr.startsWith('var(--')) {
            const targetCssVar = themeVarValueStr.slice(4, -1);
            for (const token of newEnrichedColors) {
              let matched = false;

              // Ensure token itself is not null/undefined
              if (!token) {
                console.warn("Skipping a null/undefined token in theme variable mapping loop.");
                continue;
              }

              if (token.variableName === targetCssVar) {
                const fullThemeVarName = `--${themeVarKey}`;
                // Ensure shades and base exist before trying to push to mappedThemeVars
                token.shades = token.shades || {};
                token.shades['base'] = token.shades['base'] || { variableName: token.variableName, value: token.oklchLight, resolvedValue: token.oklchLight, isAlias: false, calculatedLightness: 0, mappedThemeVars: [] }; // Minimal fallback for base
                token.shades['base'].mappedThemeVars = token.shades['base'].mappedThemeVars || [];
                token.shades['base'].mappedThemeVars?.push(fullThemeVarName);

                token.tokenLevelMappedThemeVars = token.tokenLevelMappedThemeVars || [];
                if (!token.tokenLevelMappedThemeVars?.includes(fullThemeVarName)) {
                  token.tokenLevelMappedThemeVars?.push(fullThemeVarName);
                }
                matched = true;
              } else {
                // Defensive initialization for token.shades if it's unexpectedly undefined here
                if (typeof token.shades === 'undefined') {
                  console.warn(`Unexpected undefined token.shades for ${token.name}. Initializing to {}.`);
                  token.shades = {};
                }
                // Now token.shades is guaranteed to be an object.
                for (const shade of Object.values(token.shades)) {
                  if (shade && shade.variableName === targetCssVar) {
                    const fullThemeVarName = `--${themeVarKey}`;
                    shade.mappedThemeVars = shade.mappedThemeVars || [];
                    shade.mappedThemeVars?.push(fullThemeVarName);

                    token.tokenLevelMappedThemeVars = token.tokenLevelMappedThemeVars || [];
                    if (!token.tokenLevelMappedThemeVars?.includes(fullThemeVarName)) {
                      token.tokenLevelMappedThemeVars?.push(fullThemeVarName);
                    }
                    matched = true;
                    break;
                  }
                }
              }
              if (matched) break;
            }
          }
        });
      }

      // CSS variable setting logic (currently simplified / needs OKLCH focus)
      // This part needs to align with generateGlobalCss output if that's the primary CSS source.
      // For now, setting base vars from newEnrichedColors to see them live.
      newEnrichedColors.forEach(token => {
        if (token.oklchLight) {
          setAndTrackProperty(`--${token.variableName}`, token.oklchLight);
          if (token.onColorLight) {
            setAndTrackProperty(`--${token.variableName}-on`, token.onColorLight);
          }
          Object.entries(token.lightThemeSteps).forEach(([stepKey, stepValue]) => {
            if (stepValue) setAndTrackProperty(`--${token.variableName}-${stepKey}`, stepValue);
          });
        }
        // Dark theme variables are usually applied via class scope from generateGlobalCss
      });

      // Apply semantic aliases from themeCssVariables, making them dynamic for color roles
      if (brandForCSS.themeCssVariables) {
        const themeRoleKeys = Object.keys(brandForCSS.themeCssVariables) as Array<keyof ThemeCssVars>;

        themeRoleKeys.forEach(roleKey => {
          const originalThemeVarValue = brandForCSS.themeCssVariables[roleKey];
          let cssValueToSet: string | undefined = undefined;

          // Check if this key is a color role that should be dynamically resolved
          const isDynamicColorRole = [
            'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
            'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
            'muted', 'muted-foreground', 'accent', 'accent-foreground',
            'destructive', 'destructive-foreground', 'success', 'success-foreground',
            'info', 'info-foreground',
            'border', 'input', 'input-foreground', 'ring',
            'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-outline'
          ].includes(roleKey);

          if (isDynamicColorRole) {
            // Check for direct assignment to this roleKey first (for any role, including foregrounds)
            const directlyAssignedToken = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes(roleKey as Role));

            if (directlyAssignedToken) {
              cssValueToSet = `var(--${directlyAssignedToken.variableName})`;
            } else if (roleKey.endsWith('-foreground')) { // If not directly assigned AND it's a foreground role
              const surfaceRoleKey = roleKey.replace('-foreground', '') as Role;
              const surfaceToken = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes(surfaceRoleKey));
              if (surfaceToken) {
                if (surfaceToken.onColorLight) {
                  cssValueToSet = surfaceToken.onColorLight;
                } else {
                  // Fallback for foreground if surface token has no onColorLight
                  const genericFgToken = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes('foreground'));
                  if (genericFgToken) {
                    cssValueToSet = `var(--${genericFgToken.variableName})`;
                  } else {
                    // Absolute fallback for foreground
                    const bgTokenForFgFallback = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes('background'));
                    const bgL = bgTokenForFgFallback ? (oklchConverter(bgTokenForFgFallback.oklchLight)?.l ?? 0.95) : 0.95;
                    cssValueToSet = bgL >= 0.5 ? "oklch(0.1 0 0)" : "oklch(0.95 0 0)";
                  }
                }
              } else {
                // Fallback if the surface role itself is unassigned, try original theme var or absolute fallback
                if (originalThemeVarValue) cssValueToSet = String(originalThemeVarValue);
                else {
                  const bgTokenForFgFallback = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes('background'));
                  const bgL = bgTokenForFgFallback ? (oklchConverter(bgTokenForFgFallback.oklchLight)?.l ?? 0.95) : 0.95;
                  cssValueToSet = bgL >= 0.5 ? "oklch(0.1 0 0)" : "oklch(0.95 0 0)";
                }
              }
            } else { // It's a main role (not a foreground) and not directly assigned (this case should ideally be caught by directlyAssignedToken already)
              // This else block handles base roles that might not have been directly assigned but have a definition in themeCssVariables
              const tokenForRole = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes(roleKey as Role));
              if (tokenForRole) { // Should have been caught by directlyAssignedToken
                cssValueToSet = `var(--${tokenForRole.variableName})`;
              } else if (originalThemeVarValue) {
                // Fallback to the theme's original definition if role is unassigned and no direct token found
                cssValueToSet = String(originalThemeVarValue);
              }
            }
          } else {
            // Not a dynamic color role (e.g., radius, shadow), use original value
            if (originalThemeVarValue !== undefined) {
              cssValueToSet = String(originalThemeVarValue);
            }
          }

          if (cssValueToSet !== undefined) {
            setAndTrackProperty(`--${roleKey}`, cssValueToSet);
          } else {
            // If a variable is optional in ThemeCssVars and not resolved, it's okay to not set it.
            // console.warn(`CSS Variable --${roleKey} could not be resolved and has no default value.`);
          }
        });
      }

      // Set font CSS variables based on brand fonts
      if (brandForCSS.fonts && brandForCSS.fonts.length > 0) {
        const fontSans = brandForCSS.fonts.find(f => f.roles.includes('sans'))?.family || 'sans-serif';
        const fontSerif = brandForCSS.fonts.find(f => f.roles.includes('serif'))?.family || 'serif';
        const fontMono = brandForCSS.fonts.find(f => f.roles.includes('mono'))?.family || 'monospace';

        // New primary font role variables
        const fontBody = brandForCSS.fonts.find(f => f.roles.includes('body'))?.family || fontSans;
        const fontDisplay = brandForCSS.fonts.find(f => f.roles.includes('display'))?.family || fontSans;
        const fontCode = brandForCSS.fonts.find(f => f.roles.includes('code'))?.family || fontMono;

        console.log('Setting font CSS variables:', { fontSans, fontSerif, fontMono, fontBody, fontDisplay, fontCode });

        // Legacy variables (keep for backward compatibility)
        setAndTrackProperty('--font-sans', fontSans);
        setAndTrackProperty('--font-serif', fontSerif);
        setAndTrackProperty('--font-mono', fontMono);

        // Primary role variables
        setAndTrackProperty('--font-body', fontBody);
        setAndTrackProperty('--font-display', fontDisplay);
        setAndTrackProperty('--font-code', fontCode);

        // Also set the body font directly
        document.body.style.fontFamily = fontBody;
      }

      const finalProcessedBrand: EnrichedBrand = {
        ...brandForCSS,
        colors: newEnrichedColors
      };
      setProcessedBrand(finalProcessedBrand);

      // --- BEGIN: Apply all :root variables from generateGlobalCss ---
      const completeCssString = generateGlobalCss(brandForCSS);
      const rootBlockMatch = completeCssString.match(/:root\s*{\s*([\s\S]*?)\s*}/);

      // Define semanticRolesToGetSteps here, consistent with brand-utils.ts
      const semanticRolesToGetSteps: Array<keyof ThemeCssVars> = [
        'primary', 'secondary', 'accent', 'destructive', 'success', 'info', 'ring',
        'chart1', 'chart2', 'chart3', 'chart4', 'chart5'
      ];

      if (rootBlockMatch && rootBlockMatch[1]) {
        const rootCssContent = rootBlockMatch[1];
        const cssVariableRegex = /\s*(--[^:]+)\s*:\s*([^;]+);/g;
        let match;
        console.log("[BrandContext Debug] Applying all :root variables from generateGlobalCss string:");
        while ((match = cssVariableRegex.exec(rootCssContent)) !== null) {
          const varName = match[1].trim();
          const varValue = match[2].trim();

          const isDerivedSemanticStep = semanticRolesToGetSteps.some(roleKey => varName.startsWith(`--${roleKey}-`));

          // If the variable wasn't set by earlier specific logic OR if it IS a derived semantic step,
          // then apply the value from generateGlobalCss.
          if (!expectedCssVariables.has(varName) || isDerivedSemanticStep) {
            // console.log(`[BrandContext Debug]   Setting from generateGlobalCss :root: ${varName}: ${varValue}`);
            rootStyle.setProperty(varName, varValue);
            expectedCssVariables.add(varName); // Track it as set
          } else {
            // console.log(`[BrandContext Debug]   Skipping (already set by specific logic and not a derived step): ${varName}`);
          }
        }
      }
      // --- END: Apply all :root variables from generateGlobalCss ---

      console.log("--- CSS Variables Applied (Full Check via BrandContext) ---");
      expectedCssVariables.forEach(varName => {
        const value = rootStyle.getPropertyValue(varName).trim();
        if (!value) console.warn(`CSS Variable '${varName}' expected but is EMPTY/NULL.`);
      });
      console.log("--- End CSS Variable Check (BrandContext) ---");
    }
  }, [brandToDisplay]); // brandToDisplay is liveBrand || committedBrand || currentThemeData

  return (
    <BrandContext.Provider value={{
      brand: brandToDisplay,
      committedBrand,
      processedBrand,
      activeThemeKey,
      availableThemes: initialThemes,
      setActiveTheme: handleSetActiveTheme,
      previewColorUpdate,
      commitColorUpdate,
      undo,
      redo,
      canUndo,
      canRedo,
      undoStepsAvailable,
      redoStepsAvailable,
      updateRoleAssignment
    }}>
      {children}
    </BrandContext.Provider>
  );
};
