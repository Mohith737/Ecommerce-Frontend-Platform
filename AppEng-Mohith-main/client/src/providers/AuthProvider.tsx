/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUserProfile, login, register, type UserOut } from '@/api-sdk';

interface AuthContextType {
  user: UserOut | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserOut | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const profile = await getUserProfile();
          setUser(profile);
          setIsGuest(false);
          return;
        }

        if (localStorage.getItem('shophub_guest') === 'true') {
          setIsGuest(true);
        }
      } catch {
        localStorage.removeItem('access_token');
        setUser(null);
        setIsGuest(false);
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, []);

  const signUp = async (fullName: string, email: string, password: string) => {
    const token = await register({ full_name: fullName, email, password });
    localStorage.setItem('access_token', token.access_token);
    localStorage.removeItem('shophub_guest');
    const profile = await getUserProfile();
    setUser(profile);
    setIsGuest(false);
  };

  const signIn = async (email: string, password: string) => {
    const token = await login({ email, password });
    localStorage.setItem('access_token', token.access_token);
    localStorage.removeItem('shophub_guest');
    const profile = await getUserProfile();
    setUser(profile);
    setIsGuest(false);
  };

  const signOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('shophub_guest');
    setUser(null);
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    localStorage.setItem('shophub_guest', 'true');
    localStorage.removeItem('access_token');
    setUser(null);
    setIsGuest(true);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isGuest,
      isAuthenticated: user !== null,
      isLoading,
      signUp,
      signIn,
      signOut,
      continueAsGuest,
    }),
    [user, isGuest, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
