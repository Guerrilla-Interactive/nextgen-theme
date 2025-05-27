'use client';

import React, { ReactNode, useState } from 'react';
import { useWizardState } from '../context/WizardStateContext';
import { useWizardNavigation } from '../context/useWizardNavigation';
import WizardStorageProvider from '../context/WizardStorageProvider';
import ProgressIndicator from './ProgressIndicator';
import PreviewCanvas from './preview/PreviewCanvas';
import JSONViewer from './preview/JSONViewer';
import { WizardProvider } from '../context/WizardStateContext';

interface WizardLayoutProps {
  children: ReactNode;
}

// Tab type for preview pane
type PreviewTab = 'preview' | 'json';

// Inner content that needs access to the wizard context
function WizardContent({ children }: { children: ReactNode }) {
  const { state } = useWizardState();
  const { getThemeData } = useWizardNavigation();
  const [activeTab, setActiveTab] = useState<PreviewTab>('preview');

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 mt-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Theme Wizard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Wizard Pane */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {children}
        </div>
        
        {/* Preview Pane */}
        <div className="lg:col-span-2 hidden bg-white rounded-lg shadow-sm p-4">
          {/* Preview Tabs */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'preview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'json'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              JSON
            </button>
          </div>
          
          {/* Preview Content */}
          {activeTab === 'preview' ? (
            <PreviewCanvas theme={getThemeData()} />
          ) : (
            <JSONViewer data={getThemeData()} />
          )}
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="mt-8">
        <ProgressIndicator />
      </div>
    </div>
  );
}

// Main layout component that provides the context
export default function WizardLayout({ children }: WizardLayoutProps) {
  return (
    <WizardStorageProvider>
      <WizardContent>{children}</WizardContent>
    </WizardStorageProvider>
  );
}