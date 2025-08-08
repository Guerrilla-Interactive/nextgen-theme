"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/features/unorganized-components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/features/unorganized-components/ui/sheet";
import { Card, CardContent, CardHeader } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Separator } from "@/features/unorganized-components/ui/separator";
import { Avatar, AvatarFallback } from "@/features/unorganized-components/ui/avatar";
import { Menu, ListFilter } from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";
import { useBrand } from "../BrandContext";
import { FontToken } from "../brand-utils";

const categories = ["All", "Abstract", "Landscape", "Portrait", "Nature"];

const galleryImages = [
  { src: "https://plus.unsplash.com/premium_photo-1664013263421-91e3a8101259?q=80&w=987", category: "Abstract", available: true, title: "Ethereal Dreams", price: "$1,200", year: "2023" },
  { src: "https://images.unsplash.com/photo-1619878627081-85dd33d8667e?w=500", category: "Landscape", available: false, title: "Mountain Solitude", price: "SOLD", year: "2022" },
  { src: "https://plus.unsplash.com/premium_photo-1669749216793-040be16ade1d?w=500", category: "Nature", available: true, title: "Forest Whispers", price: "$850", year: "2023" },
  { src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=500", category: "Portrait", available: true, title: "Silent Reflection", price: "$950", year: "2022" },
  { src: "https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?q=80", category: "Abstract", available: false, title: "Color Symphony", price: "SOLD", year: "2021" },
  { src: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80", category: "Landscape", available: true, title: "Valley of Light", price: "$1,400", year: "2023" },
  { src: "https://images.unsplash.com/photo-1612279713919-662c8e3d161f?q=80", category: "Nature", available: false, title: "Autumn's Grace", price: "SOLD", year: "2022" },
  { src: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80", category: "Portrait", available: true, title: "Inner Light", price: "$1,100", year: "2023" },
  { src: "https://images.unsplash.com/photo-1523372102243-c9426fc31b88?q=80", category: "Abstract", available: true, title: "Flowing Energy", price: "$750", year: "2021" },
];

function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
  className,
  onSelect,
  getRoleStyle,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  className?: string;
  onSelect?: () => void;
  getRoleStyle: (role: string, fallbackWeight?: string) => any;
}) {
  return (
    <Card className={cn("border-0 shadow-none bg-transparent p-0", className)} data-slot="card">
      <CardHeader className="p-0 pb-6">

      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategory(cat);
                  onSelect?.();
                }}
                className={cn(
                  "w-full justify-start h-auto px-3 py-2 capitalize text-base transition-all duration-200 rounded-md",
                  selectedCategory === cat
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
                style={getRoleStyle('nav', selectedCategory === cat ? '600' : '400')}
              >
                {cat}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Smart Image component that automatically handles aspect ratios and responsive sizing
function SmartImage({
  src,
  alt,
  category,
  title,
  price,
  year
}: {
  src: string;
  alt: string;
  category: string;
  title: string;
  price: string;
  year: string;
}) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  const getResponsiveSize = () => {
    if (!imageDimensions) return { width: "w-full", height: "h-auto" };

    const aspectRatio = imageDimensions.width / imageDimensions.height;

    // Wide landscape images - let them be wider
    if (aspectRatio > 1.8) {
      return {
        width: "w-full",
        height: "h-auto max-h-80",
        extraClasses: "sm:col-span-2"
      };
    }

    // Standard landscape
    if (aspectRatio > 1.2) {
      return {
        width: "w-full",
        height: "h-auto",
        extraClasses: "md:col-span-2 xl:col-span-1"
      };
    }

    // Portrait orientation - tall images
    if (aspectRatio < 0.7) {
      return {
        width: "w-full",
        height: "h-auto",
        extraClasses: "sm:col-span-1 md:col-span-1"
      };
    }

    // Square or nearly square
    return {
      width: "w-full",
      height: "h-auto",
      extraClasses: ""
    };
  };

  const { width, height, extraClasses } = getResponsiveSize();

  return (
    <div
      className={cn(
        "overflow-hidden group transition-all duration-300 break-inside-avoid mb-6 cursor-pointer",
        extraClasses
      )}
      style={{
        opacity: isLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
      }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={imageDimensions?.width || 800}
          height={imageDimensions?.height || 1200}
          className={cn(
            "object-cover shadow-sm transition-all duration-300",
            width,
            height
          )}
          unoptimized
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent via-60% to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Metadata overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {/* Year - Top Left */}
          <div className="absolute top-4 left-4 text-white text-sm font-medium">
            {year}
          </div>

          {/* Title - Bottom Left */}
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>

          {/* Price - Bottom Right */}
          <div className="absolute bottom-4 right-4 text-white">
            <span className="text-lg font-semibold">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtistPreview() {
  const { brand, processedBrand, getFontWeightForRole, getFontSizeForRole } = useBrand();

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

  // Monitor CSS variable changes directly and watch for style[data-brand-theme] changes
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

        // Also watch for changes to the brand theme style element
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
        // Small delay to ensure CSS changes are fully applied
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
      success: 'rgb(34, 197, 94)',     // green-500 fallback
      warning: 'rgb(245, 158, 11)',    // amber-500 fallback
      info: 'rgb(59, 130, 246)',       // blue-500 fallback
      accent1: 'rgb(168, 85, 247)',    // purple-500 fallback
      accent2: 'rgb(239, 68, 68)',     // red-500 fallback
      accent3: 'rgb(245, 158, 11)',    // yellow-500 fallback
    };

    // Try to get colors from theme, with smart fallbacks
    const getColorByRole = (roles: string[], fallback: string) => {
      for (const role of roles) {
        const color = brand.colors.find(c => c.roles && Array.isArray(c.roles) && c.roles.includes(role as any));
        if (color) {
          return `rgb(${color.oklchLight})`;
        }
      }
      return fallback;
    };

    return {
      success: getColorByRole(['success', 'positive', 'green'], 'rgb(34, 197, 94)'),
      warning: getColorByRole(['warning', 'caution', 'yellow', 'amber'], 'rgb(245, 158, 11)'),
      info: getColorByRole(['info', 'blue', 'primary'], 'rgb(59, 130, 246)'),
      accent1: getColorByRole(['accent', 'secondary', 'purple', 'violet'], 'rgb(168, 85, 247)'),
      accent2: getColorByRole(['error', 'danger', 'red'], 'rgb(239, 68, 68)'),
      accent3: getColorByRole(['warning', 'yellow'], 'rgb(245, 158, 11)'),
    };
  };

  const themeColors = getThemeColors();

  // Tailwind font size scale mapping
  const TAILWIND_FONT_SIZES: Record<string, number> = {
    'text-xs': 0.75,
    'text-sm': 0.875,
    'text-base': 1,
    'text-lg': 1.125,
    'text-xl': 1.25,
    'text-2xl': 1.5,
    'text-3xl': 1.875,
    'text-4xl': 2.25,
    'text-5xl': 3,
    'text-6xl': 3.75,
    'text-7xl': 4.5
  };

  // Default role to size assignments
  const DEFAULT_ROLE_SIZE_ASSIGNMENTS: Record<string, string> = {
    body: 'text-base',
    p: 'text-base',
    default: 'text-base',
    h1: 'text-5xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    heading: 'text-2xl',
    display: 'text-7xl',
    code: 'text-sm',
    button: 'text-sm',
    caption: 'text-xs',
    badge: 'text-xs',
    link: 'text-sm',
    nav: 'text-sm',
    logo: 'text-2xl',
    name: 'text-base',
    subtitle: 'text-sm',
    quote: 'text-base',
    avatar: 'text-sm',
    input: 'text-sm',
    footer: 'text-sm',
  };

  // Helper function to get role-based font and size styles
  const getRoleStyle = (role: string, fallbackWeight: string = '400') => {
    // Get the assigned font for this role
    const assignedFont = brand?.fonts?.find(font =>
      font.roles?.includes(role)
    );

    // Get font family - prefer role-specific, fallback to heading/body, then inherit
    let fontFamily = 'inherit';
    if (assignedFont?.family) {
      fontFamily = assignedFont.family;
    } else if (role.includes('h') || role === 'heading' || role === 'display' || role === 'logo') {
      fontFamily = headingFont || 'inherit';
    } else {
      fontFamily = bodyFont || 'inherit';
    }

    // Get font size from role assignment
    const sizeKey = DEFAULT_ROLE_SIZE_ASSIGNMENTS[role] || 'text-base';
    const fontSize = `${TAILWIND_FONT_SIZES[sizeKey] || 1}rem`;

    // Get font weight
    const fontWeight = assignedFont && getFontWeightForRole ?
      assignedFont.weights?.[getFontWeightForRole(assignedFont.name, role) || 'regular'] || fallbackWeight
      : fallbackWeight;

    return {
      fontFamily,
      fontSize,
      fontWeight,
    };
  };

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFilterSheetOpen, setFilterSheetOpen] = useState(false)
  const [availabilityFilter, setAvailabilityFilter] = useState<"All" | "Available" | "Sold">("All")

  const filteredImages = galleryImages.filter((img) => {
    const categoryMatch = selectedCategory === "All" || img.category === selectedCategory;
    const availabilityMatch = availabilityFilter === "All" ||
      (availabilityFilter === "Available" && img.available) ||
      (availabilityFilter === "Sold" && !img.available);
    return categoryMatch && availabilityMatch;
  });

  return (
    <div
      key={`${renderKey}-${cssVariableUpdate}`}
      className="flex flex-col min-h-screen bg-background text-foreground"
      style={{
        // Force CSS variable re-evaluation by adding a custom property
        '--force-update': cssVariableUpdate as any,
        fontFamily: bodyFont || 'inherit'
      } as React.CSSProperties}
    >
      <header className="w-full border-b border-border">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-4 px-8">
          <Button
            variant="link"
            asChild
            className="p-0 h-auto text-2xl font-bold tracking-tight text-foreground hover:no-underline"
            style={getRoleStyle('logo', '700')}
          >
            <a href="#">Aurora Hart</a>
          </Button>
          <nav className="hidden md:flex gap-8 text-sm items-center">
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
              style={getRoleStyle('nav', '400')}
            >
              <a href="#gallery">Gallery</a>
            </Button>
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
              style={getRoleStyle('nav', '400')}
            >
              <a href="#about">About</a>
            </Button>
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
              style={getRoleStyle('nav', '400')}
            >
              <a href="#contact">Contact</a>
            </Button>
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background">
                <nav className="flex flex-col gap-6 text-lg p-6">
                  <Button
                    variant="link"
                    asChild
                    className="p-0 h-auto text-2xl font-bold tracking-tight text-foreground mb-4 hover:no-underline justify-start"
                    style={getRoleStyle('logo', '700')}
                  >
                    <a href="#">Aurora Hart</a>
                  </Button>
                  <Button
                    variant="link"
                    asChild
                    className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline justify-start"
                    style={getRoleStyle('nav', '400')}
                  >
                    <a href="#gallery">Gallery</a>
                  </Button>
                  <Button
                    variant="link"
                    asChild
                    className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline justify-start"
                    style={getRoleStyle('nav', '400')}
                  >
                    <a href="#about">About</a>
                  </Button>
                  <Button
                    variant="link"
                    asChild
                    className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline justify-start"
                    style={getRoleStyle('nav', '400')}
                  >
                    <a href="#contact">Contact</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full max-w-screen-2xl mx-auto">
        <div className="flex">
          <aside className="hidden lg:block w-72 border-r border-border">
            <div className="py-12 px-8">
              <CategoryFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                getRoleStyle={getRoleStyle}
              />
            </div>
          </aside>

          <main className="flex-1">
            <section id="about" className="pt-16 pb-20 md:pt-24 md:pb-28 px-12">
              <h1
                className="text-5xl md:text-7xl text-foreground max-w-3xl"
                style={getRoleStyle('h1', '700')}
              >
                Hi there.
              </h1>
              <p
                className="mt-4 max-w-2xl text-lg text-muted-foreground"
                style={getRoleStyle('p', '400')}
              >
                I'm Aurora Hart, a Norwegian painter based in Oslo, deeply inspired by the ethereal beauty of the fjords
                and the enchanting glow of the midnight sun.
              </p>
            </section>

            <section id="gallery" className="px-12 pb-24">
              <div className="flex justify-between items-baseline mb-8">
                <h2
                  className="text-3xl font-bold capitalize text-foreground"
                  style={getRoleStyle('h2', '700')}
                >
                  {selectedCategory} Works
                </h2>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2">
                    {(["All", "Available", "Sold"] as const).map((filter) => (
                      <Button
                        key={filter}
                        variant="ghost"
                        onClick={() => setAvailabilityFilter(filter)}
                        className={cn(
                          "px-3 py-2 text-sm transition-all duration-200 rounded-md",
                          availabilityFilter === filter
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        )}
                        style={getRoleStyle('nav', availabilityFilter === filter ? '600' : '400')}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                  <div className="lg:hidden">
                    <Sheet open={isFilterSheetOpen} onOpenChange={setFilterSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="border-border bg-transparent">
                          <ListFilter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-full max-w-xs bg-background">
                        <CategoryFilters
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                          className="pt-12"
                          onSelect={() => setFilterSheetOpen(false)}
                          getRoleStyle={getRoleStyle}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>

              <div className="columns-1 sm:columns-2 xl:columns-2 gap-6">
                {filteredImages.map((img) => (
                  <SmartImage
                    key={img.src}
                    src={img.src}
                    alt={`Artwork by Aurora Hart - ${img.category}`}
                    category={img.category}
                    title={img.title}
                    price={img.price}
                    year={img.year}
                  />
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>

      <Separator />

      <footer id="contact" className="py-16 px-12">
        <div className="text-center space-y-4">
          <p
            className="text-sm text-muted-foreground"
            style={getRoleStyle('footer', '400')}
          >
            &copy; {new Date().getFullYear()} Aurora Hart. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
              style={getRoleStyle('link', '400')}
            >
              <a href="mailto:hello@aurorahart.com">Contact</a>
            </Button>
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
              style={getRoleStyle('link', '400')}
            >
              <a href="#">About</a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}