import React, { useEffect, useMemo, useRef, useState } from "react";
import { useBrand } from "../BrandContext";
import { FontPicker } from "../../brand-fonts/FontPicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Button } from "@/features/unorganized-components/ui/button";
import { Input } from "@/features/unorganized-components/ui/input";
import { Label } from "@/features/unorganized-components/ui/label";
import { FontSizeSlider } from "@/features/unorganized-components/ui/font-size-slider";
import { 
  Type, 
  RotateCcw, 
  ChevronRight,
  ChevronDown,
  Sliders,
  Hash,
  Plus
} from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";
import type { FontToken } from "../brand-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/unorganized-components/ui/select";

// Tailwind font size scale - this is what users will modify
const TAILWIND_FONT_SIZES = [
  { key: 'text-xs', label: 'XS', defaultValue: 0.75 },
  { key: 'text-sm', label: 'SM', defaultValue: 0.875 },
  { key: 'text-base', label: 'Base', defaultValue: 1 },
  { key: 'text-lg', label: 'LG', defaultValue: 1.125 },
  { key: 'text-xl', label: 'XL', defaultValue: 1.25 },
  { key: 'text-2xl', label: '2XL', defaultValue: 1.5 },
  { key: 'text-3xl', label: '3XL', defaultValue: 1.875 },
  { key: 'text-4xl', label: '4XL', defaultValue: 2.25 },
  { key: 'text-5xl', label: '5XL', defaultValue: 3 },
  { key: 'text-6xl', label: '6XL', defaultValue: 3.75 }
];

// Define font role categories and their display order
const fontRoleCategoriesOrder: string[] = [
  "Content Text",
  "Headings", 
  "UI Elements",
  "Special Purpose"
];

// Map font roles to categories
const fontRoleToCategoryMap: Record<string, string> = {
  // Content Text
  body: "Content Text",
  p: "Content Text",
  default: "Content Text",
  sans: "Content Text",

  // Headings
  h1: "Headings",
  h2: "Headings", 
  h3: "Headings",
  h4: "Headings",
  h5: "Headings",
  h6: "Headings",
  heading: "Headings",
  display: "Headings",

  // UI Elements
  button: "UI Elements",
  label: "UI Elements",
  input: "UI Elements",
  badge: "UI Elements",
  caption: "UI Elements",

  // Special Purpose
  code: "Special Purpose",
  mono: "Special Purpose",
  serif: "Special Purpose",
};

// Font role group definitions
interface FontRoleGroupDefinition {
  name: string;
  description: string;
  priority: number;
  roles: Array<{
    role: string;
    isPrimary?: boolean;
  }>;
  category: string;
}

const fontRoleGroupDefinitions: FontRoleGroupDefinition[] = [
  {
    name: "Headings",
    description: "All heading styles from large display text to smaller subheadings used throughout your application.",
    priority: 1,
    category: "Headings",
    roles: [
      { role: 'h1', isPrimary: true },
      { role: 'h2' },
      { role: 'h3' },
      { role: 'h4' },
      { role: 'h5' },
      { role: 'h6' },
      { role: 'heading' },
      { role: 'display' }
    ]
  },
  {
    name: "Body Text",
    description: "Main content text used throughout your application for paragraphs and readable content.",
    priority: 2,
    category: "Content Text",
    roles: [
      { role: 'body', isPrimary: true },
      { role: 'p' },
      { role: 'default' }
    ]
  },
  {
    name: "Interactive Elements",
    description: "Typography for buttons, labels, and other interactive UI components.",
    priority: 3,
    category: "UI Elements",
    roles: [
      { role: 'button', isPrimary: true },
      { role: 'label' },
      { role: 'input' }
    ]
  },
  {
    name: "Small Text",
    description: "Typography for captions, badges, and other small text elements.",
    priority: 4,
    category: "UI Elements",
    roles: [
      { role: 'caption', isPrimary: true },
      { role: 'badge' }
    ]
  },
  {
    name: "Code & Monospace",
    description: "Monospaced fonts for code blocks, technical content, and data display.",
    priority: 5,
    category: "Special Purpose",
    roles: [
      { role: 'code', isPrimary: true },
      { role: 'mono' }
    ]
  }
];

