'use client';

import React, { useEffect } from 'react';

interface RegenerationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (regenerateColors: boolean, regenerateFonts: boolean) => void;
  hasExistingColors: boolean;
  hasExistingFonts: boolean;
}

export default function RegenerationDialog({
  isOpen,
  onClose,
  onConfirm,
  hasExistingColors,
  hasExistingFonts
}: RegenerationDialogProps) {
  const [regenerateColors, setRegenerateColors] = React.useState(true);
  const [regenerateFonts, setRegenerateFonts] = React.useState(true);
  
  // Reset checkboxes to checked state whenever dialog opens
  useEffect(() => {
    if (isOpen) {
      setRegenerateColors(true);
      setRegenerateFonts(true);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // If we don't have any existing data, no need to show checkboxes
  const showOptions = hasExistingColors || hasExistingFonts;
  
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Regenerate Theme Elements</h3>
        
        {showOptions ? (
          <>
            <p className="mb-4 text-gray-600">
              You already have some theme elements. Which would you like to regenerate?
            </p>
            
            <div className="space-y-3 mb-6">
              {hasExistingColors && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={regenerateColors}
                    onChange={(e) => setRegenerateColors(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Regenerate Colors</span>
                </label>
              )}
              
              {hasExistingFonts && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={regenerateFonts}
                    onChange={(e) => setRegenerateFonts(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Regenerate Fonts</span>
                </label>
              )}
            </div>
          </>
        ) : (
          <p className="mb-4 text-gray-600">
            This will generate new theme elements based on your business information.
          </p>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={() => {
              // If no options are shown, regenerate everything
              if (!showOptions) {
                onConfirm(true, true);
              } else {
                // Otherwise respect the user's choices
                onConfirm(regenerateColors, regenerateFonts);
              }
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
} 