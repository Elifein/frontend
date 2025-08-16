// 'use client';

// import { use, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '../../../components/ui/button';
// import { Input } from '../../../components/ui/input';
// import { useAuth } from '../../../lib/auth-context';
// import { axiosInstance } from '../../../lib/axiosInstance'; // Assuming you have axios instance setup

// interface RegisterPageProps {
//   searchParams: Promise<{
//     email?: string;
//     returnUrl?: string;
//   }>;
// }

// interface RegistrationFormData {
//   user_firstname: string;
//   user_lastname: string;
//   user_email: string;
//   user_password: string;
//   confirmPassword: string;
// }

// interface ApiErrorResponse {
//   status_code: number;
//   message: string;
//   data?: any;
// }

// export default function RegisterPage({ searchParams }: RegisterPageProps) {
//   const { email: prefilledEmail = '', returnUrl = '/' } = use(searchParams);
//   const router = useRouter();

//   const [formData, setFormData] = useState<RegistrationFormData>({
//     user_firstname: '',
//     user_lastname: '',
//     user_email: prefilledEmail,
//     user_password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState<Partial<RegistrationFormData & { general: string }>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

//   const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear field-specific error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<RegistrationFormData & { general: string }> = {};

//     // First name validation
//     if (!formData.user_firstname.trim()) {
//       newErrors.user_firstname = 'First name is required';
//     } else if (formData.user_firstname.trim().length < 3 || formData.user_firstname.trim().length > 16) {
//       newErrors.user_firstname = 'First name must be between 3-16 characters';
//     } else if (!/^[a-zA-Z]/.test(formData.user_firstname.trim())) {
//       newErrors.user_firstname = 'First name must start with a letter';
//     }

//     // Last name validation
//     if (!formData.user_lastname.trim()) {
//       newErrors.user_lastname = 'Last name is required';
//     } else if (formData.user_lastname.trim().length < 3 || formData.user_lastname.trim().length > 16) {
//       newErrors.user_lastname = 'Last name must be between 3-16 characters';
//     } else if (!/^[a-zA-Z]/.test(formData.user_lastname.trim())) {
//       newErrors.user_lastname = 'Last name must start with a letter';
//     }

//     // Check if first and last names are the same
//     if (formData.user_firstname.trim() === formData.user_lastname.trim() && formData.user_firstname.trim()) {
//       newErrors.user_lastname = 'First name and last name cannot be the same';
//     }

//     // Email validation
//     if (!formData.user_email.trim()) {
//       newErrors.user_email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email.trim())) {
//       newErrors.user_email = 'Please enter a valid email address';
//     }

//     // Password validation
//     if (!formData.user_password) {
//       newErrors.user_password = 'Password is required';
//     }

//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.user_password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegistrationSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});

//     try {
//       // Prepare data for API (exclude confirmPassword)
//       const registrationData = {
//         user_firstname: formData.user_firstname.trim(),
//         user_lastname: formData.user_lastname.trim(),
//         user_email: formData.user_email.toLowerCase().trim(),
//         user_password: formData.user_password,
//       };

//       const response = await axiosInstance.post('/user-registration/', registrationData);

//       if (response.data.status_code === 201) {
//         // Registration successful
//         console.log('Registration successful:', response.data);
        
//         // You might want to show a success message or redirect to a confirmation page
//         // For now, redirecting to login with success message
//         router.push(`/apps/login?returnUrl=${encodeURIComponent(returnUrl)}&registered=true`);
//       } else {
//         // Handle unexpected success response structure
//         setErrors({ general: 'Registration failed. Please try again.' });
//       }
//     } catch (error: any) {
//       console.error('Registration error:', error);
      
//       if (error.response?.data) {
//         const apiError: ApiErrorResponse = error.response.data;
        
//         // Handle specific API error messages
//         if (apiError.message.includes('already exists')) {
//           setErrors({ user_email: 'An account with this email already exists' });
//         } else if (apiError.message.includes('First and last name must start with a letter')) {
//           setErrors({ general: 'First and last name must start with a letter' });
//         } else if (apiError.message.includes('first name length')) {
//           setErrors({ user_firstname: 'First name must be between 3-16 characters' });
//         } else if (apiError.message.includes('last name length')) {
//           setErrors({ user_lastname: 'Last name must be between 3-16 characters' });
//         } else if (apiError.message.includes('cannot be the same')) {
//           setErrors({ user_lastname: 'First name and last name cannot be the same' });
//         } else if (apiError.message.includes('password')) {
//           setErrors({ user_password: apiError.message });
//         } else {
//           setErrors({ general: apiError.message || 'Registration failed. Please try again.' });
//         }
//       } else if (error.message === 'Network Error') {
//         setErrors({ general: 'Network error. Please check your connection and try again.' });
//       } else {
//         setErrors({ general: 'Registration failed. Please try again.' });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
//     if (field === 'password') {
//       setIsPasswordVisible(prev => !prev);
//     } else {
//       setIsConfirmPasswordVisible(prev => !prev);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-serif text-gray-800">Create Account</h1>
//         <div className="border-t border-gray-300 flex-grow ml-4"></div>
//       </div>

