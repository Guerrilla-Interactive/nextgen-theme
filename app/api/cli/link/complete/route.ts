import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getLinkStore } from "@/lib/link-store";
import { getCliEntitlement, getCliKeyVersion } from "@/lib/entitlements";
import { signCliApiKey } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { code } = await req.json().catch(() => ({ code: undefined }));
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const rec = getLinkStore().get(code);
  if (!rec || rec.status === "expired") return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });

  const ent = await getCliEntitlement(userId);
  if (ent.status !== "active") return NextResponse.json({ error: `Not entitled: ${ent.status}` }, { status: 403 });

  // Issue API key (use existing version)
  const ver = await getCliKeyVersion(userId);
  const apiKey = signCliApiKey(userId, ver);

  getLinkStore().complete(code, { userId, apiKey, version: ver });
  return NextResponse.json({ ok: true });
}


