import { groq } from "next-sanity";
import { pageBuilderQuery } from "@/features/page-builder-blocks/block-indexer";

export const GET_PAGE_BY_DEFINED_SLUG_QUERY = groq`
  *[_type == "page-slug" && slug.current == $slug][0]{
    ${pageBuilderQuery},
    meta_title,
    meta_description,
    noindex,
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
  }
`;

export const GET_ALL_PAGES_QUERY = groq`*[_type == "page-slug" && defined(slug)]{slug}`;




