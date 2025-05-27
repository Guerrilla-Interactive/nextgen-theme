'use client';

import React from 'react';
import { useWizardNavigation } from '../context/useWizardNavigation';
import { useWizardState, WizardStep } from '../context/WizardStateContext';
import { getVisibleSteps } from '../utils/StepOrderManager';

interface StepInfo {
  id: WizardStep;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  isClickable: boolean;
  isAvailable: boolean;
}

export default function ProgressIndicator() {
  const { state } = useWizardState();
  const { 
    getCurrentStep, 
    getPath, 
    getCompletedSteps, 
    jumpTo,
    isStepCompleted,
    isStepCurrent,
    isStepAvailable,
    canJumpTo
  } = useWizardNavigation();
  
  const currentStep = getCurrentStep();
  const path = getPath();
  const stepSequence = state.stepSequence;
  const completedSteps = getCompletedSteps();
  
  // Generate step list based on path and user selections
  const getStepList = (): StepInfo[] => {
    if (!path) return [];
    
    // Define all possible steps with user-friendly labels
    const stepLabels: Record<WizardStep, string> = {
      'welcome': 'Start',
      'brandGuide': 'Brand Guide',
      'logo': 'Logo',
      'colours': 'Colors',
      'fonts': 'Fonts',
      'businessQuestion': 'Business',
      'icons': 'Icons',
      'review': 'Review'
    };
    
    // Get the properly ordered steps
    const orderedSteps = getVisibleSteps(state);
    
    // Map to StepInfo objects
    return orderedSteps.map(step => ({
      id: step,
      label: stepLabels[step] || step,
      isCompleted: isStepCompleted(step),
      isActive: isStepCurrent(step),
      isClickable: canJumpTo(step),
      isAvailable: isStepAvailable(step)
    }));
  };
  
  const stepList = getStepList();
  
  // Only show progress indicator if a path is selected
  if (!path) return null;
  
  // Calculate overall progress percentage
  const calculateProgress = (): number => {
    if (path === null) return 0;
    
    // Get visible steps in correct order
    const visibleSteps = getVisibleSteps(state);
    if (visibleSteps.length <= 1) return 0;
    
    // Find the index of the current step
    const currentIndex = visibleSteps.indexOf(currentStep);
    if (currentIndex === -1) return 0;
    
    // Calculate progress based on position in the sequence
    return Math.floor((currentIndex / (visibleSteps.length - 1)) * 100);
  };
  
  const progress = calculateProgress();
  
  // Handle clicking on a step to navigate
  const handleStepClick = (step: WizardStep) => {
    if (canJumpTo(step)) {
      jumpTo(step);
    }
  };
  
  return (
    <div className="progress-indicator mb-8">
      <div className="hidden md:block"> {/* Desktop version */}
        <div className="steps-container flex relative mb-1">
          {/* Progress bar background */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
          
          {/* Progress bar fill */}
          <div 
            className="absolute top-5 left-0 h-1 bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
          
          {/* Steps */}
          {stepList.filter(step => step.isAvailable).map((step, index) => (
            <div 
              key={step.id}
              className={`step flex-1 flex flex-col items-center relative`}
            >
              {/* Step indicator dot */}
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={!step.isClickable}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${step.isActive 
                    ? 'bg-blue-500 text-white' 
                    : step.isCompleted 
                      ? 'bg-green-500 text-white cursor-pointer' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
                aria-label={`Step ${index + 1}: ${step.label}`}
              >
                {step.isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              
              {/* Step label */}
              <span className={`text-xs font-medium ${
                step.isActive ? 'text-blue-600' : 
                step.isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile version */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {stepSequence.filter(step => isStepAvailable(step)).indexOf(currentStep) + 1} of {stepSequence.filter(step => isStepAvailable(step)).length}
          </span>
          <span className="text-sm font-medium">
            {stepList.find(step => step.isActive)?.label || ''}
          </span>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
} 