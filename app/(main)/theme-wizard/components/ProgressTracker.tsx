'use client';

import React from 'react';
import { useWizardState, WizardStep, stepConfigs } from '../context/WizardStateContext';
import { useWizardNavigation } from '../context/useWizardNavigation';
import { getVisibleSteps } from '../utils/StepOrderManager';

export default function ProgressTracker() {
  const { state } = useWizardState();
  const { jumpTo, isStepCompleted, isStepCurrent, canJumpTo, isStepAvailable } = useWizardNavigation();
  
  // Get the visible steps in correct order
  const visibleSteps = getVisibleSteps(state);
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center">
        {visibleSteps.map((step, index) => {
          const isActive = isStepCurrent(step);
          const isCompleted = isStepCompleted(step);
          const canNavigate = canJumpTo(step);
          const isAvailable = isStepAvailable(step);
          const stepConfig = stepConfigs[step];
          
          // Skip steps that aren't applicable based on user selections
          if (!isAvailable) return null;
          
          return (
            <React.Fragment key={step}>
              {/* Step Button */}
              <button
                onClick={() => canNavigate && jumpTo(step)}
                disabled={!canNavigate}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mr-2
                  ${isActive ? 'bg-blue-500 text-white' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-700' : ''}
                  ${!canNavigate ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                aria-label={`Go to ${stepConfig.title} step`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              
              {/* Step Title */}
              <div className="mr-6 text-sm font-medium">
                <span className={`
                  ${isActive ? 'text-blue-600' : ''}
                  ${isCompleted ? 'text-green-600' : ''}
                  ${!isActive && !isCompleted ? 'text-gray-500' : ''}
                `}>
                  {stepConfig.title}
                </span>
              </div>
              
              {/* Connector Line (if not the last step) */}
              {index < visibleSteps.length - 1 && (
                <div className="flex-grow h-px bg-gray-200 mx-2 sm:mx-4" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
} 