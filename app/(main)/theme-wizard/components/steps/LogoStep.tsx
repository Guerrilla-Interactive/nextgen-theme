'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';

export default function LogoStep() {
  const { 
    getThemeData, 
    updateTheme, 
    completeCurrentStep, 
    previous, 
    next, 
    setHasLogo 
  } = useWizardNavigation();
  
  const theme = getThemeData();
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  
  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);
  
  // Handle file input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);
  
  // Open file input dialog
  const handleClick = () => {
    inputRef.current?.click();
  };
  
  // Process the file
  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.match('image.*')) {
      setUploadError('Please upload an image file (PNG, JPG, SVG, etc.)');
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File is too large. Maximum size is 5MB.');
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadError(null);
      
      // Convert file to base64
      const base64 = await fileToBase64(file);
      
      // Update theme data with logo
      updateTheme({
        ...theme,
        logo: { 
          src: base64,
          alt: file.name.replace(/\.[^/.]+$/, '') // Remove file extension for alt text
        }
      });
      
      // Update wizard state to indicate we have a logo
      setHasLogo(true);
      
      // Mark step as completed
      completeCurrentStep();
    } catch (error) {
      console.error('Error processing logo:', error);
      setUploadError('An error occurred while processing the image.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  // Remove logo
  const handleRemoveLogo = () => {
    updateTheme({
      ...theme,
      logo: null
    });
    setHasLogo(false);
  };
  
  return (
    <div className="logo-step-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Add Your Logo</h2>
        <p className="text-gray-600">
          Upload your company logo to include in your theme. 
          We support PNG, JPG, and SVG formats.
        </p>
      </div>
      
      {theme.logo ? (
        <div className="logo-preview bg-white p-6 border border-gray-200 rounded-lg mb-6">
          <div className="flex flex-col items-center">
            <div className="logo-display mb-4 p-6 bg-gray-50 rounded-md w-full flex justify-center">
              <img 
                src={theme.logo.src} 
                alt={theme.logo.alt} 
                className="max-h-48 max-w-full object-contain"
              />
            </div>
            
            <div className="flex items-center">
              <p className="text-sm text-gray-600 mr-3">
                {theme.logo.alt || 'Your logo'}
              </p>
              <button
                onClick={handleRemoveLogo}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-md transition-colors"
                aria-label="Remove logo"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className={`upload-container mb-6 relative ${dragActive ? 'bg-blue-50' : 'bg-gray-50'}`}
          onDragEnter={handleDrag}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={isUploading}
          />
          
          <div 
            className="upload-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
            onClick={handleClick}
            style={{ borderColor: dragActive ? '#3b82f6' : '#e5e7eb' }}
          >
            <div className="flex flex-col items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-12 w-12 mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              
              <p className="text-lg mb-2 font-medium">
                {dragActive ? 'Drop your logo here' : 'Drag & drop your logo or click to browse'}
              </p>
              
              <p className="text-sm text-gray-500">
                Supported formats: PNG, JPG, SVG (Max: 5MB)
              </p>
              
              {isUploading && (
                <div className="mt-4">
                  <div className="animate-pulse bg-blue-100 text-blue-700 px-4 py-2 rounded-md">
                    Processing...
                  </div>
                </div>
              )}
              
              {uploadError && (
                <div className="mt-4">
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
                    {uploadError}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {dragActive && (
            <div 
              className="absolute inset-0 w-full h-full" 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
        </div>
      )}
      
      <div className="navigation-buttons flex justify-between mt-8">
        <button
          onClick={previous}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={next}
          disabled={!theme.logo}
          className={`px-6 py-2 rounded-md text-white transition-colors ${
            theme.logo 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
} 