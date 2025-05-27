'use client';

import { useCallback } from 'react';
import { useWizardState, WizardStep, stepConfigs } from './WizardStateContext';
import { ThemeJSON } from './ThemeTypes';
import { getVisibleSteps, getNextStep, getPreviousStep } from '../utils/StepOrderManager';

interface WizardNavigation {
  // Navigation methods
  next: () => void;
  previous: () => void;
  jumpTo: (step: WizardStep) => void;
  reset: () => void;
  
  // Path selection
  setPath: (path: 'A' | 'B') => void;
  getPath: () => 'A' | 'B' | null;
  
  // Asset tracking
  setHasLogo: (value: boolean) => void;
  setHasColours: (value: boolean) => void;
  setHasFonts: (value: boolean) => void;
  setHasBrandGuide: (value: boolean) => void;
  
  // Asset state flags
  hasLogo: boolean;
  hasColours: boolean;
  hasFonts: boolean;
  hasBrandGuide: boolean;
  
  // Theme data management
  updateTheme: (data: Partial<ThemeJSON>) => void;
  getThemeData: () => ThemeJSON;
  
  // Step completion
  completeCurrentStep: () => void;
  uncompleteCurrentStep: () => void;
  completeStep: (step: WizardStep) => void;
  uncompleteStep: (step: WizardStep) => void;
  
  // Status checks
  canNavigateNext: () => boolean;
  canNavigatePrevious: () => boolean;
  canJumpTo: (step: WizardStep) => boolean;
  isStepAvailable: (step: WizardStep) => boolean;
  isStepCompleted: (step: WizardStep) => boolean;
  isStepCurrent: (step: WizardStep) => boolean;
  isStepVisited: (step: WizardStep) => boolean;
  
  // Get step information
  getProgress: () => number;
  getStepConfig: (step: WizardStep) => typeof stepConfigs[WizardStep];
  getAvailableSteps: () => WizardStep[];
  getCompletedSteps: () => WizardStep[];
  getVisitedSteps: () => WizardStep[];
  getCurrentStep: () => WizardStep;
  
  // Additional methods for history tracking
  getStepHistory: () => WizardStep[];
  canNavigateBack: () => boolean;
  canNavigateForward: () => boolean;
}

