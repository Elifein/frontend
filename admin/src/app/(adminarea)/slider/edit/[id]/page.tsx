"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Trash2, AlertCircle } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { Card, CardContent } from "../../../../../components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../../components/ui/alert";
import axiosInstance from "../../../../../lib/axiosInstance";

// Interface for API response
interface Slider {
  slider_id: string;
  slider_title: string;
  slider_slug: string;
  slider_image: string | null;
  slider_status: boolean;
  slider_timestamp: string;
}

interface ApiResponse {
  status_code: number;
  message: string;
  data: {
    slider: Slider;
  };
}

// Function to generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

export default function EditSliderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
  });
  const [image, setImage] = useState<{ file: File | null; preview: string }>({
    file: null,
    preview: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch slider data on mount
  useEffect(() => {
    const fetchSlider = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<ApiResponse>(`sliders/${id}/`);
        if (response.data.status_code !== 200) {
          throw new Error(response.data.message || "Failed to fetch slider");
        }

        const slider = response.data.data.slider;
        setFormData({
          title: slider.slider_title,
          slug: slider.slider_slug,
        });
        setImage({
          file: null,
          preview: slider.slider_image || "/images/placeholder.svg",
        });
      } catch (err) {
        console.error("Error fetching slider:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching the slider"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlider();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title if it hasn't been manually edited
    if (name === "title" && formData.slug === generateSlug(formData.title)) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
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
    setImage({ file: null, preview: "/images/placeholder.svg" });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      if (!formData.title || !formData.slug) {
        throw new Error("Title and slug are required");
      }

      const submissionData = new FormData();
      submissionData.append("slider_title", formData.title);
      submissionData.append("slider_slug", formData.slug);
      if (image.file) {
        submissionData.append("file", image.file); // Match API field name
      }

      const response = await axiosInstance.put(`sliders/${id}`, submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status_code === 200) {
        setSuccess(true);
        setFormData({
          title: "",
          slug: "",
        });
        setImage({ file: null, preview: "" });
        setTimeout(() => router.push("/slider"), 2000);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the slider"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/slider">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Slider</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/slider">Cancel</Link>
          </Button>
          <Button
            type="submit"
            form="slider-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
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
            Slider has been updated successfully! Redirecting...
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Slider Image Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Slider Image</h2>
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-md border bg-muted relative">
                  {image.preview ? (
                    <>
                      <Image
                        src={image.preview}
                        alt="Slider preview"
                        fill
                        className="object-contain"
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
                          Click to upload slider image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF (max. 10MB)
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
        </div>

        {/* Slider Details Form */}
        <div className="md:col-span-2">
          <form id="slider-form" onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Slider Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter slider title"
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
                      placeholder="slider-slug"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      The "slug" is the URL-friendly version of the title. It is
                      usually all lowercase and contains only letters, numbers,
                      and hyphens.
                    </p>
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