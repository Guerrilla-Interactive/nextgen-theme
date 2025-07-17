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
  Sliders
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

// Define font role categories
const fontRoleCategoriesOrder: string[] = [
  "Text Content",
  "Headings", 
  "UI Elements"
];

// Map font roles to categories
const fontRoleToCategoryMap: Record<string, string> = {
  // Text Content
  body: "Text Content",
  p: "Text Content",
  default: "Text Content", 

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
  code: "UI Elements",
  badge: "UI Elements",
  caption: "UI Elements",
};

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

interface FontCategory {
  name: string;
  roles: FontRoleAssignment[];
  isExpanded: boolean;
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

  const [viewMode, setViewMode] = useState<"font-sizes" | "role-assignments" | "fonts">("font-sizes");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Text Content": true,
    "Headings": true,
    "UI Elements": false,
  });

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

  // Create role-based view data
  const fontCategories = useMemo(() => {
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
      const category = fontRoleToCategoryMap[role] || "UI Elements";
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
    const categorizedRoles: Record<string, FontRoleAssignment[]> = {};
    
    fontRoleCategoriesOrder.forEach(category => {
      categorizedRoles[category] = [];
    });
    
    allRoles.forEach(role => {
      const assignment = createRoleAssignment(role);
      const category = assignment.category;
      categorizedRoles[category].push(assignment);
    });
    
    const categories: FontCategory[] = fontRoleCategoriesOrder.map(categoryName => ({
      name: categoryName,
      roles: categorizedRoles[categoryName].sort((a, b) => b.influence - a.influence),
      isExpanded: expandedCategories[categoryName] || false
    }));

    return categories.filter(category => category.roles.length > 0);
  }, [processedFonts, expandedCategories, roleSizeAssignments]);

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

  // Handlers
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const updateFontSizeScale = (sizeKey: string, value: number) => {
    setFontSizeScale(prev => ({
      ...prev,
      [sizeKey]: value
    }));
  };

  const updateRoleSizeAssignment = (role: string, sizeKey: string) => {
    setRoleSizeAssignments(prev => ({
      ...prev,
      [role]: sizeKey
    }));
  };

  const handleSwatchAdd = (name: string, fontFamily: string, distributor: string, onFontCreated?: (variableName: string) => void) => {
    addNewFont(name, fontFamily, distributor, [], onFontCreated);
  };

  const handleSwatchUpdate = (oldName: string, newName: string, fontFamily: string, distributor: string) => {
    console.log('Font update functionality would need to be implemented in BrandContext');
  };

  const handleSwatchDelete = (name: string) => {
    console.log('Font deletion functionality would need to be implemented in BrandContext');
  };

  const handleFontSelection = (role: string, fontSwatch: any) => {
    handleFontRoleSwatchSelection(role, fontSwatch.displayName || fontSwatch.name);
  };

  const handleDirectFontChange = (role: string, fontFamily: string) => {
    handleFontRoleDirectChange(role, fontFamily);
  };

  const getCleanFontName = (fontFamily: string) => {
    return fontFamily?.split(',')[0].replace(/['"]/g, '').trim() || 'Inherit';
  };

  // Font Size Scale Manager Component
  const FontSizeScaleManager = () => (
    <div className="space-y-6">
      <div className="space-y-5">
        {TAILWIND_FONT_SIZES.map(({ key, label, defaultValue }) => (
          <div key={key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">{label}</Label>
                <p className="text-xs text-muted-foreground">
                  {Math.round(fontSizeScale[key] * 16)}px
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFontSizeScale(key, defaultValue)}
                className="text-xs h-7 px-2"
              >
                Reset
              </Button>
            </div>
            <FontSizeSlider
              value={fontSizeScale[key]}
              onValueChange={(value) => updateFontSizeScale(key, value)}
              compact={true}
              className="w-full"
            />
            <div 
              className="px-3 py-2 text-muted-foreground"
              style={{ fontSize: `${fontSizeScale[key]}rem` }}
            >
              Sample text
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Role Assignment Manager Component
  const RoleAssignmentManager = () => (
    <div className="space-y-4">
      {fontCategories.map((category) => {
        const isExpanded = expandedCategories[category.name];
        
        return (
          <div key={category.name} className="space-y-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="flex items-center gap-2 text-sm font-medium py-2 hover:text-foreground transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
              {category.name}
              <span className="text-xs text-muted-foreground">({category.roles.length})</span>
            </button>
            
            {isExpanded && (
              <div className="space-y-3 pl-5">
                {category.roles.map((roleAssignment) => (
                  <div key={roleAssignment.role} className="space-y-2 py-3 border-b border-border/30 last:border-0">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm capitalize">
                        {roleAssignment.role.replace(/-/g, ' ')}
                      </Label>
                      <Badge variant="outline" className="text-xs h-5">
                        {roleAssignment.assignedSize}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Font</Label>
                        <FontPicker
                          value={roleAssignment.fontFamily || ''}
                          className="w-full h-8"
                          role={roleAssignment.role}
                          swatches={fontSwatches}
                          onSwatchSelect={(swatch) => handleFontSelection(roleAssignment.role, swatch)}
                          onChange={(newFamily) => handleDirectFontChange(roleAssignment.role, newFamily)}
                          onDirectFontChange={(newFamily) => handleDirectFontChange(roleAssignment.role, newFamily)}
                          onSwatchAdd={handleSwatchAdd}
                          onSwatchUpdate={handleSwatchUpdate}
                          onSwatchDelete={handleSwatchDelete}
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Size</Label>
                        <Select
                          value={roleAssignment.assignedSize}
                          onValueChange={(value) => updateRoleSizeAssignment(roleAssignment.role, value)}
                        >
                          <SelectTrigger className="w-full h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TAILWIND_FONT_SIZES.map(({ key, label }) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Weight Selection */}
                    {roleAssignment.assignedFont && (() => {
                      const font = brand?.fonts.find(f => f.name === roleAssignment.assignedFont?.name);
                      const hasMultipleWeights = font?.weights && Object.keys(font.weights).length > 1;
                      if (!hasMultipleWeights) return null;
                      
                      const currentWeight = getFontWeightForRole(roleAssignment.assignedFont.name, roleAssignment.role);
                      const weightOptions = Object.keys(font.weights);
                      
                      return (
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Weight</Label>
                          <div className="flex gap-1 flex-wrap">
                            {weightOptions.map((weightName) => (
                              <button
                                key={weightName}
                                onClick={() => updateFontWeightAssignment(roleAssignment.assignedFont!.name, roleAssignment.role, weightName)}
                                className={cn(
                                  "px-2 py-1 text-xs rounded transition-all",
                                  currentWeight === weightName
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {weightName === 'regular' ? '400' : 
                                 weightName === 'medium' ? '500' :
                                 weightName === 'semibold' ? '600' :
                                 weightName === 'bold' ? '700' :
                                 font.weights![weightName]}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    <div 
                      className="text-sm text-foreground py-2"
                      style={{ 
                        fontFamily: roleAssignment.fontFamily || 'inherit',
                        fontSize: `${fontSizeScale[roleAssignment.assignedSize]}rem`,
                        fontWeight: roleAssignment.assignedFont ? 
                          roleAssignment.assignedFont.weights?.[getFontWeightForRole(roleAssignment.assignedFont.name, roleAssignment.role) || 'regular'] || 'normal'
                          : 'normal'
                      }}
                    >
                      {rolePreviewTexts[roleAssignment.role] || `Sample ${roleAssignment.role} text`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">Typography</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            className="h-8 px-3"
          >
            <RotateCcw className="w-3 h-3 mr-2" />
            Undo
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-1">
          <Button
            variant={viewMode === "font-sizes" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("font-sizes")}
            className="h-8 px-3 text-sm"
          >
            <Sliders className="w-3 h-3 mr-1" />
            Sizes
          </Button>
          <Button
            variant={viewMode === "role-assignments" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("role-assignments")}
            className="h-8 px-3 text-sm"
          >
            Roles
          </Button>
          <Button
            variant={viewMode === "fonts" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("fonts")}
            className="h-8 px-3 text-sm"
          >
            <Type className="w-3 h-3 mr-1" />
            Fonts
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-4">
        {viewMode === "font-sizes" && <FontSizeScaleManager />}
        {viewMode === "role-assignments" && <RoleAssignmentManager />}
        
        {viewMode === "fonts" && (
          <div className="space-y-4">
            {processedFonts.map((font) => (
              <div key={font.name} className="py-4 border-b border-border/30 last:border-0">
                <div className="mb-3">
                  <h4 className="text-base font-medium mb-1" style={{ fontFamily: font.family }}>
                    {font.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {getCleanFontName(font.family)}
                  </p>
                </div>

                <div className="mb-3 py-3" style={{ fontFamily: font.family }}>
                  <div className="text-xl mb-1">The Quick Brown Fox</div>
                  <div className="text-sm text-muted-foreground">
                    Jumps over the lazy dog 1234567890
                  </div>
                </div>

                {font.roles && font.roles.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {font.roles.map(role => (
                      <Badge key={role} variant="outline" className="text-xs h-5 capitalize">
                        {role.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 