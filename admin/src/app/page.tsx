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

      if (response.status === 200) {
        const { token } = response.data.data;
        login(token);
        router.push('/dashboard');
      }

      console.log('Login successful:', response.data);
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
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

            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
