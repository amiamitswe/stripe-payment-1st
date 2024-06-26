"use client";
import React, { useEffect, useState } from "react";
import Price from "./Price";

function Pricing() {
  const [price, setPrice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPricingData = async () => {
      setErrorMessage(null);
      setLoading(true);
      try {
        const res = await fetch("api/getProducts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        setPrice(result?.data);

        console.log(result);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
        setLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  return (
    <div class="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-base font-semibold leading-7 text-indigo-400">
          Pricing
        </h1>
        <p class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Pricing plans for teams of&nbsp;all&nbsp;sizes
        </p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Choose an affordable plan that’s packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>

      <div className="mt-10">
        {errorMessage ? (
          <p className="text-red-700 text-center">{errorMessage}</p>
        ) : loading ? (
          <h1 className="text-center text-lg">Loading...</h1>
        ) : (
          <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 pb-10">
            {price?.length > 0 &&
              price?.map((item) => <Price key={item?.id} price={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pricing;
