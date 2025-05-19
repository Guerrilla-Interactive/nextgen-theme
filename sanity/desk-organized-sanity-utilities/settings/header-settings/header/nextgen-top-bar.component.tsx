import { cn } from "@/features/unorganized-utils/utils";
import { HeaderSettingsFetchQueryResult } from "@/sanity.types";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

// Define utility functions for type-safe property access
const hasType = (item: any, type: string): boolean => {
  return item && typeof item === 'object' && 'linkType' in item && item.linkType === type;
};

const getProperty = <T,>(item: any, property: string, defaultValue: T): T => {
  if (item && typeof item === 'object') {
    // Handle dot notation for nested properties
    if (property.includes('.')) {
      const parts = property.split('.');
      let current = item;
      
      for (const part of parts) {
        if (current === null || current === undefined || typeof current !== 'object') {
          return defaultValue;
        }
        current = current[part];
      }
      
      return (current === undefined || current === null) ? defaultValue : current as T;
    }
    
    // Direct property access
    return (property in item) ? (item[property] || defaultValue) : defaultValue;
  }
  return defaultValue;
};

// Function to get icon name from icon field - handling Sanity icon objects correctly
const getIconName = (item: any): string => {
  if (!item || !item.icon) return '';
  
  // If icon is directly a string
  if (typeof item.icon === 'string') return item.icon;
  
  // If icon has a name property directly
  if (item.icon.name) return item.icon.name;
  
  // Return empty if no valid icon found
  return '';
};

// Link object type from Sanity's link field
type LinkData = {
  _key: string;
  linkType?: 'internal' | 'external' | 'download' | 'linkGroup' | 'dropdownGroup';
  title?: string;
  url?: string;
  slug?: string; // For internal links (slug.current)
  href?: string; // For external links
  anchor?: string;
  newWindow?: boolean;
  icon?: { name: string };
  hideOnMobile?: boolean;
  items?: LinkData[]; // For link groups
  internalLink?: {
    title?: string;
    name?: string;
  };
  reference?: {
    _ref: string;
    _type: string;
  };
};

type TopBarProps = {
  topBar: {
    justifyContent?: string;
    items?: any[];
  };
  isTopDark: boolean;
  setIconLoaded: (loaded: boolean) => void;
  iconLoaded: boolean;
};

