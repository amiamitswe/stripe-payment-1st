import Link from "next/link";
import Home from "./_home-component/StripeUI";
import Subscription from "./_home-component/Subscription";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
          <Link href="/pricing">Subscription</Link>
     <Subscription />
    </main>
  );
}
