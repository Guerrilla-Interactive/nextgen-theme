"use server";

import { sanityFetch } from "@/sanity/lib/live";

import { GET_ALL_NEXTGEN_READY_PROJECT_SLUGS_QUERY, GET_NEXTGEN_READY_PROJECT_POST_QUERY } from "./nextgen-ready-project-slug.route-query";

// Fetch a full NextgenReadyProject using its slug
export async function fetchSanityNextgenReadyProjectBySlug({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Page> {
  const { data } = await sanityFetch({
    query: GET_NEXTGEN_READY_PROJECT_POST_QUERY,
    params: { slug },
  });
  return data;
}

// Fetch all NextgenReadyProject slugs for static params generation
export async function fetchSanityNextgenReadyProjectStaticParams(): Promise<Sanity.Page[]> {
  const { data } = await sanityFetch({
    query: GET_ALL_NEXTGEN_READY_PROJECT_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function fetchSanityNextgenReadyProjects() {
  const { data } = await sanityFetch({
    query: GET_ALL_NEXTGEN_READY_PROJECT_SLUGS_QUERY,
  });
  return data;
}
