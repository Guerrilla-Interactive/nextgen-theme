import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { bumpCliKeyVersion } from "@/lib/entitlements";

export const runtime = "nodejs";
export async function POST() {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const v = await bumpCliKeyVersion(userId); // future keys will embed new version
  return NextResponse.json({ ok: true, newVersion: v });
}