// TopBar component for the header
export const TopBar = ({ 
  topBar, 
  isTopDark, 
  setIconLoaded, 
  iconLoaded 
}: TopBarProps) => {
  const getLinkHref = (item: any): string | undefined => {
    if (!item) return undefined;

    // For external links
    if (hasType(item, 'external')) {
      return getProperty(item, 'href', '');
    }

    // For internal links - check both slug and url properties
    if (hasType(item, 'internal')) {
      // First check for slug (used in newer queries)
      const slug = getProperty(item, 'slug', '');
      if (slug) {
        const anchor = getProperty(item, 'anchor', '');
        return `/${slug}${anchor ? `#${anchor}` : ''}`;
      }
      
      // Then fall back to url (for backward compatibility)
      const url = getProperty(item, 'url', '');
      if (url) {
        const anchor = getProperty(item, 'anchor', '');
        return `${url}${anchor ? `#${anchor}` : ''}`;
      }
      
      // If neither is available, return undefined
      return undefined;
    }

    // For download links
    if (hasType(item, 'download')) {
      return getProperty(item, 'url', '');
    }

    return undefined;
  };

  const getLinkAttributes = (item: any) => {
    if (!item) return {};

    // For external links
    if (hasType(item, 'external') || getProperty(item, 'newWindow', false)) {
      return { 
        target: "_blank",
        rel: "noopener noreferrer"
      };
    }

    return {};
  };

  const getTitle = (item: any): string => {
    if (!item) return '';

    // Priority order for title
    return getProperty(item, 'title', '') || 
      getProperty(item, 'internalLink.title', '') || 
      getProperty(item, 'internalLink.name', '') || 
      getProperty(item, 'href', '') || 
      getProperty(item, 'url', '');
  };

  // Link component with hover/active states
  const TopBarLink = ({ item, children }: { item: any, children: React.ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const href = getLinkHref(item);
    const { target, rel } = getLinkAttributes(item);
    
    if (!href) return null;
    
    const linkClasses = cn(
      "relative flex items-center rounded transition-all duration-200",
      "px-2 py-1",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
      isTopDark ? (
        isPressed ? "text-white bg-white/20" : 
        isHovered ? "text-white bg-white/10" : "text-white"
      ) : (
        isPressed ? "text-black bg-black/20" : 
        isHovered ? "text-black bg-black/5" : "text-black"
      )
    );

    return (
      <Link 
        href={href} 
        className={linkClasses}
        target={target} 
        rel={rel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {children}
        {hasType(item, 'external') && (
          <span className="sr-only">(opens in new tab)</span>
        )}
      </Link>
    );
  };

  const renderTopbarItem = (item: any) => {
    // If this is a link group, render its items with the group's justification
    if (hasType(item, 'linkGroup')) {
      return renderLinkGroup(item);
    }
    
    const title = getTitle(item);
    const href = getLinkHref(item);
    
    // Apply hiding classes based on the hideOnMobile property
    const wrapperClasses = cn({
      "hidden md:flex": getProperty(item, 'hideOnMobile', false),
      "flex": !getProperty(item, 'hideOnMobile', false),
      "mx-2": true, // Add spacing between items
    });

    const content = (
      <div className="items-center gap-2 flex">
        {getIconName(item) && (
          <Icon 
            icon={getIconName(item)} 
            className="h-[1.2em] w-[1.2em] align-middle text-current"
            onLoad={() => !iconLoaded && setIconLoaded(true)} 
          />
        )}
        <span>{title}</span>
      </div>
    );

    if (href) {
      return (
        <div key={getProperty(item, '_key', '')} className={wrapperClasses}> 
          <TopBarLink item={item}>
            {content}
          </TopBarLink>
        </div>
      );
    }
    
    return (
      <div key={getProperty(item, '_key', '')} className={cn(wrapperClasses, "cursor-default")}>
        {content}
      </div>
    );
  };

  // Render a group of links with its own justification
  const renderLinkGroup = (group: any) => {
    const items = getProperty<any[]>(group, 'items', []);
    if (!items || items.length === 0) return null;
    
    // Use the group's justifyContent or default to flex-start
    const groupJustify = getProperty(group, 'justifyContent', 'justify-start');
    
    // Apply hiding classes based on the hideOnMobile property
    const groupClasses = cn(
      "flex", 
      groupJustify,
      {
        "hidden md:flex": getProperty(group, 'hideOnMobile', false),
        "flex-1": true, // Make the group take available space
      }
    );
    
    return (
      <div key={getProperty(group, '_key', '')} className={groupClasses}>
        {items.map(item => {
          // For standard items (internal/external links)
          if (hasType(item, 'internal') || hasType(item, 'external')) {
            return renderTopbarItem(item);
          }
          
          // Special handling for dropdownGroups within linkGroups
          if (hasType(item, 'dropdownGroup')) {
            const dropdownKey = getProperty(item, '_key', '');
            const dropdownTitle = getProperty(item, 'title', '');
            const links = getProperty<any[]>(item, 'links', []);
            const hideOnMobile = getProperty(item, 'hideOnMobile', false);
            
            if (!links || links.length === 0) return null;
            
            // Create a dropdown in the topbar
            return (
              <div 
                key={dropdownKey} 
                className={cn(
                  "relative group mx-2",
                  {
                    "hidden md:block": hideOnMobile
                  }
                )}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded transition-all duration-200",
                    isTopDark 
                      ? "hover:bg-white/10 active:bg-white/20 text-white" 
                      : "hover:bg-black/5 active:bg-black/10 text-black"
                  )}
                >
                  {getIconName(item) && (
                    <Icon 
                      icon={getIconName(item)} 
                      className="h-[1.2em] w-[1.2em] align-middle text-current mr-1"
                      onLoad={() => !iconLoaded && setIconLoaded(true)} 
                    />
                  )}
                  <span>{dropdownTitle}</span>
                  <Icon icon="mdi:chevron-down" className="h-4 w-4 transition-transform group-hover:rotate-180 ml-1" />
                </button>
                
                {/* Dropdown menu */}
                <div className={cn(
                  "absolute z-50 mt-1 w-48 rounded shadow-lg",
                  "invisible group-hover:visible opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0",
                  "transition-all duration-200",
                  isTopDark ? "bg-gray-800 text-white" : "bg-white text-black"
                )}>
                  <div className="py-1">
                    {links.map(link => {
                      const linkKey = getProperty(link, '_key', '');
                      const href = getLinkHref(link);
                      const { target, rel } = getLinkAttributes(link);
                      const title = getTitle(link);
                      
                      if (!href) return null;
                      
                      return (
                        <Link 
                          key={linkKey}
                          href={href}
                          target={target}
                          rel={rel}
                          className={cn(
                            "block px-4 py-2 text-sm flex items-center",
                            isTopDark
                              ? "hover:bg-gray-700" 
                              : "hover:bg-gray-100"
                          )}
                        >
                          {getIconName(link) && (
                            <Icon 
                              icon={getIconName(link)} 
                              className="h-[1.2em] w-[1.2em] align-middle text-current mr-1.5"
                              onLoad={() => !iconLoaded && setIconLoaded(true)} 
                            />
                          )}
                          {title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }
          
          return null;
        })}
      </div>
    );
  };

  // Default to justify-between if not specified
  const justifyContent = getProperty(topBar, 'justifyContent', 'justify-between');
  const items = getProperty<any[]>(topBar, 'items', []);

  return (
    <div className={cn("pt-1 border-b pb-1 font-light hidden md:flex flex-wrap", justifyContent, isTopDark ? "border-white/20" : "border-black/20")}>
      {/* All items in a single flex container */}
      {items.map(item => renderTopbarItem(item))}
    </div>
  );
};
  