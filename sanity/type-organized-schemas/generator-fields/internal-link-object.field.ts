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
    }),
    defineField({
      name: "path",
      title: "Egendefinert sti",
      type: "string",
      description: "Manuell intern sti for sider som ikke finnes i Sanity, f.eks. /this-page",
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
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true;
      const hasRef = Boolean(value.internalLink);
      const hasPath = Boolean(value.path && typeof value.path === "string" && value.path.trim().length > 0);
      return hasRef || hasPath || "Velg et dokument eller angi en egendefinert sti";
    }),
  components: {
    annotation: LinkRenderer,
  },
  preview: {
    select: {
      title: "internalLink.title",
      name: "internalLink.name",
      path: "path",
      icon: "icon",
    },
    prepare({ title, name, path, icon }) {
      return {
        title: title || name || path || "Intern link",
        media: icon || Link,
      };
    },
  },
});
