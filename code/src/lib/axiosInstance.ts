import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Enable if your API requires cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
      });
    }

    if (error.response?.status === 401) {
      console.log('Unauthorized, attempting token refresh');
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/refresh-token/`,
          {},
          { withCredentials: true }
        );
        const newToken = refreshResponse.data.token;
        localStorage.setItem('authToken', newToken);
        if (error.config && error.config.headers) {
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        if (typeof window !== 'undefined') {
          window.location.href = '/apps/login';
        }
      }
    } else if (error.response?.status === 403) {
      console.error('Access forbidden');
    } else if (error.response?.status === 500) {
      console.error('Internal server error');
    }

    return Promise.reject(error);
  }
);

// API service functions for user management
export const userApi = {
  register: async (userData: {
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
  }) => {
    return axiosInstance.post('/user-registration/', userData);
  },

  login: async (credentials: {
    user_email: string;
    user_password: string;
  }) => {
    console.log('Login payload:', credentials);
    return axiosInstance.post('/login/', {
      email: credentials.user_email,
      password: credentials.user_password,
    });
  },

  getProfile: async (userId: string) => {
    return axiosInstance.get(`/user-profile/${userId}`);
  },

  updateProfile: async (userId: string, profileData: any) => {
    return axiosInstance.put(`/user-profile/${userId}`, profileData);
  },

  verifyEmail: async (token: string) => {
    return axiosInstance.post('/verify-email/', { token });
  },

  requestPasswordReset: async (email: string) => {
    return axiosInstance.post('/password-reset-request/', { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return axiosInstance.post('/password-reset/', { token, new_password: newPassword });
  },
};

export default axiosInstance;