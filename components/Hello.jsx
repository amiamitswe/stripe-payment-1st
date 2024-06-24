// "use client";
// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import React, { useEffect, useState } from "react";

// function CheckoutForm({ amount }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [amount]);

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     console.log(e);
//   };

//   console.log(clientSecret);

//   return (
//     <div className="w-full">
//       <form className="max-w-4xl">
//         {/* {clientSecret && <PaymentElement />} */}
//         <PaymentElement />
//         <button
//           type="submit"
//           className="w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Pay
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CheckoutForm;