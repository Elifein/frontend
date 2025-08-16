'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '../lib/axiosInstance';

interface Product {
  product_id: string;
  product_name: string;
  selling_price: number;
  original_price?: number;
  image_url: string;
  slug: string;
  category_slug: string;
  rating: number;
  review_count: number;
}

export function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([]);
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

  // Fetch recently viewed products
  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        // Get product IDs from localStorage
        const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]') as string[];
        if (recentlyViewedIds.length === 0) {
          setProducts([]);
          return;
        }

        // Fetch product details
        const response = await axiosInstance.post('products/', {
          product_ids: recentlyViewedIds,
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching recently viewed products:', error);
        setProducts([]);
      }
    };

    fetchRecentlyViewed();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">Recently Viewed</h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      {products.length > 0 ? (
        <div className="flex flex-col sm:flex-row gap-4">
          {products.map((product) => (
            <div key={product.product_id} className="w-full sm:w-1/6">
              <div className="relative">
                <div className="w-[150px] h-[150px] mx-auto">
                  <Image
                    src={product.image_url || FALLBACK_IMAGE}
                    alt={product.product_name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                {product.original_price && product.original_price > product.selling_price && (
                  <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 z-10 rotate-[-45deg] translate-x-[-15px] translate-y-[10px]">
                    SALE
                  </div>
                )}
              </div>
              {product.original_price && product.original_price > product.selling_price && (
                <div className="text-blue-600 font-medium text-sm mt-2">
                  Save {Math.round(((product.original_price - product.selling_price) / product.original_price) * 100)}%
                </div>
              )}
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm ml-1">{product.rating.toFixed(1)} ({product.review_count})</span>
              </div>
              <Link
                href={`/${product.category_slug}/${product.slug}`}
                className="text-sm hover:underline"
              >
                {product.product_name}
              </Link>
              <div className="text-sm text-gray-600">By Elifein</div>
              <div className="mt-1">
                {product.original_price && product.original_price > product.selling_price && (
                  <span className="line-through text-gray-500 text-sm">${product.original_price.toFixed(2)}</span>
                )}{' '}
                <span className="text-red-600 font-bold">${product.selling_price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No recently viewed products</div>
      )}
    </div>
  );
}
export default RecentlyViewed;