"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Inter, Roboto, Roboto_Mono, Syne, Titillium_Web } from 'next/font/google';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/features/unorganized-components/ui/select";
import { Button } from "@/features/unorganized-components/ui/button";
import { Card,  } from "@/features/unorganized-components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/features/unorganized-components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/features/unorganized-components/ui/tooltip";
import { toast } from "sonner";

import { Badge } from "@/features/unorganized-components/ui/badge";


import { Label } from "@/features/unorganized-components/ui/label";

import {

  BracketsIcon as Spacing,
  Settings,
  Download,
  Share,
  Eye,
  Code,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['200',],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '500', '700'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['800'],
});

const titillium_web = Titillium_Web({
  subsets: ['latin'],
  variable: '--font-titillium-web',
  weight: ['400', '600', '700'],
});

// Helper functions to identify token types
function isColorToken(key: string): boolean {
  return (
    key.includes("color") ||
    key.includes("bg") ||
    key.includes("text") ||
    key.startsWith("brand-") ||
    key.startsWith("surface-") ||
    key.startsWith("semantic-") ||
    key === "primary" ||
    key === "secondary" ||
    key === "muted" ||
    key === "card" ||
    key === "popover" ||
    key === "destructive" ||
    key === "success" ||
    key === "warning" ||
    key === "info" ||
    key === "brand-subtle"
  );
}

// New Color Parsing and Conversion Utilities
function parseColorString(colorStr: string): { r: number; g: number; b: number; a: number } | null {
  if (!colorStr) return null;
  colorStr = colorStr.toLowerCase().trim();

  if (colorStr === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0 }; // Treat transparent as black with 0 alpha for sorting purposes
  }

  let match;
  // HEX: #RRGGBB or #RGB
  match = colorStr.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (match) {
    return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16), a: 1 };
  }
  match = colorStr.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (match) {
    return { r: parseInt(match[1] + match[1], 16), g: parseInt(match[2] + match[2], 16), b: parseInt(match[3] + match[3], 16), a: 1 };
  }

  // RGB: rgb(r,g,b)
  match = colorStr.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (match) {
    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: 1 };
  }

  // RGBA: rgba(r,g,b,a)
  match = colorStr.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i);
  if (match) {
    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: parseFloat(match[4]) };
  }
  
  // color-mix(in srgb, var(--some-color) X%, transparent Y%)
  // For sorting, we can't resolve CSS vars here. We should rely on the input `colorStr` being a resolved value.
  // If it's a complex string like color-mix, parsing might fail or be inaccurate without evaluation.
  // This basic parser will return null for unhandled formats, which the sort function will handle.

  return null; // Unrecognized format
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function isShadowToken(key: string): boolean {
  return key.startsWith("shadow");
}

function isRadiusToken(key: string): boolean {
  return key.startsWith("radius");
}

function isBorderToken(key: string): boolean {
  return key.startsWith("border-");
}

// Helper component for rendering individual token previews
interface TokenPreviewItemProps {
  tokenKeys: string[];
  tokenValue: string;
}

const TokenPreviewItem: React.FC<TokenPreviewItemProps> = ({ tokenKeys, tokenValue }) => {
  const handleColorCopy = async () => {
    try {
      await navigator.clipboard.writeText(tokenValue);
      toast.success(`Copied: ${tokenValue}`);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error(`Failed to copy: ${tokenValue}`);
    }
  };

  if (isColorToken(tokenKeys[0])) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="w-12 h-12 rounded-lg cursor-pointer hover:cursor-copy transition-all duration-150 ease-in-out hover:scale-110 hover:shadow-xl border-2 border-transparent hover:border-white/30 focus:outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/50"
              style={{ backgroundColor: tokenValue }}
              onClick={handleColorCopy}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleColorCopy(); }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-background border border-border shadow-xl rounded-md px-3 py-2 text-xs">
            {tokenKeys.map(key => <p key={key} className="font-bold text-foreground">--{key}</p>)}
            <p className="text-muted-foreground">{tokenValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isShadowToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-2 w-full">
        <div
          className="w-12 h-12 rounded-md bg-background border"
          style={{
            boxShadow: tokenValue,
            width: "var(--token-shadow-preview-size, 3rem)",
            height: "var(--token-shadow-preview-size, 3rem)",
            borderRadius: "var(--token-shadow-preview-radius, var(--radius-md, 0.375rem))",
            backgroundColor: "var(--token-shadow-preview-bg, var(--background))",
            borderWidth: "var(--token-shadow-preview-border-width, 1px)",
            borderColor: "var(--token-shadow-preview-border-color, var(--border-color-subtle, var(--border)))"
          }}
        ></div>
        <code
          className="text-xs flex-1 font-mono bg-muted/30 px-2 py-1 rounded truncate"
          style={{
            fontSize: "var(--token-value-size, var(--font-size-xs, 0.75rem))",
            fontFamily: "var(--font-family-mono)",
            backgroundColor: "var(--token-value-bg, color-mix(in srgb, var(--muted) 30%, transparent))",
            padding: "var(--token-value-padding, 0.25rem 0.5rem)",
            borderRadius: "var(--token-value-radius, var(--radius-sm, 0.25rem))"
          }}
        >
          {tokenValue}
        </code>
      </div>
    );
  }

  if (isRadiusToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-2 w-full">
        <div
          className="w-12 h-12 bg-primary/20 border"
          style={{
            borderRadius: tokenValue,
            width: "var(--token-radius-preview-size, 3rem)",
            height: "var(--token-radius-preview-size, 3rem)",
            backgroundColor: "color-mix(in srgb, var(--brand-main) 20%, transparent)",
            borderWidth: "var(--token-radius-preview-border-width, 1px)",
            borderColor: "var(--token-radius-preview-border-color, var(--border-color-subtle, var(--border)))"
          }}
        ></div>
        <code
          className="text-xs flex-1 font-mono bg-muted/30 px-2 py-1 rounded"
          style={{
            fontSize: "var(--token-value-size, var(--font-size-xs, 0.75rem))",
            fontFamily: "var(--font-family-mono)",
            backgroundColor: "var(--token-value-bg, color-mix(in srgb, var(--muted) 30%, transparent))",
            padding: "var(--token-value-padding, 0.25rem 0.5rem)",
            borderRadius: "var(--token-value-radius, var(--radius-sm, 0.25rem))"
          }}
        >
          {tokenValue}
        </code>
      </div>
    );
  }

  return (
    <code
      className="flex-1 font-mono text-xs [font-size:var(--token-value-size,var(--font-size-xs,0.75rem))] bg-[var(--token-value-bg,color-mix(in_srgb,var(--muted)_30%25,transparent))] p-[var(--token-value-padding,0.25rem_0.5rem)] rounded-[var(--token-value-radius,var(--radius-sm,0.25rem))] truncate block max-w-full"
    >
      {tokenValue}
    </code>
  );
};

/** *********************************************************************
 * 🎨  Enhanced Brand‑aware Design‑token Playground (shadcn + Tailwind v4)
 * ──────────────────────────────────────────────────────────────────────
 * Comprehensive preview with analytics, charts, and brand‑specific styling
 * for designers to evaluate the complete product experience across themes.
 ********************************************************************* */



