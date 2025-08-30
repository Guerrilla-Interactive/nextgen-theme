"use client";

import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { Button } from "@/features/unorganized-components/ui/button";
import { Badge } from "@/features/unorganized-components/ui/badge";

type HeroLink = {
  _key?: string;
  title?: string;
  href?: string;
  target?: boolean;
  buttonVariant?: "default" | "secondary" | "link" | "destructive" | "outline" | "ghost" | null | undefined;
  size?: "default" | "sm" | "lg" | null | undefined;
};

type HeroProps = Partial<{
  badge: string;
  title: any;
  body: any;
  links: HeroLink[];
  bullets: string[];
}>;

export default function HeroBlockComponent(props: HeroProps) {
  const { badge, title, body, links, bullets } = props;

  const normalizedTitle = Array.isArray(title)
    ? title
    : typeof title === "string"
    ? [
        {
          _key: "title-fallback-1",
          _type: "block",
          style: "normal",
          children: [
            { _key: "title-fallback-span-1", _type: "span", text: title, marks: [] },
          ],
        },
      ]
    : undefined;

  return (
    <section className="relative z-10 py-20 text-center pt-36">
      <div className="container flex flex-col items-center space-y-8">
      {badge && (
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
            {badge}
          </Badge>
        </div>
      )}

      {normalizedTitle && (
        <div className="max-w-4xl mx-auto ">
          {normalizedTitle && <PortableTextRenderer value={normalizedTitle} />}
        </div>
      )}

      {body && (
        <div className="text-muted-foreground text-center max-w-2xl leading-relaxed mx-auto">
          <PortableTextRenderer value={body} />
        </div>
      )}

      {links && links.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          {links.map((link) => (
            <Button
              key={link._key ?? link.title}
              size={stegaClean(link.size) as any}
              variant={stegaClean(link.buttonVariant) as any}
              className="px-8 py-6"
              asChild
            >
              <Link
                href={(link.href || "#") as string}
                target={link.target ? "_blank" : undefined}
                rel={link.target ? "noopener" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      )}

      {bullets && bullets.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 pt-4 text-muted-foreground text-sm">
          {bullets.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
