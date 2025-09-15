"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import FullPageBackground from "@/features/unorganized-components/magic-background/full-page-background";
import Image from "next/image";
import Link from "next/link";

type ProjectItem = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  comingSoon?: boolean;
  imageUrl?: string;
};

const projectsData: ProjectItem[] = [
  {
    slug: "next-sanity",
    title: "Next-Sanity",
    description: "Next.js + Sanity CMS utilities and commands",
    tags: ["Next.js", "Sanity", "CMS"],
    comingSoon: false,
    imageUrl: "https://raw.githubusercontent.com/sanity-io/sanity-template-nextjs-clean/main/sanity-next-preview.png",
  },
  {
    slug: "ai-tools",
    title: "AI Tools",
    description: "Integrations and UI for AI-assisted workflows",
    tags: ["AI", "Workflows"],
    comingSoon: true,
    imageUrl: "/images/nextgen-logo-white.svg",
  },
  {
    slug: "design-system",
    title: "Design System",
    description: "Shared UI primitives & themes",
    tags: ["UI", "Tailwind"],
    comingSoon: true,
    imageUrl: "/images/nextgen-logo-black.svg",
  },
];

type FeaturedCommand = {
  title: string;
  slug: string;
  summary: string;
  href: string;
};

const featuredCommands: FeaturedCommand[] = [
  {
    title: "Add Page Type (Block Editor)",
    slug: "add-page-type-with-block-editor",
    summary: "Scaffold a new page type with rich block content and all supporting files.",
    href: "/projects/next-sanity",
  },
  {
    title: "Add Page Type (Pagebuilder)",
    slug: "add-page-type-with-pagebuilder",
    summary: "Yet to be announced.",
    href: "/projects/next-sanity",
  },
  {
    title: "Add Pagebuilder Block",
    slug: "add-pagebuilder-block",
    summary: "Yet to be announced.",
    href: "/projects/next-sanity",
  },
];

const ProjectsIndexPage = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const projects = useMemo(() => projectsData, []);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = sliderRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleScroll = (direction: "prev" | "next") => {
    const container = sliderRef.current;
    if (!container) return;
    const scrollAmount = Math.floor(container.clientWidth * 0.9);
    const delta = direction === "next" ? scrollAmount : -scrollAmount;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleScroll("next");
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleScroll("prev");
    }
  };

  return (
    <main className="container mt-24 py-12">
      <FullPageBackground type="Aurora" />
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <p>Explore available and upcoming workspaces.</p>
            <span className="inline-flex items-center rounded-full border border-border/50 bg-background/10 px-2 py-0.5 text-xs">{projects.length} total</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("prev")}
            aria-label="Scroll projects left"
            disabled={!canPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleScroll("next")}
            aria-label="Scroll projects right"
            disabled={!canNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            →
          </button>
        </div>
      </header>

      <section aria-label="Projects slider" className="relative">
        {/* Gradient edges for scroll affordance */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" aria-hidden />

        {/* Overlay arrows on mobile */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-1 sm:hidden">
          <button
            type="button"
            onClick={() => handleScroll("prev")}
            aria-label="Scroll left"
            disabled={!canPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 backdrop-blur hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            ←
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-1 sm:hidden">
          <button
            type="button"
            onClick={() => handleScroll("next")}
            aria-label="Scroll right"
            disabled={!canNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 backdrop-blur hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            →
          </button>
        </div>

        <div
          ref={sliderRef}
          role="list"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: "smooth" }}
        >
          {projects.map((project) => {
            const href = `/projects/${project.slug}`;
            return (
              <article
                role="listitem"
                key={project.slug}
                className={`group relative min-w-[320px] snap-start rounded-xl border border-border/50 bg-background/10 p-5 shadow-sm backdrop-blur-md transition hover:shadow-md hover:border-border hover:bg-background/20 hover:ring-1 hover:ring-border/60 focus-within:ring-1 focus-within:ring-border/60 flex flex-col min-h-[280px] md:min-h-[320px] ${project.comingSoon ? "opacity-60" : "cursor-pointer"}`}
                aria-label={project.title}
                tabIndex={0}
              >
                {!project.comingSoon && (
                  <Link
                    href={href}
                    aria-label={`Open ${project.title}`}
                    className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    tabIndex={-1}
                  />
                )}
                {project.comingSoon ? (
                  <div className="flex flex-1 items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">Yet to be announced.</p>
                  </div>
                ) : (
                  <>
                    <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-background/40 to-muted/30">
                      <Image
                        src={project.imageUrl || "/images/nextgen-app-icon.svg"}
                        alt={`${project.title} cover`}
                        fill
                        sizes="(min-width: 768px) 320px, 100vw"
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold tracking-tight">{project.title}</h2>
                    </div>
                    {project.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                          <span key={t} className="rounded-full border border-border/50 bg-background/10 px-2 py-0.5 text-xs text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground/80">Status:</span> Available
                      </div>
                      <div className="truncate text-right">
                        <span className="font-medium text-foreground/80">Path:</span> <code className="text-[10px] opacity-80">/projects/{project.slug}</code>
                      </div>
                    </div>
                    {project.slug === "next-sanity" && (
                      <div className="mt-3">
                        <h6 className=" text-sm font-semibold tracking-wide text-foreground/80">Featured Commands</h6>
                        <ul className="mt-0.5 list-disc pl-3 " role="list">
                          {featuredCommands.map((cmd) => (
                            <li key={cmd.slug}
                              className="marker:text-muted-foreground/50 text-muted-foreground leading-[1.5] text-xs">
                              {cmd.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-auto pt-4" />
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Project-level featured commands are embedded inside the Next-Sanity card */}
    </main>
  );
};

export default ProjectsIndexPage;


