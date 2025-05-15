import { pageBuilderQuery  } from "@/features/page-builder-blocks/block-indexer";
import { groq } from "next-sanity";
import { STANDARD_PAGE_QUERY } from "../../[slug]/_page-slug-core-utilities/page-slug.route-query";

export const GET_FRONT_PAGE_QUERY = groq`
*[_type == "siteSettings"][0].frontPage->{
    ${STANDARD_PAGE_QUERY}
  }
`;