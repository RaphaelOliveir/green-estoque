'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
    };
    check();
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F0F1F3]">
        <span className="text-sm text-[#858D9D]">Redirecionando...</span>
      </div>
    );
  }

  return <>{children}</>;
}
