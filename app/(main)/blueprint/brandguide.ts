/**
 * Brand Design Tokens - Auto-discovery with rating priority
 * Works in Webpack/Next.js Pages Router (`require.context`)
 */
import { influenceHierarchy } from "./brand-utils";
import type { Brand } from "./themes/theme-types";
export { influenceHierarchy };

// Require all files in ./themes that match *.theme.ts or *-theme.ts
// @ts-ignore - Webpack's require.context exists in this environment
const context = (require as any).context("./themes", false, /(\.theme\.ts|-theme\.ts)$/);

const themes: Record<string, Brand> = {};

function isBrand(obj: unknown): obj is Brand {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return typeof o.name === "string" && Array.isArray(o.colors) && Array.isArray(o.fonts);
}

function slugFromFilename(filename: string): string {
  return filename
    .replace(/^.\//, "")
    .replace(/\.ts$/, "")
    .replace(/\.theme$/, "")
    .replace(/-theme$/, "");
}

context.keys().forEach((key) => {
  const mod = context(key);
  const candidate = mod.default ?? Object.values(mod)[0];
  if (isBrand(candidate)) {
    const slug = slugFromFilename(key);
    themes[slug] = candidate;
  } else {
    console.warn(`[brand] Skipped "${key}" — no valid Brand export.`);
  }
});

export { themes };

// Sort: rating DESC (missing = 0), then name ASC for stability
export const ALL_BRANDS: Brand[] = Object.values(themes).sort((a, b) => {
  const ra = a.rating ?? 0;
  const rb = b.rating ?? 0;
  return rb - ra || a.name.localeCompare(b.name);
});

// Default/start theme = highest rated; fallback to "nextgen", then "default", then first
const highestRated = ALL_BRANDS[0];
const defaultBrand =
  highestRated ??
  themes["nextgen"] ??
  themes["default"] ??
  (undefined as unknown as Brand);

export default defaultBrand;

// Optional helpers
export const ORDERED_THEME_SLUGS = Object.entries(themes)
  .sort(([, A], [, B]) => (B.rating ?? 0) - (A.rating ?? 0) || A.name.localeCompare(B.name))
  .map(([slug]) => slug);

export function getTopThemes(n = 5): Brand[] {
  return ALL_BRANDS.slice(0, n);
}
