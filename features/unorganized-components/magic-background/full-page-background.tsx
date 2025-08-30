"use client"

import GodraysBackground from "./godrays-background"



export default function FullPageBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <GodraysBackground>
        <div className="w-full h-full" />
      </GodraysBackground>
    </div>
  )
}
