import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "two-column-block",
  type: "object",
  title: "TwoColumn",
  description: "A list of two-column",
  icon: Newspaper,
  fields: [
    defineField({
      name: "firstColumn",
      type: "object",
      title: "First Column",
      fields: [
        defineField({
          // block-content
          name: "blockContent",
          type: "block-content",
          title: "Block Content",
        }),
      ],
    }),
    defineField({
      name: "secondColumn",
      type: "object",
      title: "Second Column",
      fields: [
        defineField({
          // block-content
          name: "blockContent",
          type: "block-content",
          title: "Block Content",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "TwoColumn",
      };
    },
  },
});
