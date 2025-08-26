import { defineField, defineType } from "sanity";
import { Megaphone } from "lucide-react";

export default defineType({
  name: "call-to-action-block",
  type: "object",
  title: "Call To Action",
  description: "Centered CTA with heading, body, two buttons and a footer note",
  icon: Megaphone,
  initialValue: {
    heading: "Ready to ship faster?",
    body: [
      {
        _key: "body-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "body-1-span-1",
            _type: "span",
            text:
              "Join 10,000+ teams already using Velocity to build better products. Start your free trial today and see the difference intelligent automation makes.",
            marks: [],
          },
        ],
      },
    ],
    primaryCta: { title: "Start free trial", href: "/#", target: false, buttonVariant: "default", size: "lg" },
    secondaryCta: { title: "Schedule demo", href: "/#", target: false, buttonVariant: "outline", size: "lg" },
    footerNote: [
      {
        _key: "foot-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "foot-1-span-1", _type: "span", text: "No credit card required • Setup in 5 minutes • Cancel anytime", marks: [] },
        ],
      },
    ],
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "block-content" }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "href", type: "string" }),
        defineField({ name: "target", type: "boolean", title: "Open in new tab" }),
        defineField({ name: "buttonVariant", type: "button-variant", title: "Button Variant" }),
        defineField({ name: "size", type: "string", options: { list: ["default", "sm", "lg"] }, initialValue: "lg" }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "href", type: "string" }),
        defineField({ name: "target", type: "boolean", title: "Open in new tab" }),
        defineField({ name: "buttonVariant", type: "button-variant", title: "Button Variant" }),
        defineField({ name: "size", type: "string", options: { list: ["default", "sm", "lg"] }, initialValue: "lg" }),
      ],
    }),
    defineField({ name: "footerNote", title: "Footer Note", type: "block-content" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: "Call To Action",
        subtitle: title,
      };
    },
  },
});
