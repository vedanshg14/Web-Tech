'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt?: string;
  lastLogin?: string;
  rideCount: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        const usersData: User[] = [];
        
        for (const userDoc of usersSnapshot.docs) {
          // Get ride count for each user
          const ridesRef = collection(db, 'users', userDoc.id, 'rides');
          const ridesSnapshot = await getDocs(ridesRef);
          
          usersData.push({
            id: userDoc.id,
            email: userDoc.data().email || 'No email',
            displayName: userDoc.data().displayName,
            createdAt: userDoc.data().createdAt,
            lastLogin: userDoc.data().lastLogin,
            rideCount: ridesSnapshot.size
          });
        }
        
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.displayName && user.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="mt-20 px-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">Email</th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">Name</th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">Joined</th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">Last Login</th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">Rides</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{user.email}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{user.displayName || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{user.rideCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;