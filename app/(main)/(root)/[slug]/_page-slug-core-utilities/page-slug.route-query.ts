import { groq } from "next-sanity";
import { STANDARD_PAGE_QUERY } from "@/features/unorganized-queries/standard-page.query";
export const GET_PAGE_BY_DEFINED_SLUG_QUERY = groq`
  *[_type == "page-slug" && slug.current == $slug][0]{
    ${STANDARD_PAGE_QUERY}
  }
`;


export const GET_ALL_PAGES_QUERY = groq`*[_type == "page-slug" && defined(slug)]{slug}`;




