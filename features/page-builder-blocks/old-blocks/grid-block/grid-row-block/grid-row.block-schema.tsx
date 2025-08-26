import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";
import { COLS_VARIANTS } from "@/features/page-builder-blocks/shared/shared-schemas/layout-variants.constants";

export default defineType({
  name: "grid-row-block",
  title: "Grid Row",
  type: "object",
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "gridColumns",
      type: "string",
      title: "Grid Columns",
      options: {
        list: COLS_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "grid-cols-3",
    }),
    // Add only the blocks you need
    defineField({
      name: "columns",
      type: "array",
      of: [
        { type: "grid-card-block" },
        { type: "grid-post-block" },
        { type: "pricing-card-block" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "columns.0.title",
    },
    prepare({ title }) {
      return {
        title: "Grid Row",
        subtitle: title,
      };
    },
  },
}); 