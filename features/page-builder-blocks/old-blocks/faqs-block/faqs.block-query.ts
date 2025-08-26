import { groq } from "next-sanity";
import { getAllReferencedFaqsQuery } from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-queries";
import { getAllFaqCategoriesQuery } from "@/sanity/desk-organized-sanity-utilities/faq-category/faq-category.document-queries";
// @sanity-typegen-ignore
const faqsBlockQuery = groq`
  _type == "faqs-block" => {
    _type,
    noPadding,
    ${getAllReferencedFaqsQuery},
    ${getAllFaqCategoriesQuery}
  }
`;

export default faqsBlockQuery; 