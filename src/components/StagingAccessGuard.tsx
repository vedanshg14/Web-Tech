"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { isExecutiveTeamMember } from "@/lib/stagingAuth";

interface StagingAccessGuardProps {
  children: React.ReactNode;
}

export default function StagingAccessGuard({
  children,
}: StagingAccessGuardProps) {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isStaging, setIsStaging] = useState(false);

  // Check if we're in the staging environment
  useEffect(() => {
    // This checks if we're on the staging domain
    const hostname = window.location.hostname;
    setIsStaging(hostname.includes("staging") || hostname.includes("preview"));
  }, []);

  // If not in staging, render children normally
  if (!isStaging) {
    return <>{children}</>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in or not an executive team member, show access denied
  if (!user || !isExecutiveTeamMember(user.email)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Restricted Access
            </h1>
            <p className="text-gray-600 mb-6">
              This is a staging environment for executive team review only.
            </p>
            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Sign in with Google
              </button>
            ) : (
              <p className="text-red-600">
                Your account does not have access to this staging environment.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If user is an executive team member, render children
  return <>{children}</>;
}
