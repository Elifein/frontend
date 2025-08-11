// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Search, ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { AccountDropdown } from '../components/account-dropdown';
// import { useMobileMenu } from '../hooks/use-mobile-menu';
// import { cn } from '../lib/utils';
// import Logo from './logo';
// import axiosInstance from '../lib/axiosInstance';
// import { useCart } from '../lib/cart-context';
// import { useAuth, authUtils } from '../lib/auth-context';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../components/ui/dropdown-menu';

// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// interface SearchResult {
//   product_id: string;
//   product_name: string;
//   image_url: string;
//   slug: string;
//   category_slug: string;
// }

// export function Header() {
//   const { isOpen, toggle } = useMobileMenu();
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [isSearchLoading, setIsSearchLoading] = useState(false);
//   const [showSearchDropdown, setShowSearchDropdown] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
//   const { cart, cartCount } = useCart();
//   const { user, isAuthenticated, logout, isLoading } = useAuth();

//   // Enhanced debugging for auth state
//   useEffect(() => {
//     console.log('Header auth state:', {
//       isLoading,
//       isAuthenticated,
//       user: user ? JSON.stringify(user, null, 2) : null,
//       contextAvailable: !!useAuth,
//     });
//   }, [isLoading, isAuthenticated, user]);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('get-menu-categories/');
//         setCategories(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Handle search with debounce
//   useEffect(() => {
//     const handleSearch = async () => {
//       if (searchQuery.length < 2) {
//         setSearchResults([]);
//         setShowSearchDropdown(false);
//         return;
//       }

//       setIsSearchLoading(true);
//       try {
//         const response = await axiosInstance.get(
//           `/products/search?query=${encodeURIComponent(searchQuery)}`
//         );
//         setSearchResults(response.data || []);
//         setShowSearchDropdown(true);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setSearchResults([]);
//         setShowSearchDropdown(false);
//       } finally {
//         setIsSearchLoading(false);
//       }
//     };

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }
//     debounceTimeout.current = setTimeout(handleSearch, 300);

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [searchQuery]);

//   // Close search dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowSearchDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowSearchDropdown(false);
//   };

//   // Render loading state until auth is initialized
//   if (isLoading) {
//     return (
//       <div className="border-b sticky top-0 bg-white z-50">
//         <div className="container mx-auto px-4 py-3 text-center text-[#1a4e78] animate-pulse">
//           Loading authentication...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <header className="border-b sticky top-0 bg-white z-50">
//       <div className="container mx-auto px-4 py-3">
//         {/* Mobile Header */}
//         <div className="flex items-center justify-between md:hidden">
//           <button onClick={toggle} className="text-[#1a4e78]">
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>

//           <Link href="/" className="flex-shrink-0">
//             <div className="flex items-center">
//               <Logo />
//               <div className="flex flex-col">
//                 <span className="text-[#1a4e78] font-bold text-sm">Elifein</span>
//               </div>
//             </div>
//           </Link>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="text-[#1a4e78]"
//             >
//               <Search className="h-5 w-5" />
//             </button>
//             <Link href="/cart" className="relative">
//               <ShoppingCart className="h-5 w-5 text-[#1a4e78]" />
//               <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div
//           className={cn(
//             'mt-2 transition-all duration-300 overflow-hidden md:hidden relative',
//             isSearchOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//           )}
//           ref={searchRef}
//         >
//           <div className="relative">
//             <Input
//               type="text"
//               placeholder="Search..."
//               className="pr-10 border-[#1a4e78] focus:ring-[#1a4e78]"
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//               onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
//             />
//             <Button
//               className="absolute right-0 top-0 h-full bg-[#1a7ec2] hover:bg-[#1a4e78]"
//               size="icon"
//               onClick={handleSearchSubmit}
//             >
//               <Search className="h-4 w-4" />
//             </Button>
//           </div>
//           {showSearchDropdown && (
//             <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-[2000] max-h-96 overflow-y-auto">
//               {isSearchLoading ? (
//                 <div className="p-4 text-center text-[#1a4e78]">Loading...</div>
//               ) : searchResults.length === 0 ? (
//                 <div className="p-4 text-center text-[#1a4e78]">No products found</div>
//               ) : (
//                 searchResults.map((product) => (
//                   <Link
//                     key={product.product_id}
//                     href={`/${product.category_slug}/${product.slug}`}
//                     className="flex items-center p-2 hover:bg-gray-100"
//                     onClick={() => {
//                       setSearchQuery('');
//                       setShowSearchDropdown(false);
//                       setIsSearchOpen(false);
//                     }}
//                   >
//                     <Image
//                       src={product.image_url}
//                       alt={product.product_name}
//                       width={40}
//                       height={40}
//                       className="object-cover rounded mr-2"
//                     />
//                     <span className="text-[#1a4e78]">{product.product_name}</span>
//                   </Link>
//                 ))
//               )}
//             </div>
//           )}
//         </div>

