// app/dashboard/page.tsx
import { auth, currentUser, verifyToken, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { UpgradeButtons } from "./UpgradeButtons";
import { VerifyUpgrade } from "./VerifyUpgrade";
import { Receipts } from "./Receipts";
import { User as UserIcon, Download as DownloadIcon, Receipt as ReceiptIcon, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { InstallTabs } from "./InstallTabs.client";
import FullPageBackground from "@/features/unorganized-components/magic-background/full-page-background";



export const dynamic = "force-dynamic"; // optional: avoid caching

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const params = await searchParams;

  const h = await headers();
  const authz = h.get("authorization");
  const headerToken = authz?.toLowerCase().startsWith("bearer ") ? authz.slice(7) : undefined;
  const queryToken = typeof params?.token === "string" ? params.token : undefined;
  const incomingToken = headerToken ?? queryToken;

  let user = null as Awaited<ReturnType<typeof currentUser>> | null;
  if (incomingToken) {
    try {
      const payload = await verifyToken(incomingToken, {});
      const uid = payload.sub as string;
      const cc = await clerkClient();
      user = await cc.users.getUser(uid) as any;
    } catch {
      user = await currentUser();
    }
  } else {
    user = await currentUser(); // works in Edge or Node
  }
  const ent =
    ((user?.privateMetadata as any)?.entitlements?.nextgen_cli) ?? { status: "none" };
  const cli = ((user?.privateMetadata as any)?.cli) ?? {};

  const sessionId = typeof params?.session_id === "string" ? params.session_id : undefined;

  return (
    <>
      <FullPageBackground type="Aurora" />
      <main className="container z-10 mt-24 mx-auto p-6 space-y-6">
        {/* Header */}
        
        {/* removed debug JSON */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Welcome{user?.firstName ? `, ${user.firstName}` : ""}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {ent.status === "active" ? "Manage your license and receipts." : "Unlock the Nextgen CLI with a one‑time license."}
            </p>
          </div>
        </div>

        {sessionId && (
          <div className="rounded border p-3">
            <VerifyUpgrade sessionId={sessionId} />
          </div>
        )}



        {/* Content Grid */}
        <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
          {/* Sales CTA when inactive */}
          {ent.status !== "active" && (
            <section id="purchase" className="rounded-xl border border-border/50 bg-background/10 backdrop-blur-md shadow-sm hover:shadow-md transition-colors p-6 md:col-span-2 xl:col-span-2">
              <div className="flex items-center gap-4">
                <div className="w-16 flex items-center justify-center">
                  <ShoppingCartIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-medium text-lg">Get Nextgen CLI</p>
                      <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                        Ship beautiful, on-brand sites faster. One‑time purchase via Stripe. No subscription.
                      </p>
                      <ul className="mt-3 text-sm list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Instant license delivery</li>
                        <li>Use on unlimited projects</li>
                        <li>Free updates</li>
                      </ul>
                    </div>
                    <div className="shrink-0">
                      <UpgradeButtons status={ent.status} id="purchase" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Secure checkout powered by Stripe.</p>
                </div>
              </div>
            </section>
          )}

          {/* Account */}
          {ent.status === "active" && (
            <section id="account" className="flex flex-col justify-center h-full rounded-xl border border-border/50 bg-background/10 backdrop-blur-md shadow-sm hover:shadow-md transition-colors p-4 md:col-span-1 xl:col-span-1">
              <div className="flex items-center gap-4">
                <div className="w-16 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Account</p>
                  <div className="mt-2 text-sm">
                    <div className="mt-2 flex items-center gap-2">
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
                        {ent.status === "active" ? "Active" : ent.status?.replace("_", " ") ?? "Inactive"}
                      </span>
                      {ent.plan && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border bg-secondary text-secondary-foreground">
                          Plan: {ent.plan}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Your license is active.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Install (only for active licenses) */}
          {ent.status === "active" && (
            <section id="install" className="flex flex-col justify-center rounded-xl border border-border/50 bg-background/10 backdrop-blur-md shadow-sm hover:shadow-md transition-colors p-6 md:col-span-1 xl:col-span-1">
              <div className="flex items-center gap-4">
                <div className="w-16 flex items-center justify-center">
                  <DownloadIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-lg">Install Nextgen CLI</p>
                  <p className="text-sm text-muted-foreground mt-1">Install globally using your preferred package manager:</p>
                  <InstallTabs />
                </div>
              </div>
            </section>
          )}

          {/* Billing section removed */}

          {/* Receipts (only visible for upgraded/active accounts) */}
          {ent.status === "active" && (
            <section id="receipts" className="flex flex-col justify-center h-full rounded-xl border border-border/50 bg-background/10 backdrop-blur-md shadow-sm hover:shadow-md transition-colors p-4 md:col-span-2 xl:col-span-2">
              <div className="flex items-center gap-4">
                <div className="w-16 flex items-center justify-center">
                  <ReceiptIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-2">Receipts</p>
                  <Receipts id="receipts" />
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
