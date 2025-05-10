import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { fetchSanityCourseBySlug, fetchSanityCourseStaticParams } from "./_course-slug-core-utilities/course-slug.server-actions";
import CourseSlugPageComponent from "./_course-slug-core-utilities/course-slug.page-component";
import { courseSlugVariables } from "./_course-slug-core-utilities/course-slug.translations-and-variables";    
// Add ISR with revalidation every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
  const pages = await fetchSanityCourseStaticParams();

  return pages.map((page) => ({
    slug: page.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityCourseBySlug({ slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: `${courseSlugVariables("ROUTE_PATH")}/${slug}` });
}

export default async function Course(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityCourseBySlug({ slug });

  if (!page) {
    notFound();
  }
  return (
    <CourseSlugPageComponent {...page} />
  );
}
