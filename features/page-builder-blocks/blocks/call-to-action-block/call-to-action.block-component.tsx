"use client";

import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { Button } from "@/features/unorganized-components/ui/button";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type CTA = { title?: string; href?: string; target?: boolean; buttonVariant?: any; size?: any };

type CallToActionProps = Partial<{
  heading: string;
  body: any;
  primaryCta: CTA;
  secondaryCta: CTA;
  footerNote: any;
}>;

export default function CallToActionBlockComponent(props: CallToActionProps) {
  const { heading, body, primaryCta, secondaryCta, footerNote } = props;

  return (
    <section className="py-20">
      <div className="text-center max-w-4xl mx-auto">
        {heading && <h2 className="font-bold mb-6">{heading}</h2>}
        {body && (
          <div className="text-muted-foreground mb-8 leading-relaxed">
            <PortableTextRenderer value={body} />
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {primaryCta?.title && (
            <Button
              size={(stegaClean(primaryCta.size) as any) || "lg"}
              className="px-8 py-6"
              variant={stegaClean(primaryCta.buttonVariant) as any}
              data-slot="button"
              asChild
           >
              <Link
                href={(primaryCta.href || "#") as string}
                target={primaryCta.target ? "_blank" : undefined}
                rel={primaryCta.target ? "noopener" : undefined}
              >
                {primaryCta.title}
              </Link>
            </Button>
          )}
          {secondaryCta?.title && (
            <Button
              size={(stegaClean(secondaryCta.size) as any) || "lg"}
              className="px-8 py-6"
              variant={(stegaClean(secondaryCta.buttonVariant) as any) || "outline"}
              data-slot="button"
              asChild
            >
              <Link
                href={(secondaryCta.href || "#") as string}
                target={secondaryCta.target ? "_blank" : undefined}
                rel={secondaryCta.target ? "noopener" : undefined}
              >
                {secondaryCta.title}
              </Link>
            </Button>
          )}
        </div>
        {footerNote && (
          <div className="text-muted-foreground mt-6 text-sm">
            <PortableTextRenderer value={footerNote} />
          </div>
        )}
      </div>
    </section>
  );
}
