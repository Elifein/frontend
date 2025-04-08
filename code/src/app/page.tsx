import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Button } from '../components/ui/button';
import { ProductCard } from '../components/product-card';

// Sample featured products data
const featuredProducts = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    price: 49.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Home Decor',
  },
  {
    id: '2',
    name: 'Leather Weekender Bag',
    price: 129.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Accessories',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    price: 89.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug',
    price: 24.99,
    image: '/images/placeholder.svg?height=300&width=300',
    category: 'Kitchen',
  },
];

// Sample categories
const categories = [
  {
    name: 'Electronics',
    image: '/images/placeholder.svg?height=200&width=200',
    slug: 'electronics',
  },
  {
    name: 'Clothing',
    image: '/images/placeholder.svg?height=200&width=200',
    slug: 'clothing',
  },
  {
    name: 'Home & Kitchen',
    image: '/images/placeholder.svg?height=200&width=200',
    slug: 'home-kitchen',
  },
  {
    name: 'Beauty',
    image: '/images/placeholder.svg?height=200&width=200',
    slug: 'beauty',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Quality Products for Your Lifestyle
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Shop our curated collection of premium products designed to
                    enhance your everyday life.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg" className="gap-1.5">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button size="lg" variant="outline">
                      Browse Categories
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <Image
                  src="/images/placeholder.svg?height=500&width=500"
                  width={500}
                  height={500}
                  alt="Hero Image"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Shop by Category
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our wide range of categories to find exactly what you
                  need.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
                >
                  <Image
                    src={category.image || '/images/placeholder.svg'}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-lg font-medium text-white">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Featured Products
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular products handpicked for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/products">
                <Button variant="outline" size="lg" className="gap-1.5">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Stay Updated
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter for the latest products and
                  exclusive offers.
                </p>
              </div>
              <div className="mx-auto w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
