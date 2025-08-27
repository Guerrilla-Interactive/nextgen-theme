"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Toggle } from "@/features/unorganized-components/ui/toggle";
import { BrandProvider, useBrand, UIProvider, useUIContext } from "./BrandContext";
import { themes } from "./brandguide";
import {
  FontToken,
  influenceHierarchy,
  type Role
} from "./brand-utils";
import {
  Card,
  CardContent
} from "@/features/unorganized-components/ui/card";
import {
  Image,
  Palette,
  Settings,
  Monitor,
  MousePointer
} from "lucide-react";
import { ExportTab } from "./tabs/export-tab.component";
import { ColorsTab } from "./tabs/colors-tab.component";
import { TypographyTab } from "./tabs/typography-tab.component";
import { InteractionTab } from "./tabs/interaction-tab.component";
import HomepageExampleTokenized from "./previews/HomepageExampleTokenized";

// Cache of Google font families already requested
const loadedGoogleFontFamilies: Set<string> = typeof window !== 'undefined' ? (window as any).__loadedGoogleFonts ?? new Set<string>() : new Set<string>();
if (typeof window !== 'undefined' && !(window as any).__loadedGoogleFonts) {
  (window as any).__loadedGoogleFonts = loadedGoogleFontFamilies;
}

const ensureUnionFontLink = () => {
  if (typeof document === 'undefined') return;
  const id = 'blueprint-fonts-union';
  let link = document.getElementById(id) as HTMLLinkElement | null;
  const families = Array.from(loadedGoogleFontFamilies);
  if (families.length === 0) return;
  const href = `https://fonts.googleapis.com/css?family=${families
    .map((f) => `${f.replace(/\s+/g, '+')}:300,400,500,600,700`)
    .join('|')}&display=swap`;
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-font-loader', 'blueprint-union');
    document.head.appendChild(link);
  } else if (link.href !== href) {
    link.href = href;
  }
};
// ---------- ORDER THEMES BY RATING THEN NAME ----------
const ORDERED_THEME_KEYS = Object.entries(themes)
  .sort(([, A], [, B]) => {
    const rA = A?.rating ?? 0;
    const rB = B?.rating ?? 0;
    if (rA !== rB) return rB - rA; // higher rating first
    const nA = A?.name ?? "";
    const nB = B?.name ?? "";
    return nA.localeCompare(nB);
  })
  .map(([k]) => k);

// Pick the highest-rated as the start theme, with fallbacks
const FIRST_THEME_KEY =
  ORDERED_THEME_KEYS[0] ??
  (themes["nextgen"] ? "nextgen" : undefined) ??
  (themes["default"] ? "default" : "default");

/* -------------------------------------------------------------------------------------------------
 * BlueprintPage
 * ------------------------------------------------------------------------------------------------*/
