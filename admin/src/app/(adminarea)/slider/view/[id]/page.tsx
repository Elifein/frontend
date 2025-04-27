"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Separator } from "../../../../../components/ui/separator";
import axiosInstance from "../../../../../lib/axiosInstance"; // your custom axios import

interface Slider {
  slider_id: string;
  slider_title: string;
  slider_slug: string;
  slider_image: string | null;
  slider_status: boolean;
  slider_timestamp: string;
}

export default function ViewSliderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [slider, setSlider] = useState<Slider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await axiosInstance.get(`/sliders/${id}`);
        if (response.data.status_code === 200) {
          setSlider(response.data.data.slider);
        } else {
          setSlider(null);
        }
      } catch (error) {
        console.error("Error fetching slider:", error);
        setSlider(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlider();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!slider) {
    return (
      <div className="container mx-auto py-6 flex justify-center">
        <p>Slider not found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto py-6">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/slider")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sliders
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Slider Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg flex justify-center">
            <div className="relative w-full h-[300px]">
              <Image
                src={slider.slider_image || "/placeholder.svg"}
                alt={slider.slider_title}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 text-lg font-medium">{slider.slider_title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Slug</h3>
                <p className="mt-1 text-lg font-medium">{slider.slider_slug}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    slider.slider_status ?  "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}>
                    {slider.slider_status ? "Inactive" : "Active"}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="mt-1">{formatDate(slider.slider_timestamp)}</p>
              </div>
            </div>

            <Separator />

           
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/slider")}>
            Back
          </Button>
          <Button onClick={() => router.push(`/slider/edit/${slider.slider_id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Slider
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
