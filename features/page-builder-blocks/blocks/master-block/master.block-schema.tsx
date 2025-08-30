import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "master-block",
  type: "object",
  title: "Master",
  description: "Description for master",
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
        title: "Master",
      };
    },
  },
});
