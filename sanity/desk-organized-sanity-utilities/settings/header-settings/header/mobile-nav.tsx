"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { TextAlignRightIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/features/unorganized-components/ui/sheet";
import { Button } from "@/features/unorganized-components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/unorganized-components/ui/accordion";
import { HeaderSettingsFetchQueryResult } from "@/sanity.types";
import SVGLoopLogo from "@/features/theme/SVGLoopLogo";
import { Menu } from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";

// Define utility functions for type-safe property access
const hasType = (item: any, type: string): boolean => {
  return item && typeof item === 'object' && 'linkType' in item && item.linkType === type;
};

const getProperty = <T,>(item: any, property: string, defaultValue: T): T => {
  if (item && typeof item === 'object' && property in item) {
    return item[property] || defaultValue;
  }
  return defaultValue;
};

export default function MobileNav({ navItems }: { navItems: HeaderSettingsFetchQueryResult["navigationItems"] }) {
  const [open, setOpen] = useState(false);
  
  if (!navItems) return null;
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="font-bold">Home</span>
        </MobileLink>
        <div className="flex flex-col space-y-3 pt-6">
          {navItems.map((item) => {
            // Create a unique key for this navigation item
            const navId = getProperty(item, '_key', '');

            // Handle regular links (internal or external)
            if (hasType(item, 'internal') || hasType(item, 'external')) {
              const href = hasType(item, 'internal') 
                ? `/${getProperty(item, 'slug', '')}` 
                : getProperty(item, 'url', '');
              
              if (!href) return null;
              
              return (
                <MobileLink
                  key={navId}
                  href={href}
                  onOpenChange={setOpen}
                  className={cn(
                    "text-foreground/70 transition-colors hover:text-foreground",
                    "flex flex-col"
                  )}
                >
                  {getProperty(item, 'title', '')}
                </MobileLink>
              );
            }
            
            // Handle dropdown groups (previously called linkGroup)
            if (hasType(item, 'dropdownGroup')) {
              const links = getProperty<any[]>(item, 'links', []);
              if (links.length === 0) return null;
              
              return (
                <div key={navId} className="flex flex-col space-y-2">
                  <div className="font-medium">{getProperty(item, 'title', '')}</div>
                  <div className="grid gap-1 pl-4">
                    {links.map((link) => {
                      const linkId = getProperty(link, '_key', '');
                      const href = hasType(link, 'internal') 
                        ? `/${getProperty(link, 'slug', '')}` 
                        : getProperty(link, 'url', '');
                      
                      if (!href) return null;
                      
                      return (
                        <MobileLink
                          key={linkId}
                          href={href}
                          onOpenChange={setOpen}
                          className="text-foreground/70 transition-colors hover:text-foreground"
                        >
                          {getProperty(link, 'title', '')}
                        </MobileLink>
                      );
                    })}
                  </div>
                </div>
              );
            }
            
            // Handle link groups (horizontal groups)
            if (hasType(item, 'linkGroup')) {
              const items = getProperty<any[]>(item, 'items', []);
              if (items.length === 0) return null;
              
              return (
                <div key={navId} className="flex flex-col space-y-2">
                  <div className="font-medium">{getProperty(item, 'title', '')}</div>
                  <div className="grid gap-1 pl-4">
                    {items.map((groupItem) => {
                      const groupItemId = getProperty(groupItem, '_key', '');
                      
                      // Regular links in group
                      if (hasType(groupItem, 'internal') || hasType(groupItem, 'external')) {
                        const href = hasType(groupItem, 'internal') 
                          ? `/${getProperty(groupItem, 'slug', '')}` 
                          : getProperty(groupItem, 'url', '');
                        
                        if (!href) return null;
                        
                        return (
                          <MobileLink
                            key={groupItemId}
                            href={href}
                            onOpenChange={setOpen}
                            className="text-foreground/70 transition-colors hover:text-foreground"
                          >
                            {getProperty(groupItem, 'title', '')}
                          </MobileLink>
                        );
                      }
                      
                      // Dropdown groups within linkGroups
                      if (hasType(groupItem, 'dropdownGroup')) {
                        const links = getProperty<any[]>(groupItem, 'links', []);
                        if (links.length === 0) return null;
                        
                        return (
                          <div key={groupItemId} className="flex flex-col pt-2 pb-1">
                            <div className="font-medium text-sm mb-1">{getProperty(groupItem, 'title', '')}</div>
                            <div className="grid gap-1 pl-3">
                              {links.map((link) => {
                                const linkId = getProperty(link, '_key', '');
                                const href = hasType(link, 'internal') 
                                  ? `/${getProperty(link, 'slug', '')}` 
                                  : getProperty(link, 'url', '');
                                
                                if (!href) return null;
                                
                                return (
                                  <MobileLink
                                    key={linkId}
                                    href={href}
                                    onOpenChange={setOpen}
                                    className="text-foreground/70 transition-colors hover:text-foreground text-sm"
                                  >
                                    {getProperty(link, 'title', '')}
                                  </MobileLink>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                      
                      return null;
                    })}
                  </div>
                </div>
              );
            }
            
            return null;
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href || '#'}
      onClick={() => onOpenChange?.(false)}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
