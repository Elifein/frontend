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
  ChevronDown,
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
import axiosInstance from '../../../lib/axiosInstance';

interface Subcategory {
  subcategory_id: string;
  subcategory_name: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  imgthumbnail: string;
  featured_category: boolean;
  show_in_menu: boolean;
  status: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<
    {
      category_id: string;
      category_name: string;
      slug: string;
      description: string;
      imgthumbnail: string | null;
      featured_category: boolean;
      subcategories: Subcategory[];
    }[]
  >([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (category) =>
      category.category_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
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
      setSelectedCategories(
        filteredCategories.map((category) => category.category_id)
      );
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
          {error && (
            <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}
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
              {/* <TableHead className="text-center">Products</TableHead> */}
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
                <TableRow key={category.category_id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCategories.includes(
                        category.category_id
                      )}
                      onCheckedChange={() =>
                        toggleCategorySelection(category.category_id)
                      }
                      aria-label={`Select ${category.category_name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-md border">
                      <Image
                        src={category.imgthumbnail || '/images/placeholder.svg'}
                        alt={category.category_name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {category.category_name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {category.description.length > 60
                      ? `${category.description.substring(0, 60)}...`
                      : category.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">
                    {category.slug}
                  </TableCell>
                  {/* <TableCell className="hidden md:table-cell">
                    {category.parent || '—'}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{category.productsCount}</Badge>
                  </TableCell> */}
                  <TableCell className="hidden md:table-cell">
                    {category.subcategories.length > 0
                      ? 'Has Subcategories'
                      : '—'}
                  </TableCell>
                  <TableCell className="text-center">
                    {category.featured_category ? (
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
                            href={`/categories/edit/${category.category_id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/categories/${category.slug}`}
                            className="flex items-center"
                          >
                            <ChevronDown className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(category.category_id)}
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
