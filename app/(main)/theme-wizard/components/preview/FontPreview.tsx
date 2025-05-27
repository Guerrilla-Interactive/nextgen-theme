'use client';

import React from 'react';

interface FontPreviewProps {
  primary: string;
  secondary?: string;
  explanation?: string;
}

export default function FontPreview({ primary, secondary, explanation }: FontPreviewProps) {
  const fontSizes = [
    { name: 'Heading 1', size: '2rem', weight: 'bold' },
    { name: 'Heading 2', size: '1.5rem', weight: 'bold' },
    { name: 'Heading 3', size: '1.25rem', weight: 'medium' },
    { name: 'Body', size: '1rem', weight: 'normal' },
    { name: 'Small', size: '0.875rem', weight: 'normal' },
  ];
  
  const getFontClassification = (fontName: string): string => {
    const serif = ['serif', 'georgia', 'cambria', 'times', 'garamond', 'baskerville'];
    const sansSerif = ['sans', 'arial', 'helvetica', 'verdana', 'futura', 'tahoma', 'system-ui'];
    const monospace = ['mono', 'courier', 'consolas', 'menlo', 'roboto mono', 'source code'];
    const display = ['display', 'poster', 'impact', 'broadway', 'stencil', 'brush'];
    
    const fontNameLower = fontName.toLowerCase();
    
    if (serif.some(term => fontNameLower.includes(term))) return 'Serif';
    if (sansSerif.some(term => fontNameLower.includes(term))) return 'Sans-serif';
    if (monospace.some(term => fontNameLower.includes(term))) return 'Monospace';
    if (display.some(term => fontNameLower.includes(term))) return 'Display';
    
    return 'Unknown';
  };
  
  return (
    <div className="font-preview">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Typography</h3>
      
      {/* Font explanation */}
      {explanation && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
          <h4 className="text-xs font-medium text-blue-800 mb-1">Design Reasoning</h4>
          <p className="text-xs text-blue-700">{explanation}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Font */}
        <div className="primary-font bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <div className="font-medium">{primary}</div>
            <div className="text-xs text-gray-500 mt-1">
              Primary Font • {getFontClassification(primary)}
            </div>
          </div>
          
          <div className="p-4">
            {fontSizes.map((style, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div 
                  style={{ 
                    fontFamily: primary,
                    fontSize: style.size,
                    fontWeight: style.weight === 'normal' ? 400 : style.weight === 'medium' ? 500 : 700
                  }}
                >
                  {style.name} Text
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {style.size} • {style.weight}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Secondary Font (if provided) */}
        {secondary && (
          <div className="secondary-font bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="font-medium">{secondary}</div>
              <div className="text-xs text-gray-500 mt-1">
                Secondary Font • {getFontClassification(secondary)}
              </div>
            </div>
            
            <div className="p-4">
              {fontSizes.map((style, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div 
                    style={{ 
                      fontFamily: secondary,
                      fontSize: style.size,
                      fontWeight: style.weight === 'normal' ? 400 : style.weight === 'medium' ? 500 : 700
                    }}
                  >
                    {style.name} Text
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {style.size} • {style.weight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Font Pairing Preview */}
      {secondary && (
        <div className="font-pairing mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Font Pairing Example</h4>
          
          <div 
            style={{ 
              fontFamily: primary,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
            className="mb-2"
          >
            Primary Heading Font
          </div>
          
          <div 
            style={{ 
              fontFamily: secondary,
              fontSize: '1rem'
            }}
            className="mb-4"
          >
            This is an example of how your primary and secondary fonts work together. The primary font is typically used for headings and important text, while the secondary font is used for body text and longer content.
          </div>
          
          <div className="text-xs text-gray-500">
            <strong>Tip:</strong> For optimal contrast, pair serif with sans-serif or choose fonts from complementary families.
          </div>
        </div>
      )}
      
      {/* Font Styles */}
      <div className="font-styles mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Font Styles</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div 
              style={{ 
                fontFamily: primary,
                fontWeight: 'bold'
              }}
              className="mb-1"
            >
              Bold Text
            </div>
            <div className="text-xs text-gray-500">font-weight: bold</div>
          </div>
          
          <div>
            <div 
              style={{ 
                fontFamily: primary,
                fontStyle: 'italic'
              }}
              className="mb-1"
            >
              Italic Text
            </div>
            <div className="text-xs text-gray-500">font-style: italic</div>
          </div>
          
          <div>
            <div 
              style={{ 
                fontFamily: primary,
                textDecoration: 'underline'
              }}
              className="mb-1"
            >
              Underlined Text
            </div>
            <div className="text-xs text-gray-500">text-decoration: underline</div>
          </div>
        </div>
      </div>
    </div>
  );
} 