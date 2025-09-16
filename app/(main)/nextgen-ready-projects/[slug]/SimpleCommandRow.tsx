"use client";

import React from "react";
import { Braces, Check } from "lucide-react";

export default function SimpleCommandRow({ cmd }: { cmd: any }) {
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

  const countNodes = (nodes: any[] = []): number => {
    return nodes.reduce((acc, n) => acc + 1 + countNodes(n?.children || []), 0);
  };

  return (
    <div className="grid gap-6">
      {/* Card */}
      <div className="rounded-xl border border-muted/30 bg-card/60 p-4">
        {/* Top row: File tree (left) + Title/meta/description (right) */}
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-6 ">
            {Array.isArray(cmd?.filePaths) && cmd.filePaths.length ? (
              <div className="rounded-lg border border-muted/30 bg-background p-2">
                {cmd.filePaths.map((fp: any, idx: number) => (
                  <div key={(fp?.id ?? "") + idx} className="mb-2 last:mb-0">
                    {fp?.path ? (
                      <code className="mb-1 block truncate text-[11px] opacity-80" title={fp.path}>{fp.path}</code>
                    ) : null}
                    <pre className="whitespace-pre rounded border border-muted/30 bg-muted/10 overflow-hidden p-2 text-[11px] leading-5">
{buildAsciiFromNodes(fp?.nodes || [])}
                    </pre>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="md:col-span-6 flex flex-col gap-1.5 mt-2 px-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="truncate text-base font-semibold leading-tight" title={cmd?.title}>{cmd?.title}</h3>
            </div>

            {cmd?.description ? (
              <p className="mt-2 leading-relaxed text-xs text-foreground/80">{cmd.description}</p>
            ) : null}

            {Array.isArray(cmd?.variables) && cmd.variables.length ? (
              <div className="mt-3 rounded-md border border-muted/30 bg-background p-2">
                <div className="mb-1 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Braces className="h-3 w-3" /> Variables
                </div>
                <ul className="space-y-2">
                  {cmd.variables.map((v: any, vi: number) => (
                    <li key={(v?.name ?? "") + vi} className="rounded border border-muted/30 bg-card/60 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <code className="rounded bg-muted/40 px-1.5 py-0.5 text-[10px]">{v?.name}</code>
                        {typeof v?.priority === "number" ? (
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">Question {v.priority}</span>
                        ) : null}
                      </div>
                      {v?.title ? (
                        <div className="mt-2 text-[12px] font-medium">{v.title}</div>
                      ) : null}
                      {v?.description ? (
                        <p className="mt-1 text-[11px] leading-relaxed text-foreground/80">{v.description}</p>
                      ) : null}
                      {Array.isArray(v?.examples) && v.examples.length ? (
                        <div className="mt-2 flex flex-wrap gap-1">
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

          {/* Bottom row: Goals full width */}
          <div className="md:col-span-12 px-4 pb-4">
            {Array.isArray(cmd?.goals) && cmd.goals.length ? (
              <div className="mt-2">
                <div className="mb-1 text-[11px] font-medium text-muted-foreground">Goals</div>
                <ul className="grid grid-cols-1 gap-2 text-[12px] text-foreground/80 sm:grid-cols-2">
                  {cmd.goals.map((g: any, gi: number) => (
                    <li key={(g?.title ?? "") + gi} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-primary" />
                      <span className="truncate text-xs">{g?.title || `Goal ${gi + 1}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}


