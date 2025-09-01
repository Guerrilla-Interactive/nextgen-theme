import { NextResponse } from "next/server";
import { verifyToken } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const authz = req.headers.get("authorization");

  if (!authz?.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authz.slice(7);

  try {
    // Verifies against Clerk JWKS automatically, no env needed
    const payload = await verifyToken(token, {});

    // Pull fields directly from the JWT (since no sub is present)
    const userData = {
      email: payload.email as string,
      firstName: payload.first_name as string,
      lastName: payload.last_name as string,
      publicMetadata: payload.public_metadata ?? {},
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
