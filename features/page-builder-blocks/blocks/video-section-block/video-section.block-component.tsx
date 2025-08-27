"use client";

import React from "react";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type VideoSectionProps = Partial<{
  title: string;
  highlight?: string;
  description: any;
  bullets?: string[];
  tags?: string[];
  listType?: "bullets" | "tags" | "none";
  videoDescription?: string;
  videoPosition?: "left" | "right" | "bottom";
}>;

function VideoPlaceholder({ description, className }: { description?: string; className?: string }) {
  return (
    <div className={`bg-muted rounded-lg border border-border p-8 h-80 flex items-center justify-center ${className || ""}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-xs text-muted-foreground">{description || "A simple workflow you'll use every day."}</p>
      </div>
    </div>
  );
}

export default function VideoSectionBlockComponent(props: VideoSectionProps) {
  const { title, highlight, description, bullets, tags, listType = "bullets", videoDescription, videoPosition = "right" } = props;

  const isBottom = videoPosition === "bottom";

  const Content = (
    <div>
      {(title || highlight) && (
        <h2 className={`text-4xl md:text-5xl font-display font-light text-foreground mb-6 ${isBottom ? "text-center" : ""}`}>
          {title} {highlight && <span className="text-primary">{" "}{highlight}</span>}
        </h2>
      )}

      {description && (
        <div className={`text-lg font-sans text-muted-foreground mb-8 leading-relaxed ${isBottom ? "text-center" : ""}`}>
          <PortableTextRenderer value={description} />
        </div>
      )}

      {listType === "bullets" && bullets && bullets.length > 0 && (
        <ul className={`space-y-4 font-sans mb-6 ${isBottom ? "mx-auto max-w-2xl" : ""}`}>
          {bullets.map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      )}

      {listType === "tags" && tags && tags.length > 0 && (
        <div className={`flex flex-wrap gap-6 text-sm font-sans text-muted-foreground ${isBottom ? "justify-center" : ""}`}>
          {tags
            .map((tag, index) => <span key={index}>{tag}</span>)
            .reduce((prev, curr, index) => (index === 0 ? [curr] : [...prev, <span key={`sep-${index}`}>·</span>, curr]), [] as React.ReactNode[])}
        </div>
      )}
    </div>
  );

  if (isBottom) {
    return (
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {Content}
          <div className="mt-10 mx-auto max-w-3xl">
            <VideoPlaceholder description={videoDescription} />
          </div>
        </div>
      </section>
    );
  }

  const isLeft = videoPosition === "left";

  return (
    <section className="relative z-10 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isLeft ? "lg:grid-flow-col-dense" : ""}`}>
          <div className={isLeft ? "lg:col-start-2" : ""}>{Content}</div>
          <VideoPlaceholder description={videoDescription} className={isLeft ? "lg:col-start-1" : ""} />
        </div>
      </div>
    </section>
  );
}
