'use client';

import { useEffect, useState } from 'react';
import { use } from 'react'; // import `use` from react
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '../../lib/axiosInstance';
import slugify from 'slugify';  // Import slugify to generate slugs from product names

interface Product {
  product_id: string;
  product_name: string;
  selling_price: string;
  image_url: string;
  slug?: string; // Optional slug field, will be generated dynamically
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const unwrappedParams = use(params); // <-- unwrap Promise
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<Product[]>(`products/by-category/${unwrappedParams.category}`);
    
        const productsWithSlugs = response.data.map((item) => ({
          ...item,
          slug: item.slug || slugify(item.product_name),
        }));
    
        setProducts(productsWithSlugs);
      } catch (error) {
        console.error('Error fetching products for category:', error);
        setProducts([]);
      }
    };
    

    fetchProducts();
  }, [unwrappedParams.category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800 capitalize">
          {unwrappedParams.category.replace('-', ' ')}
        </h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.product_id} className="w-full">
              <div className="relative">
                <div className="w-[150px] h-[150px] mx-auto">
                  <Image
                    src={product.image_url || FALLBACK_IMAGE}
                    alt={product.product_name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <Link
                href={`/${unwrappedParams.category}/${product.slug}`} // Linking to product page with generated slug
                className="text-sm hover:underline block text-center mt-2"
              >
                {product.product_name}
              </Link>
              <div className="text-center mt-1">
                <span className="text-red-600 font-bold">
                  ₹{parseFloat(product.selling_price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No products found in this category</div>
      )}
    </div>
  );
}
