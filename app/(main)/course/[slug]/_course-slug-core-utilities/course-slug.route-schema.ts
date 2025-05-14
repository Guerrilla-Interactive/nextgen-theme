import { defineField, defineType } from "sanity";
import { BookOpen } from "lucide-react";
import {  courseSlugTranslations as t, courseSlugVariables as v } from "./course-slug.translations-and-variables";

// Define the document type for TypeScript
interface CourseDocument {
  digitalCourse?: {
    enabled?: boolean;
  };
}

export default defineType({
  name: v("DOCUMENT_TYPE"),
  title: t("schemaTitle", "Course"),
  description: t("schemaDescription", "A course page with details, registration form and FAQ."),
  type: "document",
  icon: BookOpen,
  groups: [
    {
      name: "content",
      title: t("group.content", "Content"),
    },
    {
      name: "details",
      title: t("group.details", "Course Details"),
    },
    {
      name: "seo",
      title: t("group.seo", "SEO"),
    },
    {
      name: "settings",
      title: t("group.settings", "Settings"),
    },
    {
      name: "visual",
      title: "Visual Preview",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: t("title.title", "Title"),
      description: t("title.description", "The course title"),
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: t("slug.title", "Slug"),
      description: t("slug.description", "URL-friendly name for the course"),
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      name: "aboutCourse",
      title: "About the Course",
      description: "A detailed description of what the course is about",
      type: "block-content",
      group: "details",
    }),
    defineField({
      name: "keyConcepts",
      title: "Key Concepts",
      description: "Key concepts or topics covered in the course",
      type: "array",
      of: [
        {
          type: "object",
          name: "concept",
          title: "Concept",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            }),
            defineField({
              name: "icon",
              type: "icon",
              title: "Icon",
              options: {
                collections: ["mi", "mdi"],
                showName: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "title",
              icon: "icon",
            },
            prepare({ title, icon }) {
              return {
                title: title,
                subtitle: icon ? `Icon: ${icon}` : "No icon selected",
              };
            },
          },
        },
      ],
      group: "details",
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
      name: "digitalCourse",
      title: "Digitalt Kurs",
      type: "object",
      group: "details",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          
          initialValue: false,
        }),
        defineField({
          name: "icon",
          type: "icon",
          title: "Icon",
          description: "Dette er ikonet for kolumen vedsiden av påmeldingskjemaet",
          hidden: ({ document }) => (document as CourseDocument)?.digitalCourse?.enabled === false,
          initialValue: {
            icon: "mdi:laptop-account",
          },
          options: {
            collections: ["mdi"],
            showName: true,
          },
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description: "Dette er tittelen for kolumen vedsiden av påmeldingskjemaet",
          initialValue: "Dette er påmelding til digitalt kurs",
          hidden: ({ document }) => (document as CourseDocument)?.digitalCourse?.enabled === false,
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          description: "Dette er beskrivelse for kolumen vedsiden av påmeldingskjemaet",
          initialValue: "Nettkurset passer for alle som ikke har tid eller mulighet til å delta på de vanlige klasseromskursene våre – et godt og rimelig alternativ til fysiske kurs.",
          hidden: ({ document }) => (document as CourseDocument)?.digitalCourse?.enabled === false,
        }),
      ],
    }),
    defineField({
      name: "map",
      title: "Map",
      type: "cover-map-block",
      hidden: ({ document }) => (document as CourseDocument)?.digitalCourse?.enabled === true,
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      type: "faqs-block",
      group: "details",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      captureImage: "captureImage"
    },
    prepare({ title, media, captureImage }) {
      return {
        title: title || t("noTitle", "No title set"),
        media: captureImage || media,
      };
    },
  },
});