//       <div className="max-w-md mx-auto">
//         <div className="bg-white p-6 rounded-md shadow-sm border">
//           <h2 className="text-lg font-bold mb-6 text-center">CREATE NEW ACCOUNT</h2>
          
//           {errors.general && (
//             <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mb-4">
//               {errors.general}
//             </div>
//           )}

//           <form className="space-y-4" onSubmit={handleRegistrationSubmit}>
//             <div>
//               <label htmlFor="user_firstname" className="block mb-1 text-sm font-medium">
//                 First Name *
//               </label>
//               <Input
//                 type="text"
//                 id="user_firstname"
//                 value={formData.user_firstname}
//                 onChange={(e) => handleInputChange('user_firstname', e.target.value)}
//                 className={`w-full ${errors.user_firstname ? 'border-red-300' : ''}`}
//                 placeholder="Enter your first name"
//                 disabled={isLoading}
//                 required
//               />
//               {errors.user_firstname && (
//                 <p className="text-red-600 text-xs mt-1">{errors.user_firstname}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="user_lastname" className="block mb-1 text-sm font-medium">
//                 Last Name *
//               </label>
//               <Input
//                 type="text"
//                 id="user_lastname"
//                 value={formData.user_lastname}
//                 onChange={(e) => handleInputChange('user_lastname', e.target.value)}
//                 className={`w-full ${errors.user_lastname ? 'border-red-300' : ''}`}
//                 placeholder="Enter your last name"
//                 disabled={isLoading}
//                 required
//               />
//               {errors.user_lastname && (
//                 <p className="text-red-600 text-xs mt-1">{errors.user_lastname}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="user_email" className="block mb-1 text-sm font-medium">
//                 Email Address *
//               </label>
//               <Input
//                 type="email"
//                 id="user_email"
//                 value={formData.user_email}
//                 onChange={(e) => handleInputChange('user_email', e.target.value)}
//                 className={`w-full ${errors.user_email ? 'border-red-300' : ''}`}
//                 placeholder="Enter your email address"
//                 disabled={isLoading}
//                 required
//               />
//               {errors.user_email && (
//                 <p className="text-red-600 text-xs mt-1">{errors.user_email}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="user_password" className="block mb-1 text-sm font-medium">
//                 Password *
//               </label>
//               <div className="relative">
//                 <Input
//                   type={isPasswordVisible ? 'text' : 'password'}
//                   id="user_password"
//                   value={formData.user_password}
//                   onChange={(e) => handleInputChange('user_password', e.target.value)}
//                   className={`w-full ${errors.user_password ? 'border-red-300' : ''}`}
//                   placeholder="Enter your password"
//                   disabled={isLoading}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('password')}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#1a7ec2] hover:text-[#1a4e78]"
//                   disabled={isLoading}
//                 >
//                   {isPasswordVisible ? 'hide' : 'show'}
//                 </button>
//               </div>
//               {errors.user_password && (
//                 <p className="text-red-600 text-xs mt-1">{errors.user_password}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <Input
//                   type={isConfirmPasswordVisible ? 'text' : 'password'}
//                   id="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                   className={`w-full ${errors.confirmPassword ? 'border-red-300' : ''}`}
//                   placeholder="Confirm your password"
//                   disabled={isLoading}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('confirmPassword')}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#1a7ec2] hover:text-[#1a4e78]"
//                   disabled={isLoading}
//                 >
//                   {isConfirmPasswordVisible ? 'hide' : 'show'}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
//               )}
//             </div>

//             <div className="pt-4">
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-amber-500 hover:bg-amber-600 text-black font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
//               </Button>
//             </div>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link 
//                 href={`/apps/login?returnUrl=${encodeURIComponent(returnUrl)}`}
//                 className="text-[#1a7ec2] hover:underline font-medium"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { axiosInstance } from '../../../lib/axiosInstance';

interface RegisterPageProps {
  searchParams: Promise<{
    email?: string;
    returnUrl?: string;
  }>;
}

interface RegistrationFormData {
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  confirmPassword: string;
}

interface ApiErrorResponse {
  status_code: number;
  message: string;
  data?: any;
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const { email: prefilledEmail = '', returnUrl = '/' } = use(searchParams);
  const router = useRouter();

