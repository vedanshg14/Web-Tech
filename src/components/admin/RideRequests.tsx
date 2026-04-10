'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface RideRequest {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pickUpLocation: string;
  travelTime: string;
  destination: string;
  numberOfPassengers: string;
  preferredModeOfTravel: string;
  travelDate: string;
  status: string;
  createdAt: string;
  userId: string;
  userEmail: string;
}

const ITEMS_PER_PAGE = 20;

type StatusType = 'all' | 'pending' | 'approved' | 'rejected' | 'under_review' | 'in_consideration';

interface Stats {
  all: number;
  pending: number;
  approved: number;
  rejected: number;
  under_review: number;
  in_consideration: number;
}

const RideRequests = () => {
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<StatusType>('all');
  const [stats, setStats] = useState<Stats>({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    under_review: 0,
    in_consideration:0,
  });

  // Move the stats calculation into the main useEffect
  useEffect(() => {
    const fetchAllRides = async () => {
      try {
        // Get all users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        const allRides: RideRequest[] = [];
        
        // For each user, get their rides
        for (const userDoc of usersSnapshot.docs) {
          const ridesRef = collection(db, 'users', userDoc.id, 'rides');
          const ridesSnapshot = await getDocs(ridesRef);
          
          const userRides = ridesSnapshot.docs.map(doc => ({
            id: doc.id,
            userId: userDoc.id,
            ...doc.data()
          })) as RideRequest[];
          
          allRides.push(...userRides);
        }
        
        // Sort by creation date
        const sortedRides = allRides.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setRides(sortedRides);
        
        // Calculate stats
        const newStats = sortedRides.reduce((acc: Stats, ride) => {
          if (ride.status in acc) {
            acc[ride.status as keyof Stats]++;
          }
          acc.all++;
          return acc;
        }, {
          all: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
          under_review: 0,
          in_consideration:0,
        });
        
        setStats(newStats);
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRides();
  }, []);

  // Remove the second useEffect that was here

  const updateRideStatus = async (userId: string, rideId: string, newStatus: string) => {
    try {
      const rideRef = doc(db, 'users', userId, 'rides', rideId);
      await updateDoc(rideRef, {
        status: newStatus
      });
      
      // Update rides and recalculate stats
      const updatedRides = rides.map(ride => 
        ride.id === rideId ? { ...ride, status: newStatus } : ride
      );
      
      setRides(updatedRides);
      
      // Reset to first page when status changes
      setCurrentPage(1);
      
    } catch (error) {
      console.error('Error updating ride status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  // Remove the duplicate useEffect here
  
  // Filter and paginate rides
  const filteredRides = rides.filter(ride => 
    filterStatus === 'all' ? true : ride.status === filterStatus
  );

  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-20 px-6">
      {" "}
      {/* Added margin-top */}
      {/* Stats and Filters */}
      <div className="mb-6 grid grid-cols-6 gap-2">
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
          onClick={() => setFilterStatus("approved")}
          className={`p-2 px-1 rounded-lg ${
            filterStatus === "approved"
              ? "bg-green-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Approved ({stats.approved})
        </button>
        <button
          onClick={() => setFilterStatus("rejected")}
          className={`p-2 px-1 rounded-lg ${
            filterStatus === "rejected"
              ? "bg-red-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Rejected ({stats.rejected})
        </button>
        <button
          onClick={() => setFilterStatus("under_review")}
          className={`p-2 px-1 rounded-lg ${
            filterStatus === "under_review"
              ? "bg-blue-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          Under Review ({stats.under_review})
        </button>

        <button
          onClick={() => setFilterStatus("in_consideration")}
          className={`p-2 px-1 rounded-lg text-sm ${
            filterStatus === "in_consideration"
              ? "bg-indigo-100"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          In Consideration ({stats.in_consideration})
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 w-[15%]">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 w-[15%]">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 w-[15%]">
                Route
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 w-[20%]">
                Travel Details
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 w-[12.5%]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 w-[12.5%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {paginatedRides.map((ride) => (
              <tr
                key={ride.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {ride.firstName} {ride.lastName}
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 dark:text-gray-100">
                    {ride.phoneNumber}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {ride.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 dark:text-gray-100">
                    From: {ride.pickUpLocation}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100 mt-2">
                    To: {ride.destination}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 dark:text-gray-100">
                    Date: {new Date(ride.travelDate).toLocaleDateString()}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    Travel Time: {ride.travelTime}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    Passengers: {ride.numberOfPassengers}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    Mode: {ride.preferredModeOfTravel}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      ride.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : ride.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : ride.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : ride.status === "under_review"
                        ? "bg-blue-100 text-blue-800"
                        : ride.status === "in_consideration"
                        ? "bg-indigo-100 text-violet-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {ride.status === "under_review"
                      ? "Under Review"
                      : ride.status.charAt(0).toUpperCase() +
                        ride.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={ride.status}
                    onChange={(e) =>
                      updateRideStatus(ride.userId, ride.id, e.target.value)
                    }
                    className="rounded border p-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="under_review">Under Review</option>
                    <option value="in_consideration">In Consideration</option>
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
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredRides.length)} of{" "}
          {filteredRides.length} results
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

export default RideRequests;