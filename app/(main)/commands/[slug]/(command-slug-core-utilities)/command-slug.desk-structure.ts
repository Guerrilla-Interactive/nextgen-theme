import type { StructureBuilder } from "sanity/structure";

export const commandSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Commands")
    .schemaType("command-slug")
    .child(
      S.documentTypeList("command-slug")
        .title("Commands")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};
