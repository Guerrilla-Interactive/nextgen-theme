import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { fetchSanityPageBySlug, fetchSanityPagesStaticParams } from "./_page-slug-core-utilities/page-slug.server-actions";

import { Blocks } from "@/features/page-builder-blocks/block-component-exporter";
import { UseClientConfigs } from "./_page-slug-core-utilities/use-client-configs";
import FullPageBackground from "@/features/unorganized-components/magic-background/full-page-background";


// Add ISR with revalidation every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  

  return pages.map((page: any) => ({
    slug: page?.slug?.current,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }>; }) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page: page as any, slug: params.slug });
}

export default async function Page(props: { params: Promise<{ slug: string }>; }) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }
  



  
  //@ts-ignore
  return <>
  

  <FullPageBackground type={(page as any)?.background as any} />
  <UseClientConfigs navigationTextColor={page?.navigationSettings?.navigationTextColor} />
  
  <Blocks blocks={(page as any)?.blocks ?? []} />
  
  
  </>;
}
