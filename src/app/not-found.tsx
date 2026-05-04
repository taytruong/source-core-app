import Link from "next/link";
import React from "react";

const IconComeback = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  </svg>
);
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-7xl">404</h1>
      <h2 className="mb-5">Page not found</h2>
      <Link href="/" className="flex items-center gap-2 hover:text-primary">
        {IconComeback}
        Trang chủ
      </Link>
    </div>
  );
};

export default PageNotFound;
