'use client';

import { useEffect, useState, useCallback } from 'react';
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
  ChevronRight,
  Eye,
  RotateCcw,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import axiosInstance from '../../../lib/axiosInstance';

// Define interfaces for raw API response
interface RawSubcategory {
  subcategory_id: string;
  subcategory_name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  imgthumbnail: string | null;
  featured_category: boolean;
  show_in_menu: boolean;
  status: boolean;
  productsCount?: number;
}

interface RawCategory {
  category_id: string;
  category_name: string;
  slug: string;
  description: string | null;
  imgthumbnail: string | null;
  featured_category: boolean;
  status: boolean;
  productsCount?: number;
  subcategories: RawSubcategory[];
}

interface ApiResponse {
  data: RawCategory[];
}

// Define interfaces for transformed data
interface Subcategory {
  subcategory_id: string;
  subcategory_name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  imgthumbnail: string | null;
  featured_category: boolean;
  show_in_menu: boolean;
  status: boolean;
  parentId: string | null;
  level: number;
  productsCount?: number;
}

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  description: string | null;
  imgthumbnail: string | null;
  featured_category: boolean;
  status: boolean;
  subcategories: Subcategory[];
  parentId: string | null;
  level: number;
  productsCount?: number;
}

// Union type for categories and subcategories
type CategoryOrSubcategory = Category | Subcategory;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [categoryToProcess, setCategoryToProcess] = useState<string[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'restore'>('delete');

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/get-categories/');
      if (response.data?.data) {
        const transformedCategories: Category[] = response.data.data.map((category: RawCategory) => ({
          category_id: category.category_id,
          category_name: category.category_name,
          slug: category.slug,
          description: category.description ?? null,
          imgthumbnail: category.imgthumbnail ?? null,
          featured_category: category.featured_category ?? false,
          status: category.status ?? false,
          parentId: null,
          level: 0,
          productsCount: category.productsCount ?? 0,
          subcategories: category.subcategories.map((sub: RawSubcategory) => ({
            subcategory_id: sub.subcategory_id,
            subcategory_name: sub.subcategory_name,
            slug: sub.slug,
            description: sub.description ?? null,
            meta_title: sub.meta_title ?? null,
            meta_description: sub.meta_description ?? null,
            imgthumbnail: sub.imgthumbnail ?? null,
            featured_category: sub.featured_category ?? false,
            show_in_menu: sub.show_in_menu ?? true,
            status: sub.status ?? false,
            parentId: category.category_id,
            level: 1,
            productsCount: sub.productsCount ?? 0,
          })),
        }));
        setCategories(transformedCategories);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Flatten categories and subcategories
  const allCategories = categories.reduce<CategoryOrSubcategory[]>((acc, category) => {
    acc.push(category);
    if (category.subcategories.length > 0) {
      acc.push(...category.subcategories);
    }
    return acc;
  }, []);

  // Filter categories based on search query
  const filteredCategories = allCategories.filter((category) =>
    ('category_name' in category
      ? category.category_name
      : category.subcategory_name
    )
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (category.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  // Determine if a category/subcategory is visible
  const isCategoryVisible = (category: CategoryOrSubcategory) => {
    if (category.level === 0) return true;
    return category.parentId !== null && expandedCategories.includes(category.parentId);
  };

  // Get visible categories
  const visibleCategories = filteredCategories.filter(isCategoryVisible);

  const toggleCategorySelection = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === visibleCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(
        visibleCategories.map((category) =>
          'category_id' in category ? category.category_id : category.subcategory_id
        )
      );
    }
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const confirmAction = (ids: string | string[], action: 'delete' | 'restore') => {
    setCategoryToProcess(Array.isArray(ids) ? ids : [ids]);
    setActionType(action);
    setIsActionDialogOpen(true);
  };

  const handleAction = useCallback(async () => {
    if (!categoryToProcess || categoryToProcess.length === 0) return;

    setIsProcessing(true);
    setError('');

    // Optimistic update: Update the UI immediately
    const newStatus = actionType === 'delete' ? true : false;
    setCategories((prevCategories) =>
      prevCategories.map((cat) => ({
        ...cat,
        status: categoryToProcess.includes(cat.category_id) ? newStatus : cat.status,
        subcategories: cat.subcategories.map((sub) => ({
          ...sub,
          status: categoryToProcess.includes(sub.subcategory_id) ? newStatus : sub.status,
        })),
      }))
    );

    try {
      const results = await Promise.allSettled(
        categoryToProcess.map(async (id) => {
          const isSubcategory = allCategories.some(
            (cat) => 'subcategory_id' in cat && cat.subcategory_id === id
          );
          const endpoint = actionType === 'delete'
            ? (isSubcategory ? `subcategory/${id}/delete` : `category/${id}/delete`)
            : (isSubcategory ? `subcategory/${id}/restore` : `category/${id}/restore`);

          return await axiosInstance.put(endpoint);
        })
      );

      const failedRequests = results.filter((result) => result.status === 'rejected');
      if (failedRequests.length > 0) {
        // Revert optimistic update on failure
        await fetchCategories();
        throw new Error(`${failedRequests.length} requests failed`);
      }
    } catch (error) {
      console.error(`Failed to ${actionType} categories:`, error);
      setError(`Failed to ${actionType} categories. Please try again.`);
    } finally {
      setIsActionDialogOpen(false);
      setCategoryToProcess(null);
      setSelectedCategories([]);
      setIsProcessing(false);
    }
  }, [categoryToProcess, actionType, allCategories, fetchCategories]);

  const handleBulkAction = (action: 'delete' | 'restore') => {
    if (selectedCategories.length === 0) return;
    confirmAction(selectedCategories, action);
  };

  const getStatusBadge = (status: boolean) => {
    return status ? (
      <Badge variant="destructive">Inactive</Badge>
    ) : (
      <Badge variant="default">Active</Badge>
    );
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage your product categories</p>
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

      {error && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {selectedCategories.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
          <span className="text-sm">
            {selectedCategories.length}{' '}
            {selectedCategories.length === 1 ? 'category' : 'categories'} selected
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleBulkAction('delete')} 
            disabled={isProcessing}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Make Inactive
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleBulkAction('restore')} 
            disabled={isProcessing}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Make Active
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
                    selectedCategories.length === visibleCategories.length &&
                    visibleCategories.length > 0
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
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Slug</TableHead>
              <TableHead className="hidden md:table-cell">Parent</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              visibleCategories.map((category) => {
                const isSubcategory = 'subcategory_id' in category;
                const id = isSubcategory ? category.subcategory_id : category.category_id;
                const name = isSubcategory ? category.subcategory_name : category.category_name;
                const hasChildren = !isSubcategory && category.subcategories.length > 0;

                return (
                  <TableRow key={`${id}-${category.status}`} className={category.status ? 'opacity-60' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(id)}
                        onCheckedChange={() => toggleCategorySelection(id)}
                        aria-label={`Select ${name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="h-10 w-10 overflow-hidden rounded-md border">
                        <Image
                          src={category.imgthumbnail || '/images/placeholder.svg'}
                          alt={name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {category.level > 0 && (
                          <div style={{ width: `${category.level * 20}px` }} className="flex-shrink-0" />
                        )}
                        {hasChildren ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 mr-1"
                            onClick={() => toggleCategoryExpansion(id)}
                          >
                            {expandedCategories.includes(id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        ) : (
                          <div className="w-7" />
                        )}
                        <span className="font-medium">{name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {category.description && category.description.length > 60
                        ? `${category.description.substring(0, 60)}...`
                        : category.description || '—'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-sm">
                      {category.slug}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {isSubcategory
                        ? categories.find((cat) => cat.category_id === category.parentId)
                            ?.category_name || '—'
                        : '—'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{category.productsCount ?? 0}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {category.featured_category ? (
                        <Badge>Featured</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(category.status)}
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
                            <Link href={`/categories/view/${id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/categories/edit/${id}`} className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {category.status ? (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => confirmAction(id, 'restore')}
                            >
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Make Active
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => confirmAction(id, 'delete')}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Make Inactive
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to {actionType === 'delete' ? 'deactivate' : 'activate'}{' '}
              {categoryToProcess && categoryToProcess.length > 1
                ? 'these categories'
                : 'this category'}
              ?
            </DialogTitle>
            <DialogDescription>
              {actionType === 'delete' 
                ? 'This will mark the category as inactive. You can reactivate it later if needed.'
                : 'This will mark the category as active and it will be visible to users.'
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsActionDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === 'delete' ? 'destructive' : 'default'}
              onClick={handleAction}
              disabled={isProcessing}
            >
              {isProcessing 
                ? `${actionType === 'delete' ? 'Deactivating' : 'Activating'}...` 
                : `${actionType === 'delete' ? 'Deactivate' : 'Activate'} Category`
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}