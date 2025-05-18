"use client"

import * as React from "react"

/**
 * Invisible bridge to prevent dropdown from closing when moving mouse
 */
export function NextgenDesktopNavBridge() {
  return (
    <div className="absolute -bottom-2 left-0 w-full h-2 bg-transparent" aria-hidden="true" />
  )
} 