import { sanityFetch } from "@/sanity/lib/live";
import {
  GET_ALL_SERVICE_PAGES_QUERY,
  GET_SERVICE_PAGE_BY_ROUTE_QUERY,
} from "./service-slug.route-query";
import { GET_ALL_SERVICE_PAGES_QUERYResult, GET_SERVICE_PAGE_BY_ROUTE_QUERYResult } from "@/sanity.types";

// Fetch a full Service using its slug
export const fetchSanityServiceBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<GET_SERVICE_PAGE_BY_ROUTE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: GET_SERVICE_PAGE_BY_ROUTE_QUERY,
    params: { slug },
  });
  return data;
};

// Fetch all Service slugs for static params generation
export const fetchSanityServiceStaticParams = async (): Promise<GET_ALL_SERVICE_PAGES_QUERYResult[]> => {
  const { data } = await sanityFetch({
    query: GET_ALL_SERVICE_PAGES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
};

// Fetch all Services (without extra published options)
export const fetchSanityServices = async (): Promise<GET_ALL_SERVICE_PAGES_QUERYResult[]> => {
  const { data } = await sanityFetch({
    query: GET_ALL_SERVICE_PAGES_QUERY,
  });
  return data;
};
