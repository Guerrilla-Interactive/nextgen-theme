

import { groq } from "next-sanity";
import { pageBuilderQuery } from "../page-builder-blocks/block-indexer";


// @sanity-typegen-ignore
export const STANDARD_PAGE_QUERY = groq`
  ${pageBuilderQuery},
    meta_title,
    meta_description,
    noindex,
    navigationSettings {
      navigationTextColor,
    },
    navigationTextColor,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
`;
