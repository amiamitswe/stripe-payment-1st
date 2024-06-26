import { NextResponse } from "next/server";

// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";

export async function POST(request) {
  try {
    const { priceId } = await request.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const response = await stripe.checkout.sessions.create({
      success_url:
        "http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000",

      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 },
        },
      ],
      customer: "cus_QMYdIWOrIclTzW",
    });
    return NextResponse.json({ data: response, status: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      error: error,
      status: false,
    });
  }
}
