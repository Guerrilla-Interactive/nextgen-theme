
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
} from "./nextgen-desktop-nav/nextgen-desktop-nav.component";
import { type NavStyleProps } from "./nextgen-desktop-nav/nextgen-desktop-nav.types";
import { cn } from "@/features/unorganized-utils/utils";
import { useRouter } from "next/navigation";
import { stegaClean } from "next-sanity";

// Define types for link styles
type LinkStyle = "default" | "button";

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

// Function to get button style classes
const getButtonStyleClasses = (isTopDark: boolean) => {
  return isTopDark
    ? "bg-primary text-foreground hover:bg-primary/90 py-1.5 px-4 rounded-md shadow-sm font-medium text-sm cursor-pointer"
    : "bg-primary text-white hover:bg-primary/90 py-1.5 px-4 rounded-md shadow-sm font-medium text-sm cursor-pointer";
};

// Button component for CTAs
function NavButton({ 
  href, 
  isExternal, 
  children, 
  className 
}: { 
  href: string; 
  isExternal?: boolean; 
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  
  const handleClick = () => {
    const cleanedHref = (stegaClean(href) as string) || href;
    const cleanedExternal = !!stegaClean(isExternal);
    if (cleanedExternal) {
      window.open(cleanedHref, '_blank', 'noopener,noreferrer');
    } else {
      router.push(cleanedHref);
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      className={cn("inline-flex items-center justify-center", className)}
      aria-label={isExternal ? "Opens in a new window" : undefined}
    >
      {children}
      {isExternal && <span className="sr-only">(opens in new tab)</span>}
    </button>
  );
}

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
      justifyContent={(stegaClean(navigationConfig?.justifyContent) as string) || navigationConfig?.justifyContent}
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
        
        // Check if this link should use button style
        const linkStyle = getProperty<LinkStyle>(navItem, 'linkStyle', 'default');
        const buttonClasses = linkStyle === 'button' ? getButtonStyleClasses(isTopDark) : '';
        const isButtonStyle = linkStyle === 'button';
        
        // Handle internal links
        if (hasType(navItem, "internal")) {
          const slug = stegaClean(getProperty(navItem, 'slug', '')) as string;
          if (!slug) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              {isButtonStyle ? (
                <NavButton 
                  href={`/${slug}`} 
                  className={buttonClasses}
                >
                  {renderIcon(navItem)}
                  {getProperty(navItem, 'title', '')}
                </NavButton>
              ) : (
                <Link href={`/${slug}`} passHref legacyBehavior>
                  <NextgenDesktopNavLink>
                    {renderIcon(navItem)}
                    {getProperty(navItem, 'title', '')}
                  </NextgenDesktopNavLink>
                </Link>
              )}
            </NextgenDesktopNavItem>
          );
        } 
        
        // Handle external links
        if (hasType(navItem, "external")) {
          const url = stegaClean(getProperty(navItem, 'url', '')) as string;
          if (!url) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              {isButtonStyle ? (
                <NavButton 
                  href={url} 
                  isExternal 
                  className={buttonClasses}
                >
                  {renderIcon(navItem)}
                  {getProperty(navItem, 'title', '')}
                </NavButton>
              ) : (
                <Link href={url} passHref legacyBehavior>
                  <NextgenDesktopNavLink external>
                    {renderIcon(navItem)}
                    {getProperty(navItem, 'title', '')}
                  </NextgenDesktopNavLink>
                </Link>
              )}
            </NextgenDesktopNavItem>
          );
        }
        
        // Handle download links
        if (hasType(navItem, "download")) {
          const url = stegaClean(getProperty(navItem, 'url', '')) as string;
          if (!url) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              {isButtonStyle ? (
                <NavButton 
                  href={url} 
                  isExternal 
                  className={buttonClasses}
                >
                  {renderIcon(navItem)}
                  {getProperty(navItem, 'title', '')}
                </NavButton>
              ) : (
                <Link href={url} passHref legacyBehavior>
                  <NextgenDesktopNavLink external>
                    {renderIcon(navItem)}
                    {getProperty(navItem, 'title', '')}
                  </NextgenDesktopNavLink>
                </Link>
              )}
            </NextgenDesktopNavItem>
          );
        }
        
        // Handle dropdown groups (formerly called linkGroup) with dropdown menu
        if (hasType(navItem, "dropdownGroup")) {
          const links = getProperty<any[]>(navItem, 'links', []);
          if (links.length === 0) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <NextgenDesktopNavTrigger id={navId} className={buttonClasses}>
                {renderIcon(navItem)}
                {getProperty(navItem, 'title', '')}
              </NextgenDesktopNavTrigger>
              
              <NextgenDesktopNavBridge />
              
              <NextgenDesktopNavContent id={navId}>
                {links.map((link, idx) => {
                  // Create unique ID for this menu item
                  const itemId = getProperty(link, '_key', `item-${Math.random().toString(36).substring(2, 9)}`);
                  
                  // Check if this dropdown item should use button style
                  const itemLinkStyle = getProperty<LinkStyle>(link, 'linkStyle', 'default');
                  const itemButtonClasses = itemLinkStyle === 'button' ? "bg-accent text-accent-foreground hover:bg-accent/90 py-1 px-3 rounded-md mt-1 mb-1 inline-block text-sm font-medium" : '';
                  
                  // Internal link in dropdown
                  if (hasType(link, "internal")) {
                    const slug = stegaClean(getProperty(link, 'slug', '')) as string;
                    if (!slug) return null;
                    
                    if (itemLinkStyle === 'button') {
                      return (
                        <div key={itemId} className="px-3.5 py-3">
                          <NavButton 
                            href={`/${slug}`} 
                            className={itemButtonClasses}
                          >
                            {renderIcon(link)}
                            {getProperty(link, 'title', '')}
                          </NavButton>
                          {getProperty(link, 'description', undefined) && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {getProperty(link, 'description', '')}
                            </p>
                          )}
                        </div>
                      );
                    }
                    
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
                    const url = stegaClean(getProperty(link, 'url', '')) as string;
                    if (!url) return null;
                    
                    if (itemLinkStyle === 'button') {
                      return (
                        <div key={itemId} className="px-3.5 py-3">
                          <NavButton 
                            href={url} 
                            isExternal 
                            className={itemButtonClasses}
                          >
                            {renderIcon(link)}
                            {getProperty(link, 'title', '')}
                          </NavButton>
                          {getProperty(link, 'description', undefined) && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {getProperty(link, 'description', '')}
                            </p>
                          )}
                        </div>
                      );
                    }
                    
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
                    const url = stegaClean(getProperty(link, 'url', '')) as string;
                    if (!url) return null;
                    
                    if (itemLinkStyle === 'button') {
                      return (
                        <div key={itemId} className="px-3.5 py-3">
                          <NavButton 
                            href={url} 
                            isExternal 
                            className={itemButtonClasses}
                          >
                            {renderIcon(link)}
                            {getProperty(link, 'title', '')}
                          </NavButton>
                          {getProperty(link, 'description', undefined) && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {getProperty(link, 'description', '')}
                            </p>
                          )}
                        </div>
                      );
                    }
                    
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
                
                // Check if this group item should use button style
                const itemLinkStyle = getProperty<LinkStyle>(groupItem, 'linkStyle', 'default');
                const itemButtonClasses = itemLinkStyle === 'button' ? getButtonStyleClasses(isTopDark) : '';
                const isItemButtonStyle = itemLinkStyle === 'button';
                
                // Internal link in horizontal group
                if (hasType(groupItem, "internal")) {
                  const slug = getProperty(groupItem, 'slug', '');
                  if (!slug) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      {isItemButtonStyle ? (
                        <NavButton 
                          href={`/${slug}`} 
                          className={itemButtonClasses}
                        >
                          {renderIcon(groupItem)}
                          {getProperty(groupItem, 'title', '')}
                        </NavButton>
                      ) : (
                        <Link href={`/${slug}`} passHref legacyBehavior>
                          <NextgenDesktopNavLink>
                            {renderIcon(groupItem)}
                            {getProperty(groupItem, 'title', '')}
                          </NextgenDesktopNavLink>
                        </Link>
                      )}
                    </NextgenDesktopNavItem>
                  );
                }
                
                // External link in horizontal group
                if (hasType(groupItem, "external")) {
                  const url = getProperty(groupItem, 'url', '');
                  if (!url) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      {isItemButtonStyle ? (
                        <NavButton 
                          href={url} 
                          isExternal 
                          className={itemButtonClasses}
                        >
                          {renderIcon(groupItem)}
                          {getProperty(groupItem, 'title', '')}
                        </NavButton>
                      ) : (
                        <Link href={url} passHref legacyBehavior>
                          <NextgenDesktopNavLink external>
                            {renderIcon(groupItem)}
                            {getProperty(groupItem, 'title', '')}
                          </NextgenDesktopNavLink>
                        </Link>
                      )}
                    </NextgenDesktopNavItem>
                  );
                }
                
                // Download link in horizontal group
                if (hasType(groupItem, "download")) {
                  const url = getProperty(groupItem, 'url', '');
                  if (!url) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      {isItemButtonStyle ? (
                        <NavButton 
                          href={url} 
                          isExternal 
                          className={itemButtonClasses}
                        >
                          {renderIcon(groupItem)}
                          {getProperty(groupItem, 'title', '')}
                        </NavButton>
                      ) : (
                        <Link href={url} passHref legacyBehavior>
                          <NextgenDesktopNavLink external>
                            {renderIcon(groupItem)}
                            {getProperty(groupItem, 'title', '')}
                          </NextgenDesktopNavLink>
                        </Link>
                      )}
                    </NextgenDesktopNavItem>
                  );
                }
                
                // Dropdown group within horizontal group
                if (hasType(groupItem, "dropdownGroup")) {
                  const links = getProperty<any[]>(groupItem, 'links', []);
                  if (links.length === 0) return null;
                  
                  return (
                    <NextgenDesktopNavItem key={groupItemId} id={groupItemId}>
                      <NextgenDesktopNavTrigger id={groupItemId} className={itemButtonClasses}>
                        {renderIcon(groupItem)}
                        {getProperty(groupItem, 'title', '')}
                      </NextgenDesktopNavTrigger>
                      
                      <NextgenDesktopNavBridge />
                      
                      <NextgenDesktopNavContent id={groupItemId}>
                        {links.map((link, idx) => {
                          // Create unique ID for this menu item
                          const itemId = getProperty(link, '_key', `item-${Math.random().toString(36).substring(2, 9)}`);
                          
                          // Check if this dropdown item should use button style
                          const dropdownItemLinkStyle = getProperty<LinkStyle>(link, 'linkStyle', 'default');
                          const dropdownItemButtonClasses = dropdownItemLinkStyle === 'button' ? "bg-accent text-accent-foreground hover:bg-accent/90 py-1 px-3 rounded-md mt-1 mb-1 inline-block text-sm font-medium" : '';
                          
                          // Internal link in dropdown
                          if (hasType(link, "internal")) {
                            const slug = getProperty(link, 'slug', '');
                            if (!slug) return null;
                            
                            if (dropdownItemLinkStyle === 'button') {
                              return (
                                <div key={itemId} className="px-3.5 py-3">
                                  <NavButton 
                                    href={`/${slug}`} 
                                    className={dropdownItemButtonClasses}
                                  >
                                    {renderIcon(link)}
                                    {getProperty(link, 'title', '')}
                                  </NavButton>
                                  {getProperty(link, 'description', undefined) && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {getProperty(link, 'description', '')}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                            
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
                            
                            if (dropdownItemLinkStyle === 'button') {
                              return (
                                <div key={itemId} className="px-3.5 py-3">
                                  <NavButton 
                                    href={url} 
                                    isExternal 
                                    className={dropdownItemButtonClasses}
                                  >
                                    {renderIcon(link)}
                                    {getProperty(link, 'title', '')}
                                  </NavButton>
                                  {getProperty(link, 'description', undefined) && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {getProperty(link, 'description', '')}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                            
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
                            
                            if (dropdownItemLinkStyle === 'button') {
                              return (
                                <div key={itemId} className="px-3.5 py-3">
                                  <NavButton 
                                    href={url} 
                                    isExternal 
                                    className={dropdownItemButtonClasses}
                                  >
                                    {renderIcon(link)}
                                    {getProperty(link, 'title', '')}
                                  </NavButton>
                                  {getProperty(link, 'description', undefined) && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {getProperty(link, 'description', '')}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                            
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
