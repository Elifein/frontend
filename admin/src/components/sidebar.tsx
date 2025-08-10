'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Image,
  DollarSign,
} from 'lucide-react';
import Logo from './logo';

interface SidebarAdminProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Slider', href: '/slider', icon: Image },
    { name: 'Ads', href: '/ads', icon: DollarSign },
    { name: 'Categories', href: '/categories', icon: Package },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/customers', icon: Users },
    // { name: 'Employees', href: '/employees', icon: Users },
    // { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      <div
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-background transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold w-12">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="flex-1 space-y-1 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 shrink-0 ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div> */}
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarAdmin;
