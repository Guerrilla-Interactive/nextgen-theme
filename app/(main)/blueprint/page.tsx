"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import HomepagePreview from "./HomepagePreview";
import GalleryPreview from "./GalleryPreview";
import ArtistPreview from "./ArtistPreview";
import ComponentPreview from "./ComponentPreview";
import { BrandProvider, useBrand } from "./BrandContext";
import { themes } from "./brandguide";
import {
  FontToken,
  influenceHierarchy,
  type Role,
  generateGlobalCss
} from "./brand-utils";
import {
  Card,
  CardContent
} from "@/features/unorganized-components/ui/card";
import {
  Image,
  Palette,
  Settings,
  Monitor
} from "lucide-react";
import { ExportTab } from "./tabs/export-tab.component";
import { ColorsTab } from "./tabs/colors-tab.component";
import { TypographyTab } from "./tabs/typography-tab.component";
import { BrandContextDebugPanel } from "./components/BrandContextDebugPanel";

/* -------------------------------------------------------------------------------------------------
 * BlueprintPage – one‑file demo for brand system builder (July 2025)
 * ------------------------------------------------------------------------------------------------*/

export default function BlueprintPage() {
  return (
    <BrandProvider initialThemes={themes} initialThemeKey="default">
      <PageContent />
    </BrandProvider>
  );
}

