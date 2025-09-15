"use client";

import React from "react";
import InlineCopy from "./InlineCopy.client";
import { Button } from "@/features/unorganized-components/ui/button";
import { ChevronDown } from "lucide-react";

type CommandCardProps = {
  cmd: any;
};

export default function CommandCard({ cmd }: CommandCardProps) {
  const [open, setOpen] = React.useState(false);

  const commandString = `ng ${cmd?.slug?.current ?? ""}` +
    (Array.isArray(cmd?.variables) && cmd.variables.length
      ? " " + cmd.variables.map((v: any) => `<${v?.name}>`).join(" ")
      : "");

  const buildAsciiFromNodes = (nodes: any[] = [], prefix = ""): string => {
    const lines: string[] = [];
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1;
      const connector = isLast ? "└─ " : "├─ ";
      const icon = node?.nodeType === "folder" ? "📁 " : "📄 ";
      const name = node?.name || (node?.nodeType === "folder" ? "(folder)" : "(file)");
      lines.push(`${prefix}${connector}${icon}${name}`);
      const nextPrefix = prefix + (isLast ? "   " : "│  ");
      if (node?.children?.length) {
        lines.push(buildAsciiFromNodes(node.children, nextPrefix));
      }
    });
    return lines.join("\n");
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Header: title left, inline copy below title; collapse button right */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{cmd?.title}</div>
          <div className="mt-1">
            <InlineCopy command={commandString} />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-expanded={open}
          aria-controls={`cmd-details-${cmd?._id}`}
          onClick={() => setOpen((v) => !v)}
          className="h-7 gap-1 text-[11px]"
        >
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
          {open ? "Hide details" : "Show details"}
        </Button>
      </div>

      {/* Collapsible details */}
      {open ? (
        <div id={`cmd-details-${cmd?._id}`} className="grid gap-3 md:grid-cols-2">
          {/* Left: File tree + Variables */}
          <div className="md:col-span-1">
            {Array.isArray(cmd?.filePaths) && cmd.filePaths.length ? (
              <div className="rounded-md border border-muted/30 bg-background p-2">
                <div className="mb-1 text-[11px] font-medium text-muted-foreground">File Tree</div>
                {cmd.filePaths.map((fp: any, idx: number) => (
                  <div key={(fp?.id ?? "") + idx} className="mb-2 last:mb-0">
                    {fp?.path ? (
                      <code className="mb-1 block overflow-hidden text-[10px]">{fp.path}</code>
                    ) : null}
                    <pre className="whitespace-pre rounded border border-muted/30 bg-muted/10 p-2 text-[11px] leading-5">
{buildAsciiFromNodes(fp?.nodes || [])}
                    </pre>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-muted/40 bg-muted/10 p-2 text-center text-[11px] text-muted-foreground">No files</div>
            )}

            {Array.isArray(cmd?.variables) && cmd.variables.length ? (
              <div className="mt-3 rounded-md border border-muted/30 bg-background p-2">
                <div className="mb-1 text-[11px] font-medium">Variables</div>
                <ul className="space-y-1">
                  {cmd.variables.map((v: any, vi: number) => (
                    <li key={(v?.name ?? "") + vi} className="rounded border border-muted/30 bg-card/60 p-6">
                      <div className="flex items-center justify-between gap-2">
                        <code className="rounded bg-muted/40 px-1.5 py-0.5 text-[10px] ">{v?.name}</code>
                        {typeof v?.priority === "number" ? (
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">Question {v.priority}</span>
                        ) : null}
                      </div>
                      {v?.title ? (
                        <div className="mt-2 mb-3 text-[12px] font-medium">{v.title}</div>
                      ) : null}
                      {v?.description ? (
                        <p className="text-[11px] leading-relaxed text-foreground/80 mb-3">{v.description}</p>
                      ) : null}
                      {Array.isArray(v?.examples) && v.examples.length ? (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {v.examples.map((ex: string, ei: number) => (
                            <code key={ei} className="rounded bg-muted/30 px-1.5 py-0.5 text-[10px]">{ex}</code>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Right: Goals */}
          <div className="md:col-span-1">
            {Array.isArray(cmd?.goals) && cmd.goals.length ? (
              <div className="rounded-md border border-muted/30 bg-background p-2">
                <div className="mb-1 text-[11px] font-medium">Goals</div>
                <ol className="space-y-1">
                  {cmd.goals.map((g: any, gi: number) => (
                    <li key={(g?.title ?? "") + gi} className="rounded border border-muted/30 bg-card/60 p-6">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div className="text-[12px] font-medium">{g?.title || `Goal ${gi + 1}`}</div>
                        {Array.isArray(g?.fileHints) && g.fileHints.length ? (
                          <div className="flex flex-wrap items-center gap-1">
                            {g.fileHints.map((h: string, hi: number) => (
                              <span key={hi} className="rounded bg-muted/40 px-1.5 py-0.5 text-[10px] opacity-60">{h}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      {g?.description ? (
                        <p className="text-[11px] leading-relaxed text-foreground/80">{g.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}


