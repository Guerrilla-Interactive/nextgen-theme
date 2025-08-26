"use client";

import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { Button } from "@/features/unorganized-components/ui/button";
import { Badge } from "@/features/unorganized-components/ui/badge";

type HeroLink = {
  title?: string;
  href?: string;
  target?: boolean;
  buttonVariant?: "default" | "secondary" | "link" | "destructive" | "outline" | "ghost" | null | undefined;
  size?: "default" | "sm" | "lg" | null | undefined;
};

type HeroProps = Partial<{
  badge: string;
  title: string;
  highlight?: string;
  body: any;
  links: HeroLink[];
  bullets: string[];
}>;

export default function HeroBlockComponent(props: HeroProps) {
  const { badge, title, highlight, body, links, bullets } = props;

  return (
    <section className="flex flex-col items-center space-y-8 py-20 text-center">
      {badge && (
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
            {badge}
          </Badge>
        </div>
      )}

      {(title || highlight) && (
        <h1 className="font-bold text-center leading-tight tracking-tight max-w-4xl text-4xl md:text-5xl lg:text-6xl">
          {title}
          {highlight && (
            <span className="text-primary">{" "}{highlight}</span>
          )}
        </h1>
      )}

      {body && (
        <div className="text-muted-foreground text-center max-w-2xl leading-relaxed mx-auto">
          <PortableTextRenderer value={body} />
        </div>
      )}

      {links && links.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          {links.slice(0, 2).map((link) => (
            <Button
              key={link.title}
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
    </section>
  );
}
