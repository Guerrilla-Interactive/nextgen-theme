"use client"

import type React from "react"
import { useRef } from "react"
import { SHADER_COLORS, THEME_COLORS } from "@/app/styles/theme-colors"
import { PulsingBorder } from "@paper-design/shaders-react"

interface PulsingBorderBackgroundProps {
  children?: React.ReactNode
}

export default function PulsingBorderBackground({ children }: PulsingBorderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <PulsingBorder
          
          colorBack={THEME_COLORS.background}
          roundness={0}
          thickness={1}
          softness={1}
          intensity={0}
          bloom={0.5}
          spots={4}
          spotSize={0}
          pulse={0}
          smoke={0.7}
          smokeSize={0.7}
          scale={1}
          rotation={0}
          offsetX={0}
          offsetY={0}
          speed={0.18}
          colors={[...SHADER_COLORS]}
        />
      </div>
      {children}
    </div>
  )
}


