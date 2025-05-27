'use client';

import { 
  createContext, 
  useContext, 
  useReducer, 
  ReactNode, 
  Dispatch,
  useCallback,
  useEffect
} from 'react';
import { ThemeJSON, initialTheme } from './ThemeTypes';
import { 
  createStepOrder, 
  getNextStep, 
  getPreviousStep,
  getVisibleSteps
} from '../utils/StepOrderManager';
import {
  captureStateValues,
  preserveStateValues,
  logStateComparison
} from '../utils/StepOrderPreserver';

// Define all possible wizard steps
export type WizardStep = 
  | 'welcome' 
  | 'brandGuide' 
  | 'logo' 
  | 'colours' 
  | 'fonts' 
  | 'businessQuestion' 
  | 'icons' 
  | 'review';

// Define user path options
export type WizardPath = 'A' | 'B' | null;

// Step configuration
export interface StepConfig {
  id: WizardStep;
  title: string;
  description: string;
  isApplicable: (state: WizardState) => boolean;
  canNavigateNext: (state: WizardState) => boolean;
  order?: number; // Optional order hint for dynamic step ordering
}

// Define the core state interface
export interface WizardState {
  // Current step and navigation
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  visitedSteps: WizardStep[];
  
  // Step history for chronological navigation
  stepHistory: WizardStep[];
  
  // Path selection
  path: WizardPath;
  
  // Asset selection tracking
  hasLogo: boolean;
  hasColours: boolean;
  hasFonts: boolean;
  hasBrandGuide: boolean;
  
  // Dynamic steps based on selections
  availableSteps: WizardStep[];
  stepSequence: WizardStep[]; // Chronological sequence for navigation
  
  // Theme data for preview
  themeData: ThemeJSON;
}

// Actions that can be dispatched to modify state
export type WizardAction = 
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'JUMP_TO_STEP'; payload: WizardStep }
  | { type: 'SET_PATH'; payload: WizardPath }
  | { type: 'SET_HAS_LOGO'; payload: boolean }
  | { type: 'SET_HAS_COLOURS'; payload: boolean }
  | { type: 'SET_HAS_FONTS'; payload: boolean }
  | { type: 'SET_HAS_BRAND_GUIDE'; payload: boolean }
  | { type: 'COMPLETE_STEP'; payload: WizardStep }
  | { type: 'UNCOMPLETE_STEP'; payload: WizardStep }
  | { type: 'CALCULATE_AVAILABLE_STEPS' }
  | { type: 'UPDATE_THEME'; payload: Partial<ThemeJSON> }
  | { type: 'RESET' };

// Initial state
const initialState: WizardState = {
  currentStep: 'welcome',
  completedSteps: [],
  visitedSteps: ['welcome'],
  stepHistory: ['welcome'],
  path: null,
  hasLogo: false,
  hasColours: false,
  hasFonts: false,
  hasBrandGuide: false,
  availableSteps: ['welcome'],
  stepSequence: ['welcome'],
  themeData: initialTheme
};

