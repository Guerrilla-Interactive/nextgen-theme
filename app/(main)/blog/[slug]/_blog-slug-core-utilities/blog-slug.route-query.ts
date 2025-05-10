import blockContentQuery from "@/features/page-builder-blocks/shared/shared-schemas/block-content/block-content.query";
import { groq } from "next-sanity";

export const GET_BLOG_PAGES_BY_DEFINED_SLUG_QUERY = groq`*[_type == "blog-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
}`;

export const GET_ALL_BLOG_PAGES_QUERY = groq`*[_type == "blog-slug" && defined(slug)]{slug}`;

export const GET_BLOG_PAGE_BY_ROUTE_QUERY = groq`*[_type == "blog-slug" && slug.current == $slug][0]{
  title,
  slug,
  body[]{
    ${blockContentQuery}
  },
  _createdAt,
  _updatedAt,
}`;
