'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { Button } from '../components/ui/button';
import { useCart } from './cart-provider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '../components/ui/sheet';

export function CartSidebar() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Looks like you haven`&apos;`t added anything to your cart yet.
              </p>
            </div>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3 className="line-clamp-2">
                          <Link
                            href={`/products/${item.id}`}
                            onClick={closeCart}
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.category}
                      </p>
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
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t">
              <div className="py-4">
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
