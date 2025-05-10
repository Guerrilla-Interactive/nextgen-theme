import { footerSettingsSchema } from "./footer-settings/footer-settings.schema";
import { headerSettingsSchema } from "./header-settings/header-settings.schema";
import { metadataSettingsSchema } from "./metadata-settings/metadata-settings.schema";
import { siteSettingsSchema } from "./site-settings/site-settings.schema";
import { route404SettingsSchema } from "./route-404-settings/route-404-settings.schema";
// ADD VALUE 1 ABOVE


export { metadataSettingsSchema } from "./metadata-settings/metadata-settings.schema";
export { headerSettingsSchema } from "./header-settings/header-settings.schema";
export { siteSettingsSchema } from "./site-settings/site-settings.schema";
export { footerSettingsSchema } from "./footer-settings/footer-settings.schema";
export { route404SettingsSchema } from "./route-404-settings/route-404-settings.schema";
// ADD VALUE 2 ABOVE


const settingsSchemas = {
  footerSettingsSchema,
  headerSettingsSchema,
  metadataSettingsSchema,
  siteSettingsSchema,
  route404SettingsSchema,
  // ADD VALUE 3 ABOVE
};

export const allSettingsSchemas= Object.values( settingsSchemas);

