'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  ShoppingBag,
  User,
  Search,
  X,
  Heart,
  ChevronDown,
  Home,
  Smartphone,
  Headphones,
  Monitor,
  Camera,
  Watch,
  Shirt,
  ShoppingCart,
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { CartSidebar } from '../components/cart-sidebar';
import { useCart } from '../components/cart-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import Logo from './logo';

// Main navigation categories with icons
const categories = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
  },
  {
    name: 'Electronics',
    path: '/categories/electronics',
    icon: Smartphone,
    subcategories: [
      { name: 'Smartphones', path: '/categories/electronics/smartphones' },
      { name: 'Laptops', path: '/categories/electronics/laptops' },
      { name: 'Audio', path: '/categories/electronics/audio' },
      { name: 'Accessories', path: '/categories/electronics/accessories' },
    ],
  },
  {
    name: 'Computers',
    path: '/categories/computers',
    icon: Monitor,
    subcategories: [
      { name: 'Desktops', path: '/categories/computers/desktops' },
      { name: 'Laptops', path: '/categories/computers/laptops' },
      { name: 'Components', path: '/categories/computers/components' },
      { name: 'Accessories', path: '/categories/computers/accessories' },
    ],
  },
  {
    name: 'Audio',
    path: '/categories/audio',
    icon: Headphones,
    subcategories: [
      { name: 'Headphones', path: '/categories/audio/headphones' },
      { name: 'Speakers', path: '/categories/audio/speakers' },
      { name: 'Microphones', path: '/categories/audio/microphones' },
    ],
  },
  {
    name: 'Cameras',
    path: '/categories/cameras',
    icon: Camera,
    subcategories: [
      { name: 'DSLR', path: '/categories/cameras/dslr' },
      { name: 'Mirrorless', path: '/categories/cameras/mirrorless' },
      { name: 'Accessories', path: '/categories/cameras/accessories' },
    ],
  },
  {
    name: 'Wearables',
    path: '/categories/wearables',
    icon: Watch,
    subcategories: [
      { name: 'Smartwatches', path: '/categories/wearables/smartwatches' },
      {
        name: 'Fitness Trackers',
        path: '/categories/wearables/fitness-trackers',
      },
    ],
  },
  {
    name: 'Clothing',
    path: '/categories/clothing',
    icon: Shirt,
    subcategories: [
      { name: 'Men', path: '/categories/clothing/men' },
      { name: 'Women', path: '/categories/clothing/women' },
      { name: 'Kids', path: '/categories/clothing/kids' },
    ],
  },
  {
    name: 'Deals',
    path: '/deals',
    icon: ShoppingCart,
  },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [wishlistCount] = useState(3); // This would be from a wishlist context in a real app

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      {/* Top Header - Logo, Search, User Actions */}
      <div className="border-b">
        <div className=" px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button - Only visible on small screens */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="mt-6 mb-8">
                    <Link href="/" className="flex items-center">
                      <Logo />
                      {/* <span className="text-xl font-bold">ShopSmart</span> */}
                    </Link>
                  </div>

                  <div className="mb-4">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full"
                    />
                  </div>

                  <nav className="flex flex-col gap-1">
                    {categories.map((category) => (
                      <div key={category.name} className="mb-2">
                        <Link
                          href={category.path}
                          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                            pathname === category.path
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <category.icon className="mr-2 h-4 w-4" />
                          {category.name}
                        </Link>

                        {category.subcategories && (
                          <div className="ml-6 mt-1 space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.name}
                                href={subcategory.path}
                                className={`block rounded-md px-3 py-2 text-sm ${
                                  pathname === subcategory.path
                                    ? 'font-medium text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="mt-6 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/account">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/wishlist">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={toggleCart}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Cart ({cartCount})
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile unless activated */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-1">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {showSearch ? 'Close search' : 'Search'}
                </span>
              </Button>

              {/* Account */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                asChild
              >
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative"
                asChild
              >
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
                      {wishlistCount}
                    </Badge>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>

          {/* Mobile Search - Only visible when activated */}
          {showSearch && (
            <div className="pb-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-10"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                >
                  Search
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Header - Full-width Menu */}
      <div className="border-b bg-muted/40 hidden lg:block">
        <div className=" px-4">
          <nav className="flex items-center h-12">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                {category.subcategories ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`h-12 px-4 rounded-none flex items-center gap-1 ${
                          pathname === category.path
                            ? 'bg-primary/10 text-primary'
                            : ''
                        }`}
                      >
                        <category.icon className="h-4 w-4 mr-1" />
                        {category.name}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {category.subcategories.map((subcategory) => (
                        <DropdownMenuItem key={subcategory.name} asChild>
                          <Link href={subcategory.path}>
                            {subcategory.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    className={`h-12 px-4 rounded-none ${
                      pathname === category.path
                        ? 'bg-primary/10 text-primary'
                        : ''
                    }`}
                    asChild
                  >
                    <Link href={category.path} className="flex items-center">
                      <category.icon className="h-4 w-4 mr-1" />
                      {category.name}
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <CartSidebar />
    </header>
  );
}
