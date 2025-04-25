"use client";

import Button from "@/components/utils/Button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-main mb-4 text-primary">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button text="Go Back Home" />
      </Link>
    </div>
  );
};

export default ErrorPage;
