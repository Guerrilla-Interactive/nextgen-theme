import React, { useEffect, useMemo, useRef, useState } from "react";
import { useBrand, type EnrichedColorToken } from "../../brandguide/BrandContext";
import { ColorPicker } from "../../brand-colors/ColorPicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Button } from "@/features/unorganized-components/ui/button";
import { Input } from "@/features/unorganized-components/ui/input";
import { Label } from "@/features/unorganized-components/ui/label";
import { formatHex, converter, parseHex } from "culori";
import { 
  Role, 
  type OklchString, 
  influenceHierarchy, 
  getHighContrastTextColor 
} from "../../brandguide/brand-utils";
import { 
  Palette, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Info,
  ChevronDown,
  ChevronRight,
  Hash,
  Target,
  Layers,
  Shuffle,
  Grid3X3,
  List,
  MousePointerClick,
  Square,
  BarChart,
  Type,
  Puzzle,
  Package
} from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/features/unorganized-components/ui/tooltip';

// Define role categories and their display order (same as brandguide)
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

// Map roles to categories (same as brandguide)
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
  sidebar: "Component Surfaces",
  "sidebar-foreground": "Component Surfaces",
  "sidebar-primary": "Component Surfaces",
  "sidebar-primary-foreground": "Component Surfaces",
  "sidebar-accent": "Component Surfaces",
  "sidebar-accent-foreground": "Component Surfaces",
  "sidebar-border": "Component Surfaces",
  "sidebar-ring": "Component Surfaces",
  destructive: "Feedback & State",
  "destructive-foreground": "Feedback & State",
  success: "Feedback & State",
  "success-foreground": "Feedback & State",
  ring: "Feedback & State",
  'chart-1': "Charts & Data Visualization",
  'chart-2': "Charts & Data Visualization",
  'chart-3': "Charts & Data Visualization",
  'chart-4': "Charts & Data Visualization",
  'chart-5': "Charts & Data Visualization",
  'chart-outline': "Charts & Data Visualization",
  muted: "Text & Muted Content",
  'muted-foreground': "Text & Muted Content",
  border: "Structural & Decorative",
};

const categoryIcons: Record<string, React.ElementType> = {
  "Core Theming": Palette,
  "Primary Interaction": MousePointerClick,
  "Component Surfaces": Square,
  "Feedback & State": Info,
  "Charts & Data Visualization": BarChart,
  "Text & Muted Content": Type,
  "Structural & Decorative": Puzzle,
  "Default & General Use": Package,
};

const roleToSubCategoryMap: Record<Role, string> = {
  background: "Base",
  foreground: "Base",
  primary: "Primary",
  "primary-foreground": "Primary",
  secondary: "Secondary",
  "secondary-foreground": "Secondary",
  accent: "Accent",
  "accent-foreground": "Accent",
  card: "Card",
  "card-foreground": "Card",
  popover: "Popover",
  "popover-foreground": "Popover",
  input: "Input",
  "input-foreground": "Input",
  "tooltip-background": "Tooltip",
  sidebar: "Sidebar",
  "sidebar-foreground": "Sidebar",
  "sidebar-primary": "Sidebar",
  "sidebar-primary-foreground": "Sidebar",
  "sidebar-accent": "Sidebar",
  "sidebar-accent-foreground": "Sidebar",
  "sidebar-border": "Sidebar",
  "sidebar-ring": "Sidebar",
  destructive: "Destructive",
  "destructive-foreground": "Destructive",
  success: "Success",
  "success-foreground": "Success",
  ring: "Interaction State",
  'chart-1': "Chart Palette",
  'chart-2': "Chart Palette",
  'chart-3': "Chart Palette",
  'chart-4': "Chart Palette",
  'chart-5': "Chart Palette",
  'chart-outline': "Chart Palette",
  muted: "Muted Content",
  'muted-foreground': "Muted Content",
  border: "Structural",
};

// Define role pairs (same as brandguide)
const rolePairs: Partial<Record<Role, Role>> = {
  background: 'foreground',
  primary: 'primary-foreground',
  secondary: 'secondary-foreground',
  accent: 'accent-foreground',
  card: 'card-foreground',
  popover: 'popover-foreground',
  destructive: 'destructive-foreground',
  success: 'success-foreground',
  muted: 'muted-foreground',
  input: 'input-foreground',
  "sidebar": "sidebar-foreground",
  "sidebar-primary": "sidebar-primary-foreground",
  "sidebar-accent": "sidebar-accent-foreground",
};

