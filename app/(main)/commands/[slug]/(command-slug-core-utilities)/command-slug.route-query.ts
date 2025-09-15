import { groq } from "next-sanity";

/**
 * List all commands (newest first) with full details
 */
export const GET_COMMAND_BY_SLUG_QUERY = groq`
  *[_type == "command-slug" && defined(slug.current)] | order(_createdAt desc){
    _id,
    _type,
    _createdAt,
    _updatedAt,
    slug,
    ...,
    goals[]{..., fileHints[], howToTips[]},
    ignoredPatterns[],
    variables[]{_type, name, title, priority, description, examples[]},
    filePaths[]{
      id,
      path,
      nodes[]{
        ...,
        actions[]{ title, mark, logic{ behaviour, content, mark, occurrence, target } },
        children[]{
          ...,
          actions[]{ title, mark, logic{ behaviour, content, mark, occurrence, target } },
          children[]{ ... } // allows deeper nesting
        }
      }
    }
  }
`;

/**
 * All slugs only (handy for static params)
 */
export const GET_ALL_COMMAND_SLUGS_QUERY = groq`
  *[_type == "command-slug" && defined(slug.current)]{
    slug,

  }
`;

/**
 * Single command by slug with full details
 */
export const GET_COMMAND_POST_QUERY = groq`
  *[_type == "command-slug" && slug.current == $slug][0]{
    _id,
    _type,
    _createdAt,
    slug,
    _updatedAt,
    "slugCurrent": slug.current,
    ...,
    goals[]{..., fileHints[], howToTips[]},
    ignoredPatterns[],
    variables[]{_type, name, title, priority, description, examples[]},
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
  }
`;
