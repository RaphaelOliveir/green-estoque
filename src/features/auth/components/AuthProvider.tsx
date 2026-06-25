'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(setCredentials({ user, access_token: token }));
        } catch {
          console.error('Failed to parse user from local storage');
        }
      }
      setIsLoaded(true);
    };
    init();
  }, [dispatch]);

  if (!isLoaded) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}
