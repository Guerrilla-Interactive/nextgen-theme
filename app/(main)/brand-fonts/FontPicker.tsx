"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Input } from "@/features/unorganized-components/ui/input";
import { Label } from "@/features/unorganized-components/ui/label";
import { Card, CardContent } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/unorganized-components/ui/popover";
import {
  Type,
  Plus,
  Search,
  Download,
  X,
  Check,
  ChevronDown,
  Eye,
  Trash2,
  Edit3
} from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";

interface FontSwatch {
  family: string; // Font family CSS value
  name: string; // Variable name for matching
  displayName?: string; // Display name for UI
  distributor?: string; // Google Fonts, System, etc.
  weights?: Record<string, number>;
}

interface FontPickerProps {
  value: string; // Current font family
  onChange: (value: string) => void;
  onBlur?: () => void;
  swatches?: FontSwatch[];
  onSwatchAdd?: (name: string, fontFamily: string, distributor: string, onFontCreated?: (variableName: string) => void) => void;
  onSwatchUpdate?: (oldName: string, newName: string, fontFamily: string, distributor: string) => void;
  onSwatchDelete?: (name: string) => void;
  onSwatchSelect?: (swatch: FontSwatch) => void;
  onDirectFontChange?: (fontFamily: string) => void;
  role?: string; // Add role prop to show which role is being edited
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

// Popular Google Fonts for quick selection
const POPULAR_GOOGLE_FONTS = [
  { name: "Inter", family: "Inter, sans-serif" },
  { name: "Roboto", family: "Roboto, sans-serif" },
  { name: "Open Sans", family: "'Open Sans', sans-serif" },
  { name: "Lato", family: "Lato, sans-serif" },
  { name: "Poppins", family: "Poppins, sans-serif" },
  { name: "Montserrat", family: "Montserrat, sans-serif" },
  { name: "Source Sans Pro", family: "'Source Sans Pro', sans-serif" },
  { name: "Nunito", family: "Nunito, sans-serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif" },
  { name: "Merriweather", family: "Merriweather, serif" },
  { name: "Lora", family: "Lora, serif" },
  { name: "PT Serif", family: "'PT Serif', serif" },
  { name: "Fira Code", family: "'Fira Code', monospace" },
  { name: "JetBrains Mono", family: "'JetBrains Mono', monospace" },
  { name: "Source Code Pro", family: "'Source Code Pro', monospace" },
];

// System fonts fallbacks
const SYSTEM_FONTS = [
  { name: "System UI", family: "system-ui, -apple-system, sans-serif" },
  { name: "San Francisco", family: "-apple-system, BlinkMacSystemFont, sans-serif" },
  { name: "Segoe UI", family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  { name: "Arial", family: "Arial, Helvetica, sans-serif" },
  { name: "Helvetica", family: "Helvetica, Arial, sans-serif" },
  { name: "Times New Roman", family: "'Times New Roman', Times, serif" },
  { name: "Georgia", family: "Georgia, 'Times New Roman', serif" },
  { name: "Courier New", family: "'Courier New', Courier, monospace" },
];

export function FontPicker({
  value,
  onChange,
  onBlur,
  swatches = [],
  onSwatchAdd,
  onSwatchUpdate,
  onSwatchDelete,
  onSwatchSelect,
  onDirectFontChange,
  role,
  className,
  style,
  title,
  ...props
}: FontPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'swatches' | 'google' | 'system' | 'custom'>('swatches');
  const [newFontName, setNewFontName] = useState("");
  const [newFontFamily, setNewFontFamily] = useState("");
  const [customFontFamily, setCustomFontFamily] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingSwatchName, setEditingSwatchName] = useState<string | null>(null);
  const [editingSwatchValue, setEditingSwatchValue] = useState("");
  const [previewText] = useState("The quick brown fox jumps over the lazy dog");

  const inputRef = useRef<HTMLInputElement>(null);

  // Get clean font name from family string
  const getCleanFontName = (fontFamily: string) => {
    return fontFamily.split(',')[0].replace(/['"]/g, '').trim();
  };

  // Get current font display name
  const getCurrentFontDisplayName = () => {
    const currentSwatch = swatches.find(s => s.family === value);
    if (currentSwatch) {
      return currentSwatch.displayName || currentSwatch.name;
    }
    return getCleanFontName(value) || 'Select Font';
  };

  // Load Google Font dynamically
  const loadGoogleFont = (fontName: string) => {
    // Remove existing font loader for this font
    document.querySelectorAll(`link[data-font-loader="${fontName}"]`).forEach(el => el.remove());

    // Add new font loader
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-font-loader', fontName);
    link.href = `https://fonts.googleapis.com/css?family=${fontName.replace(/\s+/g, '+')}:300,400,500,600,700&display=swap`;
    document.head.appendChild(link);
  };

  // Handle swatch selection
  const handleSwatchSelect = (swatch: FontSwatch) => {
    onChange(swatch.family);
    if (onSwatchSelect) {
      onSwatchSelect(swatch);
    }
    if (onDirectFontChange) {
      onDirectFontChange(swatch.family);
    }
    setIsOpen(false);
  };

  // Handle Google Font selection
  const handleGoogleFontSelect = (googleFont: { name: string; family: string }) => {
    loadGoogleFont(googleFont.name);
    onChange(googleFont.family);
    if (onDirectFontChange) {
      onDirectFontChange(googleFont.family);
    }
    setIsOpen(false);
  };

  // Handle system font selection
  const handleSystemFontSelect = (systemFont: { name: string; family: string }) => {
    onChange(systemFont.family);
    if (onDirectFontChange) {
      onDirectFontChange(systemFont.family);
    }
    setIsOpen(false);
  };

  // Handle custom font input
  const handleCustomFontSubmit = () => {
    if (customFontFamily.trim()) {
      onChange(customFontFamily.trim());
      if (onDirectFontChange) {
        onDirectFontChange(customFontFamily.trim());
      }
      setCustomFontFamily("");
      setIsOpen(false);
    }
  };

  // Handle creating new swatch
  const handleCreateNew = () => {
    const generateFontName = (fontFamily: string): string => {
      const baseName = getCleanFontName(fontFamily);
      let finalName = baseName.toLowerCase().replace(/\s+/g, '-');
      
      // Ensure uniqueness
      let counter = 1;
      while (swatches.find(s => s.name === finalName)) {
        finalName = `${baseName.toLowerCase().replace(/\s+/g, '-')}-${counter}`;
        counter++;
      }
      
      return finalName;
    };

    if (newFontName.trim() && newFontFamily.trim()) {
      const fontName = newFontName.trim();
      const fontFamily = newFontFamily.trim();
      
      if (onSwatchAdd) {
        onSwatchAdd(fontName, fontFamily, "Custom", (variableName) => {
          // Font was created successfully
        });
      }
      
      // Select the new font
      onChange(fontFamily);
      if (onDirectFontChange) {
        onDirectFontChange(fontFamily);
      }
      
      setNewFontName("");
      setNewFontFamily("");
      setIsCreatingNew(false);
      setIsOpen(false);
    }
  };

  // Handle editing existing swatch
  const handleStartEditing = (swatch: FontSwatch) => {
    setEditingSwatchName(swatch.name);
    setEditingSwatchValue(swatch.family);
  };

  const handleSaveEdit = () => {
    if (editingSwatchName && editingSwatchValue.trim() && onSwatchUpdate) {
      const newName = getCleanFontName(editingSwatchValue);
      onSwatchUpdate(editingSwatchName, newName, editingSwatchValue.trim(), "Custom");
      setEditingSwatchName(null);
      setEditingSwatchValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingSwatchName(null);
    setEditingSwatchValue("");
  };

  // Handle deleting swatch
  const handleDeleteSwatch = (swatchName: string) => {
    if (onSwatchDelete) {
      onSwatchDelete(swatchName);
    }
  };

  // Filter functions
  const filteredSwatches = swatches.filter(swatch =>
    (swatch.displayName || swatch.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGoogleFonts = POPULAR_GOOGLE_FONTS.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSystemFonts = SYSTEM_FONTS.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsCreatingNew(false);
      setEditingSwatchName(null);
      setEditingSwatchValue("");
      setSearchTerm("");
      setCustomFontFamily("");
      setNewFontName("");
      setNewFontFamily("");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn(
            "justify-between text-left font-normal",
            className
          )}
          style={{
            ...style,
            fontFamily: value || 'inherit'
          }}
          title={title}
          {...props}
        >
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="truncate">{getCurrentFontDisplayName()}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="flex flex-col h-96">
          {/* Header with search */}
          <div className="p-3 border-b">
            <div className="flex items-center space-x-2 mb-3">
              <Search className="w-4 h-4 opacity-50" />
              <Input
                ref={inputRef}
                placeholder="Search fonts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-muted rounded-md p-1">
              {[
                { key: 'swatches', label: 'Saved', count: swatches.length },
                { key: 'google', label: 'Google', count: filteredGoogleFonts.length },
                { key: 'system', label: 'System', count: filteredSystemFonts.length },
                { key: 'custom', label: 'Custom', count: 0 }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={cn(
                    "flex-1 text-xs py-1.5 px-2 rounded transition-colors",
                    activeTab === tab.key
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-1 opacity-60">({tab.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'swatches' && (
              <div className="p-3 space-y-2">
                {filteredSwatches.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    {swatches.length === 0 ? "No saved fonts yet" : "No fonts match your search"}
                  </div>
                ) : (
                  filteredSwatches.map((swatch) => (
                    <div key={swatch.name} className="group">
                      {editingSwatchName === swatch.name ? (
                        <Card className="p-2">
                          <div className="space-y-2">
                            <Input
                              value={editingSwatchValue}
                              onChange={(e) => setEditingSwatchValue(e.target.value)}
                              placeholder="Font family..."
                              className="text-sm"
                            />
                            <div className="flex gap-1">
                              <Button size="sm" onClick={handleSaveEdit} className="flex-1">
                                <Check className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit} className="flex-1">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <Card 
                          className="p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                          onClick={() => handleSwatchSelect(swatch)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium truncate">
                                  {swatch.displayName || swatch.name}
                                </span>
                                {swatch.distributor && (
                                  <Badge variant="secondary" className="text-xs">
                                    {swatch.distributor}
                                  </Badge>
                                )}
                              </div>
                              <div 
                                className="text-sm text-muted-foreground truncate"
                                style={{ fontFamily: swatch.family }}
                              >
                                {previewText.substring(0, 25)}...
                              </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEditing(swatch);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSwatch(swatch.name);
                                }}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  ))
                )}
                
                {/* Add new font button */}
                <Button
                  variant="outline"
                  onClick={() => setIsCreatingNew(true)}
                  className="w-full py-6 border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Font
                </Button>

                {/* Create new font form */}
                {isCreatingNew && (
                  <Card className="p-3 border-primary/20">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="fontName" className="text-xs">Font Name</Label>
                        <Input
                          id="fontName"
                          value={newFontName}
                          onChange={(e) => setNewFontName(e.target.value)}
                          placeholder="e.g., My Custom Font"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fontFamily" className="text-xs">Font Family</Label>
                        <Input
                          id="fontFamily"
                          value={newFontFamily}
                          onChange={(e) => setNewFontFamily(e.target.value)}
                          placeholder="e.g., 'Custom Font', sans-serif"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={handleCreateNew}
                          disabled={!newFontName.trim() || !newFontFamily.trim()}
                          className="flex-1"
                        >
                          Create
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setIsCreatingNew(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'google' && (
              <div className="p-3 space-y-2">
                {filteredGoogleFonts.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    No Google Fonts match your search
                  </div>
                ) : (
                  filteredGoogleFonts.map((font) => (
                    <Card 
                      key={font.name}
                      className="p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleGoogleFontSelect(font)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium truncate">{font.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Google
                            </Badge>
                          </div>
                          <div 
                            className="text-sm text-muted-foreground truncate"
                            style={{ fontFamily: font.family }}
                          >
                            {previewText.substring(0, 25)}...
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'system' && (
              <div className="p-3 space-y-2">
                {filteredSystemFonts.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    No system fonts match your search
                  </div>
                ) : (
                  filteredSystemFonts.map((font) => (
                    <Card 
                      key={font.name}
                      className="p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleSystemFontSelect(font)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium truncate">{font.name}</span>
                            <Badge variant="secondary" className="text-xs">System</Badge>
                          </div>
                          <div 
                            className="text-sm text-muted-foreground truncate"
                            style={{ fontFamily: font.family }}
                          >
                            {previewText.substring(0, 25)}...
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="p-3">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="customFont" className="text-sm font-medium">
                      Custom Font Family
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Enter a complete CSS font-family declaration
                    </p>
                    <Input
                      id="customFont"
                      value={customFontFamily}
                      onChange={(e) => setCustomFontFamily(e.target.value)}
                      placeholder="e.g., 'My Font', Arial, sans-serif"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCustomFontSubmit();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    onClick={handleCustomFontSubmit}
                    disabled={!customFontFamily.trim()}
                    className="w-full"
                  >
                    Apply Custom Font
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 