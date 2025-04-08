'use client';

import { useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

import Header from '../../components/Header';
import SidebarAdmin from '../../components/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state lives here

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <div className="flex h-screen bg-gray-50">
          <SidebarAdmin
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
