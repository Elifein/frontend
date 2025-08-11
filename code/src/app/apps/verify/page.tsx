// /apps/verify/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import VerifyClient with no SSR
const VerifyClient = dynamic(() => import('../../../components/VerifyClient'), { ssr: false });

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading verification page...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
