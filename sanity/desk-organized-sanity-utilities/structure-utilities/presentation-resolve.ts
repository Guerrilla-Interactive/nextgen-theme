import {
  defineLocations,
  defineDocuments,
  PresentationPluginOptions,
} from "sanity/presentation";
import { serviceSlugVariables } from "@/app/(main)/service/[slug]/_service-slug-core-utilities/service-slug.translations-and-variables";
import { courseSlugVariables } from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.translations-and-variables";
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          // top level
          {
            title: doc?.title || "Untitled",
            href: `/${doc?.slug}`,
          },
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },

          { title: "Blog", href: `/blog` },

          { title: "Service", href: `/${serviceSlugVariables("ROUTE_PATH")} /${doc?.slug}` },
          { title: "Services", href: `/${serviceSlugVariables("ROUTE_PATH")}` },

          { title: "Course", href: `/${courseSlugVariables("ROUTE_PATH")} /${doc?.slug}` },
          { title: "Courses", href: `/${courseSlugVariables("ROUTE_PATH")}` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: "/:slug",
      filter: `_type == 'page-slug' && slug.current == $slug`,
    },  
    {
      route: "/blog/:slug",
      filter: `_type == 'blog-slug' && slug.current == $slug`,
    },
    {
      route: `/${serviceSlugVariables("ROUTE_PATH")}/:slug`,
      filter: `_type == '${serviceSlugVariables("DOCUMENT_TYPE")}' && slug.current == $slug`,
    },
    {
      route: `/${courseSlugVariables("ROUTE_PATH")}/:slug`,
      filter: `_type == '${courseSlugVariables("DOCUMENT_TYPE")}' && slug.current == $slug`,
    },

  ]),
};
