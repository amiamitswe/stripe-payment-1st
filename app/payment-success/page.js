import User from "./_success-component/User";

export default function PaymentSuccess({
  searchParams: { amount, session_id },
}) {
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <User sessionId={session_id} />
    </main>
  );
}
