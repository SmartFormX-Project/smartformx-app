// import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret =
  "whsec_bd43d44f803321684de7b3929c3f7f4f4714ef1972de180df28e51d7e454075b";
import prisma from "@/config/prisma";

export async function POST(req: Request) {
  
  console.log("receive something");
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);

    switch (event.type) {
      // case "customer.subscription.paused":
      //   const customerSubscriptionPaused = event.data.object;
      //   console.log("pause app account");
      //   console.log(customerSubscriptionPaused);
      //   // Then define and call a function to handle the event customer.subscription.paused
      //   break;
      case "customer.subscription.deleted" || "customer.subscription.paused":
        const customerSubscriptionPaused = event.data.object;
        const _customer_id = customerSubscriptionPaused.customer;
        console.log(customerSubscriptionPaused);

        const pis =
          (
            customerSubscriptionPaused.latest_invoice as {
              payment_intent: { status: string };
            }
          ).payment_intent.status ?? "";

        if (_customer_id)
          await prisma.user.update({
            where: { stripeCustomerId: _customer_id.toString() },
            data: {
              subscribeStatus: customerSubscriptionPaused.status,
              paymentIntentStatus: pis,
            },
          });
        // console.log(customerSubscriptionPaused);
        break;

      case "customer.subscription.updated":
        console.log("update subscription");
        const customerSubscriptionUpdated = event.data.object;
        const { customer, status } = customerSubscriptionUpdated;

        const customer_id = customer.toString();

        const plan = await stripe.products.retrieve(
          (customerSubscriptionUpdated as any).plan.product
        );

        // const invoices = await stripe.invoices.retrieve(
        //   customerSubscriptionUpdated.latest_invoice?.toString()!
        // );

        // console.log(invoices);

        // const intentStatus =
        //   (latest_invoice as { payment_intent: { status: string } })
        //     .payment_intent.status ?? "";

        if (customer_id)
          await prisma.user.update({
            where: { stripeCustomerId: customer_id },
            data: {
              subscribeStatus: status,
              metadata: plan.metadata,
              // paymentIntentStatus: invoices.status,
            },
          });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ received: true });
}