function PageContent() {
  const {
    activeThemeKey,
    setActiveTheme,
    availableThemes,
    brand
  } = useBrand();

  /* ──────────────────────────────────────────────────────────
   * Local state
   * ────────────────────────────────────────────────────────*/
  const [previewType, setPreviewType] = useState<'saas' | 'gallery' | 'artist' | 'components'>('saas');

  // wizard steps (simple array so we can step fwd/backwards)
  const steps = ["Preset", "Colors", "Typography", "Icons", "Export"] as const;
  const [currentStep, setCurrentStep] = useState<number>(0);

  /* ──────────────────────────────────────────────────────────
   * Font pre‑loading (Google Fonts)
   * ────────────────────────────────────────────────────────*/
  useEffect(() => {
    if (!availableThemes) return;

    // remove prior loaders
    document.querySelectorAll('link[data-font-loader="blueprint"]').forEach(el => el.remove());

    const googleFamilies = new Set<string>();
    Object.values(availableThemes).forEach(theme => {
      theme?.fonts?.forEach((font: FontToken) => {
        if (font.distributor === 'Google Fonts') {
          const family = font.family.split(',')[0].replace(/['"]/g, '').trim();
          googleFamilies.add(family);
        }
      });
    });

    if (googleFamilies.size) {
      const familyParams = Array.from(googleFamilies)
        .map(f => `${f.replace(/\s+/g, '+')}:300,400,500,600,700`)
        .join('|');

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-font-loader', 'blueprint');
      link.href = `https://fonts.googleapis.com/css?family=${familyParams}&display=swap`;
      document.head.appendChild(link);
    }

    return () => {
      document.querySelectorAll('link[data-font-loader="blueprint"]').forEach(el => el.remove());
    };
  }, [availableThemes]);

  /* ──────────────────────────────────────────────────────────
   * Inline CSS‑vars for active brand (immediate paint)
   * ────────────────────────────────────────────────────────*/
  const inlineThemeVars = useMemo(() => {
    if (!brand?.themeCssVariables) return {};
    return Object.fromEntries(
      Object.entries(brand.themeCssVariables).map(([k, v]) => [`--${k}`, v])
    );
  }, [brand]);

  /* ──────────────────────────────────────────────────────────
   * Preview scaling (fixed 1 600 px canvas → max 60 vw)
   * ────────────────────────────────────────────────────────*/
  const PREVIEW_WIDTH = 1600;
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth * 0.6) / PREVIEW_WIDTH));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ──────────────────────────────────────────────────────────
   * Helper callbacks
   * ────────────────────────────────────────────────────────*/
  const handleThemeSelection = (key: string) => {
    setActiveTheme(key);
  };

  const prettify = (k: string) =>
    ({
      nextgen: 'Nextgen',
      'violet-sky': 'Violet Sky',
      sageMeadow: 'Sage Meadow',
      'neo-brutalism': 'Neo Brutalism',
      elegantLuxury: 'Elegant Luxury',
      lilacDaylight: 'Lilac Daylight',
      neonPop: 'Neon Pop',
      cyberPulse: 'Cyber Pulse',
      sageMinimal: 'Sage Minimal'
    } as Record<string, string>)[k] ?? k.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const getMostImportantColors = (colors: any[]) =>
    colors
      .map(c => ({ ...c, maxInfluence: Math.max(...c.roles.map((r: Role) => influenceHierarchy[r] || 0)) }))
      .sort((a, b) => b.maxInfluence - a.maxInfluence)
      .slice(0, 5);

  const getThemeFonts = (fonts: FontToken[] = []) =>
    fonts.map(f => ({
      ...f,
      usage: f.roles?.some(r => ['heading', 'display'].includes(r)) ? 'heading' : 'body'
    }));

  const cleanFamily = (family: string) => family.split(',')[0].replace(/['"]/g, '').trim();

  /* ──────────────────────────────────────────────────────────
   * Render
   * ────────────────────────────────────────────────────────*/
  return (
    <div
      className="h-screen flex flex-col bg-background text-foreground font-sans"
      style={inlineThemeVars}
    >
      {/* Main viewport */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview pane */}
        <div className="flex-1 relative bg-muted p-4 overflow-y-auto overflow-x-hidden">
          {/* Preview‑type toggle */}
          <div className="absolute top-6 right-6 z-50">
            <Card className="p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Button variant={previewType === 'saas' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('saas')} className="flex items-center space-x-1">
                  <Monitor className="w-4 h-4" />
                  <span className="text-xs">SaaS</span>
                </Button>
                <Button variant={previewType === 'gallery' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('gallery')} className="flex items-center space-x-1">
                  <Image className="w-4 h-4" />
                  <span className="text-xs">Gallery</span>
                </Button>
                <Button variant={previewType === 'artist' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('artist')} className="flex items-center space-x-1">
                  <Palette className="w-4 h-4" />
                  <span className="text-xs">Artist</span>
                </Button>
                <Button variant={previewType === 'components' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('components')} className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Components</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview root (scaled) */}
          <div
            className="absolute left-1/2 bg-card border border-border rounded-lg shadow-lg"
            style={{
              top: '10vh',
              width: `${PREVIEW_WIDTH}px`,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center'
            }}
          >
            {previewType === 'saas' ? <HomepagePreview /> : 
             previewType === 'gallery' ? <GalleryPreview /> : 
             previewType === 'artist' ? <ArtistPreview /> : 
             <ComponentPreview />}
          </div>
        </div>

        {/* Decision / controls */}
        <div className="w-[506px] min-w-[20rem] bg-popover border-l border-border p-8 overflow-y-auto">
          {currentStep === 0 ? (
            <ThemeChooser
              themeKeys={Object.keys(availableThemes)}
              activeKey={activeThemeKey}
              availableThemes={availableThemes}
              onThemeSelect={handleThemeSelection}
              prettify={prettify}
              getMostImportantColors={getMostImportantColors}
              getThemeFonts={getThemeFonts}
              cleanFamily={cleanFamily}
            />
          ) : currentStep === 1 ? (
            <ColorsTab activeThemeKey={activeThemeKey} />
          ) : currentStep === 2 ? (
            <TypographyTab activeThemeKey={activeThemeKey} />
          ) : currentStep === 4 ? (
            <ExportTab activeThemeKey={activeThemeKey} />
          ) : (
            <div>Decision Panel – {steps[currentStep]}</div>
          )}
        </div>
      </div>

      {/* Footer navigation */}
      <nav className="h-16 bg-popover border-t border-border flex items-center justify-between px-6">
        <Button variant="ghost" onClick={() => setCurrentStep(p => Math.max(0, p - 1))} disabled={currentStep === 0}>
          Back
        </Button>
        <div className="flex space-x-6">
          {steps.map((label, i) => (
            <button
              key={label}
              onClick={() => setCurrentStep(i)}
              className={`text-sm font-medium ${i === currentStep ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <Button onClick={() => setCurrentStep(p => Math.min(steps.length - 1, p + 1))} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </nav>

      {/* Diagnostic overlay */}
      <BrandContextDebugPanel />
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ThemeChooser sub‑component
 * ------------------------------------------------------------------------------------------------*/

interface ThemeChooserProps {
  themeKeys: string[];
  activeKey: string;
  availableThemes: any;
  onThemeSelect: (key: string) => void;
  prettify: (key: string) => string;
  getMostImportantColors: (colors: any[]) => any[];
  getThemeFonts: (fonts: FontToken[]) => any[];
  cleanFamily: (family: string) => string;
}

function ThemeChooser({
  themeKeys,
  activeKey,
  availableThemes,
  onThemeSelect,
  prettify,
  getMostImportantColors,
  getThemeFonts,
  cleanFamily
}: ThemeChooserProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Choose Your Theme</h3>
        <div className="grid gap-3">
          {themeKeys.map(key => {
            const th = availableThemes[key];
            if (!th) return null;

            const displayName = prettify(key);
            const importantColors = getMostImportantColors(th.colors);
            const themeFonts = getThemeFonts(th.fonts);
            const headingFont = themeFonts.find(f => f.usage === 'heading')?.family || themeFonts[0]?.family;
            const bodyFont = themeFonts.find(f => f.usage === 'body')?.family || themeFonts[1]?.family || themeFonts[0]?.family;

            return (
              <Card
                key={key}
                onClick={() => onThemeSelect(key)}
                className={`group relative cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
                  activeKey === key ? 'ring-1 ring-primary/40 bg-accent/30 border-primary/20 shadow-lg' : 'hover:bg-accent/20'
                }`}
                style={{ fontFamily: bodyFont || 'inherit' }}
              >
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Top row: swatches + name */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-1">
                          {importantColors.map((c, idx) => (
                            <div
                              key={c.variableName}
                              className="w-8 h-8 rounded-full shadow-sm"
                              style={{ backgroundColor: c.oklch, zIndex: 5 - idx }}
                              title={`${c.name} (${c.roles.join(', ')})`}
                            />
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground" style={{ fontFamily: headingFont || 'inherit' }}>
                            {displayName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {th.colors.length} colors • {th.fonts.length} font{th.fonts.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Font sample row */}
                    {themeFonts.length > 0 && (
                      <div className="text-xs font-normal text-muted-foreground truncate">
                        {themeFonts.map((f, idx) => (
                          <span key={idx}>
                            {idx > 0 && <span className="mx-2 opacity-30">·</span>}
                            <span
                              style={{ fontFamily: f.family }}
                              className="opacity-70"
                              title={`${cleanFamily(f.family)} — ${f.usage} typeface`}
                            >
                              {cleanFamily(f.family)}
                            </span>
                          </span>
                        ))}
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
  );
}
