import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "posts-block",
  type: "object",
  title: "Posts",
  description: "Header with CTA and a 3-card blog preview grid",
  icon: Newspaper,
  initialValue: {
    heading: "Engineering blog",
    description: [
      {
        _key: "desc-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "desc-1-span-1", _type: "span", text: "Deep dives, tutorials, and insights from our engineering team", marks: [] },
        ],
      },
    ],
    cta: { title: "View all posts", variant: "outline", href: "/blog" },
    posts: [
      {
        _key: "p1",
        category: "Engineering",
        meta: "March 15, 2024 • 8 min read",
        title: "Building scalable AI pipelines with Kubernetes",
        excerpt: "How we process millions of AI requests daily using a distributed architecture that scales horizontally and maintains sub-100ms response times.",
        author: { initials: "DR", name: "David Rodriguez", role: "Senior Engineer", bgColor: "bg-primary" },
        bgClass: "bg-gradient-to-br from-primary/40 to-primary/60",
      },
      {
        _key: "p2",
        category: "Security",
        meta: "March 12, 2024 • 6 min read",
        title: "Zero-trust architecture in modern development",
        excerpt: "Our journey to implementing zero-trust security principles across our entire development lifecycle, from code commits to production deployments.",
        author: { initials: "LK", name: "Lisa Kim", role: "Security Lead", bgColor: "bg-green-600" },
        bgClass: "bg-gradient-to-br from-green-500/40 to-green-600/60",
      },
      {
        _key: "p3",
        category: "Tutorial",
        meta: "March 10, 2024 • 12 min read",
        title: "Advanced workflow automation patterns",
        excerpt: "Step-by-step guide to creating intelligent workflows that adapt to your team's patterns and automatically optimize for efficiency and reliability.",
        author: { initials: "JM", name: "Jordan Mills", role: "Product Engineer", bgColor: "bg-purple-600" },
        bgClass: "bg-gradient-to-br from-purple-500/40 to-purple-600/60",
      },
    ],
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "block-content" }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "href", type: "string" }),
        defineField({ name: "variant", type: "button-variant" }),
      ],
    }),
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      of: [
        defineField({
          name: "post",
          type: "object",
          fields: [
            defineField({ name: "category", type: "string" }),
            defineField({ name: "meta", type: "string", title: "Date • read time" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "excerpt", type: "text" }),
            defineField({
              name: "author",
              type: "object",
              fields: [
                defineField({ name: "initials", type: "string" }),
                defineField({ name: "name", type: "string" }),
                defineField({ name: "role", type: "string" }),
                defineField({ name: "bgColor", type: "string" }),
              ],
            }),
            defineField({ name: "bgClass", type: "string", title: "Header BG Class" }),
          ],
          preview: { select: { title: "title", subtitle: "category" } },
        }),
      ],
      validation: (r) => r.length(3),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: "Posts",
        subtitle: title,
      };
    },
  },
});
