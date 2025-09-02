"use client"

import type React from "react"
import { useRef } from "react"
import { SHADER_COLORS, THEME_COLORS } from "@/app/styles/theme-colors"
import { SmokeRing } from "@paper-design/shaders-react"

interface SmokeRingBackgroundProps {
  children?: React.ReactNode
}

export default function SmokeRingBackground({ children }: SmokeRingBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <SmokeRing
          style={{ height: 500 }}
          colorBack={THEME_COLORS.background}
          noiseScale={4.7}
          noiseIterations={8}
          radius={0.17}
          thickness={0.66}
          innerShape={2.46}
          offsetX={0.46}
          offsetY={-0.8}
          scale={2.04}
          rotation={120}
          speed={0.24}
          colors={[...SHADER_COLORS]}
        />
      </div>
      {children}
    </div>
  )
}


