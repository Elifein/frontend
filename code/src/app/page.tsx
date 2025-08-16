// import { Carousel } from "../components/carousel"
// import { AdGrid } from "../components/category-grid"
// import { CookieConsent } from "../components/cookie-consent"
// import { SidebarCategories } from "../components/sidebar-categories"
// // import { FeaturedAuthor } from "@/components/featured-author"

// // import { GreetingCards } from "@/components/greeting-cards"

// // import { RecentlyViewed } from "@/components/recently-viewed"
// // import { DidYouKnow } from "@/components/did-you-know"
// // import { YouMightLike } from "@/components/you-might-like"

// import { Breadcrumb } from "../components/breadcrumb"
// import { FeaturedStores } from "../components/featured-stores"
// import { RecentlyViewed } from "../components/recently-viewed"
// import { TopBestsellers } from "../components/top-bestsellers"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Breadcrumb for mobile */}
//       <div className="md:hidden">
//         <Breadcrumb items={[{ label: "Home" }]} />
//       </div>

//       <div className="container mx-auto px-4 py-4">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar - hidden on mobile */}
//           <div className="w-full md:w-64 shrink-0 hidden md:block">
//             <SidebarCategories />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
            
//             <Carousel />

            
//             <div className="mt-6">
//               <AdGrid />
//             </div>
//           </div>
//         </div>
//       </div>

     

//       {/* Featured Stores */}
//       <div className="container mx-auto px-4 py-6">
//         <FeaturedStores />
//       </div>

//       {/* Did You Know We Carry */}
//       {/* <div className="container mx-auto px-4 py-6">
//         <DidYouKnow />
//       </div> */}

//       {/* Featured Author */}
//       {/* <div className="container mx-auto px-4 py-6">
//         <FeaturedAuthor />
//       </div> */}

//       {/* Top Bestsellers */}
//       <div className="container mx-auto px-4 py-6">
//         <TopBestsellers />
//       </div>

//       {/* Recently Viewed */}
//       <div className="container mx-auto px-4 py-6">
//         <RecentlyViewed />
//       </div>

//       {/* You Might Like */}
//       {/* <div className="container mx-auto px-4 py-6">
//         <YouMightLike />
//       </div> */}

//       {/* Greeting Cards */}
//       {/* <div className="container mx-auto px-4 py-6">
//         <GreetingCards />
//       </div> */}

//       {/* Cookie Consent */}
//       <CookieConsent />
//     </div>
//   )
// }


// app/page.tsx
import dynamic from "next/dynamic"
import axiosInstance from "../lib/axiosInstance"
import { SidebarCategories } from "../components/sidebar-categories"
import { Carousel } from "../components/carousel"
import { AdGrid } from "../components/category-grid"
import { Breadcrumb } from "../components/breadcrumb"
import { CookieConsent } from "../components/cookie-consent"

const FeaturedStores = dynamic(() => import('../components/featured-stores'), {
  ssr: true,
  loading: () => <p className="text-center py-8">Loading Featured Stores...</p>,
});

const TopBestsellers = dynamic(() => import('../components/top-bestsellers'), {
  ssr: true,
  loading: () => <p className="text-center py-8">Loading Best Sellers...</p>,
});

const RecentlyViewed = dynamic(() => import('../components/recently-viewed'), {
  ssr: true,
  loading: () => <p className="text-center py-8">Loading Recently Viewed...</p>,
});

export default async function Home() {
  // Fetch all critical data in parallel (server-side)
  const [slidesRes, adsRes, categoriesRes] = await Promise.all([
    axiosInstance.get("allslides/?status=false"),
    axiosInstance.get("get-ads/", { params: { is_deleted: false } }),
    axiosInstance.get("get-menu-categories/"),
  ])
  console.log("Slides Response:", slidesRes.data)  // 👈 This will log in server console
console.log("Ads Response:", adsRes.data)
console.log("Categories Response:", categoriesRes.data)

  const slides = slidesRes.data.data.sliders
  const ads = adsRes.data.data.data
  const categories = categoriesRes.data.data

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb for mobile */}
      <div className="md:hidden">
        <Breadcrumb items={[{ label: "Home" }]} />
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 hidden md:block">
            <SidebarCategories initialCategories={categories} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Carousel />
            <div className="mt-6">
              <AdGrid initialAds={ads} />
            </div>
          </div>
        </div>
      </div>

      {/* Lazy-loaded sections */}
      <div className="container mx-auto px-4 py-6">
        <FeaturedStores />
      </div>
      <div className="container mx-auto px-4 py-6">
        <TopBestsellers />
      </div>
      <div className="container mx-auto px-4 py-6">
        <RecentlyViewed />
      </div>

      <CookieConsent />
    </div>
  )
}
