import { defineField, defineType } from "sanity";
import { PlayCircle } from "lucide-react";

export default defineType({
  name: "video-section-block",
  type: "object",
  title: "Video Section",
  description: "Content with optional bullets/tags and an actual video (left/right/top/bottom)",
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
    videoSize: "md",
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
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload an MP4/WebM file. Takes precedence over Video URL if both are set.",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Direct URL to a video (e.g., MP4/WebM).",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "autoplay", title: "Autoplay", type: "boolean", initialValue: true }),
    defineField({ name: "loop", title: "Loop", type: "boolean", initialValue: true }),
    defineField({ name: "muted", title: "Muted", type: "boolean", initialValue: true }),
    defineField({ name: "controls", title: "Show Controls", type: "boolean", initialValue: false }),
    defineField({ name: "playsInline", title: "Plays Inline", type: "boolean", initialValue: true }),
    defineField({
      name: "videoPosition",
      title: "Video Position",
      type: "string",
      options: { list: [
        { title: "Right (default)", value: "right" },
        { title: "Left", value: "left" },
        { title: "Bottom", value: "bottom" },
        { title: "Top", value: "top" },
      ], layout: "radio" },
      initialValue: "right",
    }),
    defineField({
      name: "videoSize",
      title: "Video Size",
      type: "string",
      options: { list: [
        { title: "Medium", value: "md" },
        { title: "Large", value: "lg" },
        { title: "X-Large", value: "xl" },
      ], layout: "radio" },
      initialValue: "md",
      description: "Controls the visual size of the video placeholder",
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
