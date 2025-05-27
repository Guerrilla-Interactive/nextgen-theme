'use client';

import React, { useState, useEffect } from 'react';
import { useWizardNavigation } from '../../context/useWizardNavigation';
import { Icon } from '@iconify/react';
import chroma from 'chroma-js';

// Interface for icon set data
interface IconSet {
  id: string;
  name: string;
  total: number;
  category?: string;
  samples: string[];
}

// Interface for icon collection response from Iconify
interface IconifyCollections {
  [key: string]: {
    name: string;
    total: number;
    author?: {
      name: string;
      url?: string;
    };
    license?: {
      title: string;
      url?: string;
    };
    samples?: string[];
    height?: number;
    category?: string;
  };
}

// Categories for filtering
const ICON_CATEGORIES = [
  'All',
  'General',
  'Brands',
  'Emoji',
  'Multimedia',
  'Maps',
  'Weather',
  'Business',
  'Development',
  'Social',
  'Other'
];

export default function IconsStep() {
  const { 
    getThemeData, 
    updateTheme, 
    completeCurrentStep, 
    previous, 
    next 
  } = useWizardNavigation();
  
  const theme = getThemeData();
  
  // State for icon sets
  const [iconSets, setIconSets] = useState<IconSet[]>([]);
  const [filteredSets, setFilteredSets] = useState<IconSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // State for selected icon set
  const [selectedSet, setSelectedSet] = useState(theme.icons?.set || '');
  const [selectedColor, setSelectedColor] = useState(
    theme.icons?.primaryColour || theme.colours[0] || '#000000'
  );
  
  // Fetch icon sets from Iconify
  useEffect(() => {
    const fetchIconSets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch collections data
        const response = await fetch('https://api.iconify.design/collections');
        if (!response.ok) {
          throw new Error('Failed to fetch icon collections');
        }
        
        const data: IconifyCollections = await response.json();
        
        // Transform the data
        const sets = Object.entries(data)
          .map(([id, info]) => ({
            id,
            name: info.name,
            total: info.total,
            category: info.category || 'General',
            samples: info.samples || []
          }))
          // Only include sets with at least 50 icons for better selection
          .filter(set => set.total >= 50)
          // Sort by popularity (total icons)
          .sort((a, b) => b.total - a.total)
          // Limit to top 60 for performance
          .slice(0, 60);
        
        setIconSets(sets);
        setFilteredSets(sets);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching icon sets:', err);
        setError(err instanceof Error ? err.message : 'Failed to load icon sets');
        setIsLoading(false);
      }
    };
    
    fetchIconSets();
  }, []);
  
  // Filter icon sets when search query or category changes
  useEffect(() => {
    let filtered = iconSets;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(set => 
        set.category === selectedCategory
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(set => 
        set.name.toLowerCase().includes(query) ||
        set.id.toLowerCase().includes(query)
      );
    }
    
    setFilteredSets(filtered);
  }, [searchQuery, selectedCategory, iconSets]);
  
  // Handle icon set selection
  const handleSelectIconSet = (setId: string) => {
    setSelectedSet(setId);
    
    // Update theme data
    updateTheme({
      ...theme,
      icons: {
        set: setId,
        primaryColour: selectedColor
      }
    });
    
    // Mark step as completed
    completeCurrentStep();
  };
  
  // Handle color selection
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    
    if (selectedSet) {
      // Update theme data with new color
      updateTheme({
        ...theme,
        icons: {
          set: selectedSet,
          primaryColour: color
        }
      });
    }
  };
  
  // Color suggestions based on theme colors
  const getColorSuggestions = () => {
    const suggestions = [...theme.colours];
    
    // If we have theme colors, create variations
    if (theme.colours.length > 0) {
      const primaryColor = theme.colours[0];
      try {
        // Add darker and lighter variations of primary color
        const darkVariation = chroma(primaryColor).darken().hex();
        const lightVariation = chroma(primaryColor).brighten().hex();
        
        suggestions.push(darkVariation, lightVariation);
      } catch (e) {
        // Handle invalid color format
      }
    }
    
    // Add default colors if we don't have enough
    if (suggestions.length < 3) {
      const defaults = ['#000000', '#3B82F6', '#10B981', '#7C3AED', '#F59E0B'];
      return [...suggestions, ...defaults.slice(0, 5 - suggestions.length)];
    }
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="icons-step-container flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading icon sets...</p>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="icons-step-container">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">Error loading icon sets</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
        </div>
        
        <div className="navigation-buttons flex justify-between mt-8">
          <button
            onClick={previous}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={next}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Skip This Step
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="icons-step-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Icon Set</h2>
        <p className="text-gray-600">
          Choose an icon set for your theme. These icons will be used throughout your application.
        </p>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search icon sets..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ICON_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Selected Icon Set Preview */}
      {selectedSet && (
        <div className="selected-icon-preview mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-medium mb-3">Selected Icon Set: {iconSets.find(s => s.id === selectedSet)?.name}</h3>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {['home', 'user', 'settings', 'search', 'mail', 'heart', 'star'].map((iconName) => (
              <div key={iconName} className="flex flex-col items-center">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <Icon 
                    icon={`${selectedSet}:${iconName}`} 
                    width="24" 
                    height="24" 
                    style={{ color: selectedColor }}
                    onError={(e) => {
                      // Hide the icon if it fails to load
                      const target = e.target as HTMLElement;
                      if (target.parentElement) {
                        target.parentElement.style.display = 'none';
                      }
                    }}
                  />
                </div>
                <span className="text-xs mt-1">{iconName}</span>
              </div>
            ))}
          </div>
          
          {/* Color Selector */}
          <div className="icon-color-selector">
            <h4 className="text-sm font-medium mb-2">Icon Color</h4>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="w-10 h-10 rounded border-0 cursor-pointer"
              />
              <div className="flex gap-2">
                {getColorSuggestions().map((color, index) => (
                  <button
                    key={`color-${index}`}
                    onClick={() => handleColorChange({ target: { value: color } } as any)}
                    className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Icon Sets Grid */}
      <div className="icon-sets-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {filteredSets.map((set) => (
          <div 
            key={set.id}
            onClick={() => handleSelectIconSet(set.id)}
            className={`
              icon-set-card p-4 border rounded-md cursor-pointer transition-all
              ${selectedSet === set.id 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }
            `}
          >
            <h3 className="font-medium mb-2 truncate" title={set.name}>
              {set.name}
            </h3>
            
            <div className="icon-preview flex flex-wrap gap-2 mb-2">
              {['home', 'user', 'star', 'search'].map((iconName) => (
                <div key={iconName} className="p-1.5 bg-white rounded">
                  <Icon 
                    icon={`${set.id}:${iconName}`} 
                    width="20" 
                    height="20"
                    onError={(e) => {
                      // Hide the icon if it fails to load
                      const target = e.target as HTMLElement;
                      if (target.parentElement) {
                        target.parentElement.style.display = 'none';
                      }
                    }} 
                  />
                </div>
              ))}
            </div>
            
            <div className="icon-meta flex justify-between text-xs text-gray-500">
              <span>{set.total.toLocaleString()} icons</span>
              <span>{set.category}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredSets.length === 0 && (
        <div className="empty-state bg-gray-50 p-6 text-center rounded-md mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium mb-1">No Icon Sets Found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
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
        
        <button
          onClick={next}
          disabled={!selectedSet}
          className={`px-6 py-2 rounded-md text-white transition-colors ${
            selectedSet 
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