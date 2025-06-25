"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  XSquareIcon,
} from "lucide-react";
import { getOrders } from "@/actions/orders/get-orders";
import { useRouter } from "next/navigation";

const orderStatusIcons = {
  processing: <Package className="w-5 h-5 text-yellow-500" />,
  shipped: <Truck className="w-5 h-5 text-blue-500" />,
  delivered: <CheckCircle className="w-5 h-5 text-green-500" />,
  cancelled: <AlertCircle className="w-5 h-5 text-red-500" />,
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      if (data !== undefined)
        setOrders({ items: data.items.reverse(), total: data.total });
      else setOrders({ total: 0, items: [] });
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Your Orders
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center pt-7">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <>
            {orders?.items?.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border-4 border-purple-100 hover:shadow-2xl transition-shadow"
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-700">
                      Order #{order.id}
                    </h2>
                    <Badge className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1 rounded-full text-base font-semibold shadow">
                      {orderStatusIcons[order.statusIdentifier]}
                      <span className="capitalize">
                        {order.statusIdentifier}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex justify-between text-gray-500 mb-4">
                    <span>
                      Order Date:{" "}
                      <span className="font-semibold text-purple-600">
                        {order.createdDate.split("T").shift()}
                      </span>
                    </span>
                    <span>
                      Total:{" "}
                      <span className="font-semibold text-pink-600">
                        ${order.totalSum}
                      </span>
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-4 mt-4">
                        {order.products.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-1">
                              <h3 className="font-semibold text-purple-600">
                                {item.title}
                              </h3>
                              <p className="text-gray-400">
                                Quantity:{" "}
                                <span className="font-semibold text-pink-500">
                                  {item.quantity}
                                </span>
                              </p>
                            </div>
                            <span className="text-pink-600 font-bold text-lg">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {!isLoading && orders?.total === 0 && (
          <div className="text-center py-16 border-4 border-purple-100 rounded-2xl bg-white shadow-xl mt-12">
            <XSquareIcon className="mx-auto h-20 w-20 text-red-400 mb-6" />
            <h2 className="text-3xl font-bold mb-2 text-purple-600">
              No Orders Yet
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              You haven't placed any orders yet. Start shopping and enjoy our
              latest products!
            </p>
            <Button
              className="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 hover:from-green-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-md transition-all duration-300"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
