import * as React from "react";
import { useBrand } from "../BrandContext";
import { AllComponentsShowcase } from "../../brandguide/components/all-components-showcase.component";
import { FontToken } from "../brand-utils";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Separator } from "@/features/unorganized-components/ui/separator";
import { TooltipProvider } from "@/features/unorganized-components/ui/tooltip";


export default function ComponentPreview() {
  const { brand, processedBrand } = useBrand();

  // Force re-render when brand changes to ensure CSS variables are applied
  const [renderKey, setRenderKey] = React.useState(0);
  const [cssVariableUpdate, setCssVariableUpdate] = React.useState(0);

  React.useEffect(() => {
    if (brand) {
      setRenderKey(prev => prev + 1);
    }
  }, [brand]);

  // Enhanced effect to monitor both brand and processedBrand changes
  React.useEffect(() => {
    if (processedBrand) {
      setCssVariableUpdate(prev => prev + 1);

      // Force a style recalculation after a short delay
      setTimeout(() => {
        if (typeof window !== "undefined") {
          // Force browser to recalculate styles
          document.documentElement.offsetHeight;
          setRenderKey(prev => prev + 1);
        }
      }, 50);
    }
  }, [processedBrand]);

  // Monitor CSS variable changes directly
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new MutationObserver((mutations) => {
      let needsRerender = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement;
          if (target === document.documentElement) {
            needsRerender = true;
          }
        }

        // Watch for changes to the brand theme style element
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              if (element.tagName === 'STYLE' && element.hasAttribute('data-brand-theme')) {
                needsRerender = true;
              }
            }
          });
        }

        // Watch for content changes in existing brand theme style element
        if (mutation.type === 'characterData') {
          const parentElement = mutation.target.parentElement;
          if (parentElement?.tagName === 'STYLE' && parentElement.hasAttribute('data-brand-theme')) {
            needsRerender = true;
          }
        }
      });

      if (needsRerender) {
        setCssVariableUpdate(prev => prev + 1);
        setTimeout(() => {
          setRenderKey(prev => prev + 1);
        }, 100);
      }
    });

    // Observe changes to document.documentElement style attribute
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    // Observe changes to document.head for style element additions/removals
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Get theme fonts and categorize them
  const getThemeFonts = () => {
    if (!brand?.fonts || brand.fonts.length === 0) {
      return { headingFont: undefined, bodyFont: undefined };
    }

    const headingFont = brand.fonts.find((font: FontToken) =>
      font.roles?.includes('heading') || font.roles?.includes('display') || font.roles?.includes('h1')
    )?.family || brand.fonts[0]?.family;

    const bodyFont = brand.fonts.find((font: FontToken) =>
      font.roles?.includes('body') || font.roles?.includes('text') || font.roles?.includes('p')
    )?.family || brand.fonts[1]?.family || brand.fonts[0]?.family;

    return { headingFont, bodyFont };
  };

  const { headingFont, bodyFont } = getThemeFonts();

  // Helper function to get theme colors dynamically
  const getThemeColors = () => {
    if (!brand?.colors) return {
      success: 'rgb(34, 197, 94)',
      warning: 'rgb(245, 158, 11)',
      info: 'rgb(59, 130, 246)',
      accent1: 'rgb(168, 85, 247)',
    };

    const getColorByRole = (roles: string[], fallback: string) => {
      for (const role of roles) {
        const color = brand.colors.find(c => c.roles?.includes(role as any));
        if (color) {
          return `rgb(${color.oklch})`;
        }
      }
      return fallback;
    };

    return {
      success: getColorByRole(['success', 'positive', 'green'], 'rgb(34, 197, 94)'),
      warning: getColorByRole(['warning', 'caution', 'yellow', 'amber'], 'rgb(245, 158, 11)'),
      info: getColorByRole(['info', 'blue', 'primary'], 'rgb(59, 130, 246)'),
      accent1: getColorByRole(['accent', 'secondary', 'purple', 'violet'], 'rgb(168, 85, 247)'),
    };
  };

  const themeColors = getThemeColors();

  // Role-based styling helper (consistent with HomepagePreview)
  const getRoleStyle = (role: string, fallbackWeight: string = '400') => {
    const assignedFont = brand?.fonts?.find(font =>
      font.roles?.includes(role)
    );

    let fontFamily = 'inherit';
    if (assignedFont?.family) {
      fontFamily = assignedFont.family;
    } else if (role.includes('h') || role === 'heading' || role === 'display' || role === 'logo') {
      fontFamily = headingFont || 'inherit';
    } else {
      fontFamily = bodyFont || 'inherit';
    }

    const TAILWIND_FONT_SIZES: Record<string, number> = {
      'text-xs': 0.75, 'text-sm': 0.875, 'text-base': 1, 'text-lg': 1.125,
      'text-xl': 1.25, 'text-2xl': 1.5, 'text-3xl': 1.875, 'text-4xl': 2.25,
      'text-5xl': 3, 'text-6xl': 3.75
    };

    const DEFAULT_ROLE_SIZE_ASSIGNMENTS: Record<string, string> = {
      body: 'text-base', p: 'text-base', default: 'text-base',
      h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl', h4: 'text-xl',
      h5: 'text-lg', h6: 'text-base', heading: 'text-2xl', display: 'text-5xl',
      caption: 'text-xs', badge: 'text-xs', button: 'text-sm'
    };

    const sizeKey = DEFAULT_ROLE_SIZE_ASSIGNMENTS[role] || 'text-base';
    const fontSize = `${TAILWIND_FONT_SIZES[sizeKey] || 1}rem`;

    return { fontFamily, fontSize, fontWeight: fallbackWeight };
  };

  if (!brand) {
    return (
      <div className="w-full h-full bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Loading components...</p>
      </div>
    );
  }

  // Count total components for stats
  const componentCount = Object.keys(import("../../brandguide/components/component-token-map")).length || 50;
  const variantCount = componentCount * 3; // Rough estimate of variants

  return (
    <div
      key={`${renderKey}-${cssVariableUpdate}`}
      className="w-full h-full bg-background text-foreground overflow-y-auto"
      style={{
        '--force-update': cssVariableUpdate as any,
        fontFamily: bodyFont || 'inherit'
      } as React.CSSProperties}
    >
      <TooltipProvider>
        <div className="bg-background text-foreground">
          {/* Hero Header */}
          <section className="py-20 pb-12 px-8 text-center bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Badge
                  variant="outline"
                  className="border-opacity-20 bg-opacity-10"
                  style={{
                    borderColor: themeColors.info,
                    backgroundColor: `${themeColors.info}20`,
                    color: themeColors.info,
                    ...getRoleStyle('badge', '500')
                  }}
                >
                  ✨ Live Theme Preview
                </Badge>
              </div>

              <h1
                className="text-5xl font-bold mb-6 leading-tight"
                style={getRoleStyle('h1', '800')}
              >
                Complete Component
                <span className="text-primary"> Design System</span>
              </h1>

              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                style={getRoleStyle('p', '400')}
              >
                Browse our complete collection of components. Each one is built with accessibility in mind and supports all theme customizations. Hover over the info icon to see which design tokens influence each component.
              </p>

            </div>
          </section>



          <Separator />


          {/* Main Component Showcase */}
          <section className="py-20">
            <div className="px-8">


              <AllComponentsShowcase />
            </div>
          </section>


          {/* Footer */}
          <footer className="py-8 px-8 border-t border-border bg-muted/20">
            <div className="max-w-6xl mx-auto text-center">
              <p
                className="text-sm text-muted-foreground"
                style={getRoleStyle('caption', '400')}
              >
                This showcase demonstrates all components with real-time theme switching and live styling updates.
                Components automatically adapt to your brand colors, fonts, and animation preferences.
              </p>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </div>
  );
} 