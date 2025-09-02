import { NextResponse } from "next/server";
import { verifyToken, clerkClient } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const authz = req.headers.get("authorization");
  if (!authz?.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authz.slice(7);

  try {
    const payload = await verifyToken(token, {});
    const userId = payload.sub as string;

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    const res = NextResponse.json({
      email: user.primaryEmailAddress?.emailAddress ?? null,
      last_name: user.lastName ?? null,
      first_name: user.firstName ?? null,
      public_metadata: user.publicMetadata ?? {},
    });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, content-type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}


