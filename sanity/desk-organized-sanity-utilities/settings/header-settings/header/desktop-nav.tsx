import Link from "next/link";
import { HeaderSettingsFetchQueryResult } from "@/sanity.types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/features/unorganized-components/ui/navigation-menu";
import { cn } from "@/features/unorganized-utils/utils";

export default function DesktopNav({ navItems }: { navItems: HeaderSettingsFetchQueryResult["navigationItems"] }) {
  if (!navItems) return null;

  return (
    <NavigationMenu className="hidden xl:flex font-supplement uppercase">
      <NavigationMenuList className="gap-4">
        {navItems.map((navItem) => {
          // Handle internal links
          if (navItem.linkType === "internal") {
            if (!('slug' in navItem) || !navItem.slug) return null;
            
            return (
              <NavigationMenuItem key={navItem._key}>
                <Link href={`/${navItem.slug}`} legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm transition-colors px-3 py-2">
                    {'title' in navItem ? navItem.title || "" : ""}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          } 
          
          // Handle external links
          if (navItem.linkType === "external") {
            if (!('url' in navItem) || !navItem.url) return null;
            
            return (
              <NavigationMenuItem key={navItem._key}>
                <Link href={navItem.url} target="_blank" rel="noopener noreferrer" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm transition-colors px-3 py-2">
                    {'title' in navItem ? navItem.title || "" : ""}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }
          
          // Handle link groups with dropdown
          if (navItem.linkType === "linkGroup") {
            if (!('links' in navItem) || !navItem.links || navItem.links.length === 0) return null;
            
            return (
              <NavigationMenuItem key={navItem._key}>
                <NavigationMenuTrigger className="text-sm transition-colors px-3 py-2">
                  {'title' in navItem ? navItem.title || "" : ""}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-4">
                    {navItem.links.map((link) => {
                      // Internal link in dropdown
                      if (link.linkType === "internal") {
                        if (!('slug' in link) || !link.slug) return null;
                        
                        return (
                          <li key={link._key}>
                            <Link href={`/${link.slug}`} legacyBehavior passHref>
                              <NavigationMenuLink
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                              >
                                <div className="text-sm font-medium">
                                  {'title' in link ? link.title || "" : ""}
                                </div>
                                {'description' in link && link.description && (
                                  <p className="text-xs leading-tight text-muted-foreground">
                                    {link.description}
                                  </p>
                                )}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        );
                      }
                      
                      // External link in dropdown
                      if (link.linkType === "external") {
                        if (!('url' in link) || !link.url) return null;
                        
                        return (
                          <li key={link._key}>
                            <Link 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              legacyBehavior 
                              passHref
                            >
                              <NavigationMenuLink
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                              >
                                <div className="text-sm font-medium">
                                  {'title' in link ? link.title || "" : ""}
                                </div>
                                {'description' in link && link.description && (
                                  <p className="text-xs leading-tight text-muted-foreground">
                                    {link.description}
                                  </p>
                                )}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        );
                      }
                      
                      return null;
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          
          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
