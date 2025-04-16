'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import axiosInstance from '../../../lib/axiosInstance';

interface Product {
  product_id: string;
  cat_id: string;
  subcat_id: string | null;
  identification: {
    product_name: string;
    product_sku: string;
  };
  descriptions: {
    short_description: string;
    full_description: string;
  } | null;
  pricing: {
    actual_price: string;
    selling_price: string;
  } | null;
  inventory: {
    quantity: string;
    stock_alert_status: string;
  } | null;
  physical_attributes: {
    weight: string;
    dimensions: { length: string; width: string; height: string };
    shipping_class: string;
  } | null;
  images: { urls: string[] } | null;
  tags_and_relationships: {
    product_tags: string[];
    linkedproductid: string;
  } | null;
  status_flags: {
    featured_product: boolean;
    published_product: boolean;
    product_status: boolean;
  };
  timestamp: string;
}

interface Category {
  category_id: string;
  category_name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/');
        // Handle successful response
        if (response.status === 200) {
          // Check if response.data is an array (direct product list) or APIResponse
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else if (response.data?.status_code === 404) {
            setError('No products found.');
            setProducts([]);
          } else {
            throw new Error('Unexpected response format');
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(
          error.response?.data?.message ||
            'Failed to load products. Please try again.'
        );
        setProducts([]);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/get-categories/');
        if (response.data?.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load parent categories. Please try again.');
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      (product.identification?.product_name?.toLowerCase() || '').includes(
        searchQuery.toLowerCase()
      ) ||
      (product.identification?.product_sku?.toLowerCase() || '').includes(
        searchQuery.toLowerCase()
      );

    // Category filter
    const matchesCategory =
      categoryFilter === 'all' ||
      product.cat_id.toLowerCase() === categoryFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' &&
        product.status_flags.published_product) ||
      (statusFilter === 'unpublished' &&
        !product.status_flags.published_product);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(
        filteredProducts.map((product) => product.product_id)
      );
    }
  };

  const handleDelete = (productId: string) => {
    // In a real app, you would call an API to delete the product
    alert(`Delete product ${productId}`);
  };

  const handleBulkDelete = () => {
    // In a real app, you would call an API to delete multiple products
    alert(`Delete products: ${selectedProducts.join(', ')}`);
    setSelectedProducts([]);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link href="/products/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          {error && (
            <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.category_id}
                value={category.category_id}
              >
                {category.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter className="h-4 w-4" />
          <span className="sr-only">More filters</span>
        </Button>

        {(categoryFilter !== 'all' ||
          statusFilter !== 'all' ||
          searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCategoryFilter('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="ml-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {selectedProducts.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
          <span className="text-sm">
            {selectedProducts.length}{' '}
            {selectedProducts.length === 1 ? 'product' : 'products'} selected
          </span>
          <Button variant="outline" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedProducts.length === filteredProducts.length &&
                    filteredProducts.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all products"
                />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Product
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">SKU</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>
                <div className="flex items-center justify-end">
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="hidden md:table-cell text-center">
                Status
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.product_id)}
                      onCheckedChange={() =>
                        toggleProductSelection(product.product_id)
                      }
                      aria-label={`Select ${product.identification.product_name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-md border">
                      <Image
                        src={
                          product.images?.urls[0] || '/images/placeholder.svg'
                        }
                        alt={product.identification.product_name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {product.identification.product_name}
                    </div>
                    {product.status_flags.featured_product && (
                      <Badge variant="outline" className="mt-1">
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">
                    {product.identification.product_sku}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {categories.find(
                      (cat) => cat.category_id === product.cat_id
                    )?.category_name || product.cat_id}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    $
                    {parseFloat(
                      product.pricing?.selling_price ||
                        product.pricing?.actual_price ||
                        '0'
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {product.inventory?.quantity || '0'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <Badge
                      variant={
                        product.inventory?.stock_alert_status === 'instock'
                          ? 'default'
                          : product.inventory?.stock_alert_status ===
                              'backorder'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {product.inventory?.stock_alert_status || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/products/edit/${product.product_id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(product.product_id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to{' '}
          <strong>{filteredProducts.length}</strong> of{' '}
          <strong>{products.length}</strong> products
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
