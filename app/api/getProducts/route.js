import { NextResponse } from "next/server";

// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";

export async function GET(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({ limit: 10 });

    return NextResponse.json({ data: prices.data, status: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      error: error,
      status: false,
    });
  }
}
