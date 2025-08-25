"use client";

import { useEffect, useState } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import {
  Copy,
  Download,
  Check,
  Palette,
  Type,
  Info,
  Zap,
  Package
} from "lucide-react";
import {
  generateGlobalCss,
  generateAnimationCss,
  type Brand,
  type ColorToken,
  type FontToken
} from "../brand-utils";
import { formatHex } from "culori";
import { useBrand } from "../BrandContext";

interface ExportTabProps {
  activeThemeKey: string;
}

export function ExportTab({ activeThemeKey }: ExportTabProps) {
  const { brand } = useBrand();
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});
  const [, setVersion] = useState(0);
  const [scopedTypography, setScopedTypography] = useState(false);
  const [includeAnimations, setIncludeAnimations] = useState(true);

  // Recompute exports when typography variables change live
  useEffect(() => {
    const onTypo = () => setVersion(v => v + 1);
    if (typeof window !== 'undefined') {
      window.addEventListener('brand-typography-updated', onTypo as any);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('brand-typography-updated', onTypo as any);
      }
    };
  }, []);

  // Get theme display name
  const getThemeDisplayName = (key: string) => {
    const specialNames: Record<string, string> = {
      nextgen: "Nextgen",
      "violet-sky": "Violet Sky",
      sageMeadow: "Sage Meadow",
      "neo-brutalism": "Neo Brutalism",
      elegantLuxury: "Elegant Luxury",
      lilacDaylight: "Lilac Daylight",
      neonPop: "Neon Pop",
      cyberPulse: "Cyber Pulse",
      sageMinimal: "Sage Minimal"
    };

    if (specialNames[key]) return specialNames[key];
    return key
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle copy functionality
  const handleCopy = async (content: string, itemKey: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedItems(prev => ({ ...prev, [itemKey]: true }));
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [itemKey]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Handle download functionality
  const handleDownload = (content: string, filename: string, type: string = "text/css") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate different export formats
  const generateExports = () => {
    if (!brand) return null;

    // Export the exact CSS that BrandProvider applies at runtime
    const css = generateGlobalCss(brand);
    let animationCss = '';
    if (brand.animationConfig) {
      const raw = generateAnimationCss(brand.animationConfig);
      // For export: make animations apply without requiring the theme root class
      try {
        const root = brand.animationConfig.rootClassName;
        const escaped = root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`\\.${escaped}\\s+`, 'g');
        animationCss = raw.replace(re, '');
      } catch {
        animationCss = raw;
      }
    }

    // Build a complete typography variable section from current brand and CSS vars
    const roles = [
      "body",
      "p",
      "default",
      "blockquote",
      "heading",
      "display",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "button",
      "label",
      "input",
      "caption",
      "badge",
      "code",
      "mono",
      "serif",
      "sans"
    ] as const;

    const getCssVar = (name: string, fallback: string = ""): string => {
      if (typeof window === "undefined") return fallback;
      const v = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
      return v || fallback;
    };

    // Snapshot all current custom properties from :root so exported CSS matches runtime precisely
    const snapshotRoot = (() => {
      if (typeof window === "undefined") return "";
      const cs = getComputedStyle(document.documentElement);
      const out: string[] = [];
      for (let i = 0; i < cs.length; i++) {
        const propName = cs.item(i);
        if (!propName || !propName.startsWith("--")) continue;
        const val = cs.getPropertyValue(propName).trim();
        if (!val) continue;
        out.push(`  ${propName}: ${val};`);
      }
      out.sort();
      return out.join("\n");
    })();

    // Map role -> owning font token
    const roleToFont = new Map<string, FontToken>();
    brand.fonts.forEach(f => {
      (f.roles || []).forEach(r => {
        if (!roleToFont.has(r)) roleToFont.set(r, f);
      });
    });

    const isHeadingRole = (r: string) =>
      ["h1", "h2", "h3", "h4", "h5", "h6", "heading", "display"].includes(r);

    const resolveFontForRole = (role: string): FontToken | undefined => {
      return (
        roleToFont.get(role) ||
        (isHeadingRole(role)
          ? roleToFont.get("heading") || roleToFont.get("display")
          : undefined) ||
        roleToFont.get("body") ||
        brand.fonts[0]
      );
    };

    const resolveWeightForRole = (role: string): number | undefined => {
      const owner = resolveFontForRole(role);
      if (!owner) return undefined;
      const weightName = owner.fontWeights?.[role];
      if (weightName && owner.weights?.[weightName] !== undefined) return owner.weights[weightName];
      if (owner.weights?.regular !== undefined) return owner.weights.regular;
      const first = owner.weights ? Object.values(owner.weights)[0] : undefined;
      return typeof first === "number" ? first : undefined;
    };

    const resolveSizeForRole = (role: string): string | undefined => {
      const owner = resolveFontForRole(role);
      const rem = owner?.fontSizes?.[role];
      return typeof rem === "number" ? `${rem}rem` : undefined;
    };

    const headingFont =
      resolveFontForRole("heading")?.family ||
      resolveFontForRole("display")?.family ||
      resolveFontForRole("body")?.family ||
      "system-ui, sans-serif";
    const bodyFont = resolveFontForRole("body")?.family || "system-ui, sans-serif";

    const extraTypographyCss = `
/* === Typography Variables (generated) === */
:root{
${snapshotRoot}
  --font-heading: ${headingFont};
  --font-body: ${bodyFont};
}

/* === Typography Consumption (generated) === */
h1{font-family:var(--font-h1,var(--font-heading,var(--font-body)));font-weight:var(--font-weight-h1,700);font-size:var(--font-size-h1,2.25rem);line-height:var(--line-height-h1,1.1);letter-spacing:var(--letter-spacing-h1,0em)}
h2{font-family:var(--font-h2,var(--font-heading,var(--font-body)));font-weight:var(--font-weight-h2,700);font-size:var(--font-size-h2,1.875rem);line-height:var(--line-height-h2,1.15);letter-spacing:var(--letter-spacing-h2,0em)}
h3{font-family:var(--font-h3,var(--font-heading,var(--font-body)));font-weight:var(--font-weight-h3,600);font-size:var(--font-size-h3,1.5rem);line-height:var(--line-height-h3,1.2);letter-spacing:var(--letter-spacing-h3,0em)}
h4{font-family:var(--font-h4,var(--font-heading,var(--font-body)));font-weight:var(--font-weight-h4,600);font-size:var(--font-size-h4,1.25rem);line-height:var(--line-height-h4,1.25);letter-spacing:var(--letter-spacing-h4,0em)}
h5{font-family:var(--font-h5,var(--font-heading,var(--font-body)));font-weight:var(--font-weight-h5,600);font-size:var(--font-size-h5,1.125rem);line-height:var(--line-height-h5,1.3);letter-spacing:var(--letter-spacing-h5,0em)}
h6{font-family:var(--font-h6,var(--font-heading,var(--font-body)));font-weight:var(--font-weight-h6,600);font-size:var(--font-size-h6,1rem);line-height:var(--line-height-h6,1.35);letter-spacing:var(--letter-spacing-h6,0em)}
p,span,li{font-family:var(--font-body);font-weight:var(--font-weight-p,400);font-size:var(--font-size-p,1rem);line-height:var(--line-height-p,1.5);letter-spacing:var(--letter-spacing-p,0em)}
blockquote{font-family:var(--font-blockquote,var(--font-body));font-weight:var(--font-weight-blockquote,var(--font-weight-p,400));font-size:var(--font-size-blockquote,var(--font-size-p,1rem));line-height:var(--line-height-blockquote,var(--line-height-p,1.5));letter-spacing:var(--letter-spacing-blockquote,var(--letter-spacing-p,0em))}
[data-slot="button"],button{font-family:var(--font-button,var(--font-body));font-weight:var(--font-weight-button,600);font-size:var(--font-size-button,0.875rem);line-height:var(--line-height-button,1.2);letter-spacing:var(--letter-spacing-button,0em)}
`;

    // Compute missing typography variables from brand roles so H1–H6 mirror P behavior
    const roleDefaults: Record<string, { lh: string; ls: string; sz?: string; fw?: number }> = {
      h1: { lh: '1.1', ls: '0em', sz: '2.25rem', fw: resolveWeightForRole('h1') ?? 700 },
      h2: { lh: '1.15', ls: '0em', sz: '1.875rem', fw: resolveWeightForRole('h2') ?? 700 },
      h3: { lh: '1.2', ls: '0em', sz: '1.5rem', fw: resolveWeightForRole('h3') ?? 600 },
      h4: { lh: '1.25', ls: '0em', sz: '1.25rem', fw: resolveWeightForRole('h4') ?? 600 },
      h5: { lh: '1.3', ls: '0em', sz: '1.125rem', fw: resolveWeightForRole('h5') ?? 600 },
      h6: { lh: '1.35', ls: '0em', sz: '1rem', fw: resolveWeightForRole('h6') ?? 600 },
      p: { lh: '1.5', ls: '0em', sz: '1rem', fw: resolveWeightForRole('p') ?? 400 },
      body: { lh: '1.5', ls: '0em', sz: '1rem', fw: resolveWeightForRole('body') ?? 400 },
      blockquote: { lh: '1.5', ls: '0em', sz: '1rem', fw: resolveWeightForRole('blockquote') ?? 400 },
      button: { lh: '1.2', ls: '0em', sz: '0.875rem', fw: resolveWeightForRole('button') ?? 600 }
    } as const;

    const computedVarLines: string[] = [];
    // Heading/body family fallbacks
    if (!getCssVar('font-heading')) computedVarLines.push(`  --font-heading: ${headingFont};`);
    if (!getCssVar('font-body')) computedVarLines.push(`  --font-body: ${bodyFont};`);

    roles.forEach(role => {
      const owner = resolveFontForRole(role);
      if (owner && !getCssVar(`font-${role}`)) computedVarLines.push(`  --font-${role}: ${owner.family};`);
      const w = getCssVar(`font-weight-${role}`);
      const s = getCssVar(`font-size-${role}`);
      const lh = getCssVar(`line-height-${role}`);
      const ls = getCssVar(`letter-spacing-${role}`);
      const computedW = resolveWeightForRole(role);
      const computedS = resolveSizeForRole(role) || (roleDefaults as any)[role]?.sz;
      if (!w && typeof computedW === 'number') computedVarLines.push(`  --font-weight-${role}: ${computedW};`);
      if (!s && computedS) computedVarLines.push(`  --font-size-${role}: ${computedS};`);
      const def = (roleDefaults as any)[role];
      if (!lh && def?.lh) computedVarLines.push(`  --line-height-${role}: ${def.lh};`);
      if (!ls && def?.ls) computedVarLines.push(`  --letter-spacing-${role}: ${def.ls};`);
    });

    const typographyComputedCss = computedVarLines.length
      ? `/* ───────── Typography variables computed from brand roles (ensure effect on h1..h6 etc) ───────── */\n:root{\n${computedVarLines.join('\n')}\n}\n`
      : '';

    // Final consumption overrides to ensure variables win over utilities in consumers
    const roleSelectors: Record<string, string> = {
      h1: 'h1, [data-typography-role="h1"]',
      h2: 'h2, [data-typography-role="h2"]',
      h3: 'h3, [data-typography-role="h3"]',
      h4: 'h4, [data-typography-role="h4"]',
      h5: 'h5, [data-typography-role="h5"]',
      h6: 'h6, [data-typography-role="h6"]',
      p: 'p, li, [data-typography-role="p"], [data-typography-role="default"]',
      blockquote: 'blockquote, [data-typography-role="blockquote"]',
      button: '[data-slot="button"], button, [data-typography-role="button"]'
    };
    const finalOverridesLines: string[] = [];
    const emitRoleRule = (roleKey: string, fallbackSize: string, fallbackWeight: number) => {
      let sel = (roleSelectors as any)[roleKey];
      if (scopedTypography) sel = `[data-typography-scope] :is(${sel})`;
      if (!sel) return;
      const def = (roleDefaults as any)[roleKey];
      const fallbackLh = (def && def.lh) ? def.lh : '1.2';
      finalOverridesLines.push(`${sel} {`);
      // font family
      const familyVar = roleKey === 'p' ? 'body' : (roleKey.match(/^h[1-6]$/) ? 'heading' : roleKey);
      const imp = scopedTypography ? '' : ' !important';
      finalOverridesLines.push(`  font-family: var(--font-${roleKey}, var(--font-${familyVar}, var(--font-body)))${imp};`);
      finalOverridesLines.push(`  font-weight: var(--font-weight-${roleKey}, ${fallbackWeight})${imp};`);
      finalOverridesLines.push(`  font-size: var(--font-size-${roleKey}, ${fallbackSize})${imp};`);
      finalOverridesLines.push(`  line-height: var(--line-height-${roleKey}, var(--line-height-heading, var(--line-height-body, ${fallbackLh})))${imp};`);
      finalOverridesLines.push(`  letter-spacing: var(--letter-spacing-${roleKey}, var(--letter-spacing-heading, 0em))${imp};`);
      finalOverridesLines.push(`}`);
    };
    emitRoleRule('h1', '2.25rem', resolveWeightForRole('h1') ?? 700);
    emitRoleRule('h2', '1.875rem', resolveWeightForRole('h2') ?? 700);
    emitRoleRule('h3', '1.5rem', resolveWeightForRole('h3') ?? 600);
    emitRoleRule('h4', '1.25rem', resolveWeightForRole('h4') ?? 600);
    emitRoleRule('h5', '1.125rem', resolveWeightForRole('h5') ?? 600);
    emitRoleRule('h6', '1rem', resolveWeightForRole('h6') ?? 600);
    emitRoleRule('p', '1rem', resolveWeightForRole('p') ?? 400);
    emitRoleRule('blockquote', '1rem', resolveWeightForRole('blockquote') ?? 400);
    emitRoleRule('button', '0.875rem', resolveWeightForRole('button') ?? 600);
    const finalOverrides = finalOverridesLines.length
      ? `/* ───────── Typography consumption overrides (ensure effect in consumers) ───────── */\n${finalOverridesLines.join('\n')}\n`
      : '';

    // Filter :root snapshot down to only typography-relevant variables to avoid noise
    const typographySnapshot = (() => {
      if (!snapshotRoot) return '';
      const lines = snapshotRoot.split('\n');
      const keep = [
        '--font-',
        '--font-weight-',
        '--font-size-',
        '--line-height-',
        '--letter-spacing-'
      ];
      const filtered = lines.filter(l => keep.some(k => l.trim().startsWith(k)));
      if (filtered.length === 0) return '';
      return `/* ───────── Typography variables snapshot (weights/sizes/line-heights/letter-spacing) ───────── */\n:root{\n${filtered.join('\n')}\n}\n`;
    })();

    const fullCssRaw = [
      css,
      typographyComputedCss,
      typographySnapshot,
      finalOverrides,
      (includeAnimations && animationCss)
        ? `/* ───────────────── Animations (unscoped export: ${brand.animationConfig!.preset.name}) ───────────────── */\n${animationCss}`
        : ''
    ].filter(Boolean).join('\n');

    // Sanitize invalid alpha syntax like var(--primary/25) → color-mix(in oklch, var(--primary) 25%, transparent)
    const sanitizeVarAlpha = (source: string) => {
      try {
        let out = source.replace(/var\(--([a-z0-9_-]+)\s*\/\s*([0-9]+(?:\.[0-9]+)?)%?\)/gi, (_m, name, alpha) => {
          const pct = Number(alpha);
          const pctStr = Number.isFinite(pct) ? `${pct}%` : '100%';
          return `color-mix(in oklch, var(--${name}) ${pctStr}, transparent)`;
        });
        // Collapse excessive blank lines
        out = out.replace(/\n{3,}/g, '\n\n');
        return out;
      } catch {
        return source;
      }
    };

    const fullCss = sanitizeVarAlpha(fullCssRaw);

    // Generate JSON config
    const jsonConfig = {
      name: getThemeDisplayName(activeThemeKey),
      mode: "dark", // new generator is dark by default
      colors: brand.colors.map(color => ({
        name: color.name,
        variable: color.variableName,
        light: color.oklch,
        roles: color.roles,
        category: color.category
      })),
      fonts: brand.fonts.map(font => ({
        family: font.family,
        roles: font.roles,
        distributor: font.distributor,
        weights: font.weights,
        fontWeights: font.fontWeights,
        fontSizes: font.fontSizes
      })),
      animation: brand.animationConfig
        ? { preset: brand.animationConfig.preset.name, rootClassName: brand.animationConfig.rootClassName }
        : undefined,
      typography: Object.fromEntries(
        roles.map(role => {
          const owner = resolveFontForRole(role);
          const weight = resolveWeightForRole(role);
          const size = resolveSizeForRole(role);
          const lh = getCssVar(`line-height-${role}`, "");
          const ls = getCssVar(`letter-spacing-${role}`, "");
          return [
            role,
            {
              fontFamily: owner?.family || null,
              fontWeight: weight ?? null,
              fontSizeRem: size ? parseFloat(size) : null,
              lineHeight: lh ? parseFloat(lh) : null,
              letterSpacingEm: ls ? parseFloat(ls) : null
            }
          ];
        })
      )
    };

    // Tailwind v4 CSS preview = same as full globals
    const tailwindConfig = fullCss;

    return { css: fullCss, jsonConfig: JSON.stringify(jsonConfig, null, 2), tailwindConfig };
  };

  const exports = generateExports();

  if (!brand || !exports) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme data available for export</p>
      </div>
    );
  }

  const themeStats = {
    colors: brand.colors.length,
    fonts: brand.fonts.length,
    colorCategories: [...new Set(brand.colors.map(c => c.category))].length,
    roles: [...new Set(brand.colors.flatMap(c => c.roles))].length
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Download className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground">Export Theme</h3>
            <p className="text-xs text-muted-foreground">
              Generate files for{" "}
              <span className="font-medium text-foreground">{getThemeDisplayName(activeThemeKey)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Theme Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="w-3 h-3" />
            Theme Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Theme:</span>
                <span className="font-medium truncate ml-1 text-right">
                  {getThemeDisplayName(activeThemeKey)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Mode:</span>
                <Badge variant="secondary" className="text-xs h-4 px-1.5">
                  Dark (default)
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Colors:</span>
                <span className="font-medium">{themeStats.colors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fonts:</span>
                <span className="font-medium">{themeStats.fonts}</span>
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium">Primary Colors:</span>
            <div className="flex gap-1 flex-wrap">
              {brand.colors
                .filter(
                  color =>
                    color.roles.includes("primary") ||
                    color.roles.includes("secondary") ||
                    color.roles.includes("accent")
                )
                .slice(0, 8)
                .map(color => (
                  <div
                    key={color.variableName}
                    className="w-5 h-5 rounded border border-border shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: formatHex(color.oklch as string)
                    }}
                    title={`${color.name} (${color.roles.join(", ")})`}
                  />
                ))}
            </div>
          </div>

          {/* Font Preview */}
          {brand.fonts.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium">Typography:</span>
              <div className="space-y-0.5">
                {brand.fonts.slice(0, 2).map((font, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    <span style={{ fontFamily: font.family }} className="font-medium text-foreground">
                      {font.family.split(",")[0].replace(/['"]/g, "").trim()}
                    </span>
                    {" · "}
                    <span className="text-xs">{font.roles?.join(", ") || "general"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Ready to Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* CSS Export */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Type className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Complete CSS File</p>
                  <p className="text-xs text-muted-foreground">Full styles with variables and classes</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(exports.css, "css")}
                  className="h-7 px-2.5 text-xs"
                >
                  {copiedItems.css ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(exports.css, `${activeThemeKey}-theme.css`)}
                  className="h-7 px-2.5 text-xs"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* JSON Export */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Package className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Theme Config (JSON)</p>
                  <p className="text-xs text-muted-foreground">Structured data for integrations</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(exports.jsonConfig, "json")}
                  className="h-7 px-2.5 text-xs"
                >
                  {copiedItems.json ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(exports.jsonConfig, `${activeThemeKey}-config.json`, "application/json")}
                  className="h-7 px-2.5 text-xs"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tailwind v4 Preview */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-3 h-3" />
            Tailwind v4 CSS
            <Badge variant="outline" className="text-xs">
              Preview
            </Badge>
          </CardTitle>
        </CardHeader>

        <div className="border-t bg-muted/30">
          <div className="p-3 border-b bg-background/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-medium text-muted-foreground truncate">
                  {activeThemeKey}-tailwind-v4.css
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                <Badge variant="outline" className="text-xs h-4 px-1">
                  v4
                </Badge>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-64 overflow-auto bg-slate-950">
              <pre className="p-3 text-xs leading-relaxed">
                <code className="text-slate-300 whitespace-pre-wrap font-mono">
                  {exports.tailwindConfig}
                </code>
              </pre>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Footer with Quick Setup */}
        <CardContent className="pt-4">
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">1</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs">Replace globals.css</h4>
                <p className="text-xs text-muted-foreground">Download and replace your existing CSS file</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">2</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs">Use Tailwind classes</h4>
                <p className="text-xs text-muted-foreground">
                  <code className="bg-muted px-1 rounded text-xs">bg-primary</code>,{" "}
                  <code className="bg-muted px-1 rounded text-xs">text-foreground</code>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(exports.tailwindConfig, "tailwind")}
              className="h-8 px-3 text-xs flex-1"
            >
              {copiedItems.tailwind ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
              Copy CSS
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(exports.tailwindConfig, `${activeThemeKey}-tailwind-v4.css`)}
              className="h-8 px-3 text-xs flex-1"
            >
              <Download className="w-3 h-3 mr-1.5" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
