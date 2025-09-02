"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/unorganized-components/ui/tabs";
import { Button } from "@/features/unorganized-components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/features/unorganized-components/ui/tooltip";
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react";

type Manager = "npm" | "pnpm" | "yarn" | "bun";

const commands: Record<Manager, string> = {
  npm: "npm i -g nextgen-go-cli",
  pnpm: "pnpm add -g nextgen-go-cli",
  yarn: "yarn global add nextgen-go-cli",
  bun: "bun add -g nextgen-go-cli",
};

export function InstallTabs() {
  const [active, setActive] = React.useState<Manager>("npm");
  return (
    <Tabs value={active} onValueChange={(v) => setActive(v as Manager)} className="mt-2">
      <TabsList className="h-7 rounded-md p-1 bg-background text-muted-foreground border border-border">
        <TabsTrigger value="npm" className="text-[11px] leading-4 px-2 py-0.5">npm</TabsTrigger>
        <TabsTrigger value="pnpm" className="text-[11px] leading-4 px-2 py-0.5">pnpm</TabsTrigger>
        <TabsTrigger value="yarn" className="text-[11px] leading-4 px-2 py-0.5">yarn</TabsTrigger>
        <TabsTrigger value="bun" className="text-[11px] leading-4 px-2 py-0.5">bun</TabsTrigger>
      </TabsList>
      {(Object.keys(commands) as Manager[]).map((mgr) => (
        <TabsContent key={mgr} value={mgr}>
          <CopyRow command={commands[mgr]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function CopyRow({ command }: { command: string }) {
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
    <div className="mt-2 flex items-center ">
      <pre className="flex-1 rounded bg-background border-border/50 mr-2 border p-2 overflow-auto text-xs">
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


