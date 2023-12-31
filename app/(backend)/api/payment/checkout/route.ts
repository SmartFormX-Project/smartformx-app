import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  try {
    const { metadata, PRICE_ID, email, recurring } = await req.json();

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICE_ID,

          quantity: 1,
        },
      ],

      customer_email: email,
      mode: "subscription",
      metadata: metadata,
      discounts: [
        {
          coupon: recurring > 1 ? process.env.STRIPE_COUPON! : "",
        },
      ],
      subscription_data: {
        metadata: metadata,
        trial_period_days: 7,
        trial_settings: {
          end_behavior: {
            missing_payment_method: "pause",
          },
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL_BASE}/api/payment/processed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL_BASE}/signup`,
    });
    return NextResponse.json(session.url);
  } catch (err: any) {
    return NextResponse.json(err, { status: 500 });
  }
}