function TokenShowcase({ vars }: { vars: Record<string, string> }) {
  // Organize tokens into semantic groups
  const groups = [
    {
      name: "Brand Colors",
      tokens: [
        ["brand-main", vars["--brand-main"] || "#FF3600"],
        ["brand-on", vars["--brand-on"] || "#FFFFFF"],
        ["brand-secondary", vars["--brand-secondary"] || "#1A1A1A"],
        ["bg-brand", vars["--bg-brand"] || vars["--brand-main"] || "#FF3600"],
        ["bg-brand-subtle", vars["--bg-brand-subtle"] || "rgba(255, 54, 0, 0.07)"],
        ["text-brand", vars["--text-brand"] || vars["--brand-main"] || "#FF3600"],
        ["text-on-brand", vars["--text-on-brand"] || vars["--brand-on"] || "#FFFFFF"],
      ],
    },
    {
      name: "Surface",
      tokens: [
        ["surface-bg", vars["--surface-bg"] || "#101010"],
        ["surface-card", vars["--surface-card"] || "#1C1C1C"],
        ["surface-popover", vars["--surface-popover"] || "#282828"],
        ["surface-on", vars["--surface-on"] || "#FFFFFF"],
        ["surface-muted", vars["--surface-muted"] || "#3A3A3A"],
        ["surface-muted-fg", vars["--surface-muted-fg"] || "#E0E0E0"],
        ["bg-primary", vars["--bg-primary"] || vars["--surface-bg"] || "#101010"],
        ["bg-secondary", vars["--bg-secondary"] || vars["--surface-card"] || "#1C1C1C"],
        ["bg-muted", vars["--bg-muted"] || vars["--surface-muted"] || "#3A3A3A"],
        ["bg-popover", vars["--bg-popover"] || vars["--surface-popover"] || "#282828"],
        ["bg-transparent", vars["--bg-transparent"] || "transparent"],
      ],
    },
    {
      name: "Text",
      tokens: [
        ["text-primary", vars["--text-primary"] || vars["--surface-on"] || "#FFFFFF"],
        ["text-secondary", vars["--text-secondary"] || vars["--surface-muted-fg"] || "#E0E0E0"],
        ["text-muted", vars["--text-muted"] || "#777777"],
      ],
    },
    {
      name: "Semantic Colors",
      tokens: [
        ["semantic-destructive", vars["--semantic-destructive"] || "#D32F2F"],
        ["semantic-success", vars["--semantic-success"] || "#FF3600"],
        ["semantic-warning", vars["--semantic-warning"] || "#FFA000"],
        ["semantic-info", vars["--semantic-info"] || "#1976D2"],
      ],
    },
    {
      name: "Borders",
      tokens: [
        ["border-color-default", vars["--border-color-default"] || "#444444"],
        ["border-color-subtle", vars["--border-color-subtle"] || "#333333"],
        ["border-color-strong", vars["--border-color-strong"] || "#555555"],
        ["border-color-brand", vars["--border-color-brand"] || vars["--brand-main"] || "#FF3600"],
        ["border-width-none", vars["--border-width-none"] || "0px"],
        ["border-width-thin", vars["--border-width-thin"] || "0.5px"],
        ["border-width-default", vars["--border-width-default"] || "1px"],
        ["border-width-thick", vars["--border-width-thick"] || "2px"],
        ["border-style", vars["--border-style"] || "solid"],
      ],
    },
    {
      name: "Shadows",
      tokens: [
        ["shadow-none", vars["--shadow-none"] || "none"],
        ["shadow-xs", vars["--shadow-xs"] || "0 1px 2px rgba(0,0,0,0.2)"],
        ["shadow-sm", vars["--shadow-sm"] || "0 2px 4px rgba(0,0,0,0.3)"],
        ["shadow-md", vars["--shadow-md"] || "0 4px 8px rgba(0,0,0,0.4)"],
        ["shadow-lg", vars["--shadow-lg"] || "0 8px 16px rgba(0,0,0,0.4)"],
        ["shadow-xl", vars["--shadow-xl"] || "0 12px 24px rgba(0,0,0,0.5)"],
        ["shadow-brand-sm", vars["--shadow-brand-sm"] || "0 2px 6px rgba(255, 54, 0, 0.2)"],
        ["shadow-brand-md", vars["--shadow-brand-md"] || "0 4px 10px rgba(255, 54, 0, 0.25)"],
        ["shadow-brand-lg", vars["--shadow-brand-lg"] || "0 8px 18px rgba(255, 54, 0, 0.3)"],
      ],
    },
    {
      name: "Border Radius",
      tokens: [
        ["radius-none", vars["--radius-none"] || "0"],
        ["radius-xs", vars["--radius-xs"] || "2px"],
        ["radius-sm", vars["--radius-sm"] || "4px"],
        ["radius-md", vars["--radius-md"] || "6px"],
        ["radius-lg", vars["--radius-lg"] || "8px"],
        ["radius-xl", vars["--radius-xl"] || "12px"],
        ["radius-full", vars["--radius-full"] || "9999px"],
      ],
    },
  ];

  return (
    <div className="container mx-auto flex flex-wrap gap-8 space-y-8">
      {groups.map((group) => {
        const colorTokens = group.tokens.filter(([key]) => isColorToken(key));
        const otherTokens = group.tokens.filter(([key]) => !isColorToken(key));

        return (
          (colorTokens.length > 0 || otherTokens.length > 0) && (
            <div
              key={group.name}
              className="p-4 rounded-lg bg-[var(--token-card-bg,var(--card))] bg-[image:var(--token-card-overlay,none)] border-[var(--token-card-border-width,var(--border-width-default,1px))] border-[style:var(--token-card-border-style,var(--border-style,solid))] border-[color:var(--token-card-border-color,var(--border-color-default,var(--border)))] [border-radius:var(--token-card-radius,var(--radius-lg,0.75rem))] shadow-[var(--token-card-shadow,var(--shadow-sm,none))] [padding:var(--token-card-padding,var(--padding-card,1rem))]"
            >
              <h3
                className="text-[var(--token-card-title-size,var(--font-size-base,1rem))] [font-weight:var(--token-card-title-weight,var(--font-weight-semibold,600))] text-[var(--token-card-title-color,var(--foreground))] mb-4 [margin-bottom:var(--token-card-title-margin,1rem)]"
              >
                {group.name}
              </h3>

              {/* Render Color Tokens as a Row of Swatches */}
              {colorTokens.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {(() => {
                    const tokensByValue: Record<string, string[]> = {};
                    colorTokens.forEach(([key, value]) => {
                      if (!tokensByValue[value]) {
                        tokensByValue[value] = [];
                      }
                      tokensByValue[value].push(key);
                    });

                    const sortedColorEntries = Object.entries(tokensByValue).sort(([valueA], [valueB]) => {
                      const colorA = parseColorString(valueA);
                      const colorB = parseColorString(valueB);

                      // Handle cases where colors can't be parsed or are transparent
                      // Push unparseable/transparent to the end, or handle as you see fit
                      if (!colorA && !colorB) return 0;
                      if (!colorA) return 1; // colorA is unparseable, put it after colorB
                      if (!colorB) return -1; // colorB is unparseable, put it after colorA
                      if (colorA.a === 0 && colorB.a !== 0) return 1; // colorA is transparent, colorB is not
                      if (colorB.a === 0 && colorA.a !== 0) return -1; // colorB is transparent, colorA is not
                      if (colorA.a === 0 && colorB.a === 0) return 0; // both transparent

                      const hslA = rgbToHsl(colorA.r, colorA.g, colorA.b);
                      const hslB = rgbToHsl(colorB.r, colorB.g, colorB.b);

                      // Sort by lightness (ascending - lighter first)
                      if (hslA.l !== hslB.l) {
                        return hslA.l - hslB.l;
                      }
                      // Then by saturation (descending - more saturated first, can make groups look more distinct)
                      if (hslA.s !== hslB.s) {
                        return hslB.s - hslA.s;
                      }
                      // Then by hue (ascending)
                      return hslA.h - hslB.h;
                    });

                    return sortedColorEntries.map(([value, keys]) => (
                      <TokenPreviewItem key={value} tokenKeys={keys} tokenValue={value} />
                    ));
                  })()}
                      </div>
              )}

              {/* Render Other Tokens as a List */}
              {otherTokens.length > 0 && (
                <div className="space-y-3 columns-1 sm:columns-2 lg:columns-2 xl:columns-3 gap-x-6">
                  {otherTokens.map(([key, value]) => (
                    <div key={key} className="space-y-1 mb-3 break-inside-avoid">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          {/* Original rendering logic for non-color tokens */}
                          {isShadowToken(key) ? (
                        <div className="flex items-center gap-2 w-full">
                          <div
                            className="w-12 h-12 rounded-md bg-background border"
                            style={{ 
                              boxShadow: value,
                              width: "var(--token-shadow-preview-size, 3rem)", 
                              height: "var(--token-shadow-preview-size, 3rem)",
                              borderRadius: "var(--token-shadow-preview-radius, var(--radius-md, 0.375rem))",
                              backgroundColor: "var(--token-shadow-preview-bg, var(--background))",
                              borderWidth: "var(--token-shadow-preview-border-width, 1px)",
                              borderColor: "var(--token-shadow-preview-border-color, var(--border-color-subtle, var(--border)))"
                            }}
                      ></div>
                          <code 
                            className="text-xs flex-1 font-mono bg-muted/30 px-2 py-1 rounded truncate"
                            style={{
                              fontSize: "var(--token-value-size, var(--font-size-xs, 0.75rem))",
                              fontFamily: "var(--font-family-mono)",
                              backgroundColor: "var(--token-value-bg, color-mix(in srgb, var(--muted) 30%, transparent))",
                              padding: "var(--token-value-padding, 0.25rem 0.5rem)",
                              borderRadius: "var(--token-value-radius, var(--radius-sm, 0.25rem))"
                            }}
                          >
                            {value}
                          </code>
                        </div>
                    ) : isRadiusToken(key) ? (
                        <div className="flex items-center gap-2 w-full">
                          <div
                            className="w-12 h-12 bg-primary/20 border"
                            style={{ 
                              borderRadius: value,
                              width: "var(--token-radius-preview-size, 3rem)", 
                              height: "var(--token-radius-preview-size, 3rem)",
                              backgroundColor: "color-mix(in srgb, var(--brand-main) 20%, transparent)",
                              borderWidth: "var(--token-radius-preview-border-width, 1px)",
                              borderColor: "var(--token-radius-preview-border-color, var(--border-color-subtle, var(--border)))"
                            }}
                      ></div>
                          <code 
                            className="text-xs flex-1 font-mono bg-muted/30 px-2 py-1 rounded"
                            style={{
                              fontSize: "var(--token-value-size, var(--font-size-xs, 0.75rem))",
                              fontFamily: "var(--font-family-mono)",
                              backgroundColor: "var(--token-value-bg, color-mix(in srgb, var(--muted) 30%, transparent))",
                              padding: "var(--token-value-padding, 0.25rem 0.5rem)",
                              borderRadius: "var(--token-value-radius, var(--radius-sm, 0.25rem))"
                            }}
                          >
                            {value}
                          </code>
                        </div>
                          ) : isBorderToken(key) ? (
                            <div className="flex items-center gap-3 w-full">
                              <div
                                className="w-20 h-12 bg-background/50 flex items-center justify-center text-xs text-muted-foreground"
                                style={{
                                  borderWidth: key.includes("width") ? value : "var(--border-width-default, 1px)",
                                  borderStyle: key.includes("style") ? value : "var(--border-style, solid)",
                                  borderColor: key.includes("color") ? value : "var(--border-color-default, #444444)",
                                  borderRadius: "var(--radius-sm)"
                                }}
                              >
                                Preview
                              </div>
                        <code
                                className="text-xs flex-1 font-mono bg-muted/30 px-2 py-1 rounded truncate"
                                style={{
                                  fontSize: "var(--token-value-size, var(--font-size-xs, 0.75rem))",
                                  fontFamily: "var(--font-family-mono)",
                                  backgroundColor: "var(--token-value-bg, color-mix(in srgb, var(--muted) 30%, transparent))",
                                  padding: "var(--token-value-padding, 0.25rem 0.5rem)",
                                  borderRadius: "var(--token-value-radius, var(--radius-sm, 0.25rem))"
                                }}
                        >
                      {value}
                    </code>
                            </div>
                          ) : (
                            <TokenPreviewItem tokenKeys={[key]} tokenValue={value} />
                      )}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )
        );
      })}
    </div>
  );
}

// Added named imports for ChartShowcase and ComponentShowcase
import { ChartShowcase } from './ChartShowcase';
import { ComponentShowcase } from './ComponentShowcase';

import {
  BRANDS,
  makeCssVars,
} from "./brands";
import type { BrandDefinition } from "./brands-types";
import { UseClientConfigs } from "../(root)/[slug]/_page-slug-core-utilities/use-client-configs";

interface HeroSectionProps {
  brand: BrandDefinition;
  heroShowOverlay?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ brand, heroShowOverlay }) => {
  return (
      <div
        className="relative min-h-[300px] mt-30 rounded-xl p-8 py-22 flex flex-col justify-center items-center text-center overflow-hidden bg-[var(--hero-bg,var(--background))] bg-[image:var(--hero-bg-image,none)] bg-[size:var(--hero-bg-size,cover)] bg-[position:var(--hero-bg-position,center)] border-[var(--hero-border-width,0)] border-[style:var(--hero-border-style,solid)] border-[color:var(--hero-border-color,transparent)] shadow-[var(--hero-shadow,none)] [font-family:var(--font-family-sans)]"
      >
        {heroShowOverlay && (
          <div
            className="absolute inset-0 opacity-70 mix-blend-overlay pointer-events-none bg-[image:var(--hero-overlay,none)]"
          ></div>
        )}
        <div className="relative z-10">
          <h1 
            className="text-5xl font-bold tracking-tight sm:text-6xl [font-family:var(--font-family-display)] [font-weight:var(--heading-weight,var(--font-weight-bold))] [letter-spacing:var(--heading-tracking,tight)]"
          >
            {brand.stylingPreferences && 'headingMainText' in brand.stylingPreferences && brand.stylingPreferences.headingMainText
              ? (brand.stylingPreferences.headingMainText as React.ReactNode)
              : brand.name
            }
            <br />
            {brand.stylingPreferences && 'headingSubtitleText' in brand.stylingPreferences && brand.stylingPreferences.headingSubtitleText ? (
              <span 
                className={brand.stylingPreferences && 'headingSubtitleClassName' in brand.stylingPreferences 
                  ? (brand.stylingPreferences.headingSubtitleClassName as string) || "text-muted-foreground font-normal"
                  : "text-muted-foreground font-normal"}
              >
                {brand.stylingPreferences.headingSubtitleText as React.ReactNode}
              </span>
            ) : (
              <span className="text-muted-foreground font-normal">
                Design System & Component Library
              </span>
            )}
          </h1>
          <p 
            className="mt-6 text-lg sm:max-w-md lg:max-w-none [font-family:var(--font-family-sans)] text-[var(--hero-text-color,var(--muted-foreground))] text-[var(--hero-text-size,var(--font-size-lg,1.125rem))] leading-[var(--hero-text-line-height,1.5)]"
          >
            Explore the complete design system with interactive components, color tokens, and visual elements
            that make {brand.name}'s brand experience unique and cohesive.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button>
              {brand.stylingPreferences && 'headingMainText' in brand.stylingPreferences && brand.stylingPreferences.headingMainText
                ? "Explore Components" 
                : "View Components"}
            </Button>
            <Button variant="outline">
              {brand.stylingPreferences && 'headingMainText' in brand.stylingPreferences && brand.stylingPreferences.headingMainText
                ? "Read Docs" 
                : "Documentation"}
            </Button>
          </div>
        </div>
      </div>
  );
};

interface OverviewSectionProps {
  brand: BrandDefinition;
  overviewCardShowOverlay?: boolean;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ brand, overviewCardShowOverlay }) => {
  return (
      <div
      className="relative mt-8 overflow-hidden bg-[var(--overview-card-bg,var(--card))] bg-[image:var(--overview-card-bg-image,none)] border-[var(--overview-card-border-width,0)] border-[style:var(--overview-card-border-style,solid)] border-[color:var(--overview-card-border-color,transparent)] [border-radius:var(--overview-card-radius,var(--radius-lg))] shadow-[var(--overview-card-shadow,var(--shadow-md))]"
      >
        {overviewCardShowOverlay && (
          <div
            className="absolute inset-0 opacity-70 mix-blend-overlay pointer-events-none bg-[image:var(--overview-card-overlay,none)]"
          ></div>
        )}
        
        {/* Enhanced Brand Overview */}
        <div className="relative z-10">
          {/* Brand Header with Brand-Specific Styling */}
          <div 
            className="p-6 bg-[var(--overview-card-header-bg,var(--brand-main,transparent))] border-b-[var(--overview-card-header-border-width,1px)] border-[style:var(--overview-card-header-border-style,solid)] border-[color:var(--overview-card-header-border-color,var(--border-color-subtle,transparent))] [padding:var(--overview-card-header-padding,1.5rem)] relative overflow-hidden"
          >
            {/* Optional brand-specific pattern overlay */}
            <div 
              className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-repeat-space bg-[image:var(--overview-card-header-pattern,none)] bg-[size:var(--overview-card-header-pattern-size,300px)]"
            ></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="max-w-2xl">
                <h2 
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: "var(--overview-card-header-text-color, var(--brand-on, white))",
                    fontFamily: "var(--font-family-display)",
                    fontWeight: "var(--overview-card-header-font-weight, 700)",
                    letterSpacing: "var(--overview-card-header-letter-spacing, normal)",
                    textTransform: "var(--overview-card-header-text-transform, none)" as React.CSSProperties['textTransform']
                  }}
                >
                  {brand.name} Design System
                </h2>
                <p 
                  className="text-lg"
                  style={{
                    color: "var(--overview-card-header-description-color, var(--brand-on, rgba(255,255,255,0.9)))",
                    maxWidth: "var(--overview-card-header-description-max-width, 32rem)",
                    fontFamily: "var(--font-family-sans)",
                    fontWeight: "var(--overview-card-header-description-font-weight, normal)",
                    lineHeight: "var(--overview-card-header-description-line-height, 1.5)"
                  }}
                >
              {brand.description}
            </p>
              </div>
              
              {/* Brand Logo/Icon Area */}
              <div
                className="hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-[var(--overview-card-logo-bg,rgba(255,255,255,0.1))] [backdrop-filter:var(--overview-card-logo-backdrop-filter,blur(8px))] shadow-[var(--overview-card-logo-shadow,0_4px_20px_rgba(0,0,0,0.15))]"
              >
                <div
                  className="text-4xl font-bold text-[var(--overview-card-logo-text-color,var(--brand-on,white))] [font-family:var(--font-family-display)]"
                >
                  {brand.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Brand Details Content */}
          <div className=" [padding:var(--overview-card-content-padding,2rem)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Colors Section */}
              <div className="space-y-6">
                <h3 
                  className="text-lg pb-2 mb-4 text-[var(--overview-card-section-title-color,var(--foreground))] [border-color:var(--overview-card-section-border-color,var(--border-color-subtle))] [font-family:var(--font-family-sans)] [font-weight:var(--overview-card-section-title-weight,600)]"
                >
                  Brand Colors
                </h3>
                
                <div className="space-y-4">
                  {/* Primary Color - Updated Display */}
                  <div className="relative p-3 border border-[var(--border-color-subtle)] rounded-[var(--radius-md)] bg-[var(--surface-card)]">
                    <div
                      className="w-full h-16 mb-2 flex items-end shadow-[var(--overview-card-color-shadow,var(--shadow-sm))] [border-radius:var(--overview-card-color-radius,var(--radius-md))]"
                      style={{ backgroundColor: brand.brand.main.hex }}
                    >
                      <div
                        className="text-xs font-mono p-1 inline-flex items-center bg-[var(--overview-card-color-label-bg,rgba(0,0,0,0.5))] text-[var(--overview-card-color-label-text,white)] [border-bottom-right-radius:var(--overview-card-color-radius,var(--radius-md))] [border-top-left-radius:var(--overview-card-color-radius,var(--radius-md))]"
                      >
                        {brand.brand.main.hex}
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">{brand.brand.main.name}</p>
                    <div className="space-y-0.5 text-xs text-[var(--surface-muted-fg)]">
                      <p><span className="font-medium text-[var(--surface-on)]">RGB:</span> {brand.brand.main.rgb}</p>
                      <p><span className="font-medium text-[var(--surface-on)]">CMYK:</span> {brand.brand.main.cmyk}</p>
                      <p><span className="font-medium text-[var(--surface-on)]">Var:</span> <code className="font-mono text-xs bg-[var(--token-value-bg,color-mix(in_srgb,var(--muted)_30%25,transparent))] p-[var(--token-value-padding,0.25rem_0.5rem)] rounded-[var(--token-value-radius,var(--radius-sm,0.25rem))]">--{brand.brand.main.variableName}</code></p>
                    </div>
                  </div>
                  
                  {/* Secondary Color - Updated Display */}
                  <div className="relative p-3 border border-[var(--border-color-subtle)] rounded-[var(--radius-md)] bg-[var(--surface-card)]">
                    <div
                      className="w-full h-12 mb-2 flex items-end shadow-[var(--overview-card-color-shadow,var(--shadow-sm))] [border-radius:var(--overview-card-color-radius,var(--radius-md))]"
                      style={{ backgroundColor: brand.brand.secondary.hex }}
                    >
                      <div
                        className="text-xs font-mono p-1 inline-flex items-center bg-[var(--overview-card-color-label-bg,rgba(0,0,0,0.5))] text-[var(--overview-card-color-label-text,white)] [border-bottom-right-radius:var(--overview-card-color-radius,var(--radius-md))] [border-top-left-radius:var(--overview-card-color-radius,var(--radius-md))]"
                      >
                        {brand.brand.secondary.hex}
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">{brand.brand.secondary.name}</p>
                    <div className="space-y-0.5 text-xs text-[var(--surface-muted-fg)]">
                      <p><span className="font-medium text-[var(--surface-on)]">RGB:</span> {brand.brand.secondary.rgb}</p>
                      <p><span className="font-medium text-[var(--surface-on)]">CMYK:</span> {brand.brand.secondary.cmyk}</p>
                      <p><span className="font-medium text-[var(--surface-on)]">Var:</span> <code className="font-mono text-xs bg-[var(--token-value-bg,color-mix(in_srgb,var(--muted)_30%25,transparent))] p-[var(--token-value-padding,0.25rem_0.5rem)] rounded-[var(--token-value-radius,var(--radius-sm,0.25rem))]">--{brand.brand.secondary.variableName}</code></p>
                    </div>
                  </div>
                  
                  {/* Surface Colors */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                      <div
                        className="w-full h-10 flex items-center justify-center bg-[var(--surface-bg)] border border-[var(--border-color-subtle)] [border-radius:var(--radius-sm)]"
                      >
                        <span className="text-xs text-[var(--surface-on)]"
                        >
                          Background
                        </span>
                </div>
              </div>
              <div>
                      <div
                        className="w-full h-10 flex items-center justify-center bg-[var(--surface-card)] border border-[var(--border-color-subtle)] [border-radius:var(--radius-sm)]"
                      >
                        <span className="text-xs text-[var(--surface-on)]"
                        >
                          Card
                        </span>
                </div>
              </div>
            </div>
          </div>
              </div>
              
              {/* Typography Section */}
              <div className="space-y-6">
                <h3 
                  className="text-lg pb-2 mb-4 text-[var(--overview-card-section-title-color,var(--foreground))] [border-color:var(--overview-card-section-border-color,var(--border-color-subtle))] [font-family:var(--font-family-sans)] [font-weight:var(--overview-card-section-title-weight,600)]"
                >
                  Typography
                </h3>
                
                <div className="space-y-5">
              <div>
                    <h4 className="text-sm font-medium mb-2">Display</h4>
                    <div className="p-3 bg-surface-card/50 border border-[var(--border-color-subtle)] [border-radius:var(--radius-md)]">
                      <p className="text-2xl mb-1 truncate [font-family:var(--font-family-display)] text-[var(--brand-main)]">
                        {brand.name} Display
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                  {brand.typography?.fontDisplay || "System Default"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[var(--overview-card-tag-bg,var(--surface-muted))] text-[var(--overview-card-tag-text,var(--surface-muted-fg))]">
                          --font-family-display
                        </span>
                      </div>
                    </div>
              </div>
                  
                  <div className="grid grid-cols-2 gap-3">
              <div>
                      <h4 className="text-sm font-medium mb-2">Text</h4>
                      <div className="p-3 bg-surface-card/50 border h-full border-[var(--border-color-subtle)] [border-radius:var(--radius-md)]">
                <p
                          className="text-sm mb-1 [font-family:var(--font-family-sans)]"
                >
                          The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                  {brand.typography?.fontSans || "System Default"}
                </p>
                      </div>
              </div>
              <div>
                      <h4 className="text-sm font-medium mb-2">Mono</h4>
                      <div className="p-3 bg-surface-card/50 border h-full border-[var(--border-color-subtle)] [border-radius:var(--radius-md)]">
                        <code className="text-sm mb-1 block [font-family:var(--font-family-mono)]">
                          const brand = '{brand.name}';
                        </code>
                        <p className="text-xs text-muted-foreground truncate">
                  {brand.typography?.fontMono || "System Default"}
                </p>
              </div>
            </div>
          </div>
                </div>
              </div>
              
              {/* Shape & Motion Section */}
              <div className="space-y-6">
                <h3 
                  className="text-lg border-b pb-2 mb-4 text-[var(--overview-card-section-title-color,var(--foreground))] [border-color:var(--overview-card-section-border-color,var(--border-color-subtle))] [font-family:var(--font-family-sans)] [font-weight:var(--overview-card-section-title-weight,600)]"
                >
                  Shape & Effects
                </h3>
                
                <div className="space-y-5">
                  {/* Radius Examples */}
              <div>
                    <h4 className="text-sm font-medium mb-2">Border Radius</h4>
                    <div className="flex gap-3 items-end mb-2">
                  <div
                        className="w-8 h-8 bg-brand-main/20 border [border-radius:var(--radius-sm)] border-[var(--border-color-subtle)]"
                        title="Small"
                  ></div>
                      <div
                        className="w-10 h-10 bg-brand-main/20 border [border-radius:var(--radius)] border-[var(--border-color-subtle)]"
                        title="Default"
                      ></div>
                      <div
                        className="w-12 h-12 bg-brand-main/20 border [border-radius:var(--radius-lg)] border-[var(--border-color-subtle)]"
                        title="Large"
                      ></div>
                      <div
                        className="w-14 h-14 bg-brand-main/20 border [border-radius:var(--radius-full)] border-[var(--border-color-subtle)]"
                        title="Full"
                      ></div>
                </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {brand.shape?.radius || "Default"}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[var(--overview-card-tag-bg,var(--surface-muted))] text-[var(--overview-card-tag-text,var(--surface-muted-fg))]">
                        --radius
                      </span>
              </div>
                  </div>
                  
                  {/* Shadow Examples */}
              <div>
                    <h4 className="text-sm font-medium mb-2">Shadows</h4>
                    <div className="grid grid-cols-3 gap-3 mb-2">
                      <div
                        className="aspect-square bg-surface-card border [box-shadow:var(--shadow-sm)] border-[var(--border-color-subtle)] [border-radius:var(--radius)]"
                      ></div>
                      <div
                        className="aspect-square bg-surface-card border [box-shadow:var(--shadow-md)] border-[var(--border-color-subtle)] [border-radius:var(--radius)]"
                      ></div>
                      <div
                        className="aspect-square bg-surface-card border [box-shadow:var(--shadow-lg)] border-[var(--border-color-subtle)] [border-radius:var(--radius)]"
                      ></div>
              </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        sm / md / lg
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[var(--overview-card-tag-bg,var(--surface-muted))] text-[var(--overview-card-tag-text,var(--surface-muted-fg))]">
                        --shadow-*
                      </span>
                    </div>
                  </div>
                  
                  {/* Motion Examples */}
              <div>
                    <h4 className="text-sm font-medium mb-2">Motion</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-surface-card/50 border-[var(--border-color-subtle)] border">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-mono">
                          {(brand.motion as any)?.motionStandard || "300ms"}
                        </p>
                      </div>
                      <div className="p-3 rounded bg-surface-card/50 border-[var(--border-color-subtle)] border">
                        <p className="text-xs text-muted-foreground">Easing</p>
                        <p className="text-sm font-mono truncate">
                          {(brand.motion as any)?.ease || "ease"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Palette Section - NEW */}
              {brand.supportPalette && brand.supportPalette.length > 0 && (
                <div className="space-y-6 md:col-span-3">
                  <h3 
                    className="text-lg border-b pb-2 mb-4 text-[var(--overview-card-section-title-color,var(--foreground))] [border-color:var(--overview-card-section-border-color,var(--border-color-subtle))] [font-family:var(--font-family-sans)] [font-weight:var(--overview-card-section-title-weight,600)]"
                  >
                    Support Palette
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {brand.supportPalette.map((color) => (
                      <div key={color.name} className="relative p-3 border border-[var(--border-color-subtle)] rounded-[var(--radius-md)] bg-[var(--surface-card)]">
                        <div
                          className="w-full h-16 mb-2 flex items-end shadow-[var(--overview-card-color-shadow,var(--shadow-sm))] [border-radius:var(--overview-card-color-radius,var(--radius-md))]"
                          style={{ backgroundColor: color.hex }}
                        >
                          <div
                            className="text-xs font-mono p-1 inline-flex items-center bg-[var(--overview-card-color-label-bg,rgba(0,0,0,0.5))] text-[var(--overview-card-color-label-text,white)] [border-bottom-right-radius:var(--overview-card-color-radius,var(--radius-md))] [border-top-left-radius:var(--overview-card-color-radius,var(--radius-md))]"
                          >
                            {color.hex}
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-1">{color.name}</p>
                        <div className="space-y-0.5 text-xs text-[var(--surface-muted-fg)]">
                          <p><span className="font-medium text-[var(--surface-on)]">RGB:</span> {color.rgb}</p>
                          <p><span className="font-medium text-[var(--surface-on)]">CMYK:</span> {color.cmyk}</p>
                          <p><span className="font-medium text-[var(--surface-on)]">Var:</span> <code className="font-mono text-xs bg-[var(--token-value-bg,color-mix(in_srgb,var(--muted)_30%25,transparent))] p-[var(--token-value-padding,0.25rem_0.5rem)] rounded-[var(--token-value-radius,var(--radius-sm,0.25rem))]">--{color.variableName}</code></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

interface NavSectionProps {
  brand: BrandDefinition;
  navShowOverlay?: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ brand, navShowOverlay }) => {
  return (
    <div className="relative rounded-lg overflow-hidden hidden">
      <div
        className="w-full py-4 px-6 flex items-center justify-between bg-[var(--nav-bg,var(--card))] border-[var(--nav-border-width,var(--border-width-none,0))] border-[style:var(--nav-border-style,var(--border-style,solid))] border-[color:var(--nav-border-color,var(--border-color-default,transparent))] shadow-[var(--nav-shadow,var(--shadow-sm))] [backdrop-filter:var(--nav-backdrop-filter,none)]"
      >
        {navShowOverlay && (
          <div
            className="absolute inset-0 opacity-70 mix-blend-overlay pointer-events-none bg-[image:var(--nav-overlay,none)]"
          ></div>
        )}
        <h3 className="text-lg font-medium">
          {brand.stylingPreferences && 'navTitle' in brand.stylingPreferences 
            ? (brand.stylingPreferences.navTitle as string) 
            : `${brand.name} Design System`}
        </h3>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="hidden sm:flex">
            <Monitor className="h-3 w-3 mr-1" /> Desktop
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            <Tablet className="h-3 w-3 mr-1" /> Tablet
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            <Smartphone className="h-3 w-3 mr-1" /> Mobile
          </Badge>
          <Button size="sm" variant="ghost" className="hidden sm:flex">
            <Settings className="h-4 w-4 mr-1" /> Customize
          </Button>
          <Button size="sm">
            <Eye className="h-4 w-4 mr-1" /> Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

const Preview = ({ vars, brand }: { vars: Record<string, string>; brand: BrandDefinition }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const navShowOverlay = brand.componentStyles?.nav?.showOverlay;
  const heroShowOverlay = brand.componentStyles?.hero?.showOverlay;
  const overviewCardShowOverlay = brand.componentStyles?.overviewCard?.showOverlay;
  const brandPickerShowOverlay = brand.componentStyles?.brandPickerContainer?.showOverlay;

  const surfaceBgColor = vars['--surface-bg']?.toLowerCase();
  const isLightBackground = surfaceBgColor === '#ffffff' || surfaceBgColor === 'white';
  const dynamicNavTextColor = isLightBackground ? 'black' : 'white';

  


  return (
    <div className="flex container flex-col w-full">
        <UseClientConfigs navigationTextColor={dynamicNavTextColor}/>
      {/* Nav */}
      <NavSection brand={brand} navShowOverlay={navShowOverlay} />

      {/* Hero */}
      <HeroSection brand={brand} heroShowOverlay={heroShowOverlay} />

      {/* Overview */}
      <OverviewSection brand={brand} overviewCardShowOverlay={overviewCardShowOverlay} />

      {/* Token Showcase */}
      <div className="mt-12">
        <TokenShowcase vars={vars} />
      </div>

      {/* Component Showcase - NEW SECTION */}
      <div className="my-12 py-8 border-t border-[var(--border-color-subtle)]">
        <ComponentShowcase brand={brand} />
      </div>

      {/* Brand Picker */}
      <BrandPickerSection brand={brand} brandPickerShowOverlay={brandPickerShowOverlay} />
    </div>
  );
};

interface BrandPickerSectionProps {
  brand: BrandDefinition;
  brandPickerShowOverlay?: boolean;
}

const BrandPickerSection: React.FC<BrandPickerSectionProps> = ({ brand, brandPickerShowOverlay }) => {
  return (
    <div
      className="relative [margin-top:var(--brand-picker-container-margin-top)] [margin-bottom:var(--brand-picker-container-margin-bottom)] bg-[var(--brand-picker-container-background)] text-[var(--brand-picker-container-color)] bg-[image:var(--brand-picker-container-background-image,none)] [border-radius:var(--brand-picker-container-border-radius)] shadow-[var(--brand-picker-container-box-shadow)] [padding:var(--brand-picker-container-padding)]"
      >
        {brandPickerShowOverlay && (
          <div
          className="absolute inset-0 pointer-events-none opacity-70 mix-blend-overlay rounded-[var(--brand-picker-container-border-radius)] bg-[image:var(--brand-picker-overlay,none)]"
          />
        )}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Explore Other Brand Themes</h3>
            <p className="text-sm text-muted-foreground">
              See how our design system adapts to different brand identities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Share className="h-4 w-4 mr-1" /> Share Theme
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share this Theme</DialogTitle>
                  <DialogDescription>
                    Share the {brand.name} theme with your team
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-2">
                    <Button className="flex-1" size="sm">
                      Copy Link
                    </Button>
                    <Button className="flex-1" size="sm" variant="outline">
                      Export Tokens
                    </Button>
                  </div>
                  <div className="p-2 rounded-md bg-muted">
                    <code className="text-xs break-all">
                      {`https://your-domain.com/brand-colors?theme=${brand.id}`}
                    </code>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
            <Button size="sm" variant="outline">
              <Code className="h-4 w-4 mr-1" /> CSS Vars
            </Button>
        </div>
      </div>
    </div>
  );
};
  
export default function EnhancedBrandPlayground() {
    const [slug, setSlug] = useState<string>("razer");
    const brand = BRANDS.find((b) => b.id === slug) ?? BRANDS[0];
    const cssVars = useMemo(() => {
      if (typeof makeCssVars === 'function') {
        return makeCssVars(brand);
      }
      return {};
    }, [brand]);

    // Create a set of design token control variables to consolidate naming patterns
    // This allows us to more consistently apply our CSS variables throughout the app
    const designTokens = useMemo(() => {
      // Define default values for all the design tokens
      const tokens = {
        // Brand colors - These should generally come from cssVars if a brand is selected
        '--brand-main': cssVars['--brand-main'] || 'var(--nextgen-brand-orange-500, #FF3600)',
        '--brand-on': cssVars['--brand-on'] || '#FFFFFF',
        '--brand-secondary': cssVars['--brand-secondary'] || 'var(--nextgen-brand-dark-primary, #1A1A1A)',
        '--bg-brand': cssVars['--bg-brand'] || 'var(--brand-main)',
        '--bg-brand-subtle': cssVars['--bg-brand-subtle'] || 'color-mix(in srgb, var(--brand-main) 7%, transparent)', // Updated from rgba
        '--text-brand': cssVars['--text-brand'] || 'var(--brand-main)',
        '--text-on-brand': cssVars['--text-on-brand'] || 'var(--brand-on)',
        
        // Surface - Aligning with Nextgen Neutral and Dark families
        '--surface-bg': cssVars['--surface-bg'] || 'var(--nextgen-brand-dark-800, #101010)',
        '--surface-card': cssVars['--surface-card'] || 'var(--nextgen-brand-neutral-800, #1C1C1C)', // Corrected from 850 based on brands.ts final mapping
        '--surface-popover': cssVars['--surface-popover'] || 'var(--nextgen-brand-neutral-700, #282828)',
        '--surface-on': cssVars['--surface-on'] || '#FFFFFF', // This typically stays white or a very light color
        '--surface-muted': cssVars['--surface-muted'] || 'var(--nextgen-brand-neutral-500, #3A3A3A)',
        '--surface-muted-fg': cssVars['--surface-muted-fg'] || 'var(--nextgen-brand-neutral-50, #E0E0E0)', // Updated from #A0A0A0 (brand-neutral-100)
        
        // Background aliases for surface
        '--bg-primary': cssVars['--bg-primary'] || 'var(--surface-bg)',
        '--bg-secondary': cssVars['--bg-secondary'] || 'var(--surface-card)',
        '--bg-muted': cssVars['--bg-muted'] || 'var(--surface-muted)',
        '--bg-popover': cssVars['--bg-popover'] || 'var(--surface-popover)',
        '--bg-transparent': cssVars['--bg-transparent'] || 'transparent',
        
        // Text colors - Aliasing surface and neutral families
        '--text-primary': cssVars['--text-primary'] || 'var(--surface-on)',
        '--text-secondary': cssVars['--text-secondary'] || 'var(--surface-muted-fg)',
        '--text-muted': cssVars['--text-muted'] || 'var(--nextgen-brand-neutral-200, #777777)',
        
        // Semantic colors - Pointing to Nextgen brand color primary aliases
        '--semantic-destructive': cssVars['--semantic-destructive'] || 'var(--nextgen-brand-red-primary, #D32F2F)',
        '--semantic-success': cssVars['--semantic-success'] || 'var(--nextgen-brand-orange-primary, #FF3600)',
        '--semantic-warning': cssVars['--semantic-warning'] || 'var(--nextgen-brand-amber-primary, #FFA000)',
        '--semantic-info': cssVars['--semantic-info'] || 'var(--nextgen-brand-blue-primary, #03A9F4)', // Updated info color to match nextgen blue
        
        // Border properties - Aligning with Nextgen Neutral family
        '--border-color-default': cssVars['--border-color-default'] || 'var(--nextgen-brand-neutral-400, #444444)',
        '--border-color-subtle': cssVars['--border-color-subtle'] || 'var(--nextgen-brand-neutral-600, #333333)',
        '--border-color-strong': cssVars['--border-color-strong'] || 'var(--nextgen-brand-neutral-300, #555555)',
        '--border-color-brand': cssVars['--border-color-brand'] || 'var(--brand-main)',
        '--border-width-none': cssVars['--border-width-none'] || '0px',
        '--border-width-thin': cssVars['--border-width-thin'] || '1px', // common default for thin
        '--border-width-default': cssVars['--border-width-default'] || '1px',
        '--border-width-thick': cssVars['--border-width-thick'] || '2px',
        '--border-style': cssVars['--border-style'] || 'solid',
        
        // Shadows (mostly unchanged, relies on var values from makeCssVars)
        '--shadow-none': cssVars['--shadow-none'] || 'none',
        '--shadow-xs': cssVars['--shadow-xs'] || '0 1px 2px rgba(0,0,0,0.2)',
        '--shadow-sm': cssVars['--shadow-sm'] || '0 2px 4px rgba(0,0,0,0.3)',
        '--shadow-md': cssVars['--shadow-md'] || '0 4px 8px rgba(0,0,0,0.4)',
        '--shadow-lg': cssVars['--shadow-lg'] || '0 8px 16px rgba(0,0,0,0.4)',
        '--shadow-xl': cssVars['--shadow-xl'] || '0 12px 24px rgba(0,0,0,0.5)',
        '--shadow-brand-sm': cssVars['--shadow-brand-sm'] || '0 2px 6px color-mix(in srgb, var(--brand-main) 20%, transparent)',
        '--shadow-brand-md': cssVars['--shadow-brand-md'] || '0 4px 10px color-mix(in srgb, var(--brand-main) 25%, transparent)',
        '--shadow-brand-lg': cssVars['--shadow-brand-lg'] || '0 8px 18px color-mix(in srgb, var(--brand-main) 30%, transparent)',
        
        // Border radius (unchanged)
        '--radius-none': cssVars['--radius-none'] || '0',
        '--radius-xs': cssVars['--radius-xs'] || '2px',
        '--radius-sm': cssVars['--radius-sm'] || '4px',
        '--radius-md': cssVars['--radius-md'] || '6px',
        '--radius-lg': cssVars['--radius-lg'] || '8px',
        '--radius-xl': cssVars['--radius-xl'] || '12px',
        '--radius-full': cssVars['--radius-full'] || '9999px',
        
        // Font families (mostly unchanged, relies on var values from makeCssVars)
        '--font-family-sans': cssVars['--font-family-sans'] || 'var(--font-inter), var(--font-titillium-web), var(--font-roboto), sans-serif',
        '--font-family-display': cssVars['--font-family-display'] || 'var(--font-syne), var(--font-titillium-web), var(--font-roboto), sans-serif',
        '--font-family-mono': cssVars['--font-family-mono'] || 'var(--font-roboto-mono), Consolas, monospace',
        
        // Gradients - Pointing to Nextgen brand color aliases
        '--gradient-from': cssVars['--gradient-from'] || 'var(--nextgen-brand-orange-primary, #FF3600)',
        '--gradient-to': cssVars['--gradient-to'] || 'var(--nextgen-brand-orange-600, #CC2B00)',
        '--gradient-accent': cssVars['--gradient-accent'] || 'var(--nextgen-brand-orange-400, #FF5700)',
        
        // UI component styling (mostly unchanged, rely on cascading vars)
        '--token-card-bg': cssVars['--token-card-bg'] || 'var(--surface-card)',
        '--token-card-overlay': cssVars['--token-card-overlay'] || 'none',
        '--token-card-border-color': cssVars['--token-card-border-color'] || 'var(--border-color-default)',
        '--token-card-border-width': cssVars['--token-card-border-width'] || 'var(--border-width-default)',
        '--token-card-border-style': cssVars['--token-card-border-style'] || 'var(--border-style)',
        '--token-card-shadow': cssVars['--token-card-shadow'] || 'var(--shadow-sm)',
        '--token-card-padding': cssVars['--token-card-padding'] || '1rem',
        
        // Token visualization
        '--token-value-size': cssVars['--token-value-size'] || '0.75rem',
        '--token-value-bg': cssVars['--token-value-bg'] || 'color-mix(in srgb, var(--surface-muted) 30%, transparent)',
        '--token-value-padding': cssVars['--token-value-padding'] || '0.25rem 0.5rem',
        '--token-value-radius': cssVars['--token-value-radius'] || 'var(--radius-sm)',
        
        // Color token previews
        '--token-color-preview-size': cssVars['--token-color-preview-size'] || '2rem',
        '--token-color-preview-radius': cssVars['--token-color-preview-radius'] || 'var(--radius-md)',
        '--token-color-preview-border-width': cssVars['--token-color-preview-border-width'] || '1px',
        '--token-color-preview-border-color': cssVars['--token-color-preview-border-color'] || 'var(--border-color-subtle)',
        
        // Shadow token previews
        '--token-shadow-preview-size': cssVars['--token-shadow-preview-size'] || '3rem',
        '--token-shadow-preview-radius': cssVars['--token-shadow-preview-radius'] || 'var(--radius-md)',
        '--token-shadow-preview-bg': cssVars['--token-shadow-preview-bg'] || 'var(--surface-bg)',
        '--token-shadow-preview-border-width': cssVars['--token-shadow-preview-border-width'] || '1px',
        '--token-shadow-preview-border-color': cssVars['--token-shadow-preview-border-color'] || 'var(--border-color-subtle)',
        
        // Radius token previews
        '--token-radius-preview-size': cssVars['--token-radius-preview-size'] || '3rem',
        '--token-radius-preview-bg': cssVars['--token-radius-preview-bg'] || 'color-mix(in srgb, var(--brand-main) 20%, transparent)',
        '--token-radius-preview-border-width': cssVars['--token-radius-preview-border-width'] || '1px',
        '--token-radius-preview-border-color': cssVars['--token-radius-preview-border-color'] || 'var(--border-color-subtle)',
        
        // Component containers (mostly unchanged, rely on cascading vars)
        '--overview-card-bg': cssVars['--overview-card-bg'] || 'var(--surface-card)',
        '--overview-card-bg-image': cssVars['--overview-card-bg-image'] || 'none',
        '--overview-card-overlay': cssVars['--overview-card-overlay'] || 'none',
        '--overview-card-shadow': cssVars['--overview-card-shadow'] || 'var(--shadow-md)',
        
        // Enhanced brand overview styling
        '--overview-card-header-bg': cssVars['--overview-card-header-bg'] || 'var(--brand-main)',
        '--overview-card-header-text-color': cssVars['--overview-card-header-text-color'] || 'var(--brand-on)',
        '--overview-card-header-description-color': cssVars['--overview-card-header-description-color'] || 'var(--brand-on, rgba(255,255,255,0.9))',
        '--overview-card-header-border-color': cssVars['--overview-card-header-border-color'] || 'var(--border-color-subtle)',
        '--overview-card-header-border-width': cssVars['--overview-card-header-border-width'] || '1px',
        '--overview-card-header-border-style': cssVars['--overview-card-header-border-style'] || 'solid',
        '--overview-card-header-padding': cssVars['--overview-card-header-padding'] || '2rem',
        '--overview-card-header-pattern': cssVars['--overview-card-header-pattern'] || 'none',
        '--overview-card-header-pattern-size': cssVars['--overview-card-header-pattern-size'] || '300px',
        '--overview-card-header-font-weight': cssVars['--overview-card-header-font-weight'] || '700',
        '--overview-card-header-letter-spacing': cssVars['--overview-card-header-letter-spacing'] || 'normal',
        '--overview-card-header-text-transform': cssVars['--overview-card-header-text-transform'] || 'none',
        '--overview-card-header-description-font-weight': cssVars['--overview-card-header-description-font-weight'] || 'normal',
        '--overview-card-header-description-line-height': cssVars['--overview-card-header-description-line-height'] || '1.5',
        '--overview-card-header-description-max-width': cssVars['--overview-card-header-description-max-width'] || '32rem',
        
        '--overview-card-logo-bg': cssVars['--overview-card-logo-bg'] || 'rgba(255,255,255,0.1)',
        '--overview-card-logo-backdrop-filter': cssVars['--overview-card-logo-backdrop-filter'] || 'blur(8px)',
        '--overview-card-logo-shadow': cssVars['--overview-card-logo-shadow'] || '0 4px 20px rgba(0,0,0,0.15)',
        '--overview-card-logo-text-color': cssVars['--overview-card-logo-text-color'] || 'var(--brand-on)',
        
        '--overview-card-content-padding': cssVars['--overview-card-content-padding'] || '2rem',
        '--overview-card-section-title-color': cssVars['--overview-card-section-title-color'] || 'var(--foreground)',
        '--overview-card-section-title-weight': cssVars['--overview-card-section-title-weight'] || '600',
        '--overview-card-section-border-color': cssVars['--overview-card-section-border-color'] || 'var(--border-color-subtle)',
        
        '--overview-card-color-shadow': cssVars['--overview-card-color-shadow'] || 'var(--shadow-sm)',
        '--overview-card-color-radius': cssVars['--overview-card-color-radius'] || 'var(--radius-md)',
        '--overview-card-color-label-bg': cssVars['--overview-card-color-label-bg'] || 'rgba(0,0,0,0.5)',
        '--overview-card-color-label-text': cssVars['--overview-card-color-label-text'] || 'white',
        
        '--overview-card-tag-bg': cssVars['--overview-card-tag-bg'] || 'var(--surface-muted)',
        '--overview-card-tag-text': cssVars['--overview-card-tag-text'] || 'var(--surface-muted-fg)',
        
        // Component specific backgrounds - aligning with Nextgen brand colors
        '--hero-bg': cssVars['--hero-background'] || 'var(--nextgen-brand-dark-900, #0A0A0A)', // Changed cssVars key from '--hero-bg' to '--hero-background'
        '--hero-bg-image': cssVars['--hero-background-image'] || 'radial-gradient(circle, color-mix(in srgb, var(--brand-main) 5%, transparent) 0%, transparent 60%)', // Uses brand-main for tint
        '--hero-overlay': cssVars['--hero-overlay'] || 'none',
        '--nav-bg': cssVars['--nav-background'] || 'color-mix(in srgb, var(--nextgen-brand-dark-800, #101010) 85%, transparent)', // From rgba(16,16,16,0.85)
        '--nav-color': cssVars['--nav-color'] || 'var(--nextgen-brand-neutral-50, #E0E0E0)', // Specific nav text color
        '--nav-overlay': cssVars['--nav-overlay'] || 'none',
        '--tabs-list-background': cssVars['--tabs-list-background'] || 'color-mix(in srgb, var(--nextgen-brand-neutral-900, #222222) 80%, transparent)', // From rgba(34,34,34,0.8)
        
        // Brand Picker Container Styles - Sourcing from componentStyles via cssVars
        '--brand-picker-container-background': cssVars['--brand-picker-container-background'] || 'color-mix(in srgb, var(--nextgen-brand-dark-800, #101010) 70%, transparent)',
        '--brand-picker-container-color': cssVars['--brand-picker-container-color'] || 'var(--text-primary)', // Default to primary text color
        '--brand-picker-container-padding': cssVars['--brand-picker-container-padding'] || '1.5rem',
        '--brand-picker-container-border-radius': cssVars['--brand-picker-container-border-radius'] || 'var(--radius-lg)',
        '--brand-picker-container-box-shadow': cssVars['--brand-picker-container-box-shadow'] || 'var(--shadow-md)',
        '--brand-picker-container-margin-top': cssVars['--brand-picker-container-margin-top'] || '2.5rem',
        '--brand-picker-container-margin-bottom': cssVars['--brand-picker-container-margin-bottom'] || '0',
        '--brand-picker-container-background-image': cssVars['--brand-picker-container-background-image'] || 'none', // For potential overlay in cssVars
        '--brand-picker-overlay': cssVars['--brand-picker-overlay'] || 'none', // Kept for direct overlay image if needed
        
        '--tooltip-background': cssVars['--tooltip-background'] || 'color-mix(in srgb, var(--nextgen-brand-dark-900, #0A0A0A) 92%, transparent)', // From rgba(10,10,10,0.92)
      };
      
      // Override with any values from the brand
      for (const [key, value] of Object.entries(cssVars)) {
        if (key.startsWith('--')) {
          tokens[key] = value;
        }
      }
      
      return tokens;
    }, [cssVars]);

    useEffect(() => {
      const root = document.documentElement;
      const previousStyles: { [key: string]: string | null } = {};

      // Apply new styles and store previous values
      Object.entries(designTokens).forEach(([key, value]) => {
        previousStyles[key] = root.style.getPropertyValue(key);
        root.style.setProperty(key, String(value));
      });

      // Cleanup function to revert to previous styles or remove added ones
      return () => {
        Object.entries(designTokens).forEach(([key]) => {
          const previousValue = previousStyles[key];
          if (previousValue !== null && previousValue !== undefined && previousValue !== "") {
            root.style.setProperty(key, previousValue);
          } else {
            root.style.removeProperty(key);
          }
        });
      };
    }, [designTokens]); // Re-run effect if designTokens change

    const brandPickerShowOverlay = brand.componentStyles?.brandPickerContainer?.showOverlay;

    return (
      <div
        style={designTokens as React.CSSProperties}
        className={`min-h-screen bg-[var(--background)] text-[var(--foreground)] [font-family:var(--font-family-sans)] ${inter.variable} ${roboto.variable} ${roboto_mono.variable} ${syne.variable} ${titillium_web.variable}`}
      >
        <div className="fixed top-6 right-6 z-50 space-y-3">
          <Card
            className="p-3 relative overflow-hidden bg-[var(--brand-picker-container-background)] text-[var(--brand-picker-container-color)] border-[color:var(--brand-picker-border-color,var(--border))] [border-radius:var(--brand-picker-container-border-radius)] shadow-[var(--brand-picker-container-box-shadow)]"
          >
            {brandPickerShowOverlay && (
              <div
                className="absolute inset-0 pointer-events-none opacity-70 mix-blend-overlay rounded-[var(--brand-picker-container-border-radius)] bg-[image:var(--brand-picker-overlay,none)]"
              />
            )}
            <div className="space-y-2 relative z-10">
              {/* <Label className="text-xs font-medium">Brand Theme</Label> */}
              <Select value={slug} onValueChange={setSlug}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {BRANDS.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: b.brand.main.hex }}
                          />
                          <span>{b.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Card 
            className="p-3 max-w-xs bg-[var(--page-card-bg,var(--card))] hidden border-[color:var(--page-card-border-color,var(--border))] [border-radius:var(--page-card-radius,var(--radius-lg))] shadow-[var(--page-card-shadow,var(--shadow-md))]"
          >
            <p className="text-xs text-muted-foreground">{brand.description}</p>
          </Card>
        </div>
        
        
        <Preview vars={designTokens} brand={brand} />
      </div>
    );
  }
  