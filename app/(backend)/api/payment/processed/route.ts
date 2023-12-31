import prisma from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const session_id = params.get("session_id");
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status == "complete") {
    const email = session.customer_email;
    const subs = session.subscription;

    await prisma.user.update({
      where: { email: email },
      data: {
        subscribeStatus: "trialing",
        stripeCustomerId: session.customer,
        stripeSubscriptionId: subs,
        metadata: session.metadata,
      },
    });
    return NextResponse.redirect(
      new URL("signup?up=true", process.env.NEXT_PUBLIC_URL_BASE!)
    );
  }
}
