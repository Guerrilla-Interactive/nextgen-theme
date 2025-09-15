import type { StructureBuilder } from "sanity/structure";

export const nextgenReadyProjectSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Nextgen Ready Projects")
    .schemaType("nextgen-ready-project-slug")
    .child(
      S.documentTypeList("nextgen-ready-project-slug")
        .title("Nextgen Ready Projects")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};
