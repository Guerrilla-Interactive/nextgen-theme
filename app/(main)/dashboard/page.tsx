// app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UpgradeButtons } from "./UpgradeButtons";
import { VerifyUpgrade } from "./VerifyUpgrade";
import { Receipts } from "./Receipts";


export const dynamic = "force-dynamic"; // optional: avoid caching

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser(); // works in Edge or Node
  const ent =
    ((user?.privateMetadata as any)?.entitlements?.nextgen_cli) ?? { status: "none" };
  const cli = ((user?.privateMetadata as any)?.cli) ?? {};

  const params = await searchParams;
  const sessionId = typeof params?.session_id === "string" ? params.session_id : undefined;

  return (
    <>
      
      <main className="max-w-5xl mt-24 mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Welcome{user?.firstName ? `, ${user.firstName}` : ""}</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your license, billing and usage.</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={
                `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ` +
                (ent.status === "active"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900"
                  : ent.status === "past_due"
                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900"
                  : ent.status === "canceled" || ent.status === "refunded"
                  ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900"
                  : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800")
              }
            >
              {ent.status}
            </span>
            {ent.plan && (
              <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border bg-secondary text-secondary-foreground">
                {ent.plan}
              </span>
            )}
          </div>
        </div>

        {sessionId && (
          <div className="rounded border p-3">
            <VerifyUpgrade sessionId={sessionId} />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Status (only when active) */}
          {ent.status === "active" && (
            <section className="rounded border p-4">
              <p className="font-medium">Account status</p>
              <div className="mt-2 text-sm">
                <p>Name: {user?.fullName}</p>
                <div className="mt-2 text-muted-foreground space-y-1">
                  <p>Product: {ent.product ?? "—"}</p>
                  <p>Stripe Price: {ent.stripePriceId ?? "—"}</p>
                </div>
              </div>
            </section>
          )}

          {/* Usage (only when active) */}
          {ent.status === "active" && (
            <section className="rounded border p-4">
              <p className="font-medium">Usage</p>
              <p className="text-sm text-muted-foreground mt-2">
                Last use: {cli?.last_assertion_at ? new Date(cli.last_assertion_at).toLocaleString() : "—"}
              </p>
              <div className="mt-3">
                <div className="h-2 w-full rounded bg-muted">
                  <div className="h-2 rounded bg-primary" style={{ width: `${Math.min(100, (cli?.assertion_count ?? 0) * 5)}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Uses: {cli?.assertion_count ?? 0}</p>
              </div>
            </section>
          )}

          {/* Billing actions (hidden when account is active) */}
          {ent.status !== "active" && (
            <section className="rounded border p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Purchase Nextgen</p>
                <p className="text-sm text-muted-foreground">One‑time license. No subscription.</p>
              </div>
              <UpgradeButtons status={ent.status} />
            </section>
          )}

          {/* Receipts (only visible for upgraded/active accounts) */}
          {ent.status === "active" && (
            <section className="rounded border p-4 md:col-span-2">
              <p className="font-medium mb-2">Receipts</p>
              <Receipts />
            </section>
          )}
        </div>
      </main>
    </>
  );
}
