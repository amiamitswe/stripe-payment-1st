import React from "react";

function Price({ price }) {
  const subscriptionHandler = async (e) => {
    e.preventDefault();
    const subsInfo = {
      priceId: price.id,
    };
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...subsInfo}),
    });

    const response = await res.json()

    console.log(response);
    window.location.assign(response.data.url)
  };
  return (
    <div class="rounded-3xl bg-white/5 p-8 ring-2 ring-indigo-500 xl:p-10">
      <div class="flex items-center justify-between gap-x-4">
        <h2
          id="tier-startup"
          class="text-lg font-semibold leading-8 text-white"
        >
          {price?.nickname}
        </h2>
      </div>
      <p class="mt-4 text-sm leading-6 text-gray-300">
        A plan that scales with your rapidly growing business.
      </p>
      <p class="mt-6 flex items-baseline gap-x-1">
        {(price?.unit_amount / 100).toLocaleString("en-CA", {
          style: "currency",
          currency: "CAD",
        })}
      </p>
      <button
        onClick={subscriptionHandler}
        aria-describedby="tier-startup"
        class="mt-6 block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Buy plan
      </button>
    </div>
  );
}

export default Price;
