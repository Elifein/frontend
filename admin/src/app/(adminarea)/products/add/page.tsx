'use client';

import type React from 'react';

import { useState, useRef } from 'react';
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

// Sample categories for the dropdown
const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Smartphones', parentId: '1' },
  { id: '3', name: 'Laptops', parentId: '1' },
  { id: '4', name: 'Audio', parentId: '1' },
  { id: '5', name: 'Clothing' },
  { id: '6', name: 'Men', parentId: '5' },
  { id: '7', name: 'Women', parentId: '5' },
  { id: '8', name: 'Home & Kitchen' },
  { id: '9', name: 'Beauty' },
];

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    salePrice: '',
    category: '',
    description: '',
    shortDescription: '',
    stock: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
    },
    featured: false,
    published: true,
    tags: '',
  });

  const [images, setImages] = useState<
    { file: File | null; preview: string }[]
  >([
    { file: null, preview: '' },
    { file: null, preview: '' },
    { file: null, preview: '' },
    { file: null, preview: '' },
    { file: null, preview: '' },
  ]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDimensionChange = (dimension: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value,
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
        const newImages = [...images];
        newImages[index] = {
          file,
          preview: event.target?.result as string,
        };
        setImages(newImages);
        setActiveImageIndex(index);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = { file: null, preview: '' };
    setImages(newImages);

    // Set active image to the first available image
    const nextIndex = images.findIndex((img, i) => i !== index && img.preview);
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
      if (!formData.name || !formData.price || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      // Check if at least one image is uploaded
      if (!images.some((img) => img.file)) {
        throw new Error('Please upload at least one product image');
      }

      // In a real app, you would upload images and submit form data to your API
      // For this example, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        router.push('/products');
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while adding the product'
      );
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
                  {images[activeImageIndex]?.preview ? (
                    <>
                      <Image
                        src={
                          images[activeImageIndex].preview ||
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
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square cursor-pointer overflow-hidden rounded-md border ${
                        index === activeImageIndex ? 'ring-2 ring-primary' : ''
                      } ${image.preview ? 'bg-background' : 'bg-muted'}`}
                      onClick={() =>
                        image.preview
                          ? setActiveImageIndex(index)
                          : triggerFileInput(index)
                      }
                    >
                      {image.preview ? (
                        <Image
                          src={image.preview || '/images/placeholder.svg'}
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
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, published: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Product</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, featured: checked }))
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
                        <Label htmlFor="name">
                          Product Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          name="sku"
                          value={formData.sku}
                          onChange={handleInputChange}
                          placeholder="Enter product SKU"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.parentId
                                ? `— ${category.name}`
                                : category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
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
                      <Label htmlFor="shortDescription">
                        Short Description
                      </Label>
                      <Textarea
                        id="shortDescription"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
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
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter detailed product description"
                        rows={8}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price">
                          Regular Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="pl-7"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salePrice">Sale Price</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="salePrice"
                            name="salePrice"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.salePrice}
                            onChange={handleInputChange}
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
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="Enter stock quantity"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Stock Status</Label>
                      <Select defaultValue="instock">
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
                        value={formData.weight}
                        onChange={handleInputChange}
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
                            value={formData.dimensions.length}
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
                            value={formData.dimensions.width}
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
                            value={formData.dimensions.height}
                            onChange={(e) =>
                              handleDimensionChange('height', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Shipping Class</Label>
                      <Select defaultValue="standard">
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
