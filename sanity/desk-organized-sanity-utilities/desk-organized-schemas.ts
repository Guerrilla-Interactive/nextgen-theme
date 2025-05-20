import authorSchema from "@/sanity/desk-organized-sanity-utilities/author/author.document-schema";
import categorySchema from "@/sanity/desk-organized-sanity-utilities/category/category.document-schema";
import faqSchema from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-schema";
import testimonialSchema from "@/sanity/desk-organized-sanity-utilities/testimonial/testimonial.document-schema";
import faqCategorySchema from "@/sanity/desk-organized-sanity-utilities/faq-category/faq-category.document-schema";
import { nextgenStyleguideSchemas } from "@/sanity/desk-organized-sanity-utilities/nextgen-styleguide";


// Define individual schemas
const individualSchemas = [
    authorSchema,
    categorySchema,
    faqSchema,
    faqCategorySchema,
    testimonialSchema,
];

// Combine with the nextgen-styleguide schemas which are already in an array
export const allDeskOrganizedDocumentSchemas = [
    ...individualSchemas,
    ...nextgenStyleguideSchemas
];
