'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useStore from './Zustand';

type AuthOptions = {
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
};

const excludedComponents = ['Navbar'];

export default function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: AuthOptions = { requireAuth: true }
) {
  if (
    excludedComponents.includes(Component.displayName || Component.name || '')
  ) {
    return Component;
  }

  return function AuthProtected(props: P) {
    const { role, exp, isAuthenticated, checkAuth } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    // Set the correct auth route
    const authRoute = '/';
    const unauthorizedRoute = '/unauthorized';

    useEffect(() => {
      checkAuth();
      setLoading(false);
    }, [checkAuth]);

    useEffect(() => {
      console.log('Checking auth...');
      console.log('isAuthenticated:', isAuthenticated);
      console.log('role:', role);
      console.log('allowedRoles:', options.allowedRoles);

      if (loading) return;

      const isTokenExpired = exp && exp * 1000 < Date.now();

      if (!isAuthenticated) {
        console.log('User not authenticated. Redirecting to:', authRoute);
        router.replace(authRoute);
        return;
      }

      if (options.requireAuth && isTokenExpired) {
        console.log('Token expired. Redirecting to:', authRoute);
        router.replace(authRoute);
        return;
      }

      if (
        options.allowedRoles &&
        (!role || !options.allowedRoles.includes(role))
      ) {
        console.log('Unauthorized access. Redirecting to:', unauthorizedRoute);
        router.replace(unauthorizedRoute);
        return;
      }
    }, [
      isAuthenticated,
      role,
      exp,
      router,
      pathname,
      loading,
      authRoute,
      unauthorizedRoute,
    ]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
