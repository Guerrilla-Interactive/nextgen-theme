import type { StructureBuilder } from "sanity/structure";

export const blogSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Posts")
    .schemaType("blog-slug")
    .child(S.documentTypeList("blog-slug").title("Post").defaultOrdering([{ field: "_createdAt", direction: "desc" }]));
};


