"use client";

import { useEffect, useState } from "react";

export function VerifyUpgrade({ sessionId }: { sessionId?: string }) {
  const [status, setStatus] = useState<"idle"|"verifying"|"done"|"error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!sessionId) return;
      setStatus("verifying");
      try {
        const res = await fetch("/api/stripe/verify", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification failed");
        setStatus("done");
        // Optional: refresh the page to show updated entitlements
        window.location.replace("/dashboard");
      } catch (e) {
        setError((e as Error).message);
        setStatus("error");
      }
    };
    run();
  }, [sessionId]);

  if (!sessionId) return null;
  if (status === "error") return <p className="text-sm text-red-600">{error}</p>;
  return <p className="text-sm text-muted-foreground">Applying upgrade...</p>;
}


