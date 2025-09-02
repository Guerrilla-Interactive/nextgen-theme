import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "narrow-portable-text-section-block",
  type: "object",
  title: "NarrowPortableTextSection",
  description: "Description for narrow-portable-text-section",
  icon: Newspaper,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "block-content",
      description: "Long-form rich text for policies, terms, etc.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "NarrowPortableTextSection",
      };
    },
  },
});
