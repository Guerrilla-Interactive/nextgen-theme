"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { BrandProvider, useBrand, type EnrichedColorToken, type EnrichedShade } from './BrandContext';
import { themes } from './brandguide';
import { influenceHierarchy, type ColorToken as BaseColorToken, type Role, type Shade as BaseShade, type Brand, type OklchString } from './brand-utils';
import { useGlobalContext } from '@/features/context/global-context';
import { Container, Grid, GridCol, Section } from '@/features/unorganized-components/nextgen-core-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/unorganized-components/ui/card';
import { Button } from '@/features/unorganized-components/ui/button';
import HorizontalSwatchList from './horizontal-swatch-list.component';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/unorganized-components/ui/select"; // Import Select components
import { ColorPicker } from '../brand-colors/ColorPicker';
import { formatHex, converter, parseHex, formatOklch } from 'culori';
import { ComponentShowcase } from '../brand-colors/ComponentShowcase';
import { Redo2Icon, Undo2Icon } from 'lucide-react';
import { ThemeRoleAssignmentGrid } from './components/theme-role-assignment-grid.component';

// Define a more specific type for the color objects processed and used in this page
export interface ProcessedColorToken extends EnrichedColorToken { // Extends the context type
  effectiveInfluence: number;   // Added by page.tsx
  importanceSummary: string;    // Added by page.tsx
  topRoles: Role[];           // Added by page.tsx
  // referrers and sortedDisplayShades are inherited from EnrichedColorToken
}

// Define role categories and their display order
const roleCategoriesOrder: string[] = [
  "Core Theming",
  "Primary Interaction",
  "Component Surfaces",
  "Feedback & State",
  "Charts & Data Visualization",
  "Text & Muted Content",
  "Structural & Decorative",
  "Default & General Use",
];

// Map roles to categories
const roleToCategoryMap: Record<Role, string> = {
  background: "Core Theming",
  foreground: "Core Theming",
  primary: "Primary Interaction",
  "primary-foreground": "Primary Interaction",
  secondary: "Primary Interaction",
  "secondary-foreground": "Primary Interaction",
  accent: "Primary Interaction",
  "accent-foreground": "Primary Interaction",
  card: "Component Surfaces",
  "card-foreground": "Component Surfaces",
  popover: "Component Surfaces",
  "popover-foreground": "Component Surfaces",
  input: "Component Surfaces",
  "input-foreground": "Component Surfaces",
  "tooltip-background": "Component Surfaces",
  destructive: "Feedback & State",
  "destructive-foreground": "Feedback & State",
  success: "Feedback & State",
  "success-foreground": "Feedback & State",
  info: "Feedback & State",
  "info-foreground": "Feedback & State",
  warning: "Feedback & State",
  "warning-foreground": "Feedback & State",
  ring: "Feedback & State",
  'chart-1': "Charts & Data Visualization",
  'chart-2': "Charts & Data Visualization",
  'chart-3': "Charts & Data Visualization",
  'chart-4': "Charts & Data Visualization",
  'chart-5': "Charts & Data Visualization",
  muted: "Text & Muted Content",
  'muted-foreground': "Text & Muted Content",
  border: "Structural & Decorative",
  default: "Default & General Use",
  'surface-muted': "Component Surfaces",
  'text-brand': "Primary Interaction",
  'chart-outline': "Charts & Data Visualization",
};


