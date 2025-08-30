import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "features-block",
  type: "object",
  title: "Features",
  description: "Heading, description and a 3-column grid of features",
  icon: LayoutGrid,
  initialValue: {
    layoutVariant: "cards",
    cardStyle: "default",
    title: "Everything you need to build better products",
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
              "From planning to deployment, Velocity provides intelligent tools that adapt to your workflow and help your team ship with confidence.",
            marks: [],
          },
        ],
      },
    ],
    cards: [
      {
        _key: "card-1",
        title: "AI-Powered Insights",
        body: "Get intelligent recommendations on code quality, performance bottlenecks, and technical debt before they become problems.",
        stat: "92% faster issue detection",
        icon: { _type: "icon", name: "mdi:flash" },
        color: "primary",
      },
      {
        _key: "card-2",
        title: "Enterprise Security",
        body: "SOC 2 Type II compliant with end-to-end encryption, SSO integration, and granular permission controls for enterprise peace of mind.",
        stat: "99.9% uptime SLA",
        icon: { _type: "icon", name: "mdi:shield" },
        color: "green",
      },
      {
        _key: "card-3",
        title: "Workflow Automation",
        body: "Automate repetitive tasks with smart workflows that learn from your team's patterns and adapt to your development process.",
        stat: "60% reduction in manual work",
        icon: { _type: "icon", name: "mdi:cog" },
        color: "purple",
      },
    ],
  },
  fields: [
    defineField({
      name: "layoutVariant",
      title: "Layout Variant",
      type: "string",
      options: { list: [
        { title: "Cards (default)", value: "cards" },
        { title: "Simple", value: "simple" },
      ], layout: "radio" },
      initialValue: "cards",
      description: "Choose the layout style for the features section",
    }),
    defineField({
      name: "cardStyle",
      title: "Card Style",
      type: "string",
      options: { list: [
        { title: "Default", value: "default" },
        { title: "Glass", value: "glass" },
      ], layout: "radio" },
      initialValue: "default",
      description: "Visual style for feature cards when using the Cards layout",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      // Optional: no validation rule
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "block-content",
    }),
    defineField({
      name: "cards",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "card",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text" }),
            defineField({ name: "stat", type: "string", title: "Stat line" }),
            defineField({
              name: "icon",
              type: "icon",
              title: "Icon",
            }),
            defineField({ name: "color", type: "string", description: "primary, green, purple" }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title || "Feature" }),
          },
        }),
      ],
      validation: (rule) => rule.length(3),
      options: { sortable: true },
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Features",
        subtitle: title,
      };
    },
  },
});

 
