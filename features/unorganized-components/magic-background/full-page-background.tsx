"use client";

import GodraysBackground from "./godrays-background";

// Keep your union nice and simple
type BGVariant = "Sunrise" | "Aurora";

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

  // Fallback (in case you add more variants later)
  return null;
}
