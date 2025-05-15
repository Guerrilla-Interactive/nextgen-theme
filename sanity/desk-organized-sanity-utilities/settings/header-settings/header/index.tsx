"use client"

import {  useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

import DesktopNav from "./desktop-nav";
import { usePathname } from "next/navigation";

import MobileNav from "./mobile-nav";
import { useGlobalContext } from "@/features/context/global-context";
import { cn } from "@/features/unorganized-utils/utils";

import { FlexCol, FlexRow } from "@/features/unorganized-components/nextgen-core-ui";
import { Icon } from "@iconify/react";
import { HeaderSettingsFetchQueryResult } from "@/sanity.types";

import DefaultLogo from "@/features/theme/DefaultLogo";





export default function Header(props: HeaderSettingsFetchQueryResult) {
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, setIsTopDark, isTopDark } = sessionStatus;
  const [iconLoaded, setIconLoaded] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  

  return (
    <>
      <header
        className={cn(
          "absolute top-0 w-full border-border/40 z-50 transition-opacity   ",
          !isTopDark ? "text-black" : "text-white",
          iconLoaded && !sessionLoaded && "animate-fade-down-slow",
          iconLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className={cn(`container`, sessionLoaded ? "duration-600" : "duration-0")}>
          <FlexRow notAuto  className={cn(`justify-between pt-1 border-b pb-1 font-light`, isTopDark ? "border-white/20" : "border-black/20")}>
            {/* Mail, availability, phone number */}
            
            <FlexCol className=" items-center hidden md:flex hover:underline">
            <Link href={`mailto:${props?.email?.email}`}>
              <FlexRow notAuto className=" items-center gap-2 ">
                <Icon icon={props?.email?.icon.name} onLoad={() => setIconLoaded(true)} />
                <p>{props?.email?.email}</p>
              </FlexRow>
            </Link>
            </FlexCol>
            
            <FlexCol className="">
              <FlexRow className="items-center gap-2">
                <FlexCol className="gap-2 hover:underline">
                  <Link href={`tel:${props?.phoneNumber?.phoneNumber}`}>
                    <FlexRow notAuto className="items-center gap-2">
                      <Icon icon={props?.phoneNumber?.icon.name} onLoad={() => setIconLoaded(true)} />
                      <p>{props?.phoneNumber?.phoneNumber}</p>
                      <FlexCol className="gap-2">
                        <p>{props?.phoneNumber?.additionalText}</p>
                      </FlexCol>
                    </FlexRow>
                  </Link>
                </FlexCol>
              </FlexRow>
            </FlexCol>
          </FlexRow>

          <div className="flex items-center justify-between h-14">
            <Link href="/" aria-label="Home page">
            <div ref={logoRef} onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}  className="w-52 h-full">
              <DefaultLogo duration={1000}  activeKeyframe={isTopDark ? "last" : "first"} />
              </div>
            </Link>
            <div className="hidden xl:flex gap-7 items-center justify-between">
              <DesktopNav navItems={props?.navigationItems || []} />
              {/* <ModeToggle /> */}
            </div>
            <div className="flex items-center xl:hidden">
                    {/* <ModeToggle /> */}
              <MobileNav navItems={props?.navigationItems || []} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
