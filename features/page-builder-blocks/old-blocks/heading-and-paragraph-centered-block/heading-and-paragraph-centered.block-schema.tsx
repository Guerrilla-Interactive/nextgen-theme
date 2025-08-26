import { defineField, defineType } from "sanity";
import { AlignCenter } from "lucide-react";

export default defineType({
  name: "heading-and-paragraph-centered-block",
  type: "object",
  title: "Centered Text Block",
  description: "A heading and paragraph with centered alignment",
  icon: AlignCenter,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "paragraph",
      type: "text",
      title: "Paragraph",
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      paragraph: 'paragraph',
    },
    prepare({ heading, paragraph }) {
      return {
        title: "Centered Text Block",
        subtitle: heading || "No heading set",
        media: AlignCenter,
      };
    },
  },
});
