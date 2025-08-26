"use client";

import React from "react";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type StatsSectionProps = Partial<{
  title: string;
  description: any;
  items: { value?: string; label?: string }[];
}>;

export default function StatsSectionBlockComponent(props: StatsSectionProps) {
  const { title, description, items } = props;

  return (
    <section className="py-16 bg-muted/30 rounded-2xl">
      <div className="text-center mb-12">
        {title && <h2 className="font-bold mb-4">{title}</h2>}
        {description && (
          <div className="text-muted-foreground">
            <PortableTextRenderer value={description} />
          </div>
        )}
      </div>

      {items && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div className="text-center" key={idx}>
              <div className="text-5xl font-bold text-primary mb-2">{item.value}</div>
              <p className="text-muted-foreground text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
