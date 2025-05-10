import type { StructureBuilder } from "sanity/structure";
import { serviceSlugVariables } from "./service-slug.translations-and-variables";

export const serviceSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Tjenester")
    .schemaType(serviceSlugVariables("DOCUMENT_TYPE"))
    .child(
      S.documentTypeList(serviceSlugVariables("DOCUMENT_TYPE"))
        .title("Tjenester")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};
