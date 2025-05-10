import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "blog-slug",
  title: "Post",
  type: "document",
  icon: FileText,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
    {
      name: "visual",
      title: "Visual Preview",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "captureImage",
      title: "Page Screenshot",
      type: "screenshotImage",
      group: "visual",
      description: "Server-side screenshot of how this page appears on the frontend",
    }),
    defineField({
      name: "captureMetadata",
      title: "Capture Metadata",
      type: "object",
      group: "visual",
      fields: [
        { name: "captureDate", type: "datetime", title: "Capture Date" },
        { name: "pageTitle", type: "string", title: "Page Title" },
        { name: "pageUrl", type: "string", title: "Page URL" },
        { name: "path", type: "string", title: "Path" },
        { name: "viewportWidth", type: "number", title: "Viewport Width" },
        { name: "viewportHeight", type: "number", title: "Viewport Height" },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "settings",
      to: { type: "author" },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "settings",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image",
      captureImage: "captureImage",
    },
    prepare(selection) {
      const { author, captureImage, media } = selection;
      return { 
        ...selection, 
        subtitle: author && `by ${author}`,
        // Prioritize captureImage over regular image
        media: captureImage || media
      };
    },
  },
});
