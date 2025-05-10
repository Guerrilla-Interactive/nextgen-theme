// THIS IS AN INDEXER FILE

import { groq } from "next-sanity";
import { siteSettingsFetchQuery } from "./site-settings/site-settings.query";
import { metadataSettingsFetchQuery } from "./metadata-settings/metadata-settings.query";
import { sanityFetch } from "@/sanity/lib/live";
import { footerSettingsFetchQuery } from "./footer-settings/footer-settings.query";
import { headerSettingsFetchQuery } from "./header-settings/header-settings.query";
import { route404SettingsFetchQuery } from "./route-404-settings/route-404-settings.query";

const settingsQuery = groq`{
  "siteSettings": ${siteSettingsFetchQuery},
  "headerSettings": ${headerSettingsFetchQuery},
  "footerSettings": ${footerSettingsFetchQuery},
  "metadataSettings": ${metadataSettingsFetchQuery},
  "route404Settings": ${route404SettingsFetchQuery},
  // ADD VALUE 3 ABOVE
}`;


export const fetchSettings = async () => {
  const data = await sanityFetch({
    query: settingsQuery,
  });

  return data;
};
