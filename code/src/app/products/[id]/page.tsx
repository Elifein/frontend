'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
import { CartProvider, useCart, Product as CartProduct } from '../../../components/cart-provider';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { ProductCard } from '../../../components/product-card';
import axiosInstance from '../../../lib/axiosInstance';

interface ProductResponse {
  product_id: string;
  identification: {
    product_name: string;
  };
  descriptions: {
    full_description: string;
  };
  pricing: {
    selling_price: string;
  };
  images: {
    urls: string[];
  };
  inventory: {
    stock_alert_status: string;
  };
  physical_attributes: {
    weight: string;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    shipping_class: string;
  };
  tags_and_relationships: {
    product_tags: string[];
  };
}

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10">Loading product...</div>;
  if (!product) return <div className="p-10">Product not found.</div>;

  const {
    product_id,
    identification,
    descriptions,
    pricing,
    images,
    inventory,
    physical_attributes,
    tags_and_relationships,
  } = product;

  const handleAddToCart = () => {
    setIsAdding(true);
    const cartItem: CartProduct = {
      id: product_id,
      name: identification.product_name,
      price: parseFloat(pricing.selling_price),
      image: images.urls[0],
      quantity,
      category: tags_and_relationships.product_tags?.[0] || 'Other',
    };
    addToCart(cartItem);
    setTimeout(() => setIsAdding(false), 500);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

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
            <span className="text-foreground">{identification.product_name}</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border bg-background">
                <Image
                  src={images.urls[selectedImage]}
                  alt={identification.product_name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-auto pb-2">
                {images.urls.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-md border ${
                      selectedImage === i ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Image ${i + 1}`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">
                  {tags_and_relationships.product_tags.join(', ')}
                </div>
                <h1 className="mt-2 text-3xl font-bold">
                  {identification.product_name}
                </h1>
                <div className="mt-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    No reviews yet
                  </span>
                </div>
                <div className="mt-4 text-2xl font-bold">
                  ₹{pricing.selling_price}
                </div>
                <div className="mt-6 text-muted-foreground">
                  {descriptions.full_description}
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
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
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
                        className={`h-5 w-5 ${
                          isWishlisted ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Availability:</span>{' '}
                  {inventory.stock_alert_status}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Shipping:</span> Free shipping
                  on orders over ₹500
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <p>{descriptions.full_description}</p>
                </TabsContent>
                <TabsContent value="specs" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                      Weight: physical_attributes.weight + ' kg',
                      Dimensions: `${physical_attributes.dimensions.length} x ${physical_attributes.dimensions.width} x ${physical_attributes.dimensions.height} cm`,
                      Shipping: physical_attributes.shipping_class,
                    }).map(([key, value]) => (
                      <div key={key}>
                        <div className="font-medium">{key}</div>
                        <div className="text-muted-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <p>No reviews yet. Be the first to review this product.</p>
                  <Button variant="outline">Write a Review</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  id: 'dummy-1',
                  name: 'Modern Study Bible',
                  price: 1200,
                  image: '/images/placeholder.svg',
                  category: 'Books',
                },
                {
                  id: 'dummy-2',
                  name: 'Leather Cover Bible',
                  price: 1500,
                  image: '/images/placeholder.svg',
                  category: 'Books',
                },
              ].map((relatedProduct) => (
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
