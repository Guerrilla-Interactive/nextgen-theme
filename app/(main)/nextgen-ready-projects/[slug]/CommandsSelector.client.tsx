"use client";

import React from "react";
import SimpleCommandRow from "./SimpleCommandRow";
import { Terminal, Braces, ListChecks } from "lucide-react";

type CommandsSelectorProps = {
  commands: any[];
};

export default function CommandsSelector({ commands }: CommandsSelectorProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(
    commands?.[0]?._id ?? null
  );

  const selected = React.useMemo(() => {
    if (!Array.isArray(commands)) return null;
    return commands.find((c) => c?._id === selectedId) ?? commands[0] ?? null;
  }, [commands, selectedId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedId(id);
    }
  };

  if (!Array.isArray(commands) || !commands.length) {
    return (
      <div className="rounded-xl border border-dashed border-muted/40 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
        No commands linked yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-12">
            {/* Right: Selectable list */}
            <div className="md:col-span-4">
        <div className="space-y-2">
          {commands.map((c) => {
            const isActive = c?._id === selectedId;
            const commandString = `ng ${c?.slug?.current ?? ""}`;
            const varsCount = Array.isArray(c?.variables) ? c.variables.length : 0;
            const goalsCount = Array.isArray(c?.goals) ? c.goals.length : 0;
            return (
              <button
                key={c?._id}
                type="button"
                onClick={() => setSelectedId(c?._id)}
                onKeyDown={(e) => handleKeyDown(e, c?._id)}
                aria-pressed={isActive}
                aria-label={`Select command ${c?.title ?? ""}`}
                tabIndex={0}
                className={`w-full backdrop-blur-xl rounded-xl border px-4 py-3 text-sm text-left outline-none transition
                  ${isActive ? "border-primary/40 bg-primary/5" : "border-muted/30 bg-card/30 hover:bg-muted/20"}
                `}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="truncate font-medium">{c?.title}</div>
                </div>
                {/* Base command (no variables) under title */}
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]  text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded border border-muted/40 bg-muted/20 px-1.5 py-0.5">
                    <Terminal className="h-3 w-3" />
                    <code className="whitespace-pre">{commandString}</code>
                  </span>
                </div>
                {/* {c?.description ? (
                  <p className="mt-1 line-clamp-2 text-[12px] text-foreground/70">{c.description}</p>
                ) : null} */}
                {/* Bottom badges: vars and goals counts */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded bg-muted/30 px-1.5 py-0.5">
                    <Braces className="h-3 w-3" /> {varsCount} vars
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-muted/30 px-1.5 py-0.5">
                    <ListChecks className="h-3 w-3" /> {goalsCount} goals
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Left: Selected command details */}
      <div className="md:col-span-8">
        {selected ? (
          <SimpleCommandRow cmd={selected} />
        ) : (
          <div className="rounded-xl border border-muted/30 bg-card/60 p-6 text-sm text-muted-foreground">
            Select a command from the list.
          </div>
        )}
      </div>


    </div>
  );
}


