import Link from "next/link";
import React from "react";

const NavL = ({ title, url }) => (
  <Link
    href={url}
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10 uppercase"
  >
    {title}
  </Link>
);

function Navbar() {
  return (
    <div className="flex gap-4">
      <NavL url="/pricing" title="Subscription" />
      <NavL url="/video" title="Video Convert" />
    </div>
  );
}

export default Navbar;
