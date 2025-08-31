import { defineField, defineType } from "sanity";
import { ContactRound } from "lucide-react";

export default defineType({
  name: "contact-form-block",
  type: "object",
  title: "Contact Form",
  description: "Content with optional bullets/tags and a contact form (left/right/top/bottom)",
  icon: ContactRound,
  initialValue: {
    title: "Get in touch",
    highlight: "today",
    description: [
      {
        _key: "desc-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "desc-1-span-1",
            _type: "span",
            text:
              "We would love to hear from you. Reach out with any questions or inquiries.",
            marks: [],
          },
        ],
      },
    ],
    listType: "tags",
    bullets: [
      "Fast responses",
      "Friendly support",
      "No spam",
    ],
    tags: ["Support", "Sales", "General"],
    formPosition: "right",
  },
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "highlight", title: "Title Highlight", type: "string", description: "Optional part of the title to render with primary color" }),
    defineField({ name: "description", title: "Description", type: "block-content" }),
    defineField({
      name: "listType",
      title: "List Type",
      type: "string",
      options: { list: [
        { title: "Bullets", value: "bullets" },
        { title: "Tags", value: "tags" },
        { title: "None", value: "none" },
      ], layout: "radio" },
      initialValue: "tags",
      description: "Choose whether to show bullets or tags under the description",
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(5),
      hidden: ({ parent }) => parent?.listType !== "bullets",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(6),
      hidden: ({ parent }) => parent?.listType !== "tags",
    }),
    defineField({
      name: "customContactForm",
      title: "Custom Contact Form",
      type: "custom-contact-form-block",
    }),
    defineField({
      name: "formPosition",
      title: "Form Position",
      type: "string",
      options: { list: [
        { title: "Right (default)", value: "right" },
        { title: "Left", value: "left" },
        { title: "Bottom", value: "bottom" },
        { title: "Top", value: "top" },
      ], layout: "radio" },
      initialValue: "right",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Contact Form",
        subtitle: title,
      };
    },
  },
});
