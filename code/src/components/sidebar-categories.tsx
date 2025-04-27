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

export function SidebarCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('get-menu-categories/');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories for sidebar:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Toggle subcategory visibility
  const toggleSubcategories = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-gray-200 p-2 font-semibold">BROWSE</div>
      <ul className="divide-y divide-gray-200">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.category_id}>
              <div className="flex items-center justify-between px-3 py-1.5">
                <Link
                  href={`/${category.slug}`}
                  className="block text-sm hover:bg-gray-100 transition-colors flex-grow"
                >
                  {category.category_name}
                </Link>
                {category.subcategories.length > 0 && (
                  <button
                    onClick={() => toggleSubcategories(category.category_id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {expandedCategories.includes(category.category_id) ? '−' : '+'}
                  </button>
                )}
              </div>
              {category.subcategories.length > 0 &&
                expandedCategories.includes(category.category_id) && (
                  <ul className="pl-4 divide-y divide-gray-200 bg-gray-100">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.subcategory_id}>
                        <Link
                          href={`/${category.slug}/${subcategory.slug}`}
                          className="block px-3 py-1.5 text-sm hover:bg-gray-200 transition-colors"
                        >
                          {subcategory.subcategory_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))
        ) : (
          <li className="px-3 py-1.5 text-sm text-gray-600">
            No categories available
          </li>
        )}
      </ul>

      <div className="bg-gray-200 p-2 font-semibold mt-4">REFINE BY</div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Top Rated</span>
          <span className="text-sm text-gray-500">+</span>
        </div>
      </div>
    </div>
  );
}