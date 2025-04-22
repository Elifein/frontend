'use client';

import type React from 'react';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, AlertCircle } from 'lucide-react';

import { Button } from '../../../../../components/ui/button';
import {
  Card,
  CardContent
} from '../../../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';
import { Label } from '../../../../../components/ui/label';
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

type Props = {
  params: Promise<{ id: string }>; // Params as a Promise
};

export default function ViewProductPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const [product, setProduct] = useState<any>({
    cat_id: '',
    subcat_id: '',
    identification: { product_name: '', product_sku: '' },
    descriptions: { short_description: '', full_description: '' },
    pricing: { actual_price: '', selling_price: '' },
    inventory: { quantity: '', stock_alert_status: 'instock' },
    physical_attributes: {
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      shipping_class: 'standard',
    },
    images: { urls: [] },
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

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const productData = response.data;
        setProduct(productData);

        // Set image previews
        const urls = productData.images?.urls || [];
        setImagePreviews(urls);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product data');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/get-categories/');
        if (response.data?.status_code === 200 && response.data?.data) {
          setCategories(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories data');
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  // Set category and subcategory names when data is available
  useEffect(() => {
    if (categories.length > 0 && product.cat_id) {
      const category = categories.find(cat => cat.category_id === product.cat_id);
      if (category) {
        setCategoryName(category.category_name);
        
        if (product.subcat_id) {
          const subcategory = category.subcategories.find(
            subcat => subcat.subcategory_id === product.subcat_id
          );
          if (subcategory) {
            setSubcategoryName(subcategory.subcategory_name);
          }
        }
      }
    }
  }, [categories, product.cat_id, product.subcat_id]);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
        await axiosInstance.delete(`/product/${id}/delete`);
      router.push('/products');
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while deleting the product';
    
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.detail || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
    
      setError(errorMessage);
      console.error('Delete error:', err);
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
          <h1 className="text-2xl font-bold">View Product</h1>
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
            <Link href="/products">Back to Products</Link>
          </Button>
          <Button asChild>
            <Link href={`/products/edit/${id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
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

      <div className="grid gap-6 md:grid-cols-3">
        {/* Product Images Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Product Images</h2>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-md border bg-muted relative">
                  {imagePreviews[activeImageIndex] ? (
                    <Image
                      src={
                        imagePreviews[activeImageIndex] ||
                        '/images/placeholder.svg'
                      }
                      alt="Product preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          No image available
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className={`aspect-square cursor-pointer overflow-hidden rounded-md border ${
                          index === activeImageIndex ? 'ring-2 ring-primary' : ''
                        } ${preview ? 'bg-background' : 'bg-muted'}`}
                        onClick={() => preview && setActiveImageIndex(index)}
                      >
                        <Image
                          src={preview || '/images/placeholder.svg'}
                          alt={`Product image ${index + 1}`}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Product Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Published</Label>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status_flags.published_product
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status_flags.published_product ? 'Yes' : 'No'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Featured Product</Label>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status_flags.featured_product
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status_flags.featured_product ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="md:col-span-2">
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
                      <Label className="text-muted-foreground text-sm">Product Name</Label>
                      <p className="font-medium">{product.identification.product_name}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">SKU</Label>
                      <p className="font-medium">{product.identification.product_sku || '—'}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Category</Label>
                    <p className="font-medium">{categoryName || '—'}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Subcategory</Label>
                    <p className="font-medium">{subcategoryName || '—'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.tags_and_relationships.product_tags?.length > 0 ? (
                        product.tags_and_relationships.product_tags.map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No tags</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="description" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Short Description</Label>
                    <p>{product.descriptions.short_description || '—'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Full Description</Label>
                    <div className="prose prose-sm max-w-none">
                      {product.descriptions.full_description || '—'}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Regular Price</Label>
                      <p className="font-medium">
                        {product.pricing.actual_price 
                          ? `$${parseFloat(product.pricing.actual_price).toFixed(2)}` 
                          : '—'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Sale Price</Label>
                      <p className="font-medium">
                        {product.pricing.selling_price 
                          ? `$${parseFloat(product.pricing.selling_price).toFixed(2)}` 
                          : '—'}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Stock Quantity</Label>
                    <p className="font-medium">{product.inventory.quantity || '0'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Stock Status</Label>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      product.inventory.stock_alert_status === 'instock'
                        ? 'bg-green-100 text-green-800'
                        : product.inventory.stock_alert_status === 'outofstock'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.inventory.stock_alert_status === 'instock'
                        ? 'In Stock'
                        : product.inventory.stock_alert_status === 'outofstock'
                        ? 'Out of Stock'
                        : 'On Backorder'}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Weight</Label>
                    <p className="font-medium">
                      {product.physical_attributes.weight
                        ? `${product.physical_attributes.weight} kg`
                        : '—'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Dimensions</Label>
                    <p className="font-medium">
                      {product.physical_attributes.dimensions.length ||
                      product.physical_attributes.dimensions.width ||
                      product.physical_attributes.dimensions.height
                        ? `${product.physical_attributes.dimensions.length || '0'} × ${
                            product.physical_attributes.dimensions.width || '0'
                          } × ${product.physical_attributes.dimensions.height || '0'} cm`
                        : '—'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Shipping Class</Label>
                    <p className="font-medium capitalize">
                      {product.physical_attributes.shipping_class || 'Standard'}
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}