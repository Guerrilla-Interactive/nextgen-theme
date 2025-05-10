import pageSlugSchema from "@/app/(main)/(root)/[slug]/_page-slug-core-utilities/page-slug.route-schema";
import blogSlugSchema from "@/app/(main)/blog/[slug]/_blog-slug-core-utilities/blog-slug.route-schema";

import serviceSlugSchema from "@/app/(main)/service/[slug]/_service-slug-core-utilities/service-slug.route-schema";
import courseSlugSchema from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.route-schema";



// ADD VALUE 1 ABOVE

const routeDocumentSchemas = {
  pageSlugSchema, 
  blogSlugSchema,
  serviceSlugSchema,
  courseSlugSchema,
  
  
  // ADD VALUE 2 ABOVE
};

export const allRouteDocumentSchemas = Object.values(routeDocumentSchemas);

export const ROUTE_DOCUMENT_SCHEMA_TYPES = allRouteDocumentSchemas.map((schema) => schema.name);
