import { pageBuilderQuery  } from "@/features/page-builder-blocks/block-queries";
import { STANDARD_PAGE_QUERY } from "@/features/unorganized-queries/standard-page.query";
import { groq } from "next-sanity";


export const GET_FRONT_PAGE_QUERY = groq`
*[_type == "siteSettings"][0].frontPage->{
    ${STANDARD_PAGE_QUERY}
  }
`;