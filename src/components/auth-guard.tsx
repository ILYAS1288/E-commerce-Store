'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';

const publicRoutes = ['/login'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { auth, initialized } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    if (publicRoutes.includes(pathname)) {
      if (auth) {
        router.replace('/');
      }
      return;
    }

    if (!auth) {
      router.replace('/login');
    }
  }, [auth, initialized, pathname, router]);

  if (!initialized) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!auth && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
