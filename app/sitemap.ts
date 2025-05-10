// @sanity-typegen-ignore

import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { courseSlugVariables } from "./(main)/course/[slug]/_course-slug-core-utilities/course-slug.translations-and-variables";
import { serviceSlugVariables } from "./(main)/service/[slug]/_service-slug-core-utilities/service-slug.translations-and-variables";



// 1) Fetch only the front page's slug (for filtering out a matching "page-slug" later).
async function getFrontPageSlug(): Promise<string | undefined> {


  // @sanity-typegen-ignore
  const query = groq`
    *[_type == "siteSettings"][0].frontPage->{
      "slug": slug.current
    }
  `;
  const { data } = await sanityFetch({
    query,
    params: {},
  });
  return data?.slug;
}

// 2) Fetch the front page itself as a proper Sitemap object
async function getFrontPage(): Promise<MetadataRoute.Sitemap> {
  // @sanity-typegen-ignore
  const query = groq`
    *[_type == "siteSettings"][0].frontPage->{
      'url': $baseUrl + '',
      'lastModified': _updatedAt,
      'changeFrequency': 'daily',
      'priority': 1
    }
  `;
  const { data } = await sanityFetch({
    query,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

// ---------------------------
// Shared interface so we can return `slug` alongside the standard MetadataRoute.Sitemap fields
interface ExtendedSitemap extends MetadataRoute.Sitemap {
  slug?: string;
}

// 3) Fetch “pages” (excluding the front page) – but we’ll do the filtering later
async function getPagesSitemap(): Promise<ExtendedSitemap[]> {
  // @sanity-typegen-ignore
  const pageQuery = groq`
    *[_type == 'page-slug'] | order(slug.current) {
      "url": $baseUrl + select('/' + slug.current),
      "slug": slug.current,
      "lastModified": _updatedAt,
      "changeFrequency": "daily",
      "priority": select(0.5)
    }
  `;
  const { data } = await sanityFetch({
    query: pageQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

// 4) Services
async function getServicesSitemap(): Promise<ExtendedSitemap[]> {
  const servicesQuery = groq`
    *[_type == "service-slug"] | order(_updatedAt desc) {
      "url": $baseUrl + '/service/' + slug.current,
      "slug": slug.current,
      "lastModified": _updatedAt,
      "changeFrequency": 'weekly',
      "priority": 0.7
    }
  `;
  const { data } = await sanityFetch({
    query: servicesQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}




// 5) Courses
async function getCoursesSitemap(): Promise<ExtendedSitemap[]> {
  // @sanity-typegen-ignore
  const coursesQuery = groq`
    *[_type == 'course-slug'] | order(_updatedAt desc) {
      "url": $baseUrl + '/course/' + slug.current,
      "slug": slug.current,
      "lastModified": _updatedAt,
      "changeFrequency": 'weekly',
      "priority": 0.7
    }
  `;
  const { data } = await sanityFetch({
    query: coursesQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

// 6) Optional: Blog posts (only add if you need them in the final output)
async function getPostsSitemap(): Promise<ExtendedSitemap[]> {
  // @sanity-typegen-ignore
  const blogQuery = groq`
    *[_type == 'blog-slug'] | order(_updatedAt desc) {
      "url": $baseUrl + '/blog/' + slug.current,
      "slug": slug.current,
      "lastModified": _updatedAt,
      "changeFrequency": 'weekly',
      "priority": 0.7
    }
  `;
  const { data } = await sanityFetch({
    query: blogQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

// 7) Finally build the sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  // Get the front page slug
  const frontPageSlug = await getFrontPageSlug();
  
  // Get the front page as a standard "MetadataRoute.Sitemap" object
  const frontPageData = await getFrontPage();

  // Fetch your other pages
  const [pages, services, courses] = await Promise.all([
    getPagesSitemap(),
    getServicesSitemap(),
    getCoursesSitemap(),
    // If you want blog posts, include them here:
    // getPostsSitemap(),
  ]);

  // If you want to also fetch blog posts, do:
  // const [pages, services, courses, posts] = await Promise.all([...]);

  // Filter out pages that match the front page's slug
  const filteredPages = pages.filter(
    (singlePage) => singlePage.slug !== frontPageSlug
  );

  // Return a merged array (frontPage first, then everything else)
  // If you have blog posts, just spread them in as well
  return [
    frontPageData,
    ...filteredPages,
    ...services,
    ...courses,
    
  ];
}
