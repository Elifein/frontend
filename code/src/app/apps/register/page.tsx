'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import axiosInstance from '../../../lib/axiosInstance';

export default function RegisterPage({ params }: { params: Promise<{ searchParams: { email?: string; returnUrl?: string } }> }) {
  const { searchParams } = use(params);
  const initialEmail = searchParams.email || '';
  const returnUrl = searchParams.returnUrl || '/';

  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Replace with your actual register endpoint
      await axiosInstance.post('/auth/register', {
        email,
        password,
      });
      // Redirect to login with returnUrl
      router.push(`/apps/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif text-gray-800">Create Account</h1>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-6 text-center">Create a New Account</h2>
        {error && (
          <div className="text-red-600 text-sm text-center mb-4">{error}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          <div className="pt-4">
            <Button
              type="submit"
              className="bg-[#1a7ec2] hover:bg-[#1a4e78] w-full"
            >
              CREATE ACCOUNT
            </Button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link
            href={`/apps/login?returnUrl=${encodeURIComponent(returnUrl)}`}
            className="text-[#1a7ec2] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}