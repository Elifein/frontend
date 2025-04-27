// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { ArrowLeft, Edit, ChevronRight, Tag, Package, Eye, ExternalLink, Plus } from "lucide-react"

// import { Button } from "../../../../../components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../components/ui/card"
// import { Badge } from "../../../../../components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../components/ui/table"

// // Sample categories data - in a real app, this would be fetched from an API
// const categories = [
//   {
//     id: "1",
//     name: "Electronics",
//     slug: "electronics",
//     description: "Electronic devices and gadgets",
//     image: "/placeholder.svg?height=400&width=400",
//     productsCount: 42,
//     featured: true,
//     showInMenu: true,
//     parent: null,
//     metaTitle: "Electronics - Shop the latest devices",
//     metaDescription: "Browse our collection of electronic devices including smartphones, laptops, and audio equipment.",
//     createdAt: "2023-05-15T10:30:00Z",
//     updatedAt: "2023-11-20T14:45:00Z",
//   },
//   {
//     id: "2",
//     name: "Smartphones",
//     slug: "smartphones",
//     description: "Mobile phones and accessories",
//     image: "/placeholder.svg?height=400&width=400",
//     productsCount: 18,
//     featured: false,
//     showInMenu: true,
//     parent: "Electronics",
//     parentId: "1",
//     metaTitle: "Smartphones - Latest models and accessories",
//     metaDescription: "Discover the newest smartphones and accessories from top brands.",
//     createdAt: "2023-05-16T11:20:00Z",
//     updatedAt: "2023-10-25T09:15:00Z",
//   },
//   {
//     id: "5",
//     name: "Clothing",
//     slug: "clothing",
//     description: "Apparel and fashion items",
//     image: "/placeholder.svg?height=400&width=400",
//     productsCount: 36,
//     featured: true,
//     showInMenu: true,
//     parent: null,
//     metaTitle: "Clothing - Fashion for everyone",
//     metaDescription: "Discover our latest clothing collections for men, women, and children.",
//     createdAt: "2023-05-18T09:45:00Z",
//     updatedAt: "2023-11-10T16:30:00Z",
//   },
// ]

// // Sample products data for the category
// const categoryProducts = [
//   {
//     id: "101",
//     name: "iPhone 14 Pro",
//     sku: "IP14PRO-128-BLK",
//     price: 999.99,
//     stock: 24,
//     image: "/placeholder.svg?height=50&width=50",
//     category: "Smartphones",
//   },
//   {
//     id: "102",
//     name: "Samsung Galaxy S23",
//     sku: "SGS23-256-GRN",
//     price: 899.99,
//     stock: 18,
//     image: "/placeholder.svg?height=50&width=50",
//     category: "Smartphones",
//   },
//   {
//     id: "103",
//     name: "Google Pixel 7",
//     sku: "GP7-128-WHT",
//     price: 699.99,
//     stock: 12,
//     image: "/placeholder.svg?height=50&width=50",
//     category: "Smartphones",
//   },
//   {
//     id: "104",
//     name: "OnePlus 11",
//     sku: "OP11-256-BLK",
//     price: 799.99,
//     stock: 9,
//     image: "/placeholder.svg?height=50&width=50",
//     category: "Smartphones",
//   },
//   {
//     id: "105",
//     name: "Xiaomi 13",
//     sku: "XM13-128-BLU",
//     price: 749.99,
//     stock: 15,
//     image: "/placeholder.svg?height=50&width=50",
//     category: "Smartphones",
//   },
// ]

// // Sample subcategories
// const subcategories = [
//   {
//     id: "201",
//     name: "Android Phones",
//     slug: "android-phones",
//     productsCount: 12,
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "202",
//     name: "iPhones",
//     slug: "iphones",
//     productsCount: 6,
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "203",
//     name: "Phone Cases",
//     slug: "phone-cases",
//     productsCount: 28,
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "204",
//     name: "Screen Protectors",
//     slug: "screen-protectors",
//     productsCount: 15,
//     image: "/placeholder.svg?height=40&width=40",
//   },
// ]

// export default function ViewCategoryPage({ params }: { params: { id: string } }) {
//   const { id } = params
//   const [category, setCategory] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("overview")

//   // Fetch category data
//   useEffect(() => {
//     // In a real app, you would fetch the category data from an API
//     // For this example, we'll use the sample data
//     const foundCategory = categories.find((c) => c.id === id)

//     if (foundCategory) {
//       setCategory(foundCategory)
//     }

