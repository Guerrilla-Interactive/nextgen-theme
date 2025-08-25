"use client";

import React, { createContext, useContext, useReducer, ReactNode, useCallback, useMemo, useEffect, useRef, useState } from "react";

import nextgenBrand from "./brandguide"; // nextgenBrand is the default export
import {
  type OklchString,
  type ThemeCssVars,
  type Role,
  type Brand,
  type ColorToken,
  type FontToken,
  type LightnessStepKey,
  generateGlobalCss,
  type ThemeAnimationConfig,
  generateAnimationCss,
  influenceHierarchy
} from "./brand-utils";
import { converter, parseHex } from 'culori';
import { animationPresets } from './animation-presets';

// Enriched types (as you had)
export interface EnrichedShade {
  variableName: string;
  value: string;
  resolvedValue: string;
  isAlias: boolean;
  aliasTarget?: string;
  sourceTokenName?: string;
  sourceShadeKey?: string;
  calculatedLightness: number;
  mappedThemeVars?: string[];
}

export interface EnrichedColorToken extends ColorToken {
  shades: Partial<Record<string, EnrichedShade>>;
  referrers?: Array<{ tokenName: string; shadeKey: string; referringToWhat: 'main' | string }>;
  sortedDisplayShades?: EnrichedShade[];
  tokenLevelMappedThemeVars?: string[];
}

export interface EnrichedBrand extends Omit<Brand, 'colors'> {
  colors: EnrichedColorToken[];
}

/* -------------------- Contexts -------------------- */

