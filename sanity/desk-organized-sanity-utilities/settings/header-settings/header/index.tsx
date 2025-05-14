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
import { fetchSanityPageBySlug } from "@/app/(main)/(root)/[slug]/_page-slug-core-utilities/page-slug.server-actions";




export default function Header(props: HeaderSettingsFetchQueryResult) {
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, setIsTopDark, isTopDark } = sessionStatus;
  const [iconLoaded, setIconLoaded] = useState(false);

  

  

  const logoRef = useRef<HTMLDivElement>(null);

  // isLogoHovered
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  // load navigationTextColor from page-slug
  const [navigationTextColor, setNavigationTextColor] = useState<string | null>(null);



  const pathname = usePathname();

  // load navigationTextColor from page-slug
  
  // make it update on route change
  useLayoutEffect(() => {
    // Locate the first <div> within <main> and then search for a <figure> with the "data-cover" attribute.
    // Check if "data-top-image" is true.
    const mainDiv = document.querySelector("main > div");
    const figureEl = mainDiv ? mainDiv.querySelector("figure[data-cover]") : null;

    if (
      figureEl &&
      figureEl.getAttribute("data-cover") === "true" &&
      figureEl.getAttribute("data-top-image") !== "false"
    ) {
      // Get the palette value and convert to a number.
      const paletteStr = figureEl.getAttribute("data-palette");
      const palette = paletteStr ? Number(paletteStr) : NaN;
      if (!Number.isNaN(palette)) {
        // For example, if the palette value is less than 0.4, we consider the top section dark.
        setIsTopDark(palette > 0.4);
      }
    } else {
      // If no figure element is found or it doesn't have the right attributes, set isTopDark to false
      setIsTopDark(false);
    }
  }, [pathname]);

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
