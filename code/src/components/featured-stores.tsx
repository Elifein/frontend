'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '../lib/axiosInstance';

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  imgthumbnail: string;
  featured_category: boolean;
  subcategories: {
    subcategory_id: string;
    subcategory_name: string;
    slug: string;
  }[];
}

export function FeaturedStores() {
  const [categories, setCategories] = useState<Category[]>([]);
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/get-categories/');
        const featuredCategories = response.data.data.filter(
          (category: Category) => category.featured_category
        );
        setCategories(featuredCategories);
      } catch (error) {
        console.error('Error fetching categories for featured stores:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">Featured Stores:</h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.category_id}
              href={`/${category.slug}`}
              className="text-center group"
            >
              <div className="w-[150px] h-[150px] mx-auto rounded-full overflow-hidden border mb-2 transition-all group-hover:shadow-md">
                <Image
                  src={category.imgthumbnail || FALLBACK_IMAGE}
                  alt={category.category_name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="text-[#1a4e78] font-medium">{category.category_name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No featured stores available</div>
      )}
    </div>
  );
}