// lib/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  user_id?: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  [key: string]: any; // For additional user properties
}

interface UserAuthStore {
  // Auth state
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Auth actions
  login: (token: string, userData?: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  
  // Validation functions
  validateEmail: (email: string) => { isValid: boolean; error?: string };
  validatePassword: (password: string) => { isValid: boolean; error?: string };
  validatePhone: (phone: string) => { isValid: boolean; error?: string };
  
  // Token utilities
  isTokenExpired: () => boolean;
  getTokenPayload: () => any | null;
  checkAuth: () => Promise<boolean>;
}

const useUserStore = create<UserAuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      user: null,
      isAuthenticated: false,

      // Login function
      login: (token: string, userData?: User) => {
        try {
          // Parse token to get user data if not provided
          let user = userData;
          
          if (!user && token) {
            try {
              const tokenPayload = JSON.parse(atob(token.split('.')[1]));
              user = {
                user_id: tokenPayload.user_id || tokenPayload.userId,
                email: tokenPayload.email || '',
                name: tokenPayload.name,
                phone: tokenPayload.phone,
                address: tokenPayload.address,
              };
            } catch (error) {
              console.error('Error parsing user token payload:', error);
            }
          }

          set({
            token,
            user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('User login error:', error);
        }
      },

      // Logout function
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
        // Clear any other user-related data if needed
        localStorage.removeItem('cart'); // Clear cart on logout
      },

      // Update user data
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      // Email validation
      validateEmail: (email: string) => {
        if (!email) {
          return { isValid: false, error: 'Email is required' };
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { isValid: false, error: 'Please enter a valid email address' };
        }
        
        return { isValid: true };
      },

      // Password validation
      validatePassword: (password: string) => {
        if (!password) {
          return { isValid: false, error: 'Password is required' };
        }
        
        if (password.length < 6) {
          return { isValid: false, error: 'Password must be at least 6 characters long' };
        }
        
        return { isValid: true };
      },

      // Phone validation
      validatePhone: (phone: string) => {
        if (!phone) {
          return { isValid: false, error: 'Phone number is required' };
        }
        
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
          return { isValid: false, error: 'Please enter a valid 10-digit phone number' };
        }
        
        return { isValid: true };
      },

      // Check if token is expired
      isTokenExpired: () => {
        const token = get().token;
        if (!token) return true;
        
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          return tokenPayload.exp < currentTime;
        } catch (error) {
          console.error('Error checking user token expiration:', error);
          return true;
        }
      },

      // Get token payload
      getTokenPayload: () => {
        const token = get().token;
        if (!token) return null;
        
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
          console.error('Error parsing user token payload:', error);
          return null;
        }
      },

      // Check authentication status
      checkAuth: async () => {
        const { token, isTokenExpired, logout } = get();
        
        if (!token) {
          return false;
        }
        
        if (isTokenExpired()) {
          logout();
          return false;
        }
        
        // Optional: Verify token with backend
        // try {
        //   const response = await axiosInstance.get('/verify-token', {
        //     headers: { Authorization: `Bearer ${token}` }
        //   });
        //   return response.status === 200;
        // } catch (error) {
        //   logout();
        //   return false;
        // }
        
        return true;
      },
    }),
    {
      name: 'user-auth-storage', // Different storage key from admin
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage; // Use localStorage for user auth persistence
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);

export default useUserStore;