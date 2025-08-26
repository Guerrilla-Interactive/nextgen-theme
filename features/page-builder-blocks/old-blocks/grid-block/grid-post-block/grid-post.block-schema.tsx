import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "grid-post-block",
  type: "object",
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "post",
      type: "reference",
      title: "Blog Post",
      description: "Select a blog post to link to.",
      to: [{ type: "blog-slug" }],
    }),
  ],
  preview: {
    select: {
      title: "post.title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: "Grid Card",
        subtitle: title || "No title",
        media,
      };
    },
  },
}); 