import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/features/unorganized-utils/utils";



const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-bg,var(--brand-main))] text-[var(--button-foreground,var(--brand-on))] shadow-[var(--button-shadow,var(--shadow-sm))] hover:bg-[var(--button-hover-bg,var(--brand-secondary))]",
        destructive:
          "bg-[var(--button-destructive-bg,var(--semantic-destructive))] text-[var(--button-destructive-foreground,var(--background))] shadow-[var(--button-destructive-shadow,var(--shadow-xs))]",
        outline:
          "border-[var(--button-outline-border-width,var(--border-width-default))] border-[style:var(--button-outline-border-style,var(--border-style))] border-[color:var(--button-outline-border-color,var(--border-color-default))] bg-[var(--button-outline-bg,var(--surface-card))] shadow-[var(--button-outline-shadow,var(--shadow-xs))] hover:bg-[var(--button-outline-hover-bg,var(--surface-muted))] hover:text-[var(--button-outline-hover-text,var(--surface-on))]",
        secondary:
          "bg-[var(--button-secondary-bg,var(--surface-card))] text-[var(--button-secondary-foreground,var(--surface-on))] shadow-[var(--button-secondary-shadow,var(--shadow-xs))] hover:bg-[var(--button-secondary-hover-bg,var(--surface-muted))]",
        ghost:
          "hover:bg-[var(--button-ghost-hover-bg,var(--surface-muted))] hover:text-[var(--button-ghost-hover-text,var(--surface-on))]",
        link:
          "text-[var(--button-link-text,var(--brand-main))] underline-offset-4 hover:underline",
      },
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
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };