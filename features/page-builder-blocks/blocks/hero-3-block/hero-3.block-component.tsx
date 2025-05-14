"use client"

import { useEffect, useState } from "react";
import { useGlobalContext } from "@/features/context/global-context";
import { Img, type ImageQuery } from "@/features/unorganized-components/image-component/image.component";
import { Hero3Block } from "@/sanity.types";



export default function Hero3BlockComponent(props: Partial<Hero3Block>) {
  const {
    backgroundImage,
    titleOrange,
    titleWhite,
    subtitle,
    showOverlay = true,
    overlayColor = "0,0,0",
    topOverlayStrength = 0.2,
    upperCenterOverlayStrength = 0.0,
    lowerCenterOverlayStrength = 0.2,
    bottomOverlayStrength = 0.3,
  } = props;
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, setIsTopDark } = sessionStatus;

  useEffect(() => {
    if (sessionLoaded) {
      setIsTopDark(overlayColor === "0,0,0");
    }
  }, [sessionLoaded, setIsTopDark, overlayColor]);
  
  // Capture the initial state of sessionLoaded. If it's false, we should animate.
  // This state won't update even if sessionLoaded becomes true later, ensuring the animations complete.
  const [shouldAnimate] = useState(!sessionLoaded);


  return (
    <div className="relative w-full h-[90vh] md:h-[90vh] overflow-hidden">
      {backgroundImage && (
        <Img
          {...backgroundImage}
          cover
          eager
          className={`animate-scale-in-bg`}
          sizes={{ md: "full" }}
          topImage={true}
        />
      )}

      {showOverlay && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to top,
              rgba(${overlayColor},${bottomOverlayStrength}) 0%,
              rgba(${overlayColor},${lowerCenterOverlayStrength}) 33%,
              rgba(${overlayColor},${upperCenterOverlayStrength}) 66%,
              rgba(${overlayColor},${topOverlayStrength}) 100%
            )`,
          }}
        />
      )}
      
      {/* Content Section: Title Bottom-Left, Subtitle Bottom-Right */}
      <div className="absolute container bottom-0 inset-x-0 flex flex-col md:flex-row justify-between md:items-end pb-4 md:pb-8">
        {/* Left: Title */}
        <div className="text-left">
          {(titleOrange || titleWhite) && (
            <h1 className={`text-white uppercase font-title font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg ${shouldAnimate ? 'animate-fade-in-title' : ''}`}>
              {titleOrange && <span className="block text-orange-500">{titleOrange}</span>}
              {titleWhite && <span className="block">{titleWhite}</span>}
            </h1>
          )}
        </div>
        {/* Right: Subtitle */}
        <div>
          {subtitle && (
            <p className={`mt-2 md:mt-0 text-balance md:text-xl max-w-96 lg:text-2xl text-white drop-shadow-lg ${shouldAnimate ? 'animate-fade-in-subtitle' : ''}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
