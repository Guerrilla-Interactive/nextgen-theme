import { Settings } from "lucide-react";

import type { StructureBuilder } from "sanity/structure";


import { singletonListItem } from "@/features/unorganized-utils/singleton-list-item.desk";
import { metadataSettingsSchema, siteSettingsSchema, footerSettingsSchema, route404SettingsSchema } from "./all-settings-document-schemas";
import { headerSettingsSchema } from "./header-settings/header-settings.schema";
// ADD VALUE 1 ABOVE



export const settingsStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Innstillinger")
    .icon(Settings)
    .child(
      S.list()
        .title("Innstillinger")
        .items([
          singletonListItem(S, siteSettingsSchema),
          S.divider(),
          singletonListItem(S, metadataSettingsSchema),
          singletonListItem(S, route404SettingsSchema),
          singletonListItem(S, headerSettingsSchema),
          singletonListItem(S, footerSettingsSchema),
          // ADD VALUE 2 ABOVE
        ]),
    );
};
