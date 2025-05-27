'use client';

import { useLocalStorage } from './useLocalStorage';
import { ThemeJSON, initialTheme } from '../context/ThemeTypes';
import { WizardStep } from '../context/WizardStateContext';
import { useCallback } from 'react';

// Interface for a saved theme
export interface SavedTheme {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  data: ThemeJSON;
}

// Interface for wizard progress
export interface WizardProgress {
  currentThemeId: string | null;
  currentStep: WizardStep;
  path: 'A' | 'B' | null;
  hasLogo: boolean;
  hasColours: boolean;
  hasFonts: boolean;
  hasBrandGuide: boolean;
  completedSteps: WizardStep[];
  visitedSteps: WizardStep[];
}

// Initial progress state
const initialProgress: WizardProgress = {
  currentThemeId: null,
  currentStep: 'welcome',
  path: null,
  hasLogo: false,
  hasColours: false,
  hasFonts: false,
  hasBrandGuide: false,
  completedSteps: [],
  visitedSteps: ['welcome']
};

/**
 * Custom hook for managing theme data and wizard progress
 * @returns Functions and state for theme management
 */
export function useThemeStorage() {
  // Storage for saved themes
  const [savedThemes, setSavedThemes] = useLocalStorage<SavedTheme[]>(
    'theme-wizard-themes', 
    []
  );
  
  // Storage for wizard progress
  const [wizardProgress, setWizardProgress] = useLocalStorage<WizardProgress>(
    'theme-wizard-progress',
    initialProgress
  );
  
  /**
   * Save a theme to storage
   * @param theme Theme data to save
   * @param name Optional name for the theme
   * @returns ID of the saved theme
   */
  const saveTheme = useCallback((theme: ThemeJSON, name: string = 'Untitled Theme'): string => {
    // If theme is empty or has no modifications, don't save
    if (!theme || !Object.keys(theme).length) {
      return wizardProgress.currentThemeId || '';
    }
    
    const now = new Date().toISOString();
    const id = wizardProgress.currentThemeId || `theme-${Date.now()}`;
    
    // Check if theme already exists
    const existingIndex = savedThemes.findIndex(t => t.id === id);
    
    if (existingIndex >= 0) {
      // Update existing theme
      const updatedThemes = [...savedThemes];
      updatedThemes[existingIndex] = {
        ...updatedThemes[existingIndex],
        name,
        updatedAt: now,
        data: theme
      };
      setSavedThemes(updatedThemes);
    } else {
      // Create new theme
      setSavedThemes([
        ...savedThemes,
        {
          id,
          name,
          createdAt: now,
          updatedAt: now,
          data: theme
        }
      ]);
    }
    
    // Update wizard progress with current theme ID if needed
    if (wizardProgress.currentThemeId !== id) {
      setWizardProgress({
        ...wizardProgress,
        currentThemeId: id
      });
    }
    
    return id;
  }, [savedThemes, setSavedThemes, wizardProgress, setWizardProgress]);
  
  /**
   * Get a theme by ID
   * @param id Theme ID
   * @returns Theme data or null if not found
   */
  const getTheme = useCallback((id: string): ThemeJSON | null => {
    const theme = savedThemes.find(t => t.id === id);
    return theme ? theme.data : null;
  }, [savedThemes]);
  
  /**
   * Get the current theme being edited
   * @returns Current theme data or initialTheme if none
   */
  const getCurrentTheme = useCallback((): ThemeJSON => {
    if (!wizardProgress.currentThemeId) return initialTheme;
    return getTheme(wizardProgress.currentThemeId) || initialTheme;
  }, [wizardProgress.currentThemeId, getTheme]);
  
  /**
   * Delete a theme by ID
   * @param id Theme ID to delete
   */
  const deleteTheme = useCallback((id: string): void => {
    setSavedThemes(savedThemes.filter(t => t.id !== id));
    
    // Reset current theme if it's the one being deleted
    if (wizardProgress.currentThemeId === id) {
      setWizardProgress({
        ...wizardProgress,
        currentThemeId: null
      });
    }
  }, [savedThemes, setSavedThemes, wizardProgress, setWizardProgress]);
  
  /**
   * Update multiple progress properties at once
   * @param progress Partial progress object with properties to update
   */
  const updateWizardProgress = useCallback((progress: Partial<WizardProgress>): void => {
    // Don't update if no changes
    if (!progress || !Object.keys(progress).length) return;
    
    setWizardProgress(prevProgress => ({
      ...prevProgress,
      ...progress
    }));
  }, [setWizardProgress]);
  
  /**
   * Reset wizard progress to initial state
   */
  const resetWizardProgress = useCallback((): void => {
    setWizardProgress(initialProgress);
  }, [setWizardProgress]);
  
  /**
   * Start a new theme session
   */
  const startNewTheme = useCallback((): void => {
    // Keep the path and asset flags but reset steps and theme ID
    setWizardProgress(prevProgress => ({
      ...prevProgress,
      currentThemeId: null,
      currentStep: 'welcome',
      completedSteps: [],
      visitedSteps: ['welcome']
    }));
  }, [setWizardProgress]);
  
  // Utility methods
  const setCurrentStep = useCallback((step: WizardStep): void => {
    updateWizardProgress({ currentStep: step });
  }, [updateWizardProgress]);
  
  const completeStep = useCallback((step: WizardStep): void => {
    if (wizardProgress.completedSteps.includes(step)) return;
    
    updateWizardProgress({
      completedSteps: [...wizardProgress.completedSteps, step]
    });
  }, [wizardProgress.completedSteps, updateWizardProgress]);
  
  const uncompleteStep = useCallback((step: WizardStep): void => {
    updateWizardProgress({
      completedSteps: wizardProgress.completedSteps.filter(s => s !== step)
    });
  }, [wizardProgress.completedSteps, updateWizardProgress]);
  
  const setWizardPath = useCallback((path: 'A' | 'B' | null): void => {
    updateWizardProgress({ path });
  }, [updateWizardProgress]);
  
  const setHasLogo = useCallback((value: boolean): void => {
    updateWizardProgress({ hasLogo: value });
  }, [updateWizardProgress]);
  
  const setHasColours = useCallback((value: boolean): void => {
    updateWizardProgress({ hasColours: value });
  }, [updateWizardProgress]);
  
  const setHasFonts = useCallback((value: boolean): void => {
    updateWizardProgress({ hasFonts: value });
  }, [updateWizardProgress]);
  
  const setHasBrandGuide = useCallback((value: boolean): void => {
    updateWizardProgress({ hasBrandGuide: value });
  }, [updateWizardProgress]);
  
  return {
    // State
    savedThemes,
    wizardProgress,
    
    // Basic theme operations
    saveTheme,
    getTheme,
    getCurrentTheme,
    deleteTheme,
    
    // Progress operations
    setCurrentStep,
    completeStep,
    uncompleteStep,
    setWizardPath,
    setHasLogo,
    setHasColours,
    setHasFonts,
    setHasBrandGuide,
    updateWizardProgress,
    resetWizardProgress,
    startNewTheme
  };
} 