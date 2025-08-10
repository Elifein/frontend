'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '../lib/Zustand';
import { Loader2 } from 'lucide-react';

interface WithAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  options: WithAuthOptions = {}
) {
  const {
    redirectTo = '/',
    requireAuth = true,
    allowedRoles = []
  } = options;

  return function AuthenticatedComponent(props: T) {
    const router = useRouter();
    const { token, user, logout } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // If authentication is not required, allow access
          if (!requireAuth) {
            setIsAuthorized(true);
            setIsLoading(false);
            return;
          }

          // Check if user is authenticated
          if (!token || !user) {
            console.log('No token or user found, redirecting to login');
            router.replace(redirectTo);
            return;
          }

          // Check if token is expired (if your token has exp field)
          try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            
            if (tokenPayload.exp && tokenPayload.exp < currentTime) {
              console.log('Token expired, logging out');
              logout();
              router.replace(redirectTo);
              return;
            }
          } catch (error) {
            console.error('Error parsing token:', error);
            logout();
            router.replace(redirectTo);
            return;
          }

          // Check role-based access if roles are specified
          if (allowedRoles.length > 0 && user.role) {
            if (!allowedRoles.includes(user.role)) {
              console.log('User role not authorized:', user.role);
              router.replace('/unauthorized'); // You might want to create this page
              return;
            }
          }

          // All checks passed
          setIsAuthorized(true);
        } catch (error) {
          console.error('Auth check error:', error);
          logout();
          router.replace(redirectTo);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [token, user, router, redirectTo, requireAuth, allowedRoles, logout]);

    // Show loading spinner while checking authentication
    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-600">Checking authentication...</p>
          </div>
        </div>
      );
    }

    // If not authorized, don't render the component (redirect is handled in useEffect)
    if (!isAuthorized) {
      return null;
    }

    // User is authenticated and authorized, render the component
    return <WrappedComponent {...props} />;
  };
}