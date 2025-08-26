"use client";

import React from "react";
import { Card, CardContent } from "@/features/unorganized-components/ui/card";
import { Button } from "@/features/unorganized-components/ui/button";
import { Input } from "@/features/unorganized-components/ui/input";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type NewsletterSectionProps = Partial<{
  heading: string;
  body: any;
  inputPlaceholder: string;
  buttonText: string;
  footerNote: any;
}>;

export default function NewsletterSectionBlockComponent(props: NewsletterSectionProps) {
  const { heading, body, inputPlaceholder, buttonText, footerNote } = props;

  return (
    <section className="py-16">
      <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20" data-slot="card">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            {heading && <h3 className="font-semibold mb-2">{heading}</h3>}
            {body && (
              <div className="text-muted-foreground">
                <PortableTextRenderer value={body} />
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 min-w-fit">
            <Input placeholder={inputPlaceholder || "Enter your email address"} className="w-80" data-slot="input" />
            <Button className="whitespace-nowrap" data-slot="button">
              {buttonText || "Subscribe now"}
            </Button>
          </div>
        </div>
        {footerNote && (
          <div className="mt-4 text-center md:text-left text-muted-foreground text-sm">
            <PortableTextRenderer value={footerNote} />
          </div>
        )}
      </Card>
    </section>
  );
}
