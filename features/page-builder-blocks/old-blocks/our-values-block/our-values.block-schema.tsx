import { defineField, defineType } from "sanity";
import { Heart } from "lucide-react";

export default defineType({
  name: "our-values-block",
  type: "object",
  title: "Our Values Block",
  description: "A list of our values",
  icon: Heart,
  fields: [
    defineField({
      name: "values",
      type: "array",
      title: "Values",
      of: [
        {
          name: "value",
          type: "object",
          title: "Value",
          fields: [
            defineField({
              name: "icon",
              type: "icon",
              title: "Icon",
              options: {
                collections: ["mdi"],
                showName: true,
              },
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            })
          ],
        }
      ],
    }),
  ],
  preview: {
    select: {
      values: 'values',
    },
    prepare({ values }) {
      const count = values?.length ?? 0;
      return {
        title: "Our Values Block",
        subtitle: `${count} value${count !== 1 ? "s" : ""}`,
        media: Heart,
      };
    },
  },
});
