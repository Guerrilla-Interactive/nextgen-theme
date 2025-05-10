import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { fetchSanityServiceBySlug, fetchSanityServiceStaticParams } from "./_service-slug-core-utilities/service-slug.server-actions";
import ServiceSlugPageComponent from "./service-slug.page-component";

// Add ISR with revalidation every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
  const pages = await fetchSanityServiceStaticParams();

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityServiceBySlug({ slug });

  // Log the fetched page data on the server


  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: `/tjenester/${slug}` });
}

export default async function Service(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityServiceBySlug({ slug });

  // Log the fetched page data on the server


  if (!page) {
    notFound();
  }
  return (
    <>
      <ServiceSlugPageComponent {...page} />
    </>
  );
}
