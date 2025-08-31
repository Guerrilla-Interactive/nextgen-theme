import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCliApiKey, signAssertion } from "@/lib/jwt";
import { getCliEntitlement, bumpCliUsage, getCliKeyVersion } from "@/lib/entitlements";

export const runtime = "nodejs";

const Body = z.object({ product: z.string().default("nextgen-cli"), version: z.string().optional() });

export async function POST(req: Request) {
  const key = req.headers.get("x-cli-key") || "";
  if (!key) return NextResponse.json({ error: "Missing X-CLI-Key" }, { status: 401 });

  let sub: string, ver: number;
  try { ({ sub, ver } = verifyCliApiKey(key)); }
  catch { return NextResponse.json({ error: "Invalid API key" }, { status: 401 }); }

  // Enforce per-user key version (revocation)
  const currentVer = await getCliKeyVersion(sub);
  if (ver !== currentVer) return NextResponse.json({ error: "Key revoked" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { product, version } = Body.parse(body);

  const ent = await getCliEntitlement(sub);
  if (ent.status !== "active" || ent.product !== product) {
    return NextResponse.json({ error: `Not entitled: ${ent.status}` }, { status: 403 });
  }
  if (ent.validUntilMs && Date.now() > ent.validUntilMs) {
    return NextResponse.json({ error: "Entitlement expired" }, { status: 403 });
  }

  await bumpCliUsage(sub, { version });

  const assertion = signAssertion({
    typ: "license_assertion",
    sub, product, plan: ent.plan, status: ent.status,
    offline_grace_hours: 168,
  });

  return NextResponse.json({ assertion, expires_in: 86400 });
}
