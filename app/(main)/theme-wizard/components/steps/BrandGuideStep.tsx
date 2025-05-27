'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';

// Note: If using pdf.js, you would need to install and import it:
// import * as pdfjs from 'pdfjs-dist';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function BrandGuideStep() {
  const { 
    getThemeData, 
    updateTheme, 
    completeCurrentStep, 
    previous, 
    next,
    getPath,
    setHasLogo,
    setHasColours,
    setHasFonts
  } = useWizardNavigation();
  
  const theme = getThemeData();
  const path = getPath();
  
  // State for file upload
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for rich text paste
  const [richText, setRichText] = useState('');
  
  // State for processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  
  // Skip this step if we're on Path B
  useEffect(() => {
    if (path === 'B') {
      next();
    }
  }, [path, next]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.type.includes('pdf')) {
        setFileError('Please upload a PDF file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError('File is too large. Maximum size is 10MB');
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  // Handle rich text paste
  const handleRichTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRichText(e.target.value);
  };
  
  // Extract text from PDF (simplified version without pdf.js)
  const extractTextFromFile = async (): Promise<string> => {
    if (!file) return '';
    
    // For now, we'll just return a placeholder message
    // In a real implementation, we would use pdf.js to extract text
    return `This is placeholder text from PDF: ${file.name}. 
    In a real implementation, we would extract actual text from the PDF using pdf.js.
    
    Company: NextGen Theme
    Colors: #3B82F6, #10B981, #F59E0B, #1E3A8A, #F3F4F6
    Fonts: Inter, Roboto
    Industry: Technology
    Brand tone: Professional, Innovative
    Target audience: Business professionals, Web developers
    USP: Create beautiful themes in minutes, not hours
    `;
  };
  
  // Parse the brand guide using the API
  const handleParse = async () => {
    setIsProcessing(true);
    setProcessingError(null);
    
    try {
      let content = '';
      
      if (file) {
        // Extract text from PDF
        content = await extractTextFromFile();
      } else if (richText) {
        content = richText;
      } else {
        throw new Error('Please upload a PDF or paste rich text');
      }
      
      // Call the API to parse the content
      const response = await fetch('/api/parse-brand-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content, 
          images: [] // We're not handling images for now
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update theme data with parsed information
      updateTheme(data.themeData);
      
      // Update asset flags based on what was extracted
      if (data.themeData.colours && data.themeData.colours.length > 0) {
        setHasColours(true);
      }
      
      if (data.themeData.fonts && data.themeData.fonts.primary) {
        setHasFonts(true);
      }
      
      // Mark step as completed
      completeCurrentStep();
      
      // Navigate to the next step
      next();
    } catch (error) {
      console.error('Error parsing brand guide:', error);
      setProcessingError(error instanceof Error ? error.message : 'Failed to parse brand guide');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="brand-guide-step-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Upload Your Brand Guide</h2>
        <p className="text-gray-600">
          Upload your PDF brand guide or paste rich text to automatically extract your brand elements.
        </p>
      </div>
      
      {/* PDF Upload Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Upload PDF</h3>
        <div 
          className="upload-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          
          <div className="flex flex-col items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mb-4 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            
            <p className="text-lg mb-2 font-medium">
              Click to upload your brand guide PDF
            </p>
            
            <p className="text-sm text-gray-500">
              Maximum file size: 10MB
            </p>
            
            {file && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm">{Math.round(file.size / 1024)} KB</p>
              </div>
            )}
            
            {fileError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                {fileError}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="flex items-center mb-8">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-4 text-gray-500 font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
      
      {/* Rich Text Paste Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Paste Rich Text</h3>
        <div>
          <textarea
            value={richText}
            onChange={handleRichTextChange}
            placeholder="Paste content from your brand guide here..."
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          ></textarea>
        </div>
      </div>
      
      {/* Processing Error */}
      {processingError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          <p className="font-medium">Error Processing Brand Guide</p>
          <p className="text-sm">{processingError}</p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
        <h4 className="font-medium text-blue-800 flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How This Works
        </h4>
        <p className="text-sm text-blue-700">
          Our AI will analyze your brand guide to extract colors, fonts, and other brand elements.
          The extracted information will be used to pre-fill the next steps of the wizard.
          For best results, ensure your brand guide includes specific details about your brand colors,
          typography, and brand identity.
        </p>
      </div>
      
      {/* Navigation Buttons */}
      <div className="navigation-buttons flex justify-between mt-8">
        <button
          onClick={previous}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          disabled={isProcessing}
        >
          Back
        </button>
        
        <button
          onClick={handleParse}
          disabled={(!file && !richText) || isProcessing}
          className={`px-6 py-2 rounded-md text-white transition-colors ${
            (!file && !richText) || isProcessing
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Extract Brand Elements'}
        </button>
      </div>
    </div>
  );
} 