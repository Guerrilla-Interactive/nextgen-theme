import { defineField, defineType } from "sanity";
import { BarChart3 } from "lucide-react";

export default defineType({
  name: "stats-section-block",
  type: "object",
  title: "Stats Section",
  description: "Centered heading, description and a 2/4-column stats grid",
  icon: BarChart3,
  initialValue: {
    title: "Trusted by teams who ship fast",
    description: [
      {
        _key: "desc-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "desc-1-span-1", _type: "span", text: "Join thousands of developers and product teams already using Velocity", marks: [] }
        ]
      }
    ],
    items: [
      { _key: "stat-1", label: "Active teams", value: "10,000+" },
      { _key: "stat-2", label: "Lines of code analyzed", value: "50M+" },
      { _key: "stat-3", label: "Uptime reliability", value: "99.9%" },
      { _key: "stat-4", label: "Customer satisfaction", value: "4.9/5" },
    ]
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "block-content",
    }),
    defineField({
      name: "items",
      title: "Stats",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        })
      ],
      validation: (rule) => rule.length(4),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Stats Section",
        subtitle: title,
      };
    },
  },
});
