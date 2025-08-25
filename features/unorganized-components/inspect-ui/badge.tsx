import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/features/unorganized-utils/utils"
import { TokenElement } from "@/app/(main)/blueprint/components/token-targeting"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  // Choose the most relevant color token for inspection based on variant
  const colorRole = variant === 'secondary'
    ? 'secondary'
    : variant === 'destructive'
      ? 'destructive'
      : variant === 'outline'
        ? 'foreground'
        : 'primary'

  return (
    <TokenElement colorRoles={[colorRole]}>
      <div className={cn(badgeVariants({ variant }), className)} {...props} />
    </TokenElement>
  )
}

export { Badge, badgeVariants }