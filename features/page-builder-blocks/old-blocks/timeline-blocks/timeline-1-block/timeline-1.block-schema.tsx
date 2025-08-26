import { defineField, defineType } from "sanity";

export default defineType({
  name: "timeline-1-block",
  type: "object",
  title: "Timeline 1",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "tagLine",
      title: "Tag Line",
      description:
        "A short tag line to display under the title, e.g. date, location, job title, etc.",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
}); 