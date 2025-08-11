// 'use client';

// import React, { useState, useRef, useEffect, use } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { ArrowLeft, Upload, Trash2, AlertCircle } from 'lucide-react';
// import { Button } from '../../../../../components/ui/button';
// import { Input } from '../../../../../components/ui/input';
// import { Textarea } from '../../../../../components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../../../../../components/ui/select';
// import { Card, CardContent } from '../../../../../components/ui/card';
// import { Label } from '../../../../../components/ui/label';
// import { Switch } from '../../../../../components/ui/switch';
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from '../../../../../components/ui/alert';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../../../../../components/ui/dialog';
// import axiosInstance from '../../../../../lib/axiosInstance';
// import axios from 'axios';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// interface Category {
//   cat_id: string;
//   cat_description: string;
//   cat_slug: string;
//   cat_name: string;
//   cat_meta_title: string;
//   cat_meta_description: string;
//   cat_imgthumbnail: string;
//   cat_featured_category: boolean;
//   cat_show_in_menu: boolean;
//   cat_status: boolean;
// }



// export default function EditCategoryPage({ params }: Props) {
//   const { id } = use(params);
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     parent: '',
//     featured: false,
//     show_in_menu: true,
//     meta_title: '',
//     meta_description: '',
//     status: false,
//   });
//   const [image, setImage] = useState<{ file: File | null; preview: string }>({
//     file: null,
//     preview: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [parentCategories, setParentCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get(`/get-categories/${id}`);
//         const data = response.data.data;
//         const category = data.category || data.subcategory;

//         if (category) {
//           setFormData({
//             name: category.cat_name || category.subcat_name || '',
//             slug: category.cat_slug || category.subcat_slug || '',
//             description:
//               category.cat_description || category.subcat_description || '',
//             parent: category.cat_ref_id || '',
//             featured:
//               category.cat_featured_category ||
//               category.subcat_featured_category ||
//               false,
//             show_in_menu:
//               category.cat_show_in_menu || category.subcat_show_in_menu || true,
//             meta_title:
//               category.cat_meta_title || category.subcat_meta_title || '',
//             meta_description:
//               category.cat_meta_description ||
//               category.subcat_meta_description ||
//               '',
//             status: category.cat_status || category.subcat_status || false,
//           });
//           setImage({
//             file: null,
//             preview:
//               category.cat_imgthumbnail || category.subcat_imgthumbnail || '',
//           });
//         } else {
//           setError('Category not found');
//         }
//       } catch (err) {
//         setError('Failed to load category data');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchParentCategories = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: Category[] }>('/get-categories');
//         setParentCategories(response.data.data || []);
//       } catch (err) {
//         console.error('Failed to load parent categories:', err);
//       }
//     };

//     fetchCategories();
//     fetchParentCategories();
//   }, [id]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === 'name') {
//       const newSlug = value
//         .toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^a-z0-9-]/g, '');
//       const currentSlug = formData.slug;
//       const currentName = formData.name;
//       const currentNameAsSlug = currentName
//         .toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^a-z0-9-]/g, '');

