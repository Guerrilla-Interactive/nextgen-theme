import { defineField, defineType } from "sanity";
import { Grid } from "lucide-react";

export default defineType({
  name: "service-grid-block",
  type: "object",
  title: "Service Grid",
  description: "A list of service-grid",
  icon: Grid,
  fields: [
    {
      name: "services",
      type: "array",
      title: "Services",
      of: [
        { type: "reference", to: [{ type: "service-slug" }] },
        {
          type: "object",
          name: "manualService",
          title: "Manual Service",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              type: "string",
              title: "Link",
             
              validation: (Rule) => Rule.required(),
            },
            {
              name: "featuredImage",
              type: "image",
              title: "Featured Image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      services: 'services',
    },
    prepare({ services }) {
      const count = services?.length || 0;
      return {
        title: "Service Grid",
        subtitle: `${count} service${count !== 1 ? 's' : ''}`,
        media: Grid,
      };
    },
  },
});
