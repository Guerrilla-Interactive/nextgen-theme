'use client';

import React, { useState } from 'react';
import { getColorName } from 'ntc-ts'; // Not-to-color library for color names
import { ColorInfo } from '../../context/ThemeTypes';

interface EnhancedColorPaletteProps {
  colours: ColorInfo[];
  explanation?: string;
}

interface ColorData {
  hex: string;
  rgb: string;
  name: string;
  role: string;
}

export default function EnhancedColorPalette({ colours, explanation }: EnhancedColorPaletteProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  
  // Default color roles based on position
  const colorRoles = [
    'Primary Brand',
    'Secondary/Accent',
    'Background',
    'Text/Foreground',
    'Highlight'
  ];
  
  // Convert HEX to RGB
  const hexToRgb = (hex: string): string => {
    // Remove the # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  // Get the contrast ratio between two colors
  const getContrastRatio = (color1: string, color2: string): number => {
    // Convert colors to RGB values
    const rgb1 = hexToRgb(color1).match(/\d+/g)?.map(Number) || [0, 0, 0];
    const rgb2 = hexToRgb(color2).match(/\d+/g)?.map(Number) || [0, 0, 0];
    
    // Calculate luminance for each color
    const luminance1 = calculateLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const luminance2 = calculateLuminance(rgb2[0], rgb2[1], rgb2[2]);
    
    // Calculate contrast ratio
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };
  
  // Calculate luminance for contrast calculation
  const calculateLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };
  
  // Get color data for display
  const getColorData = (colorInfo: ColorInfo, index: number): ColorData => {
    const hex = colorInfo.hex || '#000000'; // Ensure we have a hex value
    const colorNameResult = getColorName(hex);
    return {
      hex: hex,
      rgb: hexToRgb(hex),
      name: colorInfo.name || (colorNameResult ? colorNameResult.name : ''),
      role: colorInfo.usage || colorRoles[index] || `Color ${index + 1}`
    };
  };
  
  // Get WCAG contrast rating
  const getContrastRating = (ratio: number): { rating: string; pass: boolean } => {
    if (ratio >= 7) {
      return { rating: 'AAA', pass: true };
    } else if (ratio >= 4.5) {
      return { rating: 'AA', pass: true };
    } else if (ratio >= 3) {
      return { rating: 'AA Large', pass: true };
    } else {
      return { rating: 'Fail', pass: false };
    }
  };
  
  // Get contrasting text color for a background
  const getContrastColor = (hexColor: string): string => {
    // Ensure we have a valid hex color
    if (!hexColor || typeof hexColor !== 'string') {
      return '#000000';
    }
    
    // Remove the # if present
    hexColor = hexColor.replace('#', '');
    
    // Ensure it's a valid hex
    if (!/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
      return '#000000';
    }
    
    // Convert to RGB
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black or white based on brightness
    return brightness > 125 ? '#000000' : '#FFFFFF';
  };
  
  if (!colours || colours.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-md">
        <p className="text-gray-500">No colours selected yet</p>
      </div>
    );
  }
  
  return (
    <div className="enhanced-color-palette">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Colour Palette</h3>
      
      {/* Color explanation */}
      {explanation && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
          <h4 className="text-xs font-medium text-blue-800 mb-1">Design Reasoning</h4>
          <p className="text-xs text-blue-700">{explanation}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {colours.map((colorInfo, index) => {
          const colorData = getColorData(colorInfo, index);
          const isHovered = hoveredColor === colorInfo.hex;
          
          return (
            <div 
              key={index}
              className={`
                color-card relative rounded-lg overflow-hidden border border-gray-200
                transition-all duration-200 
                
              `}
              onMouseEnter={() => setHoveredColor(colorInfo.hex)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {/* Color swatch */}
              <div 
                className="color-swatch h-24 w-full" 
                style={{ backgroundColor: colorInfo.hex }}
              />
              
              {/* Color information */}
              <div className="color-info p-3 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {colorData.role}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {colorData.name}
                    </div>
                    {colorInfo.description && (
                      <div className="text-xs text-gray-600 mt-1">
                        "{colorInfo.description}"
                      </div>
                    )}
                    {colorInfo.idealUsecases && Array.isArray(colorInfo.idealUsecases) && colorInfo.idealUsecases.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-600">Example use cases: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {colorInfo.idealUsecases.map((usecase, i) => (
                            <span 
                              key={i} 
                              className="inline-block text-xs px-2 py-1 bg-gray-100 rounded-full font-mono"
                              style={{ 
                                borderColor: colorInfo.hex,
                                
                              }}
                            >
                              {usecase}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs uppercase">
                      {colorInfo.hex}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {colorData.rgb}
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          );
        })}
      </div>
      
      {/* Usage hints */}
      <div className="usage-hints mt-4 text-xs text-gray-500">
        <p>Hover over color swatches for more information including contrast ratings.</p>
        <p>AAA (7.0+) and AA (4.5+) are WCAG accessibility standards for text contrast.</p>
      </div>
    </div>
  );
} 