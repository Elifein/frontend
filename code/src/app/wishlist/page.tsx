'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

import { Button } from '../../components/ui/button';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-[#1B4B33] mb-12">
          Wishlist
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#40B86D]/10 mb-6">
            <Heart className="w-8 h-8 text-[#40B86D]" />
          </div>
          <h2 className="text-xl font-medium mb-2">
            Your wishlist is currently empty
          </h2>
          <p className="text-gray-500 mb-6">
            Click the <Heart className="w-4 h-4 inline-block mx-1" /> icons to
            add products
          </p>
          <Link href="/shop">
            <Button className="bg-[#1B4B33] hover:bg-[#153D29]">
              Return To Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
