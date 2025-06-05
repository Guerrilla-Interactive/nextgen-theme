import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { fetchSanityCourseBySlug, fetchSanityCourseStaticParams } from "./_course-slug-core-utilities/course-slug.server-actions";
import CourseSlugPageComponent from "./_course-slug-core-utilities/course-slug.page-component";
import { courseSlugVariables } from "./_course-slug-core-utilities/course-slug.translations-and-variables";    
// Add ISR with revalidation every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
  const staticParamsResults = await fetchSanityCourseStaticParams();

  // Assuming staticParamsResults is an array of slug strings
  return staticParamsResults.map((slugString) => ({
    slug: slugString,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const courseDataArray = await fetchSanityCourseBySlug({ slug });
  const page = courseDataArray?.[0]; 

  if (!page) {
    notFound();
  }

  // Cast to any as a temporary measure; underlying fetch/type needs to include all fields.
  return generatePageMetadata({ page: page as any, slug: `${courseSlugVariables("ROUTE_PATH")}/${slug}` });
}

export default async function Course(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const courseDataArray = await fetchSanityCourseBySlug({ slug });
  const page = courseDataArray?.[0]; 

  if (!page) {
    notFound();
  }
  return (
    // Cast to any as a temporary measure; underlying fetch/type needs to include all fields.
    <CourseSlugPageComponent {...page as any} />
  );
}
