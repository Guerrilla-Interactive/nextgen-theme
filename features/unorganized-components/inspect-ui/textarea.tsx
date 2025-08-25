import * as React from "react"

import { cn } from "@/features/unorganized-utils/utils"
import { TokenElement } from "@/app/(main)/blueprint/components/token-targeting"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <TokenElement typographyRoles={["INPUT"]} colorRoles={["input","muted-foreground","border"]}>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border border-border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    </TokenElement>
  )
}

export { Textarea }
