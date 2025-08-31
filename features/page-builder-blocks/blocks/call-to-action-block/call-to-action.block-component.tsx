"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/features/unorganized-components/ui/button";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import type { LinkProps } from "@/features/unorganized-queries/links.query";

type CallToActionProps = Partial<{
  heading: string;
  body: any;
  ctaLinks: LinkProps[];
  // Back-compat: some older content may still use `links`
  links: LinkProps[];
  footerNote: any;
}>;

export default function CallToActionBlockComponent(props: CallToActionProps) {
  const { heading, body, ctaLinks, links, footerNote } = props;
  const linksToUse = (ctaLinks && Array.isArray(ctaLinks) ? ctaLinks : links) || [];

  const resolveHref = (link?: LinkProps) => {
    if (!link) return { href: undefined as string | undefined, external: false, title: undefined as string | undefined };
    if (link.linkType === "external") {
      const url = (link as any).url || (link as any).href;
      const title = link.title ?? url ?? undefined;
      return { href: url as string | undefined, external: true, title };
    }
    if (link.linkType === "internal") {
      const slug = (link as any).slug as string | undefined;
      const anchor = (link as any).anchor as string | undefined;
      const urlFallback = (link as any).url as string | undefined;
      const built = slug ? `/${slug}${anchor ? `#${anchor}` : ""}` : urlFallback;
      const title = link.title ?? (slug ? `/${slug}` : urlFallback) ?? undefined;
      return { href: built, external: false, title };
    }
    if (link.linkType === "download") {
      const url = (link as any).url as string | undefined;
      const title = link.title ?? url ?? undefined;
      return { href: url, external: false, title };
    }
    const url = (link as any).url as string | undefined;
    const title = link.title ?? url ?? undefined;
    return { href: url, external: false, title };
  };

  const resolvedLinks = linksToUse.map((l) => resolveHref(l));

  return (
    <>
    <section className="relative z-10 py-20">
      <div className="text-center max-w-4xl mx-auto">
        {heading && <h2 className="font-bold mb-6">{heading}</h2>}
        {body && (
          <div className="text-muted-foreground mb-8 leading-relaxed">
            <PortableTextRenderer value={body} />
          </div>
        )}
        {(resolvedLinks.length > 0) && (
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {linksToUse.slice(0, 2).map((originalLink, idx) => {
              const l = resolveHref(originalLink);
              if (!l.title || !l.href) return null;
              const key = (originalLink as any)?._key || `${l.title}-${idx}`;
              const isPrimary = idx === 0;
              const variant = isPrimary ? "default" : "outline";
              return (
                <Button
                  key={key}
                  size="lg"
                  className="px-8 py-6"
                  variant={variant}
                  data-slot="button"
                  asChild
                >
                  <Link
                    href={l.href}
                    aria-label={l.title}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                  >
                    {l.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        )}
        {footerNote && (
          <div className="text-muted-foreground mt-6 text-sm">
            <PortableTextRenderer value={footerNote} />
          </div>
        )}
           <div className={`absolute -z-10 duration-700 transition-all  ease-in-out  text-left flex-col  -translate-y-1/2 -translate-x-1/2 top-1/4  flex left-[60%] place-items-center before:absolute before:h-[320px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[230px] after:w-[340px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-primary/50 opacity-20 after:dark:from-primary after:dark:via-accent before:lg:h-[260px]`}>
           </div>
      </div>
    </section>
 
    </>
  );
}
