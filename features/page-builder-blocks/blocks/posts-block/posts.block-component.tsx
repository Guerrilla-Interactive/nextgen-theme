"use client";

import React from "react";
import { Card, CardContent } from "@/features/unorganized-components/ui/card";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Button } from "@/features/unorganized-components/ui/button";
import { Avatar, AvatarFallback } from "@/features/unorganized-components/ui/avatar";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type Post = {
  category?: string;
  meta?: string;
  title?: string;
  excerpt?: string;
  author?: { initials?: string; name?: string; role?: string; bgColor?: string };
  bgClass?: string;
};

type PostsProps = Partial<{
  heading: string;
  description: any;
  cta: { title?: string; href?: string; variant?: any };
  posts: Post[];
}>;

export default function PostsBlockComponent(props: PostsProps) {
  const { heading, description, cta, posts } = props;

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          {heading && <h2 className="mb-4">{heading}</h2>}
          {description && (
            <div className="text-muted-foreground">
              <PortableTextRenderer value={description} />
            </div>
          )}
        </div>
        {cta?.title && (
          <Button variant={(cta.variant as any) || "outline"} data-slot="button">
            {cta.title}
          </Button>
        )}
      </div>

      {posts && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, idx) => (
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card" key={idx}>
              <div className={`h-48 ${p.bgClass || "bg-muted"}`} />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {p.category && <Badge variant="outline">{p.category}</Badge>}
                  {p.meta && <span className="text-muted-foreground text-sm">{p.meta}</span>}
                </div>
                {p.title && (
                  <h3 className="mb-3 leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
                )}
                {p.excerpt && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{p.excerpt}</p>
                )}
                {p.author && (
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className={`text-white text-xs ${p.author.bgColor || "bg-primary"}`}>
                        {p.author.initials || "??"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-sm">
                      {p.author.name}{p.author.role ? `, ${p.author.role}` : ""}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
