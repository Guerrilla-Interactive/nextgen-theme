import type { ArrayDefinition, ArrayOfObjectsInputProps } from "sanity";
import { defineField } from "sanity";

import { LinksFieldInput } from "@/sanity/sanity-studio-components/inputs/links-field-input.component";

import type { FieldDef } from "@/sanity/type-organized-schemas/generator-fields/types/field.types";
import { Folder, LayoutGrid } from "lucide-react";
import { internalLinkObjectField } from "./internal-link-object.field";
import { externalLinkObjectField } from "./external-link-object.field";
import { downloadLinkObjectField } from "./download-link-object.field";
import { stringField } from "./string.field";

type LinksFieldProps = Omit<FieldDef<ArrayDefinition>, "of" | "validation"> & {
  includeInternal?: boolean;
  includeDropdownGroup?: boolean;
  includeLinkGroup?: boolean;
  includeExternal?: boolean;
  includeDownload?: boolean;
  includeCustomTitle?: boolean;
  includeDescription?: boolean;
  includeDescriptionInLinkGroup?: boolean;
  includeIcon?: boolean;
  includeHideOnMobile?: boolean;
  includeLinkStyle?: boolean;
  max?: number;
};

const customTitleField = defineField({
  name: "customTitle",
  title: "Egendefinert tittel",
  type: "string",
});

const descriptionField = defineField({
  name: "description",
  title: "Beskrivelse",
  type: "text",
  rows: 2,
});

const iconField = defineField({
  name: "icon",
  title: "Icon",
  type: "icon",
  description: "Icon to display with this link",
});

const hideOnMobileField = defineField({
  name: "hideOnMobile",
  title: "Hide on Mobile",
  type: "boolean",
  initialValue: false,
  description: "If checked, this item will be hidden on mobile screens."
});

const linkStyleField = defineField({
  name: "linkStyle",
  title: "Link Style",
  type: "string",
  options: {
    list: [
      { title: "Default", value: "default" },
      { title: "Button", value: "button" },
    ],
    layout: "radio",
  },
  initialValue: "default",
  description: "Select the visual style for this link"
});

const internalLink = (props: LinksFieldProps) => {
  const { includeInternal, includeCustomTitle, includeDescription, includeIcon, includeHideOnMobile, includeLinkStyle } = props;

  if (!includeInternal) return null;

  const fields = [...internalLinkObjectField.fields].filter((f: any) => includeIcon ? true : f?.name !== "icon");

  if (includeIcon) {
    fields.push(iconField);
  }

  if (includeCustomTitle) {
    fields.push(customTitleField);
  }

  if (includeDescription) {
    fields.push(descriptionField);
  }

  if (includeHideOnMobile) {
    fields.push(hideOnMobileField);
  }

  if (includeLinkStyle) {
    fields.push(linkStyleField);
  }

  return defineField({
    ...internalLinkObjectField,
    fields,
    preview: {
      select: {
        internalLinkTitle: "internalLink.title",
        internalLinkName: "internalLink.name",
        path: "path",
        customTitle: "customTitle",
        icon: "icon",
        linkStyle: "linkStyle",
      },
      prepare({ internalLinkTitle, internalLinkName, path, customTitle, icon, linkStyle }) {
        return {
          title: customTitle ?? internalLinkTitle ?? internalLinkName ?? path,
          subtitle: linkStyle === "button" ? "Button Style" : undefined,
          media: icon,
        };
      },
    },
  });
};

const externalLink = (props: LinksFieldProps) => {
  const { includeExternal, includeCustomTitle, includeDescription, includeIcon, includeHideOnMobile, includeLinkStyle } = props;

  if (!includeExternal) return null;

  const fields = [...externalLinkObjectField.fields].filter((f: any) => includeIcon ? true : f?.name !== "icon");

  if (includeIcon) {
    fields.push(iconField);
  }

  if (includeCustomTitle) {
    fields.push(customTitleField);
  }

  if (includeDescription) {
    fields.push(descriptionField);
  }

  if (includeHideOnMobile) {
    fields.push(hideOnMobileField);
  }

  if (includeLinkStyle) {
    fields.push(linkStyleField);
  }

  return defineField({
    ...externalLinkObjectField,
    fields,
    preview: {
      select: {
        href: "href",
        customTitle: "customTitle",
        icon: "icon",
        linkStyle: "linkStyle",
      },
      prepare({ href, customTitle, icon, linkStyle }) {
        return {
          title: customTitle ?? href,
          subtitle: linkStyle === "button" ? "Button Style" : undefined,
          media: icon,
        };
      },
    },
  });
};

