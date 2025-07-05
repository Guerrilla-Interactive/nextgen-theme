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
  RotateCcw, 
  Info,
  Hash,
  Target,
  Layers,
  MousePointerClick,
  Square,
  BarChart,
  Type,
  Puzzle,
  Package
} from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";

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

export function ColorsTab({ activeThemeKey, isPageDarkMode }: ColorsTabProps) {
  const { 
    brand, 
    processedBrand, 
    undo, 
    canUndo,
    handleRoleSwatchSelection,
    handleRoleDirectColorChange,
    previewRoleDirectColorChange
  } = useBrand();

  const [searchTerm, setSearchTerm] = useState("");

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

      // Check if this role is a foreground role that should be paired
      const isStandaloneRole = !role.includes('-foreground');
      const pairFgRole = rolePairs[role];
      const pairBgRole = Object.keys(rolePairs).find(bg => rolePairs[bg as Role] === role) as Role;
      
      if (isStandaloneRole && pairFgRole && allRoles.includes(pairFgRole)) {
        // This is a background role with its foreground pair available
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
      } else if (!isStandaloneRole && pairBgRole && allRoles.includes(pairBgRole)) {
        // This is a foreground role, but its background pair will handle the grouping
        // Skip this role as it will be processed when we encounter its background pair
        return;
      } else {
        // Create a single role group for roles without pairs or unpaired roles
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

  // Filter role groups based on search
  const filteredRoleGroups = useMemo(() => {
    if (!searchTerm) return roleGroups;
    
    return roleGroups.filter(roleGroup => 
      roleGroup.roles.some(roleAssignment => 
        roleAssignment.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roleAssignment.assignedColor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roleAssignment.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [roleGroups, searchTerm]);

  // Generate swatches for color picker
  const swatches = useMemo(() => 
    processedColors.map(c => ({
      name: c.variableName,
      displayName: c.name,
      color: formatHex(c.oklchLight as string) || '#000000'
    })).filter(s => s.color !== '#000000'), 
    [processedColors]
  );

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
              ({filteredRoleGroups.length} role groups)
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

        {/* Search */}
        <Input
          placeholder="Search roles, colors, or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9"
        />
      </div>

      {/* Content - Colors by Role view only */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-5 gap-y-4">
          {filteredRoleGroups.map((roleGroup, groupIndex) => {
            // Create a more descriptive title
            const getGroupTitle = (group: RoleGroup) => {
              const subCategory = group.subCategoryName;
              const roles = group.roles.map(r => r.role);
              
              // Handle special cases for better naming
              if (subCategory === "Sidebar") {
                if (roles.includes("sidebar-primary")) return "Sidebar Primary";
                if (roles.includes("sidebar-accent")) return "Sidebar Accent";
                if (roles.includes("sidebar-border")) return "Sidebar Border";
                if (roles.includes("sidebar-ring")) return "Sidebar Ring";
                if (roles.includes("sidebar")) return "Sidebar Base";
              }
              
              if (subCategory === "Chart Palette") {
                return "Chart Colors";
              }
              
              if (subCategory === "Muted Content") {
                return "Muted Text";
              }
              
              if (subCategory === "Interaction State") {
                return "Focus Ring";
              }
              
              // For role pairs, use the primary role name
              if (roles.length === 2) {
                const primaryRole = roles.find(role => !role.includes('-foreground'));
                if (primaryRole) {
                  return primaryRole.charAt(0).toUpperCase() + primaryRole.slice(1).replace(/-/g, ' ');
                }
              }
              
              // For single roles, use the role name if different from subcategory
              if (roles.length === 1) {
                const roleName = roles[0].replace(/-/g, ' ');
                const formattedRole = roleName.charAt(0).toUpperCase() + roleName.slice(1);
                if (formattedRole.toLowerCase() !== subCategory.toLowerCase()) {
                  return formattedRole;
                }
              }
              
              return subCategory;
            };
            
            return (
            <div key={`${roleGroup.subCategoryName}-${groupIndex}`} className="p-2  rounded-lg  transition-all duration-200 bg-card/30 hover:bg-card/50 ">
              {/* Role Group Content */}
              <div className="space-y-2">
                {/* Group Title */}
                <h4 className="text-sm font-medium text-foreground opacity-60">{getGroupTitle(roleGroup)}</h4>
                
                {/* Overlapping Color Circles */}
                <div className="flex -space-x-4">
                  {roleGroup.roles.map((roleAssignment, index) => {
                    const colorHex = roleAssignment.colorHex || '#666666';
                    const assignedColor = roleAssignment.assignedColor;
                    const roleTitle = roleAssignment.role.replace(/-/g, ' ');
                    
                    return (
                      <div key={roleAssignment.role} className="relative">
                        {assignedColor ? (
                          <ColorPicker
                            value={colorHex}
                            className="w-14 h-14 rounded-full border border-border/60 shadow-sm hover:shadow-md transition-all"
                            style={{ zIndex: 10 - index }}
                            title={roleTitle}
                            swatches={swatches}
                            onSwatchSelect={(swatch) => handleRoleSwatchSelection(roleAssignment.role, swatch.name)}
                            onChange={(newHex) => previewRoleDirectColorChange(roleAssignment.role, newHex)}
                            onDirectColorChange={(newHex) => handleRoleDirectColorChange(roleAssignment.role, newHex)}
                            onSwatchAdd={handleSwatchAdd}
                            onSwatchUpdate={handleSwatchUpdate}
                            onSwatchDelete={handleSwatchDelete}
                          />
                        ) : (
                          <div 
                            className="w-14 h-14 rounded-full border border-border/40 bg-muted flex items-center justify-center shadow-sm"
                            style={{ zIndex: 10 - index }}
                            title={`${roleTitle} - No color assigned`}
                          >
                            <Hash className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 