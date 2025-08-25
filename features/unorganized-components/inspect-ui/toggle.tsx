"use client";

import * as React from "react";
import { cn } from "@/features/unorganized-utils/utils";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: "sm" | "default" | "lg";
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, size = "default", onClick, children, ...props }, ref) => {
    const isControlled = typeof pressed === "boolean";
    const [internalPressed, setInternalPressed] = React.useState<boolean>(!!pressed);

    React.useEffect(() => {
      if (isControlled) setInternalPressed(!!pressed);
    }, [pressed, isControlled]);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!isControlled) setInternalPressed((p) => !p);
      onPressedChange?.(!(isControlled ? !!pressed : internalPressed));
      onClick?.(e);
    };

    const sizeClasses =
      size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

    const isOn = isControlled ? !!pressed : internalPressed;

    return (
      <button
        type="button"
        ref={ref}
        data-state={isOn ? "on" : "off"}
        aria-pressed={isOn}
        onClick={handleClick}
        className={cn(
          "group inline-flex items-center justify-center rounded-full border transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer transform hover:scale-105 active:scale-95",
          // Neutral button styles
          "bg-card/80 text-foreground border-border shadow-sm hover:bg-card hover:shadow-md",
          // Hover affordance when inactive
          !isOn && "hover:ring-1 hover:ring-primary/20 hover:border-primary/20",
          // Active: ring + primary border
          isOn && "ring-2 ring-primary/40 border-primary",
          sizeClasses,
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "transition-colors opacity-95 group-hover:opacity-100",
            isOn ? "text-primary" : "text-foreground"
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);
Toggle.displayName = "Toggle"; 