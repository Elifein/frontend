// /apps/verify/page.tsx
import VerifyClient from '@/src/components/VerifyClient';

import { Suspense } from 'react';



export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading verification page...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
