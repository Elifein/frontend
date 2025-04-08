// 'use client';

// import { create } from 'zustand';
// import jwt from 'jsonwebtoken';

// interface ThemeColors {
//   topBarColor: string;
//   sidebarColor: string;
//   sidebarBackground: string;
//   primary: string;
//   primaryForeground: string;
//   secondary: string;
//   secondaryForeground: string;
// }

// interface AuthState {
//   userId: string | null;
//   role: string | null;
//   exp: number | null;
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
//   checkAuth: () => void;
// }

// interface FormState {
//   formData: Record<string, any> | null;
//   setFormData: (data: Record<string, any>) => void;
//   resetFormData: () => void;
// }

// interface HealthFormState {
//   healthFormData: Record<string, any> | null;
//   setHealthFormData: (data: Record<string, any>) => void;
//   resetHealthFormData: () => void;
// }

// interface NotificationState {
//   notifications: number;
//   incrementNotifications: () => void;
//   resetNotifications: () => void;
// }

// interface StoreState
//   extends AuthState,
//     FormState,
//     HealthFormState,
//     NotificationState {
//   themeColors: ThemeColors;
//   updateThemeColor: (colorType: keyof ThemeColors, colorValue: string) => void;
//   resetTheme: () => void;
// }

// const useStore = create<StoreState>((set) => ({
//   // 🔹 Authentication State
//   userId: null,
//   role: null,
//   exp: null,
//   isAuthenticated: false,

//   login: (token: string) => {
//     console.log('Received token:', token);

//     if (!token) {
//       console.error('No token received');
//       return;
//     }

//     try {
//       const decoded: any = jwt.decode(token);
//       console.log('Decoded token:', decoded);

//       if (decoded && decoded.userId && decoded.role) {
//         set({
//           userId: decoded.userId,
//           role: decoded.role,
//           exp: decoded.exp,
//           isAuthenticated: true,
//         });

//         localStorage.setItem('token', token);
//       } else {
//         console.error('Invalid token format', decoded);
//       }
//     } catch (error) {
//       console.error('Token decoding error:', error);
//     }
//   },

//   logout: () => {
//     set({
//       userId: null,
//       role: null,
//       exp: null,
//       isAuthenticated: false,
//     });
//     localStorage.removeItem('token');
//   },

//   checkAuth: () => {
//     if (typeof window === 'undefined') return;
//     const token =
//       typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//     if (token) {
//       try {
//         const decoded: any = jwt.decode(token);
//         if (decoded && decoded.userId && decoded.role) {
//           set({
//             userId: decoded.userId,
//             role: decoded.role,
//             exp: decoded.exp,
//             isAuthenticated: true,
//           });
//         } else {
//           console.error('Invalid token format');
//           localStorage.removeItem('token');
//         }
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         localStorage.removeItem('token');
//       }
//     }
//   },

//   // 🔹 Theme Colors
//   themeColors: {
//     topBarColor: '',
//     sidebarColor: '',
//     sidebarBackground: '',
//     primary: '240 5.9% 10%',
//     primaryForeground: '0 0% 98%',
//     secondary: '240 4.8% 95.9%',
//     secondaryForeground: '240 5.9% 10%',
//   },

//   updateThemeColor: (colorType, colorValue) =>
//     set((state) => ({
//       themeColors: {
//         ...state.themeColors,
//         [colorType]: colorValue,
//       },
//     })),

//   resetTheme: () =>
//     set(() => ({
//       themeColors: {
//         topBarColor: '',
//         sidebarColor: '',
//         sidebarBackground: '',
//         primary: '240 5.9% 10%',
//         primaryForeground: '0 0% 98%',
//         secondary: '240 4.8% 95.9%',
//         secondaryForeground: '240 5.9% 10%',
//       },
//     })),

//   // 🔹 Form Data Management
//   formData: null,
//   setFormData: (data) =>
//     set((state) => ({
//       formData: { ...state.formData, ...data },
//     })),
//   resetFormData: () =>
//     set(() => ({
//       formData: null,
//     })),

//   // 🔹 Health Form Data
//   healthFormData: null,
//   setHealthFormData: (data) =>
//     set((state) => ({
//       healthFormData: { ...state.healthFormData, ...data },
//     })),
//   resetHealthFormData: () =>
//     set(() => ({
//       healthFormData: null,
//     })),

//   // 🔹 Notifications
//   notifications: 0,
//   incrementNotifications: () =>
//     set((state) => {
//       const newCount = state.notifications + 1;
//       console.log('Incrementing notifications:', newCount);
//       return { notifications: newCount };
//     }),

//   resetNotifications: () =>
//     set(() => {
//       console.log('Resetting notifications to 0');
//       return { notifications: 0 };
//     }),
// }));

// useStore.getState().checkAuth();

// export default useStore;
