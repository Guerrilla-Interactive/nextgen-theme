  

import { sanityFetch } from "@/sanity/lib/live";
import { GET_ALL_PAGES_QUERY, GET_PAGE_BY_DEFINED_SLUG_QUERY } from "./page-slug.route-query";
import { GET_ALL_PAGES_QUERYResult, GET_PAGE_BY_DEFINED_SLUG_QUERYResult } from "@/sanity.types";
    

// Fetch a full blog post using its slug
export const fetchSanityPageBySlug = async ({
    slug,
  }: {
    slug: string;
  }): Promise<Partial<GET_PAGE_BY_DEFINED_SLUG_QUERYResult>> => {
    const { data } = await sanityFetch({
      query: GET_PAGE_BY_DEFINED_SLUG_QUERY,
      params: { slug },
    });
    return data;
  }
  
  // Fetch all blog slugs for static params generation
  export const fetchSanityPagesStaticParams = async (): Promise<GET_ALL_PAGES_QUERYResult[]> => {
    const { data } = await sanityFetch({
      query: GET_ALL_PAGES_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  }
  
  export const fetchSanityPage = async (): Promise<GET_ALL_PAGES_QUERYResult[]> => {
    const { data } = await sanityFetch({
      query: GET_ALL_PAGES_QUERY,
    });
    return data;
  }