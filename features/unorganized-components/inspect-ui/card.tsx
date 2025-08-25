import { cn } from "@/features/unorganized-utils/utils"
import * as React from "react"
import TokenElement from "@/app/(main)/blueprint/components/token-targeting"



type TokenForwardProps = {
  typographyRoles?: string[]
  colorRoles?: string[]
}

type CardProps = React.ComponentProps<"div"> & TokenForwardProps & {
  suppressDefaultCardColors?: boolean
  variant?: "surface" | "tinted"
  tintRole?: string
}

function Card({
  className,
  typographyRoles,
  colorRoles,
  
  suppressDefaultCardColors,
  variant = "surface",
  tintRole,
  ...props
}: CardProps) {
  const hasExplicitColorRoles = Array.isArray(colorRoles) && colorRoles.length > 0
  const effectiveSuppress = suppressDefaultCardColors || variant === "tinted"
  const effectiveColorRoles = hasExplicitColorRoles
    ? colorRoles
    : (variant === "tinted" ? [tintRole ?? "primary"] : undefined)

  return (
    <TokenElement
      typographyRoles={typographyRoles}
      {...(effectiveColorRoles ? { colorRoles: effectiveColorRoles } : { colorRoles: ["card"] })}
    >
      <div
        data-slot="card"
        className={cn(
          effectiveSuppress ? "" : "bg-card text-card-foreground",
          "flex flex-col gap-6 rounded-xl border py-6  shadow",
          className
        )}
        {...props}
      />
    </TokenElement>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <TokenElement typographyRoles={["H3"]}>
      <div
        data-slot="card-title"
        className={cn("leading-none font-semibold", className)}
        {...props}
      />
    </TokenElement>
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <TokenElement typographyRoles={["P"]} colorRoles={["muted-foreground"]}>
      <div
        data-slot="card-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    </TokenElement>
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
