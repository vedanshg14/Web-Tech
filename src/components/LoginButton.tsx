'use client';

import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from './AuthContext';

interface LoginButtonProps {
  onClick?: (signInFunction: () => Promise<void>) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (onClick) {
      // Pass the signInWithGoogle function to the onClick handler
      onClick(async () => {
        setIsLoading(true);
        try {
          await signInWithGoogle();
        } catch (error) {
          console.error('Login failed:', error);
        } finally {
          setIsLoading(false);
        }
      });
      return;
    }

    // Default login flow if no onClick provided
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-full transition-colors"
    >
      {isLoading ? (
        <span className="animate-spin">⟳</span>
      ) : (
        <>
          <FaGoogle className="text-white" />
          <span>Login</span>
        </>
      )}
    </button>
  );
};

export default LoginButton;