import { LinkRenderer } from "@/sanity/sanity-studio-components/utils/link-renderer.component";
import { Globe } from "lucide-react";
import { defineField } from "sanity";

export const externalLinkObjectField = defineField({
  name: "link",
  title: "Ekstern link",
  type: "object",
  icon: Globe,
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule) => [
        Rule.uri({
          scheme: ["https", "http", "mailto", "tel"],
        }).error('Ugyldig URL. URLen må start med "https://", "http://", "mailto:" eller "tel:".'),

        Rule.required(),
      ],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "icon",
      description: "Icon to display with this link",
    }),
  ],
  options: {
    collapsible: false,
    modal: {
      type: "popover",
      width: 2,
    },
  },
  components: {
    annotation: LinkRenderer,
  },
  preview: {
    select: {
      href: "href",
      icon: "icon",
    },
    prepare({ href, icon }) {
      return {
        title: href || "Ekstern link",
        media: icon || Globe,
      };
    },
  },
});
