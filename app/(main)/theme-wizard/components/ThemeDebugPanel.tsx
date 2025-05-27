'use client';

import React, { useState } from 'react';
import { useWizardNavigation } from '../context/useWizardNavigation';

export default function ThemeDebugPanel() {
  const { getThemeData } = useWizardNavigation();
  const [isOpen, setIsOpen] = useState(false);
  
  const theme = getThemeData();
  
  // Format JSON with syntax highlighting
  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };
  
  return (
    <div className="theme-debug-panel fixed bottom-0 right-0 w-full md:w-96 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-gray-800 text-white px-4 py-2 rounded-tl-md flex items-center justify-between w-full md:w-96"
      >
        <span>Theme JSON Preview</span>
        <span>{isOpen ? '▼' : '▲'}</span>
      </button>
      
      {isOpen && (
        <div className="bg-gray-800 text-white p-4 h-80 overflow-auto rounded-tl-md">
          <h3 className="text-lg font-medium mb-2">Current Theme Data</h3>
          <pre className="text-xs bg-gray-900 p-3 rounded overflow-auto max-h-64">
            <code className="text-green-400">
              {formatJSON(theme)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
} 