export default function BlueprintPage() {
  return (
    <BrandProvider initialThemes={themes} initialThemeKey={FIRST_THEME_KEY}>
      <UIProvider initialTab="preset">
        <PageContent />
      </UIProvider>
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

  const { activeTab, showTokenTargeting, setShowTokenTargeting } = useUIContext();

  const [previewType, setPreviewType] = useState<'saas' | 'gallery' | 'artist' | 'components'>('saas');
  const steps = ["Preset", "Colors", "Typography", "Interaction", "Export"] as const;
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const tabToStepMap: Record<string, number> = {
      'preset': 0,
      'colors': 1,
      'typography': 2,
      'interaction': 3,
      'export': 4
    };
    if (activeTab && tabToStepMap[activeTab] !== undefined) {
      setCurrentStep(tabToStepMap[activeTab]);
    }
  }, [activeTab]);

  // ----- Font preloading -----
  useEffect(() => {
    if (!availableThemes || !activeThemeKey) return;
    const activeTheme = (availableThemes as any)[activeThemeKey];
    const googleFamilies = new Set<string>();
    activeTheme?.fonts?.forEach((font: FontToken) => {
      if (font.distributor === 'Google Fonts') {
        const family = font.family.split(',')[0].replace(/["']/g, '').trim();
        if (family && !loadedGoogleFontFamilies.has(family)) googleFamilies.add(family);
      }
    });
    if (googleFamilies.size) {
      Array.from(googleFamilies).forEach(f => loadedGoogleFontFamilies.add(f));
      ensureUnionFontLink();
    }
  }, [availableThemes, activeThemeKey]);

  // ----- Inline CSS vars -----
  const inlineThemeVars = useMemo(() => {
    if (!brand?.themeCssVariables) return {};
    return Object.fromEntries(
      Object.entries(brand.themeCssVariables).map(([k, v]) => [`--${k}`, v])
    );
  }, [brand]);

  const PREVIEW_WIDTH = 1600;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth * 0.6) / PREVIEW_WIDTH));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleThemeSelection = useCallback((key: string) => {
    if (!availableThemes || !key || key === activeThemeKey) return;
    const targetTheme: any = (availableThemes as any)[key];
    if (!targetTheme) return;
    setActiveTheme(key);
  }, [availableThemes, activeThemeKey, setActiveTheme]);

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

  const cleanFamily = (family: string) => family.split(',')[0].replace(/["']/g, '').trim();

  return (
    <div className={`h-screen flex flex-col bg-background text-foreground font-sans`} style={inlineThemeVars}>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative bg-muted p-4 overflow-y-auto overflow-x-hidden">
          {/* Targeting toggle */}
          <div className="absolute top-6 left-6 z-50">
            <Toggle
              size="default"
              pressed={showTokenTargeting}
              onPressedChange={(p) => setShowTokenTargeting(p)}
              aria-label="Toggle token targeting overlays"
              className="backdrop-blur supports-[backdrop-filter]:bg-card/70"
              title={showTokenTargeting ? 'Hide token targeting' : 'Show token targeting'}
            >
              <MousePointer className="h-5 w-5" />
            </Toggle>
          </div>
          {/* Preview-type toggle */}
          <div className="absolute top-6 right-6 z-50">
            <Card className="p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Button variant={previewType === 'saas' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('saas')}>
                  <Monitor className="w-4 h-4" /><span className="text-xs">SaaS</span>
                </Button>
                <Button variant={previewType === 'gallery' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('gallery')}>
                  <Image className="w-4 h-4" /><span className="text-xs">Gallery</span>
                </Button>
                <Button variant={previewType === 'artist' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('artist')}>
                  <Palette className="w-4 h-4" /><span className="text-xs">Artist</span>
                </Button>
                <Button variant={previewType === 'components' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewType('components')}>
                  <Settings className="w-4 h-4" /><span className="text-xs">Components</span>
                </Button>
              </div>
            </Card>
          </div>
          {/* Preview root */}
          <div
            className="absolute left-1/2 bg-card border border-border rounded-lg shadow-lg"
            style={{
              top: '10vh',
              width: `${PREVIEW_WIDTH}px`,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center'
            }}
            data-typography-scope
            id="preview-root"
          >
           <HomepageExampleTokenized />
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-[506px] min-w-[20rem] bg-popover border-l border-border p-8 overflow-y-auto">
          {currentStep === 0 && (
            <ThemeChooser
              themeKeys={ORDERED_THEME_KEYS}
              activeKey={activeThemeKey}
              availableThemes={availableThemes}
              onThemeSelect={handleThemeSelection}
              prettify={prettify}
              getMostImportantColors={getMostImportantColors}
              getThemeFonts={getThemeFonts}
              cleanFamily={cleanFamily}
            />
          )}
          {currentStep === 1 && <ColorsTab activeThemeKey={activeThemeKey} />}
          {currentStep === 2 && <TypographyTab activeThemeKey={activeThemeKey} />}
          {currentStep === 3 && <InteractionTab activeThemeKey={activeThemeKey} />}
          {currentStep === 4 && <ExportTab activeThemeKey={activeThemeKey} />}
        </div>
      </div>
      <nav className="h-16 bg-popover border-t border-border flex items-center justify-between px-6">
        <Button variant="ghost" onClick={() => setCurrentStep(p => Math.max(0, p - 1))} disabled={currentStep === 0}>Back</Button>
        <div className="flex space-x-6">
          {steps.map((label, i) => (
            <button key={label} onClick={() => setCurrentStep(i)} className={`text-sm font-medium ${i === currentStep ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {label}
            </button>
          ))}
        </div>
        <Button onClick={() => setCurrentStep(p => Math.min(steps.length - 1, p + 1))} disabled={currentStep === steps.length - 1}>Next</Button>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ThemeChooser
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
  useEffect(() => {
    try {
      if (!themeKeys?.length) return;
      const families = new Set<string>();
      themeKeys.forEach((key) => {
        const th = availableThemes?.[key];
        (th?.fonts || []).forEach((font: FontToken) => {
          if (font.distributor === 'Google Fonts') {
            const family = font.family.split(',')[0].replace(/["']/g, '').trim();
            if (family && !loadedGoogleFontFamilies.has(family)) families.add(family);
          }
        });
      });
      const LIMITED_MAX = 12;
      const limited = Array.from(families).slice(0, LIMITED_MAX);
      if (limited.length === 0) return;
      limited.forEach(f => loadedGoogleFontFamilies.add(f));
      ensureUnionFontLink();
    } catch {}
  }, [themeKeys, availableThemes]);

  const ThemeCard = memo(({ themeKey, th, active }: { themeKey: string; th: any; active: boolean }) => {
    const displayName = prettify(themeKey);
    const importantColors = useMemo(() => getMostImportantColors(th.colors), [th, getMostImportantColors]);
    const themeFonts = useMemo(() => getThemeFonts(th.fonts), [th, getThemeFonts]);
    const headingFont = themeFonts.find((f: any) => f.usage === 'heading')?.family ?? th.fonts?.[0]?.family;
    const bodyFont = themeFonts.find((f: any) => f.usage === 'body')?.family ?? th.fonts?.[1]?.family ?? th.fonts?.[0]?.family;
    return (
      <Card
        key={themeKey}
        onClick={() => onThemeSelect(themeKey)}
        className={`cursor-pointer transition-all duration-200 ${active ? 'ring-1 ring-primary/40 bg-accent/30 border-primary/20' : ''}`}
        style={{ fontFamily: bodyFont || 'inherit' }}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-1">
              {importantColors.map((c: any, idx: number) => (
                <div key={c.variableName} className="w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: c.oklch }} />
              ))}
            </div>
            <div>
              <h5 style={{ fontFamily: headingFont || 'inherit' }}>{displayName}</h5>
              <p className="text-sm text-muted-foreground">{th.colors.length} colors • {th.fonts.length} fonts</p>
            </div>
          </div>
          {themeFonts.length > 0 && (
            <div className="text-xs mt-2 opacity-70">
              {themeFonts.map((f, idx) => (
                <span key={idx} style={{ fontFamily: f.family }} title={f.family}>
                  {idx > 0 && " · "}
                  {cleanFamily(f.family)}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Your Theme</h3>
      <div className="grid gap-3">
        {themeKeys.map(key => {
          const th = availableThemes[key];
          if (!th) return null;
          return <ThemeCard key={key} themeKey={key} th={th} active={activeKey === key} />;
        })}
      </div>
    </div>
  );
}
