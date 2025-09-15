"use client";

import FullPageBackground from "@/features/unorganized-components/magic-background/full-page-background";
import React from "react";
import Link from "next/link";
import { PlayCircle, FileCode2 } from "lucide-react";

const nextSanityCommands = [
  {
    name: "Parse PRD",
    command: "task-master parse-prd scripts/example_prd.txt -o tasks/tasks.json -n 12",
    description: "Generate tasks from a PRD and write tasks.json",
  },
  {
    name: "List Tasks",
    command: "task-master list --with-subtasks",
    description: "Show current task list with subtasks",
  },
  {
    name: "Next Task",
    command: "task-master next",
    description: "Show the next task to work on based on dependencies",
  },
  {
    name: "Expand Task",
    command: "task-master expand --id 12 --num 6",
    description: "Break a task into smaller subtasks",
  },
  {
    name: "Generate Task Files",
    command: "task-master generate -o tasks",
    description: "Create/refresh markdown files for tasks",
  },
];

const featuredCommand = {
  _id: "add-page-type-with-block-editor",
  _type: "command",
  title: "Add Page Type with Block Editor",
  slug: "add-page-type-with-block-editor",
  goals: [
    {
      title: "Navigation Injection",
      description:
        "Add a single archive link for the new PageType in Header.tsx without duplicating on reruns.",
      fileHints: ["frontend/app/components/Header.tsx"],
      howToTips: [
        "Use addMarkerBelowTarget at the first clear navigation list element to inject the PageType link where navigation starts.",
      ],
    },
    {
      title: "Export Consistency in Queries",
      description:
        "Export postFields, linkFields, and linkReference so they’re reusable and not re-exported twice.",
      fileHints: ["frontend/sanity/lib/queries.ts"],
      howToTips: [
        "Use replaceIfMissing on field definitions to upgrade them to exported constants, ensuring they’re shared across queries.",
        "Target the first appearance of each constant and only export if it isn’t already exported.",
      ],
    },
    {
      title: "Link Mapping for GROQ Queries",
      description:
        "Map the new PageType slug in linkReference for rich-text links, avoiding duplicates.",
      fileHints: ["frontend/sanity/lib/queries.ts"],
      howToTips: [
        "Use addMarkerBelowTarget right after the link mapping block begins to insert the new slug reference where link types are resolved.",
        "Check first if the mapping already exists to avoid adding duplicate keys.",
      ],
    },
    {
      title: "Sitemap Expansion",
      description: "Include the new PageType in sitemapData for SEO without adding it twice.",
      fileHints: ["frontend/sanity/lib/queries.ts"],
      howToTips: [
        "Use insertBeforeInline just before the filter that collects types for the sitemap to add the new PageType type check.",
        "Ensure the condition isn’t already listed to keep the query clean and accurate.",
      ],
    },
    {
      title: "PageBuilder Query Extraction",
      description: "Export pageBuilderFields and update getPageQuery safely for reuse.",
      fileHints: ["frontend/sanity/lib/queries.ts"],
      howToTips: [
        "Use replaceBetween to extract pageBuilderFields and adjust getPageQuery where reusable query fragments are defined.",
        "Guard the export with requireAbsent so you don’t overwrite an existing definition.",
      ],
    },
    {
      title: "Routing Logic for LinkResolver",
      description: "Add a case for the new PageType in linkResolver without creating duplicates.",
      fileHints: ["frontend/sanity/lib/utils.ts"],
      howToTips: [
        "Use addMarkerAboveTarget just before the default switch case to add the new route resolution where routing fallbacks are handled.",
        "Include a unique marker comment so future runs can identify this injection and avoid duplicates.",
      ],
    },
    {
      title: "BlockContent Link Type Extension",
      description:
        "Add the new PageType as a link type and conditional reference in blockContent without repeats.",
      fileHints: ["studio/src/schemaTypes/objects/blockContent.tsx"],
      howToTips: [
        "Use addMarkerAboveTarget before the end of the link type options array to include the new PageType option where link choices are listed.",
        "Use addMarkerAboveTarget at the final field definition to insert the conditional reference field in the logical spot for related references.",
      ],
    },
    {
      title: "Generic Link Object Extension",
      description: "Add the new PageType as a link type and conditional reference in link.ts without repeats.",
      fileHints: ["studio/src/schemaTypes/objects/link.ts"],
      howToTips: [
        "Use addMarkerAboveTarget near the end of the link type radio options list to add the new PageType choice where available link types are defined.",
        "Use addMarkerAboveTarget at the final field definition to add the PageType reference field where additional references belong.",
      ],
    },
    {
      title: "Schema Index Registration",
      description: "Import and register the new PageType in schemaTypes/index.ts without duplicating entries.",
      fileHints: ["studio/src/schemaTypes/index.ts"],
      howToTips: [
        "Use addMarkerBelowTarget right after a related document import to place the new PageType import in a logical import group.",
        "Use addMarkerAboveTarget just before the objects divider in the schemaTypes array to register the PageType in the correct category.",
      ],
    },
  ],
  ignoredPatterns: [],
  variables: {
    PageTypeSingular: {
      title: "Name your page type",
      priority: 1,
      description:
        'This is the name of the "_type" we use in Sanity. This dictates a lot of the naming conventions elsewhere.',
      examples: ["author", "event", "product", "service"],
    },
    PageTypePlural: {
      title: "Pluralize your page type",
      priority: 2,
      description:
        "This helps cases where we need to pluralize. No worries if it's the same as the singular.",
      examples: ["authors", "events", "products", "services"],
    },
  },
  filePaths: [
    {
      _key: "1757021003924-q3au3rnnx",
      _type: "filePathGroup",
      id: "path-1757021003924-sa8u1fy",
      path: "frontend/app",
      nodes: [],
    },
  ],
} as const;

