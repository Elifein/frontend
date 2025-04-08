'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Trash2, AlertCircle } from 'lucide-react';

import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { Textarea } from '../../../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import { Card, CardContent } from '../../../../../components/ui/card';
import { Label } from '../../../../../components/ui/label';
import { Switch } from '../../../../../components/ui/switch';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../../../components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';

// Sample parent categories for the dropdown
const parentCategories = [
  { id: '1', name: 'Electronics' },
  { id: '5', name: 'Clothing' },
  { id: '8', name: 'Home & Kitchen' },
  { id: '9', name: 'Beauty' },
];

// Sample categories data - in a real app, this would be fetched from an API
const categories = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: '/images/placeholder.svg?height=400&width=400',
    productsCount: 42,
    featured: true,
    showInMenu: true,
    parent: null,
    metaTitle: 'Electronics - Shop the latest devices',
    metaDescription:
      'Browse our collection of electronic devices including smartphones, laptops, and audio equipment.',
  },
  {
    id: '5',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Apparel and fashion items',
    image: '/images/placeholder.svg?height=400&width=400',
    productsCount: 36,
    featured: true,
    showInMenu: true,
    parent: null,
    metaTitle: 'Clothing - Fashion for everyone',
    metaDescription:
      'Discover our latest clothing collections for men, women, and children.',
  },
];

export default function EditCategoryPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    featured: false,
    showInMenu: true,
    metaTitle: '',
    metaDescription: '',
  });

  const [image, setImage] = useState<{ file: File | null; preview: string }>({
    file: null,
    preview: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch category data
  useEffect(() => {
    // In a real app, you would fetch the category data from an API
    // For this example, we'll use the sample data
    const category = categories.find((c) => c.id === id);

    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentCategory: category.parent || '',
        featured: category.featured,
        showInMenu: category.showInMenu,
        metaTitle: category.metaTitle,
        metaDescription: category.metaDescription,
      });

      // Set image
      setImage({
        file: null,
        preview: category.image,
      });
    } else {
      setError('Category not found');
    }

    setIsLoading(false);
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name if slug is empty or matches the previous name-based slug
    if (name === 'name') {
      const newSlug = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      const currentSlug = formData.slug;
      const currentName = formData.name;
      const currentNameAsSlug = currentName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      if (!currentSlug || currentSlug === currentNameAsSlug) {
        setFormData((prev) => ({
          ...prev,
          slug: newSlug,
        }));
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage({
          file,
          preview: event.target?.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage({ file: null, preview: '' });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.name) {
        throw new Error('Category name is required');
      }

      // In a real app, you would upload image and submit form data to your API
      // For this example, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        router.push('/categories');
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while updating the category'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to delete the category
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to categories page after successful deletion
      router.push('/categories');
    } catch (error) {
      console.error(error); // optional, good for debugging
      setError('Failed to delete category');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              Loading category data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/categories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Category</h1>
        </div>

        <div className="flex gap-2">
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this category?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  category and may affect products assigned to it.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete Category'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" asChild>
            <Link href="/admin/categories">Cancel</Link>
          </Button>
          <Button type="submit" form="category-form" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Category has been updated successfully! Redirecting...
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Category Image Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Category Image</h2>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-md border bg-muted relative">
                  {image.preview ? (
                    <>
                      <Image
                        src={image.preview || '/images/placeholder.svg'}
                        alt="Category preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={removeImage}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div
                      className="flex h-full items-center justify-center cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <div className="flex flex-col items-center gap-1 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Click to upload category image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SVG, PNG, JPG or GIF (max. 2MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Category Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Category</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, featured: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showInMenu">Show in Menu</Label>
                  <Switch
                    id="showInMenu"
                    checked={formData.showInMenu}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, showInMenu: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Details Form */}
        <div className="md:col-span-2">
          <form id="category-form" onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Category Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="enter-category-slug"
                    />
                    <p className="text-sm text-muted-foreground">
                      The `&quot;`slug`&quot;` is the URL-friendly version of
                      the name. It is usually all lowercase and contains only
                      letters, numbers, and hyphens.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentCategory">Parent Category</Label>
                    <Select
                      value={formData.parentCategory}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          parentCategory: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="None (top level category)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          None (top level category)
                        </SelectItem>
                        {parentCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Categories can be nested hierarchically. You can select a
                      parent category if this is a subcategory.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter category description"
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      The description is not prominent by default; however, some
                      themes may show it.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-base font-medium mb-4">SEO Settings</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input
                          id="metaTitle"
                          name="metaTitle"
                          value={formData.metaTitle}
                          onChange={handleInputChange}
                          placeholder="Enter meta title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaDescription">
                          Meta Description
                        </Label>
                        <Textarea
                          id="metaDescription"
                          name="metaDescription"
                          value={formData.metaDescription}
                          onChange={handleInputChange}
                          placeholder="Enter meta description"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