//     setIsLoading(false)
//   }, [id])

//   if (isLoading) {
//     return (
//       <div className="container mx-auto max-w-7xl px-4 py-8">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">Loading category data...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!category) {
//     return (
//       <div className="container mx-auto max-w-7xl px-4 py-8">
//         <div className="flex flex-col items-center justify-center h-64">
//           <h2 className="text-2xl font-bold mb-2">Category Not Found</h2>
//           <p className="text-muted-foreground mb-4">
//             The category you are looking for does not exist or has been removed.
//           </p>
//           <Button asChild>
//             <Link href="/categories">Back to Categories</Link>
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date)
//   }

//   return (
//     <div className="container mx-auto max-w-7xl px-4 py-8">
//       <div className="mb-6 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="icon" asChild>
//             <Link href="/categories">
//               <ArrowLeft className="h-4 w-4" />
//             </Link>
//           </Button>
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold">{category.name}</h1>
//             {category.featured && <Badge className="ml-2">Featured</Badge>}
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" asChild>
//             <Link href={`/categories/${category.slug}`} target="_blank">
//               <Eye className="mr-2 h-4 w-4" />
//               View on Site
//             </Link>
//           </Button>
//           <Button asChild>
//             <Link href={`/categories/edit/${category.id}`}>
//               <Edit className="mr-2 h-4 w-4" />
//               Edit Category
//             </Link>
//           </Button>
//         </div>
//       </div>

//       <div className="flex flex-col gap-6 lg:flex-row">
//         {/* Left column - Category image and details */}
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle>Category Image</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="aspect-square overflow-hidden rounded-md border bg-muted">
//                 <Image
//                   src={category.image || "/placeholder.svg"}
//                   alt={category.name}
//                   width={400}
//                   height={400}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="mt-6">
//             <CardHeader className="pb-3">
//               <CardTitle>Category Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
//                   <p>{category.name}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Slug</h3>
//                   <p className="font-mono text-sm">{category.slug}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Parent Category</h3>
//                   <p>{category.parent || "None (Top Level Category)"}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Products</h3>
//                   <p>{category.productsCount} products</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
//                   <div className="flex items-center gap-2">
//                     <Badge variant={category.showInMenu ? "default" : "outline"}>
//                       {category.showInMenu ? "Visible in Menu" : "Hidden from Menu"}
//                     </Badge>
//                     {category.featured && <Badge>Featured</Badge>}
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
//                   <p>{formatDate(category.createdAt)}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
//                   <p>{formatDate(category.updatedAt)}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="mt-6">
//             <CardHeader className="pb-3">
//               <CardTitle>SEO Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Meta Title</h3>
//                   <p>{category.metaTitle || category.name}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Meta Description</h3>
//                   <p className="text-sm">{category.metaDescription || "No meta description set."}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right column - Tabs for different views */}
//         <div className="w-full lg:w-2/3">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="products">Products</TabsTrigger>
//               <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
//             </TabsList>

