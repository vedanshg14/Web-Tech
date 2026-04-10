"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import RideRequests from "./RideRequests";
import Users from "./Users";
import Statistics from "./Statistics";
import BlogManager from "./BlogManager";
import EatsOrders from "./EatsOrders";
import BikesOrders from "./BikesOrders";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rides");

  // Redirect if not admin
  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, adminLoading, router]);

  if (adminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user?.email}
          </p>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab("rides")}
            className={`w-full p-4 text-left ${
              activeTab === "rides" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Ride Requests
          </button>
          <button
            onClick={() => setActiveTab("eats")}
            className={`w-full p-4 text-left ${
              activeTab === "eats" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Eats Orders
          </button>
          <button
            onClick={() => setActiveTab("bikes")}
            className={`w-full p-4 text-left ${
              activeTab === "bikes" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Bikes Orders
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full p-4 text-left ${
              activeTab === "users" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`w-full p-4 text-left ${
              activeTab === "stats" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full p-4 text-left ${
              activeTab === "blogs" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Blog Management
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === "rides" && <RideRequests />}
        {activeTab === "eats" && <EatsOrders />}
        {activeTab === "bikes" && <BikesOrders />}
        {activeTab === "users" && <Users />}
        {activeTab === "stats" && <Statistics />}
        {activeTab === "blogs" && <BlogManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
