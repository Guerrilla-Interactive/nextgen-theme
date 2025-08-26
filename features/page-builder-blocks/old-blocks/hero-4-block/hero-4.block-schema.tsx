import { defineField, defineType } from "sanity";
import { Layout } from "lucide-react";
import { hero4SchemaTranslation as t } from "./hero-4.block-translation";

export default defineType({
  name: "hero-4-block",
  type: "object",
  title: t("blockTitle", "Page Header Hero"),
  description: t("blockDescription", 
    "A smaller hero block that works as a page header with title and description."),
  icon: Layout,
  fields: [
    defineField({
      title: t("title.title", "Title"),
      name: "title",
      type: "string",
      description: t("title.description", "Main title for the header"),
    }),
    defineField({
      title: t("description.title", "Description"),
      name: "description",
      type: "text",
      description: t("description.description", "A short description or subheading"),
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: t("backgroundImage.title", "Background Image"),
      description: t("backgroundImage.description", "Optional background image for the header"),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showOverlay",
      type: "boolean",
      title: t("showOverlay.title", "Show Overlay"),
      description: t("showOverlay.description", "Toggle the overlay on and off"),
    }),
    defineField({
      name: "topOverlayStrength",
      type: "number",
      title: t("topOverlayStrength.title", "Top Overlay Strength"),
      description: t("topOverlayStrength.description", "Opacity at the top (0–1)"),
      initialValue: 0.2,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "upperCenterOverlayStrength",
      type: "number",
      title: t("upperCenterOverlayStrength.title", "Upper Center Overlay Strength"),
      description: t("upperCenterOverlayStrength.description", "Opacity at the upper center (0–1)"),
      initialValue: 0.0,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "lowerCenterOverlayStrength",
      type: "number",
      title: t("lowerCenterOverlayStrength.title", "Lower Center Overlay Strength"),
      description: t("lowerCenterOverlayStrength.description", "Opacity at the lower center (0–1)"),
      initialValue: 0.2,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "bottomOverlayStrength",
      type: "number",
      title: t("bottomOverlayStrength.title", "Bottom Overlay Strength"),
      description: t("bottomOverlayStrength.description", "Opacity at the bottom (0–1)"),
      initialValue: 0.3,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      backgroundImage: 'backgroundImage',
    },
    prepare({ title, backgroundImage }) {
      return {
        title: t("blockTitle", "Page Header Hero"),
        subtitle: title || t("noTitle", "No title set"),
        media: backgroundImage ? backgroundImage : Layout,
      };
    },
  },
});
