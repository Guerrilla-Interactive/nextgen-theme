"use client";

import React from "react";
import Link from "next/link";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { Icon } from "@iconify/react";
import type { LinkProps } from "@/features/unorganized-queries/links.query";
import { NextgenLogo } from "@/sanity/desk-organized-sanity-utilities/settings/header-settings/header/nextgen-logo.component";

type FooterColumn = {
  heading?: string | null;
  links?: LinkProps[];
};

type FooterProps = Partial<{
  brandMark: "logo" | "title" | string;
  title: string;
  description: any;
  columns: FooterColumn[];
  socialLinks: LinkProps[];
  legalNote: any;
  bottomLinks: LinkProps[];
}>;

const resolveHref = (link?: LinkProps) => {
  if (!link) return { href: undefined as string | undefined, external: false, title: undefined as string | undefined };
  if (link.linkType === "external") {
    const url = (link as any).url || (link as any).href;
    const title = (link as any).title ?? url ?? undefined;
    return { href: url as string | undefined, external: true, title };
  }
  if (link.linkType === "internal") {
    const slug = (link as any).slug as string | undefined;
    const anchor = (link as any).anchor as string | undefined;
    const urlFallback = (link as any).url as string | undefined;
    const built = slug ? `/${slug}${anchor ? `#${anchor}` : ""}` : urlFallback;
    const title = (link as any).title ?? (slug ? `/${slug}` : urlFallback) ?? undefined;
    return { href: built, external: false, title };
  }
  if ((link as any).linkType === "download") {
    const url = (link as any).url as string | undefined;
    const title = (link as any).title ?? url ?? undefined;
    return { href: url, external: false, title };
  }
  const url = (link as any).url as string | undefined;
  const title = (link as any).title ?? url ?? undefined;
  return { href: url, external: false, title };
};

export default function FooterBlockComponent(props: FooterProps) {
  const { brandMark = "logo", title, description, columns = [], socialLinks = [], legalNote, bottomLinks = [] } = props;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12">
        <div className="lg:flex lg:items-start lg:justify-end lg:gap-12">
          <div className="lg:basis-1/3 lg:min-w-[260px]">
            {brandMark === "logo" ? (
              <div aria-label="Brand" className="select-none">
                <NextgenLogo logoOptions={{ logoType: "default", defaultLogo: {} }} isTopDark={false} className="w-[164px] h-[22px]" />
              </div>
            ) : (
              title && <div className="text-2xl font-semibold tracking-tight">{title}</div>
            )}
            {description && (
              <div className="mt-4 text-muted-foreground leading-relaxed">
                <PortableTextRenderer value={description} />
              </div>
            )}
            {Array.isArray(socialLinks) && socialLinks.length > 0 && (
              <nav aria-label="Social links" className="mt-6 flex items-center gap-3">
                {socialLinks.map((l, idx) => {
                  const r = resolveHref(l);
                  if (!r.href) return null;
                  const key = (l as any)?._key || idx;
                  const label = (l as any)?.title || (l as any)?.icon?.name || "Social link";
                  const iconName = (l as any)?.icon?.name as string | undefined;
                  return (
                    <Link
                      key={key}
                      href={r.href}
                      aria-label={label}
                      target={r.external ? "_blank" : undefined}
                      rel={r.external ? "noopener noreferrer" : undefined}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-foreground/70 transition hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {iconName ? (
                        <Icon icon={iconName} width="18" height="18" aria-hidden="true" />
                      ) : (
                        <span className="text-sm" aria-hidden>
                          {label?.slice(0, 1)}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="mt-10 ml-auto flex flex-wrap justify-end gap-x-8 gap-y-10 lg:flex-1 lg:mt-0">
            {columns.map((col, cIdx) => (
              <div key={cIdx} className="min-w-[180px] flex-none">
                {col.heading && <h3 className="text-sm font-semibold tracking-wide text-foreground/80">{col.heading}</h3>}
                <ul className="mt-4 space-y-3" role="list">
                  {(col.links || []).map((l, idx) => {
                    const r = resolveHref(l);
                    if (!r.href) return null;
                    const key = (l as any)?._key || `${cIdx}-${idx}`;
                    const hiddenOnMobile = (l as any)?.hideOnMobile ? "hidden sm:block" : "";
                    return (
                      <li key={key} className={hiddenOnMobile}>
                        <Link
                          href={r.href}
                          aria-label={r.title || "Footer link"}
                          target={r.external ? "_blank" : undefined}
                          rel={r.external ? "noopener noreferrer" : undefined}
                          className="text-sm text-muted-foreground hover:text-foreground transition"
                        >
                          {r.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col gap-4 items-center justify-between sm:flex-row">
            <div className="text-xs text-muted-foreground">
              <span>&copy; {year} {title || ""}. All rights reserved.</span>
              {legalNote && (
                <span className="block sm:inline sm:ml-2">
                  <PortableTextRenderer value={legalNote} />
                </span>
              )}
            </div>
            {Array.isArray(bottomLinks) && bottomLinks.length > 0 && (
              <nav aria-label="Legal links" className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {bottomLinks.map((l, idx) => {
                  const r = resolveHref(l);
                  if (!r.href) return null;
                  const key = (l as any)?._key || idx;
                  return (
                    <Link
                      key={key}
                      href={r.href}
                      aria-label={r.title || "Footer legal link"}
                      target={r.external ? "_blank" : undefined}
                      rel={r.external ? "noopener noreferrer" : undefined}
                      className="text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      {r.title}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
