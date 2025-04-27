'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import axiosInstance from '../../../lib/axiosInstance';
import { useCart } from '../../../lib/cart-context';

interface Product {
  product_id: string;
  identification: {
    product_sku: string;
    product_name: string;
  };
  pricing: {
    actual_price: string;
    selling_price: string;
  };
  descriptions: {
    full_description: string;
    short_description: string;
  };
  inventory: {
    quantity: string;
    stock_alert_status: string;
  };
  images: {
    urls: string[];
  };
  slug: string;
  tags_and_relationships: {
    product_tags: string[];
  };
  cat_id: string;
}

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug, category } = use(params);
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`products/slug/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      const sellingPrice = parseFloat(product.pricing.selling_price);
      if (isNaN(sellingPrice)) {
        console.error('Invalid selling price:', product.pricing.selling_price);
        alert('Cannot add to cart: Invalid price');
        return;
      }
      if (!product.images.urls[0]) {
        console.warn('No image available, using fallback');
      }
      addToCart({
        product_id: product.product_id,
        product_name: product.identification.product_name || 'Unknown Product',
        selling_price: product.pricing.selling_price,
        image_url: product.images.urls[0] || FALLBACK_IMAGE,
        slug: product.slug,
        category_slug: category,
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Product not found
      </div>
    );
  }

  const actualPrice = parseFloat(product.pricing.actual_price);
  const sellingPrice = parseFloat(product.pricing.selling_price);
  const isOnSale = actualPrice > sellingPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">{product.identification.product_name}</h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <div className="w-[150px] h-[150px] mx-auto">
              <Image
                src={product.images?.urls?.[0] || FALLBACK_IMAGE}
                alt={product.identification.product_name}
                width={150}
                height={150}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            {isOnSale && (
              <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 z-10 rotate-[-45deg] translate-x-[-15px] translate-y-[10px]">
                SALE
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="text-blue-600 font-medium text-sm mb-2">
            {isOnSale && `Save ${Math.round(((actualPrice - sellingPrice) / actualPrice) * 100)}%`}
          </div>
          <div className="text-sm text-gray-600 mb-2">SKU: {product.identification.product_sku}</div>
          <div className="text-sm mb-4">{product.descriptions.short_description}</div>
          <div className="mb-4">
            {isOnSale && (
              <span className="line-through text-gray-500 text-sm mr-2">
                ₹{actualPrice.toFixed(2)}
              </span>
            )}
            <span className="text-red-600 font-bold">₹{sellingPrice.toFixed(2)}</span>
          </div>
          <div className="text-sm mb-2">
            Stock: {product.inventory.stock_alert_status === 'instock' ? 'In Stock' : 'Out of Stock'} ({product.inventory.quantity} available)
          </div>
          <div className="text-sm mb-4">
            Tags: {product.tags_and_relationships.product_tags.join(', ')}
          </div>
          <div className="text-sm mb-4">{product.descriptions.full_description}</div>
          <button
            onClick={handleAddToCart}
            className="bg-[#1a7ec2] text-white px-4 py-2 rounded hover:bg-[#1a4e78]"
            disabled={!product.inventory.quantity || product.inventory.stock_alert_status !== 'instock'}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}