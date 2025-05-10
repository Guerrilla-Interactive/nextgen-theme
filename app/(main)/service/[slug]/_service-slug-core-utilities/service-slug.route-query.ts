import { customContactFormBlockQueryDetails } from "@/features/page-builder-blocks/blocks/custom-contact-form-block/custom-contact-form.block-query";
import blockContentQuery from "@/features/page-builder-blocks/shared/shared-schemas/block-content/block-content.query";
import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { getAllReferencedFaqsQuery } from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-queries";
import { getAllFaqCategoriesQuery } from "@/sanity/desk-organized-sanity-utilities/faq-category/faq-category.document-queries";
import { groq } from "next-sanity";

export const GET_SERVICE_PAGE_BY_DEFINED_SLUG_QUERY = groq`*[_type == "service-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    featuredImage{
      ${imageQuery}
    },
  }
`;

export const GET_ALL_SERVICE_PAGES_QUERY = groq`
  *[_type == "service-slug" && defined(slug)]{
    slug
  }
`;

export const GET_SERVICE_PAGE_BY_ROUTE_QUERY = groq`
  *[_type == "service-slug" && slug.current == $slug][0]{
    title,
    customTitle,
    slug,
    layout,
    "headerColor": "dark",
    excerpt,
    _createdAt,
    customContactForm{
      ${customContactFormBlockQueryDetails}
    },
    body[]{
      ${blockContentQuery}
    },
    _updatedAt,
    faqs{ 
      noPadding,
      ${getAllReferencedFaqsQuery},
      ${getAllFaqCategoriesQuery}
    },
    featuredImage{
      _type, 
      ${imageQuery}
    },

  }
`;