//         {/* Desktop Header */}
//         <div className="hidden md:flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Link href="/">
//               <div className="flex items-center">
//                 <Logo />
//                 <div className="flex flex-col">
//                   <span className="text-[#1a4e78] font-bold text-lg">Elifein</span>
//                   <span className="text-[#1a4e78] text-xs">EVERYTHING CHRISTIAN FOR LESS!</span>
//                 </div>
//               </div>
//             </Link>
//           </div>

//           <div className="flex-1 max-w-xl mx-4 relative" ref={searchRef}>
//             <div className="relative">
//               <Input
//                 type="text"
//                 placeholder="Search by title"
//                 className="pr-10 border-[#1a4e78] focus:ring-[#1a4e78]"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//                 onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
//               />
//               <Button
//                 className="absolute right-0 top-0 h-full bg-[#1a7ec2] hover:bg-[#1a4e78]"
//                 size="icon"
//                 onClick={handleSearchSubmit}
//               >
//                 <Search className="h-5 w-5" />
//               </Button>
//             </div>
//             {showSearchDropdown && (
//               <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-60 max-h-96 overflow-y-auto">
//                 {isSearchLoading ? (
//                   <div className="p-4 text-center text-[#1a4e78]">Loading...</div>
//                 ) : searchResults.length === 0 ? (
//                   <div className="p-4 text-center text-[#1a4e78]">No products found</div>
//                 ) : (
//                   searchResults.map((product) => (
//                     <Link
//                       key={product.product_id}
//                       href={`/${product.category_slug}/${product.slug}`}
//                       className="flex items-center p-2 hover:bg-gray-100"
//                       onClick={() => {
//                         setSearchQuery('');
//                         setShowSearchDropdown(false);
//                       }}
//                     >
//                       <Image
//                         src={product.image_url}
//                         alt={product.product_name}
//                         width={40}
//                         height={40}
//                         className="object-cover rounded mr-2"
//                       />
//                       <span className="text-[#1a4e78]">{product.product_name}</span>
//                     </Link>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <AccountDropdown />
//             ) : (
//               <Link href="/apps/login" className="text-[#1a4e78] hover:underline">
//                 Sign In
//               </Link>
//             )}
//             <div className="flex flex-col items-center">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <div className="relative cursor-pointer">
//                     <div className="flex flex-col items-center">
//                       <ShoppingCart className="h-6 w-6 text-[#1a4e78]" />
//                       <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                         {cartCount}
//                       </span>
//                       <span className="text-xs mt-1">CART</span>
//                     </div>
//                   </div>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-80 bg-white border rounded-md shadow-lg z-50">
//                   {cart.length === 0 ? (
//                     <div className="p-4 text-center text-[#1a4e78]">Your cart is empty</div>
//                   ) : (
//                     <>
//                       {cart.map((item) => (
//                         <DropdownMenuItem key={item.product_id} className="p-2">
//                           <Link
//                             href={`/${item.category_slug}/${item.slug}`}
//                             className="flex items-center w-full"
//                           >
//                             <Image
//                               src={item.image_url}
//                               alt={item.product_name}
//                               width={40}
//                               height={40}
//                               className="object-cover rounded mr-2"
//                             />
//                             <div className="flex-1">
//                               <span className="text-[#1a4e78] text-sm">{item.product_name}</span>
//                               <div className="text-sm">
//                                 <span className="text-red-600 font-bold">₹{parseFloat(item.selling_price).toFixed(2)}</span>
//                                 <span className="text-gray-600 ml-2">x {item.quantity}</span>
//                               </div>
//                             </div>
//                           </Link>
//                         </DropdownMenuItem>
//                       ))}
//                       <DropdownMenuItem className="p-2">
//                         <Link href="/cart" className="w-full">
//                           <Button className="w-full bg-[#1a7ec2] hover:bg-[#1a4e78]">
//                             View Cart
//                           </Button>
//                         </Link>
//                       </DropdownMenuItem>
//                     </>
//                   )}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Navigation */}
//       <nav className="bg-[#1a4e78] text-white hidden md:block relative z-10">
//         <div className="container mx-auto">
//           <ul className="flex overflow-x-auto">
//             {categories.map((category) => (
//               <li key={category.category_id}>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Link
//                       href={`/${category.slug}`}
//                       className="block px-4 py-3 whitespace-nowrap hover:bg-[#0f3a5f] transition-colors"
//                     >
//                       {category.category_name}
//                     </Link>
//                   </DropdownMenuTrigger>
//                   {category.subcategories.length > 0 && (
//                     <DropdownMenuContent className="bg-white border rounded-md shadow-lg z-50 min-w-[200px]">
//                       {category.subcategories.map((subcategory) => (
//                         <DropdownMenuItem key={subcategory.subcategory_id} asChild>
//                           <Link
//                             href={`/${category.slug}/${subcategory.slug}`}
//                             className="block px-4 py-2 text-[#1a4e78] hover:bg-gray-100"
//                           >
//                             {subcategory.subcategory_name}
//                           </Link>
//                         </DropdownMenuItem>
//                       ))}
//                     </DropdownMenuContent>
//                   )}
//                 </DropdownMenu>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={cn(
//           'fixed inset-0 bg-white z-40 transition-transform duration-300 transform md:hidden',
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         )}
//       >
//         <div className="h-full overflow-y-auto pt-16 pb-20">
//           <div className="px-4 py-2 border-b">
//             {isAuthenticated ? (
//               <AccountDropdown />
//             ) : (
//               <Link href="/apps/login" className="block py-2 text-[#1a4e78]">
//                 Sign In
//               </Link>
//             )}
//           </div>

