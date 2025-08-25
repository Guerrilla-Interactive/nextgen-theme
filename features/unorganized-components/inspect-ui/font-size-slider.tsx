"use client"

import * as React from "react"
import { Slider } from "./slider"
import { cn } from "@/features/unorganized-utils/utils"

// Font size scale with proper typing
type FontSizeScale = {
  value: number
  label: string
  name: string
}

const FONT_SIZE_SCALE: FontSizeScale[] = [
  { value: 0.625, label: "10px", name: "2xs" },
  { value: 0.75, label: "12px", name: "xs" },
  { value: 0.875, label: "14px", name: "sm" },
  { value: 1, label: "16px", name: "base" },
  { value: 1.125, label: "18px", name: "lg" },
  { value: 1.25, label: "20px", name: "xl" },
  { value: 1.5, label: "24px", name: "2xl" },
  { value: 1.875, label: "30px", name: "3xl" },
  { value: 2.25, label: "36px", name: "4xl" },
  { value: 3, label: "48px", name: "5xl" },
  { value: 3.75, label: "60px", name: "6xl" },
  { value: 4.5, label: "72px", name: "7xl" },
  { value: 6, label: "96px", name: "8xl" },
  { value: 8, label: "128px", name: "9xl" },
]

interface FontSizeSliderProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  onValueCommit?: (value: number) => void
  className?: string
  showLabel?: boolean
  showPreview?: boolean
  previewText?: string
  compact?: boolean
}

const FontSizeSlider = React.forwardRef<
  HTMLDivElement,
  FontSizeSliderProps
>(({ 
  value, 
  defaultValue = 1,
  onValueChange, 
  onValueCommit,
  className,
  showLabel = true,
  showPreview = true,
  previewText = "Sample Text",
  compact = false,
  ...props 
}, ref) => {
  // Use internal state for smooth dragging
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue)
  const [isDragging, setIsDragging] = React.useState(false)

  // Update internal value when external value changes (but not during dragging)
  React.useEffect(() => {
    if (!isDragging && value !== undefined) {
      setInternalValue(value)
    }
  }, [value, isDragging])

  // Find the closest font size scale for display purposes only
  const getCurrentScale = (val: number): FontSizeScale => {
    let closest = FONT_SIZE_SCALE[0]
    let minDiff = Math.abs(FONT_SIZE_SCALE[0].value - val)
    
    for (const scale of FONT_SIZE_SCALE) {
      const diff = Math.abs(scale.value - val)
      if (diff < minDiff) {
        minDiff = diff
        closest = scale
      }
    }
    return closest
  }

  const currentScale = getCurrentScale(internalValue)

  const handleValueChange = (newValue: number[]) => {
    const val = newValue[0]
    setInternalValue(val)
    setIsDragging(true)
    
    // No external callbacks during dragging for maximum smoothness
    // Preview updates instantly via internal state
  }

  const handleValueCommit = (newValue: number[]) => {
    const val = newValue[0]
    setInternalValue(val)
    setIsDragging(false)
    
    // Cancel any pending throttled calls and call immediately
    // Always call both callbacks on commit
    onValueChange?.(val)
    onValueCommit?.(val)
  }

  const minValue = 0.5  // 8px minimum
  const maxValue = 4    // 64px maximum for most use cases

  if (compact) {
    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        <span className="text-[10px] text-muted-foreground font-mono min-w-[24px]">
          {Math.round(internalValue * 16)}px
        </span>
        <div className="flex-1 min-w-[80px]">
          <Slider
            value={[internalValue]}
            onValueChange={handleValueChange}
            onValueCommit={handleValueCommit}
            min={minValue}
            max={maxValue}
            step={0.01}
            className="w-full"
          />
        </div>
        <span className="text-[10px] text-muted-foreground font-mono min-w-[32px] text-right">
          {internalValue.toFixed(2)}rem
        </span>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn("space-y-3", className)} {...props}>
      {/* Slider */}
      <div className="space-y-2">
        <Slider
          value={[internalValue]}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          min={minValue}
          max={maxValue}
          step={0.01}
          className="w-full"
        />
        
        {/* Scale markers - only show key ones for space */}
        <div className="flex justify-between text-[10px] text-muted-foreground px-1">
          <span>8px</span>
          <span>12px</span>
          <span>16px</span>
          <span>20px</span>
          <span>24px</span>
          <span>32px</span>
          <span>48px</span>
          <span>64px</span>
        </div>
      </div>

      {/* Current value display */}
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Size:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{Math.round(internalValue * 16)}px</span>
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
              {internalValue.toFixed(2)}rem
            </code>
          </div>
        </div>
      )}

      {/* Preview */}
      {showPreview && (
        <div className="border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-2">Preview:</div>
          <div 
            className="font-medium transition-all duration-200 leading-normal"
            style={{ fontSize: `${internalValue}rem` }}
          >
            {previewText}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Scale: <code className="bg-muted px-1 py-0.5 rounded">{currentScale.name}</code>
          </div>
        </div>
      )}
    </div>
  )
})

FontSizeSlider.displayName = "FontSizeSlider"

export { FontSizeSlider, FONT_SIZE_SCALE } 