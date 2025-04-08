'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowLeft,
} from 'lucide-react';

import { Button } from '../../components/ui/button';
import { CartProvider, useCart } from '../../components/cart-provider';
import { MainNav } from '../../components/main-nav';
import { Separator } from '../../components/ui/separator';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';

function CartPageContent() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Shipping calculation (simplified)
  const shippingCost = cartTotal > 50 ? 0 : 5.99;

  // Tax calculation (simplified)
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;

  // Discount calculation
  const discountAmount = promoApplied ? cartTotal * 0.1 : 0;

  // Final total
  const orderTotal = cartTotal + shippingCost + taxAmount - discountAmount;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-6 rounded-full bg-muted p-6">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
        <p className="mb-8 text-center text-muted-foreground">
          Looks like you haven`&apos;`t added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in
              your cart
            </p>
          </div>
          <Separator />

          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium">
                          <Link
                            href={`/products/${item.id}`}
                            className="hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <p className="text-lg font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="p-6">
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/products" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>
          <Separator />
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>

            <div className="pt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={applyPromoCode}
                  disabled={promoApplied}
                >
                  Apply
                </Button>
              </div>
              {promoApplied && (
                <p className="mt-2 text-sm text-green-600">
                  Promo code applied successfully!
                </p>
              )}
            </div>

            {cartTotal < 50 && (
              <Alert className="bg-muted/50 mt-4">
                <AlertDescription>
                  Add ${(50 - cartTotal).toFixed(2)} more to qualify for free
                  shipping!
                </AlertDescription>
              </Alert>
            )}

            <Button className="w-full mt-6" size="lg" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center">
            <MainNav />
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-6 flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-foreground">Cart</span>
            </div>

            <CartPageContent />
          </div>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2023 ShopSmart. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
