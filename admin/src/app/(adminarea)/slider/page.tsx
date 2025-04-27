"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus, Search, Edit, Trash2, MoreHorizontal, ArrowUpDown, Eye,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../../components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "../../../components/ui/dialog";
import axiosInstance from "../../../lib/axiosInstance";
import { AxiosError } from "axios";

// API Response Interfaces
interface RawSlider {
  slider_id: string;
  slider_title: string;
  slider_slug: string;
  slider_image: string | null;
  slider_status: boolean;
  slider_timestamp: string;
}

interface Slider {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  status: boolean;
  timestamp: string;
}

interface ApiResponse {
  status_code: number;
  message: string;
  timestamp: string;
  data: {
    sliders: RawSlider[];
    total: number;
  };
}

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [selectedSliders, setSelectedSliders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [slidersToDelete, setSlidersToDelete] = useState<string[] | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse>("allslides/?status=false");

        if (response.data.status_code !== 200) {
          throw new Error(response.data.message || "Failed to fetch sliders");
        }

        const transformedSliders: Slider[] = response.data.data.sliders.map((slider) => ({
          id: slider.slider_id,
          title: slider.slider_title,
          slug: slider.slider_slug,
          imageUrl: slider.slider_image || "/images/placeholder.svg",
          status: slider.slider_status,
          timestamp: slider.slider_timestamp,
        }));

        setSliders(transformedSliders);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error fetching sliders:", error.message);
        setError("Failed to load sliders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const filteredSliders = sliders.filter(
    (slider) =>
      slider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slider.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSliderSelection = (id: string) => {
    setSelectedSliders((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSliders.length === filteredSliders.length) {
      setSelectedSliders([]);
    } else {
      setSelectedSliders(filteredSliders.map((slider) => slider.id));
    }
  };

  const confirmDelete = (ids: string | string[]) => {
    setSlidersToDelete(Array.isArray(ids) ? ids : [ids]);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!slidersToDelete || slidersToDelete.length === 0) return;

    setIsDeleting(true);

    try {
      await Promise.all(
        slidersToDelete.map(async (id) => {
          await axiosInstance.delete(`/sliders/${id}`);
        })
      );

      setSliders((prev) => prev.filter((slider) => !slidersToDelete.includes(slider.id)));
      setSelectedSliders((prev) => prev.filter((id) => !slidersToDelete.includes(id)));
      setIsDeleteDialogOpen(false);
      setSlidersToDelete(null);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to delete sliders:", error.message);
      setError("Failed to delete sliders. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = () => {
    if (selectedSliders.length === 0) return;
    confirmDelete(selectedSliders);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sliders</h1>
          <p className="text-muted-foreground">Manage your website sliders</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sliders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link href="/slider/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Slider
            </Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading sliders...</div>
      ) : (
        <>
          {selectedSliders.length > 0 && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
              <span className="text-sm">
                {selectedSliders.length}{" "}
                {selectedSliders.length === 1 ? "slider" : "sliders"} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                disabled={isDeleting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
            </div>
          )}

          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedSliders.length === filteredSliders.length &&
                        filteredSliders.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all sliders"
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Title <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-center">Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSliders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No sliders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSliders.map((slider) => (
                    <TableRow key={slider.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSliders.includes(slider.id)}
                          onCheckedChange={() => toggleSliderSelection(slider.id)}
                          aria-label={`Select ${slider.title}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-md border">
                          <Image
                            src={slider.imageUrl || "/images/placeholder.svg"}
                            alt={slider.title}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{slider.title}</TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-sm">
                        {slider.slug}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {slider.status ? (
                          <Badge variant="secondary">Inactive</Badge>
                        ) : (
                          <Badge>Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(slider.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/slider/view/${slider.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/slider/edit/${slider.id}`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => confirmDelete(slider.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete{" "}
              {slidersToDelete && slidersToDelete.length > 1 ? "these sliders" : "this slider"}?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Slider"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
