import { AnimationPreset } from "../brand-utils";

/**
 * Gucci Luxe Animation Preset
 * Subtle, refined motion with gentle elevation, measured rings, and tasteful underline reveals.
 */
export const gucciAnimationPreset: AnimationPreset = {
  name: "gucci-luxe",
  description:
    "Subtle, refined motion for luxury UI: soft elevation on hover, measured rings, and understated underline reveals.",

  button: {
    global: {
      transition:
        "transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease, background-color 180ms ease, color 180ms ease, opacity 160ms ease",
      transformOrigin: "center center",
      willChange: "transform, box-shadow, background-color, color, opacity",
    },
    default: {
      duration: "180ms",
      easing: "cubic-bezier(.2,.8,.2,1)",
      opacity: "1",
      transform: "translateZ(0)",
      boxShadow: "var(--shadowXs)",
    },
    hover: {
      duration: "180ms",
      easing: "cubic-bezier(.2,.8,.2,1)",
      transform: "translateY(-1px)",
      boxShadow: "var(--shadowSm)",
      custom: {
        // tiny sheen hint on luxury buttons (works best on green/red/gold)
        "background-image": "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
        "background-blend-mode": "soft-light",
      },
    },
    focus: {
      duration: "180ms",
      easing: "cubic-bezier(.2,.8,.2,1)",
      boxShadow: "0 0 0 2px var(--ring)",
    },
    active: {
      duration: "120ms",
      easing: "cubic-bezier(.2,.8,.2,1)",
      transform: "translateY(0) scale(0.99)",
      boxShadow: "var(--shadowXs)",
      opacity: "0.96",
    },
    disabled: {
      duration: "160ms",
      easing: "ease-out",
      opacity: "0.55",
    },
  },

  link: {
    global: {
      transition:
        "color 150ms ease, text-decoration-color 180ms ease, text-underline-offset 180ms ease",
      transformOrigin: "left center",
      willChange: "color, text-decoration-color, text-underline-offset",
    },
    default: {
      duration: "150ms",
      easing: "ease",
      custom: {
        "text-decoration": "underline",
        "text-decoration-thickness": "1px",
        "text-underline-offset": "2px",
        "text-decoration-color": "transparent",
      },
    },
    hover: {
      duration: "160ms",
      easing: "ease",
      custom: {
        "text-decoration-color": "currentColor",
        "text-underline-offset": "3px",
      },
    },
    focus: {
      duration: "120ms",
      easing: "ease",
      boxShadow: "0 0 0 1px var(--ring)",
    },
    active: {
      duration: "80ms",
      easing: "ease-out",
      opacity: "0.85",
    },
  },

  input: {
    global: {
      transition: "border-color 160ms ease, box-shadow 180ms ease, background-color 160ms ease",
      transformOrigin: "center center",
      willChange: "border-color, box-shadow, background-color",
    },
    default: {
      duration: "160ms",
      easing: "ease",
      boxShadow: "var(--shadow-2xs)",
    },
    hover: {
      duration: "160ms",
      easing: "ease",
      custom: {
        "border-color": "var(--border)",
      },
    },
    focus: {
      duration: "180ms",
      easing: "cubic-bezier(.2,.8,.2,1)",
      boxShadow: "0 0 0 2px var(--ring)",
      custom: {
        "background-color": "color-mix(in oklch, currentColor 0%, white 98%)",
      },
    },
    active: {
      duration: "120ms",
      easing: "ease-out",
    },
  },
};
