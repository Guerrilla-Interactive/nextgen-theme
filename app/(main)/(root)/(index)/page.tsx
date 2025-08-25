import React from 'react';
import { fetchFrontPage } from './_page-index-core-utilities/page-index.server-actions';
import { Blocks } from '@/features/page-builder-blocks/block-component-exporter';
import { generatePageMetadata } from '@/features/unorganized-utils/metadata';
import { notFound } from 'next/navigation';
import { UseClientConfigs } from '../[slug]/_page-slug-core-utilities/use-client-configs';

import { Card, CardDescription, CardContent, CardFooter, CardHeader, CardTitle } from '@/features/unorganized-components/ui/card';
import { Button } from '@/features/unorganized-components/ui/button';
import PostCard from '@/features/unorganized-components/ui/post-card';
import { AllComponentsShowcaseLite } from '../../blueprint/components/component-map/all-components-showcase-lite.component';
import HomepageExample from '../../blueprint/previews/HomepageExample';
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
    <UseClientConfigs navigationTextColor={frontPageData?.navigationSettings?.navigationTextColor} />
    {/* <Blocks blocks={frontPageData?.blocks} /> */}
    <div className="container mx-auto">
    <HomepageExample />
    </div>



                <AllComponentsShowcaseLite key={Date.now()}/>
                
       
    </>
  )
}


