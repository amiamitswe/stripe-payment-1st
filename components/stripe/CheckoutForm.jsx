"use client";
import { calculateOrderAmount } from "@/utils/helper";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: calculateOrderAmount(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(e);

    if (!stripe && !elements && !clientSecret) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  console.log(clientSecret);

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <form onSubmit={onSubmitHandler}>
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
        <button
          disabled={!stripe || isLoading}
          type="submit"
          className="mt-4 w-full text-center rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-5"
        >
          {!isLoading ? `Pay $${amount}` : "Processing..."}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
