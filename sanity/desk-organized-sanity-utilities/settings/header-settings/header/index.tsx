"use client"

import { useState } from "react";
import Link from "next/link";

import DesktopNav from "./desktop-nav";
import { stegaClean } from "next-sanity";
import MobileNav from "./mobile-nav";
import { useGlobalContext } from "@/features/context/global-context";
import { cn } from "@/features/unorganized-utils/utils";

import { TopBar } from "./nextgen-top-bar.component";
import { NextgenLogo } from "./nextgen-logo.component";

export default function Header(props: any) {
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, isTopDark } = sessionStatus;

  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <>
      <header
        className={cn(
          "absolute top-4 w-full border-border/40 z-50 transition-opacity",
          !isTopDark ? "text-black" : "text-white",
          iconLoaded && !sessionLoaded && "animate-fade-down-slow",
          iconLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className={cn(`container mx-auto`, sessionLoaded ? "duration-600" : "duration-0")}>
          {props.enableTopBar && (
            <TopBar 
              topBar={props.topBar || {}} 
              isTopDark={isTopDark} 
              setIconLoaded={setIconLoaded} 
              iconLoaded={iconLoaded} 
            />
          )}

          <div className="flex items-center   p-2  backdrop-blur-sm border  border-solid border-white/5  rounded-lg justify-between h-16">
            <Link href="/" aria-label="Home page">
              <NextgenLogo 
                logoOptions={(stegaClean(props.logoOptions) as any) || props.logoOptions}
                isTopDark={isTopDark}
                onLoaded={() => setIconLoaded(true)}
              />
            </Link>
            <div className={cn("hidden xl:flex items-center", props.navigationConfig?.justifyContent || "justify-between", "w-full")}>
              <DesktopNav 
                navItems={props?.navigationItems || []} 
                navigationConfig={{ justifyContent: (stegaClean(props.navigationConfig?.justifyContent) as string) || props.navigationConfig?.justifyContent }}
                isTopDark={isTopDark} 
              />
            </div>
            <div className="flex items-center xl:hidden">
              <MobileNav navItems={props?.navigationItems || []} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