interface BrandContextType {
  brand: Brand | null;
  committedBrand: Brand | null;
  processedBrand: EnrichedBrand | null;
  activeThemeKey: string;
  availableThemes: Record<string, Brand>;
  setActiveTheme: (themeKey: string) => void;
  previewColorUpdate: (colorName: string, newOklchValue: string) => void;
  commitColorUpdate: (colorName: string, newOklchValue: string) => void;
  updateColorName: (oldName: string, newName: string) => void;
  addNewColor: (name: string, hexColor: string, roles?: Role[], onColorAdded?: (colorName: string) => void) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoStepsAvailable: number;
  redoStepsAvailable: number;
  updateRoleAssignment: (roleToUpdate: Role, targetColorVariableName: string | null) => void;
  handleRoleSwatchSelection: (role: Role, swatchName: string) => void;
  handleRoleDirectColorChange: (role: Role, newHex: string) => void;
  previewRoleDirectColorChange: (role: Role, newHex: string) => void;
  updateFontRoleAssignment: (roleToUpdate: string, targetFontName: string | null) => void;
  handleFontRoleSwatchSelection: (role: string, fontSwatchName: string) => void;
  handleFontRoleDirectChange: (role: string, fontFamily: string) => void;
  addNewFont: (name: string, fontFamily: string, distributor: string, roles?: string[], onFontAdded?: (fontName: string) => void) => void;
  updateFontWeightAssignment: (fontName: string, role: string, weightName: string) => void;
  getFontWeightForRole: (fontName: string, role: string) => string | null;
  updateFontSizeAssignment: (fontName: string, role: string, sizeValue: number) => void;
  getFontSizeForRole: (fontName: string, role: string) => number | null;
  updateAnimationConfig: (presetName: string) => void;
  updateLineHeightForRole: (role: string, lineHeight: number) => void;
  updateLetterSpacingForRole: (role: string, letterSpacingEm: number) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

interface BrandProviderProps {
  children: ReactNode;
  initialThemes: Record<string, Brand>;
  initialThemeKey: string;
}

export const BrandProvider = ({ children, initialThemes, initialThemeKey }: BrandProviderProps) => {
  const [activeThemeKey, _internalSetActiveThemeKey] = useState<string>(initialThemeKey);
  const [history, setHistory] = useState<Brand[]>([initialThemes[initialThemeKey]]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
  const [liveBrand, setLiveBrand] = useState<Brand>(initialThemes[initialThemeKey]);
  const [processedBrand, setProcessedBrand] = useState<EnrichedBrand | null>(null);

  const isUpdatingCssRef = useRef(false);
  const cssUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCssSignatureRef = useRef<string>("");
  const themeConstructedSheetRef = useRef<CSSStyleSheet | null>(null);
  const cssCacheRef = useRef<Map<string, string>>(new Map());
  const processedBrandCacheRef = useRef<Map<string, EnrichedBrand>>(new Map());

  const currentThemeData = initialThemes[activeThemeKey] || nextgenBrand;

  const committedBrand = history[currentHistoryIndex] || null;
  const brandToDisplay = liveBrand || committedBrand || currentThemeData;
  const supportsAdopted = typeof window !== 'undefined' && 'adoptedStyleSheets' in Document.prototype;

  const computeBrandSignature = useCallback((brand: Brand): string => {
    try {
      const fontsSig = (brand.fonts || []).map(f => ({ n: f.name, fam: f.family, r: f.roles, w: Object.keys(f.weights || {}) })).sort((a,b)=>a.n.localeCompare(b.n));
      const colorsSig = (brand.colors || []).map(c => ({ v: c.variableName, o: c.oklch })).sort((a,b)=>a.v.localeCompare(b.v));
      return JSON.stringify({ t: brand.themeCssVariables, f: fontsSig, c: colorsSig });
    } catch {
      return String(Date.now());
    }
  }, []);

  /* -------------------- Theme switching -------------------- */

  const handleSetActiveTheme = useCallback((newThemeKey: string) => {
    if (initialThemes[newThemeKey]) {
      _internalSetActiveThemeKey(newThemeKey);
      const newThemeBrand = initialThemes[newThemeKey];
      setLiveBrand(newThemeBrand);
      setHistory([newThemeBrand]);
      setCurrentHistoryIndex(0);
    } else {
      console.warn(`Theme key "${newThemeKey}" not found in initialThemes.`);
    }
  }, [initialThemes]);

  /* -------------------- Color editing -------------------- */

  const applyPreviewOrCommit = (
    colorNameToUpdate: string,
    newOklchValue: string,
    brandStateToUpdate: Brand
  ): Brand => {
    const updatedColors = brandStateToUpdate.colors.map(color =>
      color.name === colorNameToUpdate ? { ...color, oklch: newOklchValue as OklchString } : color
    );
    return { ...brandStateToUpdate, colors: updatedColors };
  };

  const previewColorUpdate = useCallback((colorNameToUpdate: string, newOklchValue: string) => {
    setLiveBrand(currentLiveBrand =>
      applyPreviewOrCommit(colorNameToUpdate, newOklchValue, currentLiveBrand || currentThemeData)
    );
  }, [currentThemeData]);

  const commitColorUpdate = useCallback((colorNameToUpdate: string, newOklchValue: string) => {
    const brandToCommitFrom = liveBrand || history[currentHistoryIndex] || currentThemeData;
    const newBrandState = applyPreviewOrCommit(colorNameToUpdate, newOklchValue, brandToCommitFrom);

    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), newBrandState]);
    setCurrentHistoryIndex(idx => idx + 1);
    setLiveBrand(newBrandState);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const updateColorName = useCallback((oldName: string, newName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    if (brandToUpdate.colors.find(color => color.name === newName)) {
      console.warn(`[updateColorName] Color "${newName}" already exists`);
      return;
    }
    const updatedColors = brandToUpdate.colors.map(color =>
      color.name === oldName ? { ...color, name: newName.trim(), description: `Custom color: ${newName.trim()}`, rawTokenSpecificName: newName.trim() } : color
    );
    const newBrandState: Brand = { ...brandToUpdate, colors: updatedColors };
    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), newBrandState]);
    setCurrentHistoryIndex(idx => idx + 1);
    setLiveBrand(newBrandState);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const undo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(history[newIndex]);
    }
  }, [history, currentHistoryIndex]);

  const redo = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setLiveBrand(history[newIndex]);
    }
  }, [history, currentHistoryIndex]);

  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;
  const undoStepsAvailable = currentHistoryIndex;
  const redoStepsAvailable = history.length - 1 - currentHistoryIndex;

  /* -------------------- Theme var regeneration (roles → vars) -------------------- */

  const regenerateThemeCssVariables = useCallback((brandState: Brand): Brand => {
    const newThemeCssVariables: ThemeCssVars = { ...brandState.themeCssVariables };
    const getColorVariableForRole = (role: Role): string | undefined => {
      const assignedColor = brandState.colors.find(color => color.roles?.includes(role));
      if (assignedColor) return `var(--${assignedColor.variableName})`;
      return undefined;
    };
    (Object.keys(newThemeCssVariables) as (keyof ThemeCssVars)[]).forEach(roleKey => {
      const role = roleKey as Role;
      if (influenceHierarchy[role] !== undefined) {
        const colorVariable = getColorVariableForRole(role);
        if (colorVariable) (newThemeCssVariables as any)[roleKey] = colorVariable;
      }
    });
    return { ...brandState, themeCssVariables: newThemeCssVariables };
  }, []);

  const updateRoleAssignment = useCallback((roleToUpdate: Role, targetColorVariableName: string | null) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    const targetColor = targetColorVariableName
      ? brandToUpdate.colors.find(c => c.variableName === targetColorVariableName)
      : null;
    const currentRoleOwner = brandToUpdate.colors.find(c => c.roles?.includes(roleToUpdate));

    if (targetColor && currentRoleOwner !== targetColor) {
      const updatedColors = brandToUpdate.colors.map(color => {
        if (color === currentRoleOwner) {
          return { ...color, roles: (color.roles || []).filter(r => r !== roleToUpdate) };
        }
        if (color === targetColor) {
          const currentRoles = color.roles || [];
          return currentRoles.includes(roleToUpdate) ? color : { ...color, roles: [...currentRoles, roleToUpdate] };
        }
        return color;
      });
      const newBrandState = regenerateThemeCssVariables({ ...brandToUpdate, colors: updatedColors });
      setLiveBrand(newBrandState);
      // atomic CSS update
      if (typeof window !== "undefined") {
        isUpdatingCssRef.current = true;
        requestAnimationFrame(() => {
          const css = generateGlobalCss(newBrandState);
          const existing = document.querySelector('style[data-brand-theme="true"]');
          if (existing) {
            const temp = document.createElement('style');
            temp.setAttribute('data-brand-theme-temp', 'true');
            temp.textContent = css;
            existing.parentNode?.insertBefore(temp, existing.nextSibling);
            Promise.resolve().then(() => {
              existing.remove();
              temp.removeAttribute('data-brand-theme-temp');
              temp.setAttribute('data-brand-theme', 'true');
              setTimeout(() => { isUpdatingCssRef.current = false; }, 50);
            });
          } else {
            const el = document.createElement('style');
            el.setAttribute('data-brand-theme', 'true');
            el.textContent = css;
            document.head.appendChild(el);
            setTimeout(() => { isUpdatingCssRef.current = false; }, 50);
          }
        });
      }
    } else if (!targetColor && currentRoleOwner) {
      const updatedColors = brandToUpdate.colors.map(color =>
        color === currentRoleOwner ? { ...color, roles: (color.roles || []).filter(r => r !== roleToUpdate) } : color
      );
      const newBrandState = regenerateThemeCssVariables({ ...brandToUpdate, colors: updatedColors });
      setLiveBrand(newBrandState);
      if (typeof window !== "undefined") {
        isUpdatingCssRef.current = true;
        requestAnimationFrame(() => {
          const css = generateGlobalCss(newBrandState);
          const existing = document.querySelector('style[data-brand-theme="true"]');
          if (existing) {
            const temp = document.createElement('style');
            temp.setAttribute('data-brand-theme-temp', 'true');
            temp.textContent = css;
            existing.parentNode?.insertBefore(temp, existing.nextSibling);
            Promise.resolve().then(() => {
              existing.remove();
              temp.removeAttribute('data-brand-theme-temp');
              temp.setAttribute('data-brand-theme', 'true');
              setTimeout(() => { isUpdatingCssRef.current = false; }, 50);
            });
          } else {
            const el = document.createElement('style');
            el.setAttribute('data-brand-theme', 'true');
            el.textContent = css;
            document.head.appendChild(el);
            setTimeout(() => { isUpdatingCssRef.current = false; }, 50);
          }
        });
      }
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, regenerateThemeCssVariables]);

  /* Convenience wrappers */
  const handleRoleSwatchSelection = useCallback((role: Role, swatchName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    let target = brandToUpdate.colors.find(c => c.name === swatchName) || brandToUpdate.colors.find(c => c.variableName === swatchName);
    if (target) updateRoleAssignment(role, target.variableName);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, updateRoleAssignment]);

  const handleRoleDirectColorChange = useCallback((role: Role, newHex: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    const current = brandToUpdate.colors.find(c => c.roles?.includes(role));
    if (!current) return;

    const oklchConverter = converter('oklch');
    const colorObj = parseHex(newHex);
    if (!colorObj) return;
    const converted = oklchConverter(colorObj);
    if (!converted) return;
    let { l = 0, c = 0, h = 0 } = converted;
    h = isNaN(h) ? 0 : h;
    const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;

    // If the token is shared across roles, create a new token; otherwise just update
    const hasMultipleRoles = current.roles && current.roles.length > 1;
    if (hasMultipleRoles) {
      const baseName = `${role.charAt(0).toUpperCase() + role.slice(1)} Custom`;
      let finalName = baseName, nameCounter = 1;
      while (brandToUpdate.colors.find(c => c.name === finalName)) finalName = `${baseName} ${nameCounter++}`;
      const baseVar = `${role}-custom`;
      let finalVar = baseVar, varCounter = 1;
      while (brandToUpdate.colors.find(c => c.variableName === finalVar)) finalVar = `${baseVar}-${varCounter++}`;

      const newColor: ColorToken = {
        name: finalName,
        variableName: finalVar,
        description: `Custom color for ${role} role`,
        oklch: oklchString,
        rawTokenSpecificName: finalName,
        roles: [role],
        themeSteps: {},
        category: 'color',
      };
      const updated = brandToUpdate.colors.map(c => c === current ? { ...c, roles: c.roles.filter(r => r !== role) } : c);
      updated.push(newColor);
      const newBrandState: Brand = { ...brandToUpdate, colors: updated };
      setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), newBrandState]);
      setCurrentHistoryIndex(idx => idx + 1);
      setLiveBrand(newBrandState);

      if (typeof window !== "undefined") {
        isUpdatingCssRef.current = true;
        requestAnimationFrame(() => {
          const css = generateGlobalCss(newBrandState);
          const existing = document.querySelector('style[data-brand-theme]');
          let el = existing as HTMLStyleElement;
          if (!el) {
            el = document.createElement('style');
            el.setAttribute('data-brand-theme', 'true');
            document.head.appendChild(el);
          }
          const temp = document.createElement('style');
          temp.setAttribute('data-brand-theme-temp', 'true');
          temp.textContent = css;
          el.parentNode?.insertBefore(temp, el.nextSibling);
          Promise.resolve().then(() => {
            el.remove();
            temp.removeAttribute('data-brand-theme-temp');
            temp.setAttribute('data-brand-theme', 'true');
            // force immediate var for the new token
            document.documentElement.style.setProperty(`--${finalVar}`, oklchString);
            document.documentElement.style.setProperty(`--${role}`, `var(--${finalVar})`);
            document.documentElement.offsetHeight;
            setTimeout(() => { isUpdatingCssRef.current = false; }, 50);
          });
        });
      }
    } else {
      // direct update
      commitColorUpdate(current.name, oklchString);
      if (typeof window !== "undefined") {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty(`--${current.variableName}`, oklchString);
        rootStyle.setProperty(`--${role}`, `var(--${current.variableName})`);
      }
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, commitColorUpdate]);

  const previewRoleDirectColorChange = useCallback((role: Role, newHex: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    const current = brandToUpdate.colors.find(c => c.roles?.includes(role));
    if (!current) return;

    const oklchConverter = converter('oklch');
    const colorObj = parseHex(newHex);
    if (!colorObj) return;
    const converted = oklchConverter(colorObj);
    if (!converted) return;
    let { l = 0, c = 0, h = 0 } = converted;
    h = isNaN(h) ? 0 : h;
    const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;

    previewColorUpdate(current.name, oklchString);
    if (typeof window !== "undefined") {
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty(`--${current.variableName}`, oklchString);
      rootStyle.setProperty(`--${role}`, `var(--${current.variableName})`);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, previewColorUpdate]);

  /* -------------------- Font role assignment / weights / sizes -------------------- */

  const updateFontRoleAssignment = useCallback((roleToUpdate: string, targetFontName: string | null) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    const currentRoleOwner = brandToUpdate.fonts.find(f => f.roles?.includes(roleToUpdate));
    const targetFont = targetFontName ? brandToUpdate.fonts.find(f => f.name === targetFontName) : null;

    if (targetFont && currentRoleOwner !== targetFont) {
      const updatedFonts = brandToUpdate.fonts.map(font => {
        if (font === currentRoleOwner) return { ...font, roles: (font.roles || []).filter(r => r !== roleToUpdate) };
        if (font === targetFont) {
          const r = font.roles || [];
          return r.includes(roleToUpdate) ? font : { ...font, roles: [...r, roleToUpdate] };
        }
        return font;
      });
      const newBrandState = { ...brandToUpdate, fonts: updatedFonts };
      setLiveBrand(newBrandState);

      if (typeof window !== 'undefined' && targetFont?.family) {
        const root = document.documentElement.style;
        root.setProperty(`--font-${roleToUpdate}`, targetFont.family);
        // keep --font-sans in sync for Tailwind base
        if (roleToUpdate === 'body' || roleToUpdate === 'sans') {
          root.setProperty('--font-body', targetFont.family);
          root.setProperty('--font-sans', 'var(--font-body)');
        }
      }
    } else if (!targetFont && currentRoleOwner) {
      const updatedFonts = brandToUpdate.fonts.map(font =>
        font === currentRoleOwner ? { ...font, roles: (font.roles || []).filter(r => r !== roleToUpdate) } : font
      );
      const newBrandState = { ...brandToUpdate, fonts: updatedFonts };
      setLiveBrand(newBrandState);

      if (typeof window !== 'undefined') {
        const root = document.documentElement.style;
        root.removeProperty(`--font-${roleToUpdate}`);
      }
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const handleFontRoleSwatchSelection = useCallback((role: string, fontSwatchName: string) => {
    updateFontRoleAssignment(role, fontSwatchName);
  }, [updateFontRoleAssignment]);

  const handleFontRoleDirectChange = useCallback((role: string, fontFamily: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    const existingFont = brandToUpdate.fonts.find(f => f.family === fontFamily);
    if (existingFont) updateFontRoleAssignment(role, existingFont.name);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, updateFontRoleAssignment]);

  const addNewFont = useCallback((name: string, fontFamily: string, distributor: string, roles: string[] = [], onFontAdded?: (fontName: string) => void) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    const newFont: FontToken = {
      name, distributor, description: `Custom font: ${name}`, family: fontFamily, roles,
      weights: { regular: 400, bold: 700 }, fontWeights: {}
    };
    const newBrandState = { ...brandToUpdate, fonts: [...brandToUpdate.fonts, newFont] };
    setLiveBrand(newBrandState);
    onFontAdded?.(name);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const updateFontWeightAssignment = useCallback((fontName: string, role: string, weightName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    const updatedFonts = brandToUpdate.fonts.map(font => {
      if (font.name !== fontName) return font;
      const newFontWeights = { ...(font.fontWeights || {}) };
      if (font.weights && Object.keys(font.weights).includes(weightName)) newFontWeights[role] = weightName;
      return { ...font, fontWeights: newFontWeights };
    });

    const newBrandState = { ...brandToUpdate, fonts: updatedFonts };
    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), newBrandState]);
    setCurrentHistoryIndex(idx => idx + 1);
    setLiveBrand(newBrandState);

    if (typeof window !== "undefined") {
      const targetFont = newBrandState.fonts.find(f => f.name === fontName);
      if (targetFont && targetFont.weights && targetFont.weights[weightName]) {
        document.documentElement.style.setProperty(`--font-weight-${role}`, String(targetFont.weights[weightName]));
      }
      try {
        window.dispatchEvent(new CustomEvent('brand-typography-updated', { detail: { kind: 'font-weight', role } }));
      } catch {}
      // No full CSS regeneration needed; variables drive typography
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const getFontWeightForRole = useCallback((fontName: string, role: string): string | null => {
    const brandToCheck = liveBrand || history[currentHistoryIndex] || currentThemeData;
    const font = brandToCheck?.fonts.find(f => f.name === fontName);
    return font?.fontWeights?.[role] || null;
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const updateFontSizeAssignment = useCallback((fontName: string, role: string, sizeValue: number) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;

    const updatedFonts = brandToUpdate.fonts.map(font =>
      font.name === fontName
        ? { ...font, fontSizes: { ...(font.fontSizes || {}), [role]: sizeValue } }
        : font
    );

    const newBrandState = { ...brandToUpdate, fonts: updatedFonts };
    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), newBrandState]);
    setCurrentHistoryIndex(idx => idx + 1);
    setLiveBrand(newBrandState);

    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(`--font-size-${role}`, `${sizeValue}rem`);
      try {
        window.dispatchEvent(new CustomEvent('brand-typography-updated', { detail: { kind: 'font-size', role } }));
      } catch {}
      // No full CSS regeneration; variables are sufficient
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  const getFontSizeForRole = useCallback((fontName: string, role: string): number | null => {
    const brandToCheck = liveBrand || history[currentHistoryIndex] || currentThemeData;
    const font = brandToCheck?.fonts.find(f => f.name === fontName);
    return font?.fontSizes?.[role] ?? null;
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  /* -------------------- Animation config -------------------- */

  const updateAnimationConfig = useCallback(async (presetName: string) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    try {
      const preset = await animationPresets[presetName as keyof typeof animationPresets]();
      const updatedBrand: Brand = {
        ...brandToUpdate,
        animationConfig: {
          preset,
          rootClassName: `${activeThemeKey}-${presetName}-theme`
        }
      };
      setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), updatedBrand]);
      setCurrentHistoryIndex(idx => idx + 1);
      setLiveBrand(updatedBrand);
    } catch (e) {
      console.error('Failed to update animation config:', e);
    }
  }, [liveBrand, history, currentHistoryIndex, currentThemeData, activeThemeKey]);

  /* -------------------- Add color -------------------- */

  const addNewColor = useCallback((name: string, hexColor: string, roles: Role[] = [], onColorAdded?: (colorName: string) => void) => {
    const brandToUpdate = liveBrand || history[currentHistoryIndex] || currentThemeData;
    if (!brandToUpdate) return;
    const oklchConverter = converter('oklch');
    const colorObj = parseHex(hexColor);
    if (!colorObj) return;
    const converted = oklchConverter(colorObj);
    if (!converted) return;
    let { l = 0, c = 0, h = 0 } = converted;
    h = isNaN(h) ? 0 : h;
    const oklchString = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})` as OklchString;

    let finalName = name, baseVar = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), finalVar = baseVar;
    let i = 1, j = 1;
    while (brandToUpdate.colors.find(c => c.name === finalName)) finalName = `${name} ${i++}`;
    while (brandToUpdate.colors.find(c => c.variableName === finalVar)) finalVar = `${baseVar}-${j++}`;

    const newToken: ColorToken = {
      name: finalName,
      variableName: finalVar,
      description: `Custom color: ${finalName}`,
      oklch: oklchString,
      rawTokenSpecificName: finalName,
      roles,
      themeSteps: {},
      category: 'color',
    };
    const newBrandState: Brand = { ...brandToUpdate, colors: [...brandToUpdate.colors, newToken] };
    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), newBrandState]);
    setCurrentHistoryIndex(idx => idx + 1);
    setLiveBrand(newBrandState);
    onColorAdded?.(finalName);
  }, [liveBrand, history, currentHistoryIndex, currentThemeData]);

  /* -------------------- Main CSS application effect -------------------- */

  const performMainCssUpdate = useCallback(() => {
    const brandForCSS = brandToDisplay;
    if (typeof window !== "undefined" && brandForCSS && brandForCSS.colors) {
      const applyCss = () => {
        const sig = computeBrandSignature(brandForCSS);
        if (sig === lastCssSignatureRef.current) return; // skip if unchanged
        let completeCss = cssCacheRef.current.get(sig);
        if (!completeCss) {
          completeCss = generateGlobalCss(brandForCSS);
          cssCacheRef.current.set(sig, completeCss);
        }
        const notifyApplied = () => {
          try {
            window.dispatchEvent(new CustomEvent('brand-css-applied', { detail: { key: activeThemeKey } }));
          } catch {}
        };
        if (supportsAdopted) {
          try {
            if (!themeConstructedSheetRef.current) {
              themeConstructedSheetRef.current = new CSSStyleSheet();
              (document as any).adoptedStyleSheets = [
                ...((document as any).adoptedStyleSheets || []),
                themeConstructedSheetRef.current,
              ];
            }
            themeConstructedSheetRef.current!.replaceSync(completeCss);
            lastCssSignatureRef.current = sig;
            notifyApplied();
            return;
          } catch {
            // fall through to style tag
          }
        }
        const existing = document.querySelector('style[data-brand-theme]');
        let el = existing as HTMLStyleElement;
        if (!el) {
          const first = document.createElement('style');
          first.setAttribute('data-brand-theme', 'true');
          first.setAttribute('type', 'text/css');
          first.textContent = completeCss;
          document.head.appendChild(first);
          lastCssSignatureRef.current = sig;
          notifyApplied();
        } else {
          const temp = document.createElement('style');
          temp.setAttribute('data-brand-theme-temp', 'true');
          temp.setAttribute('type', 'text/css');
          temp.textContent = completeCss;
          el.parentNode?.insertBefore(temp, el.nextSibling);
          Promise.resolve().then(() => {
            el.remove();
            temp.removeAttribute('data-brand-theme-temp');
            temp.setAttribute('data-brand-theme', 'true');
            lastCssSignatureRef.current = sig;
            notifyApplied();
          });
        }
      };

      // Generate/apply CSS off the critical path when possible
      const scheduleApply = () => requestAnimationFrame(applyCss);
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(scheduleApply, { timeout: 100 });
      } else {
        scheduleApply();
      }

      // Defer non-critical work until after CSS is applied and the frame is rendered
      const schedulePostWork = () => {
        const run = () => {
          const sig = computeBrandSignature(brandForCSS);
          const root = document.documentElement.style;
          const fonts = brandForCSS.fonts || [];
          const fontSans = fonts.find(f => f.roles.includes('sans'))?.family
                        || fonts.find(f => f.roles.includes('body'))?.family
                        || 'sans-serif';
          const fontMono = fonts.find(f => f.roles.includes('mono'))?.family || 'monospace';
          const fontBody = fonts.find(f => f.roles.includes('body'))?.family || fontSans;
          const fontDisplay = fonts.find(f => f.roles.includes('display'))?.family || fontSans;
          const fontButton = fonts.find(f => f.roles.includes('button'))?.family || fontBody;

          root.setProperty('--font-sans', 'var(--font-body)');
          root.setProperty('--font-body', fontBody);
          root.setProperty('--font-mono', fontMono);
          root.setProperty('--font-display', fontDisplay);
          root.setProperty('--font-button', fontButton);

          const headingFamily =
            fonts.find(f => f.roles.includes('heading'))?.family ||
            fonts.find(f => f.roles.some(r => ['display','h1','h2','h3','h4','h5','h6'].includes(r)))?.family ||
            fontDisplay || fontBody || fontSans;
          root.setProperty('--font-heading', headingFamily);

          const getFamilyForRole = (role: string): string => {
            const assigned = fonts.find(f => f.roles?.includes(role))?.family;
            if (assigned) return assigned;
            if (role.startsWith('h') || role === 'heading' || role === 'display') return headingFamily;
            if (role === 'button') return fontButton;
            if (role === 'code' || role === 'mono') return fontMono;
            return fontBody;
          };

          const rolesToSeed = [
            'h1','h2','h3','h4','h5','h6','heading',
            'p','body','default','blockquote',
            'button','label','input',
            'code','mono','caption','badge'
          ];
          rolesToSeed.forEach(role => {
            root.setProperty(`--font-${role}` as any, getFamilyForRole(role));
          });

          const rootEl = document.documentElement;
          if (brandForCSS.animationConfig) {
            const animationCss = generateAnimationCss(brandForCSS.animationConfig);
            let animEl = document.querySelector('style[data-theme-animations]') as HTMLStyleElement | null;
            if (!animEl) {
              animEl = document.createElement('style');
              animEl.setAttribute('data-theme-animations', 'true');
              document.head.appendChild(animEl);
            }
            animEl.textContent = animationCss;

            const animationRoot = brandForCSS.animationConfig.rootClassName;
            Array.from(rootEl.classList).filter(cls => cls.endsWith('-theme') || cls.includes('animation') || cls.includes('brutal') || cls.includes('modern'))
              .forEach(cls => rootEl.classList.remove(cls));
            if (animationRoot) rootEl.classList.add(animationRoot);
          } else {
            const existingAnim = document.querySelector('style[data-theme-animations]');
            existingAnim?.remove();
            Array.from(rootEl.classList).filter(cls => cls.endsWith('-theme') || cls.includes('animation') || cls.includes('brutal') || cls.includes('modern'))
              .forEach(cls => rootEl.classList.remove(cls));
          }

          const brandClassName = brandForCSS.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          const themeClassName = `theme-${brandClassName}`;
          Array.from(rootEl.classList).filter(cls => cls.startsWith('theme-')).forEach(cls => rootEl.classList.remove(cls));
          rootEl.classList.add(themeClassName);

          const cachedProcessed = processedBrandCacheRef.current.get(sig);
          if (cachedProcessed) {
            setProcessedBrand(cachedProcessed);
          } else {
            const oklchConv = converter('oklch');
            const enriched: EnrichedColorToken[] = brandForCSS.colors.map(t => {
              const base = oklchConv(t.oklch);
              const L = base?.l ?? 0;
              const shades: EnrichedColorToken['shades'] = {
                base: { variableName: t.variableName, value: t.oklch, resolvedValue: t.oklch, isAlias: false, calculatedLightness: L, mappedThemeVars: [] }
              };
              (Object.keys(t.themeSteps) as LightnessStepKey[]).forEach(step => {
                const stepV = t.themeSteps[step];
                if (stepV) shades[step] = { variableName: `${t.variableName}-${step}`, value: stepV, resolvedValue: stepV, isAlias: false, calculatedLightness: L, mappedThemeVars: [] };
              });
              const sorted: EnrichedShade[] = [];
              (['brighter','bright','base','dark','darker'] as const).forEach(k => { const s = shades[k]; if (s) sorted.push(s); });
              return { ...t, shades, sortedDisplayShades: sorted, tokenLevelMappedThemeVars: [], referrers: [] };
            });
            const processed: EnrichedBrand = { ...brandForCSS, colors: enriched } as EnrichedBrand;
            processedBrandCacheRef.current.set(sig, processed);
            setProcessedBrand(processed);
          }
        };
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(run, { timeout: 200 });
        } else {
          setTimeout(run, 0);
        }
      };

      // Schedule post work after CSS has been applied (next frame)
      requestAnimationFrame(schedulePostWork);
    }
  }, [brandToDisplay, currentThemeData, activeThemeKey, computeBrandSignature, supportsAdopted]);

  // Pre-warm CSS cache for top themes during idle time
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const entries = Object.entries(initialThemes);
    if (!entries.length) return;
    const top = entries
      .sort(([, A], [, B]) => (B.rating ?? 0) - (A.rating ?? 0) || (A.name || '').localeCompare(B.name || ''))
      .slice(0, 4);
    const warm = () => {
      top.forEach(([key, brand]) => {
        try {
          const sig = computeBrandSignature(brand);
          if (!cssCacheRef.current.has(sig)) {
            const css = generateGlobalCss(brand);
            cssCacheRef.current.set(sig, css);
          }
        } catch {}
      });
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(warm, { timeout: 300 });
    } else {
      setTimeout(warm, 0);
    }
  }, [initialThemes, computeBrandSignature]);

  useEffect(() => {
    if (cssUpdateTimeoutRef.current) clearTimeout(cssUpdateTimeoutRef.current);
    cssUpdateTimeoutRef.current = setTimeout(() => {
      if (!isUpdatingCssRef.current) performMainCssUpdate();
    }, 1);
    return () => {
      if (cssUpdateTimeoutRef.current) {
        clearTimeout(cssUpdateTimeoutRef.current);
        cssUpdateTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandToDisplay, currentThemeData, activeThemeKey]);

  useEffect(() => {
    return () => {
      if (cssUpdateTimeoutRef.current) {
        clearTimeout(cssUpdateTimeoutRef.current);
        cssUpdateTimeoutRef.current = null;
      }
      isUpdatingCssRef.current = false;
    };
  }, []);

  /* -------------------- Typographic rhythm (live vars) -------------------- */

  const updateLineHeightForRole = useCallback((role: string, lineHeight: number) => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(`--line-height-${role}`, String(lineHeight));
      try {
        window.dispatchEvent(new CustomEvent('brand-typography-updated', { detail: { kind: 'line-height', role } }));
      } catch {}
    }
  }, []);

  const updateLetterSpacingForRole = useCallback((role: string, letterSpacingEm: number) => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(`--letter-spacing-${role}`, `${letterSpacingEm}em`);
      try {
        window.dispatchEvent(new CustomEvent('brand-typography-updated', { detail: { kind: 'letter-spacing', role } }));
      } catch {}
    }
  }, []);

  return (
    <BrandContext.Provider value={{
      brand: brandToDisplay,
      committedBrand,
      processedBrand,
      activeThemeKey,
      availableThemes: initialThemes,
      setActiveTheme: handleSetActiveTheme,
      previewColorUpdate,
      commitColorUpdate,
      updateColorName,
      addNewColor,
      undo,
      redo,
      canUndo,
      canRedo,
      undoStepsAvailable,
      redoStepsAvailable,
      updateRoleAssignment,
      handleRoleSwatchSelection,
      handleRoleDirectColorChange,
      previewRoleDirectColorChange,
      updateFontRoleAssignment,
      handleFontRoleSwatchSelection,
      handleFontRoleDirectChange,
      addNewFont,
      updateFontWeightAssignment,
      getFontWeightForRole,
      updateFontSizeAssignment,
      getFontSizeForRole,
      updateAnimationConfig,
      updateLineHeightForRole,
      updateLetterSpacingForRole
    }}>
      {children}
    </BrandContext.Provider>
  );
};

/* -------------------- Animation hooks -------------------- */

export const useThemeAnimations = (): ThemeAnimationConfig | null => {
  const { brand } = useBrand();
  return brand?.animationConfig || null;
};

export const useAnimationCss = (): string => {
  const animationConfig = useThemeAnimations();
  if (!animationConfig) return '';
  return generateAnimationCss(animationConfig);
};

export const useAnimationRootClassName = (): string => {
  const animationConfig = useThemeAnimations();
  return animationConfig?.rootClassName || '';
};

/* -------------------- UI Context -------------------- */

interface UIContextType {
  activeTab: string;
  selectedTypographyRole: string | null;
  selectedColorRole: string | null;
  setActiveTab: (tab: string) => void;
  setSelectedTypographyRole: (role: string) => void;
  setSelectedColorRole: (role: string) => void;
  showTokenTargeting: boolean;
  setShowTokenTargeting: (visible: boolean) => void;
  activeTargetKey: string | null;
  setActiveTargetKey: React.Dispatch<React.SetStateAction<string | null>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUIContext must be used within a UIProvider');
  return context;
};

interface UIProviderProps {
  children: ReactNode;
  initialTab?: string;
  initialShowTokenTargeting?: boolean;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children, initialTab = 'colors', initialShowTokenTargeting = true }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedTypographyRole, setSelectedTypographyRoleState] = useState<string | null>(null);
  const [selectedColorRole, setSelectedColorRoleState] = useState<string | null>(null);
  const [showTokenTargeting, setShowTokenTargeting] = useState<boolean>(initialShowTokenTargeting);
  const [activeTargetKey, setActiveTargetKey] = useState<string | null>(null);

  const setSelectedTypographyRole = (role: string) => {
    setSelectedTypographyRoleState(role);
    setSelectedColorRoleState(null);
  };
  const setSelectedColorRole = (role: string) => {
    setSelectedColorRoleState(role);
    setSelectedTypographyRoleState(null);
  };

  const value = useMemo(() => ({
    activeTab,
    selectedTypographyRole,
    selectedColorRole,
    setActiveTab,
    setSelectedTypographyRole,
    setSelectedColorRole,
    showTokenTargeting,
    setShowTokenTargeting,
    activeTargetKey,
    setActiveTargetKey,
  }), [activeTab, selectedTypographyRole, selectedColorRole, showTokenTargeting, activeTargetKey]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};
