import { settingsStructure } from "@/sanity/desk-organized-sanity-utilities/settings/settings.structure";
import { faqDeskStructure } from "./faq/faq.document-structure";
import { testimonialDeskStructure } from "./testimonial/testimonial.document-structure";

import { serviceSlugDeskStructure } from "@/app/(main)/service/[slug]/_service-slug-core-utilities/service-slug.desk-structure";
import { courseSlugDeskStructure } from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.desk-structure";
import { Files, List } from "lucide-react";
import { StructureBuilder } from "sanity/structure";
import { faqCategoryDeskStructure } from "./faq-category/faq-category.document-structure";
import { addDesignTokensToStructure } from "./nextgen-styleguide";

// ADD VALUE 1 ABOVE
export const structure = (S: StructureBuilder, context: any) => {
  // Create the base structure items first
  const baseItems = [
    settingsStructure(S),
    
    S.listItem()
    .title("Pages")
    .icon(Files)
    .child(
      S.list()
      .title("Pages")
      
      .items([
        S.listItem()
        .title("Regular Pages")
        .schemaType("page-slug")
        .child(
          S.documentTypeList("page-slug")
            .title("Pages")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
        S.divider(),
        serviceSlugDeskStructure(S),
        courseSlugDeskStructure(S),
      ])
    ),
    
    S.listItem()
    .title("Misc")
    .icon(List)
    .child(
      S.list()
      .title("Misc")
      .items([
        S.listItem()
        .title("FAQ")
        .icon(List)
        .child(
          S.list()
          .title("FAQ")
          .items([
            faqDeskStructure(S, context),
            faqCategoryDeskStructure(S, context),
          ])
        ),
        testimonialDeskStructure(S, context),
      ])
    ),
  ]
  
  // Add design tokens to the structure
  const finalItems = addDesignTokensToStructure(S, baseItems)
  
  return S.list()
    .title("Content")
    .items(finalItems)
}
  


   