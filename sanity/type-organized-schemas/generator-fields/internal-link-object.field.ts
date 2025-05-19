import { Link } from "lucide-react";
import { defineField } from "sanity";

import { LinkRenderer } from "@/sanity/sanity-studio-components/utils/link-renderer.component";

export const internalLinkObjectField = defineField({
  name: "internalLinkObject",
  title: "Intern link",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "internalLink",
      title: "Velg dokument",
      type: "internalLink",
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
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
      title: "internalLink.title",
      name: "internalLink.name",
      icon: "icon",
    },
    prepare({ title, name, icon }) {
      return {
        title: title || name || "Intern link",
        media: icon || Link,
      };
    },
  },
});
