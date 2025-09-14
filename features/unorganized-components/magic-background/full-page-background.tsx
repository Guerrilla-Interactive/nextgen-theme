"use client";

import GodraysBackground from "./godrays-background";
import ShaderBackground from "./shader-background";
import PulsingBorderBackground from "./pulsing-border-background";
import LiquidMetalBackground from "./liquid-metal-background";
import SmokeRingBackground from "./smoke-ring-background";

// Keep your union nice and simple
type BGVariant = "Sunrise" | "Aurora" | "Custom1" | "Custom2" | "Custom3";

export default function FullPageBackground({ type = "Sunrise" }: { type?: BGVariant }) {
  // Ensure the parent of this component has `relative` so absolute positioning works.

  if (type === "Sunrise") {
    return (

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <GodraysBackground>
          <div className="h-full w-full" />
        </GodraysBackground>
      </div>
    );
  }

  if (type === "Aurora") {
    return (
      <>
      {/* dark gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/100 to-background/50" />
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* rotate + scale: Tailwind doesn't have `scale-200` by default */}
      <div className="fixed inset-0 bottom-0 rotate-180 scale-[3] ">
        <GodraysBackground>
          <div className="h-full w-full" />
        </GodraysBackground>
      </div>
    </div>
    </>
    );
  }

  if (type === "Custom1") {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/100 to-background/50">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/100 to-background/50" />
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <ShaderBackground>
          <div className="h-full w-full" />
        </ShaderBackground>
      </div>
    </div>
    );
  }

  if (type === "Custom2") {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <PulsingBorderBackground>
          <div className="h-full w-full" />
        </PulsingBorderBackground>
      </div>
    );
  }

  if (type === "Custom3") {
    return (
      // Make sure it does not overflow the screen
      <div className="pointer-events-none absolute inset-0 -z-10">
        <LiquidMetalBackground>
          <div className="h-full w-full" />
        </LiquidMetalBackground>
      </div>
    );
  }

  if (type === "Custom4") {
    return (
      <div className="pointer-events-none h-screen w-screen absolute inset-0 -z-10 scale-200">
        <SmokeRingBackground>
          <div className="h-full w-full" />
        </SmokeRingBackground>
      </div>
    );
  }

  return null;
}
