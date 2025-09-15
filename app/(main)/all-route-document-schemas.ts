import pageSlugSchema from "@/app/(main)/(root)/[slug]/_page-slug-core-utilities/page-slug.route-schema";
import blogSlugSchema from "@/app/(main)/blog/[slug]/_blog-slug-core-utilities/blog-slug.route-schema";
import serviceSlugSchema from "@/app/(main)/service/[slug]/_service-slug-core-utilities/service-slug.route-schema";
import courseSlugSchema from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.route-schema";

try {
  require('@/features/context/global-context');
} catch (e) {
  console.warn('Global context not available:', e.message);
}



import nextgenReadyProjectSlugSchema from "@/app/(main)/nextgen-ready-projects/[slug]/(nextgen-ready-project-slug-core-utilities)/nextgen-ready-project-slug.route-schema";
import commandSlugSchema from "@/app/(main)/commands/[slug]/(command-slug-core-utilities)/command-slug.route-schema";
// ADD IMPORT PAGETYPE SCHEMAS ABOVE
const routeDocumentSchemas = {
// ADD PAGETYPE SCHEMAS BELOW
commandSlugSchema,
nextgenReadyProjectSlugSchema,


  pageSlugSchema, 
  blogSlugSchema,
  serviceSlugSchema,
  courseSlugSchema,
};

export const allRouteDocumentSchemas = Object.values(routeDocumentSchemas);

export const ROUTE_DOCUMENT_SCHEMA_TYPES = allRouteDocumentSchemas.map((schema) => schema.name);
