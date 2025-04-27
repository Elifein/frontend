'use client';

import Link from 'next/link';

export default function OrderConfirmationPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-serif text-gray-800">Order Confirmed</h2>
        <p className="text-gray-600 mt-4">
          Thank you for your order! You’ll receive a confirmation email soon.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-[#1a7ec2] text-white px-4 py-2 rounded hover:bg-[#1a4e78]"
        >
          Continue Shopping
        </Link>
      </div>
    );
}
