import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/header';
import { CartProvider } from '../components/cart-provider';
import FooterSection from '../components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elife E-commerce Application',
  description: 'Your friendly Indian E-commerce Store in UK',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <FooterSection />
      </body>
    </html>
  );
}
