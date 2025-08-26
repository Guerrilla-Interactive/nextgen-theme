import { defineField, defineType } from "sanity";
import { MessageSquare } from "lucide-react";

export default defineType({
  name: "testimonials-block",
  type: "object",
  title: "Testimonials",
  description: "Heading, description and a 3-card testimonials grid",
  icon: MessageSquare,
  initialValue: {
    heading: "Loved by developers and product teams",
    description: [
      {
        _key: "desc-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "desc-1-span-1",
            _type: "span",
            text: "See what teams are saying about their experience with Velocity",
            marks: [],
          },
        ],
      },
    ],
    items: [
      {
        _key: "t-1",
        rating: 5,
        quote:
          "Velocity reduced our deployment time from 2 hours to 15 minutes. The AI insights caught 3 critical issues before they hit production. Game changer for our team.",
        initials: "SH",
        name: "Sarah Chen",
        role: "Lead Engineer at Stripe",
        bgColor: "bg-primary",
      },
      {
        _key: "t-2",
        rating: 5,
        quote:
          "The workflow automation is incredible. We ship 40% faster now and our code quality has never been better. The whole team loves using it every day.",
        initials: "MR",
        name: "Marcus Rodriguez",
        role: "CTO at Linear",
        bgColor: "bg-green-600",
      },
      {
        _key: "t-3",
        rating: 5,
        quote:
          "Finally, a platform that understands our workflow. The enterprise security features gave us confidence to migrate our entire development process.",
        initials: "AT",
        name: "Alex Thompson",
        role: "VP Engineering at Notion",
        bgColor: "bg-purple-600",
      },
    ],
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "block-content" }),
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
            defineField({ name: "quote", title: "Quote", type: "text" }),
            defineField({ name: "initials", title: "Avatar Initials", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "bgColor", title: "Avatar BG Class", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
      validation: (rule) => rule.length(3),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: "Testimonials",
        subtitle: title,
      };
    },
  },
});
