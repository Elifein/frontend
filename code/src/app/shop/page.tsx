'use client';

import * as React from 'react';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Slider } from '../../components/ui/slider';
import { cn } from '../../lib/utils';
import { ProductCard } from '../../components/product-card';

// Simplified Product interface to match ProductCard expectations
interface Product {
  id: string;
  name: string;
  image: string;
  price: number; // Changed to simple number
  status?: 'out_of_stock' | 'featured';
  category: string;
}

const products: Product[] = [
  {
    id: 'baby-chicken',
    name: '3 Whole Baby Chicken',
    image: '/images/placeholder.svg?height=300&width=300',
    price: 9.99, // Using average of previous min/max
    category: 'Fresh Meat',
  },
  {
    id: 'super-naan',
    name: '5 Super Naan',
    image: '/images/placeholder.svg?height=300&width=300',
    price: 1.99,
    category: 'Bakery Products',
  },
  {
    id: '7up',
    name: '7UP 330ml',
    image: '/images/placeholder.svg?height=300&width=300',
    price: 0.65,
    category: 'Beverages',
  },
  {
    id: 'aero-milk',
    name: 'Aero Bubbly Milk Chocolate Bar',
    image: '/images/placeholder.svg?height=300&width=300',
    price: 0.6,
    status: 'out_of_stock',
    category: 'Grocery Items',
  },
  {
    id: 'aero-peppermint',
    name: 'Aero Choc Peppermint',
    image: '/images/placeholder.svg?height=300&width=300',
    price: 0.6,
    status: 'out_of_stock',
    category: 'Grocery Items',
  },
  {
    id: 'dates',
    name: 'Afak Special Dates 900g',
    image: '/images/placeholder.svg?height=300&width=300',
    price: 3.99,
    category: 'Grocery Items',
  },
];

const categories = [
  'All Products',
  'Bakery Products',
  'Beverages',
  'Dairy Products',
  'Desserts',
  'Fresh Fruits and Vegetables',
  'Fresh Meat',
  'Frozen Foods',
  'Grocery Items',
  'Health & Beauty',
  'Household Items',
  'Marinate It',
  'Popular Brands',
  'Poultry',
  'Special Offer',
];

export default function ShopPage() {
  const [priceRange, setPriceRange] = React.useState([0, 220]);
  const [selectedCategory, setSelectedCategory] =
    React.useState('All Products');
  const [sortBy, setSortBy] = React.useState('default');

  const filteredProducts = React.useMemo(() => {
    return products
      .filter((product) => {
        const withinPriceRange =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesCategory =
          selectedCategory === 'All Products' ||
          product.category === selectedCategory;
        return withinPriceRange && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return 0;
      });
  }, [priceRange, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h2 className="font-semibold mb-4">Price</h2>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  min={0}
                  max={220}
                  step={1}
                  onValueChange={setPriceRange}
                />
                <div className="text-sm text-gray-600">
                  Price: £{priceRange[0]} — £{priceRange[1]}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setPriceRange([0, 220])}
                >
                  Filter
                </Button>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Product categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={cn(
                        'text-sm hover:text-[#40B86D] transition-colors',
                        selectedCategory === category &&
                          'text-[#40B86D] font-medium'
                      )}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} results
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Default sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default sorting</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
