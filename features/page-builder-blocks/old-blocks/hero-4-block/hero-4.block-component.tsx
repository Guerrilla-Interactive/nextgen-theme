"use client"

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/features/context/global-context";
import { Img, type ImageQuery } from "@/features/unorganized-components/image-component/image.component";
import { Absolute, Container, Relative, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Hero4Block } from "@/sanity.types";


export default function Hero4BlockComponent(props: Partial<Hero4Block>) {
  const {
    backgroundImage,
    title,
    description,
    showOverlay = true,
    topOverlayStrength = 0.2,
    upperCenterOverlayStrength = 0.0,
    lowerCenterOverlayStrength = 0.2,
    bottomOverlayStrength = 0.3,
  } = props;
  
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, setIsTopDark, isTopDark } = sessionStatus;

  
  // Capture the initial state of sessionLoaded for animations
  const [shouldAnimate] = useState(!sessionLoaded);

  // if show overlay is true, set is top dark to true
  useEffect(() => {
    if (showOverlay) {
      setIsTopDark(true);
    }
  }, [showOverlay]);

  return (

    <>
    <Section className="h-[27.5rem]  relative overflow-x-hidden">
    <Absolute className="left-0 top-0 w-screen z-0 h-full overflow-hidden">
      <Relative className="w-full h-full ">
      {backgroundImage && (
         <Img
         {...backgroundImage}
         cover
         className="w-full z-0 h-full object-fit"
         eager

         sizes={{ md: "full" }}
       />
       
     )}
       {showOverlay && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0,0,0,${bottomOverlayStrength}) 0%,
              rgba(0,0,0,${lowerCenterOverlayStrength}) 33%,
              rgba(0,0,0,${upperCenterOverlayStrength}) 66%,
              rgba(0,0,0,${topOverlayStrength}) 100%
            )`,
          }}
        />
      )}
           </Relative>
           </Absolute>
      
        <Container   className="z-50 justify-end pb-6">
            {title && (
              <h1 className={`text-white text-2xl md:text-5xl  font-bold mb-4 ${shouldAnimate ? 'animate-fade-in-title' : ''}`}>
                {title}
              </h1>
            )}
            {description && (
              <p className={`text-white/80 text-sm md:text-base max-w-2xl ${shouldAnimate ? 'animate-fade-in-subtitle delay-150' : ''}`}>
                {description}
              </p>
            )}
        </Container>
      

     </Section>


      
      {/* Content Section: Centered Content */}
  
    
    </>
  );
}