export function useWizardNavigation(): WizardNavigation {
  const { state, dispatch } = useWizardState();
  
  // Status checks
  const isStepAvailable = useCallback((step: WizardStep) => {
    // Check if the step is available based on the isApplicable function
    const config = stepConfigs[step];
    return config.isApplicable(state);
  }, [state]);
  
  const canNavigateNext = useCallback(() => {
    // First check if the current step config allows navigation
    const currentStepConfig = stepConfigs[state.currentStep];
    
    // Special case for the Business step - always allow next if we're on this step
    if (state.currentStep === 'businessQuestion') {
      return true; // We'll handle validation in the component itself
    }
    
    // Get the visible steps directly from the StepOrderManager
    const visibleSteps = getVisibleSteps(state);
    
    // Make sure we're not at the end of the sequence
    const currentIndex = visibleSteps.indexOf(state.currentStep);
    if (currentIndex === -1 || currentIndex === visibleSteps.length - 1) {
      return false;
    }
    
    return currentStepConfig.canNavigateNext(state);
  }, [state]);
  
  // Navigation methods
  const next = useCallback(() => {
    if (canNavigateNext()) {
      // Store current state values explicitly
      const stateValues = {
        hasBrandGuide: state.hasBrandGuide,
        hasLogo: state.hasLogo,
        hasColours: state.hasColours,
        hasFonts: state.hasFonts,
        path: state.path
      };
      
      if (process.env.NODE_ENV === 'development') {
        console.log("useWizardNavigation - next() called with state:", stateValues);
      }
      
      // Use NEXT_STEP action which handles step completion and navigation
      dispatch({ type: 'NEXT_STEP' });
      
      if (process.env.NODE_ENV === 'development') {
        // Verify state preservation after a short delay
        setTimeout(() => {
          const newStateValues = {
            hasBrandGuide: state.hasBrandGuide,
            hasLogo: state.hasLogo,
            hasColours: state.hasColours,
            hasFonts: state.hasFonts,
            path: state.path
          };
          
          const stateChanged = Object.keys(stateValues).some(
            key => stateValues[key as keyof typeof stateValues] !== newStateValues[key as keyof typeof newStateValues]
          );
          
          console.log("useWizardNavigation - after next():", {
            before: stateValues,
            after: newStateValues,
            changed: stateChanged
          });
        }, 50);
      }
    }
  }, [state, dispatch, canNavigateNext]);
  
  const previous = useCallback(() => {
    // Store current state values
    const stateValues = {
      hasBrandGuide: state.hasBrandGuide,
      hasLogo: state.hasLogo,
      hasColours: state.hasColours,
      hasFonts: state.hasFonts,
      path: state.path
    };
    
    // Log current state before navigation (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log("Navigation (Previous) - Current state:", {
        currentStep: state.currentStep,
        ...stateValues,
        sequence: getVisibleSteps(state).join(' → ')
      });
    }
    
    // Get the visible steps directly
    const visibleSteps = getVisibleSteps(state);
    const currentIndex = visibleSteps.indexOf(state.currentStep);
    
    // Only proceed if we're not at the first step
    if (currentIndex > 0) {
      // Get the previous step directly from the visible steps array
      const prevStep = visibleSteps[currentIndex - 1];
      
      // Log navigation target (development only)
      if (process.env.NODE_ENV === 'development') {
        console.log("Navigation (Previous) - Going to:", prevStep, {
          stateValues
        });
      }
      
      // Jump directly to the previous step using JUMP_TO_STEP
      // This action is already set up to preserve state values
      dispatch({ type: 'JUMP_TO_STEP', payload: prevStep });
      
      // Verify the state is preserved (development only)
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          const hasChanged = 
            state.hasBrandGuide !== stateValues.hasBrandGuide ||
            state.hasLogo !== stateValues.hasLogo ||
            state.hasColours !== stateValues.hasColours ||
            state.hasFonts !== stateValues.hasFonts;
            
          console.log("Navigation (Previous) - State after navigation:", {
            hasBrandGuide: state.hasBrandGuide, 
            hasLogo: state.hasLogo,
            hasColours: state.hasColours,
            hasFonts: state.hasFonts,
            currentStep: state.currentStep,
            preserved: !hasChanged,
            stateChanged: hasChanged ? "STATE VALUES CHANGED!" : "state preserved"
          });
        }, 50);
      }
    } else {
      console.warn('No previous step found in the current sequence');
    }
  }, [dispatch, state]);
  
  const jumpTo = useCallback((step: WizardStep) => {
    // Store current state values to preserve them
    const stateValues = {
      hasBrandGuide: state.hasBrandGuide,
      hasLogo: state.hasLogo,
      hasColours: state.hasColours,
      hasFonts: state.hasFonts,
      path: state.path
    };
    
    // Log current state before jump (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Navigation (Jump) - Going from ${state.currentStep} to ${step}:`, {
        currentValues: stateValues,
        sequence: getVisibleSteps(state).join(' → ')
      });
    }
    
    // Ensure the target step is in the visible steps
    const visibleSteps = getVisibleSteps(state);
    if (!visibleSteps.includes(step)) {
      console.warn(`Target step "${step}" is not in the visible steps sequence`);
      return;
    }
    
    // Dispatch the jump action
    dispatch({ type: 'JUMP_TO_STEP', payload: step });
    
    // Verify state preservation after navigation (development only)
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        const hasChanged = 
          state.hasBrandGuide !== stateValues.hasBrandGuide ||
          state.hasLogo !== stateValues.hasLogo ||
          state.hasColours !== stateValues.hasColours ||
          state.hasFonts !== stateValues.hasFonts;
          
        console.log(`Navigation (Jump) - After jump to ${step}:`, {
          hasBrandGuide: state.hasBrandGuide, 
          hasLogo: state.hasLogo,
          hasColours: state.hasColours,
          hasFonts: state.hasFonts,
          preserved: !hasChanged,
          stateChanged: hasChanged ? "STATE VALUES CHANGED!" : "state preserved",
          sequence: getVisibleSteps(state).join(' → ')
        });
      }, 50);
    }
  }, [dispatch, state]);
  
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);
  
  // Path selection
  const setPath = useCallback((path: 'A' | 'B') => {
    dispatch({ type: 'SET_PATH', payload: path });
    
    // Force recalculation after path change
    dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
  }, [dispatch]);
  
  const getPath = useCallback(() => {
    return state.path;
  }, [state.path]);
  
  // Asset tracking
  const setHasLogo = useCallback((value: boolean) => {
    dispatch({ type: 'SET_HAS_LOGO', payload: value });
    
    // Force recalculation after asset change
    dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
  }, [dispatch]);
  
  const setHasColours = useCallback((value: boolean) => {
    dispatch({ type: 'SET_HAS_COLOURS', payload: value });
    
    // Force recalculation after asset change
    dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
  }, [dispatch]);
  
  const setHasFonts = useCallback((value: boolean) => {
    dispatch({ type: 'SET_HAS_FONTS', payload: value });
    
    // Force recalculation after asset change
    dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
  }, [dispatch]);
  
  // Brand Guide tracking
  const setHasBrandGuide = useCallback((value: boolean) => {
    dispatch({ type: 'SET_HAS_BRAND_GUIDE', payload: value });
    
    // Force recalculation after asset change
    dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
  }, [dispatch]);
  
  // Theme data management
  const updateTheme = useCallback((data: Partial<ThemeJSON>) => {
    dispatch({ type: 'UPDATE_THEME', payload: data });
  }, [dispatch]);
  
  const getThemeData = useCallback(() => {
    return state.themeData;
  }, [state.themeData]);
  
  // Step completion
  const completeCurrentStep = useCallback(() => {
    dispatch({ type: 'COMPLETE_STEP', payload: state.currentStep });
  }, [dispatch, state.currentStep]);
  
  const uncompleteCurrentStep = useCallback(() => {
    dispatch({ type: 'UNCOMPLETE_STEP', payload: state.currentStep });
  }, [dispatch, state.currentStep]);
  
  const completeStep = useCallback((step: WizardStep) => {
    dispatch({ type: 'COMPLETE_STEP', payload: step });
  }, [dispatch]);
  
  const uncompleteStep = useCallback((step: WizardStep) => {
    dispatch({ type: 'UNCOMPLETE_STEP', payload: step });
  }, [dispatch]);
  
  // Status checks
  const canNavigatePrevious = useCallback(() => {
    // Get the visible steps directly from the StepOrderManager
    const visibleSteps = getVisibleSteps(state);
    
    // Check if we're at the beginning of the sequence
    const currentIndex = visibleSteps.indexOf(state.currentStep);
    return currentIndex > 0;
  }, [state]);
  
  const canJumpTo = useCallback((step: WizardStep) => {
    // Can only jump to available steps that have been visited
    return isStepAvailable(step) && state.visitedSteps.includes(step);
  }, [state.visitedSteps, isStepAvailable]);
  
  const isStepCompleted = useCallback((step: WizardStep) => {
    return state.completedSteps.includes(step);
  }, [state.completedSteps]);
  
  const isStepCurrent = useCallback((step: WizardStep) => {
    return state.currentStep === step;
  }, [state.currentStep]);
  
  const isStepVisited = useCallback((step: WizardStep) => {
    return state.visitedSteps.includes(step);
  }, [state.visitedSteps]);
  
  // Get step information
  const getProgress = useCallback(() => {
    const { availableSteps, completedSteps } = state;
    if (availableSteps.length === 0) return 0;
    return (completedSteps.length / availableSteps.length) * 100;
  }, [state.availableSteps, state.completedSteps]);
  
  const getStepConfig = useCallback((step: WizardStep) => {
    return stepConfigs[step];
  }, []);
  
  const getAvailableSteps = useCallback(() => {
    return state.availableSteps;
  }, [state.availableSteps]);
  
  const getCompletedSteps = useCallback(() => {
    return state.completedSteps;
  }, [state.completedSteps]);
  
  const getVisitedSteps = useCallback(() => {
    return state.visitedSteps;
  }, [state.visitedSteps]);
  
  const getCurrentStep = useCallback(() => {
    return state.currentStep;
  }, [state.currentStep]);
  
  // Additional methods for history tracking
  const getStepHistory = useCallback(() => {
    return state.stepHistory;
  }, [state.stepHistory]);
  
  const canNavigateBack = useCallback(() => {
    return state.stepHistory.length > 1;
  }, [state.stepHistory]);
  
  const canNavigateForward = useCallback(() => {
    const visibleSteps = getVisibleSteps(state);
    const currentIndex = visibleSteps.indexOf(state.currentStep);
    return currentIndex < visibleSteps.length - 1;
  }, [state.currentStep, state]);
  
  return {
    next,
    previous,
    jumpTo,
    reset,
    setPath,
    getPath,
    setHasLogo,
    setHasColours,
    setHasFonts,
    setHasBrandGuide,
    hasLogo: state.hasLogo,
    hasColours: state.hasColours,
    hasFonts: state.hasFonts,
    hasBrandGuide: state.hasBrandGuide,
    updateTheme,
    getThemeData,
    completeCurrentStep,
    uncompleteCurrentStep,
    completeStep,
    uncompleteStep,
    canNavigateNext,
    canNavigatePrevious,
    canJumpTo,
    isStepAvailable,
    isStepCompleted,
    isStepCurrent,
    isStepVisited,
    getProgress,
    getStepConfig,
    getAvailableSteps,
    getCompletedSteps,
    getVisitedSteps,
    getCurrentStep,
    getStepHistory,
    canNavigateBack,
    canNavigateForward
  };
} 