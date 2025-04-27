import { Carousel } from "../components/carousel"
import { CategoryGrid } from "../components/category-grid"
import { CookieConsent } from "../components/cookie-consent"
import { SidebarCategories } from "../components/sidebar-categories"
// import { FeaturedAuthor } from "@/components/featured-author"

// import { GreetingCards } from "@/components/greeting-cards"

// import { RecentlyViewed } from "@/components/recently-viewed"
// import { DidYouKnow } from "@/components/did-you-know"
// import { YouMightLike } from "@/components/you-might-like"

import { Breadcrumb } from "../components/breadcrumb"
import { FeaturedStores } from "../components/featured-stores"
import { RecentlyViewed } from "../components/recently-viewed"
import { TopBestsellers } from "../components/top-bestsellers"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb for mobile */}
      <div className="md:hidden">
        <Breadcrumb items={[{ label: "Home" }]} />
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - hidden on mobile */}
          <div className="w-full md:w-64 shrink-0 hidden md:block">
            <SidebarCategories />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            
            <Carousel />

            
            <div className="mt-6">
              <CategoryGrid />
            </div>
          </div>
        </div>
      </div>

     

      {/* Featured Stores */}
      <div className="container mx-auto px-4 py-6">
        <FeaturedStores />
      </div>

      {/* Did You Know We Carry */}
      {/* <div className="container mx-auto px-4 py-6">
        <DidYouKnow />
      </div> */}

      {/* Featured Author */}
      {/* <div className="container mx-auto px-4 py-6">
        <FeaturedAuthor />
      </div> */}

      {/* Top Bestsellers */}
      <div className="container mx-auto px-4 py-6">
        <TopBestsellers />
      </div>

      {/* Recently Viewed */}
      <div className="container mx-auto px-4 py-6">
        <RecentlyViewed />
      </div>

      {/* You Might Like */}
      {/* <div className="container mx-auto px-4 py-6">
        <YouMightLike />
      </div> */}

      {/* Greeting Cards */}
      {/* <div className="container mx-auto px-4 py-6">
        <GreetingCards />
      </div> */}

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  )
}
