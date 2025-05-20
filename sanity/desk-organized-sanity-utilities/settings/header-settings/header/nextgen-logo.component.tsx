"use client"

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SVGLoopLogo from "@/features/theme/SVGLoopLogo";
import { cn } from "@/features/unorganized-utils/utils";

type LogoOptionsType = {
  logoType?: "svgloop" | "default" | "lightAndDark";
  svgloopLogo?: string;
  defaultLogo?: any; // Image asset
  lightAndDarkLogo?: {
    logoType?: "svg" | "image";
    lightLogo?: any; // Image asset
    darkLogo?: any; // Image asset
  };
};

type NextgenLogoProps = {
  logoOptions: LogoOptionsType;
  logo: any; // This could be the SVG data, image asset, or the light/dark object
  isTopDark: boolean;
  className?: string;
  onLoaded?: () => void;
};

export const NextgenLogo = ({ 
  logoOptions, 
  logo, 
  isTopDark, 
  className = "w-52 px-6 h-full",
  onLoaded 
}: NextgenLogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Call the onLoaded callback when component mounts or image loads
  useEffect(() => {
    // For SVGLoop, we'll call onLoaded immediately since we can't hook into its loading
    if (logoOptions?.logoType === "svgloop" && onLoaded) {
      onLoaded();
    }
    
    // For other types, we'll wait for imageLoaded state
    if (imageLoaded && onLoaded) {
      onLoaded();
    }
  }, [imageLoaded, onLoaded, logoOptions?.logoType]);

  // Handle image load events
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!logoOptions || !logoOptions.logoType) {
    return <div ref={logoRef} className={className} />;
  }

  // SVGLoop logo type
  if (logoOptions.logoType === "svgloop" && logo) {
    return (
      <div ref={logoRef} className={className}>
        <SVGLoopLogo 
          duration={600} 
          keyframes={logo} 
          activeKeyframe={isTopDark ? "first" : "last"} 
        />
      </div>
    );
  }

  // Default logo type
  if (logoOptions.logoType === "default" && logo) {
    return (
      <div ref={logoRef} className={cn(className, "relative")}>
        <Image 
          src={logo.url} 
          alt="Logo"
          fill
          className="object-contain"
          onLoad={handleImageLoad} 
        />
      </div>
    );
  }

  // Light and Dark logo type
  if (logoOptions.logoType === "lightAndDark" && logo) {
    // Determine which logo to show based on isDark
    const currentLogo = isTopDark ? logo.darkLogo : logo.lightLogo;
    
    if (!currentLogo) {
      return <div ref={logoRef} className={className} />;
    }

    return (
      <div ref={logoRef} className={cn(className, "relative")}>
        <Image 
          src={currentLogo.url} 
          alt="Logo"
          fill
          className="object-contain"
          onLoad={handleImageLoad} 
        />
      </div>
    );
  }

  // Fallback empty div
  return <div ref={logoRef} className={className} />;
}; 