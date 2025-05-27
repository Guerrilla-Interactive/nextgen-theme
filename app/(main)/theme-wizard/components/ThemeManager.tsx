'use client';

import React, { useState } from 'react';
import { useThemeStorage, SavedTheme } from '../hooks/useThemeStorage';

export default function ThemeManager() {
  const storage = useThemeStorage();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  
  // Get saved themes from storage
  const { savedThemes, wizardProgress } = storage;
  const currentThemeId = wizardProgress.currentThemeId;
  
  // Format date for display
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Toggle panel visibility
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  // Start a new theme
  const handleNewTheme = () => {
    if (currentThemeId) {
      setShowConfirmNew(true);
    } else {
      storage.startNewTheme();
      setIsOpen(false);
    }
  };
  
  // Confirm starting a new theme
  const confirmNewTheme = () => {
    storage.startNewTheme();
    setShowConfirmNew(false);
    setIsOpen(false);
  };
  
  // Load an existing theme
  const handleLoadTheme = (themeId: string) => {
    // Update current theme ID in progress
    storage.updateWizardProgress({
      currentThemeId: themeId
    });
    setIsOpen(false);
    
    // Force page reload to apply the theme
    window.location.reload();
  };
  
  // Show delete confirmation
  const handleDeleteClick = (themeId: string) => {
    setShowConfirmDelete(themeId);
  };
  
  // Confirm deletion
  const confirmDelete = () => {
    if (showConfirmDelete) {
      storage.deleteTheme(showConfirmDelete);
      setShowConfirmDelete(null);
    }
  };
  
  // Cancel deletion
  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };
  
  // Cancel new theme
  const cancelNewTheme = () => {
    setShowConfirmNew(false);
  };
  
  return (
    <div className="theme-manager">
      {/* Toggle Button */}
      <button 
        onClick={togglePanel}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-50"
        aria-label="Manage themes"
        aria-expanded={isOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </svg>
      </button>
      
      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div 
            className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-manager-title"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 id="theme-manager-title" className="text-xl font-semibold">Theme Manager</h2>
              <button 
                onClick={togglePanel}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close panel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* New Theme Button */}
            <button
              onClick={handleNewTheme}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 px-4 rounded-lg mb-4 flex items-center"
              aria-label="Create a new theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Theme
            </button>
            
            {/* Theme List */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {savedThemes.length > 0 ? 'Your Saved Themes' : 'No saved themes yet'}
              </h3>
              
              {savedThemes.map((theme) => (
                <div 
                  key={theme.id} 
                  className={`
                    p-4 rounded-lg border 
                    ${theme.id === currentThemeId 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{theme.name}</h4>
                      <p className="text-sm text-gray-500">
                        Last edited: {formatDate(theme.updatedAt)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      {theme.id !== currentThemeId && (
                        <button
                          onClick={() => handleLoadTheme(theme.id)}
                          className="text-blue-500 hover:text-blue-700"
                          aria-label={`Load theme ${theme.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteClick(theme.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Delete theme ${theme.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
          >
            <h2 id="delete-title" className="text-xl font-semibold mb-2">Delete Theme</h2>
            <p id="delete-description" className="mb-4">
              Are you sure you want to delete this theme? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* New Theme Confirmation Dialog */}
      {showConfirmNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="new-theme-title"
            aria-describedby="new-theme-description"
          >
            <h2 id="new-theme-title" className="text-xl font-semibold mb-2">Start New Theme</h2>
            <p id="new-theme-description" className="mb-4">
              Starting a new theme will reset your current progress. Your existing theme will be saved, 
              but you'll start from the beginning. Are you sure you want to continue?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelNewTheme}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmNewTheme}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Start New Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 