// Preview texts for each role
const rolePreviewTexts: Record<string, string> = {
  body: "This is body text for reading",
  p: "Paragraph text content",
  default: "Default text content",
  h1: "Main Heading",
  h2: "Section Heading", 
  h3: "Subsection Heading",
  h4: "Minor Heading",
  h5: "Small Heading",
  h6: "Smallest Heading",
  heading: "General Heading",
  display: "Display Text",
  button: "Button",
  label: "Label",
  input: "Input text",
  code: "code text",
  badge: "Badge",
  caption: "Caption text",
  sans: "Sans Serif",
  serif: "Serif",
  mono: "Monospace",
};

interface ProcessedFontToken extends FontToken {
  effectiveInfluence: number;
  importanceSummary: string;
  topRoles: string[];
}

interface FontRoleAssignment {
  role: string;
  assignedFont: ProcessedFontToken | null;
  fontFamily: string | null;
  influence: number;
  category: string;
  assignedSize: string;
}

interface FontRoleGroup {
  type: 'group';
  subCategoryName: string;
  description: string;
  roles: FontRoleAssignment[];
}

interface TypographyTabProps {
  activeThemeKey: string;
}

export function TypographyTab({ activeThemeKey }: TypographyTabProps) {
  const { 
    brand, 
    processedBrand, 
    undo, 
    canUndo,
    updateFontRoleAssignment,
    handleFontRoleSwatchSelection,
    handleFontRoleDirectChange,
    addNewFont,
    updateFontWeightAssignment,
    getFontWeightForRole,
    updateFontSizeAssignment,
    getFontSizeForRole
  } = useBrand();

  const [selectedRole, setSelectedRole] = useState<string>('h1');
  const [selectedFont, setSelectedFont] = useState<{ name: string; displayName?: string; family: string } | null>(null);
  const [fontName, setFontName] = useState('');

  // State for Tailwind font size scale
  const [fontSizeScale, setFontSizeScale] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TAILWIND_FONT_SIZES.forEach(size => {
      initial[size.key] = size.defaultValue;
    });
    return initial;
  });

  // State for role to size assignments
  const [roleSizeAssignments, setRoleSizeAssignments] = useState<Record<string, string>>({
    body: 'text-base',
    p: 'text-base',
    default: 'text-base',
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    display: 'text-5xl',
    code: 'text-sm',
    button: 'text-sm',
    caption: 'text-xs',
    badge: 'text-xs',
  });

  // Generate processed fonts
  const processedFonts = useMemo(() => {
    if (!processedBrand?.fonts && !brand?.fonts) return [];
    
    const fonts = processedBrand?.fonts || brand?.fonts || [];
    
    return fonts.map((font): ProcessedFontToken => {
      const roleInfluences = (font.roles || []).map(role => {
        if (role.includes('heading') || role.includes('display')) return 100;
        if (role.includes('body') || role.includes('text')) return 80;
        if (role.includes('button') || role.includes('label')) return 60;
        return 40;
      });
      
      const maxInfluence = Math.max(...roleInfluences, 0);
      const topRoles = (font.roles || []).filter((role, index) => roleInfluences[index] === maxInfluence);
      
      let importanceSummary = "General";
      if (topRoles.some(role => role.includes('heading'))) importanceSummary = "Heading";
      else if (topRoles.some(role => role.includes('body'))) importanceSummary = "Body";
      
      return {
        ...font,
        effectiveInfluence: maxInfluence,
        importanceSummary,
        topRoles
      };
    }).sort((a, b) => b.effectiveInfluence - a.effectiveInfluence);
  }, [processedBrand, brand]);

  // Create role-based view data with proper categorization and grouping
  const fontRoleGroups = useMemo(() => {
    // Build role-to-font mapping
    const roleToFontMap = new Map<string, ProcessedFontToken>();
    
    processedFonts.forEach(font => {
      font.roles?.forEach(role => {
        if (!roleToFontMap.has(role)) {
          roleToFontMap.set(role, font);
        }
      });
    });
    
    const createRoleAssignment = (role: string): FontRoleAssignment => {
      const assignedFont = roleToFontMap.get(role);
      const category = fontRoleToCategoryMap[role] || "Special Purpose";
      const influence = assignedFont?.effectiveInfluence || 0;
      const assignedSize = roleSizeAssignments[role] || 'text-base';
      
      return {
        role,
        assignedFont,
        fontFamily: assignedFont?.family || null,
        influence,
        category,
        assignedSize
      };
    };

    const allRoles = Array.from(roleToFontMap.keys());
    const processedRoles = new Set<string>();
    const groups: FontRoleGroup[] = [];

    // Process role groups in priority order
    fontRoleGroupDefinitions
      .sort((a, b) => a.priority - b.priority)
      .forEach(groupDef => {
        const availableRoles = groupDef.roles.filter(roleInfo => 
          allRoles.includes(roleInfo.role) && !processedRoles.has(roleInfo.role)
        );

        if (availableRoles.length === 0) {
          return;
        }

        const primaryRole = availableRoles.find(r => r.isPrimary)?.role || availableRoles[0].role;
        const subCategory = groupDef.name;

        const roleAssignments = availableRoles.map(roleInfo => createRoleAssignment(roleInfo.role));

        groups.push({
          type: 'group',
          subCategoryName: subCategory,
          description: groupDef.description,
          roles: roleAssignments,
        });

        availableRoles.forEach(roleInfo => processedRoles.add(roleInfo.role));
      });

    // Handle any remaining ungrouped roles
    const ungroupedRoles = allRoles.filter(role => !processedRoles.has(role));
    ungroupedRoles.forEach(role => {
      const category = fontRoleToCategoryMap[role] || "Special Purpose";
      
      groups.push({
        type: 'group',
        subCategoryName: role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' '),
        description: `Individual role: ${role.replace(/-/g, ' ')}`,
        roles: [createRoleAssignment(role)],
      });
    });

    return groups;
  }, [processedFonts, roleSizeAssignments]);

  // Generate font swatches
  const fontSwatches = useMemo(() => 
    brand?.fonts?.map(f => ({
      name: f.name.toLowerCase().replace(/\s+/g, '-'),
      displayName: f.name,
      family: f.family,
      distributor: f.distributor,
      weights: f.weights
    })) || [], 
    [brand]
  );

  // Initialize font weight assignments when brand loads
  useEffect(() => {
    if (!brand?.fonts) return;
    
    console.log('[TypographyTab] Initializing font weight assignments...');
    
    // For each font, ensure all its roles have weight assignments
    brand.fonts.forEach(font => {
      if (!font.roles || !font.weights) return;
      
      font.roles.forEach(role => {
        const currentWeight = getFontWeightForRole(font.name, role);
        console.log(`[TypographyTab] Role "${role}" in font "${font.name}": currentWeight = ${currentWeight}`);
        
        // If no weight is assigned to this role, assign a default
        if (!currentWeight) {
          let defaultWeight = 'regular';
          
          // Choose appropriate default weight based on role
          if (role.includes('h') || role === 'heading' || role === 'display') {
            // For headings, prefer semibold > bold > medium > regular
            if (font.weights['semibold']) defaultWeight = 'semibold';
            else if (font.weights['bold']) defaultWeight = 'bold';
            else if (font.weights['medium']) defaultWeight = 'medium';
            else if (font.weights['regular']) defaultWeight = 'regular';
            else defaultWeight = Object.keys(font.weights)[0]; // First available
          } else {
            // For body text, prefer regular > medium
            if (font.weights['regular']) defaultWeight = 'regular';
            else if (font.weights['medium']) defaultWeight = 'medium';
            else defaultWeight = Object.keys(font.weights)[0]; // First available
          }
          
          console.log(`[TypographyTab] Assigning default weight "${defaultWeight}" to role "${role}" for font "${font.name}"`);
          updateFontWeightAssignment(font.name, role, defaultWeight);
        }
      });
    });
  }, [brand, getFontWeightForRole, updateFontWeightAssignment]);

  // Initialize state from brand context when available
  useEffect(() => {
    if (brand?.fonts) {
      // Initialize font size scale from brand font sizes
      const newFontSizeScale: Record<string, number> = {};
      TAILWIND_FONT_SIZES.forEach(size => {
        newFontSizeScale[size.key] = size.defaultValue;
      });
      
      // Override with actual values from brand fonts if they exist
      brand.fonts.forEach(font => {
        if (font.fontSizes) {
          Object.entries(font.fontSizes).forEach(([role, sizeValue]) => {
            // Try to find which Tailwind size this rem value corresponds to
            const matchingSize = TAILWIND_FONT_SIZES.find(s => Math.abs(s.defaultValue - sizeValue) < 0.01);
            if (matchingSize) {
              newFontSizeScale[matchingSize.key] = sizeValue;
            }
          });
        }
      });
      
      setFontSizeScale(newFontSizeScale);
      
      // Initialize role size assignments from brand context
      const newRoleAssignments: Record<string, string> = {
        body: 'text-base',
        p: 'text-base',
        default: 'text-base',
        h1: 'text-4xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
        h4: 'text-xl',
        h5: 'text-lg',
        h6: 'text-base',
        display: 'text-5xl',
        code: 'text-sm',
        button: 'text-sm',
        caption: 'text-xs',
        badge: 'text-xs',
      };
      
      // Override with actual role assignments from brand if they exist
      brand.fonts.forEach(font => {
        if (font.fontSizes) {
          Object.entries(font.fontSizes).forEach(([role, sizeValue]) => {
            // Find the best matching Tailwind size key
            const matchingSize = TAILWIND_FONT_SIZES.find(s => Math.abs(s.defaultValue - sizeValue) < 0.01);
            if (matchingSize) {
              newRoleAssignments[role] = matchingSize.key;
            }
          });
        }
      });
      
      setRoleSizeAssignments(newRoleAssignments);
    }
  }, [brand]);

  // Get the currently selected role's font information
  const selectedRoleInfo = useMemo(() => {
    const roleAssignment = fontRoleGroups
      .flatMap(group => group.roles)
      .find(assignment => assignment.role === selectedRole);
    
    return roleAssignment;
  }, [fontRoleGroups, selectedRole]);

  // Initialize selectedFont when selectedRole changes
  useEffect(() => {
    if (selectedRoleInfo?.assignedFont) {
      const matchingFont = fontSwatches.find(font => font.displayName === selectedRoleInfo.assignedFont?.name);
      
      if (matchingFont) {
        setSelectedFont(matchingFont);
        setFontName(matchingFont.displayName || matchingFont.name);
      } else {
        setSelectedFont(null);
        setFontName('');
      }
    } else {
      setSelectedFont(null);
      setFontName('');
    }
  }, [selectedRole, selectedRoleInfo, fontSwatches]);

  // Handle role selection
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  // Handle font selection
  const handleFontSelect = (font: { name: string; displayName?: string; family: string }) => {
    setSelectedFont(font);
    setFontName(font.displayName || font.name);
    
    // Apply the font to the selected role
    handleFontRoleSwatchSelection(selectedRole, font.displayName || font.name);
  };

  // Handle creating new font
  const handleCreateNewFont = () => {
    const newFontName = `Custom Font ${(brand?.fonts?.length || 0) + 1}`;
    const newFontFamily = 'Inter, system-ui, sans-serif';
    
    handleFontAdd(newFontName, newFontFamily, 'Custom');
  };

  // Handle font name changes
  const handleFontNameChange = (newName: string) => {
    setFontName(newName);
    // Note: Font renaming would need to be implemented in the brand context
  };

  // Handle adding new font
  const handleFontAdd = (name: string, fontFamily: string, distributor: string, onFontCreated?: (fontName: string) => void) => {
    addNewFont(name, fontFamily, distributor, [], onFontCreated);
  };

  // Handle weight changes
  const handleWeightChange = (weightName: string) => {
    if (selectedRoleInfo?.assignedFont) {
      updateFontWeightAssignment(selectedRoleInfo.assignedFont.name, selectedRole, weightName);
    }
  };

  // Handle size changes
  const handleSizeChange = (sizeKey: string) => {
    setRoleSizeAssignments(prev => ({
      ...prev,
      [selectedRole]: sizeKey
    }));
    
    const sizeValue = fontSizeScale[sizeKey];
    if (sizeValue && selectedRoleInfo?.assignedFont) {
      updateFontSizeAssignment(selectedRoleInfo.assignedFont.name, selectedRole, sizeValue);
    }
  };

  const updateFontSizeScale = (sizeKey: string, value: number) => {
    setFontSizeScale(prev => ({
      ...prev,
      [sizeKey]: value
    }));
    
    // Update all roles that use this size key
    Object.entries(roleSizeAssignments).forEach(([role, assignedSizeKey]) => {
      if (assignedSizeKey === sizeKey) {
        const assignedFont = processedFonts.find(font => font.roles?.includes(role));
        if (assignedFont) {
          updateFontSizeAssignment(assignedFont.name, role, value);
        }
      }
    });
  };

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme selected</p>
      </div>
    );
  }

  const currentWeight = selectedRoleInfo?.assignedFont ? getFontWeightForRole(selectedRoleInfo.assignedFont.name, selectedRole) : null;
  const currentSize = selectedRoleInfo?.assignedSize || 'text-base';

  // Ensure we have a valid current weight - fallback to 'regular' if the font has it, or first available weight
  const effectiveCurrentWeight = useMemo(() => {
    if (!selectedRoleInfo?.assignedFont?.weights) {
      console.log(`[effectiveCurrentWeight] No weights available for selected font`);
      return null;
    }
    
    const weights = selectedRoleInfo.assignedFont.weights;
    const brandWeight = getFontWeightForRole(selectedRoleInfo.assignedFont.name, selectedRole);
    
    console.log(`[effectiveCurrentWeight] Role: ${selectedRole}, Font: ${selectedRoleInfo.assignedFont.name}`);
    console.log(`[effectiveCurrentWeight] Brand weight from context: ${brandWeight}`);
    console.log(`[effectiveCurrentWeight] Available weights: ${Object.keys(weights).join(', ')}`);
    
    // If we have a weight from brand context and it exists in the font, use it
    if (brandWeight && weights[brandWeight]) {
      console.log(`[effectiveCurrentWeight] Using brand weight: ${brandWeight}`);
      return brandWeight;
    }
    
    // Otherwise, prefer 'regular' if it exists
    if (weights['regular']) {
      console.log(`[effectiveCurrentWeight] Using fallback: regular`);
      return 'regular';
    }
    
    // Fall back to the first available weight
    const firstWeight = Object.keys(weights)[0];
    console.log(`[effectiveCurrentWeight] Using first available weight: ${firstWeight}`);
    return firstWeight || null;
  }, [selectedRoleInfo, selectedRole, getFontWeightForRole]);

  return (
    <div className="space-y-6 h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography 
            <span className="text-sm font-normal text-muted-foreground">
              ({fontRoleGroups.length} role groups)
            </span>
          </h3>
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

        {/* Integrated Font Editor */}
        <div className="space-y-4">
          {/* Font Preview */}
          <div className="p-3 rounded-md bg-muted/30 border">
            <p className="text-xs text-muted-foreground mb-2">Preview</p>
            <div 
              className="text-foreground"
              style={{ 
                fontFamily: selectedFont?.family || 'inherit',
                fontSize: `${fontSizeScale[currentSize]}rem`,
                fontWeight: selectedRoleInfo?.assignedFont?.weights?.[effectiveCurrentWeight || 'regular'] || 'normal'
              }}
            >
              {rolePreviewTexts[selectedRole] || `Sample ${selectedRole} text`}
            </div>
          </div>

          {/* Font Family Selection */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Font Family</p>
            <FontPicker
              value={selectedFont?.family || ''}
              className="w-full h-9"
              role={selectedRole}
              swatches={fontSwatches}
              onSwatchSelect={handleFontSelect}
              onChange={(newFamily) => handleFontRoleDirectChange(selectedRole, newFamily)}
              onDirectFontChange={(newFamily) => handleFontRoleDirectChange(selectedRole, newFamily)}
              onSwatchAdd={handleFontAdd}
              onSwatchUpdate={() => {}}
              onSwatchDelete={() => {}}
            />
          </div>

          {/* Font Swatches */}
          {fontSwatches && fontSwatches.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Theme Fonts</p>
              <div className="grid grid-cols-2 gap-2">
                {fontSwatches.map((font) => (
                  <button
                    key={font.name}
                    type="button"
                    title={`Assign ${font.displayName} to ${selectedRole}`}
                    className={cn(
                      "h-8 px-3 text-left text-sm rounded-md border transition-all hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                      selectedFont?.name === font.name 
                        ? "border-ring ring-1 ring-ring bg-muted" 
                        : "border-border/50"
                    )}
                    style={{ fontFamily: font.family }}
                    onClick={() => handleFontSelect(font)}
                  >
                    {font.displayName}
                  </button>
                ))}
                
                {/* Add new font button */}
                <button
                  type="button"
                  title="Add new font"
                  className="h-8 px-3 text-left text-sm rounded-md border border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
                  onClick={handleCreateNewFont}
                >
                  <Plus className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Add Font</span>
                </button>
              </div>
            </div>
          )}

          {/* Font Size Selection */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Font Size</p>
            <Select value={currentSize} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-full h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TAILWIND_FONT_SIZES.map(({ key, label }) => (
                  <SelectItem key={key} value={key}>
                    {label} ({fontSizeScale[key]}rem)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Weight Selection */}
          {selectedRoleInfo?.assignedFont && selectedRoleInfo.assignedFont.weights && Object.keys(selectedRoleInfo.assignedFont.weights).length > 1 && (
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Font Weight</p>
              <div className="grid grid-cols-4 gap-1">
                {Object.keys(selectedRoleInfo.assignedFont.weights).map((weightName) => (
                  <button
                    key={weightName}
                    onClick={() => handleWeightChange(weightName)}
                    className={cn(
                      "px-2 py-1 text-xs rounded transition-all",
                      effectiveCurrentWeight === weightName
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {weightName === 'regular' ? '400' : 
                     weightName === 'medium' ? '500' :
                     weightName === 'semibold' ? '600' :
                     weightName === 'bold' ? '700' :
                     selectedRoleInfo.assignedFont.weights![weightName]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content - Typography Roles */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-5 gap-y-4">
          {fontRoleGroups.map((roleGroup, groupIndex) => (
            <div key={`${roleGroup.subCategoryName}-${groupIndex}`} className="p-2 rounded-lg transition-all duration-200 hover:bg-card/50">
              <div className="space-y-2">
                {/* Group Title */}
                <h4 className="text-sm font-medium text-foreground opacity-60">{roleGroup.subCategoryName}</h4>
                
                {/* Overlapping Role Circles */}
                <div className="flex -space-x-4">
                  {roleGroup.roles.map((roleAssignment, index) => {
                    const isSelected = selectedRole === roleAssignment.role;
                    const roleTitle = roleAssignment.role.replace(/-/g, ' ');
                    
                    // Get the current weight for this role
                    const currentRoleWeight = roleAssignment.assignedFont ? 
                      getFontWeightForRole(roleAssignment.assignedFont.name, roleAssignment.role) : null;
                    
                    // Get effective weight with fallbacks
                    const getEffectiveWeight = () => {
                      if (!roleAssignment.assignedFont?.weights) return 'normal';
                      
                      const weights = roleAssignment.assignedFont.weights;
                      
                      // If we have a weight from brand context and it exists in the font, use it
                      if (currentRoleWeight && weights[currentRoleWeight]) {
                        return weights[currentRoleWeight];
                      }
                      
                      // Otherwise, prefer 'regular' if it exists
                      if (weights['regular']) {
                        return weights['regular'];
                      }
                      
                      // Fall back to the first available weight
                      const firstWeight = Object.keys(weights)[0];
                      return weights[firstWeight] || 'normal';
                    };
                    
                    const weightValue = getEffectiveWeight();
                    
                    return (
                      <div key={roleAssignment.role} className="relative">
                        {roleAssignment.assignedFont ? (
                          <Button
                            className={cn(
                              "w-14 h-14 rounded-full border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 p-0 relative text-xs leading-tight",
                              isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl z-20 scale-110 border-primary/50"
                            )}
                            style={{ 
                              fontFamily: roleAssignment.fontFamily || 'inherit',
                              fontWeight: weightValue,
                              zIndex: isSelected ? 20 : 10 - index 
                            }}
                            title={`${roleTitle} - ${roleAssignment.assignedFont.name} (${currentRoleWeight || 'default'}) - Click to edit`}
                            onClick={() => handleRoleSelect(roleAssignment.role)}
                            variant="outline"
                          >
                            <div className="flex flex-col items-center justify-center h-full w-full px-1">
                              <span className={cn(
                                "text-[10px] font-medium truncate w-full text-center",
                                isSelected && "text-primary font-bold"
                              )}
                              style={{ fontWeight: weightValue }}
                              >
                                {roleAssignment.role === 'h1' ? 'H1' :
                                 roleAssignment.role === 'h2' ? 'H2' :
                                 roleAssignment.role === 'h3' ? 'H3' :
                                 roleAssignment.role === 'h4' ? 'H4' :
                                 roleAssignment.role === 'h5' ? 'H5' :
                                 roleAssignment.role === 'h6' ? 'H6' :
                                 roleAssignment.role === 'body' ? 'Abc' :
                                 roleAssignment.role === 'code' ? '</>' :
                                 roleAssignment.role.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
                            )}
                          </Button>
                        ) : (
                          <Button
                            className={cn(
                              "w-14 h-14 rounded-full border border-border/40 bg-muted shadow-sm hover:shadow-md transition-all duration-200 p-0 relative",
                              isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl z-20 scale-110 border-primary/50 bg-primary/10"
                            )}
                            style={{ zIndex: isSelected ? 20 : 10 - index }}
                            title={`${roleTitle} - No font assigned, click to edit`}
                            onClick={() => handleRoleSelect(roleAssignment.role)}
                            variant="outline"
                          >
                            <Hash className={cn(
                              "w-4 h-4 text-muted-foreground",
                              isSelected && "text-primary"
                            )} />
                            {isSelected && (
                              <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
                            )}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 