'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { normalizeLocation } from '@/utils/locationUtils';

interface StatsData {
  totalUsers: number;
  totalRides: number;
  pendingRides: number;
  approvedRides: number;
  rejectedRides: number;
  underReviewRides: number;
  popularDestinations: { [key: string]: number };
  popularPickups: { [key: string]: number };
  ridesPerDay: { [key: string]: number };
}

const Statistics = () => {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalRides: 0,
    pendingRides: 0,
    approvedRides: 0,
    rejectedRides: 0,
    underReviewRides: 0,
    popularDestinations: {},
    popularPickups: {},
    ridesPerDay: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get users count
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const totalUsers = usersSnapshot.size;
        
        // Initialize stats
        let totalRides = 0;
        let pendingRides = 0;
        let approvedRides = 0;
        let rejectedRides = 0;
        let underReviewRides = 0;
        const popularDestinations: { [key: string]: number } = {};
        const popularPickups: { [key: string]: number } = {};
        const ridesPerDay: { [key: string]: number } = {};
        
        // For each user, get their rides
        for (const userDoc of usersSnapshot.docs) {
          const ridesRef = collection(db, 'users', userDoc.id, 'rides');
          const ridesSnapshot = await getDocs(ridesRef);
          
          totalRides += ridesSnapshot.size;
          
          // Process each ride
          // Inside the fetchStats function, when processing destinations and pickups:
          ridesSnapshot.docs.forEach(doc => {
            const ride = doc.data();
            
            // Count by status
            if (ride.status === 'pending') pendingRides++;
            else if (ride.status === 'approved') approvedRides++;
            else if (ride.status === 'rejected') rejectedRides++;
            else if (ride.status === 'under_review') underReviewRides++;
            
            // Count destinations with normalization
            if (ride.destination) {
              const normalizedDestination = normalizeLocation(ride.destination);
              popularDestinations[normalizedDestination] = (popularDestinations[normalizedDestination] || 0) + 1;
            }
            
            // Count pickup locations with normalization
            if (ride.pickUpLocation) {
              const normalizedPickup = normalizeLocation(ride.pickUpLocation);
              popularPickups[normalizedPickup] = (popularPickups[normalizedPickup] || 0) + 1;
            }
            
            // Count rides per day
            if (ride.createdAt) {
              const date = new Date(ride.createdAt).toLocaleDateString();
              ridesPerDay[date] = (ridesPerDay[date] || 0) + 1;
            }
          });
        }
        
        setStats({
          totalUsers,
          totalRides,
          pendingRides,
          approvedRides,
          rejectedRides,
          underReviewRides,
          popularDestinations,
          popularPickups,
          ridesPerDay
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  // Sort destinations and pickups by popularity
  const sortedDestinations = Object.entries(stats.popularDestinations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const sortedPickups = Object.entries(stats.popularPickups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Sort rides per day chronologically
  const sortedRidesPerDay = Object.entries(stats.ridesPerDay)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .slice(-14); // Last 14 days

  return (
    <div className="mt-20 px-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Statistics</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Rides</h3>
          <p className="text-3xl font-bold">{stats.totalRides}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Rides</h3>
          <p className="text-3xl font-bold">{stats.pendingRides}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Approved Rides</h3>
          <p className="text-3xl font-bold">{stats.approvedRides}</p>
        </div>
      </div>
      
      {/* Popular Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
          <ul className="space-y-2">
            {sortedDestinations.map(([destination, count]) => (
              <li key={destination} className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">{destination}</span>
                <span className="font-semibold">{count} rides</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Popular Pickup Locations</h3>
          <ul className="space-y-2">
            {sortedPickups.map(([location, count]) => (
              <li key={location} className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">{location}</span>
                <span className="font-semibold">{count} rides</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Rides Per Day */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Rides Per Day (Last 14 Days)</h3>
        <div className="h-64 flex items-end space-x-2">
          {sortedRidesPerDay.map(([date, count]) => {
            const maxHeight = 200; // max bar height in pixels
            const maxCount = Math.max(...sortedRidesPerDay.map(item => item[1]));
            const height = maxCount > 0 ? (count / maxCount) * maxHeight : 0;
            
            return (
              <div key={date} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-blue-500 w-full rounded-t" 
                  style={{ height: `${height}px` }}
                ></div>
                <div className="text-xs mt-2 transform -rotate-45 origin-top-left">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;