const NextSanityProjectPage = () => {
  const demoVideoSrc = "";
  const hasVideo = Boolean(demoVideoSrc);
  return (
    <main className="container mt-24 py-12">
      <FullPageBackground type="Aurora" />
      <h1 className="text-3xl font-bold tracking-tight">Next-Sanity</h1>
      <p className="mt-2 text-muted-foreground">Lean utilities for wiring Sanity + Next.js quickly and safely.</p>

      {/* Commands section removed per request */}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Featured Command</h2>
        <div className="relative overflow-hidden mt-4 rounded-xl border border-border/50 bg-background/10 backdrop-blur-md p-4 shadow-sm transition hover:shadow-md">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-3xl" aria-hidden />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-medium inline-flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-muted-foreground" />
              {featuredCommand.title}
            </div>
            <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
              {typeof featuredCommand.slug === "string" ? featuredCommand.slug : (featuredCommand as any).slug?.current}
            </code>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Scaffolds a new page type with a block editor, wiring routes, queries, and studio schema.</p>

          {/* Quick actions removed per request */}

          <div className={`mt-4 grid gap-6 ${hasVideo ? "lg:grid-cols-2" : ""}`}>
            {hasVideo && (
              <div className="flex flex-col gap-4">
                <div aria-label="Command demo video" className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-background/10 backdrop-blur-md shadow-sm">
                  <video className="block h-full w-full aspect-video" controls preload="metadata">
                    <source src={demoVideoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Variables</h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2" role="list">
                    {Object.entries(featuredCommand.variables || {}).map(([key, v]: any) => (
                      <li key={key} className="rounded-md border p-3 text-sm">
                        <div className="font-medium">{key}</div>
                        {Array.isArray(v?.examples) && v.examples.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">e.g. {v.examples.slice(0, 3).join(", ")}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {!hasVideo && (
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Variables</h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2" role="list">
                    {Object.entries(featuredCommand.variables || {}).map(([key, v]: any) => (
                      <li key={key} className="rounded-md border p-3 text-sm">
                        <div className="font-medium">{key}</div>
                        {Array.isArray(v?.examples) && v.examples.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">e.g. {v.examples.slice(0, 3).join(", ")}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Affects</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.from(new Set((featuredCommand.goals || []).flatMap((g: any) => g.fileHints || []))).map((f) => (
                    <span key={f} className="rounded-full border border-border/50 bg-background/10 px-2.5 py-1 text-xs text-muted-foreground">{f}</span>
                  ))}
                </div>
              </div>

              <GoalsToggle goals={(featuredCommand as any).goals} />

              

              {/* JSON panel removed per request */}
            </div>
          </div>
        </div>
      </section>

      {/* Commands JSON section removed per request */}
    </main>
  );
};

export default NextSanityProjectPage;



function GoalsToggle({ goals }: { goals: Array<{ title: string; description?: string; fileHints?: string[]; howToTips?: string[] }> }) {
  const items = Array.isArray(goals) ? goals : [];
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Goals</h3>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {items.map((g, idx) => (
          <details key={idx} className="rounded-none border-0 p-0">
            <summary className="cursor-pointer list-none inline-flex items-center rounded-full border border-border/50 bg-background/10 px-3 py-1 text-xs font-medium text-foreground hover:bg-accent/40">
              {g.title}
            </summary>
            {g.description && (
              <p className="mt-2 text-xs text-muted-foreground">{g.description}</p>
            )}
            {Array.isArray(g.fileHints) && g.fileHints.length > 0 && (
              <div className="mt-2">
                <div className="mb-1 text-[10px] font-medium text-foreground/80">Touches</div>
                <div className="flex flex-wrap gap-2">
                  {g.fileHints.map((h, i) => (
                    <span key={i} className="rounded-full border border-border/50 bg-background/10 px-2 py-0.5 text-[10px] text-muted-foreground">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* How it works intentionally hidden per request */}
          </details>
        ))}
      </div>
    </div>
  );
}