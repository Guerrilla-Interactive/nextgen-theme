import { HeaderSettingsFetchQueryResult } from "@/sanity.types";
import Link from "next/link";
import {
  NextgenDesktopNav,
  NextgenDesktopNavItem,
  NextgenDesktopNavLink,
  NextgenDesktopNavTrigger,
  NextgenDesktopNavBridge,
  NextgenDesktopNavContent,
  NextgenDesktopNavDropdownItem,
  type NavStyleProps,
} from "@/features/unorganized-components/ui/nextgen-desktop-nav";

export default function HeaderDesktopNav({ 
  isTopDark,
  navItems,
  styleProps
}: { 
  navItems: HeaderSettingsFetchQueryResult["navigationItems"],
  isTopDark: boolean,
  styleProps?: NavStyleProps
}) {
  if (!navItems) return null;
  
  return (
    <NextgenDesktopNav
      isTopDark={isTopDark}
      styleProps={styleProps}
    >
      {navItems.map((navItem) => {
        // Create unique ID for this nav item
        const navId = navItem._key || `nav-${Math.random().toString(36).substring(2, 9)}`;
        
        // Handle internal links
        if (navItem.linkType === "internal") {
          if (!('slug' in navItem) || !navItem.slug) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <Link href={`/${navItem.slug}`} passHref legacyBehavior>
                <NextgenDesktopNavLink>
                  {'title' in navItem ? navItem.title || "" : ""}
                </NextgenDesktopNavLink>
              </Link>
            </NextgenDesktopNavItem>
          );
        } 
        
        // Handle external links
        if (navItem.linkType === "external") {
          if (!('url' in navItem) || !navItem.url) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <Link href={navItem.url} passHref legacyBehavior>
                <NextgenDesktopNavLink external>
                  {'title' in navItem ? navItem.title || "" : ""}
                </NextgenDesktopNavLink>
              </Link>
            </NextgenDesktopNavItem>
          );
        }
        
        // Handle link groups with dropdown
        if (navItem.linkType === "linkGroup") {
          if (!('links' in navItem) || !navItem.links || navItem.links.length === 0) return null;
          
          return (
            <NextgenDesktopNavItem key={navId} id={navId}>
              <NextgenDesktopNavTrigger id={navId}>
                {'title' in navItem ? navItem.title || "" : ""}
              </NextgenDesktopNavTrigger>
              
              <NextgenDesktopNavBridge />
              
              <NextgenDesktopNavContent id={navId}>
                {navItem.links.map((link, idx) => {
                  // Create unique ID for this menu item
                  const itemId = link._key || `item-${Math.random().toString(36).substring(2, 9)}`;
                  
                  // Internal link in dropdown
                  if (link.linkType === "internal") {
                    if (!('slug' in link) || !link.slug) return null;
                    
                    return (
                      <NextgenDesktopNavDropdownItem 
                        key={itemId}
                        href={`/${link.slug}`}
                        index={idx}
                        description={'description' in link ? link.description : undefined}
                      >
                        {'title' in link ? link.title || "" : ""}
                      </NextgenDesktopNavDropdownItem>
                    );
                  }
                  
                  // External link in dropdown
                  if (link.linkType === "external") {
                    if (!('url' in link) || !link.url) return null;
                    
                    return (
                      <NextgenDesktopNavDropdownItem 
                        key={itemId}
                        href={link.url}
                        external
                        index={idx}
                        description={'description' in link ? link.description : undefined}
                      >
                        {'title' in link ? link.title || "" : ""}
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
    </NextgenDesktopNav>
  );
}
