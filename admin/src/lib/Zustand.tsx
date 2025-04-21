'use client';

import { create } from 'zustand';
import jwt from 'jsonwebtoken';

interface ThemeColors {
  topBarColor: string;
  sidebarColor: string;
  sidebarBackground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
}

interface JwtPayload {
  userId: string;
  role: string;
  exp: number;
}

interface AuthState {
  userId: string | null;
  role: string | null;
  exp: number | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

type FormData = Record<string, string | number | boolean | null>;

interface FormState {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
  resetFormData: () => void;
}


interface ValidationState {
  validateName: (name: string) => { isValid: boolean; error?: string };
  validateEmail: (email: string) => { isValid: boolean; error?: string };
  validatePassword: (password: string) => { isValid: boolean; error?: string };
}

interface StoreState
  extends AuthState,
    FormState,

    ValidationState {
  themeColors: ThemeColors;
  updateThemeColor: (colorType: keyof ThemeColors, colorValue: string) => void;
  resetTheme: () => void;
}

const useStore = create<StoreState>((set) => ({
  // 🔹 Authentication State
  userId: null,
  role: null,
  exp: null,
  isAuthenticated: false,

  login: (token: string) => {
    console.log('Received token:', token);
    if (!token) {
      console.error('No token received');
      return;
    }
    try {
      const decoded = jwt.decode(token) as JwtPayload | null;
      console.log('Decoded token:', decoded);
      if (decoded && decoded.userId && decoded.role) {
        set({
          userId: decoded.userId,
          role: decoded.role,
          exp: decoded.exp,
          isAuthenticated: true,
        });
        localStorage.setItem('token', token);
      } else {
        console.error('Invalid token format', decoded);
      }
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  },

  logout: () => {
    set({
      userId: null,
      role: null,
      exp: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('token');
  },

  checkAuth: () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token) as JwtPayload | null;
        if (decoded && decoded.userId && decoded.role) {
          set({
            userId: decoded.userId,
            role: decoded.role,
            exp: decoded.exp,
            isAuthenticated: true,
          });
        } else {
          console.error('Invalid token format');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
  },

  // 🔹 Theme Colors
  themeColors: {
    topBarColor: '',
    sidebarColor: '',
    sidebarBackground: '',
    primary: '240 5.9% 10%',
    primaryForeground: '0 0% 98%',
    secondary: '240 4.8% 95.9%',
    secondaryForeground: '240 5.9% 10%',
  },

  updateThemeColor: (colorType, colorValue) =>
    set((state) => ({
      themeColors: {
        ...state.themeColors,
        [colorType]: colorValue,
      },
    })),

  resetTheme: () =>
    set(() => ({
      themeColors: {
        topBarColor: '',
        sidebarColor: '',
        sidebarBackground: '',
        primary: '240 5.9% 10%',
        primaryForeground: '0 0% 98%',
        secondary: '240 4.8% 95.9%',
        secondaryForeground: '240 5.9% 10%',
      },
    })),

  // 🔹 Form Data Management
  formData: null,
  setFormData: (data: FormData) =>
    set((state) => ({
      formData: state.formData ? { ...state.formData, ...data } : { ...data },
    })),
  resetFormData: () =>
    set(() => ({
      formData: null,
    })),



  // 🔹 Validation Logic
  validateName: (name: string) => {
    if (!name) {
      return { isValid: false, error: 'Name is required' };
    }
    if (name.length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s-]+$/.test(name)) {
      return {
        isValid: false,
        error: 'Name can only contain letters, spaces, or hyphens',
      };
    }
    return { isValid: true };
  },

  validateEmail: (email: string) => {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
  },

  validatePassword: (password: string) => {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 8) {
      return {
        isValid: false,
        error: 'Password must be at least 8 characters',
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        error: 'Password must contain at least one uppercase letter',
      };
    }
    if (!/[0-9]/.test(password)) {
      return {
        isValid: false,
        error: 'Password must contain at least one number',
      };
    }
    return { isValid: true };
  },
}));

useStore.getState().checkAuth();

export default useStore;
