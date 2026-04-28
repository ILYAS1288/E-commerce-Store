'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'user' | 'admin';

export interface AuthState {
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  auth: AuthState | null;
  initialized: boolean;
  login: (user: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('shop-ease-auth');
    if (stored) {
      try {
        setAuth(JSON.parse(stored));
      } catch {
        localStorage.removeItem('shop-ease-auth');
      }
    }
    setInitialized(true);
  }, []);

  const login = (user: AuthState) => {
    localStorage.setItem('shop-ease-auth', JSON.stringify(user));
    setAuth(user);
  };

  const logout = () => {
    localStorage.removeItem('shop-ease-auth');
    setAuth(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, initialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
