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
import { nextgenLightBrand } from "./themes/nextgen-light.theme";
import { razerBrand } from "./themes/razer.theme";
import { defaultTheme } from "./themes/default.theme";
import { neoBrutalismBrand } from "./themes/neo-brutalism.theme";
import { darkBrutalismBrand } from "./themes/dark-brutalism.theme";

import { type Brand, influenceHierarchy } from "./brand-utils";

import { violetSkyBrand } from "./themes/violet-sky.theme";
import { cosmicDuskBrand } from "./themes/cosmic-dusk.theme";
import { summerBrand } from "./themes/summer.theme";
import { sunsetGlowBrand } from "./themes/sunset-glow.theme";

import { peachParfaitBrand } from "./themes/peach.theme";
import { cyberPulseBrand } from "./themes/cyberpulse.theme";
import { cyberLightBrand } from "./themes/cyber-light.theme";
import { sageMeadowBrand } from "./themes/sagemeadow.theme";
import { forestDuskTheme } from "./themes/forest-dusk.theme";
import { elegantLuxuryBrand } from "./themes/elegant-luxury.theme";
import { opulentMidnightBrand } from "./themes/opulent-midnight.theme";

import { lilacDaylightBrand } from "./themes/lilac-daylight.theme";
import { vercelMinimalBrand } from "./themes/vercel.theme";
import { vercelDarkBrand } from "./themes/vercel-dark.theme";

import { sageMinimalBrand } from "./themes/sage-minimal.theme";
import { sageShadowBrand } from "./themes/sage-shadow.theme";
import { twitterXTheme } from "./themes/twitter-x.theme";
import { twitterXDarkTheme } from "./themes/twitter-x-dark.theme";
import { rosePurpleTheme } from "./themes/rose-purple.theme";
import { midnightRoseTheme } from "./themes/midnight-rose.theme";
import { cocaColaBrand } from "./themes/coke-theme";
import { ikeaBrand } from "./themes/ikea-theme";


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
  "nextgen-light": nextgenLightBrand,
  "neo-brutalism": neoBrutalismBrand,
  "dark-brutalism": darkBrutalismBrand,
  "violet-sky": violetSkyBrand,
  "cosmic-dusk": cosmicDuskBrand,
  "summer": summerBrand,
  "sunset-glow": sunsetGlowBrand,
  "razer": razerBrand,
  "peach": peachParfaitBrand,
  "cyberPulse": cyberPulseBrand,
  "cyber-light": cyberLightBrand,
  "sageMeadow": sageMeadowBrand,
  "forest-dusk": forestDuskTheme,
  "elegantLuxury": elegantLuxuryBrand,
  "opulent-midnight": opulentMidnightBrand,
  "lilacDaylight": lilacDaylightBrand,
  "vercel": vercelMinimalBrand,
  "vercel-dark": vercelDarkBrand,
  "sageMinimal": sageMinimalBrand,
  "sage-shadow": sageShadowBrand,
  "twitter-x": twitterXTheme,
  "twitter-x-dark": twitterXDarkTheme,
  "rose-purple": rosePurpleTheme,
  "midnight-rose": midnightRoseTheme,
  "coke": cocaColaBrand,
  "ikea": ikeaBrand,
  
};

// Update the default export if necessary, or page.tsx will pick a default from 'themes'
export default nextgenBrand; // Keep nextgen as the default for now if something imports it directly

export const ALL_BRANDS = [
  nextgenBrand,
  nextgenLightBrand,
  neoBrutalismBrand,
  darkBrutalismBrand,
  razerBrand,
  summerBrand,
  sunsetGlowBrand,
  violetSkyBrand,
  cosmicDuskBrand,
  peachParfaitBrand,
  cyberPulseBrand,
  cyberLightBrand,
  sageMeadowBrand,
  forestDuskTheme,
  elegantLuxuryBrand,
  opulentMidnightBrand,
  lilacDaylightBrand,
  sageMinimalBrand,
  sageShadowBrand,
  twitterXTheme,
  twitterXDarkTheme,
  rosePurpleTheme,
  midnightRoseTheme,
  vercelMinimalBrand,
  vercelDarkBrand,
  cocaColaBrand,
  ikeaBrand,

].sort((a, b) => a.name.localeCompare(b.name));
  