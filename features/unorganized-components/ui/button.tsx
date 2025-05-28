import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/features/unorganized-utils/utils";



const buttonVariants = cva(
  "inline-flex items-center justify-center  gap-2 whitespace-nowrap rounded-md text-sm transition-all duration-[var(--motion-standard)] ease-[var(--motion-ease)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-bg)] text-[var(--button-foreground)] shadow-[var(--button-shadow)] font-[var(--button-primary-default-font-weight)] uppercase tracking-[var(--button-primary-default-letter-spacing)] hover:bg-[var(--button-hover-bg)] hover:text-[var(--button-hover-foreground)] active:bg-[var(--button-primary-active-background)] active:shadow-[var(--button-primary-active-box-shadow)] active:transform-[var(--button-primary-active-transform)] focus-visible:shadow-[var(--button-primary-focus-box-shadow)] focus-visible:ring-0",
        destructive:
          "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-foreground)] shadow-[var(--button-destructive-shadow)] font-[var(--button-destructive-default-font-weight)] uppercase tracking-[var(--button-destructive-default-letter-spacing)] hover:bg-[var(--button-destructive-hover-bg)] hover:text-[var(--button-destructive-hover-foreground)] hover:shadow-[var(--button-destructive-hover-box-shadow)] active:bg-[var(--button-destructive-active-background)] active:shadow-[var(--button-destructive-active-box-shadow)] active:transform-[var(--button-destructive-active-transform)]",
        outline:
          "border border-[var(--button-outline-border-width)] border-solid border-[color:var(--button-outline-default-border-color)] bg-[var(--button-outline-default-background)] text-[var(--button-outline-default-color)] font-[var(--button-outline-default-font-weight)] uppercase hover:bg-[var(--button-outline-hover-background)] hover:text-[var(--button-outline-hover-color)] hover:border-[color:var(--button-outline-hover-border-color)] active:bg-[var(--button-outline-active-background)] active:text-[var(--button-outline-hover-color)] active:border-[color:var(--button-outline-hover-border-color)] active:scale-[0.99]",
        secondary:
          "border border-solid border-[color:var(--button-secondary-default-border-color)] bg-[var(--button-secondary-bg)] text-[var(--button-secondary-foreground)] shadow-[var(--button-secondary-shadow)] font-[var(--button-secondary-default-font-weight)] uppercase tracking-[var(--button-secondary-default-letter-spacing)] hover:bg-[var(--button-secondary-hover-bg)] hover:text-[var(--text-primary)] hover:border-[color:var(--button-secondary-hover-border-color)] hover:shadow-[var(--button-secondary-hover-box-shadow)] active:bg-[var(--button-secondary-active-background)] active:border-[color:var(--button-secondary-active-border-color)] active:text-[var(--text-primary)] active:scale-[0.99]",
        ghost:
          "font-medium text-[var(--button-ghost-text)] hover:bg-[var(--button-ghost-hover-bg)] hover:text-[var(--button-ghost-hover-text)] active:bg-[var(--button-ghost-active-background,color-mix(in_srgb,var(--button-ghost-hover-bg)_85%,#000_15%))] active:text-[var(--button-ghost-hover-text)] active:scale-[0.98]",
        link:
          "font-medium text-[var(--button-link-text)] underline-offset-4 hover:underline hover:text-[var(--button-link-hover-text)] active:text-[var(--button-link-active-text,color-mix(in_srgb,var(--button-link-hover-text)_85%,#000_15%))] active:underline active:scale-[0.98]",
        "outline-secondary":
          "border border-[var(--button-outline-border-width)] border-solid border-[color:var(--border-color-default)] bg-transparent text-[var(--text-secondary)] font-[var(--button-outline-default-font-weight)] uppercase hover:bg-[color-mix(in_srgb,var(--border-color-default)_10%,transparent)] hover:text-[var(--text-primary)] hover:border-[color:var(--border-color-strong)] active:bg-[color-mix(in_srgb,var(--border-color-default)_20%,transparent)] active:text-[var(--text-primary)] active:border-[color:var(--border-color-strong)] active:scale-[0.98]",
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