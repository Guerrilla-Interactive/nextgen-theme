import { groq } from "next-sanity";

export const GET_NEXTGEN_READY_PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "nextgen-ready-project-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    description,
    commands[]->{ _id, title, description, slug },
    image,
    repoLink,
    previewLink,

    excerpt,
  }
`;

export const GET_ALL_NEXTGEN_READY_PROJECT_SLUGS_QUERY = groq`
  *[_type == "nextgen-ready-project-slug" && defined(slug)]{
    title,
    slug,
    image,
    description,
    commands[]->{ _id, title, description, slug },
    repoLink,
    previewLink,
  }
`;

export const GET_NEXTGEN_READY_PROJECT_POST_QUERY = groq`
  *[_type == "nextgen-ready-project-slug" && slug.current == $slug][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    "slugCurrent": slug.current,
    description,
    repoLink,
    previewLink,
    image,
    excerpt,
    // Dereference linked commands for display
    commands[]->{
      _id,
      _type,
      title,
      description,
      slug,
      excerpt,
      _createdAt,
      _updatedAt,
      // extras for UI rendering
      variables[]{ _type, name, title, priority, description, examples[] },
      goals[]{ title, description, fileHints[], howToTips[] },
      filePaths[]{
        id,
        path,
        nodes[]{
          ...,
          actions[]{ title, mark, logic{ behaviour, content, mark, occurrence, target } },
          children[]{
            ...,
            actions[]{ title, mark, logic{ behaviour, content, mark, occurrence, target } },
            children[]{ ... }
          }
        }
      }
    },
  }
`;
