"use client";

import React from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/features/unorganized-components/ui/tooltip";
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react";

export function CopyInstall({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="mt-3 flex items-center gap-2">
      <pre className="flex-1 rounded bg-muted p-3 overflow-auto text-sm">
        <code>{command}</code>
      </pre>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleCopy} variant="outline" size="icon" aria-label="Copy install command">
            {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied!" : "Copy"}</TooltipContent>
      </Tooltip>
    </div>
  );
}


