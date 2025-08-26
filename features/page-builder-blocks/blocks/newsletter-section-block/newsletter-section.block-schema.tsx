import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

export default defineType({
  name: "newsletter-section-block",
  type: "object",
  title: "Newsletter Section",
  description: "Card with heading, body, email input, CTA and footer note",
  icon: Mail,
  initialValue: {
    heading: "Get product updates and engineering insights",
    body: [
      {
        _key: "body-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "body-1-span-1",
            _type: "span",
            text: "Join 25,000+ developers getting our weekly newsletter with the latest features, best practices, and industry insights.",
            marks: [],
          },
        ],
      },
    ],
    inputPlaceholder: "Enter your email address",
    buttonText: "Subscribe now",
    footerNote: [
      {
        _key: "foot-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "foot-1-span-1",
            _type: "span",
            text: "No spam, ever. Unsubscribe with one click.",
            marks: [],
          },
        ],
      },
    ],
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Body", type: "block-content" }),
    defineField({ name: "inputPlaceholder", title: "Input Placeholder", type: "string" }),
    defineField({ name: "buttonText", title: "Button Text", type: "string" }),
    defineField({ name: "footerNote", title: "Footer Note", type: "block-content" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: "Newsletter Section",
        subtitle: title,
      };
    },
  },
});
