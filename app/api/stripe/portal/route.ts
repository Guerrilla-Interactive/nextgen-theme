import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCliEntitlement } from "@/lib/entitlements";

export const runtime = "nodejs";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ent = await getCliEntitlement(userId);
    const customerId = ent.stripeCustomerId as string | undefined;
    if (!customerId) {
      return NextResponse.json({ error: "No Stripe customer on file" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "Stripe not configured: missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    const stripe = new Stripe(secret);
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create portal session" }, { status: 500 });
  }
}


