'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Heart,
} from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { CartProvider, useCart } from '../../../components/cart-provider';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { ProductCard } from '../../../components/product-card';

// Sample product data - in a real app, this would be fetched based on the ID
const product = {
  id: '1',
  name: 'Minimalist Desk Lamp',
  price: 49.99,
  image: '/images/placeholder.svg?height=600&width=600',
  category: 'Home Decor',
  description:
    'A sleek, minimalist desk lamp perfect for any workspace. Features adjustable brightness levels and a modern design that complements any decor style.',
  features: [
    'Adjustable brightness levels',
    'Touch-sensitive controls',
    'Energy-efficient LED bulb',
    'Flexible arm for directional lighting',
    'USB charging port',
  ],
  specifications: {
    Dimensions: '12 x 6 x 18 inches',
    Weight: '2.5 lbs',
    Material: 'Aluminum and plastic',
    Color: 'Matte Black',
    'Power Source': 'AC adapter (included)',
    Warranty: '2-year limited warranty',
  },
  rating: 4.5,
  reviewCount: 128,
  images: [
    '/images/placeholder.svg?height=600&width=600',
    '/images/placeholder.svg?height=600&width=600&text=Image+2',
    '/images/placeholder.svg?height=600&width=600&text=Image+3',
    '/images/placeholder.svg?height=600&width=600&text=Image+4',
  ],
  relatedProducts: [
    {
      id: '2',
      name: 'Modern Desk Organizer',
      price: 29.99,
      image: '/images/placeholder.svg?height=300&width=300',
      category: 'Home Decor',
    },
    {
      id: '3',
      name: 'Wireless Charging Pad',
      price: 39.99,
      image: '/images/placeholder.svg?height=300&width=300',
      category: 'Electronics',
    },
    {
      id: '4',
      name: 'Ergonomic Mouse Pad',
      price: 19.99,
      image: '/images/placeholder.svg?height=300&width=300',
      category: 'Office Supplies',
    },
    {
      id: '5',
      name: 'Adjustable Monitor Stand',
      price: 59.99,
      image: '/images/placeholder.svg?height=300&width=300',
      category: 'Office Supplies',
    },
  ],
  reviews: [
    {
      id: '1',
      author: 'Jane Doe',
      rating: 5,
      date: '2023-05-15',
      title: 'Perfect for my workspace',
      content:
        'This lamp is exactly what I needed for my home office. The adjustable brightness is perfect for different times of day.',
    },
    {
      id: '2',
      author: 'John Smith',
      rating: 4,
      date: '2023-04-28',
      title: 'Great design, minor issues',
      content:
        'I love the sleek design and the light quality is excellent. The only issue is that the touch controls are a bit sensitive.',
    },
  ],
};

function ProductDetails() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      ...product,
      quantity,
    });

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link
              href={`/categories/${product.category.toLowerCase().replace(' ', '-')}`}
              className="hover:text-foreground"
            >
              {product.category}
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border bg-background">
                <Image
                  src={
                    product.images[selectedImage] || '/images/placeholder.svg'
                  }
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-md border ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image
                      src={image || '/images/placeholder.svg'}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">
                  {product.category}
                </div>
                <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-primary text-primary'
                            : i < product.rating
                              ? 'fill-primary text-primary' // For half stars, we'd need a different approach
                              : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="mt-4 text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </div>

                <div className="mt-6 text-muted-foreground">
                  {product.description}
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="flex items-center">
                  <div className="mr-4 flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>

                  <div className="flex flex-1 gap-2">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={isAdding}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {isAdding ? 'Added to Cart' : 'Add to Cart'}
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      className="h-10 w-10"
                      onClick={toggleWishlist}
                    >
                      <Heart
                        className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span className="sr-only">Add to Wishlist</span>
                    </Button>
                  </div>
                </div>

                {/* Product availability */}
                <div className="text-sm">
                  <span className="font-medium">Availability:</span> In Stock
                </div>

                {/* Shipping info */}
                <div className="text-sm">
                  <span className="font-medium">Shipping:</span> Free shipping
                  on orders over $50
                </div>
              </div>

              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <ul className="list-inside list-disc space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key}>
                          <div className="font-medium">{key}</div>
                          <div className="text-muted-foreground">{value}</div>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{review.title}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {review.author} - {review.date}
                        </div>
                        <p className="mt-2">{review.content}</p>
                      </div>
                    ))}

                    <Button variant="outline">Write a Review</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {product.relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductPage() {
  return (
    <CartProvider>
      <ProductDetails />
    </CartProvider>
  );
}
