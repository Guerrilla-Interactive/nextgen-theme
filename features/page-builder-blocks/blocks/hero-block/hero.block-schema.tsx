import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-block",
  type: "object",
  title: "Hero",
  description: "Centered hero with badge, title highlight, body and two CTAs",
  icon: LayoutTemplate,
  initialValue: {
    badge: "✨ New: AI-powered workflows",
    title: "Ship products faster with",
    highlight: "intelligent automation",
    body: [
      {
        _key: "body-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "span-1",
            _type: "span",
            text:
              "Velocity streamlines your entire product development lifecycle with AI-powered insights, automated workflows, and real-time collaboration tools.",
            marks: [],
          },
        ],
      },
    ],
    links: [
      { _key: "link-1", title: "Start free 14-day trial", href: "/#", target: false, buttonVariant: "default", size: "lg" },
      { _key: "link-2", title: "Watch demo (2 min)", href: "/#", target: false, buttonVariant: "outline", size: "lg" },
    ],
    bullets: [
      "No credit card required",
      "Setup in under 5 minutes",
      "Cancel anytime",
    ],
  },
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Optional small badge text above the title (e.g. New: AI-powered workflows)",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "highlight",
      title: "Title Highlight",
      type: "string",
      description: "Optional part of the title to render with primary color",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "href", type: "string" }),
          defineField({ name: "target", type: "boolean", title: "Open in new tab" }),
          defineField({ name: "buttonVariant", type: "button-variant", title: "Button Variant" }),
          defineField({ name: "size", type: "string", options: { list: ["default", "sm", "lg"] }, initialValue: "lg" }),
        ]
      }],
      validation: (rule) => rule.min(2).max(2).error("Provide exactly two CTAs"),
      description: "Exactly two CTAs",
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(3),
      description: "Small bullet list below CTAs (max 3)",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero",
        subtitle: title,
      };
    },
  },
});
