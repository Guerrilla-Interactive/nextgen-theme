"use client";

import { useState } from "react";

export function UpgradeButtons({ status }: { status: string }) {
  const [loading, setLoading] = useState<string | null>(null);

  const go = async (path: string, body?: Record<string, unknown>) => {
    try {
      setLoading(path);
      const res = await fetch(path, { 
        method: "POST", 
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
      setLoading(null);
      alert((e as Error).message);
    }
  };

  if (status === "active") {
    return (
      <div className="flex gap-3">
        <button
          onClick={() => go("/api/stripe/portal")}
          className="inline-flex items-center justify-center py-1.5 px-4 rounded-md shadow-sm font-medium text-sm cursor-pointer bg-secondary text-secondary-foreground hover:opacity-90"
          disabled={loading !== null}
        >
          {loading ? "Loading..." : "Manage billing"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => go("/api/stripe/checkout", { productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID || "", mode: "payment" })}
        className="inline-flex items-center justify-center py-1.5 px-4 rounded-md shadow-sm font-medium text-sm cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={loading !== null}
      >
        {loading ? "Redirecting..." : "Purchase"}
      </button>
    </div>
  );
}


