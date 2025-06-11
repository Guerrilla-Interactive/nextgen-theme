/**
 * Brand Design Tokens
 * --------------------------------
 * This file centralises **all** brand‑level design tokens so that they can be
 * consumed consistently throughout both frontend and design‑system packages.
 *
 *  ▸ **Strictly typed** — every token follows an explicit TypeScript interface.
 *  ▸ **JSDoc documented** — hover in your IDE for instant context hints.
 *  ▸ **Single source of truth** — change it here, propagate everywhere.
 *
 * ### How to use
 * ```ts
 * import nextgenBrand from "@brand/nextgen";
 * console.log(nextgenBrand.colors[0].hex); // ➜ "#FF9500"
 * ```
 */

import { nextgenBrand } from "./themes/nextgen.theme";
import { razerBrand } from "./themes/razer.theme";
import { neoBrutalismBrand } from "./themes/neo-brutalism.theme";
import { type Brand, influenceHierarchy } from "./brand-utils";
import { marvelBrand } from "./themes/marvel.theme";
import { violetSkyBrand } from "./themes/violet-sky.theme";
import { summerBrand } from "./themes/summer.theme";
import { nintendoBrand } from "./themes/nintendo.theme";
import { ikeaBrand } from "./themes/ikea.theme";
import { gucciBrand } from "./themes/gucci.theme";
import { fordBrand } from './themes/ford.theme';
import { peachParfaitBrand } from "./themes/peach.theme";
import { cyberPulseBrand } from "./themes/cyberpulse.theme";
import { primaryPlayBrand } from "./themes/primaryplay.theme";
import { monochromeClarityBrand } from "./themes/monochromeclarity.theme";
import { sageMeadowBrand } from "./themes/sagemeadow.theme";
import { elegantLuxuryBrand } from "./themes/elegant-luxury.theme";
import { terracottaOrchidBrand } from "./themes/terracota.theme";
import { violetAbyssBrand } from "./themes/violet-abyss.theme";
import { lilacDaylightBrand } from "./themes/lilac-daylight.theme";
import { vercelMinimalBrand } from "./themes/vercel.theme";


// All original type definitions (Role, NumericShadeLevel, FunctionalShadeKey, ShadeKey, Shade, ColorToken, FontToken, 
// Personality, StyleGuide, BusinessDetails, Brand, ThemeCssVars) 
// and consts (influenceHierarchy, oklchLightnessScale) 
// and the createColorToken and generateBrandColors functions 
// have been moved to brand-utils.ts. 
// Specific brand objects (appleBrand, vercelBrand, nextgenBrand) are now in their respective .theme.ts files.
// This file now only imports them and re-exports.

export { influenceHierarchy }; // Re-export if needed by other parts of the app directly from here

export const themes: Record<string, Brand> = {
  nextgen: nextgenBrand,
  
  "neo-brutalism": neoBrutalismBrand,
  "marvel": marvelBrand,
  "violet-sky": violetSkyBrand,
  "summer": summerBrand,
  "razer": razerBrand,
  "nintendo": nintendoBrand,
  "ikea": ikeaBrand,
  "gucci": gucciBrand,
  "ford": fordBrand,
  "peach": peachParfaitBrand,
  "cyberPulse": cyberPulseBrand,
  "primaryPlay": primaryPlayBrand,
  "monochromeClarity": monochromeClarityBrand,
  "sageMeadow": sageMeadowBrand,
  "elegantLuxury": elegantLuxuryBrand,
  "terracotta": terracottaOrchidBrand,
  "violetAbyss": violetAbyssBrand,
  "lilacDaylight": lilacDaylightBrand,
  "vercel": vercelMinimalBrand
  
};

// Update the default export if necessary, or page.tsx will pick a default from 'themes'
export default nextgenBrand; // Keep nextgen as the default for now if something imports it directly

export const ALL_BRANDS = [
  nextgenBrand,
  gucciBrand,
  ikeaBrand,
  marvelBrand,
  neoBrutalismBrand,
  nintendoBrand,
  razerBrand,
  summerBrand,
  violetSkyBrand,
  fordBrand,
  peachParfaitBrand,
  cyberPulseBrand,
  primaryPlayBrand,
  monochromeClarityBrand,
  sageMeadowBrand,
  elegantLuxuryBrand,
  terracottaOrchidBrand,
    violetAbyssBrand,
  lilacDaylightBrand

].sort((a, b) => a.name.localeCompare(b.name));
  