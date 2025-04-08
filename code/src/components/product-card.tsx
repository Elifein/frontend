'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

import { Button } from '../components/ui/button';
import { useCart } from '../components/cart-provider';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      ...product,
      quantity,
    });

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
      // Reset quantity after adding to cart
      setQuantity(1);
    }, 500);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          width={300}
          height={300}
          className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <div className="mb-2 text-sm text-muted-foreground">
          {product.category}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 ${isAdding ? 'bg-green-600' : ''}`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdding ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
}
