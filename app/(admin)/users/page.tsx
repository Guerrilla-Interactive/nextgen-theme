import { clerkClient, auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export default async function AdminUsersPage() {
  const { userId } = auth();
  if (!userId) return <p>Unauthorized</p>;
  // Simple guard: set your admin user IDs or roles in Clerk publicMetadata
  const me = await clerkClient.users.getUser(userId);
  if ((me.publicMetadata as any)?.role !== "admin") return <p>Forbidden</p>;

  // Fetch first 100 users (paginate as needed)
  const list = await clerkClient.users.getUserList({ limit: 100 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

  const rows = await Promise.all(list.data.map(async u => {
    const ent = ((u.privateMetadata?.entitlements as any)?.nextgen_cli) ?? null;
    const cli = (u.privateMetadata?.cli as any) ?? {};
    let stripeStatus: string | null = null;

    const subId = ent?.stripeSubscriptionId as string | undefined;
    if (subId) {
      try { const sub = await stripe.subscriptions.retrieve(subId); stripeStatus = sub.status; } catch {}
    }

    return {
      id: u.id,
      email: u.emailAddresses[0]?.emailAddress ?? "—",
      status: ent?.status ?? "none",
      plan: ent?.plan ?? "—",
      stripeStatus: stripeStatus ?? "—",
      lastUse: cli?.last_assertion_at ? new Date(cli.last_assertion_at).toLocaleString() : "—",
      count: cli?.assertion_count ?? 0,
      version: cli?.last_version ?? "—",
    };
  }));

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users & Access</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Plan</th>
              <th className="py-2 pr-4">Stripe</th>
              <th className="py-2 pr-4">Last CLI use</th>
              <th className="py-2 pr-4">Use count</th>
              <th className="py-2 pr-4">Last version</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="py-2 pr-4">{r.email}</td>
                <td className="py-2 pr-4">{r.status}</td>
                <td className="py-2 pr-4">{r.plan}</td>
                <td className="py-2 pr-4">{r.stripeStatus}</td>
                <td className="py-2 pr-4">{r.lastUse}</td>
                <td className="py-2 pr-4">{r.count}</td>
                <td className="py-2 pr-4">{r.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
