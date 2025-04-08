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

// Sample categories data
const categories = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 42,
    featured: true,
    parent: null,
  },
  {
    id: '2',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Mobile phones and accessories',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 18,
    featured: false,
    parent: 'Electronics',
  },
  {
    id: '3',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Notebook computers and accessories',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 15,
    featured: true,
    parent: 'Electronics',
  },
  {
    id: '4',
    name: 'Audio',
    slug: 'audio',
    description: 'Headphones, speakers and audio equipment',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 9,
    featured: false,
    parent: 'Electronics',
  },
  {
    id: '5',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Apparel and fashion items',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 36,
    featured: true,
    parent: null,
  },
  {
    id: '6',
    name: 'Men',
    slug: 'men',
    description: "Men's clothing and accessories",
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 14,
    featured: false,
    parent: 'Clothing',
  },
  {
    id: '7',
    name: 'Women',
    slug: 'women',
    description: "Women's clothing and accessories",
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 22,
    featured: false,
    parent: 'Clothing',
  },
  {
    id: '8',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Home goods and kitchen appliances',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 28,
    featured: true,
    parent: null,
  },
  {
    id: '9',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Beauty and personal care products',
    image: '/images/placeholder.svg?height=40&width=40',
    productsCount: 19,
    featured: false,
    parent: null,
  },
];

export default function CategoriesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map((category) => category.id));
    }
  };

  const handleDelete = (categoryId: string) => {
    // In a real app, you would call an API to delete the category
    alert(`Delete category ${categoryId}`);
  };

  const handleBulkDelete = () => {
    // In a real app, you would call an API to delete multiple categories
    alert(`Delete categories: ${selectedCategories.join(', ')}`);
    setSelectedCategories([]);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link href="/categories/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Link>
          </Button>
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
          <span className="text-sm">
            {selectedCategories.length}{' '}
            {selectedCategories.length === 1 ? 'category' : 'categories'}{' '}
            selected
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
                    selectedCategories.length === filteredCategories.length &&
                    filteredCategories.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all categories"
                />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">Slug</TableHead>
              <TableHead className="hidden md:table-cell">Parent</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() =>
                        toggleCategorySelection(category.id)
                      }
                      aria-label={`Select ${category.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-md border">
                      <Image
                        src={category.image || '/images/placeholder.svg'}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {category.description.length > 60
                      ? `${category.description.substring(0, 60)}...`
                      : category.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">
                    {category.slug}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.parent || '—'}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{category.productsCount}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {category.featured ? (
                      <Badge>Featured</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
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
                            href={`/categories/edit/${category.id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                          <Link href={`/categories/${category.slug}`} className="flex items-center">
                            <ChevronDown className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(category.id)}
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
    </div>
  );
}
