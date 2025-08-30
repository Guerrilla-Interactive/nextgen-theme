import React from 'react';
import { fetchFrontPage } from './_page-index-core-utilities/page-index.server-actions';
import { Blocks } from '@/features/page-builder-blocks/block-component-exporter';
import { generatePageMetadata } from '@/features/unorganized-utils/metadata';
import { notFound } from 'next/navigation';
import { UseClientConfigs } from '../[slug]/_page-slug-core-utilities/use-client-configs';
import FullPageBackground from '@/features/unorganized-components/magic-background/full-page-background';


// Add ISR with revalidation every 30 seconds
export const revalidate = 30;

// generateStaticParams

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchFrontPage();

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page() {
  const frontPageData = await fetchFrontPage();
  return (
    <>
    {/* @ts-ignore */}
    <FullPageBackground />
    <UseClientConfigs navigationTextColor={frontPageData?.navigationSettings?.navigationTextColor} />
    <Blocks blocks={frontPageData?.blocks} />  
       
    </>
  )
}


