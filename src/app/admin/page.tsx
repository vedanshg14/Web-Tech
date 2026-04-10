'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { isUserAdmin } from '@/lib/adminAuth';
import AdminDashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isUserAdmin(user.email))) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isUserAdmin(user.email)) {
    return null;
  }

  return <AdminDashboard />;
}