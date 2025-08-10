// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { userApi } from '../lib/axiosInstance';

// interface User {
//   user_id: string;
//   user_firstname?: string;
//   user_lastname?: string;
//   user_email: string;
//   user_role?: string;
//   status: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   register: (userData: {
//     user_firstname: string;
//     user_lastname: string;
//     user_email: string;
//     user_password: string;
//   }) => Promise<void>;
//   updateUser: (userData: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       console.log('AuthProvider: Initializing auth state...');
//       try {
//         const token = localStorage.getItem('authToken');
//         const userData = localStorage.getItem('userData');

//         console.log('AuthProvider: Found in localStorage:', { token: !!token, userData: !!userData });

//         if (token && userData) {
//           const parsedUser = JSON.parse(userData);
//           try {
//             const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//             const currentTime = Math.floor(Date.now() / 1000);
//             console.log('AuthProvider: Token payload:', JSON.stringify(tokenPayload, null, 2));
//             if (tokenPayload.exp && tokenPayload.exp < currentTime) {
//               console.log('AuthProvider: Token expired, clearing auth data');
//               localStorage.removeItem('authToken');
//               localStorage.removeItem('userData');
//               setUser(null);
//               setIsAuthenticated(false);
//             } else {
//               setUser(parsedUser);
//               setIsAuthenticated(true);
//               console.log('AuthProvider: Restored user:', JSON.stringify(parsedUser, null, 2));
//             }
//           } catch (error) {
//             console.error('AuthProvider: Error decoding token:', error);
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('userData');
//             setUser(null);
//             setIsAuthenticated(false);
//           }
//         } else {
//           console.log('AuthProvider: No token or user data found');
//           setUser(null);
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error('AuthProvider: Error initializing auth:', error);
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userData');
//         setUser(null);
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//         console.log('AuthProvider: Initialization complete', {
//           isLoading: false,
//           isAuthenticated,
//           user: user ? JSON.stringify(user, null, 2) : null,
//         });
//       }
//     };

//     initializeAuth();
//   }, []);

//   const login = async (email: string, password: string): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const payload = { user_email: email, user_password: password };
//       console.log('AuthProvider: Login payload:', JSON.stringify(payload, null, 2));
//       const response = await userApi.login(payload);
//       console.log('AuthProvider: Login API response:', JSON.stringify(response.data, null, 2));

//       if (response.data.status_code === 200) {
//         const { token } = response.data.data;
//         console.log('AuthProvider: Storing token:', token);
//         localStorage.setItem('authToken', token);

//         let userData: User;
//         try {
//           const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//           console.log('AuthProvider: JWT payload:', JSON.stringify(tokenPayload, null, 2));
//           userData = {
//             user_id: tokenPayload.userId || tokenPayload.sub || '',
//             user_firstname: tokenPayload.user_firstname || 'User',
//             user_lastname: tokenPayload.user_lastname || '',
//             user_email: tokenPayload.email || email,
//             user_role: tokenPayload.role || '',
//             status: true,
//           };
//         } catch (error) {
//           console.error('AuthProvider: Error decoding JWT:', error);
//           userData = {
//             user_id: '',
//             user_email: email,
//             user_firstname: 'User',
//             user_lastname: '',
//             status: true,
//           };
//         }

//         console.log('AuthProvider: Storing userData:', JSON.stringify(userData, null, 2));
//         localStorage.setItem('userData', JSON.stringify(userData));
//         setUser(userData);
//         setIsAuthenticated(true);
//       } else {
//         throw new Error(response.data.message || 'Login failed');
//       }
//     } catch (error: any) {
//       console.error('AuthProvider: Login error:', JSON.stringify(error, null, 2));
//       throw error;
//     } finally {
//       setIsLoading(false);
//       console.log('AuthProvider: Login complete', {
//         isLoading: false,
//         isAuthenticated,
//         user: user ? JSON.stringify(user, null, 2) : null,
//       });
//     }
//   };

//   const logout = (): void => {
//     console.log('AuthProvider: Logging out');
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userData');
//     if (typeof window !== 'undefined') {
//       window.location.href = '/apps/login';
//     }
//   };

//   const register = async (userData: {
//     user_firstname: string;
//     user_lastname: string;
//     user_email: string;
//     user_password: string;
//   }): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const response = await userApi.register(userData);
//       console.log('AuthProvider: Register API response:', JSON.stringify(response.data, null, 2));
//       if (response.data.status_code === 201) {
//         console.log('AuthProvider: Registration successful');
//       } else {
//         throw new Error(response.data.message || 'Registration failed');
//       }
//     } catch (error: any) {
//       console.error('AuthProvider: Registration error:', JSON.stringify(error, null, 2));
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateUser = (userData: Partial<User>): void => {
//     if (user) {
//       const updatedUser = { ...user, ...userData };
//       console.log('AuthProvider: Updating user:', JSON.stringify(updatedUser, null, 2));
//       setUser(updatedUser);
//       localStorage.setItem('userData', JSON.stringify(updatedUser));
//     }
//   };

//   const value: AuthContextType = {
//     user,
//     isLoading,
//     isAuthenticated,
//     login,
//     logout,
//     register,
//     updateUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     console.error('useAuth: Context is undefined, ensure component is within AuthProvider');
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// export const authUtils = {
//   isEmailVerified: (user: User | null): boolean => {
//     return user?.status || false;
//   },
//   isPasswordExpired: (user: User | null): boolean => {
//     return false;
//   },
//   getUserFullName: (user: User | null): string => {
//     if (!user) return '';
//     return `${user.user_firstname || 'User'} ${user.user_lastname || ''}`.trim();
//   },
//   hasRole: (user: User | null, role: string): boolean => {
//     return user?.user_role === role;
//   },
// };

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userApi } from '../lib/axiosInstance';

