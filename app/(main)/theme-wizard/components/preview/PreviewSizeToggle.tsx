'use client';

import React from 'react';

type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'full';

interface PreviewSizeToggleProps {
  currentSize: ViewportSize;
  onChange: (size: ViewportSize) => void;
}

export default function PreviewSizeToggle({ currentSize, onChange }: PreviewSizeToggleProps) {
  // Size options with labels and icons
  const sizeOptions: Array<{ id: ViewportSize; label: string; icon: React.ReactNode; width: string }> = [
    {
      id: 'mobile',
      label: 'Mobile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" />
        </svg>
      ),
      width: '375px'
    },
    {
      id: 'tablet',
      label: 'Tablet',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" />
        </svg>
      ),
      width: '768px'
    },
    {
      id: 'desktop',
      label: 'Desktop',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      width: '1024px'
    },
    {
      id: 'full',
      label: 'Full Width',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
          <polyline points="8 9 12 5 16 9" />
          <line x1="12" y1="5" x2="12" y2="19" />
        </svg>
      ),
      width: '100%'
    }
  ];
  
  return (
    <div className="preview-size-toggle mb-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-gray-500">Preview Size</h4>
        <div className="flex space-x-1 border border-gray-200 rounded-md overflow-hidden">
          {sizeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`
                flex items-center px-2 py-1 text-xs 
                ${currentSize === option.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
                }
                ${option.id === 'mobile' ? 'rounded-l-md' : ''}
                ${option.id === 'full' ? 'rounded-r-md' : ''}
              `}
              aria-label={`Switch to ${option.label} view`}
              title={`${option.label} (${option.width})`}
            >
              {option.icon}
              <span className="ml-1 hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-1 text-right">
        {sizeOptions.find(option => option.id === currentSize)?.width}
      </div>
    </div>
  );
} 