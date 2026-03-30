import { useEffect, type ReactNode } from 'react';
import { useAuth } from '@/providers/AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
  allowGuest?: boolean;
}

export function ProtectedRoute({ children, allowGuest = false }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, isGuest } = useAuth();
  const shouldRedirectToSignIn =
    !isLoading && ((!isAuthenticated && !isGuest) || (isGuest && !allowGuest));

  useEffect(() => {
    if (shouldRedirectToSignIn) {
      window.location.hash = '#/sign-in';
    }
  }, [shouldRedirectToSignIn]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: '28px',
            height: '28px',
            border: '3px solid var(--color-gray-200)',
            borderTopColor: 'var(--color-primary)',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    );
  }

  if (shouldRedirectToSignIn) {
    return null;
  }

  return <>{children}</>;
}