// Step configurations with conditions for when they apply
export const stepConfigs: Record<WizardStep, StepConfig> = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    description: 'Choose how you want to create your theme',
    isApplicable: () => true, // Always shown
    canNavigateNext: () => true, // Always can proceed since we'll handle path in the component
    order: 0
  },
  brandGuide: {
    id: 'brandGuide',
    title: 'Brand Guide',
    description: 'Upload your brand guide for automatic parsing',
    // Only applicable if user selected they have a brand guide
    isApplicable: (state) => state.hasBrandGuide,
    canNavigateNext: () => true, // Always can proceed (we'll add validation later)
    order: 1 // First step after welcome if applicable
  },
  logo: {
    id: 'logo',
    title: 'Logo',
    description: 'Upload your logo or create a new one',
    // Only applicable if user selected they have a logo
    isApplicable: (state) => state.hasLogo,
    canNavigateNext: () => true,
    order: 2 // After brand guide if applicable
  },
  colours: {
    id: 'colours',
    title: 'Colours',
    description: 'Select your brand colours',
    // Always show colors step regardless of user selections
    isApplicable: () => true,
    canNavigateNext: () => true,
    order: 3 // Order will be dynamically adjusted based on hasColours
  },
  fonts: {
    id: 'fonts',
    title: 'Fonts',
    description: 'Choose your typography',
    // Always show fonts step regardless of user selections
    isApplicable: () => true,
    canNavigateNext: () => true,
    order: 4 // Order will be dynamically adjusted based on hasFonts
  },
  businessQuestion: {
    id: 'businessQuestion',
    title: 'Business Context',
    description: 'Tell us about your business to guide AI generation',
    // Always applicable regardless of path or selections
    isApplicable: () => true,
    canNavigateNext: () => true,
    order: 5 // Order will be dynamically adjusted
  },
  icons: {
    id: 'icons',
    title: 'Icons',
    description: 'Select an icon set for your theme',
    isApplicable: () => true, // Always shown
    canNavigateNext: () => true,
    order: 6 // Order will be dynamically adjusted based on whether user has icons
  },
  review: {
    id: 'review',
    title: 'Review & Export',
    description: 'Review your theme and export the JSON',
    isApplicable: () => true, // Always shown as final step
    canNavigateNext: () => true,
    order: 7
  }
};

// Replace the old step ordering functions with the new ones
const getOptimizedStepOrder = (state: WizardState): WizardStep[] => {
  return createStepOrder(state);
};

// Build a chronological sequence for steps based on the optimized step order
const buildStepSequence = (availableSteps: WizardStep[]): WizardStep[] => {
  // For navigation, we need a fixed chronological order once the path is selected
  // This ensures users can navigate back and forth in a predictable sequence
  return [...availableSteps];
};

// Calculate available steps based on current state
const calculateAvailableSteps = (state: WizardState): { 
  availableSteps: WizardStep[],
  stepSequence: WizardStep[]
} => {
  const availableSteps = createStepOrder(state);
  const stepSequence = buildStepSequence(availableSteps);
  
  return { availableSteps, stepSequence };
};

// Update visited steps when changing current step
const updateVisitedSteps = (
  visitedSteps: WizardStep[], 
  newStep: WizardStep
): WizardStep[] => {
  return visitedSteps.includes(newStep) 
    ? visitedSteps 
    : [...visitedSteps, newStep];
};

// Update step history when navigating
const updateStepHistory = (
  history: WizardStep[],
  currentStep: WizardStep,
  newStep: WizardStep,
  isBackNavigation: boolean
): WizardStep[] => {
  // When going back, don't add to history
  if (isBackNavigation) {
    return history;
  }
  
  // When going forward, add current step to history if it's not already the last item
  if (history[history.length - 1] !== currentStep) {
    return [...history, currentStep];
  }
  
  return history;
};

// Find the next available step from current position (chronological order)
const findNextStep = (state: WizardState): WizardStep | null => {
  return getNextStep(state);
};

// Find the previous available step from current position (chronological order)
const findPreviousStep = (state: WizardState): WizardStep | null => {
  return getPreviousStep(state);
};

