'use client';

import React, { useState, useEffect } from 'react';
import { useWizardState } from '../context/WizardStateContext';
import { getVisibleSteps } from '../utils/StepOrderManager';

/**
 * This component helps diagnose step sequence and state preservation issues.
 * It shows real-time verification of state values and step ordering.
 * Only visible in development mode.
 */
export default function StepSequenceVerifier() {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') return null;
  
  const { state } = useWizardState();
  const [previousValues, setPreviousValues] = useState({
    hasLogo: state.hasLogo,
    hasColours: state.hasColours,
    hasFonts: state.hasFonts,
    hasBrandGuide: state.hasBrandGuide,
    stepSequence: getVisibleSteps(state)
  });
  
  const [hasChanged, setHasChanged] = useState({
    hasLogo: false,
    hasColours: false, 
    hasFonts: false,
    hasBrandGuide: false,
    stepSequence: false
  });
  
  // Track when values change
  useEffect(() => {
    const currentStepSequence = getVisibleSteps(state);
    const stepSequenceChanged = JSON.stringify(currentStepSequence) !== 
                                JSON.stringify(previousValues.stepSequence);
    
    setHasChanged({
      hasLogo: state.hasLogo !== previousValues.hasLogo,
      hasColours: state.hasColours !== previousValues.hasColours,
      hasFonts: state.hasFonts !== previousValues.hasFonts,
      hasBrandGuide: state.hasBrandGuide !== previousValues.hasBrandGuide,
      stepSequence: stepSequenceChanged
    });
    
    // Update previous values after noting changes
    setPreviousValues({
      hasLogo: state.hasLogo,
      hasColours: state.hasColours,
      hasFonts: state.hasFonts,
      hasBrandGuide: state.hasBrandGuide,
      stepSequence: currentStepSequence
    });
  }, [
    state.hasLogo, 
    state.hasColours, 
    state.hasFonts, 
    state.hasBrandGuide,
    state.currentStep
  ]);
  
  // Get colors position
  const stepSequence = getVisibleSteps(state);
  const colorsPosition = stepSequence.indexOf('colours') + 1;
  
  return (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-3 rounded-tl-lg text-xs z-50 max-w-xs">
      <div className="flex justify-between">
        <strong>Step Sequence Verifier</strong>
        <div>Step: {state.currentStep}</div>
      </div>
      
      <div className="mt-2 border-t border-gray-600 pt-2">
        <div className="grid grid-cols-2 gap-x-2">
          <div className={`${hasChanged.hasLogo ? 'text-red-400' : 'text-green-400'}`}>
            Logo: {state.hasLogo ? 'Yes' : 'No'}
          </div>
          <div className={`${hasChanged.hasColours ? 'text-red-400' : 'text-green-400'}`}>
            Colors: {state.hasColours ? 'Yes' : 'No'}
          </div>
          <div className={`${hasChanged.hasFonts ? 'text-red-400' : 'text-green-400'}`}>
            Fonts: {state.hasFonts ? 'Yes' : 'No'}
          </div>
          <div className={`${hasChanged.hasBrandGuide ? 'text-red-400' : 'text-green-400'}`}>
            Guide: {state.hasBrandGuide ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
      
      <div className="mt-2 border-t border-gray-600 pt-2">
        <div className={`${hasChanged.stepSequence ? 'text-red-400' : 'text-green-400'}`}>
          <strong>Colors Position: {colorsPosition}</strong>
        </div>
        <div className="text-xs mt-1 font-mono overflow-x-auto whitespace-nowrap">
          {stepSequence.map((step, index) => (
            <span key={step} className={`${step === state.currentStep ? 'bg-blue-900 px-1' : ''}`}>
              {step}{index < stepSequence.length - 1 ? ' → ' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 