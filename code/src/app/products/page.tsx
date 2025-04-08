import Link from 'next/link';
import { Filter } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ProductCard } from '../../components/product-card';
import { CartProvider } from '../../components/cart-provider';
import { MainNav } from '../../components/main-nav';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';

// Sample products data
const products = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    price: 49.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Home Decor',
  },
  {
    id: '2',
    name: 'Leather Weekender Bag',
    price: 129.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Accessories',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    price: 89.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug',
    price: 24.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Kitchen',
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: 199.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Electronics',
  },
  {
    id: '6',
    name: 'Cotton T-Shirt',
    price: 29.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Clothing',
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    price: 34.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Kitchen',
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Electronics',
  },
];

// Sample categories for filtering
const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Home Decor',
  'Kitchen',
  'Accessories',
];

export default function ProductsPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center">
            <MainNav />
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  All Products
                </h1>
                <p className="text-muted-foreground">
                  Browse our collection of quality products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-6 py-6">
                      <div>
                        <h3 className="mb-4 text-sm font-medium">Categories</h3>
                        <div className="space-y-3">
                          {categories.map((category) => (
                            <div
                              key={category}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`category-${category}`} />
                              <Label htmlFor={`category-${category}`}>
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-4 text-sm font-medium">
                          Price Range
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="min-price">Min</Label>
                            <Input
                              id="min-price"
                              type="number"
                              placeholder="$0"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="max-price">Max</Label>
                            <Input
                              id="max-price"
                              type="number"
                              placeholder="$999"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Apply Filters</Button>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="hidden md:flex md:gap-2">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="mx-2">
                Previous
              </Button>
              <Button variant="outline" className="mx-2">
                Next
              </Button>
            </div>
          </div>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2023 ShopSmart. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
