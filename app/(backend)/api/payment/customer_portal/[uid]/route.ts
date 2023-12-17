import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  const user = await prisma?.user.findUnique({
    where: { id: params.uid },
    select: { stripeCustomerId: true },
  });

  if (!user) {
    return NextResponse.json({ type: "not_found" }, { status: 404 });
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: user?.stripeCustomerId,
    return_url: "http://localhost:3000?up=true",
  });

  return NextResponse.json(session.url, { status: 200 });
}
