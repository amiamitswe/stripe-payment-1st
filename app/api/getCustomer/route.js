import { NextResponse } from "next/server";

// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";

export async function POST(request) {
  const { session_id } = await request.json();

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const customer = await stripe.customers.retrieve(session.customer);
    return NextResponse.json({
      status: true,
      user: customer,
      session: session,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      error: error,
      status: false,
    });
  }
}
