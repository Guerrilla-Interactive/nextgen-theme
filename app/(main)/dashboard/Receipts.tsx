"use client";

import { useEffect, useState } from "react";

type Invoice = {
  id: string;
  amount_due: number;
  amount_paid: number;
  currency: string | null;
  status: string | null;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
  created: number;
};

type Charge = {
  id: string;
  amount: number;
  currency: string | null;
  receipt_url: string | null;
  paid: boolean;
  created: number;
};

export function Receipts({ id }: { id?: string }) {
  const [data, setData] = useState<{ invoices: Invoice[]; charges: Charge[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/stripe/receipts", { credentials: "include" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load receipts");
        setData({ invoices: json.invoices || [], charges: json.charges || [] });
      } catch (e) {
        setError((e as Error).message);
      }
    };
    run();
  }, []);

  const formatAmount = (amountCents: number | null | undefined, currency: string | null | undefined) => {
    if (typeof amountCents !== "number") return "—";
    const code = (currency || "USD").toUpperCase();
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: code }).format(amountCents / 100);
    } catch {
      return `${(amountCents / 100).toFixed(2)} ${code}`;
    }
  };

  const formatDate = (unixSeconds: number | null | undefined) => {
    if (!unixSeconds) return "—";
    try {
      return new Date(unixSeconds * 1000).toLocaleString();
    } catch {
      return `${unixSeconds}`;
    }
  };

  const statusBadge = (status: string | null | undefined) => {
    const s = (status || "").toLowerCase();
    const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border";
    if (s === "paid") return <span className={`${base} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900`}>Paid</span>;
    if (s === "open") return <span className={`${base} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900`}>Open</span>;
    if (s === "draft") return <span className={`${base} bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800`}>Draft</span>;
    if (s === "void" || s === "uncollectible") return <span className={`${base} bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900`}>Void</span>;
    return <span className={`${base} bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800`}>{status || "—"}</span>;
  };

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-muted-foreground">Loading receipts…</p>;

  const { invoices, charges } = data;
  if (invoices.length === 0 && charges.length === 0) {
    return <p className="text-sm text-muted-foreground">No receipts yet.</p>;
  }

  const invoicesSorted = [...invoices].sort((a, b) => (b.created || 0) - (a.created || 0));
  const chargesSorted = [...charges].sort((a, b) => (b.created || 0) - (a.created || 0));

  return (
    <section id={id} className="space-y-4 ">
      {invoices.length > 0 && (
        <div>
          <p className="font-medium mb-2">Invoices</p>
          <ul className="space-y-2">
            {invoicesSorted.map(inv => (
              <li key={inv.id} className="flex items-center justify-between text-sm">
                <div className="flex flex-col">
                  <span className="font-mono">#{inv.id}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(inv.created)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{formatAmount(inv.amount_paid ?? inv.amount_due, inv.currency)}</span>
                  {statusBadge(inv.status)}
                  <span className="flex items-center gap-2">
                    {inv.hosted_invoice_url && (
                      <a className="underline" href={inv.hosted_invoice_url} target="_blank" rel="noreferrer">View</a>
                    )}
                    {inv.invoice_pdf && (
                      <a className="underline" href={inv.invoice_pdf} target="_blank" rel="noreferrer">PDF</a>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {charges.length > 0 && (
        <div>
          
          <ul className="space-y-2">
            {chargesSorted.map(ch => (
              <li key={ch.id} className="flex items-center justify-between text-sm">
                <div className="flex flex-col">
                  <span className="font-mono">#{ch.id}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(ch.created)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{formatAmount(ch.amount, ch.currency)}</span>
                  {ch.paid ? (
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900">Paid</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900">Failed</span>
                  )}
                  {ch.receipt_url && (
                    <a className="underline" href={ch.receipt_url} target="_blank" rel="noreferrer">Receipt</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}


