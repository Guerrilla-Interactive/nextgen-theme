"use client";

import React, { createContext, useContext, useReducer, ReactNode, useCallback, useMemo, useEffect, useRef, useState } from "react";

import nextgenBrand from "./brandguide"; // nextgenBrand is the default export
import {
  type OklchString, // Keep OklchString
  type ThemeCssVars,
  type Shade as BaseBrandUtilShade, // Renamed to avoid conflict if EnrichedShade is different
  type Role,
  type Brand,
  type ColorToken,
  type FontToken,
  // ShadeKey was removed from brand-utils, if needed here, define locally or adapt
  // For now, let LightnessStepKey guide steps.
  type LightnessStepKey, // Assuming this will be exported from brand-utils or defined appropriately
  generateGlobalCss,
  type ThemeAnimationConfig,
  generateAnimationCss,
  createColorToken,
  RawColorDefinition,
  influenceHierarchy
} from "./brand-utils";
import { converter, formatHex, parseHex } from 'culori'; // Import from culori
import { animationPresets } from './animation-presets';

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
  updateColorName: (oldName: string, newName: string) => void; // New function for updating color names
  addNewColor: (name: string, hexColor: string, roles?: Role[], onColorAdded?: (colorName: string) => void) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoStepsAvailable: number;
  redoStepsAvailable: number;
  updateRoleAssignment: (roleToUpdate: Role, targetColorVariableName: string | null) => void;
  // New role-based color handling functions
  handleRoleSwatchSelection: (role: Role, swatchName: string) => void;
  handleRoleDirectColorChange: (role: Role, newHex: string) => void;
  previewRoleDirectColorChange: (role: Role, newHex: string) => void;
  // Font role assignment functions
  updateFontRoleAssignment: (roleToUpdate: string, targetFontName: string | null) => void;
  handleFontRoleSwatchSelection: (role: string, fontSwatchName: string) => void;
  handleFontRoleDirectChange: (role: string, fontFamily: string) => void;
  addNewFont: (name: string, fontFamily: string, distributor: string, roles?: string[], onFontAdded?: (fontName: string) => void) => void;
  // Font weight assignment functions
  updateFontWeightAssignment: (fontName: string, role: string, weightName: string) => void;
  getFontWeightForRole: (fontName: string, role: string) => string | null;
  // Font size assignment functions
  updateFontSizeAssignment: (fontName: string, role: string, sizeValue: number) => void;
  getFontSizeForRole: (fontName: string, role: string) => number | null;
  // Animation config functions
  updateAnimationConfig: (presetName: string) => void;
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

  // Add ref to track when we're in the middle of a specific CSS update to prevent conflicts
  const isUpdatingCssRef = useRef(false);
  const cssUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentThemeData = initialThemes[activeThemeKey] || nextgenBrand;

  // Define committedBrand and brandToDisplay here, before useEffect
  const committedBrand = history[currentHistoryIndex] || null;
  const brandToDisplay = liveBrand || committedBrand || currentThemeData;

  console.log(`[BrandProvider] 📊 Brand state recalculated:`, {
    liveBrandExists: !!liveBrand,
    committedBrandExists: !!committedBrand,
    brandToDisplaySource: liveBrand ? 'liveBrand' : (committedBrand ? 'committedBrand' : 'currentThemeData'),
    brandToDisplayReference: brandToDisplay,
    primaryRoleAssignments: brandToDisplay?.colors?.filter(c => c.roles?.includes('primary')).map(c => ({ name: c.name, variableName: c.variableName }))
  });

  // Add useEffect to track liveBrand changes
  useEffect(() => {
    console.log(`[BrandProvider] 🔄 liveBrand changed:`, {
      liveBrandReference: liveBrand,
      primaryInLiveBrand: liveBrand?.colors?.filter(c => c.roles?.includes('primary')).map(c => ({ name: c.name, variableName: c.variableName })),
      liveBrandColors: liveBrand?.colors?.length
    });
  }, [liveBrand]);

  // Add useEffect to track when brandToDisplay changes
  useEffect(() => {
    console.log(`[BrandProvider] 🎯 brandToDisplay changed:`, {
      brandToDisplayReference: brandToDisplay,
      primaryInBrandToDisplay: brandToDisplay?.colors?.filter(c => c.roles?.includes('primary')).map(c => ({ name: c.name, variableName: c.variableName }))
    });
  }, [brandToDisplay]);

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
      color.name === colorNameToUpdate ? { ...color, oklch: newOklchValue as OklchString } : color
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

  const updateColorName = useCallback((oldName: string, newName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[updateColorName] Updating color name from "${oldName}" to "${newName}"`);

    // Check if new name already exists
    if (brandToUpdate.colors.find(color => color.name === newName)) {
      console.warn(`[updateColorName] Color with name "${newName}" already exists, skipping update`);
      return;
    }

    // Find the color to update by name
    const colorToUpdate = brandToUpdate.colors.find(color => color.name === oldName);
    if (!colorToUpdate) {
      console.warn(`[updateColorName] Color with name "${oldName}" not found`);
      return;
    }

    // Update the color name
    const updatedColors = brandToUpdate.colors.map(color => {
      if (color.name === oldName) {
        return {
          ...color,
          name: newName.trim(),
          description: `Custom color: ${newName.trim()}`, // Update description too
          rawTokenSpecificName: newName.trim()
        };
      }
      return color;
    });

    const newBrandState: Brand = {
      ...brandToUpdate,
      colors: updatedColors
    };

    // Update history
    setHistory(prevHistory => {
      const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
      return [...newHistorySlice, newBrandState];
    });
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setLiveBrand(newBrandState);

    console.log(`[updateColorName] Successfully updated color name from "${oldName}" to "${newName}"`);
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

  // Helper function to regenerate themeCssVariables based on current role assignments
  const regenerateThemeCssVariables = useCallback((brandState: Brand): Brand => {
    // Create a new themeCssVariables object based on current role assignments
    const newThemeCssVariables: ThemeCssVars = { ...brandState.themeCssVariables };

    // Helper function to find color assigned to a role
    const getColorVariableForRole = (role: Role): string | undefined => {
      const assignedColor = brandState.colors.find(color => color.roles?.includes(role));
      if (assignedColor) {
        return `var(--${assignedColor.variableName})`;
      }
      return undefined;
    };

    // Update all role mappings based on current assignments
    const roleKeys = Object.keys(newThemeCssVariables) as (keyof ThemeCssVars)[];

    roleKeys.forEach(roleKey => {
      const role = roleKey as Role;
      if (influenceHierarchy[role] !== undefined) {
        const colorVariable = getColorVariableForRole(role);
        if (colorVariable) {
          (newThemeCssVariables as any)[roleKey] = colorVariable;
        }
      }
    });

    return {
      ...brandState,
      themeCssVariables: newThemeCssVariables
    };
  }, []);

  const updateRoleAssignment = useCallback((roleToUpdate: Role, targetColorVariableName: string | null) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[updateRoleAssignment] ==== STARTING ROLE ASSIGNMENT ====`);
    console.log(`[updateRoleAssignment] Role to update: "${roleToUpdate}"`);
    console.log(`[updateRoleAssignment] Target color variable name: "${targetColorVariableName}"`);

    // Debug: Log current chart role assignments before any changes
    const chartRolesBefore = brandToUpdate.colors.filter(color =>
      color.roles?.some(role => role.startsWith('chart-'))
    ).map(color => ({
      color: color.name,
      variableName: color.variableName,
      chartRoles: color.roles?.filter(role => role.startsWith('chart-')),
      allRoles: color.roles
    }));

    if (chartRolesBefore.length > 0) {
      console.log(`[updateRoleAssignment] Chart colors BEFORE updating "${roleToUpdate}":`, chartRolesBefore);
    }

    // Find the target color (where we want to assign the role)
    const targetColor = targetColorVariableName ? brandToUpdate.colors.find(color => color.variableName === targetColorVariableName) : null;

    if (targetColor) {
      console.log(`[updateRoleAssignment] Target color found: "${targetColor.name}" (${targetColor.variableName})`);
      console.log(`[updateRoleAssignment] Target color current roles:`, targetColor.roles);

      // Check if target color is a chart color
      const isTargetChartColor = targetColor.roles?.some(role => role.startsWith('chart-'));
      if (isTargetChartColor) {
        console.warn(`[updateRoleAssignment] ⚠️  WARNING: Target color "${targetColor.name}" is a chart color with roles:`, targetColor.roles);
        console.warn(`[updateRoleAssignment] ⚠️  This may cause unintended chart role modifications!`);
      }
    } else if (targetColorVariableName) {
      console.warn(`[updateRoleAssignment] Target color with variable name "${targetColorVariableName}" NOT FOUND!`);
      console.log(`[updateRoleAssignment] Available variable names:`, brandToUpdate.colors.map(c => ({ name: c.name, variableName: c.variableName })));
    }

    // Find the current owner of the role
    const currentRoleOwner = brandToUpdate.colors.find(color => color.roles?.includes(roleToUpdate));

    if (currentRoleOwner) {
      console.log(`[updateRoleAssignment] Current owner of role "${roleToUpdate}": "${currentRoleOwner.name}" (${currentRoleOwner.variableName})`);
      console.log(`[updateRoleAssignment] Current owner roles:`, currentRoleOwner.roles);
    } else {
      console.log(`[updateRoleAssignment] Role "${roleToUpdate}" is not currently assigned to any color`);
    }

    if (targetColor && currentRoleOwner !== targetColor) {
      console.log(`[updateRoleAssignment] Proceeding with role reassignment...`);

      // Clean role reassignment without touching hierarchy or other properties
      const updatedColors = brandToUpdate.colors.map(color => {
        if (color === currentRoleOwner) {
          // Remove role from current owner
          const newRoles = color.roles?.filter(role => role !== roleToUpdate) || [];
          console.log(`[updateRoleAssignment] Removing role "${roleToUpdate}" from "${color.name}": ${color.roles} -> ${newRoles}`);
          return {
            ...color,
            roles: newRoles
          };
        } else if (color === targetColor) {
          // Add role to target color (avoid duplicates)
          const currentRoles = color.roles || [];
          if (!currentRoles.includes(roleToUpdate)) {
            const newRoles = [...currentRoles, roleToUpdate];
            console.log(`[updateRoleAssignment] Adding role "${roleToUpdate}" to "${color.name}": ${currentRoles} -> ${newRoles}`);
            return {
              ...color,
              roles: newRoles
            };
          } else {
            console.log(`[updateRoleAssignment] Role "${roleToUpdate}" already exists on "${color.name}", skipping`);
          }
          return color;
        }
        return color;
      });

      // Create new brand state with updated role assignments
      const newBrandState = {
        ...brandToUpdate,
        colors: updatedColors
      };

      // Debug: Log chart role assignments after role reassignment but before CSS regeneration
      const chartRolesAfter = newBrandState.colors.filter(color =>
        color.roles?.some(role => role.startsWith('chart-'))
      ).map(color => ({
        color: color.name,
        variableName: color.variableName,
        chartRoles: color.roles?.filter(role => role.startsWith('chart-')),
        allRoles: color.roles
      }));

      if (chartRolesAfter.length > 0) {
        console.log(`[updateRoleAssignment] Chart colors AFTER updating "${roleToUpdate}":`, chartRolesAfter);

        // Check if any ACTUAL chart roles changed (only compare chart-specific roles, not all roles)
        const chartRolesActuallyChanged = (() => {
          // Create simplified comparison objects with only chart roles
          const beforeComparison = chartRolesBefore.map(c => ({
            variableName: c.variableName,
            chartRoles: c.chartRoles
          }));
          const afterComparison = chartRolesAfter.map(c => ({
            variableName: c.variableName,
            chartRoles: c.chartRoles
          }));

          return JSON.stringify(beforeComparison) !== JSON.stringify(afterComparison);
        })();

        if (chartRolesActuallyChanged) {
          console.error(`[updateRoleAssignment] ❌ CHART ROLES UNEXPECTEDLY CHANGED when updating "${roleToUpdate}"!`);
          console.error(`[updateRoleAssignment] BEFORE:`, chartRolesBefore);
          console.error(`[updateRoleAssignment] AFTER:`, chartRolesAfter);

          // Find specific chart role changes (only report actual chart role changes)
          chartRolesAfter.forEach(afterColor => {
            const beforeColor = chartRolesBefore.find(bc => bc.variableName === afterColor.variableName);
            if (beforeColor) {
              const beforeChartRoles = beforeColor.chartRoles || [];
              const afterChartRoles = afterColor.chartRoles || [];
              if (JSON.stringify(beforeChartRoles) !== JSON.stringify(afterChartRoles)) {
                console.error(`[updateRoleAssignment] CHART ROLE CHANGED: "${afterColor.color}" chart roles: ${beforeChartRoles} -> ${afterChartRoles}`);
              } else {
                // Non-chart roles changed, which is expected for multi-purpose colors
                const beforeAllRoles = beforeColor.allRoles || [];
                const afterAllRoles = afterColor.allRoles || [];
                if (JSON.stringify(beforeAllRoles) !== JSON.stringify(afterAllRoles)) {
                  console.log(`[updateRoleAssignment] CHANGED: "${afterColor.color}" roles: ${beforeAllRoles} -> ${afterAllRoles} (chart roles unchanged: ${afterChartRoles})`);
                }
              }
            }
          });
        } else {
          console.log(`[updateRoleAssignment] ✅ Chart roles remained unchanged when updating "${roleToUpdate}"`);
        }
      }

      // Regenerate theme CSS variables and apply both updates atomically
      const brandWithUpdatedThemeCss = regenerateThemeCssVariables(newBrandState);

      // Single state update with both role assignment and CSS regeneration
      setLiveBrand(brandWithUpdatedThemeCss);

      // Generate and apply complete CSS with atomic update to prevent flickering
      if (typeof window !== "undefined") {
        // Set the flag to prevent main useEffect from interfering
        isUpdatingCssRef.current = true;

        requestAnimationFrame(() => {
          const globalCss = generateGlobalCss(brandWithUpdatedThemeCss);
          const existingStyleElement = document.querySelector('style[data-brand-theme="true"]');

          if (existingStyleElement) {
            // Use atomic update to prevent flickering
            const tempStyleElement = document.createElement('style');
            tempStyleElement.setAttribute('data-brand-theme-temp', 'true');
            tempStyleElement.setAttribute('type', 'text/css');
            tempStyleElement.textContent = globalCss;

            // Insert temporary element and swap atomically
            existingStyleElement.parentNode?.insertBefore(tempStyleElement, existingStyleElement.nextSibling);

            Promise.resolve().then(() => {
              existingStyleElement.remove();
              tempStyleElement.removeAttribute('data-brand-theme-temp');
              tempStyleElement.setAttribute('data-brand-theme', 'true');

              // Clear the flag after update is complete
              setTimeout(() => {
                isUpdatingCssRef.current = false;
              }, 50);
            });
          } else {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-brand-theme', 'true');
            styleElement.textContent = globalCss;
            document.head.appendChild(styleElement);

            // Clear the flag after update is complete
            setTimeout(() => {
              isUpdatingCssRef.current = false;
            }, 50);
          }
        });
      }

      console.log(`[updateRoleAssignment] ==== ROLE ASSIGNMENT COMPLETE ====`);
    } else if (!targetColor) {
      // Role unassignment: remove from current owner
      if (currentRoleOwner) {
        console.log(`[updateRoleAssignment] Proceeding with role unassignment...`);

        const updatedColors = brandToUpdate.colors.map(color => {
          if (color === currentRoleOwner) {
            const newRoles = color.roles?.filter(role => role !== roleToUpdate) || [];
            console.log(`[updateRoleAssignment] Unassigning role "${roleToUpdate}" from "${color.name}": ${color.roles} -> ${newRoles}`);
            return {
              ...color,
              roles: newRoles
            };
          }
          return color;
        });

        const newBrandState = {
          ...brandToUpdate,
          colors: updatedColors
        };

        // Debug: Log chart role assignments after unassignment
        const chartRolesAfter = newBrandState.colors.filter(color =>
          color.roles?.some(role => role.startsWith('chart-'))
        ).map(color => ({
          color: color.name,
          variableName: color.variableName,
          chartRoles: color.roles?.filter(role => role.startsWith('chart-')),
          allRoles: color.roles
        }));

        if (chartRolesAfter.length > 0) {
          console.log(`[updateRoleAssignment] Chart colors after UNASSIGNING "${roleToUpdate}":`, chartRolesAfter);
        }

        const brandWithUpdatedThemeCss = regenerateThemeCssVariables(newBrandState);
        setLiveBrand(brandWithUpdatedThemeCss);

        // Generate and apply complete CSS with atomic update to prevent flickering
        if (typeof window !== "undefined") {
          // Set the flag to prevent main useEffect from interfering
          isUpdatingCssRef.current = true;

          requestAnimationFrame(() => {
            const globalCss = generateGlobalCss(brandWithUpdatedThemeCss);
            const existingStyleElement = document.querySelector('style[data-brand-theme="true"]');

            if (existingStyleElement) {
              // Use atomic update to prevent flickering
              const tempStyleElement = document.createElement('style');
              tempStyleElement.setAttribute('data-brand-theme-temp', 'true');
              tempStyleElement.setAttribute('type', 'text/css');
              tempStyleElement.textContent = globalCss;

              // Insert temporary element and swap atomically
              existingStyleElement.parentNode?.insertBefore(tempStyleElement, existingStyleElement.nextSibling);

              Promise.resolve().then(() => {
                existingStyleElement.remove();
                tempStyleElement.removeAttribute('data-brand-theme-temp');
                tempStyleElement.setAttribute('data-brand-theme', 'true');

                // Clear the flag after update is complete
                setTimeout(() => {
                  isUpdatingCssRef.current = false;
                }, 50);
              });
            } else {
              const styleElement = document.createElement('style');
              styleElement.setAttribute('data-brand-theme', 'true');
              styleElement.textContent = globalCss;
              document.head.appendChild(styleElement);

              // Clear the flag after update is complete
              setTimeout(() => {
                isUpdatingCssRef.current = false;
              }, 50);
            }
          });
        }

        console.log(`[updateRoleAssignment] ==== ROLE UNASSIGNMENT COMPLETE ====`);
      }
    } else {
      console.log(`[updateRoleAssignment] No action needed - target color is already the current owner`);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, regenerateThemeCssVariables]);

  // Font role assignment functions
  const updateFontRoleAssignment = useCallback((roleToUpdate: string, targetFontName: string | null) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[updateFontRoleAssignment] Role to update: "${roleToUpdate}", Target font: "${targetFontName}"`);

    // Find current font owner of this role
    const currentRoleOwner = brandToUpdate.fonts.find(font => font.roles?.includes(roleToUpdate));
    const targetFont = targetFontName ? brandToUpdate.fonts.find(font => font.name === targetFontName) : null;

    if (targetFont && currentRoleOwner !== targetFont) {
      console.log(`[updateFontRoleAssignment] Proceeding with font role reassignment...`);

      const updatedFonts = brandToUpdate.fonts.map(font => {
        if (font === currentRoleOwner) {
          // Remove role from current owner
          const newRoles = font.roles?.filter(role => role !== roleToUpdate) || [];
          console.log(`[updateFontRoleAssignment] Removing role "${roleToUpdate}" from "${font.name}"`);
          return { ...font, roles: newRoles };
        } else if (font === targetFont) {
          // Add role to target font (avoid duplicates)
          const currentRoles = font.roles || [];
          if (!currentRoles.includes(roleToUpdate)) {
            const newRoles = [...currentRoles, roleToUpdate];
            console.log(`[updateFontRoleAssignment] Adding role "${roleToUpdate}" to "${font.name}"`);
            return { ...font, roles: newRoles };
          }
          return font;
        }
        return font;
      });

      const newBrandState = { ...brandToUpdate, fonts: updatedFonts };
      setLiveBrand(newBrandState);

      console.log(`[updateFontRoleAssignment] Font role assignment complete`);
    } else if (!targetFont) {
      // Role unassignment: remove from current owner
      if (currentRoleOwner) {
        console.log(`[updateFontRoleAssignment] Proceeding with font role unassignment...`);

        const updatedFonts = brandToUpdate.fonts.map(font => {
          if (font === currentRoleOwner) {
            const newRoles = font.roles?.filter(role => role !== roleToUpdate) || [];
            console.log(`[updateFontRoleAssignment] Unassigning role "${roleToUpdate}" from "${font.name}"`);
            return { ...font, roles: newRoles };
          }
          return font;
        });

        const newBrandState = { ...brandToUpdate, fonts: updatedFonts };
        setLiveBrand(newBrandState);

        console.log(`[updateFontRoleAssignment] Font role unassignment complete`);
      }
    } else {
      console.log(`[updateFontRoleAssignment] No action needed - target font is already the current owner`);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const handleFontRoleSwatchSelection = useCallback((role: string, fontSwatchName: string) => {
    console.log(`[handleFontRoleSwatchSelection] Role: "${role}", Font swatch: "${fontSwatchName}"`);
    updateFontRoleAssignment(role, fontSwatchName);
  }, [updateFontRoleAssignment]);

  const handleFontRoleDirectChange = useCallback((role: string, fontFamily: string) => {
    console.log(`[handleFontRoleDirectChange] Role: "${role}", Font family: "${fontFamily}"`);
    // For direct font family changes, we could either:
    // 1. Find existing font with matching family
    // 2. Create a new font entry
    // For now, let's find existing font with matching family
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    const existingFont = brandToUpdate.fonts.find(font => font.family === fontFamily);
    if (existingFont) {
      updateFontRoleAssignment(role, existingFont.name);
    } else {
      console.log(`[handleFontRoleDirectChange] No existing font found with family "${fontFamily}"`);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, updateFontRoleAssignment]);

  const addNewFont = useCallback((name: string, fontFamily: string, distributor: string, roles: string[] = [], onFontAdded?: (fontName: string) => void) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[addNewFont] Adding font: "${name}" with family: "${fontFamily}"`);

    const newFont: FontToken = {
      name,
      distributor,
      description: `Custom font: ${name}`,
      family: fontFamily,
      roles,
      weights: { regular: 400, bold: 700 },
      fontWeights: {}
    };

    const newBrandState = {
      ...brandToUpdate,
      fonts: [...brandToUpdate.fonts, newFont]
    };

    setLiveBrand(newBrandState);

    if (onFontAdded) {
      onFontAdded(name);
    }

    console.log(`[addNewFont] Font "${name}" added successfully`);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  // Font weight assignment functions
  const updateFontWeightAssignment = useCallback((fontName: string, role: string, weightName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[updateFontWeightAssignment] Font: "${fontName}", Role: "${role}", Weight: "${weightName}"`);

    const updatedFonts = brandToUpdate.fonts.map(font => {
      if (font.name === fontName) {
        const newFontWeights = { ...font.fontWeights };

        // Check if the weight exists for this font
        if (font.weights && Object.keys(font.weights).includes(weightName)) {
          newFontWeights[role] = weightName;
          console.log(`[updateFontWeightAssignment] Updated weight for role "${role}" to "${weightName}" for font "${fontName}"`);
        } else {
          console.warn(`[updateFontWeightAssignment] Weight "${weightName}" not available for font "${fontName}"`);
          return font;
        }

        return { ...font, fontWeights: newFontWeights };
      }
      return font;
    });

    const newBrandState = { ...brandToUpdate, fonts: updatedFonts };

    // Update history properly like other functions do
    setHistory(prevHistory => {
      const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
      return [...newHistorySlice, newBrandState];
    });
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setLiveBrand(newBrandState);

    // Force immediate CSS variable update for the font weight
    if (typeof window !== "undefined") {
      console.log(`[updateFontWeightAssignment] 🎯 Forcing immediate CSS update for font weight...`);

      // Find the font and get the weight value
      const targetFont = newBrandState.fonts.find(f => f.name === fontName);
      if (targetFont && targetFont.weights && targetFont.weights[weightName]) {
        const weightValue = targetFont.weights[weightName];
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty(`--font-weight-${role}`, weightValue.toString());
        console.log(`[updateFontWeightAssignment] 🎯 Force updated CSS: --font-weight-${role} = ${weightValue}`);
      }

      // Also regenerate and inject complete CSS for comprehensive update
      const completeCss = generateGlobalCss(newBrandState);
      const existingBrandStyleElement = document.querySelector('style[data-brand-theme]');
      let brandStyleElement = existingBrandStyleElement as HTMLStyleElement;

      if (!brandStyleElement) {
        brandStyleElement = document.createElement('style');
        brandStyleElement.setAttribute('data-brand-theme', 'true');
        brandStyleElement.setAttribute('type', 'text/css');
        document.head.appendChild(brandStyleElement);
        console.log('[updateFontWeightAssignment] 🎨 Created new brand theme style element');
      }

      // Use atomic update to prevent flickering
      requestAnimationFrame(() => {
        // Set the flag to prevent main useEffect from interfering
        isUpdatingCssRef.current = true;

        const tempStyleElement = document.createElement('style');
        tempStyleElement.setAttribute('data-brand-theme-temp', 'true');
        tempStyleElement.setAttribute('type', 'text/css');
        tempStyleElement.textContent = completeCss;

        brandStyleElement.parentNode?.insertBefore(tempStyleElement, brandStyleElement.nextSibling);

        Promise.resolve().then(() => {
          brandStyleElement.remove();
          tempStyleElement.removeAttribute('data-brand-theme-temp');
          tempStyleElement.setAttribute('data-brand-theme', 'true');
          console.log('[updateFontWeightAssignment] 🎨 Applied complete CSS for font weight update with atomic update');

          // Clear the flag after update is complete
          setTimeout(() => {
            isUpdatingCssRef.current = false;
          }, 50);
        });
      });
    }

    console.log(`[updateFontWeightAssignment] Font weight assignment complete and added to history`);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const getFontWeightForRole = useCallback((fontName: string, role: string): string | null => {
    const brandToCheck = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToCheck) return null;

    const font = brandToCheck.fonts.find(f => f.name === fontName);
    if (!font || !font.fontWeights) return null;

    return font.fontWeights[role] || null;
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  // Font size assignment functions
  const updateFontSizeAssignment = useCallback((fontName: string, role: string, sizeValue: number) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[updateFontSizeAssignment] Font: "${fontName}", Role: "${role}", Size: "${sizeValue}"`);

    const updatedFonts = brandToUpdate.fonts.map(font => {
      if (font.name === fontName) {
        const newFontSizes = { ...font.fontSizes };

        // Always allow assignment of font sizes - no validation needed for now
        newFontSizes[role] = sizeValue;
        console.log(`[updateFontSizeAssignment] Updated size for role "${role}" to "${sizeValue}" for font "${fontName}"`);

        return { ...font, fontSizes: newFontSizes };
      }
      return font;
    });

    const newBrandState = { ...brandToUpdate, fonts: updatedFonts };

    // Update history properly like other functions do
    setHistory(prevHistory => {
      const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
      return [...newHistorySlice, newBrandState];
    });
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setLiveBrand(newBrandState);

    // Force immediate CSS variable update for the font size
    if (typeof window !== "undefined") {
      console.log(`[updateFontSizeAssignment] 🎯 Forcing immediate CSS update for font size...`);

      // Find the font and get the size value
      const targetFont = newBrandState.fonts.find(f => f.name === fontName);
      if (targetFont && targetFont.fontSizes && targetFont.fontSizes[role]) {
        const fontSizeValue = targetFont.fontSizes[role];
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty(`--font-size-${role}`, `${fontSizeValue}rem`);
        console.log(`[updateFontSizeAssignment] 🎯 Force updated CSS: --font-size-${role} = ${fontSizeValue}rem`);
      }

      // Also regenerate and inject complete CSS for comprehensive update
      const completeCss = generateGlobalCss(newBrandState);
      const existingBrandStyleElement = document.querySelector('style[data-brand-theme]');
      let brandStyleElement = existingBrandStyleElement as HTMLStyleElement;

      if (!brandStyleElement) {
        brandStyleElement = document.createElement('style');
        brandStyleElement.setAttribute('data-brand-theme', 'true');
        brandStyleElement.setAttribute('type', 'text/css');
        document.head.appendChild(brandStyleElement);
        console.log('[updateFontSizeAssignment] 🎨 Created new brand theme style element');
      }

      // Use atomic update to prevent flickering
      requestAnimationFrame(() => {
        // Set the flag to prevent main useEffect from interfering
        isUpdatingCssRef.current = true;

        const tempStyleElement = document.createElement('style');
        tempStyleElement.setAttribute('data-brand-theme-temp', 'true');
        tempStyleElement.setAttribute('type', 'text/css');
        tempStyleElement.textContent = completeCss;

        brandStyleElement.parentNode?.insertBefore(tempStyleElement, brandStyleElement.nextSibling);

        Promise.resolve().then(() => {
          brandStyleElement.remove();
          tempStyleElement.removeAttribute('data-brand-theme-temp');
          tempStyleElement.setAttribute('data-brand-theme', 'true');
          console.log('[updateFontSizeAssignment] 🎨 Applied complete CSS for font size update with atomic update');

          // Clear the flag after update is complete
          setTimeout(() => {
            isUpdatingCssRef.current = false;
          }, 50);
        });
      });
    }

    console.log(`[updateFontSizeAssignment] Font size assignment complete and added to history`);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const getFontSizeForRole = useCallback((fontName: string, role: string): number | null => {
    const brandToCheck = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToCheck) return null;

    const font = brandToCheck.fonts.find(f => f.name === fontName);
    if (!font || !font.fontSizes) return null;

    return font.fontSizes[role] || null;
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const updateAnimationConfig = useCallback(async (presetName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    try {
      // Load the animation preset
      const preset = await animationPresets[presetName as keyof typeof animationPresets]();

      // Create updated brand with new animation config
      const updatedBrand: Brand = {
        ...brandToUpdate,
        animationConfig: {
          preset,
          rootClassName: `${activeThemeKey}-${presetName}-theme`
        }
      };

      // Update history
      setHistory(prevHistory => {
        const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
        return [...newHistorySlice, updatedBrand];
      });

      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(updatedBrand);

      console.log(`Updated animation config to: ${presetName}`);
    } catch (error) {
      console.error('Failed to update animation config:', error);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, activeThemeKey]);

  const addNewColor = useCallback((name: string, hexColor: string, roles: Role[] = [], onColorAdded?: (colorName: string) => void) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    // Convert hex to OKLCH
    const oklchConverter = converter('oklch');
    const colorObj = parseHex(hexColor);

    if (!colorObj) {
      console.error('Invalid hex color provided:', hexColor);
      return;
    }

    const converted = oklchConverter(colorObj);
    if (!converted) {
      console.error('Failed to convert hex to OKLCH:', hexColor);
      return;
    }

    let { l = 0, c = 0, h = 0 } = converted;
    h = isNaN(h) ? 0 : h;

    const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;

    // Generate unique name and variable name
    let finalName = name;
    let baseVariableName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let finalVariableName = baseVariableName;

    // Check for existing names and generate unique ones if needed
    let nameCounter = 1;
    let variableCounter = 1;

    // Find unique display name
    while (brandToUpdate.colors.find(color => color.name === finalName)) {
      finalName = `${name} ${nameCounter}`;
      nameCounter++;
    }

    // Find unique variable name
    while (brandToUpdate.colors.find(color => color.variableName === finalVariableName)) {
      finalVariableName = `${baseVariableName}-${variableCounter}`;
      variableCounter++;
    }

    // Create the new color token
    const newColorToken: ColorToken = {
      name: finalName,
      variableName: finalVariableName,
      description: `Custom color: ${finalName}`,
      oklch: oklchString,
      rawTokenSpecificName: finalName,
      roles: roles,
      themeSteps: {},
      category: 'color',
    };

    // Add the new color to the brand
    const newBrandState: Brand = {
      ...brandToUpdate,
      colors: [...brandToUpdate.colors, newColorToken]
    };

    // Update history
    setHistory(prevHistory => {
      const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
      return [...newHistorySlice, newBrandState];
    });
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setLiveBrand(newBrandState);

    console.log(`Added new color: "${finalName}" with variable name: "${finalVariableName}"`);

    // Call the callback with the final color name if provided
    if (onColorAdded) {
      onColorAdded(finalName);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  // New role-based color handling functions
  const handleRoleSwatchSelection = useCallback((role: Role, swatchName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[handleRoleSwatchSelection] Role: "${role}", Swatch: "${swatchName}"`);
    console.log(`[handleRoleSwatchSelection] Available colors in brand:`, brandToUpdate.colors.map(c => ({ name: c.name, variableName: c.variableName })));

    // Find the color token by name first, then by variableName if not found
    let targetColor = brandToUpdate.colors.find(color => color.name === swatchName);
    if (!targetColor) {
      targetColor = brandToUpdate.colors.find(color => color.variableName === swatchName);
    }

    if (targetColor) {
      console.log(`[handleRoleSwatchSelection] Found target color: "${targetColor.name}" with variable: "${targetColor.variableName}"`);
      console.log(`[handleRoleSwatchSelection] Current roles for target color:`, targetColor.roles);

      // Show which color currently has this role before reassignment
      const currentlyAssignedColor = brandToUpdate.colors.find(color =>
        color.roles?.includes(role)
      );
      if (currentlyAssignedColor) {
        console.log(`[handleRoleSwatchSelection] Role "${role}" currently assigned to: "${currentlyAssignedColor.name}" (${currentlyAssignedColor.variableName})`);
      } else {
        console.log(`[handleRoleSwatchSelection] Role "${role}" is not currently assigned to any color`);
      }

      // Call the role assignment update
      console.log(`[handleRoleSwatchSelection] Calling updateRoleAssignment("${role}", "${targetColor.variableName}")`);
      updateRoleAssignment(role, targetColor.variableName);
    } else {
      console.warn(`[handleRoleSwatchSelection] Swatch "${swatchName}" not found in brand colors`);
      console.log(`[handleRoleSwatchSelection] Available color names:`, brandToUpdate.colors.map(c => c.name));
      console.log(`[handleRoleSwatchSelection] Available variable names:`, brandToUpdate.colors.map(c => c.variableName));
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, updateRoleAssignment]);

  const handleRoleDirectColorChange = useCallback((role: Role, newHex: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    console.log(`[handleRoleDirectColorChange] Role: "${role}", New Hex: "${newHex}"`);

    // Find the currently assigned color token for this role
    const currentlyAssignedColor = brandToUpdate.colors.find(color =>
      color.roles?.includes(role)
    );

    if (currentlyAssignedColor) {
      console.log(`[handleRoleDirectColorChange] Current color for role "${role}": "${currentlyAssignedColor.name}" (${currentlyAssignedColor.variableName})`);
      console.log(`[handleRoleDirectColorChange] Current color roles:`, currentlyAssignedColor.roles);

      // Check if this color is assigned to multiple roles
      const hasMultipleRoles = currentlyAssignedColor.roles && currentlyAssignedColor.roles.length > 1;

      if (hasMultipleRoles) {
        console.log(`[handleRoleDirectColorChange] 🔄 Color "${currentlyAssignedColor.name}" is assigned to multiple roles: [${currentlyAssignedColor.roles.join(', ')}]`);
        console.log(`[handleRoleDirectColorChange] 🔄 Creating new color token to avoid affecting other roles`);

        // Create a new color token for this role
        const oklchConverter = converter('oklch');
        const colorObj = parseHex(newHex);

        if (colorObj) {
          const converted = oklchConverter(colorObj);
          if (converted) {
            let { l = 0, c = 0, h = 0 } = converted;
            h = isNaN(h) ? 0 : h;

            const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;

            // Generate a unique name for the new color
            const baseName = `${role.charAt(0).toUpperCase() + role.slice(1)} Custom`;
            let finalName = baseName;
            let nameCounter = 1;

            while (brandToUpdate.colors.find(color => color.name === finalName)) {
              finalName = `${baseName} ${nameCounter}`;
              nameCounter++;
            }

            // Generate a unique variable name
            const baseVariableName = `${role}-custom`;
            let finalVariableName = baseVariableName;
            let variableCounter = 1;

            while (brandToUpdate.colors.find(color => color.variableName === finalVariableName)) {
              finalVariableName = `${baseVariableName}-${variableCounter}`;
              variableCounter++;
            }

            // Create the new color token
            const newColorToken: ColorToken = {
              name: finalName,
              variableName: finalVariableName,
              description: `Custom color for ${role} role`,
              oklch: oklchString,
              rawTokenSpecificName: finalName,
              roles: [role], // Only assign to this role
              themeSteps: {},
              category: 'color',
            };

            console.log(`[handleRoleDirectColorChange] 🎨 Creating new color token: "${finalName}" (${finalVariableName}) for role "${role}"`);

            // Update the brand state: remove role from current color and add new color
            const updatedColors = brandToUpdate.colors.map(color => {
              if (color === currentlyAssignedColor) {
                const newRoles = color.roles.filter(r => r !== role);
                return newRoles.length === color.roles.length ? color : { ...color, roles: newRoles };
              }
              return color;
            });

            // Add the new color token
            updatedColors.push(newColorToken);

            const newBrandState: Brand = { ...brandToUpdate, colors: updatedColors };

            // Update history
            setHistory(prevHistory => {
              const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
              return [...newHistorySlice, newBrandState];
            });
            const newIndex = currentHistoryIndex + 1;
            setCurrentHistoryIndex(newIndex);
            setLiveBrand(newBrandState);

            console.log(`[handleRoleDirectColorChange] ✅ Created new color token and updated brand state`);

            // Force immediate CSS variable update for the role
            if (typeof window !== "undefined") {
              console.log(`[handleRoleDirectColorChange] 🎯 Generating complete CSS for color modification...`);

              // Set the flag to prevent main useEffect from interfering
              isUpdatingCssRef.current = true;

              // Generate and inject the complete CSS from brand-utils.ts immediately with atomic update
              requestAnimationFrame(() => {
                const completeCss = generateGlobalCss(newBrandState);

                // Find existing brand theme style element or create new one
                const existingBrandStyleElement = document.querySelector('style[data-brand-theme]');
                let brandStyleElement = existingBrandStyleElement as HTMLStyleElement;

                if (!brandStyleElement) {
                  brandStyleElement = document.createElement('style');
                  brandStyleElement.setAttribute('data-brand-theme', 'true');
                  brandStyleElement.setAttribute('type', 'text/css');
                  document.head.appendChild(brandStyleElement);
                  console.log('[handleRoleDirectColorChange] 🎨 Created new brand theme style element');
                }

                // Use atomic update to prevent flickering
                const tempStyleElement = document.createElement('style');
                tempStyleElement.setAttribute('data-brand-theme-temp', 'true');
                tempStyleElement.setAttribute('type', 'text/css');
                tempStyleElement.textContent = completeCss;

                // Insert temporary element and swap atomically
                brandStyleElement.parentNode?.insertBefore(tempStyleElement, brandStyleElement.nextSibling);

                Promise.resolve().then(() => {
                  brandStyleElement.remove();
                  tempStyleElement.removeAttribute('data-brand-theme-temp');
                  tempStyleElement.setAttribute('data-brand-theme', 'true');

                  console.log('[handleRoleDirectColorChange] 🎨 Applied complete CSS for color modification with atomic update');

                  // Also set individual CSS variables for immediate feedback (after atomic update)
                  const rootStyle = document.documentElement.style;
                  // Set the NEW color token's variable (not the old one!)
                  rootStyle.setProperty(`--${finalVariableName}`, oklchString);
                  rootStyle.setProperty(`--${role}`, `var(--${finalVariableName})`);
                  console.log(`[handleRoleDirectColorChange] 🎯 Force updated CSS: --${finalVariableName} = ${oklchString}, --${role} = var(--${finalVariableName})`);

                  // Force a style recalculation
                  document.documentElement.offsetHeight;
                  console.log(`[handleRoleDirectColorChange] 🔄 Forced style recalculation`);

                  // Clear the flag after update is complete
                  setTimeout(() => {
                    isUpdatingCssRef.current = false;
                  }, 50);
                });
              });
            }
          }
        }
      } else {
        console.log(`[handleRoleDirectColorChange] 🔄 Color "${currentlyAssignedColor.name}" is only assigned to role "${role}", safe to modify directly`);

        // Convert hex to OKLCH and commit the change to the existing color
        const oklchConverter = converter('oklch');
        const colorObj = parseHex(newHex);

        if (colorObj) {
          const converted = oklchConverter(colorObj);
          if (converted) {
            let { l = 0, c = 0, h = 0 } = converted;
            h = isNaN(h) ? 0 : h;

            const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;
            commitColorUpdate(currentlyAssignedColor.name, oklchString);

            // Force immediate CSS variable update for the role
            if (typeof window !== "undefined") {
              const rootStyle = document.documentElement.style;
              rootStyle.setProperty(`--${currentlyAssignedColor.variableName}`, oklchString);
              rootStyle.setProperty(`--${role}`, `var(--${currentlyAssignedColor.variableName})`);
              console.log(`[handleRoleDirectColorChange] 🎯 Force updated CSS: --${currentlyAssignedColor.variableName} = ${oklchString}, --${role} = var(--${currentlyAssignedColor.variableName})`);
            }
          }
        }
      }
    } else {
      console.warn(`[handleRoleDirectColorChange] No color currently assigned to role "${role}"`);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, commitColorUpdate, setHistory, setCurrentHistoryIndex, setLiveBrand]);

  const previewRoleDirectColorChange = useCallback((role: Role, newHex: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    // Find the currently assigned color token for this role
    const currentlyAssignedColor = brandToUpdate.colors.find(color =>
      color.roles?.includes(role)
    );

    if (currentlyAssignedColor) {
      // For preview, we can always modify the existing color temporarily
      // since this is just a live preview and won't be committed
      const oklchConverter = converter('oklch');
      const colorObj = parseHex(newHex);

      if (colorObj) {
        const converted = oklchConverter(colorObj);
        if (converted) {
          let { l = 0, c = 0, h = 0 } = converted;
          h = isNaN(h) ? 0 : h;

          const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;
          previewColorUpdate(currentlyAssignedColor.name, oklchString);

          // Force immediate CSS variable update for instant preview
          if (typeof window !== "undefined") {
            const rootStyle = document.documentElement.style;
            rootStyle.setProperty(`--${currentlyAssignedColor.variableName}`, oklchString);
            rootStyle.setProperty(`--${role}`, `var(--${currentlyAssignedColor.variableName})`);
            console.log(`[previewRoleDirectColorChange] 🎯 Force updated CSS: --${currentlyAssignedColor.variableName} = ${oklchString}, --${role} = var(--${currentlyAssignedColor.variableName})`);
          }
        }
      }
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, previewColorUpdate]);

  useEffect(() => {
    console.log(`[BrandContext useEffect] 🚀 useEffect triggered`);
    console.log(`[BrandContext useEffect] brandToDisplay reference:`, brandToDisplay);
    console.log(`[BrandContext useEffect] brandToDisplay.colors length:`, brandToDisplay?.colors?.length);
    console.log(`[BrandContext useEffect] liveBrand reference:`, liveBrand);
    console.log(`[BrandContext useEffect] Primary role assignments in brandToDisplay:`,
      brandToDisplay?.colors?.filter(c => c.roles?.includes('primary')).map(c => ({ name: c.name, variableName: c.variableName })));

    // CRITICAL FIX: Check if we're in the middle of a specific CSS update to prevent conflicts
    if (isUpdatingCssRef.current) {
      console.log('[BrandContext useEffect] ⏸️ Deferring main CSS update - specific function is updating CSS');

      // Clear any existing timeout
      if (cssUpdateTimeoutRef.current) {
        clearTimeout(cssUpdateTimeoutRef.current);
      }

      // Schedule the main CSS update for after the specific update is complete
      cssUpdateTimeoutRef.current = setTimeout(() => {
        console.log('[BrandContext useEffect] 🔄 Retrying deferred main CSS update');
        // Only proceed if we're no longer updating
        if (!isUpdatingCssRef.current) {
          // Trigger the useEffect again by updating a dummy state or by calling the logic directly
          // Since we can't directly re-trigger this useEffect, we'll call the CSS update logic directly
          performMainCssUpdate();
        }
      }, 100); // Short delay to ensure specific update completes

      return;
    }

    // Helper function to perform the main CSS update
    const performMainCssUpdate = () => {
      const brandForCSS = brandToDisplay;
      if (typeof window !== "undefined" && brandForCSS && brandForCSS.colors) {
        // CRITICAL FIX: Use requestAnimationFrame to ensure atomic CSS updates and prevent flickering
        requestAnimationFrame(() => {
          // Generate and inject the complete CSS from brand-utils.ts
          console.log('[BrandContext] 🎨 Generating complete CSS from brand-utils...');
          const completeCss = generateGlobalCss(brandForCSS);

          // Find existing brand theme style element or create new one
          const existingBrandStyleElement = document.querySelector('style[data-brand-theme]');
          let brandStyleElement = existingBrandStyleElement as HTMLStyleElement;

          if (!brandStyleElement) {
            brandStyleElement = document.createElement('style');
            brandStyleElement.setAttribute('data-brand-theme', 'true');
            brandStyleElement.setAttribute('type', 'text/css');
            document.head.appendChild(brandStyleElement);
            console.log('[BrandContext] 🎨 Created new brand theme style element');
          }

          // CRITICAL FIX: Use atomic CSS update to prevent flickering
          // Instead of directly setting textContent, we'll create a temporary style element
          // and swap them atomically to prevent any moment where styles are incomplete
          const tempStyleElement = document.createElement('style');
          tempStyleElement.setAttribute('data-brand-theme-temp', 'true');
          tempStyleElement.setAttribute('type', 'text/css');
          tempStyleElement.textContent = completeCss;

          // Insert the temporary element right after the existing one
          brandStyleElement.parentNode?.insertBefore(tempStyleElement, brandStyleElement.nextSibling);

          // Use a micro-task to ensure the temporary styles are processed before removal
          Promise.resolve().then(() => {
            // Remove the old style element
            brandStyleElement.remove();
            // Rename the temporary element to be the new permanent one
            tempStyleElement.removeAttribute('data-brand-theme-temp');
            tempStyleElement.setAttribute('data-brand-theme', 'true');

            console.log('[BrandContext] 🎨 Applied complete CSS with atomic update to prevent flickering');
          });
        });

        // Also apply individual CSS variables for immediate updates (keeps existing functionality)
        const rootElement = document.documentElement;
        const rootStyle = document.documentElement.style;
        const hslConverter = converter('hsl'); // Expects hex, rgb etc.
        const oklchConverter = converter('oklch');
        const expectedCssVariables = new Set<string>();

        // More selective CSS variable management - don't clear everything
        // Instead, we'll track what variables we expect and update only those that changed
        const variablesToSet = new Map<string, string>();

        const setAndTrackProperty = (varName: string, value: string) => {
          variablesToSet.set(varName, value);
          expectedCssVariables.add(varName);
          // Debug critical role variables
          if (['--primary', '--secondary', '--accent', '--destructive', '--background', '--foreground'].includes(varName)) {
            console.log(`[BrandContext Debug] Tracking property ${varName}: "${value}"`);
          }
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
            // Check against onColor variable names if they are structured (e.g. --token-on)
            // This part is TBD as onColor are direct OklchStrings now.
          }
          return {};
        };

        const newEnrichedColors: EnrichedColorToken[] = JSON.parse(JSON.stringify(brandForCSS.colors));
        newEnrichedColors.forEach((tokenBeingProcessed: EnrichedColorToken) => {
          tokenBeingProcessed.shades = tokenBeingProcessed.shades || {};
          tokenBeingProcessed.tokenLevelMappedThemeVars = tokenBeingProcessed.tokenLevelMappedThemeVars || [];
          tokenBeingProcessed.referrers = tokenBeingProcessed.referrers || [];

          if (!tokenBeingProcessed.oklch || !tokenBeingProcessed.category) {
            console.warn("Skipping enrichment for token due to missing oklch or category:", tokenBeingProcessed.name);
            return;
          }

          const baseOklch = tokenBeingProcessed.oklch;
          const baseOklchParts = oklchConverter(baseOklch);
          const baseL = baseOklchParts?.l || 0;

          // Populate .shades for EnrichedColorToken based on new structure
          const processedShades: Partial<Record<string, EnrichedShade>> = {};

          // Base shade (light theme)
          processedShades['base'] = {
            variableName: tokenBeingProcessed.variableName,
            value: baseOklch,
            resolvedValue: baseOklch,
            isAlias: false,
            calculatedLightness: baseL,
            mappedThemeVars: []
          };

          // 'on' color shade
          if (tokenBeingProcessed.onColor) {
            const onL = oklchConverter(tokenBeingProcessed.onColor)?.l || (baseL < 0.55 ? 0.97 : 0.05);
            processedShades['on'] = {
              variableName: `${tokenBeingProcessed.variableName}-on`, // Convention
              value: tokenBeingProcessed.onColor,
              resolvedValue: tokenBeingProcessed.onColor,
              isAlias: false, // Or true if it aliases another token's onColor
              calculatedLightness: onL,
              mappedThemeVars: []
            };
          }

          // Light theme steps
          (Object.keys(tokenBeingProcessed.themeSteps) as LightnessStepKey[]).forEach(stepKey => {
            const stepValue = tokenBeingProcessed.themeSteps[stepKey];
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
            Object.entries(potentialReferrer.themeSteps).forEach(([stepKey, stepValue]) => {
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
                  token.shades['base'] = token.shades['base'] || { variableName: token.variableName, value: token.oklch, resolvedValue: token.oklch, isAlias: false, calculatedLightness: 0, mappedThemeVars: [] }; // Minimal fallback for base
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

        // CSS variable setting logic (now redundant with generateGlobalCss injection but kept for immediate updates)
        newEnrichedColors.forEach(token => {
          if (token.oklch) {
            setAndTrackProperty(`--${token.variableName}`, token.oklch);
            if (token.onColor) {
              setAndTrackProperty(`--${token.variableName}-on`, token.onColor);
            }
            Object.entries(token.themeSteps).forEach(([stepKey, stepValue]) => {
              if (stepValue) setAndTrackProperty(`--${token.variableName}-${stepKey}`, stepValue);
            });
          }
        });

        // Apply semantic aliases from themeCssVariables, making them dynamic for color roles
        console.log("[BrandContext] 🔍 Checking themeCssVariables:", {
          exists: !!brandForCSS.themeCssVariables,
          type: typeof brandForCSS.themeCssVariables,
          keys: brandForCSS.themeCssVariables ? Object.keys(brandForCSS.themeCssVariables) : 'N/A'
        });

        if (brandForCSS.themeCssVariables) {
          console.log("[BrandContext] 🎯 ENTERING themeCssVariables processing");
          console.log("[BrandContext] themeCssVariables available:", Object.keys(brandForCSS.themeCssVariables));

          const themeRoleKeys = Object.keys(brandForCSS.themeCssVariables) as Array<keyof ThemeCssVars>;

          console.log("[BrandContext] Processing theme CSS variables for role assignments:");
          console.log("[BrandContext] Available roles in colors:");
          newEnrichedColors.forEach(color => {
            if (color.roles && color.roles.length > 0) {
              console.log(`  "${color.name}" (${color.variableName}): [${color.roles.join(', ')}]`);
            }
          });

          themeRoleKeys.forEach(roleKey => {
            try {
              console.log(`[BrandContext] 🔄 Processing role "${roleKey}"...`);

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

              console.log(`[BrandContext] Role "${roleKey}" isDynamicColorRole: ${isDynamicColorRole}`);

              if (isDynamicColorRole) {
                // Enhanced debugging for primary role specifically
                if (roleKey === 'primary') {
                  console.log(`[BrandContext] ⚡ ENHANCED PRIMARY DEBUGGING ⚡`);
                  console.log(`[BrandContext] Looking for role "primary" in colors:`, newEnrichedColors.map(c => ({
                    name: c.name,
                    variableName: c.variableName,
                    roles: c.roles
                  })));
                }

                // Check for direct assignment to this roleKey first (for any role, including foregrounds)
                const directlyAssignedToken = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes(roleKey as Role));

                console.log(`[BrandContext] Processing role "${roleKey}":`, {
                  isDynamicColorRole,
                  directlyAssignedToken: directlyAssignedToken ? {
                    name: directlyAssignedToken.name,
                    variableName: directlyAssignedToken.variableName,
                    roles: directlyAssignedToken.roles,
                    oklch: directlyAssignedToken.oklch
                  } : null
                });

                if (directlyAssignedToken) {
                  cssValueToSet = `var(--${directlyAssignedToken.variableName})`;
                  console.log(`[BrandContext] Role "${roleKey}" directly assigned to token "${directlyAssignedToken.name}" -> CSS value: ${cssValueToSet}`);
                } else if (roleKey.endsWith('-foreground')) {
                  const surfaceRoleKey = roleKey.replace('-foreground', '') as Role;
                  const surfaceToken = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes(surfaceRoleKey));
                  console.log(`[BrandContext] Foreground role "${roleKey}" not directly assigned, looking for surface role "${surfaceRoleKey}":`, {
                    surfaceToken: surfaceToken ? { name: surfaceToken.name, variableName: surfaceToken.variableName } : null
                  });

                  if (surfaceToken) {
                    if (surfaceToken.onColor) {
                      cssValueToSet = surfaceToken.onColor;
                    } else {
                      // Fallback for foreground if surface token has no onColor
                      const genericFgToken = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes('foreground'));
                      if (genericFgToken) {
                        cssValueToSet = `var(--${genericFgToken.variableName})`;
                      } else {
                        // Absolute fallback for foreground
                        const bgTokenForFgFallback = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes('background'));
                        const bgL = bgTokenForFgFallback ? (oklchConverter(bgTokenForFgFallback.oklch)?.l ?? 0.95) : 0.95;
                        cssValueToSet = bgL >= 0.5 ? "oklch(0.1 0 0)" : "oklch(0.95 0 0)";
                      }
                    }
                  } else {
                    // Fallback if the surface role itself is unassigned, try original theme var or absolute fallback
                    if (originalThemeVarValue) cssValueToSet = String(originalThemeVarValue);
                    else {
                      const bgTokenForFgFallback = newEnrichedColors.find(c => Array.isArray(c.roles) && c.roles.includes('background'));
                      const bgL = bgTokenForFgFallback ? (oklchConverter(bgTokenForFgFallback.oklch)?.l ?? 0.95) : 0.95;
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
                if (isDynamicColorRole) {
                  console.log(`[BrandContext] Set CSS variable --${roleKey}: ${cssValueToSet}`);
                }
              } else {
                // If a variable is optional in ThemeCssVars and not resolved, it's okay to not set it.
                if (isDynamicColorRole) {
                  console.warn(`[BrandContext] CSS Variable --${roleKey} could not be resolved and has no default value.`);
                }
              }

              console.log(`[BrandContext] ✅ Completed processing role "${roleKey}"`);
            } catch (error) {
              console.error(`[BrandContext] ❌ Error processing role "${roleKey}":`, error);
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

          // Also set the font on the html root
          rootStyle.setProperty('font-family', fontBody);
        }

        // Handle animation CSS injection and root class application
        if (brandForCSS.animationConfig) {
          console.log('Applying animation configuration:', brandForCSS.animationConfig);

          // Generate the animation CSS
          const animationCss = generateAnimationCss(brandForCSS.animationConfig);

          // Find existing animation style element or create new one
          const existingStyleElement = document.querySelector('style[data-theme-animations]');
          let styleElement = existingStyleElement as HTMLStyleElement;

          if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.setAttribute('data-theme-animations', 'true');
            document.head.appendChild(styleElement);
          }

          // Update the style element with new animation CSS
          styleElement.textContent = animationCss;

          // Apply the root class name to the document element
          const rootClassName = brandForCSS.animationConfig.rootClassName;

          // Remove any existing animation root classes
          const existingAnimationClasses = Array.from(rootElement.classList).filter(cls =>
            cls.endsWith('-theme') || cls.includes('animation') || cls.includes('brutal') || cls.includes('modern')
          );
          existingAnimationClasses.forEach(cls => rootElement.classList.remove(cls));

          // Add the new root class
          if (rootClassName) {
            rootElement.classList.add(rootClassName);
            console.log(`Applied animation root class: ${rootClassName}`);
          }
        } else {
          // If no animation config, remove any existing animation styles and classes
          const existingStyleElement = document.querySelector('style[data-theme-animations]');
          if (existingStyleElement) {
            existingStyleElement.remove();
          }

          // Remove any existing animation root classes
          const existingAnimationClasses = Array.from(rootElement.classList).filter(cls =>
            cls.endsWith('-theme') || cls.includes('animation') || cls.includes('brutal') || cls.includes('modern')
          );
          existingAnimationClasses.forEach(cls => rootElement.classList.remove(cls));

          console.log('No animation configuration found, removed existing animation styles');
        }

        // Apply brand theme class for typography
        const brandClassName = brandForCSS.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const themeClassName = `theme-${brandClassName}`;

        // Remove any existing theme classes
        const existingThemeClasses = Array.from(rootElement.classList).filter(cls =>
          cls.startsWith('theme-')
        );
        existingThemeClasses.forEach(cls => rootElement.classList.remove(cls));

        // Add the new theme class
        rootElement.classList.add(themeClassName);
        console.log(`Applied brand theme class: ${themeClassName}`);

        const finalProcessedBrand: EnrichedBrand = {
          ...brandForCSS,
          colors: newEnrichedColors
        };
        setProcessedBrand(finalProcessedBrand);

        // Apply all variables efficiently - only update those that have changed
        // Note: This is now redundant with the generateGlobalCss injection but kept for immediate updates
        variablesToSet.forEach((value, varName) => {
          const currentValue = rootStyle.getPropertyValue(varName);
          if (currentValue !== value) {
            rootStyle.setProperty(varName, value);
            // Debug critical role variables
            if (['--primary', '--secondary', '--accent', '--destructive', '--background', '--foreground'].includes(varName)) {
              console.log(`[BrandContext Debug] Setting CSS variable ${varName}: "${currentValue}" -> "${value}"`);
            }
          }
        });

        // Force a style recalculation to ensure changes are applied
        if (typeof window !== "undefined") {
          // Trigger a reflow to ensure CSS changes are applied
          window.getComputedStyle(rootElement).getPropertyValue('--primary');

          // Force a repaint by temporarily changing and restoring a non-visible property
          const originalVisibility = rootElement.style.visibility;
          rootElement.style.visibility = 'visible';
          rootElement.offsetHeight; // Force reflow
          if (originalVisibility) {
            rootElement.style.visibility = originalVisibility;
          }

          console.log('[BrandContext] 🎨 Forced style recalculation and repaint');
        }

        console.log("--- CSS Variables Applied (Full Check via BrandContext) ---");
        expectedCssVariables.forEach(varName => {
          const value = rootStyle.getPropertyValue(varName).trim();
          if (!value) console.warn(`CSS Variable '${varName}' expected but is EMPTY/NULL.`);
        });
        console.log("--- End CSS Variable Check (BrandContext) ---");
      }
    };

    // Call the main CSS update function
    performMainCssUpdate();
  }, [brandToDisplay, currentThemeData, activeThemeKey]);

  // Cleanup effect to clear CSS update timeout on unmount
  useEffect(() => {
    return () => {
      if (cssUpdateTimeoutRef.current) {
        clearTimeout(cssUpdateTimeoutRef.current);
        cssUpdateTimeoutRef.current = null;
      }
      // Reset the flag on unmount
      isUpdatingCssRef.current = false;
    };
  }, []);

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
      updateColorName,
      addNewColor,
      undo,
      redo,
      canUndo,
      canRedo,
      undoStepsAvailable,
      redoStepsAvailable,
      updateRoleAssignment,
      // New role-based color handling functions
      handleRoleSwatchSelection,
      handleRoleDirectColorChange,
      previewRoleDirectColorChange,
      // Font role assignment functions
      updateFontRoleAssignment,
      handleFontRoleSwatchSelection,
      handleFontRoleDirectChange,
      addNewFont,
      // Font weight assignment functions
      updateFontWeightAssignment,
      getFontWeightForRole,
      // Font size assignment functions
      updateFontSizeAssignment,
      getFontSizeForRole,
      // Animation config functions
      updateAnimationConfig
    }}>
      {children}
    </BrandContext.Provider>
  );
};

/**
 * Hook to get the current theme's animation configuration
 */
export const useThemeAnimations = (): ThemeAnimationConfig | null => {
  const { brand } = useBrand();
  return brand?.animationConfig || null;
};

/**
 * Hook to get the animation CSS for the current theme
 */
export const useAnimationCss = (): string => {
  const animationConfig = useThemeAnimations();
  if (!animationConfig) return '';
  return generateAnimationCss(animationConfig);
};

/**
 * Hook to get the root class name for animations
 */
export const useAnimationRootClassName = (): string => {
  const animationConfig = useThemeAnimations();
  return animationConfig?.rootClassName || '';
};

// UI Context for managing active tab and typography role selection
interface UIContextType {
  activeTab: string;
  selectedTypographyRole: string | null;
  selectedColorRole: string | null;
  setActiveTab: (tab: string) => void;
  setSelectedTypographyRole: (role: string) => void;
  setSelectedColorRole: (role: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};

interface UIProviderProps {
  children: ReactNode;
  initialTab?: string;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children, initialTab = 'colors' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedTypographyRole, setSelectedTypographyRole] = useState<string | null>(null);
  const [selectedColorRole, setSelectedColorRole] = useState<string | null>(null);

  const value = useMemo(() => ({
    activeTab,
    selectedTypographyRole,
    selectedColorRole,
    setActiveTab,
    setSelectedTypographyRole,
    setSelectedColorRole,
  }), [activeTab, selectedTypographyRole, selectedColorRole]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};