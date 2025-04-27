'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../lib/axiosInstance';

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  subcategories: {
    subcategory_id: string;
    subcategory_name: string;
    slug: string;
  }[];
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('get-menu-categories/');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories for category grid:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Link
            key={category.category_id}
            href={`/${category.slug}`}
            className="bg-gray-100 hover:bg-gray-200 transition-colors p-4 text-center rounded-md border border-gray-200"
          >
            <div className="text-[#1a7ec2] font-medium text-lg">{category.category_name}</div>
           
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600">
          No categories available
        </div>
      )}
    </div>
  );
}