// Reducer function to handle state transitions
const wizardReducer = (state: WizardState, action: WizardAction): WizardState => {
  // First, save the current asset values before any state changes
  const originalAssetValues = {
    hasBrandGuide: state.hasBrandGuide,
    hasLogo: state.hasLogo,
    hasColours: state.hasColours,
    hasFonts: state.hasFonts,
    path: state.path
  };
  
  // Log the action and current state values (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log(`WizardReducer - Processing action: ${action.type}`, {
      currentValues: originalAssetValues,
      action
    });
  }
  
  // Process the action with the standard reducer logic
  let updatedState: WizardState;
  
  switch (action.type) {
    case 'NEXT_STEP': {
      // Capture the current state values before navigation
      const stateValuesBeforeNav = captureStateValues(state);
      
      // Find the next step in the sequence
      const nextStep = findNextStep(state);
      if (!nextStep) return state;
      
      // Log state before navigation (development only)
      if (process.env.NODE_ENV === 'development') {
        console.log(`NEXT_STEP - ${state.currentStep} → ${nextStep}`);
      }
      
      // Add current step to history when moving forward and mark it as completed
      const updatedHistory = [...state.stepHistory];
      if (updatedHistory[updatedHistory.length - 1] !== state.currentStep) {
        updatedHistory.push(state.currentStep);
      }
      
      // Add current step to completed steps if not already there
      const updatedCompletedSteps = [...state.completedSteps];
      if (!updatedCompletedSteps.includes(state.currentStep)) {
        updatedCompletedSteps.push(state.currentStep);
      }
      
      // Create the new state with preserved values
      updatedState = {
        ...state,
        currentStep: nextStep,
        visitedSteps: updateVisitedSteps(state.visitedSteps, nextStep),
        stepHistory: updatedHistory,
        completedSteps: updatedCompletedSteps
      };
      
      // Ensure we preserve the state values from before navigation
      updatedState = preserveStateValues(updatedState, stateValuesBeforeNav);
      
      // Log state comparison (development only)
      if (process.env.NODE_ENV === 'development') {
        logStateComparison('NEXT_STEP', stateValuesBeforeNav, updatedState);
      }
      
      break;
    }
    
    case 'PREVIOUS_STEP': {
      // Capture the current state values before navigation
      const stateValuesBeforeNav = captureStateValues(state);
      
      // Find the previous step in the sequence
      const previousStep = findPreviousStep(state);
      if (!previousStep) return state;
      
      // Log state before navigation (development only)
      if (process.env.NODE_ENV === 'development') {
        console.log(`PREVIOUS_STEP - ${state.currentStep} → ${previousStep}`);
      }
      
      // Create the new state with preserved values
      updatedState = {
        ...state,
        currentStep: previousStep
      };
      
      // Ensure we preserve the state values from before navigation
      updatedState = preserveStateValues(updatedState, stateValuesBeforeNav);
      
      // Log state comparison (development only)
      if (process.env.NODE_ENV === 'development') {
        logStateComparison('PREVIOUS_STEP', stateValuesBeforeNav, updatedState);
      }
      
      break;
    }
    
    case 'JUMP_TO_STEP': {
      // Only allow jumping to available steps
      if (!state.availableSteps.includes(action.payload)) {
        console.warn(`Cannot jump to step ${action.payload} - not available in current state`);
        return state;
      }
      
      // Capture state values before navigation to preserve them
      const stateValuesBeforeNav = captureStateValues(state);
      
      // Log the current state values before the jump
      if (process.env.NODE_ENV === 'development') {
        console.log(`JUMP_TO_STEP - ${state.currentStep} → ${action.payload}`, {
          hasLogo: state.hasLogo,
          hasColours: state.hasColours,
          hasFonts: state.hasFonts,
          hasBrandGuide: state.hasBrandGuide
        });
      }
      
      // Determine if this is a backward navigation
      const currentIndex = state.stepSequence.indexOf(state.currentStep);
      const targetIndex = state.stepSequence.indexOf(action.payload);
      const isBackNavigation = targetIndex < currentIndex;
      
      // If jumping back, truncate history to the target step
      let newHistory = [...state.stepHistory];
      if (isBackNavigation) {
        const targetHistoryIndex = newHistory.indexOf(action.payload);
        if (targetHistoryIndex >= 0) {
          newHistory = newHistory.slice(0, targetHistoryIndex + 1);
        } else {
          // If target step is not in history, add it
          newHistory.push(action.payload);
        }
      } else {
        // If jumping forward, add current step to history
        newHistory = updateStepHistory(newHistory, state.currentStep, action.payload, false);
      }
      
      // Create the new state, preserving all asset values
      updatedState = {
        ...state,
        currentStep: action.payload,
        visitedSteps: updateVisitedSteps(state.visitedSteps, action.payload),
        stepHistory: newHistory
      };
      
      // Preserve the captured state values
      updatedState = preserveStateValues(updatedState, stateValuesBeforeNav);
      
      // Verify the step sequence is correct after the jump
      const { availableSteps, stepSequence } = calculateAvailableSteps(updatedState);
      updatedState = {
        ...updatedState,
        availableSteps,
        stepSequence
      };
      
      // Log the final state after all updates
      if (process.env.NODE_ENV === 'development') {
        console.log('JUMP_TO_STEP - Final state:', {
          hasLogo: updatedState.hasLogo,
          hasColours: updatedState.hasColours,
          hasFonts: updatedState.hasFonts,
          hasBrandGuide: updatedState.hasBrandGuide,
          sequence: getVisibleSteps(updatedState).join(' → '),
          coloursPosition: getVisibleSteps(updatedState).indexOf('colours') + 1
        });
      }
      
      break;
    }
    
    case 'SET_PATH': {
      updatedState = {
        ...state,
        path: action.payload
      };
      
      // Recalculate available steps and sequence when path changes
      const { availableSteps, stepSequence } = calculateAvailableSteps(updatedState);
      
      updatedState = {
        ...updatedState,
        availableSteps,
        stepSequence,
        // Update theme metadata source based on path
        themeData: {
          ...updatedState.themeData,
          metadata: {
            ...updatedState.themeData.metadata,
            source: action.payload === 'A' ? 'brandGuide' : 'manual'
          }
        }
      };
      
      break;
    }
    
    case 'SET_HAS_LOGO': {
      updatedState = {
        ...state,
        hasLogo: action.payload
      };
      
      // Recalculate available steps and sequence when selections change
      const { availableSteps, stepSequence } = calculateAvailableSteps(updatedState);
      
      updatedState = {
        ...updatedState,
        availableSteps,
        stepSequence
      };
      
      break;
    }
    
    case 'SET_HAS_COLOURS': {
      updatedState = {
        ...state,
        hasColours: action.payload
      };
      
      // Recalculate available steps and sequence when selections change
      const { availableSteps, stepSequence } = calculateAvailableSteps(updatedState);
      
      // In development, log changes to help debug
      if (process.env.NODE_ENV === 'development') {
        console.log(`WizardStateContext - SET_HAS_COLOURS to ${action.payload}`, {
          before: getVisibleSteps(state).join(' → '),
          after: getVisibleSteps(updatedState).join(' → '),
          coloursBefore: getVisibleSteps(state).indexOf('colours') + 1,
          coloursAfter: getVisibleSteps(updatedState).indexOf('colours') + 1
        });
      }
      
      updatedState = {
        ...updatedState,
        availableSteps,
        stepSequence
      };
      
      break;
    }
    
    case 'SET_HAS_FONTS': {
      updatedState = {
        ...state,
        hasFonts: action.payload
      };
      
      // Recalculate available steps and sequence when selections change
      const { availableSteps, stepSequence } = calculateAvailableSteps(updatedState);
      
      updatedState = {
        ...updatedState,
        availableSteps,
        stepSequence
      };
      
      break;
    }
    
    case 'SET_HAS_BRAND_GUIDE': {
      updatedState = {
        ...state,
        hasBrandGuide: action.payload
      };
      
      // Recalculate available steps and sequence when selections change
      const { availableSteps, stepSequence } = calculateAvailableSteps(updatedState);
      
      updatedState = {
        ...updatedState,
        availableSteps,
        stepSequence
      };
      
      break;
    }
    
    case 'COMPLETE_STEP': {
      if (state.completedSteps.includes(action.payload)) return state;
      
      updatedState = {
        ...state,
        completedSteps: [...state.completedSteps, action.payload]
      };
      
      break;
    }
    
    case 'UNCOMPLETE_STEP': {
      updatedState = {
        ...state,
        completedSteps: state.completedSteps.filter(step => step !== action.payload)
      };
      
      break;
    }
    
    case 'CALCULATE_AVAILABLE_STEPS': {
      const { availableSteps, stepSequence } = calculateAvailableSteps(state);
      
      updatedState = {
        ...state,
        availableSteps,
        stepSequence
      };
      
      break;
    }
    
    case 'UPDATE_THEME': {
      updatedState = {
        ...state,
        themeData: {
          ...state.themeData,
          ...action.payload
        }
      };
      
      break;
    }
    
    case 'RESET': {
      return initialState;
    }
    
    default:
      return state;
  }
  
  // Now ensure asset values are preserved for actions that don't explicitly handle state preservation
  // Navigation and step completion actions handle their own preservation, so exclude them
  const assetChangingActions = [
    'SET_HAS_LOGO',
    'SET_HAS_COLOURS',
    'SET_HAS_FONTS',
    'SET_HAS_BRAND_GUIDE',
    'SET_PATH',
    'RESET',
    // Add navigation actions since they handle their own preservation
    'NEXT_STEP',
    'PREVIOUS_STEP', 
    'JUMP_TO_STEP',
    // Add step completion actions since they shouldn't modify asset values
    'COMPLETE_STEP',
    'UNCOMPLETE_STEP'
  ];
  
  if (!assetChangingActions.includes(action.type)) {
    updatedState = {
      ...updatedState,
      hasLogo: originalAssetValues.hasLogo,
      hasColours: originalAssetValues.hasColours,
      hasFonts: originalAssetValues.hasFonts,
      hasBrandGuide: originalAssetValues.hasBrandGuide,
      path: originalAssetValues.path
    };
    
    // Log the state preservation (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log(`WizardReducer - Preserving asset values after ${action.type}`, {
        preserved: {
          hasLogo: originalAssetValues.hasLogo,
          hasColours: originalAssetValues.hasColours, 
          hasFonts: originalAssetValues.hasFonts,
          hasBrandGuide: originalAssetValues.hasBrandGuide
        }
      });
    }
  }
  
  return updatedState;
};

