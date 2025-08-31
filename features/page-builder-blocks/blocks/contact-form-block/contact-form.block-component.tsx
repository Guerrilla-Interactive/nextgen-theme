"use client";

import React from "react";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { stegaClean } from "next-sanity";
import { CustomContactFormBlockComponent } from "@/features/page-builder-blocks/old-blocks/custom-contact-form-block";

type ContactFormProps = Partial<{
  title: string;
  highlight?: string;
  description: any;
  bullets?: string[];
  tags?: string[];
  listType?: "bullets" | "tags" | "none";
  customContactForm?: Parameters<typeof CustomContactFormBlockComponent>[0];
  formPosition?: "left" | "right" | "bottom" | "top";
}>;

function ContactFormPanel({
  customContactForm,
  className,
}: {
  customContactForm?: Parameters<typeof CustomContactFormBlockComponent>[0];
  className?: string;
}) {
  return (
    <div className={className || ""}>
      <div className="rounded-lg border border-border/50 p-6">
        <CustomContactFormBlockComponent {...(customContactForm || {})} />
      </div>
    </div>
  );
}

export default function ContactFormBlockComponent(props: ContactFormProps) {
  const {
    title,
    highlight,
    description,
    bullets,
    tags,
    listType = "bullets",
    customContactForm,
    formPosition = "right",
  } = props;

  const normalizedListType = (stegaClean(listType) as typeof listType) || "bullets";
  const normalizedFormPosition = (stegaClean(formPosition) as typeof formPosition) || "right";

  const isBottom = normalizedFormPosition === "bottom";
  const isCentered = isBottom || normalizedFormPosition === "top";

  const Content = (
    <div>
      {(title || highlight) && (
        <h2 className={` font-display  text-foreground mb-6 ${isCentered ? "text-center" : ""}`}>
          {title} {highlight && <span className="text-primary">{" "}{highlight}</span>}
        </h2>
      )}

      {description && (
        <div className={`text-muted-foreground mb-8 leading-relaxed ${isCentered ? "text-center" : ""}`}>
          <PortableTextRenderer value={description} />
        </div>
      )}

      {normalizedListType === "bullets" && bullets && bullets.length > 0 && (
        <ul className={`space-y-4 font-sans mb-6 ${isCentered ? "mx-auto max-w-2xl" : ""}`}>
          {bullets.map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      )}

      {normalizedListType === "tags" && tags && tags.length > 0 && (
        <div className={`flex flex-wrap gap-6 text-sm font-sans text-muted-foreground ${isCentered ? "justify-center" : ""}`}>
          {tags
            .map((tag, index) => <span key={index}>{tag}</span>)
            .reduce((prev, curr, index) => (index === 0 ? [curr] : [...prev, <span key={`sep-${index}`}>·</span>, curr]), [] as React.ReactNode[])}
        </div>
      )}
    </div>
  );

  if (isBottom || normalizedFormPosition === "top") {
    return (
      <section className="relative z-10 py-16 ">
        <div className="container">
          {normalizedFormPosition === "top" && (
            <div className="mb-10 mx-auto max-w-3xl">
              <ContactFormPanel customContactForm={customContactForm} />
            </div>
          )}
          {Content}
          {isBottom && (
            <div className="mt-10 mx-auto max-w-3xl">
              <ContactFormPanel customContactForm={customContactForm} />
            </div>
          )}
        </div>
      </section>
    );
  }

  const isLeft = normalizedFormPosition === "left";

  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isLeft ? "lg:grid-flow-col-dense" : ""}`}>
          <div className={`${isLeft ? "lg:col-start-2" : ""} order-2 lg:order-none`}>{Content}</div>
          <ContactFormPanel
            className={`${isLeft ? "lg:col-start-1" : ""} order-1 lg:order-none`}
            customContactForm={customContactForm}
          />
        </div>
      </div>
    </section>
  );
}