//           <div className="px-4 py-2 border-b">
//             <h3 className="font-bold text-[#1a4e78] mb-2">Categories</h3>
//             <ul className="space-y-2">
//               {categories.map((category) => (
//                 <li key={category.category_id}>
//                   <Link
//                     href={`/${category.slug}`}
//                     className="flex items-center justify-between py-2"
//                     onClick={toggle}
//                   >
//                     <span>{category.category_name}</span>
//                     <ChevronRight className="h-4 w-4" />
//                   </Link>
//                   {category.subcategories.length > 0 && (
//                     <ul className="pl-4 space-y-1">
//                       {category.subcategories.map((subcategory) => (
//                         <li key={subcategory.subcategory_id}>
//                           <Link
//                             href={`/${category.slug}/${subcategory.slug}`}
//                             className="block py-1 text-sm"
//                             onClick={toggle}
//                           >
//                             {subcategory.subcategory_name}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="px-4 py-2">
//             <h3 className="font-bold text-[#1a4e78] mb-2">Account</h3>
//             <ul className="space-y-2">
//               {isAuthenticated ? (
//                 <>
//                   <li>
//                     <span className="block py-2 text-[#1a4e78] font-semibold">
//                       {authUtils.getUserFullName(user)}
//                     </span>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         logout();
//                         toggle();
//                       }}
//                       className="block py-2 text-[#1a4e78] w-full text-left"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <Link href="/apps/login" className="block py-2" onClick={toggle}>
//                     Sign In
//                   </Link>
//                 </li>
//               )}
//               <li>
//                 <Link href="/apps/account" className="block py-2" onClick={toggle}>
//                   My Account
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/apps/order-status" className="block py-2" onClick={toggle}>
//                   Order Status
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/Christian/Books/wishlist" className="block py-2" onClick={toggle}>
//                   Wishlist
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/apps/gift-card" className="block py-2" onClick={toggle}>
//                   Gift Cards
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }




