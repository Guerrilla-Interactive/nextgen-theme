/**
 * Animation presets for different theme styles
 */

export { neoBrutalismAnimationPreset } from './neo-brutalism';
export { modernAnimationPreset } from './modern';
export { playfulAnimationPreset } from './playful';
export { minimalAnimationPreset } from './minimal';
export { glowingBorderAnimationPreset } from './glowing-border';

// Re-export the AnimationPreset type from brand-utils
export type { AnimationPreset } from '../brand-utils';

/**
 * Available animation presets
 */
export const animationPresets = {
  'neo-brutalism': () => import('./neo-brutalism').then(m => m.neoBrutalismAnimationPreset),
  'modern': () => import('./modern').then(m => m.modernAnimationPreset),
  'playful': () => import('./playful').then(m => m.playfulAnimationPreset),
  'minimal': () => import('./minimal').then(m => m.minimalAnimationPreset),
  'glowing-border': () => import('./glowing-border').then(m => m.glowingBorderAnimationPreset)
} as const;

export type AnimationPresetName = keyof typeof animationPresets; 