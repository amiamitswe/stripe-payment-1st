"use client";
import React, { useState } from "react";
import Home from "./StripeUI";

const Feature = ({ text, notAllow }) => (
  <li className="flex items-center mb-2">
    <svg
      className={`w-6 h-6 text-${notAllow ? "red" : "green"}-500 mr-2`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 11.586 7.707 10.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
        clipRule="evenodd"
      />
    </svg>
    <p className={`${notAllow ? "line-through text-red-500" : ""}`}>{text}</p>
  </li>
);

export default function Subscription() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  return (
    <div className="bg-gray-900 w-full text-gray-100 flex flex-col justify-center items-center">
      {selectedAmount ? (
        <div className="w-full px-24">
          <Home amount={selectedAmount} />
        </div>
      ) : (
        <div className="w-2/3 mx-auto px-10">
          <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>
          <div className="flex space-x-8 ">
            <div className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Standard</h2>
              <p className="text-gray-400 mb-4">$10/month</p>
              <ul className="mb-4">
                <Feature text="Feature 1" />
                <Feature text="Feature 2" />
                <Feature text="Feature 3" notAllow />
              </ul>
              <button
                onClick={(e) => setSelectedAmount(10)}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Subscribe
              </button>
            </div>

            <div className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Pro</h2>
              <p className="text-gray-400 mb-4">$20/month</p>
              <ul className="mb-4">
                <Feature text="Feature 1" />
                <Feature text="Feature 2" />
                <Feature text="Feature 3" />
              </ul>
              <button
                onClick={(e) => setSelectedAmount(20)}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
