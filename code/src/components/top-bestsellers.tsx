// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import axiosInstance from '../lib/axiosInstance';
// import slugify from 'slugify';

// interface Product {
//   product_id: string;
//   product_name: string;
//   selling_price: string;
//   image_url: string;
//   slug: string;
//   onSale: boolean;
// }

// export function TopBestsellers() {
//   const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';
//   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     axiosInstance
//       .get('products/')
//       .then((response) => {
//         const products = response.data
//           .filter((item: any) => item.status_flags.featured_product)
//           .map((item: any) => ({
//             product_id: item.product_id,
//             product_name: item.identification.product_name,
//             selling_price: item.pricing.selling_price,
//             image_url: item.images.urls[0] || FALLBACK_IMAGE,
//             slug: item.slug || slugify(item.identification.product_name, { lower: true }),
//             onSale: item.pricing.actual_price !== item.pricing.selling_price,
//           }));
//         setFeaturedProducts(products);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching featured products:', error);
//         setError('Failed to load featured products');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading best sellers...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-serif text-gray-800">Best Sellers</h2>
//         <div className="border-t border-gray-300 flex-grow ml-4"></div>
//         {/* <Link href="/products" className="text-[#1a4e78] font-medium ml-4">
//           VIEW MORE
//         </Link> */}
//       </div>

//       {featuredProducts.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 relative">
//           {featuredProducts.map((product) => (
//             <div key={product.product_id} className="relative">
//               <div className="relative w-[150px] h-[150px] mx-auto">
//                 {product.onSale && (
//                   <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 z-10">
//                     SALE
//                   </div>
//                 )}
//                 <Image
//                   src={product.image_url}
//                   alt={product.product_name}
//                   width={150}
//                   height={150}
//                   className="w-full h-full object-cover border"
//                 />
//               </div>
//               <Link
//                 href={`/products/${product.slug}`}
//                 className="text-sm hover:underline block text-center mt-2"
//               >
//                 {product.product_name}
//               </Link>
//               <div className="text-center mt-1">
//                 <span className="text-red-600 font-bold">
//                   ₹{parseFloat(product.selling_price).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600">No featured products available</div>
//       )}

//       {featuredProducts.length > 0 && (
//         <>
//           <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
//             <ChevronLeft className="h-6 w-6 text-gray-600" />
//           </button>
//           <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
//             <ChevronRight className="h-6 w-6 text-gray-600" />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import axiosInstance from '../lib/axiosInstance';
// import slugify from 'slugify';

// interface Product {
//   product_id: string;
//   product_name: string;
//   selling_price: string;
//   image_url: string;
//   slug: string;
//   onSale: boolean;
// }

// interface RawProduct {
//   product_id: string;
//   identification: {
//     product_name: string;
//   };
//   pricing: {
//     selling_price: string;
//     actual_price: string;
//   };
//   images: {
//     urls: string[];
//   };
//   slug?: string;
//   status_flags: {
//     featured_product: boolean;
//   };
// }

// export function TopBestsellers() {
//   const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';
//   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     axiosInstance
//       .get<RawProduct[]>('products/')
//       .then((response) => {
//         const products = response.data
//           .filter((item) => item.status_flags.featured_product)
//           .map((item) => ({
//             product_id: item.product_id,
//             product_name: item.identification.product_name,
//             selling_price: item.pricing.selling_price,
//             image_url: item.images.urls[0] || FALLBACK_IMAGE,
//             slug: item.slug || slugify(item.identification.product_name, { lower: true }),
//             onSale: item.pricing.actual_price !== item.pricing.selling_price,
//           }));
//         setFeaturedProducts(products);
//       })
//       .catch((error) => {
//         console.error('Error fetching featured products:', error);
//         setError('Failed to load featured products');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading best sellers...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-serif text-gray-800">Best Sellers</h2>
//         <div className="border-t border-gray-300 flex-grow ml-4" />
//       </div>

//       {featuredProducts.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 relative">
//           {featuredProducts.map((product) => (
//             <div key={product.product_id} className="relative">
//               <div className="relative w-[150px] h-[150px] mx-auto">
//                 {product.onSale && (
//                   <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 z-10">
//                     SALE
//                   </div>
//                 )}
//                 <Image
//                   src={product.image_url}
//                   alt={product.product_name}
//                   width={150}
//                   height={150}
//                   className="w-full h-full object-cover border"
//                 />
//               </div>
//               <Link
//                 href={`/products/${product.slug}`}
//                 className="text-sm hover:underline block text-center mt-2"
//               >
//                 {product.product_name}
//               </Link>
//               <div className="text-center mt-1">
//                 <span className="text-red-600 font-bold">
//                   ₹{parseFloat(product.selling_price).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600">No featured products available</div>
//       )}

//       {featuredProducts.length > 0 && (
//         <>
//           <button
//             type="button"
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
//           >
//             <ChevronLeft className="h-6 w-6 text-gray-600" />
//           </button>
//           <button
//             type="button"
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
//           >
//             <ChevronRight className="h-6 w-6 text-gray-600" />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axiosInstance from '../lib/axiosInstance';
import slugify from 'slugify';

interface Product {
  product_id: string;
  product_name: string;
  selling_price: string;
  image_url: string;
  slug: string;
  onSale: boolean;
}

interface RawProduct {
  product_id: string;
  identification: {
    product_name: string;
  };
  pricing: {
    selling_price: string;
    actual_price: string;
  };
  images: {
    urls: string[];
  };
  slug?: string;
  status_flags: {
    featured_product: boolean;
  };
}

export function TopBestsellers() {
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axiosInstance
      .get<RawProduct[]>('products/')
      .then((response) => {
        const products = response.data
          .filter((item) => item.status_flags.featured_product)
          .map((item) => ({
            product_id: item.product_id,
            product_name: item.identification.product_name,
            selling_price: item.pricing.selling_price,
            image_url: item.images.urls[0] || FALLBACK_IMAGE,
            slug: item.slug || slugify(item.identification.product_name, { lower: true }),
            onSale: item.pricing.actual_price !== item.pricing.selling_price,
          }));
        setFeaturedProducts(products);
      })
      .catch((error) => {
        console.error('Error fetching featured products:', error);
        setError('Failed to load featured products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading best sellers...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">Best Sellers</h2>
        <div className="border-t border-gray-300 flex-grow ml-4" />
      </div>

      {featuredProducts.length > 0 ? (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-6 pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.product_id}
                className="relative flex-shrink-0 w-[150px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative w-[150px] h-[150px] mx-auto">
                  {product.onSale && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 z-[5]">
                      SALE
                    </div>
                  )}
                  <Image
                    src={product.image_url}
                    alt={product.product_name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover border"
                  />
                </div>
                <Link
                  href={`/products/${product.slug}`}
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
          <button
            type="button"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-[5]"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-[5]"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-600">No featured products available</div>
      )}
    </div>
  );
}