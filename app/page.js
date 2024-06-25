import Link from "next/link";
import Home from "./_home-component/StripeUI";
import Subscription from "./_home-component/Subscription";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Link
        href="/pricing"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10 uppercase"
      >
        Subscription
      </Link>
      {/* <Subscription /> */}
    </main>
  );
}
