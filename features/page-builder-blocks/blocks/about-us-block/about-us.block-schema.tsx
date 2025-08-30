import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "about-us-block",
  type: "object",
  title: "AboutUs",
  description: "Description for about-us",
  icon: Newspaper,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "AboutUs",
      };
    },
  },
});
