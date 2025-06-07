// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Plus, Edit, Trash2, Upload, Save, ArrowLeft, Eye, MapPin } from "lucide-react"

// import { Button } from "../../../components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
// import { Input } from "../../../components/ui/input"
// import { Label } from "../../../components/ui/label"
// import { Textarea } from "../../../components/ui/textarea"
// import { Badge } from "../../../components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../components/ui/dialog"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../../../components/ui/alert-dialog"

// interface Ad {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   linkUrl: string
//   position: "sidebar" | "header" | "footer" | "between-products" | "popup"
//   status: "active" | "inactive"
//   createdAt: string
// }

// interface AdManagementProps {
//   onBack: () => void
// }

// export default function AdManagement({ onBack }: AdManagementProps) {
//   const [view, setView] = useState<"list" | "add" | "edit">("list")
//   const [editingAd, setEditingAd] = useState<Ad | null>(null)
//   const [ads, setAds] = useState<Ad[]>([
//     {
//       id: 1,
//       title: "Special Offer Banner",
//       description: "Promotional banner for summer sale",
//       imageUrl: "/images/placeholder.svg?height=200&width=400",
//       linkUrl: "https://example.com/sale",
//       position: "header",
//       status: "active",
//       createdAt: "2024-01-15",
//     },
//     {
//       id: 2,
//       title: "Product Showcase",
//       description: "Featured product advertisement",
//       imageUrl: "/images/placeholder.svg?height=300&width=250",
//       linkUrl: "https://example.com/products",
//       position: "sidebar",
//       status: "active",
//       createdAt: "2024-01-10",
//     },
//     {
//       id: 3,
//       title: "Newsletter Signup",
//       description: "Email subscription promotion",
//       imageUrl: "/images/placeholder.svg?height=150&width=400",
//       linkUrl: "https://example.com/newsletter",
//       position: "footer",
//       status: "active",
//       createdAt: "2024-01-08",
//     },
//     {
//       id: 4,
//       title: "Flash Sale Popup",
//       description: "Limited time offer popup",
//       imageUrl: "/images/placeholder.svg?height=300&width=300",
//       linkUrl: "https://example.com/flash-sale",
//       position: "popup",
//       status: "inactive",
//       createdAt: "2024-01-05",
//     },
//     {
//       id: 5,
//       title: "Category Banner",
//       description: "Between products advertisement",
//       imageUrl: "/images/placeholder.svg?height=200&width=600",
//       linkUrl: "https://example.com/categories",
//       position: "between-products",
//       status: "active",
//       createdAt: "2024-01-03",
//     },
//   ])

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     imageUrl: "/images/placeholder.svg?height=200&width=400",
//     linkUrl: "",
//     position: "sidebar" as Ad["position"],
//     status: "active" as "active" | "inactive",
//   })

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       imageUrl: "/images/placeholder.svg?height=200&width=400",
//       linkUrl: "",
//       position: "sidebar",
//       status: "active",
//     })
//   }

//   const handleSave = () => {
//     if (view === "add") {
//       const newAd: Ad = {
//         id: Date.now(),
//         ...formData,
//         createdAt: new Date().toISOString().split("T")[0],
//       }
//       setAds([...ads, newAd])
//     } else if (view === "edit" && editingAd) {
//       setAds(ads.map((ad) => (ad.id === editingAd.id ? { ...ad, ...formData } : ad)))
//     }
//     resetForm()
//     setView("list")
//     setEditingAd(null)
//   }

//   const handleEdit = (ad: Ad) => {
//     setEditingAd(ad)
//     setFormData({
//       title: ad.title,
//       description: ad.description,
//       imageUrl: ad.imageUrl,
//       linkUrl: ad.linkUrl,
//       position: ad.position,
//       status: ad.status,
//     })
//     setView("edit")
//   }

//   const handleDelete = (id: number) => {
//     setAds(ads.filter((ad) => ad.id !== id))
//   }

//   const handleAddNew = () => {
//     resetForm()
//     setView("add")
//   }

//   const handleBack = () => {
//     if (view === "list") {
//       onBack()
//     } else {
//       resetForm()
//       setView("list")
//       setEditingAd(null)
//     }
//   }

//   const getPositionColor = (position: string) => {
//     const colors = {
//       sidebar: "bg-blue-100 text-blue-800",
//       header: "bg-green-100 text-green-800",
//       footer: "bg-purple-100 text-purple-800",
//       "between-products": "bg-orange-100 text-orange-800",
//       popup: "bg-red-100 text-red-800",
//     }
//     return colors[position as keyof typeof colors] || "bg-gray-100 text-gray-800"
//   }

