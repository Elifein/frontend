'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Trash2, AlertCircle } from 'lucide-react';

import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { Card, CardContent } from '../../../../components/ui/card';
import { Label } from '../../../../components/ui/label';
import { Switch } from '../../../../components/ui/switch';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../../components/ui/alert';

import axiosInstance from '../../../../lib/axiosInstance';

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

export default function AddCategoryPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent: '',
    featured: false,
    show_in_menu: true,
    meta_title: '',
    meta_description: '',
    status: false,
  });

  const [image, setImage] = useState<{ file: File | null; preview: string }>({
    file: null,
    preview: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [parentOptions, setParentOptions] = useState<
    {
      category_id: string;
      category_name: string;
      subcategories: Subcategory[];
    }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/get-categories/');
        if (response.data?.data) {
          setParentOptions(response.data.data); // Directly use the data array
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load parent categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      }));
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
      if (!formData.name) {
        throw new Error('Category name is required');
      }

      const submissionData = new FormData();
      submissionData.append('name', formData.name);
      submissionData.append('slug', formData.slug);
      submissionData.append('description', formData.description);
      submissionData.append(
        'parent',
        formData.parent === 'none' ? '' : formData.parent
      );
      submissionData.append('featured', String(formData.featured));
      submissionData.append('show_in_menu', String(formData.show_in_menu));
      submissionData.append('meta_title', formData.meta_title);
      submissionData.append('meta_description', formData.meta_description);
      submissionData.append('status', String(formData.status));
      if (image.file) {
        submissionData.append('file', image.file);
      }

      const response = await axiosInstance.post(
        '/create-product-categories/',
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('Category added successfully:', response.data);
        setSuccess(true);
        setFormData({
          name: '',
          slug: '',
          description: '',
          parent: '',
          featured: false,
          show_in_menu: true,
          meta_title: '',
          meta_description: '',
          status: false,
        });
        setImage({ file: null, preview: '' });
        setTimeout(() => router.push('/categories'), 2000);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while adding the category'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Add New Category</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/categories">Cancel</Link>
          </Button>
          <Button type="submit" form="category-form" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Category'}
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
            Category has been added successfully! Redirecting...
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
                    checked={formData.show_in_menu}
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
                    <Label htmlFor="parent">Parent Category</Label>
                    <Select
                      value={formData.parent}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          parent: value,
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
                        {parentOptions.map((category) => (
                          <SelectItem
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category.category_name}
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
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                          id="meta_title"
                          name="meta_title"
                          value={formData.meta_title}
                          onChange={handleInputChange}
                          placeholder="Enter meta title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meta_description">
                          Meta Description
                        </Label>
                        <Textarea
                          id="meta_description"
                          name="meta_description"
                          value={formData.meta_description}
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
