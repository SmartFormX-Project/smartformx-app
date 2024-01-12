
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req: NextRequest, res: any) {

   // Set CORS headers
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
   // Handle preflight requests
   if (req.method === 'OPTIONS') {
     res.status(200).end();
     return;
   }

   
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
