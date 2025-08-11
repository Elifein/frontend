// /apps/verify/VerifyClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosInstance from '../lib/axiosInstance'; // adjust path if needed
import { toast } from 'sonner';

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verifyUserByToken = async () => {
      if (!token) {
        setStatus('error');
        toast.error('Verification link is invalid or missing token.');
        return;
      }

      try {
        const res = await axiosInstance.put('/verify-email', null, {
          params: { token },
        });

        if (res.data?.status_code === 200) {
          setStatus('success');
          toast.success('Email verified successfully!');
          setTimeout(() => {
            router.push('/apps/login?registered=true');
          }, 2500);
        } else {
          setStatus('error');
          toast.error(res.data?.message || 'Verification failed.');
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setStatus('error');
        toast.error('Something went wrong during verification.');
      }
    };

    verifyUserByToken();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 text-center">
      {status === 'verifying' && (
        <>
          <h1 className="text-xl font-semibold mb-2">Verifying your email...</h1>
          <p>Please wait while we verify your account.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <h1 className="text-xl font-semibold text-green-600 mb-2">Verification Successful!</h1>
          <p>Redirecting to login...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-xl font-semibold text-red-600 mb-2">Verification Failed</h1>
          <p>The verification link may be invalid or expired.</p>
        </>
      )}
    </div>
  );
}
