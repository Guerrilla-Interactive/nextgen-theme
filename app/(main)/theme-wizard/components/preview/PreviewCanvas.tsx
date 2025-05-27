'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ThemeJSON } from '../../context/ThemeTypes';
import { useWizardState } from '../../context/WizardStateContext';
import EnhancedColorPalette from './EnhancedColorPalette';
import FontPreview from './FontPreview';
import PreviewSizeToggle from './PreviewSizeToggle';

interface PreviewCanvasProps {
  theme: ThemeJSON;
}

// Define the available preview modes
type PreviewMode = 'standard' | 'businessCard' | 'website' | 'socialMedia';
type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'full';

export default function PreviewCanvas({ theme }: PreviewCanvasProps) {
  // Get context for real-time updates
  const { state } = useWizardState();
  // State for the active preview mode
  const [activeMode, setActiveMode] = useState<PreviewMode>('standard');
  // State for the preview viewport size
  const [previewSize, setPreviewSize] = useState<ViewportSize>('full');
  // State for animation control
  const [isAnimating, setIsAnimating] = useState(false);
  // Ref to track previous theme for animations
  const prevThemeRef = useRef<ThemeJSON>(theme);
  
  // Track theme changes for animations
  useEffect(() => {
    // Only animate if we have previous theme data
    if (prevThemeRef.current && theme !== prevThemeRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Duration slightly longer than the CSS transition
      
      return () => clearTimeout(timer);
    }
    
    // Update the ref with current theme
    prevThemeRef.current = theme;
  }, [theme]);
  
  // At the beginning of the component, add a useEffect to log changes to the theme for debugging
  useEffect(() => {
    // Log when theme changes to verify updates are coming through
    if (theme.metadata?.colorExplanation) {
      console.log("PreviewCanvas received updated color explanation:", theme.metadata.colorExplanation);
    }
  }, [theme, theme.metadata]);
  
  const hasLogo = Boolean(theme.logo);
  const hasColours = theme.colours.length > 0;
  const hasFonts = Boolean(theme.fonts);
  
  // Extract theme elements for easy access
  const getThemeStyles = () => {
    const primaryColor = theme.colours[0] || '#000000';
    const secondaryColor = theme.colours[1] || '#ffffff';
    const accentColor = theme.colours[2] || '#cccccc';
    const backgroundColor = theme.colours[3] || '#ffffff';
    const textColor = theme.colours[4] || '#000000';
    
    const primaryFont = theme.fonts?.primary || 'Arial';
    const secondaryFont = theme.fonts?.secondary || 'sans-serif';
    
    return {
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      textColor,
      primaryFont,
      secondaryFont,
    };
  };
  
  const styles = getThemeStyles();
  
  // Preview sections for standard view
  const renderEmpty = () => (
    <div className="flex items-center justify-center h-full p-10 text-center">
      <div>
        <p className="text-gray-500 mb-2">
          Start building your theme by adding assets in the wizard.
        </p>
        <p className="text-sm text-gray-400">
          Your theme preview will update automatically as you make selections.
        </p>
      </div>
    </div>
  );
  
  const renderColourPalette = () => {
    if (!hasColours) return null;
    
    // Log the explanation to verify it exists when rendering
    if (theme.metadata?.colorExplanation) {
      console.log("Rendering color palette with explanation:", theme.metadata.colorExplanation);
    }
    
    return (
      <div className="mb-6">
        <EnhancedColorPalette 
          colours={theme.colours} 
          explanation={theme.metadata?.colorExplanation}
        />
      </div>
    );
  };
  
  const renderFontPreview = () => {
    if (!theme.fonts || !theme.fonts.primary) return null;
    
    return (
      <div className="mb-6">
        <FontPreview
          primary={theme.fonts.primary}
          secondary={theme.fonts.secondary}
          explanation={theme.metadata?.fontExplanation}
        />
      </div>
    );
  };
  
  const renderLogoPreview = () => {
    if (!hasLogo) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Logo</h3>
        <div className="p-4 bg-white border border-gray-200 rounded-md flex items-center justify-center">
          <img 
            src={theme.logo!.src} 
            alt={theme.logo!.alt || 'Brand logo'} 
            className="max-h-24 max-w-full"
          />
        </div>
      </div>
    );
  };
  
  const renderIconSetPreview = () => {
    if (!theme.icons) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Icon Set</h3>
        <div className="p-3 bg-gray-50 rounded-md">
          <p>
            {theme.icons.set}
            {theme.icons.primaryColour && ` (${theme.icons.primaryColour})`}
          </p>
          
          {/* Icon placeholders */}
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center"
                style={{ color: theme.icons?.primaryColour }}
              >
                <span className="text-xs">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Business Card Preview Mode
  const renderBusinessCard = () => {
    return (
      <div className="flex justify-center items-center h-full py-6">
        <div
          className="business-card bg-white rounded-lg shadow-md overflow-hidden"
          style={{
            width: '350px',
            height: '200px',
            backgroundColor: styles.backgroundColor,
            color: styles.textColor,
            fontFamily: styles.primaryFont,
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${styles.accentColor}`
          }}
        >
          {/* Card Header with Logo */}
          <div 
            className="card-header p-4"
            style={{ 
              borderBottom: `2px solid ${styles.primaryColor}`,
              backgroundColor: styles.secondaryColor,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {hasLogo ? (
              <img 
                src={theme.logo!.src} 
                alt={theme.logo!.alt} 
                className="h-12 max-w-[120px] object-contain"
              />
            ) : (
              <div 
                style={{ 
                  color: styles.primaryColor,
                  fontFamily: styles.primaryFont,
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                }}
              >
                COMPANY NAME
              </div>
            )}
            
            <div 
              className="tagline text-right"
              style={{
                color: styles.primaryColor,
                fontFamily: styles.secondaryFont || styles.primaryFont,
                fontSize: '0.75rem',
                fontStyle: 'italic'
              }}
            >
              Your Brand Tagline
            </div>
          </div>
          
          {/* Card Content */}
          <div className="card-content flex-grow flex justify-between p-4">
            <div 
              className="contact-info"
              style={{
                fontFamily: styles.secondaryFont || styles.primaryFont,
                fontSize: '0.75rem'
              }}
            >
              <div className="name mb-1" style={{ fontWeight: 'bold', color: styles.primaryColor }}>
                John Smith
              </div>
              <div className="title mb-3" style={{ color: styles.accentColor }}>
                Marketing Director
              </div>
              <div className="contact-details space-y-1">
                <div>john@example.com</div>
                <div>+1 (555) 123-4567</div>
                <div>www.example.com</div>
              </div>
            </div>
            
            <div 
              className="company-info text-right"
              style={{
                fontFamily: styles.secondaryFont || styles.primaryFont,
                fontSize: '0.75rem'
              }}
            >
              <div style={{ marginTop: 'auto' }}>
                <div>123 Business Street</div>
                <div>Suite 456</div>
                <div>New York, NY 10001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Website Preview Mode
  const renderWebsite = () => {
    return (
      <div className="website-preview rounded-lg overflow-hidden border border-gray-200 shadow-md">
        {/* Website Header */}
        <div 
          className="website-header p-4"
          style={{
            backgroundColor: styles.primaryColor,
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div className="flex items-center">
            {hasLogo ? (
              <img 
                src={theme.logo!.src} 
                alt={theme.logo!.alt} 
                className="h-8 mr-4"
              />
            ) : (
              <div 
                style={{ 
                  fontFamily: styles.primaryFont,
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                }}
              >
                COMPANY
              </div>
            )}
            
            <nav className="hidden sm:flex">
              <ul className="flex space-x-4">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="hover:underline"
                      style={{
                        fontFamily: styles.secondaryFont || styles.primaryFont,
                        color: styles.backgroundColor
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <button 
            className="px-4 py-1 rounded"
            style={{
              backgroundColor: styles.accentColor,
              color: styles.backgroundColor,
              fontFamily: styles.primaryFont
            }}
          >
            Sign Up
          </button>
        </div>
        
        {/* Hero Section */}
        <div 
          className="hero p-8 text-center"
          style={{
            backgroundColor: styles.secondaryColor,
            color: styles.textColor
          }}
        >
          <h1 
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: styles.primaryFont,
              color: styles.primaryColor
            }}
          >
            Welcome to Our Website
          </h1>
          <p 
            className="mb-6 max-w-lg mx-auto"
            style={{
              fontFamily: styles.secondaryFont || styles.primaryFont
            }}
          >
            This is a preview of how your website could look with the selected theme. Customize your brand colors, typography, and more.
          </p>
          <button 
            className="px-6 py-2 rounded font-medium"
            style={{
              backgroundColor: styles.primaryColor,
              color: '#fff',
              fontFamily: styles.primaryFont
            }}
          >
            Learn More
          </button>
        </div>
        
        {/* Content Section */}
        <div 
          className="content p-6"
          style={{
            backgroundColor: styles.backgroundColor
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="feature-card p-4 rounded-lg"
                style={{
                  backgroundColor: '#fff',
                  border: `1px solid ${styles.accentColor}`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div 
                  className="feature-icon w-10 h-10 rounded-full mb-3 flex items-center justify-center"
                  style={{
                    backgroundColor: styles.primaryColor
                  }}
                >
                  <span className="text-white">
                    {i}
                  </span>
                </div>
                <h3 
                  className="text-lg font-medium mb-2"
                  style={{
                    fontFamily: styles.primaryFont,
                    color: styles.primaryColor
                  }}
                >
                  Feature {i}
                </h3>
                <p
                  style={{
                    fontFamily: styles.secondaryFont || styles.primaryFont,
                    color: styles.textColor,
                    fontSize: '0.875rem'
                  }}
                >
                  A short description of this feature and how it benefits your customers.
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div 
          className="footer p-4 text-center text-sm"
          style={{
            backgroundColor: styles.primaryColor,
            color: '#fff',
            fontFamily: styles.secondaryFont || styles.primaryFont
          }}
        >
          &copy; 2025 Company Name. All rights reserved.
        </div>
      </div>
    );
  };
  
  // Social Media Preview Mode
  const renderSocialMedia = () => {
    return (
      <div className="social-media-preview flex justify-center py-4">
        <div 
          className="social-post rounded-lg overflow-hidden w-full max-w-md"
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e1e1e1'
          }}
        >
          {/* Post Header */}
          <div className="post-header p-3 flex items-center">
            <div 
              className="profile-image w-10 h-10 rounded-full mr-3 flex items-center justify-center"
              style={{
                backgroundColor: styles.primaryColor,
                color: '#fff',
                fontWeight: 'bold'
              }}
            >
              {hasLogo ? (
                <img 
                  src={theme.logo!.src} 
                  alt={theme.logo!.alt} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                'C'
              )}
            </div>
            
            <div className="profile-info">
              <div 
                className="profile-name font-medium"
                style={{
                  fontFamily: styles.primaryFont,
                  color: styles.textColor
                }}
              >
                Company Name
              </div>
              <div 
                className="post-time text-xs"
                style={{
                  fontFamily: styles.secondaryFont || styles.primaryFont,
                  color: styles.accentColor
                }}
              >
                2 hours ago
              </div>
            </div>
            
            <div className="more-options ml-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke={styles.textColor}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" 
                />
              </svg>
            </div>
          </div>
          
          {/* Post Content */}
          <div className="post-content">
            <div 
              className="post-text p-3"
              style={{
                fontFamily: styles.secondaryFont || styles.primaryFont,
                color: styles.textColor
              }}
            >
              Excited to announce our new product line! 🎉 Check out our website for more information about how we're innovating in the industry. #innovation #newproduct #launch
            </div>
            
            <div 
              className="post-image bg-gray-100 flex items-center justify-center"
              style={{
                height: '240px',
                backgroundColor: styles.secondaryColor
              }}
            >
              {hasLogo ? (
                <img 
                  src={theme.logo!.src} 
                  alt={theme.logo!.alt} 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div 
                  className="placeholder-image flex flex-col items-center justify-center"
                  style={{
                    color: styles.primaryColor,
                    fontFamily: styles.primaryFont
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 mb-2" 
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
                  <span>Product Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Post Actions */}
          <div 
            className="post-actions p-3 flex justify-between border-t"
            style={{
              borderColor: styles.accentColor
            }}
          >
            <button 
              className="action-button flex items-center"
              style={{
                color: styles.primaryColor,
                fontFamily: styles.primaryFont
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              Like
            </button>
            
            <button 
              className="action-button flex items-center"
              style={{
                color: styles.primaryColor,
                fontFamily: styles.primaryFont
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
              Comment
            </button>
            
            <button 
              className="action-button flex items-center"
              style={{
                color: styles.primaryColor,
                fontFamily: styles.primaryFont
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
                />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderStandardPreview = () => {
    const hasAnyContent = hasLogo || hasColours || hasFonts || theme.icons;
    
    if (!hasAnyContent) {
      return renderEmpty();
    }
    
    return (
      <div className="standard-preview overflow-y-auto max-h-[80vh] p-2">
        {renderLogoPreview()}
        {renderColourPalette()}
        {renderFontPreview()}
        {renderIconSetPreview()}
      </div>
    );
  };
  
  // Render the active preview content based on selected mode
  const renderPreviewContent = () => {
    switch (activeMode) {
      case 'businessCard':
        return renderBusinessCard();
      case 'website':
        return renderWebsite();
      case 'socialMedia':
        return renderSocialMedia();
      case 'standard':
      default:
        return renderStandardPreview();
    }
  };
  
  // Get the preview container style based on selected size
  const getPreviewContainerStyle = () => {
    const baseStyle = {
      transition: 'all 0.3s ease-in-out',
    };
    
    const sizeStyle = (() => {
      switch (previewSize) {
        case 'mobile':
          return {
            maxWidth: '375px',
            margin: '0 auto',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            height: activeMode === 'standard' ? 'auto' : '600px',
            overflow: 'hidden'
          };
        case 'tablet':
          return {
            maxWidth: '768px',
            margin: '0 auto',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            height: activeMode === 'standard' ? 'auto' : '600px',
            overflow: 'hidden'
          };
        case 'desktop':
          return {
            maxWidth: '1024px',
            margin: '0 auto',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            height: activeMode === 'standard' ? 'auto' : '600px',
            overflow: 'hidden'
          };
        case 'full':
        default:
          return {
            width: '100%',
            height: activeMode === 'standard' ? 'auto' : 'auto',
          };
      }
    })();
    
    return {
      ...baseStyle,
      ...sizeStyle
    };
  };
  
  // Add a class to elements being animated
  const animationClass = isAnimating ? 'animate-theme-change' : '';
  
  return (
    <div className="preview-canvas">
      {/* Inject animation styles */}
      <style jsx global>{`
        @keyframes theme-pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-theme-change {
          animation: theme-pulse 0.5s ease-in-out;
        }
        
        /* Smooth transitions for theme changes */
        .theme-element {
          transition: color 0.3s ease, background-color 0.3s ease, 
                      border-color 0.3s ease, font-family 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .preview-tabs button {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }
          
          .preview-content {
            padding: 0.75rem;
          }
        }
      `}</style>
      
      {/* Tab navigation */}
      <div className="preview-tabs mb-4 border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto sm:overflow-visible" role="tablist">
          <button
            role="tab"
            aria-selected={activeMode === 'standard'}
            onClick={() => setActiveMode('standard')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeMode === 'standard' 
                ? 'bg-white border-l border-r border-t border-gray-200 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Standard
          </button>
          
          <button
            role="tab"
            aria-selected={activeMode === 'businessCard'}
            onClick={() => setActiveMode('businessCard')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeMode === 'businessCard' 
                ? 'bg-white border-l border-r border-t border-gray-200 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Business Card
          </button>
          
          <button
            role="tab"
            aria-selected={activeMode === 'website'}
            onClick={() => setActiveMode('website')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeMode === 'website' 
                ? 'bg-white border-l border-r border-t border-gray-200 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Website
          </button>
          
          <button
            role="tab"
            aria-selected={activeMode === 'socialMedia'}
            onClick={() => setActiveMode('socialMedia')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeMode === 'socialMedia' 
                ? 'bg-white border-l border-r border-t border-gray-200 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Social Media
          </button>
        </div>
      </div>
      
      {/* Only show size toggle for non-standard views */}
      {activeMode !== 'standard' && (
        <PreviewSizeToggle 
          currentSize={previewSize} 
          onChange={setPreviewSize} 
        />
      )}
      
      {/* Preview content area */}
      <div 
        role="tabpanel"
        className="preview-content bg-white rounded-lg border border-gray-200 p-4 min-h-[320px]"
      >
        <div 
          className={`preview-container transition-all duration-300 ease-in-out ${animationClass}`}
          style={getPreviewContainerStyle()}
        >
          {renderPreviewContent()}
        </div>
      </div>
      
      {/* Preview instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-sm text-blue-700">
        <p className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Switch between preview modes to see how your theme will look in different contexts. Use the size toggle to test responsive layouts.
        </p>
      </div>
    </div>
  );
} 