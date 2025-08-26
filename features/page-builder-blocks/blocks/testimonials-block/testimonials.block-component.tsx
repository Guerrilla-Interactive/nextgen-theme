"use client";

import React from "react";
import { Card, CardContent } from "@/features/unorganized-components/ui/card";
import { StarRating } from "@/features/unorganized-components/ui/star-rating";
import { Avatar, AvatarFallback } from "@/features/unorganized-components/ui/avatar";

type Testimonial = {
  rating?: number;
  quote?: string;
  initials?: string;
  name?: string;
  role?: string;
  bgColor?: string;
};

type TestimonialsProps = Partial<{
  heading: string;
  description: any;
  items: Testimonial[];
}>;

export default function TestimonialsBlockComponent(props: TestimonialsProps) {
  const { heading, description, items } = props;

  return (
    <section className="py-16">
      {(heading || description) && (
        <div className="text-center mb-16">
          {heading && <h2 className="font-bold mb-6">{heading}</h2>}
          {description && (
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {/* Assuming description is short text; if rich, swap to PortableTextRenderer */}
              {Array.isArray(description) ? null : description}
            </p>
          )}
        </div>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t, idx) => (
            <Card className="p-8 border-0 shadow-lg" data-slot="card" key={idx}>
              <div className="mb-6">
                <StarRating rating={t.rating ?? 5} />
              </div>
              {t.quote && (
                <blockquote className="mb-6" data-typography-role="blockquote">
                  {t.quote}
                </blockquote>
              )}
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className={`text-white ${t.bgColor || "bg-primary"}`}>
                    {t.initials || "??"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {t.name && <div className="font-semibold">{t.name}</div>}
                  {t.role && <div className="text-muted-foreground text-sm">{t.role}</div>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
