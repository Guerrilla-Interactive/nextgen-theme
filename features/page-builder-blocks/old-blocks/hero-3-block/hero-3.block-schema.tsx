import { defineField, defineType } from "sanity";
import { Monitor } from "lucide-react";
import { hero3SchemaTranslations as t } from "./hero-3.block-translation";

export default defineType({
  name: "hero-3-block",
  type: "object",
  title: t("blockTitle", "Fullscreen Hero"),
  description: t("blockDescription", 
    "A hero block with full viewport background image, a dark overlay, and text positioned at the bottom."),
  icon: Monitor,
  fields: [
    defineField({
      name: "titleOrange",
      type: "string",
      title: t("titleOrange.title", "Title Highlight"),
      description: t("titleOrange.description", 
        "A single word displayed in orange on the first line at the bottom left."),
    }),
    defineField({
      name: "titleWhite",
      type: "string",
      title: t("titleWhite.title", "Title"),
      description: t("titleWhite.description", 
        "Text displayed in white on the next line below the highlighted word."),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: t("subtitle.title", "Subtitle"),
      description: t("subtitle.description", 
        "Text displayed on the bottom right of the hero block."),
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: t("backgroundImage.title", "Background Image"),
      description: t("backgroundImage.description", 
        "Full viewport background image for the hero block"),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showOverlay",
      type: "boolean",
      title: t("showOverlay.title", "Show Overlay"),
      description: t("showOverlay.description", 
        "Toggle the overlay on and off"),
    }),
    // Overlay color - dark or light
    defineField({
      name: "overlayColor",
      type: "string",
      title: t("overlayColor.title", "Overlay Color"),
      description: t("overlayColor.description", 
        "Choose the color of the overlay"),
      options: {
        list: ["dark", "light"],
      },
    }),

    defineField({
      name: "topOverlayStrength",
      type: "number",
      title: t("topOverlayStrength.title", "Top Overlay Strength"),
      description: t("topOverlayStrength.description", 
        "Opacity at the top (0–1)"),
      initialValue: 0.2,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "upperCenterOverlayStrength",
      type: "number",
      title: t("upperCenterOverlayStrength.title", "Upper Center Overlay Strength"),
      description: t("upperCenterOverlayStrength.description", 
        "Opacity at the upper center (0–1)"),
      initialValue: 0.0,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "lowerCenterOverlayStrength",
      type: "number",
      title: t("lowerCenterOverlayStrength.title", "Lower Center Overlay Strength"),
      description: t("lowerCenterOverlayStrength.description", 
        "Opacity at the lower center (0–1)"),
      initialValue: 0.2,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "bottomOverlayStrength",
      type: "number",
      title: t("bottomOverlayStrength.title", "Bottom Overlay Strength"),
      description: t("bottomOverlayStrength.description", 
        "Opacity at the bottom (0–1)"),
      initialValue: 0.3,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
  ],
  preview: {
    select: {
      titleOrange: 'titleOrange',
      titleWhite: 'titleWhite',
      backgroundImage: 'backgroundImage',
    },
    prepare({ titleOrange, titleWhite, backgroundImage }) {
      const hasTitle = titleOrange || titleWhite;
      return {
        title: t("blockTitle", "Fullscreen Hero"),
        subtitle: hasTitle 
          ? `${titleOrange || ''} ${titleWhite || ''}`.trim() 
          : t("noTitle", "No title set"),
        media: backgroundImage ? backgroundImage : Monitor,
      };
    },
  },
});
