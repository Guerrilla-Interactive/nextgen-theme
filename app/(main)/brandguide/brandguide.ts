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
import { defaultTheme } from "./themes/default.theme";
import { neoBrutalismBrand } from "./themes/neo-brutalism.theme";
import { type Brand, influenceHierarchy } from "./brand-utils";

import { violetSkyBrand } from "./themes/violet-sky.theme";
import { summerBrand } from "./themes/summer.theme";


import { peachParfaitBrand } from "./themes/peach.theme";
import { cyberPulseBrand } from "./themes/cyberpulse.theme";


import { sageMeadowBrand } from "./themes/sagemeadow.theme";
import { elegantLuxuryBrand } from "./themes/elegant-luxury.theme";


import { lilacDaylightBrand } from "./themes/lilac-daylight.theme";
import { vercelMinimalBrand } from "./themes/vercel.theme";

import { sageMinimalBrand } from "./themes/sage-minimal.theme";
import { twitterXTheme } from "./themes/twitter-x.theme";
import { rosePurpleTheme } from "./themes/rose-purple.theme";

// All original type definitions (Role, NumericShadeLevel, FunctionalShadeKey, ShadeKey, Shade, ColorToken, FontToken, 
// Personality, StyleGuide, BusinessDetails, Brand, ThemeCssVars) 
// and consts (influenceHierarchy, oklchLightnessScale) 
// and the createColorToken and generateBrandColors functions 
// have been moved to brand-utils.ts. 
// Specific brand objects (appleBrand, vercelBrand, nextgenBrand) are now in their respective .theme.ts files.
// This file now only imports them and re-exports.

export { influenceHierarchy }; // Re-export if needed by other parts of the app directly from here

export const themes: Record<string, Brand> = {
  default: defaultTheme,
  nextgen: nextgenBrand,
  "neo-brutalism": neoBrutalismBrand,
  "violet-sky": violetSkyBrand,
  "summer": summerBrand,
  "razer": razerBrand,
  "peach": peachParfaitBrand,
  "cyberPulse": cyberPulseBrand,
  "sageMeadow": sageMeadowBrand,
  "elegantLuxury": elegantLuxuryBrand,
  "lilacDaylight": lilacDaylightBrand,
  "vercel": vercelMinimalBrand,
  "sageMinimal": sageMinimalBrand,
  "twitter-x": twitterXTheme,
  "rose-purple": rosePurpleTheme
};

// Update the default export if necessary, or page.tsx will pick a default from 'themes'
export default nextgenBrand; // Keep nextgen as the default for now if something imports it directly

export const ALL_BRANDS = [
  nextgenBrand,
  
  razerBrand,
  summerBrand,
  violetSkyBrand,
  
  peachParfaitBrand,
  cyberPulseBrand,
  
  sageMeadowBrand,
  elegantLuxuryBrand,
  
  lilacDaylightBrand,

  sageMinimalBrand,
  twitterXTheme,
  rosePurpleTheme

].sort((a, b) => a.name.localeCompare(b.name));
  