const rolePairDescriptions: Partial<Record<Role, string>> = {
  background: 'Defines the primary background and text color for the entire application.',
  primary: 'Used for the most important interactive elements, such as main call-to-action buttons.',
  secondary: 'Provides an alternative for less critical interactive elements.',
  accent: 'Highlights secondary information or actions, often used for links and icons.',
  card: 'Sets the background and text color for card-like container components.',
  popover: 'Specifies the look of temporary pop-up elements like menus and dialogs.',
  destructive: 'Reserved for actions that result in data loss or other significant changes.',
  success: 'Indicates a successful operation or positive status.',
  muted: 'For de-emphasized content or text that should be less prominent.',
  input: 'Defines the appearance of text input fields.',
  sidebar: 'Sidebar background and foreground colors.',
  "sidebar-primary": 'Primary sidebar interactive elements.',
  "sidebar-accent": 'Accent sidebar interactive elements.',
};

interface ProcessedColorToken extends EnrichedColorToken {
  effectiveInfluence: number;
  importanceSummary: string;
  topRoles: Role[];
}

interface RoleColorAssignment {
  role: Role;
  assignedColor: ProcessedColorToken | null;
  colorHex: string | null;
  influence: number;
  category: string;
  subCategory: string;
}

interface RoleGroup {
  type: 'group';
  subCategoryName: string;
  description: string | null;
  roles: RoleColorAssignment[];
}

interface ColorsTabProps {
  activeThemeKey: string;
  isPageDarkMode: boolean;
}

type ViewMode = "colors-by-role" | "roles-by-color";