//             {/* Overview Tab */}
//             <TabsContent value="overview" className="mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Category Description</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>{category.description || "No description available."}</p>
//                 </CardContent>
//               </Card>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg">Products</CardTitle>
//                       <Badge variant="outline">{category.productsCount}</Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Total products in this category</p>
//                       </div>
//                       <Button variant="outline" size="sm" asChild>
//                         <Link href="#" onClick={() => setActiveTab("products")}>
//                           <Package className="mr-2 h-4 w-4" />
//                           View Products
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg">Subcategories</CardTitle>
//                       <Badge variant="outline">{subcategories.length}</Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Child categories under this category</p>
//                       </div>
//                       <Button variant="outline" size="sm" asChild>
//                         <Link href="#" onClick={() => setActiveTab("subcategories")}>
//                           <Tag className="mr-2 h-4 w-4" />
//                           View Subcategories
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               <Card className="mt-6">
//                 <CardHeader>
//                   <CardTitle>Category URL</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <p className="font-mono text-sm">/categories/{category.slug}</p>
//                     <Button variant="outline" size="sm" asChild>
//                       <Link href={`/categories/${category.slug}`} target="_blank">
//                         <ExternalLink className="mr-2 h-4 w-4" />
//                         Open
//                       </Link>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Products Tab */}
//             <TabsContent value="products" className="mt-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <div>
//                     <CardTitle>Products in {category.name}</CardTitle>
//                     <CardDescription>
//                       Showing {categoryProducts.length} of {category.productsCount} products
//                     </CardDescription>
//                   </div>
//                   <Button asChild>
//                     <Link href="/products/add">
//                       <Plus className="mr-2 h-4 w-4" />
//                       Add Product
//                     </Link>
//                   </Button>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[80px]">Image</TableHead>
//                         <TableHead>Product</TableHead>
//                         <TableHead>SKU</TableHead>
//                         <TableHead className="text-right">Price</TableHead>
//                         <TableHead className="text-center">Stock</TableHead>
//                         <TableHead className="text-right">Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {categoryProducts.map((product) => (
//                         <TableRow key={product.id}>
//                           <TableCell>
//                             <div className="h-10 w-10 overflow-hidden rounded-md border">
//                               <Image
//                                 src={product.image || "/placeholder.svg"}
//                                 alt={product.name}
//                                 width={40}
//                                 height={40}
//                                 className="h-full w-full object-cover"
//                               />
//                             </div>
//                           </TableCell>
//                           <TableCell className="font-medium">{product.name}</TableCell>
//                           <TableCell className="font-mono text-xs">{product.sku}</TableCell>
//                           <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
//                           <TableCell className="text-center">
//                             <Badge variant={product.stock > 10 ? "outline" : "destructive"}>{product.stock}</Badge>
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <Button variant="ghost" size="sm" asChild>
//                               <Link href={`/products/edit/${product.id}`}>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 Edit
//                               </Link>
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Subcategories Tab */}
//             <TabsContent value="subcategories" className="mt-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <div>
//                     <CardTitle>Subcategories of {category.name}</CardTitle>
//                     <CardDescription>{subcategories.length} subcategories found</CardDescription>
//                   </div>
//                   <Button asChild>
//                     <Link href="/categories/add">
//                       <Plus className="mr-2 h-4 w-4" />
//                       Add Subcategory
//                     </Link>
//                   </Button>
//                 </CardHeader>
//                 <CardContent>
//                   {subcategories.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-8">
//                       <p className="text-muted-foreground mb-4">No subcategories found for this category.</p>
//                       <Button asChild>
//                         <Link href="/categories/add">
//                           <Plus className="mr-2 h-4 w-4" />
//                           Add Subcategory
//                         </Link>
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {subcategories.map((subcategory) => (
//                         <Card key={subcategory.id} className="overflow-hidden">
//                           <div className="flex items-center p-4">
//                             <div className="h-12 w-12 overflow-hidden rounded-md border mr-4">
//                               <Image
//                                 src={subcategory.image || "/placeholder.svg"}
//                                 alt={subcategory.name}
//                                 width={48}
//                                 height={48}
//                                 className="h-full w-full object-cover"
//                               />
//                             </div>
//                             <div className="flex-1">
//                               <h3 className="font-medium">{subcategory.name}</h3>
//                               <p className="text-sm text-muted-foreground">{subcategory.productsCount} products</p>
//                             </div>
//                             <Button variant="ghost" size="icon" asChild>
//                               <Link href={`/categories/view/${subcategory.id}`}>
//                                 <ChevronRight className="h-4 w-4" />
//                               </Link>
//                             </Button>
//                           </div>
//                         </Card>
//                       ))}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'
import React, { useEffect, use } from 'react';
import axiosInstance from '../../../../../lib/axiosInstance';
import { Label } from '../../../../../components/ui/label';
import { Card, CardContent } from '../../../../../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

interface BaseCategory {
  cat_id: string;
  cat_description: string | null;
  cat_slug: string;
  cat_name: string;
  cat_meta_title: string | null;
  cat_meta_description: string | null;
  cat_imgthumbnail: string | null;
  cat_featured_category: boolean;
  cat_show_in_menu: boolean;
  cat_status: boolean;
  cat_ref_id?: string;
}

interface Subcategory {
  subcat_id: string;
  subcat_description: string | null;
  subcat_slug: string;
  subcat_name: string;
  subcat_meta_title: string | null;
  subcat_meta_description: string | null;
  subcat_imgthumbnail: string | null;
  subcat_featured_category: boolean;
  subcat_show_in_menu: boolean;
  subcat_status: boolean;
  subcat_ref_id?: string;
}

type CategoryData = BaseCategory | Subcategory;

export default function ViewCategoryPage({ params }: Props) {
  const { id } = use(params);
  const [category, setCategory] = React.useState<CategoryData | null>(null);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [parentCategory, setParentCategory] = React.useState<BaseCategory | null>(null);

  // Helper function to check if object is a Subcategory
  const isSubcategory = (obj: CategoryData): obj is Subcategory => {
    return 'subcat_name' in obj;
  };

  // Helper functions to safely access category fields
  const getCategoryName = (cat: CategoryData): string => {
    return isSubcategory(cat) ? cat.subcat_name : cat.cat_name;
  };

  const getCategorySlug = (cat: CategoryData): string => {
    return isSubcategory(cat) ? cat.subcat_slug : cat.cat_slug;
  };

  const getCategoryDescription = (cat: CategoryData): string | null => {
    return isSubcategory(cat) ? cat.subcat_description : cat.cat_description;
  };

  const getCategoryMetaTitle = (cat: CategoryData): string | null => {
    return isSubcategory(cat) ? cat.subcat_meta_title : cat.cat_meta_title;
  };

  const getCategoryMetaDescription = (cat: CategoryData): string | null => {
    return isSubcategory(cat) ? cat.subcat_meta_description : cat.cat_meta_description;
  };

  const getCategoryImage = (cat: CategoryData): string | null => {
    return isSubcategory(cat) ? cat.subcat_imgthumbnail : cat.cat_imgthumbnail;
  };

  const getCategoryFeatured = (cat: CategoryData): boolean => {
    return isSubcategory(cat) ? cat.subcat_featured_category : cat.cat_featured_category;
  };

  const getCategoryShowInMenu = (cat: CategoryData): boolean => {
    return isSubcategory(cat) ? cat.subcat_show_in_menu : cat.cat_show_in_menu;
  };

  const getCategoryStatus = (cat: CategoryData): boolean => {
    return isSubcategory(cat) ? cat.subcat_status : cat.cat_status;
  };

  // const getCategoryRefId = (cat: CategoryData): string | undefined => {
  //   return isSubcategory(cat) ? cat.subcat_ref_id : cat.cat_ref_id;
  // };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/get-categories/${id}`);
        const data = response.data.data;
        const categoryData = data.category || data.subcategory;
        
        if (categoryData) {
          setCategory(categoryData);
          
          // If there's a parent category, fetch its details
          const parentId = isSubcategory(categoryData) 
            ? categoryData.subcat_ref_id 
            : categoryData.cat_ref_id;
            
          if (parentId) {
            try {
              const parentResponse = await axiosInstance.get(`/get-categories/${parentId}`);
              const parentData = parentResponse.data.data.category;
              if (parentData) {
                setParentCategory(parentData);
              }
            } catch (err) {
              console.error('Failed to load parent category:', err);
            }
          }
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError('Failed to load category data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <p>Loading category information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <p>No category data found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">View Category</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Category Image</h2>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-md border bg-muted relative">
                  {getCategoryImage(category) ? (
                    <Image
                      src={getCategoryImage(category) || '/images/placeholder.svg'}
                      alt="Category image"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center">
                      <p className="text-sm text-muted-foreground">No image available</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Category Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Featured Category</Label>
                  <span className={`px-2 py-1 rounded-md text-xs ${getCategoryFeatured(category) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {getCategoryFeatured(category) ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show in Menu</Label>
                  <span className={`px-2 py-1 rounded-md text-xs ${getCategoryShowInMenu(category) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {getCategoryShowInMenu(category) ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Status</Label>
                  <span className={`px-2 py-1 rounded-md text-xs ${getCategoryStatus(category) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {getCategoryStatus(category) ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm text-muted-foreground">Category Name</Label>
                  <p className="mt-1 font-medium">{getCategoryName(category)}</p>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Slug</Label>
                  <p className="mt-1">{getCategorySlug(category)}</p>
                </div>

                {parentCategory && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Parent Category</Label>
                    <p className="mt-1">{parentCategory.cat_name}</p>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-muted-foreground">Description</Label>
                  <div className="mt-1 prose max-w-none text-gray-700">
                    {getCategoryDescription(category) ? (
                      <div>{getCategoryDescription(category)}</div>
                    ) : (
                      <p className="text-gray-500 italic">No description provided</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-base font-medium mb-4">SEO Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Meta Title</Label>
                      <p className="mt-1">
                        {getCategoryMetaTitle(category) || (
                          <span className="text-gray-500 italic">No meta title provided</span>
                        )}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">Meta Description</Label>
                      <div className="mt-1">
                        {getCategoryMetaDescription(category) ? (
                          <p>{getCategoryMetaDescription(category)}</p>
                        ) : (
                          <p className="text-gray-500 italic">No meta description provided</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}