"use client"

import type React from "react"
import { useRef } from "react"
import { THEME_COLORS } from "@/app/styles/theme-colors"
import { LiquidMetal } from "@paper-design/shaders-react"

interface LiquidMetalBackgroundProps {
  children?: React.ReactNode
}

export default function LiquidMetalBackground({ children }: LiquidMetalBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={containerRef} className="h-[200rem] max-h-[120rem] overflow-hidden w-full bg-background relative ">
      
        <LiquidMetal
          className="absolute inset-0 w-full  h-full"
          colorBack={THEME_COLORS.background}
          colorTint={THEME_COLORS.primary}
          repetition={4.36}
          softness={0.45}
          shiftRed={0.42}
          shiftBlue={-0.1}
          distortion={0.28}
          contour={0.35}
          shape="metaballs"
          offsetX={0.7}
          offsetY={-0.3}
          scale={1}
          rotation={64}
          speed={0.10}
        />
      
      {children}
    </div>
  )
}


