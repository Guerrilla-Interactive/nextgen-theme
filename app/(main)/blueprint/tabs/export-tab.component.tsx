"use client";

import { useState } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { 
  Copy, 
  Download, 
  Check, 
  Palette, 
  Type,
  Info,
  Zap,
  Package
} from "lucide-react";
import { generateGlobalCss, type Brand, type ColorToken, type FontToken } from "../brand-utils";
import { useBrand } from "../BrandContext";

interface ExportTabProps {
  activeThemeKey: string;
}

export function ExportTab({ activeThemeKey }: ExportTabProps) {
  const { brand } = useBrand();
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});

  // Get theme display name
  const getThemeDisplayName = (key: string) => {
    const specialNames: Record<string, string> = {
      'nextgen': 'Nextgen',
      'violet-sky': 'Violet Sky',
      'sageMeadow': 'Sage Meadow',
      'neo-brutalism': 'Neo Brutalism',
      'elegantLuxury': 'Elegant Luxury',
      'lilacDaylight': 'Lilac Daylight',
      'neonPop': 'Neon Pop',
      'cyberPulse': 'Cyber Pulse',
      'sageMinimal': 'Sage Minimal'
    };

    if (specialNames[key]) return specialNames[key];
    return key.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle copy functionality
  const handleCopy = async (content: string, itemKey: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedItems(prev => ({ ...prev, [itemKey]: true }));
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [itemKey]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle download functionality
  const handleDownload = (content: string, filename: string, type: string = 'text/css') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate different export formats
  const generateExports = () => {
    if (!brand) return null;

    const css = generateGlobalCss(brand);
    
    // Generate JSON config
    const jsonConfig = {
      name: getThemeDisplayName(activeThemeKey),
      mode: 'light',
      colors: brand.colors.map(color => ({
        name: color.name,
        variable: color.variableName,
        light: color.oklch,
        roles: color.roles,
        category: color.category
      })),
      fonts: brand.fonts.map(font => ({
        family: font.family,
        roles: font.roles,
        distributor: font.distributor
      })),
      cssVariables: brand.themeCssVariables
    };

    // Generate Tailwind v4 CSS snippet
    const tailwindConfig = `
/* Tailwind v4 CSS with @theme inline */
@import "tailwindcss";

:root {
${brand.colors.map(color => {
  return `  --${color.variableName}: ${color.oklch};`;
}).join('\n')}
${Object.entries(brand.themeCssVariables).map(([key, value]) => {
  return `  --${key}: ${value};`;
}).join('\n')}
}

@theme inline {
${brand.colors.map(color => {
  return `  --color-${color.variableName.replace('--', '')}: var(--${color.variableName});`;
}).join('\n')}
${Object.entries(brand.themeCssVariables).map(([key, value]) => {
  if (key.includes('radius')) {
    return `  --radius-lg: var(--${key});
  --radius-md: calc(var(--${key}) - 2px);
  --radius-sm: calc(var(--${key}) - 4px);
  --radius-xl: calc(var(--${key}) + 4px);`;
  }
  return `  --color-${key}: var(--${key});`;
}).join('\n')}
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

    return { css, jsonConfig: JSON.stringify(jsonConfig, null, 2), tailwindConfig };
  };

  const exports = generateExports();
  
  if (!brand || !exports) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme data available for export</p>
      </div>
    );
  }

  const themeStats = {
    colors: brand.colors.length,
    fonts: brand.fonts.length,
    colorCategories: [...new Set(brand.colors.map(c => c.category))].length,
    roles: [...new Set(brand.colors.flatMap(c => c.roles))].length,
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Download className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground">Export Theme</h3>
            <p className="text-xs text-muted-foreground">
              Generate files for{" "}
              <span className="font-medium text-foreground">{getThemeDisplayName(activeThemeKey)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Theme Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="w-3 h-3" />
            Theme Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Theme:</span>
                <span className="font-medium truncate ml-1 text-right">{getThemeDisplayName(activeThemeKey)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Mode:</span>
                <Badge variant="secondary" className="text-xs h-4 px-1.5">
                  Light
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Colors:</span>
                <span className="font-medium">{themeStats.colors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fonts:</span>
                <span className="font-medium">{themeStats.fonts}</span>
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium">Primary Colors:</span>
            <div className="flex gap-1 flex-wrap">
              {brand.colors
                .filter(color => color.roles.includes('primary') || color.roles.includes('secondary') || color.roles.includes('accent'))
                .slice(0, 8)
                .map((color, index) => (
                  <div
                    key={color.variableName}
                    className="w-5 h-5 rounded border border-border shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: color.oklchLight,
                    }}
                    title={`${color.name} (${color.roles.join(', ')})`}
                  />
                ))}
            </div>
          </div>

          {/* Font Preview */}
          {brand.fonts.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium">Typography:</span>
              <div className="space-y-0.5">
                {brand.fonts.slice(0, 2).map((font, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    <span 
                      style={{ fontFamily: font.family }}
                      className="font-medium text-foreground"
                    >
                      {font.family.split(',')[0].replace(/['"]/g, '').trim()}
                    </span>
                    {' · '}
                    <span className="text-xs">
                      {font.roles?.join(', ') || 'general'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Ready to Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* CSS Export */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Type className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Complete CSS File</p>
                  <p className="text-xs text-muted-foreground">
                    Full styles with variables and classes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(exports.css, 'css')}
                  className="h-7 px-2.5 text-xs"
                >
                  {copiedItems.css ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(exports.css, `${activeThemeKey}-theme.css`)}
                  className="h-7 px-2.5 text-xs"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* JSON Export */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Package className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Theme Config (JSON)</p>
                  <p className="text-xs text-muted-foreground">
                    Structured data for integrations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(exports.jsonConfig, 'json')}
                  className="h-7 px-2.5 text-xs"
                >
                  {copiedItems.json ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(exports.jsonConfig, `${activeThemeKey}-config.json`, 'application/json')}
                  className="h-7 px-2.5 text-xs"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tailwind v4 Preview */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-3 h-3" />
            Tailwind v4 CSS
            <Badge variant="outline" className="text-xs">Preview</Badge>
          </CardTitle>
        </CardHeader>

        <div className="border-t bg-muted/30">
          <div className="p-3 border-b bg-background/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-medium text-muted-foreground truncate">
                  {activeThemeKey}-tailwind-v4.css
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                <Badge variant="outline" className="text-xs h-4 px-1">
                  v4
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="h-64 overflow-auto bg-slate-950">
              <pre className="p-3 text-xs leading-relaxed">
                <code className="text-slate-300 whitespace-pre-wrap font-mono">
                  {exports.tailwindConfig}
                </code>
              </pre>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Footer with Quick Setup */}
        <CardContent className="pt-4">
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">1</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs">Replace globals.css</h4>
                <p className="text-xs text-muted-foreground">
                  Download and replace your existing CSS file
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">2</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs">Use Tailwind classes</h4>
                <p className="text-xs text-muted-foreground">
                  <code className="bg-muted px-1 rounded text-xs">bg-primary</code>, <code className="bg-muted px-1 rounded text-xs">text-foreground</code>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(exports.tailwindConfig, 'tailwind')}
              className="h-8 px-3 text-xs flex-1"
            >
              {copiedItems.tailwind ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
              Copy CSS
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(exports.tailwindConfig, `${activeThemeKey}-tailwind-v4.css`)}
              className="h-8 px-3 text-xs flex-1"
            >
              <Download className="w-3 h-3 mr-1.5" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
