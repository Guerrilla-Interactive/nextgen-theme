"use client";

import React from "react";
import { Card } from "@/features/unorganized-components/ui/card";
import { Button } from "@/features/unorganized-components/ui/button";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type Plan = {
  name?: string;
  price?: string;
  priceSuffix?: string;
  mostPopular?: boolean;
  button?: { title?: string; variant?: any };
  features?: string[];
};

type PricingProps = Partial<{
  heading: string;
  description: any;
  plans: Plan[];
  footerNotes: string[];
}>;

export default function PricingBlockComponent(props: PricingProps) {
  const { heading, description, plans, footerNotes } = props;

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        {heading && <h2 className="mb-4">{heading}</h2>}
        {description && (
          <div className="text-muted-foreground max-w-2xl mx-auto">
            <PortableTextRenderer value={description} />
          </div>
        )}
      </div>

      {plans && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((p, idx) => (
            <Card key={idx} className={p.mostPopular ? "relative p-8 border border-primary bg-primary/5" : "relative p-8"} data-slot="card">
              {p.mostPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded">Most Popular</div>
              )}
              <div className="text-center">
                {p.name && <h3 className="mb-2">{p.name}</h3>}
                <div className="mb-6">
                  <span className="text-4xl font-bold">{p.price}</span>
                  {p.priceSuffix && <span className="text-muted-foreground text-sm">{p.priceSuffix}</span>}
                </div>
                <Button className="w-full mb-6" variant={(p.button?.variant as any) || "outline"} data-slot="button">
                  {p.button?.title || "Select"}
                </Button>
              </div>

              {p.features && p.features.length > 0 && (
                <ul className="space-y-3">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center">{f}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}

      {footerNotes && footerNotes.length > 0 && (
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-muted-foreground mb-4 text-sm">{footerNotes[0]}</p>
          <div className="flex items-center justify-center space-x-6 text-muted-foreground text-sm">
            {footerNotes.slice(1).map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
