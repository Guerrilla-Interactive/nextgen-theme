'use client';

import { useState, useEffect } from 'react';
import { useBrand } from '../BrandContext';
import { Button } from '@/features/unorganized-components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/unorganized-components/ui/card';
import { Badge } from '@/features/unorganized-components/ui/badge';
import { 
  Bug, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Palette, 
  Type, 
  Zap,
  Database,
  Eye,
  History,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/features/unorganized-utils/utils';

interface DebugSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function DebugSection({ title, icon: Icon, children, defaultOpen = false }: DebugSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        className="w-full justify-start p-3 h-auto font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="w-4 h-4 mr-2" />
        {title}
        {isOpen ? (
          <ChevronDown className="w-4 h-4 ml-auto" />
        ) : (
          <ChevronRight className="w-4 h-4 ml-auto" />
        )}
      </Button>
      {isOpen && (
        <div className="p-3 border-t border-border bg-muted/20">
          {children}
        </div>
      )}
    </div>
  );
}

export function BrandContextDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const {
    brand,
    committedBrand,
    processedBrand,
    activeThemeKey,
    availableThemes,
    canUndo,
    canRedo,
    undoStepsAvailable,
    redoStepsAvailable
  } = useBrand();

  // Auto-refresh every 2 seconds when panel is open
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  // Manual refresh function
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const formatColorValue = (value: string | undefined) => {
    if (!value) return 'undefined';
    if (value.length > 30) return value.substring(0, 30) + '...';
    return value;
  };

  const formatRoles = (roles: string[] | undefined) => {
    if (!roles || roles.length === 0) return 'No roles';
    return roles.join(', ');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-18 left-4 z-50 h-12 w-12 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-all duration-200 hover:scale-105"
        )}
        size="icon"
        title="Toggle Brand Context Debug Panel"
      >
        <Bug className="w-5 h-5" />
      </Button>

      {/* Debug Panel */}
      {isOpen && (
        <Card className="fixed bottom-32 left-4 w-full max-w-[400px] max-h-[80vh] shadow-2xl border-2 z-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bug className="w-5 h-5" />
                Brand Context Debug
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRefresh}
                  title="Refresh debug values"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Theme: <Badge variant="outline">{activeThemeKey}</Badge>
              <span className="ml-2 text-xs">Auto-refresh: ON</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="h-[60vh] overflow-y-auto pr-3">
              <div className="space-y-3">
                
                {/* History State */}
                <DebugSection title="History State" icon={History}>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Can Undo: <Badge variant={canUndo ? "default" : "secondary"}>{canUndo ? 'Yes' : 'No'}</Badge></div>
                      <div>Can Redo: <Badge variant={canRedo ? "default" : "secondary"}>{canRedo ? 'Yes' : 'No'}</Badge></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>Undo Steps: {undoStepsAvailable}</div>
                      <div>Redo Steps: {redoStepsAvailable}</div>
                    </div>
                  </div>
                </DebugSection>

                {/* Available Themes */}
                <DebugSection title="Available Themes" icon={Palette}>
                  <div className="space-y-1">
                    {Object.keys(availableThemes).map(themeKey => (
                      <div 
                        key={themeKey}
                        className={cn(
                          "text-sm p-2 rounded",
                          themeKey === activeThemeKey 
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {themeKey} {themeKey === activeThemeKey && '(active)'}
                      </div>
                    ))}
                  </div>
                </DebugSection>

                {/* Brand State */}
                <DebugSection title="Brand State References" icon={Database} defaultOpen>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>brand:</strong> {brand ? `${brand.colors?.length || 0} colors` : 'null'}
                    </div>
                    <div>
                      <strong>committedBrand:</strong> {committedBrand ? `${committedBrand.colors?.length || 0} colors` : 'null'}
                    </div>
                    <div>
                      <strong>processedBrand:</strong> {processedBrand ? `${processedBrand.colors?.length || 0} colors` : 'null'}
                    </div>
                    {brand && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <div><strong>Brand Name:</strong> {brand.name}</div>
                        <div><strong>Colors Count:</strong> {brand.colors?.length || 0}</div>
                        <div><strong>Fonts Count:</strong> {brand.fonts?.length || 0}</div>
                      </div>
                    )}
                  </div>
                </DebugSection>

                {/* Current Colors */}
                <DebugSection title="Current Colors" icon={Palette}>
                  <div className="space-y-2">
                    {brand?.colors?.map((color, index) => (
                      <div key={`${color.name}-${index}`} className="text-xs border border-border rounded p-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-4 h-4 rounded border border-border"
                            style={{ backgroundColor: color.oklchLight }}
                          />
                          <strong>{color.name}</strong>
                        </div>
                        <div>Variable: <code className="text-xs bg-muted px-1 rounded">{color.variableName}</code></div>
                        <div>OKLCH: <code className="text-xs bg-muted px-1 rounded">{formatColorValue(color.oklchLight)}</code></div>
                        <div>Roles: <span className="text-muted-foreground">{formatRoles(color.roles)}</span></div>
                      </div>
                    )) || <div className="text-muted-foreground text-sm">No colors available</div>}
                  </div>
                </DebugSection>

                {/* Current Fonts */}
                <DebugSection title="Current Fonts" icon={Type}>
                  <div className="space-y-2">
                    {brand?.fonts?.map((font, index) => (
                      <div key={`${font.family}-${index}`} className="text-xs border border-border rounded p-2">
                        <div><strong>Name:</strong> {font.name}</div>
                        <div><strong>Family:</strong> {font.family}</div>
                        <div><strong>Distributor:</strong> {font.distributor}</div>
                        <div><strong>Roles:</strong> {formatRoles(font.roles)}</div>
                        <div><strong>Weights:</strong> {Object.entries(font.weights || {}).map(([name, value]) => `${name}:${value}`).join(', ')}</div>
                        {font.fontWeights && Object.keys(font.fontWeights).length > 0 && (
                          <div><strong>Weight Assignments:</strong> {Object.entries(font.fontWeights).map(([role, weight]) => `${role}:${weight}`).join(', ')}</div>
                        )}
                      </div>
                    )) || <div className="text-muted-foreground text-sm">No fonts available</div>}
                  </div>
                </DebugSection>

                {/* Font Role Assignments */}
                <DebugSection title="Font Role Assignments" icon={Type}>
                  <div className="space-y-1 text-xs">
                    {brand?.fonts ? (() => {
                      // Create a mapping of roles to fonts with weights
                      const roleToFontMap: Record<string, { fontName: string; weight?: string }> = {};
                      brand.fonts.forEach(font => {
                        font.roles?.forEach(role => {
                          roleToFontMap[role] = {
                            fontName: font.name,
                            weight: font.fontWeights?.[role] || 'default'
                          };
                        });
                      });

                      return Object.keys(roleToFontMap).length > 0 ? (
                        Object.entries(roleToFontMap).map(([role, { fontName, weight }]) => (
                          <div key={role} className="flex justify-between items-center py-1 px-2 border border-border/30 rounded">
                            <span className="text-muted-foreground capitalize">{role.replace(/-/g, ' ')}:</span>
                            <div className="text-right">
                              <div className="font-medium">{fontName}</div>
                              <div className="text-xs text-muted-foreground">
                                Weight: {weight}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted-foreground italic text-center py-2">No font roles assigned</div>
                      );
                    })() : (
                      <div className="text-muted-foreground italic text-center py-2">No fonts available</div>
                    )}
                  </div>
                </DebugSection>

                {/* Theme CSS Variables */}
                <DebugSection title="Theme CSS Variables" icon={Zap}>
                  <div className="space-y-2">
                    {brand?.themeCssVariables ? (
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-medium mb-2 text-muted-foreground">Template Values (from brand.themeCssVariables):</div>
                          <div className="space-y-1">
                            {Object.entries(brand.themeCssVariables).map(([key, value]) => (
                              <div key={key} className="text-xs">
                                <code className="text-xs bg-muted px-1 rounded mr-1">--{key}</code>
                                <span className="text-muted-foreground">{formatColorValue(String(value))}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t border-border pt-2">
                          <div className="text-xs font-medium mb-2 text-muted-foreground">Resolved CSS Values (actual DOM values):</div>
                          <div className="space-y-1" key={`resolved-css-${refreshTrigger}`}>
                            {Object.keys(brand.themeCssVariables).map(key => {
                              const cssValue = typeof window !== 'undefined' 
                                ? window.getComputedStyle(document.documentElement).getPropertyValue(`--${key}`).trim()
                                : 'N/A';
                              
                              const styleValue = typeof window !== 'undefined'
                                ? document.documentElement.style.getPropertyValue(`--${key}`).trim()
                                : 'N/A';
                              
                              return (
                                <div key={key} className="text-xs">
                                  <code className="text-xs bg-muted px-1 rounded mr-1">--{key}</code>
                                  <div className="ml-4 mt-1 space-y-1">
                                    <div className="text-muted-foreground">
                                      <span className="text-xs font-medium">Style:</span> {styleValue || 'not set'}
                                    </div>
                                    <div className="text-muted-foreground">
                                      <span className="text-xs font-medium">Computed:</span> {cssValue || 'not set'}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">No theme CSS variables</div>
                    )}
                  </div>
                </DebugSection>

                {/* Current CSS Values */}
                <DebugSection title="Live CSS Values" icon={Eye}>
                  <div className="space-y-1 text-xs" key={`live-css-${refreshTrigger}`}>
                    {[
                      'primary', 'secondary', 'accent', 'destructive', 
                      'background', 'foreground', 'border', 'ring'
                    ].map(varName => {
                      const cssValue = typeof window !== 'undefined' 
                        ? window.getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim()
                        : 'N/A';
                      
                      return (
                        <div key={varName} className="flex justify-between">
                          <code className="bg-muted px-1 rounded">--{varName}</code>
                          <span className="text-muted-foreground ml-2 truncate">
                            {cssValue || 'not set'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </DebugSection>

              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 