// This component will now consume the context
const BrandGuideContent = () => {
    const { sessionStatus } = useGlobalContext();
  const { brand, processedBrand, undo, redo, canUndo, canRedo, undoStepsAvailable, redoStepsAvailable, activeThemeKey, availableThemes, setActiveTheme, previewColorUpdate, commitColorUpdate, updateRoleAssignment } = useBrand();
  // console.log("Value of brand in BrandGuideContent:", brand);
  // console.log("Value of processedBrand in BrandGuideContent:", processedBrand);
  // console.log("Active theme:", activeThemeKey);

  const [selectedColorName, setSelectedColorName] = React.useState<string | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [pickerInterimHex, setPickerInterimHex] = React.useState<string>('#000000');
  const isPickerUpdateSourceRef = React.useRef(false);

  // Ref to store selected color name before theme change
  const previousSelectedColorNameBeforeThemeChangeRef = useRef<string | null>(null);

  // State to remember the previous owner of a role before the current selected color acquired it
  const [roleAcquisitionLog, setRoleAcquisitionLog] = React.useState<Record<string, string | null>>({});

  // Debounce timers for in-card pickers - keyed by color name
  const inCardDebounceTimersRef = React.useRef<Record<string, NodeJS.Timeout>>({});

  const getEffectiveInfluenceAndRoles = (color: BaseColorToken | ProcessedColorToken): { influence: number; topRoles: Role[] } => {
    if (!color.roles || color.roles.length === 0) {
      return { influence: influenceHierarchy.default || 0, topRoles: ["default"] };
    }
    let maxInfluence = 0;
    for (const role of color.roles) {
      const currentInfluence = influenceHierarchy[role as Role] || 0;
      if (currentInfluence > maxInfluence) {
        maxInfluence = currentInfluence;
      }
    }
    const topRoles = color.roles.filter(role => (influenceHierarchy[role as Role] || 0) === maxInfluence) as Role[];
    return { influence: maxInfluence, topRoles: topRoles.length > 0 ? topRoles : ["default"] };
  };

  const generateImportanceSummary = (roles: Role[]): string => {
    if (roles.includes("primary")) return "Primary";
    if (roles.includes("background")) return "Background";
    if (roles.includes("foreground")) return "Foreground";
    if (roles.includes("secondary")) return "Secondary";
    if (roles.includes("border")) return "Border";
    if (roles.includes("input")) return "Input";
    if (roles.includes("destructive")) return "Destructive";
    if (roles.includes("success")) return "Success";
    if (roles.includes("card")) return "Card";
    if (roles.includes("popover")) return "Popover";
    if (roles.includes("muted")) return "Muted";
    if (roles.includes("muted-foreground")) return "Muted text";
    if (roles.includes("accent")) return "Accent";
    if (roles.length > 0) {
        // Capitalize first letter of the first role, handle hyphens
        const firstRole = roles[0];
        const formattedRole = firstRole.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return formattedRole;
    } 
    return "General use";
  };

  const enrichedAndSortedColors = useMemo(() => {
    if (!processedBrand || !processedBrand.colors) return [];

    return processedBrand.colors
      .map((color): ProcessedColorToken => {
        const { influence, topRoles } = getEffectiveInfluenceAndRoles(color);
        const importanceSummary = generateImportanceSummary(topRoles);
        return {
          ...color,
          effectiveInfluence: influence,
          importanceSummary,
          topRoles
        } as ProcessedColorToken; // Cast to ensure type correctness
      })
      .sort((a, b) => b.effectiveInfluence - a.effectiveInfluence);
  }, [processedBrand, getEffectiveInfluenceAndRoles, generateImportanceSummary]);

  const actualSelectedColorData = React.useMemo(() => {
    if (!selectedColorName) return null;
    return enrichedAndSortedColors.find(c => c.name === selectedColorName) || null;
  }, [selectedColorName, enrichedAndSortedColors]);

  const allPossibleRoles = useMemo(() => {
    return (Object.keys(influenceHierarchy) as Role[]).sort((a, b) => (influenceHierarchy[b] || 0) - (influenceHierarchy[a] || 0));
  }, []);

  const globallyAssignedRoles = useMemo(() => {
    const assigned = new Set<Role>();
    if (processedBrand?.colors) {
      for (const color of processedBrand.colors) {
        // Ensure color.roles is an array before trying to iterate over it
        if (Array.isArray(color.roles)) {
          color.roles.forEach(role => assigned.add(role as Role));
        }
      }
    }
    return assigned;
  }, [processedBrand?.colors]);

  const handleRoleInteraction = (roleClicked: Role) => {
    if (!actualSelectedColorData?.name || !updateRoleAssignment || !processedBrand?.colors) return;

    const selectedColorName = actualSelectedColorData.name;
    const currentRolesOfSelectedColor = new Set(actualSelectedColorData.roles || []);

    if (currentRolesOfSelectedColor.has(roleClicked)) { // Selected color owns the role, try to unassign/revert
      const ownerToRevertTo = roleAcquisitionLog[roleClicked as string];

      if (typeof ownerToRevertTo !== 'undefined') {
        // We have a logged previous owner for this role related to selectedColor's last acquisition
        updateRoleAssignment(roleClicked, ownerToRevertTo); // ownerToRevertTo can be a color name or null
        // Clear the log for this role as this "reversion" consumes that piece of history
        setRoleAcquisitionLog(prev => {
          const newState = { ...prev };
          delete newState[roleClicked as string];
          return newState;
        });
      } else {
        // No specific logged previous owner for selectedColor's acquisition (e.g., page load, or first claim from unassigned).
        // Default to toggle: make it globally unassigned.
        updateRoleAssignment(roleClicked, null);
      }
    } else { // Selected color does NOT own the role, try to assign it
      let currentOwnerOfRoleClicked: string | null = null;
      for (const color of processedBrand.colors) {
        if (color.roles?.includes(roleClicked)) {
          currentOwnerOfRoleClicked = color.name;
          break;
        }
      }
      // Log who owned it (or null if unassigned) before selectedColorName takes it
      setRoleAcquisitionLog(prev => ({
        ...prev,
        [roleClicked as string]: currentOwnerOfRoleClicked
      }));
      updateRoleAssignment(roleClicked, selectedColorName);
    }
  };

  // Handler for theme change
  const handleThemeChange = (newThemeKey: string) => {
    previousSelectedColorNameBeforeThemeChangeRef.current = selectedColorName;
    setActiveTheme(newThemeKey);
    // setSelectedColorName(null); // Removed: logic will be handled by useEffect
  };

  // New memoized value for categorized roles with UI data
  const categorizedRoleUiData = useMemo(() => {
    const categories: Record<string, Array<{ role: Role; statusLabel: string; baseClasses: string; buttonTitle: string; isAssignedToCurrentColor: boolean; isAssignedGlobally: boolean; statusIndicatorBgClass: string; assignedColorHex: string | null; assignedByColorName: string | null }>> = {};

    allPossibleRoles.forEach(role => {
      const categoryName = roleToCategoryMap[role] || "Default & General Use";
      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }

      const isAssignedToCurrentColor = actualSelectedColorData?.roles?.includes(role as Role);
      const isAssignedGlobally = globallyAssignedRoles.has(role as Role);
      let claimingColorName: string | null = null;

      let statusLabel = "Unassigned";
      let baseClasses = "bg-transparent text-[var(--muted-foreground)] border-[var(--muted-foreground)]/50 border-dashed hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]/70 hover:border-solid";
      let buttonTitle = actualSelectedColorData?.name 
        ? `Assign role '${role}' to ${actualSelectedColorData.name}` 
        : `Select a color first to assign role '${role}'`;
      let statusIndicatorBgClass = "bg-[var(--muted-foreground)]/15 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] font-semibold"; 
      let assignedColorHex: string | null = null;
      let assignedByColorName: string | null = null;

      if (isAssignedToCurrentColor) {
        statusLabel = "This Color";
        baseClasses = "bg-[var(--success)]/100 text-[var(--success-foreground)] border-[var(--success)] hover:bg-[var(--success)]/80";
        buttonTitle = actualSelectedColorData?.name 
          ? `Unassign role '${role}' from ${actualSelectedColorData.name}`
          : `Role '${role}' is assigned (error: no color selected)`;
        statusIndicatorBgClass = "bg-[var(--success-foreground)]/20 text-white font-semibold"; 
        if (actualSelectedColorData) {
          assignedColorHex = formatHex(actualSelectedColorData.oklchLight as string) || actualSelectedColorData.oklchLight;
          assignedByColorName = actualSelectedColorData.name; 
        }
      } else if (isAssignedGlobally) {
        const claimingColor = enrichedAndSortedColors.find(c => c.roles?.includes(role as Role));
        claimingColorName = claimingColor ? claimingColor.name : null;
        assignedColorHex = claimingColor ? (formatHex(claimingColor.oklchLight as string) || claimingColor.oklchLight) : null;
        assignedByColorName = claimingColorName;

        statusLabel = claimingColorName ? `${claimingColorName}` : "Taken by Other";
        baseClasses = "bg-[var(--secondary)]/100 text-[var(--secondary-foreground)]/90 border-[var(--primary)]/40 hover:bg-[var(--primary)]/80 hover:border-[var(--primary)]/50";
        buttonTitle = actualSelectedColorData?.name 
          ? `Hijack role '${role}' from ${claimingColorName || 'other'} for ${actualSelectedColorData.name}`
          : `Role '${role}' is taken by ${claimingColorName || 'other'} (select a color to hijack)`;
        statusIndicatorBgClass = "bg-[var(--primary-foreground)]/10 text-white/80 font-semibold"; 
      } else { // Unassigned
        statusLabel = "Unassigned";
        baseClasses = "bg-transparent text-[var(--muted-foreground)] border-[var(--muted-foreground)]/50 border-dashed hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]/70 hover:border-solid";
        buttonTitle = actualSelectedColorData?.name 
          ? `Assign role '${role}' to ${actualSelectedColorData.name}` 
          : `Select a color first to assign role '${role}'`;
        statusIndicatorBgClass = "bg-[var(--muted-foreground)]/15 text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] font-semibold"; 
      }

      categories[categoryName].push({
        role,
        statusLabel,
        baseClasses,
        buttonTitle,
        isAssignedToCurrentColor: !!isAssignedToCurrentColor,
        isAssignedGlobally,
        statusIndicatorBgClass,
        assignedColorHex,
        assignedByColorName
      });
    });

    // Return in the specified category order
    return roleCategoriesOrder
      .map(catName => ({
        categoryName: catName,
        roles: (categories[catName] || [])
          .sort((a, b) => a.role.localeCompare(b.role)) // Sort roles alphabetically within each category
      }))
      .filter(category => category.roles.length > 0); // Only include categories that have roles

  }, [allPossibleRoles, actualSelectedColorData, globallyAssignedRoles, enrichedAndSortedColors]);


  const displayBrand = processedBrand || brand;

  if (!displayBrand || !displayBrand.colors || !displayBrand.fonts) {
    console.error("Brand data, brand.colors, or brand.fonts is not available in BrandGuideContent.", displayBrand);
    return (
      <Section className="py-8">
        <Container>
          <p className="text-destructive p-4 bg-destructive/10 rounded-md">Error: Brand data is not available. Check console.</p>
        </Container>
      </Section>
    );
  }

  useEffect(() => {
    // Set top bar theme based on the active brand's preference
    if (displayBrand && typeof displayBrand.prefersDarkSchemeForChrome === 'boolean') {
      sessionStatus.setIsTopDark(displayBrand.prefersDarkSchemeForChrome);
    } else {
      // Fallback if the property is not defined (e.g., during initial load or if a brand is misconfigured)
      sessionStatus.setIsTopDark(true); // Default to dark if undefined
    }
  }, [sessionStatus, displayBrand, activeThemeKey]); // Re-evaluate when displayBrand or activeThemeKey changes

  // Effect to clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      // Clear all in-card debounce timers as well
      Object.values(inCardDebounceTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  // Effect to clear roleAcquisitionLog if theme changes or no color is selected
  useEffect(() => {
    setRoleAcquisitionLog({});
  }, [activeThemeKey, selectedColorName === null]);

  // Effect to handle sticky color selection across theme changes
  useEffect(() => {
    if (previousSelectedColorNameBeforeThemeChangeRef.current) {
      const oldSelectedName = previousSelectedColorNameBeforeThemeChangeRef.current;
      const colorExistsInNewTheme = enrichedAndSortedColors.some(c => c.name === oldSelectedName);

      if (colorExistsInNewTheme) {
        setSelectedColorName(oldSelectedName);
      } else {
        // Fallback: if the old color name doesn't exist in the new theme,
        // set to null, allowing HorizontalSwatchList to pick the first one.
        setSelectedColorName(null);
      }
      previousSelectedColorNameBeforeThemeChangeRef.current = null; // Reset the ref after processing
    }
    // This effect depends on enrichedAndSortedColors being updated for the new theme.
    // activeThemeKey is included to ensure it runs specifically after a theme change has been committed and colors processed.
  }, [enrichedAndSortedColors, activeThemeKey]);

  // Effect to synchronize pickerInterimHex from actualSelectedColorData (canonical state)
  useEffect(() => {
    if (isPickerUpdateSourceRef.current) {
      return; 
    }
    // Use oklchLight from context, pickerInterimHex should also ideally be oklch if picker supports it
    // For now, if picker gives hex, we convert. If context gives oklch, we display that or convert to hex for picker if it only takes hex.
    const canonicalOklchFromContext = actualSelectedColorData ? actualSelectedColorData.oklchLight : "oklch(0 0 0)";
    // If pickerInterimHex is supposed to be oklch, this comparison is direct.
    // If pickerInterimHex is hex, convert canonicalOklchFromContext to hex for comparison.
    const canonicalValueForPicker = formatHex(canonicalOklchFromContext as string) || canonicalOklchFromContext; // Assuming pickerInterimHex is hex
    
    if (canonicalValueForPicker !== pickerInterimHex) {
      setPickerInterimHex(canonicalValueForPicker);
    }
    // If picker takes OKLCH directly: setPickerInterimHex(canonicalOklchFromContext)
  }, [actualSelectedColorData?.name, actualSelectedColorData?.oklchLight]); // Dependency on oklchLight

  // Effect to clear commit debounce timer ONLY if selectedColorName (the swatch itself) changes.
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null; 
    }
  }, [selectedColorName]);

  const handlePickerValueChange = (newRawHexValue: string) => {
    isPickerUpdateSourceRef.current = true; 
    try {
      const normalizedHex = formatHex(newRawHexValue);

      if (normalizedHex) {
        if (normalizedHex !== pickerInterimHex) { 
          setPickerInterimHex(normalizedHex);

          if (actualSelectedColorData && actualSelectedColorData.name) {
            // Convert hex to OKLCH before calling preview/commit
            // TODO: culori does not have a direct hex to oklch. 
            // For now, we'll pass the hex, and assume context or util needs to handle conversion or picker updated to give OKLCH
            // This is a temporary passthrough. Ideally, picker emits OKLCH or we convert here.
            // For the purpose of the fix, passing hex and relying on context to handle is problematic as context expects OklchString.
            // We need a hex to oklch conversion here.
            // Culori: parseHex -> converter('oklch') -> formatOklch
            const oklchConverter = converter('oklch');
            const colorObj = parseHex(normalizedHex);
            let oklchStringValue: OklchString = "oklch(0 0 0)"; // Fallback
            if (colorObj) {
              const converted = oklchConverter(colorObj);
              if (converted) {
                let l = converted.l, c = converted.c, h = converted.h;
                // Handle cases where hue might be undefined or NaN for achromatic colors
                h = (h === undefined || isNaN(h)) ? 0 : h;
                l = (l === undefined || isNaN(l)) ? 0 : l;
                c = (c === undefined || isNaN(c)) ? 0 : c;

                let str = `oklch(${Number(l).toFixed(4)} ${Number(c).toFixed(4)} ${Number(h).toFixed(2)}`;
                if (converted.alpha !== undefined && converted.alpha < 1) {
                  str += ` / ${Number(converted.alpha).toFixed(2)}`;
                }
                str += ')';
                oklchStringValue = str as OklchString;
              }
            }

            previewColorUpdate(actualSelectedColorData.name, oklchStringValue);

            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
              commitColorUpdate(actualSelectedColorData.name, oklchStringValue);
              debounceTimerRef.current = null; 
            }, 500); 
          } else {
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
              debounceTimerRef.current = null;
            }
          }
        } 
      } else {
        setPickerInterimHex(newRawHexValue); 
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
      }
    } finally {
      // Defer resetting the flag to allow React to process updates from previewColorUpdate
      setTimeout(() => {
        isPickerUpdateSourceRef.current = false;
      }, 0);
    }
  };

  return (
    <Section
      className="mt-42"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)',  }}
    >
      <Container>
        <div className="flex justify-between mb-6"> {/* Increased mb for spacing */} 
          <div>
            <h1 className="text-2xl font-heading font-extrabold"> What do you already possess?</h1>
            <p className="text-sm text-[var(--muted-foreground)] font-inter">Prioritized based on influence hierarchy. Current Theme: <span className="font-semibold capitalize">{activeThemeKey}</span></p>
          </div>
          <div className="flex gap-x-2 space-y-1 ml-4 min-w-[100px]">
            {/* Theme Selector */}
            <Select onValueChange={handleThemeChange} value={activeThemeKey}>
              <SelectTrigger className="w-[180px] h-9 text-xs">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(availableThemes).map(themeKey => (
                  <SelectItem key={themeKey} value={themeKey} className="text-xs capitalize">
                    {themeKey}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={undo} 
              disabled={!canUndo} 
              variant="outline"
              size="sm"
              className="p-2 text-xs w-9 h-9 flex items-center justify-center relative"
              title={`Undo (${undoStepsAvailable} available)`}
            >
              <Undo2Icon className="h-4 w-4" />
              {canUndo && <span className="absolute -top-1 -right-1 text-[10px] bg-muted text-[var(--muted-foreground)] px-1 py-0.5 rounded-full leading-none">{undoStepsAvailable}</span>}
            </Button>
            <Button 
              onClick={redo} 
              disabled={!canRedo} 
              variant="outline"
              size="sm"
              className="p-2 text-xs w-9 h-9 flex items-center justify-center relative"
              title={`Redo (${redoStepsAvailable} available)`}
            >
              <Redo2Icon className="h-4 w-4" />
              {canRedo && <span className="absolute -top-1 -right-1 text-[10px] bg-muted text-[var(--muted-foreground)] px-1 py-0.5 rounded-full leading-none">{redoStepsAvailable}</span>}
            </Button>
          </div>
        </div>
      </Container>
      
        <Section className=" bg-[var(--background)]">
            <HorizontalSwatchList 
              colors={enrichedAndSortedColors} 
              onSelectColor={setSelectedColorName} // Updated to use setSelectedColorName
              currentlySelectedColorName={selectedColorName} // Pass selectedColorName
            />
            {/* Selected Swatch Display Section - now uses actualSelectedColorData */}
            {actualSelectedColorData && (
            <Container className="mt-12">
              <Card style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
              
                <Grid className="space-y-4 p-4 pb-10 grid grid-cols-1 items-start content-start md:grid-cols-5 gap-6">
                  <GridCol className="col-span-2" >
                  
                  <div className="flex items-start gap-4">
                    <ColorPicker 
                      value={pickerInterimHex} // Use local interim state for picker value
                      onChange={handlePickerValueChange} // Use the new handler
                      className="w-20 h-20 rounded-md flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <CardTitle className="text-2xl font-heading flex items-center" style={{ color: 'var(--card-foreground)' }}>
                        {actualSelectedColorData.name}
                        <span className="text-xs font-normal text-[var(--muted-foreground)] ml-2">
                          ({actualSelectedColorData.importanceSummary})
                        </span>
                      </CardTitle>
                      <CardDescription className="text-sm pt-1 font-inter" style={{ color: 'var(--card-foreground)' }}>
                        {actualSelectedColorData.description}
                      </CardDescription>
                    </div>
                  </div>
                
                  <p className="text-sm font-mono" style={{ color: 'var(--card-foreground)' }}>
                    {/* Display oklchLight, and its hex conversion */}
                    OKLCH: {actualSelectedColorData.oklchLight} <br/>
                    HEX: {formatHex(actualSelectedColorData.oklchLight as string) || 'N/A'} / CSS: var(--{actualSelectedColorData.variableName})
                  </p>

                  {actualSelectedColorData.roles && actualSelectedColorData.roles.length > 0 && (
                    <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                      <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Assigned Roles (This Color):</p>
                      <div className="flex flex-wrap gap-1.5">
                        {actualSelectedColorData.roles.map((role, idx) => (
                          <div 
                            key={idx} 
                            className="inline-flex items-center rounded-md border border-[var(--primary)]/50 bg-[var(--primary)]/10 px-2 py-0.5 text-[9px] font-medium text-[var(--primary)] shadow-xs"
                            title={`This color token is assigned the role: ${role}`}
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}


<div className="flex flex-wrap gap-2 mt-3">
                    {(actualSelectedColorData.sortedDisplayShades || []).map((shade: EnrichedShade, index: number) => {
                      const levelEntry = Object.entries(actualSelectedColorData.shades).find(([_, s]) => s === shade);
                      const level = levelEntry ? levelEntry[0] : "unknown";
                      if (!shade || !shade.variableName || level === 'on') return null;
                      const shadeBgVarName = `--${shade.variableName}`;
                      const styleProps: React.CSSProperties = { backgroundColor: `var(${shadeBgVarName})` };
                      if (actualSelectedColorData.shades.on && actualSelectedColorData.shades.on.variableName) {
                        styleProps.color = `var(--${actualSelectedColorData.shades.on.variableName})`;
                      } else {
                        // Fallback logic for text color on shades
                        let useLightText = false;
                        try {
                          // Attempt to parse the current shade's value to get its lightness
                          const oklchConverter = converter('oklch');
                          const shadeOklchParts = oklchConverter(shade.value as string); // Use shade.value
                          if (shadeOklchParts && typeof shadeOklchParts.l === 'number') {
                            useLightText = shadeOklchParts.l < 0.55;
                          } else {
                            // If parsing shade.value fails (e.g., it's a color-mix string not yet resolved to oklch here)
                            // fall back to heuristic based on level key
                            if (level === 'dark' || level === 'darker') {
                              useLightText = true;
                            } else if (level === 'light' || level === 'lighter' || level === 'bright' || level === 'brighter') {
                              useLightText = false;
                            } else if (level === 'base') {
                              // For 'base' level, check the original base color's lightness
                              const baseTokenOklchParts = oklchConverter(actualSelectedColorData.oklchLight as string);
                              useLightText = baseTokenOklchParts ? baseTokenOklchParts.l < 0.55 : true;
                            } else {
                              useLightText = false; // Default for unknown levels
                            }
                          }
                        } catch (e) {
                          // If any error in parsing, fallback to level-based heuristic or default
                          if (level === 'dark' || level === 'darker') {
                            useLightText = true;
                          } else if (level === 'light' || level === 'lighter' || level === 'bright' || level === 'brighter') {
                            useLightText = false;
                          } else if (level === 'base') {
                            const baseTokenOklchParts = converter('oklch')(actualSelectedColorData.oklchLight as string);
                            useLightText = baseTokenOklchParts ? baseTokenOklchParts.l < 0.55 : true;
                          } else {
                            useLightText = false;
                          }
                        }
                        styleProps.color = useLightText ? 'var(--general-text-light-on-dark)' : 'var(--general-text-dark-on-light)';
                      }
                      return (
                        <div
                          key={level}
                          className={`w-20 h-12 flex flex-col items-center justify-center rounded text-xs font-mono shadow-xs p-1 text-center`}
                          style={styleProps}
                          title={shade.isAlias
                                  ? `Alias: ${shade.aliasTarget}${shade.sourceTokenName ? ` (Source: ${shade.sourceTokenName} ${shade.sourceShadeKey})` : ''}`
                                  : `Actual: ${shade.resolvedValue}`}
                        >
                          <span>{level}</span>
                          {shade.isAlias && (
                            <span 
                              className="text-[8px] leading-tight mt-0.5 block truncate w-full" 
                              title={shade.sourceTokenName ? `${shade.sourceTokenName} ${shade.sourceShadeKey}` : shade.aliasTarget?.slice(6,-1).split('-').slice(-2).join('-') || 'var'}
                            >
                              (uses {shade.sourceTokenName ? `${shade.sourceTokenName.split(' ').pop()} ${shade.sourceShadeKey}` : shade.aliasTarget?.slice(6,-1).split('-').slice(-2).join('-') || 'var'})
                            </span>
                          )}
                          {shade.mappedThemeVars && shade.mappedThemeVars.length > 0 && (
                            <div className="mt-1 pt-0.5 border-t border-[var(--border)]/20 w-full text-center">
                              {shade.mappedThemeVars.map((themeVar, tvIdx) => (
                                <span 
                                  key={tvIdx} 
                                  className="block text-[7px] leading-tight truncate"
                                  title={`Provides value for theme variable: ${themeVar}`}
                                >
                                  {themeVar.replace('--','')}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>


{actualSelectedColorData.tokenLevelMappedThemeVars && actualSelectedColorData.tokenLevelMappedThemeVars.length > 0 && (
                    <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                      <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Fulfills Theme Variables:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {actualSelectedColorData.tokenLevelMappedThemeVars.map((themeVar, idx) => (
                          <div 
                            key={idx} 
                            className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs transition-colors hover:bg-muted/50"
                            title={`This color token (via one of its shades) provides the value for ${themeVar}`}
                          >
                            {themeVar.replace('--','')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  
{actualSelectedColorData.referrers && actualSelectedColorData.referrers.length > 0 && (
                    <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                      <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Used by (Aliases):</p>
                      <div className="flex flex-wrap gap-1.5">
                          {actualSelectedColorData.referrers.map((ref, idx) => (
                            <div 
                              key={idx} 
                              className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs transition-colors hover:bg-muted/50"
                              title={`${ref.tokenName} ${ref.shadeKey} (refers to our ${ref.referringToWhat})`}
                            >
                              <span className="text-foreground/80">{ref.tokenName.split(' ').pop()}</span>
                              <span className="text-muted-foreground/80 font-semibold mx-0.5">{ref.shadeKey}</span>
                              <span className="text-accent/70">&rarr;</span> 
                              <span className="text-foreground/80 ml-0.5 font-semibold">our {ref.referringToWhat}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}


                  </GridCol>

                  <ThemeRoleAssignmentGrid
                    categorizedRoleUiData={categorizedRoleUiData}
                    actualSelectedColorData={actualSelectedColorData}
                    handleRoleInteraction={handleRoleInteraction}
                    setSelectedColorName={setSelectedColorName}
                  />
            


                </Grid>
              </Card>
            </Container>
            )}
        </Section>
      

        <Section>
            
      <Container>
        <div className=" space-y-12 hidden">
          <Card 
            
            style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
          >
            <CardHeader>
              <CardTitle 
                className="text-2xl font-heading" 
                style={{ color: 'var(--card-foreground)' }}
              >Colors</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrichedAndSortedColors.map((color) => {
                // Handler for in-card color pickers
                const handleInCardColorChange = (colorName: string, newRawHexValue: string) => {
                  try {
                    const normalizedHex = formatHex(newRawHexValue);
                    if (normalizedHex) {
                      // Similar to main picker, convert hex to OKLCH
                      const oklchConverter = converter('oklch');
                      const colorObj = parseHex(normalizedHex);
                      let oklchStringValue: OklchString = "oklch(0 0 0)";
                      if (colorObj) {
                        const converted = oklchConverter(colorObj);
                        if (converted) {
                          let l = converted.l, c = converted.c, h = converted.h;
                          // Handle cases where hue might be undefined or NaN for achromatic colors
                          h = (h === undefined || isNaN(h)) ? 0 : h;
                          l = (l === undefined || isNaN(l)) ? 0 : l;
                          c = (c === undefined || isNaN(c)) ? 0 : c;

                          let str = `oklch(${Number(l).toFixed(4)} ${Number(c).toFixed(4)} ${Number(h).toFixed(2)}`;
                          if (converted.alpha !== undefined && converted.alpha < 1) {
                            str += ` / ${Number(converted.alpha).toFixed(2)}`;
                          }
                          str += ')';
                          oklchStringValue = str as OklchString;
                        }
                      }

                      previewColorUpdate(colorName, oklchStringValue); 

                      if (inCardDebounceTimersRef.current[colorName]) {
                        clearTimeout(inCardDebounceTimersRef.current[colorName]);
                      }
                      inCardDebounceTimersRef.current[colorName] = setTimeout(() => {
                        commitColorUpdate(colorName, oklchStringValue);
                      }, 750); 
                    }
                  } catch (error) {
                    console.error("Error processing in-card color change:", error);
                  }
                };

                return (
                  <Card  
                    key={color.name} 
                     
                    style={{ backgroundColor: 'var(--card-secondary, var(--surface-muted, var(--card)))', color: 'var(--card-foreground)' }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-x-3"> 
                        <ColorPicker
                          // Value for ColorPicker should ideally be what it expects. If it's hex, convert oklchLight to hex.
                          value={formatHex(color.oklchLight as string) || color.oklchLight} 
                          onChange={(newHex) => handleInCardColorChange(color.name, newHex)}
                          className="w-6 h-6 rounded-md shadow-xs flex-shrink-0 p-0" 
                        />
                        <CardTitle className="text-xl font-heading" style={{ color: 'var(--card-foreground)' }}>
                          {color.name}
                          <span className="text-xs font-normal text-[var(--muted-foreground)] ml-2">
                            ({color.importanceSummary})
                          </span>
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm pt-1 font-inter" style={{ color: 'var(--card-foreground)' }}>{color.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm font-mono" style={{ color: 'var(--card-foreground)' }}>
                        {/* Display oklchLight and its hex conversion */}
                        OKLCH: {color.oklchLight} <br/>
                        HEX: {formatHex(color.oklchLight as string) || 'N/A'} / CSS: var(--{color.variableName})
                      </p>

                      {/* Display Assigned Roles */}
                      {color.roles && color.roles.length > 0 && (
                        <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                          <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Assigned Roles:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {color.roles.map((role, idx) => (
                              <div 
                                key={idx} 
                                className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs"
                                title={`This color token is assigned the role: ${role}`}
                              >
                                {role}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Display referrers for the main token variable */} 
                      {color.referrers && color.referrers.length > 0 && (
                        <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                          <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Used by (Aliases):</p>
                          <div className="flex flex-wrap gap-1.5">
                              {color.referrers.map((ref, idx) => (
                                <div 
                                  key={idx} 
                                  className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs transition-colors hover:bg-muted/50"
                                  title={`${ref.tokenName} ${ref.shadeKey} (refers to our ${ref.referringToWhat})`}
                                >
                                  <span className="text-foreground/80">{ref.tokenName.split(' ').pop()}</span>
                                  <span className="text-muted-foreground/80 font-semibold mx-0.5">{ref.shadeKey}</span>
                                  <span className="text-accent/70">&rarr;</span> 
                                  <span className="text-foreground/80 ml-0.5 font-semibold">our {ref.referringToWhat}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Display Token-Level Theme Variable Mappings */}
                      {color.tokenLevelMappedThemeVars && color.tokenLevelMappedThemeVars.length > 0 && (
                        <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                          <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Fulfills Theme Variables:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {color.tokenLevelMappedThemeVars.map((themeVar, idx) => (
                              <div 
                                key={idx} 
                                className="inline-flex items-center rounded-md border border-border/70 px-2 py-0.5 text-[9px] font-medium bg-background shadow-xs transition-colors hover:bg-muted/50"
                                title={`This color token (via one of its shades) provides the value for ${themeVar}`}
                              >
                                {themeVar.replace('--','')}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-3"> {/* Added mt-3 for spacing above shade boxes */}
                        {(color.sortedDisplayShades || []).map((shade: EnrichedShade, index: number) => {
                          // Find the level (key) for the current shade object
                          const levelEntry = Object.entries(color.shades).find(([_, s]) => s === shade);
                          const level = levelEntry ? levelEntry[0] : "unknown";

                          if (!shade || !shade.variableName || level === 'on') return null; // Skip rendering the 'on' shade itself as a swatch
                          
                          const shadeBgVarName = `--${shade.variableName}`;

                          const styleProps: React.CSSProperties = {
                            backgroundColor: `var(${shadeBgVarName})`,
                          };

                          // Corrected logic for text color:
                          // Check if the PARENT color token has an 'on' shade defined.
                          // The 'on' shade applies to text ON ANY of the color's other shades if the color is a surface.
                          if (color.shades.on && color.shades.on.variableName) {
                            // Directly use the variableName from the 'on' shade object
                            styleProps.color = `var(--${color.shades.on.variableName})`;
                          } else {
                            // Fallback logic for text color on shades
                            let useLightText = false;
                            try {
                              // Attempt to parse the current shade's value to get its lightness
                              const oklchConverter = converter('oklch');
                              const shadeOklchParts = oklchConverter(shade.value as string); // Use shade.value
                              if (shadeOklchParts && typeof shadeOklchParts.l === 'number') {
                                useLightText = shadeOklchParts.l < 0.55;
                              } else {
                                // If parsing shade.value fails (e.g., it's a color-mix string not yet resolved to oklch here)
                                // fall back to heuristic based on level key
                                if (level === 'dark' || level === 'darker') {
                                  useLightText = true;
                                } else if (level === 'light' || level === 'lighter' || level === 'bright' || level === 'brighter') {
                                  useLightText = false;
                                } else if (level === 'base') {
                                  // For 'base' level, check the original base color's lightness
                                  const baseTokenOklchParts = oklchConverter(color.oklchLight as string);
                                  useLightText = baseTokenOklchParts ? baseTokenOklchParts.l < 0.55 : true;
                                } else {
                                  useLightText = false; // Default for unknown levels
                                }
                              }
                            } catch (e) {
                              // If any error in parsing, fallback to level-based heuristic or default
                              if (level === 'dark' || level === 'darker') {
                                useLightText = true;
                              } else if (level === 'light' || level === 'lighter' || level === 'bright' || level === 'brighter') {
                                useLightText = false;
                              } else if (level === 'base') {
                                const baseTokenOklchParts = converter('oklch')(color.oklchLight as string);
                                useLightText = baseTokenOklchParts ? baseTokenOklchParts.l < 0.55 : true;
                              } else {
                                useLightText = false;
                              }
                            }
                            styleProps.color = useLightText ? 'var(--general-text-light-on-dark)' : 'var(--general-text-dark-on-light)';
                          }

                          return (
                            <div
                              key={level}
                              className={`w- h-12 flex flex-col items-center justify-center rounded text-xs font-mono shadow-xs p-1 text-center`}
                              style={styleProps}
                              title={shade.isAlias
                                      ? `Alias: ${shade.aliasTarget}${shade.sourceTokenName ? ` (Source: ${shade.sourceTokenName} ${shade.sourceShadeKey})` : ''}`
                                      : `Actual: ${shade.resolvedValue}`}
                            >
                              <span>{level}</span>
                              {shade.isAlias && (
                                <span 
                                  className="text-[8px] leading-tight mt-0.5 block truncate w-full" 
                                  title={shade.sourceTokenName ? `${shade.sourceTokenName} ${shade.sourceShadeKey}` : shade.aliasTarget?.slice(6,-1).split('-').slice(-2).join('-') || 'var'}
                                >
                                  (uses {shade.sourceTokenName ? `${shade.sourceTokenName.split(' ').pop()} ${shade.sourceShadeKey}` : shade.aliasTarget?.slice(6,-1).split('-').slice(-2).join('-') || 'var'})
                                </span>
                              )}
                              {/* Display Mapped Theme Vars for this specific shade */}
                              {shade.mappedThemeVars && shade.mappedThemeVars.length > 0 && (
                                <div className="mt-1 pt-0.5 border-t border-[var(--border)]/20 w-full text-center">
                                  {shade.mappedThemeVars.map((themeVar, tvIdx) => (
                                    <span 
                                      key={tvIdx} 
                                      className="block text-[7px] leading-tight truncate"
                                      title={`Provides value for theme variable: ${themeVar}`}
                                    >
                                      {themeVar.replace('--','')}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle 
                className="text-2xl font-heading" 
                style={{ color: 'var(--card-foreground)' }}
              >Fonts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {displayBrand.fonts.map(font => {
                const fontVarName = font.family.startsWith('var(') 
                  ? font.family.slice(4, -1) 
                  : ''; 
                const fontStyle = fontVarName ? { fontFamily: `var(${fontVarName})` } : { fontFamily: font.family };

                return (
                  <Card 
                    key={font.name} 
                    
                    style={{ backgroundColor: 'var(--card-secondary, var(--surface-muted, var(--card)))', color: 'var(--card-foreground)' }}
                  >
                    <CardHeader>
                      <CardTitle className={`text-xl`} style={fontStyle}>{font.name} (Sample Text)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className={`text-base`} style={{...fontStyle, color: 'var(--foreground)' }}>The quick brown fox jumps over the lazy dog. 0123456789</p>
                      <p className="text-sm font-inter" style={{ color: 'var(--muted-foreground)' }}><strong>Description:</strong> {font.description}</p>
                      <p className="text-sm font-inter" style={{ color: 'var(--muted-foreground)' }}><strong>CSS Family:</strong> <code className={`text-xs p-1 rounded`} style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)', ...fontStyle }}>{font.family}</code></p>
                      <p className="text-sm font-inter" style={{ color: 'var(--muted-foreground)' }}><strong>Distributor:</strong> {font.distributor}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </Container>

      
        </Section>

    </Section>
  );
};


export default function BrandGuidePage() {
  // console.log("Value of themes in BrandGuidePage (before Provider):", themes);
  return (
    <BrandProvider initialThemes={themes} initialThemeKey="nextgen"> {/* Pass themes and initial key */}
      <BrandGuideContent />
    </BrandProvider>
  );
}

