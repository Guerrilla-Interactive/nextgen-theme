import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "nextgen-ready-project-slug",
  title: "NextgenReadyProject",
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

    // Repo Link 
    defineField({
      name: "repoLink",
      title: "Repo Link",
      type: "url",
      group: "content",
    }),

    // Preview Link
    defineField({
      name: "previewLink",
      title: "Preview Link",
      type: "url",
      group: "content",
    }),

    // Image
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "commands",
      title: "Commands",
      type: "array",
      of: [{ type: "reference", to: { type: "command-slug" } }],
      group: "content",

    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),
  ],
});
