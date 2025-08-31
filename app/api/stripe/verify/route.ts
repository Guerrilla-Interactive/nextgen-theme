import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { setCliEntitlement } from "@/lib/entitlements";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { sessionId } = await req.json().catch(() => ({ sessionId: undefined }));
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });

    const stripe = new Stripe(secret);
    const s = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent"] });

    // Basic assertions: belongs to the current user and is paid/complete
    const belongsToUser = s.client_reference_id === userId || s.metadata?.clerk_user_id === userId;
    const isPaid = s.payment_status === "paid" || s.status === "complete";
    if (!belongsToUser || !isPaid) {
      return NextResponse.json({ error: "Session not valid or not paid" }, { status: 400 });
    }

    const plan = s.mode === "subscription" ? "subscription" : "lifetime";
    const product = s.metadata?.product ?? "nextgen-cli";
    const priceId = (s.metadata?.price_id as string) ?? undefined;
    const pi = (s.payment_intent as Stripe.PaymentIntent | null) || null;
    const stripeCustomerId = (s.customer as string) || (pi?.customer as string) || null;

    await setCliEntitlement(userId, {
      status: "active",
      plan,
      product,
      validUntilMs: null,
      stripeCustomerId,
      stripeSubscriptionId: (s.subscription as string) ?? null,
      stripePriceId: priceId ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Verification failed" }, { status: 500 });
  }
}


