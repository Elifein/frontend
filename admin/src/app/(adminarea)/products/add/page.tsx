'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus, Trash2, AlertCircle } from 'lucide-react';

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/ui/tabs';
import { Switch } from '../../../../components/ui/switch';
import { Label } from '../../../../components/ui/label';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../../components/ui/alert';
import axiosInstance from '../../../../lib/axiosInstance';
import axios from 'axios';

// Type definitions based on your API response
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

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    cat_id: '',
    subcat_id: '', // Will be set based on selected category/subcategory
    identification: { product_name: '', product_sku: '' },
    descriptions: { short_description: '', full_description: '' },
    pricing: { actual_price: '', selling_price: '' },
    inventory: { stock_quantity: '', stock_alert_status: 'instock' },
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
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Fetch categories and subcategories on mount
  useEffect(() => {
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

    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   section: keyof typeof formData
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]: { ...prev[section], [name]: value },
  //   }));
  // };

  type ObjectSectionKeys =
    | 'identification'
    | 'descriptions'
    | 'pricing'
    | 'inventory'
    | 'physical_attributes'
    | 'tags_and_relationships'
    | 'status_flags';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: ObjectSectionKeys
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
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
      const previewUrl = URL.createObjectURL(file);

      const newPreviews = [...imagePreviews];
      newPreviews[index] = previewUrl;
      setImagePreviews(newPreviews);

      const newImages = [...formData.images];
      newImages[index] = file;
      setFormData((prev) => ({ ...prev, images: newImages }));
      setActiveImageIndex(index);
    }
  };

  // const removeImage = (index: number) => {
  //   const newPreviews = [...imagePreviews];
  //   if (newPreviews[index]) {
  //     URL.revokeObjectURL(newPreviews[index]); // Clean up object URL
  //   }
  //   newPreviews[index] = '';
  //   setImagePreviews(newPreviews);

  //   const newImages = [...formData.images];
  //   newImages[index] = undefined as any; // Type workaround; could also filter out undefined later
  //   setFormData((prev) => ({ ...prev, images: newImages.filter(Boolean) }));

  //   const nextIndex = newPreviews.findIndex((img, i) => i !== index && img);
  //   setActiveImageIndex(nextIndex >= 0 ? nextIndex : 0);
  // };

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]); // Clean up object URL
    }
    newPreviews[index] = '';
    setImagePreviews(newPreviews);

    const newImages = [...formData.images];
    newImages[index] = undefined as unknown as File; // Temporary placeholder
    setFormData((prev) => ({
      ...prev,
      images: newImages.filter((img): img is File => img !== undefined),
    }));

    const nextIndex = newPreviews.findIndex((img, i) => i !== index && img);
    setActiveImageIndex(nextIndex >= 0 ? nextIndex : 0);
  };

  const triggerFileInput = (index: number) => {
    setActiveImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleCategoryChange = (value: string) => {
    const selectedOption = dropdownOptions.find(
      (option) => option.id === value
    );
    if (selectedOption) {
      setSelectedCategory(value);
      if (selectedOption.isSubcategory) {
        setFormData((prev) => ({
          ...prev,
          cat_id: selectedOption.parentId || '',
          subcat_id: selectedOption.id,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          cat_id: selectedOption.id,
          subcat_id: '', // No subcategory selected if a top-level category is chosen
        }));
      }
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.identification.product_name || !formData.cat_id) {
        throw new Error(
          'Please fill in all required fields (Product Name, Category)'
        );
      }
      if (!formData.images.length) {
        throw new Error('Please upload at least one product image');
      }

      // Create FormData for multipart upload
      const formDataToSend = new FormData();

      // Top-level fields
      formDataToSend.append('cat_id', formData.cat_id);
      formDataToSend.append('subcat_id', formData.subcat_id);

      // Nested fields as JSON strings
      formDataToSend.append(
        'identification',
        JSON.stringify(formData.identification)
      );
      formDataToSend.append(
        'descriptions',
        JSON.stringify(formData.descriptions)
      );
      formDataToSend.append('pricing', JSON.stringify(formData.pricing));
      formDataToSend.append('inventory', JSON.stringify(formData.inventory));
      formDataToSend.append(
        'physical_attributes',
        JSON.stringify(formData.physical_attributes)
      );
      formDataToSend.append(
        'tags_and_relationships',
        JSON.stringify(formData.tags_and_relationships)
      );
      formDataToSend.append(
        'status_flags',
        JSON.stringify(formData.status_flags)
      );


      formData.images.forEach((file) => {
        if (file) {
          formDataToSend.append('files', file);
        }
      });
      const response = await axiosInstance.post(
        '/create-product/',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => router.push('/products'), 2000);
      }
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
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/products">Cancel</Link>
          </Button>
          <Button type="submit" form="product-form" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Product'}
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
            Product has been added successfully! Redirecting...
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
                        <p className="text-sm font-medium">Click to upload</p>
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
                          src={preview}
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
                          name="product_name"
                          value={formData.identification.product_name}
                          onChange={(e) =>
                            handleInputChange(e, 'identification')
                          }
                          placeholder="Enter product name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product_sku">SKU
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="product_sku"
                          name="product_sku"
                          value={formData.identification.product_sku}
                          onChange={(e) =>
                            handleInputChange(e, 'identification')
                          }
                          placeholder="Enter product SKU"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={handleCategoryChange}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category or subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {dropdownOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product_tags">Tags</Label>
                      <Input
                        id="product_tags"
                        name="product_tags"
                        value={formData.tags_and_relationships.product_tags.join(
                          ','
                        )}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags_and_relationships: {
                              ...prev.tags_and_relationships,
                              product_tags: e.target.value
                                .split(',')
                                .map((tag) => tag.trim()),
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
                        name="short_description"
                        value={formData.descriptions.short_description}
                        onChange={(e) => handleInputChange(e, 'descriptions')}
                        placeholder="Enter a brief description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="full_description">
                        Full Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="full_description"
                        name="full_description"
                        value={formData.descriptions.full_description}
                        onChange={(e) => handleInputChange(e, 'descriptions')}
                        placeholder="Enter detailed product description"
                        rows={8}
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
                            name="actual_price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.pricing.actual_price}
                            onChange={(e) => handleInputChange(e, 'pricing')}
                            className="pl-7"
                            placeholder="0.00"
                            required
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
                            name="selling_price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.pricing.selling_price}
                            onChange={(e) => handleInputChange(e, 'pricing')}
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
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock_quantity"
                        name="stock_quantity"
                        type="number"
                        min="0"
                        value={formData.inventory.stock_quantity}
                        onChange={(e) => handleInputChange(e, 'inventory')}
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
                          handleInputChange(e, 'physical_attributes')
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
