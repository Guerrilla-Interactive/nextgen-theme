import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCliEntitlement } from "@/lib/entitlements";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const ent = await getCliEntitlement(userId);
    const customerId = ent.stripeCustomerId as string | undefined;
    if (!customerId) return NextResponse.json({ receipts: [] });

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    const stripe = new Stripe(secret);

    // Prefer invoices for subscription or hosted receipts for payment intents
    const invoices = await stripe.invoices.list({ customer: customerId, limit: 10 });
    const formatted = invoices.data.map(inv => ({
      id: inv.id,
      amount_due: inv.amount_due,
      amount_paid: inv.amount_paid,
      currency: inv.currency,
      status: inv.status,
      hosted_invoice_url: inv.hosted_invoice_url,
      invoice_pdf: inv.invoice_pdf,
      created: inv.created,
    }));

    // If no invoices (one-time payments), fallback to recent charges for hosted receipt URLs
    let charges: Stripe.Charge[] = [];
    if (formatted.length === 0) {
      const chargeList = await stripe.charges.list({ customer: customerId, limit: 10 });
      charges = chargeList.data;
    }

    const chargeReceipts = charges.map(ch => ({
      id: ch.id,
      amount: ch.amount,
      currency: ch.currency,
      receipt_url: ch.receipt_url,
      paid: ch.paid,
      created: ch.created,
    }));

    return NextResponse.json({ invoices: formatted, charges: chargeReceipts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to load receipts" }, { status: 500 });
  }
}


