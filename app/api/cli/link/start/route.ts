import { NextResponse } from "next/server";
import { getLinkStore } from "@/lib/link-store";

export const runtime = "nodejs";

export async function POST() {
  const store = getLinkStore();
  const rec = store.createLink();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgen-theme.vercel.app";
  const link_url = `${origin}/dashboard?link_code=${encodeURIComponent(rec.code)}`;
  return NextResponse.json({ code: rec.code, link_url, expires_in: Math.floor((rec.expiresAtMs - Date.now()) / 1000) });
}


