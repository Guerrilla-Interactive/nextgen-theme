"use client";

import React from "react";
import { Button } from "@/features/unorganized-components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/features/unorganized-components/ui/tooltip";
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react";

export default function InlineCopy({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <code className="max-w-[420px] truncate rounded border border-muted/40 bg-muted/20 px-2 py-0.5 text-[10px]">
        {command}
      </code>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            aria-label="Copy command"
            className="h-6 w-6"
          >
            {copied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="py-1 text-[11px]">{copied ? "Copied!" : "Copy"}</TooltipContent>
      </Tooltip>
    </div>
  );
}


