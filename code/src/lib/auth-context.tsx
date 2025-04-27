// // 'use client';

// // import { createContext, useContext, useState, useEffect } from 'react';
// // import axiosInstance from './axiosInstance';

// // interface AuthContextType {
// //   user: { id: string; email: string } | null;
// //   isLoggedIn: boolean;
// //   login: (email: string, password: string) => Promise<void>;
// //   register: (email: string, password: string) => Promise<void>;
// //   logout: () => void;
// //   checkAuth: () => Promise<boolean>;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export function AuthProvider({ children }: { children: React.ReactNode }) {
// //   const [user, setUser] = useState<{ id: string; email: string } | null>(null);

// //   // Check authentication on mount
// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

// //   const checkAuth = async () => {
// //     try {
// //       const response = await axiosInstance.get('/auth/check');
// //       setUser(response.data.user || null);
// //       return !!response.data.user;
// //     } catch (error) {
// //       console.error('Auth check failed:', error);
// //       setUser(null);
// //       return false;
// //     }
// //   };

// //   const login = async (email: string, password: string) => {
// //     try {
// //       const response = await axiosInstance.post('/auth/login', { email, password });
// //       setUser(response.data.user);
// //     } catch (error) {
// //       console.error('Login failed:', error);
// //       throw new Error('Invalid credentials');
// //     }
// //   };

// //   const register = async (email: string, password: string) => {
// //     try {
// //       const response = await axiosInstance.post('/auth/register', { email, password });
// //       setUser(response.data.user);
// //     } catch (error) {
// //       console.error('Registration failed:', error);
// //       throw new Error('Failed to create account');
// //     }
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     axiosInstance.post('/auth/logout').catch((error) => {
// //       console.error('Logout failed:', error);
// //     });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, checkAuth }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }


// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// interface AuthContextType {
//   user: { id: string; email: string } | null;
//   isLoggedIn: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   checkAuth: () => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<{ id: string; email: string } | null>(null);

//   // Check authentication on mount using localStorage
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       // Simulate checking auth with localStorage
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//         return true;
//       }
//       setUser(null);
//       return false;
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       setUser(null);
//       return false;
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       // Simulate login with dummy data
//       if (email && password === 'password123') {
//         // Mock validation: accept any email with password 'password123'
//         const newUser = { id: `user_${Date.now()}`, email };
//         setUser(newUser);
//         localStorage.setItem('user', JSON.stringify(newUser));
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw new Error('Invalid credentials');
//     }
//   };

//   const register = async (email: string, password: string) => {
//     try {
//       // Simulate registration with dummy data
//       if (email && password) {
//         const newUser = { id: `user_${Date.now()}`, email };
//         setUser(newUser);
//         localStorage.setItem('user', JSON.stringify(newUser));
//       } else {
//         throw new Error('Invalid registration data');
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//       throw new Error('Failed to create account');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, checkAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


'use client'

import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { id: string; email: string } | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log('Checking auth, stored user:', storedUser);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('User set from localStorage:', parsedUser);
        return true;
      }
      setUser(null);
      console.log('No user found in localStorage');
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Login attempt:', { email, password });
      if (email && password === 'password123') {
        const newUser = { id: `user_${Date.now()}`, email };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        console.log('Login successful, user set:', newUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      console.log('Register attempt:', { email });
      if (email && password) {
        const newUser = { id: `user_${Date.now()}`, email };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        console.log('Registration successful, user set:', newUser);
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Failed to create account');
    }
  };

  const logout = () => {
    console.log('Logging out, clearing user');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}