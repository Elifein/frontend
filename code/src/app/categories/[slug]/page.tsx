'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ProductCard } from '../../../components/product-card';
import { CartProvider } from '../../../components/cart-provider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../components/ui/sheet';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import axiosInstance from '../../../lib/axiosInstance';

interface Product {
  product_id: string;
  product_name: string;
  selling_price: string;
  image_url: string;
}

const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Home Decor',
  'Kitchen',
  'Accessories',
];

export default function ProductsPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
    
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>('All Products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the slug directly in the API call
        const response = await axiosInstance.get(`/products/by-category/${slug}`);
        setFilteredProducts(response.data);
        
        // Optionally, you can format category name if needed
        setCategoryName(slug.replace('-', ' ').toUpperCase() || 'All Products');
      } catch (error) {
        console.error('Error fetching products:', error);
        setFilteredProducts([]);
        setCategoryName('All Products');
      }
    };

    if (slug) {
      fetchProducts();
    } else {
      // Default fallback if no slug (e.g., All Products)
      setCategoryName('All Products');
      setFilteredProducts([]);
    }
  }, [slug]);

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {categoryName}
                </h1>
                <p className="text-muted-foreground">
                  Browse our collection of {categoryName}
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
                              placeholder="₹0"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="max-price">Max</Label>
                            <Input
                              id="max-price"
                              type="number"
                              placeholder="₹999"
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
            {
  filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
        <ProductCard
        key={product.product_id}
        product={{
          id: product.product_id,
          name: product.product_name,
          price: parseFloat(product.selling_price) || 0,
          image: product.image_url,
          category: '', // If category is not provided by API, you can use an empty string or a default
        }}
      />
    ))
  ) : (
    <div>No products available in this category.</div>
  )
}

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
      </div>
    </CartProvider>
  );
}
