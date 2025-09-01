import { NextResponse } from "next/server";
import { verifyToken, clerkClient } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const authz = req.headers.get("authorization");
  if (!authz || !authz.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authz.slice(7);

  try {
    const payload = await verifyToken(token, {});
    const userId = payload.sub as string;
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      emailAddresses: user.emailAddresses?.map((e) => e.emailAddress) ?? [],
      publicMetadata: user.publicMetadata ?? {},
      privateMetadata: user.privateMetadata ?? {},
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


