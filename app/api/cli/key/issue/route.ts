import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getCliEntitlement, bumpCliKeyVersion, getCliKeyVersion } from "@/lib/entitlements";
import { signCliApiKey } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST() {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const ent = await getCliEntitlement(userId);
  if (ent.status !== "active") return NextResponse.json({ error: `Not entitled: ${ent.status}` }, { status: 403 });

  const ver = await getCliKeyVersion(userId); // current version
  const apiKey = signCliApiKey(userId, ver);
  return NextResponse.json({ apiKey, version: ver });
}
