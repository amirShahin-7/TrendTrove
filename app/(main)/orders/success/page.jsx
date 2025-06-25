"use client";

import { CheckCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-pink-50">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border-4 border-green-200">
        <div className="text-center mb-8">
          <CheckCheckIcon className="w-20 h-20 text-green-500 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-green-600 mb-2">
            Payment Complete!
          </h1>
          <p className="text-gray-600 text-lg">
            Your order was placed successfully and is being processed.
          </p>
        </div>
        <div className="text-center space-y-4">
          <p className="text-gray-500 pb-5 font-medium">
            Thank you for shopping with us! 🎉
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 hover:from-green-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-md transition-all duration-300">
              Shop More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
