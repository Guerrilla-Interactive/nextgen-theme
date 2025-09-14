import { defineField, defineType } from "sanity";
import { Newspaper, Share2, Columns, Info } from "lucide-react";
import { linksField } from "@/sanity/type-organized-schemas/generator-fields/links.field";

export default defineType({
  name: "footer-block",
  type: "object",
  title: "Footer",
  description: "Brand, link columns, social links and legal info",
  icon: Newspaper,
  initialValue: {
    title: "NextGen",
    brandMark: "logo",
  },
  fields: [
    defineField({
      name: "brandMark",
      title: "Brand Mark",
      type: "string",
      options: {
        list: [
          { title: "Logo", value: "logo" },
          { title: "Title", value: "title" },
        ],
        layout: "radio",
      },
      initialValue: "logo",
      description: "Choose whether to show the Nextgen logo or the brand title",
    }),
    defineField({
      name: "title",
      title: "Brand Title",
      type: "string",
      description: "Brand or product name to display",
      validation: (r) => r.required().error("Brand title is required for the footer"),
    }),
    defineField({
      name: "description",
      title: "Brand Description",
      type: "block-content",
      description: "Short description or mission statement shown in the footer",
    }),

    defineField({
      name: "columns",
      title: "Link Columns",
      type: "array",
      description: "Organize footer navigation into columns",
      of: [
        defineField({
          name: "column",
          type: "object",
          icon: Columns,
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
            linksField({
              name: "links",
              title: "Links",
              includeInternal: true,
              includeExternal: true,
              includeDownload: false,
              includeIcon: false,
              includeDropdownGroup: false,
              includeLinkGroup: false,
              required: true,
            }),
          ],
          preview: {
            select: { title: "heading", links: "links" },
            prepare({ title, links }) {
              return { title: title || "Column", subtitle: `${links?.length ?? 0} links` };
            },
          },
        }),
      ],
      validation: (r) => r.min(2).warning("Consider adding at least 2 columns for a balanced footer"),
      options: { sortable: true },
    }),

    linksField({
      name: "socialLinks",
      title: "Social Links",
      includeInternal: false,
      includeExternal: true,
      includeDownload: false,
      includeIcon: true,
      includeLinkStyle: false,
      max: 6,
      options: { layout: "grid" },
    }),

    defineField({
      name: "legalNote",
      title: "Legal Note",
      type: "block-content",
      description: "Optional small print below the footer (privacy, disclaimers)",
      icon: Info,
    }),

    linksField({
      name: "bottomLinks",
      title: "Bottom Links",
      includeInternal: true,
      includeExternal: true,
      includeDownload: false,
      includeIcon: false,
      includeLinkStyle: false,
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Footer",
        subtitle: title,
      };
    },
  },
});