  const [formData, setFormData] = useState<RegistrationFormData>({
    user_firstname: '',
    user_lastname: '',
    user_email: prefilledEmail,
    user_password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<RegistrationFormData & { general: string }>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationFormData & { general: string }> = {};

    // First name validation
    if (!formData.user_firstname.trim()) {
      newErrors.user_firstname = 'First name is required';
    } else if (formData.user_firstname.trim().length < 3 || formData.user_firstname.trim().length > 16) {
      newErrors.user_firstname = 'First name must be between 3-16 characters';
    }

    // Last name validation
    if (!formData.user_lastname.trim()) {
      newErrors.user_lastname = 'Last name is required';
    } else if (formData.user_lastname.trim().length < 3 || formData.user_lastname.trim().length > 16) {
      newErrors.user_lastname = 'Last name must be between 3-16 characters';
    } else if (formData.user_firstname.trim() === formData.user_lastname.trim()) {
      newErrors.user_lastname = 'First name and last name cannot be the same';
    }

    // Email validation
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email.trim())) {
      newErrors.user_email = 'Please enter a valid email address';
    }

    // Password validation (same rules as backend)
    if (!formData.user_password) {
      newErrors.user_password = 'Password is required';
    } else {
      if (formData.user_password.length < 8) {
        newErrors.user_password = 'Password must be at least 8 characters long';
      } else if (!/[A-Z]/.test(formData.user_password)) {
        newErrors.user_password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.user_password)) {
        newErrors.user_password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(formData.user_password)) {
        newErrors.user_password = 'Password must contain at least one digit';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.user_password)) {
        newErrors.user_password = 'Password must contain at least one special character';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.user_password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const registrationData = {
        user_firstname: formData.user_firstname.trim(),
        user_lastname: formData.user_lastname.trim(),
        user_email: formData.user_email.toLowerCase().trim(),
        user_password: formData.user_password,
      };

      const response = await axiosInstance.post('/user-registration/', registrationData);

      if (response.data.status_code === 201) {
        router.push(`/apps/login?returnUrl=${encodeURIComponent(returnUrl)}&registered=true`);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } catch (error: any) {
      if (error.response?.data) {
        const apiError: ApiErrorResponse = error.response.data;
        setErrors({ general: apiError.message || 'Registration failed. Please try again.' });
      } else if (error.message === 'Network Error') {
        setErrors({ general: 'Network error. Please check your connection and try again.' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    field === 'password'
      ? setIsPasswordVisible(prev => !prev)
      : setIsConfirmPasswordVisible(prev => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif mb-6 text-gray-800">Create Account</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow border">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mb-4">
            {errors.general}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegistrationSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">First Name *</label>
            <Input value={formData.user_firstname} onChange={e => handleInputChange('user_firstname', e.target.value)} disabled={isLoading} />
            {errors.user_firstname && <p className="text-red-600 text-xs">{errors.user_firstname}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Last Name *</label>
            <Input value={formData.user_lastname} onChange={e => handleInputChange('user_lastname', e.target.value)} disabled={isLoading} />
            {errors.user_lastname && <p className="text-red-600 text-xs">{errors.user_lastname}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email Address *</label>
            <Input type="email" value={formData.user_email} onChange={e => handleInputChange('user_email', e.target.value)} disabled={isLoading} />
            {errors.user_email && <p className="text-red-600 text-xs">{errors.user_email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password *</label>
            <div className="relative">
              <Input type={isPasswordVisible ? 'text' : 'password'} value={formData.user_password} onChange={e => handleInputChange('user_password', e.target.value)} disabled={isLoading} />
              <button type="button" onClick={() => togglePasswordVisibility('password')} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600">
                {isPasswordVisible ? 'hide' : 'show'}
              </button>
            </div>
            {errors.user_password && <p className="text-red-600 text-xs">{errors.user_password}</p>}

            {/* Live password rules */}
            <div className="text-xs text-gray-500 mt-2">
              <ul className="list-disc pl-4">
                <li className={formData.user_password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                <li className={/[A-Z]/.test(formData.user_password) ? "text-green-600" : ""}>One uppercase letter</li>
                <li className={/[a-z]/.test(formData.user_password) ? "text-green-600" : ""}>One lowercase letter</li>
                <li className={/[0-9]/.test(formData.user_password) ? "text-green-600" : ""}>One number</li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.user_password) ? "text-green-600" : ""}>One special character</li>
              </ul>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Password *</label>
            <div className="relative">
              <Input type={isConfirmPasswordVisible ? 'text' : 'password'} value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} disabled={isLoading} />
              <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600">
                {isConfirmPasswordVisible ? 'hide' : 'show'}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link href={`/apps/login?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
