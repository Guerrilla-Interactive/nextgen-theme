'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { 
  WizardProvider, 
  useWizardState, 
  WizardAction,
  WizardStep
} from './WizardStateContext';
import { useThemeStorage } from '../hooks/useThemeStorage';

// Props for the inner component
interface WizardStorageSyncProps {
  children: ReactNode;
}

// Inner component that needs access to both contexts
function WizardStorageSync({ children }: WizardStorageSyncProps) {
  const { state, dispatch } = useWizardState();
  const storage = useThemeStorage();
  
  // Track previous step and path to detect changes
  const prevStepRef = useRef<WizardStep>(state.currentStep);
  const prevPathRef = useRef<'A' | 'B' | null>(state.path);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize state from localStorage on first render
  useEffect(() => {
    // Only initialize if we're starting fresh (welcome screen)
    if (state.currentStep === 'welcome' && state.path === null) {
      const { wizardProgress } = storage;
      
      // Restore wizard state if we have saved progress
      if (wizardProgress.path !== null) {
        // Dispatch a batch of actions to restore the state
        dispatch({ 
          type: 'SET_PATH', 
          payload: wizardProgress.path 
        });
        
        // Restore asset flags
        dispatch({ 
          type: 'SET_HAS_LOGO', 
          payload: wizardProgress.hasLogo 
        });
        
        dispatch({ 
          type: 'SET_HAS_COLOURS', 
          payload: wizardProgress.hasColours 
        });
        
        dispatch({ 
          type: 'SET_HAS_FONTS', 
          payload: wizardProgress.hasFonts 
        });
        
        dispatch({ 
          type: 'SET_HAS_BRAND_GUIDE', 
          payload: wizardProgress.hasBrandGuide 
        });
        
        // Restore theme data
        const currentTheme = storage.getCurrentTheme();
        dispatch({
          type: 'UPDATE_THEME',
          payload: currentTheme
        });
        
        // Restore completed steps
        wizardProgress.completedSteps.forEach(step => {
          dispatch({ 
            type: 'COMPLETE_STEP', 
            payload: step 
          });
        });
        
        // Recalculate available steps based on restored state
        dispatch({
          type: 'CALCULATE_AVAILABLE_STEPS'
        });
        
        // Jump to current step (if not welcome)
        if (wizardProgress.currentStep !== 'welcome') {
          dispatch({ 
            type: 'JUMP_TO_STEP', 
            payload: wizardProgress.currentStep 
          });
        }
      }
    }
    
    // Cleanup function to handle any pending saves
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Save state changes to localStorage only when step or path changes
  useEffect(() => {
    // Don't save until user has selected a path
    if (state.path === null) {
      prevStepRef.current = state.currentStep;
      prevPathRef.current = state.path;
      return;
    }
    
    // Check if step or path has changed
    const stepChanged = prevStepRef.current !== state.currentStep;
    const pathChanged = prevPathRef.current !== state.path;
    
    // Update refs
    prevStepRef.current = state.currentStep;
    prevPathRef.current = state.path;
    
    // Debug logging for storage updates
    if (process.env.NODE_ENV === 'development' && (stepChanged || pathChanged)) {
      console.log('WizardStorageProvider - State change detected:', {
        stepChanged,
        pathChanged,
        currentStep: state.currentStep,
        hasBrandGuide: state.hasBrandGuide,
        hasLogo: state.hasLogo,
        hasColours: state.hasColours,
        hasFonts: state.hasFonts
      });
    }
    
    // Only save immediately when step or path changes
    if (stepChanged || pathChanged) {
      // Save the entire state when step changes
      storage.updateWizardProgress({
        currentStep: state.currentStep,
        path: state.path,
        hasLogo: state.hasLogo,
        hasColours: state.hasColours,
        hasFonts: state.hasFonts,
        hasBrandGuide: state.hasBrandGuide,
        completedSteps: state.completedSteps,
        visitedSteps: state.visitedSteps
      });
      
      // Save the theme data
      storage.saveTheme(state.themeData);
    }
  }, [
    state.currentStep,
    state.path,
    storage,
    state.hasLogo,
    state.hasColours,
    state.hasFonts,
    state.hasBrandGuide,
    state.completedSteps,
    state.visitedSteps,
    state.themeData
  ]);
  
  // Debounced save for other state changes (theme data, options, etc.)
  useEffect(() => {
    // Don't process if no path selected yet
    if (state.path === null) return;
    
    // Cancel any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set a new timeout to save state after a delay
    saveTimeoutRef.current = setTimeout(() => {
      // This will only run if no step/path changes have happened recently
      // Only save theme data on this debounced save to prevent duplicate writes
      storage.saveTheme(state.themeData);
    }, 1000);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.themeData, state.path, storage]);
  
  return <>{children}</>;
}

// Main provider component
interface WizardStorageProviderProps {
  children: ReactNode;
}

export default function WizardStorageProvider({ children }: WizardStorageProviderProps) {
  return (
    <WizardProvider>
      <WizardStorageSync>
        {children}
      </WizardStorageSync>
    </WizardProvider>
  );
} 