

import { sanityFetch } from "@/sanity/lib/live";

import { GET_ALL_BLOG_PAGES_QUERY, GET_BLOG_PAGE_BY_ROUTE_QUERY } from "./blog-slug.route-query";
import { GET_ALL_BLOG_PAGES_QUERYResult, GET_BLOG_PAGES_BY_ROUTE_QUERYResult } from "@/sanity.types";


// Fetch a full blog post using its slug
export const fetchSanityBlogPostBySlug = async ({
    slug,
  }: {
    slug: string;
  }): Promise<GET_BLOG_PAGES_BY_ROUTE_QUERYResult> => {
    const { data } = await sanityFetch({
      query: GET_BLOG_PAGE_BY_ROUTE_QUERY,
      params: { slug },
    });
    return data;
  }
  
  // Fetch all blog slugs for static params generation
  export const fetchSanityBlogPostsStaticParams = async (): Promise<GET_ALL_BLOG_PAGES_QUERYResult[]> => {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG_PAGES_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  }
  
  export const fetchSanityBlogPosts = async (): Promise<GET_ALL_BLOG_PAGES_QUERYResult[]> => {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG_PAGES_QUERY,
    });
    return data;
  }