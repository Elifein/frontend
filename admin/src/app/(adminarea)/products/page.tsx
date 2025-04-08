'use client';

import { useState } from 'react';
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

// Sample products data
const products = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    price: 49.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Home Decor',
    stock: 45,
    status: 'In Stock',
    featured: true,
    sku: 'LAMP-001',
    dateAdded: '2023-06-12',
  },
  {
    id: '2',
    name: 'Leather Weekender Bag',
    price: 129.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Accessories',
    stock: 12,
    status: 'In Stock',
    featured: false,
    sku: 'BAG-002',
    dateAdded: '2023-06-10',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    price: 89.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Electronics',
    stock: 28,
    status: 'In Stock',
    featured: true,
    sku: 'AUDIO-003',
    dateAdded: '2023-06-08',
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug',
    price: 24.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Kitchen',
    stock: 56,
    status: 'In Stock',
    featured: false,
    sku: 'MUG-004',
    dateAdded: '2023-06-05',
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: 199.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Electronics',
    stock: 8,
    status: 'Low Stock',
    featured: true,
    sku: 'WATCH-005',
    dateAdded: '2023-06-03',
  },
  {
    id: '6',
    name: 'Cotton T-Shirt',
    price: 29.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Clothing',
    stock: 0,
    status: 'Out of Stock',
    featured: false,
    sku: 'SHIRT-006',
    dateAdded: '2023-06-01',
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    price: 34.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Kitchen',
    stock: 32,
    status: 'In Stock',
    featured: false,
    sku: 'BOTTLE-007',
    dateAdded: '2023-05-28',
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: '/images/placeholder.svg?height=50&width=50',
    category: 'Electronics',
    stock: 15,
    status: 'In Stock',
    featured: true,
    sku: 'SPEAKER-008',
    dateAdded: '2023-05-25',
  },
];

// Sample categories for filtering
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'home-decor', name: 'Home Decor' },
  { id: 'accessories', name: 'Accessories' },
];

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      categoryFilter === 'all' ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      product.status.toLowerCase().replace(/\s+/g, '-') ===
        statusFilter.toLowerCase();

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
      setSelectedProducts(filteredProducts.map((product) => product.id));
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
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
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
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProductSelection(product.id)}
                      aria-label={`Select ${product.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-md border">
                      <Image
                        src={product.image || '/images/placeholder.svg'}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    {product.featured && (
                      <Badge variant="outline" className="mt-1">
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">{product.stock}</TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <Badge
                      variant={
                        product.status === 'In Stock'
                          ? 'default'
                          : product.status === 'Low Stock'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {product.status}
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
                            href={`/products/edit/${product.id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                          <Link href={`/products/${product.id}`} className="flex items-center">
                            <ChevronDown className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
