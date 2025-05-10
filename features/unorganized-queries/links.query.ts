import { groq } from "next-sanity";

// @sanity-typegen-ignore
const internalLinkQuery = groq`
  "_ts": "InternalLinkQuery",
  "linkType": "internal",
  ...(internalLink-> {
    "title": coalesce(
      ^.customTitle,
      title,
      name
    ),
    "slug": slug.current,
    _type
  }),
  description
`;
// @sanity-typegen-ignore
const externalLinkQuery = groq`
  "_ts": "ExternalLinkQuery",
  "linkType": "external",
  "title": coalesce(
    customTitle,
    href
  ),
  "url": href,
  description
`;

// @sanity-typegen-ignore
const downloadLinkQuery = groq`
  "_ts": "DownloadLinkQuery",
  "linkType": "download",
  "title": coalesce(
      customTitle,
      file.asset->originalFilename
    ),
  "url": file.asset->url,
  description
`;

// @sanity-typegen-ignore
const linkGroupQuery = groq`
  "_ts": "LinkGroupQuery",
  "linkType": "linkGroup",
  title,
  links[] {
    _key,
    _type == "internalLinkObject" => {${internalLinkQuery}},
    _type == "link" => {${externalLinkQuery}}
  }
`;

// @sanity-typegen-ignore
export const linksQuery = groq`
  "_ts": "LinksQuery",
  _key,
  _type == "internalLinkObject" => {${internalLinkQuery}},
  _type == "link" => {${externalLinkQuery}},
  _type == "downloadLinkObject" => {${downloadLinkQuery}},
  _type == "linkGroup" => {${linkGroupQuery}}
  
`;

export type InternalLinkProps = {
  _key?: string;
  linkType: "internal";
  title?: string | null;
  _type: any;
  slug?: string | null;
  description?: string | null;
};

export type ExternalLinkProps = {
  _key?: string;
  linkType: "external";
  title?: string | null;
  url: string;
  description?: string | null;
};

export type DownloadLinkProps = {
  _key?: string;
  linkType: "download";
  title?: string | null;
  url: string | null;
  description?: string | null;
};

export type LinkGroupProps = {
  _key?: string;
  linkType: "linkGroup";
  title?: string | null;
  links: Array<InternalLinkProps | ExternalLinkProps>;
};

export type AnchorLinkProps = {
  _key?: string;
  linkType: "anchor";
  id: string;
  title?: string | null;
};

export type LinkProps =
  | InternalLinkProps
  | ExternalLinkProps
  | DownloadLinkProps
  | LinkGroupProps
  | AnchorLinkProps;
