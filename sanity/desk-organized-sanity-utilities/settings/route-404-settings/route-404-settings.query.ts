import { groq } from "next-sanity";
import { pageBuilderQuery } from "@/features/page-builder-blocks/block-indexer";

// @sanity-typegen-ignore
export const route404SettingsQuery = groq`
    title,
    subtitle,
    buttonText,
    buttonLink,
    backgroundImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    blocks[] {
      ${pageBuilderQuery}
    },
    meta_title,
    meta_description
`;


export const route404SettingsFetchQuery = groq`
  *[_type == "route404Settings"][0] {
  ${route404SettingsQuery}
  }
`;


