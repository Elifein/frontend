'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, User, Search, X } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { CartSidebar } from '../components/cart-sidebar';
import { useCart } from '../components/cart-provider';

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Categories',
    path: '/categories',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="w-full px-4 lg:px-8">
        {' '}
        {/* Removed max-w-7xl, kept padding */}
        <div className="max-w-[1440px] mx-auto">
          {' '}
          {/* Optional wider max-width */}
          <div className="flex items-center justify-between py-4 px-4 lg:px-8">
            {' '}
            {/* Added inner padding */}
            <div className="flex lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 pt-4">
                    {routes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        className={`text-lg font-medium ${
                          pathname === route.path
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {route.name}
                      </Link>
                    ))}
                    <div className="mt-4 border-t pt-4">
                      <Link
                        href="/account"
                        className="flex items-center text-lg font-medium"
                      >
                        <User className="mr-2 h-5 w-5" />
                        Account
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight">
                ShopSmart
              </span>{' '}
              {/* Slightly larger logo */}
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              {' '}
              {/* Adjusted spacing and removed flex-1 */}
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`text-base font-medium transition-colors ${
                    pathname === route.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              {' '}
              {/* Adjusted spacing */}
              {showSearch ? (
                <div className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-[250px] lg:w-[350px] rounded-full" // Wider search and rounded
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSearch(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close search</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent rounded-full" // Added hover effect
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent rounded-full" // Added hover effect
                asChild
              >
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent rounded-full" // Added hover effect
                onClick={toggleCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CartSidebar />
    </>
  );
}
