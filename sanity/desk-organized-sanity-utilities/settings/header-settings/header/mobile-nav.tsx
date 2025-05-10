"use client";

import Link from "next/link";
import { useState } from "react";
import { TextAlignRightIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/features/unorganized-components/ui/sheet";
import { Button } from "@/features/unorganized-components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/unorganized-components/ui/accordion";
import { cn } from "@/features/unorganized-utils/utils";
import Logo from "../../../../../features/theme/logo";
import { HeaderSettingsFetchQueryResult } from "@/sanity.types";
import DefaultLogo from "@/features/theme/DefaultLogo";

export default function MobileNav({ navItems }: { navItems: HeaderSettingsFetchQueryResult["navigationItems"] }) {
  const [open, setOpen] = useState(false);
  
  if (!navItems) return null;
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-[1.75rem] p-5 xl:hidden focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <TextAlignRightIcon className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <div className="mr-6 w-full max-w-36 h-full ">
            <DefaultLogo activeKeyframe={"first"}  />
          </div>
          
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container px-0">
            <nav className="space-y-4">
              {navItems.map((navItem) => {
                // Handle internal links
                if (navItem.linkType === "internal") {
                  if (!('slug' in navItem) || !navItem.slug) return null;
                  
                  return (
                    <div key={navItem._key} className="py-2">
                      <Link
                        href={`/${navItem.slug}`}
                        className="text-base font-medium transition-colors hover:text-primary text-right block"
                        onClick={() => setOpen(false)}
                      >
                        {'title' in navItem ? navItem.title || "" : ""}
                      </Link>
                    </div>
                  );
                }
                
                // Handle external links
                if (navItem.linkType === "external") {
                  if (!('url' in navItem) || !navItem.url) return null;
                  
                  return (
                    <div key={navItem._key} className="py-2">
                      <Link
                        href={navItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium transition-colors hover:text-primary text-right block"
                        onClick={() => setOpen(false)}
                      >
                        {'title' in navItem ? navItem.title || "" : ""}
                      </Link>
                    </div>
                  );
                }
                
                // Handle link groups with accordion
                if (navItem.linkType === "linkGroup") {
                  if (!('links' in navItem) || !navItem.links || navItem.links.length === 0) return null;
                  
                  return (
                    <Accordion 
                      type="single" 
                      collapsible 
                      key={navItem._key} 
                      className="w-full border-b-0"
                    >
                      <AccordionItem value={navItem._key} className="border-b-0">
                        <AccordionTrigger className="text-base justify-end font-medium text-right py-2">
                          {'title' in navItem ? navItem.title || "" : ""}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2 pl-4">
                            {navItem.links.map((link) => {
                              if (link.linkType === "internal") {
                                if (!('slug' in link) || !link.slug) return null;
                                
                                return (
                                  <div key={link._key} className="py-1">
                                    <Link
                                      href={`/${link.slug}`}
                                      className="text-sm transition-colors hover:text-primary text-right block"
                                      onClick={() => setOpen(false)}
                                    >
                                      {'title' in link ? link.title || "" : ""}
                                    </Link>
                                  </div>
                                );
                              }
                              
                              if (link.linkType === "external") {
                                if (!('url' in link) || !link.url) return null;
                                
                                return (
                                  <div key={link._key} className="py-1">
                                    <Link
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm transition-colors hover:text-primary text-right block"
                                      onClick={() => setOpen(false)}
                                    >
                                      {'title' in link ? link.title || "" : ""}
                                    </Link>
                                  </div>
                                );
                              }
                              
                              return null;
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }
                
                return null;
              })}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
