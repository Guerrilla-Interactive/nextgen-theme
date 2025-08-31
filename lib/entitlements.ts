import { clerkClient } from "@clerk/nextjs/server";

export type Entitlement = {
  status: "active" | "past_due" | "canceled" | "refunded" | "none";
  plan?: "lifetime" | "subscription";
  product?: string;           // "nextgen-cli"
  validUntilMs?: number|null;
  stripeCustomerId?: string|null;
  stripeSubscriptionId?: string|null;
  stripePriceId?: string|null;
};

export async function getCliEntitlement(userId: string): Promise<Entitlement> {
  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  const e = (u.privateMetadata?.entitlements as any)?.nextgen_cli;
  return (e as Entitlement) ?? { status: "none" };
}

/** Upsert entitlement + keep other metadata intact */
export async function setCliEntitlement(userId: string, e: Entitlement) {
  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  await client.users.updateUser(userId, {
    privateMetadata: {
      ...u.privateMetadata,
      entitlements: {
        ...(u.privateMetadata?.entitlements as any),
        nextgen_cli: {
          ...((u.privateMetadata?.entitlements as any)?.nextgen_cli || {}),
          ...e,
        },
      },
    },
  });
}

/** Lightweight “oversight” fields updated on each CLI assertion */
export async function bumpCliUsage(userId: string, { version }: { version?: string }) {
  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  const cli = (u.privateMetadata?.cli as any) || {};
  await client.users.updateUser(userId, {
    privateMetadata: {
      ...u.privateMetadata,
      cli: {
        ...cli,
        last_assertion_at: Date.now(),
        last_version: version ?? cli?.last_version ?? null,
        assertion_count: (cli?.assertion_count ?? 0) + 1,
      },
    },
  });
}

/** Per-user key version for revoke/rotate */
export async function getCliKeyVersion(userId: string): Promise<number> {
  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  return Number(((u.privateMetadata?.cli as any)?.key_version ?? 1));
}
export async function bumpCliKeyVersion(userId: string) {
  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  const cur = Number(((u.privateMetadata?.cli as any)?.key_version ?? 1));
  await client.users.updateUser(userId, {
    privateMetadata: { ...u.privateMetadata, cli: { ...(u.privateMetadata?.cli as any), key_version: cur + 1 } },
  });
  return cur + 1;
}
