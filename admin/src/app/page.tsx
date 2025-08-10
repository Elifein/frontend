'use client';

import Logo from '../components/logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import Link from 'next/link';
import axiosInstance from '../lib/axiosInstance';
import { useState, FormEvent } from 'react';
import useStore from '../lib/Zustand';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { validateEmail, validatePassword } = useStore();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    const newErrors: Record<string, string> = {};
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/login/', {
        email,
        password,
      });

      console.log('Full response:', response); // Debug log
      console.log('Response data:', response.data); // Debug log

      // Check the status_code from your API response, not HTTP status
      const { status_code, message, timestamp, data } = response.data;

      if (status_code === 200) {
        // Normal login - token should be in data
        const { token } = data;
        login(token);
        toast.success(message || 'Login successful!');
        router.push('/dashboard');
      } else if (status_code === 201) {
        // Password change required
        toast.success(message, {
          description: new Date(timestamp).toLocaleString(),
        });
        
        // Pass email as query parameter (same pattern as admin login)
        router.push(`/resetpassword?email=${encodeURIComponent(email)}`);
      } else {
        // Handle other status codes from your API
        setErrors({ general: message || 'Login failed' });
        toast.error(message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error); // Debug log
      
      // Check if it's an axios error with response
      if (error.response) {
        console.log('Error response:', error.response.data); // Debug log
        const { status_code, message } = error.response.data;
        
        // Handle API error responses
        setErrors({ general: message || 'Something went wrong. Please try again.' });
        toast.error(message || 'Something went wrong. Please try again.');
      } else {
        // Network or other errors
        setErrors({ general: 'Network error. Please check your connection.' });
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleLogin}
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Logo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign In to Elife
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Username
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-red-500 text-xs text-center">{errors.general}</p>
            )}

            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}