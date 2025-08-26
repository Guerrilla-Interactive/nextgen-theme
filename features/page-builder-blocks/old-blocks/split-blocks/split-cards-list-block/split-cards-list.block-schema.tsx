import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-cards-list-block",
  type: "object",
  icon: TextQuote,
  title: "Split Cards List",
  description:
    "Column with list of cards. Each card has a tag line, title and content body.",
  fields: [
    defineField({
      name: "list",
      type: "array",
      of: [{ type: "split-cards-item-block" }],
    }),
  ],
  preview: {
    select: {
      title: "list.0.title",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
}); 