import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useBrand, type EnrichedColorToken, type EnrichedShade, useUIContext } from "../BrandContext";
import { Button } from "@/features/unorganized-components/ui/button";
import { Input } from "@/features/unorganized-components/ui/input";
import { formatHex, converter, parseHex } from "culori";
import {
  Role,
  type OklchString,
  influenceHierarchy,
  getHighContrastTextColor
} from "../brand-utils";
import {
  Palette,
  RotateCcw,
  Info,
  Hash,
  MousePointerClick,
  Square,
  BarChart,
  Type,
  Puzzle,
  Package,
  Plus,
  PanelLeft,
  PanelTopOpen,
  TextCursorInput,
  SquareDashed,
  SquareStack
} from "lucide-react";
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/features/unorganized-utils/utils';


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




// Best-practice guidance aligned with shadcn/ui variables and components
const getRoleGuidance = (role: Role): { title: string; description: string } => {
  const pretty = (r: Role) => r.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
  const map: Partial<Record<Role, string>> = {
    primary: "Use for highest-emphasis actions (CTA buttons, primary toggles).",
    'primary-foreground': "Text/icon color placed on primary backgrounds. Ensure AA contrast with --primary.",
    secondary: "Lower-emphasis interactive elements.",
    'secondary-foreground': "Text/icon on secondary surfaces. Keep contrast high.",
    accent: "Highlights, selection states, subtle emphasis. Used by components like Checkbox/Radio for selected states.",
    'accent-foreground': "Text/icon on accent surfaces if used as backgrounds.",
    destructive: "Danger actions (delete, irreversible).",
    'destructive-foreground': "Text/icon on destructive background. Must meet contrast guidelines.",
    background: "App base background (page). Should be comfortable at scale. Many surfaces inherit from this.",
    foreground: "Default text color. Ensure readable contrast on --background.",
    card: "Elevated surfaces (cards, panels). Subtle contrast from --background.",
    'card-foreground': "Text/icon on card surfaces.",
    popover: "Floating surfaces (menus, dropdowns, tooltips).",
    'popover-foreground': "Text/icon on popover surfaces.",
    input: "Form fields and input borders. Keep neutral and accessible.",
    'input-foreground': "Text/icon inside inputs.",
    muted: "Low-emphasis text and UI (placeholders, captions).",
    'muted-foreground': "Text on muted surfaces.",
    border: "Dividers, outlines, and component borders.",
    ring: "Focus rings and keyboard focus indicators. Ensure visible on both light/dark.",
    'tooltip-background': "Tooltip surface color when used.",
  };
  return {
    title: pretty(role),
    description: map[role] ?? `${pretty(role)} role maps directly to the shadcn/ui CSS variable --${role}.`
  };
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
}

