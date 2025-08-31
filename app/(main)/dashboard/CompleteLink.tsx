"use client";

import { useEffect, useState } from "react";

export function CompleteLink({ code }: { code: string }) {
  const [status, setStatus] = useState<"idle"|"working"|"done"|"error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!code) return;
      setStatus("working");
      try {
        const res = await fetch("/api/cli/link/complete", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Failed to complete link");
        setStatus("done");
        // Clean the URL of link_code to avoid re-running
        const u = new URL(window.location.href);
        u.searchParams.delete("link_code");
        window.history.replaceState({}, "", u.toString());
      } catch (e) {
        setError((e as Error).message);
        setStatus("error");
      }
    };
    run();
  }, [code]);

  if (!code) return null;
  if (status === "error") return <p className="text-sm text-red-600">{error}</p>;
  if (status === "done") return <p className="text-sm text-green-600">Linked with CLI.</p>;
  return <p className="text-sm text-muted-foreground">Linking CLI…</p>;
}


