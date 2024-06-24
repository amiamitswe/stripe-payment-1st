import Home from "./_home-component/StripeUI";
import Subscription from "./_home-component/Subscription";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
     <Subscription />
    </main>
  );
}
