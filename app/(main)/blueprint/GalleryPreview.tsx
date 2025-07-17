import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/features/unorganized-components/ui/card";
import { Button } from "@/features/unorganized-components/ui/button";
import { Camera, Heart, Share2, User, Calendar, MapPin, Eye, Star, ArrowRight, Play } from "lucide-react";
import { Separator } from "@/features/unorganized-components/ui/separator";
import { Input } from "@/features/unorganized-components/ui/input";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Avatar, AvatarFallback } from "@/features/unorganized-components/ui/avatar";
import { useBrand } from "./BrandContext";
import { FontToken } from "./brand-utils";

export default function GalleryPreview() {
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
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });
    
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
    'text-6xl': 3.75
  };

  // Default role to size assignments
  const DEFAULT_ROLE_SIZE_ASSIGNMENTS: Record<string, string> = {
    body: 'text-base',
    p: 'text-base',
    default: 'text-base',
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    heading: 'text-2xl',
    display: 'text-5xl',
    code: 'text-sm',
    button: 'text-sm',
    caption: 'text-xs',
    badge: 'text-xs',
    link: 'text-sm',
    nav: 'text-sm',
    logo: 'text-xl',
    name: 'text-base',
    subtitle: 'text-sm',
    quote: 'text-base',
    avatar: 'text-sm',
    input: 'text-sm',
    footer: 'text-sm',
    question: 'text-base',
    answer: 'text-sm',
    artist: 'text-sm',
    title: 'text-lg',
    category: 'text-xs',
    price: 'text-lg',
    description: 'text-sm',
    meta: 'text-xs',
  };

  // Helper function to get role-based font and size styles
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

    const sizeKey = DEFAULT_ROLE_SIZE_ASSIGNMENTS[role] || 'text-base';
    const fontSize = `${TAILWIND_FONT_SIZES[sizeKey] || 1}rem`;

    const fontWeight = assignedFont && getFontWeightForRole ? 
      assignedFont.weights?.[getFontWeightForRole(assignedFont.name, role) || 'regular'] || fallbackWeight
      : fallbackWeight;

    return {
      fontFamily,
      fontSize,
      fontWeight,
    };
  };

  // Helper function to get theme colors
  const getThemeColors = () => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--primary') || '#6366f1',
        secondary: getComputedStyle(root).getPropertyValue('--secondary') || '#f59e0b',
        accent1: getComputedStyle(root).getPropertyValue('--accent-1') || '#14b8a6',
        accent2: getComputedStyle(root).getPropertyValue('--accent-2') || '#8b5cf6',
        info: getComputedStyle(root).getPropertyValue('--info') || '#3b82f6',
        success: getComputedStyle(root).getPropertyValue('--success') || '#10b981',
        warning: getComputedStyle(root).getPropertyValue('--warning') || '#f59e0b',
        error: getComputedStyle(root).getPropertyValue('--error') || '#ef4444',
        neutral: getComputedStyle(root).getPropertyValue('--neutral') || '#6b7280',
      };
    }
    return {
      primary: '#6366f1',
      secondary: '#f59e0b',
      accent1: '#14b8a6',
      accent2: '#8b5cf6',
      info: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      neutral: '#6b7280',
    };
  };

  const themeColors = getThemeColors();

  return (
    <div 
      key={`${renderKey}-${cssVariableUpdate}`} 
      className="w-full h-full bg-background text-foreground"
      style={{ 
        '--force-update': cssVariableUpdate as any,
        fontFamily: bodyFont || 'inherit'
      } as React.CSSProperties}
    >
      {/* Visual indicator for current primary color */}
      <div className="fixed top-4 right-4 z-50 bg-card border rounded p-2 text-xs shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--primary)] border"></div>
          <span>Gallery Theme (r#{renderKey} c#{cssVariableUpdate})</span>
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-background text-foreground">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between py-4 px-6 border-b">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-2xl font-light tracking-wide"
                style={getRoleStyle('logo', '300')}
              >
                Lumina
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-sm tracking-wide hover:text-primary transition-colors"
                style={getRoleStyle('nav', '400')}
              >
                EXHIBITIONS
              </a>
              <a
                href="#"
                className="text-sm tracking-wide hover:text-primary transition-colors"
                style={getRoleStyle('nav', '400')}
              >
                ARTISTS
              </a>
              <a
                href="#"
                className="text-sm tracking-wide hover:text-primary transition-colors"
                style={getRoleStyle('nav', '400')}
              >
                COLLECTIONS
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="tracking-wide"
              style={getRoleStyle('button', '400')}
            >
              Search
            </Button>
            <Button 
              className="tracking-wide"
              style={getRoleStyle('button', '500')}
              data-slot="button"
            >
              Visit
            </Button>
          </div>
        </nav>

        {/* Hero Section with Large Image */}
        <section className="relative h-[70vh] overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(to bottom right, ${themeColors.primary}20, ${themeColors.secondary}30, ${themeColors.accent1}20),
                          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect fill="%23000" width="1920" height="1080"/><g opacity="0.1"><rect x="480" y="270" width="960" height="540" fill="%23fff"/></g></svg>')` 
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex items-center justify-center px-8">
            <div className="text-center text-white max-w-4xl">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                style={getRoleStyle('display', '700')}
              >
                Lumina Gallery
              </h1>
              <p
                className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
                style={getRoleStyle('subtitle', '400')}
              >
                Discover extraordinary contemporary art from emerging and established artists around the world
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-black hover:bg-white/90 px-8 py-3 text-lg"
                  style={getRoleStyle('button', '600')}
                >
                  Explore Collection
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
                  style={getRoleStyle('button', '600')}
                >
                  View Exhibitions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artworks - Large Format */}
        <section className="px-6 py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2
                className="text-4xl font-light mb-4 tracking-wide"
                style={getRoleStyle('h2', '300')}
              >
                Featured Artworks
              </h2>
              <p 
                className="text-lg text-muted-foreground"
                style={getRoleStyle('p', '400')}
              >
                Discover our curated selection of contemporary masterpieces
              </p>
            </div>
            <Button 
              variant="outline"
              className="tracking-wide"
              style={getRoleStyle('button', '400')}
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Large Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Featured Artwork 1 */}
            <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300" data-slot="card">
              <div className="relative aspect-[3/4]">
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${themeColors.info}40, ${themeColors.accent1}60)`
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex gap-3">
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4">
                  <Badge 
                    className="text-white border-white/30"
                    style={{ 
                      backgroundColor: `${themeColors.success}90`,
                      ...getRoleStyle('price', '600')
                    }}
                  >
                    $12,500
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: themeColors.info,
                      color: themeColors.info,
                      ...getRoleStyle('category', '500')
                    }}
                  >
                    Contemporary
                  </Badge>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: themeColors.accent1,
                      color: themeColors.accent1,
                      ...getRoleStyle('category', '500')
                    }}
                  >
                    Oil on Canvas
                  </Badge>
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={getRoleStyle('title', '700')}
                >
                  "Urban Reflections"
                </h3>
                <p
                  className="text-lg text-muted-foreground mb-3"
                  style={getRoleStyle('artist', '600')}
                >
                  by Elena Rodriguez
                </p>
                <p
                  className="text-sm text-muted-foreground mb-4 leading-relaxed"
                  style={getRoleStyle('description', '400')}
                >
                  A striking exploration of modern city life through abstract forms and vibrant colors, 
                  capturing the energy and complexity of urban environments.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: themeColors.warning }} />
                      ))}
                    </div>
                    <span
                      className="text-sm text-muted-foreground"
                      style={getRoleStyle('meta', '400')}
                    >
                      (24 reviews)
                    </span>
                  </div>
                  <Button 
                    size="sm"
                    style={{ 
                      backgroundColor: themeColors.primary,
                      ...getRoleStyle('button', '600')
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Artwork 2 */}
            <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300" data-slot="card">
              <div className="relative aspect-[3/4]">
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${themeColors.accent2}40, ${themeColors.secondary}60)`
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex gap-3">
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4">
                  <Badge 
                    className="text-white border-white/30"
                    style={{ 
                      backgroundColor: `${themeColors.success}90`,
                      ...getRoleStyle('price', '600')
                    }}
                  >
                    $8,750
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: themeColors.accent2,
                      color: themeColors.accent2,
                      ...getRoleStyle('category', '500')
                    }}
                  >
                    Digital Art
                  </Badge>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: themeColors.secondary,
                      color: themeColors.secondary,
                      ...getRoleStyle('category', '500')
                    }}
                  >
                    Limited Edition
                  </Badge>
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={getRoleStyle('title', '700')}
                >
                  "Digital Dreams"
                </h3>
                <p
                  className="text-lg text-muted-foreground mb-3"
                  style={getRoleStyle('artist', '600')}
                >
                  by Marcus Chen
                </p>
                <p
                  className="text-sm text-muted-foreground mb-4 leading-relaxed"
                  style={getRoleStyle('description', '400')}
                >
                  An innovative digital composition that blurs the boundaries between traditional and 
                  contemporary art, featuring ethereal landscapes and futuristic elements.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: themeColors.warning }} />
                      ))}
                    </div>
                    <span
                      className="text-sm text-muted-foreground"
                      style={getRoleStyle('meta', '400')}
                    >
                      (18 reviews)
                    </span>
                  </div>
                  <Button 
                    size="sm"
                    style={{ 
                      backgroundColor: themeColors.primary,
                      ...getRoleStyle('button', '600')
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Smaller Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: "Abstract Expressions", 
                count: 23, 
                colors: [themeColors.accent2, themeColors.primary],
                category: "abstract"
              },
              { 
                name: "Modern Sculptures", 
                count: 17, 
                colors: [themeColors.info, themeColors.accent1],
                category: "sculpture"
              },
              { 
                name: "Digital Innovations", 
                count: 31, 
                colors: [themeColors.secondary, themeColors.accent2],
                category: "digital"
              },
              { 
                name: "Nature Studies", 
                count: 28, 
                colors: [themeColors.success, themeColors.primary],
                category: "nature"
              }
            ].map((collection, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300" data-slot="card">
                <div className="relative aspect-square overflow-hidden">
                  <div 
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${collection.colors[0]}40, ${collection.colors[1]}60)`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge 
                      className="mb-2"
                      style={{ 
                        backgroundColor: `${collection.colors[0]}90`,
                        color: 'white',
                        ...getRoleStyle('category', '500')
                      }}
                    >
                      {collection.count} pieces
                    </Badge>
                    <h3
                      className="text-lg font-semibold text-white"
                      style={getRoleStyle('title', '600')}
                    >
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Artist Spotlight with Large Image */}
        <section className="px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Artist Image */}
            <div className="relative">
              <div 
                className="aspect-square rounded-lg overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${themeColors.primary}30, ${themeColors.accent1}50)`
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Avatar className="w-32 h-32">
                    <AvatarFallback 
                      className="text-3xl text-white"
                      style={{ 
                        backgroundColor: themeColors.primary,
                        ...getRoleStyle('avatar', '700')
                      }}
                    >
                      AR
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="p-4 bg-white/95 backdrop-blur-sm" data-slot="card">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div
                        className="text-lg font-bold"
                        style={getRoleStyle('meta', '700')}
                      >
                        47
                      </div>
                      <div
                        className="text-xs text-muted-foreground"
                        style={getRoleStyle('caption', '400')}
                      >
                        Artworks
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-lg font-bold"
                        style={getRoleStyle('meta', '700')}
                      >
                        12k
                      </div>
                      <div
                        className="text-xs text-muted-foreground"
                        style={getRoleStyle('caption', '400')}
                      >
                        Followers
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-lg font-bold"
                        style={getRoleStyle('meta', '700')}
                      >
                        95%
                      </div>
                      <div
                        className="text-xs text-muted-foreground"
                        style={getRoleStyle('caption', '400')}
                      >
                        Sold
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Artist Info */}
            <div>
              <Badge 
                className="mb-4"
                style={{ 
                  backgroundColor: `${themeColors.info}20`,
                  color: themeColors.info,
                  borderColor: themeColors.info,
                  ...getRoleStyle('badge', '500')
                }}
              >
                Featured Artist
              </Badge>
              <h2
                className="text-4xl font-bold mb-4"
                style={getRoleStyle('h2', '700')}
              >
                Aria Blackwood
              </h2>
              <p
                className="text-xl text-muted-foreground mb-6 leading-relaxed"
                style={getRoleStyle('subtitle', '400')}
              >
                Contemporary sculptor pushing the boundaries of mixed media art with her innovative 
                use of recycled materials and digital integration.
              </p>
              <p
                className="text-base text-muted-foreground mb-8 leading-relaxed"
                style={getRoleStyle('description', '400')}
              >
                Based in New York, Aria's work has been featured in galleries across the world, 
                from the MoMA to the Tate Modern. Her latest series explores the intersection 
                of technology and nature, creating pieces that respond to environmental data 
                and human interaction.
              </p>
              
              {/* Achievement Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: themeColors.success,
                    color: themeColors.success,
                    ...getRoleStyle('badge', '500')
                  }}
                >
                  MoMA Featured
                </Badge>
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: themeColors.warning,
                    color: themeColors.warning,
                    ...getRoleStyle('badge', '500')
                  }}
                >
                  Art Basel Winner
                </Badge>
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: themeColors.accent2,
                    color: themeColors.accent2,
                    ...getRoleStyle('badge', '500')
                  }}
                >
                  Rising Star 2024
                </Badge>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  style={{ 
                    backgroundColor: themeColors.primary,
                    ...getRoleStyle('button', '600')
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Follow Artist
                </Button>
                <Button 
                  variant="outline"
                  style={getRoleStyle('button', '600')}
                >
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Collection Showcase - Large Images */}
        <section className="px-6 py-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-light mb-6 tracking-wide"
              style={getRoleStyle('h2', '300')}
            >
              Curated Collections
            </h2>
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={getRoleStyle('p', '400')}
            >
              Explore our carefully curated collections showcasing diverse artistic movements and styles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                bg: 'from-amber-200 via-orange-300 to-red-300', 
                title: 'Contemporary Masters', 
                count: '42 pieces',
                description: 'Modern masterpieces from today\'s most influential artists'
              },
              { 
                bg: 'from-emerald-200 via-teal-300 to-cyan-300', 
                title: 'Nature\'s Symphony', 
                count: '28 pieces',
                description: 'Landscape photography celebrating the beauty of our natural world'
              }
            ].map((collection, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500" data-slot="card">
                <div className={`aspect-[4/3] bg-gradient-to-br ${collection.bg} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3
                      className="text-3xl font-medium mb-2"
                      style={getRoleStyle('h3', '500')}
                    >
                      {collection.title}
                    </h3>
                    <p
                      className="text-lg mb-4 opacity-90"
                      style={getRoleStyle('description', '400')}
                    >
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm opacity-75"
                        style={getRoleStyle('caption', '400')}
                      >
                        {collection.count}
                      </span>
                      <Button 
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                        style={getRoleStyle('button', '400')}
                      >
                        Explore
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Newsletter with Background Image */}
        <section className="px-6 py-20">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-200 to-purple-400"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative z-10 p-16 text-center text-white">
              <h3
                className="text-4xl font-light mb-6 tracking-wide"
                style={getRoleStyle('h3', '300')}
              >
                Stay Inspired
              </h3>
              <p 
                className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
                style={getRoleStyle('p', '400')}
              >
                Get exclusive access to new exhibitions, artist insights, and behind-the-scenes content. 
                Join our community of art enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
                  style={getRoleStyle('input', '400')}
                  data-slot="input" 
                />
                <Button 
                  className="whitespace-nowrap tracking-wide bg-white text-black hover:bg-white/90"
                  style={getRoleStyle('button', '500')}
                  data-slot="button"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="px-6 py-12 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-light tracking-wide"
                style={getRoleStyle('logo', '300')}
              >
                Lumina
              </span>
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <Button variant="link" className="p-0 h-auto" style={getRoleStyle('link', '400')}>
                About
              </Button>
              <Button variant="link" className="p-0 h-auto" style={getRoleStyle('link', '400')}>
                Artists
              </Button>
              <Button variant="link" className="p-0 h-auto" style={getRoleStyle('link', '400')}>
                Visit
              </Button>
              <Button variant="link" className="p-0 h-auto" style={getRoleStyle('link', '400')}>
                Contact
              </Button>
            </div>
            
            <p 
              className="text-sm text-muted-foreground"
              style={getRoleStyle('footer', '400')}
            >
              © 2024 Lumina Gallery
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
} 