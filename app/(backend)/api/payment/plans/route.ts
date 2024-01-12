
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function OPTIONS() {
return NextResponse.json({ status: 200 });
}

export async function GET() {
   
  const products = await stripe.products.list({
    limit: 3,
    active: true,
  });

  const prices = await stripe.prices.list({
    active: true,
    currency:'brl'
  });

  return NextResponse.json({ products: products.data, prices: prices.data }, { status: 200 });
}
