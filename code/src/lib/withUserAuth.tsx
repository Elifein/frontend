// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../lib/auth-context';
// import { Loader2 } from 'lucide-react';

// interface WithAuthOptions {
//   redirectTo?: string;
//   requireAuth?: boolean;
//   allowedRoles?: string[];
// }

// export default function withAuth<T extends object>(
//   WrappedComponent: React.ComponentType<T>,
//   options: WithAuthOptions = {}
// ) {
//   const {
//     redirectTo = '/apps/login',
//     requireAuth = true,
//     allowedRoles = [],
//   } = options;

//   return function AuthenticatedComponent(props: T) {
//     const router = useRouter();
//     const { user, isAuthenticated, isLoading, logout } = useAuth();
//     const [isAuthorized, setIsAuthorized] = useState(false);

//     useEffect(() => {
//       const checkAuth = async () => {
//         console.log('Checking auth:', { isLoading, isAuthenticated, user });

//         // Wait for loading to complete
//         if (isLoading) {
//           return;
//         }

//         // If authentication is not required, allow access
//         if (!requireAuth) {
//           setIsAuthorized(true);
//           return;
//         }

//         // Check if user is authenticated
//         if (!isAuthenticated || !user) {
//           console.log('No user or not authenticated, redirecting to login');
//           router.replace(redirectTo);
//           return;
//         }

//         // Check token expiration
//         const token = localStorage.getItem('authToken');
//         if (token) {
//           try {
//             const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//             const currentTime = Math.floor(Date.now() / 1000);
//             if (tokenPayload.exp && tokenPayload.exp < currentTime) {
//               console.log('Token expired, logging out');
//               logout();
//               router.replace(redirectTo);
//               return;
//             }
//           } catch (error) {
//             console.error('Error parsing token:', error);
//             logout();
//             router.replace(redirectTo);
//             return;
//           }
//         } else {
//           console.log('No token found, redirecting to login');
//           router.replace(redirectTo);
//           return;
//         }

//         // Check role-based access if roles are specified
//         if (allowedRoles.length > 0 && user.user_role) {
//           if (!allowedRoles.includes(user.user_role)) {
//             console.log('User role not authorized:', user.user_role);
//             router.replace('/unauthorized');
//             return;
//           }
//         }

//         // All checks passed
//         setIsAuthorized(true);
//       };

//       checkAuth();
//     }, [isLoading, isAuthenticated, user, router, redirectTo, requireAuth, allowedRoles, logout]);

//     // Show loading spinner while checking authentication
//     if (isLoading || !isAuthorized) {
//       return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
//             <p className="mt-2 text-sm text-gray-600">Checking authentication...</p>
//           </div>
//         </div>
//       );
//     }

//     // User is authenticated and authorized, render the component
//     return <WrappedComponent {...props} />;
//   };
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context'; // Use the auth context instead of userStore

interface WithAuthOptions {
  redirectTo: string;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export default function withUserAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = { redirectTo: '/apps/login', requireAuth: true }
) {
  return function AuthProtectedComponent(props: P) {
    const { user, token, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      console.log('withUserAuth: Checking auth state', { 
        isLoading, 
        isAuthenticated, 
        hasUser: !!user, 
        hasToken: !!token,
        userRole: user?.user_role
      });

      if (!isLoading) {
        if (options.requireAuth && (!isAuthenticated || !token || !user)) {
          console.log('withUserAuth: Authentication required but not found, redirecting to', options.redirectTo);
          const currentUrl = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
          router.push(`${options.redirectTo}?returnUrl=${encodeURIComponent(currentUrl)}`);
          return;
        }

        // Check role-based access if roles are specified
        if (options.allowedRoles && user && !options.allowedRoles.includes(user.user_role || '')) {
          console.log('withUserAuth: User role not authorized', { 
            userRole: user.user_role, 
            allowedRoles: options.allowedRoles 
          });
          router.push('/unauthorized'); // You might want to create this page
          return;
        }

        console.log('withUserAuth: Authentication valid, rendering component');
        setIsCheckingAuth(false);
      }
    }, [user, token, isLoading, isAuthenticated, router]);

    // Show loading spinner while checking authentication
    if (isLoading || isCheckingAuth) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-center">
            <svg 
              className="animate-spin h-8 w-8 text-[#1a7ec2] mx-auto mb-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // If we're not requiring auth and no auth is present, still render component
    if (!options.requireAuth) {
      return <WrappedComponent {...props} />;
    }

    // Only render if authentication check passed
    return <WrappedComponent {...props} />;
  };
}

// Convenience HOC for pages that require authentication
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => 
  withUserAuth(Component, { redirectTo: '/apps/login', requireAuth: true });

// Convenience HOC for admin-only pages
export const withAdminAuth = <P extends object>(Component: React.ComponentType<P>) => 
  withUserAuth(Component, { 
    redirectTo: '/apps/login', 
    requireAuth: true, 
    allowedRoles: ['admin', 'superadmin'] 
  });

// Convenience HOC for optional authentication (user can be logged in or not)
export const withOptionalAuth = <P extends object>(Component: React.ComponentType<P>) => 
  withUserAuth(Component, { redirectTo: '/apps/login', requireAuth: false });