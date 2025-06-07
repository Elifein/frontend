// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Plus, Edit, Trash2, Upload, Save, ArrowLeft, Eye } from "lucide-react"

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

// interface Slider {
//   id: number
//   title: string
//   subtitle: string
//   description: string
//   imageUrl: string
//   status: "active" | "inactive"
//   createdAt: string
// }

// interface SliderManagementProps {
//   onBack: () => void
// }

// export default function SliderManagement({ onBack }: SliderManagementProps) {
//   const [view, setView] = useState<"list" | "add" | "edit">("list")
//   const [editingSlider, setEditingSlider] = useState<Slider | null>(null)
//   const [sliders, setSliders] = useState<Slider[]>([
//     {
//       id: 1,
//       title: "SUMMER SALE",
//       subtitle: "Up to 50% Off",
//       description: "Get amazing discounts on summer collection",
//       imageUrl: "imagesimages/placeholder.svg?height=400&width=800",
//       status: "active",
//       createdAt: "2024-01-15",
//     },
//     {
//       id: 2,
//       title: "NEW ARRIVALS",
//       subtitle: "Fresh Styles",
//       description: "Check out our latest fashion trends",
//       imageUrl: "imagesimages/placeholder.svg?height=400&width=800",
//       status: "active",
//       createdAt: "2024-01-10",
//     },
//   ])

//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     imageUrl: "imagesimages/placeholder.svg?height=400&width=800",
//     status: "active" as "active" | "inactive",
//   })

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       subtitle: "",
//       description: "",
//       imageUrl: "imagesimages/placeholder.svg?height=400&width=800",
//       status: "active",
//     })
//   }

//   const handleSave = () => {
//     if (view === "add") {
//       const newSlider: Slider = {
//         id: Date.now(),
//         ...formData,
//         createdAt: new Date().toISOString().split("T")[0],
//       }
//       setSliders([...sliders, newSlider])
//     } else if (view === "edit" && editingSlider) {
//       setSliders(sliders.map((slider) => (slider.id === editingSlider.id ? { ...slider, ...formData } : slider)))
//     }
//     resetForm()
//     setView("list")
//     setEditingSlider(null)
//   }

//   const handleEdit = (slider: Slider) => {
//     setEditingSlider(slider)
//     setFormData({
//       title: slider.title,
//       subtitle: slider.subtitle,
//       description: slider.description,
//       imageUrl: slider.imageUrl,
//       status: slider.status,
//     })
//     setView("edit")
//   }

//   const handleDelete = (id: number) => {
//     setSliders(sliders.filter((slider) => slider.id !== id))
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
//       setEditingSlider(null)
//     }
//   }

