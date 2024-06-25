import { NextResponse } from "next/server";

// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";

export async function POST(request) {
  try {
    const { priceId } = await request.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const response = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000",
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
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
