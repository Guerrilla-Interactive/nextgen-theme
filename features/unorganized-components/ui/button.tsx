/* ------------------------------------------------------------------------
   Button.tsx  ·  shadcn/ui variant adapted for Tailwind v4 token utilities
   ------------------------------------------------------------------------ */

   import * as React from "react"
   import { Slot } from "@radix-ui/react-slot"
   import { cva, type VariantProps } from "class-variance-authority"
   import { cn } from "@/features/unorganized-utils/utils"   // your helper
   
   /* 1 │ Variant generator
      ─────────────────────────────────────────────────────── */
   const buttonVariants = cva(
     // • global focus pattern uses outline + ring tokens
     // • SVG icons inherit size-4 unless overridden
     "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm " +
       "transition-all duration-[var(--motion-standard)] ease-[var(--motion-ease)] " +
       "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none " +
       "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 " +
       "ring-[--ring]/10 focus-visible:ring-4 focus-visible:outline-1 " +
       "dark:ring-[--ring]/20 dark:outline-[--ring]/40",
     {
       variants: {
         /* ───────────────────────────── visual variants */
         variant: {
           default:
             "bg-[--primary] text-[--primary-foreground] shadow-[var(--shadow-md)] font-semibold uppercase " +
             "hover:bg-[--primary-hover] active:bg-[--primary-active] " +
             "focus-visible:shadow-[var(--shadow-md)] focus-visible:ring-0",
   
           destructive:
             "bg-[--destructive] text-white shadow-[var(--shadow-md)] font-semibold uppercase " +
             "hover:bg-[--destructive-hover] active:bg-[--destructive-active]",
   
           outline:
             "border border-[--outline-base] bg-transparent text-[--foreground] font-semibold uppercase " +
             "hover:bg-[color-mix(in_oklch,var(--outline-base)_10%,transparent)] " +
             "active:bg-[color-mix(in_oklch,var(--outline-base)_20%,transparent)]",
   
           secondary:
             "border border-[--outline-base] bg-[--base-elevated] text-[--foreground] shadow-[var(--shadow-md)] " +
             "font-semibold uppercase " +
             "hover:brightness-110 active:brightness-90",
   
           ghost:
             "font-medium text-[--primary] bg-[color-mix(in_oklch,var(--primary)_5%,transparent)] " +
             "hover:bg-[color-mix(in_oklch,var(--primary)_10%,transparent)] " +
             "active:bg-[color-mix(in_oklch,var(--primary)_15%,transparent)]",
   
           link:
             "font-medium text-[--primary] underline-offset-4 " +
             "hover:underline hover:text-[color-mix(in_oklch,var(--primary)_80%,black)] " +
             "active:text-[color-mix(in_oklch,var(--primary)_60%,black)] active:underline",
   
           "outline-secondary":
             "border border-[--outline-base] bg-transparent text-[--secondary-foreground] font-semibold uppercase " +
             "hover:bg-[color-mix(in_oklch,var(--outline-base)_10%,transparent)] " +
             "active:bg-[color-mix(in_oklch,var(--outline-base)_20%,transparent)] active:scale-[0.98]",
         },
   
         /* ───────────────────────────── size map */
         size: {
           default: "h-9 px-4 py-2 has-[>svg]:px-3",
           sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
           lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
           icon: "size-9",
         },
       },
   
       defaultVariants: {
         variant: "default",
         size: "default",
       },
     }
   )
   
   /* 2 │ Component
      ─────────────────────────────────────────────────────── */
   type ButtonProps = React.ComponentProps<"button"> &
     VariantProps<typeof buttonVariants> & {
       /** When true, renders any parent slot instead of a `<button>` */
       asChild?: boolean
     }
   
   const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
     ({ className, variant, size, asChild = false, ...props }, ref) => {
       const Comp = asChild ? Slot : "button"
       return (
         <Comp
           ref={ref}
           data-slot="button"
           className={cn(buttonVariants({ variant, size, className }))}
           {...props}
         />
       )
     }
   )
   Button.displayName = "Button"
   
   /* 3 │ Re-export variants for <Link> etc. */
   export { Button, buttonVariants }
   