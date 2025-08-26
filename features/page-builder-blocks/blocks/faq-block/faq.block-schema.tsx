import { defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export default defineType({
  name: "faq-block",
  type: "object",
  title: "FAQ",
  description: "Accordion-based FAQ with heading and Q&A items",
  icon: HelpCircle,
  initialValue: {
    heading: "FAQ",
    items: [
      {
        _key: "q1",
        question: "What is this product?",
        answer: [
          { _key: "a1", _type: "block", style: "normal", children: [ { _key: "a1s1", _type: "span", text: "It's a powerful platform to accelerate your creative ideas.", marks: [] } ] }
        ]
      },
      {
        _key: "q2",
        question: "How do I subscribe?",
        answer: [
          { _key: "a2", _type: "block", style: "normal", children: [ { _key: "a2s1", _type: "span", text: "Enter your email in the newsletter section above and click Subscribe.", marks: [] } ] }
        ]
      }
    ]
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "block-content" }),
          ],
          preview: { select: { title: "question" } },
        })
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare({ title, items }) {
      const count = items?.length ?? 0;
      return {
        title: "FAQ",
        subtitle: `${title} · ${count} item${count === 1 ? "" : "s"}`,
      };
    },
  },
});
