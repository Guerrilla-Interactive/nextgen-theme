import { pageBuilderQuery  } from "@/features/page-builder-blocks/block-indexer";
import { groq } from "next-sanity";

export const GET_FRONT_PAGE_QUERY = groq`
*[_type == "siteSettings"][0].frontPage->{
    ${pageBuilderQuery},
    meta_title,
    meta_description,
    noindex,
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
  }
`;