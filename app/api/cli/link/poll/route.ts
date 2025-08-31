import { NextResponse } from "next/server";
import { getLinkStore } from "@/lib/link-store";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code") || "";
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const rec = getLinkStore().get(code);
  if (!rec) return NextResponse.json({ status: "expired" }, { status: 404 });
  if (rec.status === "ready") {
    // allow one pickup; mark as completed but still respond
    getLinkStore().consume(code);
    return NextResponse.json({ status: "ready", apiKey: rec.apiKey, version: rec.version });
  }
  if (rec.status === "expired") return NextResponse.json({ status: "expired" }, { status: 410 });
  return NextResponse.json({ status: "pending" });
}


