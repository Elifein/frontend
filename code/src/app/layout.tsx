import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/header';
import { MobileMenuProvider } from '../hooks/use-mobile-menu';
import { Footer } from '../components/footer';
import { CartProvider } from '../lib/cart-context';
import { AuthProvider } from '../lib/auth-context';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elifein Ecommerce Store',
  description: 'Your friendly  E-commerce Store',
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
            </CartProvider>
            <Footer />
          </MobileMenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
