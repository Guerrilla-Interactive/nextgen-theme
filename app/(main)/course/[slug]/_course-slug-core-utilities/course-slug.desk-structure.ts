import type { StructureBuilder } from "sanity/structure";
import { courseSlugVariables as v, courseSlugTranslations as t } from "./course-slug.translations-and-variables";
export const courseSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Kurs")
    .schemaType(v("DOCUMENT_TYPE"))
    .child(
      S.documentTypeList(v("DOCUMENT_TYPE"))
        .title("Kurs")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};
