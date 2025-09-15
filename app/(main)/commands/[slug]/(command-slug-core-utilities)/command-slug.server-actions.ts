"use server";

import { sanityFetch } from "@/sanity/lib/live";

import { GET_ALL_COMMAND_SLUGS_QUERY, GET_COMMAND_POST_QUERY } from "./command-slug.route-query";

// Fetch a full Command using its slug
export async function fetchSanityCommandBySlug({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Page> {
  const { data } = await sanityFetch({
    query: GET_COMMAND_POST_QUERY,
    params: { slug },
  });
  return data;
}

// Fetch all Command slugs for static params generation
export async function fetchSanityCommandStaticParams(): Promise<Sanity.Page[]> {
  const { data } = await sanityFetch({
    query: GET_ALL_COMMAND_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function fetchSanityCommands() {
  const { data } = await sanityFetch({
    query: GET_ALL_COMMAND_SLUGS_QUERY,
  });
  return data;
}
