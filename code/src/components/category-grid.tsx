// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import axiosInstance from '../lib/axiosInstance';

// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// export function CategoryGrid() {
//   const [categories, setCategories] = useState<Category[]>([]);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('get-menu-categories/');
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error('Error fetching categories for category grid:', error);
//         setCategories([]);
//       }
//     };

//     fetchCategories();
//   }, []);



//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {categories.length > 0 ? (
//         categories.map((category) => (
//           <Link
//             key={category.category_id}
//             href={`/${category.slug}`}
//             className="bg-gray-100 hover:bg-gray-200 transition-colors p-4 text-center rounded-md border border-gray-200"
//           >
//             <div className="text-[#1a7ec2] font-medium text-lg">{category.category_name}</div>
           
//           </Link>
//         ))
//       ) : (
//         <div className="col-span-full text-center text-gray-600">
//           No categories available
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axiosInstance from '../lib/axiosInstance';

interface Ad {
  ad_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  slug: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export function AdGrid() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/get-ads/', {
          params: { is_deleted: false },
        });
        if (response.data.status_code === 200) {
          setAds(response.data.data.data.map((ad: any) => ({
            ...ad,
            ad_id: ad.id,
          })));
        } else {
          setAds([]);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-100 animate-pulse rounded-md border border-gray-200 h-64">
            <div className="p-4 space-y-3">
              <div className="bg-gray-300 h-32 rounded"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              <div className="bg-gray-300 h-3 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ads.length > 0 ? (
        ads.map((ad) => (
          <Link
            key={ad.ad_id}
            href={ad.link_url || `/ad/${ad.slug}`}
            className="bg-white hover:shadow-lg transition-shadow rounded-md border border-gray-200 overflow-hidden group"
          >
            <div className="relative">
              {ad.image_url ? (
                <Image
                  src={ad.image_url}
                  alt={ad.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-[#1a7ec2] transition-colors">
                {ad.title}
              </h3>
              {ad.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ad.description}</p>
              )}
              <div className="mt-2 text-xs text-gray-400">
                {new Date(ad.created_at).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600 py-12">
          <div className="text-lg font-medium mb-2">No ads available</div>
          <p className="text-sm">Check back later for new listings</p>
        </div>
      )}
    </div>
  );
}

