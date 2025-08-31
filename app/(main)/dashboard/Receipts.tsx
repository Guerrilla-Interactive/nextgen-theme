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

export function Receipts() {
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

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-muted-foreground">Loading receipts…</p>;

  const { invoices, charges } = data;
  if (invoices.length === 0 && charges.length === 0) {
    return <p className="text-sm text-muted-foreground">No receipts yet.</p>;
  }

  return (
    <div className="space-y-3">
      {invoices.length > 0 && (
        <div>
          <p className="font-medium mb-2">Invoices</p>
          <ul className="space-y-2">
            {invoices.map(inv => (
              <li key={inv.id} className="flex items-center justify-between text-sm">
                <span>#{inv.id} · {(inv.amount_paid ?? inv.amount_due) / 100} {inv.currency?.toUpperCase()}</span>
                <span className="flex items-center gap-2">
                  {inv.hosted_invoice_url && (
                    <a className="underline" href={inv.hosted_invoice_url} target="_blank" rel="noreferrer">View</a>
                  )}
                  {inv.invoice_pdf && (
                    <a className="underline" href={inv.invoice_pdf} target="_blank" rel="noreferrer">PDF</a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {charges.length > 0 && (
        <div>
          <p className="font-medium mt-4 mb-2">Payments</p>
          <ul className="space-y-2">
            {charges.map(ch => (
              <li key={ch.id} className="flex items-center justify-between text-sm">
                <span>#{ch.id} · {ch.amount / 100} {ch.currency?.toUpperCase()}</span>
                {ch.receipt_url && (
                  <a className="underline" href={ch.receipt_url} target="_blank" rel="noreferrer">Receipt</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