//   // List View - View All Sliders
//   if (view === "list") {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               {/* <Button variant="outline" onClick={onBack}>
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Dashboard
//               </Button> */}
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Slider Management</h1>
//                 <p className="text-gray-600 mt-2">Manage your website sliders with overlay text</p>
//               </div>
//             </div>
//             <Button onClick={handleAddNew} className="flex items-center gap-2">
//               <Plus className="w-4 h-4" />
//               Add New Slider
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sliders.map((slider) => (
//               <Card key={slider.id} className="overflow-hidden">
//                 <div className="relative h-48">
//                   <Image src={slider.imageUrl || "imagesimages/placeholder.svg"} alt={slider.title} fill className="object-cover" />
//                   {/* Ecommerce-style overlay like your frontend */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{slider.title}</h2>
//                     <p className="text-sm text-center">{slider.subtitle}</p>
//                   </div>
//                   <div className="absolute top-2 right-2">
//                     <Badge variant={slider.status === "active" ? "default" : "secondary"}>{slider.status}</Badge>
//                   </div>
//                 </div>
//                 <CardContent className="p-4">
//                   <p className="text-xs text-gray-500 mb-4">{slider.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-400">Created: {slider.createdAt}</span>
//                     <div className="flex gap-2">
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline" size="sm">
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-2xl">
//                           <DialogHeader>
//                             <DialogTitle>Slider Preview</DialogTitle>
//                             <DialogDescription>Full size preview</DialogDescription>
//                           </DialogHeader>
//                           <div className="relative h-64 rounded-lg overflow-hidden">
//                             <Image
//                               src={slider.imageUrl || "imagesimages/placeholder.svg"}
//                               alt={slider.title}
//                               fill
//                               className="object-cover"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
//                             <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//                               <h2 className="text-4xl md:text-6xl font-bold mb-4">{slider.title}</h2>
//                               <p className="text-lg">{slider.subtitle}</p>
//                             </div>
//                           </div>
//                           <p className="text-sm text-gray-600">{slider.description}</p>
//                         </DialogContent>
//                       </Dialog>
//                       <Button variant="outline" size="sm" onClick={() => handleEdit(slider)}>
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <Button variant="outline" size="sm">
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                           <AlertDialogHeader>
//                             <AlertDialogTitle>Delete Slider</AlertDialogTitle>
//                             <AlertDialogDescription>
//                               Are you sure you want to delete "{slider.title}"? This action cannot be undone.
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction
//                               onClick={() => handleDelete(slider.id)}
//                               className="bg-red-600 hover:bg-red-700"
//                             >
//                               Delete
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {sliders.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <Upload className="w-16 h-16 mx-auto" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No sliders yet</h3>
//               <p className="text-gray-600 mb-4">Get started by creating your first slider</p>
//               <Button onClick={handleAddNew}>
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Slider
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }

//   // Add/Edit Form View
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <Button variant="outline" onClick={handleBack}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to List
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">{view === "add" ? "Add New Slider" : "Edit Slider"}</h1>
//             <p className="text-gray-600 mt-2">
//               {view === "add" ? "Create a new slider for your website" : "Update slider information"}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Form */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Slider Details</CardTitle>
//               <CardDescription>Fill in the information for your slider</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <Label htmlFor="title">Title * (Will appear large in center)</Label>
//                 <Input
//                   id="title"
//                   placeholder="e.g., SUMMER SALE"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="subtitle">Subtitle (Smaller text below title)</Label>
//                 <Input
//                   id="subtitle"
//                   placeholder="e.g., Up to 50% Off"
//                   value={formData.subtitle}
//                   onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="description">Description (Admin notes)</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Internal description for admin reference"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="status">Status</Label>
//                 <select
//                   id="status"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>

//               <div>
//                 <Label>Upload Image</Label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                   <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                   <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                   <Button variant="outline" size="sm" className="mt-2">
//                     Choose File
//                   </Button>
//                 </div>
//               </div>

//               <Button onClick={handleSave} className="w-full" disabled={!formData.title.trim()}>
//                 <Save className="w-4 h-4 mr-2" />
//                 {view === "add" ? "Save Slider" : "Update Slider"}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Preview - Ecommerce Style */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Preview</CardTitle>
//               <CardDescription>See how your slider will look (like your frontend)</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
//                 <Image src={formData.imageUrl || "imagesimages/placeholder.svg"} alt="Preview" fill className="object-cover" />
//                 {/* Same gradient overlay as your frontend */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//                   <h2 className="text-4xl md:text-6xl font-bold mb-4">{formData.title || "SLIDER TITLE"}</h2>
//                   <p className="text-lg">{formData.subtitle || "Slider Subtitle"}</p>
//                 </div>
//                 <div className="absolute top-2 right-2">
//                   <Badge variant={formData.status === "active" ? "default" : "secondary"}>{formData.status}</Badge>
//                 </div>
//               </div>
//               <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
//                 <strong>Admin Notes:</strong> {formData.description || "No description added"}
//               </div>
//             </CardContent>
//           </Card>
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

interface Slider {
  slider_id: string;
  slider_title: string;
  slider_slug: string;
  slider_image: string | null;
  slider_status: boolean; // false = active, true = deleted
  slider_timestamp: string;
  subtitle: string; // Added for frontend compatibility
  description: string; // Added for frontend compatibility
}

interface SliderManagementProps {
  onBack: () => void;
}

export default function SliderManagement({ onBack }: SliderManagementProps) {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null as File | null,
    imageUrl: '/images/placeholder.svg?height=400&width=800',
    status: false,
  });

  // Fetch sliders
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axiosInstance.get('/allslides/', {
          params: { status: showDeleted ? true : undefined },
        });
        if (response.data.status_code === 200) {
          setSliders(
            response.data.data.sliders.map((slider: any) => ({
              slider_id: slider.slider_id,
              slider_title: slider.slider_title,
              slider_slug: slider.slider_slug,
              slider_image: slider.slider_image,
              slider_status: slider.slider_status,
              slider_timestamp: slider.slider_timestamp,
              subtitle: slider.subtitle || '', // Fallback if not provided
              description: slider.description || '', // Fallback if not provided
            }))
          );
        } else {
          setError(response.data.message || 'Failed to fetch sliders.');
          setSliders([]);
        }
      } catch (err) {
        let errorMessage = 'An error occurred while fetching sliders';
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        setSliders([]);
        console.error('Fetch sliders error:', err);
      }
    };
    fetchSliders();
  }, [showDeleted]);

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: null,
      imageUrl: '/images/placeholder.svg?height=400&width=800',
      status: false,
    });
    setError('');
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('slider_title', formData.title.trim().toUpperCase());
      formDataToSend.append('slider_slug', formData.title.trim().toLowerCase().replace(/\s+/g, '-'));
      formDataToSend.append('slider_status', String(formData.status));
      if (formData.image) {
        formDataToSend.append('file', formData.image);
      }

      if (view === 'add') {
        const response = await axiosInstance.post('/sliders/', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status_code === 201) {
          setSliders([
            ...sliders,
            {
              ...response.data.data.slider,
              subtitle: formData.subtitle,
              description: formData.description,
            },
          ]);
        } else {
          setError(response.data.message || 'Failed to create slider.');
          return;
        }
      } else if (view === 'edit' && editingSlider) {
        const response = await axiosInstance.put(`/sliders/${editingSlider.slider_id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status_code === 200) {
          setSliders(
            sliders.map((slider) =>
              slider.slider_id === editingSlider.slider_id
                ? {
                    ...slider,
                    slider_title: formData.title.toUpperCase(),
                    slider_slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
                    slider_image: response.data.data.slider.slider_image,
                    slider_status: formData.status,
                    subtitle: formData.subtitle,
                    description: formData.description,
                  }
                : slider
            )
          );
        } else {
          setError(response.data.message || 'Failed to update slider.');
          return;
        }
      }
      resetForm();
      setView('list');
      setEditingSlider(null);
    } catch (err) {
      let errorMessage = 'An error occurred while saving the slider';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Save slider error:', err);
    }
  };

  const handleEdit = async (sliderId: string) => {
    try {
      const response = await axiosInstance.get(`/sliders/${sliderId}`);
      if (response.data.status_code === 200) {
        const slider = response.data.data.slider;
        setEditingSlider(slider);
        setFormData({
          title: slider.slider_title,
          subtitle: slider.subtitle || '',
          description: slider.description || '',
          image: null,
          imageUrl: slider.slider_image || '/images/placeholder.svg?height=400&width=800',
          status: slider.slider_status,
        });
        setView('edit');
      } else {
        setError(response.data.message || 'Failed to fetch slider.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred while fetching the slider';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Fetch slider error:', err);
    }
  };

  const handleDelete = async (sliderId: string) => {
    try {
      const response = await axiosInstance.delete(`/sliders/${sliderId}`);
      if (response.data.status_code === 200) {
        setSliders(sliders.map((slider) =>
          slider.slider_id === sliderId ? { ...slider, slider_status: true } : slider
        ));
      } else {
        setError(response.data.message || 'Failed to delete slider.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred while deleting the slider';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Delete slider error:', err);
    }
  };

  const handleRestore = async (sliderId: string) => {
    try {
      const response = await axiosInstance.put(`/sliders/${sliderId}/restore`, {
        slider_status: false,
      });
      if (response.data.status_code === 200) {
        setSliders(sliders.map((slider) =>
          slider.slider_id === sliderId ? { ...slider, slider_status: false } : slider
        ));
      } else {
        setError(response.data.message || 'Failed to restore slider.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred while restoring the slider';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Restore slider error:', err);
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
      setEditingSlider(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  // List View
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
             
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Slider Management</h1>
                <p className="text-gray-600 mt-2">Manage your website sliders with overlay text</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleted(!showDeleted)}
              >
                {showDeleted ? 'Show Active Sliders' : 'Show Deleted Sliders'}
              </Button>
              <Button onClick={handleAddNew} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Slider
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-md the border-red-500 bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders.filter((slider) => slider.slider_status === showDeleted).map((slider) => (
              <Card key={slider.slider_id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={slider.slider_image || '/images/placeholder.svg?height=400&width=800'}
                    alt={slider.slider_title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{slider.slider_title}</h2>
                    <p className="text-sm text-center">{slider.subtitle}</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant={slider.slider_status ? 'destructive' : 'default'}>
                      {slider.slider_status ? 'Deleted' : 'Active'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 mb-4">{slider.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Created: {new Date(slider.slider_timestamp).toLocaleDateString()}
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
                            <DialogTitle>Slider Preview</DialogTitle>
                            <DialogDescription>Full size preview</DialogDescription>
                          </DialogHeader>
                          <div className="relative h-64 rounded-lg overflow-hidden">
                            <Image
                              src={slider.slider_image || '/images/placeholder.svg?height=400&width=800'}
                              alt={slider.slider_title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <h2 className="text-4xl md:text-6xl font-bold mb-4">{slider.slider_title}</h2>
                              <p className="text-lg">{slider.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{slider.description}</p>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(slider.slider_id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            {slider.slider_status ? <RotateCcw className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {slider.slider_status ? 'Restore Slider' : 'Delete Slider'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {slider.slider_status
                                ? `Are you sure you want to restore "${slider.slider_title}"?`
                                : `Are you sure you want to delete "${slider.slider_title}"? This will mark it as deleted.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => (slider.slider_status ? handleRestore(slider.slider_id) : handleDelete(slider.slider_id))}
                              className={slider.slider_status ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                            >
                              {slider.slider_status ? 'Restore' : 'Delete'}
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

          {sliders.filter((slider) => slider.slider_status === showDeleted).length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Upload className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {showDeleted ? 'No deleted sliders' : 'No sliders yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {showDeleted ? 'No sliders have been deleted.' : 'Get started by creating your first slider.'}
              </p>
              {!showDeleted && (
                <Button onClick={handleAddNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Slider
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Add/Edit Form View
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{view === 'add' ? 'Add New Slider' : 'Edit Slider'}</h1>
            <p className="text-gray-600 mt-2">
              {view === 'add' ? 'Create a new slider for your website' : 'Update slider information'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Slider Details</CardTitle>
              <CardDescription>Fill in the information for your slider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Title * (Will appear large in center)</Label>
                <Input
                  id="title"
                  placeholder="e.g., SUMMER SALE"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle (Smaller text below title)</Label>
                <Input
                  id="subtitle"
                  placeholder="e.g., Up to 50% Off"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Admin notes)</Label>
                <Textarea
                  id="description"
                  placeholder="Internal description for admin reference"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.status ? 'deleted' : 'active'}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value === 'deleted' })
                  }
                >
                  <option value="active">Active</option>
                  <option value="deleted">Deleted</option>
                </select>
              </div>
              <div>
                <Label htmlFor="image">Upload Image</Label>
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
                {view === 'add' ? 'Save Slider' : 'Update Slider'}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your slider will look (like your frontend)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {formData.title || 'SLIDER TITLE'}
                  </h2>
                  <p className="text-lg">{formData.subtitle || 'Slider Subtitle'}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant={formData.status ? 'destructive' : 'default'}>
                    {formData.status ? 'Deleted' : 'Active'}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                <strong>Admin Notes:</strong> {formData.description || 'No description added'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
