import { HeaderSettingsFetchQueryResult } from "@/sanity.types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  NextgenDesktopNav,
  NextgenDesktopNavItem,
  NextgenDesktopNavLink,
  NextgenDesktopNavTrigger,
  NextgenDesktopNavBridge,
  NextgenDesktopNavContent,
  NextgenDesktopNavDropdownItem,
  type NavStyleProps,
} from "./nextgen-desktop-nav/nextgen-desktop-nav.component";

// Define a utility function to safely check link types
const hasType = (item: any, type: string): boolean => {
  return item && typeof item === 'object' && 'linkType' in item && item.linkType === type;
};

// Define a utility function to safely get a property
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

// Function to render icon if it exists
const renderIcon = (item: any) => {
  const iconName = getIconName(item);
  if (!iconName) return null;
  
  return (
    <Icon 
      icon={iconName} 
      className="mr-1.5 inline-block h-[1.2em] w-[1.2em] align-middle text-current" 
      aria-hidden="true" 
    />
  );
};

export default function HeaderDesktopNav({ 
  isTopDark,
  navItems,
  navigationConfig,
  styleProps
}: { 
  navItems: any[], // Using any[] to bypass strict typing
  navigationConfig?: { justifyContent?: string },
  isTopDark: boolean,
  styleProps?: NavStyleProps
}) {
  if (!navItems || !Array.isArray(navItems)) return null;
  
  return (
    <NextgenDesktopNav
      isTopDark={isTopDark}
      justifyContent={navigationConfig?.justifyContent}
      styleProps={styleProps}
    >
      {navItems.map((navItem) => {
        // Create unique ID for this nav item
        const navId = getProperty(navItem, '_key', `nav-${Math.random().toString(36).substring(2, 9)}`);
        
        // Check if item should be hidden on mobile
        const hideOnMobile = getProperty(navItem, 'hideOnMobile', false);
        if (hideOnMobile) {
          // Apply mobile visibility class if needed
          // You may need to implement this in the components
        }
        
        // Handle internal links
        if (hasType(navItem, "internal")) {
          const slug = getProperty(navItem, 'slug', '');
          if (!slug) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <Link href={`/${slug}`} passHref legacyBehavior>
                <NextgenDesktopNavLink>
                  {renderIcon(navItem)}
                  {getProperty(navItem, 'title', '')}
                </NextgenDesktopNavLink>
              </Link>
            </NextgenDesktopNavItem>
          );
        } 
        
        // Handle external links
        if (hasType(navItem, "external")) {
          const url = getProperty(navItem, 'url', '');
          if (!url) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <Link href={url} passHref legacyBehavior>
                <NextgenDesktopNavLink external>
                  {renderIcon(navItem)}
                  {getProperty(navItem, 'title', '')}
                </NextgenDesktopNavLink>
              </Link>
            </NextgenDesktopNavItem>
          );
        }
        
        // Handle download links
        if (hasType(navItem, "download")) {
          const url = getProperty(navItem, 'url', '');
          if (!url) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <Link href={url} passHref legacyBehavior>
                <NextgenDesktopNavLink external>
                  {renderIcon(navItem)}
                  {getProperty(navItem, 'title', '')}
                </NextgenDesktopNavLink>
              </Link>
            </NextgenDesktopNavItem>
          );
        }
        
        // Handle dropdown groups (formerly called linkGroup) with dropdown menu
        if (hasType(navItem, "dropdownGroup")) {
          const links = getProperty<any[]>(navItem, 'links', []);
          if (links.length === 0) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <NextgenDesktopNavTrigger id={navId}>
                {renderIcon(navItem)}
                {getProperty(navItem, 'title', '')}
              </NextgenDesktopNavTrigger>
              
              <NextgenDesktopNavBridge />
              
              <NextgenDesktopNavContent id={navId}>
                {links.map((link, idx) => {
                  // Create unique ID for this menu item
                  const itemId = getProperty(link, '_key', `item-${Math.random().toString(36).substring(2, 9)}`);
                  
                  // Internal link in dropdown
                  if (hasType(link, "internal")) {
                    const slug = getProperty(link, 'slug', '');
                    if (!slug) return null;
                    
                    return (
                      <NextgenDesktopNavDropdownItem 
                        key={itemId}
                        href={`/${slug}`}
                        index={idx}
                        description={getProperty(link, 'description', undefined)}
                      >
                        {renderIcon(link)}
                        {getProperty(link, 'title', '')}
                      </NextgenDesktopNavDropdownItem>
                    );
                  }
                  
                  // External link in dropdown
                  if (hasType(link, "external")) {
                    const url = getProperty(link, 'url', '');
                    if (!url) return null;
                    
                    return (
                      <NextgenDesktopNavDropdownItem 
                        key={itemId}
                        href={url}
                        external
                        index={idx}
                        description={getProperty(link, 'description', undefined)}
                      >
                        {renderIcon(link)}
                        {getProperty(link, 'title', '')}
                      </NextgenDesktopNavDropdownItem>
                    );
                  }
                  
                  // Download link in dropdown
                  if (hasType(link, "download")) {
                    const url = getProperty(link, 'url', '');
                    if (!url) return null;
                    
                    return (
                      <NextgenDesktopNavDropdownItem 
                        key={itemId}
                        href={url}
                        external
                        index={idx}
                        description={getProperty(link, 'description', undefined)}
                      >
                        {renderIcon(link)}
                        {getProperty(link, 'title', '')}
                      </NextgenDesktopNavDropdownItem>
                    );
                  }
                  
                  return null;
                })}
              </NextgenDesktopNavContent>
            </NextgenDesktopNavItem>
          );
        }
        
        // Handle link groups (horizontal grouping of items)
        if (hasType(navItem, "linkGroup")) {
          const items = getProperty<any[]>(navItem, 'items', []);
          if (items.length === 0) return null;
          
          // Create horizontal group of links
          return (
            <div 
              key={navId} 
              className="flex items-center gap-2"
            >
              {items.map(groupItem => {
                const groupItemId = getProperty(
                  groupItem, 
                  '_key', 
                  `item-${Math.random().toString(36).substring(2, 9)}`
                );
                
                // Internal link in horizontal group
                if (hasType(groupItem, "internal")) {
                  const slug = getProperty(groupItem, 'slug', '');
                  if (!slug) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      <Link href={`/${slug}`} passHref legacyBehavior>
                        <NextgenDesktopNavLink>
                          {renderIcon(groupItem)}
                          {getProperty(groupItem, 'title', '')}
                        </NextgenDesktopNavLink>
                      </Link>
                    </NextgenDesktopNavItem>
                  );
                }
                
                // External link in horizontal group
                if (hasType(groupItem, "external")) {
                  const url = getProperty(groupItem, 'url', '');
                  if (!url) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      <Link href={url} passHref legacyBehavior>
                        <NextgenDesktopNavLink external>
                          {renderIcon(groupItem)}
                          {getProperty(groupItem, 'title', '')}
                        </NextgenDesktopNavLink>
                      </Link>
                    </NextgenDesktopNavItem>
                  );
                }
                
                // Download link in horizontal group
                if (hasType(groupItem, "download")) {
                  const url = getProperty(groupItem, 'url', '');
                  if (!url) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      <Link href={url} passHref legacyBehavior>
                        <NextgenDesktopNavLink external>
                          {renderIcon(groupItem)}
                          {getProperty(groupItem, 'title', '')}
                        </NextgenDesktopNavLink>
                      </Link>
                    </NextgenDesktopNavItem>
                  );
                }
                
                // Dropdown group within horizontal group
                if (hasType(groupItem, "dropdownGroup")) {
                  const links = getProperty<any[]>(groupItem, 'links', []);
                  if (links.length === 0) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      <NextgenDesktopNavTrigger id={groupItemId}>
                        {renderIcon(groupItem)}
                        {getProperty(groupItem, 'title', '')}
                      </NextgenDesktopNavTrigger>
                      
                      <NextgenDesktopNavBridge />
                      
                      <NextgenDesktopNavContent id={groupItemId}>
                        {links.map((link, idx) => {
                          // Create unique ID for this menu item
                          const itemId = getProperty(link, '_key', `item-${Math.random().toString(36).substring(2, 9)}`);
                          
                          // Internal link in dropdown
                          if (hasType(link, "internal")) {
                            const slug = getProperty(link, 'slug', '');
                            if (!slug) return null;
                            
                            return (
                              <NextgenDesktopNavDropdownItem 
                                key={itemId}
                                href={`/${slug}`}
                                index={idx}
                                description={getProperty(link, 'description', undefined)}
                              >
                                {renderIcon(link)}
                                {getProperty(link, 'title', '')}
                              </NextgenDesktopNavDropdownItem>
                            );
                          }
                          
                          // External link in dropdown
                          if (hasType(link, "external")) {
                            const url = getProperty(link, 'url', '');
                            if (!url) return null;
                            
                            return (
                              <NextgenDesktopNavDropdownItem 
                                key={itemId}
                                href={url}
                                external
                                index={idx}
                                description={getProperty(link, 'description', undefined)}
                              >
                                {renderIcon(link)}
                                {getProperty(link, 'title', '')}
                              </NextgenDesktopNavDropdownItem>
                            );
                          }
                          
                          // Download link in dropdown
                          if (hasType(link, "download")) {
                            const url = getProperty(link, 'url', '');
                            if (!url) return null;
                            
                            return (
                              <NextgenDesktopNavDropdownItem 
                                key={itemId}
                                href={url}
                                external
                                index={idx}
                                description={getProperty(link, 'description', undefined)}
                              >
                                {renderIcon(link)}
                                {getProperty(link, 'title', '')}
                              </NextgenDesktopNavDropdownItem>
                            );
                          }
                          
                          return null;
                        })}
                      </NextgenDesktopNavContent>
                    </NextgenDesktopNavItem>
                  );
                }
                
                return null;
              })}
            </div>
          );
        }
        
        return null;
      })}
    </NextgenDesktopNav>
  );
}
