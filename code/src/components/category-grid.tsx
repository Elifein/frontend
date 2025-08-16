
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import axiosInstance from '../lib/axiosInstance';

// interface Ad {
//   ad_id: string;
//   title: string;
//   description: string | null;
//   image_url: string | null;
//   link_url: string | null;
//   slug: string;
//   is_deleted: boolean;
//   created_at: string;
//   updated_at: string;
// }

// export function AdGrid() {
//   const [ads, setAds] = useState<Ad[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosInstance.get('/get-ads/', {
//           params: { is_deleted: false },
//         });
//         if (response.data.status_code === 200) {
//           setAds(response.data.data.data.map((ad: any) => ({
//             ...ad,
//             ad_id: ad.id,
//           })));
//         } else {
//           setAds([]);
//         }
//       } catch (error) {
//         console.error('Error fetching ads:', error);
//         setAds([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAds();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[...Array(8)].map((_, index) => (
//           <div key={index} className="bg-gray-100 animate-pulse rounded-md border border-gray-200 h-64">
//             <div className="p-4 space-y-3">
//               <div className="bg-gray-300 h-32 rounded"></div>
//               <div className="bg-gray-300 h-4 rounded w-3/4"></div>
//               <div className="bg-gray-300 h-3 rounded w-1/2"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {ads.length > 0 ? (
//         ads.map((ad) => (
//           <Link
//             key={ad.ad_id}
//             href={ad.link_url || `/ad/${ad.slug}`}
//             className="bg-white hover:shadow-lg transition-shadow rounded-md border border-gray-200 overflow-hidden group"
//           >
//             <div className="relative">
//               {ad.image_url ? (
//                 <Image
//                   src={ad.image_url}
//                   alt={ad.title}
//                   width={300}
//                   height={200}
//                   className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-400 text-sm">No Image</span>
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-[#1a7ec2] transition-colors">
//                 {ad.title}
//               </h3>
//               {ad.description && (
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ad.description}</p>
//               )}
//               <div className="mt-2 text-xs text-gray-400">
//                 {new Date(ad.created_at).toLocaleDateString()}
//               </div>
//             </div>
//           </Link>
//         ))
//       ) : (
//         <div className="col-span-full text-center text-gray-600 py-12">
//           <div className="text-lg font-medium mb-2">No ads available</div>
//           <p className="text-sm">Check back later for new listings</p>
//         </div>
//       )}
//     </div>
//   );
// }


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axiosInstance from '../lib/axiosInstance'

interface Ad {
  ad_id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string | null
  slug: string
  created_at: string
}

export function AdGrid({ initialAds }: { initialAds: Ad[] }) {
  const [ads, setAds] = useState<Ad[]>(initialAds || [])
  const [loading, setLoading] = useState(!initialAds)

  useEffect(() => {
    if (!initialAds) {
      const fetchAds = async () => {
        try {
          setLoading(true)
          const response = await axiosInstance.get('/get-ads/', { params: { is_deleted: false } })
          setAds(response.data.data.data.map((ad: any) => ({ ...ad, ad_id: ad.id })))
        } catch (error) {
          console.error('Error fetching ads:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchAds()
    }
  }, [initialAds])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse rounded-md border h-64" />
        ))}
      </div>
    )
  }

  if (ads.length === 0) {
    return <div className="text-center text-gray-600 py-12">No ads available</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ads.map((ad, index) => (
  <Link
    key={ad.ad_id || ad.slug || index}
    href={ad.link_url || `/ad/${ad.slug}`}
    className="bg-white hover:shadow-lg transition rounded-md border overflow-hidden group"
  >
          {ad.image_url ? (
            <Image
              src={ad.image_url}
              alt={ad.title}
              width={300}
              height={200}
              loading="lazy"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>
          )}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#1a7ec2]">
              {ad.title}
            </h3>
            {ad.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ad.description}</p>}
            <div className="mt-2 text-xs text-gray-400">{new Date(ad.created_at).toLocaleDateString()}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
