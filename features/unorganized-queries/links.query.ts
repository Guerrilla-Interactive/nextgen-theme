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
  description,
  icon,
  hideOnMobile,
  linkStyle
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
  description,
  icon,
  hideOnMobile,
  linkStyle
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
  description,
  icon,
  hideOnMobile,
  linkStyle
`;

// @sanity-typegen-ignore
const dropdownGroupQuery = groq`
  "_ts": "DropdownGroupQuery",
  "linkType": "dropdownGroup",
  title,
  icon,
  hideOnMobile,
  links[] {
    _key,
    _type == "internalLinkObject" => {${internalLinkQuery}},
    _type == "link" => {${externalLinkQuery}},
    _type == "downloadLinkObject" => {${downloadLinkQuery}}
  }
`;

// @sanity-typegen-ignore
const linkGroupQuery = groq`
  "_ts": "LinkGroupQuery",
  "linkType": "linkGroup",
  title,
  icon,
  hideOnMobile,
  items[] {
    _key,
    _type == "internalLinkObject" => {${internalLinkQuery}},
    _type == "link" => {${externalLinkQuery}},
    _type == "downloadLinkObject" => {${downloadLinkQuery}},
    _type == "dropdownGroup" => {${dropdownGroupQuery}}
  }
`;

// @sanity-typegen-ignore
export const linksQuery = groq`
  "_ts": "LinksQuery",
  _key,
  _type == "internalLinkObject" => {${internalLinkQuery}},
  _type == "link" => {${externalLinkQuery}},
  _type == "downloadLinkObject" => {${downloadLinkQuery}},
  _type == "dropdownGroup" => {${dropdownGroupQuery}},
  _type == "linkGroup" => {${linkGroupQuery}}
`;

export type InternalLinkProps = {
  _key?: string;
  linkType: "internal";
  title?: string | null;
  _type: any;
  slug?: string | null;
  description?: string | null;
  icon?: { name: string } | null;
  hideOnMobile?: boolean;
  linkStyle?: "default" | "button";
};

export type ExternalLinkProps = {
  _key?: string;
  linkType: "external";
  title?: string | null;
  url: string;
  description?: string | null;
  icon?: { name: string } | null;
  hideOnMobile?: boolean;
  linkStyle?: "default" | "button";
};

export type DownloadLinkProps = {
  _key?: string;
  linkType: "download";
  title?: string | null;
  url: string | null;
  description?: string | null;
  icon?: { name: string } | null;
  hideOnMobile?: boolean;
  linkStyle?: "default" | "button";
};

export type DropdownGroupProps = {
  _key?: string;
  linkType: "dropdownGroup";
  title?: string | null;
  links: Array<InternalLinkProps | ExternalLinkProps | DownloadLinkProps>;
  icon?: { name: string } | null;
  hideOnMobile?: boolean;
};

export type LinkGroupProps = {
  _key?: string;
  linkType: "linkGroup";
  title?: string | null;
  items: Array<InternalLinkProps | ExternalLinkProps | DownloadLinkProps | DropdownGroupProps>;
  icon?: { name: string } | null;
  hideOnMobile?: boolean;
};

export type AnchorLinkProps = {
  _key?: string;
  linkType: "anchor";
  id: string;
  title?: string | null;
  icon?: { name: string } | null;
  hideOnMobile?: boolean;
  linkStyle?: "default" | "button";
};

export type LinkProps =
  | InternalLinkProps
  | ExternalLinkProps
  | DownloadLinkProps
  | DropdownGroupProps
  | LinkGroupProps
  | AnchorLinkProps;
