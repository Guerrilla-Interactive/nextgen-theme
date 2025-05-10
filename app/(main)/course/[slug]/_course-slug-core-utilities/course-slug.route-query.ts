import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { getAllFaqCategoriesQuery } from "@/sanity/desk-organized-sanity-utilities/faq-category/faq-category.document-queries";
import { getAllReferencedFaqsQuery } from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-queries";
import { groq } from "next-sanity";

export const GET_COURSE_PAGE_BY_DEFINED_SLUG_QUERY = groq`
  *[_type == "course-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
  }
`;

export const GET_ALL_COURSE_PAGES_QUERY = groq`
  *[_type == "course-slug" && defined(slug)]{
    slug
  }
`;

export const GET_COURSE_PAGE_BY_ROUTE_QUERY = groq`
  *[_type == "course-slug" && slug.current == $slug][0]{
    title,
    slug,
    featuredImage{
      ${imageQuery}
    },
    _createdAt,
    _updatedAt,
  }
`;
