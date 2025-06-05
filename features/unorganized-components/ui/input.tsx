import * as React from "react"

import { cn } from "@/features/unorganized-utils/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  forceState?: 'focus' | 'error';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, forceState, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input border-[var(--border-color-subtle)]    bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
          {
            "border-0 ring-1 ring-ring border-brand-main ring-[var(--brand-main)]": forceState === 'focus',
            "border-0 ring-1 ring-[var(--semantic-destructive)] !focus:ring-[var(--semantic-destructive)]": forceState === 'error',
          },
          className
        )}
      
        ref={ref}
        {...props}
        aria-invalid={forceState === 'error' || props['aria-invalid']}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