export function ColorsTab({ activeThemeKey }: ColorsTabProps) {
  const {
    brand,
    processedBrand,
    undo,
    canUndo,
    handleRoleSwatchSelection,
    handleRoleDirectColorChange,
    previewRoleDirectColorChange,
    addNewColor,
    commitColorUpdate,
    updateColorName
  } = useBrand();

  const { selectedColorRole, setSelectedColorRole } = useUIContext();
  const { setActiveTargetKey } = useUIContext();

  // Replace search state with selected role state
  const [selectedRole, setSelectedRole] = useState<Role>('primary');

  // Listen for selected color role from UI context and update selectedRole if it's a valid color role
  useEffect(() => {
    if (selectedColorRole && selectedColorRole in roleToCategoryMap) {
      setSelectedRole(selectedColorRole as Role);
    }
  }, [selectedColorRole]);
  const [selectedSwatch, setSelectedSwatch] = useState<{ name: string; displayName?: string; color: string } | null>(null);
  const [colorName, setColorName] = useState('');
  const [livePreviewColor, setLivePreviewColor] = useState<string | null>(null);

  // Helper function to get the current color for a role directly from live brand state
  // This ensures we always have the most up-to-date color assignment
  const getCurrentColorForRole = useCallback((role: Role): string => {
    if (!brand?.colors) return '#666666';

    // Find the color that currently has this role assigned
    const assignedColor = brand.colors.find(color => color.roles?.includes(role));
    if (assignedColor?.oklch) {
      const hex = formatHex(assignedColor.oklch as string);
      if (hex) {
        return hex;
      }
    }

    return '#666666'; // Default color for unassigned roles
  }, [brand]);

  // Generate processed colors with additional metadata
  const processedColors = useMemo(() => {
    // Use brand directly if processedBrand is not available or is stale
    const sourceColors = processedBrand?.colors || brand?.colors;
    if (!sourceColors) return [];

    return sourceColors.map((color): ProcessedColorToken => {
      // Filter out invalid roles that exist in data but not in types (warning, success, info)
      const validRoles = (color.roles || []).filter(role => {
        // Only keep roles that exist in our Role type (i.e., in influenceHierarchy)
        return role in influenceHierarchy;
      }) as Role[];

      const maxInfluence = Math.max(...validRoles.map(role => influenceHierarchy[role] || 0));
      const topRoles = validRoles.filter(role => (influenceHierarchy[role] || 0) === maxInfluence);

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

      // Ensure we have the properties required for EnrichedColorToken
      const enrichedColor = {
        ...color,
        roles: validRoles, // Use filtered roles
        // Add missing EnrichedColorToken properties if using brand?.colors
        shades: ('shades' in color ? color.shades : {}) as Partial<Record<string, EnrichedShade>>,
        referrers: ('referrers' in color ? color.referrers : []) as Array<{ tokenName: string; shadeKey: string; referringToWhat: 'main' | string }>,
        sortedDisplayShades: ('sortedDisplayShades' in color ? color.sortedDisplayShades : []) as EnrichedShade[],
        tokenLevelMappedThemeVars: ('tokenLevelMappedThemeVars' in color ? color.tokenLevelMappedThemeVars : []) as string[],
      };

      return {
        ...enrichedColor,
        effectiveInfluence: maxInfluence,
        importanceSummary,
        topRoles
      };
    }).sort((a, b) => b.effectiveInfluence - a.effectiveInfluence);
  }, [processedBrand, brand]);

  // Create role-based view data with proper categorization and grouping
  const roleGroups = useMemo(() => {
    // First, collect all roles and ensure each role is only assigned to one color
    const roleToColorMap = new Map<Role, ProcessedColorToken>();
    const duplicateRoles = new Set<Role>();

    // Build role-to-color mapping and detect duplicates
    processedColors.forEach(color => {
      color.roles?.forEach(role => {
        if (roleToColorMap.has(role)) {
          // Role is assigned to multiple colors - this is a data inconsistency
          duplicateRoles.add(role);
          // Only log about critical duplicates, not all of them
          if (role.startsWith('primary') || role.startsWith('background')) {
            console.log(`[roleGroups] Critical duplicate role "${role}" found on both "${roleToColorMap.get(role)?.name}" and "${color.name}"`);
          }
        } else {
          // First assignment of this role
          roleToColorMap.set(role, color);
        }
      });
    });

    if (duplicateRoles.size > 0 && duplicateRoles.size > 5) {
      console.log(`[roleGroups] Found ${duplicateRoles.size} duplicate role assignments - this may indicate a data issue`);
    }

    // Helper function to create role assignment from the clean mapping
    const createRoleAssignment = (role: Role): RoleColorAssignment => {
      const assignedColor = roleToColorMap.get(role);
      if (!assignedColor) {
        // This is expected for some roles, so don't log unless it's critical
        return {
          role,
          assignedColor: null,
          colorHex: null,
          influence: 0,
          category: "Uncategorized",
          subCategory: "Other"
        };
      }

      const category = roleToCategoryMap[role] || "Default & General Use";
      const subCategory = roleToSubCategoryMap[role] || "Other";
      const influence = influenceHierarchy[role] || 0;

      // Calculate colorHex from the assigned color
      const colorHex = assignedColor.oklch ? formatHex(assignedColor.oklch as string) : null;

      return {
        role,
        assignedColor,
        colorHex,
        influence,
        category,
        subCategory
      };
    };

    // Get all unique roles from the deduplicated mapping
    const allRoles = Array.from(roleToColorMap.keys()) as Role[];
    const processedRoles = new Set<Role>();
    const groups: RoleGroup[] = [];

    // Sophisticated role grouping system based on semantic relationships
    interface RoleGroupDefinition {
      name: string;
      description: string;
      priority: number; // Lower number = higher priority (appears first)
      roles: Array<{
        role: Role;
        isPrimary?: boolean; // Primary role in the group (used for naming)
      }>;
      category: string;
    }

    const roleGroupDefinitions: RoleGroupDefinition[] = [
      // Primary Brand Identity (highest priority)
      {
        name: "Primary Brand",
        description: "Your main brand colors used for primary actions, buttons, and key interactive elements.",
        priority: 1,
        category: "Primary Interaction",
        roles: [
          { role: 'primary' as Role, isPrimary: true },
          { role: 'primary-foreground' as Role }
        ]
      },

      // Core Foundation
      {
        name: "Application Foundation",
        description: "The fundamental background and text colors that define your application's base appearance.",
        priority: 2,
        category: "Core Theming",
        roles: [
          { role: 'background' as Role, isPrimary: true },
          { role: 'foreground' as Role }
        ]
      },

      // Secondary Brand Identity
      {
        name: "Secondary Actions",
        description: "Alternative colors for secondary buttons and less prominent interactive elements.",
        priority: 3,
        category: "Primary Interaction",
        roles: [
          { role: 'secondary' as Role, isPrimary: true },
          { role: 'secondary-foreground' as Role }
        ]
      },

      // Accent & Highlights
      {
        name: "Accent & Highlights",
        description: "Accent colors for links, icons, and highlighting important information.",
        priority: 4,
        category: "Primary Interaction",
        roles: [
          { role: 'accent' as Role, isPrimary: true },
          { role: 'accent-foreground' as Role }
        ]
      },

      // Destructive/Error States  
      {
        name: "Destructive Actions",
        description: "Warning colors for destructive actions, errors, and critical operations requiring attention.",
        priority: 5,
        category: "Feedback & State",
        roles: [
          { role: 'destructive' as Role, isPrimary: true },
          { role: 'destructive-foreground' as Role }
        ]
      },

      // Card Components
      {
        name: "Card Surfaces",
        description: "Background and text colors for card-like container components and elevated surfaces.",
        priority: 6,
        category: "Component Surfaces",
        roles: [
          { role: 'card' as Role, isPrimary: true },
          { role: 'card-foreground' as Role }
        ]
      },

      // Input Components
      {
        name: "Form Inputs",
        description: "Colors for text input fields, form controls, and interactive form elements.",
        priority: 7,
        category: "Component Surfaces",
        roles: [
          { role: 'input' as Role, isPrimary: true },
          { role: 'input-foreground' as Role }
        ]
      },

      // Popover & Overlay Components
      {
        name: "Popovers & Menus",
        description: "Background and text colors for floating elements like menus, dropdowns, and tooltips.",
        priority: 8,
        category: "Component Surfaces",
        roles: [
          { role: 'popover' as Role, isPrimary: true },
          { role: 'popover-foreground' as Role },
          { role: 'tooltip-background' as Role }
        ]
      },

      // Muted Content & Text
      {
        name: "Muted Content",
        description: "Subdued colors for less important text, placeholders, and de-emphasized content.",
        priority: 9,
        category: "Text & Muted Content",
        roles: [
          { role: 'muted' as Role, isPrimary: true },
          { role: 'muted-foreground' as Role }
        ]
      },

      // Structural Elements
      {
        name: "Borders & Structure",
        description: "Structural colors for borders, dividers, and visual separation elements.",
        priority: 10,
        category: "Structural & Decorative",
        roles: [
          { role: 'border' as Role, isPrimary: true }
        ]
      },

      // Focus & Interaction States
      {
        name: "Focus Indicators",
        description: "Colors for focus rings, selection states, and keyboard navigation indicators.",
        priority: 11,
        category: "Feedback & State",
        roles: [
          { role: 'ring' as Role, isPrimary: true }
        ]
      },

      // Data Visualization
      {
        name: "Data Visualization",
        description: "Complete color palette for charts, graphs, and data visualization components.",
        priority: 12,
        category: "Charts & Data Visualization",
        roles: [
          { role: 'chart-1' as Role, isPrimary: true },
          { role: 'chart-2' as Role },
          { role: 'chart-3' as Role },
          { role: 'chart-4' as Role },
          { role: 'chart-5' as Role },
          { role: 'chart-outline' as Role }
        ]
      },

      // Sidebar Navigation (lowest priority)
      {
        name: "Sidebar Navigation",
        description: "Complete color scheme for sidebar navigation including base colors and interactive states.",
        priority: 13,
        category: "Component Surfaces",
        roles: [
          { role: 'sidebar' as Role, isPrimary: true },
          { role: 'sidebar-foreground' as Role },
          { role: 'sidebar-primary' as Role },
          { role: 'sidebar-primary-foreground' as Role },
          { role: 'sidebar-accent' as Role },
          { role: 'sidebar-accent-foreground' as Role },
          { role: 'sidebar-border' as Role },
          { role: 'sidebar-ring' as Role }
        ]
      }
    ];

    // Process role groups in priority order
    roleGroupDefinitions
      .sort((a, b) => a.priority - b.priority)
      .forEach(groupDef => {
        // Filter to only roles that exist in our data and haven't been processed
        const availableRoles = groupDef.roles.filter(roleInfo =>
          allRoles.includes(roleInfo.role) && !processedRoles.has(roleInfo.role)
        );

        if (availableRoles.length === 0) {
          return;
        }

        // Determine the group name and subcategory
        const primaryRole = availableRoles.find(r => r.isPrimary)?.role || availableRoles[0].role;
        const subCategory = roleToSubCategoryMap[primaryRole] || groupDef.name;

        // Create role assignments in the defined order
        const roleAssignments = availableRoles.map(roleInfo => createRoleAssignment(roleInfo.role));

        // Create the group
        groups.push({
          type: 'group',
          subCategoryName: subCategory,
          description: groupDef.description,
          roles: roleAssignments,
        });

        // Mark roles as processed
        availableRoles.forEach(roleInfo => processedRoles.add(roleInfo.role));
      });

    // Special handling for important roles that might get overshadowed by shared color assignments
    // Check for specific roles that should always have their own group if they exist but weren't grouped
    const importantSoloRoles: Role[] = ['ring', 'border', 'muted'];

    importantSoloRoles.forEach(soloRole => {
      if (allRoles.includes(soloRole) && !processedRoles.has(soloRole)) {
        const roleAssignment = createRoleAssignment(soloRole);
        const subCategory = roleToSubCategoryMap[soloRole] || "Other";

        // Get the appropriate description based on the role
        let description = `Individual role: ${soloRole.replace(/-/g, ' ')}`;
        if (soloRole === 'ring') {
          description = "Colors for focus rings, selection states, and keyboard navigation indicators.";
        } else if (soloRole === 'border') {
          description = "Structural colors for borders, dividers, and visual separation elements.";
        } else if (soloRole === 'muted') {
          description = "Subdued colors for less important text, placeholders, and de-emphasized content.";
        }

        groups.push({
          type: 'group',
          subCategoryName: subCategory,
          description: description,
          roles: [roleAssignment],
        });

        processedRoles.add(soloRole);
      }
    });

    // Handle any remaining ungrouped roles as individual groups
    const ungroupedRoles = allRoles.filter(role => !processedRoles.has(role));

    // Sort ungrouped roles by their original priority (if they were in definitions) or by influence
    const sortedUngroupedRoles = ungroupedRoles.sort((a, b) => {
      // Find original priority from definitions if exists
      const aGroupDef = roleGroupDefinitions.find(def => def.roles.some(r => r.role === a));
      const bGroupDef = roleGroupDefinitions.find(def => def.roles.some(r => r.role === b));

      const aPriority = aGroupDef?.priority || 999;
      const bPriority = bGroupDef?.priority || 999;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // Fall back to influence hierarchy
      const aInfluence = influenceHierarchy[a] || 0;
      const bInfluence = influenceHierarchy[b] || 0;
      return bInfluence - aInfluence;
    });

    // Debug logging to understand what's happening
    if (ungroupedRoles.length > 0) {
      // Check if important roles ended up ungrouped
      const importantUngrouped = ungroupedRoles.filter(role =>
        ['primary', 'secondary', 'accent', 'destructive'].includes(role)
      );
      if (importantUngrouped.length > 0) {
        console.log(`[roleGroups] WARNING: Important roles ended up ungrouped:`, importantUngrouped);
        }

      // Check specifically for chart and sidebar roles
      const chartUngrouped = ungroupedRoles.filter(role => role.startsWith('chart-'));
      const sidebarUngrouped = ungroupedRoles.filter(role => role.startsWith('sidebar'));
      if (chartUngrouped.length > 0) {
        console.log(`[roleGroups] Chart roles ungrouped:`, chartUngrouped);
      }
      if (sidebarUngrouped.length > 0) {
        console.log(`[roleGroups] Sidebar roles ungrouped:`, sidebarUngrouped);
      }
    }

    // Instead of adding ungrouped roles at the end, insert them in the correct position
    // based on their priority
    sortedUngroupedRoles.forEach(role => {
      const groupDef = roleGroupDefinitions.find(def => def.roles.some(r => r.role === role));
      const priority = groupDef?.priority || 999;

      const category = roleToCategoryMap[role] || "Default & General Use";
      const subCategory = roleToSubCategoryMap[role] || "Miscellaneous";

      const newGroup: RoleGroup = {
        type: 'group',
        subCategoryName: subCategory,
        description: `Individual role: ${role.replace(/-/g, ' ')}`,
        roles: [createRoleAssignment(role)],
      };

      // Find the correct insertion point based on priority
      let insertIndex = groups.length; // Default to end
      for (let i = 0; i < groups.length; i++) {
        // Find the group definition for the current group to get its priority
        const currentGroup = groups[i];
        const currentGroupDef = roleGroupDefinitions.find(def =>
          def.roles.some(r => currentGroup.roles.some(assignment => assignment.role === r.role))
        );
        const currentPriority = currentGroupDef?.priority || 999;

        if (priority < currentPriority) {
          insertIndex = i;
          break;
        }
      }

      groups.splice(insertIndex, 0, newGroup);
      processedRoles.add(role);
    });

    return groups;
  }, [processedColors, brand]);

  // Filter role groups based on search
  const filteredRoleGroups = useMemo(() => {
    return roleGroups;
  }, [roleGroups]);

  // Generate swatches for color picker - use original brand colors order to preserve insertion order
  // Show all colors always - no filtering based on chart roles
  const swatches = useMemo(() => {
    if (!brand?.colors) return [] as { name: string; displayName?: string; color: string }[];
    const items = brand.colors
      .map(c => {
        const hex = formatHex(c.oklch as string);
        return hex ? { name: c.variableName, displayName: c.name, color: hex } : null;
      })
      .filter(Boolean) as { name: string; displayName?: string; color: string }[];
    return items;
  }, [brand?.colors]);

  // Chart swatches are now the same as regular swatches since we show all colors
  const chartSwatches = swatches;

  // Get the currently selected role's color information
  const selectedRoleInfo = useMemo(() => {
    const roleAssignment = roleGroups
      .flatMap(group => group.roles)
      .find(assignment => assignment.role === selectedRole);

    return roleAssignment;
  }, [roleGroups, selectedRole]);

  // Get current color value for the selected role
  const currentColorValue = useMemo(() => {
    if (livePreviewColor) return livePreviewColor;
    return getCurrentColorForRole(selectedRole);
  }, [livePreviewColor, selectedRole, getCurrentColorForRole]);

  // Get current OKLCH value for the selected role (for easy copy)
  const currentOklchValue = useMemo(() => {
    const assignedColor = brand?.colors?.find(c => c.roles?.includes(selectedRole));
    return (assignedColor?.oklch as string) || 'oklch(0 0 0)';
  }, [brand, selectedRole]);

  // Initialize selectedSwatch when selectedRole changes
  useEffect(() => {
    if (selectedRoleInfo?.assignedColor) {
      const matchingSwatch = (selectedRole.startsWith('chart-') ? chartSwatches : swatches)
        .find(swatch => swatch.name === selectedRoleInfo.assignedColor?.variableName);

      if (matchingSwatch) {
        setSelectedSwatch(matchingSwatch);
        setColorName(matchingSwatch.displayName || matchingSwatch.name);
      } else {
        setSelectedSwatch(null);
        setColorName('');
      }
    } else {
      setSelectedSwatch(null);
      setColorName('');
    }
    // Reset any transient preview when role changes or role info updates
    setLivePreviewColor(null);
  }, [selectedRole, selectedRoleInfo, swatches, chartSwatches]);

  // Handle role selection (when clicking on a color circle)
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setSelectedColorRole(role);
    // Activate variable-level targeting so all matching preview elements are marked
    setActiveTargetKey(`var:color:${role}` as any);
    setLivePreviewColor(null);
  };

  // Handle swatch selection for the currently selected role
  const handleSwatchSelect = (swatch: { name: string; displayName?: string; color: string }) => {
    setSelectedSwatch(swatch);
    setColorName(swatch.displayName || swatch.name);

    // Apply the swatch to the selected role
    handleRoleSwatchSelection(selectedRole, swatch.name);
    setLivePreviewColor(null);
  };

  // Handle creating new color
  const handleCreateNew = () => {
    // Generate a default name based on current color
    const generateColorName = (hexColor: string): string => {
      const colorCount = brand?.colors?.length || 0;

      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;

      let hue = 0;
      if (diff !== 0) {
        switch (max) {
          case r: hue = ((g - b) / diff) % 6; break;
          case g: hue = (b - r) / diff + 2; break;
          case b: hue = (r - g) / diff + 4; break;
        }
      }
      hue = Math.round(hue * 60);
      if (hue < 0) hue += 360;

      let colorName = 'Gray';
      if (diff > 20) {
        if (hue >= 0 && hue < 15) colorName = 'Red';
        else if (hue >= 15 && hue < 45) colorName = 'Orange';
        else if (hue >= 45 && hue < 75) colorName = 'Yellow';
        else if (hue >= 75 && hue < 150) colorName = 'Green';
        else if (hue >= 150 && hue < 210) colorName = 'Cyan';
        else if (hue >= 210 && hue < 270) colorName = 'Blue';
        else if (hue >= 270 && hue < 330) colorName = 'Purple';
        else colorName = 'Pink';
      }

      return `${colorName} Color ${colorCount + 1}`;
    };

    const newColorName = generateColorName(currentColorValue);

    // Simply create the new color - handleSwatchAdd will handle all selection logic
    handleSwatchAdd(newColorName, currentColorValue);
  };

  // Handle color name changes
  const handleColorNameChange = (newName: string) => {
    setColorName(newName);

    if (selectedSwatch && newName.trim()) {
      // Find the color by variable name to get its current display name
      const colorToUpdate = processedColors.find(c => c.variableName === selectedSwatch.name);
      if (colorToUpdate) {
        updateColorName(colorToUpdate.name, newName.trim());
        // Update the local swatch state to reflect the new name
        setSelectedSwatch({ ...selectedSwatch, displayName: newName.trim() });
      }
    }
  };

  // Handle color picker changes
  const handleColorPickerChange = (newColor: string) => {
    setLivePreviewColor(newColor);
    previewRoleDirectColorChange(selectedRole, newColor);
  };

  // Handle hex input changes
  const handleHexInputChange = (hexValue: string) => {
    setLivePreviewColor(hexValue);
    handleRoleDirectColorChange(selectedRole, hexValue);
  };

  // Define a handler to commit hex input as actual color update
  const handleHexSubmit = (hex: string) => {
    // Find the color token assigned to this role
    const colorToken = processedColors.find(c => c.roles?.includes(selectedRole));
    if (colorToken) {
      const parsed = parseHex(hex);
      if (parsed) {
        const converted = converter('oklch')(parsed);
        if (converted) {
          let { l = 0, c = 0, h = 0 } = converted;
          h = isNaN(h) ? 0 : h;
          const oklchString: OklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
          commitColorUpdate(colorToken.name, oklchString);
        }
      }
    }
  };

  // Add state to track when we're expecting a new color to be created
  const [pendingColorAssignment, setPendingColorAssignment] = useState<{
    targetRole: Role;
    expectedColorName: string;
    createdAt: number;
  } | null>(null);

  // Handle adding new color swatch
  const handleSwatchAdd = (name: string, color: string, onColorCreated?: (variableName: string) => void) => {
    // Store the current role and expected color name for tracking
    const targetRole = selectedRole;

    // Set up pending assignment tracking
    setPendingColorAssignment({
      targetRole,
      expectedColorName: name,
      createdAt: Date.now()
    });

    // Use the brand context's addNewColor function with callback
    addNewColor(name, color, [], (newColorName) => {

      // Update the pending assignment with the actual color name
      setPendingColorAssignment(prev => prev ? {
        ...prev,
        expectedColorName: newColorName
      } : null);

      // Call the callback if provided
      if (onColorCreated) {
        onColorCreated(newColorName);
      }
    });
  };

  // Effect to handle pending color assignments when brand state updates
  useEffect(() => {
    if (!pendingColorAssignment || !brand?.colors) {
      return;
    }

    // Find the newly created color by display name
    const newlyCreatedColor = brand.colors.find(c => c.name === pendingColorAssignment.expectedColorName);

    if (newlyCreatedColor) {

      // Create the swatch object using the actual data from brand
      const newSwatch = {
        name: newlyCreatedColor.variableName,
        displayName: newlyCreatedColor.name,
        color: formatHex(newlyCreatedColor.oklch as string) || '#000000'
      };

      // Set the new color as selected swatch
      setSelectedSwatch(newSwatch);

      setColorName(newlyCreatedColor.name);

      // Now assign the new color to the target role
      handleRoleSwatchSelection(pendingColorAssignment.targetRole, newlyCreatedColor.variableName);

      // Clear the pending assignment
      setPendingColorAssignment(null);

      // Add a follow-up check to verify the assignment worked
      setTimeout(() => {
        const verificationColor = brand?.colors?.find(c => c.roles?.includes(pendingColorAssignment.targetRole));
        if (verificationColor) {
          console.log('[pendingColorAssignment effect] ✅ Role assignment successful:', {
            role: pendingColorAssignment.targetRole,
            assignedTo: verificationColor.name,
            variableName: verificationColor.variableName
          });
        } else {
          console.log('[pendingColorAssignment effect] ❌ Role assignment failed - no color assigned to role:', pendingColorAssignment.targetRole);
        }
      }, 100);

    } else {
      // Check if this assignment has been pending too long (avoid infinite waiting)
      const isStale = Date.now() - pendingColorAssignment.createdAt > 5000; // 5 seconds timeout
      if (isStale) {
        console.error('[pendingColorAssignment effect] ❌ Pending color assignment timed out for:', pendingColorAssignment.expectedColorName);
        console.log('[pendingColorAssignment effect] Available colors:', brand.colors.map(c => c.name));
        setPendingColorAssignment(null);
      } else {
        console.log('[pendingColorAssignment effect] Color not found yet, waiting for brand state to update...');
      }
    }
  }, [brand, pendingColorAssignment, handleRoleSwatchSelection]);

  // Debug effect to track brand changes and role assignments
  useEffect(() => {
    if (brand?.colors) {
      console.log('[brand effect] Brand colors updated, count:', brand.colors.length);
      console.log('[brand effect] Role assignments for current selectedRole (' + selectedRole + '):');

      const assignedColor = brand.colors.find(c => c.roles?.includes(selectedRole));
      if (assignedColor) {
        console.log('[brand effect] Current role assignment:', {
          role: selectedRole,
          assignedTo: assignedColor.name,
          variableName: assignedColor.variableName,
          color: formatHex(assignedColor.oklch as string)
        });
      } else {
        console.log('[brand effect] Role', selectedRole, 'is not assigned to any color');
      }
    }
  }, [brand, selectedRole]);

  // Handle updating existing color swatch
  const handleSwatchUpdate = (variableName: string, newName: string, color: string) => {
    // Find the color by variable name
    const colorToUpdate = processedColors.find(c => c.variableName === variableName);
    if (colorToUpdate) {
      // Only update the color value if it's different from current
      const currentHex = formatHex(colorToUpdate.oklch as string);
      if (currentHex !== color) {
        // Convert hex to OKLCH and commit the change
        const oklchConverter = converter('oklch');
        const colorObj = parseHex(color);

        if (colorObj) {
          const converted = oklchConverter(colorObj);
          if (converted) {
            let { l = 0, c = 0, h = 0 } = converted;
            h = isNaN(h) ? 0 : h;

            const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
            commitColorUpdate(colorToUpdate.name, oklchString);
          }
        }
      }

      // Only update the name if it's different from current and provided
      if (newName && newName.trim() !== colorToUpdate.name) {
        updateColorName(colorToUpdate.name, newName.trim());
      }
    }
  };

  // Handle deleting color swatch
  const handleSwatchDelete = (name: string) => {
    // Find the color by variable name
    const colorToDelete = processedColors.find(c => c.variableName === name);
    if (colorToDelete) {
      // For now, we'll just log this since we don't have a delete function in the brand context
      // In a full implementation, you'd want to add a deleteColor function to the brand context
      console.log('Color deletion not yet implemented in brand context');
    }
  };

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme selected</p>
      </div>
    );
  }

  const currentSwatches = selectedRole.startsWith('chart-') ? chartSwatches : swatches;

  // Derive selected variable details for the info panel
  const roleGuidance = getRoleGuidance(selectedRole);

  // Resolve an icon for a given role (used for swatch and title)
  const getRoleIconForRole = (role: Role) => {
    const baseRole = (role as string).replace(/-foreground$/, '') as Role;
    if (baseRole.startsWith('sidebar')) {
      return <PanelLeft className="w-4 h-4" aria-hidden="true" />;
    }
    if (baseRole === 'border') {
      return <SquareDashed className="w-4 h-4" aria-hidden="true" />;
    }
    if (baseRole === 'card') {
      return <SquareStack className="w-4 h-4" aria-hidden="true" />;
    }
    if (baseRole === 'input') {
      return <TextCursorInput className="w-4 h-4" aria-hidden="true" />;
    }
    if (baseRole === 'popover' || baseRole === 'tooltip-background') {
      return <PanelTopOpen className="w-4 h-4" aria-hidden="true" />;
    }
    const category = roleToCategoryMap[baseRole as Role] || "Default & General Use";
    const Icon = categoryIcons[category] || Package;
    return <Icon className="w-4 h-4" aria-hidden="true" />;
  };

  return (
    <div className="space-y-6 h-full  flex flex-col">
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
              type="button"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Selected Color summary panel */}
      <div className="space-y-4">
        {/* Large color preview strip */}
        <div
          className="w-full h-20 rounded-md border border-border shadow-sm"
          style={{ backgroundColor: currentColorValue }}
          aria-label={`Selected ${selectedRole} color ${currentColorValue}`}
        />

        {/* Two-column: circle + variable/best practice */}
        <div className="grid grid-cols-[auto] md:grid-cols-[auto_1fr] gap-4 items-center">
          {/* Left: circular sample matching variable style */}
          <div className="flex items-center">
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "w-16 h-16 rounded-full border border-border/60 shadow-sm",
                  "ring-offset-background",
                )}
                style={{ backgroundColor: currentColorValue }}
                role="img"
                aria-label={`Color sample for ${selectedRole}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span style={{ color: getHighContrastTextColor(currentColorValue) }}>
                  {getRoleIconForRole(selectedRole)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: variable name and best practice guidance */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="text-muted-foreground">
                {getRoleIconForRole(selectedRole)}
              </span>
              {roleGuidance.title}
            </div>
            <p className="text-sm text-muted-foreground">{roleGuidance.description}</p>
          </div>
        </div>
      </div>

      {/* Color Selector */}
      <div className="space-y-4">
        <div className="space-y-4">
          <HexColorPicker
            className="!w-full !h-auto aspect-[16/10]"
            color={currentColorValue}
            onChange={handleColorPickerChange}
          />

          {currentSwatches && currentSwatches.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Theme Colors</p>
              <div className="flex flex-wrap gap-2">
                {currentSwatches.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    title={`Assign to ${swatch.displayName || swatch.name}`}
                    className={cn(
                      "h-6 w-6 cursor-pointer rounded-md border transition-all hover:ring-1 hover:ring-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                      selectedSwatch?.name === swatch.name ? "border-2 border-ring" : "border-border/50"
                    )}
                    style={{ backgroundColor: swatch.color }}
                    onClick={() => handleSwatchSelect(swatch)}
                  />
                ))}

                <button
                  type="button"
                  title="Add new color"
                  className={cn(
                    "h-6 w-6 cursor-pointer rounded-md border border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-all hover:ring-1 hover:ring-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center"
                  )}
                  onClick={handleCreateNew}
                >
                  <Plus className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-end space-x-4">
            {selectedSwatch && (
              <div className="flex-1">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {selectedSwatch?.name.includes('Color ') ? 'Rename Color' : 'Color Name'}
                </p>
                <Input
                  className="h-8 px-3 py-1 text-sm"
                  placeholder="Enter color name..."
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  onBlur={() => handleColorNameChange(colorName)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleColorNameChange(colorName);
                      e.currentTarget.blur();
                    }
                  }}
                />
              </div>
            )}
            <div className="flex-1">
              <p className="mb-2 text-xs font-medium text-muted-foreground">OKLCH Value</p>
              <Input
                className="h-8 px-3 py-1 text-sm font-mono"
                value={currentOklchValue}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content - Colors by Role (Variables) */}
      <div className="flex-1 overflow-y-auto border-t pt-4">
        <div className="flex flex-wrap gap-5 gap-y-4">
          {filteredRoleGroups.map((roleGroup, groupIndex) => {
            // Create a more descriptive title
            const getGroupTitle = (group: RoleGroup) => {
              const subCategory = group.subCategoryName;
              const roles = group.roles.map(r => r.role);

              // Handle special cases for better naming
              if (subCategory === "Sidebar") {
                // Keep all sidebar roles under one unified title
                return "Sidebar Navigation";
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

            // Choose an icon based on the group's category inferred from its roles
            const getGroupIcon = (group: RoleGroup) => {
              const roles = group.roles.map(r => (r.role as string).replace(/-foreground$/, '') as Role);
              // Specific overrides first
              if (roles.some(r => r.startsWith('sidebar'))) {
                return <PanelLeft className="w-4 h-4 text-muted-foreground" aria-hidden="true" />;
              }
              if (roles.includes('border')) {
                return <SquareDashed className="w-4 h-4 text-muted-foreground" aria-hidden="true" />;
              }
              if (roles.includes('card') || group.subCategoryName === 'Card') {
                return <SquareStack className="w-4 h-4 text-muted-foreground" aria-hidden="true" />;
              }
              if (roles.includes('input') || group.subCategoryName === 'Input') {
                return <TextCursorInput className="w-4 h-4 text-muted-foreground" aria-hidden="true" />;
              }
              if (roles.includes('popover') || group.subCategoryName === 'Popover') {
                return <PanelTopOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />;
              }
              const categories = roles
                .map(r => roleToCategoryMap[r])
                .filter((c): c is string => Boolean(c));
              const category = categories[0] || "Default & General Use";
              const Icon = categoryIcons[category] || Package;
              return <Icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />;
            };

            return (
              <div key={`${roleGroup.subCategoryName}-${groupIndex}`} className="p-2  rounded-lg  transition-all duration-200 s hover:bg-card/50 ">
                {/* Role Group Content */}
                <div className="space-y-2">
                  {/* Group Title */}
                  <h4 className="!text-sm font-medium text-foreground opacity-60 flex items-center gap-2">
                    {getGroupIcon(roleGroup)}
                    {getGroupTitle(roleGroup)}
                  </h4>

                  {/* Overlapping Color Circles */}
                  <div className="flex -space-x-4">
                    {roleGroup.roles.map((roleAssignment, index) => {
                      // Get the current color directly from live brand state instead of using potentially stale data
                      const colorHex = getCurrentColorForRole(roleAssignment.role);
                      const assignedColor = roleAssignment.assignedColor;
                      const roleTitle = roleAssignment.role.replace(/-/g, ' ');
                      const isSelected = selectedRole === roleAssignment.role;

                      return (
                        <div key={roleAssignment.role} className="relative">
                          {assignedColor ? (
                            <Button
                              type="button"
                              className={cn(
                                "w-14 h-14 rounded-full border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 p-0 relative",
                                isSelected && "ring-1 ring-ring ring-offset-2 ring-offset-background  shadow-lg z-20 scale-120"
                              )}
                              style={{
                                backgroundColor: colorHex,
                                zIndex: isSelected ? 20 : 10 - index
                              }}
                              title={`${roleTitle} - Click to edit`}
                              onClick={() => handleRoleSelect(roleAssignment.role)}
                              variant="outline"
                            >
                              <div className="h-full w-full" />
                              {isSelected && (
                                <div className="absolute inset-0 rounded-full border-2 border-white/80 dark:border-black/80" />
                              )}
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              className={cn(
                                "w-14 h-14 rounded-full border border-border/40 bg-muted shadow-sm hover:shadow-md transition-all duration-200 p-0 relative",
                                isSelected && "ring-4 ring-ring ring-offset-4 ring-offset-background scale-110 shadow-lg z-20"
                              )}
                              style={{ zIndex: isSelected ? 20 : 10 - index }}
                              title={`${roleTitle} - No color assigned, click to edit`}
                              onClick={() => handleRoleSelect(roleAssignment.role)}
                              variant="outline"
                            >
                              <Hash className="w-4 h-4 text-muted-foreground" />
                              {isSelected && (
                                <div className="absolute inset-0 rounded-full border-2 border-ring/60" />
                              )}
                            </Button>
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