import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "Stripe not configured: missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    const stripe = new Stripe(secret);

    // Configure price or resolve from product, plus success/cancel URLs
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Optional body overrides for multi-tier support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reqBody: any = await req.json().catch(() => ({}));

    const inputPrice = (reqBody?.priceId as string | undefined) || undefined;
    const inputProd = (reqBody?.productId as string | undefined) || undefined;
    const desiredMode = (reqBody?.mode as "subscription" | "payment" | undefined) || "subscription";
    const envPrice = process.env.STRIPE_PRICE_ID || undefined;
    const envProd = process.env.STRIPE_PRODUCT_ID || undefined;

    // Normalize: detect if someone accidentally put a prod_ in price field
    const productId = inputProd
      || (inputPrice && inputPrice.startsWith("prod_") ? inputPrice : undefined)
      || envProd
      || (envPrice && envPrice.startsWith("prod_") ? envPrice : undefined);

    let priceId = (inputPrice && inputPrice.startsWith("price_")) ? inputPrice
      : (envPrice && envPrice.startsWith("price_")) ? envPrice
      : undefined;

    if (!priceId && productId) {
      // Resolve default or first active price for the product
      const product = await stripe.products.retrieve(productId);
      const defaultPriceId = typeof product.default_price === "string" ? product.default_price : product.default_price?.id;
      if (defaultPriceId) {
        priceId = defaultPriceId;
      } else {
        const prices = await stripe.prices.list({ product: productId, active: true, limit: 10 });
        priceId = prices.data[0]?.id;
      }
    }

    if (!priceId) {
      return NextResponse.json({ error: "Stripe not configured: provide a valid priceId (price_...) or a productId (prod_...) via env or request body" }, { status: 500 });
    }

    // Ensure price matches the desired mode
    const resolvedPrice = await stripe.prices.retrieve(priceId);
    let sessionMode: "subscription" | "payment" = desiredMode;

    if (desiredMode === "subscription") {
      if (resolvedPrice.type !== "recurring") {
        // Try to find a recurring price for the same product
        const prodId = typeof resolvedPrice.product === "string" ? resolvedPrice.product : resolvedPrice.product?.id;
        if (prodId) {
          const all = await stripe.prices.list({ product: prodId, active: true, limit: 20 });
          const recurring = all.data.find(p => p.type === "recurring");
          if (recurring) {
            priceId = recurring.id;
          } else {
            return NextResponse.json({
              error: "No recurring price found for this product. Create a subscription price in Stripe or pass a recurring priceId.",
            }, { status: 400 });
          }
        } else {
          return NextResponse.json({
            error: "Cannot resolve product for the provided price. Pass productId or a recurring priceId.",
          }, { status: 400 });
        }
      }
    } else {
      // payment mode expects one_time price; if not, we still can charge recurring in payment mode is not valid; keep as is
      if (resolvedPrice.type !== "one_time") {
        // Try to find a one-time price, otherwise proceed and let Stripe error with a clear message
        const prodId = typeof resolvedPrice.product === "string" ? resolvedPrice.product : resolvedPrice.product?.id;
        if (prodId) {
          const all = await stripe.prices.list({ product: prodId, active: true, limit: 20 });
          const oneTime = all.data.find(p => p.type === "one_time");
          if (oneTime) {
            priceId = oneTime.id;
          }
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: sessionMode,
      client_reference_id: userId,
      metadata: { clerk_user_id: userId, product: "nextgen-cli", price_id: priceId as string },
      // Propagate metadata to subscription so webhook subscription.updated can read it
      ...(sessionMode === "subscription" ? { subscription_data: { metadata: { clerk_user_id: userId, product: "nextgen-cli" } } } : {}),
      // Propagate metadata to payment intent for one-time purchases
      ...(sessionMode === "payment" ? { payment_intent_data: { metadata: { clerk_user_id: userId, product: "nextgen-cli", price_id: priceId as string } } } : {}),
      // Ensure a Stripe customer is created for one-time payments so we can store stripeCustomerId
      ...(sessionMode === "payment" ? { customer_creation: "always" as const } : {}),
      line_items: [{ price: priceId as string, quantity: 1 }],
      success_url: `${origin}/dashboard?upgrade=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?upgrade=cancelled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create checkout session" }, { status: 500 });
  }
}


