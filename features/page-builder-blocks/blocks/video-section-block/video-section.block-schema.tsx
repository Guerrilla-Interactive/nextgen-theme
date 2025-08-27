import { defineField, defineType } from "sanity";
import { PlayCircle } from "lucide-react";

export default defineType({
  name: "video-section-block",
  type: "object",
  title: "Video Section",
  description: "Content with optional bullets/tags and a video placeholder (left/right/bottom)",
  icon: PlayCircle,
  initialValue: {
    title: "Take yourself to the",
    highlight: "next level",
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
              "Learn the essentials in minutes, then move faster than ever. Discover actions, pick what you need, and ship with confidence.",
            marks: [],
          },
        ],
      },
    ],
    listType: "tags",
    bullets: [
      "Step-by-step quickstart",
      "Actionable examples",
      "Best practices built-in",
    ],
    tags: ["Docs", "Quickstart", "Best Practices"],
    videoDescription: "A simple workflow you'll use every day.",
    videoPosition: "right",
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
    defineField({ name: "videoDescription", title: "Video Description", type: "string" }),
    defineField({
      name: "videoPosition",
      title: "Video Position",
      type: "string",
      options: { list: [
        { title: "Right (default)", value: "right" },
        { title: "Left", value: "left" },
        { title: "Bottom", value: "bottom" },
      ], layout: "radio" },
      initialValue: "right",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Video Section",
        subtitle: title,
      };
    },
  },
});
