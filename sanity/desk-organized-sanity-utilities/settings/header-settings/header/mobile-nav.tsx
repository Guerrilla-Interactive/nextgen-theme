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
import { useRouter } from "next/navigation";

// Define types for link styles
type LinkStyle = "default" | "button";

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

// Get button style classes based on the parent container background
const getButtonStyleClasses = () => {
  // Mobile nav is always on white background, so use dark button style
  return "bg-black text-white hover:bg-gray-800 py-1.5 px-4 rounded-md shadow-sm font-medium";
};

// Mobile nav button component
function MobileNavButton({
  href,
  isExternal,
  children,
  className,
  onOpenChange
}: {
  href: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const router = useRouter();
  
  const handleClick = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
    
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      className={cn("inline-flex items-center", className)}
    >
      {children}
      {isExternal && <span className="sr-only">(opens in new tab)</span>}
    </button>
  );
}

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

            // Check if this link should use button style
            const linkStyle = getProperty<LinkStyle>(item, 'linkStyle', 'default');
            const buttonClasses = linkStyle === 'button' ? getButtonStyleClasses() : '';
            const isButtonStyle = linkStyle === 'button';

            // Handle regular links (internal or external)
            if (hasType(item, 'internal') || hasType(item, 'external')) {
              const href = hasType(item, 'internal') 
                ? `/${getProperty(item, 'slug', '')}` 
                : getProperty(item, 'url', '');
              
              if (!href) return null;
              
              if (isButtonStyle) {
                return (
                  <MobileNavButton
                    key={navId}
                    href={href}
                    isExternal={hasType(item, 'external')}
                    onOpenChange={setOpen}
                    className={cn(
                      buttonClasses,
                      "flex flex-col"
                    )}
                  >
                    {getProperty(item, 'title', '')}
                  </MobileNavButton>
                );
              }
              
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
                  <div className={cn("font-medium", buttonClasses)}>{getProperty(item, 'title', '')}</div>
                  <div className="grid gap-1 pl-4">
                    {links.map((link) => {
                      const linkId = getProperty(link, '_key', '');
                      const href = hasType(link, 'internal') 
                        ? `/${getProperty(link, 'slug', '')}` 
                        : getProperty(link, 'url', '');
                      
                      if (!href) return null;
                      
                      // Check if this dropdown item should use button style
                      const itemLinkStyle = getProperty<LinkStyle>(link, 'linkStyle', 'default');
                      const itemButtonClasses = itemLinkStyle === 'button' ? "bg-accent text-accent-foreground hover:bg-accent/90 py-1.5 px-4 rounded-md my-1 inline-block" : '';
                      const isItemButtonStyle = itemLinkStyle === 'button';
                      
                      if (isItemButtonStyle) {
                        return (
                          <MobileNavButton
                            key={linkId}
                            href={href}
                            isExternal={hasType(link, 'external')}
                            onOpenChange={setOpen}
                            className={itemButtonClasses}
                          >
                            {getProperty(link, 'title', '')}
                          </MobileNavButton>
                        );
                      }
                      
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
                  <div className={cn("font-medium", buttonClasses)}>{getProperty(item, 'title', '')}</div>
                  <div className="grid gap-1 pl-4">
                    {items.map((groupItem) => {
                      const groupItemId = getProperty(groupItem, '_key', '');
                      
                      // Check if this group item should use button style
                      const itemLinkStyle = getProperty<LinkStyle>(groupItem, 'linkStyle', 'default');
                      const itemButtonClasses = itemLinkStyle === 'button' ? "bg-accent text-accent-foreground hover:bg-accent/90 py-1.5 px-4 rounded-md my-1 inline-block" : '';
                      const isItemButtonStyle = itemLinkStyle === 'button';
                      
                      // Regular links in group
                      if (hasType(groupItem, 'internal') || hasType(groupItem, 'external')) {
                        const href = hasType(groupItem, 'internal') 
                          ? `/${getProperty(groupItem, 'slug', '')}` 
                          : getProperty(groupItem, 'url', '');
                        
                        if (!href) return null;
                        
                        if (isItemButtonStyle) {
                          return (
                            <MobileNavButton
                              key={groupItemId}
                              href={href}
                              isExternal={hasType(groupItem, 'external')}
                              onOpenChange={setOpen}
                              className={itemButtonClasses}
                            >
                              {getProperty(groupItem, 'title', '')}
                            </MobileNavButton>
                          );
                        }
                        
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
                            <div className={cn("font-medium text-sm mb-1", itemButtonClasses)}>{getProperty(groupItem, 'title', '')}</div>
                            <div className="grid gap-1 pl-3">
                              {links.map((link) => {
                                const linkId = getProperty(link, '_key', '');
                                const href = hasType(link, 'internal') 
                                  ? `/${getProperty(link, 'slug', '')}` 
                                  : getProperty(link, 'url', '');
                                
                                if (!href) return null;
                                
                                // Check if this inner dropdown item should use button style
                                const innerLinkStyle = getProperty<LinkStyle>(link, 'linkStyle', 'default');
                                const innerButtonClasses = innerLinkStyle === 'button' ? "bg-accent text-accent-foreground hover:bg-accent/90 py-1 px-3 rounded-md my-1 inline-block text-sm" : '';
                                const isInnerButtonStyle = innerLinkStyle === 'button';
                                
                                if (isInnerButtonStyle) {
                                  return (
                                    <MobileNavButton
                                      key={linkId}
                                      href={href}
                                      isExternal={hasType(link, 'external')}
                                      onOpenChange={setOpen}
                                      className={innerButtonClasses}
                                    >
                                      {getProperty(link, 'title', '')}
                                    </MobileNavButton>
                                  );
                                }
                                
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
