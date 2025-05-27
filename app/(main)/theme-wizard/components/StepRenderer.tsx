'use client';

import React from 'react';
import { useWizardState, WizardStep, stepConfigs } from '../context/WizardStateContext';
import { useWizardNavigation } from '../context/useWizardNavigation';
import { getVisibleSteps } from '../utils/StepOrderManager';

// Import step components directly (this fixes the linter errors)
import WelcomeStep from '../components/steps/WelcomeStep';
import BrandGuideStep from '../components/steps/BrandGuideStep';
import LogoStep from '../components/steps/LogoStep';
import ColoursStep from '../components/steps/ColoursStep';
import FontsStep from '../components/steps/FontsStep';
import BusinessQuestionStep from '../components/steps/BusinessQuestionStep';
import IconsStep from '../components/steps/IconsStep';
import ReviewStep from '../components/steps/ReviewStep';

// Step component mapping
const stepComponents: Record<WizardStep, React.ComponentType> = {
  welcome: WelcomeStep,
  brandGuide: BrandGuideStep,
  logo: LogoStep,
  colours: ColoursStep,
  fonts: FontsStep,
  businessQuestion: BusinessQuestionStep,
  icons: IconsStep,
  review: ReviewStep,
};

export default function StepRenderer() {
  const { state } = useWizardState();
  const { 
    next, 
    previous, 
    canNavigateNext, 
    canNavigatePrevious,
    completeCurrentStep,
    getStepHistory,
    isStepAvailable
  } = useWizardNavigation();
  
  // Get the current step config
  const currentStepConfig = stepConfigs[state.currentStep];
  const StepComponent = stepComponents[state.currentStep];
  
  // Handle next button click with validation
  const handleNext = () => {
    // Log current state values before navigation
    if (process.env.NODE_ENV === 'development') {
      console.log("StepRenderer - Before Next button navigation:", {
        hasBrandGuide: state.hasBrandGuide,
        hasLogo: state.hasLogo,
        hasColours: state.hasColours,
        hasFonts: state.hasFonts,
        currentStep: state.currentStep
      });
    }
    
    // Store the current state values before navigation
    const stateSnapshot = {
      hasBrandGuide: state.hasBrandGuide,
      hasLogo: state.hasLogo,
      hasColours: state.hasColours,
      hasFonts: state.hasFonts,
      path: state.path
    };
    
    // Proceed to the next step (navigation hook handles step completion)
    next();
    
    // Verify state values after navigation
    setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        const stateChanged = 
          stateSnapshot.hasBrandGuide !== state.hasBrandGuide ||
          stateSnapshot.hasLogo !== state.hasLogo ||
          stateSnapshot.hasColours !== state.hasColours ||
          stateSnapshot.hasFonts !== state.hasFonts;
        
        console.log("StepRenderer - After Next button navigation:", {
          hasBrandGuide: state.hasBrandGuide,
          hasLogo: state.hasLogo,
          hasColours: state.hasColours,
          hasFonts: state.hasFonts,
          currentStep: state.currentStep,
          stateChanged: stateChanged ? "STATE VALUES CHANGED!" : "state preserved"
        });
      }
    }, 100);
  };
  
  // Handle previous button click
  const handlePrevious = () => {
    // Log current state values before navigation
    if (process.env.NODE_ENV === 'development') {
      console.log("StepRenderer - Before Back button navigation:", {
        hasBrandGuide: state.hasBrandGuide,
        hasLogo: state.hasLogo,
        hasColours: state.hasColours,
        hasFonts: state.hasFonts,
        currentStep: state.currentStep
      });
    }
    
    // Store the current state values before navigation
    const stateSnapshot = {
      hasBrandGuide: state.hasBrandGuide,
      hasLogo: state.hasLogo,
      hasColours: state.hasColours,
      hasFonts: state.hasFonts,
      path: state.path
    };
    
    // Navigate to the previous step
    previous();
    
    // Verify state values after navigation
    setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        const stateChanged = 
          stateSnapshot.hasBrandGuide !== state.hasBrandGuide ||
          stateSnapshot.hasLogo !== state.hasLogo ||
          stateSnapshot.hasColours !== state.hasColours ||
          stateSnapshot.hasFonts !== state.hasFonts;
        
        console.log("StepRenderer - After Back button navigation:", {
          hasBrandGuide: state.hasBrandGuide,
          hasLogo: state.hasLogo,
          hasColours: state.hasColours,
          hasFonts: state.hasFonts,
          currentStep: state.currentStep,
          stateChanged: stateChanged ? "STATE VALUES CHANGED!" : "state preserved"
        });
      }
    }, 100);
  };
  
  // Display step history and sequence for debugging
  const stepHistory = getStepHistory();
  const visibleSteps = getVisibleSteps(state);
  
  // Determine if navigation buttons should be enabled
  const canGoNext = canNavigateNext();
  const canGoBack = canNavigatePrevious();
  

  return (
    <div className="flex flex-col h-full">
      {/* Step Header */}
      {/* <div className="mb-6">
        <h2 className="text-xl font-semibold">{currentStepConfig.title}</h2>
        <p className="text-gray-600 mt-1">{currentStepConfig.description}</p>
      </div>
       */}
      {/* Step Content */}
      <div className="flex-grow mb-8">
        <StepComponent />
      </div>
      
      {/* Debug info - can be removed in production */}
      
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={!canGoBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to previous step"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to next step"
          id="step-next-button"
        >
          {visibleSteps.indexOf(state.currentStep) === visibleSteps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
} 