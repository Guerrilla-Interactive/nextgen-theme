'use client';

import { WizardState, WizardStep, stepConfigs } from '../context/WizardStateContext';

/**
 * This utility manages the step ordering logic for the wizard.
 * It determines the correct chronological order of steps based on user selections.
 */

/**
 * Determines which steps should be available based on user selections
 */
export function getAvailableSteps(state: WizardState): WizardStep[] {
  // If no path is selected, only show the welcome step
  if (state.path === null) {
    return ['welcome'];
  }
  
  // Get all steps that are applicable based on their isApplicable function
  return Object.entries(stepConfigs)
    .filter(([_, config]) => config.isApplicable(state))
    .map(([id]) => id as WizardStep);
}

/**
 * Creates a prioritized order of steps based on user selections
 * 
 * Key rules:
 * 1. Welcome is always first
 * 2. Brand Guide and Logo come next if selected
 * 3. Colors/Fonts steps come BEFORE Business step if user HAS them
 * 4. Colors/Fonts steps come AFTER Business step if user DOESN'T have them
 * 5. Icons and Review are always last
 */
export function createStepOrder(state: WizardState): WizardStep[] {
  // If no path is selected, only show the welcome step
  if (state.path === null) {
    return ['welcome'];
  }
  
  // Create an ordered array of steps
  const orderedSteps: WizardStep[] = ['welcome'];
  
  if (process.env.NODE_ENV === 'development') {
    console.log("StepOrderManager - Creating step order with state:", {
      path: state.path,
      hasBrandGuide: state.hasBrandGuide,
      hasLogo: state.hasLogo,
      hasColours: state.hasColours,
      hasFonts: state.hasFonts,
      currentStep: state.currentStep
    });
  }
  
  // Add Brand Guide if selected
  if (state.hasBrandGuide) {
    orderedSteps.push('brandGuide');
  }
  
  // Add Logo if selected
  if (state.hasLogo) {
    orderedSteps.push('logo');
  }
  
  // To be extra safe, let's create arrays for before and after business steps
  const beforeBusinessSteps: WizardStep[] = [];
  const afterBusinessSteps: WizardStep[] = [];
  
  // Process Colors - make this very explicit and separate to avoid any ordering issues
  if (state.hasColours) {
    // If user has colors, add to BEFORE business
    beforeBusinessSteps.push('colours');
    if (process.env.NODE_ENV === 'development') {
      console.log("StepOrderManager - Adding colours BEFORE business (user has colours)");
    }
  } else {
    // If user doesn't have colors, add to AFTER business
    afterBusinessSteps.push('colours');
    if (process.env.NODE_ENV === 'development') {
      console.log("StepOrderManager - Adding colours AFTER business (user doesn't have colours)");
    }
  }
  
  // Process Fonts - make this very explicit and separate to avoid any ordering issues
  if (state.hasFonts) {
    // If user has fonts, add to BEFORE business
    beforeBusinessSteps.push('fonts');
    if (process.env.NODE_ENV === 'development') {
      console.log("StepOrderManager - Adding fonts BEFORE business (user has fonts)");
    }
  } else {
    // If user doesn't have fonts, add to AFTER business
    afterBusinessSteps.push('fonts');
    if (process.env.NODE_ENV === 'development') {
      console.log("StepOrderManager - Adding fonts AFTER business (user doesn't have fonts)");
    }
  }
  
  // Now add the before business steps
  orderedSteps.push(...beforeBusinessSteps);
  
  // Add Business step - this is the pivot point
  orderedSteps.push('businessQuestion');
  
  // Now add the after business steps
  orderedSteps.push(...afterBusinessSteps);
  
  // Add Icons and Review steps - always last
  orderedSteps.push('icons');
  orderedSteps.push('review');
  
  // Filter to only include steps that are applicable
  const availableSteps = getAvailableSteps(state);
  const finalSteps = orderedSteps.filter(step => availableSteps.includes(step));
  
  if (process.env.NODE_ENV === 'development') {
    // Double check colors position
    const colourIndex = finalSteps.indexOf('colours');
    const businessIndex = finalSteps.indexOf('businessQuestion');
    const isColorsBeforeBusiness = colourIndex < businessIndex;
    
    console.log(`StepOrderManager - Final colours position: ${colourIndex + 1} (hasColours=${state.hasColours})`);
    console.log(`StepOrderManager - Colors before business: ${isColorsBeforeBusiness} (expected: ${state.hasColours})`);
    console.log("StepOrderManager - Final step sequence:", finalSteps.join(' → '));
    
    // Verify that the positioning is correct based on hasColours flag
    if (state.hasColours && !isColorsBeforeBusiness && colourIndex !== -1 && businessIndex !== -1) {
      console.error("STEP ORDER ERROR: Colors should be BEFORE business when hasColours=true");
    } else if (!state.hasColours && isColorsBeforeBusiness && colourIndex !== -1 && businessIndex !== -1) {
      console.error("STEP ORDER ERROR: Colors should be AFTER business when hasColours=false");
    }
  }
  
  return finalSteps;
}

/**
 * Gets the next step in the sequence from the current step
 */
export function getNextStep(state: WizardState): WizardStep | null {
  const orderedSteps = getVisibleSteps(state);
  const currentIndex = orderedSteps.indexOf(state.currentStep);
  
  if (currentIndex >= 0 && currentIndex < orderedSteps.length - 1) {
    return orderedSteps[currentIndex + 1];
  }
  
  return null;
}

/**
 * Gets the previous step in the sequence from the current step
 */
export function getPreviousStep(state: WizardState): WizardStep | null {
  const orderedSteps = getVisibleSteps(state);
  const currentIndex = orderedSteps.indexOf(state.currentStep);
  
  if (currentIndex > 0) {
    return orderedSteps[currentIndex - 1];
  }
  
  return null;
}

/**
 * Checks if a step is applicable based on user selections
 */
export function isStepApplicable(state: WizardState, step: WizardStep): boolean {
  const config = stepConfigs[step];
  return config.isApplicable(state);
}

/**
 * Returns the visible steps (applicable and in order)
 */
export function getVisibleSteps(state: WizardState): WizardStep[] {
  return createStepOrder(state);
}

/**
 * Logs the current step sequence for debugging
 */
export function logStepSequence(state: WizardState): string {
  const steps = createStepOrder(state);
  return `Step Sequence: ${steps.join(' → ')}`;
} 