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
  generateGlobalCss,
  type ThemeAnimationConfig,
  generateAnimationCss
} from "./brand-utils";
import { converter, formatHex, parseHex } from 'culori'; // Import from culori

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
  addNewColor: (name: string, hexColor: string, roles?: Role[]) => void;
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

    console.log(`[updateRoleAssignment] Updating role: "${roleToUpdate}" to target variable: "${targetColorVariableName}"`);
    
    // Log current state before update
    console.log(`[updateRoleAssignment] BEFORE - Current role assignments:`);
    brandToUpdate.colors.forEach(color => {
      if (color.roles && color.roles.length > 0) {
        console.log(`  "${color.name}" (${color.variableName}): [${color.roles.join(', ')}] - Color: ${color.oklchLight}`);
      }
    });

    // Find the target color (where we want to assign the role)
    const targetColor = targetColorVariableName ? brandToUpdate.colors.find(color => color.variableName === targetColorVariableName) : null;
    
    // Find the current owner of the role
    const currentRoleOwner = brandToUpdate.colors.find(color => color.roles?.includes(roleToUpdate));
    
    console.log(`[updateRoleAssignment] Role "${roleToUpdate}" currently owned by: "${currentRoleOwner?.name || 'none'}" (${currentRoleOwner?.variableName || 'none'})`);
    console.log(`[updateRoleAssignment] Target color: "${targetColor?.name || 'none'}" (${targetColor?.variableName || 'none'})`);

    if (targetColor && currentRoleOwner !== targetColor) {
      console.log(`[updateRoleAssignment] 🔄 Simple reassignment: Moving role "${roleToUpdate}" from "${currentRoleOwner?.name || 'unassigned'}" to "${targetColor.name}"`);
      
      // Check if we need to create a preserved color for other roles
      // Only create preserved color if the current owner has multiple roles AND 
      // we're moving the role to a DIFFERENT color (not just adding it to the same color)
      const needsColorSeparation = false; // Disable color separation for now to fix the issue
      
      let updatedColors = [...brandToUpdate.colors];
      
      if (needsColorSeparation) {
        const otherRoles = currentRoleOwner.roles.filter(r => r !== roleToUpdate);
        console.log(`[updateRoleAssignment] 🔄 Current owner "${currentRoleOwner.name}" has multiple roles: [${currentRoleOwner.roles.join(', ')}]`);
        console.log(`[updateRoleAssignment] 🔄 Other roles that need to keep the original color: [${otherRoles.join(', ')}]`);
        
        // Create a new color token for the other roles
        const preservedColorName = `${currentRoleOwner.name} (${otherRoles.join(', ')})`;
        let finalPreservedName = preservedColorName;
        let nameCounter = 1;
        
        // Find unique name
        while (updatedColors.find(color => color.name === finalPreservedName)) {
          finalPreservedName = `${preservedColorName} ${nameCounter}`;
          nameCounter++;
        }
        
        // Generate unique variable name
        const baseVariableName = `${currentRoleOwner.variableName}-preserved`;
        let finalVariableName = baseVariableName;
        let variableCounter = 1;
        
        while (updatedColors.find(color => color.variableName === finalVariableName)) {
          finalVariableName = `${baseVariableName}-${variableCounter}`;
          variableCounter++;
        }
        
        // Create the preserved color token with the other roles
        const preservedColorToken: ColorToken = {
          ...currentRoleOwner,
          name: finalPreservedName,
          variableName: finalVariableName,
          description: `Preserved color for ${otherRoles.join(', ')} roles`,
          roles: otherRoles,
          rawTokenSpecificName: finalPreservedName,
        };
        
        console.log(`[updateRoleAssignment] 🔄 Created preserved color token: "${finalPreservedName}" (${finalVariableName}) for roles: [${otherRoles.join(', ')}]`);
        
        // Update the original color to only have the role being reassigned (temporarily)
        const originalColorIndex = updatedColors.findIndex(color => color === currentRoleOwner);
        if (originalColorIndex !== -1) {
          updatedColors[originalColorIndex] = {
            ...currentRoleOwner,
            roles: [roleToUpdate], // Only the role being reassigned
            description: `${currentRoleOwner.description} (${roleToUpdate} role only)`,
          };
        }
        
        // Add the preserved color token
        updatedColors.push(preservedColorToken);
      }
      
      // Now perform the standard role reassignment
      updatedColors = updatedColors.map(color => {
      if (color.variableName === targetColorVariableName) {
          // Add the role to the target color
          const newRoles = [...(color.roles || [])];
          if (!newRoles.includes(roleToUpdate)) {
        newRoles.push(roleToUpdate);
      }
          return { ...color, roles: newRoles };
        } else {
          // Remove the role from all other colors
          const newRoles = (color.roles || []).filter(r => r !== roleToUpdate);
          return color.roles?.length === newRoles.length ? color : { ...color, roles: newRoles };
        }
      });
      
      // Clean up: If the original color (after role separation) has no roles left, remove it
      if (needsColorSeparation && currentRoleOwner) {
        const originalAfterSeparation = updatedColors.find(color => 
          color.variableName === currentRoleOwner.variableName && 
          color.roles.length === 1 && 
          color.roles[0] === roleToUpdate
        );
        if (originalAfterSeparation) {
          // Remove the temporary single-role color since the role is now assigned elsewhere
          updatedColors = updatedColors.filter(color => color !== originalAfterSeparation);
        }
      }
      
      // Create the new brand state
      const newBrandState: Brand = { ...brandToUpdate, colors: updatedColors };

      // Log new state after update
      console.log(`[updateRoleAssignment] AFTER - New role assignments:`);
      newBrandState.colors.forEach(color => {
        if (color.roles && color.roles.length > 0) {
          console.log(`  "${color.name}" (${color.variableName}): [${color.roles.join(', ')}] - Color: ${color.oklchLight}`);
        }
      });

      // Update the brand state
      setHistory(prevHistory => {
        const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
        return [...newHistorySlice, newBrandState];
      });
      const newIndex = currentHistoryIndex + 1;
      console.log(`[updateRoleAssignment] 🔄 About to call setLiveBrand with new state:`, newBrandState);
      console.log(`[updateRoleAssignment] 🔄 New state reference (should be different):`, newBrandState === brandToUpdate ? 'SAME REFERENCE (BAD)' : 'DIFFERENT REFERENCE (GOOD)');
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(newBrandState);
      console.log(`[updateRoleAssignment] ✅ setLiveBrand called successfully`);
      
      // Add a timeout to check if the state actually changed
      setTimeout(() => {
        console.log(`[updateRoleAssignment] 🕐 State check after 100ms - Primary role assignments should be updated`);
      }, 100);
      
      console.log(`[updateRoleAssignment] ✅ Role reassignment completed`);
      
    } else if (targetColorVariableName === null) {
      // Unassigning the role
      console.log(`[updateRoleAssignment] 🔄 Unassigning role "${roleToUpdate}"`);
      
      const updatedColors = brandToUpdate.colors.map(color => {
        const newRoles = (color.roles || []).filter(r => r !== roleToUpdate);
        return color.roles?.length === newRoles.length ? color : { ...color, roles: newRoles };
      });
      
      const newBrandState: Brand = { ...brandToUpdate, colors: updatedColors };
      
      setHistory(prevHistory => {
        const newHistorySlice = prevHistory.slice(0, currentHistoryIndex + 1);
        return [...newHistorySlice, newBrandState];
      });
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(newBrandState);
      console.log(`[updateRoleAssignment] ✅ Role unassignment completed`);
      
    } else {
      console.log(`[updateRoleAssignment] No changes needed - role "${roleToUpdate}" is already assigned to the target color`);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const addNewColor = useCallback((name: string, hexColor: string, roles: Role[] = []) => {
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
      oklchLight: oklchString,
      oklchDark: oklchString, // Use same color for both themes initially
      rawTokenSpecificName: finalName,
      roles: roles,
      lightThemeSteps: {},
      darkThemeSteps: {},
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
              oklchLight: oklchString,
              oklchDark: oklchString,
              rawTokenSpecificName: finalName,
              roles: [role], // Only assign to this role
              lightThemeSteps: {},
              darkThemeSteps: {},
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
    
    const brandForCSS = brandToDisplay;
    if (typeof window !== "undefined" && brandForCSS && brandForCSS.colors) {
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
                  oklchLight: directlyAssignedToken.oklchLight
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

      const finalProcessedBrand: EnrichedBrand = {
        ...brandForCSS,
        colors: newEnrichedColors
      };
      setProcessedBrand(finalProcessedBrand);

      // Apply all variables efficiently - only update those that have changed
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
      }

      console.log("--- CSS Variables Applied (Full Check via BrandContext) ---");
      expectedCssVariables.forEach(varName => {
        const value = rootStyle.getPropertyValue(varName).trim();
        if (!value) console.warn(`CSS Variable '${varName}' expected but is EMPTY/NULL.`);
      });
      console.log("--- End CSS Variable Check (BrandContext) ---");
    }
  }, [brandToDisplay, currentThemeData, activeThemeKey]);

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
      previewRoleDirectColorChange
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