interface User {
  user_id: string;
  user_firstname?: string;
  user_lastname?: string;
  user_email: string;
  user_role?: string;
  status: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
  }) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  };

  const setAuthData = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  };

  const isTokenValid = (token: string): boolean => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenPayload.exp && tokenPayload.exp > currentTime;
    } catch (error) {
      console.error('AuthProvider: Error validating token:', error);
      return false;
    }
  };

  const parseUserFromToken = (token: string, email?: string): User => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      console.log('AuthProvider: JWT payload:', JSON.stringify(tokenPayload, null, 2));
      
      return {
        user_id: tokenPayload.userId || tokenPayload.sub || tokenPayload.user_id || '',
        user_firstname: tokenPayload.user_firstname || tokenPayload.firstName || 'User',
        user_lastname: tokenPayload.user_lastname || tokenPayload.lastName || '',
        user_email: tokenPayload.email || tokenPayload.user_email || email || '',
        user_role: tokenPayload.role || tokenPayload.user_role || '',
        status: tokenPayload.status !== undefined ? tokenPayload.status : true,
      };
    } catch (error) {
      console.error('AuthProvider: Error parsing token:', error);
      return {
        user_id: '',
        user_email: email || '',
        user_firstname: 'User',
        user_lastname: '',
        status: true,
      };
    }
  };

  const refreshAuth = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;

      if (authToken && userData) {
        if (isTokenValid(authToken)) {
          const parsedUser = JSON.parse(userData);
          setAuthData(authToken, parsedUser);
          console.log('AuthProvider: Auth refreshed successfully');
        } else {
          console.log('AuthProvider: Token expired during refresh');
          clearAuthData();
        }
      } else {
        console.log('AuthProvider: No auth data found during refresh');
        clearAuthData();
      }
    } catch (error) {
      console.error('AuthProvider: Error during auth refresh:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('AuthProvider: Initializing auth state...');
      
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      try {
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        console.log('AuthProvider: Found in localStorage:', { 
          token: !!authToken, 
          userData: !!userData,
          keys: Object.keys(localStorage)
        });

        if (authToken && userData) {
          if (isTokenValid(authToken)) {
            const parsedUser = JSON.parse(userData);
            setAuthData(authToken, parsedUser);
            console.log('AuthProvider: Restored user:', JSON.stringify(parsedUser, null, 2));
          } else {
            console.log('AuthProvider: Token expired, clearing auth data');
            clearAuthData();
          }
        } else {
          console.log('AuthProvider: No token or user data found');
          clearAuthData();
        }
      } catch (error) {
        console.error('AuthProvider: Error initializing auth:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
        console.log('AuthProvider: Initialization complete', {
          isLoading: false,
          isAuthenticated,
          user: user ? JSON.stringify(user, null, 2) : null,
          token: !!token
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const payload = { user_email: email.toLowerCase().trim(), user_password: password };
      console.log('AuthProvider: Login payload:', JSON.stringify(payload, null, 2));
      
      const response = await userApi.login(payload);
      console.log('AuthProvider: Login API response:', JSON.stringify(response.data, null, 2));

      if (response.data.status_code === 200) {
        const { token: authToken } = response.data.data;
        if (!authToken) {
          throw new Error('No token received from server');
        }

        const userData = parseUserFromToken(authToken, email);
        setAuthData(authToken, userData);
        
        console.log('AuthProvider: Login successful, user data:', JSON.stringify(userData, null, 2));
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('AuthProvider: Login error:', error);
      
      // Enhanced error handling
      let errorMessage = 'Login failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 403) {
        errorMessage = 'Account is disabled or not verified';
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many login attempts. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      const enhancedError = new Error(errorMessage);
      enhancedError.cause = error;
      throw enhancedError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    console.log('AuthProvider: Logging out');
    clearAuthData();
    
    if (typeof window !== 'undefined') {
      // Use replace to prevent back button navigation to protected routes
      window.location.replace('/apps/login');
    }
  };

  const register = async (userData: {
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
  }): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await userApi.register({
        ...userData,
        user_email: userData.user_email.toLowerCase().trim()
      });
      
      console.log('AuthProvider: Register API response:', JSON.stringify(response.data, null, 2));
      
      if (response.data.status_code === 201) {
        console.log('AuthProvider: Registration successful');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('AuthProvider: Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid registration data. Please check your information.';
      } else if (error.response?.status === 409) {
        errorMessage = 'An account with this email already exists.';
      }
      
      const enhancedError = new Error(errorMessage);
      enhancedError.cause = error;
      throw enhancedError;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      console.log('AuthProvider: Updating user:', JSON.stringify(updatedUser, null, 2));
      setUser(updatedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      }
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('useAuth: Context is undefined, ensure component is within AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const authUtils = {
  isEmailVerified: (user: User | null): boolean => {
    return user?.status || false;
  },
  isPasswordExpired: (user: User | null): boolean => {
    return false; // Implement based on your requirements
  },
  getUserFullName: (user: User | null): string => {
    if (!user) return '';
    return `${user.user_firstname || 'User'} ${user.user_lastname || ''}`.trim();
  },
  hasRole: (user: User | null, role: string): boolean => {
    return user?.user_role === role;
  },
};