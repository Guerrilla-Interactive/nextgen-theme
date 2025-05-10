

import { sanityFetch } from "@/sanity/lib/live";
import { GET_ALL_COURSE_PAGES_QUERY, GET_COURSE_PAGE_BY_ROUTE_QUERY } from "./course-slug.route-query";
import { GET_ALL_COURSE_PAGES_QUERYResult, GET_COURSE_PAGE_BY_DEFINED_SLUG_QUERYResult } from "@/sanity.types";

// Fetch a full Course using its slug
export const fetchSanityCourseBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<GET_COURSE_PAGE_BY_DEFINED_SLUG_QUERYResult> => {
  const { data } = await sanityFetch({
    query: GET_COURSE_PAGE_BY_ROUTE_QUERY,
    params: { slug },
  });
  return data;
}

// Fetch all Course slugs for static params generation
export const fetchSanityCourseStaticParams = async (): Promise<GET_ALL_COURSE_PAGES_QUERYResult[]> => {
  const { data } = await sanityFetch({
    query: GET_ALL_COURSE_PAGES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

  export const fetchSanityCourses = async (): Promise<GET_ALL_COURSE_PAGES_QUERYResult[]> => {
  const { data } = await sanityFetch({
    query: GET_ALL_COURSE_PAGES_QUERY,
  });
  return data;
}
