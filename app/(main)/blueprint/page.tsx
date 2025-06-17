"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import HomepagePreview from "./HomepagePreview";
import { BrandProvider, useBrand } from "../brandguide/BrandContext";
import { themes } from "../brandguide/brandguide";
import { FontToken, influenceHierarchy, type Role } from "../brandguide/brand-utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/features/unorganized-components/ui/card";
import { CheckCircle } from 'lucide-react';

export default function BlueprintPage() {
  return (
    <BrandProvider initialThemes={themes} initialThemeKey="default">
      <PageContent />
    </BrandProvider>
  );
}

function PageContent() {
  const { activeThemeKey, setActiveTheme, availableThemes, brand } = useBrand();
  
  // Preload CSS variables inline for immediate theme styling
  const inlineThemeVars = brand?.themeCssVariables
    ? Object.fromEntries(
        Object.entries(brand.themeCssVariables).map(([key, val]) => [`--${key}`, val])
      )
    : {};

  // Dynamically load Google Fonts for the active theme
  useEffect(() => {
    if (!brand || !brand.fonts) return;
    // Remove existing font loader links
    document.querySelectorAll('link[data-font-loader="blueprint"]').forEach(el => el.remove());
    // Load new font links for Google Fonts
    brand.fonts.forEach((font: FontToken) => {
      if (font.distributor === 'Google Fonts') {
        // Extract primary family name
        let fontName = font.family.split(',')[0].replace(/['"]/g, '').trim();
        const encoded = fontName.replace(/\s+/g, '+');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.setAttribute('data-font-loader', 'blueprint');
        link.href = `https://fonts.googleapis.com/css?family=${encoded}&display=swap`;
        document.head.appendChild(link);
      }
    });
    // Cleanup on unmount or theme change
    return () => {
      document.querySelectorAll('link[data-font-loader="blueprint"]').forEach(el => el.remove());
    };
  }, [activeThemeKey, brand?.fonts]);

  const steps = ["Preset", "Colors", "Typography", "Icons"];
  const [currentStep, setCurrentStep] = useState(0);
  
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
      'primaryPlay': 'Primary Play',
      'monochromeClarity': 'Monochrome Clarity',
      'elegantLuxury': 'Elegant Luxury',
      'violetAbyss': 'Violet Abyss',
      'lilacDaylight': 'Lilac Daylight',
      'neonPop': 'Neon Pop',
      'cyberPulse': 'Cyber Pulse'
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

  return (
    <div className="h-screen flex flex-col bg-background text-foreground" style={inlineThemeVars}>
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left preview pane (Homepage preview) */}
        <div
          ref={wrapperRef}
          className="flex-1 relative bg-muted p-4 overflow-y-auto overflow-x-hidden"
        >
          <div
            ref={previewRef}
            className="absolute left-1/2 bg-card border border-border rounded-lg"
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
                    
                    return (
                      <Card
                        key={key}
                        onClick={() => setActiveTheme(key)}
                        className={`group relative cursor-pointer transition-all duration-200 ${
                          activeThemeKey === key 
                            ? 'ring-2 ring-foreground bg-accent/50' 
                            : 'hover:bg-accent/20 hover:shadow-md'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex -space-x-1">
                                {importantColors.map((colorToken, index) => (
                                  <div
                                    key={colorToken.variableName}
                                    className="w-8 h-8 rounded-full border-2 border-background shadow-sm"
                                    style={{ 
                                      backgroundColor: colorToken.oklchLight,
                                      zIndex: 5 - index
                                    }}
                                    title={`${colorToken.name} (${colorToken.roles.join(', ')})`}
                                  />
                                ))}
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{displayName}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {th.colors.length} colors • {importantColors.length} primary
                                </p>
                              </div>
                            </div>
                            {activeThemeKey === key && (
                              <CheckCircle className="w-5 h-5 text-foreground" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
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
              className={`text-sm ${
                idx === currentStep
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
    </div>
  );
}