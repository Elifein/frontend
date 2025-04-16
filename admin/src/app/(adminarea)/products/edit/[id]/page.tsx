'use client';

import type React from 'react';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus, Trash2, AlertCircle } from 'lucide-react';

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';
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
import axiosInstance from '../../../../../lib/axiosInstance';
import axios from 'axios';

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

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  imgthumbnail: string;
  featured_category: boolean;
  show_in_menu: boolean;
  status: boolean;
  subcategories: Subcategory[];
}

// Combined type for dropdown options
interface DropdownOption {
  id: string; // category_id or subcategory_id
  name: string;
  isSubcategory: boolean;
  parentId?: string;
}

type Props = {
  params: Promise<{ id: string }>; // Update type to reflect params as a Promise
};

export default function EditProductPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    cat_id: '',
    subcat_id: '', // Will be set based on selected category/subcategory
    identification: { product_name: '', product_sku: '' },
    descriptions: { short_description: '', full_description: '' },
    pricing: { actual_price: '', selling_price: '' },
    inventory: { quantity: '', stock_alert_status: 'instock' },
    physical_attributes: {
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      shipping_class: 'standard',
    },
    images: [] as File[],
    tags_and_relationships: {
      product_tags: [] as string[],
      linkedproductid: '',
    },
    status_flags: {
      featured_product: false,
      published_product: true,
      product_status: false,
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const product = response.data;

        setFormData({
          cat_id: product.cat_id || '',
          subcat_id: product.subcat_id || '',
          identification: product.identification || {
            product_name: '',
            product_sku: '',
          },
          descriptions: product.descriptions || {
            short_description: '',
            full_description: '',
          },
          pricing: product.pricing || { actual_price: '', selling_price: '' },
          inventory: product.inventory || {
            quantity: '',
            stock_alert_status: 'instock',
          },
          physical_attributes: product.physical_attributes || {
            weight: '',
            dimensions: { length: '', width: '', height: '' },
            shipping_class: 'standard',
          },
          images: [],
          tags_and_relationships: product.tags_and_relationships || {
            product_tags: [],
            linkedproductid: '',
          },
          status_flags: product.status_flags || {
            featured_product: false,
            published_product: true,
            product_status: false,
          },
        });

        // Set image previews
        const urls = product.images?.urls || [];
        setImagePreviews(urls.concat(Array(5 - urls.length).fill('')));
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load product data');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/get-categories/');
        if (response.data?.status_code === 200 && response.data?.data) {
          const categories: Category[] = response.data.data;

          // Flatten categories and subcategories into a single dropdown list
          const options: DropdownOption[] = [];
          categories.forEach((category) => {
            options.push({
              id: category.category_id,
              name: category.category_name,
              isSubcategory: false,
            });
            category.subcategories.forEach((subcategory) => {
              options.push({
                id: subcategory.subcategory_id,
                name: `— ${subcategory.subcategory_name}`,
                isSubcategory: true,
                parentId: category.category_id,
              });
            });
          });
          setDropdownOptions(options);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(
          'Failed to load categories and subcategories. Please try again.'
        );
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof typeof formData,
    key: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: e.target.value,
      },
    }));
  };

  const handleDimensionChange = (dimension: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      physical_attributes: {
        ...prev.physical_attributes,
        dimensions: {
          ...prev.physical_attributes.dimensions,
          [dimension]: value,
        },
      },
    }));
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImages = [...formData.images];
        newImages[index] = file;
        setFormData((prev) => ({ ...prev, images: newImages }));

        const newPreviews = [...imagePreviews];
        newPreviews[index] = event.target?.result as string;
        setImagePreviews(newPreviews);
        setActiveImageIndex(index);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newImages = [...formData.images];
    newImages[index] = undefined as File | undefined;
    setFormData((prev) => ({ ...prev, images: newImages }));

    const newPreviews = [...imagePreviews];
    newPreviews[index] = '';
    setImagePreviews(newPreviews);

    const nextIndex = newPreviews.findIndex(
      (preview, i) => i !== index && preview
    );
    setActiveImageIndex(nextIndex >= 0 ? nextIndex : 0);
  };

  const triggerFileInput = (index: number) => {
    setActiveImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (
        !formData.identification.product_name ||
        !formData.pricing.actual_price
      ) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare FormData
      const submitData = new FormData();
      if (formData.cat_id) submitData.append('cat_id', formData.cat_id);
      if (formData.subcat_id)
        submitData.append('subcat_id', formData.subcat_id);
      submitData.append(
        'identification',
        JSON.stringify(formData.identification)
      );
      submitData.append('descriptions', JSON.stringify(formData.descriptions));
      submitData.append('pricing', JSON.stringify(formData.pricing));
      submitData.append('inventory', JSON.stringify(formData.inventory));
      submitData.append(
        'physical_attributes',
        JSON.stringify(formData.physical_attributes)
      );
      submitData.append(
        'tags_and_relationships',
        JSON.stringify(formData.tags_and_relationships)
      );
      submitData.append('status_flags', JSON.stringify(formData.status_flags));

      // Append images
      formData.images.forEach((file) => {
        if (file) {
          submitData.append('files', file);
        }
      });

      // Submit to backend
      const response = await axiosInstance.put(`/products/${id}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update image previews with URLs from backend
      const updatedProduct = response.data;
      const newImageUrls = updatedProduct.images?.urls || [];
      setImagePreviews(
        newImageUrls.concat(Array(5 - newImageUrls.length).fill(''))
      );

      setSuccess(true);
      setTimeout(() => {
        router.push('/products');
      }, 2000);
    }catch (err: unknown) {
      let errorMessage = 'An error occurred while updating the category';
    
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.detail || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
    
      setError(errorMessage);
      console.error('Update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await axiosInstance.delete(`/products/${id}`);
      router.push('/products');
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while updating the category';
    
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.detail || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
    
      setError(errorMessage);
      console.error('Update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              Loading product data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
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
                  Are you sure you want to delete this product?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product and remove it from your inventory.
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
                  {isSubmitting ? 'Deleting...' : 'Delete Product'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" asChild>
            <Link href="/products">Cancel</Link>
          </Button>
          <Button type="submit" form="product-form" disabled={isSubmitting}>
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
            Product has been updated successfully! Redirecting...
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Product Images Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Product Images</h2>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-md border bg-muted relative">
                  {imagePreviews[activeImageIndex] ? (
                    <>
                      <Image
                        src={
                          imagePreviews[activeImageIndex] ||
                          '/images/placeholder.svg'
                        }
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => removeImage(activeImageIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div
                      className="flex h-full items-center justify-center"
                      onClick={() => triggerFileInput(activeImageIndex)}
                    >
                      <div className="flex flex-col items-center gap-1 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Click to upload main product image
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
                  onChange={(e) => handleImageUpload(activeImageIndex, e)}
                />

                <div className="grid grid-cols-5 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className={`aspect-square cursor-pointer overflow-hidden rounded-md border ${
                        index === activeImageIndex ? 'ring-2 ring-primary' : ''
                      } ${preview ? 'bg-background' : 'bg-muted'}`}
                      onClick={() =>
                        preview
                          ? setActiveImageIndex(index)
                          : triggerFileInput(index)
                      }
                    >
                      {preview ? (
                        <Image
                          src={preview || '/images/placeholder.svg'}
                          alt={`Product image ${index + 1}`}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Product Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.status_flags.published_product}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        status_flags: {
                          ...prev.status_flags,
                          published_product: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Product</Label>
                  <Switch
                    id="featured"
                    checked={formData.status_flags.featured_product}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        status_flags: {
                          ...prev.status_flags,
                          featured_product: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Form */}
        <div className="md:col-span-2">
          <form id="product-form" onSubmit={handleSubmit}>
            <Card>
              <Tabs defaultValue="basic">
                <div className="border-b px-6 pt-6">
                  <TabsList className="w-full justify-start rounded-none border-b pb-px [&>*]:rounded-b-none">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>
                </div>

                <CardContent className="p-6">
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="product_name">
                          Product Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="product_name"
                          value={formData.identification.product_name}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              'identification',
                              'product_name'
                            )
                          }
                          placeholder="Enter product name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product_sku">SKU</Label>
                        <Input
                          id="product_sku"
                          value={formData.identification.product_sku}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              'identification',
                              'product_sku'
                            )
                          }
                          placeholder="Enter product SKU"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cat_id">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.cat_id}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, cat_id: value }))
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {dropdownOptions
                            .filter((cat) => !cat.isSubcategory)
                            .map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subcat_id">Subcategory</Label>
                      <Select
                        value={formData.subcat_id}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, subcat_id: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {dropdownOptions
                            .filter(
                              (cat) =>
                                cat.isSubcategory &&
                                cat.parentId === formData.cat_id
                            )
                            .map((subcategory) => (
                              <SelectItem
                                key={subcategory.id}
                                value={subcategory.id}
                              >
                                {subcategory.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="product_tags"
                        value={formData.tags_and_relationships.product_tags.join(
                          ', '
                        )}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags_and_relationships: {
                              ...prev.tags_and_relationships,
                              product_tags: e.target.value
                                .split(',')
                                .map((tag) => tag.trim())
                                .filter(Boolean),
                            },
                          }))
                        }
                        placeholder="Enter tags separated by commas"
                      />
                      <p className="text-sm text-muted-foreground">
                        Separate tags with commas (e.g., wireless, bluetooth,
                        audio)
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="description" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="short_description">
                        Short Description
                      </Label>
                      <Textarea
                        id="short_description"
                        value={formData.descriptions.short_description}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            'descriptions',
                            'short_description'
                          )
                        }
                        placeholder="Enter a brief description (displayed in product cards)"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Full Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.descriptions.full_description}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            'descriptions',
                            'full_description'
                          )
                        }
                        placeholder="Enter detailed product description"
                        rows={8}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="actual_price">
                          Regular Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="actual_price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.pricing.actual_price}
                            onChange={(e) =>
                              handleInputChange(e, 'pricing', 'actual_price')
                            }
                            className="pl-7"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="selling_price">Sale Price</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="selling_price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.pricing.selling_price}
                            onChange={(e) =>
                              handleInputChange(e, 'pricing', 'selling_price')
                            }
                            className="pl-7"
                            placeholder="0.00"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Leave empty if not on sale
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="inventory" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Stock Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={formData.inventory.quantity}
                        onChange={(e) =>
                          handleInputChange(e, 'inventory', 'quantity')
                        }
                        placeholder="Enter stock quantity"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Stock Status</Label>
                      <Select
                        value={formData.inventory.stock_alert_status}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            inventory: {
                              ...prev.inventory,
                              stock_alert_status: value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stock status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instock">In Stock</SelectItem>
                          <SelectItem value="outofstock">
                            Out of Stock
                          </SelectItem>
                          <SelectItem value="backorder">
                            On Backorder
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="shipping" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.physical_attributes.weight}
                        onChange={(e) =>
                          handleInputChange(e, 'physical_attributes', 'weight')
                        }
                        placeholder="Enter product weight"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Dimensions (cm)</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Input
                            placeholder="Length"
                            type="number"
                            step="0.1"
                            min="0"
                            value={
                              formData.physical_attributes.dimensions.length
                            }
                            onChange={(e) =>
                              handleDimensionChange('length', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Width"
                            type="number"
                            step="0.1"
                            min="0"
                            value={
                              formData.physical_attributes.dimensions.width
                            }
                            onChange={(e) =>
                              handleDimensionChange('width', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Height"
                            type="number"
                            step="0.1"
                            min="0"
                            value={
                              formData.physical_attributes.dimensions.height
                            }
                            onChange={(e) =>
                              handleDimensionChange('height', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Shipping Class</Label>
                      <Select
                        value={formData.physical_attributes.shipping_class}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            physical_attributes: {
                              ...prev.physical_attributes,
                              shipping_class: value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipping class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="express">Express</SelectItem>
                          <SelectItem value="free">Free Shipping</SelectItem>
                          <SelectItem value="bulky">Bulky Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
