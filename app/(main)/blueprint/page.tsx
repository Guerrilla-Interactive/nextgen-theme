"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import HomepagePreview from "./HomepagePreview";
import { BrandProvider, useBrand } from "../brandguide/BrandContext";
import { themes } from "../brandguide/brandguide";
import { FontToken, influenceHierarchy, type Role, generateGlobalCss } from "../brandguide/brand-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Moon, Sun, Copy, Download, Check } from "lucide-react";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { ExportTab } from "./tabs/export-tab.component";
import { ColorsTab } from "./tabs/colors-tab.component";
import { BrandContextDebugPanel } from "./components/BrandContextDebugPanel";

export default function BlueprintPage() {
  return (
    <BrandProvider initialThemes={themes} initialThemeKey="default">
      <PageContent />
    </BrandProvider>
  );
}

function PageContent() {
  const { activeThemeKey, setActiveTheme, availableThemes, brand, processedBrand } = useBrand();

  // Initialize cardDarkModes based on each theme's default preference
  const initialModes: Record<string, boolean> = {};
  Object.keys(availableThemes).forEach((key) => {
    // Use new defaultMode property, fallback to old prefersDarkSchemeForChrome for backward compatibility
    const themeDefault = availableThemes[key]?.defaultMode === 'dark' || availableThemes[key]?.prefersDarkSchemeForChrome || false;
    initialModes[key] = themeDefault;
  });

  const [cardDarkModes, setCardDarkModes] = useState<Record<string, boolean>>(initialModes);

  // Initialize global page dark mode state based on active theme
  const [isPageDarkMode, setIsPageDarkMode] = useState(() => {
    return availableThemes[activeThemeKey]?.prefersDarkSchemeForChrome ?? false;
  });

  // Toggle dark mode for a specific card
  const toggleCardDarkMode = (cardKey: string) => {
    setCardDarkModes(prev => {
      const newCardDarkModes = {
        ...prev,
        [cardKey]: !prev[cardKey]
      };
      
      // If this card is the active theme, also update the page theme
      if (cardKey === activeThemeKey) {
        const newDarkMode = newCardDarkModes[cardKey] || availableThemes[cardKey]?.defaultMode === 'dark' || availableThemes[cardKey]?.prefersDarkSchemeForChrome || false;
        setIsPageDarkMode(!!newDarkMode);
      }
      
      return newCardDarkModes;
    });
  };

  // Handle theme selection - switch page to that theme's current mode
  const handleThemeSelection = (themeKey: string) => {
    setActiveTheme(themeKey);
    
    // Switch page to the selected theme's current mode
    const isThemeDark = cardDarkModes[themeKey] || availableThemes[themeKey]?.defaultMode === 'dark' || availableThemes[themeKey]?.prefersDarkSchemeForChrome || false;
    setIsPageDarkMode(!!isThemeDark);
  };

  // Update page theme when active theme changes
  useEffect(() => {
    if (activeThemeKey) {
      const isThemeDark = cardDarkModes[activeThemeKey] || availableThemes[activeThemeKey]?.defaultMode === 'dark' || availableThemes[activeThemeKey]?.prefersDarkSchemeForChrome || false;
      setIsPageDarkMode(!!isThemeDark);
    }
  }, [activeThemeKey, cardDarkModes, availableThemes]);

  // Preload CSS variables inline for immediate theme styling
  const inlineThemeVars = useMemo(() => {
    if (!brand?.themeCssVariables) return {};

    // Just return basic CSS variables for inline styling - let BrandContext handle the actual CSS variable management
    return Object.fromEntries(
      Object.entries(brand.themeCssVariables).map(([key, val]) => [`--${key}`, val])
    );
  }, [brand]);

  // BrandContext handles all CSS variable management including role assignments
  // No need for additional CSS variable management here

  // Pre-load Google Fonts for all themes so they're available in previews
  useEffect(() => {
    if (!availableThemes) return;

    // Remove existing font loader links
    document.querySelectorAll('link[data-font-loader="blueprint"]').forEach(el => el.remove());

    // Collect all unique Google Font families from all themes
    const googleFontFamilies = new Set<string>();

    Object.values(availableThemes).forEach(theme => {
      if (theme?.fonts) {
        theme.fonts.forEach((font: FontToken) => {
          if (font.distributor === 'Google Fonts') {
            // Extract primary family name and clean it up
            let fontName = font.family.split(',')[0].replace(/['"]/g, '').trim();
            googleFontFamilies.add(fontName);
          }
        });
      }
    });

    // Load fonts in a single request for better performance
    if (googleFontFamilies.size > 0) {
      const familyParams = Array.from(googleFontFamilies)
        .map(family => {
          const encoded = family.replace(/\s+/g, '+');
          // Load multiple weights for better typography support
          return `${encoded}:300,400,500,600,700`;
        })
        .join('|');

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-font-loader', 'blueprint');
      link.href = `https://fonts.googleapis.com/css?family=${familyParams}&display=swap`;
      document.head.appendChild(link);
    }

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('link[data-font-loader="blueprint"]').forEach(el => el.remove());
    };
  }, [availableThemes]);

  const steps = ["Preset", "Colors", "Typography", "Icons", "Export"];
  const [currentStep, setCurrentStep] = useState(0);

  // Copy functionality for export
  const [copied, setCopied] = useState(false);

  const handleCopyCSS = async () => {
    if (!brand) return;
    
    const css = generateGlobalCss(brand);
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Handle error silently - copy operation failed
    }
  };

  const handleDownloadCSS = () => {
    if (!brand) return;
    
    const css = generateGlobalCss(brand);
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'globals.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrev = () => currentStep > 0 && setCurrentStep(currentStep - 1);
  const handleNext = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);

  // Preview scaling setup
  const PREVIEW_WIDTH = 1200; // px, desktop viewport width
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [previewHeight, setPreviewHeight] = useState(0);

  // Measure preview height once mounted
  useEffect(() => {
    if (previewRef.current) {
      setPreviewHeight(previewRef.current.offsetHeight);
    }
  }, []);

  // Observe wrapper size to adjust scale
  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width: cW, height: cH } = entry.contentRect;
        const widthScale = cW / PREVIEW_WIDTH;
        const heightScale = previewHeight > 0 ? cH / previewHeight : widthScale;
        const newScale = Math.min(1, widthScale, heightScale);
        setScale(newScale);
      }
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [previewHeight]);

  const themeOptions = Object.keys(availableThemes);

  // Function to get display name for theme keys
  const getThemeDisplayName = (key: string) => {
    // Handle special cases and convert kebab-case to Title Case
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

    // Convert kebab-case to Title Case
    return key.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to get the most important colors for a theme
  const getMostImportantColors = (themeColors: any[]) => {
    return themeColors
      .map(color => ({
        ...color,
        maxInfluence: Math.max(...color.roles.map((role: Role) => influenceHierarchy[role] || 0))
      }))
      .sort((a, b) => b.maxInfluence - a.maxInfluence)
      .slice(0, 5); // Show top 5 most important colors
  };

  // Function to get font information for a theme
  const getThemeFonts = (themeFonts: FontToken[]) => {
    if (!themeFonts || themeFonts.length === 0) return [];

    // Return all fonts with their basic information
    return themeFonts.map(font => ({
      ...font,
      usage: font.roles?.includes('heading') || font.roles?.includes('display') ? 'heading' : 'body'
    }));
  };

  // Function to get clean font family name for CSS
  const getCleanFontFamily = (fontFamily: string) => {
    return fontFamily.split(',')[0].replace(/['"]/g, '').trim();
  };

  // Get the current dark mode for active theme
  const getActiveThemeDefaultMode = (): boolean => {
    return availableThemes[activeThemeKey]?.defaultMode === 'dark' || availableThemes[activeThemeKey]?.prefersDarkSchemeForChrome || false;
  };

  return (
    <div
      className={`h-screen flex flex-col bg-background text-foreground font-sans ${isPageDarkMode ? 'dark' : ''}`}
      style={inlineThemeVars}
    >
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left preview pane (Homepage preview) */}
        <div
          ref={wrapperRef}
          className="flex-1 relative bg-muted p-4 overflow-y-auto overflow-x-hidden"
        >
          <div
            ref={previewRef}
            className="absolute left-1/2 bg-card border border-border rounded-lg shadow-lg"
            style={{
              position: 'absolute',
              top: '10vh',
              width: `${PREVIEW_WIDTH}px`,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            <HomepagePreview />
          </div>
        </div>
        {/* Right decision column */}
        <div className="w-[506px] min-w-[20rem] bg-popover border-l border-border p-8 overflow-y-auto">
          {currentStep === 0 ? (
            <div className="space-y-8">
              {/* Theme Selection Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Choose Your Theme</h3>
                <div className="grid gap-3">
                  {themeOptions.map(key => {
                    const th = availableThemes[key];
                    if (!th) return null;

                    const displayName = getThemeDisplayName(key);
                    const importantColors = getMostImportantColors(th.colors);
                    const themeFonts = getThemeFonts(th.fonts);

                    // Get primary fonts for this theme
                    const headingFont = themeFonts.find(f => f.usage === 'heading')?.family || themeFonts[0]?.family;
                    const bodyFont = themeFonts.find(f => f.usage === 'body')?.family || themeFonts[1]?.family || themeFonts[0]?.family;

                    // Always show colors in light mode for card previews (neutral display)
                    const getColorForCard = (colorToken: any) => {
                      return colorToken.oklchLight; // Always use light mode colors for card display
                    };

                    // Check if this theme's toggle is in dark mode
                    const isCardToggleDark = cardDarkModes[key] || availableThemes[key]?.defaultMode === 'dark' || availableThemes[key]?.prefersDarkSchemeForChrome || false;

                    return (
                      <Card
                        key={key}
                        onClick={() => handleThemeSelection(key)}
                        className={`group relative cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${activeThemeKey === key
                          ? 'ring-1 ring-primary/40 bg-accent/30 border-primary/20 shadow-lg'
                          : 'hover:bg-accent/20'
                          }`}
                        style={{
                          fontFamily: bodyFont || 'inherit'
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Theme Name and Colors Row */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex -space-x-1">
                                  {importantColors.map((colorToken, index) => (
                                    <div
                                      key={colorToken.variableName}
                                      className="w-8 h-8 rounded-full shadow-sm"
                                      style={{
                                        backgroundColor: getColorForCard(colorToken),
                                        zIndex: 5 - index
                                      }}
                                      title={`${colorToken.name} (${colorToken.roles.join(', ')})`}
                                    />
                                  ))}
                                </div>
                                <div>
                                  <h4
                                    className="font-semibold text-foreground"
                                    style={{
                                      fontFamily: headingFont || 'inherit'
                                    }}
                                  >
                                    {displayName}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {th.colors.length} colors • {th.fonts.length} font{th.fonts.length !== 1 ? 's' : ''}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Dark/Light Mode Toggle */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent card selection when clicking toggle
                                  toggleCardDarkMode(key);
                                }}
                                className="h-8 w-8 p-0 hover:bg-accent/50 transition-colors relative z-10"
                                title={isCardToggleDark ? "Switch to light mode" : "Switch to dark mode"}
                              >
                                {isCardToggleDark ? (
                                  <Moon className="h-4 w-4" />
                                  
                                ) : (
                                  <Sun className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            {/* Font Preview Section */}
                            {themeFonts.length > 0 && (
                              <div className="text-xs font-normal text-muted-foreground">
                                <span className="truncate">
                                  {themeFonts.map((font, index) => {
                                    const cleanFamily = getCleanFontFamily(font.family);
                                    return (
                                      <span key={index}>
                                        {index > 0 && (
                                          <span className="mx-2 opacity-30">
                                            ·
                                          </span>
                                        )}
                                        <span
                                          style={{ 
                                            fontFamily: font.family
                                          }}
                                          className="opacity-70"
                                          title={`${cleanFamily} — ${font.usage} typeface`}
                                        >
                                          {cleanFamily}
                                        </span>
                                      </span>
                                    );
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : currentStep === 1 ? (
            <ColorsTab 
              activeThemeKey={activeThemeKey}
              isPageDarkMode={isPageDarkMode}
            />
          ) : currentStep === 4 ? (
            <ExportTab 
              activeThemeKey={activeThemeKey}
              isPageDarkMode={isPageDarkMode}
            />
          ) : (
            <div>Decision Panel - {steps[currentStep]}</div>
          )}
        </div>
      </div>
      {/* Bottom navigation bar */}
      <nav className="h-16 bg-popover border-t border-border flex items-center justify-between px-6">
        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>
          Back
        </Button>
        <div className="flex space-x-6">
          {steps.map((step, idx) => (
            <button
              key={step}
              onClick={() => setCurrentStep(idx)}
              className={`text-sm font-medium ${idx === currentStep
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {step}
            </button>
          ))}
        </div>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </nav>
      
      {/* Debug Panel */}
      <BrandContextDebugPanel />
    </div>
  );
}