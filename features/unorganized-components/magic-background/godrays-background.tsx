"use client"

import type React from "react"

import { useRef } from "react"
import { GodRays } from "@paper-design/shaders-react"
import { SHADER_COLORS, THEME_COLORS } from "@/app/styles/theme-colors"

interface GodraysBackgroundProps {
  children: React.ReactNode
}

export default function GodraysBackground({ children }: GodraysBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="h-[55.5rem] bg-background opacity-100 relative overflow-hidden">
      <GodRays
        className="absolute inset-0 w-full  h-full"
        colorBack={THEME_COLORS.background}
        colorBloom={THEME_COLORS.primary}
        bloom={2}
        intensity={0.1}
        density={0.2}
        spotty={0.2}
        midSize={0.2}
        midIntensity={1}
        offsetX={0}
        offsetY={0.55}
        scale={0.5}
        rotation={0}
        speed={0.75}
        colors={[...SHADER_COLORS]}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-background" />

      {children}
    </div>
  )
}


