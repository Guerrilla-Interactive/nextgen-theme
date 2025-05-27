'use client';

import React, { useState } from 'react';
import { ThemeJSON } from '../../context/ThemeTypes';

interface JSONViewerProps {
  data: ThemeJSON;
}

export default function JSONViewer({ data }: JSONViewerProps) {
  const [copied, setCopied] = useState(false);
  
  // Format JSON for display
  const formattedJSON = JSON.stringify(data, null, 2);
  
  // Copy JSON to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJSON);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };
  
  return (
    <div className="json-viewer">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Theme JSON</h3>
        
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
          aria-label="Copy JSON to clipboard"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-72">
        <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
          {formattedJSON}
        </pre>
      </div>
      
      <p className="mt-3 text-xs text-gray-500">
        This JSON can be used to import your theme into your application.
      </p>
    </div>
  );
} 