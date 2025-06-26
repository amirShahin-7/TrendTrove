"use client";

import { useState, useEffect } from "react";
import { Package, DollarSign, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import getUserSession from "@/actions/auth/getUserSession";
import { getOrders } from "@/actions/orders/get-orders";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    lifetimeOrders: 0,
    lifetimeSpent: 0,
    yearlyOrders: 0,
    yearlySpent: 0,
    monthlyOrders: 0,
    monthlySpent: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserSession();
      if (userData) setUser(userData);
      if (!userData) {
        setUser(null);
        setIsLoading(false);
        redirect("/auth?type=login");
      }
      const orders = await getOrders();
      if (orders) {
        let lifetimeOrders = 0;
        let lifetimeSpent = 0;
        let yearlyOrders = 0;
        let yearlySpent = 0;
        let monthlyOrders = 0;
        let monthlySpent = 0;

        orders.items.forEach((order) => {
          const orderDate = new Date(order.createdDate);
          const orderYear = orderDate.getFullYear();
          const orderMonth = orderDate.getMonth() + 1;
          const totalSum = parseFloat(order.totalSum);
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;

          // Lifetime
          lifetimeOrders += 1;
          lifetimeSpent += totalSum;

          // Yearly
          if (orderYear === currentYear) {
            yearlyOrders += 1;
            yearlySpent += totalSum;
          }

          // Monthly
          if (orderYear === currentYear && orderMonth === currentMonth) {
            monthlyOrders += 1;
            monthlySpent += totalSum;
          }
        });

        setStats({
          lifetimeOrders,
          lifetimeSpent,
          yearlyOrders,
          yearlySpent,
          monthlyOrders,
          monthlySpent,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto">
        <span className="text-4xl font-bold inline-block  mb-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
          My Profile
        </span>

        {isLoading ? (
          <div className="flex items-center justify-center pt-7">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <>
            <div className="bg-gray-2 border-2 p-6 rounded-lg shadow-lg mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24 text-6xl text-purple-500">
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 text-gray-200">
                    {user?.formData && user.formData[0]?.value?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    {user?.formData && user.formData[0]?.value}
                  </h2>
                  <p className="text-gray-500">{user?.identifier}</p>
                </div>
              </div>
            </div>

            <div className="border-2 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                My Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={<Package className="h-8 w-8 text-purple-500" />}
                  title="Lifetime Orders"
                  value={stats.lifetimeOrders}
                />
                <StatCard
                  icon={<DollarSign className="h-8 w-8 text-purple-500" />}
                  title="Lifetime Spent"
                  value={`$${stats.lifetimeSpent.toFixed(2)}`}
                />
                <StatCard
                  icon={<Calendar className="h-8 w-8 text-purple-500" />}
                  title="This Year"
                  value={`${stats.yearlyOrders} orders`}
                  subvalue={`$${stats.yearlySpent.toFixed(2)} spent`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function StatCard(props) {
  const { icon, title, value, subvalue } = props;
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
      {icon}
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
          {value}
        </p>
        {subvalue && <p className="text-sm text-gray-700">{subvalue}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