// Create context
type WizardContextType = {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

// Provider component
export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  
  // State consistency enforcer - watches for specific state inconsistencies
  useEffect(() => {
    // Only run this in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    // Only check once a path is selected
    if (state.path === null) return;
    
    // Check for potential step sequence inconsistencies
    const visibleSteps = getVisibleSteps(state);
    const colorIndex = visibleSteps.indexOf('colours');
    const businessIndex = visibleSteps.indexOf('businessQuestion');
    
    // Only check if both steps are present
    if (colorIndex !== -1 && businessIndex !== -1) {
      const isColorBeforeBusiness = colorIndex < businessIndex;
      
      // Detect inconsistency: Color should be before business if hasColours is true
      if (state.hasColours && !isColorBeforeBusiness) {
        console.error('STATE CONSISTENCY ERROR: Colors state (true) doesn\'t match step position (after business)');
        console.log('Fixing inconsistent state...');
        
        // Force step recalculation
        setTimeout(() => {
          dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
        }, 0);
      }
      
      // Detect inconsistency: Color should be after business if hasColours is false
      if (!state.hasColours && isColorBeforeBusiness) {
        console.error('STATE CONSISTENCY ERROR: Colors state (false) doesn\'t match step position (before business)');
        console.log('Fixing inconsistent state...');
        
        // Force step recalculation
        setTimeout(() => {
          dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
        }, 0);
      }
    }
    
    // Also check font position consistency
    const fontIndex = visibleSteps.indexOf('fonts');
    if (fontIndex !== -1 && businessIndex !== -1) {
      const isFontBeforeBusiness = fontIndex < businessIndex;
      
      // Detect inconsistency: Font should be before business if hasFonts is true
      if (state.hasFonts && !isFontBeforeBusiness) {
        console.error('STATE CONSISTENCY ERROR: Fonts state (true) doesn\'t match step position (after business)');
        console.log('Fixing inconsistent state...');
        
        // Force step recalculation
        setTimeout(() => {
          dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
        }, 0);
      }
      
      // Detect inconsistency: Font should be after business if hasFonts is false
      if (!state.hasFonts && isFontBeforeBusiness) {
        console.error('STATE CONSISTENCY ERROR: Fonts state (false) doesn\'t match step position (before business)');
        console.log('Fixing inconsistent state...');
        
        // Force step recalculation
        setTimeout(() => {
          dispatch({ type: 'CALCULATE_AVAILABLE_STEPS' });
        }, 0);
      }
    }
  }, [state.currentStep, state.hasColours, state.hasFonts, state.path]);
  
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

// Custom hook for consuming the context
export function useWizardState() {
  const context = useContext(WizardContext);
  
  if (context === undefined) {
    throw new Error('useWizardState must be used within a WizardProvider');
  }
  
  return context;
} 