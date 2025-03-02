"use client";
import Link from "next/link";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-bg">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700 mt-2">Thank you for your purchase.</p>
      <Link href="/" className="mt-4 px-6 py-2 bg-yellow text-black rounded-lg">
        Go Back to Store
      </Link>
    </div>
  );
};

export default Success;