'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useMobileMenu } from '../hooks/use-mobile-menu';
import { cn } from '../lib/utils';
import Logo from './logo';
import axiosInstance from '../lib/axiosInstance';
import { useCart } from '../lib/cart-context';
import { useAuth } from '../lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  subcategories: {
    subcategory_id: string;
    subcategory_name: string;
    slug: string;
  }[];
}

interface SearchResult {
  product_id: string;
  product_name: string;
  image_url: string;
  slug: string;
  category_slug: string;
}

export function Header() {
  const { isOpen, toggle } = useMobileMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { cart, cartCount } = useCart();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Enhanced debugging for auth state
  useEffect(() => {
    console.log('Header auth state:', {
      isLoading,
      isAuthenticated,
      user: user ? JSON.stringify(user, null, 2) : null,
      contextAvailable: !!useAuth,
    });
  }, [isLoading, isAuthenticated, user]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('get-menu-categories/');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowSearchDropdown(false);
        return;
      }

      setIsSearchLoading(true);
      try {
        const response = await axiosInstance.get(
          `/products/search?query=${encodeURIComponent(searchQuery)}`
        );
        setSearchResults(response.data || []);
        setShowSearchDropdown(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setShowSearchDropdown(false);
      } finally {
        setIsSearchLoading(false);
      }
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(handleSearch, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
  };

  // Render loading state until auth is initialized
  if (isLoading) {
    return (
      <div className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-3 text-center text-[#1a4e78] animate-pulse">
          Loading authentication...
        </div>
      </div>
    );
  }

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <button onClick={toggle} className="text-[#1a4e78]">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Logo />
              <div className="flex flex-col">
                <span className="text-[#1a4e78] font-bold text-sm">Elifein</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-[#1a4e78]"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-[#1a4e78]" />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className={cn(
            'mt-2 transition-all duration-300 overflow-hidden md:hidden relative',
            isSearchOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          ref={searchRef}
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="pr-10 border-[#1a4e78] focus:ring-[#1a4e78]"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
            />
            <Button
              className="absolute right-0 top-0 h-full bg-[#1a7ec2] hover:bg-[#1a4e78]"
              size="icon"
              onClick={handleSearchSubmit}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-[2000] max-h-96 overflow-y-auto">
              {isSearchLoading ? (
                <div className="p-4 text-center text-[#1a4e78]">Loading...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-[#1a4e78]">No products found</div>
              ) : (
                searchResults.map((product) => (
                  <Link
                    key={product.product_id}
                    href={`/${product.category_slug}/${product.slug}`}
                    className="flex items-center p-2 hover:bg-gray-100"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchDropdown(false);
                      setIsSearchOpen(false);
                    }}
                  >
                    <Image
                      src={product.image_url}
                      alt={product.product_name}
                      width={40}
                      height={40}
                      className="object-cover rounded mr-2"
                    />
                    <span className="text-[#1a4e78]">{product.product_name}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center">
                <Logo />
                <div className="flex flex-col">
                  <span className="text-[#1a4e78] font-bold text-lg">ELIFE IN</span>
                  <span className="text-[#1a4e78] text-xs">REACH TO PREACH</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4 relative" ref={searchRef}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by title"
                className="pr-10 border-[#1a4e78] focus:ring-[#1a4e78]"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
              />
              <Button
                className="absolute right-0 top-0 h-full bg-[#1a7ec2] hover:bg-[#1a4e78]"
                size="icon"
                onClick={handleSearchSubmit}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-60 max-h-96 overflow-y-auto">
                {isSearchLoading ? (
                  <div className="p-4 text-center text-[#1a4e78]">Loading...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-[#1a4e78]">No products found</div>
                ) : (
                  searchResults.map((product) => (
                    <Link
                      key={product.product_id}
                      href={`/${product.category_slug}/${product.slug}`}
                      className="flex items-center p-2 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }}
                    >
                      <Image
                        src={product.image_url}
                        alt={product.product_name}
                        width={40}
                        height={40}
                        className="object-cover rounded mr-2"
                      />
                      <span className="text-[#1a4e78]">{product.product_name}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-[#1a4e78] hover:underline"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/apps/login" className="text-[#1a4e78] hover:underline">
                Sign In
              </Link>
            )}
            <div className="flex flex-col items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative cursor-pointer">
                    <div className="flex flex-col items-center">
                      <ShoppingCart className="h-6 w-6 text-[#1a4e78]" />
                      <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                      <span className="text-xs mt-1">CART</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-white border rounded-md shadow-lg z-50">
                  {cart.length === 0 ? (
                    <div className="p-4 text-center text-[#1a4e78]">Your cart is empty</div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <DropdownMenuItem key={item.product_id} className="p-2">
                          <Link
                            href={`/${item.category_slug}/${item.slug}`}
                            className="flex items-center w-full"
                          >
                            <Image
                              src={item.image_url}
                              alt={item.product_name}
                              width={40}
                              height={40}
                              className="object-cover rounded mr-2"
                            />
                            <div className="flex-1">
                              <span className="text-[#1a4e78] text-sm">{item.product_name}</span>
                              <div className="text-sm">
                                <span className="text-red-600 font-bold">₹{parseFloat(item.selling_price).toFixed(2)}</span>
                                <span className="text-gray-600 ml-2">x {item.quantity}</span>
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem className="p-2">
                        <Link href="/cart" className="w-full">
                          <Button className="w-full bg-[#1a7ec2] hover:bg-[#1a4e78]">
                            View Cart
                          </Button>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-[#1a4e78] text-white hidden md:block relative z-10">
        <div className="container mx-auto">
          <ul className="flex overflow-x-auto">
            {categories.map((category) => (
              <li key={category.category_id}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href={`/${category.slug}`}
                      className="block px-4 py-3 whitespace-nowrap hover:bg-[#0f3a5f] transition-colors"
                    >
                      {category.category_name}
                    </Link>
                  </DropdownMenuTrigger>
                  {category.subcategories.length > 0 && (
                    <DropdownMenuContent className="bg-white border rounded-md shadow-lg z-50 min-w-[200px]">
                      {category.subcategories.map((subcategory) => (
                        <DropdownMenuItem key={subcategory.subcategory_id} asChild>
                          <Link
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="block px-4 py-2 text-[#1a4e78] hover:bg-gray-100"
                          >
                            {subcategory.subcategory_name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 transition-transform duration-300 transform md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full overflow-y-auto pt-16 pb-20">
          <div className="px-4 py-2 border-b">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  toggle();
                }}
                className="block py-2 text-[#1a4e78] hover:underline"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/apps/login" className="block py-2 text-[#1a4e78]">
                Sign In
              </Link>
            )}
          </div>

          <div className="px-4 py-2 border-b">
            <h3 className="font-bold text-[#1a4e78] mb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.category_id}>
                  <Link
                    href={`/${category.slug}`}
                    className="flex items-center justify-between py-2"
                    onClick={toggle}
                  >
                    <span>{category.category_name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  {category.subcategories.length > 0 && (
                    <ul className="pl-4 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.subcategory_id}>
                          <Link
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="block py-1 text-sm"
                            onClick={toggle}
                          >
                            {subcategory.subcategory_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-2">
            <h3 className="font-bold text-[#1a4e78] mb-2">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apps/account" className="block py-2" onClick={toggle}>
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/apps/order-status" className="block py-2" onClick={toggle}>
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="/Christian/Books/wishlist" className="block py-2" onClick={toggle}>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/apps/gift-card" className="block py-2" onClick={toggle}>
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}