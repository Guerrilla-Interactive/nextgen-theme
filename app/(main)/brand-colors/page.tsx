"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Inter, Roboto, Roboto_Mono, Syne, Titillium_Web } from 'next/font/google';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/features/unorganized-components/ui/select";
import { Button } from "@/features/unorganized-components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/features/unorganized-components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/features/unorganized-components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/features/unorganized-components/ui/tooltip";
import { toast } from "sonner";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Label } from "@/features/unorganized-components/ui/label";
import { parseColorString as parseColorStringFromBrands } from "@/features/unorganized-utils/color-stuff";
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

// Ensure these imports are present and correct
import { ColorPicker } from "./ColorPicker"; // Added import for the new ColorPicker
import { ChartShowcase } from './ChartShowcase';
import { ComponentShowcase } from '../brandguide/components/component-showcase.component';
import {
  BRANDS,
  makeCssVars,
} from "./brands";
import type { BrandDefinition } from "./brands-types";
import { UseClientConfigs } from "../(root)/[slug]/_page-slug-core-utilities/use-client-configs";
import { srgbToOklch } from "@/features/unorganized-utils/color-stuff";

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
  const cleanKey = key.startsWith('--') ? key.substring(2) : key;
  const lowerKey = cleanKey.toLowerCase();
  return (
    lowerKey.includes("color") ||
    lowerKey.includes("bg") || // Backgrounds are often colors
    lowerKey.includes("text") || // Text colors
    lowerKey.includes("fill") || // SVG fills
    lowerKey.includes("stroke") || // SVG strokes
    lowerKey.startsWith("brand-") ||
    lowerKey.startsWith("surface-") ||
    lowerKey.startsWith("semantic-") ||
    lowerKey.startsWith("chart-") || // Chart colors
    // ShadCN/Tailwind specific color names
    lowerKey === "primary" ||
    lowerKey === "secondary" ||
    lowerKey === "muted" ||
    lowerKey === "accent" ||
    lowerKey === "destructive" ||
    lowerKey === "success" ||
    lowerKey === "warning" ||
    lowerKey === "info" ||
    lowerKey === "background" ||
    lowerKey === "foreground" ||
    lowerKey === "card" ||
    lowerKey === "card-foreground" ||
    lowerKey === "popover" ||
    lowerKey === "popover-foreground" ||
    lowerKey === "primary-foreground" ||
    lowerKey === "secondary-foreground" ||
    lowerKey === "muted-foreground" ||
    lowerKey === "accent-foreground" ||
    lowerKey === "destructive-foreground" ||
    lowerKey === "success-foreground" ||
    lowerKey === "warning-foreground" ||
    lowerKey === "info-foreground" ||
    lowerKey.endsWith("-from") || // Gradient from
    lowerKey.endsWith("-to") || // Gradient to
    lowerKey.endsWith("-accent") // Gradient accent (often a color)
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

  // OKLCH: oklch(L C H) or oklch(L C H / A) - Handles space or comma separators
  // Example: oklch(0.5 0.15 120) or oklch(50% 0.15 120 / 0.5)
  match = colorStr.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+%?)(?:\s*(?:\/|,)\s*([\d.]+%?))?\s*\)$/i);
  if (match) {
    // For identification & sorting, we don't need perfect conversion to RGB here.
    // Just returning a consistent placeholder is enough for valueIsLikelyColor.
    // Alpha defaults to 1 if not present.
    const alphaStr = match[4] || '1'; // Corrected index for alpha based on typical regex group capture for optional groups
    const alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);
    return { r: 0, g: 0, b: 1, a: isNaN(alpha) ? 1 : alpha }; // Placeholder (e.g., blue), with parsed alpha
  }

  // HSL: hsl(H,S%,L%) or hsla(H,S%,L%,A) - Handles with/without commas, with/without 'a'
  // Example: hsl(120, 50%, 50%) or hsla(120, 50%, 50%, 0.5)
  match = colorStr.match(/^hsl(?:a)?\(\s*([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%(?:\s*,?\s*([\d.]+))?\s*\)$/i);
  if (match) {
    const alphaStr = match[4] || '1'; // Corrected index for alpha
    // Alpha in HSL can be unitless or percentage. Assuming unitless if not explicitly %
    // CSS Color 4: alpha is <number> | <percentage>
    // For simplicity, this regex expects number for alpha if present.
    const alpha = parseFloat(alphaStr); // No % expected by this regex for alpha here, adjust if needed
    return { r: 0, g: 1, b: 0, a: isNaN(alpha) ? 1 : alpha }; // Placeholder (e.g., green), with parsed alpha
  }

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

function isTypographyToken(key: string): boolean {
  return key.startsWith("font-") || key.startsWith("letter-") || key.startsWith("line-") || key.startsWith("text-") || key.startsWith("weight-") || key.startsWith("leading-") || key.startsWith("tracking-");
}

function isSpacingToken(key: string): boolean {
  return key.startsWith("space-") || key.startsWith("padding-");
}

function isGradientToken(key: string): boolean {
  return key.startsWith("gradient-");
}

function isMotionToken(key: string): boolean {
  return key.startsWith("motion-") || key.startsWith("ease-");
}

// New helper function to classify tokens
function getTokenType(tokenName: string): 'foundation' | 'semantic' | 'component' | 'unknown' {
  const t = tokenName.replace(/^--/, ''); // Remove leading --

  // Order of checks matters. Be specific first.

  // FOUNDATION
  // 1. Specific brand color shades (e.g., brand-orange-500, brand-neutral-100, brand-light-blue-50)
  if (t.match(/^brand-(?:[a-z]+-)*[a-z]+-\d{2,3}$/i)) {
    return 'foundation';
  }
  // 2. Other explicit foundation tokens (typography, spacing, radius, etc.)
  //    Excludes things like 'shadow-brand-sm' which are semantic.
  const foundationPrimitivesRegex = /^(font-family|font-size|font-weight|line-height|letter-spacing|radius|motion|ease|shadow-(xs|sm|md|lg|xl)$|spacing-unit|space-\d+|border-width|border-style)/i;
  if (foundationPrimitivesRegex.test(t) && !t.startsWith("shadow-brand-")) {
    return 'foundation';
  }

  // SEMANTIC
  // 1. Core brand semantic aliases for roles
  if (['brand-main', 'brand-secondary', 'brand-on'].includes(t)) {
    return 'semantic';
  }
  // 2. Brand color group aliases (e.g., brand-orange-primary, brand-neutral-primary)
  //    These are aliases to the canonical (e.g., 500) shade of that color group.
  if (t.match(/^brand-(?:[a-z]+-)*[a-z]+-primary$/i)) {
    return 'semantic';
  }
  // 3. Other semantic tokens (contextual roles, standard aliases)
  if (
    t.startsWith("surface-") ||
    t.startsWith("text-") ||
    t.startsWith("border-color-") ||
    t.startsWith("semantic-") ||
    t.startsWith("bg-") ||
    t.startsWith("shadow-brand-") ||
    t.startsWith("gradient-") ||
    t.startsWith("chart-") ||
    [ // ShadCN style aliases
      "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
      "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground",
      "accent", "accent-foreground", "destructive", "destructive-foreground", "success", "success-foreground",
      "warning", "warning-foreground", "info", "info-foreground", "border", "input", "ring"
    ].includes(t) ||
    // Specific semantic padding tokens (representing roles)
    t.startsWith("padding-input") || t.startsWith("padding-button") || t.startsWith("padding-card") || t.startsWith("padding-compact")
  ) {
    return 'semantic';
  }

  // COMPONENT
  // Specific overrides for UI components
  if (
    t.startsWith("button-") ||
    t.startsWith("nav-") ||
    t.startsWith("hero-") ||
    t.startsWith("tabs-") ||
    t.startsWith("overview-card-") ||
    t.startsWith("chart-showcase-") ||
    t.startsWith("component-showcase-") ||
    t.startsWith("brand-picker-") ||
    t.startsWith("token-group-card-") ||
    t.startsWith("tooltip-") ||
    (t.startsWith("input-") && !["input"].includes(t)) || // e.g. input-background, but not the semantic alias 'input'
    (t.startsWith("card-") && !["card", "card-foreground"].includes(t)) || // e.g. card-padding, but not semantic aliases
    t.startsWith("badge-") ||
    t.startsWith("loading-indicator-") ||
    t.startsWith("page-card-") ||
    t.startsWith("surface-set-") // Component-level surface sets
  ) {
    return 'component';
  }

  return 'unknown'; // Fallback for anything not caught
}

// New helper function for SUB-CATEGORIZATION within layers
function getTokenSubCategory(tokenName: string, layer: 'foundation' | 'semantic' | 'component'): string {
  const t = tokenName.replace(/^--/, ''); // Remove leading --

  if (layer === 'foundation') {
    if (t.match(/^brand-(?:[a-z]+-)*[a-z]+-\d{2,3}$/i)) return 'Brand Color Shades';
    if (t.startsWith('font-family')) return 'Font Families';
    if (t.startsWith('font-size')) return 'Font Sizes';
    if (t.startsWith('font-weight')) return 'Font Weights';
    if (t.startsWith('line-height') || t.startsWith('leading')) return 'Line Heights';
    if (t.startsWith('letter-spacing') || t.startsWith('tracking')) return 'Letter Spacings';
    if (t.startsWith('radius')) return 'Radii';
    if (t.startsWith('space-') || t === 'spacing-unit') return 'Spacing Units';
    if (t.startsWith('motion-')) return 'Motion Durations';
    if (t.startsWith('ease-')) return 'Motion Easings';
    if (t.startsWith('shadow-') && !t.startsWith('shadow-brand-')) return 'Shadows (Primitive)';
    if (t.startsWith('border-width')) return 'Border Widths';
    if (t.startsWith('border-style')) return 'Border Styles';
    return 'Other Foundation';
  }

  if (layer === 'semantic') {
    if (['brand-main', 'brand-secondary', 'brand-on'].includes(t) || t.match(/^brand-(?:[a-z]+-)*[a-z]+-primary$/i)) return 'Brand Role Aliases';
    if (t.startsWith('surface-')) return 'Surface Colors';
    if (t.startsWith('text-')) return 'Text Colors';
    if (t.startsWith('border-color-')) return 'Border Colors';
    if (t.startsWith('semantic-') || ['success', 'destructive', 'warning', 'info'].some(s => t.startsWith(s))) return 'Status & Feedback Colors';
    if (t.startsWith('bg-') || t === 'background') return 'Background Colors';
    if (t === 'foreground') return 'Foreground Colors';
    if (['card', 'card-foreground', 'popover', 'popover-foreground', 'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground', 'accent', 'accent-foreground'].includes(t)) return 'ShadCN UI Aliases';
    if (t.startsWith('shadow-brand-')) return 'Brand Shadows (Semantic)';
    if (t.startsWith('gradient-')) return 'Gradients';
    if (t.startsWith('chart-')) return 'Chart Colors';
    if (t === 'ring') return 'Focus Ring Color';
    if (t === 'border' || t === 'input') return 'Border & Input Aliases';
    if (t.startsWith("padding-input") || t.startsWith("padding-button") || t.startsWith("padding-card") || t.startsWith("padding-compact")) return 'Semantic Padding Roles';
    return 'Other Semantic';
  }

  if (layer === 'component') {
    if (t.startsWith('button-')) return 'Button Styles';
    if (t.startsWith('nav-')) return 'Navigation Styles';
    if (t.startsWith('hero-')) return 'Hero Styles';
    if (t.startsWith('tabs-')) return 'Tabs Styles';
    if (t.startsWith('overview-card-')) return 'Overview Card Styles';
    if (t.startsWith('chart-showcase-')) return 'Chart Showcase Styles';
    if (t.startsWith('component-showcase-')) return 'Component Showcase Styles';
    if (t.startsWith('brand-picker-')) return 'Brand Picker Styles';
    if (t.startsWith('token-group-card-')) return 'Token Group Card Styles';
    if (t.startsWith('tooltip-')) return 'Tooltip Styles';
    if (t.startsWith('input-') && t !== 'input') return 'Input Component Styles';
    if (t.startsWith("card-") && !["card", "card-foreground"].includes(t)) return 'Card Component Styles';
    if (t.startsWith('badge-')) return 'Badge Styles';
    if (t.startsWith('loading-indicator-')) return 'Loading Indicator Styles';
    if (t.startsWith('page-card-')) return 'Page Card Styles';
    if (t.startsWith('surface-set-')) return 'Surface Set Styles';
    return 'Other Component Styles';
  }

  return 'Uncategorized';
}

// Helper component for rendering individual token previews
interface TokenPreviewItemProps {
  tokenKeys: string[]; // The CSS variable name(s), e.g., ["brand-main", "primary"]
  tokenName: string; // The primary CSS variable name, e.g., "--brand-main"
  tokenValue: string; // The current computed value of the token
  codeStyle: React.CSSProperties;
  onInteractiveTokenChange: (tokenName: string, newValue: string) => void;
  referencedBy?: string[]; // New: List of tokens that reference this one
  referencesTo?: string;  // New: The token this one references (if any, direct var() only for now)
}

const TokenPreviewItem: React.FC<TokenPreviewItemProps> = ({
  tokenKeys,
  tokenName,
  tokenValue,
  codeStyle,
  onInteractiveTokenChange,
  referencedBy, // New
  referencesTo  // New
}) => {
  const handleColorCopy = async () => {
    try {
      await navigator.clipboard.writeText(tokenValue);
      toast.success(`Copied: ${tokenValue}`);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error(`Failed to copy: ${tokenValue}`);
    }
  };

  const previewBoxBaseStyle: React.CSSProperties = {
    width: "var(--token-preview-size, 2.5rem)",
    height: "var(--token-preview-size, 2.5rem)",
    borderRadius: "var(--token-preview-radius, var(--radius-sm, 0.375rem))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "var(--token-preview-border-width, 1px)",
    borderStyle: "var(--token-preview-border-style, solid)",
    borderColor: "var(--token-preview-border-color, var(--border-color-subtle, #555))",
    backgroundColor: "var(--token-preview-item-bg, var(--surface-card, #222))",
  };

  // Enhanced check: Prioritize key, then check value if key doesn't indicate color explicitly
  let valueIsLikelyColor = false;
  if (isColorToken(tokenKeys[0])) {
    valueIsLikelyColor = true;
  } else {
    // If key isn't a color token, check if the value itself is a color
    if (parseColorString(tokenValue) !== null) {
      valueIsLikelyColor = true;
    } else if (tokenValue && tokenValue.startsWith("var(")) {
      const innerVar = tokenValue.slice(4, -1); // Extracts --some-token
      if (isColorToken(innerVar)) {
        valueIsLikelyColor = true;
      }
    }
  }

  if (valueIsLikelyColor) {
    const isVeryLight = tokenValue.toLowerCase() === "#ffffff" || tokenValue.toLowerCase() === "white";
    const isTransparent = tokenValue.startsWith("rgba(") && tokenValue.endsWith(", 0)");

    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="cursor-pointer hover:cursor-copy transition-all duration-150 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-main)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              style={{
                ...previewBoxBaseStyle,
                backgroundColor: tokenValue,
                // Ensure border is visible for very light/transparent swatches
                borderColor: (isVeryLight || isTransparent)
                  ? "var(--token-preview-light-border-color, var(--border-color-default, #444))"
                  : "transparent",
              }}
              onClick={handleColorCopy}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleColorCopy(); }}
            />
          </TooltipTrigger>
          <TooltipContent
            className="bg-[var(--tooltip-background)] text-[var(--tooltip-primary)] border-[var(--tooltip-border-color,var(--border))] shadow-xl rounded-md px-3 py-2 text-xs"

          >
            {tokenKeys.map(key =>
              <p key={key}
                className="font-bold"
                style={{ color: "var(--tooltip-color, var(--brand-on, var(--tooltip-foreground)))" }} >
                {key}
              </p>)}
            <p
              className="text-[var(--surface-on)]"
            >
              {tokenValue}
            </p>
            {referencesTo && (
              <p className="mt-1 pt-1 border-t border-[var(--tooltip-border-color,var(--border))] border-opacity-50 text-xs">
                <span className="font-semibold" style={{ color: "var(--tooltip-key-color, var(--brand-on, var(--tooltip-foreground)))" }}>References:</span>
                <span style={{ color: "var(--tooltip-value-color, color-mix(in srgb, var(--brand-on, #FFF) 70%, transparent))" }}> {referencesTo}</span>
              </p>
            )}
            {referencedBy && referencedBy.length > 0 && (
              <div className="mt-1 pt-1 border-t border-[var(--tooltip-border-color,var(--border))] border-opacity-50 text-xs">
                <p className="font-semibold" style={{ color: "var(--tooltip-key-color, var(--brand-on, var(--tooltip-foreground)))" }}>Referenced By:</p>
                <ul className="list-disc list-inside max-h-20 overflow-y-auto">
                  {referencedBy.map(ref => (
                    <li key={ref} style={{ color: "var(--tooltip-value-color, color-mix(in srgb, var(--brand-on, #FFF) 70%, transparent))" }}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isShadowToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-2 w-full"> {/* Reduced gap */}
        <div
          style={{
            ...previewBoxBaseStyle,
            boxShadow: tokenValue,
            backgroundColor: "var(--token-shadow-preview-bg, var(--card, #333))",
          }}
        ></div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue}
        </code>
      </div>
    );
  }

  if (isRadiusToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-2 w-full"> {/* Reduced gap */}
        <div
          style={{
            ...previewBoxBaseStyle,
            borderRadius: tokenValue,
            backgroundColor: "var(--token-radius-preview-bg, color-mix(in srgb, var(--brand-main, #F00) 25%, transparent))",
          }}
        ></div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue}
        </code>
      </div>
    );
  }

  if (isBorderToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-2 w-full"> {/* Reduced gap */}
        <div
          style={{
            ...previewBoxBaseStyle,
            width: "var(--token-border-preview-width, 4rem)", // Slightly reduced width
            borderWidth: tokenKeys[0].includes("width") ? tokenValue : "var(--border-width-default, 1px)",
            borderStyle: tokenKeys[0].includes("style") ? tokenValue : "var(--border-style-default, solid)",
            borderColor: tokenKeys[0].includes("color") ? tokenValue : "var(--border-color-default, #444)",
            backgroundColor: "var(--token-border-preview-bg, var(--surface-bg, #111))",
          }}
        >
          <span
            className="text-xs"
            style={{ color: "var(--token-border-preview-text-color, var(--muted-foreground, #999))" }}
          >
            Preview
          </span>
        </div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue}
        </code>
      </div>
    );
  }

  if (isGradientToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-2 w-full"> {/* Reduced gap */}
        <div
          style={{
            ...previewBoxBaseStyle,
            // Use a generic gradient as specific from/to vars are not directly available here
            background: `linear-gradient(45deg, var(--surface-muted, #CCCCCC), var(--surface-muted-fg, #999999))`,
          }}
        ></div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue} <span className="text-[color:var(--muted-foreground)] text-opacity-70">(complex value)</span>
        </code>
      </div>
    );
  }

  if (isTypographyToken(tokenKeys[0])) {
    const typoStyle: React.CSSProperties = { ...previewBoxBaseStyle };
    typoStyle.width = "auto";
    typoStyle.minWidth = "var(--token-preview-size, 2.5rem)"; // Adjusted minWidth
    typoStyle.height = "auto";
    typoStyle.minHeight = "var(--token-preview-size, 2.5rem)"; // Adjusted minHeight
    typoStyle.padding = "var(--token-typography-preview-padding, 0.3rem)"; // Reduced padding
    typoStyle.backgroundColor = "var(--token-typography-preview-bg, var(--surface-card, #222))";

    const textSpanStyle: React.CSSProperties = {
      color: "var(--token-typography-preview-text-color, var(--foreground, #FFF))"
    };
    if (tokenKeys[0].startsWith("font-family")) textSpanStyle.fontFamily = tokenValue;
    if (tokenKeys[0].startsWith("font-size")) textSpanStyle.fontSize = tokenValue;
    if (tokenKeys[0].startsWith("font-weight")) textSpanStyle.fontWeight = tokenValue;
    if (tokenKeys[0].startsWith("line-height") || tokenKeys[0].startsWith("leading")) textSpanStyle.lineHeight = tokenValue;
    if (tokenKeys[0].startsWith("letter-spacing") || tokenKeys[0].startsWith("tracking")) textSpanStyle.letterSpacing = tokenValue;
    if (tokenKeys[0].startsWith("text-transform")) textSpanStyle.textTransform = tokenValue as any;

    return (
      <div className="flex items-center gap-3 w-full">
        <div style={typoStyle}>
          <span style={textSpanStyle}>
            Aa Bb Cc
          </span>
        </div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue}
        </code>
      </div>
    );
  }

  if (isSpacingToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-3 w-full">
        <div
          style={{
            // ...previewBoxBaseStyle, // Don't use full base for this one
            height: "var(--token-spacing-preview-height, 2rem)",
            width: tokenValue,
            minWidth: "0.25rem",
            backgroundColor: "var(--token-spacing-preview-bg, color-mix(in srgb, var(--brand-main, #F00) 30%, transparent))",
            borderWidth: "var(--token-spacing-preview-border-width, 1px)",
            borderStyle: "var(--token-spacing-preview-border-style, dashed)",
            borderColor: "var(--token-spacing-preview-border-color, var(--brand-main, #F00))",
            borderRadius: "var(--token-spacing-preview-radius, var(--radius-xs, 0.125rem))",
            opacity: "var(--token-spacing-preview-opacity, 0.7)",
          }}
          title={`Space: ${tokenValue}`}
        ></div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue}
        </code>
      </div>
    );
  }

  if (isMotionToken(tokenKeys[0])) {
    return (
      <div className="flex items-center gap-3 w-full">
        <div
          style={{
            ...previewBoxBaseStyle,
            backgroundColor: "var(--token-motion-preview-bg, var(--surface-muted, #333))",
          }}
        >
          <Spacing
            className="w-5 h-5"
            style={{ color: "var(--token-motion-preview-icon-color, var(--foreground, #FFF))" }}
          />
        </div>
        <code style={codeStyle} className="flex-1 truncate">
          {tokenValue}
        </code>
      </div>
    );
  }

  // Default fallback for other token types (should be rare now)
  return (
    <code style={codeStyle} className="flex-1 font-mono text-xs truncate block max-w-full">
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



function TokenShowcase({
  vars,
  interactiveTokenValues,
  onInteractiveTokenChange
}: {
  vars: Record<string, string>;
  interactiveTokenValues: Record<string, string>;
  onInteractiveTokenChange: (tokenName: string, newValue: string) => void;
}) {
  const codeStyle: React.CSSProperties = {
    fontSize: "var(--token-value-font-size, var(--font-size-xs, 0.75rem))",
    fontFamily: "var(--token-value-font-family, var(--font-family-mono))",
    backgroundColor: "var(--token-value-bg, color-mix(in srgb, var(--surface-muted, #333) 30%, transparent))",
    padding: "var(--token-value-padding, 0.25rem 0.5rem)",
    borderRadius: "var(--token-value-radius, var(--radius-sm, 0.25rem))",
    color: "var(--token-value-color, var(--foreground))",
    lineHeight: "var(--token-value-line-height, 1.3)",
  };

  // Group tokens first by main layer, then by sub-category
  const groupedTokens: Record<string, Record<string, [string, string][]>> = {
    foundation: {},
    semantic: {},
    component: {},
    unknown: { 'Uncategorized': [] }, // Default sub-category for unknown
  };

  Object.entries(vars).forEach(([key, value]) => {
    const layer = getTokenType(key) || 'unknown';
    const subCategory = getTokenSubCategory(key, layer as any) || 'Uncategorized';

    if (!groupedTokens[layer]) {
      groupedTokens[layer] = {};
    }
    if (!groupedTokens[layer][subCategory]) {
      groupedTokens[layer][subCategory] = [];
    }
    groupedTokens[layer][subCategory].push([key, value]);
  });

  // Sort tokens within each sub-category
  for (const layer in groupedTokens) {
    for (const subCategory in groupedTokens[layer]) {
      groupedTokens[layer][subCategory].sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }
  }

  const layerOrder: (keyof typeof groupedTokens)[] = ['foundation', 'semantic', 'component', 'unknown'];
  const layerDisplayNames: Record<keyof typeof groupedTokens, string> = {
    foundation: "Foundation Tokens",
    semantic: "Semantic Tokens",
    component: "Component Tokens",
    unknown: "Unknown/Uncategorized Tokens",
  };

  // Calculate references
  const referencesToMap: Record<string, string> = {}; // tokenName -> referencedTokenName
  const referencedByMap: Record<string, string[]> = {}; // tokenName -> list of tokens referencing it

  Object.entries(vars).forEach(([key, value]) => {
    if (!referencedByMap[key]) referencedByMap[key] = [];
    const match = typeof value === 'string' ? value.match(/var\\((--[^\\)]+)\\)/) : null;
    if (match && match[1]) {
      const referencedToken = match[1];
      referencesToMap[key] = referencedToken;
      if (!referencedByMap[referencedToken]) {
        referencedByMap[referencedToken] = [];
      }
      if (!referencedByMap[referencedToken].includes(key)) {
        referencedByMap[referencedToken].push(key);
      }
    }
  });

  return (
    <div className="container mx-auto flex flex-wrap gap-4 space-y-4">
      {layerOrder.map((layerKey) => {
        const subCategories = groupedTokens[layerKey];
        const layerName = layerDisplayNames[layerKey];
        const totalTokensInLayer = Object.values(subCategories).reduce((sum, tokens) => sum + tokens.length, 0);

        if (totalTokensInLayer === 0 && layerKey !== 'unknown') return null;
        if (layerKey === 'unknown' && totalTokensInLayer === 0) return null;

        return (
          <Card // Changed div to Card
            key={layerName}
            className="p-3 rounded-lg w-full" // Existing classes, p-3 might be redundant if CardContent adds padding
            style={{
              backgroundColor: "var(--token-group-card-bg, var(--card))",
              backgroundImage: "var(--token-group-card-bg-image, none)",
              borderWidth: "var(--token-group-card-border-width, var(--border-width-default, 1px))",
              borderStyle: "var(--token-group-card-border-style, var(--border-style-default, solid))",
              borderColor: "var(--token-group-card-border-color, var(--border-color-default, var(--border)))",
              borderRadius: "var(--token-group-card-radius, var(--radius-lg, 0.75rem))",
              boxShadow: "var(--token-group-card-shadow, var(--shadow-md, none))",
              padding: "var(--token-group-card-padding, var(--space-md, 1rem))", // This padding might conflict with CardContent, review needed
            }}
          >
            <CardHeader> {/* Added CardHeader */}
              <CardTitle /* Changed h3 to CardTitle */
                className="mb-4 text-lg font-semibold tracking-tight"
                style={{
                  color: "var(--token-group-title-color, var(--foreground))",
                  fontSize: "var(--token-group-title-font-size, var(--font-size-lg, 1.125rem))",
                  fontWeight: "var(--token-group-title-font-weight, var(--font-weight-semibold, 600))",
                  marginBottom: "var(--token-group-title-margin-bottom, var(--space-sm, 0.75rem))",
                  borderBottom: "var(--token-group-title-border-bottom, 1px solid var(--border-color-subtle))",
                  paddingBottom: "var(--token-group-title-padding-bottom, var(--space-xs, 0.375rem))",
                }}
              >
                {layerName}
              </CardTitle>
            </CardHeader>
            <CardContent> {/* Added CardContent to wrap the rest */}
              {Object.entries(subCategories).sort(([subA], [subB]) => subA.localeCompare(subB)).map(([subCategoryName, tokensInSubCategory]) => {
                if (tokensInSubCategory.length === 0) return null;

                const colorTokens = tokensInSubCategory.filter(([key]) => isColorToken(key));
                const otherTokens = tokensInSubCategory.filter(([key]) => !isColorToken(key));

                return (
                  <div key={subCategoryName} className="mb-6"> {/* Add margin bottom for sub-category sections */}
                    <h4
                      className="mb-3 text-base font-medium tracking-tight" // Slightly smaller than main layer title
                      style={{
                        color: "var(--token-subgroup-title-color, var(--muted-foreground))",
                        fontSize: "var(--token-subgroup-title-font-size, var(--font-size-base, 1rem))",
                        fontWeight: "var(--token-subgroup-title-font-weight, var(--font-weight-medium, 500))",
                        borderBottom: "var(--token-subgroup-title-border-bottom, 1px dashed var(--border-color-subtle))",
                        paddingBottom: "var(--token-subgroup-title-padding-bottom, var(--space-xxs, 0.25rem))",
                        marginTop: "var(--token-subgroup-title-margin-top, var(--space-sm, 0.75rem))", // Add some top margin if not the first sub-category
                      }}
                    >
                      {subCategoryName}
                    </h4>

                    {/* Render Color Tokens as a Row of Swatches */}
                    {colorTokens.length > 0 && (
                      <div className="flex flex-wrap gap-x-2 gap-y-3 mb-4">
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
                            if (!colorA && !colorB) return 0;
                            if (!colorA) return 1;
                            if (!colorB) return -1;
                            if (colorA.a === 0 && colorB.a !== 0) return 1;
                            if (colorB.a === 0 && colorA.a !== 0) return -1;
                            if (colorA.a === 0 && colorB.a === 0) return 0;
                            const hslA = rgbToHsl(colorA.r, colorA.g, colorA.b);
                            const hslB = rgbToHsl(colorB.r, colorB.g, colorB.b);
                            if (hslA.l !== hslB.l) return hslA.l - hslB.l;
                            if (hslA.s !== hslB.s) return hslB.s - hslA.s;
                            return hslA.h - hslB.h;
                          });

                          return sortedColorEntries.map(([value, keys]) => {
                            const primaryKey = keys[0];
                            const tokenNameWithHyphens = `--${primaryKey}`;
                            const currentValue = interactiveTokenValues[tokenNameWithHyphens] || value;
                            return (
                              <TokenPreviewItem
                                key={primaryKey}
                                tokenKeys={keys}
                                tokenName={tokenNameWithHyphens}
                                tokenValue={currentValue}
                                codeStyle={codeStyle}
                                onInteractiveTokenChange={onInteractiveTokenChange}
                                referencedBy={referencedByMap[tokenNameWithHyphens]}
                                referencesTo={referencesToMap[tokenNameWithHyphens]}
                              />
                            );
                          });
                        })()}
                      </div>
                    )}

                    {/* Render Other Tokens as a List */}
                    {otherTokens.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-3">
                        {otherTokens.map(([key, value]) => {
                          const tokenNameWithHyphens = `${key}`;
                          const currentValue = interactiveTokenValues[tokenNameWithHyphens] || value || "";
                          return (
                            <div key={key} className="space-y-0.5 break-inside-avoid">
                              <span
                                className="text-xs font-medium text-[var(--token-key-color,var(--muted-foreground))]"
                                style={{
                                  fontFamily: "var(--token-key-font-family, var(--font-family-mono))",
                                  display: 'block',
                                  marginBottom: 'var(--token-key-margin-bottom, 0.125rem)',
                                }}
                              >
                                {tokenNameWithHyphens}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <TokenPreviewItem
                                  tokenKeys={[key]}
                                  tokenName={tokenNameWithHyphens}
                                  tokenValue={currentValue}
                                  codeStyle={codeStyle}
                                  onInteractiveTokenChange={onInteractiveTokenChange}
                                  referencedBy={referencedByMap[tokenNameWithHyphens]}
                                  referencesTo={referencesToMap[tokenNameWithHyphens]}
                                />
                                <input
                                  type="text"
                                  value={currentValue}
                                  onChange={(e) => onInteractiveTokenChange(tokenNameWithHyphens, e.target.value)}
                                  className="ml-2 p-1 text-xs border rounded bg-[var(--input-bg,var(--surface-muted))] text-[var(--input-fg,var(--foreground))] border-[var(--input-border,var(--border))] focus:ring-1 focus:ring-[var(--ring)] w-full min-w-0"
                                  style={{ flexGrow: 1 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent> {/* Closed CardContent */}
          </Card> // Closed Card
        );
      })}
    </div>
  );
}

interface InteractiveTokenConfig {
  tokenName: string; // e.g., "--brand-orange-primary"
  label: string;   // e.g., "Nextgen Orange Primary"
  type: 'color' | 'slider-rem' | 'slider-px' | 'slider-unitless'; // slider-px for things like border-width if needed
  min?: number;
  max?: number;
  step?: number;
  defaultValue: string; // The default/initial value from baseCssVars
}

interface HeroSectionProps {
  brand: BrandDefinition;
  heroShowOverlay?: boolean;
  interactiveTokensConfig: InteractiveTokenConfig[];
  interactiveTokenValues: Record<string, string>; // Current values of all interactive tokens
  onInteractiveTokenChange: (tokenName: string, newValue: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  brand,
  heroShowOverlay,
  interactiveTokensConfig,
  interactiveTokenValues,
  onInteractiveTokenChange,
}) => {
  // console.log("HeroSection props: interactiveFontSizeBase =", interactiveFontSizeBase);
  // console.log("HeroSection local: fontSizeBase =", fontSizeBase);

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

      {/* Interactive Token Controls - Dynamically Rendered */}
      <div className="mt-8 p-6 bg-[var(--surface-card)] rounded-lg shadow-[var(--shadow-lg)] border border-[var(--border-color-default)] relative z-20 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-6 text-center text-[var(--text-primary)]">Live Token Playground</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {interactiveTokensConfig.map((config) => {
            const currentValue = interactiveTokenValues[config.tokenName] || config.defaultValue;

            if (config.type === 'color') {
              return (
                <div key={config.tokenName} className="space-y-2  rounded-lg bg-[var(--surface-card)] text-left">
                  <Label htmlFor={`interactive-${config.tokenName}`} className="text-xs font-semibold text-[var(--text-primary)]">
                    {config.label} (`{config.tokenName}`)
                  </Label>
                  {/* Simplified wrapper: removed bg, border, shadow from here */}
                  <div className="flex items-center gap-3 pt-1">
                    <ColorPicker
                      value={currentValue}
                      onChange={(newColor) => onInteractiveTokenChange(config.tokenName, newColor)}
                    // className applied to the Button trigger inside ColorPicker
                    // We can pass additional specific classes if needed,
                    // but the base styling is already good from ColorPicker.tsx
                    />
                  </div>
                </div>
              );
            } else if (config.type === 'slider-rem' || config.type === 'slider-px' || config.type === 'slider-unitless') {
              const unit = config.type === 'slider-rem' ? 'rem' : config.type === 'slider-px' ? 'px' : '';
              const numericValue = parseFloat(currentValue.replace(unit, ''));

              return (
                <div key={config.tokenName} className="space-y-2 text-left  rounded-lg bg-[var(--surface-card)] ">
                  <Label htmlFor={`interactive-${config.tokenName}`} className="text-xs font-semibold text-[var(--text-primary)]">
                    {config.label} (`{config.tokenName}`)
                  </Label>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="range"
                      id={`interactive-${config.tokenName}`}
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      value={numericValue}
                      onChange={(e) => onInteractiveTokenChange(config.tokenName, parseFloat(e.target.value).toFixed(config.step && String(config.step).includes('.') ? String(config.step).split('.')[1].length : 2) + unit)}
                      className="w-full h-2 bg-[var(--border-color-strong)] rounded-lg appearance-none cursor-pointer
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand-main)] [&::-webkit-slider-thumb]:cursor-pointer
                                   [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--brand-main)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
                    />
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(e) => {
                        let val = e.target.value;
                        // Attempt to parse and re-format to ensure consistency, especially with unit
                        const parsed = parseFloat(val);
                        if (!isNaN(parsed)) {
                          val = parsed.toFixed(config.step && String(config.step).includes('.') ? String(config.step).split('.')[1].length : 2) + unit;
                        }
                        onInteractiveTokenChange(config.tokenName, val);
                      }}
                      className="w-24 h-10 px-3 py-2 bg-[var(--input-bg,var(--surface-input))] text-[var(--input-fg,var(--foreground))] text-xs rounded-md border border-[var(--input-border,var(--border-color-default))] font-mono text-right tabular-nums placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--input-bg,var(--surface-input))] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
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
                    style={{ backgroundColor: 'var(--brand-main)' }} // Use CSS var
                  >
                    <div
                      className="text-xs font-mono p-1 inline-flex items-center bg-[var(--overview-card-color-label-bg,rgba(0,0,0,0.5))] text-[var(--overview-card-color-label-text,white)] [border-bottom-right-radius:var(--overview-card-color-radius,var(--radius-md))] [border-top-left-radius:var(--overview-card-color-radius,var(--radius-md))]"
                    >
                      {brand.brand.main.hex} {/* Keep displaying the raw hex */}
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
                    style={{ backgroundColor: 'var(--brand-secondary)' }} // Use CSS var
                  >
                    <div
                      className="text-xs font-mono p-1 inline-flex items-center bg-[var(--overview-card-color-label-bg,rgba(0,0,0,0.5))] text-[var(--overview-card-color-label-text,white)] [border-bottom-right-radius:var(--overview-card-color-radius,var(--radius-md))] [border-top-left-radius:var(--overview-card-color-radius,var(--radius-md))]"
                    >
                      {brand.brand.secondary.hex} {/* Keep displaying the raw hex */}
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
                    <p className="text-2xl mb-1 truncate text-[var(--brand-main)]" style={{ fontFamily: 'var(--font-family-display)' }}> {/* Use CSS var for font and color */}
                      {brand.name} Display
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {brand.typography?.fontDisplay || "System Default"} {/* Informational text */}
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
                      <p className="text-sm mb-1" style={{ fontFamily: 'var(--font-family-sans)' }}> {/* Use CSS var */}
                        The quick brown fox jumps over the lazy dog.
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {brand.typography?.fontSans || "System Default"} {/* Informational text */}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mono</h4>
                    <div className="p-3 bg-surface-card/50 border h-full border-[var(--border-color-subtle)] [border-radius:var(--radius-md)]">
                      <code className="text-sm mb-1 block" style={{ fontFamily: 'var(--font-family-mono)' }}> {/* Use CSS var */}
                        const brand = '{brand.name}';
                      </code>
                      <p className="text-xs text-muted-foreground truncate">
                        {brand.typography?.fontMono || "System Default"} {/* Informational text */}
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

const Preview = ({
  vars,
  brand,
  // Replace old props with new config prop for HeroSection
  interactiveTokensConfig, // New prop
  interactiveTokenValues,
  onInteractiveTokenChange,
}: {
  vars: Record<string, string>;
  brand: BrandDefinition;
  interactiveTokensConfig: InteractiveTokenConfig[]; // New prop type
  interactiveTokenValues: Record<string, string>;
  onInteractiveTokenChange: (tokenName: string, newValue: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const navShowOverlay = brand.componentStyles?.nav?.showOverlay;
  const heroShowOverlay = brand.componentStyles?.hero?.showOverlay;
  const overviewCardShowOverlay = brand.componentStyles?.overviewCard?.showOverlay;
  const brandPickerShowOverlay = brand.componentStyles?.brandPickerContainer?.showOverlay;

  const surfaceBgColor = vars['--surface-bg']?.toLowerCase();
  const isLightBackground = surfaceBgColor === '#ffffff' || surfaceBgColor === 'white';
  // Use CSS variable for dynamic text color, falling back to a sensible default if the var isn't defined.
  const dynamicNavTextColor = isLightBackground ? "var(--nav-text-color-light, var(--text-primary))" : "var(--nav-text-color-dark, var(--text-primary))";




  return (
    <div className="flex container flex-col w-full">
      <UseClientConfigs navigationTextColor={dynamicNavTextColor} />
      {/* Nav */}
      <NavSection brand={brand} navShowOverlay={navShowOverlay} />

      {/* Hero */}
      <HeroSection
        brand={brand}
        heroShowOverlay={heroShowOverlay}
        // Pass the new config and generic handlers
        interactiveTokensConfig={interactiveTokensConfig} // Pass down
        interactiveTokenValues={interactiveTokenValues}
        onInteractiveTokenChange={onInteractiveTokenChange}
      />

      {/* Overview */}
      <OverviewSection brand={brand} overviewCardShowOverlay={overviewCardShowOverlay} />

      {/* Token Showcase */}
      <div className="mt-12">
        <TokenShowcase
          vars={vars} // Pass the computed designTokens 
          interactiveTokenValues={interactiveTokenValues}
          onInteractiveTokenChange={onInteractiveTokenChange}
        />
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

  const baseCssVars = useMemo(() => {
    if (typeof makeCssVars === 'function') {
      return makeCssVars(brand);
    }
    return {};
  }, [brand]);

  // Centralized state for all interactive token overrides
  const [interactiveTokenValues, setInteractiveTokenValues] = useState<Record<string, string>>({});

  // Handler to update a specific interactive token
  const handleInteractiveTokenChange = (tokenName: string, newValue: string) => {
    setInteractiveTokenValues(prev => ({ ...prev, [tokenName]: newValue }));
  };

  // Determine the configuration for interactive tokens
  const interactiveTokensConfig = useMemo((): InteractiveTokenConfig[] => {
    const config: InteractiveTokenConfig[] = [];
    if (!brand || !baseCssVars) return config;

    // 1. Primary Brand Colors
    brand.brandColors?.forEach(bc => {
      const tokenName = `--${bc.variableName}`;
      config.push({
        tokenName: tokenName,
        label: bc.name, // e.g., "Nextgen Orange"
        type: 'color',
        defaultValue: baseCssVars[tokenName] || bc.color, // Fallback to definition color
      });
    });

    // 2. --brand-on
    if (baseCssVars['--brand-on']) {
      config.push({
        tokenName: '--brand-on',
        label: 'Brand "On" Color',
        type: 'color',
        defaultValue: baseCssVars['--brand-on'],
      });
    }

    // 3. --font-size-base
    if (baseCssVars['--font-size-base']) {
      config.push({
        tokenName: '--font-size-base',
        label: 'Base Font Size',
        type: 'slider-rem',
        min: 0.75,
        max: 1.5,
        step: 0.01,
        defaultValue: baseCssVars['--font-size-base'],
      });
    }

    // 4. --radius
    if (baseCssVars['--radius']) {
      config.push({
        tokenName: '--radius',
        label: 'Base Radius',
        type: 'slider-rem',
        min: 0,
        max: 2,
        step: 0.05,
        defaultValue: baseCssVars['--radius'],
      });
    }

    // 5. --spacing-unit
    if (baseCssVars['--spacing-unit']) {
      config.push({
        tokenName: '--spacing-unit',
        label: 'Base Spacing Unit',
        type: 'slider-rem',
        min: 0.1,
        max: 1,
        step: 0.05,
        defaultValue: baseCssVars['--spacing-unit'],
      });
    }

    // 6. Semantic Colors (only if direct hex, not var())
    const semanticTokenNames: { name: string; label: string }[] = [
      { name: '--semantic-success', label: 'Success Color' },
      { name: '--semantic-destructive', label: 'Destructive Color' },
      { name: '--semantic-warning', label: 'Warning Color' },
      { name: '--semantic-info', label: 'Info Color' },
    ];

    semanticTokenNames.forEach(sem => {
      const baseValue = baseCssVars[sem.name];
      if (baseValue && !baseValue.startsWith('var(')) { // Only include if it's a direct value
        config.push({
          tokenName: sem.name,
          label: sem.label,
          type: 'color',
          defaultValue: baseValue,
        });
      }
    });

    // Sort order (example, can be refined)
    const sortOrder: Record<string, number> = { /* ... define sort order if needed ... */ };
    // For now, the order of addition above will dictate the order.
    // To implement the influence order, we'd sort `config` here.
    // Example:
    // config.sort((a, b) => (sortOrder[a.tokenName] || 99) - (sortOrder[b.tokenName] || 99));

    // Reorder: colors first, then sliders
    const colorConfigs = config.filter(c => c.type === 'color');
    const sliderConfigs = config.filter(c => c.type !== 'color');

    return [...colorConfigs, ...sliderConfigs];
  }, [brand, baseCssVars]);


  // Initialize/reset interactiveTokenValues when brand or baseCssVars change
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    interactiveTokensConfig.forEach(conf => {
      initialValues[conf.tokenName] = conf.defaultValue;
    });
    // Preserve any existing user edits for tokens that still exist in the new config
    const persistedValues: Record<string, string> = {};
    interactiveTokensConfig.forEach(conf => {
      if (interactiveTokenValues[conf.tokenName] !== undefined) {
        // Check if the previous value is substantially different from new default
        // This is tricky because types might change (e.g. slider to color if config changes)
        // For now, let's naively persist if the token name is the same.
        persistedValues[conf.tokenName] = interactiveTokenValues[conf.tokenName];
      }
    });

    setInteractiveTokenValues({ ...initialValues, ...persistedValues });

  }, [interactiveTokensConfig]); // Depend on the generated config


  // Consolidate all design tokens (base + interactive overrides + aliases)
  const designTokens = useMemo(() => {
    // Start with baseCssVars, then overlay interactiveTokenValues
    const mergedTokens: Record<string, string> = {
      ...baseCssVars,
      ...interactiveTokenValues
    };

    // If any interactiveTokenValue is a primary brand color that has changed,
    // we need to recalculate its L, C, H components and add/update those vars too.
    interactiveTokensConfig.forEach(config => {
      if (config.type === 'color' && config.tokenName.endsWith('-primary')) { // Heuristic: primary brand colors end with -primary
        const currentHexValue = interactiveTokenValues[config.tokenName];
        const baseHexValue = baseCssVars[config.tokenName];

        // Check if the value has actually changed from its base or has an interactive value
        if (currentHexValue && currentHexValue !== baseHexValue) {
          const rgb = parseColorStringFromBrands(currentHexValue); // Use imported and aliased function
          if (rgb) {
            const oklch = srgbToOklch(rgb.r, rgb.g, rgb.b); // Use imported function
            mergedTokens[`${config.tokenName}-oklch-l`] = oklch.l.toFixed(5);
            mergedTokens[`${config.tokenName}-oklch-c`] = oklch.c.toFixed(5);
            mergedTokens[`${config.tokenName}-oklch-h`] = oklch.h.toFixed(2);
          } else {
            // If hex is invalid, clear or revert LCH vars to ensure no stale values
            delete mergedTokens[`${config.tokenName}-oklch-l`];
            delete mergedTokens[`${config.tokenName}-oklch-c`];
            delete mergedTokens[`${config.tokenName}-oklch-h`];
          }
        } else if (!currentHexValue && baseHexValue) {
          // If interactive value was cleared, ensure LCH from base are used/re-set
          // This happens if baseCssVars already includes these from makeCssVars initial run
          const rgbBase = parseColorStringFromBrands(baseHexValue); // Use imported and aliased function
          if (rgbBase) {
            const oklchBase = srgbToOklch(rgbBase.r, rgbBase.g, rgbBase.b); // Use imported function
            mergedTokens[`${config.tokenName}-oklch-l`] = oklchBase.l.toFixed(5);
            mergedTokens[`${config.tokenName}-oklch-c`] = oklchBase.c.toFixed(5);
            mergedTokens[`${config.tokenName}-oklch-h`] = oklchBase.h.toFixed(2);
          }
        }
      }
    });

    // Critical fallbacks (only apply if a token is still undefined after base and interactive)
    const criticalFallbacks: Record<string, string> = {
      '--surface-bg': '#121212',
      '--surface-card': '#1E1E1E',
      '--surface-popover': '#242424',
      '--surface-on': '#FFFFFF',
      '--surface-muted': '#333333',
      '--surface-muted-fg': '#AAAAAA',
      '--text-primary': 'var(--surface-on)',
      '--text-secondary': 'var(--surface-muted-fg)',
      '--text-muted': '#777777',
      '--border-color-default': '#444444',
      '--shadow-md': '0 2px 6px rgba(0,0,0,0.06)',
      '--font-family-sans': 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    };

    for (const key in criticalFallbacks) {
      if (mergedTokens[key] === undefined) { // Corrected: mergedTokens
        mergedTokens[key] = criticalFallbacks[key]; // Corrected: mergedTokens
      }
    }

    // Standard Aliases (ShadCN like names) - These MUST pull from the mergedTokens
    mergedTokens['--background'] = mergedTokens['--surface-bg'];
    mergedTokens['--foreground'] = mergedTokens['--surface-on'];
    mergedTokens['--card'] = mergedTokens['--surface-card'];
    mergedTokens['--card-foreground'] = mergedTokens['--surface-on'];
    mergedTokens['--popover'] = mergedTokens['--surface-popover'];
    mergedTokens['--popover-foreground'] = mergedTokens['--surface-on'];
    mergedTokens['--muted'] = mergedTokens['--surface-muted'];
    mergedTokens['--muted-foreground'] = mergedTokens['--surface-muted-fg'];

    mergedTokens['--primary'] = mergedTokens['--brand-main'];
    mergedTokens['--primary-foreground'] = mergedTokens['--brand-on'];
    mergedTokens['--secondary'] = mergedTokens['--brand-secondary'];
    mergedTokens['--secondary-foreground'] = mergedTokens['--brand-on'];
    mergedTokens['--accent'] = mergedTokens['--brand-main'];
    mergedTokens['--accent-foreground'] = mergedTokens['--brand-on'];
    mergedTokens['--ring'] = mergedTokens['--brand-main'];

    mergedTokens['--success'] = mergedTokens['--semantic-success'];
    mergedTokens['--success-foreground'] = mergedTokens['--brand-on'];
    mergedTokens['--destructive'] = mergedTokens['--semantic-destructive'];
    mergedTokens['--destructive-foreground'] = mergedTokens['--brand-on'];
    mergedTokens['--warning'] = mergedTokens['--semantic-warning'];
    mergedTokens['--warning-foreground'] = mergedTokens['--brand-on'];
    mergedTokens['--info'] = mergedTokens['--semantic-info'];
    mergedTokens['--info-foreground'] = mergedTokens['--brand-on'];

    mergedTokens['--border'] = mergedTokens['--border-color-default'];
    mergedTokens['--input'] = mergedTokens['--border-color-default'];

    const finalTokens: Record<string, string> = {};
    for (const [key, value] of Object.entries(mergedTokens)) { // Corrected: mergedTokens
      if (value !== undefined) {
        finalTokens[key] = String(value);
      }
    }
    return finalTokens;
  }, [
    baseCssVars,
    interactiveTokenValues, // Now depends on the whole object
    interactiveTokensConfig, // Added baseCssVars as a dependency because we compare against it for LCH updates
  ]);

  useEffect(() => {
    const root = document.documentElement;
    const previousStyles: { [key: string]: string | null } = {};

    // Apply new styles and store previous values
    Object.entries(designTokens).forEach(([key, value]) => {
      previousStyles[key] = root.style.getPropertyValue(key);
      root.style.setProperty(key, String(value)); // Ensure value is string
    });

    // Cleanup function to revert to previous styles or remove added ones
    return () => {
      // Iterate over the keys that were actually set or modified by *this* effect run
      Object.keys(previousStyles).forEach((key) => {
        const previousValue = previousStyles[key];
        if (previousValue !== null && previousValue !== "" && previousValue !== undefined) {
          root.style.setProperty(key, previousValue); // Restore previous value
        } else {
          // If there was no previous value (or it was empty string), it means this effect added it
          root.style.removeProperty(key); // So, remove it on cleanup
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
          <p className="text-xs  text-[var(--brand-orange-primary)]">{brand.description}</p>
        </Card>
      </div>


      <Preview
        vars={designTokens}
        brand={brand}
        // Pass the new config and generic handlers
        interactiveTokensConfig={interactiveTokensConfig} // Pass down
        interactiveTokenValues={interactiveTokenValues}
        onInteractiveTokenChange={handleInteractiveTokenChange}
      />
    </div>
  );
}