//   // List View - View All Ads
//   if (view === "list") {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
             
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Ad Management</h1>
//                 <p className="text-gray-600">Manage advertisements for your ecommerce site</p>
//               </div>
//             </div>
//             <Button onClick={handleAddNew} className="flex items-center gap-2">
//               <Plus className="w-4 h-4" />
//               Add New Ad
//             </Button>
//           </div>
//         </header>

//         <div className="p-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {ads.map((ad) => (
//                 <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                   <div className="relative h-48">
//                     <Image src={ad.imageUrl || "/images/placeholder.svg"} alt={ad.title} fill className="object-cover" />
//                     <div className="absolute top-2 left-2">
//                       <Badge variant={ad.status === "active" ? "default" : "secondary"}>{ad.status}</Badge>
//                     </div>
//                     <div className="absolute top-2 right-2">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(ad.position)}`}>
//                         <MapPin className="w-3 h-3 inline mr-1" />
//                         {ad.position}
//                       </span>
//                     </div>
//                   </div>
//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
//                     <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
//                     <p className="text-xs text-blue-600 mb-4 truncate">Link: {ad.linkUrl || "No link"}</p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs text-gray-400">Created: {ad.createdAt}</span>
//                       <div className="flex gap-2">
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button variant="outline" size="sm">
//                               <Eye className="w-4 h-4" />
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-2xl">
//                             <DialogHeader>
//                               <DialogTitle>{ad.title}</DialogTitle>
//                               <DialogDescription>Ad Preview</DialogDescription>
//                             </DialogHeader>
//                             <div className="relative h-64 rounded-lg overflow-hidden">
//                               <Image
//                                 src={ad.imageUrl || "/images/placeholder.svg"}
//                                 alt={ad.title}
//                                 fill
//                                 className="object-cover"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <p className="text-sm text-gray-600">{ad.description}</p>
//                               <p className="text-sm">
//                                 <strong>Position:</strong> {ad.position}
//                               </p>
//                               <p className="text-sm">
//                                 <strong>Link:</strong>{" "}
//                                 <a
//                                   href={ad.linkUrl}
//                                   className="text-blue-600 hover:underline"
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                 >
//                                   {ad.linkUrl}
//                                 </a>
//                               </p>
//                             </div>
//                           </DialogContent>
//                         </Dialog>
//                         <Button variant="outline" size="sm" onClick={() => handleEdit(ad)}>
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <Button variant="outline" size="sm">
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>Delete Ad</AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 Are you sure you want to delete "{ad.title}"? This action cannot be undone.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Cancel</AlertDialogCancel>
//                               <AlertDialogAction
//                                 onClick={() => handleDelete(ad.id)}
//                                 className="bg-red-600 hover:bg-red-700"
//                               >
//                                 Delete
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {ads.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <Upload className="w-16 h-16 mx-auto" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No ads yet</h3>
//                 <p className="text-gray-600 mb-4">Get started by creating your first advertisement</p>
//                 <Button onClick={handleAddNew}>
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add New Ad
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Add/Edit Form View
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center gap-4">
//           <Button variant="outline" onClick={handleBack}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to List
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{view === "add" ? "Add New Ad" : "Edit Ad"}</h1>
//             <p className="text-gray-600">
//               {view === "add" ? "Create a new advertisement" : "Update advertisement information"}
//             </p>
//           </div>
//         </div>
//       </header>

//       <div className="p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Form */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Ad Details</CardTitle>
//                 <CardDescription>Fill in the information for your advertisement</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div>
//                   <Label htmlFor="title">Ad Title *</Label>
//                   <Input
//                     id="title"
//                     placeholder="Enter ad title"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     placeholder="Describe the advertisement"
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="linkUrl">Link URL</Label>
//                   <Input
//                     id="linkUrl"
//                     placeholder="https://example.com"
//                     value={formData.linkUrl}
//                     onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="position">Ad Position</Label>
//                   <select
//                     id="position"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     value={formData.position}
//                     onChange={(e) => setFormData({ ...formData, position: e.target.value as Ad["position"] })}
//                   >
//                     <option value="sidebar">Sidebar</option>
//                     <option value="header">Header</option>
//                     <option value="footer">Footer</option>
//                     <option value="between-products">Between Products</option>
//                     <option value="popup">Popup</option>
//                   </select>
//                 </div>

//                 <div>
//                   <Label htmlFor="status">Status</Label>
//                   <select
//                     id="status"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     value={formData.status}
//                     onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>

//                 <div>
//                   <Label>Upload Ad Image</Label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                     <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                     <Button variant="outline" size="sm" className="mt-2">
//                       Choose File
//                     </Button>
//                   </div>
//                 </div>

//                 <Button onClick={handleSave} className="w-full" disabled={!formData.title.trim()}>
//                   <Save className="w-4 h-4 mr-2" />
//                   {view === "add" ? "Save Ad" : "Update Ad"}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Preview */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Preview</CardTitle>
//                 <CardDescription>See how your ad will look</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
//                   <Image src={formData.imageUrl || "/images/placeholder.svg"} alt="Preview" fill className="object-cover" />
//                   <div className="absolute top-2 left-2">
//                     <Badge variant={formData.status === "active" ? "default" : "secondary"}>{formData.status}</Badge>
//                   </div>
//                   <div className="absolute top-2 right-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(formData.position)}`}
//                     >
//                       <MapPin className="w-3 h-3 inline mr-1" />
//                       {formData.position}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   <h3 className="font-semibold">{formData.title || "Ad Title"}</h3>
//                   <p className="text-sm text-gray-600">{formData.description || "Ad description will appear here"}</p>
//                   <p className="text-xs text-blue-600">
//                     {formData.linkUrl ? (
//                       <a href={formData.linkUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">
//                         {formData.linkUrl}
//                       </a>
//                     ) : (
//                       "No link specified"
//                     )}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Upload, Save, ArrowLeft, Eye, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import axiosInstance from '../../../lib/axiosInstance';
import axios from 'axios';

interface Ad {
  ad_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  slug: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface AdManagementProps {
  onBack: () => void;
}

export default function AdManagement({ onBack }: AdManagementProps) {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link_url: '',
    image: null as File | null,
    image_url: '/images/placeholder.svg?height=200&width=400',
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axiosInstance.get('/get-ads/', {
          params: { is_deleted: showDeleted ? true : undefined },
        });
        if (response.data.status_code === 200) {
          setAds(response.data.data.data.map((ad: any) => ({
            ...ad,
            ad_id: ad.id,
          })));
        } else {
          setError(response.data.message || 'Failed to fetch ads.');
          setAds([]);
        }
      } catch (err) {
        let errorMessage = 'An error occurred while fetching ads';
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        setAds([]);
        console.error('Fetch ads error:', err);
      }
    };
    fetchAds();
  }, [showDeleted]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      link_url: '',
      image: null,
      image_url: '/images/placeholder.svg?height=200&width=400',
    });
    setError('');
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      if (formData.description) formDataToSend.append('description', formData.description);
      if (formData.link_url) formDataToSend.append('link_url', formData.link_url);
      if (formData.image) formDataToSend.append('file', formData.image);

      if (view === 'add') {
        const response = await axiosInstance.post('/ads/', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status_code === 201) {
          setAds([...ads, { ...response.data.data.ad, ad_id: response.data.data.ad.id }]);
        } else {
          setError(response.data.message || 'Failed to create ad.');
          return;
        }
      } else if (view === 'edit' && editingAd) {
        const response = await axiosInstance.put(`/ads/${editingAd.ad_id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status_code === 200) {
          setAds(
            ads.map((ad) =>
              ad.ad_id === editingAd.ad_id ? { ...response.data.data.ad, ad_id: response.data.data.ad.id } : ad
            )
          );
        } else {
          setError(response.data.message || 'Failed to update ad.');
          return;
        }
      }
      resetForm();
      setView('list');
      setEditingAd(null);
    } catch (err) {
      let errorMessage = 'An error occurred while saving the ad';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Save ad error:', err);
    }
  };

  const handleEdit = async (adId: string) => {
    try {
      const response = await axiosInstance.get(`/ads/${adId}`);
      if (response.data.status_code === 200) {
        const ad = response.data.data.ad;
        setEditingAd({ ...ad, ad_id: ad.id });
        setFormData({
          title: ad.title,
          description: ad.description || '',
          link_url: ad.link_url || '',
          image: null,
          image_url: ad.image_url || '/images/placeholder.svg?height=200&width=400',
        });
        setView('edit');
      } else {
        setError(response.data.message || 'Failed to fetch ad.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred while fetching the ad';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Fetch ad error:', err);
    }
  };

  const handleDelete = async (adId: string) => {
    try {
      const response = await axiosInstance.delete(`/ads/${adId}`);
      if (response.data.status_code === 200) {
        setAds(ads.map((ad) => (ad.ad_id === adId ? { ...ad, is_deleted: true } : ad)));
      } else {
        setError(response.data.message || 'Failed to delete ad.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred while deleting the ad';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Delete ad error:', err);
    }
  };

  const handleRestore = async (adId: string) => {
    try {
      const response = await axiosInstance.put(`/ads/${adId}/restore`);
      if (response.data.status_code === 200) {
        setAds(ads.map((ad) => (ad.ad_id === adId ? { ...response.data.data.ad, ad_id: response.data.data.ad.id } : ad)));
      } else {
        setError(response.data.message || 'Failed to restore ad.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred while restoring the ad';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Restore ad error:', err);
    }
  };

  const handleAddNew = () => {
    resetForm();
    setView('add');
  };

  const handleBack = () => {
    if (view === 'list') {
      onBack();
    } else {
      resetForm();
      setView('list');
      setEditingAd(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        image_url: URL.createObjectURL(file),
      });
    }
  };

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ad Management</h1>
                <p className="text-gray-600">Manage advertisements for your ecommerce site</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleted(!showDeleted)}
              >
                {showDeleted ? 'Show Active Ads' : 'Show Deleted Ads'}
              </Button>
              <Button onClick={handleAddNew} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Ad
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.filter((ad) => ad.is_deleted === showDeleted).map((ad) => (
                <Card key={ad.ad_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={ad.image_url || '/images/placeholder.svg?height=200&width=400'}
                      alt={ad.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant={ad.is_deleted ? 'destructive' : 'default'}>
                        {ad.is_deleted ? 'Deleted' : 'Active'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{ad.description || 'No description'}</p>
                    <p className="text-xs text-blue-600 mb-4 truncate">Link: {ad.link_url || 'No link'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Created: {new Date(ad.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{ad.title}</DialogTitle>
                              <DialogDescription>Ad Preview</DialogDescription>
                            </DialogHeader>
                            <div className="relative h-64 rounded-lg overflow-hidden">
                              <Image
                                src={ad.image_url || '/images/placeholder.svg?height=200&width=400'}
                                alt={ad.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">{ad.description || 'No description'}</p>
                              <p className="text-sm">
                                <strong>Link:</strong>{' '}
                                {ad.link_url ? (
                                  <a
                                    href={ad.link_url}
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {ad.link_url}
                                  </a>
                                ) : (
                                  'No link'
                                )}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(ad.ad_id)}
                          disabled={ad.is_deleted}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {ad.is_deleted ? <RotateCcw className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {ad.is_deleted ? 'Restore Ad' : 'Delete Ad'}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {ad.is_deleted
                                  ? `Are you sure you want to restore "${ad.title}"?`
                                  : `Are you sure you want to delete "${ad.title}"? This will mark it as deleted.`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => (ad.is_deleted ? handleRestore(ad.ad_id) : handleDelete(ad.ad_id))}
                                className={ad.is_deleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                              >
                                {ad.is_deleted ? 'Restore' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {ads.filter((ad) => ad.is_deleted === showDeleted).length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Upload className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {showDeleted ? 'No deleted ads' : 'No ads yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {showDeleted ? 'No ads have been deleted.' : 'Get started by creating your first advertisement.'}
                </p>
                {!showDeleted && (
                  <Button onClick={handleAddNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Ad
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{view === 'add' ? 'Add New Ad' : 'Edit Ad'}</h1>
            <p className="text-gray-600">{view === 'add' ? 'Create a new advertisement' : 'Update advertisement information'}</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ad Details</CardTitle>
                <CardDescription>Fill in the information for your advertisement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Ad Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter ad title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the advertisement"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="link_url">Link URL</Label>
                  <Input
                    id="link_url"
                    placeholder="https://example.com"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Upload Ad Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <input
                      id="image"
                      type="file"
                      accept="image/png,image/jpeg,image/gif"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.image && (
                      <p className="text-sm text-gray-600 mt-2">{formData.image.name}</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleSave}
                  className="w-full"
                  disabled={!formData.title.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {view === 'add' ? 'Save Ad' : 'Update Ad'}
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See how your ad will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={formData.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">{formData.title || 'Ad Title'}</h3>
                  <p className="text-sm text-gray-600">{formData.description || 'Ad description will appear here'}</p>
                  <p className="text-xs text-blue-600">
                    {formData.link_url ? (
                      <a
                        href={formData.link_url}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {formData.link_url}
                      </a>
                    ) : (
                      'No link specified'
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
     </div> 
    );
}
