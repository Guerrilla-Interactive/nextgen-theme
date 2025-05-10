import { getSanityPageBuilderBlocks } from "@/features/page-builder-blocks/block-indexer";
import { defineField, defineType } from "sanity";
import { PanelTop } from "lucide-react";

export const route404SettingsSchema = defineType({
  name: "route404Settings",
  title: "Route404 Settings",
  type: "document",
  icon: PanelTop,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    // title 
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Page not found",
      group: "content"
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (Optional)",
      type: "string",
      group: "content"
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Back to home",
      group: "content"
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      initialValue: "/",
      group: "content"
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (Optional)",
      type: "image",
      options: {
        hotspot: true
      },
      group: "content"
    }),
    defineField({
      name: "blocks",
      title: "Additional Content Blocks (Optional)",
      type: "array",
      of: getSanityPageBuilderBlocks(),
      group: "content",
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      initialValue: "Page not found",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Route404 Settings',
        media: PanelTop,
      };
    },
  },
});
