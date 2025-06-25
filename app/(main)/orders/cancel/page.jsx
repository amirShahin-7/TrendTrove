"use client";

import { XSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderCanceled() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-pink-50">
      <div className="max-w-md w-full bg-white border-4 border-red-200 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <XSquareIcon className="w-20 h-20 text-red-500 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-red-600 mb-2">
            Order Cancelled
          </h1>
          <p className="text-gray-600 text-lg">
            Your order has been cancelled. If this was a mistake, please try
            again.
          </p>
        </div>
        <div className="text-center space-y-4">
          <Link href="/" passHref>
            <Button className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 hover:from-red-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-md transition-all duration-300">
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