const downloadLink = (props: LinksFieldProps) => {
  const { includeDownload, includeCustomTitle, includeDescription, includeIcon, includeHideOnMobile, includeLinkStyle } = props;

  if (!includeDownload) return null;

  const fields = [...downloadLinkObjectField.fields].filter((f: any) => includeIcon ? true : f?.name !== "icon");

  if (includeIcon) {
    fields.push(iconField);
  }

  if (includeCustomTitle) {
    fields.push(customTitleField);
  }

  if (includeDescription) {
    fields.push(descriptionField);
  }

  if (includeHideOnMobile) {
    fields.push(hideOnMobileField);
  }

  if (includeLinkStyle) {
    fields.push(linkStyleField);
  }

  return defineField({
    ...downloadLinkObjectField,
    fields,
    preview: {
      select: {
        fileName: "file.asset.originalFilename",
        customTitle: "customTitle",
        icon: "icon",
        linkStyle: "linkStyle",
      },
      prepare({ fileName, customTitle, icon, linkStyle }) {
        return {
          title: customTitle ?? fileName,
          subtitle: linkStyle === "button" ? "Button Style" : undefined,
          media: icon,
        };
      },
    },
  });
};

const dropdownGroup = (props: LinksFieldProps) => {
  const { includeDropdownGroup, includeDescriptionInLinkGroup, includeIcon, includeHideOnMobile, includeLinkStyle } = props;

  if (!includeDropdownGroup) return null;

  const titleField = defineField({
    name: "title",
    title: "Tittel",
    type: "string",
    validation: (Rule) => Rule.required(),
  });

  const nestedLinksField = defineField({
    name: "links",
    title: "Linker",
    type: "array",
    of: linksField({
      name: "links",
      includeExternal: true,
      includeInternal: true,
      includeDescription: includeDescriptionInLinkGroup,
      includeIcon: props.includeIcon,
      includeHideOnMobile: props.includeHideOnMobile,
      includeLinkStyle: props.includeLinkStyle,
      includeDropdownGroup: false,
      includeLinkGroup: false
    }).of,
    validation: (Rule) => Rule.required(),
  });

  return defineField({
    name: "dropdownGroup",
    title: "Dropdown Gruppe",
    type: "object",
    icon: Folder,
    fields: [
      titleField,
      ...(includeIcon ? [iconField] : []),
      nestedLinksField,
      ...(includeHideOnMobile ? [hideOnMobileField] : []),
    ],
    preview: {
      select: {
        title: "title",
        links: "links",
        icon: "icon",
      },
      prepare({ title, links, icon }) {
        return {
          title,
          subtitle: `Dropdown: ${links?.length ?? 0} link${links?.length !== 1 ? "er" : ""}`,
          media: icon || Folder,
        };
      },
    },
  });
};

const linkGroup = (props: LinksFieldProps) => {
  const { includeLinkGroup, includeIcon, includeHideOnMobile, includeLinkStyle } = props;

  if (!includeLinkGroup) return null;

  const titleField = defineField({
    name: "title",
    title: "Gruppe Navn",
    type: "string",
    description: "Internal name for this group (not displayed)",
    validation: (Rule) => Rule.required(),
  });

  const groupItemsField = defineField({
    name: "items",
    title: "Items in Group",
    type: "array",
    of: linksField({
      name: "groupItems",
      includeExternal: true,
      includeInternal: true,
      includeIcon: props.includeIcon,
      includeHideOnMobile: props.includeHideOnMobile,
      includeLinkStyle: props.includeLinkStyle,
      includeDropdownGroup: true,
      includeLinkGroup: false,
    }).of,
    description: "Links to include in this horizontal group",
    validation: (Rule) => Rule.required(),
  });

  return defineField({
    name: "linkGroup",
    title: "Link Gruppe",
    type: "object",
    icon: LayoutGrid,
    fields: [
      titleField,
      ...(includeIcon ? [iconField] : []),
      groupItemsField,
      ...(includeHideOnMobile ? [hideOnMobileField] : []),
    ],
    preview: {
      select: {
        title: "title",
        items: "items",
        icon: "icon",
      },
      prepare({ title, items, icon }) {
        return {
          title,
          subtitle: `Group: ${items?.length ?? 0} items`,
          media: icon || LayoutGrid,
        };
      },
    },
  });
};

export const linksField = (props: LinksFieldProps) => {
  const { 
    includeCustomTitle = true, 
    includeInternal = true,
    includeDropdownGroup = false,
    includeLinkGroup = false,
    includeExternal = true,
    includeDownload = false,
    includeIcon = false,
    includeHideOnMobile = false,
    includeLinkStyle = false,
    options,
    required, 
    max 
  } = props;

  const realProps = {
    ...props,
    includeInternal,
    includeExternal,
    includeDownload,
    includeCustomTitle,
    includeDropdownGroup,
    includeLinkGroup,
    includeIcon,
    includeHideOnMobile,
    includeLinkStyle,
  };

  const linkTypes: ArrayDefinition["of"] = [
    internalLink(realProps),
    externalLink(realProps),
    downloadLink(realProps),
    dropdownGroup(realProps),
    linkGroup(realProps),
  ].filter(Boolean) as ArrayDefinition["of"];

  return defineField({
    ...props,
    type: "array",
    of: linkTypes,
    options: {
      ...options,
    },
    validation: (Rule) => {
      const rules = [];
      if (max) rules.push(Rule.max(max).error());
      if (required) rules.push(Rule.required().error());
      return rules;
    },
    components: {
      input: (props: ArrayOfObjectsInputProps) => <LinksFieldInput {...props} max={max} />,
    },
  });
};
