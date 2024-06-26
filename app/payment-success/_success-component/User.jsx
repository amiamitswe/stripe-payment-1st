"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function User({ sessionId }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch("api/getCustomer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const userData = await res.json();
        console.log(userData);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };

    fetchUserInfo();
  }, [sessionId]);

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
      <h2 className="text-2xl">You Subscription is successful</h2>

      {loading ? (
        <h1 className="text-center my-10">Loading...</h1>
      ) : (
        <>
          <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
            {(user?.session?.amount_total / 100).toLocaleString("en-CA", {
              style: "currency",
              currency: "CAD",
            })}
          </div>
          <p className="mt-5">{user?.user?.name}</p>
          <p className="mb-5">{user?.user?.email}</p>
        </>
      )}

      <Link href="/">Home</Link>
    </>
  );
}

export default User;