//       if (!currentSlug || currentSlug === currentNameAsSlug) {
//         setFormData((prev) => ({
//           ...prev,
//           slug: newSlug,
//         }));
//       }
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         setImage({
//           file,
//           preview: event.target?.result as string,
//         });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImage({ file: null, preview: '' });
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       if (!formData.name) {
//         throw new Error('Category name is required');
//       }

//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('slug', formData.slug);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('meta_title', formData.meta_title);
//       formDataToSend.append('meta_description', formData.meta_description);
//       formDataToSend.append('featured', String(formData.featured));
//       formDataToSend.append('show_in_menu', String(formData.show_in_menu));
//       formDataToSend.append('status', String(formData.status));
//       if (formData.parent && formData.parent !== 'none') {
//         formDataToSend.append('parent', formData.parent); // Changed from cat_ref_id
//       }
//       if (image.file) {
//         // Validate file
//         if (!image.file.type.startsWith('image/')) {
//           throw new Error('Only image files are allowed');
//         }
//         if (image.file.size > 2 * 1024 * 1024) {
//           throw new Error('File size exceeds 2MB limit');
//         }
//         formDataToSend.append('file', image.file);
//       }
//       if (!image.preview && !image.file) {
//         formDataToSend.append('remove_image', 'true');
//       }

//       // Log FormData for debugging
//       console.log('Sending FormData:', Object.fromEntries(formDataToSend));

//       await axiosInstance.put(`/update-categories/${id}`, formDataToSend);

//       setSuccess(true);
//       console.log('edit categories succeess');
//       setTimeout(() => {
//         router.push('/categories');
//       }, 2000);
//     }catch (err: unknown) {
//       let errorMessage = 'An error occurred while updating the category';
    
//       if (axios.isAxiosError(err)) {
//         errorMessage = err.response?.data?.detail || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
    
//       setError(errorMessage);
//       console.error('Update error:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     setIsSubmitting(true);

//     try {
//       await axiosInstance.delete(`/delete-category/${id}`);
//       setIsDeleteDialogOpen(false);
//       router.push('/categories');
//     } catch (error) {
//       setError('Failed to delete category');
//       console.error(error);
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto max-w-4xl px-4 py-8">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">
//               Loading category data...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto max-w-4xl px-4 py-8">
//       <div className="mb-6 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="icon" asChild>
//             <Link href="/categories">
//               <ArrowLeft className="h-4 w-4" />
//             </Link>
//           </Button>
//           <h1 className="text-2xl font-bold">Edit Category</h1>
//         </div>

//         <div className="flex gap-2">
//           <Dialog
//             open={isDeleteDialogOpen}
//             onOpenChange={setIsDeleteDialogOpen}
//           >
//             <DialogTrigger asChild>
//               <Button variant="destructive">
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   Are you sure you want to delete this category?
//                 </DialogTitle>
//                 <DialogDescription>
//                   This action cannot be undone. This will permanently delete the
//                   category and may affect products assigned to it.
//                 </DialogDescription>
//               </DialogHeader>
//               <DialogFooter>
//                 <Button
//                   variant="outline"
//                   onClick={() => setIsDeleteDialogOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={handleDelete}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Deleting...' : 'Delete Category'}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>

//           <Button variant="outline" asChild>
//             <Link href="/admin/categories">Cancel</Link>
//           </Button>
//           <Button type="submit" form="category-form" disabled={isSubmitting}>
//             {isSubmitting ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </div>
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {success && (
//         <Alert className="mb-6 bg-green-50 border-green-200">
//           <AlertCircle className="h-4 w-4 text-green-600" />
//           <AlertTitle className="text-green-800">Success</AlertTitle>
//           <AlertDescription className="text-green-700">
//             Category has been updated successfully! Redirecting...
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-6 md:grid-cols-3">
//         <div className="md:col-span-1">
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-lg font-medium mb-4">Category Image</h2>
//               <div className="space-y-4">
//                 <div className="aspect-square overflow-hidden rounded-md border bg-muted relative">
//                   {image.preview ? (
//                     <>
//                       <Image
//                         src={image.preview || '/images/placeholder.svg'}
//                         alt="Category preview"
//                         fill
//                         className="object-cover"
//                       />
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         className="absolute top-2 right-2 h-8 w-8 rounded-full"
//                         onClick={removeImage}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </>
//                   ) : (
//                     <div
//                       className="flex h-full items-center justify-center cursor-pointer"
//                       onClick={triggerFileInput}
//                     >
//                       <div className="flex flex-col items-center gap-1 text-center">
//                         <Upload className="h-8 w-8 text-muted-foreground" />
//                         <p className="text-sm font-medium">
//                           Click to upload category image
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           SVG, PNG, JPG or GIF (max. 2MB)
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageUpload}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="mt-6">
//             <CardContent className="p-6">
//               <h2 className="text-lg font-medium mb-4">Category Settings</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="featured">Featured Category</Label>
//                   <Switch
//                     id="featured"
//                     checked={formData.featured}
//                     onCheckedChange={(checked) =>
//                       setFormData((prev) => ({ ...prev, featured: checked }))
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="show_in_menu">Show in Menu</Label>
//                   <Switch
//                     id="show_in_menu"
//                     checked={formData.show_in_menu}
//                     onCheckedChange={(checked) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         show_in_menu: checked,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="md:col-span-2">
//           <form id="category-form" onSubmit={handleSubmit}>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">
//                       Category Name <span className="text-red-500">*</span>
//                     </Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Enter category name"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="slug">Slug</Label>
//                     <Input
//                       id="slug"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleInputChange}
//                       placeholder="enter-category-slug"
//                     />
//                     <p className="text-sm text-muted-foreground">
//                       The {"'slug'"} is the URL-friendly version of the name. It
//                       is usually all lowercase and contains only letters,
//                       numbers, and hyphens.
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="parent">Parent Category</Label>
//                     <Select
//                       value={formData.parent || 'none'}
//                       onValueChange={(value) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           parent: value === 'none' ? '' : value,
//                         }))
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="None (top level category)" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="none">
//                           None (top level category)
//                         </SelectItem>
//                         {parentCategories.map((category) => (
//                           <SelectItem
//                             key={category.cat_id}
//                             value={category.cat_id}
//                           >
//                             {category.cat_name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <p className="text-sm text-muted-foreground">
//                       Categories can be nested hierarchically. You can select a
//                       parent category if this is a subcategory.
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description</Label>
//                     <Textarea
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Enter category description"
//                       rows={4}
//                     />
//                     <p className="text-sm text-muted-foreground">
//                       The description is not prominent by default; however, some
//                       themes may show it.
//                     </p>
//                   </div>

//                   <div className="pt-4 border-t">
//                     <h3 className="text-base font-medium mb-4">SEO Settings</h3>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="meta_title">Meta Title</Label>
//                         <Input
//                           id="meta_title"
//                           name="meta_title"
//                           value={formData.meta_title}
//                           onChange={handleInputChange}
//                           placeholder="Enter meta title"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="meta_description">
//                           Meta Description
//                         </Label>
//                         <Textarea
//                           id="meta_description"
//                           name="meta_description"
//                           value={formData.meta_description}
//                           onChange={handleInputChange}
//                           placeholder="Enter meta description"
//                           rows={3}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// 'use client';

// import React, { useState, useRef, useEffect, use } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { ArrowLeft, Upload, Trash2, AlertCircle } from 'lucide-react';
// import { Button } from '../../../../../components/ui/button';
// import { Input } from '../../../../../components/ui/input';
// import { Textarea } from '../../../../../components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../../../../../components/ui/select';
// import { Card, CardContent } from '../../../../../components/ui/card';
// import { Label } from '../../../../../components/ui/label';
// import { Switch } from '../../../../../components/ui/switch';
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from '../../../../../components/ui/alert';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../../../../../components/ui/dialog';
// import axiosInstance from '../../../../../lib/axiosInstance';
// import axios from 'axios';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// interface Category {
//   cat_id: string;
//   cat_description: string;
//   cat_slug: string;
//   cat_name: string;
//   cat_meta_title: string;
//   cat_meta_description: string;
//   cat_imgthumbnail: string;
//   cat_featured_category: boolean;
//   cat_show_in_menu: boolean;
//   cat_status: boolean;
// }

// export default function EditCategoryPage({ params }: Props) {
//   const { id } = use(params);
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     parent: '',
//     featured: false,
//     show_in_menu: true,
//     meta_title: '',
//     meta_description: '',
//     status: false,
//   });
//   const [image, setImage] = useState<{ file: File | null; preview: string; isRemoved: boolean }>({
//     file: null,
//     preview: '',
//     isRemoved: false,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [parentCategories, setParentCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get(`/get-categories/${id}`);
//         const data = response.data.data;
//         const category = data.category || data.subcategory;

//         if (category) {
//           setFormData({
//             name: category.cat_name || category.subcat_name || '',
//             slug: category.cat_slug || category.subcat_slug || '',
//             description: category.cat_description || category.subcat_description || '',
//             parent: category.cat_ref_id || '',
//             featured: category.cat_featured_category || category.subcat_featured_category || false,
//             show_in_menu: category.cat_show_in_menu || category.subcat_show_in_menu || true,
//             meta_title: category.cat_meta_title || category.subcat_meta_title || '',
//             meta_description: category.cat_meta_description || category.subcat_meta_description || '',
//             status: category.cat_status || category.subcat_status || false,
//           });
//           setImage({
//             file: null,
//             preview: category.cat_imgthumbnail || category.subcat_imgthumbnail || '',
//             isRemoved: false,
//           });
//         } else {
//           setError('Category not found');
//         }
//       } catch (err) {
//         setError('Failed to load category data');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchParentCategories = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: Category[] }>('/get-categories');
//         // Remove duplicates based on cat_id
//         const uniqueCategories = Array.from(
//           new Map(response.data.data.map((cat) => [cat.cat_id, cat])).values()
//         );
//         setParentCategories(uniqueCategories);
//         console.log('parentCategories:', uniqueCategories); // Debug duplicates
//       } catch (err) {
//         console.error('Failed to load parent categories:', err);
//       }
//     };

//     fetchCategories();
//     fetchParentCategories();
//   }, [id]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === 'name') {
//       const newSlug = value
//         .toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^a-z0-9-]/g, '');
//       const currentSlug = formData.slug;
//       const currentName = formData.name;
//       const currentNameAsSlug = currentName
//         .toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^a-z0-9-]/g, '');

//       if (!currentSlug || currentSlug === currentNameAsSlug) {
//         setFormData((prev) => ({
//           ...prev,
//           slug: newSlug,
//         }));
//       }
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         setImage({
//           file,
//           preview: event.target?.result as string,
//           isRemoved: false,
//         });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImage({ file: null, preview: '', isRemoved: true });
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       if (!formData.name) {
//         throw new Error('Category name is required');
//       }

//       // Log initial formData state for debugging
//       console.log('FormData state before submission:', formData);

//       const formDataToSend = new FormData();

//       // Use backend-expected field names (no 'cat_' prefix)
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('slug', formData.slug);
//       formDataToSend.append('description', formData.description || '');
//       formDataToSend.append('meta_title', formData.meta_title || '');
//       formDataToSend.append('meta_description', formData.meta_description || '');
//       formDataToSend.append('featured', formData.featured ? 'true' : 'false');
//       formDataToSend.append('show_in_menu', formData.show_in_menu ? 'true' : 'false');
//       formDataToSend.append('status', formData.status ? 'true' : 'false');

//       // Handle parent field
//       if (formData.parent && formData.parent !== 'none') {
//         formDataToSend.append('parent', formData.parent);
//       } else {
//         formDataToSend.append('parent', 'none');
//       }

//       // Image handling
//       if (image.file) {
//         if (!image.file.type.startsWith('image/')) {
//           throw new Error('Only image files are allowed');
//         }
//         if (image.file.size > 2 * 1024 * 1024) {
//           throw new Error('File size exceeds 2MB limit');
//         }
//         formDataToSend.append('file', image.file);
//       }

//       // Log FormData contents for debugging
//       const formDataObj: Record<string, any> = {};
//       formDataToSend.forEach((value, key) => {
//         formDataObj[key] = value instanceof File ? value.name : value;
//       });
//       console.log('FormData contents:', formDataObj);

//       // Send the request
//       const response = await axiosInstance.put(`/update-categories/${id}`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('API Response:', response.data);

//       setSuccess(true);
//       console.log('Edit categories success');
//       setTimeout(() => {
//         router.push('/categories');
//       }, 2000);
//     } catch (err: unknown) {
//       let errorMessage = 'An error occurred while updating the category';
//       if (axios.isAxiosError(err)) {
//         console.error('Full error response:', err.response?.data);
//         errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message;
//       } else if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       setError(errorMessage);
//       console.error('Update error:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     setIsSubmitting(true);

//     try {
//       await axiosInstance.delete(`/delete-category/${id}`);
//       setIsDeleteDialogOpen(false);
//       router.push('/categories');
//     } catch (error) {
//       setError('Failed to delete category');
//       console.error(error);
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto max-w-4xl px-4 py-8">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">
//               Loading category data...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto max-w-4xl px-4 py-8">
//       <div className="mb-6 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="icon" asChild>
//             <Link href="/categories">
//               <ArrowLeft className="h-4 w-4" />
//             </Link>
//           </Button>
//           <h1 className="text-2xl font-bold">Edit Category</h1>
//         </div>

//         <div className="flex gap-2">
//           <Dialog
//             open={isDeleteDialogOpen}
//             onOpenChange={setIsDeleteDialogOpen}
//           >
//             <DialogTrigger asChild>
//               <Button variant="destructive">
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   Are you sure you want to delete this category?
//                 </DialogTitle>
//                 <DialogDescription>
//                   This action cannot be undone. This will permanently delete the
//                   category and may affect products assigned to it.
//                 </DialogDescription>
//               </DialogHeader>
//               <DialogFooter>
//                 <Button
//                   variant="outline"
//                   onClick={() => setIsDeleteDialogOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={handleDelete}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Deleting...' : 'Delete Category'}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>

//           <Button variant="outline" asChild>
//             <Link href="/categories">Cancel</Link>
//           </Button>
//           <Button type="submit" form="category-form" disabled={isSubmitting}>
//             {isSubmitting ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </div>
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {success && (
//         <Alert className="mb-6 bg-green-50 border-green-200">
//           <AlertCircle className="h-4 w-4 text-green-600" />
//           <AlertTitle className="text-green-800">Success</AlertTitle>
//           <AlertDescription className="text-green-700">
//             Category has been updated successfully! Redirecting...
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-6 md:grid-cols-3">
//         <div className="md:col-span-1">
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-lg font-medium mb-4">Category Image</h2>
//               <div className="space-y-4">
//                 <div className="aspect-square overflow-hidden rounded-md border bg-muted relative">
//                   {image.preview ? (
//                     <>
//                       <Image
//                         src={image.preview || '/images/placeholder.svg'}
//                         alt="Category preview"
//                         fill
//                         className="object-cover"
//                       />
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         className="absolute top-2 right-2 h-8 w-8 rounded-full"
//                         onClick={removeImage}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </>
//                   ) : (
//                     <div
//                       className="flex h-full items-center justify-center cursor-pointer"
//                       onClick={triggerFileInput}
//                     >
//                       <div className="flex flex-col items-center gap-1 text-center">
//                         <Upload className="h-8 w-8 text-muted-foreground" />
//                         <p className="text-sm font-medium">
//                           Click to upload category image
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           SVG, PNG, JPG or GIF (max. 2MB)
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageUpload}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="mt-6">
//             <CardContent className="p-6">
//               <h2 className="text-lg font-medium mb-4">Category Settings</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between" key="featured">
//                   <Label htmlFor="featured">Featured Category</Label>
//                   <Switch
//                     id="featured"
//                     checked={formData.featured}
//                     onCheckedChange={(checked) =>
//                       setFormData((prev) => ({ ...prev, featured: checked }))
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between" key="show_in_menu">
//                   <Label htmlFor="show_in_menu">Show in Menu</Label>
//                   <Switch
//                     id="show_in_menu"
//                     checked={formData.show_in_menu}
//                     onCheckedChange={(checked) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         show_in_menu: checked,
//                       }))
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between" key="status">
//                   <Label htmlFor="status">Status</Label>
//                   <Switch
//                     id="status"
//                     checked={formData.status}
//                     onCheckedChange={(checked) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         status: checked,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="md:col-span-2">
//           <form id="category-form" onSubmit={handleSubmit}>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">
//                       Category Name <span className="text-red-500">*</span>
//                     </Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Enter category name"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="slug">Slug</Label>
//                     <Input
//                       id="slug"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleInputChange}
//                       placeholder="enter-category-slug"
//                     />
//                     <p className="text-sm text-muted-foreground">
//                       The {"'slug'"} is the URL-friendly version of the name. It
//                       is usually all lowercase and contains only letters,
//                       numbers, and hyphens.
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="parent">Parent Category</Label>
//                     <Select
//                       value={formData.parent || 'none'}
//                       onValueChange={(value) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           parent: value === 'none' ? '' : value,
//                         }))
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="None (top level category)" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="none" key="none">
//                           None (top level category)
//                         </SelectItem>
//                         {parentCategories.map((category) => (
//                           <SelectItem
//                             key={category.cat_id}
//                             value={category.cat_id}
//                           >
//                             {category.cat_name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <p className="text-sm text-muted-foreground">
//                       Categories can be nested hierarchically. You can select a
//                       parent category if this is a subcategory.
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description</Label>
//                     <Textarea
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Enter category description"
//                       rows={4}
//                     />
//                     <p className="text-sm text-muted-foreground">
//                       The description is not prominent by default; however, some
//                       themes may show it.
//                     </p>
//                   </div>

//                   <div className="pt-4 border-t">
//                     <h3 className="text-base font-medium mb-4">SEO Settings</h3>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="meta_title">Meta Title</Label>
//                         <Input
//                           id="meta_title"
//                           name="meta_title"
//                           value={formData.meta_title}
//                           onChange={handleInputChange}
//                           placeholder="Enter meta title"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="meta_description">
//                           Meta Description
//                         </Label>
//                         <Textarea
//                           id="meta_description"
//                           name="meta_description"
//                           value={formData.meta_description}
//                           onChange={handleInputChange}
//                           placeholder="Enter meta description"
//                           rows={3}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
import axiosInstance from '../../../../../lib/axiosInstance';
import axios from 'axios';

type Props = {
  params: Promise<{ id: string }>;
};

interface Category {
  cat_id: string;
  cat_description: string | null; // Allow null
  cat_slug: string;
  cat_name: string;
  cat_meta_title: string | null; // Allow null
  cat_meta_description: string | null; // Allow null
  cat_imgthumbnail: string | null; // Allow null
  cat_featured_category: boolean;
  cat_show_in_menu: boolean;
  cat_status: boolean;
}

export default function EditCategoryPage({ params }: Props) {
  const { id } = use(params);
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
  const [image, setImage] = useState<{ file: File | null; preview: string; isRemoved: boolean }>({
    file: null,
    preview: '',
    isRemoved: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/get-categories/${id}`);
        const data = response.data.data;
        const category = data.category || data.subcategory;

        if (category) {
          setFormData({
            name: category.cat_name || category.subcat_name || '',
            slug: category.cat_slug || category.subcat_slug || '',
            description: category.cat_description || category.subcat_description || '',
            parent: category.cat_ref_id || '',
            featured: category.cat_featured_category || category.subcat_featured_category || false,
            show_in_menu: category.cat_show_in_menu || category.subcat_show_in_menu || true,
            meta_title: category.cat_meta_title || category.subcat_meta_title || '',
            meta_description: category.cat_meta_description || category.subcat_meta_description || '',
            status: category.cat_status || category.subcat_status || false,
          });
          setImage({
            file: null,
            preview: category.cat_imgthumbnail || category.subcat_imgthumbnail || '',
            isRemoved: false,
          });
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

    const fetchParentCategories = async () => {
      try {
        const response = await axiosInstance.get<{ data: Category[] }>('/get-categories');
        // Remove duplicates based on cat_id
        const uniqueCategories = Array.from(
          new Map(response.data.data.map((cat) => [cat.cat_id, cat])).values()
        );
        setParentCategories(uniqueCategories);
        console.log('parentCategories:', uniqueCategories); // Debug duplicates
      } catch (err) {
        console.error('Failed to load parent categories:', err);
      }
    };

    fetchCategories();
    fetchParentCategories();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
          isRemoved: false,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage({ file: null, preview: '', isRemoved: true });
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
  
      console.log('FormData state before submission:', formData);
  
      const formDataToSend = new FormData();
  
      formDataToSend.append('name', formData.name);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('meta_title', formData.meta_title || '');
      formDataToSend.append('meta_description', formData.meta_description || '');
      formDataToSend.append('featured', formData.featured ? 'true' : 'false');
      formDataToSend.append('show_in_menu', formData.show_in_menu ? 'true' : 'false');
      formDataToSend.append('status', formData.status ? 'true' : 'false');
  
      if (formData.parent && formData.parent !== 'none') {
        formDataToSend.append('parent', formData.parent);
      } else {
        formDataToSend.append('parent', 'none');
      }
  
      if (image.file) {
        if (!image.file.type.startsWith('image/')) {
          throw new Error('Only image files are allowed');
        }
        if (image.file.size > 2 * 1024 * 1024) {
          throw new Error('File size exceeds 2MB limit');
        }
        formDataToSend.append('file', image.file);
      }
  
      // Define the type for formDataObj values
      const formDataObj: Record<string, string | File | null> = {};
      formDataToSend.forEach((value, key) => {
        formDataObj[key] = value instanceof File ? value.name : value;
      });
      console.log('FormData contents:', formDataObj);
  
      const response = await axiosInstance.put(`/update-categories/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response:', response.data);
  
      setSuccess(true);
      console.log('Edit categories success');
      setTimeout(() => {
        router.push('/categories');
      }, 2000);
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while updating the category';
      if (axios.isAxiosError(err)) {
        console.error('Full error response:', err.response?.data);
        errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message;
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
      await axiosInstance.delete(`/delete-category/${id}`);
      setIsDeleteDialogOpen(false);
      router.push('/categories');
    } catch (error) {
      setError('Failed to delete category');
      console.error(error);
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
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Category</h1>
        </div>

        {/* <div className="flex gap-2">
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
            <Link href="/categories">Cancel</Link>
          </Button>
          <Button type="submit" form="category-form" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div> */}
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
                <div className="flex items-center justify-between" key="featured">
                  <Label htmlFor="featured">Featured Category</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, featured: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between" key="show_in_menu">
                  <Label htmlFor="show_in_menu">Show in Menu</Label>
                  <Switch
                    id="show_in_menu"
                    checked={formData.show_in_menu}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        show_in_menu: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between" key="status">
                  <Label htmlFor="status">Status</Label>
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                      The {"'slug'"} is the URL-friendly version of the name. It
                      is usually all lowercase and contains only letters,
                      numbers, and hyphens.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Category</Label>
                    <Select
                      value={formData.parent || 'none'}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          parent: value === 'none' ? '' : value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="None (top level category)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" key="none">
                          None (top level category)
                        </SelectItem>
                        {parentCategories.map((category) => (
                          <SelectItem
                            key={category.cat_id}
                            value={category.cat_id}
                          >
                            {category.cat_name}
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
                      value={formData.description || ''}
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
                          value={formData.meta_title || ''}
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
                          value={formData.meta_description || ''}
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