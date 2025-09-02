import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "divider-block",
  type: "object",
  title: "Divider",
  description: "Description for divider",
  icon: Newspaper,
  fields: [
    defineField({
      name: "showLine",
      title: "Show line",
      type: "boolean",
      initialValue: true,
      description: "If enabled, a thin line will be rendered in the divider.",
    }),
    defineField({
      name: "spaceY",
      title: "Vertical spacing",
      type: "number",
      initialValue: 48,
      description: "Vertical space in pixels (top and bottom).",
      validation: (Rule) => Rule.min(0).max(320),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Divider",
      };
    },
  },
});
