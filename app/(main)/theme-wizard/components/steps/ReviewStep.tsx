'use client';

import React, { useState, useEffect } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';
import AIGenerationPanel from '../AIGenerationPanel';

// Add JSON syntax highlighting
const CodeBlock = ({ children }: { children: string }) => {
  return (
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
};

export default function ReviewStep() {
  const { 
    getThemeData, 
    completeCurrentStep, 
    previous, 
    next,
    reset
  } = useWizardNavigation();
  
  const theme = getThemeData();
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Mark step as completed once viewed
  useEffect(() => {
    completeCurrentStep();
  }, [completeCurrentStep]);
  
  // Determine what assets are missing
  const hasLogo = Boolean(theme.logo);
  const hasColors = theme.colours.length > 0;
  const hasFonts = Boolean(theme.fonts?.primary);
  const hasIcons = Boolean(theme.icons?.set);
  
  // Check if anything is missing
  const hasMissingElements = !hasLogo || !hasColors || !hasFonts || !hasIcons;
  
  // Generate list of missing elements
  const getMissingElementsList = () => {
    const missing = [];
    if (!hasLogo) missing.push('Logo');
    if (!hasColors) missing.push('Colors');
    if (!hasFonts) missing.push('Fonts');
    if (!hasIcons) missing.push('Icon Style');
    return missing;
  };
  
  // Download theme JSON
  const handleDownload = () => {
    const jsonString = JSON.stringify(theme, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Copy JSON to clipboard
  const handleCopyToClipboard = () => {
    const jsonString = JSON.stringify(theme, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
  };
  
  // Start a new theme
  const handleStartNew = () => {
    if (window.confirm('Are you sure you want to start a new theme? All current data will be lost.')) {
      reset();
    }
  };
  
  return (
    <div className="review-step-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Review Your Theme</h2>
        <p className="text-gray-600">
          Review your theme elements before finalizing. You can use AI to generate any missing elements.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('visual')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'visual'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Visual Preview
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'json'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              JSON Export
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'visual' ? (
        <>
          {/* Theme Summary */}
          <div className="theme-summary mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Theme Elements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Status */}
              <div className="element-status">
                <div className="flex items-center space-x-2">
                  <div className={`status-indicator w-3 h-3 rounded-full ${hasLogo ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <h4 className="font-medium">Logo</h4>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {hasLogo ? 'Logo uploaded' : 'No logo uploaded'}
                </p>
                {hasLogo && (
                  <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                    <img 
                      src={theme.logo!.src} 
                      alt={theme.logo!.alt} 
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                )}
              </div>
              
              {/* Colors Status */}
              <div className="element-status">
                <div className="flex items-center space-x-2">
                  <div className={`status-indicator w-3 h-3 rounded-full ${hasColors ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <h4 className="font-medium">Colors</h4>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {hasColors ? `${theme.colours.length} colors selected` : 'No colors selected'}
                </p>
                {hasColors && (
                  <>
                    <div className="mt-2 flex space-x-1">
                      {theme.colours.slice(0, 5).map((color, index) => (
                        <div key={`color-${index}`} className="color-swatch">
                          <div 
                            className="w-8 h-8 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                          <span className="text-xs mt-1 block text-center">{color}</span>
                        </div>
                      ))}
                    </div>
                    {theme.metadata?.colorExplanation && (
                      <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                        <p className="text-xs text-blue-700">{theme.metadata.colorExplanation}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Fonts Status */}
              <div className="element-status">
                <div className="flex items-center space-x-2">
                  <div className={`status-indicator w-3 h-3 rounded-full ${hasFonts ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <h4 className="font-medium">Typography</h4>
                </div>
                {hasFonts ? (
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">
                      Primary: <span style={{ fontFamily: theme.fonts!.primary }}>{theme.fonts!.primary}</span>
                    </p>
                    <div className="mt-1 p-2 bg-white rounded border border-gray-200">
                      <p style={{ fontFamily: theme.fonts!.primary, fontSize: '18px' }}>
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    {theme.fonts!.secondary && (
                      <>
                        <p className="text-sm text-gray-600 mt-2">
                          Secondary: <span style={{ fontFamily: theme.fonts!.secondary }}>{theme.fonts!.secondary}</span>
                        </p>
                        <div className="mt-1 p-2 bg-white rounded border border-gray-200">
                          <p style={{ fontFamily: theme.fonts!.secondary, fontSize: '14px' }}>
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                      </>
                    )}
                    {theme.metadata?.fontExplanation && (
                      <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                        <p className="text-xs text-blue-700">{theme.metadata.fontExplanation}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-600">No fonts selected</p>
                )}
              </div>
              
              {/* Icons Status */}
              <div className="element-status">
                <div className="flex items-center space-x-2">
                  <div className={`status-indicator w-3 h-3 rounded-full ${hasIcons ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <h4 className="font-medium">Icons</h4>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {hasIcons ? `Style: ${theme.icons!.set}` : 'No icon style selected'}
                </p>
                {hasIcons && (
                  <>
                    {theme.icons!.primaryColour && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-sm">Primary Color:</span>
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: theme.icons!.primaryColour }}
                          title={theme.icons!.primaryColour}
                        ></div>
                        <span className="text-xs">{theme.icons!.primaryColour}</span>
                      </div>
                    )}
                    {theme.metadata?.iconExplanation && (
                      <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                        <p className="text-xs text-blue-700">{theme.metadata.iconExplanation}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Missing Elements Section */}
          {hasMissingElements && (
            <div className="missing-elements mb-8 p-5 bg-amber-50 border border-amber-100 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-amber-800">Missing Elements</h3>
              <p className="mb-3 text-amber-700">
                Your theme is missing the following elements:
              </p>
              <ul className="list-disc list-inside mb-4 text-amber-700">
                {getMissingElementsList().map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
              <button
                onClick={() => setShowAIGenerator(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
              >
                Generate Missing Elements with AI
              </button>
            </div>
          )}
          
          {/* AI Generator Panel */}
          {showAIGenerator && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <AIGenerationPanel onClose={() => setShowAIGenerator(false)} />
              </div>
            </div>
          )}
          
          {/* Complete or Edit Options */}
          <div className="action-buttons mb-6">
            <h3 className="text-lg font-medium mb-3">Finalize Your Theme</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('json')}
                className="p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-medium text-green-700">Complete & Export Theme</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Finalize your theme and export the configuration
                  </p>
                </div>
              </button>
              
              {!hasMissingElements ? (
                <button
                  onClick={() => setShowAIGenerator(true)}
                  className="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h4 className="font-medium text-blue-700">Enhance with AI</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Use AI to generate alternative options based on your theme
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => previous()}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <h4 className="font-medium text-gray-700">Review Previous Steps</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Go back to previous steps to complete missing elements
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="json-export-container">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Theme JSON Export</h3>
            <p className="text-gray-600 mb-4">
              Below is the JSON configuration for your theme. You can copy it to clipboard or download it as a file.
            </p>
            
            <div className="json-preview mb-4">
              <CodeBlock>
                {JSON.stringify(theme, null, 2)}
              </CodeBlock>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopyToClipboard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download JSON
              </button>
              
              <button
                onClick={handleStartNew}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start New Theme
              </button>
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h4 className="font-medium text-blue-800 flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Using Your Theme
            </h4>
            <p className="text-sm text-blue-700">
              This JSON file contains your complete theme configuration. You can use it with the NextGen Theme API
              to apply your theme to your projects. See the documentation for more details on integration.
            </p>
          </div>
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="navigation-buttons flex justify-between mt-8">
        <button
          onClick={previous}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        {activeTab === 'visual' ? (
          <button
            onClick={() => setActiveTab('json')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Continue to Export
          </button>
        ) : (
          <button
            onClick={handleStartNew}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Start New Theme
          </button>
        )}
      </div>
    </div>
  );
} 