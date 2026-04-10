"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BikesOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  numberOfVehicles: number;
  date: string;
  time: string;
  notes?: string;
  status: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

type StatusType = "all" | "pending" | "confirmed" | "completed" | "cancelled";

interface Stats {
  all: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

const BikesOrders = () => {
  const [orders, setOrders] = useState<BikesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<StatusType>("all");
  const [stats, setStats] = useState<Stats>({
    all: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "bikesOrders");
        const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"));
        const ordersSnapshot = await getDocs(ordersQuery);

        const fetchedOrders = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt:
            doc.data().createdAt?.toDate?.() || new Date().toISOString(),
        })) as BikesOrder[];

        setOrders(fetchedOrders);

        // Calculate stats
        const newStats = fetchedOrders.reduce(
          (acc: Stats, order) => {
            if (order.status in acc) {
              acc[order.status as keyof Stats]++;
            }
            acc.all++;
            return acc;
          },
          {
            all: 0,
            pending: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
          }
        );

        setStats(newStats);
      } catch (error) {
        console.error("Error fetching bikes orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "bikesOrders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });

      // Update orders and recalculate stats
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      setOrders(updatedOrders);

      // Recalculate stats
      const newStats = updatedOrders.reduce(
        (acc: Stats, order) => {
          if (order.status in acc) {
            acc[order.status as keyof Stats]++;
          }
          acc.all++;
          return acc;
        },
        {
          all: 0,
          pending: 0,
          confirmed: 0,
          completed: 0,
          cancelled: 0,
        }
      );

      setStats(newStats);

      // Reset to first page when status changes
      setCurrentPage(1);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Filter and paginate orders
  const filteredOrders = orders.filter((order) =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-20 px-6">
      {/* Stats and Filters */}
      <div className="mb-6 grid grid-cols-5 gap-2">
        <button
          onClick={() => setFilterStatus("all")}
          className={`p-2 px-1 rounded-lg text-sm ${
            filterStatus === "all"
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          All ({stats.all})
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`p-2 px-1 rounded-lg text-sm ${
            filterStatus === "pending"
              ? "bg-yellow-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Pending ({stats.pending})
        </button>
        <button
          onClick={() => setFilterStatus("confirmed")}
          className={`p-2 px-1 rounded-lg ${
            filterStatus === "confirmed"
              ? "bg-green-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Confirmed ({stats.confirmed})
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`p-2 px-1 rounded-lg ${
            filterStatus === "completed"
              ? "bg-blue-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Completed ({stats.completed})
        </button>
        <button
          onClick={() => setFilterStatus("cancelled")}
          className={`p-2 px-1 rounded-lg ${
            filterStatus === "cancelled"
              ? "bg-red-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                Vehicle Type
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                Rental Details
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                Status
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {order.name}
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 dark:text-gray-100">
                    {order.phone}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {order.vehicleType}
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 dark:text-gray-100">
                    Date: {order.date}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    Time: {order.time}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    Vehicles: {order.numberOfVehicles}
                  </div>
                  {order.notes && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Notes: {order.notes.substring(0, 50)}
                      {order.notes.length > 50 ? "..." : ""}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="rounded border p-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
          {filteredOrders.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikesOrders;
