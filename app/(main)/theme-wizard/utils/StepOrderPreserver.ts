'use client';

import { WizardState } from '../context/WizardStateContext';

/**
 * This utility helps preserve state values during navigation between steps.
 * It provides functions to capture, verify, and restore state values to ensure
 * user selections are maintained.
 */

export interface StateValues {
  hasBrandGuide: boolean;
  hasLogo: boolean;
  hasColours: boolean;
  hasFonts: boolean;
  path: 'A' | 'B' | null;
}

/**
 * Captures the current state values that need to be preserved during navigation
 */
export function captureStateValues(state: WizardState): StateValues {
  return {
    hasBrandGuide: state.hasBrandGuide,
    hasLogo: state.hasLogo,
    hasColours: state.hasColours,
    hasFonts: state.hasFonts,
    path: state.path
  };
}

/**
 * Verifies if the state values have changed after navigation
 */
export function hasStateChanged(before: StateValues, after: WizardState): boolean {
  return (
    before.hasBrandGuide !== after.hasBrandGuide ||
    before.hasLogo !== after.hasLogo ||
    before.hasColours !== after.hasColours ||
    before.hasFonts !== after.hasFonts ||
    before.path !== after.path
  );
}

/**
 * Creates a new state object with preserved values from before navigation
 */
export function preserveStateValues<T extends WizardState>(state: T, values: StateValues): T {
  return {
    ...state,
    hasBrandGuide: values.hasBrandGuide,
    hasLogo: values.hasLogo,
    hasColours: values.hasColours,
    hasFonts: values.hasFonts,
    path: values.path
  };
}

/**
 * Logs state values before and after navigation (development only)
 */
export function logStateComparison(
  label: string,
  before: StateValues, 
  after: WizardState
): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  const changed = hasStateChanged(before, after);
  
  console.log(`StepOrderPreserver - ${label} ${changed ? '⚠️ CHANGED' : '✅ preserved'}:`, {
    before: {
      hasBrandGuide: before.hasBrandGuide,
      hasLogo: before.hasLogo,
      hasColours: before.hasColours,
      hasFonts: before.hasFonts
    },
    after: {
      hasBrandGuide: after.hasBrandGuide,
      hasLogo: after.hasLogo, 
      hasColours: after.hasColours,
      hasFonts: after.hasFonts
    },
    differences: changed ? {
      hasBrandGuide: before.hasBrandGuide !== after.hasBrandGuide,
      hasLogo: before.hasLogo !== after.hasLogo,
      hasColours: before.hasColours !== after.hasColours,
      hasFonts: before.hasFonts !== after.hasFonts
    } : 'No differences'
  });
} 