export function ColorsTab({ activeThemeKey, isPageDarkMode }: ColorsTabProps) {
  const { 
    brand, 
    processedBrand, 
    previewColorUpdate, 
    commitColorUpdate, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    handleRoleSwatchSelection,
    handleRoleDirectColorChange,
    previewRoleDirectColorChange
  } = useBrand();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("colors-by-role");
  const [pickerStates, setPickerStates] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  const debounceTimersRef = useRef<Record<string, NodeJS.Timeout>>({});
  const isPickerUpdateSourceRef = useRef<Record<string, boolean>>({});

  // Generate processed colors with additional metadata
  const processedColors = useMemo(() => {
    if (!processedBrand?.colors) return [];
    
    return processedBrand.colors.map((color): ProcessedColorToken => {
      const roles = color.roles || [];
      const maxInfluence = Math.max(...roles.map(role => influenceHierarchy[role as Role] || 0));
      const topRoles = roles.filter(role => (influenceHierarchy[role as Role] || 0) === maxInfluence) as Role[];
      
      let importanceSummary = "General";
      if (topRoles.includes("primary")) importanceSummary = "Primary";
      else if (topRoles.includes("background")) importanceSummary = "Background";
      else if (topRoles.includes("foreground")) importanceSummary = "Foreground";
      else if (topRoles.includes("secondary")) importanceSummary = "Secondary";
      else if (topRoles.includes("accent")) importanceSummary = "Accent";
      else if (topRoles.includes("destructive")) importanceSummary = "Destructive";
      else if (topRoles.includes("border")) importanceSummary = "Border";
      else if (topRoles.includes("muted")) importanceSummary = "Muted";
      else if (topRoles.includes("input")) importanceSummary = "Input";
      else if (topRoles.includes("popover")) importanceSummary = "Popover";
      else if (topRoles.includes("card")) importanceSummary = "Card";
      
      return {
        ...color,
        effectiveInfluence: maxInfluence,
        importanceSummary,
        topRoles
      };
    }).sort((a, b) => b.effectiveInfluence - a.effectiveInfluence);
  }, [processedBrand]);

  // Create role-based view data with proper categorization and grouping
  const roleGroups = useMemo(() => {
    const allRoles = Array.from(new Set(processedColors.flatMap(color => color.roles || []))) as Role[];
    const processedRoles = new Set<Role>();
    const groups: RoleGroup[] = [];
    
    // Helper function to create role assignment data
    const createRoleAssignment = (role: Role): RoleColorAssignment => {
      const assignedColor = processedColors.find(color => color.roles?.includes(role)) || null;
      const influence = influenceHierarchy[role] || 0;
      const category = roleToCategoryMap[role] || "Default & General Use";
      const subCategory = roleToSubCategoryMap[role] || "General";
      
      return {
        role,
        assignedColor,
        colorHex: assignedColor ? formatHex(assignedColor.oklchLight as string) : null,
        influence,
        category,
        subCategory
      };
    };

    // Special handling for chart roles (group them together)
    const chartRoles = allRoles.filter(role => role.startsWith('chart-'));
    if (chartRoles.length > 0) {
      const categoryName = roleToCategoryMap[chartRoles[0]];
      const subCategoryName = roleToSubCategoryMap[chartRoles[0]];
      
      const chartRoleAssignments = chartRoles.map(createRoleAssignment);
      
      groups.push({
        type: 'group',
        subCategoryName,
        description: "The complete palette for data visualization.",
        roles: chartRoleAssignments,
      });
      
      chartRoles.forEach(role => processedRoles.add(role));
    }

    // Process remaining roles, creating pairs where possible
    allRoles.forEach(role => {
      if (processedRoles.has(role)) return;

      const categoryName = roleToCategoryMap[role] || "Default & General Use";
      const subCategoryName = roleToSubCategoryMap[role] || "General";

      const pairFgRole = rolePairs[role];
      if (pairFgRole && allRoles.includes(pairFgRole)) {
        // Create a pair group
        const bgRoleAssignment = createRoleAssignment(role);
        const fgRoleAssignment = createRoleAssignment(pairFgRole);

        groups.push({
          type: 'group',
          subCategoryName,
          description: rolePairDescriptions[role] || null,
          roles: [bgRoleAssignment, fgRoleAssignment],
        });

        processedRoles.add(role);
        processedRoles.add(pairFgRole);
      } else {
        // Create a single role group
        groups.push({
          type: 'group',
          subCategoryName,
          description: null,
          roles: [createRoleAssignment(role)],
        });
        processedRoles.add(role);
      }
    });

    // Sort role groups by category order and influence
    return groups.sort((a, b) => {
      const categoryA = a.roles[0]?.category || "Default & General Use";
      const categoryB = b.roles[0]?.category || "Default & General Use";
      
      const categoryOrderA = roleCategoriesOrder.indexOf(categoryA);
      const categoryOrderB = roleCategoriesOrder.indexOf(categoryB);
      
      if (categoryOrderA !== categoryOrderB) {
        return categoryOrderA - categoryOrderB;
      }
      
      // Then by highest influence within category
      const maxInfluenceA = Math.max(...a.roles.map(r => r.influence));
      const maxInfluenceB = Math.max(...b.roles.map(r => r.influence));
      return maxInfluenceB - maxInfluenceA;
    });
  }, [processedColors]);

  // Initialize picker states for all colors
  useEffect(() => {
    const newPickerStates: Record<string, string> = {};
    const newUpdateFlags: Record<string, boolean> = {};
    
    processedColors.forEach(color => {
      if (!pickerStates[color.name]) {
        const hexValue = formatHex(color.oklchLight as string) || '#000000';
        newPickerStates[color.name] = hexValue;
        newUpdateFlags[color.name] = false;
      }
    });
    
    setPickerStates(prev => ({ ...prev, ...newPickerStates }));
    isPickerUpdateSourceRef.current = { ...isPickerUpdateSourceRef.current, ...newUpdateFlags };
  }, [processedColors]);

  // Filter and group data based on search and view mode
  const filteredData = useMemo(() => {
    if (viewMode === "roles-by-color") {
      // Group colors by importance for "roles by color" view
      const importanceGroups: Record<string, ProcessedColorToken[]> = {};
      
      processedColors.forEach(color => {
        if (!searchTerm || 
            color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            color.roles?.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
            color.variableName.toLowerCase().includes(searchTerm.toLowerCase())) {
          const key = color.importanceSummary;
          if (!importanceGroups[key]) importanceGroups[key] = [];
          importanceGroups[key].push(color);
        }
      });
      
      return importanceGroups;
    } else {
      // Group role groups by category for "colors by role" view
      const categoryGroups: Record<string, RoleGroup[]> = {};
      
      roleGroups.forEach(roleGroup => {
        // Check if any role in the group matches search
        const matchesSearch = !searchTerm || 
          roleGroup.roles.some(roleAssignment => 
            roleAssignment.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            roleAssignment.assignedColor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            roleAssignment.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
        if (matchesSearch) {
          const category = roleGroup.roles[0]?.category || "Default & General Use";
          if (!categoryGroups[category]) categoryGroups[category] = [];
          categoryGroups[category].push(roleGroup);
        }
      });
      
      return categoryGroups;
    }
  }, [roleGroups, processedColors, searchTerm, viewMode]);

  // Expand all sections by default
  useEffect(() => {
    const allSectionKeys = Object.keys(filteredData).map(name => 
      name.toLowerCase().replace(/\s+/g, '')
    );
    setExpandedSections(new Set(allSectionKeys));
  }, [filteredData]);

  // Handle color picker changes for individual colors
  const handlePickerValueChange = (colorName: string, newRawHexValue: string) => {
    isPickerUpdateSourceRef.current[colorName] = true;
    
    try {
      const normalizedHex = formatHex(newRawHexValue);
      
      if (normalizedHex && normalizedHex !== pickerStates[colorName]) {
        setPickerStates(prev => ({ ...prev, [colorName]: normalizedHex }));
        
        // Convert hex to OKLCH
        const oklchConverter = converter('oklch');
        const colorObj = parseHex(normalizedHex);
        
        if (colorObj) {
          const converted = oklchConverter(colorObj);
          if (converted) {
            let { l = 0, c = 0, h = 0 } = converted;
            h = isNaN(h) ? 0 : h;
            
            const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;
            
            previewColorUpdate(colorName, oklchString);
            
            // Debounced commit per color
            if (debounceTimersRef.current[colorName]) {
              clearTimeout(debounceTimersRef.current[colorName]);
            }
            debounceTimersRef.current[colorName] = setTimeout(() => {
              commitColorUpdate(colorName, oklchString);
              delete debounceTimersRef.current[colorName];
            }, 500);
          }
        }
      }
    } finally {
      setTimeout(() => {
        isPickerUpdateSourceRef.current[colorName] = false;
      }, 0);
    }
  };

  // Handle adding new color swatch
  const handleSwatchAdd = (name: string, color: string) => {
    console.log('Adding new swatch:', name, color);
    // TODO: Implement actual swatch addition logic
    // This would typically involve updating the brand context with a new color
  };

  // Handle updating existing color swatch
  const handleSwatchUpdate = (oldName: string, newName: string, color: string) => {
    console.log('Updating swatch:', oldName, '->', newName, color);
    // TODO: Implement actual swatch update logic
    // This would typically involve updating the brand context
  };

  // Handle deleting color swatch
  const handleSwatchDelete = (name: string) => {
    console.log('Deleting swatch:', name);
    // TODO: Implement actual swatch deletion logic
    // This would typically involve removing from the brand context
  };

  // Sync picker states when colors change
  useEffect(() => {
    processedColors.forEach(color => {
      if (!isPickerUpdateSourceRef.current[color.name]) {
        const hexValue = formatHex(color.oklchLight as string);
        if (hexValue && hexValue !== pickerStates[color.name]) {
          setPickerStates(prev => ({ ...prev, [color.name]: hexValue }));
        }
      }
    });
  }, [processedColors, pickerStates]);

  // Generate swatches for color picker
  const swatches = useMemo(() => 
    processedColors.map(c => ({
      name: c.name,
      color: formatHex(c.oklchLight as string) || '#000000'
    })).filter(s => s.color !== '#000000'), 
    [processedColors]
  );

  // Toggle section expansion
  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  // Get icon for importance level
  const getImportanceIcon = (level: number) => {
    if (level >= 8) return <Target className="w-3 h-3 text-red-500" />;
    if (level >= 5) return <Layers className="w-3 h-3 text-amber-500" />;
    return <Hash className="w-3 h-3 text-muted-foreground" />;
  };

  // Get category icon
  const getCategoryIcon = (categoryName: string) => {
    const IconComponent = categoryIcons[categoryName] || Package;
    return <IconComponent className="w-4 h-4" />;
  };

  // Render roles by color view
  const renderRolesByColorView = () => {
    // Flatten all colors from all groups while maintaining sort order
    const allColors = Object.entries(filteredData)
      .sort(([a], [b]) => {
        // Sort groups by importance hierarchy
        const importanceOrder = ["Primary", "Background", "Foreground", "Secondary", "Accent", "Destructive", "Input", "Card", "Popover", "Border", "Muted", "General"];
        return importanceOrder.indexOf(a) - importanceOrder.indexOf(b);
      })
      .flatMap(([groupName, colors]) => colors as ProcessedColorToken[]);

    return (
      <div className="space-y-3">
        {allColors.map((color) => {
          const colorHex = pickerStates[color.name] || formatHex(color.oklchLight as string) || '#000000';
          
          return (
            <div
              key={color.name}
              className="p-3 rounded-lg border border-border/40 hover:border-border/70 transition-all duration-200 bg-card/30 hover:bg-card/50"
            >
              {/* Main Color Row */}
              <div className="flex items-center gap-3 mb-3">
                {/* Color Picker - Larger but compact */}
                <ColorPicker
                  value={colorHex}
                  onChange={(newHex) => handlePickerValueChange(color.name, newHex)}
                  className="w-10 h-10 rounded-lg border border-border/60 hover:border-border flex-shrink-0 shadow-sm hover:shadow-md transition-all"
                  swatches={swatches}
                  onSwatchAdd={handleSwatchAdd}
                  onSwatchUpdate={handleSwatchUpdate}
                  onSwatchDelete={handleSwatchDelete}
                />
                
                {/* Color Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground truncate">
                      {color.name}
                    </h4>
                    <Badge variant="outline" className="text-xs px-1.5 py-0 h-4 ml-auto">
                      {color.importanceSummary}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <code className="font-mono bg-muted/50 px-1.5 py-0.5 rounded text-xs text-muted-foreground">
                      {colorHex.toUpperCase()}
                    </code>
                    <span className="text-xs text-muted-foreground font-mono">
                      --{color.variableName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Roles Section */}
              {color.roles && color.roles.length > 0 && (
                <div className="space-y-2">
                  {/* Compact Role List */}
                  <div className="flex flex-wrap gap-1">
                    {color.roles.map((role, idx) => {
                      const roleCategory = roleToCategoryMap[role as Role] || "General";
                      const CategoryIcon = categoryIcons[roleCategory] || Package;
                      
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/20 hover:bg-muted/40 transition-colors"
                        >
                          <CategoryIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-xs font-medium text-foreground whitespace-nowrap">
                            {role.replace(/-/g, ' ')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render colors by role view
  const renderColorsByRoleView = () => {
    // Flatten all role groups from all categories while maintaining sort order
    const allRoleGroups = Object.entries(filteredData)
      .sort(([a], [b]) => {
        // Sort categories by the predefined order
        return roleCategoriesOrder.indexOf(a) - roleCategoriesOrder.indexOf(b);
      })
      .flatMap(([categoryName, roleGroups]) => roleGroups as RoleGroup[]);

    return (
      <div className="space-y-3">
        {allRoleGroups.map((roleGroup, groupIndex) => (
          <div key={`${roleGroup.subCategoryName}-${groupIndex}`} className="p-3 rounded-lg border border-border/40 hover:border-border/70 transition-all duration-200 bg-card/30 hover:bg-card/50">
            {/* Role Group Content */}
            <div className="space-y-2">
              {/* Overlapping Color Circles */}
              <div className="flex -space-x-1">
                {roleGroup.roles.map((roleAssignment, index) => {
                  const colorHex = roleAssignment.colorHex || '#666666';
                  const assignedColor = roleAssignment.assignedColor;
                  
                  return (
                    <div key={roleAssignment.role} className="relative">
                      {assignedColor ? (
                        <ColorPicker
                          value={colorHex}
                          className="w-12 h-12 rounded-full border border-border/60 shadow-sm hover:shadow-md transition-all"
                          style={{ zIndex: 10 - index }}
                          swatches={swatches}
                          onSwatchSelect={(swatch) => handleRoleSwatchSelection(roleAssignment.role, swatch.name)}
                          onDirectColorChange={(newHex) => handleRoleDirectColorChange(roleAssignment.role, newHex)}
                          onChange={(newHex) => previewRoleDirectColorChange(roleAssignment.role, newHex)}
                          onSwatchAdd={handleSwatchAdd}
                          onSwatchUpdate={handleSwatchUpdate}
                          onSwatchDelete={handleSwatchDelete}
                        />
                      ) : (
                        <div 
                          className="w-12 h-12 rounded-full border border-border/40 bg-muted flex items-center justify-center shadow-sm"
                          style={{ zIndex: 10 - index }}
                          title="No color assigned"
                        >
                          <Hash className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Role Names */}
              <div className="flex flex-wrap gap-1">
                {roleGroup.roles.map((roleAssignment) => (
                  <span
                    key={roleAssignment.role}
                    className="text-xs font-medium text-muted-foreground px-2 py-1 rounded bg-muted/20"
                  >
                    {roleAssignment.role.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Colors 
            <span className="text-sm font-normal text-muted-foreground">
              ({viewMode === "colors-by-role" ? roleGroups.length : processedColors.length})
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              className="h-8 w-8 p-0"
              title="Undo last change"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* View Mode Toggle and Search */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "colors-by-role" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("colors-by-role")}
              className="h-9 px-3 flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              Colors by Role
            </Button>
            <Button
              variant={viewMode === "roles-by-color" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("roles-by-color")}
              className="h-9 px-3 flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              Roles by Color
            </Button>
          </div>
          
          <Input
            placeholder={viewMode === "colors-by-role" ? "Search roles, colors, or categories..." : "Search colors, roles, or variables..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      {/* Content based on view mode */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {viewMode === "colors-by-role" ? renderColorsByRoleView() : renderRolesByColorView()}
      </div>
    </div>
  );
} 