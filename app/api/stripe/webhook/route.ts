import Stripe from "stripe";
import { NextResponse } from "next/server";
import { setCliEntitlement } from "@/lib/entitlements";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text();

  let evt: Stripe.Event;
  try { evt = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!); }
  catch (e: any) { return new NextResponse(`Bad signature: ${e.message}`, { status: 400 }); }

  const map: Record<string,"active"|"past_due"|"canceled"> = {
    active: "active", trialing: "active",
    past_due: "past_due", unpaid: "past_due", incomplete: "past_due",
    incomplete_expired: "canceled", canceled: "canceled",
  };

  switch (evt.type) {
    case "checkout.session.completed": {
      const s = evt.data.object as Stripe.Checkout.Session;
      const userId = (s.client_reference_id || s.metadata?.clerk_user_id) as string | undefined;
      if (!userId) break;
      await setCliEntitlement(userId, {
        status: "active",
        plan: s.mode === "subscription" ? "subscription" : "lifetime",
        product: s.metadata?.product ?? "nextgen-cli",
        validUntilMs: null,
        stripeCustomerId: (s.customer as string) ?? null,
        stripeSubscriptionId: (s.subscription as string) ?? null,
        stripePriceId: (s.metadata?.price_id as string) ?? null,
      });
      break;
    }
    case "payment_intent.succeeded": {
      const pi = evt.data.object as Stripe.PaymentIntent;
      const userId = (pi.metadata?.clerk_user_id as string) || undefined;
      if (!userId) break;
      await setCliEntitlement(userId, {
        status: "active",
        plan: "lifetime",
        product: pi.metadata?.product ?? "nextgen-cli",
        validUntilMs: null,
        stripeCustomerId: (pi.customer as string) ?? null,
        stripePriceId: (pi.metadata?.price_id as string) ?? null,
      });
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = evt.data.object as Stripe.Subscription;
      const userId = (sub.metadata?.clerk_user_id as string) || undefined;
      if (!userId) break;
      await setCliEntitlement(userId, {
        status: map[sub.status] ?? "past_due",
        plan: "subscription",
        product: sub.metadata?.product ?? "nextgen-cli",
        validUntilMs: (sub as any).current_period_end ? (sub as any).current_period_end * 1000 : null,
        stripeCustomerId: (sub.customer as string) ?? null,
        stripeSubscriptionId: sub.id,
        stripePriceId: sub.items.data[0]?.price.id ?? null,
      });
      break;
    }
    case "charge.refunded": {
      const ch = evt.data.object as Stripe.Charge;
      const userId = (ch.metadata?.clerk_user_id as string) || undefined;
      if (userId) {
        await setCliEntitlement(userId, {
          status: "refunded",
          plan: "lifetime",
          product: ch.metadata?.product ?? "nextgen-cli",
          validUntilMs: null,
          stripeCustomerId: (ch.customer as string) ?? null,
        });
      }
      break;
    }
  }
  return NextResponse.json({ ok: true });
}
