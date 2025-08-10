'use client';

import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { MobileMenuProvider } from '../hooks/use-mobile-menu';
import { Footer } from '../components/footer';
import { CartProvider } from '../lib/cart-context';
import { AuthProvider } from '../lib/auth-context';

// Explicitly type the dynamic import to match Next.js expectations
const Header = dynamic(() => import('../components/header').then((mod) => mod.Header), {
  ssr: false, // Disable server-side rendering
});

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Elifein Ecommerce Store',
  description: 'Your friendly E-commerce Store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MobileMenuProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </MobileMenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}