import { Download } from "lucide-react";
import { defineField } from "sanity";

import { LinkRenderer } from "@/sanity/sanity-studio-components/utils/link-renderer.component";

export const downloadLinkObjectField = defineField({
  name: "downloadLinkObject",
  title: "Nedlastingslink",
  type: "object",
  icon: Download,
  fields: [
    defineField({
      name: "file",
      title: "Fil",
      type: "file",
      options: {
        // required: true,  // REMOVED: 'required' is not a valid key for FileOptions
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
      fileName: "file.asset.originalFilename",
      icon: "icon",
    },
    prepare({ fileName, icon }) {
      return {
        title: fileName || "Nedlastingslink",
        media: icon || Download,
      };
    },
  },
});
