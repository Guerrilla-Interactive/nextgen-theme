import { defineField, defineType } from "sanity";
import {  Star } from "lucide-react";
import { serviceSlugVariables } from "./service-slug.translations-and-variables";

export default defineType({
  name: serviceSlugVariables("DOCUMENT_TYPE"),
  title: "Service",
  type: "document",
  icon: Star,
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
      name: "customTitle",
      title: "Custom Title",
      type: "string",
      group: "settings",
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
      name: 'layout',
      title: 'Layout',
      description: 'Choose how the main content and the contact form are arranged on the page.',
      type: 'string',
      options: {
        list: [
          { title: 'Side by Side (Content Left, Form Right)', value: 'side-by-side' },
          { title: 'Form Below Content', value: 'form-below' }
        ],
        layout: 'radio'
      },
      initialValue: 'side-by-side'
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "body",
      title: "Text Content",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "customContactForm",
      title: "Custom Contact Form",
      type: "custom-contact-form-block",
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      type: "faqs-block",
      group: "content",
    })

  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      captureImage: "captureImage",
    },
    prepare({ title, media, captureImage }) {
      return {
        title: title || "Service",
        media: captureImage || media || Star,
      };
    },
  },
});
