"use client";

import { useEffect, useState } from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import {
  Copy,
  Download,
  Check,
  Package
} from "lucide-react";
import {
  generateGlobalCss,
  generateAnimationCss,
  type Brand,
  type ColorToken,
  type FontToken
} from "../brand-utils";
import { useBrand } from "../BrandContext";
import { formatHex } from "culori";

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
      // Prefer live CSS var if present
      const cssVarWeight = getCssVar(`font-weight-${role}`);
      if (cssVarWeight) {
        const parsed = parseInt(cssVarWeight, 10);
        if (!Number.isNaN(parsed)) return parsed;
      }
      // Role-specific mapping
      let weightName = owner.fontWeights?.[role];
      // Fallback: use generic heading mapping for H1–H6 when specific is absent
      if (!weightName && isHeadingRole(role)) {
        weightName = owner.fontWeights?.['heading'];
      }
      if (weightName && owner.weights?.[weightName] !== undefined) return owner.weights[weightName];
      if (owner.weights?.regular !== undefined) return owner.weights.regular;
      const first = owner.weights ? Object.values(owner.weights)[0] : undefined;
      return typeof first === 'number' ? first : undefined;
    };

    const resolveSizeForRole = (role: string): string | undefined => {
      // Prefer live CSS var snapshot so export mirrors runtime precisely
      const cssVarSize = getCssVar(`font-size-${role}`);
      if (cssVarSize) return cssVarSize; // e.g. "1.25rem"
      const owner = resolveFontForRole(role);
      let remVal = owner?.fontSizes?.[role];
      // Fallback for headings: use generic heading size if role-specific missing
      if (remVal === undefined && isHeadingRole(role)) {
        remVal = owner?.fontSizes?.['heading'];
      }
      // Fallback for paragraph-like roles: use body/default mapping
      if (remVal === undefined && (role === 'p' || role === 'default' || role === 'body')) {
        remVal = owner?.fontSizes?.['body'] ?? owner?.fontSizes?.['p'] ?? owner?.fontSizes?.['default'];
      }
      return typeof remVal === 'number' ? `${remVal}rem` : undefined;
    };

    const resolveLineHeightForRole = (role: string): string | undefined => {
      // Prefer role-specific live var
      const lh = getCssVar(`line-height-${role}`);
      if (lh) return lh;
      // Fallback to heading/body vars if present
      if (isHeadingRole(role)) {
        const h = getCssVar('line-height-heading');
        if (h) return h;
      }
      const b = getCssVar('line-height-body');
      if (b) return b;
      // Finally, role defaults
      const def = (roleDefaults as any)[role];
      return def?.lh;
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
    // Always emit concrete heading/body families so export contains literal names (e.g., Orbitron)
    computedVarLines.push(`  --font-heading: ${headingFont};`);
    computedVarLines.push(`  --font-body: ${bodyFont};`);

    roles.forEach(role => {
      const owner = resolveFontForRole(role);
      if (owner) computedVarLines.push(`  --font-${role}: ${owner.family};`);
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
    const emitRoleRule = (roleKey: string) => {
      let sel = (roleSelectors as any)[roleKey];
      if (scopedTypography) sel = `[data-typography-scope] :is(${sel})`;
      if (!sel) return;
      const def = (roleDefaults as any)[roleKey];
      const fallbackLh = (def && def.lh) ? def.lh : '1.2';
      // Resolve fallback size/weight from live vars or brand so export mirrors runtime
      const effectiveSize = resolveSizeForRole(roleKey) || (def && def.sz) || '1rem';
      const effectiveWeight = resolveWeightForRole(roleKey) ?? (def && def.fw) ?? 400;
      finalOverridesLines.push(`${sel} {`);
      // font family
      const familyVar = roleKey === 'p' ? 'body' : (roleKey.match(/^h[1-6]$/) ? 'heading' : roleKey);
      const imp = '';
      finalOverridesLines.push(`  font-family: var(--font-${roleKey}, var(--font-${familyVar}, var(--font-body)))${imp};`);
      finalOverridesLines.push(`  font-weight: var(--font-weight-${roleKey}, ${effectiveWeight})${imp};`);
      finalOverridesLines.push(`  font-size: var(--font-size-${roleKey}, ${effectiveSize})${imp};`);
      const effectiveLh = resolveLineHeightForRole(roleKey) || fallbackLh;
      finalOverridesLines.push(`  line-height: var(--line-height-${roleKey}, ${effectiveLh})${imp};`);
      finalOverridesLines.push(`  letter-spacing: var(--letter-spacing-${roleKey}, var(--letter-spacing-heading, 0em))${imp};`);
      finalOverridesLines.push(`}`);
    };
    emitRoleRule('h1');
    emitRoleRule('h2');
    emitRoleRule('h3');
    emitRoleRule('h4');
    emitRoleRule('h5');
    emitRoleRule('h6');
    emitRoleRule('p');
    emitRoleRule('blockquote');
    emitRoleRule('button');
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
      // Place snapshot first, then our computed concrete values so family names appear explicitly
      typographySnapshot,
      typographyComputedCss,
      finalOverrides,
      (includeAnimations && animationCss)
        ? `/* ───────────────── Animations (unscoped export: ${brand.animationConfig!.preset.name}) ───────────────── */\n${animationCss}`
        : ''
    ].filter(Boolean).join('\n');

    // Sanitize output for export: fix alpha vars, strip :where(), and remove !important
    const sanitizeForExport = (source: string) => {
      try {
        let out = source.replace(/var\(--([a-z0-9_-]+)\s*\/\s*([0-9]+(?:\.[0-9]+)?)%?\)/gi, (_m, name, alpha) => {
          const pct = Number(alpha);
          const pctStr = Number.isFinite(pct) ? `${pct}%` : '100%';
          return `color-mix(in oklch, var(--${name}) ${pctStr}, transparent)`;
        });
        // Preserve focus scoping when :where(...) wraps a selector list followed by :focus-visible
        out = out.replace(/:where\(([^)]+)\):focus-visible/g, ':is($1):focus-visible');
        // Strip :where(...) wrappers (export plain selectors)
        out = out.replace(/:where\(([^)]+)\)/g, '$1');
        // Remove !important flags
        out = out.replace(/\s*!important\b/g, '');
        // Collapse excessive blank lines
        out = out.replace(/\n{3,}/g, '\n\n');
        return out;
      } catch {
        return source;
      }
    };

    const fullCss = sanitizeForExport(fullCssRaw);

    // ────────────────────────────────────────────────────────────────────────────────
    // Build category CSS files similar to example structure
    // ────────────────────────────────────────────────────────────────────────────────

    const escapeCssVarName = (name: string) => name.replace(/[^a-z0-9_-]/gi, '-');

    // colors.css: Foundations, color-mix steps, semantic tokens, Tailwind color map
    const colorsCss = (() => {
      const linesBase: string[] = [];
      linesBase.push('/* colors.css – foundations, color-mix steps, semantic tokens, Tailwind color map */');
      linesBase.push('@layer base {');
      linesBase.push('  :root {');

      // Foundations (OKLCH)
      linesBase.push('    /* ——— Foundations (OKLCH) ——— */');
      brand.colors.forEach(tok => {
        try {
          const varName = escapeCssVarName(tok.variableName);
          const value = typeof tok.oklch === 'string' ? tok.oklch : String(tok.oklch);
          if (value) linesBase.push(`    --${varName}: ${value};`);
        } catch {}
      });

      // Optional: add any special-purpose variables explicitly referenced by roles
      // (no-op here; roles resolve to foundations below)

      // Color-mix steps for each foundation
      const mixSuffixes: Array<{ suf: string; mix: string }> = [
        { suf: 'bright', mix: '92%, white 8%' },
        { suf: 'brighter', mix: '85%, white 15%' },
        { suf: 'dark', mix: '92%, black 8%' },
        { suf: 'darker', mix: '85%, black 15%' }
      ];
      brand.colors.forEach(tok => {
        const varName = escapeCssVarName(tok.variableName);
        mixSuffixes.forEach(({ suf, mix }) => {
          linesBase.push(`    --${varName}-${suf}: color-mix(in oklch, var(--${varName}) ${mix});`);
        });
      });

      // Semantic tokens from themeCssVariables
      linesBase.push('');
      linesBase.push('    /* ——— Semantic tokens ——— */');
      const themeVars = brand.themeCssVariables || {} as Record<string, string>;
      Object.entries(themeVars).forEach(([k, v]) => {
        const key = escapeCssVarName(k);
        const val = v?.trim();
        if (val) linesBase.push(`    --${key}: ${val};`);
      });

      // Common ring/border/input fallbacks if not present
      const ensureVar = (k: string, v: string) => {
        if (!Object.prototype.hasOwnProperty.call(themeVars, k)) {
          linesBase.push(`    --${k}: ${v};`);
        }
      };
      ensureVar('ring', 'var(--primary)');
      ensureVar('border', 'var(--secondary)');
      ensureVar('input', 'var(--secondary)');

      linesBase.push('  }');
      linesBase.push('');
      linesBase.push('  .dark, [data-theme="dark"] {');
      linesBase.push('    /* Only scheme switch here; create a colors.dark.css if you want remaps */');
      linesBase.push('    color-scheme: dark;');
      linesBase.push('  }');
      linesBase.push('}');
      linesBase.push('');
      linesBase.push('/* Tailwind color tokens map */');
      linesBase.push('@theme inline {');

      // Map known semantic tokens
      const map = (
        keys: string[],
        prefix = '--color-'
      ) => keys.forEach(k => {
        const key = escapeCssVarName(k);
        linesBase.push(`  ${prefix}${key}: var(--${key});`);
      });
      map([
        'background','foreground','card','card-foreground','popover','popover-foreground',
        'muted','muted-foreground','border','input','ring','primary','primary-foreground',
        'secondary','secondary-foreground','accent','accent-foreground','destructive','destructive-foreground'
      ]);

      // Also expose all foundations as Tailwind tokens
      brand.colors.forEach(tok => {
        const varName = escapeCssVarName(tok.variableName);
        linesBase.push(`  --color-${varName}: var(--${varName});`);
      });

      linesBase.push('}');
      return linesBase.join('\n');
    })();

    // typography.css: font tokens + role mappings (using computed brand roles)
    const typographyCss = (() => {
      const out: string[] = [];
      out.push('/* typography.css – font tokens + role mappings */');
      out.push('@layer base {');
      out.push('  :root{');

      // Families
      out.push(`    --font-heading: ${headingFont};`);
      out.push(`    --font-body: ${bodyFont};`);

      // Weights / Sizes / Line-heights / Letter-spacing per role
      const emitVar = (k: string, v?: string | number | null) => {
        if (v === undefined || v === null || v === '') return;
        out.push(`    --${k}: ${v};`);
      };
      roles.forEach(role => {
        emitVar(`font-${role}`, resolveFontForRole(role)?.family);
        emitVar(`font-weight-${role}`, resolveWeightForRole(role));
        emitVar(`font-size-${role}`, resolveSizeForRole(role));
        const def = (roleDefaults as any)[role];
        const lh = getCssVar(`line-height-${role}`) || def?.lh;
        const ls = getCssVar(`letter-spacing-${role}`) || def?.ls;
        emitVar(`line-height-${role}`, lh);
        emitVar(`letter-spacing-${role}`, ls);
      });

      out.push('  }');
      out.push('');

      // Role mappings
      const ruleFor = (roleKey: string) => {
        let sel = (roleSelectors as any)[roleKey];
        if (!sel) return '';
        const familyVar = roleKey === 'p' ? 'body' : (roleKey.match(/^h[1-6]$/) ? 'heading' : roleKey);
        const effectiveSize = resolveSizeForRole(roleKey) || (roleDefaults as any)[roleKey]?.sz || '1rem';
        const effectiveWeight = resolveWeightForRole(roleKey) ?? (roleDefaults as any)[roleKey]?.fw ?? 400;
        const effectiveLh = resolveLineHeightForRole(roleKey) || (roleDefaults as any)[roleKey]?.lh || '1.2';
        return [
          `${sel} {`,
          `  font-family: var(--font-${roleKey}, var(--font-${familyVar}, var(--font-body)));`,
          `  font-weight: var(--font-weight-${roleKey}, ${effectiveWeight});`,
          `  font-size: var(--font-size-${roleKey}, ${effectiveSize});`,
          `  line-height: var(--line-height-${roleKey}, ${effectiveLh});`,
          `  letter-spacing: var(--letter-spacing-${roleKey}, var(--letter-spacing-heading, 0em));`,
          `}`
        ].join('\n');
      };
      out.push(ruleFor('h1'));
      out.push(ruleFor('h2'));
      out.push(ruleFor('h3'));
      out.push(ruleFor('h4'));
      out.push(ruleFor('h5'));
      out.push(ruleFor('h6'));
      out.push(ruleFor('p'));
      out.push(ruleFor('blockquote'));
      out.push(ruleFor('button'));

      out.push('}');
      return out.join('\n');
    })();

    // shadow.css with radius from sevenAxis cornerStyle if not set in themeCssVariables
    const mapCornerStyleToRadius = (cornerStyle?: string): string | undefined => {
      switch (cornerStyle) {
        case 'sharp': return '0px';
        case 'slightly-rounded': return '0.375rem';
        case 'rounded': return '0.75rem';
        case 'very-rounded': return '1.5rem';
        case 'pill': return '9999px';
        default: return undefined;
      }
    };
    const exportRadius = (brand.themeCssVariables as any)?.radius || mapCornerStyleToRadius((brand as any).sevenAxisCode?.cornerStyle) || '1.5rem';
    const shadowCss = [
      '/* shadow.css – radii + shadow tokens (kept separate for clarity) */',
      '@layer base {',
      '  :root {',
      `    --radius: ${exportRadius};`,
      '    --shadow-2xs: 0px 1px 3px 0px oklch(0 0% 0 / 0.05);',
      '    --shadow-xs: 0px 8px 16px -4px oklch(0 0 0 / 0.04);',
      '    --shadow-sm: 0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 1px 2px -5px oklch(0 0 0 / 0.08);',
      '    --shadow-md: 0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 2px 4px -5px oklch(0 0 0 / 0.08);',
      '    --shadow-lg: 0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 4px 6px -5px oklch(0 0 0 / 0.08);',
      '    --shadow-xl: 0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 8px 10px -5px oklch(0 0 0 / 0.08);',
      '    --shadow: 0px 8px 16px -4px oklch(0 0 0 / 0.08), 0px 1px 2px -5px oklch(0 0 0 / 0.08);',
      '    --shadow-2xl: 0px 1px 3px 0px oklch(0 0% 0 / 0.25);',
      '  }',
      '}',
      '',
      '/* Expose to Tailwind tokens */',
      '@theme inline {',
      '  --radius-sm: calc(var(--radius) - 4px);',
      '  --radius-md: calc(var(--radius) - 2px);',
      '  --radius-lg: var(--radius);',
      '  --radius-xl: calc(var(--radius) + 4px);',
      '',
      '  --shadow-2xs: var(--shadow-2xs);',
      '  --shadow-xs: var(--shadow-xs);',
      '  --shadow-sm: var(--shadow-sm);',
      '  --shadow: var(--shadow);',
      '  --shadow-md: var(--shadow-md);',
      '  --shadow-lg: var(--shadow-lg);',
      '  --shadow-xl: var(--shadow-xl);',
      '  --shadow-2xl: var(--shadow-2xl);',
      '}'
    ].join('\n');

    // layout.css defaults
    const layoutCss = [
      '/* layout.css – container sizes + utility */',
      '@theme {',
      '  --container-sm: 630px;',
      '  --container-md: 748px;',
      '  --container-lg: 1004px;',
      '  --container-xl: 1260px;',
      '}',
      '',
      '@utility container {',
      '  margin-inline: auto;',
      '  padding-inline: 1rem;',
      '  width: 100%;',
      '',
      '  @media (min-width: 640px) { max-width: var(--container-sm); }',
      '  @media (min-width: 768px) { max-width: var(--container-md); }',
      '  @media (min-width: 1024px) { max-width: var(--container-lg); }',
      '  @media (min-width: 1280px) { max-width: var(--container-xl); }',
      '}'
    ].join('\n');

    // components.css defaults
    const componentsCss = [
      '/* components.css – generic UI helpers */',
      '@layer components {',
      '  .surface { @apply bg-card text-card-foreground border rounded-xl; }',
      '  .muted-surface { @apply bg-muted text-muted-foreground rounded-xl; }',
      '  .interactive { @apply transition-colors duration-150; }',
      '  .interactive:hover { @apply bg-accent text-accent-foreground; }',
      '}'
    ].join('\n');

    // buttons.css built from baseline + theme animation rules (button-only)
    const extractButtonAnimationRules = (src: string): string => {
      try {
        const blocks = src.split('}');
        const picked: string[] = [];
        blocks.forEach(b => {
          if (b.includes('[data-slot="button"]') && b.includes('{')) {
            picked.push(b.trim() + '}');
          }
        });
        return picked.join('\n\n');
      } catch {
        return '';
      }
    };
    const buttonAnimationOnly = includeAnimations ? extractButtonAnimationRules(animationCss) : '';
    const buttonsCss = (() => {
      const base = [
        '/* buttons.css – slot styles + variants (theme-aware) */',
        '@layer components {',
        '  /* Global button slot */',
        '  [data-slot="button"] {',
        '    transition: all 180ms ease-out;',
        '    transform-origin: center center;',
        '    will-change: opacity, background-color;',
        '    border-radius: var(--radius);',
        '  }',
        '',
        '  /* Variant: outline */',
        '  [data-slot="button"][data-variant="outline"] {',
        '    transform: scale(1);',
        '    opacity: 1;',
        '  }',
        '  [data-slot="button"][data-variant="outline"]:hover:not(:disabled) {',
        '    opacity: 0.9;',
        '  }',
        '  [data-slot="button"][data-variant="outline"]:focus-visible:not(:disabled) {',
        '    transform: scale(1);',
        '    box-shadow: 0 0 0 2px var(--ring);',
        '    opacity: 0.95;',
        '  }',
        '  [data-slot="button"][data-variant="outline"]:active:not(:disabled) {',
        '    box-shadow: inset 0 1px 2px rgba(0,0,0,.05);',
        '    opacity: .7;',
        '  }',
        '  [data-slot="button"][data-variant="outline"]:disabled {',
        '    transform: scale(1);',
        '    opacity: .5;',
        '  }',
        '}'
      ].join('\n');
      if (!buttonAnimationOnly) return base;
      return [
        base,
        '',
        '/* Theme button animations (from preset) */',
        '@layer components {',
        buttonAnimationOnly,
        '}'
      ].join('\n');
    })();

    // globals.css entry that imports categories
    const globalsCss = [
      '/* globals.css – entry + base resets */',
      '@import "tailwindcss";',
      '@layer base, components, utilities;',
      '',
      '/* Ordered imports (tokens before consumers) */',
      '@import "./style-categories/colors.css";',
      '@import "./style-categories/typography.css";',
      '@import "./style-categories/shadow.css";',
      '@import "./style-categories/layout.css";',
      '@import "./style-categories/components.css";',
      '@import "./style-categories/buttons.css";',
      '',
      '/* Base resets */',
      '@layer base {',
      '  * { @apply border-border; }',
      '  html { @apply antialiased; text-rendering: optimizeLegibility; }',
      '  body { @apply bg-background text-foreground; font-family: var(--font-sans); }',
      '  ::selection {',
      '    background-color: color-mix(in oklch, var(--primary) 18%, transparent);',
      '    color: var(--foreground);',
      '  }',
      '',
      '  h1,h2,h3,h4 { @apply text-balance; }',
      '  p { @apply leading-7; }',
      '  p + p { @apply mt-4; }',
      '',
      '  :is(button,[role="button"],input,select,textarea,a,summary):focus-visible {',
      '    outline: none;',
      '    box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);',
      '    border-radius: var(--radius);',
      '  }',
      '',
      '  :root { color-scheme: light; }',
      '  .dark, [data-theme="dark"] { color-scheme: dark; }',
      '}',
      '',
      '/* Motion safety */',
      '@media (prefers-reduced-motion: reduce) {',
      '  :root { scroll-behavior: auto; }',
      '  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }',
      '}'
    ].join('\n');

    // Build a comprehensive theme-colors.ts for shader usage (hex constants)
    const foundationsPairs: Array<[string,string]> = [];
    brand.colors.forEach(tok => {
      try { foundationsPairs.push([tok.variableName, formatHex(tok.oklch as string)]); } catch {}
    });
    const foundationsObj = Object.fromEntries(foundationsPairs);

    // Resolve semantic roles from themeCssVariables -> base token hex
    const roleKeys = Object.keys(brand.themeCssVariables || {});
    const roleToHex: Record<string,string> = {};
    const stepSuffixes = ['-bright','-brighter','-dark','-darker'];
    const extractVarName = (v?: string) => {
      if (!v) return undefined;
      const m = v.match(/var\(--([a-z0-9_-]+)\)/i);
      if (!m) return undefined;
      let name = m[1];
      for (const suf of stepSuffixes) if (name.endsWith(suf)) { name = name.slice(0, -suf.length); break; }
      return name;
    };
    roleKeys.forEach(k => {
      const ref = (brand.themeCssVariables as any)[k] as string | undefined;
      const varName = extractVarName(ref);
      if (!varName) return;
      const tok = brand.colors.find(c => c.variableName === varName);
      if (!tok) return;
      try { roleToHex[k] = formatHex(tok.oklch as string); } catch {}
    });

    const roleLines = Object.entries(roleToHex).map(([k,v]) => `  "${k}": "${v}"`).join(',\n');
    const foundationLines = Object.entries(foundationsObj).map(([k,v]) => `  "${k}": "${v}"`).join(',\n');

    const themeColorsTs = `// Auto-generated by Nextgen Export\n// Foundations: every brand token in HEX\n// Roles: semantic theme variables resolved to HEX from foundations\nexport const FOUNDATIONS = {\n${foundationLines}\n} as const;\n\nexport const ROLES = {\n${roleLines}\n} as const;\n\nexport const THEME_COLORS = {\n  background: ROLES.background ?? "#0b0b0b",\n  primary: ROLES.primary ?? "#7c3aed",\n  secondary: ROLES.secondary ?? "#1f2937",\n  accent: ROLES.accent ?? "#14b8a6",\n  foreground: ROLES.foreground ?? "#fafafa"\n} as const;\n\nexport const SHADER_COLORS = [\n  THEME_COLORS.background,\n  THEME_COLORS.primary,\n  THEME_COLORS.secondary,\n  THEME_COLORS.accent,\n  THEME_COLORS.foreground\n] as const;\n\nexport default THEME_COLORS;\n`;

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

    // Generate load-fonts.tsx content based on active theme fonts
    const primaryName = (family?: string) => {
      if (!family) return '';
      const first = family.split(',')[0].trim();
      return first.replace(/^['\"]/g, '').replace(/['\"]/g, '');
    };
    const googleImportMap: Record<string, string> = {
      'Inter': 'Inter',
      'Orbitron': 'Orbitron',
      'Fira Code': 'Fira_Code',
      'Roboto Mono': 'Roboto_Mono',
      'Tomorrow': 'Tomorrow',
      'Exo 2': 'Exo_2',
      'Manrope': 'Manrope',
      'Space Grotesk': 'Space_Grotesk',
      'Noto Sans': 'Noto_Sans',
      'Noto Serif': 'Noto_Serif',
      'Nunito Sans': 'Nunito_Sans',
      'Open Sans': 'Open_Sans',
      'PT Serif': 'PT_Serif',
      'PT Sans': 'PT_Sans',
      'Source Code Pro': 'Source_Code_Pro',
      'Source Sans 3': 'Source_Sans_3',
      'DM Sans': 'DM_Sans',
      'DM Serif Display': 'DM_Serif_Display',
      'Poppins': 'Poppins',
      'Lato': 'Lato',
      'Montserrat': 'Montserrat',
      'Work Sans': 'Work_Sans',
      'IBM Plex Mono': 'IBM_Plex_Mono',
      'IBM Plex Sans': 'IBM_Plex_Sans',
      'JetBrains Mono': 'JetBrains_Mono'
    };
    const guessGoogleImportName = (fam: string): string => {
      if (googleImportMap[fam]) return googleImportMap[fam];
      const candidate = fam.replace(/\s+/g, '_').replace(/[^A-Za-z0-9_]/g, '');
      return candidate || 'Inter';
    };
    const findFontByAnyRole = (roleNames: string[]): FontToken | undefined => {
      for (const r of roleNames) {
        const f = brand.fonts.find(ff => (ff.roles || []).includes(r));
        if (f) return f;
      }
      return undefined;
    };
    const headingOwner = findFontByAnyRole(['heading','display','h1','h2','h3','h4','h5','h6']) || resolveFontForRole('heading') || resolveFontForRole('display') || resolveFontForRole('body');
    const bodyOwner = findFontByAnyRole(['body','sans','default','p']) || resolveFontForRole('body') || resolveFontForRole('sans') || brand.fonts[0];
    const monoOwner = findFontByAnyRole(['mono','code']) || resolveFontForRole('mono') || resolveFontForRole('code') || bodyOwner;
    const owners = [
      { key: 'heading', owner: headingOwner, cssVar: '--font-heading' },
      { key: 'body', owner: bodyOwner, cssVar: '--font-body' },
      { key: 'mono', owner: monoOwner, cssVar: '--font-mono' }
    ];
    const imports: Array<{ importName: string; varName: string; weights: string[]; roleKey: string; cssVar: string }> = [];
    const allowedWeightsOverrides: Record<string, string[]> = {
      Orbitron: ['400','500','700','900'],
      Inter: ['100','200','300','400','500','600','700','800','900'],
      Fira_Code: ['300','400','500','600','700'],
      Roboto_Mono: ['100','200','300','400','500','600','700'],
      Exo_2: ['100','200','300','400','500','600','700','800','900'],
      Tomorrow: ['100','200','300','400','500','600','700','800','900'],
      Manrope: ['200','300','400','500','600','700','800'],
      Space_Grotesk: ['300','400','500','600','700'],
      JetBrains_Mono: ['100','200','300','400','500','600','700','800']
    };
    owners.forEach(({ key, owner, cssVar }) => {
      const famName = primaryName(owner?.family || '');
      const importName = guessGoogleImportName(famName);
      const varName = `${key}Font`;
      let weights = owner && owner.weights ? Array.from(new Set(Object.values(owner.weights)
        .filter(v => typeof v === 'number') as number[])).sort((a,b)=>a-b).map(n => String(n)) : ['400'];
      const allowed = allowedWeightsOverrides[importName];
      if (allowed) weights = weights.filter(w => allowed.includes(w));
      if (weights.length === 0) weights = allowed ?? ['400'];
      imports.push({ importName, varName, weights, roleKey: key, cssVar });
    });
    const uniqueImports = Array.from(new Map(imports.map(i => [i.importName, i])).keys());
    const importLine = `import { ${uniqueImports.join(', ')} } from "next/font/google";`;
    const instanceLines = imports.map(i => `const ${i.varName} = ${i.importName}({\n  subsets: ["latin"],\n  weight: [${i.weights.map(w=>`"${w}"`).join(', ')}],\n  variable: "${i.cssVar}",\n});`).join('\n\n');
    const exportMap = `export const fonts = {\n  heading: ${imports.find(i=>i.roleKey==='heading')!.varName}.variable,\n  body: ${imports.find(i=>i.roleKey==='body')!.varName}.variable,\n  mono: ${imports.find(i=>i.roleKey==='mono')!.varName}.variable\n};`;
    const htmlClass = `export const htmlClassName = \`${imports.map(i => `\${${i.varName}.variable}`).join(' ')}\`;`;
    const loadFontsTsx = `${importLine}\n\n${instanceLines}\n\n${exportMap}\n\n${htmlClass}\n`;

    // Build Nextgen Command JSON to create globals.css and load-fonts.tsx
    const unique = `${activeThemeKey}-${Date.now()}`;
    const fileNode = (name: string, code: string) => ({
      _key: `node-${unique}-${name}`,
      _type: 'treeNode',
      id: `node-${unique}-${Math.random().toString(36).slice(2)}`,
      name,
      code,
      children: [] as any[]
    });
    const nextgenCommandObj = {
      _id: 'file-content-command',
      _type: 'command',
      title: 'File Content Command',
      slug: { _type: 'slug', current: 'file-content-command' },
      filePaths: [
        {
          _key: `group-${unique}-style-categories`,
          _type: 'filePathGroup',
          id: `group-${unique}-cats`,
          path: 'app\\styles\\style-categories',
          nodes: [
            fileNode('buttons.css', buttonsCss),
            fileNode('layout.css', layoutCss),
            fileNode('components.css', componentsCss),
            fileNode('colors.css', colorsCss),
            fileNode('shadow.css', shadowCss),
            fileNode('typography.css', typographyCss)
          ]
        },
        {
          _key: `group-${unique}-styles`,
          _type: 'filePathGroup',
          id: `group-${unique}-styles-root`,
          path: 'app\\styles',
          nodes: [
            fileNode('globals.css', globalsCss),
            fileNode('theme-colors.ts', themeColorsTs)
          ]
        },
        {
          _key: `group-${unique}-app-root`,
          _type: 'filePathGroup',
          id: `group-${unique}-app-root`,
          path: 'app',
          nodes: [
            fileNode('load-fonts.tsx', loadFontsTsx)
          ]
        }
      ]
    } as const;
    const nextgenCommand = JSON.stringify(nextgenCommandObj, null, 2);

    return { css: fullCss, jsonConfig: JSON.stringify(jsonConfig, null, 2), tailwindConfig, nextgenCommand };
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
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground">Nextgen Command</h3>
            <p className="text-xs text-muted-foreground">
              Generate files for <span className="font-medium text-foreground">{getThemeDisplayName(activeThemeKey)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            variant={includeAnimations ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIncludeAnimations(v => !v)}
            className="h-7 px-2.5 text-xs"
          >
            {includeAnimations ? "Animations: On" : "Animations: Off"}
          </Button>
          <Button
            variant={scopedTypography ? "secondary" : "outline"}
            size="sm"
            onClick={() => setScopedTypography(v => !v)}
            className="h-7 px-2.5 text-xs"
          >
            {scopedTypography ? "Scoped Typography" : "Global Typography"}
          </Button>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-[10px] h-4 px-1">Creates</Badge>
            <code className="bg-muted px-1 rounded">app/styles/globals.css</code>
            <span>+</span>
            <code className="bg-muted px-1 rounded">app/styles/style-categories/*.css</code>
            <span>+</span>
            <code className="bg-muted px-1 rounded">app/styles/theme-colors.ts</code>
            <span>+</span>
            <code className="bg-muted px-1 rounded">app/load-fonts.tsx</code>
          </div>
        </CardContent>
      </Card>

      {/* Nextgen Command Preview */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Package className="w-3 h-3" />
            Nextgen Command JSON
            <Badge variant="outline" className="text-xs">Preview</Badge>
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
                  {activeThemeKey}-nextgen-command.json
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                <Badge variant="outline" className="text-xs h-4 px-1">Command</Badge>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-64 overflow-auto bg-slate-950">
              <pre className="p-3 text-xs leading-relaxed">
                <code className="text-slate-300 whitespace-pre-wrap font-mono">
                  {exports.nextgenCommand}
                </code>
              </pre>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Footer */}
        <CardContent className="pt-4">
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">1</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs">Copy the command JSON</h4>
                <p className="text-xs text-muted-foreground">Use the button below to copy it to your clipboard</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">2</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs">Import into Nextgen</h4>
                <p className="text-xs text-muted-foreground">Run this command JSON in the Nextgen app to generate files</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(exports.nextgenCommand, 'nextgen')}
              className="h-8 px-3 text-xs flex-1"
            >
              {copiedItems.nextgen ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
              Copy JSON
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(exports.nextgenCommand, `${activeThemeKey}-nextgen-command.json`, 'application/json')}
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
