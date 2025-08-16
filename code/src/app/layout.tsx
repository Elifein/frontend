// 'use client';

// import type React from 'react';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import dynamic from 'next/dynamic';
// import { MobileMenuProvider } from '../hooks/use-mobile-menu';
// import { Footer } from '../components/footer';
// import { CartProvider } from '../lib/cart-context';
// import { AuthProvider } from '../lib/auth-context';
// import axiosInstance from '../lib/axiosInstance';

// // Explicitly type the dynamic import to match Next.js expectations
// const Header = dynamic(() => import('../components/header').then((mod) => mod.Header), {
//   ssr: false, // Disable server-side rendering
// });

// const inter = Inter({ subsets: ['latin'] });

// const metadata: Metadata = {
//   title: 'Elifein Ecommerce Store',
//   description: 'Your friendly E-commerce Stores',
// };

// async function getCategories() {
//   try {
//     const res = await axiosInstance.get("get-menu-categories/");
//     return res.data.data || [];
//   } catch (err) {
//     console.error("Error fetching categories:", err);
//     return [];
//   }
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
// const categories = await getCategories();
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <MobileMenuProvider>
//             <CartProvider>
//               <Header categories={categories} /> 
//               {children}
//               <Footer />
//             </CartProvider>
//           </MobileMenuProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { MobileMenuProvider } from '../hooks/use-mobile-menu';
import { Footer } from '../components/footer';
import { CartProvider } from '../lib/cart-context';
import { AuthProvider } from '../lib/auth-context';
import axiosInstance from '../lib/axiosInstance';
import { Header } from '../components/header';

// ✅ Keep Header as a normal import (not dynamic with ssr: false)
// because you *want SSR categories*!


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elifein Ecommerce Store',
  description: 'Your friendly E-commerce Stores',
};

async function getCategories() {
  try {
    const res = await axiosInstance.get("get-menu-categories/");
    return res.data.data || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}

// ✅ Make RootLayout async
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MobileMenuProvider>
            <CartProvider>
              <Header categories={categories} />
              {children}
              <Footer />
            </CartProvider>
          </MobileMenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
