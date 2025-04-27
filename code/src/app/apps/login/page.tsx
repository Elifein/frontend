// 'use client';

// import { use, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '../../../components/ui/button';
// import { Input } from '../../../components/ui/input';
// import { useAuth } from '../../../lib/auth-context';

// export default function LoginPage({ params }: { params: Promise<{ searchParams: { returnUrl?: string; create?: string } }> }) {
//   const { searchParams } = use(params);
//   const returnUrl = searchParams.returnUrl || '/';
//   const isCreateAccount = searchParams.create === 'true';

//   const { login } = useAuth();
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [registerEmail, setRegisterEmail] = useState('');

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await login(email, password);
//       router.push(returnUrl);
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Redirect to register page with returnUrl
//     router.push(`/apps/register?email=${encodeURIComponent(registerEmail)}&returnUrl=${encodeURIComponent(returnUrl)}`);
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible((prev) => !prev);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-serif text-gray-800">Login</h1>
//         <div className="border-t border-gray-300 flex-grow ml-4"></div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
//         {/* Login Form */}
//         <div>
//           <h2 className="text-lg font-bold mb-6 text-center">I HAVE AN ACCOUNT</h2>
//           {error && (
//             <div className="text-red-600 text-sm text-center mb-4">{error}</div>
//           )}
//           <form className="space-y-4" onSubmit={handleLoginSubmit}>
//             <div>
//               <label htmlFor="email" className="block mb-1">
//                 Email Address
//               </label>
//               <Input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <Input
//                   type={isPasswordVisible ? 'text' : 'password'}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#1a7ec2]"
//                 >
//                   {isPasswordVisible ? 'hide' : 'show'}
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <Link href="#" className="text-sm text-[#1a7ec2] hover:underline">
//                 Forgot your password?
//               </Link>
//             </div>
//             <div className="flex justify-end">
//               <Link href="#" className="text-sm text-[#1a7ec2] hover:underline">
//                 Has your email address changed?
//               </Link>
//             </div>
//             <div className="pt-4">
//               <Button
//                 type="submit"
//                 className="bg-amber-500 hover:bg-amber-600 text-black font-bold w-full md:w-auto px-8"
//               >
//                 LOGIN
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Register Prompt */}
//         <div className="bg-gray-50 p-6 rounded-md">
//           <h2 className="text-lg font-bold mb-6 text-center">Don't have an account?</h2>
//           <p className="text-center mb-6">
//             If you have not set up an account, please enter your email address and click "Continue"
//           </p>
//           <form className="space-y-4" onSubmit={handleRegisterSubmit}>
//             <Input
//               type="email"
//               placeholder="Enter Your Email Address"
//               value={registerEmail}
//               onChange={(e) => setRegisterEmail(e.target.value)}
//               className="w-full"
//               required
//             />
//             <Button type="submit" className="bg-[#1a7ec2] hover:bg-[#1a4e78] w-full">
//               CONTINUE
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useAuth } from '../../../lib/auth-context';

export default function LoginPage({ searchParams }: { searchParams: { returnUrl?: string; create?: string } }) {
  const returnUrl = searchParams.returnUrl || '/';
  const isCreateAccount = searchParams.create === 'true';

  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push(returnUrl);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to register page with returnUrl
    router.push(`/apps/register?email=${encodeURIComponent(registerEmail)}&returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif text-gray-800">Login</h1>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Login Form */}
        <div>
          <h2 className="text-lg font-bold mb-6 text-center">I HAVE AN ACCOUNT</h2>
          {error && (
            <div className="text-red-600 text-sm text-center mb-4">{error}</div>
          )}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#1a7ec2]"
                >
                  {isPasswordVisible ? 'hide' : 'show'}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-[#1a7ec2] hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-[#1a7ec2] hover:underline">
                Has your email address changed?
              </Link>
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold w-full md:w-auto px-8"
              >
                LOGIN
              </Button>
            </div>
          </form>
        </div>

        {/* Register Prompt */}
        <div className="bg-gray-50 p-6 rounded-md">
          <h2 className="text-lg font-bold mb-6 text-center">Don't have an account?</h2>
          <p className="text-center mb-6">
            If you have not set up an account, please enter your email address and click "Continue"
          </p>
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="w-full"
              required
            />
            <Button type="submit" className="bg-[#1a7ec2] hover:bg-[#1a4e78] w-full">
              CONTINUE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}